# Mybatis简介

## Mybatis历史

- MyBatis最初是Apache的一个开源项目iBatis, 2010年6月这个项目由Apache Software Foundation迁移到了Google Code。随着开发团队转投Google Code旗下，MyBatis.x正式更名为MyBatis。代码于2013年11月迁移到Github

- MyBatis一词来源于“internet”和“abatis”的组合，是一个基于Java的持久层框架。MyBatis提供的持久层框架包括SQL Maps和Data Access Objects（DAO）

## Mybatis的特性

MyBatis 是支持定制化 SQL、存储过程以及高级映射的优秀的持久层框架

MyBatis 避免了几乎所有的 JDBC 代码和手动设置参数以及获取结果集

MyBatis可以使用简单的XML或注解用于配置和原始映射，将接口和Java的POJO（Plain Old Java Objects，普通的Java对象）映射成数据库中的记录

MyBatis 是一个 半自动的ORM（Object Relation Mapping）框架



## Mybatis的下载

https://gitcode.net/mirrors/mybatis/mybatis-3?utm_source=csdn_github_accelerator

![在这里插入图片描述](https://img-blog.csdnimg.cn/2cee4ebdf2af47ff9c033ab329ed48b1.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6IuN6IyX,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

## 和其它持久化层技术对比

`JDBC`
	SQL 夹杂在Java代码中耦合度高，导致硬编码内伤

​	维护不易且实际开发需求中 SQL 有变化，频繁修改的情况多见

​	代码冗长，开发效率低

`Hibernate 和 JPA`
	操作简便，开发效率高

​	程序中的长难复杂 SQL 需要绕过框架

​	内部自动生产的 SQL，不容易做特殊优化

​	基于全映射的全自动框架，大量字段的 POJO 进行部分映射时比较困难。

​	反射操作太多，导致数据库性能下降

`MyBatis`

​	轻量级，性能出色

​	SQL 和 Java 编码分开，功能边界清晰。Java代码专注业务、SQL语句专注数据

​	开发效率稍逊于HIbernate，但是完全能够接受


## 搭建Mybatis

创建Maven工程

- 打包方式:jar

- 引入依赖

- ```xml
  <dependencies>
  	<!-- Mybatis核心 -->
  	<dependency>
  		<groupId>org.mybatis</groupId>
  		<artifactId>mybatis</artifactId>
  		<version>3.5.7</version>
  	</dependency>
  	<!-- junit测试 -->
  	<dependency>
  		<groupId>junit</groupId>
  		<artifactId>junit</artifactId>
  		<version>4.12</version>
  		<scope>test</scope>
  	</dependency>
  	<!-- MySQL驱动 -->
  	<dependency>
              <groupId>mysql</groupId>
              <artifactId>mysql-connector-java</artifactId>
              <version>8.0.26</version>
          </dependency>
  </dependencies>
  
  ```

  ## 创建MyBatis的核心配置文件

  > 习惯上命名为mybatis-config.xml，这个文件名仅仅只是建议，并非强制要求。将来整合Spring之后，这个配置文件可以省略，所以大家操作时可以直接复制、粘贴。
  >
  > 核心配置文件主要用于配置连接数据库的环境以及MyBatis的全局配置信息
  >
  > 核心配置文件存放的位置是src/main/resources目录下

```java
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <!--设置连接数据库的环境-->
    <environments default="development">
        <environment id="development">
     		<!--底层是JDBC-->
            <transactionManager type="JDBC"/>
            <!--配置数据库的连接信息-->
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.cj.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/lanqiao?serverTimezone=GMT"/>
                <property name="username" value="root"/>
                <property name="password" value="123456"/>
            </dataSource>
        </environment>
    </environments>
    <!--引入映射文件-->
    <mappers>
        <mapper resource="cn/lanqiao/mapper/UserMapper.xml"/>
    </mappers>
</configuration>

```

## 创建Mapper接口

> MyBatis中的mapper接口相当于以前的dao。但是区别在于，mapper仅仅是接口，我们不需要提供实现类

```java
package com.atguigu.mybatis.mapper;  
  
public interface UserMapper {  
	/**  
	* 添加用户信息  
	*/  
	int insertUser();  
}

```

## 创建Mybatis的映射文件

- 相关概念：ORM（Object Relationship Mapping）对象关系映射。
  - 对象：Java的实体类对象
  - 关系：关系型数据库
  - 映射：二者之间的对应关系

| Java概念 | 数据库概念 |
| -------- | ---------- |
| 类       | 表         |
| 属性     | 字段/列    |
| 对象     | 记录/行    |

- 映射文件的命名规则
  - 表所对应的实体类的类名+Mapper.xml
  - 例如：表t_user，映射的实体类为User，所对应的映射文件为UserMapper.xml
  - 因此一个映射文件对应一个实体类，对应一张表的操作
  - MyBatis映射文件用于编写SQL，访问以及操作表中的数据
  - MyBatis映射文件存放的位置是src/main/resources/mappers目录下

- MyBatis中可以面向接口操作数据，要保证两个一致
  - mapper接口的全类名和映射文件的命名空间（namespace）保持一致
  - mapper接口中方法的方法名和映射文件中编写SQL的标签的id属性保持一致

```java
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="cn.lanqiao.mapper.UserMapper">
    <!--int insertUser();-->
    <insert id="insertUser">
        insert into account values(null,'王五',3000)
    </insert>
</mapper>
```

## 通过junit测试功能

- SqlSession：代表Java程序和数据库之间的会话。（HttpSession是Java程序和浏览器之间的会话）

- SqlSessionFactory：是“生产”SqlSession的“工厂”

- 工厂模式：如果创建某一个对象，使用的过程基本固定，那么我们就可以把创建这个对象的相关代码封装到一个“工厂类”中，以后都使用这个工厂类来“生产”我们需要的对象

```java
public class MybatisTest {
    @Test
    public void testMybatis() throws Exception{
        //根据字节输入流的方式读取MyBatis的核心配置文件
        InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
        //获取SqlSessionFactoryBuilder对象
        SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
        //通过核心配置文件所对应的字节输入流创建工厂类SqlSessionFactory，生产SqlSession对象
        SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(is);
        //获取sqlSession，此时通过SqlSession对象所操作的sql都必须手动提交或回滚事务
        //SqlSession sqlSession = sqlSessionFactory.openSession();
        //创建SqlSession对象，此时通过SqlSession对象所操作的sql都会自动提交
        SqlSession sqlSession = sqlSessionFactory.openSession(true);
        //通过代理模式创建UserMapper接口的代理实现类对象
        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
        //调用UserMapper接口中的方法，就可以根据UserMapper的全类名匹配元素文件，通过调用的方法名匹配映射文件中的SQL标签，并执行标签中的SQL语句
        int result = userMapper.insertUser();
        //提交事务
        //sqlSession.commit();
        System.out.println("result:" + result);
    }
}
```

- 此时需要手动提交事务，如果要自动提交事务，则在获取sqlSession对象时，使用`SqlSession sqlSession = sqlSessionFactory.openSession(true);`，传入一个Boolean类型的参数，值为true，这样就可以自动提交

## 加入log4j日志功能

1.加入依赖

```java
<!-- log4j日志 -->
<dependency>
	<groupId>log4j</groupId>
	<artifactId>log4j</artifactId>
	<version>1.2.17</version>
</dependency>
```

2.加入log4j的配置文件

- log4j的配置文件名为log4j.xml，存放的位置是src/main/resources目录下
- 日志的级别：FATAL(致命)>ERROR(错误)>WARN(警告)>INFO(信息)>DEBUG(调试) 从左到右打印的内容越来越详细

```java
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE log4j:configuration SYSTEM "log4j.dtd">
<log4j:configuration xmlns:log4j="http://jakarta.apache.org/log4j/">
    <appender name="STDOUT" class="org.apache.log4j.ConsoleAppender">
        <param name="Encoding" value="UTF-8" />
        <layout class="org.apache.log4j.PatternLayout">
			<param name="ConversionPattern" value="%-5p %d{MM-dd HH:mm:ss,SSS} %m (%F:%L) \n" />
        </layout>
    </appender>
    <logger name="java.sql">
        <level value="debug" />
    </logger>
    <logger name="org.apache.ibatis">
        <level value="info" />
    </logger>
    <root>
        <level value="debug" />
        <appender-ref ref="STDOUT" />
    </root>
</log4j:configuration>

```

>## 日志级别:
>
>FATAL(致命的)>ERROR(错误的)>WARN(警告)>INFO(信息)>DEBUG(调试)
>
>从左到右打印的内容越来越详细

# Mybatis的CRUD

## User

```java
package cn.lanqiao.pojo;

public class User {
    private Integer id;
    private String name;
    private Integer money;

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", money=" + money +
                '}';
    }

    public User(Integer id, String name, Integer money) {
        this.id = id;
        this.name = name;
        this.money = money;
    }

    public User() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getMoney() {
        return money;
    }

    public void setMoney(Integer money) {
        this.money = money;
    }

}

```

## UserMapper

```java
package cn.lanqiao.mapper;

import cn.lanqiao.pojo.User;

public interface UserMapper {
    /**
     * 添加用户信息
     */
    int insertUser();

    /**
     *
     * 修改用户信息
     * @return
     */
    int updateUser();

    /**
     *
     * 删除用户
     */
    int deleteUser();

    /**
     * 根据id查询用户信息
     */
    User getUserByid();
    
    /**
     * 查询所有用户的信息
     */
    List<User> getAllUser();
}

```



## mybatis-config.xml配置文件

```java
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="cn.lanqiao.mapper.UserMapper">
    <!--int insertUser();-->
    <insert id="insertUser">
        insert into account values(null,'王五',3000);
    </insert>
    <update id="updateUser">
        UPDATE account SET name='张四',money = 3000 WHERE id = 2;
    </update>
    <delete id="deleteUser">
        DELETE from account where id = 3;
    </delete>
    <!--
    查询功能的标签必须要设置resultMap或者resultType
    resultType:设置默认的映射关系
    resultMap：设置自定义的映射关系
    -->
    <select id="getUserByid" resultType="cn.lanqiao.pojo.User">
        SELECT * FROM account where id = 1;
    </select>
    
    <select id="getAllUser" resultType="cn.lanqiao.pojo.User">
        SELECT * FROM account;
    </select>
</mapper>
```

## 测试类

```java
package org.lanqiao.test;

import cn.lanqiao.mapper.UserMapper;
import cn.lanqiao.pojo.User;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.Test;

import java.io.IOException;
import java.io.InputStream;

public class MybatisTest {
    //添加
    @Test
    public void testMybatis() throws Exception{
        //读取MyBatis的核心配置文件
        InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
        //获取SqlSessionFactoryBuilder对象
        SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
        //通过核心配置文件所对应的字节输入流创建工厂类SqlSessionFactory，生产SqlSession对象
        SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(is);
        //获取sqlSession，此时通过SqlSession对象所操作的sql都必须手动提交或回滚事务
        //SqlSession sqlSession = sqlSessionFactory.openSession();
        //创建SqlSession对象，此时通过SqlSession对象所操作的sql都会自动提交
        SqlSession sqlSession = sqlSessionFactory.openSession(true);
        //通过代理模式创建UserMapper接口的代理实现类对象
        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
        //调用UserMapper接口中的方法，就可以根据UserMapper的全类名匹配元素文件，通过调用的方法名匹配映射文件中的SQL标签，并执行标签中的SQL语句
        int result = userMapper.insertUser();
        //提交事务
        //sqlSession.commit();
        System.out.println("result:" + result);
    }
    //修改
    public void testUpdate() throws IOException {
        InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
        SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
        SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(is);
        SqlSession sqlSession = sqlSessionFactory.openSession(true);
        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
        int result = userMapper.updateUser();
        //sqlSession.commit();
        System.out.println("result:" + result);
    }
    //删除
    @Test
    public void testDelect() throws Exception{
        InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
        SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
        SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(is);
        SqlSession sqlSession = sqlSessionFactory.openSession(true);
        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
        int result = userMapper.deleteUser();
        //sqlSession.commit();
        System.out.println("result:" + result);
    }
    @Test
    //查询
    public void testSelect() throws IOException {
        InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
        SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
        SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(is);
        SqlSession sqlSession = sqlSessionFactory.openSession(true);
        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
        User result = userMapper.getUserByid();
        //sqlSession.commit();
        System.out.println("result:" + result);
    }
    
    @Test
    //查询所有
    public void testSelectAll() throws IOException {
        InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
        SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
        SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(is);
        SqlSession sqlSession = sqlSessionFactory.openSession(true);
        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
        List<User> allUser = userMapper.getAllUser();
        //sqlSession.commit();
        allUser.forEach(user -> System.out.println("result:" + user));
    }
}

```

```java
package org.lanqiao.utils;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;

public class SqlSessionUtil {
    private SqlSessionUtil() {//构造方法私有化
    }

    public static SqlSessionFactory sqlSessionFactory;

    //类加载的时候执行
    static {
        try {
            sqlSessionFactory = new SqlSessionFactoryBuilder().build(Resources.getResourceAsStream("mybatis-config.xml"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 获取SqlSession会话
     * @return SqlSession对象
     */
    public static SqlSession getSession(){
        return sqlSessionFactory.openSession();
    }
}

```

```java
public class SqlSessionUtils {

    public static SqlSession getSqlSession() throws Exception{
        SqlSession sqlSession = null;
        try {
            InputStream resourceAsStream = Resources.getResourceAsStream("mybatis-config.xml");
            SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(resourceAsStream);
            sqlSession = sqlSessionFactory.openSession(true);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return sqlSession;
    }
}
```

# Mybatis核心配置文件之Properties

## jdbc.properties

```
jdbc.driver=com.mysql.cj.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/lanqiao?serverTimezone=GMT
jdbc.username=root
jdbc.password=123456
```

## Mybatis-config.xml

```java
<!--需要在configuration标签中添加上这样一段代码-->
<!--引入properties文件 -->
<properties resource="jdbc.properties"/>

<property name="driver" value="${jdbc.driver}"/>
                <property name="url" value="${jdbc.url}"/>
                <property name="username" value="${jdbc.username}"/>
                <property name="password" value="${jdbc.password}"/>
```

# Mybatis核心配置文件之typeAliases

>核心配置文件中的标签必须按照固定的顺序(有的标签可以不写，但顺序一定不能乱)：
>properties、settings、typeAliases、typeHandlers、objectFactory、objectWrapperFactory、reflectorFactory、plugins、environments、databaseIdProvider、mappers

```java
<typeAliases>
        <!--
        typeAlias：设置某个具体的类型的别名
        属性：
        type：需要设置别名的类型的全类名
        alias：设置此类型的别名，且别名不区分大小写。若不设置此属性，该类型拥有默认的别名，即类名
        -->
        <!--<typeAlias type="com.atguigu.mybatis.bean.User"></typeAlias>-->
        <!--<typeAlias type="com.atguigu.mybatis.bean.User" alias="user">
        </typeAlias>-->
        <!--以包为单位，设置改包下所有的类型都拥有默认的别名，即类名且不区分大小写-->
        <package name="com.atguigu.mybatis.bean"/>
    </typeAliases>
```

设置了类型别名之后，可以代替

```java
<select id="getAllUser" resultType="User">
        SELECT * FROM account;
    </select>
```

# 核心配置文件详解

>核心配置文件中的标签必须按照固定的顺序(有的标签可以不写，但顺序一定不能乱)：
>properties、settings、typeAliases、typeHandlers、objectFactory、objectWrapperFactory、reflectorFactory、plugins、environments、databaseIdProvider、mappers

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//MyBatis.org//DTD Config 3.0//EN"
        "http://MyBatis.org/dtd/MyBatis-3-config.dtd">
<configuration>
    <!--引入properties文件，此时就可以${属性名}的方式访问属性值-->
    <properties resource="jdbc.properties"></properties>
    <settings>
        <!--将表中字段的下划线自动转换为驼峰-->
        <setting name="mapUnderscoreToCamelCase" value="true"/>
        <!--开启延迟加载-->
        <setting name="lazyLoadingEnabled" value="true"/>
    </settings>
    <typeAliases>
        <!--
        typeAlias：设置某个具体的类型的别名
        属性：
        type：需要设置别名的类型的全类名
        alias：设置此类型的别名，且别名不区分大小写。若不设置此属性，该类型拥有默认的别名，即类名
        -->
        <!--<typeAlias type="com.atguigu.mybatis.bean.User"></typeAlias>-->
        <!--<typeAlias type="com.atguigu.mybatis.bean.User" alias="user">
        </typeAlias>-->
        <!--以包为单位，设置改包下所有的类型都拥有默认的别名，即类名且不区分大小写-->
        <package name="com.atguigu.mybatis.bean"/>
    </typeAliases>
    <!--
    environments：设置多个连接数据库的环境
    属性：
	    default：设置默认使用的环境的id
    -->
    <environments default="mysql_test">
        <!--
        environment：设置具体的连接数据库的环境信息
        属性：
	        id：设置环境的唯一标识，可通过environments标签中的default设置某一个环境的id，表示默认使用的环境
        -->
        <environment id="mysql_test">
            <!--
            transactionManager：设置事务管理方式
            属性：
	            type：设置事务管理方式，type="JDBC|MANAGED"
	            type="JDBC"：设置当前环境的事务管理都必须手动处理
	            type="MANAGED"：设置事务被管理，例如spring中的AOP
            -->
            <transactionManager type="JDBC"/>
            <!--
            dataSource：设置数据源
            属性：
	            type：设置数据源的类型，type="POOLED|UNPOOLED|JNDI"
	            type="POOLED"：使用数据库连接池，即会将创建的连接进行缓存，下次使用可以从缓存中直接获取，不需要重新创建
	            type="UNPOOLED"：不使用数据库连接池，即每次使用连接都需要重新创建
	            type="JNDI"：调用上下文中的数据源
            -->
            <dataSource type="POOLED">
                <!--设置驱动类的全类名-->
                <property name="driver" value="${jdbc.driver}"/>
                <!--设置连接数据库的连接地址-->
                <property name="url" value="${jdbc.url}"/>
                <!--设置连接数据库的用户名-->
                <property name="username" value="${jdbc.username}"/>
                <!--设置连接数据库的密码-->
                <property name="password" value="${jdbc.password}"/>
            </dataSource>
        </environment>
    </environments>
    <!--引入映射文件-->
    <mappers>
        <!-- <mapper resource="UserMapper.xml"/> -->
        <!--
        以包为单位，将包下所有的映射文件引入核心配置文件
        注意：
			1. 此方式必须保证mapper接口和mapper映射文件必须在相同的包下
			2. mapper接口要和mapper映射文件的名字一致
        -->
        <package name="com.atguigu.mybatis.mapper"/>
    </mappers>
</configuration>

```

# 在idea中设置核心配置文件的模版

# 在idea中设置映射文件的模版

# 封装sqlSessionUtils工具类

# MyBatis获取参数值的两种方式（重点）

- MyBatis获取参数值的两种方式：${}和#{}
- ${}的本质就是字符串拼接，#{}的本质就是占位符赋值
- ${}使用字符串拼接的方式拼接sql，若为字符串类型或日期类型的字段进行赋值时，需要手动加单引号；但是#{}使用占位符赋值的方式拼接sql，此时为字符串类型或日期类型的字段进行赋值时，可以自动添加单引号

## Mapper接口方法的参数为单个的字面量类型

### 用户名查询信息

```java
	<select id="getUserByUserName" resultType="cn.lanqiao.pojo.User">
        SELECT * FROM account where name = #{name};
    </select>
```

```java
	@Test
    //根据用户名查询信息
    public void testgetUserByUserName() throws IOException {
        InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
        SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
        SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(is);
        SqlSession sqlSession = sqlSessionFactory.openSession(true);
        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
        User userAll = userMapper.getUserByUserName("张三");
        System.out.println(userAll);
        //sqlSession.commit();
    }
```

## mapper接口方法的参数为多个时

### 登录功能

a>以arg0,arg1...为键，以参数为值

b>以param1，param2...为键，以参数为值

因此只需要通过#{}或者${}以键的方式访问值即可，但是需要注意${}的单引号问题

```java
	<select id="userLogin" resultType="cn.lanqiao.pojo.User">
        SELECT * FROM account where name = #{arg0} AND password = #{arg1};
    </select>
```

```java
@Test
    //登录功能
    public void TestLogin() throws IOException {
        InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
        SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
        SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(is);
        SqlSession sqlSession = sqlSessionFactory.openSession(true);
        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
        User userAll = userMapper.userLogin("张三",123456);
        System.out.println(userAll);
        //sqlSession.commit();
    }
```

## mapper接口方法的参数有多个时，可以手动将这些参数放在一个map中存储

### 验证登录

因此只需要通过#{}或者${}以键的方式访问值即可，但是需要注意${}的单引号问题

userMapper

```java
	/**
     *验证登录(map版本)
     *
     */
    User userLoginMap(Map<String, Object> map);
```

userMapper.xml

```java
<select id="userLoginMap" resultType="cn.lanqiao.pojo.User">
        SELECT * FROM account where name = #{name} AND password = #{password};
    </select>
```

test

```java
	@Test
    //登录功能Map
    public void TestLoginMap() throws IOException {
        InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
        SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
        SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(is);
        SqlSession sqlSession = sqlSessionFactory.openSession(true);
        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
        Map<String, Object> map = new HashMap<>();
        map.put("name","张三");
        map.put("password","123456");
        User userAll = userMapper.userLoginMap(map);
        System.out.println(userAll);
        //sqlSession.commit();
    }
```

## 4.mapper接口方法的参数是实体类类型的参数

因此只需要通过#{}或者${}以键的方式访问值即可，但是需要注意${}的单引号问题

```java
	<insert id="insertUserInformation">
        insert into account values(null,#{name},#{money},#{password});
    </insert>
```

```java
	@Test
    //用户添加功能
    public void TestinsertUserInformation() throws IOException {
        InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
        SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
        SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(is);
        SqlSession sqlSession = sqlSessionFactory.openSession(true);
        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
        int result = userMapper.insertUserInformation(new User(null, "王五", 1000, 123456));
        System.out.println(result);
        //sqlSession.commit();
    }
```

## 5.使用@Param注解命名参数

### 验证登录(使用@Param)

```java
 /**
     * 验证登录(使用@Param)
     */
    User checkLoginByParam(@Param("name") String name,@Param("password") int password);
```

```java
<select id="checkLoginByParam" resultType="cn.lanqiao.pojo.User">
        SELECT * FROM account where name = #{name} AND password = #{password};
    </select>
```

```java
 	@Test
    //Param查询用户
    public void TestcheckLoginByParam() throws IOException {
        InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
        SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
        SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(is);
        SqlSession sqlSession = sqlSessionFactory.openSession(true);
        UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
        User result = userMapper.checkLoginByParam("王五", 123456);
        System.out.println(result);
        //sqlSession.commit();
    }
```

# Mybatis各种查询功能

## 查询一个实体类对象

```java
//根据用户id查询用户信息
User getUserById(@Param("id") int id);
```

```xml
<select id="getUserById" resultType = "User">
	select * from t_user where id = #{id}
</select>
```

>若查询出来的数据只有一条，可以通过实体类接收
>
>如果查询出来的数据有多条，一定不能用实体类接收

##  查询用户的总记录数(单行单列)

```java
	/**
     * 查询用户的总记录数
     */
    Integer getCount();
```

```java
 	<select id="getCount" resultType="java.lang.Integer">
        SELECT count(*) FROM account;
    </select>
```

## 默认的类型别名

![在这里插入图片描述](https://img-blog.csdnimg.cn/fd0b50a36358457f9d1c48dd2c3d5f2c.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6IuN6IyX,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

![在这里插入图片描述](https://img-blog.csdnimg.cn/a5042eddd8014d628fc787440925e6b7.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBA6IuN6IyX,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

## 查询Map集合

```java
//根据id查询用户信息为一个Map集合
Map<String,Object> getUserByIdToMap(@Param("id") Integer id);
```

```xml
 	<select id="getUserByIdToMap" resultType="map">
        select * from t_user where id = #{id}
    </select>
```

## 查询所有用户信息为Map集合

```java
List<Map<String,Object>> getAllUserToMap();
```

```xml
 	<select id="getAllUserToMap" resultType="map">
        select * from t_user
    </select>
```

# 特殊SQL的执行

## Mybatis处理模糊查询

```java
	/**
     * 根据用户名模糊查询用户信息
     */
    List<User> getUserByLike(@Param("name") String name);
```

```xml
	<select id="getUserByLike" resultType="cn.lanqiao.pojo.User">
        SELECT * FROM account where name like '%${name}%'
        SELECT * FROM account where name like concat('%',#{name},'%')
        SELECT * FROM account where name like "%"#{name}"%"
    </select>
```

## Mybatis批量删除

```java
	/**
     * 批量删除
     */
    int DeleteAll(@Param("id") String id);
```

```xml
	<delete id="deleteMore">
	delete from t_user where id in (${ids})
    </delete>
```

## Mybatis动态设置表名

```java
List<User> getAllUser(@Param("tableName") String tableName);
```

```xml
<select id="getAllUser" resultType="User">
	select * from ${tableName}
</select>
```



## 添加功能获取自增的主键

t_class(class_id,class_name)

t_student(student_id,student_name,class_id)

1.添加班级信息

2.获取新添加的班级id

3.为班级分配学生，即将某学的班级id修改为新添加的班级id

```java
	/**
     * 添加功能获取自增的主键
     */
    void insertUser(User user);
```

useGeneratedKeys：设置当前标签中的sql使用了自增的主键

keyProperty：将自增主键的值赋值给传输到映射文件中参数的某个属性

```java
	<insert id="insertUser" useGeneratedKeys="true" keyProperty="id">
        INSERT into account values (null,#{name},#{money},#{password});
    </insert>
```

# 自定义映射resultMap

## resultMap处理字段和属性的映射关系

若字段名和实体类中的属性不一致，则可以通过resultMap设置自定义映射

>解决字段名和属性名不一致的情况
>
>a>字段起别名，保持和属性名一致
>
>b>设置全局配置,将_自动映射为驼峰
>
>c>resultMap

b方法:在mybatis-config.xml中

```java
	<!--设置Mybatis的全局配置-->
    <settings>
        <!--将_自动映射为驼峰，emp_name = empName        -->
        <setting name="mapUnderscoreToCamelCase" value="true"/>
    </settings>
```

c方法：resultMap

在Mapper.xml中

```java
	<!--
    resultMap:设置自定义映射关系
    id:唯一标识,不能重复
    type:设置映射关系中的实体类类型
    子标签:
    <id>:设置主键的映射关系
    <result>:设置普通字段的映射关系
    属性:
    property:设置映射关系中的属性名,必须是type属性所设置的实体类类型的属性名
    column:设置映射关系中的字段名,必须是sql语句查询出的字段宁
    -->
    <resultMap id="empResultMap" type="cn.lanqiao.pojo.Emp">
        <id property="eid" column="eid"></id>
        <result property="empName" column="emp_name"></result>
        <result property="age" column="age"></result>
        <result property="sex" column="sex"></result>
        <result property="email" column="email"></result>
    </resultMap>
   
    <select id="getAllEmp" resultMap="empResultMap">
        SELECT * FROM t_emp;
    </select>
```

![image-20230211214036991](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230211214036991.png)

# 处理多对一关系

```sql
-- 创建部门表
CREATE TABLE departments (
                             department_id INT AUTO_INCREMENT COMMENT '部门ID，自动增长',
                             name VARCHAR(255) NOT NULL COMMENT '部门名称',
                             location VARCHAR(255) COMMENT '部门所在地',
                             PRIMARY KEY (department_id) COMMENT '主键'
) COMMENT='存储公司所有部门的信息';

-- 创建员工表
CREATE TABLE employees (
                           employee_id INT AUTO_INCREMENT COMMENT '员工ID，自动增长',
                           employee_name VARCHAR(255) NOT NULL COMMENT '员工名字',
                           position VARCHAR(255) COMMENT '职位',
                           hire_date DATE COMMENT '入职日期',
                           department_id INT COMMENT '所属部门ID',
                           PRIMARY KEY (employee_id) COMMENT '主键'
) COMMENT='存储公司所有员工的信息';
=
-- 插入部门数据
INSERT INTO departments (name, location) VALUES
('人力资源部', '北京'),
('财务部', '上海'),
('技术部', '深圳'),
('市场部', '广州');

-- 插入员工数据
INSERT INTO employees (employee_name, position, hire_date, department_id) VALUES
('张三', '人事专员', '2023-01-15', 1),
('李四', '会计', '2023-02-20', 2),
('王五', '软件工程师', '2023-03-10', 3),
('赵六', '市场经理', '2023-04-05', 4),
('孙七', '招聘专员', '2023-05-01', 1),
('周八', '财务分析师', '2023-06-15', 2),
('吴九', '前端开发', '2023-07-20', 3),
('郑十', '市场助理', '2023-08-05', 4);
```



## 第一种:处理多对一的映射关系

### 通过级联属性赋值解决多对一的映射关系

查询员工以及员工对应的部门信息

emp.java

```java
	private Integer eid;
    private String empName;
    private Integer age;
    private String sex;
    private String email;
    private Dept dept;
```

dept.java

```java
	private Integer did;
    private String deptName;
```

EmpMapper

```java
Emp getEmpAndDept(@Param("eid") Integer eid);
```

EmpMapper.xml

```java
	<resultMap id="empAndDeptGetAll" type="cn.lanqiao.pojo.Emp">
        <id property="eid" column="eid"></id>
        <result property="empName" column="emp_name"></result>
        <result property="age" column="age"></result>
        <result property="sex" column="sex"></result>
        <result property="email" column="email"></result>
        <result property="dept.did" column="did"></result>
        <result property="dept.deptName" column="dept_name"></result>
    </resultMap>
    <select id="getEmpAndDept" resultMap="empAndDeptGetAll">
        SELECT * FROM t_emp left join t_dept on t_emp.did = t_dept.did where t_emp.eid = #{eid};
    </select>
```

## 第二种:处理多对一的映射关系

### 通过association解决多对一的映射关系(常用)

```java
	<resultMap id="empAndDeptGetAlltwo" type="cn.lanqiao.pojo.Emp">
        <id property="eid" column="eid"></id>
        <result property="empName" column="emp_name"></result>
        <result property="age" column="age"></result>
        <result property="sex" column="sex"></result>
        <result property="email" column="email"></result>
        <!--
        association:处理多对一的映射关系
        property:需要处理多对一的映射关系的属性名
        javaType:该属性的类型
        -->
        <association property="dept" javaType="cn.lanqiao.pojo.Dept">
            <id property="did" column="did"></id>
            <result property="deptName" column="dept_name"></result>
        </association>
    </resultMap>
```

## 第三种:处理多对一的映射关系

### 分步查询

第一步：

```java
	/**
     * 通过分布查询查询员工以及员工所对应的部门信息
     * 分布查询第一步:查询员工信息
     */
    Emp getEmpAndDeptByStepOne(@Param("eid") Integer eid);
```

```java
    <resultMap id="empAndDeptGetAllthree" type="cn.lanqiao.pojo.Emp">
        <id property="eid" column="eid"></id>
        <result property="empName" column="emp_name"></result>
        <result property="age" column="age"></result>
        <result property="sex" column="sex"></result>
        <result property="email" column="email"></result>

        <!--
        association:处理多对一的映射关系
        select:设置分布查询SQL的唯一标识(namespace.SQLid或者mapper接口的全类名.方法名)
        column:设置分布查询的条件
        -->
        <association property="dept" select="cn.lanqiao.mapper.DeptMapper.getEmpAndDeptByStepTwo" column="did">
        </association>
    </resultMap>
    <select id="getEmpAndDeptByStepOne" resultMap="empAndDeptGetAllthree">
        SELECT * FROM t_emp where eid = #{eid};
    </select>
```

第二步：通过did查询员工所在部门

```java
	/**
     * 通过分布查询查询员工以及员工所对应的部门信息
     * 分布查询第一步:查询员工信息
     * 分布查询第二步:通过did查询员工所在部门
     */
    Dept getEmpAndDeptByStepTwo(@Param("did") Integer did);
```

```java
	<resultMap id="DeptGet" type="cn.lanqiao.pojo.Dept">
        <id property="did" column="did"></id>
        <result property="deptName" column="dept_name"></result>
    </resultMap>
    <select id="getEmpAndDeptByStepTwo" resultMap="DeptGet">
        SELECT * FROM t_dept where did = #{did};
    </select>
```

测试:

```java
	@Test
    public void getEmpAndDeptThree() throws Exception {
        InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
        SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
        SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(is);
        SqlSession sqlSession = sqlSessionFactory.openSession(true);
        EmpMapper mapper = sqlSession.getMapper(EmpMapper.class);
        Emp empAndDeptByStepOne = mapper.getEmpAndDeptByStepOne(1);
        System.out.println(empAndDeptByStepOne);
    }
```

## 延迟加载

>分步查询的优点：可以实现延迟加载，但是必须在核心配置文件中设置全局配置信息
>
>lazyLoadingEnable；延迟加载的全局开关。当开启时，所有关联对象都会延迟加载
>
>aggressiveLazyLoading:当开启时，任何方法的调用都会加载该对象的所有属性，否则，每个属性都会按需加载
>
>此时就可以实现按需加载，获取的数据是什么，就只会执行相应的sql。此时可以通过association和collection中的fetchType属性设置当前的分布查询是否使用延迟加载,fetchType= "lazy(延迟加载)|eager(立即加载)"

### 开启延迟加载

在mybatis-config.xml中

```java
	<settings>
        <!--    开启延迟加载-->
        <setting name="lazyLoadingEnabled" value="true"/>
    </settings>
```

Mapper.xml中

```java
		<!--
        association:处理多对一的映射关系
        select:设置分布查询SQL的唯一标识(namespace.SQLid或者mapper接口的全类名.方法名)
        column:设置分布查询的条件
        fetchType:当开启了全局的延迟加载之后，可通过此属性手动控制延迟加载的效果
        fetchType:"lazy|eager" lazy:表示延迟加载,eager表示立即加载
        -->
        <association
                property="dept"
                select="cn.lanqiao.mapper.DeptMapper.getEmpAndDeptByStepTwo"
                column="did"
                fetchType="eager"
        >
        </association>
```

# 处理一对多的映射关系

## 通过collection解决一对多的映射关系

### 获取部门以及部门中所有的员工信息

```java
	private Integer did;
    private String deptName;
    private List<Emp> emps;
```

```java
	/**
     *获取部门以及部门中的员工信息
     *
     */
    Dept getDeptAndEmp(@Param("did") Integer did);
```

```java
	<resultMap id="getDeptAndResultMap" type="cn.lanqiao.pojo.Dept">
        <id property="did" column="did"></id>
        <result property="deptName" column="dept_name"></result>
        <!--
        collection:处理一对多的映射关系
        ofType:表示该属性所对应的集合中存储数据的类型
        -->
        <collection property="emps" ofType="cn.lanqiao.pojo.Emp">
            <id property="eid" column="eid"></id>
            <result property="empName" column="emp_name"></result>
            <result property="age" column="age"></result>
            <result property="sex" column="sex"></result>
            <result property="email" column="email"></result>
        </collection>
    </resultMap>
    <select id="getDeptAndEmp" resultMap="getDeptAndResultMap">
        SELECT * FROM t_dept left join t_emp on t_dept.did = t_emp.did where t_dept.did = #{did};
    </select>
```

## 通过分步查询解决一对多的映射关系

### 通过分步查询查询部门以及部门中所有的员工信息

```java
	/**
     * 通过分布查询查询部门以及部门中所有的员工信息
     * 分布查询第一步:先根据id查询部门
     *
     */
    Dept getDeptAndEmpStepOne(@Param("did") Integer did);
```

```java
	/**
     * 通过分布查询查询部门以及部门中所有的员工信息
     * 分布查询第一步:先根据id查询部门
     * 分布查询第二步:根据did查询该部门所有员工信息
     */
    List<Emp> getDeptAndEmpByStepTwo(@Param("did") Integer did);
```

```java
	<select id="getDeptAndEmpByStepTwo" resultType="cn.lanqiao.pojo.Emp">
        SELECT * FROM t_emp where did = #{did}
    </select>
```

```java
	<resultMap id="getDeptAndEmpStepResultMap" type="cn.lanqiao.pojo.Dept">
        <id property="did" column="did"></id>
        <result property="deptName" column="dept_name"></result>
        <collection property="emps"
                    select="cn.lanqiao.mapper.EmpMapper.getDeptAndEmpByStepTwo"
                    column="did">
        </collection>
    </resultMap>
    <select id="getDeptAndEmpStepOne" resultMap="getDeptAndEmpStepResultMap">
        SELECT * FROM t_dept where did = #{did};
    </select>
```

# 动态SQL

## 回顾

(1)collection和association标签是用来干嘛的

## 初始动态SQL

Mybatis框架的动态SQL技术是一种根据特定条件动态拼装SQL语句的功能，它存在的意义是为了解决拼接SQL语句字符串时的痛点问题。

## if标签(常用)

可以根据标签中test属性所对应的表达式决定标签中的内容是否需要拼接到SQL中

```java
	/**
     * 多条件查询
     */
    List<Emp> getEmpByCondition(Emp emp);
```

```java
	<select id="getEmpByCondition" resultType="cn.lanqiao.pojo.Emp">
        SELECT * FROM t_emp where 1=1
        <if test="empName !=null and empName !=''">
            emp_name = #{empName}
        </if>
        <if test="age !=null and age !=''">
            And age = #{age}
        </if>
        <if test="sex !=null and sex !=''">
            And  sex = #{sex}
        </if>
        <if test="email !=null and email !=''">
            And  email = #{email}
        </if>
    </select>
```

测试类

```java
public class TestMybatis {
    @Test
    public void test() throws IOException {
        //读取MyBatis的核心配置文件
        InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
        //获取SqlSessionFactoryBuilder对象
        SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
        //通过核心配置文件所对应的字节输入流创建工厂类SqlSessionFactory，生产SqlSession对象
        SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(is);
        //获取sqlSession，此时通过SqlSession对象所操作的sql都必须手动提交或回滚事务
        //SqlSession sqlSession = sqlSessionFactory.openSession();
        //创建SqlSession对象，此时通过SqlSession对象所操作的sql都会自动提交
        SqlSession sqlSession = sqlSessionFactory.openSession(true);
        //通过代理模式创建UserMapper接口的代理实现类对象
        DynamicMapper mapper = sqlSession.getMapper(DynamicMapper.class);
        List<Emp> empByCondition = mapper.getEmpByCondition(new Emp(1, "", 23, "男", "123@qq.com"));
        System.out.println(empByCondition);
    }
}
```

## where标签(常用)

当where标签中有内容时，会自动生成where关键字，并且将内容前多余的and或者or去掉

当where标签中没有内容时，此时where标签没有任何效果

**注意：where标签不能将其中内容后面多余的and或者or去掉**

```java
	<select id="getEmpByCondition" resultType="cn.lanqiao.pojo.Emp">
        SELECT * FROM t_emp 
        <where>
        <if test="empName !=null and empName !=''">
            emp_name = #{empName}
        </if>
        <if test="age !=null and age !=''">
            And age = #{age}
        </if>
        <if test="sex !=null and sex !=''">
            And  sex = #{sex}
        </if>
        <if test="email !=null and email !=''">
            And  email = #{email}
        </if>
        </where>
    </select>
```

## choose、when、otherwise

相当于if...else if...else

when至少要有一个,otherwise最多只能由一个

```java
	/**
     * 测试choose、when、otherwise
     */
    List<Emp> getEmpByChoose(Emp emp);
```

```java
	<select id="getEmpByChoose" resultType="cn.lanqiao.pojo.Emp">
        SELECT * FROM t_emp
        <where>
            <choose>
                <when test="empName !=null and empName != ''">
                    emp_name = #{empName}
                </when>
                <when test="age !=null and age != ''">
                    age = #{age}
                </when>
                <when test="sex !=null and sex != ''">
                    sex = #{sex}
                </when>
                <when test="email !=null and email != ''">
                    email = #{email}
                </when>
                <otherwise>
                    did = 1
                </otherwise>
            </choose>
        </where>
    </select>
```

```java
	@Test
    public void getEmpByChoose() throws Exception {
        InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
        SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
        SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(is);
        SqlSession sqlSession = sqlSessionFactory.openSession(true);
        DynamicSQLMapper mapper = sqlSession.getMapper(DynamicSQLMapper.class);
        List<Emp> empByCondition = mapper.getEmpByChoose(new Emp(null,"李某人",18,"男","1123377679@qq.com"));
        System.out.println(empByCondition);
    }
```

## foreach(常用)

collection:设置需要循环的数组集合

item:表示数组或集合中的每一个数据

open:foreach标签所循环的所有内容的开始符

close:foreach标签所循环的所有内容的结束符

### 批量删除

```java
/**
 * 批量删除
 */
int deleteMoreByArray(@Param("arr") Integer[] arr);
```

```xml
<delete id="deleteMoreByArray">
    DELETE FROM t_emp WHERE eid in(
        <foreach collection="arr" item="eid" separator=",">
            #{eid}
        </foreach>
        )
</delete>
```

### 批量添加

```java
	/**
     * 批量添加
     */
    int insertMoreByList(@Param("emps") List<Emp> emps);
```

```xml
<insert id="insertMoreByList">
    insert into t_emp values
    <foreach collection="emps" item="emp" separator=",">
        (null,#{emp.empName},#{emp.age},#{emp.sex},#{emp.email},null)
    </foreach>
</insert>
```

```java
@Test
public void insertMoreByList() throws Exception {
    InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
    SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
    SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(is);
    SqlSession sqlSession = sqlSessionFactory.openSession(true);
    DynamicSQLMapper mapper = sqlSession.getMapper(DynamicSQLMapper.class);
    Emp e1 = new Emp(null,"a1",18,"男","1123377679@qq.com");
    Emp e2 = new Emp(null,"a2",18,"男","1123377679@qq.com");
    Emp e3 = new Emp(null,"a3",18,"男","1123377679@qq.com");
    List<Emp> list = Arrays.asList(e1, e2, e3);
    int i = mapper.insertMoreByList(list);
    System.out.println(i);
}
```

## SQL标签(SQL片段)

将常用的SQL片段记录下来，方便调用

```xml
<sql id="empCloums">eid,emp_name,age,sex,email</sql>
<select id="getEmpByCondition" resultMap="getEmpByConditionMap">
    SELECT <include refid="empCloums"></include>  FROM t_emp where
    <if test="empName !=null and empName !=''">
        emp_name = #{empName}
    </if>
    <if test="age !=null and age !=''">
        And age = #{age}
    </if>
    <if test="sex !=null and sex !=''">
        And  sex = #{sex}
    </if>
    <if test="email !=null and email !=''">
        And  email = #{email}
    </if>
</select>
```

# Mybatis的缓存

缓存只针对于查询功能

## Mybtais一级缓存

一级缓存是SqlSession级别的，通过同一个SqlSession查询的数据会被缓存，下次查询相同的数据，就会从缓存中

直接获取，不会从数据库重新访问

使一级缓存失效的四种情况：

1)不同的SqlSession对应不同的一级缓存

2)同一个SqlSession但是查询条件不同

3)同一个SqlSessioni两次查询期间执行了任何一次增删改操作

4)同一个SqlSessioni两次查询期间手动清空了缓存

### 不同的SqlSession对应不同的一级缓存

```java
    @Test
    public void testCache(){
        SqlSession sqlSession = SqlSessionUtils.getSqlSession();
        CacheMapper mapper = sqlSession.getMapper(CacheMapper.class);
        Emp emp1 = mapper.getEmpById(3);
        System.out.println(emp1);
        System.out.println("========第二次调用========从缓存中取数据");
        Emp emp2 = mapper.getEmpById(3);
        System.out.println(emp2);

        System.out.println("\n========即使用的不是同一个Mapper，也同样从缓存中取(同一个sqlsession)========");
        CacheMapper mapper2 = sqlSession.getMapper(CacheMapper.class);
        Emp empByMapper2 = mapper2.getEmpById(3);
        System.out.println(empByMapper2);

        System.out.println("\n========一级缓存的范围在sqlsession中，换一个新的sqlsession就会再次用sql读取数据========");
        SqlSession sqlSession2 = SqlSessionUtils.getSqlSession();
        CacheMapper mapper2BySqlSession2 = sqlSession2.getMapper(CacheMapper.class);
        System.out.println(mapper2BySqlSession2.getEmpById(3));
    }

```

### 同一个SqlSession但是查询条件不同

```java
    @Test
    public void testCache3(){
        SqlSession sqlSession = SqlSessionUtils.getSqlSession();
        CacheMapper mapper = sqlSession.getMapper(CacheMapper.class);

        System.out.println("=====第一次获取数据=====");
        Emp emp1 = mapper.getEmpById(3);
        System.out.println(emp1);
        
        System.out.println("\n=====查询条件不同=====");
        Emp emp2 = mapper.getEmpById(5);
        System.out.println(emp2);
    }

```

###  同一个SqlSession两次查询期间执行了任何一次增删改操作

```java
    @Test
    public void testCache2(){
        SqlSession sqlSession = SqlSessionUtils.getSqlSession();
        CacheMapper mapper = sqlSession.getMapper(CacheMapper.class);

        System.out.println("=====第一次获取数据=====");
        Emp emp1 = mapper.getEmpById(3);
        System.out.println(emp1);
        Emp emp2 = mapper.getEmpById(3);
        System.out.println(emp2);

        System.out.println("\n=====进行增删改操作=====");
        mapper.insetEmp(new Emp(null, "Joey", 44, "男", "8888@gmai.com"));

        System.out.println("\n=====同一个sqlsession，再获取数据=====");
        Emp emp3 = mapper.getEmpById(3);
        System.out.println(emp3);
    }

```

### 同一个SqlSession两次查询期间手动清空了（一级）缓存

```java
    @Test
    public void testCache4(){
        SqlSession sqlSession = SqlSessionUtils.getSqlSession();
        CacheMapper mapper = sqlSession.getMapper(CacheMapper.class);

        System.out.println("=====第一次获取数据=====");
        Emp emp1 = mapper.getEmpById(3);
        System.out.println(emp1);

        System.out.println("\n=====两次查询期间手动清空缓存=====");
        sqlSession.clearCache();

        System.out.println("\n=====再次查询id=3的emp=====");
        Emp emp2 = mapper.getEmpById(3);
        System.out.println(emp2);
    }

```

## Mybatis二级缓存

二级缓存是SqlSessionFactory级别，通过同一个SqlSessionFactory创建的SqlSessioni查询的结果会被缓存；此后

若再次执行相同的查询语句，结果就会从缓存中获取

### 二级缓存的开启条件

a>在核心配置文件中，设置全局配置属性cacheEnabled-"true",默认为true,不需要设置

b>在映射文件中设置标签<cache/>

c>二级缓存必须在SqlSession关闭或提交之后有效

d>查询的数据所转换的实体类类型必须实现序列化的接口

使二级缓存失效的情况：

 两次查询之间执行了任意的增删改，会使一级和二级缓存同时失效

### 在映射文件中设置标签`<cache />`

![在这里插入图片描述](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/9ef8960943cb3eb86c1574d02806fd65.png)

### 测试

⚠️ 要把Emp Class加上`implements Serializable`

```java
    @Test
    public void testCacheTwo(){
        //这里不能用工具类了，因为每次都会创建新的sqlsessionfactory
//        SqlSession sqlSession = SqlSessionUtils.getSqlSession();
//        CacheMapper mapper = sqlSession.getMapper(CacheMapper.class);

        //只要是同一个sqlsessionfactory获得的sqlsession就可以
        try {
            InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
            SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(is);
            SqlSession sqlSession1 = sqlSessionFactory.openSession(true);
            CacheMapper mapper1 = sqlSession1.getMapper(CacheMapper.class);
            System.out.println(mapper1.getEmpById(1));

            System.out.println("Cache Hit Ratio：缓存命中率，指的是在缓存中有没有这条数据");
            System.out.println("=====二级缓存未打开，没从缓存中获取数据=====");
            SqlSession sqlSession2 = sqlSessionFactory.openSession(true);
            CacheMapper mapper2 = sqlSession2.getMapper(CacheMapper.class);
            System.out.println(mapper2.getEmpById(1));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

```

关闭sqlSession，再看是用sql从数据库读取数据还是从缓存中取数据：

![在这里插入图片描述](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/bd956260a0617c4c4012c0fe951b70d6.png)

## Mybatis缓存查询的顺序

先查询二级缓存，因为二级缓存中可能会有其他程序已经查出来的数据，可以拿来直接使用。

如果二级缓存没有命中，再查询一级缓存

如果一级缓存也设没有命中，则查询数据库

SqlSession关闭之后，一级缓存中的数据会写入二级缓存

## Mybatis整合第三方缓存EHChahe

记得补充maven

# Mybatis的逆向工程（清新简洁版）

正向工程：先创建Java实体类，由框架负责根据实体类生成数据库表。Hibernate是支持正向工程的。

逆向工程：先创建数据库表，由框架负责根据数据库表，反向生成如下资源：

Java实体类

Mapper接口

Mapper映射文件

## 创建逆向工程的步骤

### 添加依赖和插件

```java
<dependencies>
	<!-- MyBatis核心依赖包 -->
	<dependency>
		<groupId>org.mybatis</groupId>
		<artifactId>mybatis</artifactId>
		<version>3.5.9</version>
	</dependency>
	<!-- junit测试 -->
	<dependency>
		<groupId>junit</groupId>
		<artifactId>junit</artifactId>
		<version>4.13.2</version>
		<scope>test</scope>
	</dependency>
	<!-- MySQL驱动 -->
	<dependency>
		<groupId>mysql</groupId>
		<artifactId>mysql-connector-java</artifactId>
		<version>8.0.27</version>
	</dependency>
	<!-- log4j日志 -->
	<dependency>
		<groupId>log4j</groupId>
		<artifactId>log4j</artifactId>
		<version>1.2.17</version>
	</dependency>
</dependencies>
<!-- 控制Maven在构建过程中相关配置 -->
<build>
	<!-- 构建过程中用到的插件 -->
	<plugins>
		<!-- 具体插件，逆向工程的操作是以构建过程中插件形式出现的 -->
		<plugin>
			<groupId>org.mybatis.generator</groupId>
			<artifactId>mybatis-generator-maven-plugin</artifactId>
			<version>1.3.0</version>
			<!-- 插件的依赖 -->
			<dependencies>
				<!-- 逆向工程的核心依赖 -->
				<dependency>
					<groupId>org.mybatis.generator</groupId>
					<artifactId>mybatis-generator-core</artifactId>
					<version>1.3.2</version>
				</dependency>
				<!-- 数据库连接池 -->
				<dependency>
					<groupId>com.mchange</groupId>
					<artifactId>c3p0</artifactId>
					<version>0.9.2</version>
				</dependency>
				<!-- MySQL驱动 -->
				<dependency>
					<groupId>mysql</groupId>
					<artifactId>mysql-connector-java</artifactId>
					<version>8.0.27</version>
				</dependency>
			</dependencies>
		</plugin>
	</plugins>
</build>

```

### 创建MyBatis的核心配置文件

```java
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <properties resource="jdbc.properties"/>
    <typeAliases>
        <package name=""/>
    </typeAliases>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="${jdbc.driver}"/>
                <property name="url" value="${jdbc.url}"/>
                <property name="username" value="${jdbc.username}"/>
                <property name="password" value="${jdbc.password}"/>
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <package name=""/>
    </mappers>
</configuration>
```

### 创建逆向工程的配置文件

- 文件名必须是：`generatorConfig.xml`
- targetRuntime: 执行生成的逆向工程的版本
- MyBatis3Simple: 生成基本的CRUD（清新简洁版）
- MyBatis3: 生成带条件的CRUD（奢华尊享版）

```java
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE generatorConfiguration
        PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
        "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">
<generatorConfiguration>
    <!--
    targetRuntime: 执行生成的逆向工程的版本
    MyBatis3Simple: 生成基本的CRUD（清新简洁版）
    MyBatis3: 生成带条件的CRUD（奢华尊享版）
    -->
    <context id="DB2Tables" targetRuntime="MyBatis3Simple">
        <!-- 数据库的连接信息 -->
        <jdbcConnection driverClass="com.mysql.cj.jdbc.Driver"
                        connectionURL="jdbc:mysql://localhost:3306/lanqiao?serverTimezone=GMT"
                        userId="root"
                        password="123456">
        </jdbcConnection>
        <!-- javaBean的生成策略-->
        <javaModelGenerator targetPackage="cn.lanqiao.pojo" targetProject=".\src\main\java">
            <property name="enableSubPackages" value="true" />
            <property name="trimStrings" value="true" />
        </javaModelGenerator>
        <!-- SQL映射文件的生成策略 -->
        <sqlMapGenerator targetPackage="cn.lanqiao.mapper"
                         targetProject=".\src\main\resources">
            <property name="enableSubPackages" value="true" />
        </sqlMapGenerator>
        <!-- Mapper接口的生成策略 -->
        <javaClientGenerator type="XMLMAPPER"
                             targetPackage="cn.lanqiao.mapper" targetProject=".\src\main\java">
            <property name="enableSubPackages" value="true" />
        </javaClientGenerator>
        <!-- 逆向分析的表 -->
        <!-- tableName设置为*号，可以对应所有表，此时不写domainObjectName -->
        <!-- domainObjectName属性指定生成出来的实体类的类名 -->
        <table tableName="t_emp" domainObjectName="Emp"/>
        <table tableName="t_dept" domainObjectName="Dept"/>
    </context>
</generatorConfiguration>
```

# Mybatis的逆向工程（奢华尊享版）

<!DOCTYPE generatorConfiguration
        PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
        "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">
<generatorConfiguration>
    <!--
    targetRuntime: 执行生成的逆向工程的版本
    MyBatis3Simple: 生成基本的CRUD（清新简洁版）
    MyBatis3: 生成带条件的CRUD（奢华尊享版）
    -->
    <context id="DB2Tables" targetRuntime="MyBatis3">
        <!-- 数据库的连接信息 -->
        <jdbcConnection driverClass="com.mysql.cj.jdbc.Driver"
                        connectionURL="jdbc:mysql://localhost:3306/lanqiao?serverTimezone=GMT"
                        userId="root"
                        password="123456">
        </jdbcConnection>
        <!-- javaBean的生成策略-->
        <javaModelGenerator targetPackage="cn.lanqiao.pojo" targetProject=".\src\main\java">
            <property name="enableSubPackages" value="true" />
            <property name="trimStrings" value="true" />
        </javaModelGenerator>
        <!-- SQL映射文件的生成策略 -->
        <sqlMapGenerator targetPackage="cn.lanqiao.mapper"
                         targetProject=".\src\main\resources">
            <property name="enableSubPackages" value="true" />
        </sqlMapGenerator>
        <!-- Mapper接口的生成策略 -->
        <javaClientGenerator type="XMLMAPPER"
                             targetPackage="cn.lanqiao.mapper" targetProject=".\src\main\java">
            <property name="enableSubPackages" value="true" />
        </javaClientGenerator>
        <!-- 逆向分析的表 -->
        <!-- tableName设置为*号，可以对应所有表，此时不写domainObjectName -->
        <!-- domainObjectName属性指定生成出来的实体类的类名 -->
        <table tableName="t_emp" domainObjectName="Emp"/>
        <table tableName="t_dept" domainObjectName="Dept"/>
    </context>
</generatorConfiguration>

```java
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE generatorConfiguration
        PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
        "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">
<generatorConfiguration>
    <!--
    targetRuntime: 执行生成的逆向工程的版本
    MyBatis3Simple: 生成基本的CRUD（清新简洁版）
    MyBatis3: 生成带条件的CRUD（奢华尊享版）
    -->
    <context id="DB2Tables" targetRuntime="MyBatis3Simple">
        <!-- 数据库的连接信息 -->
        <jdbcConnection driverClass="com.mysql.cj.jdbc.Driver"
                        connectionURL="jdbc:mysql://localhost:3306/lanqiao?serverTimezone=GMT"
                        userId="root"
                        password="123456">
        </jdbcConnection>
        <!-- javaBean的生成策略-->
        <javaModelGenerator targetPackage="cn.lanqiao.pojo" targetProject=".\src\main\java">
            <property name="enableSubPackages" value="true" />
            <property name="trimStrings" value="true" />
        </javaModelGenerator>
        <!-- SQL映射文件的生成策略 -->
        <sqlMapGenerator targetPackage="cn.lanqiao.mapper"
                         targetProject=".\src\main\resources">
            <property name="enableSubPackages" value="true" />
        </sqlMapGenerator>
        <!-- Mapper接口的生成策略 -->
        <javaClientGenerator type="XMLMAPPER"
                             targetPackage="cn.lanqiao.mapper" targetProject=".\src\main\java">
            <property name="enableSubPackages" value="true" />
        </javaClientGenerator>
        <!-- 逆向分析的表 -->
        <!-- tableName设置为*号，可以对应所有表，此时不写domainObjectName -->
        <!-- domainObjectName属性指定生成出来的实体类的类名 -->
        <table tableName="t_emp" domainObjectName="Emp"/>
        <table tableName="t_dept" domainObjectName="Dept"/>
    </context>
</generatorConfiguration>
```

## QBC

### 查询

selectByExample：按条件查询，需要传入一个example对象或者null；如果传入一个null，则表示没有条件，也就是查询所有数据

example.createCriteria().xxx：创建条件对象，通过andXXX方法为SQL添加查询添加，每个条件之间是and关系

example.or().xxx：将之前添加的条件通过or拼接其他条件

```java
@Test 
	public void testMBG() throws IOException {
	InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
	SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
	SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(is);
	SqlSession sqlSession = sqlSessionFactory.openSession(true);
	EmpMapper mapper = sqlSession.getMapper(EmpMapper.class);
	EmpExample example = new EmpExample();
	//名字为张三，且年龄大于等于20
	example.createCriteria().andEmpNameEqualTo("张三").andAgeGreaterThanOrEqualTo(20);
	//或者did不为空
	example.or().andDidIsNotNull();
	List<Emp> emps = mapper.selectByExample(example);
	emps.forEach(System.out::println);
}

```

### 增改

`updateByPrimaryKey`：通过主键进行数据修改，如果某一个值为null，也会将对应的字段改为null

mapper.updateByPrimaryKey(new Emp(1,"admin",22,null,"456@qq.com",3));

![在这里插入图片描述](https://img-blog.csdnimg.cn/fe0f83eae0b64fab9486670023877fd4.png#pic_center)

updateByPrimaryKeySelective()：通过主键进行选择性数据修改，如果某个值为null，则不修改这个字段

mapper.updateByPrimaryKeySelective(new Emp(2,"admin2",22,null,"456@qq.com",3));

![在这里插入图片描述](https://img-blog.csdnimg.cn/16f5400fa78e4adfae90046e7f331555.png#pic_center)

# Mybatis的分页插件简介

![在这里插入图片描述](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/440418312b498d779078c613bf632385.png)

## 分页插件使用步骤

### 添加依赖

```java
<!-- https://mvnrepository.com/artifact/com.github.pagehelper/pagehelper -->
<dependency>
    <groupId>com.github.pagehelper</groupId>
    <artifactId>pagehelper</artifactId>
    <version>5.2.0</version>
</dependency>
```

### 配置分页插件

- 在MyBatis的核心配置文件（mybatis-config.xml）中配置插件

```java
<plugins>
	<!--设置分页插件-->
	<plugin interceptor="com.github.pagehelper.PageInterceptor"></plugin>
</plugins>
```

## 分页插件的使用

### 开启分页功能

- 在查询功能之前使用

  ```
  PageHelper.startPage(int pageNum, int pageSize)
  ```

  开启分页功能

  - pageNum：当前页的页码
  - pageSize：每页显示的条数

```
@Test
public void testPageHelper() throws IOException {
	InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
	SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
	SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(is);
	SqlSession sqlSession = sqlSessionFactory.openSession(true);
	EmpMapper mapper = sqlSession.getMapper(EmpMapper.class);
	//访问第一页，每页四条数据
	PageHelper.startPage(1,4);
	List<Emp> emps = mapper.selectByExample(null);
	emps.forEach(System.out::println);
}

```

### 分页相关数据

#### 方法一：直接输出

```
@Test
public void testPageHelper() throws IOException {
	InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
	SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
	SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(is);
	SqlSession sqlSession = sqlSessionFactory.openSession(true);
	EmpMapper mapper = sqlSession.getMapper(EmpMapper.class);
	//访问第一页，每页四条数据
	Page<Object> page = PageHelper.startPage(1, 4);
	List<Emp> emps = mapper.selectByExample(null);
	//在查询到List集合后，打印分页数据
	System.out.println(page);
}

```

#### 方法二使用PageInfo

- 在查询获取list集合之后，使用

  ```
  PageInfo<T> pageInfo = new PageInfo<>(List<T> list, intnavigatePages)
  ```

  获取分页相关数据

  - list：分页之后的数据
  - navigatePages：导航分页的页码数

```
@Test
public void testPageHelper() throws IOException {
	InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
	SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
	SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(is);
	SqlSession sqlSession = sqlSessionFactory.openSession(true);
	EmpMapper mapper = sqlSession.getMapper(EmpMapper.class);
	PageHelper.startPage(1, 4);
	List<Emp> emps = mapper.selectByExample(null);
	PageInfo<Emp> page = new PageInfo<>(emps,5);
	System.out.println(page);
}

```

常用数据：

pageNum：当前页的页码

pageSize：每页显示的条数

size：当前页显示的真实条数

total：总记录数

pages：总页数

prePage：上一页的页码

nextPage：下一页的页码

isFirstPage/isLastPage：是否为第一页/最后一页

hasPreviousPage/hasNextPage：是否存在上一页/下一页

navigatePages：导航分页的页码数

navigatepageNums：导航分页的页码，[1,2,3,4,5]