---
title: 书生大模型实战营-L0-Linux基础知识
publishedDate: 2024-09-30 10:00:00
tags: [大模型]
category: 课外学习
---

# 本节任务要点

- 完成SSH连接与端口映射并运行`hello_world.py`

- 将Linux基础命令在开发机上完成一遍

- 使用 VSCODE 远程连接开发机并创建一个conda环境

# 实践流程

## 创建开发机、远程连接、端口映射

在InternStudio创建开发机

网址：https://studio.intern-ai.org.cn/console/dashboard

创建个人开发机，名称为junyaohu，cuda版本为12.2，资源配置选择10%，时长默认就行。

![image-20240930104534962](https://s2.loli.net/2024/09/30/AmD4Pt7kMWaGCwL.png)

开发机界面提示

![image-20240930105434216](https://s2.loli.net/2024/09/30/mNY9ZiADkQnT5oa.png)

使用密码进行SSH远程连接

```
ssh -p 33006 root@ssh.intern-ai.org.cn -o StrictHostKeyChecking=no -o UserKnownHostsFile=/dev/null
```

![image-20240930105814732](https://s2.loli.net/2024/09/30/r2PeSukGhCWIvnb.png)

测试基本命令

![image-20240930110039173](https://s2.loli.net/2024/09/30/Phkym495cUuQBnN.png)

使用配置SSH密钥进行SSH远程连接（之前连接code的时候已经生成过，直接用）

```
ssh-keygen -t rsa
```

在官网添加ssh连接，重启终端

![image-20240930110709046](https://s2.loli.net/2024/09/30/mGLBoNOZqnXW5cA.png)

在本地配置好config后直接使用code连接

![image-20240930110921402](https://s2.loli.net/2024/09/30/1peOc2RfdZsPQw4.png)

code连接成功

![image-20240930111054210](https://s2.loli.net/2024/09/30/YGsmT3Ad8LlQup9.png)

## 使用 ssh/code进行端口映射

开发机界面，找到我们的开发机，点击自定义服务，复制命令到本地终端

```
ssh -p 33006 root@ssh.intern-ai.org.cn -CNg -L {本地机器_PORT}:127.0.0.1:{开发机_PORT} -o StrictHostKeyChecking=no

ssh -p 33006 root@ssh.intern-ai.org.cn -CNg -L 7860:127.0.0.1:7860 -o StrictHostKeyChecking=no
```

开发机运行

```
gradio hello_world.py 或者 python hello_world.py 
```

在本地浏览器打开 http://127.0.0.1:7860，成功连接

![image-20240930112555795](https://s2.loli.net/2024/09/30/pX4yJUsGRh3Koa8.png)

使用 vscode 进行端口映射

![image-20240930113053900](https://s2.loli.net/2024/09/30/JHedGZM6kIqEUnu.png)

## Linux基础命令

<img src="https://s2.loli.net/2024/09/30/aAGrCg1TIQhJ26t.png" alt="image-20240930113407837" style="zoom:50%;" />

## 创建conda环境

开发机远程执行命令

```
conda create -n hjy python=3.10
conda activate hjy
conda deactivate
```

<img src="https://s2.loli.net/2024/09/30/WkxGMEUQNTI47jr.png" alt="image-20240930114738592" style="zoom:50%;" />

# 总结

回顾基础，温故知新

