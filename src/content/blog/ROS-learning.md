---
title: ROS学习笔记
publishedDate: 2022-06-02 10:47:46
tags: [ROS]
category: 课外学习
---

>主要内容：ROS相关重要知识点和遇到的问题
>
>参考资料：http://www.autolabor.com.cn/book/ROSTutorials/

# 基本情况

## 安装

win10系统使用vmware workstation 16 pro安装ubuntu 20.04版本，ros系统选择noetic版本。

```
sudo rosdep init
rosdep update
```

上述步骤遇到网络问题，主要考虑在“软件与更新”中换中国的源（阿里、科大），然后主机使用手机热点联网。尝试过修改rawgithub的文件内容，把网站改成zhaoxuzuo的gitee（可能是现在gitee需要登录才行？）、给ubuntu装clash vpn尝试结果都不太行。

>更新 2024年3月4日
>
>在树莓派上安装 ubuntu20.04 支持 noetic 版本的 ros，可以用树莓派官方镜像下载服务器版本，然后再命令行安装（见 [link](https://askubuntu.com/a/1348561), [link2](https://blog.csdn.net/weixin_61692649/article/details/128405529)）

## 概念

* ROS全称Robot Operating System(机器人操作系统)。在ROS中每一个功能点都是一个单独的进程，每一个进程都是独立运行的。

* 文件系统
  <img src="https://s2.loli.net/2022/06/02/SE1dsfhrw4kqDM3.jpg" alt="img" style="zoom:80%;" />

* rqt_graph：可以显示节点关系

## 常用命令

```
rosnode ping    测试到节点的连接状态
rosnode list    列出活动节点
rosnode info    打印节点信息
rosnode machine 列出指定设备上节点
rosnode kill    杀死某个节点
rosnode cleanup 清除不可连接的节点
//清除无用节点，启动乌龟节点，然后 ctrl + c 关闭，该节点并没被彻底清除，可以使用 cleanup 清除节点

rostopic bw     显示主题使用的带宽
rostopic delay  显示带有 header 的主题延迟
rostopic echo   打印消息到屏幕
rostopic find   根据类型查找主题
rostopic hz     显示主题的发布频率
rostopic info   显示主题相关信息
rostopic list   显示所有活动状态下的主题
rostopic pub    将数据发布到主题
rostopic type   打印主题类型

rosmsg show     显示消息描述
rosmsg info     显示消息信息
rosmsg list     列出所有消息
rosmsg md5      显示 md5 加密后的消息
rosmsg package  显示某个功能包下的所有消息
rosmsg packages 列出包含消息的功能包

rosservice args 打印服务参数
rosservice call 使用提供的参数调用服务
rosservice find 按照服务类型查找服务
rosservice info 打印有关服务的信息
rosservice list 列出所有活动的服务
rosservice type 打印服务类型
rosservice uri  打印服务的 ROSRPC uri

rossrv show     显示服务消息详情
rossrv info     显示服务消息相关信息
rossrv list     列出所有服务信息
rossrv md5      显示 md5 加密后的服务消息
rossrv package  显示某个包下所有服务消息
rossrv packages 显示包含服务消息的所有包

rosparam set    设置参数
rosparam get    获取参数
rosparam load   从外部文件加载参数
rosparam dump   将参数写出到外部文件
rosparam delete 删除参数
rosparam list   列出所有参数

//rosservice和rossrv，前者是对ROS服务本身的管理，后者是对ROS服务类型的管理，相当于话题的rostopic和rosmsg。
```





# 通信机制

## 话题通信(发布订阅模式)

* 基于**发布订阅**模式的，也即：一个节点发布消息，另一个节点订阅该消息。

* 用于不断更新的、少逻辑处理的数据传输场景。

* 模型

  ![img](https://s2.loli.net/2022/06/02/3USuK6L1VfpyWTo.jpg)

* 注意1:上述实现流程中，前五步使用的 RPC(Remote Procedure Call Protocol，远程过程调用）协议，最后两步使用的是 TCP 协议

  注意2: Talker 与 Listener 的启动无先后顺序要求

  注意3: Talker 与 Listener 都可以有多个

  注意4: Talker 与 Listener 连接建立后，不再需要 ROS Master。也即，即便关闭ROS Master，Talker 与 Listern 照常通信。

* 消息发布器一直循环发送msg到topic chatter上；消息订阅器一旦发现 chatter上有data，就会把msg放到一个队列回调函数中，但还未执行callback函数。当运行`ros::spin()`和`ros::spinOnce()`时，就会执行callback函数。
  一般`ros::spin()`后便不在写程序了，后面直接`return 0`。而`ros::spinOnce()`的使用比较灵活，但需要注意的是，在使用这个函数时，需要考虑到消息的调用时机、频率、以及消息池的大小,这个函数比较灵活，尤其是我想控制接收速度的时候。配合`while (ros::ok())`效果极佳。

  ```c++
  ros::Rate loop_rate(10); //10Hz
  while(ros::ok())
  {
      ros::spinOnce();
      loop_rate.sleep();
  }
  ```

* cpp文件在src下，python文件在script下

* 话题通信自定义msg

  * 字段类型：int8, int16, int32, int64 (或者无符号类型: uint*)、float32, float64、string、time, duration、variable-length array[] and fixed-length array[C]、header

  * string类型在c++代码中要使用`.c_str()`转换

  * 步骤主要包括：构建msg/my_msg.msg数据结构，主程序中需要对该对象进行描述、配置package.xml和CMakeLists.txt等

    >复习：Cpp中`.`和`->`说明
    >
    >1. `.`是成员运算符，用于调取成员变量和成员函数；符号`.`的左边必须是实例对象（具体对象），举例为绿色字体；
    >2. `->`是地址运算符，用于引用成员变量和成员函数；符号`->`的左边是实例对象的地址或者类名（结构名），举例为黄色字体；
    >3. 等价形式：d.msg() 和 (\*constpt).msg() 等价

## 服务通信(请求响应模式)

* 服务通信是基于**请求响应**模式的，是一种应答机制。也即: 一个节点A向另一个节点B发送请求，B接收处理请求并产生响应结果返回给A。

* 服务通信更适用于对实时性有要求、具有一定逻辑处理的应用场景。

* 模型

  ![img](https://s2.loli.net/2022/06/02/BOEoabv9pwu4xNI.jpg)

* 1.客户端请求被处理时，需要保证服务器已经启动；

  2.服务端和客户端都可以存在多个。

* 服务通信自定义srv

  * 字段类型、格式，请求和响应用`---`隔开
  * 步骤主要包括：构建srv/my_srv.srv数据结构，主程序中需要对该对象进行描述、配置package.xml和CMakeLists.txt等

## 参数服务器(参数共享模式)

* 参数服务器在ROS中主要用于实现不同节点之间的数据共享。参数服务器相当于是独立于所有节点的一个公共容器，可以将数据存储在该容器中，被不同的节点调用，不同的节点也可以往其中存储数据。
* 存储一些多节点共享的数据，类似于全局变量。
* 可以对参数进行增删改查。
* 模型
  <img src="https://s2.loli.net/2022/06/02/McH9TXoJZsgBvWp.jpg" alt="img" style="zoom: 67%;" />

* 数据类型：32-bit integers、booleans、strings、doubles、iso8601 dates、lists、base64-encoded binary data、字典（参数服务器不是为高性能而设计的，因此最好用于存储静态的非二进制的简单数据）

## 对比

| Topic(话题) | Service(服务)                         |                                              |
| :---------- | :------------------------------------ | -------------------------------------------- |
| 通信模式    | 发布/订阅                             | 请求/响应                                    |
| 同步性      | 异步                                  | 同步                                         |
| 底层协议    | ROSTCP/ROSUDP                         | ROSTCP/ROSUDP                                |
| 缓冲区      | 有                                    | 无                                           |
| 实时性      | 弱                                    | 强                                           |
| 节点关系    | 多对多                                | 一对多(一个 Server)                          |
| 通信数据    | msg                                   | srv                                          |
| 使用场景    | 连续高频的数据发布与接收:雷达、里程计 | 偶尔调用或执行某一项特定功能：拍照、语音识别 |

## API

* 初始化
* 话题服务相关
* 回旋函数
* 时间
* 其他

# 运行管理

## launch文件

## 工作空间覆盖

## 节点名称

## 话题名称

## 参数名称

## 分布式通信

