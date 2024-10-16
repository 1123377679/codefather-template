# 第一章 初始Java

## 人机交互

![image-20221031214919482](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20221031214919482.png)

## CMD

### 什么是CMD?

在windows中，利用命令行的方式操作计算机

可以打开文件，打开文件夹，创建文件夹等等

### 打开CMD

1.WIN+R

![image-20221031215214292](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20221031215214292.png)

![image-20221031215225757](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20221031215225757.png)

2.输入cmd

![image-20221031215235110](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20221031215235110.png)

3.按下回车键

![image-20230213142119492](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230213142119492.png)

### 常见的CMD命令

1.盘符名称+冒号

说明：盘符切换

```
E:回车,表示切换到E盘
```

2.dir

说明：查看当前路径下的内容

3.cd目录

说明：进入单级目录

举例:cd lanqiao

4.cd..

说明:回退到上一级目录

5.cd 目录1\目录2...

说明：进入多级目录

```
cd lanqiao\JavaSE
```

6.cd\

说明：回退到盘符目录

7.cls

说明:清屏

8.exit

说明：退出命令提示符窗口

### 练习：

需求：

利用cmd命令打开自己电脑上的qq

qq是经常要打开的软件，每次打开的时候都要切换盘符，并且进入多层文件夹，太麻烦了！

![image-20221031220913583](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20221031220913583.png)

`只要把qq的路径记录在电脑的环境变量就可以了`

![image-20221102163329803](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20221102163329803.png)

## 配置环境变量小结

### 为什么要配置环境变量？

我们想要在任意的目录下都可以打开指定的软件，就可以把软件的路径配置到环境变量中

## Java基础学习

### 学习方法

刚开始学习的时候不需要学得太深，只需要知道怎么用，然后把知识点都串联起来做一个项目，锻炼大家的逻辑思维能力

### Java是什么

Java是一门非常火的计算机语言，**Java 语言诞生于 1995 年**。由 James Gosling 在 **Sun Microsystems（后被 Oracle 收购）公司**领导的团队开发。Java 最初被设计用于嵌入式系统，后来演变成一种广泛应用于各种软件开发领域的**编程语言或者是高级语言**。Java 以其跨平台、**面向对象**、健壮性和安全性等特性而闻名。

## Java程序初体验

### 下载JDK和安装

1.通过官网网站获取

2.网站:http:www.oracle.com

https://www.oracle.com/java/technologies/downloads/#java17

3.注意：针对不同的操作系统，下载对应的安装包

4.参考链接

[JDK17在Windows安装以及环境变量配置（超详细的教程）_jdk17安装教程详细-CSDN博客](https://blog.csdn.net/tiehou/article/details/129575138)

### 安装JDK

1.傻瓜式安装

2.建议1：安装路径中不要包含中文和空格

3.建议2：所有的开发工具最好安装目录统一

第一步:双击.exe文件

![image-20230212141416945](E:\md图片\image-20230212141416945.png)

![image-20230212141447240](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230212141447240.png)

![image-20230212141532721](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230212141532721.png)



### JDK安装目录

1.bin：该路径下存放了各种工具命令，其中比较重要的有：javac和java

2.conf：该路径下存放了相关配置文件

3.include：该路径下存放了一些平台特定的头文件

4.jmods:该路径下存放了各种模块

5.legal:该路径下存放了各模块的授权文档

## Path环境变量的配置

### 为什么要配置Path环境变量

我们想要在任意的目录下都可以打开指定的软件，就可以把软件的路径配置到环境变量中

### 配置环境变量的步骤

1.先配置JAVA_HOME.(路径不带bin)(E:\develop\jdk)

2.再配置Path。(%JAVA_HOME%\bin)

![image-20230212142239193](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230212142239193.png)

![image-20230212142301026](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230212142301026.png)

![image-20230212142313171](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230212142313171.png)

![image-20230212142419086](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230212142419086.png)

![image-20230212142446850](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230212142446850.png)

![image-20230212142518381](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230212142518381.png)

![image-20230212142549139](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230212142549139.png)

![image-20230212142632773](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230212142632773.png)



## HelloWorld案例

`HelloWorld案例的编写`

1.用记事本编写程序

```java
public class HelloWorld{
	//main方法表示程序的主入口
	public static void main(String[] args){
		//输出语句
		System.out.println("HelloWorld");
	}
}
```

2.编译文件(翻译文件)

```java
javac HelloWorld.java
```

3.运行程序

```java
java HelloWorld
```

总结:

1.找到学习盘符，在里面新建一个HelloWorld.txt文件
2.写Java代码

```java
public class HelloWolrd{
	public static void main(String[] args){
		System.out.println("HelloWolrd");
	}
}
```

3.改后缀名(后续可以不要，因为可以使用notepad++)

4.javac HelloWorld.java(javac 是用来编译文件，编译这个文件有没有问题，如果没有问题会生成一个.class的文件)

5.java HelloWorld

### 如果cmd中出现中文乱码怎么解决

首先，打开命令提示符窗口，执行【chcp 65001】命令；

![image-20240228094531983](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20240228094531983.png)

第二个方法:

[Win11命令窗口中文乱码怎么办？Win11命令窗口中文乱码的解决方法_win11控制台输入java命令乱码-CSDN博客](https://blog.csdn.net/qq_29508575/article/details/125376886)

## Java的执行流程

Java 程序的执行流程如下：

1. 编写源代码：首先，程序员编写 Java 源代码，使用文本编辑器或集成开发环境（IDE）来创建 .java 文件。
2. 编译源代码：使用 JDK 中的 Java 编译器**（javac）将源代码编译成字节码文件（.class 文件）**，字节码是一种与特定平台无关的中间代码。
3. 类加载：当 Java 程序运行时，Java 虚拟机（JVM）通过类加载器负责加载所需的类文件（.class 文件）。
4. 字节码解释执行：JVM 将字节码解释并逐行执行，或者通过即时编译器（Just-In-Time Compiler，JIT）将字节码编译为本地机器代码再执行。
5. 执行程序：在 JVM 中执行字节码指令，进行相应的操作，比如变量赋值、方法调用等。
6. **垃圾回收**：JVM 会自动进行垃圾回收，释放不再使用的内存空间。

需要注意的是，JVM 的存在使得 **Java 程序具有跨平台性**，即一次编译后的字节码可以在任何装有相应版本的 JVM 的操作系统上运行。这也是 Java 被广泛应用的原因之一。

总结成一句话就是`一次编译，处处运行`。

## JAVASE

### javaSE是什么？

java语言的(标准版)，用于桌面应用的开发，是其他两个版本的基础

比如计算机，和坦克大战

### 学习Java的目的

为今后要从事的javaEE开发，打`基础`

## JavaME

### JavaMe是什么?

Java语言的小型版，用于嵌入式电子设备或者小型移动设备。

比如微波炉，照相机，还有手机（老年机）

## javaEE

### JavaEE是什么？

java语言的企业版，用于web方向的网站开发，在这个领域，是当之无愧的No1.



## JVM，JDK，JRE

### Java语言的跨平台原理

`平台？`

​	Windows，Mac，Linux

`跨平台？`

​	Java程序可以在任意操作系统上运行

`跨平台原理`

​	`jvm：java虚拟机`，真正运行java程序的地方，java的跨平台性就是需要JVM来进行操作

`总结:`

​	在需要运行java应用程序的操作系统上，安装一个与操作系统对应的Java虚拟机(JVM)即可

`核心类库`

![image-20230212145407208](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230212145407208.png)

System.out.println,这些都是java准备好的语法，各有各的用处

`开发工具:`javac编译工具，java运行工具，jdb调试工具，jhat内存分析工具等等

有了这三个东西之后：就组成了jdk

![image-20221101225227972](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20221101225227972.png)

`JDK：java开发工具包`

`JRE：Java的运行环境`

`JVM:Java的虚拟机`

总结：

1.JDK是什么？有哪些内容包含？

<details>
<summary>JDK是什么?</summary>
<pre><code>
  Java 开发工具包，是开发和编译 Java 程序所需的工具集合。JDK 包含了 Java 编译器（javac）、Java 运行时环境（JRE）、Java 文档生成器（Javadoc）等工具，还包括了许多 Java 标准库和开发工具，可用于开发各种类型的 Java 应用程序。
</code></pre>
</details>

<details>
<summary>JRE是什么?</summary>
<pre><code>
  Java 运行时环境，是用于在计算机上运行 Java 应用程序的环境。JRE 包含了 Java 虚拟机（JVM）和 Java 核心类库等运行时必需的组件，但不包含开发工具如编译器等。如果你只想运行 Java 应用程序而不需要进行开发，安装 JRE 即可满足需求。
</code></pre>
</details>

<details>
<summary>JVM是什么?</summary>
<pre><code>
  JVM（Java Virtual Machine）：Java 虚拟机，是 Java 程序运行的核心组件。它负责将 Java 源代码编译成字节码，并在不同的操作系统上运行这些字节码。JVM 提供了内存管理、垃圾回收、安全性等功能，使得 Java 程序具有跨平台性。
</code></pre>
</details>

### JDK,JRE,JVM三者的包含关系

JDK包含了JRE

JRE包含了JVM

`JDK=>JRE=>JVM`

![JDK的包含关系](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/JDK%E7%9A%84%E5%8C%85%E5%90%AB%E5%85%B3%E7%B3%BB.png)

### Java的三种核心机制

JAVA的三种核心机制
Java：一种编程语言、开发环境、应用环境、部署环境
Java的三种核心机制
1.Java虚拟机（Java Virtual Machine）
虚拟机就是在真实机器中用软件模拟实现的一种虚拟机器。Java虚拟机代码被存储在.class文件中；每个文件都包含最多一个 public类
2.垃圾收集机制（Garbage Collection）GC
Java编程语言解除了程序员取消分配存储器的责任，它可提供一种系统级线程以跟踪每一存储器的分配情况。在Java虚拟机的空闲周期，垃圾收集线程检查并释放那些可被释放的存储器
3.代码安全性检测（Code Security）CS
在运行时，执行机器只是将.class类文件通过交互后使用，一般情况下是看不到它的源代码.Java，要通过专用反编译工具，才能够看到。这就体现了Java在运行环境中相对其它语言来说，加强了代码的安全性。
