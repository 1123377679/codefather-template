# Web核心

Web：全球广域网，也称为万维网(www),能够通过浏览器访问的网站

JavaWeb:是用Java技术来解决相关web互联网领域的技术栈

## javaWeb技术栈

**CS架构:** Client/Server客户端服务器架构模式

- 优点：充分利用客户端机器的资源，减轻服务器的负荷（一部分安全要求不高的计算任务、存储任务放在客户端执行，不需要把所有计算、存储任务都放在服务器端执行，从而减轻服务器压力，也能减轻网络负荷）
- 缺点：需要安装；升级维护成本较高

**BS架构**：Browser/Server,浏览器/服务器架构模式，它的特点是，客户端只需要浏览器，应用程序的逻辑和数据都存储在服务器端。浏览器只需要请求服务器，获取Web资源，服务器把Wb资源发送给浏览器即可

好处：易于维护升级：服务器端升级后，客户端无需任何部署就可以使用到新的版本

![image-20230216160823354](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202308111911879.png)

静态资源：HTML、CSS、JavaScript、图片等。负责页面展现

动态资源：Servlet、JSP等。负责逻辑处理

数据库:负责存储数据

HTTP协议：定义通信规则

Web服务器：负责解析HTTP协议，解析请求数据，并发送响应数据

# HTTP

概念：Hyper Text Transfer Protocol,超文本传输协议，规定了浏览器和服务器之间数据传输的规则

![image-20230216161441100](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202308111911011.png)

## Http协议特点

1.基于TCP协议：面向连接，安全

2.基于请求-响应模型的：一次请求对应一次响应

3.HTTP协议是无状态的协议：对于事务处理没有记忆能力。每次请求-响应都是独立的。

缺点：多次请求间不能共享数据。（Java中会使用会话技术来解决这个问题）

优点：速度快

## Http-请求数据格式

请求数据分为3部分：

1.请求行：请求数据的第一行。其中GET表示请求方式，/表示请求资源路径，HTTP/1.1表示协议版本

2.请求头：第二行开始，格式为key:value形式。

3.请求体POST请求的最后一部分，存放请求参数

![image-20230812142821876](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202308121428668.png)

常见的HTTP请求头：

Host:表示请求的主机名

User-Agent::浏览器版本，例如Chrome浏览器的标识类似Mozilla/5.0.

Chrome/99,IE浏览器的标识类似Mozilla/5.0(Windows NT.)like Gecko;

Accept:表示浏览器能接收的资源类型，如text/*,image,/*或者*/*表示所有；

Accept-Language:表示浏览器偏好的语言，服务器可以据此返回不同语言的网页；

Accept-Encoding:表示浏览器可以支持的压缩类型，例如gzip,deflate等。

![image-20230920092801921](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202309200928874.png)

GET请求和POST请求区别：

1.GET请求请求参数在请求行中，没有请求体。POST请求请求参数在请求体中
2.GET请求请求参数大小有限制，POST没有

## Http-响应数据格式

响应数据分为3部分：

1.响应行：响应数据的第一行。其中HTTP/1.1表示协议版本，200表示响应状态码，OK表示状态码描述

![image-20230812143617056](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202308121436033.png)

2.响应头：第二行开始，格式为key:value形式

3.响应体：最后一部分。存放响应数据

![image-20230920092620178](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202309200926043.png)

常见的HTTP响应头：

Content-Type:表示该响应内容的类型，例如text/html,image/jpeg;

Content-Length:表示该响应内容的长度（字节数）；

Content-.Encoding:表示该响应压缩算法，例如gzip;

Cache-Control:指示客户端应如何缓存，例如max-age=300表示可以最多缓存300秒