

# Filter

概念：Filter表示过滤器，是JavaWeb三大组件(Servlet、.Filter、Listener)之一。

过滤器可以把对资源的请求**拦截**下来，从而实现一些特殊的功能。

过滤器一般完成一些**通用**的操作，比如：权限控制、统一编码处理、敏感字符处理等等…

例如某些网站未登录不能查看评论，不能将商品加入购物车，得把你拦下来，先让你登录，也就是在访问前，先经过Filter。

下面来具体说说，拦截器拦截到后可以做什么功能呢？

过滤器一般完成一些通用的操作。比如每个资源都要写一些代码完成某个功能，我们总不能在每个资源中写这样的代码吧，而此时我们可以将这些代码写在过滤器中，因为请求每一个资源都要经过过滤器。

我们之前做的品牌数据管理的案例中就已经做了登陆的功能，但这个登录功能其实是如同虚设的，我们可以直接访问登录后的页面，所以本文的目标就是完善登录功能，不登录就无法查看数据。

# Filter快速入门

1.定义类，实现Filter接口，并重写其所有方法

![image-20231120214743667](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202311202148947.png)

2.配置Filter拦截资源的路径：在类上定义@WebFilter注解

![image-20231120214755632](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202311202147186.png)

3.在doFilter方法中输出一句话，并放行

![image-20231120214807823](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202311202148720.png)

只有被放行了才能被访问

# Filter执行流程

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202311202150366.png)

如上图是使用过滤器的流程，我们通过以下问题来研究过滤器的执行流程：

- 放行后访问对应资源，资源访问完成后，还会回到Filter中吗？
  - 从上图就可以看出肯定会回到Filter中
- 如果回到Filter中，是重头执行还是执行放行后的逻辑呢？
  - 如果是重头执行的话，就意味着 `放行前逻辑` 会被执行两次，肯定不会这样设计了；所以访问完资源后，会回到 `放行后逻辑`，执行该部分代码。

通过上述的说明，我们可以总结一下Filter的执行流程

![image-20230220231223748](E:\md图片\image-20230220231223748.png)

# Filter使用细节

## Filter拦截路径配置

拦截路径表示 Filter 会对请求的哪些资源进行拦截，使用 `@WebFilter` 注解进行配置。如：`@WebFilter("拦截路径")`

拦截路径有如下四种配置方式：

- 拦截具体的资源：/index.jsp：只有访问index.jsp时才会被拦截
- 目录拦截：/user/*：访问/user下的所有资源，都会被拦截
- 后缀名拦截：*.jsp：访问后缀名为jsp的资源，都会被拦截
- 拦截所有：/*：访问所有资源，都会被拦截

# 过滤器链

一个Web应用，可以配置多个过滤器，这多个过滤器称为过滤器链

如下图就是一个过滤器链，我们学习过滤器链主要是学习过滤器链执行的流程

![image-20230220231900136](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202311202230171.png)

上图中的过滤器链执行是按照以下流程执行：

1. 执行 `Filter1` 的放行前逻辑代码
2. 执行 `Filter1` 的放行代码
3. 执行 `Filter2` 的放行前逻辑代码
4. 执行 `Filter2` 的放行代码
5. 访问到资源
6. 执行 `Filter2` 的放行后逻辑代码
7. 执行 `Filter1` 的放行后逻辑代码

以上流程串起来就像一条链子，故称之为过滤器链。

# 案例：登录验证

需求：访问服务器资源时，需要先进行登录验证，如果没有登录，则自动跳转到登录页面

```java
public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
         HttpServletRequest httpRequest = (HttpServletRequest) request;
        String[] urls = {"/login.jsp","/register.jsp","/checkCodeServlet","/UserServlet"};
        String url = httpRequest.getRequestURL().toString();
        for (String u : urls) {
            if (url.contains(u)){
                chain.doFilter(request,response);
                return;
            }
        }

        HttpSession session = httpRequest.getSession();
        Object user = session.getAttribute("user");
        if (user != null) {
            chain.doFilter(request, response);
        } else {
            httpRequest.setAttribute("error", "您尚未登录");
            httpRequest.getRequestDispatcher("/login.jsp").forward(request, response);
        }
    }
```



# 监听器Listener

## 概述

- Listener 表示监听器，是 JavaWeb 三大组件(Servlet、Filter、Listener)之一。

- 监听器可以监听就是在 `application`，`session`，`request` 三个对象创建、销毁或者往其中添加修改删除属性时自动执行代码的功能组件。

  request 和 session 我们学习过。而 `application` 是 `ServletContext` 类型的对象。

  `ServletContext` 代表整个web应用，在服务器启动的时候，tomcat会自动创建该对象。在服务器关闭时会自动销毁该对象。

JavaWeb 提供了8个监听器：

|     监听器分类     |           监听器名称            |                      作用                      |
| :----------------: | :-----------------------------: | :--------------------------------------------: |
| servletContext监听 |     servletContextListener      |  用于对ServletContext对象进行监听(创建、销毁)  |
|                    | ServletContextAttributeListener | 对ServletContext对象中属性的监听（增删改属性） |
|    session监听     |       HttpSessionListener       |   对Session对象的整体状态的监听（创建、销毁)   |
|                    |  HttpSessionAttributeListener   |     对Session对象中的属性监听(增删改属性)      |
|                    |   HttpSessionBindingListener    |         监听对象于Session的绑定和解除          |
|                    |  HttpsessionActivationListener  |        对Session数据的钝化和活化的监听         |
|    Request监听     |     servletRequestListener      |       对Request对象进行监听(创建、销毁)        |
|                    | servletRequestAttributeListener |     对Request对象中属性的监听(增删改属性)      |

这里面只有 `ServletContextListener` 这个监听器后期我们会接触到，`ServletContextListener` 是用来监听 `ServletContext` 对象的创建和销毁。

`ServletContextListener` 接口中有以下两个方法

- `void contextInitialized(ServletContextEvent sce)`：`ServletContext` 对象被创建了会自动执行的方法
- `void contextDestroyed(ServletContextEvent sce)`：`ServletContext` 对象被销毁时会自动执行的方法

## 代码演示

我们只演示一下 `ServletContextListener` 监听器

- 定义一个类，实现`ServletContextListener` 接口
- 重写所有的抽象方法
- 使用 `@WebListener` 进行配置

```java
@WebListener
public class ContextLoaderListener implements ServletContextListener {
    @Override
    public void contextInitialized(ServletContextEvent sce) {
        //加载资源
        System.out.println("ContextLoaderListener...");
    }

    @Override
    public void contextDestroyed(ServletContextEvent sce) {
        //释放资源
    }
}
```

启动服务器，就可以在控制台输出了 `ContextLoaderListener...`，同时也说明了 `ServletContext` 对象在服务器启动的时候被创建了。

























































