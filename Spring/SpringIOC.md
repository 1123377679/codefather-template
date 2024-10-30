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

### 自动装配

前面花了大量的时间把Spring的注入去学习了下，总结起来就两个字`麻烦`。

- 问:麻烦在哪?
  - 答:配置文件的编写配置上。
- 问:有更简单方式么?
  - 答:有，自动配置

所以什么是自动配置以及如何实现自动配置，就是接下来要学习的内容

#### 什么是依赖自动装配？

IOC容器根据bean所依赖的资源在容器中`自动查找并注入`到bean中的过程称为自动装配

#### 自动装配方式有哪些？

- 按类型（常用）
- 按名称
- 按构造方法
- 不启用自动装配

#### 环境准备

修改BookDao、BookDaoImpl、BookService和BookServiceImpl类

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

App运行类

```java
public class App {
    public static void main( String[] args ) {
        ApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
        BookService bookService = (BookService) ctx.getBean("bookService");
        bookService.save();
    }
}
```

#### 完成自动装配的配置

自动装配只需要修改applicationContext.xml配置文件即可:

1. 将`<property>`标签删除
2. 在`<bean>`标签中添加autowire属性

- 首先来实现按照类型注入的配置

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

<!--    <bean id="bookDao" class="com.blog.dao.impl.BookDaoImpl"/>-->
<!--    既然是按类型注入了，那么id写不写都无所谓了-->
    <bean class="com.blog.dao.impl.BookDaoImpl"/>
    <bean id="bookService" class="com.blog.service.impl.BookServiceImpl" autowire="byType"/>
</beans>
```

运行程序，结果如下，说明已经成功注入了

```java
book service save …
book dao save …
```

>注意事项：
>
>- 需要注入属性的类中对应属性的`setter`方法不能省略
>- 被注入的对象必须要被Spring的IOC容器管理
>- 按照类型在Spring的IOC容器中如果找到多个对象，会报`NoUniqueBeanDefinitionException`

当一个类型在IOC中有多个对象，还想要注入成功，这个时候就需要按照名称注入，配置方式如下

```java
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!--这里就有两个同一类型的bean，但是id不一样-->
    <bean id="bookDao1" class="com.blog.dao.impl.BookDaoImpl"/>
    <bean id="bookDao2" class="com.blog.dao.impl.BookDaoImpl"/>
    <bean class="com.blog.dao.impl.BookDaoImpl"/>
    <bean id="bookService" class="com.blog.service.impl.BookServiceImpl" autowire="byName"/>
</beans>
```

同时修改BookServiceImpl类汇总的`setBookDao`方法，将其重命名为`setBookDao1`

```java
public class BookServiceImpl implements BookService{
    private BookDao bookDao;

    public void setBookDao1(BookDao bookDao) {
        this.bookDao = bookDao;
    }

    public void save() {
        System.out.println("book service save ...");
        bookDao.save();
    }
}
```

运行程序，结果如下，说明已经成功注入了

```java
book service save …
book dao save …
```

>- 疑惑：为什么刚刚修改的是setBookDao的方法名，而不是将bookDao属性修改为bookDao1呢？按照名称注入中的名称指的是什么?
>- 解惑：
>  - 因为bookDao是private修饰的，外部类无法直接访问
>  - 所以外部类只能通过属性的set方法进行访问
>  - 对外部类来说，setBookDao方法名，去掉set后首字母小写是其属性名
>    - 为什么是去掉set首字母小写?
>    - 这个规则是set方法生成的`默认规则`，set方法的生成是把属性名首字母大写前面加set形成的方法名
>  - 所以按照名称注入，其实是和对应的set方法有关，但是如果按照标准起名称，属性名和set对应的名是一致的

#### 小结

- 如果按照名称去找对应的bean对象，找不到则注入Null
- 当某一个类型在IOC容器中有多个对象，按照名称注入只找其指定名称对应的bean对象，不会报错
- 两种方式介绍完后，以后用的更多的是`按照类型`注入。
- 最后对于依赖注入，需要注意一些其他的配置特征:
  1. 自动装配用于引用类型依赖注入，不能对简单类型进行操作
  2. 使用按类型装配时（byType）必须保障容器中相同类型的bean唯一，推荐使用
  3. 使用按名称装配时（byName）必须保障容器中具有指定名称的bean，因变量名与配置耦合，不推荐使用
  4. 自动装配优先级低于setter注入与构造器注入，同时出现时自动装配配置失效

### 集合注入

前面我们已经能完成引入数据类型和简单数据类型的注入，但是还有一种数据类型`集合`，集合中既可以装

简单数据类型也可以装引用数据类型，对于集合，在Spring中该如何注入呢?

先来回顾下，常见的集合类型有哪些?

- 数组
- List
- Set
- Map
- Properties

针对不同的集合类型，该如何实现注入呢?接着往下看

#### 环境准备

```java
public interface BookDao {
    public void save();
}
public class BookDaoImpl implements BookDao {

    private int[] array;

    private List<String> list;

    private Set<String> set;

    private Map<String,String> map;

    private Properties properties;

    public void save() {
        System.out.println("book dao save ...");

        System.out.println("遍历数组:" + Arrays.toString(array));

        System.out.println("遍历List" + list);

        System.out.println("遍历Set" + set);

        System.out.println("遍历Map" + map);

        System.out.println("遍历Properties" + properties);
    }

    public void setArray(int[] array) {
        this.array = array;
    }

    public void setList(List<String> list) {
        this.list = list;
    }

    public void setSet(Set<String> set) {
        this.set = set;
    }

    public void setMap(Map<String, String> map) {
        this.map = map;
    }

    public void setProperties(Properties properties) {
        this.properties = properties;
    }
}
```

修改配置文件

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="bookDao" class="com.blog.dao.impl.BookDaoImpl"/>
</beans>
```

修改App运行时类

```java
public class App {
    public static void main( String[] args ) {
        ApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
        BookDao bookDao = (BookDao) ctx.getBean("bookDao");
        bookDao.save();
    }
}
```

- 准备工作完毕，接下来，在上面这个环境中来完成`集合注入`的学习，下面所有的配置方式，都是在bookDao的bean标签中使用`<property>`进行注入

#### 注入数组类型

```xml
<property name="array">
    <array>
        <value>100</value>
        <value>200</value>
        <value>300</value>
    </array>
</property>
```

#### 注入List类型

```xml
<property name="list">
    <list>
        <value>张三</value>
        <value>ABC</value>
        <value>123</value>
    </list>
</property>
```

#### 注入Set类型

```xml
<property name="set">
    <set>
        <value>100</value>
        <value>200</value>
        <value>ABC</value>
        <value>ABC</value>
    </set>
</property>
```

#### 注入Map类型

```xml
<property name="map">
    <map>
        <entry key="探路者" value="马文"/>
        <entry key="次元游记兵" value="恶灵"/>
        <entry key="易位窃贼" value="罗芭"/>
    </map>
</property>
```

#### 注入Properties类型

```xml
<property name="properties">
    <props>
        <prop key="暴雷">沃尔特·菲茨罗伊</prop>
        <prop key="寻血猎犬">布洛特·亨德尔</prop>
        <prop key="命脉">阿杰·切</prop>
    </props>
</property>
```

配置完成之后，运行查看结果

>book dao save …
>
>遍历数组:[100, 200, 300]
>
>遍历List[张三, ABC, 123]
>
>遍历Set[100, 200, ABC]
>
>遍历Map{探路者=马文, 次元游记兵=恶灵, 易位窃贼=罗芭}
>
>遍历Properties{命脉=阿杰·切, 寻血猎犬=布洛特·亨德尔, 暴雷=沃尔特·菲茨罗伊}

说明：

- property标签表示setter方式注入，构造方式注入constructor-arg标签内部也可以写`<array>`、`<list>`、`<set>`、`<map>`、`<props>`标签
- List的底层也是通过数组实现的，所以`<list>`和`<array>`标签是可以混用
- 集合中要添加引用类型，只需要把`<value>`标签改成`<ref>`标签，这种方式用的比较少

## 核心容器

前面已经完成bean与依赖注入的相关知识学习，接下来我们主要学习的是IOC容器中的`核心容器`。

这里所说的核心容器，我们可以把它简单的理解为`ApplicationContext`，前面虽然已经用到过，但是并没有系统的学习，接下来我们从以下几个问题入手来学习下容器的相关知识:

- 如何创建容器?
- 创建好容器后，如何从容器中获取bean对象?
- 容器类的层次结构是什么?
- BeanFactory是什么?

### 环境准备

- 创建一个Maven项目
- pom.xml添加Spring的依赖

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>5.2.10.RELEASE</version>
    </dependency>
</dependencies>
```

resources下添加applicationContext.xml

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="
            http://www.springframework.org/schema/beans
            http://www.springframework.org/schema/beans/spring-beans.xsd
        ">
    <bean id="bookDao" class="com.blog.dao.impl.BookDaoImpl"/>
</beans>
```

添加BookDao和BookDaoImpl类

```java
public interface BookDao {
    public void save();
}

public class BookDaoImpl implements BookDao {
    public void save() {
        System.out.println("book dao save ..." );
    }
}
```

创建运行类App

```java
public class App {
    public static void main(String[] args) {
        ApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
        BookDao bookDao = (BookDao) ctx.getBean("bookDao");
        bookDao.save();
    }
}
```

### 容器

#### 容器的创建方式

- 案例中创建`ApplicationContext`的方式如下
- 这种方式翻译为：类路径下的XML配置文件

```java
ApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
```

- 除了上面这种方式，Spring还提供了另外一种创建方式
- 这种方式翻译为：文件系统下的XML配置文件，路径需要写绝对路径
- 这种方式虽能实现，但是当项目的位置发生变化后，代码也需要跟着改，耦合度高，不推荐使用。

```java
ApplicationContext ctx = new FileSystemXmlApplicationContext("D:\xxx/xxx\applicationContext.xml");
```

#### 获取bean的三种方式

- 方式一，就是我们之前用的方式
- 这种方式存在的问题是每次获取的时候都需要进行类型转换，有没有更简单的方式呢?

```java
BookDao bookDao = (BookDao) ctx.getBean("bookDao");
```

方式二

这种方式可以解决类型强转问题，但是参数又多加了一个，相对来说没有简化多少。

```java
BookDao bookDao = ctx.getBean("bookDao"，BookDao.class);
```

- 方式三
- 这种方式就类似我们之前所学习依赖注入中的按类型注入。必须要确保IOC容器中该类型对应的bean对象只能有一个。

```java
BookDao bookDao = ctx.getBean(BookDao.class);
```

#### BeanFactory的使用

容器的最上级的父接口为`BeanFactory`

使用`BeanFactory`也可以创建IOC容器

```java
public class AppForBeanFactory {
    public static void main(String[] args) {
        Resource resources = new ClassPathResource("applicationContext.xml");
        BeanFactory bf = new XmlBeanFactory(resources);
        BookDao bookDao = bf.getBean(BookDao.class);
        bookDao.save();
    }
}
```

为了更好的看出`BeanFactory`和`ApplicationContext`之间的区别，在BookDaoImpl添加如下构造函数

```java
public class BookDaoImpl implements BookDao {
    public BookDaoImpl() {
        System.out.println("constructor");
    }
    public void save() {
        System.out.println("book dao save ..." );
    }
}
```

如果不去获取bean对象，打印会发现：

- BeanFactory是延迟加载，只有在获取bean对象的时候才会去创建
- ApplicationContext是立即加载，容器加载的时候就会创建bean对象
- ApplicationContext要想成为延迟加载，只需要将lazy-init设为true

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="
            http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="bookDao" class="com.blog.dao.impl.BookDaoImpl"  lazy-init="true"/>
</beans>
```

### 核心容器总结

#### 容器相关

- BeanFactory是IoC容器的顶层接口，初始化BeanFactory对象时，加载的bean延迟加载
- ApplicationContext接口是Spring容器的核心接口，初始化时bean立即加载
- ApplicationContext接口提供基础的bean操作相关方法，通过其他接口扩展其功能
- ApplicationContext接口常用初始化类
  - ClassPathXmlApplicationContext(常用)
  - FileSystemXmlApplicationContext

#### bean相关

![image-20241029155810175](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241029155810175.png)

#### 依赖注入相关

![image-20241029155824578](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241029155824578.png)

## IOC/DI注解开发

Spring的IOC/DI对应的配置开发就已经讲解完成，但是使用起来相对来说还是比较复杂的，复杂的地方在`配置文件`。
Spring到底是如何简化代码开发的呢?
要想真正简化开发，就需要用到Spring的注解开发，Spring对注解支持的版本历程:

- 2.0版开始支持注解
- 2.5版注解功能趋于完善
- 3.0版支持纯注解开发

关于注解开发，这里会讲解两块内容`注解开发定义bean`和`纯注解开发`。
注解开发定义bean用的是2.5版提供的注解，纯注解开发用的是3.0版提供的注解。

### 环境准备

- 创建一个Maven项目
- pom.xml添加Spring的依赖

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework</groupId>
        <artifactId>spring-context</artifactId>
        <version>5.2.10.RELEASE</version>
    </dependency>
</dependencies>
```

resources下添加applicationContext.xml

```java
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="
            http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd">
    <bean id="bookDao" class="com.blog.dao.impl.BookDaoImpl"/>
</beans>
```

添加BookDao、BookDaoImpl、BookService、BookServiceImpl类

```java
public interface BookDao {
    public void save();
}
public class BookDaoImpl implements BookDao {
    public void save() {
        System.out.println("book dao save ..." );
    }
}
public interface BookService {
    public void save();
}
public class BookServiceImpl implements BookService {
    public void save() {
        System.out.println("book service save ...");
    }
}
```

创建运行类App

```java
public class App {
    public static void main(String[] args) {
        ApplicationContext ctx = new ClassPathXmlApplicationContext("applicationContext.xml");
        BookDao bookDao = (BookDao) ctx.getBean("bookDao");
        bookDao.save();
    }
}
```

### 注解开发定义bean

`步骤一：`删除原有的XML配置

将配置文件中的bean标签删除掉

`步骤二：`在Dao上添加注解
在BookDaoImpl类上添加`@Component`注解

```java
@Component("bookDao")
public class BookDaoImpl implements BookDao {
    public void save() {
        System.out.println("book dao save ...");
    }
}
```

注意：@Component注解不可以添加在接口上，因为接口是无法创建对象的。

`步骤三：`配置Spring的注解包扫描
为了让Spring框架能够扫描到写在类上的注解，需要在配置文件上进行包扫描

```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="
            http://www.springframework.org/schema/beans
            http://www.springframework.org/schema/beans/spring-beans.xsd
            http://www.springframework.org/schema/context
            http://www.springframework.org/schema/context/spring-context.xsd
        ">
    <context:component-scan base-package="com.blog"/>
</beans>
```

- 说明：component-scan
  - component:组件,Spring将管理的bean视作自己的一个组件
  - scan:扫描
    base-package指定Spring框架扫描的包路径，它会扫描指定包及其子包中的所有类上的注解。
  - 包路径越多`如:com.blog.dao.impl`，扫描的范围越小速度越快
  - 包路径越少`如:com.blog`,扫描的范围越大速度越慢
  - 一般扫描到项目的组织名称即Maven的groupId下`如:com.blog`即可。\

- `步骤四：`运行程序

  > book dao save …

`步骤五：`Service上添加注解

在BookServiceImpl类上也添加`@Component`交给Spring框架管理

```java
@Component
public class BookServiceImpl implements BookService {
    public void save() {
        System.out.println("book service save ...");
    }
}
```

`步骤六：`运行程序

在App类中，从IOC容器中获取BookServiceImpl对应的bean对象

```java
public class App {
    public static void main(String[] args) {
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext("applicationContext.xml");
        //按照名称获取bean
        BookDao bookDao = (BookDao) context.getBean("bookDao");
        //按照类型获取bean
        BookService bookService = context.getBean(BookService.class);
        bookDao.save();
        bookService.save();
    }
}
```

结果如下

> book dao save …
> book service save …

**说明:**

- BookServiceImpl类没有起名称，所以在App中是按照类型来获取bean对象
- `@Component`注解如果不起名称，会有一个默认值就是`当前类名首字母小写`，所以也可以按照名称获取，如

```java
BookService bookService = (BookService) context.getBean("bookServiceImpl");
```

对于@Component注解，还衍生出了其他三个注解`@Controller`、`@Service`、`@Repository`

通过查看源码会发现：这三个注解和@Component注解的作用是一样的，为什么要衍生出这三个呢?

这是方便我们后期在编写类的时候能很好的区分出这个类是属于`表现层`、`业务层`还是`数据层`的类。

### 纯注解开发模式

上面已经可以使用注解来配置bean,但是依然有用到配置文件，在配置文件中对包进行了扫描，Spring在3.0

版已经支持纯注解开发，使用Java类替代配置文件，开启了Spring快速开发赛道，那么具体如何实现?

#### 思路分析

实现思路为：

- 将配置文件applicationContext.xml删掉，用类来替换

#### 实现步骤

- `步骤一：`创建配置类
- 创建一个配置类SpringConfig

```java
public class SpringConfig {
}
```

`步骤二：`标识该类为配置类

在配置类上面加一个`@Configuration`注解，将其标识为一个配置类，用于替换掉`applicationContext.XML`

```java
@Configuration
public class SpringConfig {
}
```

`步骤三：`用注解替换包扫描配置

在配置类上添加包扫描注解`@ComponentScan`替换`<context:component-scan base-package=""/>`

```java
@Configuration
@ComponentScan("com.blog")
public class SpringConfig {
}
```

`步骤四：`创建运行类并执行

创建一个新的运行类`AppForAnnotation`

```java
public class AppForAnnotation {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(SpringConfig.class);
        BookDao bookDao = (BookDao) context.getBean("bookDao");
        bookDao.save();
        BookService bookService = context.getBean(BookService.class);
        bookService.save();
    }
}
```

运行AppForAnnotation,可以看到两个对象依然被获取成功

```java
book dao save …
book service save …
```

至此，纯注解开发的方式就已经完成了，主要内容包括：

- Java类替换Spring核心配置文件
  - `@Configuration`注解用于设定当前类为配置类
  - `@ComponentScan`注解用于设定扫描路径，此注解只能添加一次，多个数据请用数组格式

```java
@ComponentScan({com.blog.service","com.blog.dao"})
```

读取Spring核心配置文件初始化容器对象切换为读取Java配置类初始化容器对象

```java
AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(SpringConfig.class);
```

- 知识点：`@Configuration`

| 名称 |       @Configuration        |
| :--: | :-------------------------: |
| 类型 |           类注解            |
| 位置 |         类定义上方          |
| 作用 |   设置该类为spring配置类    |
| 属性 | value（默认）：定义bean的id |

- 知识点：`@ComponentScan`

| 名称 |                      @ComponentScan                      |
| :--: | :------------------------------------------------------: |
| 类型 |                          类注解                          |
| 位置 |                        类定义上方                        |
| 作用 | 设置spring配置类扫描路径，用于加载使用注解格式定义的bean |
| 属性 |     value（默认）：扫描路径，此路径可以逐层向下扫描      |

#### 小结

这部分要重点掌握的是使用注解完成Spring的bean管理，需要掌握的内容为:

- 记住`@Component`、`@Controller`、`@Service`、`@Repository`这四个注解
- applicationContext.xml中`<context:component-san/>`的作用是指定扫描包路径，注解为`@ComponentScan`
- `@Configuration`标识该类为配置类，使用类替换`applicationContext.xml`文件
- `ClassPathXmlApplicationContext`是加载XML配置文件
- `AnnotationConfigApplicationContext`是加载配置类

### 注解开发依赖注入

Spring为了使用注解简化开发，并没有提供`构造函数注入`、`setter注入`对应的注解，只提供了自动装配的注解实现。

#### 环境准备

- 创建一个Maven项目

- pom.xml添加Spring的依赖

  ```xml
  <dependencies>
      <dependency>
          <groupId>org.springframework</groupId>
          <artifactId>spring-context</artifactId>
          <version>5.2.10.RELEASE</version>
      </dependency>
  </dependencies>
  ```

- 添加一个配置类`SpringConfig`

  ```java
  @Configuration
  @ComponentScan("com.blog")
  public class SpringConfig {
  }
  ```

- 添加BookDao、BookDaoImpl、BookService、BookServiceImpl类

```java
public interface BookDao {
    public void save();
}
@Repository
public class BookDaoImpl implements BookDao {
    public void save() {
        System.out.println("book dao save ..." );
    }
}
public interface BookService {
    public void save();
}
@Service
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

创建运行类AppForAnnotation

```java
public class App {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext ctx = new AnnotationConfigApplicationContext(SpringConfig.class);
        BookService bookService = ctx.getBean(BookService.class);
        bookService.save();
    }
}
```

- 环境准备好后，直接运行App类会有问题，因为还没有提供配置注入BookDao的，所以bookDao对象为Null,调用其save方法就会报`控指针异常`。

#### 注解实现按照类型注入

对于这个问题使用注解该如何解决?

- 在BookServiceImpl类的bookDao属性上添加`@Autowired`注解

```java
@Service
public class BookServiceImpl implements BookService {
    @Autowired
    private BookDao bookDao;

//    public void setBookDao(BookDao bookDao) {
//        this.bookDao = bookDao;
//    }

    public void save() {
        System.out.println("book service save ...");
        bookDao.save();
    }
}
```

>**注意:**
>
>- `@Autowired`可以写在属性上，也可也写在setter方法上，最简单的处理方式是`写在属性上并将setter方法删除掉`
>- 为什么setter方法可以删除呢?
>  - 自动装配基于反射设计创建对象并通过`暴力反射`为私有属性进行设值
>  - 普通反射只能获取public修饰的内容
>  - 暴力反射除了获取public修饰的内容还可以获取private修改的内容
>  - 所以此处无需提供setter方法

`@Autowired`是按照类型注入，那么对应BookDao接口如果有多个实现类，比如添加BookDaoImpl2

```java
@Repository
public class BookDaoImpl2 implements BookDao {
    public void save() {
        System.out.println("book dao save ...2");
    }
}
```

- 这个时候再次运行App，就会报错`NoUniqueBeanDefinitionException`
  此时，按照类型注入就无法区分到底注入哪个对象，解决方案:`按照名称注入`
- 先给两个Dao类分别起个名称

```java
@Repository("bookDao")
public class BookDaoImpl implements BookDao {
    public void save() {
        System.out.println("book dao save ..." );
    }
}
@Repository("bookDao2")
public class BookDaoImpl2 implements BookDao {
    public void save() {
        System.out.println("book dao save ...2" );
    }
}
```

此时就可以注入成功，但是得思考个问题:

- @Autowired是按照类型注入的，给BookDao的两个实现起了名称，它还是有两个bean对象，为什么不报错?
- @Autowired默认按照类型自动装配，如果IOC容器中同类的Bean找到多个，就按照变量名和Bean的名称匹配。因为变量名叫`bookDao`而容器中也有一个`booDao`，所以可以成功注入。
- 那下面这种情况可以成功注入吗

```java
@Repository("bookDao1")
public class BookDaoImpl implements BookDao {
    public void save() {
        System.out.println("book dao save ..." );
    }
}
@Repository("bookDao2")
public class BookDaoImpl2 implements BookDao {
    public void save() {
        System.out.println("book dao save ...2" );
    }
}
```

还是不行的，因为按照类型会找到多个bean对象，此时会按照`bookDao`名称去找，因为IOC容器只有名称叫`bookDao1`和`bookDao2`，所以找不到，会报`NoUniqueBeanDefinitionException`

#### 注解实现按照名称注入

当根据类型在容器中找到多个bean,注入参数的属性名又和容器中bean的名称不一致，这个时候该如何解

决，就需要使用到`@Qualifier`来指定注入哪个名称的bean对象。`@Qualifier`注解后的值就是需要注入的

bean的名称。

```java
@Service
public class BookServiceImpl implements BookService {
    @Autowired
    @Qualifier("bookDao1")
    private BookDao bookDao;
    
    public void save() {
        System.out.println("book service save ...");
        bookDao.save();
    }
}
```

>注意:@Qualifier不能独立使用，必须和@Autowired一起使用

#### 简单数据类型注入

引用类型看完，简单类型注入就比较容易懂了。简单类型注入的是基本数据类型或者字符串类型，下面在

`BookDaoImpl`类中添加一个`name`属性，用其进行简单类型注入

```java
@Repository
public class BookDaoImpl implements BookDao {
    private String name;
    public void save() {
        System.out.println("book dao save ..." + name);
    }
}
```

数据类型换了，对应的注解也要跟着换，这次使用`@Value`注解，将值写入注解的参数中就行了

```java
@Repository
public class BookDaoImpl implements BookDao {
    @Value("Stephen")
    private String name;
    public void save() {
        System.out.println("book dao save ..." + name);
    }
}
```

注意数据格式要匹配，如将”abc”注入给int值，这样程序就会报错。

介绍完后，会有一种感觉就是这个注解好像没什么用，跟直接赋值是一个效果，还没有直接赋值简单，所

以这个注解存在的意义是什么?继续往下看

#### 注解读取properties配置文件

`@Value`一般会被用在从properties配置文件中读取内容进行使用，具体如何实现?

`步骤一：`在resource下准备一个properties文件

```properties
name=Stephen
```

`步骤二：`使用注解加载properties配置文件

在配置类上添加`@PropertySource`注解

```java
@Configuration
@ComponentScan("com.blog")
@PropertySource("jdbc.properties")
public class SpringConfig {
}
```

`步骤三：`使用@Value读取配置文件中的内容

```java
@Repository
public class BookDaoImpl implements BookDao {
    @Value("${name}")
    private String name;
    public void save() {
        System.out.println("book dao save ..." + name);
    }
}
```

- `步骤四：`运行程序

- 运行App类，查看运行结果，说明配置文件中的内容已经被加载

  > book service save …
  > book dao save …Stephen

**注意:**

- 如果读取的properties配置文件有多个，可以使用@PropertySource的属性来指定多个

  ```java
  @PropertySource({"jdbc.properties","xxx.properties"})
  ```

- ```java
  @PropertySource
  ```

  注解属性中不支持使用通配符*,运行会报错

  ```java
  @PropertySource({"*.properties"})
  ```

  @PropertySource注解属性中可以把classpath:加上,代表从当前项目的根路径找文件

  ```java
  @PropertySource({"classpath:jdbc.properties"})
  ```

知识点1：`@Autowired`

| 名称 |                          @Autowired                          |
| :--: | :----------------------------------------------------------: |
| 类型 |     属性注解 或 方法注解（了解） 或 方法形参注解（了解）     |
| 位置 | 属性定义上方 或 标准set方法上方 或 类set方法上方 或 方法形参前面 |
| 作用 |                     为引用类型属性设置值                     |
| 属性 |        required：true/false，定义该属性是否允许为null        |

知识点2：`@Qualifier`

| 名称 |                    @Qualifier                    |
| :--: | :----------------------------------------------: |
| 类型 |           属性注解 或 方法注解（了解）           |
| 位置 | 属性定义上方 或 标准set方法上方 或 类set方法上方 |
| 作用 |          为引用类型属性指定注入的beanId          |
| 属性 |         value（默认）：设置注入的beanId          |

知识点3：`@Value`

| 名称 |                      @Value                      |
| :--: | :----------------------------------------------: |
| 类型 |           属性注解 或 方法注解（了解）           |
| 位置 | 属性定义上方 或 标准set方法上方 或 类set方法上方 |
| 作用 |     为 基本数据类型 或 字符串类型 属性设置值     |
| 属性 |          value（默认）：要注入的属性值           |

知识点4：`@PropertySource`

| 名称 |                       @PropertySource                        |
| :--: | :----------------------------------------------------------: |
| 类型 |                            类注解                            |
| 位置 |                          类定义上方                          |
| 作用 |                 加载properties文件中的属性值                 |
| 属性 | value（默认）：设置加载的properties文件对应的文件名或文件名组成的数组 |

## 注解开发总结

![image-20241029172823809](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241029172823809.png)





