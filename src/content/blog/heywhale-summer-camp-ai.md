---
title: 和鲸社区2022咸鱼打挺夏令营-机器学习原理与实践·闯关-作业答案与部分解析
publishedDate: 2022-07-20 09:58:17
tags: [机器学习]
category: 课外学习
---

# 第一关 - 逻辑回归

## 作业

* 作业1：逻辑回归的表达式：

  A: h(x)=wx+b

  B：h(x)=wx

  C: h(x)=sigmoid(wx+b)

  D: h(x)=sigmoid(wx)

* 作业2：下面关于逻辑回归的表述是正确的(多选)：

  A:逻辑回归的输出结果是概率值，在0-1之间

  B:使用正则化可以提高模型的泛化性

  C:逻辑回归可以直接用于多分类

  D:逻辑回归是无参模型

  E:逻辑回归的损失函数是交叉熵

* 作业3：计算 $y=sigmoid(w_1*x_1+w_2*x_2+1)$ 当 w=(0.2, 0.3)时，样本X=(1,1),y=1的时w1,w2的梯度和loss：(保存3位小数，四舍五入)

* 作业4：在cal_grad梯度函数的基础上加上L2正则化，下面的函数是否正确?(Y/N)

  ```python
  def cal_grad(y, t,x,w):
      """
      x:输入X
      y:样本y
      t:预测t
      w:参数w
      """
      grad = np.sum(t - y) / t.shape[0]
      return grad*x+2*w
  ```


## 答案

|      |  id  | answer |
| :--: | :--: | :----: |
|  0   |  a1  |   C    |
|  1   |  a2  |  ABE   |
|  2   |  a3  | -0.182 |
|  3   |  a4  | -0.182 |
|  4   |  a5  | 0.201  |
|  5   |  a6  |   Y    |

## 解析

t1代码

```python
import numpy as np

def sigmoid(x):
    return 1 / (1 + np.exp(-x))

def cal_grad(y, t):
    grad = np.sum(t - y)
    return grad

def cal_cross_loss(y, t):
    loss=np.sum(-y * np.log(t)- (1 - y) * np.log(1 - t))
    print(loss)
    return loss

def linearRegression(x):
    return sum([x[i]*w[i] for i in range(len(x))])+b

b=1
w=np.array([0.2,0.3])
x=np.array([1.0,1.0])

# linearRegression(x)
# sigmoid(linearRegression(x))
cal_grad(1,sigmoid(linearRegression(x)))

# 这里去掉了shape[0] 因为只有一组数据
```

# 第二关 - 朴素贝叶斯法

## 作业

* 1:假设A,B两个盒子球有无限个，已知从A盒子摸出红球和白球的概率为0.7和0.3，从B盒子中摸出的红球和白球的概率为0.5和0.5。从某一个盒子中摸了3次球，颜色依次为白，白，红。问是从A盒子中摸得的概率是多少？(保留4位小数)

* 2:贝叶斯推断最重要的假设是什么？

  A：独立性假设

  B：参数服从一个分布

* 3:贝叶斯估计与最大似然估计的区别是：(Y/N)

  贝叶斯假设参数服从一个分布,不是一个确定的值，而最大似然估计认为参数是一个值。

* 4:假设训练数据：确定 x=(2,S) 的结果，求出y的预测结果

  ```
  X=[["1","S"],["1","M"],["1","M"],["1","S"],["1","S"],\
     ["2","S"],["2","M"],["2","M"],["2","L"],["2","L"],\
     ["3","L"],["3","M"],["3","M"],["3","L"],["3","L"]]
  Y=[0,0,1,1,0,0,0,1,1,1,1,1,1,1,0]
  ```

* 5:第四题中，当使用拉普拉斯平滑，即λ=1，求y的预测结果

## 答案

|      |  id  | answer |
| :--: | :--: | :----: |
|  0   |  a1  | 0.3351 |
|  1   |  a2  |   A    |
|  2   |  a3  |   Y    |
|  3   |  a4  |   0    |
|  4   |  a5  |   0    |

## 解析

t1解法

```
p（1|白白红）= p（白白红，1）/p（白白红）
           = p（白白红|1）*p（1）/=（p（白白红|1）*p（1）+p（白白红|2）*p（2））
           = 0.3*0.3*0.7*0.5/（0.3*0.3*0.7*0.5+0.5*0.5*0.5*0.5）
           = 0.335106383						
```

t4解法：看统计学习方法，原题

题目讲解来源：[【合集】十分钟 机器学习 系列视频 《统计学习方法》](https://www.bilibili.com/video/BV1No4y1o7ac?p=28)

<img src="https://s2.loli.net/2022/07/20/SULNporbnwjEkOd.png" alt="image.png" style="zoom: 67%;" />

t5看公式
$$
P(Y=c_k)=\frac{\sum_{i=1}^K{I(y_i=c_k)+\lambda}}{N+K\lambda}
$$

当$\lambda$等于1的时候，称之为拉普拉斯平滑。

p（y=1）=（9+1）/（15+2）

p（y=0）=（6+1）/（15+2）

# 第三关 - K近邻算法

## 作业

* 1：请你回顾下KNN算法的三要素：

* 2：改写一下函数使其可以应用于KNN的回归预测,回归预测的loss为平方差

  ```python
  def predict(self, train_x, y, test, k):
      """
      返回根据KNN预测的结果
      :param train_x: 训练集x
      :param y: 训练集y
      :param test: 预测集
      :return: 返回test预测的结果
      """
      dis = self.euclidean_dis(test, train_x)
      k_neighbor = np.argsort(dis, axis=1)[:, :k]
      k_neighbor_value = y[k_neighbor]
      n = test.shape[0]  # 预测结果的个数
      pred = np.zeros(n)
      for i in range(n):
          pred[i] = np.argmax(np.bincount(k_neighbor_value[i])) ##改写1
      return pred
  
  
  def KFlod(self, k):
      folds = StratifiedKFold(n_splits=5, shuffle=True, random_state=1996)
      oof = np.zeros(self.train_x.shape[0])
      for fold_, (train_index, test_index) in enumerate(folds.split(self.train_x, self.train_y)):
          train_x, test_x, train_y, test_y = self.train_x[train_index], self.train_x[test_index], \
                                             self.train_y[
                                                 train_index], self.train_y[test_index]
          pred = self.predict(train_x, train_y, test_x, k)
          oof[test_index] = pred
      return np.sum(oof == self.train_y)                     #改写2
  ```

  下面那个改写是正确的：

  A：pred[i]=np.sum(k_neighbor_value[i]),np.sum(oof - self.train_y)

  B: pred[i]=np.mean(k_neighbor_value[i]),np.sum(oof - self.train_y)

  C：pred[i]=np.sum(k_neighbor_value[i]),np.sum((oof - self.train_y)**2)

  D: pred[i]=np.mean(k_neighbor_value[i]),np.sum((oof - self.train_y)**2)

* 3:使用全部iris数据，选取中最优的K值，并且计算此时分类正确的个数

## 答案

|      |  id  |  answer  |
| :--: | :--: | :------: |
|  0   |  a1  |   K值    |
|  1   |  a2  | 度量距离 |
|  2   |  a3  | 决策规则 |
|  3   |  a4  |    D     |
|  4   |  a5  |    13    |
|  5   |  a6  |   146    |

## 解析

t3代码

```python
import numpy as np
from sklearn import datasets
from sklearn.model_selection import train_test_split
from sklearn.model_selection import StratifiedKFold

X = datasets.load_iris()['data']
Y = datasets.load_iris()['target']
X_train, X_test, y_train, y_test = train_test_split(X, Y, test_size=0.4, stratify=Y,random_state=100)
X_test = datasets.load_iris()['data']
y_test = datasets.load_iris()['target']

class KNN:
    def __init__(self, train_x, train_y, test_x, test_y):
        """
        KNN初始话
        :param train_x:训练集X
        :param train_y: 训练集Y
        :param test_x: 预测集X
        :param test_y: 预测集Y
        """
        self.train_x = train_x
        self.train_y = train_y
        self.test_x = test_x
        self.test_y = test_y
        self.k = None

    def euclidean_dis(self, x1, x2):
        """
        返回x1与x2的距离(x1,x2均为二维矩阵).x1.shape=(N1*M),x2.shape=(N2*M2),返回结果为(N1*N2)
        :param x1:
        :param x2:
        :return:
        """
        n1, m1 = x1.shape
        n2, m2 = x2.shape
        if m1 != m2:
            raise ("两个向量维度不相等")
        x1x2 = np.dot(x1, x2.T)  # (n1,n2)
        y1 = np.repeat(np.reshape(np.sum(np.multiply(x1, x1), axis=1), (n1, 1)), repeats=n2, axis=1)
        y2 = np.repeat(np.reshape(np.sum(np.multiply(x2, x2), axis=1), (n2, 1)), repeats=n1, axis=1).T
        dis = y1 + y2 - 2 * x1x2
        return dis

    def predict(self, train_x, y, test, k):
        """
        返回根据KNN预测的结果
        :param train_x: 训练集x
        :param y: 训练集y
        :param test: 预测集
        :return: 返回test预测的结果
        """
        dis = self.euclidean_dis(test, train_x)
        k_neighbor = np.argsort(dis, axis=1)[:, :k]
        k_neighbor_value = y[k_neighbor]
        n = test.shape[0]  # 预测结果的个数
        pred = np.zeros(n)
        for i in range(n):
            pred[i] = np.argmax(np.bincount(k_neighbor_value[i]))
        return pred

    def KFlod(self, k):
        folds = StratifiedKFold(n_splits=5, shuffle=True, random_state=1996)
        oof = np.zeros(self.train_x.shape[0])
        for fold_, (train_index, test_index) in enumerate(folds.split(self.train_x, self.train_y)):
            train_x, test_x, train_y, test_y = self.train_x[train_index], self.train_x[test_index], \
                                               self.train_y[
                                                   train_index], self.train_y[test_index]
            pred = self.predict(train_x, train_y, test_x, k)
            oof[test_index] = pred
        return np.sum(oof == self.train_y)

    def selectK(self):
        ks = [2,3, 4, 5, 6,7,8,9,10,11,12,13,14,15]
        value = 0
        for k in ks:
            value_tem = self.KFlod(k)
            print("当前K的值为：", k, "预测得分为：", value_tem)
            if value_tem > value:
                self.k = k
                value = value_tem

    def trainAndPredic(self):
        self.selectK()
        print("选择的k为：", self.k)
        preds = self.predict(self.train_x, self.train_y, self.test_x, self.k)
        print("预测结果的正确个数为:", np.sum(preds == self.test_y))
        print("预测结果的错误个数为:", np.sum(preds != self.test_y))


model = KNN(X_train, y_train, X_test, y_test)
model.trainAndPredic()

"""
当前K的值为： 2 预测得分为： 89
当前K的值为： 3 预测得分为： 89
当前K的值为： 4 预测得分为： 89
当前K的值为： 5 预测得分为： 89
当前K的值为： 6 预测得分为： 88
当前K的值为： 7 预测得分为： 89
当前K的值为： 8 预测得分为： 89
当前K的值为： 9 预测得分为： 89
当前K的值为： 10 预测得分为： 89
当前K的值为： 11 预测得分为： 89
当前K的值为： 12 预测得分为： 89
当前K的值为： 13 预测得分为： 90
当前K的值为： 14 预测得分为： 88
当前K的值为： 15 预测得分为： 89
选择的k为： 13
预测结果的正确个数为: 146
预测结果的错误个数为: 4
"""
```

# 第四关 - K-means算法

## 题目

数据准备

```
import numpy as np
from sklearn import datasets
from sklearn.model_selection import train_test_split
X=datasets.load_iris()['data']
Y=datasets.load_iris()['target']
```

- 1.对样本X进行归一化(均值方差归一化)，输出并且将归一化的结果的第一行(**将输出的list转化为string,用逗号(,)连接，四舍五入保留3位小数，注意不能有空格**)
- 2:计算上一步**归一化之后**样本中第一个样本与最后一个样本的欧式距离（四舍五入3位小数）。
- 3：根据数据中已有的类别(Y就是类别)，分别计算类别0，类别1，类别2的中心点(不归一化)：(**将输出的list转化为string,用逗号(,)连接，四舍五入保留1位小数，不能有空格**)

## 答案

|      |  id  |           answer           |
| :--: | :--: | :------------------------: |
|  0   |  a1  | -0.901,1.019,-1.340,-1.315 |
|  1   |  a2  |           3.335            |
|  2   |  a3  |      5.0,3.4,1.5,0.2       |
|  3   |  a4  |      5.9,2.8,4.3,1.3       |
|  4   |  a5  |      6.6,3.0,5.6,2.0       |

## 解析

题目1

```
x_mean = np.mean(X, axis=0)
length = len(X)
x_std =  sum((X-x_mean)**2)/length
X1 = (X-x_mean)/np.sqrt(x_std)
X1[0]
```

题目2

```
np.sqrt(sum((X1[0]-X1[-1])**2))
```

题目3（不要看错题目认为是根据kmeans计算得到聚类中心点，而是根据已有标签计算中心点）

```
pos = []
pos.append(np.mean(X[Y==0],axis=0))
pos.append(np.mean(X[Y==1],axis=0))
pos.append(np.mean(X[Y==2],axis=0))
for i in pos:
    for j in i:
        print('{:.1f}'.format(j),end=',')
    print("")
```

# 第五关 - 线性判别器LDA

## 题目

-  1：在2.2(扩展到多分类)中说到，"两种计算方式的结果是成比例的"，请你计算一下使用我们代码中计算方法和采用另外一种方法计算两者之间的比例。$S_B1$为我给出代码中的计算方法，$S_B2$为$S_b=\sum_{i,j|i\neq j}[(u_i-u_j)(u_i-u_j)^T]$，直接给出$S_B1$与$S_B2$之间的比例。

- 2：下面关于线性判别器的理解正确的是？（不定项）

  A：线性判别器是一个分类器

  B：线性判别器是一个无监督模型

  C:线性判别器是一个降维方法

  D:线性判别器可以降低至任意维度

## 答案

|      |  id  | answer |
| :--: | :--: | :----: |
|  0   |  a1  |  8.33  |
|  1   |  a2  |   C    |

## 解析

t1代码

```python
import numpy as np
from sklearn import datasets

from sklearn.datasets import make_blobs
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split

X = datasets.load_iris()['data']
Y = datasets.load_iris()['target']


class LDA:
    def __init__(self, k_after):
        """
        x:         样本x
        y:         样本y
        n_i：      第i类样本的个数
        u_i：      第i类样本均值,格式为{i:[]}
        n_label：  样本的类别
        k_after:   降维后的维度
        k_before:  降维前的维度]
        labels:    不同的类别，比如[1,2,3]
        """
        self.n_i = {}
        self.u_i = {}
        self.k_after = k_after
        self.k_before = X.shape[0]
        self.labels = None
        self.sigmas = {}
        self.S = None  # S_w
        self.B = None  # S_b
        self.w = None

    def fit(self, X, y):
        self.n = len(np.unique(y))
        self.n_label = len(set(y))
        labels = np.unique(y)
        self.labels = labels
        N = X.shape[0]  # 样本的个数
        means = []

        for label in labels:
            tmp = np.mean(X[y == label], axis=0)  ##第i类的平均u_i

            means.append(tmp)
            self.u_i[label] = tmp  ##记录第i类样本的均值
            self.n_i[label] = len(X[y == label])   #记录第i类样本的个数

        if len(labels) == 2:
            tmp = (means[0] - means[1])
            tmp = tmp.reshape(-1, 1)  # 转化为(k_before,1)维度的列向量
            B = np.dot(tmp, tmp.T)  # (u[0]-u[1])(u[0]-u[1])^T
        else:
            mean_all = np.mean(X, axis=0)
            B = np.zeros((X.shape[1], X.shape[1]))
            for label in self.u_i:
                n_i = self.n_i[label]
                tmp = self.u_i[label] - mean_all
                tmp = tmp.reshape(-1, 1)
                B += n_i * np.dot(tmp, tmp.T)
            print('Sb1=',B)

            Sb2 = np.zeros((X.shape[1], X.shape[1]))
            for i in range(len(self.u_i)):
                for j in range(len(self.u_i)):
                    if i != j:
                        tmp = self.u_i[i] - self.u_i[j]
                        tmp = tmp.reshape(-1, 1)
                        Sb2 += np.dot(tmp, tmp.T)
            print('Sb2=',Sb2)

            print('Sb1/Sb2=',B/Sb2)

        S = np.zeros((X.shape[1], X.shape[1]))
        for label in self.u_i:
            u_i = self.u_i[label]
            for row in X[y == label]:
                tmp = (row - u_i)
                tmp = tmp.reshape(-1, 1)
                S += np.dot(tmp, tmp.T)
        self.S = S
        


        

        S_inv = np.linalg.inv(S)  # 矩阵S_w的逆
        S_inv_B = S_inv @ B  # S_w*B
        diag, p = np.linalg.eig(S_inv_B)  ## 特征值，特征向量

        ind = diag.argsort()[::-1]  ##按照特征值大小排序
        diag = diag[ind]
        w = p[:, ind]  # 按照特征值大小将特征向量排序
        self.w = w[:, :self.k_after]

    def predict(self, x):
        x = np.asarray(x)
        return np.dot(x, self.w)


model = LDA(2)
model.fit(X, Y)
X2=model.predict(X)

"""
Sb1= [[ 63.21213333 -19.95266667 165.2484      71.27933333]
 [-19.95266667  11.34493333 -57.2396     -22.93266667]
 [165.2484     -57.2396     437.1028     186.774     ]
 [ 71.27933333 -22.93266667 186.774       80.41333333]]
 
Sb2= [[ 7.585456 -2.39432  19.829808  8.55352 ]
 [-2.39432   1.361392 -6.868752 -2.75192 ]
 [19.829808 -6.868752 52.452336 22.41288 ]
 [ 8.55352  -2.75192  22.41288   9.6496  ]]
 
Sb1/Sb2= [[8.33333333 8.33333333 8.33333333 8.33333333]
 [8.33333333 8.33333333 8.33333333 8.33333333]
 [8.33333333 8.33333333 8.33333333 8.33333333]
 [8.33333333 8.33333333 8.33333333 8.33333333]]
"""
```

# 第六关 - 支持向量机

## 题目

* 1：下面逻辑回归与支持向量机的对比正确的是：（多选，注意大写）

  A：逻辑回归速度比SVM更快

  B：SVM和逻辑回归一样，任何样本都会对最终情况产生影响

  C：都不能**直接**进行多分类

  D：逻辑回归输出概率，SVM直接输出类别

  E：两者的目标函数不同，逻辑回归是交叉熵，SVM是Hinge Loss

* 2：关于选取最大分离面下面说法是否正确？(Y/N)

  回答：理论上来说，分离超平面有无数个，但是最大分离面只有一个。此外，使用最大间隔分离面对未知的样本有更好的泛化能力。

* 3：下面关于核函数的介绍正确的是？（多选，注意大写）

  A：提升SVM的非线性拟合能力

  B：可以提升SVM模型的准确度

  C：能够使得模型训练速度变快

  D：降低模型过拟合的风险

## 答案

|      |  id  | answer |
| :--: | :--: | :----: |
|  0   |  a1  |  ACDE  |
|  1   |  a2  |   Y    |
|  2   |  a3  |   AB   |

# 第七关 - 决策树

## 题目

* 1：写出文中介绍的三种分类算法(按照介绍的顺序)

* 2：计算下面数据的熵与Gini指数（保留3位小数，四舍五入）

  ```python
  import pandas as pd
  data_path=r"/home/mw/input/data2794"
  data = pd.read_csv(r"/home/mw/input/data2794/西瓜数据集.csv")    
  ```

## 答案

|      |  id  |   answer   |
| :--: | :--: | :--------: |
|  0   |  a1  |  信息增益  |
|  1   |  a2  | 信息增益比 |
|  2   |  a3  |  Gini指数  |
|  3   |  a4  |   0.998    |
|  4   |  a5  |   0.498    |

## 解析

t2代码

```python
import pandas as pd
from math import log
def calShanEnt(dataset,col):
    tarset=set(dataset[col])
    res=0
    for i in tarset:
        pi=np.sum(dataset[col] == i)/len(dataset)
        res=res-pi* log(pi, 2)
    return res

calShanEnt(data,"target")

def Gini(dataset,col):
    tarset = set(dataset[col])
    gini=1
    for i in tarset:
        gini=gini-(np.sum(dataset[col] == i)/len(dataset))**2
    return gini

Gini(data,"target")
```

# 第八关 - 基于xgboost的分类预测

## 题目

* 1：xgb与GBDT在损失函数上的区别(多选)

  A：正则化

  B：二阶残差

  C：一阶残差

* 2：计算函数 f=x3+x2 在x=0.5处的二阶梯度

* 3：下面哪些方式可以提升xgb模型的准确度（多选）

  A：更多的数据

  B：更好的特征工程

  C：减少树的深度

  D：增加学习率

* 4：令x=x_train[:1]，使用上面的sklearn包装的xgb模型预测x所对应得target值(输出target为1概率，保留4位小数)

## 答案

|      |  id  | answer |
| :--: | :--: | :----: |
|  0   |  a1  |   AB   |
|  1   |  a2  |   5    |
|  2   |  a3  |  ABCD  |
|  3   |  a4  | 0.0307 |

## 解析

t4代码

```python
import numpy as np
from sklearn import datasets
import pandas as pd
from sklearn.model_selection import train_test_split
X=datasets.load_breast_cancer()['data']
Y=datasets.load_breast_cancer()['target']
fea=datasets.load_breast_cancer()['feature_names']

data=pd.DataFrame(X,columns=fea)
data['target']=Y
x_train=data[fea]
y_train=data['target']
data['target'].value_counts()
from sklearn.model_selection import KFold,StratifiedKFold
import xgboost as xgb
import datetime
import sklearn
folds = KFold(n_splits=5, shuffle=True, random_state=1996)
params = {
    'learning_rate': 0.05,
    'max_depth': 8,  
    'eval_metric': 'auc',
    'objective': 'binary:logistic',
}
import warnings 
warnings.filterwarnings('ignore')
oof=np.zeros(x_train.shape[0]) 
for fold_, (train_index, test_index) in enumerate(folds.split(x_train, y_train)):
    print("第{}折".format(fold_))
    
    train_x, test_x, train_y, test_y = x_train.iloc[train_index], x_train.iloc[test_index], y_train.iloc[train_index], y_train.iloc[test_index]   

    model=xgb.XGBClassifier(objective="binary:logistic",booster="gbtree"
                ,max_depth=6, learning_rate=0.05, n_estimators=1000,
                  n_jobs=1, gamma=1,
#                  min_child_weight=1, subsample=0.9,
#                  colsample_bytree=0.9, 
#                  colsample_bynode=0.85, reg_alpha=1, reg_lambda=1,
                 scale_pos_weight=5, random_state=2022)
    model.fit(train_x,train_y,sample_weight=None,eval_set=[(train_x,train_y),(test_x,test_y)],eval_metric="auc",early_stopping_rounds=50,verbose=20,)
    val_train=model.predict_proba(test_x)[:,1]
    oof[test_index]=val_train
print("最终auc为：",sklearn.metrics.roc_auc_score(y_train,oof))

x=x_train[:1]
model.predict_proba(x)

"""
...
最终auc为： 0.9810461920617303
array([[0.9692602 , 0.03073976]], dtype=float32)
"""
```

# **关卡9 基于LightGBM的数据实践** 

* 1：下面哪些是lgb相对于xgb的优化点？

  A：使用了二阶残差

  B：使用了直方图进行加速计算

  C：可以支持类别特征处理

  D：使用了单边梯度采样减少计算样本

  E：使用了互斥捆绑算法进行特征组合减少了特征数量

  F：使用了带深度限制的 Leaf-wise 算法避免了无效的树生长

* 2：假设叶节点的数量相同，xgb的深度一定会比lgb的深度大？(Y/N)

* 3：下面关于lgb与随机森林的说法正确的是（多选）？

  A：lgb和随机森林都是由多颗决策树组成

  B：Lgb和随机森林的树都是可以并行生成的

  C：随机森林的决策树可以是回归树也可以是分类树，lgb只能是回归树

  D：随机森林主要是通过减低方差提高模型的泛化能力，lgb是降低偏差提高模型的拟合能力

## 答案

|      |  id  | answer |
| :--: | :--: | :----: |
|  0   |  a1  | BCDEF  |
|  1   |  a2  |   N    |
|  2   |  a3  |  ACD   |

# **关卡10 BP神经网络**

## 题目

* 1：BP神经网络过拟合时可以通过哪些方法来改进

  A：减少网络深度

  B：减少神经元的数量

  C：增加dropout

  D：增加数据量

* 2：当进行回归预测时，计算输出层的loss和回传梯度

  t=np.array([[0.00324988]
  [0.01669568]
  [0.01676606]
  [0.97652019]])

  y=np.array([[0],[0],[0],[1]])

  提交结果格式为：0.3,0.2,0.2,0.4,0.5
  前四个数字为梯度，第五个为loss，**保留5位小数(四舍五入，请注意不要有空格)**

* 以上面的神经网络为例，请问一下总共的参数数量为多少？答案为整数

* 使用上面的神经网络预测test=[[0.3,0.4],[1,2]]的类别。输出结果为(两个结果直接相连，比如提交01，11，10等)

## 答案

|      |  id  |                  answer                  |
| :--: | :--: | :--------------------------------------: |
|  0   |  a1  |                   ABCD                   |
|  1   |  a2  | 0.00325,0.01670,0.01677,-0.02348,0.01519 |
|  2   |  a3  |                    17                    |
|  3   |  a4  |                    01                    |

## 解析

t2代码

```python
def cal_grad(y, t):
    grad = t - y
    return grad

t=np.array([[0.00324988],[0.01669568],[0.01676606],[0.97652019]])
y=np.array([[0],[0],[0],[1]])
cal_grad(y,t)

"""
array([[ 0.00324988],
       [ 0.01669568],
       [ 0.01676606],
       [-0.02347981]])
"""

def cal_cross_loss(y, t):
    loss=np.sum(-y * np.log(t)- (1 - y) * np.log(1 - t))/t.shape[0]
    return loss


cal_cross_loss(y,t)

"""
0.015189962638228426
"""
```

t3

包括w和b

一层2->4  2*4+4=12

一层4->1  4*1+1=5

12+5=17个

t4代码

```python
import numpy as np
X = np.array([[0.3,0.4],[1,2]])
y=np.array([[0],[1]])
net=Net()
net.__init__(2,4,1,0.1)
net.trian(X,y)

"""
[[0.3 0.4]
 [1.  2. ]]
[[0]
 [1]]
[[0.02215638]
 [0.98925725]]
"""
```

模型

```python
class FC:
    def init(self, in_num, out_num, lr=0.01):
        self._in_num = in_num
        self._out_num = out_num
        self.w = np.random.rand(in_num, out_num)  # 生成out行，in列矩阵

        self.b = np.zeros(out_num)
        self.lr = lr

    def _sigmoid(self, in_data):
        return 1 / (1 + np.exp(-in_data))

    def forward(self, in_data):
        self.z = np.dot(in_data, self.w, ) + self.b
        self.top_val = self._sigmoid(self.z)
        self.bottom_val = in_data
        return self.top_val

    def backward(self, loss):
        residual_z = loss * self.top_val * (1 - self.top_val)

        grad_w = np.dot(self.bottom_val.T, residual_z)
        grad_b = np.sum(residual_z)

        self.w -= self.lr * grad_w
        self.b -= self.lr * grad_b
        residual_x = np.dot(residual_z,self.w.T)
        return residual_x
        
        
class Net:
    def __init__(self, input_num=2, hidden_num=4, out_num=1, lr=0.05):
        self.fc1 = FC()
        self.fc1.init(input_num, hidden_num, lr) 2-4
        self.fc2 = FC()
        self.fc2.init(hidden_num, out_num, lr)  4-1
        self.loss = Loss()

    def trian(self, x, y):
        for i in range(1000): 
            layer1out = self.fc1.forward(x)#2-4 1 12
            layer2out = self.fc2.forward(layer1out)#4-1 
            loss = self.loss.forward(y, layer2out)
            delta2 = self.loss.backward()
            delta1 = self.fc2.backward(delta2)  17 
            saliency = self.fc1.backward(delta1)
        layer1out = self.fc1.forward(X)
        layer2out = self.fc2.forward(layer1out)
        print(X)
        print(y)
        print(layer2out)

net=Net()
net.__init__(2,4,1,0.1)
net.trian(X,y)
```

# 大作业：疾病预测

## 使用欠采样处理正负样本不能不均衡（0.816）

```
## 直接导入之前已经处理好的数据
import pandas as pd
import re
mydata=pd.read_csv('/home/mw/input/MLearn9130/训练营.csv')
mytest=pd.read_csv('/home/mw/input/MLearn9130/测试集.csv')
## 分离训练集和验证集
from sklearn.model_selection import train_test_split

## 原始列名列表
col_names=list(mydata.columns)
col=[]
for i in range(len(col_names)):
    if re.findall(r"\u2028(.+)",col_names[i])!=[]:
        col.append(re.findall(r"\u2028(.+)",col_names[i])[0])
    elif re.findall(r"\n(.+)",col_names[i])!=[]:
        col.append(re.findall(r"\n(.+)",col_names[i])[0])
    else:
        col.append(col_names[i])

col_names1=list(mytest.columns)
col1=[]
for i in range(len(col_names1)):
    if re.findall(r"\u2028(.+)",col_names1[i])!=[]:
        col1.append(re.findall(r"\u2028(.+)",col_names1[i])[0])
    elif re.findall(r"\n(.+)",col_names1[i])!=[]:
        col1.append(re.findall(r"\n(.+)",col_names1[i])[0])
    else:
        col1.append(col_names1[i])

## 修改dataframe列名
mydata.columns=col
mytest.columns=col1


## 对性别进行编码
def gender(x):
    if x=='M':
        return 0
    else:
        return 1

## 对区域进行编码
def district(x):
    if x=='east':
        return 1
    elif x=='south':
        return 2
    elif x=='north':
        return 3
    else:
        return 4

## 对护理来源进行编码
def care(x):
    if x=='Governament Hospital':
        return 1
    if x=='Never Counsulted':
        return 2
    if x=='Private Hospital' or x==' ':
        return 3
    if x=='clinic':
        return 4
        
mydata['性别']=mydata['性别'].apply(gender)
mydata['区域']=mydata['区域'].apply(district)
mydata['护理来源']=mydata['护理来源'].apply(care)

mytest['性别']=mytest['性别'].apply(gender)
mytest['区域']=mytest['区域'].apply(district)
mytest['护理来源']=mytest['护理来源'].apply(care)


## 对于数值型变量的缺失值用中位数进行填充
feature1 = ['最低血压','腰围','最高血压','体重指数','肥胖腰围','身高','体重','好胆固醇','总胆固醇','坏胆固醇']
for i in feature1:
    mydata[i] = mydata[i].fillna(mydata[i].median())
    mytest[i] = mytest[i].fillna(mytest[i].median())
## 对于分类型变量的缺失值用众数进行填充
feature2 = ['收入','未婚','视力不佳','高血压','慢性疲劳','肝炎','教育','糖尿病','家族肝炎','体育活动']
for i in feature2:
    mydata[i] = mydata[i].fillna(mydata[i].mode()[0])
    mytest[i] = mytest[i].fillna(mytest[i].mode()[0])
    
    
cut = []
for i in range(len(mydata['ALF'])):
    if mydata['ALF'][i] == 0:
        r = random.random()
        if r > 0.1:
            cut.append(i)
mydata = mydata.drop(cut)



## 导入需要的库
import xgboost as xgb
import numpy as np
from sklearn import datasets
from sklearn.metrics import accuracy_score

X = mydata.drop(['ALF',"id"], axis=1) 
# X = mydata.drop(['ALF'], axis=1) 
y = mydata['ALF'] 
X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.3, stratify=y)


import lightgbm as lgb

clf7 = lgb.LGBMClassifier(
    max_depth=3,
    n_estimators=2000,
    n_jobs=-1,
    verbose=-1,
    learning_rate=0.1,
)
clf7.fit(X_train, y_train, eval_set=[(X_val,y_val)], callbacks=[lgb.early_stopping(50)])
val_y_predict = clf7.predict(X_val)

roc_auc_score(y_val, val_y_predict) #使用sklearn进行比较正确率


mytest['ALF']=0
X_test = mytest.drop(['ALF',"id"], axis=1) 
y_test= mytest['ALF'] 
val_preds = clf7.predict(X_test)
result_list = []
for i in range(len(val_preds)):
    userid = mytest['id'][i]
    ALF = val_preds[i]
    line=[userid,ALF]
    result_list.append(line)
print(result_list[:20])
df = pd.DataFrame(result_list, columns=['id','ALF'])
df.to_csv('0721-1329.csv', index=False)
```

<img src="https://s2.loli.net/2022/07/21/v3JhKGwuZT45QCi.png" alt="image-20220721134700727" style="zoom: 80%;" />

## 使用欠采样、模拟voting（0.834）

```python
## 直接导入之前已经处理好的数据
import pandas as pd
import re
mydata=pd.read_csv('/home/mw/input/MLearn9130/训练营.csv')
mytest=pd.read_csv('/home/mw/input/MLearn9130/测试集.csv')
## 分离训练集和验证集
from sklearn.model_selection import train_test_split

## 原始列名列表
col_names=list(mydata.columns)
col=[]
for i in range(len(col_names)):
    if re.findall(r"\u2028(.+)",col_names[i])!=[]:
        col.append(re.findall(r"\u2028(.+)",col_names[i])[0])
    elif re.findall(r"\n(.+)",col_names[i])!=[]:
        col.append(re.findall(r"\n(.+)",col_names[i])[0])
    else:
        col.append(col_names[i])

col_names1=list(mytest.columns)
col1=[]
for i in range(len(col_names1)):
    if re.findall(r"\u2028(.+)",col_names1[i])!=[]:
        col1.append(re.findall(r"\u2028(.+)",col_names1[i])[0])
    elif re.findall(r"\n(.+)",col_names1[i])!=[]:
        col1.append(re.findall(r"\n(.+)",col_names1[i])[0])
    else:
        col1.append(col_names1[i])

## 修改dataframe列名
mydata.columns=col
mytest.columns=col1


## 对性别进行编码
def gender(x):
    if x=='M':
        return 0
    else:
        return 1

## 对区域进行编码
def district(x):
    if x=='east':
        return 1
    elif x=='south':
        return 2
    elif x=='north':
        return 3
    else:
        return 4

## 对护理来源进行编码
def care(x):
    if x=='Governament Hospital':
        return 1
    if x=='Never Counsulted':
        return 2
    if x=='Private Hospital' or x==' ':
        return 3
    if x=='clinic':
        return 4
        
mydata['性别']=mydata['性别'].apply(gender)
mydata['区域']=mydata['区域'].apply(district)
mydata['护理来源']=mydata['护理来源'].apply(care)

mytest['性别']=mytest['性别'].apply(gender)
mytest['区域']=mytest['区域'].apply(district)
mytest['护理来源']=mytest['护理来源'].apply(care)


## 对于数值型变量的缺失值用中位数进行填充
feature1 = ['最低血压','腰围','最高血压','体重指数','肥胖腰围','身高','体重','好胆固醇','总胆固醇','坏胆固醇']
for i in feature1:
    mydata[i] = mydata[i].fillna(mydata[i].median())
    mytest[i] = mytest[i].fillna(mytest[i].median())
## 对于分类型变量的缺失值用众数进行填充
feature2 = ['收入','未婚','视力不佳','高血压','慢性疲劳','肝炎','教育','糖尿病','家族肝炎','体育活动']
for i in feature2:
    mydata[i] = mydata[i].fillna(mydata[i].mode()[0])
    mytest[i] = mytest[i].fillna(mytest[i].mode()[0])
    
    
import random
print("111", len(mydata[mydata['ALF'] == 0.0]))
print("111", len(mydata[mydata['ALF'] == 1.0]))
mydata_list = [[] for i in range(10)]
cnt = 0

for i in range(len(mydata)):
    if mydata['ALF'][i] == 0:
        mydata_list[cnt%10].append(mydata.iloc[i].tolist())
        cnt += 1
    else:
        for j in range(10):
            mydata_list[j].append(mydata.iloc[i].tolist())
for i in range(10):
    mydata_list[i] = pd.DataFrame(mydata_list[i], columns = list(mydata.columns))
    print(len(mydata_list[i]))

"""

111 3880
111 320
708
708
708
708
708
708
708
708
708
708
"""



## 导入需要的库
import xgboost as xgb
import numpy as np
import lightgbm as lgb
from sklearn.metrics import roc_auc_score
score = []
clf_list = []
for part_data in mydata_list:
    X = part_data.drop(['ALF',"id"], axis=1) 
    y = part_data['ALF'] 
    X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.3, stratify=y)

    clf = lgb.LGBMClassifier(
        max_depth=3,
        n_estimators=2000,
        n_jobs=-1,
        verbose=-1,
        learning_rate=0.15
    )
    clf.fit(X_train, y_train, eval_set=[(X_val,y_val)], callbacks=[lgb.early_stopping(20)])

    
    val_y_predict = clf.predict(X_val)

    this_score = roc_auc_score(y_val, val_y_predict)
    print(this_score)
    score.append(this_score) #使用sklearn进行比较正确率
    clf_list.append(clf)

    
score
"""
[0.7685630341880343,
 0.7553418803418803,
 0.8179754273504273,
 0.813167735042735,
 0.8202457264957264,
 0.7728365384615385,
 0.7799145299145299,
 0.8051549145299145,
 0.8050213675213675,
 0.8012820512820513]
"""

score_edit = [ i/sum(score) for i in score]
score_edit
"""
[0.0968024087063296,
 0.09513717178853173,
 0.10302602142941246,
 0.10242048073203143,
 0.10331197120317571,
 0.09734066710400163,
 0.09823215757514593,
 0.10141124623639637,
 0.10139442566146913,
 0.1009234495635061]
 """

mytest['ALF']=0
X_test = mytest.drop(['ALF',"id"], axis=1) 
y_test= mytest['ALF']

val_preds = pd.DataFrame()
for i in range(10):
    val_preds['clf'+str(i)] = clf_list[i].predict(X_test)

val_preds['final'] = sum([ val_preds[i]*score_edit[int(i[-1])] for i in list(val_preds.columns)[:10]])

val_preds.to_csv('look.csv', index=False)
val_preds

"""
输出格式见下方
"""

result_list = []
val_preds_final = val_preds['final']
for i in range(len(val_preds)):
    userid = mytest['id'][i]
    # ALF = val_preds['clf3'][i]
    # ALF = 1.0 if val_preds_final[i] else 0.0
    ALF = 1.0 if val_preds_final[i]>0.52 else 0.0
    line=[userid,ALF]
    result_list.append(line)
print(result_list[:20])
df = pd.DataFrame(result_list, columns=['id','ALF'])
df.to_csv('0721-2029.csv', index=False)
```

<img src="https://s2.loli.net/2022/07/21/A5LQj8CouqzcDMd.png" alt="image-20220721203754220" style="zoom:67%;" />

<img src="https://s2.loli.net/2022/07/21/JjfUecxAlYaG5tV.png" alt="image-20220721203450235" style="zoom: 80%;" />
