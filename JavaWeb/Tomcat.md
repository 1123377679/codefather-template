# Tomcat

![在这里插入图片描述](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/debba38befd2f6a548cc9ce09642d962.png)

Tomcat 是 Servlet (HTTP服务器) 的容器。
前面我们已经学习了 HTTP 协议，知道了 HTTP 协议就是 HTTP 客户端和 HTTP 服务器之间交互数据的格式。
同时也通过 ajax 和 Java Socket 等 分别构造了 HTTP 客户端。
HTTP 服务器我们也同样可以通过 Java Socket 来实现。而 Tomcat 就是基于 Java 实现的一个开源免费，也是被广泛使用的 HTTP 服务器容器。

## 下载安装

在 Tomcat 官网下载即可。这里我们使用的是 Tomcat 8 

链接：https://tomcat.apache.org/download-connectors.cgi

![image-20240903171936627](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20240903171936627.png)

![image-20240903171957982](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20240903171957982.png)

![image-20240903172010116](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20240903172010116.png)

![image-20240903172022710](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20240903172022710.png)

![image-20240903172035757](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20240903172035757.png)

下载好文件以后解压到对应的目录中

>解压缩的目录最好不要带 “中文” 或者 特殊符号。

## 目录结构

针对 tomcat 目录解压缩之后，可以看到如下结构：

```
apache-tomcat-8.5.47\
  bin\ 存放各种启动、停止脚本的。*.sh 是以后在 linux 上用的，*.bat 是在 windows 上用的
 	startup.bat 启动服务，双击即可使用
 	startup.sh (linux、mac的启动服务)
  conf\ 相关的配置文件，目前我们不用关心
  	server.xml 这里可以配置 Tomcat 绑定哪个端口，以及 Tomcat 是否启用 https 啥的
  lib\ 运行 tomcat 需要的类库，我们不关心
  logs\ 运行时的日志文件，我们有时需要查看日志，来发现定位一些问题
  temp\ 临时文件夹，不关心
  webapps\ 存放我们要运行的 web application 的文件夹，对于我们最常用的一个文件夹
  work\ Tomcat 内部进行预编译的文件夹，我们不关心
  下面都是一些文档，有兴趣的同学可以自行阅读
  BUIDING.txt
  CONTRIBUTING.md
  LICENSE
  NOTICE
  README.md
  RELEASE-NOTES
  RUNNING.txt
```

>其中我们最关注的目录就是 webapps 目录。web applications 的简称，意思是用来存放 web 应用的文件夹。
>理解 “web 应用”：
>一个具有独立完整功能的 “网站”，我们就可以称为一个 “web 应用”。
>例如搜狗搜索实现了独立完整的 “搜索引擎功能”，淘宝网 实现了独立完整的 “电商功能”。
>一个 Tomcat 服务器上是可以同时部署多个这样的 web 应用的，这些 web 应用以目录的形式被放到 webapps 目录中。

## 启动服务器

在 bin 目录中，双击 startup.bat 即可启动 Tomcat 服务器。

看到形如以下内容的日志，说明启动成功:

![image-20240903172652481](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20240903172652481.png)

>注意：在 Windows 上通过 cmd 方式启动 Tomcat 会出现乱码，但是不影响 Tomcat 的使用。
>乱码的原因是 Tomcat 默认按照 UTF-8 的编码方式处理中文，而 windows 的 cmd 默认是 GBK 编码。
>如果使用 Linux 或者 IDEA 中的终端来启动 Tomcat，则没有乱码问题，因此此处的乱码我们暂时不
>处理 

Tomcat 跑起来之后，在浏览器中输入 127.0.0.1:8080 (Tomcat默认端口8080) 即可看到 Tomcat 的默认欢迎页面：

![image-20240903172820191](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20240903172820191.png)

如果启动失败怎么办？
最常见的启动失败原因是端口号被占用，Tomcat 启动的时候默认会绑定 8080 和 8005 端口。如果有其他进程已经绑定了这两个端口中的任意一个，都会导致 Tomcat 不能启动。
在命令行中使用 netstat -ano | findstr 8080 确定看 8080 是否被其他进程绑定，把对方进程干掉，再重新启动 Tomcat 一般就可以解决问题 ~~

![在这里插入图片描述](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/26b7563ed808961b0661107c12f078b2.png)


形如这样的结果说明 8080 端口已经被占用，占用的进程是 13348 这个进程。然后就可以在任务管理器中找到并干掉这个进程。







