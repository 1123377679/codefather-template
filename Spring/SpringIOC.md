# SpringIOC

Spring官网:https://spring.io/

Spring发展到今天已经形成了一种开发的生态圈，Spring提供了若干个项目，每个项目用于完成特定的功能

![image-20240805132629544](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20240805132629544.png)

## Spring Framework系统架构

Spring Framework是Spring生态圈中最基础的项目，是其他项目的根基

我们只学习两个东西: 

AOP : 面向切面编程

IOC : 控制反转

![image-20240805132654246](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20240805132654246.png)

## 为什么需要Spring Framework?

传统Javaweb开发困惑及解决方案

![image-20240805132728711](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20240805132728711.png)

问题1：

层与层之间紧密耦合在一起，接口与具体实现紧密耦合在了一起

**解决思路:**

程序代码中不要手动new对象，第三方根据要求为程序提供需要的Bean对象

![image-20240805132939132](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20240805132939132.png)

## 核心概念

### IOC 控制反转

使用对象时，由主动new产生对象转换为由外部提供对象，此过程中对象创建控制权由程序转移到外部，此思想称为控制反转

IOC实际上就是将创建对象或者管理对象的权利 给到Spring

### Spring技术对IOC思想进行了实现

Spring提供了一个容器，称为IOC容器，用来充当IOC思想中的外部

IOC容器负责对象的创建、初始化等一系列工作，被创建或被管理的对象在IOC容器中统称为Bean

### DI依赖注入

在容器中建立bean与bean之间的依赖关系的整个过程，称为依赖注入

![image-20240805133340995](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20240805133340995.png)

## IOC入门案例(XML版本)-思路分析

1.管理什么?(Service与Dao)

2.如何将被管理的对象告知IOC容器?(配置)

3.被管理的对象交给IOC容器，如何获取到IOC容器?(接口)

4.IOC容器得到后，如何从容器中获取Bean?(接口方法)

## IOC入门案例-步骤

1.导入Spring坐标

```xml
	<dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>5.2.10.RELEASE</version>
    </dependency>
    <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>4.12</version>
        <scope>test</scope>
    </dependency>
```

2.创建BookService,BookServiceImpl，BookDao和BookDaoImpl四个类

```java
public interface BookDao {
    public void save();
}
public class BookDaoImpl implements BookDao {
    public void save() {
        System.out.println("book dao save ...");
    }
}
public interface BookService {
    public void save();
}
public class BookServiceImpl implements BookService {
    private BookDao bookDao = new BookDaoImpl();
    public void save() {
        System.out.println("book service save ...");
        bookDao.save();
    }
}
```

3.创建Spring配置文件(applicationContext.xml)，配置对应类作为Spring管理的bean

![image-20240821134339184](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20240821134339184.png)

注意事项：bean定义时id属性在同一个上下文中不能重复

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <!--bean标签标示配置bean
    	id属性标示给bean起名字
    	class属性表示给bean定义类型
	-->
	<bean id="bookDao" class="com.itheima.dao.impl.BookDaoImpl"/>
    <bean id="bookService" class="com.itheima.service.impl.BookServiceImpl"/>
</beans>
```

4.初始化IOC容器(Spring核心容器/Spring容器),通过容器获取bean

使用Spring提供的接口完成IOC容器的创建，创建App类，编写main方法

```java
public class App {
    public static void main(String[] args) {
        //获取IOC容器
		ApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml"); 
    }
}
```

从容器中获取对象进行方法调用

```java
public class App {
    public static void main(String[] args) {
        //获取IOC容器
		ApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml"); 
//        BookDao bookDao = (BookDao) ctx.getBean("bookDao");
//        bookDao.save();
        BookService bookService = (BookService) ctx.getBean("bookService");
        bookService.save();
    }
}
```

## DI入门案例

对于DI的入门案例，我们依然先`分析思路`然后再`代码实现`，

### 入门案例思路分析

(1)要想实现依赖注入，必须要基于IOC管理Bean

- DI的入门案例要依赖于前面IOC的入门案例

(2)Service中使用new形式创建的Dao对象是否保留?

- 需要删除掉，最终要使用IOC容器中的bean对象

(3)Service中需要的Dao对象如何进入到Service中?

- 在Service中提供方法，让Spring的IOC容器可以通过该方法传入bean对象

(4)Service与Dao间的关系如何描述?

- 使用配置文件

### 入门案例代码实现

> 需求:基于IOC入门案例，在BookServiceImpl类中删除new对象的方式，使用Spring的DI完成Dao层的注入
>
> 1.删除业务层中使用new的方式创建的dao对象
>
> 2.在业务层提供BookDao的setter方法
>
> 3.在配置文件中添加依赖注入的配置
>
> 4.运行程序调用方法

### 步骤1: 去除代码中的new

在BookServiceImpl类中，删除业务层中使用new的方式创建的dao对象

```java
public class BookServiceImpl implements BookService {
    //删除业务层中使用new的方式创建的dao对象
    private BookDao bookDao;

    public void save() {
        System.out.println("book service save ...");
        bookDao.save();
    }
}
```

### 步骤2:为属性提供setter方法

在BookServiceImpl类中,为BookDao提供setter方法

```java
public class BookServiceImpl implements BookService {
    //删除业务层中使用new的方式创建的dao对象
    private BookDao bookDao;

    public void save() {
        System.out.println("book service save ...");
        bookDao.save();
    }
    //提供对应的set方法
    public void setBookDao(BookDao bookDao) {
        this.bookDao = bookDao;
    }
}

```

### 步骤3:修改配置完成注入

在配置文件中添加依赖注入的配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <!--bean标签标示配置bean
    	id属性标示给bean起名字
    	class属性表示给bean定义类型
	-->
    <bean id="bookDao" class="com.itheima.dao.impl.BookDaoImpl"/>

    <bean id="bookService" class="com.itheima.service.impl.BookServiceImpl">
        <!--配置server与dao的关系-->
        <!--property标签表示配置当前bean的属性
        		name属性表示配置哪一个具体的属性
        		ref属性表示参照哪一个bean
		-->
        <property name="bookDao" ref="bookDao"/>
    </bean>
</beans>
```

==注意:配置中的两个bookDao的含义是不一样的==

* name="bookDao"中`bookDao`的作用是让Spring的IOC容器在获取到名称后，将首字母大写，前面加set找对应的`setBookDao()`方法进行对象注入
* ref="bookDao"中`bookDao`的作用是让Spring能在IOC容器中找到id为`bookDao`的Bean对象给`bookService`进行注入
* 综上所述，对应关系如下:
* ![image-20240821134547797](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20240821134547797.png)

### 步骤4:运行程序

运行，测试结果为：

![image-20240821134608829](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20240821134608829.png)

## 引入Log4j日志框架

(1)日志信息的优先级，日志信息的优先级从高到低有TRACE < DEBUG < INFO < WARN < ERROR <FATAL

​	TRACE : 追踪， 是最低的日志级别，相当于追踪程序的执行

​	DEBUG：调试，一般在开发中都将其设置为最低的日志级别

​	INFO：信息，输出重要的信息，使用较多

​	WARN：警告，输出警告的信息

​	ERROR：错误，输出错误信息

​	FATAL：严重错误

(2)**日志信息的输出目的地**，日志信息的输出目的地指定了日志将打印到控制台还是文件中；

(3)**日志信息的输出格式**，而输出格式则控制了日志信息的显示内容。

### 引入Log4j依赖

```xml
<!--log4j依赖-->
    <dependency>
      <groupId>org.apache.logging.log4j</groupId>
      <artifactId>log4j-core</artifactId>
      <version>2.19.0</version>
    </dependency>
    <dependency>
      <groupId>org.apache.logging.log4j</groupId>
      <artifactId>log4j-slf4j2-impl</artifactId>
      <version>2.19.0</version>
    </dependency>
```

### 加入日志配置文件

在类的根路径下提供log4j2.xml配置文件（文件名固定为：log4j2.xml，文件必须放到类根路径下。）

```xml
<?xml version="1.0" encoding="UTF-8"?>
<configuration>
    <loggers>
        <!--
            level指定日志级别，从低到高的优先级：
                TRACE < DEBUG < INFO < WARN < ERROR < FATAL
                trace：追踪，是最低的日志级别，相当于追踪程序的执行
                debug：调试，一般在开发中，都将其设置为最低的日志级别
                info：信息，输出重要的信息，使用较多
                warn：警告，输出警告的信息
                error：错误，输出错误信息
                fatal：严重错误
        -->
        <root level="DEBUG">
            <appender-ref ref="spring6log"/>
            <appender-ref ref="RollingFile"/>
            <appender-ref ref="log"/>
        </root>
    </loggers>

    <appenders>
        <!--输出日志信息到控制台-->
        <console name="spring6log" target="SYSTEM_OUT">
            <!--控制日志输出的格式-->
            <PatternLayout pattern="%d{yyyy-MM-dd HH:mm:ss SSS} [%t] %-3level %logger{1024} - %msg%n"/>
        </console>

        <!--文件会打印出所有信息，这个log每次运行程序会自动清空，由append属性决定，适合临时测试用-->
        <File name="log" fileName="d:/spring6_log/test.log" append="false">
            <PatternLayout pattern="%d{HH:mm:ss.SSS} %-5level %class{36} %L %M - %msg%xEx%n"/>
        </File>

        <!-- 这个会打印出所有的信息，
            每次大小超过size，
            则这size大小的日志会自动存入按年份-月份建立的文件夹下面并进行压缩，
            作为存档-->
        <RollingFile name="RollingFile" fileName="d:/spring6_log/app.log"
                     filePattern="log/$${date:yyyy-MM}/app-%d{MM-dd-yyyy}-%i.log.gz">
            <PatternLayout pattern="%d{yyyy-MM-dd 'at' HH:mm:ss z} %-5level %class{36} %L %M - %msg%xEx%n"/>
            <SizeBasedTriggeringPolicy size="50MB"/>
            <!-- DefaultRolloverStrategy属性如不设置，
            则默认为最多同一文件夹下7个文件，这里设置了20 -->
            <DefaultRolloverStrategy max="20"/>
        </RollingFile>
    </appenders>
</configuration>

 
```

### 使用日志

```javascript
public class HelloWorldTest {

    private Logger logger = LoggerFactory.getLogger(HelloWorldTest.class);

    @Test
    public void testHelloWorld(){
        ApplicationContext ac = new ClassPathXmlApplicationContext("beans.xml");
        HelloWorld helloworld = (HelloWorld) ac.getBean("helloWorld");
        helloworld.sayHello();
        logger.info("执行成功");
    }
}

```

## SpringBean的配置详情

Spring开发中主要是对Bean的配置，Bean的常用配置如下:

![image-20240805134444316](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20240805134444316.png)

# 基于XML的Spring

## IOC相关内容

通过前面两个案例，我们已经学习了`bean如何定义配置`，`DI如何定义配置`以及`容器对象如何获取`的内容，接下来主要是把这三块内容展开进行详细的讲解，深入的学习下这三部分的内容，首先是bean基础配置。

### bean基础配置

对于bean的配置中，主要会讲解`bean基础配置`,`bean的别名配置`,`bean的作用范围配置`==(重点)==,这三部分内容：

**bean基础配置(id与class)**

对于bean的基础配置，在前面的案例中已经使用过:

```
<bean id="" class=""/>
```

其中，bean标签的功能、使用方式以及id和class属性的作用，我们通过一张图来描述下

![image-20241028225853644](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241028225853644.png)

其中需要大家重点掌握的是:==bean标签的id和class属性的使用==。

### bean的name属性

![image-20241028225900440](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241028225900440.png)

**步骤1:配置别名**

打开spring的配置文件applicationContext.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!--name:为bean指定别名，别名可以有多个，使用逗号，分号，空格进行分隔-->
    <bean id="bookService" name="service service4 bookEbi" class="cn.lanqiao.service.impl.BookServiceImpl">
        <property name="bookDao" ref="bookDao"/>
    </bean>

    <!--scope：为bean设置作用范围，可选值为单例singloton，非单例prototype-->
    <bean id="bookDao" name="dao" class="cn.lanqiao.dao.impl.BookDaoImpl"/>
</beans>
```

**说明:Ebi全称Enterprise Business Interface，翻译为企业业务接口**

**步骤2:根据名称容器中获取bean对象**

```java
public class AppForName {
    public static void main(String[] args) {
        ApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
        //此处根据bean标签的id属性和name属性的任意一个值来获取bean对象
        BookService bookService = (BookService) ctx.getBean("service4");
        bookService.save();
    }
}
```

==注意事项:==

* bean依赖注入的ref属性指定bean，必须在容器中存在

  ![1629771744003](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/1629771744003.png)

* 如果不存在,则会报错，如下:

  ![1629771880920](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/1629771880920.png)

  这个错误大家需要特别关注下:

  ![1629771972886](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/1629771972886.png)

  获取bean无论是通过id还是name获取，如果无法获取到，将抛出异常==NoSuchBeanDefinitionException==

### bean作用范围scope配置

- 关于bean的作用范围是bean属性配置的一个==重点==内容。

  看到这个作用范围，我们就得思考bean的作用范围是来控制bean哪块内容的?

  **Singleton**:单例，默认值，Spring容器创建的时候，就会进行Bean的实例化，并存储到容器内部的单例中，每次getBean时都是从单例池中获取相同的Bean实例

  **prototype**:原型，Spring容器初始化时不会创建Bean实例，当调用getBean时才会实例化Bean，每次getBeand都会创建一个新的bean实例

我们先来看下`bean作用范围的配置属性`:

![image-20241028225725693](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241028225725693.png)

#### **验证IOC容器中对象是否为单例**

- 验证思路：我们只需要对同一个bean创建两个对象，然后打印二者的地址值，看看是否一致

- ```java
  public class App {
      public static void main(String[] args) {
          ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
          //我这里使用了别名，其实还是同一个bean
          BookService bookService2 = (BookService) context.getBean("service2");
          BookService bookService3 = (BookService) context.getBean("service3");
          System.out.println(bookService2);
          System.out.println(bookService3);
      }
  }
  ```


#### **scope使用后续思考**

- 为什么bean默认为单例?
  - bean为单例的意思是在Spring的IOC容器中只会有该类的一个对象
  - bean对象只有一个就避免了对象的频繁创建与销毁，达到了bean对象的复用，性能高
- bean在容器中是单例的，会不会产生线程安全问题?
  - 如果对象是有状态对象，即该对象有成员变量可以用来存储数据的，
  - 因为所有请求线程共用一个bean对象，所以会存在线程安全问题。
  - 如果对象是无状态对象，即该对象没有成员变量没有进行数据存储的，
  - 因方法中的局部变量在方法调用完成后会被销毁，所以不会存在线程安全问题。
- 哪些bean对象适合交给容器进行管理?
  - 表现层对象（controller）
  - 业务层对象（service）
  - 数据层对象（dao）
  - 工具对象（util）
- 哪些bean对象不适合交给容器进行管理?
  - 封装实例的域对象（domain，pojo），因为会引发线程安全问题，所以不适合。

### bean的生命周期

关于bean的相关知识还有最后一个是`bean的生命周期`，对于生命周期，我们主要围绕着`bean生命周期控制`来讲解

- 首先理解下什么是生命周期?
  - 从创建到消亡的完整过程,例如人从出生到死亡的整个过程就是一个生命周期。
- bean生命周期是什么?
  - bean对象从创建到销毁的整体过程。
- bean生命周期控制是什么?
  - 在bean创建后到销毁前做一些事情。
- 现在我们面临的问题是如何在bean的创建之后和销毁之前把我们需要添加的内容添加进去。

#### 生命周期设置

具体的控制有两个阶段:

- bean创建之后，想要添加内容，比如用来初始化需要用到资源
- bean销毁之前，想要添加内容，比如用来释放用到的资源

1.添加初始化和销毁方法

针对这两个阶段，我们在BookDaoImpl类中分别添加两个方法，方法名随便取

```java
public class BookDaoImpl implements BookDao {
    public void save() {
        System.out.println("book dao save ...");
    }
	//表示bea初始化对应的操作
    public void init() {
        System.out.println("init ... ");
    }
	//对应bean销毁前对应的操作
    public void destroy() {
        System.out.println("destroy ... ");
    }
}
```

2.配置生命周期

修改bookDao的配置

```java
<bean id="bookDao" class="com.blog.dao.impl.BookDaoImpl" init-method="init" destroy-method="destroy"></bean>
```

3.运行程序

```java
init …
book dao save …
```

从结果中可以看出，init方法执行了，但是destroy方法却未执行，这是为什么呢?

- Spring的IOC容器是运行在JVM中
- 运行main方法后,JVM启动,Spring加载配置文件生成IOC容器,从容器获取bean对象，然后调方法执行
- main方法执行完后，JVM退出，这个时候IOC容器中的bean还没有来得及销毁就已经结束了
- 所以没有调用对应的destroy方法

知道了出现问题的原因，具体该如何解决呢?继续往下看

#### close关闭容器

- ApplicationContext中没有close方法，它的子类中有close方法
- 所以需要将ApplicationContext更换成ClassPathXmlApplicationContext，然后调用close方法就好啦

```java
public class App {
    public static void main(String[] args) {
        //ApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        BookDao bookDao = (BookDao) context.getBean("bookDao");
        bookDao.save();
        context.close();
    }
}
```

- 运行程序，输出如下，可以看到destroy正常输出

```java
init …
book dao save …
destroy …
```

#### 注册钩子关闭容器

- 在容器未关闭之前，提前设置好回调函数，让JVM在退出之前回调此函数来关闭容器
- 调用context的registerShutdownHook()方法

```java
public class App {
    public static void main(String[] args) {
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        BookDao bookDao = (BookDao) context.getBean("bookDao");
        bookDao.save();
        context.registerShutdownHook();
    }
}
```

>注意：registerShutdownHook在ApplicationContext中也没有

运行后，查询打印结果

```java
init …
book dao save …
destroy …
```

那两种方式介绍完后，close和registerShutdownHook选哪个?

- 相同点:这两种都能用来关闭容器
- 不同点:close()是在调用的时候关闭，registerShutdownHook()是在JVM退出前调用关闭。
  - 那么registerShutdownHook()方法可以在任意位置调用，下面的代码中将其放在了第二行，仍能正常输出，但要是将其换成close()方法，则会报错`BeanFactory not initialized or already closed`，这里就是already closed

```java
public class App {
    public static void main(String[] args) {
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        context.registerShutdownHook();
        BookDao bookDao = (BookDao) context.getBean("bookDao");
        bookDao.save();
    }
}
```

- 开发中到底用哪个呢？
  - 答案是两个都不用
  - 分析上面的实现过程，会发现添加初始化和销毁方法，即需要编码也需要配置，实现起来步骤比较多也比较乱。
  - Spring给我们提供了两个接口来完成生命周期的控制，好处是可以不用再进行配置`init-method`和`destroy-method`
- 接下来在BookServiceImpl完成这两个接口的使用
  - 修改BookServiceImpl类，添加两个接口`InitializingBean`， `DisposableBean`并实现接口中的两个方法`afterPropertiesSet`和`destroy`

```java
public class BookServiceImpl implements BookService, InitializingBean, DisposableBean {
    private BookDao bookDao;

    public void save() {
        System.out.println("book service save ...");
        bookDao.save();
    }

    public void setBookDao(BookDao bookDao) {
        System.out.println("set ... ");
        this.bookDao = bookDao;
    }

    public void destroy() throws Exception {
        System.out.println("service destroy ... ");
    }

    public void afterPropertiesSet() throws Exception {
        System.out.println("service init ... ");
    }
}
```

BookServiceImpl的bean配置如下

```java
<bean id="bookService" class="com.blog.service.impl.BookServiceImpl">
    <property name="bookDao" ref="bookDao"></property>
</bean>
```

重新运行App类，输出结果如下

```java
init …
service init …
book dao save …
service destroy …
destroy …
```

- 小细节

  - 对于InitializingBean接口中的afterPropertiesSet方法，翻译过来为`属性设置之后`。

  - 对于BookServiceImpl来说，bookDao是它的一个属性

  - setBookDao方法是Spring的IOC容器为其注入属性的方法

  - 思考:afterPropertiesSet和setBookDao谁先执行?

    - 从方法名分析，猜想应该是setBookDao方法先执行

    - 验证思路，在setBookDao方法中添加一局输出语句，看看谁先输出

      ```java
      public void setBookDao(BookDao bookDao) {
          System.out.println("set ... ");
          this.bookDao = bookDao;
      }
      ```

    - 重新运行，结果如下，

    - >init …
      >set …
      >service init …
      >book dao save …
      >service destroy …
      >destroy …

可能存在的疑问：明明我们没调用bookService，但为什么上面的输出结果中有service呢？
解惑：所有IOC容器中的bean的初始化和销毁都会运行，所以service也会运行

#### bean生命周期小结

1. 关于Spring中对bean生命周期控制提供了两种方式:
   - 在配置文件中的bean标签中添加`init-method`和`destroy-method`属性
   - 类实现`InitializingBean`与`DisposableBean`接口
2. 对于bean的生命周期控制在bean的整个生命周期中所处的位置如下
   - 初始化容器
     - 1.创建对象(内存分配)
     - 2.执行构造方法
     - 3.执行属性注入(set操作)（`set ...`）
     - 4.执行bean初始化方法（`service init ...`）
   - 使用bean
     - 执行业务操作（`book dao save ...`）
   - 关闭/销毁容器
     - 执行bean销毁方法（`service destroy ...`）
3. 关闭容器的两种方式:
   - ConfigurableApplicationContext是ApplicationContext的子类，子类才有下面两种方法
     - close()方法
     - registerShutdownHook()方法

## DI相关内容

上面我们已经完成了bean相关操作的讲解，接下来就进入第二个大的模块`DI依赖注入`。

我们先来思考

- 向一个类中传递数据的方式有几种?
  - 普通方法(set方法)
  - 构造方法
- 依赖注入描述了在容器中建立bean与bean之间的依赖关系的过程，如果bean运行需要的是数字或字符串呢?
  - 引用类型
  - 简单类型(基本数据类型与String)
- Spring就是基于上面这些知识点，为我们提供了两种注入方式，分别是:
  - **setter注入**
    - 简单类型
    - 引用类型
  - **构造器注入**
    - 简单类型
    - 引用类型

### setter注入

- 对于setter方式注入引用类型的方式之前已经学习过，快速回顾下:
- 在bean中定义引用类型属性，并提供可访问的set方法

```java
public class BookServiceImpl implements BookService {
    private BookDao bookDao;
    public void setBookDao(BookDao bookDao) {
        this.bookDao = bookDao;
    }
}
```

配置中使用property标签ref属性注入引用类型对象

```java
<bean id="bookService" class="com.blog.service.impl.BookServiceImpl">
    <property name="bookDao" ref="bookDao"></property>
</bean>
```

我们再来回顾一下配置中的两个bookDao的含义

>配置中的两个bookDao的含义是不一样的
>
>- name=”bookDao”中bookDao的作用是让Spring的IOC容器在获取到名称后，将首字母大写，前面加set找对应的setBookDao()方法进行对象注入
>- ref=”bookDao”中bookDao的作用是让Spring能在IOC容器中找到id为bookDao的Bean对象给bookService进行注入

#### 环境准备

先来做一些准备工作，我们在dao包下新建一个UserDao接口

```java
public interface UserDao {
    public void save();
}
```

然后新建一个UserDaoImpl类实现UserDao接口

```java
public class UserDaoImpl implements UserDao {
    public void save() {
        System.out.println("user dao save ...");
    }
}
```

```java
public interface BookDao {
    public void save();
}
public class BookDaoImpl implements BookDao {
    public void save() {
        System.out.println("book dao save ...");
    }
}
public interface BookService {
    public void save();
}
public class BookServiceImpl implements BookService {
    private BookDao bookDao;

    public void setBookDao(BookDao bookDao) {
        this.bookDao = bookDao;
    }

    public void save() {
        System.out.println("book service save ...");
        bookDao.save();
    }
}
```

配置文件如下

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="bookDao" class="com.blog.dao.impl.BookDaoImpl"></bean>

    <bean id="bookService" class="com.blog.service.impl.BookServiceImpl">
        <property name="bookDao" ref="bookDao"></property>
    </bean>
</beans>
```

修改App运行类，加载Spring的IOC容器，并从中获取对应的bean对象

```java
public class App {
    public static void main(String[] args) {
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        BookService bookService = (BookService) context.getBean("bookService");
        bookService.save();
    }
}
```

#### 注入引用数据类型

需求:在bookServiceImpl对象中注入userDao

1. 在BookServiceImpl中声明userDao属性
2. 为userDao属性提供setter方法
3. 在配置文件中使用property标签注入

`步骤一：`声明userDao属性并提供setter方法

```java
public class BookServiceImpl implements BookService {
    private BookDao bookDao;
    //声明属性
    private UserDao userDao;
    //提供setter
    public void setUserDao(UserDao userDao) {
        this.userDao = userDao;
    }

    public void setBookDao(BookDao bookDao) {
        this.bookDao = bookDao;
    }

    public void save() {
        System.out.println("book service save ...");
        bookDao.save();
        userDao.save();
    }
}
```

`步骤二：`在配置文件中注入配置

在applicationContext.xml配置文件中使用property标签注入

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="bookDao" class="com.blog.dao.impl.BookDaoImpl"></bean>
    <bean id="userDao" class="com.blog.dao.impl.UserDaoImpl"></bean>

    <bean id="bookService" class="com.blog.service.impl.BookServiceImpl">
        <property name="bookDao" ref="bookDao"></property>
        <property name="userDao" ref="userDao"></property>
    </bean>
</beans>
```

#### 注入简单数据类型

>需求：给BookDaoImpl注入一些简单数据类型的数据
>参考引用数据类型的注入，我们可以推出具体的步骤为:
>
>1. 在BookDaoImpl类中声明对应的简单数据类型的属性
>2. 为这些属性提供对应的setter方法
>3. 在applicationContext.xml中配置

**思考:**

- 引用类型使用的是`<property name="" ref=""/>`,简单数据类型还是使用ref吗?
- ref是指向Spring的IOC容器中的另一个bean对象的，对于简单数据类型，没有对应的bean对象，该如何配置呢?使用value来配置`<property name="" value=""/>`
- `步骤一：`声明属性并提供setter方法
- 这里举例就用`String dataBaseName`和`int connectionCount`这两个属性，同时在save()方法的输出语句中加上这两个属性

```java
public class BookDaoImpl implements BookDao {
    private String dataBaseName;
    private int connectionCount;

    public void setDataBaseName(String dataBaseName) {
        this.dataBaseName = dataBaseName;
    }

    public void setConnectionCount(int connectionCount) {
        this.connectionCount = connectionCount;
    }

    public void save() {
        System.out.println("book dao save ..." + dataBaseName + "," + connectionCount);
    }
}
```

`步骤二：`在配置文件中进行注入配置

在applicationContext.xml配置文件中使用property标签注入

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="bookDao" class="com.blog.dao.impl.BookDaoImpl">
        <property name="dataBaseName" value="mysql"></property>
        <property name="connectionCount" value="100"></property>
    </bean>
    <bean id="userDao" class="com.blog.dao.impl.UserDaoImpl"></bean>

    <bean id="bookService" class="com.blog.service.impl.BookServiceImpl">
        <property name="bookDao" ref="bookDao"></property>
        <property name="userDao" ref="userDao"></property>
    </bean>
</beans>
```

value:后面跟的是简单数据类型，对于参数类型，Spring在注入的时候会自动转换，但是不能写一个错误的

类型，例如`connectionCount`是`int`类型，你却给他传一个`abc`，这样的话，spring在将`abc`转换成int类型

的时候就会报错。

`步骤三：`运行程序，查看输出，两个简单数据类型也成功注入

>book service save …
>
>book dao save …mysql,100
>
>user dao save …

那么对于setter注入方式的基本使用就已经介绍完了

- 对于引用数据类型使用的是`<property name="" ref=""/>`
- 对于简单数据类型使用的是`<property name="" value=""/>`

### 构造器注入

#### 环境准备

修改BookDao、BookDaoImpl、UserDao、UserDaoImpl、BookService和BookServiceImpl类

```java
public interface BookDao {
    public void save();
}
public class BookDaoImpl implements BookDao {
    
    private String databaseName;
    private int connectionNum;
    
    public void save() {
        System.out.println("book dao save ...");
    }
}
public interface UserDao {
    public void save();
}
public class UserDaoImpl implements UserDao {
    public void save() {
        System.out.println("user dao save ...");
    }
}
public interface BookService {
    public void save();
}
public class BookServiceImpl implements BookService{
    private BookDao bookDao;

    public void setBookDao(BookDao bookDao) {
        this.bookDao = bookDao;
    }

    public void save() {
        System.out.println("book service save ...");
        bookDao.save();
    }
}
```

配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="bookDao" class="com.blog.dao.impl.BookDaoImpl"/>
    <bean id="bookService" class="com.blog.service.impl.BookServiceImpl">
        <property name="bookDao" ref="bookDao"/>
    </bean>
</beans>
```

运行类

```java
public class App {
    public static void main( String[] args ) {
        ApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
        BookService bookService = (BookService) ctx.getBean("bookService");
        bookService.save();
    }
}
```

#### 构造器注入引用数据类型

接下来，在上面这个环境中来完成构造器注入的学习:

需求：将BookServiceImpl类中的bookDao修改成使用构造器的方式注入。

1. 将bookDao的setter方法删除掉
2. 添加带有bookDao参数的构造方法
3. 在applicationContext.xml中配置

`步骤一：`删除setter方法并提供构造方法

在BookServiceImpl类中将bookDao的setter方法删除掉,并添加带有bookDao参数的构造方法

```java
public class BookServiceImpl implements BookService{
    private BookDao bookDao;

    public BookServiceImpl(BookDao bookDao) {
        this.bookDao = bookDao;
    }

    public void save() {
        System.out.println("book service save ...");
        bookDao.save();
    }
}
```

`步骤二：`配置文件中进行配置构造方式注入

在applicationContext.xml中配置

```java
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="bookDao" class="com.blog.dao.impl.BookDaoImpl"/>
    <bean id="bookService" class="com.blog.service.impl.BookServiceImpl">
        <constructor-arg name="bookDao" ref="bookDao"/>
    </bean>
</beans>
```

>说明：在标签`<constructor-arg>`中
>
>- name属性对应的值为构造函数中方法`形参的参数名`，必须要保持一致。
>- ref属性指向的是spring的IOC容器中其他bean对象。

- `步骤三：`运行程序

- 运行App类，查看结果，说明bookDao已经成功注入。

  > book service save …
  > book dao save …

#### 构造器注入多个引用数据类型

需求：在BookServiceImpl使用构造函数注入多个引用数据类型，比如userDao

1. 声明userDao属性
2. 生成一个带有bookDao和userDao参数的构造函数
3. 在applicationContext.xml中配置注入

`步骤一：`提供多个属性的构造函数

在BookServiceImpl声明userDao并提供多个参数的构造函数，save方法中记得调用userDao.save()

```java
public class BookServiceImpl implements BookService {
    private BookDao bookDao;
    private UserDao userDao;

    public BookServiceImpl(BookDao bookDao, UserDao userDao) {
        this.bookDao = bookDao;
        this.userDao = userDao;
    }
```

`步骤二：`在配置文件中配置多参数注入

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="userDao" class="com.blog.dao.impl.UserDaoImpl"/>
    <bean id="bookDao" class="com.blog.dao.impl.BookDaoImpl"/>
    <bean id="bookService" class="com.blog.service.impl.BookServiceImpl">
        <constructor-arg name="bookDao" ref="bookDao"/>
        <constructor-arg name="userDao" ref="userDao"/>
    </bean>
</beans>
```

`步骤三：`运行程序

结果中出现了userDao的输出，说明userDao成功注入

```java
book service save …
book dao save …
user dao save …
```

#### 构造器注入多个简单数据类型

需求:在BookDaoImpl中，使用构造函数注入databaseName和connectionNum两个参数。

参考引用数据类型的注入，我们可以推出具体的步骤为:

1. 提供一个包含这两个参数的构造方法
2. 在applicationContext.xml中进行注入配置

`步骤一：`添加多个简单属性并提供构造方法

修改BookDaoImpl类，添加构造方法，同时在save()方法中输出这两个属性

```java
public class BookDaoImpl implements BookDao {

    private String databaseName;
    private int connectionNum;

    public BookDaoImpl(String databaseName, int connectionNum) {
        this.databaseName = databaseName;
        this.connectionNum = connectionNum;
    }

    public void save() {
        System.out.println("book dao save ..." + databaseName + "," + connectionNum);
    }
}
```

`步骤二：`配置完成多个属性构造器注入

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="userDao" class="com.blog.dao.impl.UserDaoImpl"/>
    <bean id="bookDao" class="com.blog.dao.impl.BookDaoImpl">
        <constructor-arg name="databaseName" value="mysql"></constructor-arg>
        <constructor-arg name="connectionNum" value="100"></constructor-arg>
    </bean>
    <bean id="bookService" class="com.blog.service.impl.BookServiceImpl">
        <constructor-arg name="bookDao" ref="bookDao"/>
        <constructor-arg name="userDao" ref="userDao"/>
    </bean>
</beans>
```

- `步骤三：`运行程序

  > book service save …
  >
  > book dao save …mysql,9421
  >
  > user dao save …

#### 目前存在的问题

- `<constructor-arg>`标签内的name，必须与构造函数中的参数名一致，这两块存在紧耦合。
- 那么我们怎么解决这个问题呢？
- 在解决这个问题之前，需要提前说明的是，这个参数名发生变化的情况并不多，所以上面的还是比较主流的配置方式，下面介绍的，我们以了解为主。
- 方式一：删除name属性，添加type属性，按照类型注入
  - 这种方式可以解决构造函数形参名发生变化带来的耦合问题
  - 但是如果构造方法参数中有类型相同的参数，这种方式就不太好实现了

```java
<bean id="bookDao" class="com.blog.dao.impl.BookDaoImpl">
    <constructor-arg type="java.lang.String" value="mysql"></constructor-arg>
    <constructor-arg type="int" value="9421"></constructor-arg>
</bean>
```

方式二：删除type属性，添加index属性，按照索引下标注入，下标从0开始

- 这种方式可以解决参数类型重复问题
- 但是如果构造方法参数顺序发生变化后，这种方式又带来了耦合问题

```xml
<bean id="bookDao" class="com.blog.dao.impl.BookDaoImpl">
    <constructor-arg index="0" value="mysql"></constructor-arg>
    <constructor-arg index="1" value="9421"></constructor-arg>
</bean>
```

介绍完两种参数的注入方式，具体我们该如何选择呢?

1. 强制依赖使用构造器进行，使用setter注入有概率不进行注入导致null对象出现
   - 强制依赖指对象在创建的过程中必须要注入指定的参数
2. 可选依赖使用setter注入进行，灵活性强
   - 可选依赖指对象在创建过程中注入的参数可有可无
3. Spring框架倡导使用构造器，第三方框架内部大多数采用构造器注入的形式进行数据初始化，相对严谨
4. 如果有必要可以两者同时使用，使用构造器注入完成强制依赖的注入，使用setter注入完成可选依赖的注入
5. 实际开发过程中还要根据实际情况分析，如果受控对象没有提供setter方法就必须使用构造器注入
6. 自己开发的模块推荐使用setter注入

#### 小结

这部分主要讲解的是Spring的依赖注入的实现方式:

- setter注入

  - 简单数据类型

    ```xml
    <bean ...>
        <property name="" value=""/>
    </bean>
    ```

  - 引用数据类型

    ```xml
    <bean ...>
        <property name="" ref=""/>
    </bean>
    ```

- 构造器注入

  - 简单数据类型

    ```xml
    <bean ...>
        <constructor-arg name="" index="" type="" value=""/>
    </bean>
    ```

  - 引用数据类型

    ```xml
    <bean ...>
        <constructor-arg name="" index="" type="" ref=""/>
    </bean>
    ```

- 依赖注入的方式选择上

  - 建议使用setter注入
  - 第三方技术根据情况选择

### 自动配置





