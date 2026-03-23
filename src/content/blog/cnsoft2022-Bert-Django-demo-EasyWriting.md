---
title: 基于Bert-UNILM及Django的智能创作平台 - 软件杯2022
publishedDate: 2022-09-12 15:55:22
tags: [深度学习, 自然语言处理, Web开发]
category: 开发项目
---

>**参考资料**
>
>1. 李宏毅机器学习课程
>2. [Layui - 经典开源模块化前端 UI 组件库 (layuion.com)](https://layuion.com/)
>3. [Django之Auth模块_嗷range的博客-CSDN博客](https://blog.csdn.net/LHQ626/article/details/117483776)
>4. 

# 理论基础

## 抽取式算法TextRank

* TextRank 算法是一种用于文本的基于图的排序算法，通过把文本分割成若干组成单元（句子），构建节点连接图，用句子之间的相似度作为边的权重，通过循环迭代计算句子的TextRank值，最后抽取排名高的句子组合成文本摘要。

* 流程

  1. 把所有文章整合成文本数据
  2. 接下来把文本分割成单个句子
  3. 然后，我们将为每个句子找到向量表示（词向量）。
  4. 计算句子向量间的相似性并存放在矩阵中
  5. 然后将相似矩阵转换为以句子为节点、相似性得分为边的图结构，用于句子TextRank计算。
  6. 最后，一定数量的排名最高的句子构成最后的摘要。

  ![image-20220912224236178](https://s2.loli.net/2022/09/12/xMg9JdDmhEWRYrN.png)

* 关键词提取：图构造完成后，单词的TR值计算公式为

  

  

## Bert-UNILM

## Django开发

# 项目实践

项目展示

https://www.bilibili.com/video/BV1FP411V7ze
