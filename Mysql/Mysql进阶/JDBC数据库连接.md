# JDBC

JDBC就是使用Java语言操作关系型数据库的一套API

![image-20230131175912943](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230131175912943.png)

## JDBC概述

JDBC就是使用Java语言操作关系型数据库的一套API

全称：（Java DataBase Connectivity)Java数据库连接

## JDBC本质

本质：

官方(sun公司)定义的一套操作所有关系型数据库的规则，即接口

各个数据库厂商去实现这套接口，提供数据库驱动jar包

我们可以使用这套接口(JDBC)编程，真正执行的代码是驱动jar包中的实现类

## JDBC好处

各数据库厂商使用相同的接口，Java代码不需要针对不同数据库分别开发

可随时替换底层数据库，访问数据库的Java代码基本不变

## 使用JDBC步骤

![image-20230131181200145](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230131181200145.png)

![image-20230131210852499](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230131210852499.png)

![image-20230131181207582](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230131181207582.png)

## JDBCAPI详解

### DriverManager

DriverManager(驱动管理类)作用：
1.注册驱动

![image-20230131212153504](E:\md图片\image-20230131212153504.png)

![image-20230131212224275](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230131212224275.png)

2.获取数据库连接

提示：

MySQL5之后的驱动包，可以省略注册驱动的步骤

自动加载jar包中META-lNF/services/java.sql.Driver文件中的驱动类

### Connection

Connection(数据库连接对象)作用：

1.获取执行SQL的对象

​	普通执行SQL对象

![image-20230131212818464](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230131212818464.png)

​	预编译SQL的执行对象：防止SQL注入

![image-20230131212841544](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230131212841544.png)

​	执行存储过程的对象

![image-20230131212853574](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230131212853574.png)

2.管理事务

### Statement

Statement作用：

​	1.执行SQL语句

执行SQL语句：

![image-20230131214129775](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230131214129775.png)

![image-20230131214134443](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230131214134443.png)

### ResultSet

ResultSet(结果集对象)作用:

​	1.封装了DQL查询语句的结果

![image-20230131214857672](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230131214857672.png)

获取查询结果：

![image-20230131214911412](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230131214911412.png)

![image-20230131214917039](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230131214917039.png)

#### ResultSet案例

需求：查询account账户表数据，封装为Account对象中，并且存储到ArrayList集合中

![image-20230131215946981](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230131215946981.png)

### PreparedStatement

PreparedStatement的作用：

​	1.预编译SQL语句并执行，预防SQL注入问题

防止SQL注入

​	SQL注入是通过操作输入来修改事先定义好的SQL语句，用以达到执行代码对服务器进行攻击的方法。

防止SQL注入步骤:

1.获取prepareStatement对象

```
//prepareStatement对象
PreparedStatement statement = conn.prepareStatement(sql);
```

2.设置参数值

```
//定义SQL
String sql = "select * from lanqiao_user where username = ? and password = ?";
//prepareStatement对象
PreparedStatement statement = conn.prepareStatement(sql);
//设置?的值
statement.setString(1,name);
statement.setString(2,ps);
```

3.执行SQL

```
//执行sql，不需要传递sql
ResultSet resultSet = statement.executeQuery();
```

# 数据库连接池

## 简介

**数据库连接池**是个容器，负责分配、管理数据库连接(Connection)

它允许应用程序重复使用一个现有的数据库连接，而不是再重新建立一个；

释放空闲时间超过最大空闲时间的数据库连接来避免因为没有释放数据库连接而引起的数据库连接遗漏

好处：

资源重用

提升系统响应速度

避免数据库连接遗漏

配置文件

```
driverClassName=com.mysql.jdbc.Driver
url=jdbc:mysql://192.168.141.128:3306/test
username=root
password=123456
#初始化连接数
initialSize=5
#最大链接数
maxActive=10
#最大等待时间
maxWait=3000
```

连接druid

```
package cn.lanqiao.driud;

import com.alibaba.druid.pool.DruidAbstractDataSource;
import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.pool.DruidDataSourceFactory;

import javax.sql.DataSource;
import java.io.FileInputStream;
import java.sql.Connection;
import java.util.Properties;

public class DriudDemo {
    public static void main(String[] args) throws Exception {
        //1.导入jar包
        //2.定义配置文件
        //3.加载配置文件
        Properties properties = new Properties();
        properties.load(new FileInputStream("Mysql-JDBC/src/druid.properties"));
        //4.获取连接池对象
        DataSource dataSource = DruidDataSourceFactory.createDataSource(properties);
        //5.获取数据库连接
        Connection connection = dataSource.getConnection();
        System.out.println(connection);
//        System.out.println(System.getProperty("user.dir"));

    }
}

```

## 完成商品品牌数据的增删改查操作

查询：查询所有数据

添加：添加品牌

修改：根据id修改

删除：根据id删除