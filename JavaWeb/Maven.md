# Maven

## 简介

Maven是专门用于管理和构建Java项目的工具，它的主要功能有：

>提供了一套标准化的项目结构
>
>提供了一套标 准化的构建流程
>
>(编译，测试，打包，发布…)
>
>提供了一套依赖管理机制

## 标准化的项目结构

![image-20230201141616120](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202304121958906.png)

![image-20230201141813776](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202304121958803.png)

`Maven提供了一套标准化的项目结构，所有IDE使用Maven构建项目结构完全一样，所有IDE创建的Maven项目可以通用 `

## 标准化的构建流程

![image-20230201141947366](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202304121958215.png)

## 依赖管理

依赖管理其实就是管理你项目所依赖的第三方资源（jar包、插件.）

![image-20230201142120285](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202304121958393.png)

## Maven简介

apache Maven 是一个项目管理和架构工具，他基于项目对象模型(POM)的概念，通过一小段描述信息来管理项目的构建、报告和文档

官网：https://maven.apache.org/

![image-20230201165048210](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202305121458145.png)

## Jar包存储

1.需要新创建一个目录文件夹

![image-20240903174448206](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20240903174448206.png)

等会再下面的Maven安装配置中修改配置本地仓库的路径

## Maven安装配置

1.解压apache-maven-3.6.3-bin即安装完成

2.配置环境变量 MAVEN_HOME为安装路径的bin目录

3.配置本地仓库:修改conf/settings.xml 中的 <localRepository>为一个指定目录

![image-20240903174611847](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20240903174611847.png)

4.配置阿里云私服:修改conf/settings.xml中的 <mirrors>标签，为其添加如下子标签:

![image-20240903174626294](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20240903174626294.png)

```
<mirror>
      <id>alimaven</id>
      <name>alimaven maven</name>
    <url>http://maven.aliyun.com/nexus/content/groups/public/</url>
	  <mirrorOf>central</mirrorOf>
    </mirror>
```

## 配置全局工程下的Maven环境

全局的配置是在这里进行的：
![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/bdaccab625bde8bd5dffcfd0a2a715ca.png)

首先，我们要在Customize中点击All setting选项：

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/3211560e2d71a8c740fca1ae25dbeb74.png)

再按照我们配置当前工程下的MAVEN环境的步骤进行就可以

1.配置 maven的地址，setting地址，私有仓库地址

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/af61f666d060acf573a6cd557e3a9bea.png)

2.配置JRE版本：

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/3a3b6a00e8589d4a9b2263b0b1bff3f9.png)

3.配置字节码文件：

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/2cf0053043ca2e032e738c077a3ee5e2.png)

这样我们就把maven与整个IDEA都关联了起来，以后我们只需要创建工程，那么这个工程就会自动与MAVEN进行关联，不再需要我们去手动设置

## Maven的基本使用

### Maven常用命令

![image-20230201165954566](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202305121459343.png)

## Maven的生命周期

![image-20230201170714401](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202305121459170.png)

## IDEA配置Maven

![image-20230201171124879](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202305121459302.png)

![image-20230201172029488](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202305121459891.png)

