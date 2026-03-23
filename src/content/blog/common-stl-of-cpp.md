---
title: C++常用STL
publishedDate: 2022-08-04 18:20:34
tags: [数据结构, C++]
category: 课外学习
---

>没有一次性总结完，做一道题总结一点。

# string

## 初始化

```c++
string str1 = "hello";

string* str2 = new string("hello");

string st1("babbabab");

string(const char *s);    //用c字符串s初始化
string(int n,char c);     //用n个字符c初始化

```

## 方法

```c++
int capacity()const;    //返回当前容量（即string中不必增加内存即可存放的元素个数）
int max_size()const;    //返回string对象中可存放的最大字符串的长度
int size()const;        //返回当前字符串的大小
int length()const;       //返回当前字符串的长度
bool empty()const;        //当前字符串是否为空
void resize(int len,char c);//把字符串当前大小置为len，并用字符c填充不足的部分

str1.begin()
str1.end()

string str4 = str1 + str3;

str1 < str3

reverse(str1.begin(), str1.end());

void swap(string &s2);    //交换当前字符串与s2的值

string substr(int pos = 0,int n = npos) const;//返回pos开始的n个字符组成的字符串

string &append(const char *s);            //把c类型字符串s连接到当前字符串结尾
string &append(const char *s,int n);//把c类型字符串s的前n个字符连接到当前字符串结尾
string &append(const string &s);    //同operator+=()
string &append(const string &s,int pos,int n);//把字符串s中从pos开始的n个字符连接到当前字符串的结尾
string &append(int n,char c);        //在当前字符串结尾添加n个字符c
string &append(const_iterator first,const_iterator last);//把迭代器first和last之间的部分连接到当前字符串的结尾

// c.c_str()
string c = "abc123";
char *d = new char[20];
strcpy(d, c.c_str());//因为这里没有直接赋值，所以指针类型可以不用const char *

//strcpy(d, c); ---> 这样会报错！！！！
strcpy(d,"123456"); // 这里"123456"直接使用了

//find-从指定位置起向后查找，直到串尾
string st1("babbabab");

//1.默认从位置0（即第1个字符）开始查找
cout << st1.find('a') << endl;

//2.在st1中，从位置2（b，包括位置2）开始，查找a，返回首次匹配的位置
cout << st1.find('a', 2) << endl;

string st2("aabcbcabcbabcc");
str1 = "abc";

//3.从st2的位置2（b）开始匹配，返回第一次成功匹配时匹配的串（abc）的首字符在st2中的位置，失败返回-1
cout << st2.find(str1, 2) << endl;

//4.取abcdefg得前3个字符（abc）参与匹配，相当于st2.find("abc", 2)
cout << st2.find("abcdefg", 2, 3) << endl;

//rfind-从指定位置起向前查找，直到串首
cout << st1.rfind('a', 7) << endl;

//find_first_of-在源串中从位置pos起往后查找，只要在源串中遇到一个字符，该字符与目标串中任意一个字符相同，就停止查找，返回该字符在源串中的位置；若匹配失败，返回-1
string str6("bcgjhikl");
string str7("kghlj");
cout << str6.find_first_of(str7, 0) << endl;//2,从str1的第0个字符b开始找，g与str2中的g匹配，停止查找，返回g在str1中的位置2

//find_last_of-与find_first_of函数相似，只不过查找顺序是从指定位置向前
string str("abcdecg");
cout << str.find_last_of("hjlywkcipn", 6) << endl;//5,从str的位置6(g)开始向前找，g不匹配，再找c，c匹配，停止查找，返回c在str中的位置5

//find_first_not_of-在源串中从位置pos开始往后查找，只要在源串遇到一个字符，与目标串中的任意字符都不相同，就停止查找，返回该字符在源串中的位置；若遍历完整个源串，都找不到满足条件的字符，则返回-1
cout << str.find_first_not_of("kiajbvehfgmlc", 0) << endl;//3   从源串str的位置0(a)开始查找，目标串中有a，匹配，..,找d，目标串中没有d（不匹配），停止查找，返回d在str中的位置3

//find_last_not_of-与find_first_not_of相似，只不过查找顺序是从指定位置向前
cout << str.find_last_not_of("kiajbvehfgmlc", 6) << endl;//3

string &replace(int p0, int n0,const char *s);//删除从p0开始的n0个字符，然后在p0处插入串s
string &replace(int p0, int n0,const char *s, int n);//删除p0开始的n0个字符，然后在p0处插入字符串s的前n个字符
string &replace(int p0, int n0,const string &s);//删除从p0开始的n0个字符，然后在p0处插入串s
string &replace(int p0, int n0,const string &s, int pos, int n);//删除p0开始的n0个字符，然后在p0处插入串s中从pos开始的n个字符
string &replace(int p0, int n0,int n, char c);//删除p0开始的n0个字符，然后在p0处插入n个字符c
string &replace(iterator first0, iterator last0,const char *s);//把[first0，last0）之间的部分替换为字符串s
string &replace(iterator first0, iterator last0,const char *s, int n);//把[first0，last0）之间的部分替换为s的前n个字符
string &replace(iterator first0, iterator last0,const string &s);//把[first0，last0）之间的部分替换为串s
string &replace(iterator first0, iterator last0,int n, char c);//把[first0，last0）之间的部分替换为n个字符c
string &replace(iterator first0, iterator last0,const_iterator first, const_iterator last);//把[first0，last0）之间的部分替换成[first，last）之间的字符串

string &insert(int p0, const char *s);
string &insert(int p0, const char *s, int n);
string &insert(int p0,const string &s);
string &insert(int p0,const string &s, int pos, int n);
//前4个函数在p0位置插入字符串s中pos开始的前n个字符
string &insert(int p0, int n, char c);//此函数在p0处插入n个字符c
iterator insert(iterator it, char c);//在it处插入字符c，返回插入后迭代器的位置
void insert(iterator it, const_iterator first, const_iterator last);//在it处插入[first，last）之间的字符
void insert(iterator it, int n, char c);//在it处插入n个字符c

iterator erase(iterator first, iterator last);//删除[first，last）之间的所有字符，返回删除后迭代器的位置
iterator erase(iterator it);//删除it指向的字符，返回删除后迭代器的位置
string &erase(int pos = 0, int n = npos);//删除pos开始的n个字符，返回修改后的字符串

```

# stack

## 初始化

```
stack<int>sta;
```

## 方法

| push()  | 压栈，增加元素 O(1)           |
| ------- | ----------------------------- |
| pop()   | 移除栈顶元素 O(1)             |
| top()   | 取得栈顶元素（但不删除）O(1)  |
| empty() | 检测栈内是否为空，空为真 O(1) |
| size()  | 返回stack内元素的个数 O(1)    |

# queue

## 初始化

```
queue<int>q1;
queue<double>q2;  
queue＜char＞q3；
//默认为用deque容器实现的queue；

补充
queue＜char, list＜char＞＞q1；
//用list容器实现的queue 
queue＜int, deque＜int＞＞q2；
 //用deque容器实现的queue 
```

## 方法

```
push() 在队尾插入一个元素
pop() 删除队列第一个元素
size() 返回队列中元素个数
empty() 如果队列空则返回true
front() 返回队列中的第一个元素
back() 返回队列中最后一个元素
```

# priority_queue

## 初始化

`priority_queue<type,container,function>`

其中第一个参数不可以省略，后两个参数可以省略。

type:数据类型

container:实现优先队列的底层容器，要求必须是以数组形式实现的容器

function:元素之间的比较方式

```cpp
priority_queue<int> q;
//定义一个优先队列，按照元素从大到小的顺序出队
//等同于less
priority_queue<int, vector<int>, less<int> >q;
//另外一种按元素从小到大顺序出队greater
priority_queue<int, vector<int>, greater<int> >q;
```

## 方法

```cpp
和队列基本操作相同:
q.top()    //访问队首元素(顶)
q.empty() //判断队列是否为空
q.push()   //插入元素到队尾
q.pop()    //出队队首元素(顶)
q.size()   //返回队列中元素的个数
```

priority_queue()，默认按照从小到大排列。所以top()返回的是最大值而不是最小值！使用greater<>后，数据从大到小排列，top()返回的就是最小值而不是最大值！如果使用了第三个参数，那第二个参数不能省，用作保存数据的容器！

# vector

## 初始化

```c++
//定义具有10个整型元素的向量（尖括号为元素类型名，它可以是任何合法的数据类型），不具有初值，其值不确定
vector<int>a(10);

//定义具有10个整型元素的向量，且给出的每个元素初值为1
vector<int>a(10,1);

//用向量b给向量a赋值，a的值完全等价于b的值
vector<int>a(b);

//将向量b中从0-2（共三个）的元素赋值给a，a的类型为int型
vector<int>a(b.begin(),b.begin+3);

 //从数组中获得初值
int b[7]={1,2,3,4,5,6,7};
vector<int> a(b,b+7）;

//二维数组初始化
vector<vector<int>> m(4);
//一定要初始化大小，不然下面m[i]就不能这样用
vector<int> res;
int k=1;
for(int i=0;i<4;i++){        
    for(int j=0;j<4;j++){
        m[i].push_back(k++);            
    }           
}
              
//nums是已经定义好的二维数组，并且是非空的
vector<vector<int>> res(5, vector<int>(2, 0));
//定义的res的大小和nums一样，并且res所有的数均初始化为0
```

## 方法

```c++
#include<vector>
vector<int> a,b;
//b为向量，将b的0-2个元素赋值给向量a
a.assign(b.begin(),b.begin()+3);
//a含有4个值为2的元素
a.assign(4,2);
//返回a的最后一个元素
a.back();
//返回a的第一个元素
a.front();
//返回a的第i元素,当且仅当a存在
a[i];
//清空a中的元素
a.clear();
//判断a是否为空，空则返回true，非空则返回false
a.empty();
//删除a向量的最后一个元素
a.pop_back();
//删除a中第一个（从第0个算起）到第二个元素，也就是说删除的元素从a.begin()+1算起（包括它）一直到a.begin()+3（不包括它）结束
a.erase(a.begin()+1,a.begin()+3);
//在a的最后一个向量后插入一个元素，其值为5
a.push_back(5);
//在a的第一个元素（从第0个算起）位置插入数值5,
a.insert(a.begin()+1,5);
//在a的第一个元素（从第0个算起）位置插入3个数，其值都为5
a.insert(a.begin()+1,3,5);
//b为数组，在a的第一个元素（从第0个元素算起）的位置插入b的第三个元素到第5个元素（不包括b+6）
a.insert(a.begin()+1,b+3,b+6);
//返回a中元素的个数
a.size();
//返回a在内存中总共可以容纳的元素个数
a.capacity();
//将a的现有元素个数调整至10个，多则删，少则补，其值随机
a.resize(10);
//将a的现有元素个数调整至10个，多则删，少则补，其值为2
a.resize(10,2);
//将a的容量扩充至100，
a.reserve(100); //修改a
//b为向量，将a中的元素和b中的元素整体交换
a.swap(b);
//b为向量，向量的比较操作还有 != >= > <= <
a==b;

//常见错误赋值方式
vector<int>a;
for(int i=0;i<10;++i){a[i]=i;}
//下标只能用来获取已经存在的元素

count(vector1.begin(),vector2.begin(),target);   
//注意不是vector的类函数！！



a.erase(unique(a.begin(),a.end()),a.end())；
//容器元素相邻去重，如果要全体去重需要
```

[Vector常用方法总结](https://blog.csdn.net/All_In_gzx_cc/article/details/110680064)

## 经典题目



# unordered_map

## 方法

| 成员方法   | 功能                                                         |
| ---------- | ------------------------------------------------------------ |
| begin()    | 返回指向容器中第一个键值对的正向迭代器。                     |
| end()      | 返回指向容器中最后一个键值对之后位置的正向迭代器。           |
| empty()    | 若容器为空，则返回 true；否则 false。                        |
| size()     | 返回当前容器中存有键值对的个数。                             |
| max_size() | 返回容器所能容纳键值对的最大个数，不同的操作系统，其返回值亦不相同。 |
| at(key)    | 返回容器中存储的键 key 对应的值，如果 key 不存在，则会抛出 out_of_range 异常。 |
| find(key)  | 查找以 key 为键的键值对，如果找到，则返回一个指向该键值对的正向迭代器；反之，则返回一个指向容器中最后一个键值对之后位置的迭代器（如果 end() 方法返回的迭代器）。 |
| count(key) | 在容器中查找以 key 键的键值对的个数。                        |
| insert()   | 向容器中添加新键值对。                                       |
| erase()    | 删除指定键值对。                                             |
| clear()    | 清空容器，即删除容器中存储的所有键值对。                     |
| swap()     | 交换 2 个 unordered_map 容器存储的键值对，前提是必须保证这 2 个容器的类型完全相等。 |

## 经典题目

[1. 两数之和 - 力扣（LeetCode）](https://leetcode.cn/problems/two-sum/)

# map

# unordered_set

## 介绍

无序集(unorder sets)是一种不按特定顺序存储唯一元素的容器，允许根据元素的值快速检索单个元素。

在unordered_set中，元素的值同时也是唯一标识它的键。键是不可变的，因此，unordered_set中的元素在容器中不能被修改，但是它们可以被插入和删除。

在内部，unordered_set中的元素并不按照任何特定的顺序排序，而是根据它们的散列值组织到桶中，从而允许根据它们的值直接快速访问单个元素(平均时间复杂度为常数)。

与set容器相比，Unordered_set容器通过键访问单个元素的速度更快，尽管它们通常在通过元素的子集进行范围迭代时效率较低。

* 容器的属性
  * 关联性：关联容器中的元素是通过它们的键引用的，而不是通过它们在容器中的绝对位置引用的
  * 无序性：无序容器使用哈希表组织元素，允许通过键快速访问元素。
  * 具有set特性：元素的值也是用来标识它的键。即value就是key。
  * 独一无二的key：容器中没有两个元素具有相同的键。
  * Allocator-aware：容器使用一个allocator对象来动态地处理其存储需求。即当你插入或者删除数据时，容器会自动处理空间。

## 初始化

```c++
unordered_set<int> us1; //构造int类型的空容器

unordered_set<int> us2(us1); //拷贝构造同类型容器us1的复制品

string str("abcedf");
unordered_set<char> us3(str.begin(), str.end()); //构造string对象某段区间的复制品
```

## 方法

| 成员函数 | 功能                                                         |
| -------- | ------------------------------------------------------------ |
| insert   | 插入指定元素                                                 |
| erase    | 删除指定元素（删除了所有值为x的元素）（或者需要传入`multiset <T>::iterator pos`删除当前pos的那一个元素，也就是`map.erase(map.find(x))`） |
| find     | 查找指定元素                                                 |
| size     | 获取容器中元素的个数                                         |
| empty    | 判断容器是否为空                                             |
| clear    | 清空容器                                                     |
| swap     | 交换两个容器中的数据                                         |
| count    | 获取容器中指定元素值的元素个数                               |
| begin    | 获取容器中第一个元素的正向迭代器                             |
| end      | 获取容器中最后一个元素下一个位置的正向迭代器                 |

## 经典题目

[349. 两个数组的交集 - 力扣（LeetCode）](https://leetcode.cn/problems/intersection-of-two-arrays/)

# unordered_multiset

## 介绍

unordered_multiset 是关联容器，含有可能**非唯一 Key 类型对象的集合**。搜索、插入和移除拥有平均常数时间复杂度。

元素在内部并不以任何顺序排序，只是被组织到桶中。元素被放入哪个桶完全依赖其值的哈希。这允许快速访问单独的元素，因为一旦计算哈希，它就指代放置该元素的准确的桶。

注：
unordered_multiset 与 unordered_set 的最大区别就是前者可以容纳多个相同的值，后者容器中的元素具有唯一性，相同点是两者都是无序的。
unordered_multiset 与set的最大区别是前者可以容纳多个相同的值并且容器内部无序，后者容器中的元素具有唯一性并且容器内部有序。

[C++ STL容器之unordered_multiset](https://blog.csdn.net/qq_41855420/article/details/89792261)

## 方法

| 成员函数      | 功能                                                         |
| ------------- | ------------------------------------------------------------ |
| empty         | 检查容器是否为空 (公开成员函数)                              |
| size          | 返回容纳的元素数 (公开成员函数)                              |
| max_size      | 返回可容纳的最大元素数 (公开成员函数)                        |
| begin、cbegin | 返回指向容器第一个元素的迭代器 (公开成员函数)                |
| end、cend     | 返回指向容器尾端的迭代器 (公开成员函数)                      |
| clear         | 清除内容 (公开成员函数)                                      |
| insert        | 插入元素或结点 (C++17 起) (公开成员函数)                     |
| erase         | 删除指定元素（删除了所有值为x的元素）（或者需要传入`multiset <T>::iterator pos`删除当前pos的那一个元素，也就是`map.erase(map.find(x))`） |
| swap          | 交换内容 (公开成员函数)                                      |
| count         | 返回匹配特定键的元素数量 (公开成员函数)                      |
| find          | 寻找带有特定键的元素 (公开成员函数)                          |







