# SpringAOP

前面我们在介绍Spring的时候说过，Spring有两个核心的概念，一个是`IOC/DI`，一个是`AOP`。

前面已经对`IOC/DI`进行了系统的学习，接下来要学习它的另一个核心内容，就是`AOP`。

`AOP是在不改原有代码的前提下对其进行增强`。

那现在我们围绕这句话，主要学习两方面内容`AOP核心概念`,`AOP作用`

## 什么是AOP？

- AOP(Aspect Oriented Programming)面向切面编程，是一种编程范式，指导开发者如何组织程序结构
  - OOP(Object Oriented Programming)面向对象编程

我们都知道OOP是一种编程思想，那么AOP也是一种编程思想，编程思想主要的内容就是指导程序员该如何编写程序，所以它们两个是不同的`编程范式`。

## AOP作用

- 作用:在不惊动原始设计的基础上为其进行功能增强

## AOP核心概念

为了能更好的理解AOP的相关概念，我们准备了一个环境，整个环境的内容我们暂时可以不用关注，最主要的类为:`BookDaoImpl`

```java
@Repository
public class BookDaoImpl implements BookDao {
    public void save() {
        //记录程序当前执行执行（开始时间）
        Long startTime = System.currentTimeMillis();
        //业务执行万次
        for (int i = 0;i<10000;i++) {
            System.out.println("book dao save ...");
        }
        //记录程序当前执行时间（结束时间）
        Long endTime = System.currentTimeMillis();
        //计算时间差
        Long totalTime = endTime-startTime;
        //输出信息
        System.out.println("执行万次消耗时间：" + totalTime + "ms");
    }
    public void update(){
        System.out.println("book dao update ...");
    }
    public void delete(){
        System.out.println("book dao delete ...");
    }
    public void select(){
        System.out.println("book dao select ...");
    }
}
```

代码的内容很简单，就是测试一下万次执行的耗时

当在App类中从容器中获取bookDao对象后，分别执行其`save`,`delete`,`update`和`select`方法后会有如下的打印结果

>book dao save …
>book dao save …
>book dao save …
>book dao save …
>book dao save …
>book dao save …
>执行万次消耗时间:79ms
>
>book dao delete …
>book dao delete …
>book dao delete …
>book dao delete …
>book dao delete …
>book dao delete …
>执行万次消耗时间:81ms
>
>book dao update …
>book dao update …
>book dao update …
>book dao update …
>book dao update …
>book dao update …
>执行万次消耗时间:63ms
>
>book dao select …

疑问

- 对于计算万次执行消耗的时间只有save方法有，为什么delete和update方法也会有呢?
- delete和update方法有，那什么select方法为什么又没有呢?

这个案例中其实就使用了Spring的AOP，在不惊动(改动)原有设计(代码)的前提下，想给谁添加额外功能就给谁添加。这个也就是Spring的理念：

- 无入侵式/无侵入式

说了这么多，Spring到底是如何实现的呢?

![image-20241101111019922](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241101111019922.png)

1. 前面一直在强调，Spring的AOP是对一个类的方法在不进行任何修改的前提下实现增强。对于上面的案例中BookServiceImpl中有`save`,`update`,`delete`和`select`方法,这些方法我们给起了一个名字叫`连接点`
2. 在BookServiceImpl的四个方法中，`update`和`delete`只有打印没有计算万次执行消耗时间，但是在运行的时候已经有该功能，那也就是说`update`和`delete`方法都已经被增强，所以对于需要增强的方法我们给起了一个名字叫`切入点`
3. 执行BookServiceImpl的update和delete方法的时候都被添加了一个计算万次执行消耗时间的功能，将这个功能抽取到一个方法中，换句话说就是存放共性功能的方法，我们给起了个名字叫`通知`
4. 通知是要增强的内容，会有多个，切入点是需要被增强的方法，也会有多个，那哪个切入点需要添加哪个通知，就需要提前将它们之间的关系描述清楚，那么对于通知和切入点之间的关系描述，我们给起了个名字叫`切面`
5. 通知是一个方法，方法不能独立存在需要被写在一个类中，这个类我们也给起了个名字叫`通知类`

至此AOP中的核心概念就已经介绍完了，总结下:

- 连接点(JoinPoint)：程序执行过程中的任意位置，粒度为执行方法、抛出异常、设置变量等
  - 在SpringAOP中，理解为方法的执行
- 切入点(Pointcut):匹配连接点的式子
  - 在SpringAOP中，一个切入点可以描述一个具体方法，也可也匹配多个方法
    - 一个具体的方法:如com.blog.dao包下的BookDao接口中的无形参无返回值的save方法
    - 匹配多个方法:所有的save方法/所有的get开头的方法/所有以Dao结尾的接口中的任意方法/所有带有一个参数的方法
  - 连接点范围要比切入点范围大，是切入点的方法也一定是连接点，但是是连接点的方法就不一定要被增强，所以可能不是切入点。
- 通知(Advice):在切入点处执行的操作，也就是共性功能
  - 在SpringAOP中，功能最终以方法的形式呈现
- 通知类：定义通知的类
- 切面(Aspect):描述通知与切入点的对应关系。

### 小结

这部分需要掌握的内容是

- 什么是AOP?
- AOP的作用是什么?
- AOP中核心概念分别指的是什么?
  - 连接点
  - 切入点
  - 通知
  - 通知类
  - 切面

## AOP入门案例

### 需求分析

案例设定：测算接口执行效率，但是这个案例稍微复杂了点，我们对其进行简化。

简化设定：在方法执行前输出当前系统时间。

那现在我们使用SpringAOP的注解方式完成在方法执行的前打印出当前系统时间。

### 思路分析

1. 导入坐标
2. 制作连接点（原始操作，Dao接口及实现类）
3. 制作共性功能（通知类和通知）
4. 定义切入点
5. 绑定切入点和通知的关系（切面）

### 环境准备

- 创建一个Maven项目
- pom.xml添加Spring依赖

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>5.2.10.RELEASE</version>
</dependency>
```

### 添加BookDao和BookDaoImpl类

```java
public interface BookDao {
    public void save();
    public void update();
}
@Repository
public class BookDaoImpl implements BookDao {
    public void save() {
        System.out.println(System.currentTimeMillis());
        System.out.println("book dao save ...");
    }

    public void update() {
        System.out.println("book dao update ...");
    }
}
```

### 创建Spring的配置类

```java
@Configuration
@ComponentScan("com.blog")
public class SpringConfig {
}
```

### 编写App运行类

```java
public class App {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(SpringConfig.class);
        BookDao bookDao = context.getBean(BookDao.class);
        bookDao.update();
    }
}
```

说明

- 目前打印save方法的时候，因为方法中有打印系统时间，所以运行的时候是可以看到系统时间
- 对于update方法来说，就没有该功能
- 我们要使用SpringAOP的方式在不改变update方法的前提下让其具有打印系统时间的功能。

## AOP实现步骤

`步骤一：`添加依赖

```xml
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjweaver</artifactId>
    <version>1.9.4</version>
</dependency>
```

- 因为`spring-context`中已经导入了`spring-aop`,所以不需要再单独导入`spring-aop`
  导入AspectJ的jar包,AspectJ是AOP思想的一个具体实现，Spring有自己的AOP实现，但是相比于AspectJ来说比较麻烦，所以我们直接采用Spring整合ApsectJ的方式进行AOP开发。
- `步骤二：`定义接口和实现类
  准备环境的时候我们已经完成了
- `步骤三：`定义通知类和通知
  通知就是将共性功能抽取出来后形成的方法，共性功能指的就是当前系统时间的打印。
  类名和方法名没有要求，可以任意。

```java
public class MyAdvice {
    public void method(){
        System.out.println(System.currentTimeMillis());
    }
}
```

`步骤四：`定义切入点

BookDaoImpl中有两个方法，分别是update()和save()，我们要增强的是update方法，那么该如何定义呢？

```java
public class MyAdvice {
    @Pointcut("execution(void com.blog.dao.impl.BookDaoImpl.update())")
    private void pt() {
    }

    public void method() {
        System.out.println(System.currentTimeMillis());
    }
}
```

>**说明:**
>
>- 切入点定义依托一个不具有实际意义的方法进行，即无参数、无返回值、方法体无实际逻辑。
>- execution及后面编写的内容，之后我们会专门去学习。

`步骤五：`制作切面

切面是用来描述通知和切入点之间的关系，如何进行关系的绑定?

```java
public class MyAdvice {

    @Pointcut("execution(void com.blog.dao.BookDao.update())")
    private void pt(){}
    
    @Before("pt()")
    public void method(){
        System.out.println(System.currentTimeMillis());
    }
}
```

绑定切入点与通知关系，并指定通知添加到原始连接点的具体执行`位置`

**说明:**`@Before`翻译过来是之前，也就是说通知会在切入点方法执行之前执行，除此之前还有其他四种类型，后面会讲。

那这里就会在执行update()之前，来执行我们的method()，输出当前毫秒值

`步骤六：`将通知类配给容器并标识其为切面类

```java
@Component
@Aspect
public class MyAdvice {

    @Pointcut("execution(void com.blog.dao.impl.BookDaoImpl.update())")
    private void pt() {
    }

    @Before("pt()")
    public void method() {
        System.out.println(System.currentTimeMillis());
    }
}
```

`步骤七：`开启注解格式AOP功能

使用`@EnableAspectJAutoProxy`注解

```java
@Configuration
@ComponentScan("com.blog")
@EnableAspectJAutoProxy
public class SpringConfig {
}
```

`步骤八：`运行程序

这次我们再来调用update()

```java
public class App {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(SpringConfig.class);
        BookDao bookDao = context.getBean(BookDao.class);
        bookDao.update();
    }
}
```

控制台输出

>1662367945787
>book dao update …

识点1：`@EnableAspectJAutoProxy`

| 名称 | @EnableAspectJAutoProxy |
| :--: | :---------------------: |
| 类型 |       配置类注解        |
| 位置 |     配置类定义上方      |
| 作用 |   开启注解格式AOP功能   |

知识点2：`@Aspect`

| 名称 |        @Aspect        |
| :--: | :-------------------: |
| 类型 |        类注解         |
| 位置 |    切面类定义上方     |
| 作用 | 设置当前类为AOP切面类 |

知识点3：`@Pointcut`

| 名称 |          @Pointcut          |
| :--: | :-------------------------: |
| 类型 |          方法注解           |
| 位置 |     切入点方法定义上方      |
| 作用 |       设置切入点方法        |
| 属性 | value（默认）：切入点表达式 |

知识点4：`@Before`

| 名称 |                           @Before                            |
| :--: | :----------------------------------------------------------: |
| 类型 |                           方法注解                           |
| 位置 |                       通知方法定义上方                       |
| 作用 | 设置当前通知方法与切入点之间的绑定关系，当前通知方法在原始切入点方法前运行 |

## AOP核心概念

在上面介绍AOP的工作流程中，我们提到了两个核心概念，分别是:

- 目标对象(Target)：原始功能去掉共性功能对应的类产生的对象，这种对象是无法直接完成最终工作的
- 代理(Proxy)：目标对象无法直接完成工作，需要对其进行功能回填，通过原始对象的代理对象实现

上面这两个概念比较抽象，简单来说

目标对象就是要增强的类`如:BookServiceImpl类`对应的对象，也叫原始对象，不能说它不能运行，只能说它在运行的过程中对于要增强的内容是缺失的。

SpringAOP是在不改变原有设计(代码)的前提下对其进行增强的，它的底层采用的是代理模式实现的，所以要对原始对象进行增强，就需要对原始对象创建代理对象，在代理对象中的方法把通知`如:MyAdvice中的method方法`内容加进去，就实现了增强，这就是我们所说的代理(Proxy)。

### 小结

这部分我们需要掌握的内容有：

- 能说出AOP的工作流程
- AOP的核心概念
  - 目标对象、连接点、切入点
  - 通知类、通知
  - 切面
  - 代理
- SpringAOP的本质或者可以说底层实现是通过`代理模式`。

## AOP通知类型

前面的案例中，有涉及到如下内容

```java
@Before("pt()")
```

它所代表的含义是将`通知`添加到`切入点`方法执行的`前面`。

除了这个注解外，还有没有其他的注解，换个问题就是除了可以在前面加，能不能在其他的地方加?

### 类型介绍

我们先来回顾下AOP通知:

- AOP通知描述了抽取的共性功能，根据共性功能抽取的位置不同，最终运行代码时要将其加入到合理的位置

那么具体可以将通知添加到哪里呢？一共提供了5种通知类型

- 前置通知
- 后置通知
- `环绕通知(重点)`
- 返回后通知(了解)
- 抛出异常后通知(了解)

为了更好的理解这几种通知类型，我们来看一张图

![image-20241103232206231](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241103232206231.png)

1. 前置通知，追加功能到方法执行前,类似于在代码1或者代码2添加内容
2. 后置通知,追加功能到方法执行后,不管方法执行的过程中有没有抛出异常都会执行，类似于在代码5添加内容
3. 返回后通知,追加功能到方法执行后，只有方法正常执行结束后才进行,类似于在代码3添加内容，如果方法执行抛出异常，返回后通知将不会被添加
4. 抛出异常后通知,追加功能到方法抛出异常后，只有方法执行出异常才进行,类似于在代码4添加内容，只有方法抛出异常后才会被添加
5. 环绕通知,环绕通知功能比较强大，它可以追加功能到方法执行的前后，这也是比较常用的方式，它可以实现其他四种通知类型的功能，具体是如何实现的，需要我们往下学习。

### 环境准备

- 创建一个Maven项目
- pom.xml添加Spring依赖

```xml
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-context</artifactId>
    <version>5.2.10.RELEASE</version>
</dependency>
<dependency>
    <groupId>org.aspectj</groupId>
    <artifactId>aspectjweaver</artifactId>
    <version>1.9.4</version>
</dependency>
```

添加BookDao和BookDaoImpl类

```java
public interface BookDao {
    public void update();

    public int select();
}
@Repository
public class BookDaoImpl implements BookDao {
    
    public void update() {
        System.out.println("book dao update ...");
    }

    public int select() {
        System.out.println("book dao select ...");
        return 100;
    }
}
```

创建Spring的配置类

```java
@Configuration
@ComponentScan("com.blog")
@EnableAspectJAutoProxy
public class SpringConfig {
}
```

创建通知类

```java
@Component
@Aspect
public class MyAdvice {
    @Pointcut("execution(void com.blog.dao.BookDao.update())")
    private void pt() {
    }

    public void before() {
        System.out.println("before advice ...");
    }

    public void after(){
        System.out.println("after advice ...");
    }

    public void around(){
        System.out.println("around before advice ...");
        System.out.println("around after advice ...");
    }

    public void afterReturning(){
        System.out.println("afterReturning advice ...");
    }

    public void afterThrowing(){
        System.out.println("afterThrowing advice ...");
    }
}
```

编写App运行类

```java
public class App {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(SpringConfig.class);
        BookDao bookDao = context.getBean(BookDao.class);
        bookDao.update();
    }
}
```

### 通知类型的使用

#### 前置通知

修改MyAdvice，在before方法上添加`@Before`注解

```java
@Component
@Aspect
public class MyAdvice {
    @Pointcut("execution(void com.blog.dao.BookDao.update())")
    private void pt() {
    }

    @Before("pt()")
    public void before() {
        System.out.println("before advice ...");
    }
}
```

### 后置通知

```java
@Component
@Aspect
public class MyAdvice {
    @Pointcut("execution(void com.blog.dao.BookDao.update())")
    private void pt() {
    }

    @Before("pt()")
    public void before() {
        System.out.println("before advice ...");
    }

    @After("pt()")
    public void after(){
        System.out.println("after advice ...");
    }
}
```

### 环绕通知

```java
@Component
@Aspect
public class MyAdvice {
    @Pointcut("execution(void com.blog.dao.BookDao.update())")
    private void pt() {
    }

    @Around("pt()")
    public void around(){
        System.out.println("around before advice ...");
        System.out.println("around after advice ...");
    }
}
```

运行结果中，通知的内容打印出来，但是原始方法的内容却没有被执行。

因为环绕通知需要在原始方法的前后进行增强，所以环绕通知就必须要能对原始操作进行调用，具体如何实现?

在方法参数中添加`ProceedingJoinPoint`，同时在需要的位置使用`proceed()`调用原始操作

```java
@Component
@Aspect
public class MyAdvice {
    @Pointcut("execution(void com.blog.dao.BookDao.update())")
    private void pt() {
    }

    @Around("pt()")
    public void around(ProceedingJoinPoint pjp) throws Throwable {
        System.out.println("around before advice ...");
        //表示对原始操作的调用
        pjp.proceed();
        System.out.println("around after advice ...");
    }
}
```

注意事项

- 当原始方法中有返回值时
  - 修改MyAdvice,对BookDao中的select方法添加环绕通知

```java
@Component
@Aspect
public class MyAdvice {
    @Pointcut("execution(int com.blog.dao.BookDao.select())")
    private void pt() {
    }

    @Around("pt()")
    public void around(ProceedingJoinPoint pjp) throws Throwable {
        System.out.println("around before advice ...");
        pjp.proceed();
        System.out.println("around after advice ...");
    }
}
```

修改App类，调用select方法

```java
public class App {
    public static void main(String[] args) {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(SpringConfig.class);
        BookDao bookDao = context.getBean(BookDao.class);
        int select = bookDao.select();
        System.out.println(select);
    }
}
```

- 运行程序，报错

  > org.springframework.aop.AopInvocationException: Null return value from advice does not match primitive return type for: ..
  > 错误大概的意思是:`空的返回不匹配原始方法的int返回`

- void就是返回Null
  - 原始方法的返回值是BookDao下的select方法
- 所以如果我们使用环绕通知的话，要根据原始方法的返回值来设置环绕通知的返回值，具体解决方案为:

```java
@Component
@Aspect
public class MyAdvice {
    @Pointcut("execution(int com.blog.dao.BookDao.select())")
    private void pt() {
    }

    @Around("pt()")
    public Object around(ProceedingJoinPoint pjp) throws Throwable {
        System.out.println("around before advice ...");
        Object res = pjp.proceed();
        System.out.println("around after advice ...");
        return res;
    }
}
```

说明:

- 为什么返回的是Object而不是int的主要原因是Object类型更通用。
- 在环绕通知中是可以对原始方法返回值就行修改的。例如上面的例子，可以改为`return res+666;`，最终的输出结果也会变为766

## Spring整合MyBatis以及JDBC.properties

### 环境准备

在准备环境的同时，我们也来回顾一下MyBatis开发的相关内容

- `步骤一：`准备数据库表
  MyBatis是用来操作数据库表的，所以我们先来创建库和表

```sql
create database spring_db character set utf8;
use spring_db;
create table tbl_account(
    id int primary key auto_increment,
    name varchar(35),
    money double
);

INSERT INTO tbl_account(`name`,money) VALUES
('Tom',2800),
('Jerry',3000),
('Jhon',3100);
```

`步骤二：`创建项目导入依赖

```xml
<dependency>
    <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.13.2</version>
      <scope>test</scope>
    </dependency>
    <!-- https://mvnrepository.com/artifact/org.springframework/spring-context -->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context</artifactId>
      <version>6.1.14</version>
    </dependency>
    <dependency>
      <groupId>com.alibaba</groupId>
      <artifactId>druid</artifactId>
      <version>1.1.16</version>
    </dependency>
    <dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
      <version>8.0.28</version>
    </dependency>
    <dependency>
      <groupId>org.mybatis</groupId>
      <artifactId>mybatis</artifactId>
      <version>3.5.7</version>
    </dependency>
    <dependency>
      <groupId>org.aspectj</groupId>
      <artifactId>aspectjweaver</artifactId>
      <version>1.9.4</version>
    </dependency>
```

`步骤三：`根据表创建模型类

`步骤四：`创建Dao接口（在之前是Mapper接口，且要配置一个对应的xml文件，不过这里没涉及到复杂的sql语句，所以没配置xml文件，采用注解开发）

```java
public interface AccountDao {

    @Insert("insert into tbl_account(name, money) VALUES (#{name}, #{money})")
    void save(Account account);

    @Delete("delete from tbl_account where id = #{id}")
    void delete(Integer id);

    @Update("update tbl_account set `name` = #{name}, money = #{money}")
    void update(Account account);

    @Select("select * from tbl_account")
    List<Account> findAll();

    @Select("select * from tbl_account where id = #{id}")
    Account findById(Integer id);
}
```

`步骤五：`创建Service接口和实现类

`步骤六：`添加jdbc.properties文件

```java
jdbc.driver=com.mysql.cj.jdbc.Driver
jdbc.url=jdbc:mysql://localhost:3306/data_class_4?&useSSL=false&serverTimezone=UTC&characterEncoding=utf8&characterSetResults=utf8
jdbc.username=root
jdbc.password=123456
```

`步骤七：`添加Mybatis核心配置文件

```java
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <!--读取外部properties配置文件-->
    <properties resource="jdbc.properties"></properties>
    <!--别名扫描的包路径-->
    <typeAliases>
        <package name="com.blog.domain"/>
    </typeAliases>
    <!--数据源-->
    <environments default="mysql">
        <environment id="mysql">
            <transactionManager type="JDBC"></transactionManager>
            <dataSource type="POOLED">
                <property name="driver" value="${jdbc.driver}"></property>
                <property name="url" value="${jdbc.url}"></property>
                <property name="username" value="${jdbc.username}"></property>
                <property name="password" value="${jdbc.password}"></property>
            </dataSource>
        </environment>
    </environments>
    <!--映射文件扫描包路径-->
    <mappers>
        <package name="com.blog.dao"></package>
    </mappers>
</configuration>
```

`步骤八：`编写应用程序

```java
public class App {
    public static void main(String[] args) throws IOException {
        // 1. 创建SqlSessionFactoryBuilder对象
        SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
        // 2. 加载mybatis-config.xml配置文件
        InputStream inputStream = Resources.getResourceAsStream("mybatis-config.xml");
        // 3. 创建SqlSessionFactory对象
        SqlSessionFactory factory = sqlSessionFactoryBuilder.build(inputStream);
        // 4. 获取SqlSession
        SqlSession sqlSession = factory.openSession();
        // 5. 获取mapper
        AccountDao mapper = sqlSession.getMapper(AccountDao.class);
        //6. 执行方法进行查询
        Account account = mapper.findById(2);
        System.out.println(account);
        //7. 释放资源
        sqlSession.close();
    }
}
```

### 整合步骤

前面我们已经分析了Spring与Mybatis的整合，大体需要做两件事，

- 第一件事是：Spring要管理MyBatis中的SqlSessionFactory
- 第二件事是：Spring要管理Mapper接口的扫描

那我们下面就开始来整合

- `步骤一：`项目中导入整合需要的jar包

```xml
<dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-jdbc</artifactId>
      <version>6.1.14</version>
    </dependency>
    <dependency>
      <groupId>org.mybatis</groupId>
      <artifactId>mybatis-spring</artifactId>
      <version>1.3.0</version>
    </dependency>
```

`步骤二：`创建Spring的主配置类

```java
//配置类注解
@Configuration
//包扫描，主要扫描的是项目中的AccountServiceImpl类
@ComponentScan("com.blog")
public class SpringConfig {
}
```

`步骤三：`创建数据源的配置类
在配置类中完成数据源的创建

```java


public class JdbcConfig {
    @Value("${jdbc.driver}")
    private String driver;
    @Value("${jdbc.url}")
    private String url;
    @Value("${jdbc.username}")
    private String username;
    @Value("${jdbc.password}")
    private String password;

    @Bean
    public DataSource dataSource() {
        DruidDataSource dataSource = new DruidDataSource();
        dataSource.setDriverClassName(driver);
        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        return dataSource;
    }
}
```

- `步骤四：`主配置类中读properties并引入数据源配置类

  ```java
  
  @Configuration
  @ComponentScan("com.blog")
  @PropertySource("jdbc.properties")
  @Import(JdbcConfig.class)
  public class SpringConfig {
  }
  ```

- `步骤五：`创建Mybatis配置类并配置SqlSessionFactory

  ```java
  
  public class MyBatisConfig {
  
      @Bean
      public SqlSessionFactoryBean sqlSessionFactory(DataSource dataSource) {
          //定义bean，SqlSessionFactoryBean，用于产生SqlSessionFactory对象
          SqlSessionFactoryBean sqlSessionFactory = new SqlSessionFactoryBean();
          //设置模型类的别名扫描
          sqlSessionFactory.setTypeAliasesPackage("com.blog.domain");
          //设置数据源
          sqlSessionFactory.setDataSource(dataSource);
          return sqlSessionFactory;
      }
      //定义bean，返回MapperScannerConfigurer对象
      @Bean
      public MapperScannerConfigurer mapperScannerConfigurer() {
          MapperScannerConfigurer msc = new MapperScannerConfigurer();
          msc.setBasePackage("com.blog.dao");
          return msc;
      }
  }
  ```

- `sqlSessionFactory.setTypeAliasesPackage("com.blog.domain");`，替换掉配置文件中的

  ```xml
  
  <typeAliases>
      <package name="com.blog.domain"/>
  </typeAliases>
  ```

- `sqlSessionFactory.setDataSource(dataSource);`，替换掉配置文件中的

```xml
<environments default="mysql">
    <environment id="mysql">
        <transactionManager type="JDBC"></transactionManager>
        <dataSource type="POOLED">
            <property name="driver" value="${jdbc.driver}"></property>
            <property name="url" value="${jdbc.url}"></property>
            <property name="username" value="${jdbc.username}"></property>
            <property name="password" value="${jdbc.password}"></property>
        </dataSource>
    </environment>
</environments>
```

- `步骤六：`主配置类中引入Mybatis配置类

  ```java
  
  @Configuration
  @ComponentScan("com.blog")
  @PropertySource("jdbc.properties")
  @Import({JdbcConfig.class, MyBatisConfig.class})
  public class SpringConfig {
  }
  ```

- `步骤七：`编写运行类
  在运行类中，从IOC容器中获取Service对象，调用方法获取结果

  ```java
  
  public class App {
      public static void main(String[] args) throws IOException {
          AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(SpringConfig.class);
          AccountService accountService = context.getBean(AccountService.class);
          Account account = accountService.findById(1);
          System.out.println(account);
      }
  }
  ```

- `步骤八：`运行程序

## 案例:测量业务层接口万次执行效率

需求:测量业务层接口执行效率（执行时长）

分析:

1)业务功能:业务层接口执行前后分别记录时间，求差值得到执行效率

2)通知类型选择前后均可以得到增强的类型--**环绕通知**































































































































































































































































































































































































































































































































































