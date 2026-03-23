---
title: 北京邮电大学鲁鹏《计算机视觉（本科）》笔记
publishedDate: 2022-09-06 18:52:37
tags: [计算机视觉]
category: 课外学习
---

>***注：***
>
>1. 评价：
>1. 课程视频 [计算机视觉（本科） 北京邮电大学 鲁鹏 ](https://www.bilibili.com/video/BV1nz4y197Qv/?vd_source=9a9a9cf9165eb8e9ac7f86f53516b66d)
>1. 课程资料 [CV-XUEBA](https://cv-xueba.club/pages/courses/cv_basic.html)
>1. 课程大概
>
>![image.png](https://s2.loli.net/2022/09/06/osVude4nlgH6h7z.png)

# 概述

* David Marr 三层问题方法论 （ICCV马尔奖）
  * **Computational theory**: What is the **goal** of the computation (task) and what are the **constraints** that are  known or can be brought to bear on the problem? 
  * **Representations and algorithms**: How are the **input, output, and intermediate information** represented,  and which algorithms are used to **calculate** the desired result? 
  * **Hardware implementation**: How are the representations and algorithms **mapped onto** actual hardware, Conversely, how can hardware  **constraints** be used to guide the choice of representation and algorithm?

* information extracted from an image
  * Metric **3D** information
  * **Semantic** information

* CV发展时间表

  <img src="https://s2.loli.net/2022/09/06/vDYyaLJHqS5zeiZ.png" alt="image.png" style="zoom:50%;" />

# 语义信息

## 像素

### 卷积

* 卷积核（滤波核）
* ...省略
* 去噪：高斯平滑（线性）解决高斯噪声，中值滤波（非线性）解决椒盐噪声
* 锐化

### 边缘提取

* 偏导

* 检测边缘的特殊滤波核（sobel先高斯平滑再提取）

  <img src="https://s2.loli.net/2022/09/06/8Dhvluqsb5LkINP.png" alt="image.png" style="zoom:50%;" />

* 有噪声，先平滑

  ![image.png](https://s2.loli.net/2022/09/06/scnomP3rBW2TYLF.png)

  ![image.png](https://s2.loli.net/2022/09/06/Nz6CYQmUpcgZ9oq.png)

* **Smoothing vs. derivative filters**
  * Gaussian: remove “high-frequency” components;  “low-pass” filter
  * the values of a smoothing filter Cannot be negative
  * the values sum to 1
  *  One: constant regions are not affected by the filter 
* Derivative filters
  * Derivatives of Gaussian 
  * the values of a derivative filter Can be negative
  * the values sum to 0
  * High absolute value at points of high contrast
* Non-maximum suppression 非最大化抑制
  * 宽边变细边
  * Check if pixel is local maximum along gradient  direction, select single max across width of  the edge
* Hysteresis thresholding 滞后阈值法
  * Use a **high threshold** to **start** edge curves, and a **low  threshold** to **continue** them.
* **Canny edge detector**算法
  1. Filter: derivative of Gaussian
  2. Find magnitude and orientation of gradient
  3. Non-maximum suppression:
  4. Linking and thresholding (hysteresis)

### 拟合

* 需要数学描述轮廓位置

* **Least squares**最小二乘

  * 缺点：Not rotation-invariant 没有旋转不变性、Fails completely for vertical lines垂直
  * 改进：Total least squares， TLS，总体最小二乘法（有点类似svm）（点到直线垂直距离）
    * 【略去数学】
    * 求解Ax=b的最小二乘法只认为b含有误差，但实际上系数矩阵A也含有误差。总体最小二乘法就是同时考虑A和b二者的误差和扰动
  * 改进：Robust fitting（有点类似正则化）距离超过某个值不考虑

* Random sample consensus（**RANSAC**）

  * 很多外点的时候有用
  * 步骤
    1. Choose a small subset of points uniformly at random
    2. Fit a model to that subset
    3. Find all remaining points that are “close”（确定门限） to the model and reject the rest as outliers
    4.  Do this many times and choose the best model

* Hough transform

  * 投票机制

  * 换成极坐标，避免垂直时参数失效（theta可以根据导数计算，缩小搜索范围）

  * 步骤

    1. Discretize parameter space into bins
    2. For each feature point in the image, put a vote in every bin in the parameter space that  could have generated this point 
    3. Find bins that have the most votes

  * Dealing with noise

    * Choose a good grid / discretization
      *  Too coarse: large votes obtained when too many different lines correspond to a **single**  bucket
      * Too fine: miss lines because some points that are not exactly collinear cast votes for  different buckets 
    * Increment neighboring bins (smoothing in accumulator array)（给周边格子加分）
    * Try to get rid of irrelevant features （Take only edge points with significant gradient magnitude）

  * Hough transform for circles  

    * 找样本一点，求梯度方向，方向上各个根据x，y，转换到r，u，v坐标系，设定三维坐标系投票

    * 拓展

    <img src="https://s2.loli.net/2022/09/06/xnyjKe9uJWlis42.png" alt="image.png" style="zoom:50%;" />

    <img src="https://s2.loli.net/2022/09/06/aJ85NIRqVHulFhj.png" alt="image.png" style="zoom:50%;" />

  * 优点

    * Can deal with non-locality全局 and occlusion遮挡
    * Can detect multiple instances of a model多物体
    * Some robustness to noise: noise points unlikely to contribute consistently to any single bin

  * 缺点

    * Complexity of search time increases exponentially with the number of model parameters 高维度很难
    * Non-target shapes can produce spurious peaks in parameter space 伪峰值
    * It’s hard to pick a good grid size 离散化的标准不确定

* Hough transform  vs. RANSAC 
  * Hough变换的优点是概念简单（只需变换和在Hough空间中找到交叉点）。它也相当容易实现，并且可以很好地处理丢失和阻塞的数据。另一个优点是，只要结构具有参数方程，它就可以找到除直线以外的其他结构。
    缺点包括在参数越多，计算上越复杂。它也只能同时查找一种结构（因此不能将线和圆放在一起）。也不能检测到线段的长度和位置。它可以被“明显”的线条欺骗，并且不能同线性的线段作区分。
  * RANSAC 每次一条线或者最多的几条线 投票 外点数越多越麻烦 计算参数的迭代次数没有上限

## 局部特征

### 角 Corner

* 图像拼接过程

  1. extract features
  2. match features
  3. align images

* 找关键点的注意事项

  * **Repeatability** 可重复性 - The **same** feature can be found in several images despite geometric and photometric transformations
  * **Saliency** 要有特点 - Each feature is distinctive
  * **Compactness and efficiency** 简洁有效率 - Many fewer features than image pixels
  * **Locality** 局部性 - A feature occupies a relatively small area of the image; robust to clutter and occlusion

* 计算挪动坐标后窗口内差异值 $E(u, v)$
  $$
  E(u, v) = \sum_{x, y} w(x, y)[I(x+u, y+v)-I(x, y)]^{2}
  $$
  ![image-20220907133251325](https://i.postimg.cc/zJSC0sZB/202297133251.png?dl=1)

  泰勒展开
  $$
  E(u, v) \approx E(0,0)+\left[\begin{array}{ll}
  u & v
  \end{array}\right]\left[\begin{array}{c}
  E_{u}(0,0) \\
  E_{v}(0,0)
  \end{array}\right]+\frac{1}{2}\left[\begin{array}{ll}
  u & v
  \end{array}\right]\left[\begin{array}{ll}
  E_{u u}(0,0) & E_{u v}(0,0) \\
  E_{u v}(0,0) & E_{v v}(0,0)
  \end{array}\right]\left[\begin{array}{l}
  u \\
  v
  \end{array}\right]
  $$

  $$
  E(u, v) \approx\left[\begin{array}{ll}
  u & v
  \end{array}\right] M\left[\begin{array}{l}
  u \\
  v
  \end{array}\right]
  $$

  $$
  M=\sum_{x, y} w(x, y)\left[\begin{array}{cc}
  I_{x}^{2} & I_{x} I_{y} \\
  I_{x} I_{y} & I_{y}^{2}
  \end{array}\right]=\left[\begin{array}{cc}
  \lambda_{1} & 0 \\
   0 & \lambda_{2}
  \end{array}\right]
  $$

  只要两个特征值都比较大就可以认为是角点

* M:两个特征值反应两个方向上变化的强弱，R表现旋转角度

<img src="https://s2.loli.net/2022/09/07/68B12Dg5qvydwFR.png" style="zoom:67%;" />

<img src="https://s2.loli.net/2022/09/07/hJCcWmLi4MIqyP5.png" alt="image-20220907153946506" style="zoom:67%;" />

<img src="https://s2.loli.net/2022/09/07/2puFCSkUahsfMeP.png" alt="image-20220907154109439" style="zoom:67%;" />

* **Harris detector** 步骤

  1. Compute Gaussian **derivatives** at each pixel
  2. Compute **second moment matrix M** in a Gaussian  window around each pixel 
  3. Compute corner response function **R**
  4. **Threshold** R
  5. Find local maxima of response function  (nonmaximum suppression) 要有非最大化抑制

* **Harris角点特性**

  * Invariance不变: image is transformed and corner locations do not change 直接建立关联
    $$
    F(T(img)) = F(img)
    $$

    * Affine intensity change （放射强度变换，亮度） **Partially invariant** to affine intensity change 部分满足

      ![image-20220907162134681](https://s2.loli.net/2022/09/07/4HsURgnYByeOQzk.png)

  * Covariance协变: if we have two transformed versions of the same image,  features should be detected in corresponding locations 有机会建立关联
    $$
    F(T(img))=T'(F(img))
    $$

    * 对于平移、旋转、放大：

      * 平移：Derivatives and window function are shift-invariant

      * 旋转：Second moment ellipse rotates but its shape  (i.e. eigenvalues) remains the same

      * 放大：All points will  be classified  as **edges**. Corner location **is not covariant** to scaling!

        ![image-20220907162148380](https://s2.loli.net/2022/09/07/ILXa95g1h78K4eY.png)

### 斑点（圆）检测 Blob

* Goal: independently detect **corresponding regions** in **scaled** versions of the same image

* 高斯二阶导，拉普拉斯

  <img src="https://s2.loli.net/2022/09/07/MBeRHPEWdwJXTxF.png" alt="image-20220907190617743" style="zoom:67%;" />

*  Blob = superposition of two ripples  两个边缘的叠加

  <img src="https://s2.loli.net/2022/09/07/AOwIKaMXoVp8mCF.png" alt="image-20220907191745547" style="zoom: 67%;" />

* Spatial selection: the magnitude of the Laplacian response will achieve  a maximum at the center of the blob, provided the scale of the  Laplacian is “matched” to the scale of the blob

* sigma增大会使得响应衰减需要乘上sigma平方修正

  <img src="https://s2.loli.net/2022/09/07/yFdq1elYRJpVUwQ.png" alt="image-20220907191854326" style="zoom: 67%;" />

* 二维

  <img src="https://s2.loli.net/2022/09/07/6SYAXzTUPrgb19n.png" alt="image-20220907192045679" style="zoom:67%;" />

* 圆半径和sigma如何匹配（首先尺寸问题）

  <img src="https://s2.loli.net/2022/09/07/in1ZJXzAxRCcelr.png" alt="image-20220907192517001" style="zoom: 67%;" />

* define the characteristic scale of a blob as the scale that  **produces peak** of Laplacian response in the blob center

* 增强方法：DoG算子本质是为了LoG算子的快速实现。其通过两个高斯的差快速逼近了LoG算子

  <img src="https://s2.loli.net/2022/09/07/N5YFvVdCWhzSPlE.png" alt="image-20220907200534947" style="zoom:67%;" />

  没听懂 p8 52min左右 大概是sigma不变 改k就行

  ![image-20220907201709381](https://s2.loli.net/2022/09/07/xR4GbLN129z38ij.png)

  * Laplacian (blob) response 点is invariant w.r.t. rotation and scaling

  *  Blob location and scale is covariant w.r.t. rotation and scaling

  * 修正

    * 视角问题：类比Harris的方法找出两个方向变化相等的时候，图像上时**椭圆**，特征向量的图是**正圆**

    * 旋转问题：局部合到整体投票，根据最大旋转角统一两幅图的方向

      ![image-20220907205809764](https://s2.loli.net/2022/09/07/ZtLOlIjVNKDqaem.png)

    * 光照问题：分成局部，两幅图的每个对应局部的光强直方图进行L2距离比较

### 纹理

* Texture representations attempt to summarize repeating patterns of local  structure

* Filter banks useful to measure redundant variety of structures in **local  neighborhood**

* 使用Filter banks (Feature spaces can be multi-dimensional) 非常类似卷积最后提取的特征

  ![image-20220908110450033](https://s2.loli.net/2022/09/08/7FBlDINMukR5eXr.png)

## 分割

* 对于本节：Bottom-up process & Unsupervised

### 基于**kmeans**

* Pros
  * Very simple
  * Converges to a local minimum of the error function 收敛到误差函数的局部最小值
* Cons
  * Memory-intensive 内存密集型
  * Need to pick K
  * Sensitive to initialization
  * Sensitive to outliers
  * Only finds “spherical”  clusters

### 基于**Mean shift**

* eg (r,g,b,x,y)

* Pros
  * Does not assume spherical clusters
  * Just a single parameter (window size)
  * Finds variable number of modes 不需要自己设定类数
  * Robust to outliers
* Cons
  * Output depends on window size
  * Computationally expensive
  * Does not scale well with dimension of feature space

### 基于graph

* Break Graph into Segments

* **normalized cut** cost $w(A, B)$ is sum of weights of all edges between $A$ and $B$
  $$
  \frac{w(A, B)}{w(A, V)}+\frac{w(A, B)}{w(B, V)}
  $$

* 步骤

  * Let $W$ be the adjacency matrix 邻接矩阵 of the graph 

  * Let $D$ be the diagonal matrix with diagonal entries $D(i, i) = Σ_j  W(i, j) $

  * Then the normalized cut cost can be written as 
    $$
    \frac{y^{T}(D-W) y}{y^{T} D y}
    $$

  * where y is an indicator vector whose value should be 1 in  the i-th position if the i-th feature point belongs to A and a  negative constant otherwise 每次只分成两个类别

  * 上述式子求导，也就是Solve $(D − W)y = λDy$ 

  * The solution y is given by the generalized **eigenvector**  corresponding to the **second smallest eigenvalue** 第一小的是0

  * loss最小的y，根据阈值（不断调整）映射到0-1，选取loss最低的阈值的y

* To find more than two clusters

  * Recursively bipartition the graph 递归二分类
  * Run k-means clustering on values of  several eigenvectors

* for mosaic of textures

  * Convolve image with a bank of filters and Find textons纹理基元 by clustering vectors of filter bank outputs
  * The final texture feature is a texton **histogram** computed  over image windows at some “local scale”

* Pitfall of texture features

  * Possible solution: check for “intervening contours” when computing  connection weights 两个轮廓差不多就可以合并

* 特性

  * Pros
    * Generic framework, can be used with many different features and affinity  formulations 可以自行定义特征dist和相似度量方法
  * Cons
    * High storage requirement and time complexity 邻接矩阵在点较多时很难存下
    * Bias towards partitioning into equal segments 一般是分成相同差不多的两块

## 图像（识别检测）

### 表示

* 区域划分、相对位置结构、亮度等属性
* Object models: Generative vs Discriminative vs hybrid
  * Discriminative methods model **posterior** 
  * Generative methods model **likelihood and prior**
* 词袋模型Bag-of-features models
  * 步骤
    1. Extract features
    2. Learn “visual vocabulary”
    3. Represent images by frequencies of “visual words”

### 学习

* Learning parameters: What are you maximizing? 

  Likelihood (Gen.) or performances on train/validation set (Disc.)

* Level of supervision
  * Manual segmentation; bounding box; image labels; noisy labels
* Batch/incremental
* Priors
* Training images:
  * Issue of overfitting
  * Negative images for discriminative methods

### 识别检测

* Search strategy：Sliding Windows

  * Simple

  * Computational complexity ( x, y, S, θ, N of classes) 

  * Localization 

    * Objects are not boxes

    * Prone to false positive 容易出现假阳性

  * Non max suppression

* **Boosting**

  * Defines a classifier using an additive model 一个强分类器由多个弱分类器（线性的）组成
    $$
    h(x)=\alpha_{1} h_{1}(x)+\alpha_{1} h_{1}(x)+\alpha_{2} h_{3}(x)+\cdots
    $$

  * We need to define a family of weak classifiers $h_k(x)$ form a family of weak classifiers

  * 强弱分类器不同作用

    ![image-20220908151922789](https://s2.loli.net/2022/09/08/Vr6HenFKYuXwlAv.png)

  * 人脸识别应用（Viola & Jones algorithm）

    * A “paradigmatic” method for real‐time object detection

    * Training is slow, but detection is very fast

    * Key ideas

      *  **Integral images** 积分图 for fast feature evaluation
      * Boosting for feature selection
      * Attentional cascade for fast rejection of non‐face windows

    * 步骤(**adaboost**)

      <img src="https://s2.loli.net/2022/09/08/drxhGUiBO8TWaA9.png" alt="image-20220908154447223" style="zoom:80%;" />

      <img src="https://s2.loli.net/2022/09/08/Mc645ugqf2H3BOG.png" alt="image-20220908160416716" style="zoom:80%;" />

      <img src="https://s2.loli.net/2022/09/08/egfSIspKcQrVaGB.png" alt="image-20220908154523774" style="zoom:80%;" />

    * Cascade级联分类器由多个强分类器组成

      ![image-20220908161215860](https://s2.loli.net/2022/09/08/c9OArQKMH1JS3Zh.png)

  * 行人检测

    ![image-20220908163752127](https://s2.loli.net/2022/09/08/aWM4RevrXVUlif3.png)

    * 步骤
      1. Extract fixed-sized (**64x128 pixel**) window at each position and scale
      2. Compute HOG (**histogram of gradient**) features within each window
      3. Score the window with a linear **SVM** classifier
      4. Perform **non-maxima suppression** to remove overlapping detections with lower scores

* Statistical Template Approach

  *  Strengths
    * Works very well for non-deformable objects with canonical orientations: faces, cars,  pedestrians
    * Fast detection
  * Weaknesses
    * Not so well for highly deformable objects or “stuff”
    * Not robust to occlusion
    *  Requires lots of training data

## 视频（动作追踪）

### 贝叶斯滤波器

* 在贝叶斯框架下，融合预测信息与有噪声的观测信息实现目标状态的估计称为贝叶斯滤波。其中，预测信息记录了目标状态的先验，观测信息表达了目标状态的似然。

* **状态**通常为位置、姿态、速度、加速度等；观测通常为位置、速度等可测量,但存在噪声。

* 基本步骤

  <img src="https://s2.loli.net/2022/09/11/B96alSsVdkDIRYE.png" alt="image-20220911145028703" style="zoom:67%;" />

* 假设

  ![image-20220911145523156](https://s2.loli.net/2022/09/11/NQzryJHSRu8APmX.png)

* 递推公式

  ![image-20220911150523440](https://s2.loli.net/2022/09/11/3QHshKIBglVzX8O.png)

### 卡曼滤波器

* 结构

  ![image-20220911151808123](https://s2.loli.net/2022/09/11/tHwWXSdzxgCPQcA.png)

* 略，有概率论。。。

### 粒子滤波器

* 太难了 以后再看 有概率论。。。

# 三维度量

## 相机

### 摄像机结构

* 结构

  <img src="https://s2.loli.net/2022/09/08/OW4yd1gfjbATXeG.png" alt="image-20220908190226930" style="zoom:67%;" />

* 随着光圈减小，成像效果如何变化？（越来越清晰、越来越暗）

* 径向畸变distortion :图像像素点以畸变中心为中心点,沿着径向产生的位置偏差,从而导致 图像中所成的像发生形变（枕形、桶形）

* 产生原因：光线在远离透镜中心的地方比靠近 中心的地方更加弯曲

* 并不是线性的变换有z 要转换
  $$
  P=(x, y, z) \rightarrow P^{\prime}=\left(\alpha \frac{x}{z}+c_{x}, \beta \frac{y}{z}+c_{y}\right)
  $$

* 欧式、齐次转换

  <img src="https://s2.loli.net/2022/09/08/j4BIf3u7T8v9kxS.png" alt="image-20220908191647221" style="zoom:67%;" />

* 多个齐次可以转成一个欧式 [2,2,2] [1,1,1] -> [1,1]

* 欧式到齐次只有一个

* 齐次坐标系中的投影变换

  <img src="https://s2.loli.net/2022/09/08/6gfqb9Dl7xdXVJ1.png" alt="image-20220908191843089" style="zoom:67%;" />

  考虑夹角

  <img src="https://s2.loli.net/2022/09/08/eMJmvjaHZEChUio.png" alt="image-20220908193608244" style="zoom:67%;" />

* 摄像机内参数矩阵，K有五个自由度

$$
K=\left[\begin{array}{ccc}
\alpha & -\alpha \cot \theta & c_{x} \\
0 & \frac{\beta}{\sin \theta} & c_{y} \\
0 & 0 & 1
\end{array}\right]
$$

* 世界坐标系

* 摄像机几何关系（$K$是相机制造内部参数，$[R, T]$ 是摄像机所处世界外部参数，$M$有5+6=11个自由度）
  $$
  P^{\prime}=K\left[\begin{array}{ll}
  I & 0
  \end{array}\right] P=K\left[\begin{array}{ll}
  I & 0
  \end{array}\right]\left[\begin{array}{cc}
  R & T \\
  0 & 1
  \end{array}\right] P_{w}=K\left[\begin{array}{ll}
  R & T
  \end{array}\right] P_{w}=M P_{w}
  $$

* 各种摄像机模型

  * 正交投影：摄像机中心到像平面的距离无限远时。更多应用在建筑设计(AUTOCAD）或者工业设计行业 
    $$
    \left\{\begin{array} { l } 
    { \mathrm { x } ^ { \prime } = \frac { f ^ { \prime } } { z } x } \\
    { y ^ { \prime } = \frac { f ^ { \prime } } { z } y }
    \end{array} \rightarrow \left\{\begin{array}{l}
    x^{\prime}=x \\
    y^{\prime}=y
    \end{array}\right.\right.
    $$

  * 弱透视投影（当相对场景深度小于其与相机的距离时 ）：在数学方面更简单 –当物体较小且较远时准确，常用于图像识别任务。

  * 透视投影：对于3D到2D映射的建模更为准确 –用于运动恢复结构或SLAM

  * 弱透视投影与透视投影摄像机对比

    <img src="https://s2.loli.net/2022/09/08/1NgtU5OQCoVjTSn.png" alt="image-20220908201936614" style="zoom:67%;" />

### 摄像机标定

* 目标：从1张或多张图像中估算内外参数，11个未知量，一张照片可以两个方程，至少要六张图，来自不同平面，解方程组求m即可

  ![image-20220908204102483](https://s2.loli.net/2022/09/08/2jHKcxgtrnC8sob.png)
  $$
  \begin{array}{l}
  u_{i}=\frac{m_{1} P_{i}}{m_{3} P_{i}} \rightarrow u_{i}\left(m_{3} P_{i}\right)=m_{1} P_{i} \rightarrow u_{i}\left(m_{3} P_{i}\right)-m_{1} P_{i}=0 \\
  v_{i}=\frac{m_{2} P_{i}}{m_{3} P_{i}} \rightarrow v_{i}\left(m_{3} P_{i}\right)=m_{2} P_{i} \rightarrow v_{i}\left(m_{3} P_{i}\right)-m_{2} P_{i}=0
  \end{array}
  $$
  <img src="https://s2.loli.net/2022/09/08/8RfCDWlUPjp9nBM.png" alt="image-20220908204002783" style="zoom:67%;" />

  <img src="https://s2.loli.net/2022/09/08/IKwS72jbrXmpEF6.png" alt="image-20220908204814936" style="zoom:67%;" />

  <img src="https://s2.loli.net/2022/09/08/8p5aUFiT1ILfGlv.png" alt="image-20220908205353629" style="zoom:67%;" />

  推导略

## 多视角几何

### 三个关键问题

* 摄像机几何：标定
* 场景几何：通过多幅图找到3d坐标
* 对应关系已知图像坐标p求另一图像的p'

### 三角化

* 已知𝑝和𝑝′，𝐾和𝐾′以及𝑅,𝑇，求解：𝑃点的三维坐标？

* 使用非线性解法

  <img src="https://s2.loli.net/2022/09/10/6hrEWS1PG5Cfa2w.png" alt="image-20220910164337623" style="zoom:67%;" />

### 极几何

* 极几何描述了同一场景或者物体的两个视点图像间的几何关系

* 对于问题“对应关系已知图像坐标p求另一图像的p'”，通过极几何约束，将搜索范围缩小到对应的极线上。

  ![image-20220910164904185](https://s2.loli.net/2022/09/10/ictDlU3enK5HbgB.png)

* **本质矩阵**：本质矩阵对规范化（𝐾 = 𝐾′已知且为规范化）摄像机拍摄的两个视点图像间的极几何关系进行代数描述

* <img src="https://s2.loli.net/2022/09/10/cBRDKtGVFNvu5Mf.png" alt="image-20220910171804114" style="zoom:67%;" />

* 叉乘的矩阵表示
  $$
  a \times b=\left[\begin{array}{ccc}
  0 & -a_{z} & a_{y} \\
  a_{z} & 0 & -a_{x} \\
  -a_{y} & a_{x} & 0
  \end{array}\right]\left[\begin{array}{l}
  b_{x} \\
  b_{y} \\
  b_{z}
  \end{array}\right]=\left[a_{\times}\right] b
  $$

* E为本质矩阵
  $$
  \begin{array}{c}
  E=T \times R=\left[T_{\times}\right] R \\
  p^{\prime T} E p = 0
  \end{array}
  $$
  

![image-20220910172754035](https://s2.loli.net/2022/09/10/NWvYOyeuBtz3xdU.png)

* **基础矩阵**：基础矩阵对**一般**的透视摄像机拍摄的两个视点的图像间的极几何关系进行代数描述，**需要变换到规范化摄像机** $𝑝_c$

  ![image-20220911084241239](https://s2.loli.net/2022/09/11/Sgt1WqGoEc7vxJs.png)

* F为基础矩阵
  $$
  \begin{array}{c}
  F = K^{\prime-T}\left[T_{\times}\right] RK^{-1} \\
  p^{\prime T} F p = 0
  \end{array}
  $$

![image-20220911085057183](https://s2.loli.net/2022/09/11/Ui3O956YHJfplkG.png)

* 如果已知 $𝐹$ ,无需场景信息以及摄像机内、外参数（他本身由参数构成），即可建立左右图像对应关系, $F$ **刻画了两幅图像的极几何关系,即相同场景在不同视图中的对应关系**

### 基础矩阵F估计（八点法）

* 使用八点算法，选取8组对应点，一般会选择更多点，超定

  <img src="https://s2.loli.net/2022/09/11/F5jq3oOU9fXPe6k.png" alt="image-20220911092601012" style="zoom:67%;" />

  <img src="https://s2.loli.net/2022/09/11/ebjDQ2EyYOSraVP.png" alt="image-20220911092955699" style="zoom:67%;" />

* 问题：$\widehat{F}$是不是我们要求的基础矩阵？ 回答：不是，基础矩阵的秩为2，$\widehat{F}$通常秩为3,即$\widehat{F}$满秩
* Frobenius 范数（F-范数）：矩阵中每项数的平方和的开方值
* ![image-20220911093410432](https://s2.loli.net/2022/09/11/PYG8gBuslrNQmj7.png)

* 问题：精度较低，W 中各个元素的数值差异过大、SVD分解有数值计算问题
* 改进：**归一化八点算法**
  * 对每幅图像施加变换 $T$ (平移与缩放)，让其满足如下条件
    * 原点 = 图像上点的重心
    * 各个像点到坐标原点的均方根距离等于 根号2(或者均方距离等于2)
  * 步骤
    1. 计算左右图的变换 $T$ 和 $T'$
    2. 坐标归一化 $q_{i}=T p_{i} \quad q_{i}^{\prime}=T^{\prime} p_{i}{ }^{\prime}$
    3. 计算矩阵 $F_q$
    4. 逆归一化 $F=T'^TF_qT$

## 运动恢复结构 

* Structure from Motion (sfm)

* 通过三维场景的多张图像，恢复出该场景的三维结构信息以及每张图片对应的摄像机参数

* 对比：sfm没有序列，slam通常有时间序列的顺序加快算法速度

* 问题描述

  <img src="https://s2.loli.net/2022/09/11/iZp6BJC8yeqKUmo.png" alt="image-20220911100327866" style="zoom:67%;" />

### 欧式结构恢复

* 摄像机内参数已知，外参数未知

* 问题描述

  <img src="https://s2.loli.net/2022/09/11/o2RrO1wmu7IJbBP.png" alt="image-20220911101441833" style="zoom:67%;" />

* **求解方法（两视图）**

  1. 找点对（SIFT、特征匹配、RANSAC ）

  2. 归一化八点法求解基础矩阵F

  3. 利用F与摄像机内参数求解本质矩阵E

  4. 分解本质矩阵获得R与T（核心问题）

  5. 三角化求解三维点$𝑋_𝑗$坐标
     $$
     X_{j}^{*}=\underset{X_{j}}{\operatorname{argmin}}\left(d\left(x_{1 j}, M_{1} X_{j}\right)+d\left(x_{2 j}, M_{2} X_{j}\right)\right)
     $$

* **核心问题：分解E为R和T**

  * 说明：无法确定𝐹的符号及尺度，−𝐹或者𝑘𝐹都满足上式；所以，也无法确定𝐸的符号及尺度

  <img src="https://s2.loli.net/2022/09/11/2lKg9QaHVB86kb4.png" alt="image-20220911102109352" style="zoom:67%;" />

  <img src="https://s2.loli.net/2022/09/11/s5cyFPugbrzGnHV.png" alt="image-20220911103601950" style="zoom:67%;" />

  <img src="https://s2.loli.net/2022/09/11/5xO9EJVkByZLm8s.png" alt="image-20220911104110687" style="zoom:67%;" />

  ps: **R是旋转矩阵**（Rotation matrix），旋转矩阵是在乘以一个向量的时候有改变向量的方向但不改变大小的效果并保持了手性的矩阵。

  <img src="https://s2.loli.net/2022/09/11/TUAMLNG5rteXsx7.png" alt="image-20220911104957603" style="zoom:67%;" />

* 步骤总结

  <img src="https://s2.loli.net/2022/09/11/ZMp9m26YEiGg3Xl.png" alt="image-20220911105100836" style="zoom:67%;" />

* 欧式结构恢复歧义

  * 需要其他先验信息，否则不能估计场景的绝对尺度
  * 恢复出来的欧式结构与真实场景之间相差一个相似变换（旋转，平移，缩放），需要一个重构称为度量重构

### 仿射结构恢复

* 摄像机为仿射相机（忽略距离较小的深度），内、外参数均未知

* 问题描述

  <img src="https://s2.loli.net/2022/09/11/4O3JcEdHToansVL.png" alt="image-20220911110704740" style="zoom:67%;" />

* 主要解法：**数据中心化+因式分解**

  * 中心化：减去图像点的质心，**当3D点的质心 ＝ 世界坐标系的中心，此时只和A有关**

    ![image-20220911111710940](https://s2.loli.net/2022/09/11/Wx7eQG92Fycw4jP.png)

  * 因式分解

    <img src="https://s2.loli.net/2022/09/11/9AFakcR3sYEodhb.png" alt="image-20220911111953328" style="zoom:67%;" />

    <img src="https://s2.loli.net/2022/09/11/kXl2C83hxsdRTwM.png" alt="image-20220911112112511" style="zoom:67%;" />

    <img src="https://s2.loli.net/2022/09/11/thV3iBZlE5KueHv.png" alt="image-20220911112507072" style="zoom:67%;" />

    <img src="https://s2.loli.net/2022/09/11/o8K5fdEgIpmiycU.png" alt="image-20220911112533510" style="zoom:67%;" />

* 步骤总结

  1. 计算中心

  2. 创建一个 2m x n 维的数据(测量值)矩阵D

  3. SVD分解矩阵，找最大的三个特征值，求出左上角留下的矩阵
     $$
     \begin{eqnarray}
     D & = & U_{3} W_{3} V_{3}^{T}\\
     M & = & U_{3} \\
     S & = & W_{3} V_{3}^{T}
     \end{eqnarray}
     $$

* 问题

  * 能不能 $D=U_{3} W_{3} V_{3}^{T}=\left(U_{3} W_{3}\right) V_{3}^{T}=M^{*} S^{*}$ ，行

  * 引出恢复歧义：解并不是唯一的，和结果差一个3x3矩阵，8个未知量

    <img src="https://s2.loli.net/2022/09/11/Uh6OoxHlkpZEyWD.png" alt="image-20220911113219884" style="zoom:67%;" />

  * 可以通过角度关系直角等进行部分，将仿射升级为欧式重构

### 透视结构恢复

* 摄像机为透视相机（精算各种深度细节），内、外参数均未知

* 问题描述

  ![image-20220911131125494](https://s2.loli.net/2022/09/11/gYZiJFcpA62TUQ8.png)

* 透视结构恢复歧义
  $$
  \begin{array}{c}
  x_{i j}=M_{i} X_{j}=\left(M_{i} H^{-1}\right)\left(H X_{j}\right)=M^{*} X^{*} \\
  M^{*} \quad X^{*}
  \end{array}
  $$

* 主要方法：在**相差一个4×4的可逆变换**的情况下恢复摄像机运动与场景结构

  * **代数方法（通过基础矩阵）**
  * 因式分解法(通过SVD)，难，复杂
  * **捆绑调整**

* **代数方法**

  * 主要步骤

    1. 归一化八点法求解基础矩阵 F

    2. **利用 F 估计摄像机矩阵M（重点）**
       $$
       \widetilde{M}_{1}=\left[\begin{array}{ll}
       I & 0
       \end{array}\right] \quad \widetilde{M}_{2}=\left[-\left[b_{\times}\right] F \quad b\right]
       $$

    3. 三角化计算三维点坐标

  * **利用 F 估计摄像机矩阵（两视图）**

    <img src="https://s2.loli.net/2022/09/11/5QjXflzVpE6Co3x.png" alt="image-20220911132640689" style="zoom:67%;" />

    ![image-20220911132648474](https://s2.loli.net/2022/09/11/E85KFJTn9aVDGmg.png)

    <img src="https://s2.loli.net/2022/09/11/KXHN1VJe7i5Pmlx.png" alt="image-20220911134835865" style="zoom:67%;" />

  * 多视图情况：增量法，有误差，代数法缺陷

* **捆绑调整（Bundle Adjustment）**

  * 选择原因

    * 因式分解法假定所有点都是可见的，所以下述场合（存在遮挡、建立对应点关系失败）的时候不可用
    * 代数法应用于2视图重建，易出现误差累积

  * 问题描述（非线性最小化问题）

    使用的最优化方法：牛顿法 与 列文伯格-马夸尔特法（L-M方法）

    <img src="https://s2.loli.net/2022/09/11/MrhSDg8Ri4Ckq9v.png" alt="image-20220911140206212" style="zoom:67%;" />

  * pro

    * 同时处理大量视图 
    * 处理丢失的数据

  * con

    * 大量参数的最小化问题
    * 需要良好的初始条件

  * 实际操作：常用作SFM的最后一步，分解或代 数方法可作为优化问题的初始解



























