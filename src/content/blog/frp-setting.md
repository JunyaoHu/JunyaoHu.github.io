---
title: 内网穿透配置
publishedDate: 2023-10-5 18:00:00
tags: [计算机网络]
category: 课外学习
---

> 免责声明：仅供学习计算机网络知识，内网穿透有风险，请谨慎对待。实验室学生有义务保障实验室网络安全，保护实验室设备资产。

# 云服务器

## 购买

选择轻量应用服务器

腾讯云45元每月，且买一年以上85折扣。选的这个。

阿里云60元每月。

## 配置

### 防火墙配置

在网站上配置，包含后面需要的端口即可

腾讯云界面

![image-20231006152435422](https://s2.loli.net/2023/10/06/MTtO4ACF6LcQejw.png)

阿里云界面

![](https://s2.loli.net/2023/10/06/MTtO4ACF6LcQejw.png)

### frp配置

下载最新的frp：[https://github.com/fatedier/frp](https://github.com/fatedier/frp)

解压frp到/home/ubuntu/，文件夹重命名为frp

创建/home/ubuntu/frp_hjy存放服务器配置

以配置u15为例，在frp_hjy文件夹下创建frps15.ini，内容如下，7025和u15相连，8025是内网http服务，总的配置见附表

```txt
[common]
bind_port = 7025
vhost_http_port = 8025
```

### service配置

在/lib/systemd/system/下创建u15的frps15.service

```txt
sudo touch /lib/systemd/system/frps15.service
sudo vim /lib/systemd/system/frps15.service

########################################################
[Unit]
Description=fraps service
After=network.target network-online.target syslog.target
Wants=network.target network-online.target

[Service]
Type=simple

# 启动服务的命令 第一个是服务器服务 第二个是frp配置
ExecStart=/home/ubuntu/frp/frps -c /home/ubuntu/frp_hjy/frps15.ini
KillSignal=SIGQUIT
TimeoutStopSec=5
KillMode=process
PrivateTmp=true
StandardOutput=syslog
StandardError=inherit

[Install]
WantedBy=multi-user.target
########################################################
```

## 启动

```txt
systemctl enable frps15.service
systemctl start frps15.service
systemctl status frps15.service
```

![image-20231006152516828](https://s2.loli.net/2023/10/06/KIoAywa7gDbziVm.png)

# 实验室服务器配置

## 下载

略

## 配置

### frp配置

以配置u15为例，在/home/ubuntu15/hjy/frp/文件夹下创建frphjy.ini，内容如下，7025和云服务器相连，6025和自己的电脑相连，总的配置见附表

```txt
mkdir -p ...
sudo touch /home/ubuntu15/hjy/frp/frphjy.ini
sudo vim /home/ubuntu15/hjy/frp/frphjy.ini

##################################
[common]
# 云服务器公网ip
server_addr = 我会告诉你？
server_port = 7025

[ssh]
type = tcp
local_ip = 127.0.0.1
local_port = 22
remote_port = 6025
#################################
```

### service配置

在/lib/systemd/system/下创建u15的frps15.service

```txt
sudo touch /lib/systemd/system/frphjy.service
sudo vim /lib/systemd/system/frphjy.service

########################################################
[Unit]
Description=fraps service
After=network.target network-online.target syslog.target
Wants=network.target network-online.target

[Service]
Type=simple

# 启动服务的命令 第一个是客户端服务（是c） 第二个是frp配置
ExecStart=/home/ubuntu15/zzc/frp/frpc -c /home/ubuntu15/hjy/frp/frphjy.ini
KillSignal=SIGQUIT
TimeoutStopSec=5
KillMode=process
PrivateTmp=true
StandardOutput=syslog
StandardError=inherit

[Install]
WantedBy=multi-user.target
########################################################
```

## 启动

```txt
systemctl enable frphjy.service
systemctl start frphjy.service
systemctl status frphjy.service
```

![image-20231006152534471](https://s2.loli.net/2023/10/06/6YqQrefNb5xZyDO.png)
