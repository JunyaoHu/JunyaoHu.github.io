---
title: PAT刷题（看题）笔记
publishedDate: 2022-08-30 19:28:22
tags: [PAT, 程序设计, 算法, C++]
category: 刷题记录
---

>**参考资料**
>
>1. PAT官网
>2. AcWing PAT甲级辅导课

# 字符串处理

## A + B 格式1001

* int转string：str = to_string(c);

## 约会1061

* 模拟
* 要看懂题目

## 电话账单1016

* 和时间相关累积使用前缀和，转换为timestamp

```
struct aDialog {
    int timestamp;
    string curtime;
    string state;

    bool operator < (const aDialog & t) const {
        return timestamp < t.timestamp;
    }

};
```

* 格式化输入输出scanf、printf、sprintf（加不加&），接收char[]类型更好
* 格式化存储：sprintf(time, "%02d:%02d:%02d", day, hour, minute);
* 格式转换（string转char[]用s.c_str()（比如printf的时候需要）、char[]转string自动不用管）

## 银行排队1017

* priority_queue 的使用 greater 从小到大
* 在新的窗口空闲之后，不会计算处理时间，其实就是`本窗口处理完时间 = max(上次本窗口处理完时间, 用户到达时间) + 该客户处理时间`
* 某个人的等待时间`等待时间 = max(上次本窗口处理完时间, 用户到达时间) - 该客户到达时间`
* `priority_queue<int, vector<int>, greater<int>> windows;` 本质还是queue，有push pop top， top就是堆顶（队头）

## 它们是否相等1060

* 多种情况合并
  [123.2323] -> 0. [123 2323] dot 3 [e3] -> 0. 1232323 e 3

  [0.000121212] -> 0. [0 000121212] dot 1 [e1] -> 0. 121212 e -3

* string相关用法

  * s.substr(0, dot)
  * s.substr(dot+1)
  * string(n - s.size(), '0') 前面位数，后面每位字符，后面是char

## 科学计数法 1073

- 1060
- string 转 int 用 stoi

## kuchiguse1077

* `cin >>` 和 `getchar() `和 `getline(cin, string)`
* `cin >>`
  cin 可以连续从键盘读取想要的数据，以空格、tab 或换行作为分隔符。当 cin>> 从缓冲区中读取数据时，若缓冲区中第一个字符是空格、tab或换行这些分隔符时，cin>> 会将其忽略并清除，继续读取下一个字符，若缓冲区为空，则继续等待。但是如果读取成功，字符后面的分隔符是残留在缓冲区的，cin>> 不做处理。
* `getchar()`
  只接受单个字符。cin不丢会弃空白符，所以一般在涉及到多行字符串输入时：就需要使用getchar()函数读回车。
* `getline(cin, string)`
  只接受字符串。可以从标准输入设备键盘读取一行，当遇到如下三种情况会结束读操作：（1）文件结束；（2）遇到行分隔符；（3）输入达到最大限度。

```
cin >> xxx;
getchar();
for (int i = 0; i < n; i++){
	getline(cin, talk[i]);
	...
}
```

## 微博转发抽奖1124

* unordered_set: insert count
* vector: push_back

```c++
while (s < all_name.size()) {
        picked_name.insert(all_name[s]);
        cout<<all_name[s]<<endl;
        s += n;
        while (s < all_name.size() && picked_name.count(all_name[s]) != 0) s++;
    }
```

# 高精度

## 多项式 A + B 1002

* 送分。。。模拟就行
* 其实不是进位的问题，多项式x是未知的 进制不知道 所以不能默认基数是10直接进位 系数直接加和就行

## 霍格沃茨的 A + B 1058

* 送分。。。模拟就行，注意进位

## 延迟的回文数1136

* 送分。。。模拟就行，注意进位

# 进位制

## 普通回文数1019

* 模拟进制转换就行

## 火星数字1100

* `#include <sstream>`中的` stringstream`
  格式

  ```
  string s;
  getline(cin, s);
  stringstream ssin;
  ssin << s;
  
  string x;
  while (ssin >> x) {
  	...
  }
  ```

  或者

  ```
  string s;
  getline(cin, s);
  stringstream ssin(s);
  
  string x;
  while (ssin >> x) {
  	...
  }
  ```

   `while (ssin >> x);`把字符串赋给a，a可以是各种类型，会跳过空格。和cin类似。

* 注意：普通的读入可以用cin，当出现要读入一个数组，当时不知道元素个数的时候，用 stringstream

## 火星颜色 1027

* 注意补零



# 排序

## 最佳排名1012

```c++
unordered_map<string, vector<int>> grades;
vector<int> q[4]; // 按顺序自带排序
// A: q[0], C: q[1], M: q[2], E: q[3]
```

* 复习二分（最后一个满足）

```
int get_rank(vector<int> & a, int x)
{
    int l = 0, r = a.size() - 1;
    while (l < r)
    {
        int mid = l + r + 1 >> 1;
        if (a[mid] <= x) l = mid;
        else r = mid - 1;
    }
    return a.size() - r;
}
```

## 数字图书馆1022

* 模拟

```
struct Book
{
    string id, name, author;
    set<string> keywords;
    string publisher, year;
};
```

## PAT 排名 1025

* 相同排序方法，不同区域，排两次

```
struct Student
{
    string id;
    int grade;
    int location_number, local_rank, final_rank;

    bool operator< (const Student& t) const
    {
        if (grade != t.grade) return grade > t.grade;
        return id < t.id;
    }
};

vector<Student> grades[N];
vector<Student> all;
```

## 列表排序1028

* 不同的排序方法
* sort可以将排序方法单独写出来，不用结构体的比较运算符重载（推荐）
* 写重载也行 把int order_state;作为struct内属性

```
bool cmp1(Student s1, Student s2) {
    return s1.id < s2.id;
}

bool cmp2(Student s1, Student s2) {
    ...
}

...

sort(sss.begin(), sss.end(), cmp1);
```

## 学生课程列表1039

* `unordered_map<string, vector<int>> courses;`

## 链表排序1052

* 可能有多余的点，不能直接排序，先保存有用的点

```c++
struct Node {
    int address;
    int key;
    int next;
    Node()  {address = -1; key = -1; next = -1;}
    Node(int _address, int _key, int _next) :address(_address), key(_key), next(_next){}
    bool operator < (const Node & n) const {
        return key < n.key;
    }
};

unordered_map<int, Node> amap;
amap[address] = Node(address, key, next);
vector<Node> alist;
```

## PAT 评测1075

* 读懂题目，分类讨论
* 不记录的：unsubmit_cnt == k || unvalid_cnt == k

```
//【1】those who has never submitted any solution that can pass the compiler, 
//【2】or has never submitted any solution, 
// they must NOT be shown on the ranklist.

struct Student {
    int id;
    int score[K];
    bool valid[K];
    bool submit[K];
    int scores;
    int ac;
    bool operator < (const Student & s) const {
        if (scores != s.scores) return scores > s.scores;
        else if (ac != s.ac ) return ac > s.ac;
        else return id < s.id;
    }
}student[N];
```





# 树

## 数叶子结点

## 树的遍历

## 最深的根

## 判断二叉搜索树

## 完全二叉搜索树

## 完全二叉搜索树1064

* 完全二叉树特性：一维数组存储，父子节点索引特性

* 搜索树特性：按中序遍历有序填入数字

* 层序遍历（无需队列，一维数组存储自带索引）

* w[N]：权值

* tr[N]：排序结果

* k：排序索引

  ```c++
  void dfs(int u, int& k)
  {
      if (u == -1) return;
      dfs(l[u], k);
      w[u] = a[k++];
      dfs(r[u], k);
  }
  
  int k = 0'
  dfs(0,k);
  ```

## 再次树遍历1086

* 栈可以以非递归方式实现二叉树的中序遍历
* 建树方式，左右子树int l[N], r[N];
* 特性
  * 第一个push是root
  * 对所有push
    * push上个操作时push：是左儿子
    * push上一个是pop：是右儿子
* 补充：push是前序，pop是中序
* 补充：回顾力扣94，二叉树非递归遍历

## 构建二叉搜索树1099

1064

## 反转二叉树1102

* 建树方式，左右子树int l[N], r[N];
* bool hasfather找root
* 反转：swap(l[u], r[u]);

## 完全二叉树1110

1064

* int&表示int引用类型 ，引用类型初始化不能是常数
* 没有实际存储到树，只判断了最大的节点的序号maxk最后是不是n

## 二叉搜索树最后两层结点数量1115

* insert(int& u, int w) 递归加子节点
* int l[N], r[N], v[N], idx;
* cnt[depth] ++ ; 每一层的节点个数， 放在dfs中进行 

## 前序和后序遍历1119

* 根据左子树右子树长度暴力枚举
* 还有别的限制：前序第一个和后序最后一个应该相同 

* dfs(int l1, int r1, int l2, int r2, string& in)

## Z 字形遍历二叉树1127

* unordered_map<int, int> l, r, pos; 求前后序根节点位置方便
* list模拟queue，方便reverse

## 后序遍历1138

1127 unordered_map

## AVL树的根1066

* 没学过avl，基础知识
  * 只改变结构，但不改变中序遍历
  * int l[N], r[N], v[N], h[N]高度不用深度, idx;
  * void update(int u)
  * void R(int& u)
  * void L(int& u)
  * int get_balance(int u)
  * void insert(int& u, int w) 四种情况

## 判断完全 AVL 树1123

1066 1064

## 判断红黑树1135

* 没学过红黑树
  * 节点是红色或黑色。
  * 根节点是黑色。`root < 0`就不是
  * 所有叶子都是黑色。（**叶子是 NULL节点**）
  * 每个红色节点的两个子节点都是黑色。build里面`left < 0 || right < 0`就不是
  * 从任一节点到其每个叶子的所有路径都包含相同数目的黑色节点。`ls != rs`就不是
* `int build(int il, int ir, int pl, int pr, int& sum)`

## 等重路径1053

* 用邻接矩阵做
* `vector<vector<int>> ans;`
* 降序排序`greater<vector<int>>();`

## 最大的一代1094

easy

# 图论

## 紧急情况1003

* dijkstra算法改进（`int dist[N], cnt[N]路径计数, sum[N]点权和;`）

* 模板

* ```c++
  int n, m, S, T;
  int w[N], d[N][N];
  int dist[N], cnt[N], sum[N];
  bool st[N];
  
  void dijkstra()
  {
      memset(dist, 0x3f, sizeof dist);
      dist[S] = 0;
  
      for (int i = 0; i < n; i ++ )
      {
          int t = -1;
          for (int j = 0; j < n; j ++ )
              if (!st[j] && (t == -1 || dist[t] > dist[j]))
                  t = j;
          st[t] = true;
  
          for (int j = 0; j < n; j ++ )
              if (dist[j] > dist[t] + d[t][j])
              {
                  dist[j] = dist[t] + d[t][j];
              }
      }
  }
  ```

## 旅行计划1030

* dijkstra算法改进（`int dist[N], cost[N]计费, pre[N]来自;`）

## 团伙头目1034

* unordered_map<string, vector<pair<string, int>>> g;
* unordered_map<string, int> total;
* unordered_map<string, bool> st;
* vector<pair<string, int>> res;

* int dfs(string ver, vector< string > &nodes) 最后要除以2
* 有点难

## 条条大路通罗马1087

* 1003 1030
* 杂糅题、可做模板
* 距离（代价）dist相等比点权cost，点权相等比均值（个数）sum

```
int n, m;
int w[N];
int d[N][N];
int dist[N], cnt[N], cost[N], sum[N], pre[N];
// 最短距离，最短路数量，最大点权，最小点数, 最短路径的前一个点
bool st[N];

string city[N];
unordered_map<string, int> mp; //名字映射
```

## 在线地图1111

* 改邻接表了

```
int n, m, S, T;
int h[N], e[M], w1[M], w2[M], ne[M], idx;
int dist1[N], dist2[N], pre[N];
bool st[N];
```

## 哈密顿回路1122

* easy

## 欧拉路径1126

* easy

```c++
int n, m;
bool g[N][N], st[N];
int d[N]; //度数

//计算到达点数
int dfs(int u)
{
    st[u] = true;
    int res = 1;
    for (int i = 1; i <= n; i ++ )
        if (!st[i] && g[u][i])
            res += dfs(i);
    return res;
}
```

## 地铁地图1131

* medium
* 改为分组的完全图，找边数最小就是换乘最少
* 迪杰斯特拉堆优化有点绕感觉

```
typedef pair<int, int> PII;
priority_queue<PII, vector<PII>, greater<PII>> heap;
heap.push({0, 1}); 
while(heap.size())
{
    PII k = heap.top();
    heap.pop();
    int ver = k.second, distance = k.first;

    if(st[ver]) continue;
    st[ver] = true;

    for(int i = h[ver]; i != -1; i = ne[i])
    {
        int j = e[i]; 
        if(dist[j] > distance + w[i])
        {
            dist[j] = distance + w[i];
            heap.push({dist[j], j});
        }
    }
}
```

## 顶点覆盖1134

* easy
* 结构体

```
int n, m;
struct Edge
{
    int a, b;
}e[N];
bool st[N];

memset(st, 0, sizeof st);

if (!st[e[i].a] && !st[e[i].b])
```

## 第一次接触1139

* id2id的转换

```
a.erase(unique(a.begin(),a.end()),a.end())；
//vector元素相邻去重，如果要全体去重需要先sort
```

## 最大团1142

* 模拟

## 拓扑顺序1146

* 按照选项的存入顺序 箭头起点的索引要比箭头终点索引小才是拓扑排序

## 旅行商问题1150

* 模拟，分情况

## 顶点着色1154

* easy模拟

# 哈希

# 并查集

# 模拟

# 贪心

































 

