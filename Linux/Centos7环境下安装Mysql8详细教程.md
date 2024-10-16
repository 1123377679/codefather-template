# Centos7环境下安装Mysql8详细教程

## 上传或下载安装包

下载

官网下载：https://blog.csdn.net/Q3297937831/article/details/139120266

mysql-8.0.26-el7-x86_64.tar.gz

上传

> 使用[xftp](https://so.csdn.net/so/search?q=xftp&spm=1001.2101.3001.7020)等软件将下载好的tar包上传到/opt目录下

![image-20201115201534200](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/029f3aa1b03ff6516dec94e6162d4d71.png)

## 检查是否安装过mysql

ps:因为以前用[yum安装](https://so.csdn.net/so/search?q=yum安装&spm=1001.2101.3001.7020)过，所以先用yum卸载。如果不是此方式或者没安装过则跳过

```
yum remove mysql
```

![image-20201115202336838](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/55c8f9f31bdec5fbfe820dac9f9818a0.png)

查看是否有mysql依赖

```
rpm -qa | grep mysql
```

![image-20201115201927574](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/27c079d785f2d07cdc322da7f6895e4c.png)

如果有则卸载

```
//普通删除模式
rpm -e xxx(mysql_libs)
//强力删除模式,如果上述命令删除时，提示有依赖其他文件，则可以用该命令对其进行强力删除
rpm -e --nodeps xxx(mysql_libs)
```

## 检查是否有mariadb

```
 rpm -qa | grep mariadb
```

![image-20201115202739422](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/50c014ecee226fbc16fc3c3e1978710c.png)

如果有则卸载

```
rpm -e --nodeps mariadb-libs
rpm -e --nodeps mariadb-devel-5.5.65-1.el7.x86_64
```

![image-20201115202849622](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/c1bb5a663f843383e7e0b5fef3fefa79.png)

## 安装mysql依赖包

```
yum install libaio
```

![image-20201115202931461](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/a7d80ce3e635fac6558527e02162a16f.png)

## 解压

```
[root@centos7 opt]# cd /opt
[root@centos7 opt]# tar -zxvf mysql-8.0.26-el7-x86_64.tar.gz
```

![image-20201115203306574](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/3730d7bd989cdd5268a4cae32438aff3.png)

我们查看一下是否解压好了

![image-20201115203524245](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/5847ecab8a0d5b80fe6f5a5d7d9ffe7b.png)

## 更名并移动

为了方便操作以及配置文件的更改我们将文件名重命名为mysql

```
mv mysql-8.0.26-el7-x86_64 mysql
```

![image-20201115203916245](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/4a27aa9b0fa814d3bdcd7916938934c6.png)

按照习惯，我们将文件移动到/usr/local目录下

```
[root@centos7 opt]# mv /opt/mysql/ /usr/local/
```

我们切换到usr/local/目录下查看mysql是否存在

```
[root@centos7 opt]# cd /usr/local/
[root@centos7 local]# ls
```

![image-20201115204242944](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/21219873097a954db010b500dc4d0910.png)

创建数据库文件存放的文件夹。这个文件夹将来存放每个数据库的库文件

```
[root@centos7 local]# cd mysql
[root@centos7 mysql]# mkdir mysqldb
```

![image-20201115204549114](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/86da37eca7b3d56da928dab81e25a061.png)

![image-20201115204519563](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/52068d4c21d64fee185a327adb655706.png)

## mysql安装目录赋予权限

```
[root@centos7 mysql]# chmod -R 777 /usr/local/mysql/
```

![image-20201115204928117](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/90256ca711d60cd3b4043a56c57945ae.png)

## 创建mysql组和用户

创建组

```
[root@centos7 mysql]# groupadd mysql
```

创建用户(-s /bin/false参数指定mysql用户仅拥有所有权，而没有登录权限)

```
[root@centos7 mysql]# useradd -r -g mysql -s /bin/false mysql
```

将用户添加到组中

```
[root@centos7 mysql]# chown -R mysql:mysql ./
```

![image-20201115205404220](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/2996303efe1e2676df716bd3d44f84e9.png)

## 修改mysql配置文件

```
[root@centos7 mysql]# vi /etc/my.cnf
```

将里面的命令都删除掉，然后添加以下命令，保存并退出(如果有一定经验，可以在里面添加一些其他的配置)

```
[mysqld]
# 设置3306端口
port=3306
# 设置mysql的安装目录
basedir=/usr/local/mysql
# 设置mysql数据库的数据的存放目录
datadir=/usr/local/mysql/mysqldb
# 允许最大连接数
max_connections=10000
# 允许连接失败的次数。这是为了防止有人从该主机试图攻击数据库系统
max_connect_errors=10
# 服务端使用的字符集默认为UTF8
character-set-server=utf8
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB
# 默认使用“mysql_native_password”插件认证
default_authentication_plugin=mysql_native_password
[mysql]
# 设置mysql客户端默认字符集
default-character-set=utf8
[client]
# 设置mysql客户端连接服务端时默认使用的端口
port=3306
default-character-set=utf8
```

![image-20201115205731808](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/cc843699bcbcaf6e579692e4d3939161.png)

## 安装mysql

进入mysql 安装目录下：

```
[root@centos7 mysql]# cd /usr/local/mysql/bin/
```

安装mysql，并记住初始化随机密码

```
./mysqld --initialize --console
```

![image-20201115210059191](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/9d0a19d9cd4adc939a739328359b0d2f.png)

## 启动mysql服务

进入mysql.server服务目录下并启动服务

```
[root@centos7 bin]# cd /usr/local/mysql/support-files
[root@centos7 support-files]# ./mysql.server start
```

如果第一次启动，当初始化执行会有报错

![image-20201115210617416](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/f67e7043b76f023de8bc34d4f3c04e1f.png)

此时不要担心，重新给mysql安装目录赋予一下权限后，再次执行

```
[root@centos7 support-files]# chmod -R 777 /usr/local/mysql
[root@centos7 support-files]# ./mysql.server start
```

## 将mysql添加到系统进程中

```
cd /bin
[root@centos7 bin]# cp /usr/local/mysql/support-files/mysql.server /etc/init.d/mysqld
```

此时我们就可以使用服务进程操作mysql了

## 设置mysql自启动

```
[root@centos7 bin]# chmod +x /etc/init.d/mysqld
[root@centos7 bin]# systemctl enable mysqld
```

![image-20201115212503252](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/1eb2b9983be5d0945708f2579a3f3e00.png)

此时mysql自启动就已经设置好了

## 修改root用户登录密码

登录mysql

```
[root@centos7 bin]# cd /usr/local/mysql/bin/
[root@centos7 bin]# ./mysql -u root -p
```

执行后，输入我们初始化时记录下的随机密码，就会进入mysql

![image-20201115213103551](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/b4c9e9d850a999d78aef222bc587815d.png)

然后修改密码

```
alter user 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123456';
```

![image-20201115213337447](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/51e3f9a2787659c17f2fa7c2ec2efe1c.png)

## 允许远程登录

```
mysql> use mysql
mysql> update user set user.Host='%'where user.User='root';
mysql> flush privileges;
mysql> quit
```

## 重启服务且测试

centos6与centos7的服务命令都支持

```
[root@centos7 bin]# systemctl restart mysql	
[root@centos7 bin]# service mysql restart
```

查看mysql是否启动

```
[root@centos7 bin]# systemctl status mysql
```

![image-20201115214024990](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/c54714a3ffe955b6fb556685d8aafdc5.png)

## 查看防火墙开放端口

```
firewall-cmd --list-all
```

![image-20201115214323098](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/f3088de6ecc7fe0065d7cb44f15b4f43.png)

## 在防火墙中将3306端口开放

```
[root@centos7 bin]# firewall-cmd --zone=public --add-port=3306/tcp --permanent
[root@centos7 bin]# firewall-cmd --reload
//--permanent为永久生效，没有此参数 服务器重启后配置失效
```

![image-20201115214503373](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/5fc197e9032d65802af135cc9cc0057e.png)

## 在Navicat上测试连接

![image-20201115214602524](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/3be416d686d253c37cd085b9301387ce.png)

## 重启linux后测试自启动（可选）

```
[root@centos7 bin]# reboot
```

![image-20201115214746520](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/af0dc5a4ab9ece461f3cc3d3b84c1440.png)

测试mysql服务是否自启动

![image-20201115214839908](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/f8eb6839e90f0a81c8c877fb69088326.png)

测试远程访问

![image-20201115214856423](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/3b0a8475ed87887bd94b6d5c3b08be8f.png)











