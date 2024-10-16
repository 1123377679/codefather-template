# Mysql安装

1.Mysql安装包下载地址:

https://downloads.mysql.com/archives/community/

2.下载

![image-20230215113304518](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230215113304518.png)

3.下载好之后，把它解压到你创建的文件夹里面去

![image-20230215113334500](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230215113334500.png)

## 配置环境变量

1.右键我的电脑->属性->高级系统配置->环境变量

2.在**系统变量**中选择Path,在其后面添加: 你mysql的**bin文件夹**的路径 ：

## my.ini文件配置

1.在**安装目录**下新键一个my.ini文件,注意后缀是.ini

2.然后打开my.ini文件，填入下列内容。

my.ini文件配置的内容:

```

[mysqld]
# 设置3306端口
port=3306
# 设置mysql的安装目录    -- 你mysql的安装路径
basedir=D:\IT\Mysql8.0.26\mysql-8.0.26-winx64
# 设置mysql数据库的数据的存放目录 --安装文件路径下的data文件夹会自行创建
datadir=D:\IT\Mysql8.0.26\mysql-8.0.26-winx64\data
# 允许最大连接数
max_connections=200
# 允许连接失败的次数。
max_connect_errors=10
# 服务端使用的字符集默认为utf8mb4
character-set-server=utf8mb4
# 创建新表时将使用的默认存储引擎
default-storage-engine=INNODB
# 默认使用“mysql_native_password”插件认证
#mysql_native_password
default_authentication_plugin=mysql_native_password
[mysql]
# 设置mysql客户端默认字符集
default-character-set=utf8mb4
[client]
# 设置mysql客户端连接服务端时默认使用的端口
port=3306
default-character-set=utf8mb4
```

记得把basedir和datadir改成你的对应目录。

## 开始安装

### 1.cmd打开命令提示符.

**注意**：要以**管理员**的**方式启动**。

![在这里插入图片描述](https://img-blog.csdnimg.cn/fbd1c8db2ae54305bfac5e69d305d7b8.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80Mjg2ODYwNQ==,size_16,color_FFFFFF,t_70)

### 2.输入命令

```
mysqld --initialize --console
```

![image-20230215121343442](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230215121343442.png)

安装成功会出现一个临时密码：(前后不要包含空格)

**临时密码要记住了！等下要用！**

如果你因为一些原因，导致这里没有出现临时密码，那请查看这篇文章,希望可以帮到你。
**临时密码没出现的解决方式：**

https://blog.csdn.net/weixin_42868605/article/details/119802629

### 2.安装服务

```
mysqld --install
```

提示**Service successfully installed**.则**代表成功**。

![image-20230215121525462](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230215121525462.png)

如果是**The service already exists!**，则说明有问题了，可以看一下这篇文章：
**The service already exists!错误解决：**

https://blog.csdn.net/weixin_42868605/article/details/119800929

## 启动服务及修改密码

### 1.启动服务

输入：

```
net start mysql
```

![image-20230215121616134](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230215121616134.png)

如果你的服务启动不成功，可以参考一下这篇文章：
**mysql服务启动不成功的解决方式：**
https://blog.csdn.net/weixin_42868605/article/details/119801144

### 2.登录root账户。

命令行输入：

```
mysql -uroot -p
```

在跳出的Enter password后输入密码，即可登录。（**这里的密码就是上面提到的临时密码**）
一般临时密码都包含着数字字符和符号，手打容易出错，建议复制。
**命令行复制的方式**：**ctrl+c复制**之后，在**要粘贴的位置**点击一下**鼠标右键**即可粘贴。

![image-20230215121712360](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230215121712360.png)

### 3.修改密码

命令行输入：

```
ALTER USER 'root'@'localhost' IDENTIFIED BY '新的密码';
```

**注意**：这里的密码是有**单引号**的，而且还以**分号结尾**，还有都是**英文状态下的符号**，别搞错了。

如下图则表示修改成功。

![image-20230215121808580](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230215121808580.png)