# MVC和三层架构

 这些都是理论知识，这两个理论知识能让我们后期写代码更加的合理一些

## MVC

MVC是一种分层开发的模式，其中：

M：Model，业务模型，处理业务

V：View：视图，界面展示

C：Controller。控制器，处理请求，调用模型和视图

![image-20240912150820652](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20240912150820652.png)

MVC好处

- 职责单一，互不影响
- 有利于分工协作
- 有利于组件重用

## 三层架构

表现层(controller)：接收请求，封装数据，调用业务逻辑层，响应数据

业务逻辑层(service)：对业务逻辑进行封装，组合数据访问层层中基本功能，形成复杂的业务逻辑功能

数据访问层(dao)：对数据库的CRUD操作

DB（数据库）

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/20200617215645797.png)









