# Redis

![image-20241124223948327](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241124223948327.png)

redis数据库跟传统的数据库有很大的区别，redis没有表，也没有约束，所以我们称之为NoSQL数据库(非关系型数据库)

## 初始Redis

### 认识NoSQL

NoSQL我们比较陌生，但是SQL我们是比较熟悉的，叫做关系型数据库

那NoSQL叫做 非关系型数据库

SQL中的S代表着结构化(Structured)

![image-20241124225616387](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241124225616387.png)

NoSQL中就是非结构化,但是不完全没有结构，比如他的存储结构是属于key : value的

![image-20241124225653030](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241124225653030.png)

最重要的其实是，关系型数据库表与表之间是有关联的

![image-20241124225931642](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241124225931642.png)

而且SQL数据库是有专用的SQL语句去操作数据库

![image-20241124230224912](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241124230224912.png)

但是Nosql 是这样的：

![image-20241124230239586](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241124230239586.png)

还有就是SQL可以执行事务，但NoSQL不行

总结:
![image-20241124230556655](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241124230556655.png)

### 认识Redis

为什么会出现Redis呢，实际就是因为Mysql的性能不行

特征:

- 键值型(Key-value)，value支持多种不同数据结构，功能丰富
- 单线程，每个命令具备原子性
- 低延迟，速度快(基于内存、IO多路复用，良好的编码)
- 支持数据持久化
- 支持主从集群，分片集群
- 支持多语言客户端

### 安装Redis

大多数企业都是基于Linux服务器来部署项目，而且Redis官方也没有提供widows版本的安装包，因此，课程中我们会基于Linux系统来安装Redis

我们使用的Linux版本是Centos7

Redis的官方网站地址:https://redis.io/

#### 安装Redis依赖

Redis是基于C语言编写的，因此首先需要安装Redis所需要的gcc依赖

```sh
yum install -y gcc tcl
```

#### 上传redis的安装包并解压

将redis安装包上传到虚拟机的任意目录:

例如:我放到了/usr/local/src目录：

然后解压当前压缩包

```sh
tar -zxvf 
```

然后进入解压的文件夹

```sh
make install
```

默认的安装路径是在:/usr/local/bin目录下

#### 启动

```sh
redis-server
```

这种启动属于前台启动，会阻塞整个会话窗口，窗口关闭或者按下ctrl+c则redis停止，但是不推荐使用



如果要让redis以后台的方式启动，则必须修改redis配置文件，就在我们之前解压的redis安装包下/usr/local/src/redis-6.2.6,名字叫redis.conf:



我们需要将这个配置文件备份

```sh
cp redis.conf redis.conf.bck
```



然后修改redis.conf文件中的一些配置：

![image-20241124232547226](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241124232547226.png)

```properties
bind 0.0.0.0
daemonize yes
requirepass 123456

port 6379
dir .
databases 1
maxmemory 512mb
logfile "redis.log"
```

![image-20241124232829526](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241124232829526.png)



然后重启redis

```sh
# 进入redis安装目录
cd /usr/local/src/redis-6.2.6
# 启动
redis-server redis.conf
```



停止服务

```sh
redis-cli -u 123456 shutdown
```



#### 开机自启动

我们也可以通过配置来实现开机自启

首先，新建一个系统服务文件

```sh
vi /etc/systemd/system/redis.service
```

内容如下

```properties
[Unit]
Description=redis-server
After=network.target

[Service]
Type=forking
ExecStart=/usr/local/bin/redis-server /user/local/src/redis-6.2.6/redis.conf
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```



重新加载系统服务:

```sh
systemctl daemon-reload
systemctl start redis
systemctl statis redis
systemctl stop redis
systemctl restart redis

systemctl enable redis

# 最后启动redis
systemctl start redis
# 检查
ps -ef | grep redis
```

Redis安装完成后就子嗲了命令行客户端，redis-cli 使用方式如下:

```sh
redis-cli [options][commonds]
```

其中常见的options有:

- -h 127.0.0.1:指定要连接的redis节点的ip地址，默认为127.0.0.1
- -p 6379 指定要连接的redis节点的端口，默认是6379
- -a 123456 指定redis的访问密码

其中的commonds就是redis的操作命令，例如：

- ping：与redis服务端看是否能正常ping通

不能定commond时，会进入redis-cli的交互控制台

### redis可视化工具

https://github.com/lework/RedisDesktopManager-Windows/releases

## Redis常见命令

### Redis的数据结构命令

https://www.redis.net.cn/order/

Redis是一个key-value的数据库，key一般是String类型，不过value的类型多种多样:

![image-20241128153913270](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241128153913270.png)

## Redis的Java客户端

