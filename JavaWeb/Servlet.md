# Servlet

## 课前回顾

1.什么是tomcat?

2.tomcat怎么配置?	

## 初识servlet

Servlet是Java提供的一门动态web资源开发技术

![image-20230829202721206](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202308292027576.png)

不同的用户访问或者用户携带不同的参数访问，将来看到的效果是不一样的

![image-20230829234440769](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202308292344214.png)



Servlet是javaEE规范之一，其实就是一个接口，将来我们需要定义Servlet类实现Servlet接口，并由web服务器运行Servlet

## Servlet快速入门

1.创建web项目，导入Servlet依赖坐标，记得配置本地Tomcat

```java
	<dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>javax.servlet-api</artifactId>
      <version>3.1.0</version>
      <scope>provided</scope>
    </dependency>
```

2.创建：定义一个类，实现Servlet接口，并重写接口中所有方法，并在service方法中输入一句话

```Java
package cn.lanqiao;
import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import java.io.IOException;

public class ServletDemo1 implements Servlet {

    @Override
    public void init(ServletConfig config) throws ServletException {

    }

    @Override
    public ServletConfig getServletConfig() {
        return null;
    }

    @Override
    public void service(ServletRequest req, ServletResponse res) throws ServletException, IOException {
        System.out.println("HelloWorld");
    }

    @Override
    public String getServletInfo() {
        return null;
    }

    @Override
    public void destroy() {

    }
}

```

3.配置:在类上使用@WebServlet注解，配置该Servlet的访问路径

```java
package cn.lanqiao;
import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import java.io.IOException;
@WebServlet("/demo1")
public class ServletDemo1 implements Servlet {

    @Override
    public void init(ServletConfig config) throws ServletException {

    }

    @Override
    public ServletConfig getServletConfig() {
        return null;
    }

    @Override
    public void service(ServletRequest req, ServletResponse res) throws ServletException, IOException {
        System.out.println("HelloWorld");
    }

    @Override
    public String getServletInfo() {
        return null;
    }

    @Override
    public void destroy() {

    }
}

```

4.访问：启动Tomcat，浏览器输入URL访问该Servlet

```java
http://localhost:8080/demo1
```

### 小结

servlet快速入门的步骤

## Servlet执行流程

Servlet程序已经能正常运行，但是我们需要思考个问题: 我们并没有创建ServletDemo1类的对象，也没有调用service中的方法，为什么控制台就输出了`虎先锋三拳打碎我的大圣梦`这句话呢？

要解答上述问题，我们就需要对Servlet的执行流程进行一个学习。

- 浏览器发出http://localhost:8080/maven_test_war_exploded/demo1请求，从请求中可以解析出三部分内容，分别是localhost:8080、maven_test_war_exploded、demo1
  - 根据`localhost:8080`可以找到要访问的TomcatWeb服务器
  - 根据`maven_test_war_exploded`可以找到部署在Tomcat服务器上的maven_test_war_exploded项目
  - 根据`demo1`可以找到要访问的是项目中的哪个servlet类，根据@WebServlet后面的值进行匹配

- 找到ServletDemo这个类后，TomcatWeb服务器就会为ServletDemo这个类创建一个对象，然后调用对象中的service方法
  - ServletDemo实现了Servlet接口，所以类中必然会重写service方法供TomcatWeb服务器进行调用
  - service方法汇总有ServletRequest和ServletResponse两个参数，ServletRequest封装的是请求数据
  - ServletResponse封装的是响应数据，后期我们可以通过这两个参数实现前后端的数据交互

### 小结

1.Servlet由谁创建？Servlet方法由谁调用？

2.服务器怎么知道Servlet中一定有service方法？

## Servlet生命周期

对象的生命周期指一个对象从被创建到被销毁的整个过程

![image-20230216170839628](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202309242209941.png)

Servlet运行在Servlet容器(web服务器)中，其生命周期由容器来管理，**分为4个阶段：**

1.**加载和实例化**：默认情况下，当Servlet第一次被访问时，由容器创建Servlet()对象

2.**初始化**：在Servlet实例化之后，容器将调用Servlet的init()方法初始化这个对象，完成一些如加载配置文件、创建连接等初始化的工作。该方法只调用一次

3.**请求处理**：每次请求Servlet时，Servlet容器都会调用Servlet的service()方法对请求进行处理。

4.**服务终止**：当需要释放内存或者容器关闭时，容器就会调用Servlet实例的destroy()方法完成资源的释放。在destroy()方法调用之后，容器会释放这个Servlet:实例，该实例随后会被Java的垃圾收集器所回收

```java
import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import java.io.IOException;

//设置为1之后，在我们访问http://localhost:8080/web-demo/demo之前，就会进行初始化操作了，第一个人访问的时候就不会等那么久了
@WebServlet(urlPatterns = "/demo",loadOnStartup = 1)
public class ServletDemo implements Servlet {
    /**
     * 初始化方法
     * 1.调用时机：默认情况下，Servlet被第一次访问时，调用
     * * loadOnStartup: 默认为-1，修改为0或者正整数，则会在服务器启动的时候，调用
     * 2.调用次数: 1次
     *
     * @param servletConfig
     * @throws ServletException
     */
    @Override
    public void init(ServletConfig servletConfig) throws ServletException {
        System.out.println("init..");
    }

    /**
     * 提供服务
     * 1.调用时机:每一次Servlet被访问时，调用
     * 2.调用次数: 多次
     *
     * @param servletRequest
     * @param servletResponse
     * @throws ServletException
     * @throws IOException
     */
    @Override
    public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
        System.out.println("hello servlet");
    }

    /**
     * 销毁方法
     * 1.调用时机：内存释放或者服务器关闭的时候，Servlet对象会被销毁，调用
     * 2.调用次数: 1次
     */
    @Override
    public void destroy() {
        System.out.println("destroy...");
    }

    @Override
    public String getServletInfo() {
        return null;
    }

    @Override
    public ServletConfig getServletConfig() {
        return null;
    }
}
```

### 小结

Servlet对象在什么时候被创建的?

>默认是第一次访问的时候被创建，可以使用`@WebServlet(urlPatterns = "/demo2",loadOnStartup = 1)`修改成在服务器启动的时候创建。

Servlet生命周期中涉及到的三个方法，这三个方法是什么?什么时候被调用?调用几次?

>涉及到三个方法，分别是 init()、service()、destroy()
>init方法在Servlet对象被创建的时候执行，只执行1次
>service方法在Servlet被访问的时候调用，每访问1次就调用1次(每刷新一次界面，控制台就会输出一次)
>destroy方法在Servlet对象被销毁的时候调用，只执行1次

## Servlet方法介绍

Servlet中总共有5个方法，我们已经介绍过其中的三个，剩下的两个方法是:

获取Servlet信息

```
String getServletInfo()
```

获取ServletConfig对象

```
ServletConfig getServletConfig()
```

ServletConfig对象，在init方法的参数中有，而Tomcat Web服务器在创建Servlet对象的时候会调用init方法，必定会传入一个ServletConfig对象，我们只需要将服务器传过来的ServletConfig进行返回即可。具体如何操作?

创建一个私有的ServletConfig对象，当我们调用init方法的时候，将传入的ServletConfig对象赋给私有的ServletConfig对象，代码如下

```java
import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import java.io.IOException;

@WebServlet(urlPatterns = "/demo", loadOnStartup = 1)
public class ServletDemo implements Servlet {
    //创建ServletConfig对象
    private ServletConfig servletConfig;

    @Override
    public void init(ServletConfig servletConfig) throws ServletException {
        //将init方法传入的ServletConfig对象赋给我们创建的ServletConfig
        this.servletConfig = servletConfig;
        System.out.println("init..");
    }

    @Override
    public ServletConfig getServletConfig() {
        //返回ServletConfig对象
        return servletConfig;
    }

    @Override
    public void service(ServletRequest servletRequest, ServletResponse servletResponse) throws ServletException, IOException {
        System.out.println("hello servlet");
    }

    @Override
    public void destroy() {
        System.out.println("destroy...");
    }

    @Override
    public String getServletInfo() {
        return null;
    }
}
```

getServletInfo()和getServletConfig()这两个方法使用的不是很多，了解一下就行。

## Servlet体系结构

通过上面的学习，我们知道要想编写一个Servlet就必须要实现Servlet接口，重写接口中的5个方法，虽然已经能完成要求，但是编写起来还是比较麻烦的，因为我们更关注的其实只有service方法，那有没有更简单方式来创建Servlet呢?

要想解决上面的问题，我们需要先对Servlet的体系结构进行下了解:

![image-20230216174806519](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202309242208590.png)

我们将来开发B/S架构的web项目，都是针对HTTP协议,所以我们自定义Servlet,会继承HttpServlet

```java
import javax.servlet.*;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(urlPatterns = "/demo", loadOnStartup = 1)
public class ServletDemo extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("post...");
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        System.out.println("get...");
    }
}
```

- 要想发送一个GET请求，请求该Servlet，只需要通过浏览器发送`http://localhost:8080/web-demo/demo4`,就能看到doGet方法被执行了
- 要想发送一个POST请求，请求该Servlet，单单通过浏览器是无法实现的，这个时候就需要编写一个form表单来发送请求，在webapp下创建一个`index.html`页面，内容如下:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<form action="/web_demo_war_exploded/demo" method="post">
  用户名：<input type="text" name="username">
  <input type="submit" value="提交">
</form>
</body>
</html>
```

启动测试，在控制台可看到doPost方法被执行了。

## Servlet urlPattern配置

Servlet要想被访问，必须配置其访问路径(urlPattern)

1.一个Servlet,可以配置多个urlPattern

```
@WebServlet(urlPatterns={"/demo1","/demo2"})
```

2.urlPattern配置规则

​	2.1精确匹配

​	2.2目录匹配

​	2.3扩展名匹配

​	2.4任意匹配

![image-20230216180814052](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202310070841578.png)

![image-20230216180819813](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202310070841338.png)

![image-20230216180828785](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202310070841953.png)

>/和/*区别：
>当我们的项目中的Servlet配置了"/"，会覆盖掉tomcat中的
>DefaultServlet,当其他的url-pattern都匹配不上时就会走这个Servlet
>当我们的项目中配置了"/*""，意味着匹配任意访问路径

优先级：
精确路径>目录路径>扩展名路径>/*>/

## XML配置方式编写Servlet

Servlet从3.0版本后开始支持使用注解配置，3.0版本前只支持XML配置文件的配置方式

步骤：

1.编写Servlet类

2.在web.xml中配置该Servlet

![image-20230216181254695](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202310061903747.png)

# Request(请求)和Response(响应)介绍

![image-20230216181548912](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202310061108304.png)

# Request

## Request继承体系

![image-20231006121159149](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202310061212318.png)

![image-20230216183246266](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202310061217201.png)

1.Tomcat需要解析请求数据，封装为request对象并且创建request对象传递到service方法中
2.使用request对象，查阅JavaEE API文档的HttpServletRequest接口

## Request获取请求数据

### 请求数据分为3部分

1.请求行:	

```
GET /request-demo/req1?username=zhangsan HTTP/1.1
```

String getMethod():获取请求方式：GET
String getContextPath():获取虚拟目录（项目访问路径）：/request-.demo
String Buffer getRequestURL():获取URL(统一资源定位符)：http:/localhost::808O/request-demo/req1
String getRequestURI():获取URI(统一资源标识符)：/request-demo/req1
String getQueryString():获取请求参数(GET方式)：username=zhangsan&password=123

2.请求头

```
User-Agent:Mozilla/5.0 Chrome/91.0.4472.106
String agent = req.getHeader("user-agent");
```

String getHeader(String name):根据请求头名称，获取值

3.请求体(post请求方式)

```
username=superbaby&password=123
```

ServletlnputStream getlnputStream():获取字节输入流

BufferedReader getReader():获取字符输入流

### 通用方式请求参数

![image-20230216185128951](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202310081512666.png)

思考：
GET请求方式和POST请求方式区别主要在于获取请求参数的方式不一样，是否可以

提供一种统一获取请求参数的方式，从而统一doGet和doPost方法内的代码？

### Request通用方法获取请求参数

```java
Map<String,String[]>getParameterMap():获取所有参数Map集合

String[]getParameterValues(String name):根据名称获取参数值（数组）

String getParameter(String name):根据名称获取参数值（单个值）
```

前端页面:

```jsp
<%@ page contentType="text/html;charset=UTF-8" %>
<html>
<body>
<form action="/maven_test_war_exploded/demo11" method="get">
    用户名：<input type="text" name="username"><br>
    密码：<input type="password" name="password"><br>
    爱好:
    <input type="checkbox" name="hobby" value="1">唱
    <input type="checkbox" name="hobby" value="2">跳
    <input type="checkbox" name="hobby" value="3">rap
    <input type="checkbox" name="hobby" value="4">打篮球
    <input type="submit" value="提交">
</form>
</body>
</html>
```

后端:

```java
//GET请求逻辑
        System.out.println("get...");
        //1.获取所有参数的Map集合
        Map<String, String[]> parameterMap = req.getParameterMap();
        for (String key : parameterMap.keySet()){
            System.out.print(key+":");
            //获取值
            String[] values = parameterMap.get(key);
            for (String value : values){
                System.out.print(value+" ");
            }
            //换行
            System.out.println();
        }
        //2.String[]getParameterValues(String name):根据名称获取参数值（数组）
        String[] hobbies = req.getParameterValues("hobby");
        for (String hobby : hobbies){
            System.out.println(hobby);
        }
        //3.String getParameter(String name):根据名称获取参数值（单个值）
        String username = req.getParameter("username");
        System.out.println(username);
        String hobby = req.getParameter("hobby");
        System.out.println(hobby);
```



# Idea模板创建Servlet

![image-20231008175720239](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202310081803679.png)

![image-20230216200116856](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202310081757404.png)

# 请求参数中文乱码处理

## Request请求参数中文乱码处理

请求参数如果存在中文数据，则会乱码

解决方案:

Post:设置输入流的编码

```
req.setCharacterEncoding("UTF-8");

//处理请求和响应乱码
req.setCharacterEncoding("UTF-8");
resp.setContentType("text/html;charset=utf-8");
```

通用方式(GET/POST):先编码，再解码

```
username = new String(username.getBytes(StandardCharsets.IS0_88591),StandardCharsets.UTF_8);
```

Tomcat8.0之后，已将GET请求乱码问题解决，设置默认的解码方式为UTF-8

# 请求转发

请求转发(forward):一种在服务器内部的资源跳转方式

![image-20230216204513907](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202310091509274.png)

实现方式:

```
req.getRequestDispatcher("资源B路径").forward(req,resp);
```

### 请求转发资源间共享数据:使用Request对象

void setAttribute(String name,Object o):存储数据到request域中（重点）

Object getAttribute(String name):根据key,获取值（重点）

void removeAttribute(String name):根据key,删除该键值对

### 请求转发特点(forward):

![image-20230216224314973](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230216224314973.png)

浏览器地址栏路径不发生变化

只能转发到当前服务器的内部资源

一次请求，可以在转发的资源间使用request共享数据

# Response

![image-20231009152631885](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202310091526783.png)

## Response设置响应数据功能介绍

响应数据分为3部分:

1.响应行:

```
Http/1.1 200 OK
```

void setStatus(int sc):设置响应状态码

2.响应头:

```
Content-Type:text/html
```

void setHeader(String name,String value):设置响应头键值对

3.响应体

```
<html><head>head><body></body></html>
```

PrintWriter getWriter()获取字符输出流

ServletOutputStream getOutputStream():获取字节输出流

## Response完成重定向

重定向(Redirect):一种资源跳转方式

![image-20230216224309711](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230216224309711.png)

实现方式:

```
resp.setStatus(302);
resp.setHeader(location”,"资源B的路径")；
```

```
resp.sendRedirect("资源B的路径")；
```

### 重定向特点：

浏览器地址栏路径发生变化

可以重定向到任意位置的资源（服务器内部、外部均可）

两次请求，不能在多个资源使用request:共享数据

## 资源路径问题

![image-20231009155920344](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202310091559777.png)

### 明确路径谁使用？

浏览器使用：需要加虚拟目录（项目访问路径）

服务端使用：不需要加虚拟目录

## Response响应字符数据

使用：

1.通过Response对象获取字符输出流

```
PrintWriter writer = resp.getWriter();
```

2.写数据

```
writer.write("aaa");
writer.write("<h1>aaa</h1>");
```

3.如果需要写上中文数据的话，需要调整编码格式

```
response.setContentType("text/html;charset=utf-8");
writer.write("你好");
```

注意:

该流不需要关闭，随着响应结束，response对象销毁，由服务器关闭

## Response响应字节数据

使用:

1.通过Response对象获取字符输出流

```
//读取文件
FileInputSteam fis = new FileInputSteam("d:xxxx")
//获取response字节输出流
ServletOutputStream os = resp.getOutputStream();
//3.完成流的copy
byte[] buff = new byte[1024];
int len = 0;
while((len = fis.read(buff)!=-1)){
	os.write(buff,0,len);
}
fis.close();
```

2.写数据

```
outPutStream.write(字节数据);
```

IOUtils工具类使用

1.导入坐标

```
<dependency>
<groupld>commons-io</groupld>
<artifactld>commons-io</artifactld>
<version>2.6</versio>
</dependency>
```

2.使用

```
IOUtils.copy(输入流，输出流)；
```

# 案例

## 用户登录

流程说明:

1.用户填写用户名密码,提交到LoginServlet

2.在LoginServlet使用Mybatis查询数据库，验证用户名密码是否正确

3.如果正确，响应“登录成功”，如果错误，响应“登录失败”

准备环境

1.静态页面到webapp目录下

2.创建db1数据库，创建tb_user表，创建User实体类

3.导入Mybatis坐标，Mysql驱动坐标

4.创建mybatis-config.xml核心配置文件，UserMapper.xml映射文件，UserMapper接口

代码如下:

前端页面

```html
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>系统登录 - 超市账单管理系统</title>
    <link rel="stylesheet" href="/css/style.css"/>
</head>
<body class="login_bg">
    <section class="loginBox">
        <header class="loginHeader">
            <h1>超市账单管理系统</h1>
        </header>
        <section class="loginCont">
            <form class="loginForm" action="/loginServlet?action=login" method="post">
                <div class="inputbox">
                    <label for="user">用户名：</label>
                    <input id="user" type="text" name="username" placeholder="请输入用户名" required/>
                </div>
                <div class="inputbox">
                    <label for="mima">密码：</label>
                    <input id="mima" type="password" name="password" placeholder="请输入密码" required/>
                </div>
                <div class="subBtn">
                    <input type="submit" value="登录" />
                    <input type="reset" value="重置"/>
                    <input type="button" value="注册" onclick="tiaozhuan();"/>
                </div>

            </form>
        </section>
    </section>

</body>
<script>
    function tiaozhuan(){
        window.location.href = "/register.html";
    }
</script>
</html>
```

实体类

```java
package org.lanqiao.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private int id;
    private String username;
    private String password;

    // getter和setter方法省略

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}


```

jdbc.properties

```
jdbc.driver=com.mysql.cj.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/servlet_project?serverTimezone=GMT
jdbc.username=root
jdbc.password=password
```

mybatis-config.xml

```
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <properties resource="jdbc.properties"/>
    <!--设置连接数据库的环境-->
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
    <!--引入映射文件-->
    <mappers>
        <mapper resource="org/lanqiao/mapper/UserMapper.xml"/>
    </mappers>
</configuration>

```

userMapper

```
package org.lanqiao.mapper;

import org.apache.ibatis.annotations.Param;

public interface UserMapper {
    //登录
    int login(@Param("username") String username,@Param("password") String password);
}

```

mybatis工具类(SqlSessionUtil)

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

Servlet

```java
package org.lanqiao.controller;

import org.apache.ibatis.session.SqlSession;
import org.lanqiao.mapper.UserMapper;
import org.lanqiao.utils.SqlSessionUtil;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;

@WebServlet("/loginServlet")
public class LoginServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //处理请求和响应编码
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=utf-8");
        //获取前端请求
        String action = request.getParameter("action");
        if (action.equals("login")){
            toLogin(request, response);
        }else if (action.equals("register")){
            //注册代码
        }

    }

    private static void toLogin(HttpServletRequest request, HttpServletResponse response) throws IOException {
        //登录代码
        //获取前端传送过来的用户名和密码
        String username = request.getParameter("username");
        System.out.println(username);
        String password = request.getParameter("password");
        System.out.println(password);
        SqlSession session = SqlSessionUtil.getSession();
        UserMapper mapper = session.getMapper(UserMapper.class);
        int login = mapper.login(username, password);
        if (login>=1){
            //跳转页面
            response.sendRedirect("/index.jsp");
        }else{
            //登录失败，跳转登录页面
            response.sendRedirect("/login.jsp");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doGet(request, response);
    }
}

```

## 用户注册

流程说明：

1.用户填写用户名、密码等信息，点击注册按钮，提交到RegisterServlet

2.在RegisterServlet中使用MyBatis保存数据

3.保存前，需要判断用户名是否已经存在：根据用户名查询数据库 

代码如下:

```html
<!doctype html>
<html lang="zh">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
    <link rel="icon" href="/dist/img/favicon-32x32.png" sizes="32x32" type="image/png">
    <link rel="icon" href="/dist/img/favicon-16x16.png" sizes="16x16" type="image/png">
    <meta name="keywords" content="响应式后台模板,开源免费后台模板,Bootstrap5后台管理系统模板">
    <meta name="description" content="Bootstrap-Admin基于bootstrap5的免费开源的响应式后台管理模板">
    <meta name="author" content="ajiho">
    <link rel="stylesheet" href="/plugins/bootstrap-icons/font/bootstrap-icons.css">
    <link rel="stylesheet" href="/plugins/bootstrap/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="/dist/css/bootstrap-admin.min.css">
    <title>Bootstrap-Admin - 开源免费响应式后台管理系统模板</title>
</head>
<body class="bg-light pt-2">
<div class="container-fluid">
    <div class="card border-0 shadow-sm">
        <div class="card-body">
            <div class="row">
                <div class="col-lg-8">
                    <div class="card">
                        <div class="card-body">
                            <form action="/web-demo/registerServlet" id="form2" method="post">
                                <div class="mb-3 row">
                                    <label for="username" class="col-sm-3 col-form-label">用户名</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control" id="username" name="username" value="请输入新的用户名">
                                    </div>
                                </div>
                                <div class="mb-3 row">
                                    <label for="password" class="col-sm-3 col-form-label">密码</label>
                                    <div class="col-sm-9">
                                        <input type="text" class="form-control" id="password" name="password" value="请输入新密码">
                                    </div>
                                </div>
<!--                                <div class="mb-3 row">-->
<!--                                    <label for="phone" class="col-sm-3 col-form-label">手机号</label>-->
<!--                                    <div class="col-sm-9">-->
<!--                                        <input type="text" class="form-control" id="phone" name="phone" value="13784561032">-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                                <div class="mb-3 row">-->
<!--                                    <label for="gender2Radio1" class="col-sm-3 col-form-label">性别</label>-->
<!--                                    <div class="col-sm-9">-->
<!--                                        <div class="form-check form-check-inline">-->
<!--                                            <input class="form-check-input" type="radio" name="gender2"-->
<!--                                                   id="gender2Radio1" value="先生" checked>-->
<!--                                            <label class="form-check-label" for="gender2Radio1">先生</label>-->
<!--                                        </div>-->
<!--                                        <div class="form-check form-check-inline">-->
<!--                                            <input class="form-check-input" type="radio" name="gender2"-->
<!--                                                   id="gender2Radio2" value="女士">-->
<!--                                            <label class="form-check-label" for="gender2Radio2">女士</label>-->
<!--                                        </div>-->
<!--                                    </div>-->
<!--                                </div>-->

<!--                                <div class="mb-3 row">-->
<!--                                    <label for="age2" class="col-sm-3 col-form-label">年龄</label>-->
<!--                                    <div class="col-sm-9">-->
<!--                                        <input type="text" class="form-control" id="age2" name="age2" value="100">-->
<!--                                    </div>-->
<!--                                </div>-->


                                <div class="mb-3 row">
                                    <div class="col-sm-9 offset-sm-3">
                                        <button type="submit" class="btn btn-primary">点击注册</button>
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
<!--                    <div class="card mt-3">-->
<!--                        <div class="card-body">-->
<!--                            <h5 class="d-flex align-items-center mb-3">技能熟练程度</h5>-->
<!--                            <p>html</p>-->
<!--                            <div class="progress mb-3" style="height: 5px">-->
<!--                                <div class="progress-bar bg-primary" role="progressbar" style="width: 80%" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>-->
<!--                            </div>-->
<!--                            <p>css</p>-->
<!--                            <div class="progress mb-3" style="height: 5px">-->
<!--                                <div class="progress-bar bg-danger" role="progressbar" style="width: 72%" aria-valuenow="72" aria-valuemin="0" aria-valuemax="100"></div>-->
<!--                            </div>-->
<!--                            <p>js</p>-->
<!--                            <div class="progress mb-3" style="height: 5px">-->
<!--                                <div class="progress-bar bg-success" role="progressbar" style="width: 89%" aria-valuenow="89" aria-valuemin="0" aria-valuemax="100"></div>-->
<!--                            </div>-->
<!--                            <p>php</p>-->
<!--                            <div class="progress mb-3" style="height: 5px">-->
<!--                                <div class="progress-bar bg-warning" role="progressbar" style="width: 55%" aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>-->
<!--                            </div>-->
<!--                            <p>mysql</p>-->
<!--                            <div class="progress" style="height: 5px">-->
<!--                                <div class="progress-bar bg-info" role="progressbar" style="width: 66%" aria-valuenow="66" aria-valuemin="0" aria-valuemax="100"></div>-->
<!--                            </div>-->
<!--                        </div>-->
<!--                    </div>-->
                </div>
<!--                <div class="col-lg-4">-->
<!--                    <div class="card">-->
<!--                        <div class="card-body">-->
<!--                            <div class="d-flex flex-column align-items-center text-center">-->
<!--                                <img src="https://temp.im/120x120"  alt="Admin" class="rounded-circle p-1 bsa-bg-color4 bsa-width-100">-->
<!--                                <div class="mt-3">-->
<!--                                    <h4>欲饮琵琶码上催</h4>-->
<!--                                    <p class="text-secondary mb-1">超级管理员</p>-->
<!--                                    <p class="text-muted font-size-sm">中国 贵州</p>-->
<!--                                    <button class="btn btn-primary">关注</button>-->
<!--                                    <button class="btn btn-outline-primary">消息</button>-->
<!--                                </div>-->
<!--                            </div>-->
<!--                            <hr class="my-4">-->
<!--                            <ul class="list-group list-group-flush">-->
<!--                                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">-->
<!--                                    <h6 class="mb-0"><i class="bi bi-globe bsa-font-20"></i> 个人网址</h6>-->
<!--                                    <span class="text-secondary">https://xxxxxx.com</span>-->
<!--                                </li>-->
<!--                                <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">-->
<!--                                    <h6 class="mb-0"><i class="bi bi-github bsa-font-20"></i> Github</h6>-->
<!--                                    <span class="text-secondary">ajiho</span>-->
<!--                                </li>-->
<!--                            </ul>-->
<!--                        </div>-->
<!--                    </div>-->
<!--                </div>-->
            </div>
        </div>
    </div>
</div>

<script src="/plugins/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
<script src="/dist/js/bootstrap-admin.min.js"></script>
</body>
</html>
```

UserMapper

```java
/**
     * 注册操作()
     *
     * @return
     */
    int add(User user);

    /**
     * 查询用户名
     */
    User selectByUsername(@Param("username") String username);
```

UserMapper.xml

```java
<select id="login" resultType="cn.lanqiao.pojo.User">
        SELECT * FROM db1 where username = #{username} and password = #{password}
    </select>

    <select id="selectByUsername" resultType="cn.lanqiao.pojo.User">
        SELECT * FROM db1 where username = #{username}
    </select>
```

registerServlet

```java
@WebServlet("/registerServlet")
public class registerServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=utf-8");
        //接收用户名和密码
        String name = request.getParameter("username");
        String password = request.getParameter("password");
        //调用Mybatis完成查询
        InputStream is = Resources.getResourceAsStream("mybatis-config.xml");
        SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
        SqlSessionFactory sqlSessionFactory = sqlSessionFactoryBuilder.build(is);
        SqlSession sqlSession = sqlSessionFactory.openSession(true);
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        User user = mapper.selectByUsername(name);
        User user1 = new User(null,"wangmazi","123456");

        PrintWriter writer = response.getWriter();
        if (user != null){
            //writer.write("<script language='javascript'>alert('用户已经存在！');</script>");
            response.sendRedirect("/web-demo/profile.html");
        }else {
            //writer.write("<script language='javascript'>alert('用户添加成功！');</script>");
            int add = mapper.add(user1);
            response.sendRedirect("/web-demo/login.html");
            System.out.println(add);
            sqlSession.commit();
            sqlSession.close();
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doGet(request, response);
    }
}
```



