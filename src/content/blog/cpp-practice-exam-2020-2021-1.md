---
title: 中国矿业大学2020-2021-1高级语言程序设计实验期末考题
publishedDate:  2020-12-23 21:12:00
tags: [C++]
category: CUMT课程笔记
---

# 期末测试一：字符串处理
## 题目描述

在一个字符串$str1$中找到所有存在于$str2$中的字符，并逐一删除。每删除一个字符，就按顺序从$str3$中取出一个字符填充删除的位置。要求在删除字符时，从$str1$的头部开始比较与$str2$中的元素是否相同，而填充字符时，也从$str3$的头部逐一选择字符填充。当$str3$不够长时，循环返回到头部继续逐一选择。
## 输入

输入有三行，第一行对应$str1$，第二行对应$str2$，第三行对应$str3$。
## 输出

输出只有一行，是处理过的字符串，末尾没有换行。
## 样例输入

```
abcdhjkl
hdk
AB
```
## 样例输出

`abcABjAl`

## AC代码示例1（自己的考试后修改结果）

```c++
#include<iostream>
using namespace std;
int len(char str[])
{
   int l=0;
   for (int i=0; str[i]; i++) l++;
   return l;
}
int main()
{
   char str1[40];
   char str2[10];
   char str3[10];
   cin>>str1>>str2>>str3;
   int m=0;
   for (int i=0; str1[i]; i++)
   {
      for (int j=0; str2[j]; j++)
      {
         if (str1[i]==str2[j])
         {
            m=m%len(str3);   //就是这里！！！考试写成了str2死活AC不出来！！！结果是abcABj
            cout<<"m-> "<<m<<" "<<len(str2)<<endl;
            str1[i]=str3[m];    
            m++;
            break;
         }
      }
   }
   for (int i=0; str1[i]; i++) cout<<str1[i];
   return 0;
}
```
## AC代码示例2：某ZJUer同学现做（似乎没有用到五分钟）

```c++
#include <stdio.h>
#include <string.h>
#define MAX 200
int cur,len;
char s1[MAX], s2[MAX], s3[MAX], tmp;
int main(int argc, char const *argv[])
{
    scanf("%s",s1);
    scanf("%s",s2);
    scanf("%s",s3);
    len = strlen(s3);
    for (int i = 0; s1[i]; i++)
    {
        tmp = s1[i];
        for (int j = 0; s2[j]; j++)
        {
            if(tmp == s2[j]){
                s1[i] = s3[cur++%len];
                break;
            }
        }
    }
    printf("%s",s1);
    return 0;
}
```
## 复盘

1. 先把题目看清楚再下手。。前几遍全是以$str2$开始遍历的，完全搞错了
2. 不熟悉`char[]`的应用，没认真看书以及做题做少了
3. 应该多学习点string类或者STL的内容，字符串处理算法似乎很多厂子也会作为面试题。。

# 期末测试二：图形类

## 题目描述

一个中空柱形图形的截面如下图阴影部分所示。设计一个圆类，包含半径数据，以及构造函数，成员赋值函数，面积函数等。再设计一个柱形类，柱形类继承了圆类，增加高度作为数据成员，增加构造函数，成员赋值函数，底面积函数（返回正方形与圆形面积之差），体积函数（为底面积乘以高度）等。在主函数中输入圆的半径及圆柱高度，调用柱形类对象的成员赋值函数，输出柱形对象的底面积与体积。要求：用面向对象实现，使用继承方法；数据为私有，函数为公有；圆周率值按`3.14`计算。

<img src="https://s2.loli.net/2022/11/21/JAlmKSFgUOLwkf1.png" alt="image-20221121191719724" style="zoom: 67%;" />

## 输入

输入两个数据，分别代表圆的半径和圆柱的高度，中间用一个空格隔开。

## 输出

输出两个数据，分别是柱形对象的底面积与体积，中间用一个空格隔开，末尾没有换行。

## 样例输入

`4.3 5.6`

## 样例输出

`15.9014 89.0478`

## 考试AC代码

```c++
#include <iostream>
using namespace std;
class Circle
{
    private:
        double radius;
    public:
        Circle():radius(0){}
        Circle(double r):radius(r){}
        double ShowR() {return radius;}
        double Area() {return 3.14*radius*radius;}  
};
 
class Zhu: public Circle
{
    private:
        double height;
    public:
        Zhu():height(0){}
        Zhu(double r, double h):Circle(r),height(h){}
        double BottomArea()
        {
            double ra=0;
            ra=ShowR();
            return 4*ra*ra-Area();
        }
        double Volumn() {return BottomArea()*height;}
};
int main() {
    double r,h;
    cin>>r>>h;
    Zhu z(r,h);
    cout<<z.BottomArea()<<' '<<z.Volumn()<<endl;
    return 0;
}
```
