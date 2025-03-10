# Springboot

## Springboot概述

Springboot是Spring提供的一个子项目，用于快速构建Spring应用程序

![image-20241112155934566](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241112155934566.png)

![image-20241112155948565](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241112155948565.png)

### 传统方式构建Spring应用程序

- 导入依赖繁琐
- 项目配置繁琐

![image-20241112160051229](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241112160051229.png)

![image-20241112160108325](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241112160108325.png)

### Springboot特性

- 起步依赖
- 自动配置
- 其他特性

### 起步依赖

本质上就是一个Maven坐标，整合了完成一个功能所需要的所有坐标

在我们之前所有的依赖都需要手动引入

但是Springboot全部都整合了起来，有一个启动依赖已经全部整合好了

![image-20241112162014553](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241112162014553.png)

### 自动配置

遵循约定大约配置的原则，在boot程序启动后，一些bean对象会自动注入到ioc容器中，不需要手动声明，简化开发

![image-20241112160537924](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241112160537924.png)

### 其他特性

- 内嵌的tomcat、Jetty(无需部署WAR文件)
- 外部化配置
- 不需要XML配置(properties/yml)

## Springboot入门

需求：使用Springboot开发一个web应用，浏览器发起请求/hello后，给浏览器返回字符串"hello Springboot

"

![image-20241112161059863](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241112161059863.png)

1)创建Maven项目

2)导入起步依赖

![image-20241112161317861](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241112161317861.png)

勾选

SpringWeb

点击创建

![image-20241112162131880](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241112162131880.png)

3)编写Controller

```java
package cn.lanqiao.springboot_study.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @RequestMapping("/helloworld")
    public String hello() {
        System.out.println(111);
        return "hello";
    }
}

```

4)启动Springboot启动类

```java
package cn.lanqiao.springboot_study;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringbootStudyApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringbootStudyApplication.class, args);
    }

}

```

## 配置文件

### properties配置文件

在Springboot创建的项目中有一个自动创建的properties文件

修改端口号

```java
server.port=8081
```

修改虚拟目录

```java
server.servlet.context-path=/start
```

### yaml配置文件(重点)

有两种写法:application.yml / application.yaml

```java
server:
  port: 8081
  servlet:
    context-path: /start
```

![image-20241112170632530](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241112170632530.png)

#### yml配置信息书写与获取

- 三方技术配置信息
- 自定义配置信息

#### 发送邮箱案例

```xml

```



1)首先需要获取QQ邮箱授权码

```java
https://blog.csdn.net/javin4715/article/details/140911566?ops_request_misc=%257B%2522request%255Fid%2522%253A%25222EE59B6A-B6A4-4CD4-8C77-4456D6E94726%2522%252C%2522scm%2522%253A%252220140713.130102334..%2522%257D&request_id=2EE59B6A-B6A4-4CD4-8C77-4456D6E94726&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduend~default-2-140911566-null-null.142^v100^pc_search_result_base6&utm_term=qq%E9%82%AE%E7%AE%B1%E6%8E%88%E6%9D%83%E7%A0%81&spm=1018.2226.3001.4187
```



2)MailUtil发送邮箱工具类

```java
package cn.lanqiao.springboot_study.utils;



import cn.lanqiao.springboot_study.pojo.EmailProperties;
import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.eclipse.angus.mail.util.MailSSLSocketFactory;

import java.util.Properties;

public class MailUtil {

    /**
     * 发送邮件
     * @param emailProperties 发件人信息(发件人邮箱,发件人授权码)及邮件服务器信息(邮件服务器域名,身份验证开关)
     * @param to 收件人邮箱
     * @param title 邮件标题
     * @param content 邮件正文
     * @return
     */
    public static boolean sendMail(EmailProperties emailProperties, String to, String title, String content){
        MimeMessage message = null;
        try {
            Properties properties = new Properties();
            MailSSLSocketFactory sf = new MailSSLSocketFactory();
            sf.setTrustAllHosts(true);
            properties.put("mail.smtp.host", emailProperties.getHost());
            properties.put("mail.smtp.auth",emailProperties.isAuth());
            properties.put("mail.user", emailProperties.getUser());
            properties.put("mail.password", emailProperties.getCode());
            properties.put("mail.smtp.ssl.enable","true");
            properties.put("mail.smtp.ssl.socketFactory",sf);
            // 构建授权信息，用于进行SMTP进行身份验证
            Authenticator authenticator = new Authenticator() {
                @Override
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(emailProperties.getUser(), emailProperties.getCode());
                }
            };
            // 使用环境属性和授权信息，创建邮件会话
            Session mailSession = Session.getInstance(properties, authenticator);
            // 创建邮件消息
            message = new MimeMessage(mailSession);

        }catch (Exception e){
            e.printStackTrace();
        }

        //如果邮件创建失败,直接返回
        if (message==null){
            return false;
        }

        try {
            // 设置发件人
            InternetAddress form = new InternetAddress(emailProperties.getUser());
            message.setFrom(form);

            // 设置收件人
            InternetAddress toAddress = new InternetAddress(to);
            message.setRecipient(Message.RecipientType.TO, toAddress);

            // 设置邮件标题
            message.setSubject(title);

            // 设置邮件的内容体
            message.setContent(content, "text/html;charset=UTF-8");
            // 发送邮件
            Transport.send(message);
        }catch (Exception e){
            e.printStackTrace();
        }
        return true;
    }
}

```

3)EmailProperties  实体类

```java
package cn.lanqiao.springboot_study.pojo;

import org.eclipse.angus.mail.util.MailSSLSocketFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.security.GeneralSecurityException;

@Component
@ConfigurationProperties(prefix = "email")
public class EmailProperties {

    @Value("${email.user}")
    //发件人邮箱
    public String user;

    @Value("${email.code}")
    //发件人邮箱授权码
    //个人授权码 : wpompajpqrlzgdaj
    public String code;

    @Value("${email.host}")
    //发件人邮箱对应的服务器域名,如果是163邮箱:smtp.163.com   qq邮箱: smtp.qq.com
    public String host;

    @Value("${email.auth}")
    //身份验证开关
    private boolean auth;

    public EmailProperties() throws GeneralSecurityException {
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public boolean isAuth() {
        return auth;
    }

    public void setAuth(boolean auth) {
        this.auth = auth;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    @Override
    public String toString() {
        return "EmailProperties{" +
                "host='" + host + '\'' +
                ", auth=" + auth +
                ", user='" + user + '\'' +
                ", code='" + code + '\'' +
                '}';
    }
}


```

4)EmailService 接口

```java
package cn.lanqiao.springboot_study.service;

public interface EmailService {

    boolean send(String to,String title,String content);

}

```

5)实现类

```java
package cn.lanqiao.springboot_study.service.impl;

import cn.lanqiao.springboot_study.pojo.EmailProperties;
import cn.lanqiao.springboot_study.service.EmailService;
import cn.lanqiao.springboot_study.utils.MailUtil;
import org.eclipse.angus.mail.util.MailSSLSocketFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.GeneralSecurityException;
import java.util.Properties;

@Service
public class EmailServiceImpl  implements EmailService {
    //注入email配置信息实体类
    @Autowired
    private EmailProperties emailProperties;

    /**
     * @param to 收件人邮箱
     * @param title 邮件标题
     * @param content 邮件正文
     * @return
     */
    @Override
    public boolean send(String to, String title, String content) {
        //打印email配置信息
        System.out.println(emailProperties);
        //发送邮件
        boolean flag = MailUtil.sendMail(emailProperties,to, title, content);
        return flag;
    }
}

```

6)控制层

```java
package cn.lanqiao.springboot_study.controller;

import cn.lanqiao.springboot_study.pojo.EmailProperties;
import cn.lanqiao.springboot_study.service.EmailService;
import cn.lanqiao.springboot_study.utils.MailUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailController {
    //注入email配置信息实体类
    @Autowired
    private EmailService emailService;

    //测试方法
    @RequestMapping("/send")
    public Boolean send(){
        //收件人信箱
        String to = "1123377679@qq.com";
        //邮件标题
        String title = "测试邮件";
        //邮件正文
        String content  = "我是即将年薪百万的打工仔......";
        //发送邮件
        boolean flag = emailService.send(to,title,content);
        return flag;
    }
}

```

7)最后启动主类，发送send请求

8)修改yml配置文件

```xml
#发件人相关的信息
email:
  user: 1123377679@qq.com
  code: wpompajpqrlzgdaj
  host: smtp.qq.com
  auth: true
```

## 整合MyBatis

首先第一个就是需要导入Mybatis的启动jar包

```xml
<dependency>
            <groupId>com.mysql</groupId>
            <artifactId>mysql-connector-j</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>3.0.3</version>
        </dependency>
```

然后再yml中配置数据库的相关信息

```java
spring:
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://localhost:3306/software_class3
    username: root
    password: 123456
```

### 案例:通过id查询相关的数据响应给前端

## Bean管理

### Bean扫描

xml标签

```xml
<context:compoent-scan base-package="cn.lanqiao">
```

注解

```java
@ComponentScan("cn.lanqiao")
```

Springboot

```java
@SpringBootApplication //关键在于这个注解
public class SpringbootStudyApplication {

    public static void main(String[] args) {
        SpringApplication.run(SpringbootStudyApplication.class, args);
    }

}
```

![image-20241117223636313](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241117223636313.png)

![image-20241117223725784](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241117223725784.png)

SpringBoot默认扫描启动类所在的包及其子包

## 自动配置原理

为什么要学习原理

第一个就是面试：请说一下Springboot自动配置的原理

### 源码分析

程序引入spring-boot-starter-web起步依赖，启动后，会自动往ioc容器中注入DispatcherServlet

1)先不引入Springbootweb依赖

```java
<dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
```

2)获取dispatcherServlet bean对象

```java
 ApplicationContext context = SpringApplication.run(SpringbootStudyApplication.class, args);
        System.out.println(context.getBean("dispatcherServlet"));
```

3)运行之后会报错

```java
Exception in thread "main" org.springframework.beans.factory.NoSuchBeanDefinitionException: No bean named 'dispatcherServlet' available
	at org.springframework.beans.factory.support.DefaultListableBeanFactory.getBeanDefinition(DefaultListableBeanFactory.java:895)
	at org.springframework.beans.factory.support.AbstractBeanFactory.getMergedLocalBeanDefinition(AbstractBeanFactory.java:1362)
	at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:300)
	at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:200)
	at org.springframework.context.support.AbstractApplicationContext.getBean(AbstractApplicationContext.java:1243)
	at cn.lanqiao.springboot_study.SpringbootStudyApplication.main(SpringbootStudyApplication.java:13)
```

4)这个时候再引入Springbootweb依赖

```java
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
```

5)启动代码

```java
org.springframework.web.servlet.DispatcherServlet@65d8dff8
```

![image-20241117233901593](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241117233901593.png)

![image-20241117233929707](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241117233929707.png)

## Springboot拦截器

第一步：需要实现HandleInterceptor接口

![image-20250223213533726](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20250223213533726.png)

```java
@Component
public class LoginInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        //令牌验证
        String token = request.getHeader("Authorization");
        //验证token
        try {
            Map<String, Object> claims = JwtUtil.parseToken(token);
            //放行
            return true;
        } catch (Exception e) {
            //http响应状态码为401
            response.setStatus(401);
            //不放行
            return false;
        }
    }
}
```

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Autowired
    private LoginInterceptor loginInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        //登录接口和注册接口不拦截
        registry.addInterceptor(loginInterceptor).excludePathPatterns("/user/login","/user/register");
    }
}
```

## ThreadLocal

用来存储数据:set()/get()

使用ThreadLocal存储的数据，线程安全

用完记得释放，以免内存占用过多

```java
public class ThreadLocalTest {

    @Test
    public void testThreadLocalSetAndGet(){
        //提供一个ThreadLocal对象
        ThreadLocal tl = new ThreadLocal();

        //开启两个线程
        new Thread(()->{
            tl.set("xxx");
            System.out.println(Thread.currentThread().getName()+": "+tl.get());
            System.out.println(Thread.currentThread().getName()+": "+tl.get());
            System.out.println(Thread.currentThread().getName()+": "+tl.get());
        },"蓝色").start();

        new Thread(()->{
            tl.set("sss");
            System.out.println(Thread.currentThread().getName()+": "+tl.get());
            System.out.println(Thread.currentThread().getName()+": "+tl.get());
            System.out.println(Thread.currentThread().getName()+": "+tl.get());
        },"绿色").start();
    }
}
```

### 全局异常处理器

![image-20250226093719613](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20250226093719613.png)

## PageHelper分页插件

```xml
 <!--pageHelper坐标-->
    <dependency>
      <groupId>com.github.pagehelper</groupId>
      <artifactId>pagehelper-spring-boot-starter</artifactId>
      <version>1.4.6</version>
    </dependency>
```

`PageHelper` 是 MyBatis 中的一个分页插件，用于简化分页查询的实现。其核心方法是 `PageHelper.startPage(pageNum, pageSize)`。

### `PageHelper.startPage(pageNum, pageSize)` 方法

#### **作用**

- 用于开启分页功能。
- 它会自动拦截接下来执行的 SQL 查询，并在查询语句中添加分页逻辑（如 `LIMIT` 或 `ROWNUM`），从而实现分页查询。

#### **参数**

1. **`pageNum`**
   - 表示当前页码（从 1 开始）。
   - 例如，`pageNum = 1` 表示查询第一页的数据。
2. **`pageSize`**
   - 表示每页显示的记录条数。
   - 例如，`pageSize = 10` 表示每页显示 10 条数据。

### **工作原理**

1. **拦截 SQL 查询**

   - 当调用 `PageHelper.startPage(pageNum, pageSize);` 后，PageHelper 会通过 MyBatis 的拦截器机制，拦截接下来执行的 SQL 查询。

2. **自动添加分页逻辑**

   - PageHelper 会根据数据库类型（如 MySQL、Oracle 等），自动在 SQL 查询语句中添加分页逻辑。

     - 对于 MySQL，会自动添加 `LIMIT` 子句。例如：

       ```sql
       SELECT * FROM article LIMIT 10 OFFSET 0; -- 查询第1页，每页10条
       ```

     - 对于 Oracle，会自动添加 `ROWNUM` 子句。

3. **返回分页结果**

   - 查询结果会被封装到 `Page` 对象中，该对象包含了分页信息（如总记录数、当前页数据等）。

### **示例代码**

```java
@Override
public PageBean<Article> list(Integer pageNum, Integer pageSize, Integer categoryId, String state) {
    // 1. 创建PageBean对象
    PageBean<Article> pb = new PageBean<>();

    // 2. 开启分页查询
    PageHelper.startPage(pageNum, pageSize);

    // 3. 调用mapper查询数据
    Map<String, Object> map = ThreadLocalUtil.get();
    Integer userId = (Integer) map.get("id");
    List<Article> as = articleMapper.list(userId, categoryId, state);

    // 4. 将查询结果强制转换为Page对象
    Page<Article> p = (Page<Article>) as;

    // 5. 将分页数据填充到PageBean对象中
    pb.setTotal(p.getTotal());       // 设置总记录数
    pb.setItems(p.getResult());     // 设置当前页数据

    return pb;
}
```

### **注意事项**

1. **`PageHelper.startPage` 的调用位置**
   - 必须在执行 SQL 查询之前调用，否则分页功能不会生效。
2. **线程安全问题**
   - `PageHelper.startPage` 是基于 `ThreadLocal` 实现的，因此它是线程安全的。
   - 确保每次查询后调用 `PageHelper.clearPage()` 清理分页参数，避免影响后续查询。
3. **数据库兼容性**
   - PageHelper 支持多种数据库（如 MySQL、Oracle、PostgreSQL 等），会自动根据数据库类型生成合适的分页 SQL。

### **总结**

- `PageHelper.startPage(pageNum, pageSize);` 是 PageHelper 分页插件的核心方法，用于开启分页功能。
- 它会自动拦截 SQL 查询并添加分页逻辑，返回分页结果。
- 通过 `Page` 对象可以获取总记录数和当前页数据，方便封装到自定义的分页结果类（如 `PageBean`）中。

## Springboot项目热部署

1.Intellij IDEA左上角——>文件——>**settings——>搜索debug**

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/38d58d1acce34a44af8b44aaa158a7d6.png)

2.修改[springboot配置](https://so.csdn.net/so/search?q=springboot配置&spm=1001.2101.3001.7020)，实时更新类和资源

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/a1cf52c7516c4279a550df65ba9f1b44.png)

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/d1d80ce9a0c84403b5ac64ce36fb821a.png)

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/a5396cb4f34c4bbc805e0ba59d809774.png)

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/554a16257aab44299b01ce112bec157e.png)

3.IDEA开启项目自动编译

Intellij IDEA左上角——>文件——>**settings——>搜索compiler**

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/3e80c82d4abc4bb09817b6fe940cd023.png)

4.IDEA开启项目运行时可以看到下面图标则配置成功

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/5f6d45f5d8f541e8bb54fefd20de6b54.png)

## 阿里云OSS对象存储

**前言**
JavaEE项目中需要对图片视频等静态资源进行上传下载，这里用到阿里云对象存储服务（Object Storage Service，简称OSS），OSS可以通过网络随时存取包括但不限于文本、图片、音视频等各种非结构化数据文件，还有Excel表，CSV、数据库表等结构化数据文件。将文件以对象的形式上传到存储空间（bucket）中。

**阿里云OSS基本操作**

您可以进行以下操作：

1.创建一个或者多个存储空间，向每个存储空间中添加文件

2.存储空间中的每个文件都有对应的网络链接，可以进行文件的下载和共享

3.修改存储空间或者文件的属性、元信息来设置响应的访问权限

4.在阿里云管理控制台执行基本的高级OSS任务

5.使用阿里云开发工具包或者直接在应用程序中进行RESTful API调用执行基本和高级 OSS任务

**开通阿里云OSS服务（免费）**

需要阿里云账号和实名验证

开通还是免费的，0元，后续按量计费，当然也有免费的，有各种限制

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/076f6b1c89454eaa9091649f902977bc.png)

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/43880a70aed3491a9d31511e6647637b.png)

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/857e965d9bab4a21adb1635332c1cf87.png)

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/cc9e8790d05a44e9a747e25f3b38b0d6.png)

**创建Bucket存储空间**
开通后，有时需要多等一段时间，系统处理也许有延迟，会显示未开通，我这次就是等了20分钟

长这样：

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/136b3e3c7fde492cb0a11147d02f8f09.png)

开始创建...

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/d3f416b562314c1fb3705f227d1adc7a.png)

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/7504d1a5091140e3b7466a703fe0c318.png)

是否开启“阻止公共访问”

```java
开启

安全性需求高：如果存储的文件包含敏感数据或私人信息，为了保障数据安全，建议开启“阻止公共访问”，确保只有授权的用户可以访问和下载文件。

避免意外泄露：阻止公共访问可以减少意外将文件暴露在公共网络上，并降低数据泄露的风险。

符合合规要求：某些行业或组织可能有特定的安全合规要求，需要严格控制数据的访问权限，此时开启“阻止公共访问”是必要的。

关闭

共享文件需要：如果您需要公开分享存储在 OSS 中的文件给其他用户或公众访问，可以不开启“阻止公共访问”。

静态网站托管：如果您使用 OSS 托管静态网站并希望公开访问网站内容，可以选择不开启“阻止公共访问”。

临时文件需求：对于一些临时或公开数据，如公告、新闻稿等，也可以选择不开启“阻止公共访问”。
```

下面这个默认是已开通，只能等创建完再修改了，然后下面选择公共读

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/1c8564434f7e4f7d925b5739037ffff2.png)

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/a69e517c26234caf8f1aed19b1222258.png)

长这样，（进入Bucket）

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/207520e3939d4bcfa6810533fbef8fdf.png)

进入后跳转到这里，关闭"阻止公共访问"

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/8525d99ce3b24eb4acb1861d7ccbbd57.png)

再开启"公共读"

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/20c5b1853d134c1e8aa3d811e9c836a7.gif)

在这里看上传的文件

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/5fd529b8c31f4356b16e54fce0b412f6.png)

**获取AccessKey ID和AccessKey Secret**
在阿里云 OSS（对象存储服务）中，AccessKey ID 和 AccessKey Secret 是用于进行身份验证和访问控制的秘钥凭据（成对出现）。可以在阿里云控制台创建，用于标识和验证身份以便进行 API 调用和访问阿里云资源。

**AccessKey ID**

作用：AccessKey ID 是一个由字母和数字组成的唯一标识符，用于标识阿里云平台上的账户。

使用场景：使用阿里云 SDK、API 或其他工具与 OSS 进行交互时，需要提供 AccessKey ID 来标识自己的身份。

**AccessKey Secret**

作用：AccessKey Secret 是与 AccessKey ID 相关联的机密字符串，用于对 API 请求进行签名和验证。

安全性：AccessKey Secret 应当被妥善保管，并不应该公开或分享给他人，以免造成安全风险。

为了保证账户和数据的安全，建议定期更换 AccessKey ID 和 AccessKey Secret，如果遗失了 AccessKey ID 或 AccessKey Secret，可以在阿里云控制台重新生成新的凭据。

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/a065defe47264fd98621f387016c755a.png)

开始获取...

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/e7370a07d09e498abe06274c16b13432.png)

点击【继续使用AccessKey】

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/62d30e851edc457d9faef023dd402223.png)

还要安全验证，自己选择

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/bfbe2b58d98e4b4ba5a0738ab0a0449c.png)

**不要泄漏，定期更换，丢失无法找回只能重新生成！！！**

**不要泄漏，定期更换，丢失无法找回只能重新生成！！！**

**不要泄漏，定期更换，丢失无法找回只能重新生成！！！**

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/8fe03ebd8957475cbeba816ac836609e.png)

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/fe48989c07bb4d9ca40176b3da266a1b.png)

**获取地域节点与存储空间名**
这两个东西下面会用到

我选择的是华东1（杭州），如果你选择的不是这个，那么节点名是不一样的

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/fe63f82e1e74464796ee9b88537c185f.png)

JavaEE项目使用OSS

导入依赖

JDK版本不同，对应的依赖也不同，需要查看文档

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/7f3b6513240b453187cf38e3f26ee566.png)

这里查看文档

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/a9c3d2dc159d42caba86553951381def.png)

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/71fd3dda34cb426ea755d645de343ccc.png)

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/c0ba2f7170cb469e9fdbf2505cbc6ccf.png)

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/5e888e540a584e3a9698962615e42b33.png)

我当前项目使用的是JDK17，所以我需要导入以下依赖（不过，曾经有一个项目，并没有导入第三个依赖也同样能成功使用功能OSS，这一点有待研究）

```java
<dependency>
    <groupId>javax.xml.bind</groupId>
    <artifactId>jaxb-api</artifactId>
    <version>2.3.1</version>
</dependency>
<dependency>
    <groupId>javax.activation</groupId>
    <artifactId>activation</artifactId>
    <version>1.1.1</version>
</dependency>
<!-- no more than 2.3.3-->
<dependency>
    <groupId>org.glassfish.jaxb</groupId>
    <artifactId>jaxb-runtime</artifactId>
    <version>2.3.3</version>
</dependency>
```

**文件上传**

下面是官网给出的快速入门的测试demo，可以自己试试

```java
import java.io.*;
import java.util.Random;
import com.aliyun.oss.ClientException;
import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.aliyun.oss.OSSException;
import com.aliyun.oss.common.auth.CredentialsProviderFactory;
import com.aliyun.oss.common.auth.EnvironmentVariableCredentialsProvider;
import com.aliyun.oss.model.OSSObject;
import com.aliyun.oss.model.ObjectListing;
import com.aliyun.oss.model.OSSObjectSummary;
 
public class OssJavaSdkQuickStart {
    /** 生成一个唯一的 Bucket 名称 */
    public static String generateUniqueBucketName(String prefix) {
        // 获取当前时间戳
        String timestamp = String.valueOf(System.currentTimeMillis());
        // 生成一个 0 到 9999 之间的随机数
        Random random = new Random();
        int randomNum = random.nextInt(10000); // 生成一个 0 到 9999 之间的随机数
        // 连接以形成一个唯一的 Bucket 名称
        return prefix + "-" + timestamp + "-" + randomNum;
    }
 
    public static void main(String[] args) throws com.aliyuncs.exceptions.ClientException {
        // 设置 OSS Endpoint 和 Bucket 名称
        String endpoint = "https://oss-cn-hangzhou.aliyuncs.com";
        String bucketName = generateUniqueBucketName("demo");
        // 替换为您的 Bucket 区域
        String region = "cn-hangzhou";
        // 创建 OSSClient 实例
        EnvironmentVariableCredentialsProvider credentialsProvider =
                CredentialsProviderFactory.newEnvironmentVariableCredentialsProvider();
        OSS ossClient = OSSClientBuilder.create()
                .endpoint(endpoint)
                .credentialsProvider(credentialsProvider)
                .region(region)
                .build();
        try {
            // 1. 创建存储空间（Bucket）
            ossClient.createBucket(bucketName);
            System.out.println("1. Bucket " + bucketName + " 创建成功。");
            // 2. 上传文件
            String objectName = "exampledir/exampleobject.txt";
            String content = "Hello OSS";
            ossClient.putObject(bucketName, objectName, new ByteArrayInputStream(content.getBytes()));
            System.out.println("2. 文件 " + objectName + " 上传成功。");
            // 3. 下载文件
            OSSObject ossObject = ossClient.getObject(bucketName, objectName);
            InputStream contentStream = ossObject.getObjectContent();
            BufferedReader reader = new BufferedReader(new InputStreamReader(contentStream));
            String line;
            System.out.println("3. 下载的文件内容：");
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }
            contentStream.close();
            // 4. 列出文件
            System.out.println("4. 列出 Bucket 中的文件：");
            ObjectListing objectListing = ossClient.listObjects(bucketName);
            for (OSSObjectSummary objectSummary : objectListing.getObjectSummaries()) {
                System.out.println(" - " + objectSummary.getKey() + " (大小 = " + objectSummary.getSize() + ")");
            }
            // 5. 删除文件
            ossClient.deleteObject(bucketName, objectName);
            System.out.println("5. 文件 " + objectName + " 删除成功。");
            // 6. 删除存储空间（Bucket）
            ossClient.deleteBucket(bucketName);
            System.out.println("6. Bucket " + bucketName + " 删除成功。");
        } catch (OSSException oe) {
            System.out.println("Caught an OSSException, which means your request made it to OSS, "
                    + "but was rejected with an error response for some reason.");
            System.out.println("Error Message:" + oe.getErrorMessage());
            System.out.println("Error Code:" + oe.getErrorCode());
            System.out.println("Request ID:" + oe.getRequestId());
            System.out.println("Host ID:" + oe.getHostId());
        } catch (ClientException | IOException ce) {
            System.out.println("Caught an ClientException, which means the client encountered "
                    + "a serious internal problem while trying to communicate with OSS, "
                    + "such as not being able to access the network.");
            System.out.println("Error Message:" + ce.getMessage());
        } finally {
            if (ossClient != null) {
                ossClient.shutdown();
            }
        }
    }
}
```

```java
package cn.lanqiao.dataspringboot;


import com.aliyun.oss.ClientException;
import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.aliyun.oss.OSSException;


import java.util.Random;
import java.io.*;
/**
 * @ Author: 李某人
 * @ Date: 2025/03/10/16:52
 * @ Description:
 */
public class OssJavaSdkQuickStart {
    public static void main(String[] args){
        // 基础参数配置（需替换为实际值）
        String endpoint = "https://oss-cn-chengdu.aliyuncs.com";  // 根据Bucket地域调整
        String accessKeyId = "xxxxx";
        String accessKeySecret = "xxxxx";
        String bucketName = "dataspringboot";  // 目标Bucket名称
        String objectName = "upload/"+getStringRandom(8)+".jpg";  // OSS中的文件路径+名称
        String localFilePath = "E:\\bd3eb13533fa828b0850db71d292213b960a5a49.jpg";  // 本地文件路径

        // 创建OSSClient实例
        OSS ossClient = new OSSClientBuilder().build(endpoint, accessKeyId, accessKeySecret);

        try {
            // 上传文件流
            InputStream inputStream = new FileInputStream(localFilePath);
            ossClient.putObject(bucketName, objectName, inputStream);
            System.out.println("文件上传完成");
        } catch (OSSException | ClientException | FileNotFoundException e) {
            e.printStackTrace();
        } finally {
            ossClient.shutdown();
        }
    }
    public static String getStringRandom(int length) {
        StringBuilder val = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < length; i++) {
            if (random.nextBoolean()) {  // 生成字母（大小写随机）
                int choice = random.nextBoolean() ? 65 : 97;  // 65为大写A，97为小写a
                val.append((char) (choice + random.nextInt(26)));
            } else {  // 生成数字
                val.append(random.nextInt(10));
            }
        }
        return val.toString();
    }
}

```







































