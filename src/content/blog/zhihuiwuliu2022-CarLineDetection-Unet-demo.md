---
title: 基于Unet3p的车道中线检测模型 - 航天智慧物流2022
publishedDate: 2022-09-12 15:55:22
tags: [深度学习, 计算机视觉, 语义分割]
category: 开发项目
---

>**参考资料**
>
>1. [憨批的语义分割重制版6——Pytorch 搭建自己的Unet语义分割平台_Bubbliiiing的博客-CSDN博客](https://blog.csdn.net/weixin_44791964/article/details/108866828)
>2. [UNet3+(UNet+++)论文解读 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/136164721)

# 理论基础

## Unet基本结构

第一部分是**主干特征提取部分**，我们可以利用主干部分获得一个又一个的特征层，Unet的主干特征提取部分与VGG相似，为卷积和最大池化的堆叠。利用主干特征提取部分我们可以获得**五个**初步有效特征层，在第二步中，我们会利用这五个有效特征层可以进行特征融合。

第二部分是**加强特征提取部分**，我们可以利用主干部分获取到的五个初步有效特征层进行上采样，并且进行特征融合，获得一个最终的，融合了所有特征的有效特征层。

第三部分是**预测部分**，我们会利用最终获得的最后一个有效特征层对每一个特征点进行分类，相当于对每一个像素点进行分类。

<img src="https://img-blog.csdnimg.cn/20200929121435918.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDc5MTk2NA==,size_16,color_FFFFFF,t_70#pic_center" alt="img"  />

![img](https://img-blog.csdnimg.cn/20200929130336137.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NDc5MTk2NA==,size_16,color_FFFFFF,t_70#pic_center)

* Dice loss将语义分割的评价指标作为Loss，Dice系数是一种集合相似度度量函数，通常用于计算两个样本的相似度，取值范围在[0,1]。就是预测结果和真实结果的交乘上2，除上预测结果加上真实结果。其值在0-1之间。越大表示预测结果和真实结果重合度越大。所以Dice系数是越大越好。

## UNet3p

![image-20220912192427365](https://s2.loli.net/2022/09/12/dkGUzVExWZYhNHa.png)

* UNET3+的提出旨在**充分利用多尺度特征**，相较于U-NET和U-NET++， U-Net3+通过一种新的基于u型的体系结构结合了多尺度特征，重新设计了编码器和解码器与解码器之间的跳跃连接，能够从全尺度获取细粒度细节和粗粒度细节，并利用多尺度的深度监督，使得**每一边的输出都能与一个混合损失函数连接**，有助于精确分割。同时，UNet 3+可以减少网络参数，提高计算效率。

* **结构**

  * 全尺寸跳跃连接(Full-scale Skip Connnections)

    全尺寸跳跃连接使得UNET3+中每一个解码器层都融合了来自**编码器的小尺度和同尺度的特征图**，以及来自**解码器的大尺度**的特征图，以此捕获了全尺度下的粗、细粒度语义。

    ![img](https://pic2.zhimg.com/80/v2-9cf3d0f6e95cb9521326dd9f851071f1_720w.jpg)

    例如，图2说明了如何构造$X_{De}^3$特征图。与UNet类似，直接接收来自相同尺度编码器层的特征图$X_{En}^3$。但不同的是，跳跃连接不止上面一条。

    * 上方：其中，上面两条跳跃连接通过不同的最大池化操作将较小尺度编码器层$X_{En}^1$和$X_{En}^2$进行池化下采样，以便传递底层的低级语义信息。之所以要池化下采样，是因为要统一特征图的分辨率。从图中可知，$X_{En}^1$要缩小分辨率4倍，$X_{En}^2$要缩小分辨率2倍。
    * 下方：另外的下面两条跳跃连接则通过双线性插值法对解码器中的$X_{En}^4$和$X_{En}^5$进行上采用从而放大特征图的分辨率，从图中可知，$X_{En}^5$($X_{De}^5$)要放大分辨率4倍，$X_{En}^4$要放大分辨率2倍。
      * 双线性插值是分别在两个方向计算了共3次单线性插值（x轴两次、y轴一次），可以先在x方向求2次单线性插值，获得两个临时点，再在y方向计算1次单线性插值得出（实际上调换2次轴的方向先y后x也是一样的结果）
    * 统一完特征图之后，还不能结合它们，还需要统一特征图的数量，减少多余的信息。作者发现64个3×3大小的滤波器进行卷积表现效果较好，卷积后便产生64个通道的特征图
    * 统一好了feature map的分辨率和数量后，就可以将浅层的精细信息与深层的语义信息进行特征融合了，关于特征融合一般有如下两种方法，FCN式的逐点相加或者U-Net式的通道维度拼接融合，本文是后者。这5个尺度融合后，便产生5*64=320个相同分辨率的特征图，然后再经过320个3×3大小的滤波器进行卷积 ，最后再经过BN + ReLU得到$X_{De}^3$。

  * 全尺寸深度监督(Full-scale Deep Supervision)

    全尺寸深度监督度生成的全分辨率特征图进行深度监督，在各个尺度连接后加一个1×1的卷积核，以此监督每个分支的UNET输出。

    为了从全尺度的聚合特征图中学习层次表示，UNet 3+进一步采用了全尺度深度监督。不同于UNet++，UNet 3+中每个解码器阶段都有一个侧输出，是金标准(ground truth，GT)进行监督。为了实现深度监督，每个解码器阶段的最后一层被送入一个普通的3×3卷积层，然后是一个双线性上采样和一个sigmoid函数。(这里的上采样是为了放大到全分辨率)。

  * 分类指导模块(Classification-guided Module, CGM)

    ![image-20220912202115599](https://s2.loli.net/2022/09/12/nbKiP5DW14oI6Bl.png)

    在车道线检测过程中，由赛道边界线和地面影响，分割图像出现假阳性是不可避免的。与此类似，UNET3+针对预测输入图像是否是车道线而设计的分类指导模块增加了一个额外的分类任务来解决背景噪声导致分割停留在较浅的层次，过度分割的现象。

    最深层次的二维张量$X_{En}^5$依次经过dropout,卷积,maxpooling,sigmoid, 最后输出有车道线的概率。由于二值分类任务的简单性，该模块通过优化二值交叉熵损失函数，轻松获得准确的分类结构，实现对非车道线图像过分割的指导。

# 项目实践

## 获取照片

队友手动拍摄的290张S弯车道照片（白天、夜间均有）

![image-20220912202404010](https://s2.loli.net/2022/09/12/heXunLpf3Qqb71F.png)

## 标注

使用labelme对车道线进行标注

![image-20220912202527582](https://s2.loli.net/2022/09/12/5FoOgtLwHlTBm6k.png)

## 生成数据集、格式转换、分割

将`img.png`使用opencv根据传统图像处理方法进行二值化，训练集和验证集为262/29

![image-20220912202743137](https://s2.loli.net/2022/09/12/Q5hbraP7Ejig1MV.png)

### 二值化

使用YCrCb颜色格式，只取minYCB和maxYCB中间的区域，使用THRESH_BINARY进行二值化

```python
cv2.imshow('Frame', frame)


brightYCB = cv2.cvtColor(frame, cv2.COLOR_BGR2YCrCb)

bgr = [100, 76, 76]
thresh = 50

ycb = cv2.cvtColor(np.uint8([[bgr]]), cv2.COLOR_BGR2YCrCb)[0][0]

minYCB = np.array([ycb[0] - thresh, ycb[1] - thresh, ycb[2] - thresh])
maxYCB = np.array([ycb[0] + thresh, ycb[1] + thresh, ycb[2] + thresh])

maskYCB = cv2.inRange(brightYCB, minYCB, maxYCB)
resultYCB = cv2.bitwise_and(brightYCB, brightYCB, mask=maskYCB)

thresh = 0
maxValue = 255

th, dst = cv2.threshold(resultYCB, thresh, maxValue, cv2.THRESH_BINARY)

cv2.imshow("Result YCB", dst)
```

## 训练

### 参数

loss为二分类交叉熵损失，优化器是adam

```python
WeightCoefficient = 2
Epochs = 20
LrDecay = 0.1
BatchSize = 4
Lr = 0.001
LrDecayPerEpoch = 10  # 学习率调整的epoch
ValidPerEpoch = 5  # 测试的epoch
SavePerEpoch = 5  # 保存结果的epoch
torch.cuda.set_device(0)  # 选用GPU设备

model = UNet3Plus(n_channels=3, n_classes=1).to('cuda')
SaveFolder = 'u3p128'
Criterion = nn.BCELoss().to('cuda') 
Optimizer = torch.optim.Adam(model.parameters(), lr=Lr)
```

## 验证

AUC: 0.999587506265614
MF: 0.9579528219690858
AP: 0.9943063698957488

平均时间

<img src="https://s2.loli.net/2022/09/12/U6si1XSBmNpF9bO.png" alt="image-20220912212146074" style="zoom: 67%;" />

验证

<img src="https://s2.loli.net/2022/09/12/YeGQm3d5c8WZCup.png" alt="003" style="zoom: 33%;" />

auc

<img src="https://s2.loli.net/2022/09/12/lECguZpa21YiMcH.png" alt="image-20220912212221142" style="zoom:50%;" />

精准-召回

<img src="https://s2.loli.net/2022/09/12/vbQfpGuAPZ46l9V.png" alt="image-20220912212239461" style="zoom:50%;" />
