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

