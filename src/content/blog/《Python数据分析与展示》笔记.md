---
title: Python数据分析与展示
slug: note-python-data
publishedDate: 2022-02-09 10:00:00
tags: [Python, 数据分析]
category: 课外学习
---

>学习选择
>
>基础：先看的这个，[Python数据分析与展示，北京理工大学，中国大学MOOC(慕课) (icourse163.org)](https://www.icourse163.org/course/BIT-1001870002?tid=1462344444)

# numpy

## 属性与方法

<img src="http://r6x04xz01.hd-bkt.clouddn.com/image-20220209120433655.png"  style="zoom:67%;" />

<img src="http://r6x04xz01.hd-bkt.clouddn.com/image-20220209120605903.png" style="zoom:67%;" />

<img src="http://r6x04xz01.hd-bkt.clouddn.com/image-20220209120638406.png"  style="zoom:67%;" />

<img src="http://r6x04xz01.hd-bkt.clouddn.com/image-20220209120736609.png"  style="zoom:67%;" />

<img src="http://r6x04xz01.hd-bkt.clouddn.com/image-20220209121143397.png"  style="zoom:67%;" />

<img src="http://r6x04xz01.hd-bkt.clouddn.com/image-20220209121252867.png" style="zoom:67%;" />

```python
#原数组不变
new_a = a.astype(new_type)
#转list
ls = a.tolist()

#补充
b[(b>=60) & (b<=80)]
# 显示60~80间的数据, 此处用&, 不能用and
b[(b<60) | (b>90)]
# 显示<60  或 >90的数据,此处用|, 不能用or
b[~(b<60)]		
# ~非, 显示 >=60的数据)

b<70
np.where(b<70,b,0)

b.T() # 矩阵转置
b.I() # 矩阵的逆
```

<img src="http://r6x04xz01.hd-bkt.clouddn.com/image-20220209121757500.png" style="zoom:67%;" />

<img src="http://r6x04xz01.hd-bkt.clouddn.com/image-20220209125542168.png" style="zoom:67%;" />

<img src="http://r6x04xz01.hd-bkt.clouddn.com/image-20220209125714166.png"  style="zoom:67%;" />

* 随机数

<img src="http://r6x04xz01.hd-bkt.clouddn.com/image-20220209131258858.png"  style="zoom:67%;" />

<img src="http://r6x04xz01.hd-bkt.clouddn.com/image-20220209131653651.png" style="zoom:67%;" />

<img src="http://r6x04xz01.hd-bkt.clouddn.com/image-20220209132009671.png" style="zoom:67%;" />

* 统计函数

<img src="http://r6x04xz01.hd-bkt.clouddn.com/2233157-b77105789e36c847.jpg"  style="zoom:67%;" />

<img src="http://r6x04xz01.hd-bkt.clouddn.com/image-20220209132916324.png" style="zoom:67%;" />

<img src="http://r6x04xz01.hd-bkt.clouddn.com/image-20220209133037338.png" style="zoom:67%;" />

```python
#梯度 np.gradient(f) #两侧/一侧、偏导
import numpy as np
c = np.random.randint(0,20,(3,4))
print(c)
c_grad = np.gradient(c)
print(c_grad)

"""
[[13  6  9 19]
 [ 4  4 16  4]
 [13  7  2  3]]
[array([[ -9. ,  -2. ,   7. , -15. ],
        [  0. ,   0.5,  -3.5,  -8. ],
        [  9. ,   3. , -14. ,  -1. ]]),
 array([[ -7. ,  -2. ,   6.5,  10. ],
        [  0. ,   6. ,   0. , -12. ],
        [ -6. ,  -5.5,  -2. ,   1. ]])]
"""
```



## 数据存取

* csv只能有效存储一维、二维数组

<img src="http://r6x04xz01.hd-bkt.clouddn.com/image-20220209130057579.png" style="zoom:67%;" />

<img src="http://r6x04xz01.hd-bkt.clouddn.com/image-20220209130302550.png" style="zoom:67%;" />

* 任意维度

```python
#1.
#sep=''时，存取的是二进制文件
a.tofile("b.dat", sep=',', format='%d')
np.fromfile("b.dat", dtype=np.int, sep=',', count=-1)

#2.便携文件存储
#存取文件扩展名.npy/.npz
np.save(fname, array)
np.load(frame)
```



# matplotlib

# pandas