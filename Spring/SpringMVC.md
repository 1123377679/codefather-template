# SpringMVC

SpringMVC是隶属于Spring框架的一部分，主要是用来进行Web开发，是对Servlet进行了封装。

SpringMVC是处于Web层的框架，所以其主要作用就是用来接收前端发过来的请求和数据，然后经过处理之后将处理结果响应给前端，所以如何处理请求和响应是SpringMVC中非常重要的一块内容。

REST是一种软件架构风格，可以降低开发的复杂性，提高系统的可伸缩性，后期的应用也是非常广泛。

对于SpringMVC的学习，`最终要达成的目标：`

1. 掌握基于SpringMVC获取请求参数和响应JSON数据操作
2. 熟练应用基于REST风格的请求路径设置与参数传递
3. 能根据实际业务建立前后端开发通信协议，并进行实现
4. 基于Springboot+SSM整合技术开发任意业务模块功能

## SpringMVC概述

学习SpringMVC我们先来回顾下现在Web程序是如何做的，我们现在的Web程序大都基于MVC三层架构来实现的。

![image-20241104210346807](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241104210346807.png)

- 如果所有的处理都交给Servlet来处理的话，所有的东西都耦合在一起，对后期的维护和扩展极其不利
  - 所以将后端服务器Servlet拆分成三层，分别是web、service和、dao层
    - `web`层主要由`servlet`来处理，负责页面请求和数据的收集以及响应结果给前端
    - `service`层主要负责业务逻辑的处理
    - `dao`层主要负责数据的增删改查操作
- 但`servlet`处理请求和数据时，存在一个问题：一个`servlet`只能处理一个请求
- 针对web层进行优化，采用MVC设计模式，将其设计为Controller、View和Model
  - `controller`负责请求和数据的接收，接收后将其转发给`service`进行业务处理
  - `service`根据需要会调用`dao`对数据进行增删改查
  - `dao`把数据处理完后，将结果交给`service`，`service`再交给`controller`
  - `controller`根据需求组装成`Model`和`View`，`Model`和`View`组合起来生成页面，转发给前端浏览器
  - 这样做的好处就是`controller`可以处理多个请求，并对请求进行分发，执行不同的业务操作

随着互联网的发展，上面的模式因为是同步调用，性能慢慢的跟不是需求，所以异步调用慢慢的走到了前台，是现在比较流行的一种处理方式。

![image-20241104210511745](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241104210511745.png)

- 因为是异步调用，所以后端不需要返回View视图，将其去除
- 前端如果通过异步调用的方式进行交互，后端就需要将返回的数据转换成JSON格式进行返回
- SpringMVC主要负责的就是
  - controller如何接收请求和数据
  - 如何将请求和数据转发给业务层
  - 如何将响应数据转换成JSON发挥到前端
- SpringMVC是一种基于Java实现MVC模型的轻量级Web框架
  - 优点
    - 使用简单、开发快捷（相比较于Servlet）
    - 灵活性强

这里说的优点，我们通过下面的讲解与联系慢慢体会

## SpringMVC入门案例

因为SpringMVC是一个Web框架，将来是要替换Servlet,所以先来回顾下以前Servlet是如何进行开发的?

1. 创建web工程(Maven结构)
2. 设置tomcat服务器，加载web工程(tomcat插件)
3. 导入坐标(Servlet)
4. 定义处理请求的功能类(UserServlet)
5. 设置请求映射(配置映射关系)

SpringMVC的制作过程和上述流程几乎是一致的，具体的实现流程是什么?

1. 创建web工程(Maven结构)
2. 设置tomcat服务器，加载web工程(tomcat插件)
3. 导入坐标(SpringMVC+Servlet)
4. 定义处理请求的功能类(UserController)
5. 设置请求映射(配置映射关系)
6. 将SpringMVC设定加载到Tomcat容器中

### 案例制作

- `步骤一：`创建Maven项目
- `步骤二：`导入所需坐标(SpringMVC+Servlet)
  在`pom.xml`中导入下面两个坐标

```xml
<!--servlet-->
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>3.1.0</version>
    <scope>provided</scope>
</dependency>
<!--springmvc-->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>5.3.23</version>
</dependency>
```

`步骤三：`创建SpringMVC控制器类（等同于我们前面做的Servlet）

```java
//定义Controller，使用@Controller定义Bean
@Controller
public class UserController {
    //设置当前访问路径，使用@RequestMapping
    @RequestMapping("/save")
    //设置当前对象的返回值类型
    @ResponseBody
    public String save(){
        System.out.println("user save ...");
        return "{'module':'SpringMVC'}";
    }
}
```

`步骤四：`初始化SpringMVC环境（同Spring环境），设定SpringMVC加载对应的Bean

```java
//创建SpringMVC的配置文件，加载controller对应的bean
@Configuration
//
@ComponentScan("com.blog.controller")
public class SpringMvcConfig {

}
```

`步骤五：`初始化Servlet容器，加载SpringMVC环境，并设置SpringMVC技术处理的请求

```java
//定义一个servlet容器的配置类，在里面加载Spring的配置，继承AbstractDispatcherServletInitializer并重写其方法
public class ServletContainerInitConfig extends AbstractDispatcherServletInitializer {
    //加载SpringMvc容器配置
    protected WebApplicationContext createServletApplicationContext() {
        AnnotationConfigWebApplicationContext context = new AnnotationConfigWebApplicationContext();
        context.register(SpringMvcConfig.class);
        return context;
    }
    //设置哪些请求归SpringMvc处理
    protected String[] getServletMappings() {
        //所有请求都交由SpringMVC处理
        return new String[]{"/"};
    }

    //加载Spring容器配置
    protected WebApplicationContext createRootApplicationContext() {
        return null;
    }
}
```

- `步骤六：`访问`http://localhost:8080/save`
  页面上成功出现`{'info':'springmvc'}`，至此我们的SpringMVC入门案例就完成了

>注意事项
>
>- SpringMVC是基于Spring的，在pom.xml只导入了`spring-webmvc`jar包的原因是它会自动依赖spring相关坐标
>
>- `AbstractDispatcherServletInitializer`类是SpringMVC提供的快速初始化Web3.0容器的抽象类
>
>- `AbstractDispatcherServletInitializer`
>
>  提供了三个接口方法供用户实现
>
>  - `createServletApplicationContext`方法，创建Servlet容器时，加载SpringMVC对应的bean并放入`WebApplicationContext`对象范围中，而`WebApplicationContext`的作用范围为`ServletContext`范围，即整个web容器范围
>  - `getServletMappings`方法，设定SpringMVC对应的请求映射路径，即SpringMVC拦截哪些请求
>  - `createRootApplicationContext`方法，如果创建Servlet容器时需要加载非SpringMVC对应的bean，使用当前方法进行，使用方式和`createServletApplicationContext`相同。
>
>- `createServletApplicationContext`用来加载SpringMVC环境
>
>- `createRootApplicationContext`用来加载Spring环境

知识点1：`@Controller`

| 名称 |          @Controller          |
| :--: | :---------------------------: |
| 类型 |            类注解             |
| 位置 |   SpringMVC控制器类定义上方   |
| 作用 | 设定SpringMVC的核心控制器bean |

知识点2：`@RequestMapping`

|   名称   |         @RequestMapping         |
| :------: | :-----------------------------: |
|   类型   |        类注解或方法注解         |
|   位置   | SpringMVC控制器类或方法定义上方 |
|   作用   | 设置当前控制器方法请求访问路径  |
| 相关属性 |    value(默认)，请求访问路径    |

知识点3：`@ResponseBody`

| 名称 |                  @ResponseBody                   |
| :--: | :----------------------------------------------: |
| 类型 |                 类注解或方法注解                 |
| 位置 |         SpringMVC控制器类或方法定义上方          |
| 作用 | 设置当前控制器方法响应内容为当前返回值，无需解析 |

### 入门案例小结

- 一次性工作
  - 创建工程，设置服务器，加载工程
  - 导入坐标
  - 创建web容器启动类，加载SpringMVC配置，并设置SpringMVC请求拦截路径
  - SpringMVC核心配置类（设置配置类，扫描controller包，加载Controller控制器bean）
- 多次工作
  - 定义处理请求的控制器类
  - 定义处理请求的控制器方法，并配置映射路径（@RequestMapping）与返回json数据（@ResponseBody）

### 工作流程解析

这里将SpringMVC分为两个阶段来分析，分别是`启动服务器初始化过程`和`单次请求过程`

#### 启动服务器初始化过程

1.服务器启动，执行ServletContainerInitConfig类，初始化web容器

- 功能类似于web.xml

```java
public class ServletContainerInitConfig extends AbstractDispatcherServletInitializer {

    protected WebApplicationContext createServletApplicationContext() {
        AnnotationConfigWebApplicationContext context = new AnnotationConfigWebApplicationContext();
        context.register(SpringMvcConfig.class);
        return context;
    }

    protected String[] getServletMappings() {
        return new String[]{"/"};
    }

    protected WebApplicationContext createRootApplicationContext() {
        return null;
    }
}
```

2.执行createServletApplicationContext方法，创建了WebApplicationContext对象

- 该方法加载SpringMVC的配置类SpringMvcConfig来初始化SpringMVC的容器

```java
protected WebApplicationContext createServletApplicationContext() {
    AnnotationConfigWebApplicationContext context = new AnnotationConfigWebApplicationContext();
    context.register(SpringMvcConfig.class);
    return context;
}
```

3.加载SpringMvcConfig配置类

```java
@Configuration
@ComponentScan("com.blog.controller")
public class SpringMvcConfig {

}
```

4.执行@ComponentScan加载对应的bean

- 扫描指定包及其子包下所有类上的注解，如Controller类上的`@Controller`注解

5.加载`UserController`，每个`@RequestMapping`的名称对应一个具体的方法

此时就建立了 `/save` 和 `save()`方法的对应关系

```java
@Controller
public class UserController {
    @RequestMapping("/save")
    @ResponseBody
    public String save(){
        System.out.println("user save ...");
        return "{'module':'SpringMVC'}";
    }
}
```

6.执行`getServletMappings`方法，设定SpringMVC拦截请求的路径规则

`/`代表所拦截请求的路径规则，只有被拦截后才能交给SpringMVC来处理请求

```java
protected String[] getServletMappings() {
    return new String[]{"/"};
}
```

#### 单次请求过程

1. 发送请求`http://localhost:8080/save`
2. web容器发现该请求满足SpringMVC拦截规则，将请求交给SpringMVC处理
3. 解析请求路径/save
4. 由/save匹配执行对应的方法save()
   
   - 上面的第5步已经将请求路径和方法建立了对应关系，通过`/save`就能找到对应的`save()`方法
5. 执行`save()`
6. 检测到有`@ResponseBody`直接将`save()`方法的返回值作为响应体返回给请求方

## SpringMVC-bean加载控制

### 问题分析

入门案例的内容已经做完了，在入门案例中我们创建过一个`SpringMvcConfig`的配置类，在之前学习Spring的时候也创建过一个配置类`SpringConfig`。这两个配置类都需要加载资源，那么它们分别都需要加载哪些内容?

我们先来回顾一下项目结构
`com.blog`下有`config`、`controller`、`service`、`dao`这四个包

config目录存入的是配置类，写过的配置类有:

- ServletContainersInitConfig
- SpringConfig
- SpringMvcConfig
- JdbcConfig
- MybatisConfig

- `controller`目录存放的是`SpringMVC`的`controller`类
- `service`目录存放的是`service`接口和实现类
- `dao`目录存放的是`dao/Mapper`接口

controller、service和dao这些类都需要被容器管理成bean对象，那么到底是该让`SpringMVC`加载还是让`Spring`加载呢?

- SpringMVC

  控制的bean

  - 表现层bean,也就是`controller`包下的类

- Spring

  控制的bean

  - 业务bean(`Service`)
  - 功能bean(`DataSource`,`SqlSessionFactoryBean`,`MapperScannerConfigurer`等)

分析清楚谁该管哪些bean以后，接下来要解决的问题是如何让`Spring`和`SpringMVC`分开加载各自的内容。

### 思路分析

对于上面的问题，解决方案也比较简单

- 加载Spring控制的bean的时候，`排除掉`SpringMVC控制的bean

那么具体该如何实现呢？

- 方式一：Spring加载的bean设定扫描范围`com.blog`，排除掉`controller`包内的bean
- 方式二：Spring加载的bean设定扫描范围为精确扫描，具体到`service`包，`dao`包等
- 方式三：不区分Spring与SpringMVC的环境，加载到同一个环境中(`了解即可`)

### 环境准备

在入门案例的基础上追加一些类来完成环境准备

```xml
<dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.13.2</version>
      <scope>test</scope>
    </dependency>
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-context</artifactId>
      <version>5.3.23</version>
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
    <dependency>
      <groupId>org.projectlombok</groupId>
      <artifactId>lombok</artifactId>
      <version>1.18.24</version>
      <scope>provided</scope>
    </dependency>
<!--整合需要使用的jar包-->
    <dependency>
      <groupId>org.springframework</groupId>
      <artifactId>spring-jdbc</artifactId>
      <version>5.3.23</version>
    </dependency>
    <dependency>
      <groupId>org.mybatis</groupId>
      <artifactId>mybatis-spring</artifactId>
      <version>1.3.0</version>
    </dependency>
```

`com.blog.config`下新建`SpringConfig`类

```java
@Configuration
@ComponentScan("com.blog")
public class SpringConfig {
}
```

新建`com.blog.service`，`com.blog.dao`，`com.blog.domain`包，并编写如下几个类

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TAdmin implements Serializable {

  private Integer id;
  private String username;
  private String password;
  private String nickname;
  private Integer isDelete;

  public TAdmin(String username, String password) {
    this.username = username;
    this.password = password;
  }

  public TAdmin(String username, String password, String nickname) {
    this.username = username;
    this.password = password;
    this.nickname = nickname;
  }

  public TAdmin(Integer id, String username, String password, String nickname) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.nickname = nickname;
  }
}

public interface TAdminDao {
    @Select("select * from t_admin where is_delete = 0")
    List<TAdmin> selectAll();
}

public interface TAdminService {
    List<TAdmin> selectAll();
}

@Service
public class TAdminServiceImpl implements TAdminService {
    @Autowired
    private TAdminDao tAdminDao;
    @Override
    public List<TAdmin> selectAll() {
        List<TAdmin> tAdmins = tAdminDao.selectAll();
        return tAdmins;
    }
}
```

编写App运行类

```java
public class App {
    public static void main(String[] args) throws IOException {
        ApplicationContext ctx = new AnnotationConfigApplicationContext(SpringConfig.class);
        TAdminService tAdminService = ctx.getBean(TAdminService.class);
        List<TAdmin> tAdmins = tAdminService.selectAll();
        System.out.println(tAdmins);
    }
}
```

### 设置Bean加载控制

运行App运行类，如果Spring配置类扫描到了UserController类，则会正常输出，否则将报错

当前配置环境下，将正常输出

- 解决方案一：修改Spring配置类，设定扫描范围为精准范围

  ```java
  
  @Configuration
  @ComponentScan({"com.blog.dao","com.blog.service"})
  public class SpringConfig {
  }
  ```

  再次运行App运行类，报错`NoSuchBeanDefinitionException`，说明Spring配置类没有扫描到

  UserController，目的达成

最后一个问题，有了Spring的配置类，要想在tomcat服务器启动将其加载，我们需要修改

ServletContainersInitConfig

```java
public class ServletContainerInitConfig extends AbstractDispatcherServletInitializer {
    //加载SpringMvc配置
    protected WebApplicationContext createServletApplicationContext() {
        AnnotationConfigWebApplicationContext context = new AnnotationConfigWebApplicationContext();
        context.register(SpringMvcConfig.class);
        return context;
    }
    //设置哪些请求归SpringMvc处理
    protected String[] getServletMappings() {
        return new String[]{"/"};
    }

    //加载Spring容器配置
    protected WebApplicationContext createRootApplicationContext() {
        AnnotationConfigWebApplicationContext context = new AnnotationConfigWebApplicationContext();
        context.register(SpringConfig.class);
        return context;
    }
}
```

对于上面的`ServletContainerInitConfig`配置类，Spring还提供了一种更简单的配置方式，可以不用再去创

建`AnnotationConfigWebApplicationContext`对象，不用手动`register`对应的配置类

我们改用继承它的子类`AbstractAnnotationConfigDispatcherServletInitializer`，然后重写三个方法即可

```java
public class ServletContainerInitConfig extends AbstractAnnotationConfigDispatcherServletInitializer {

    protected Class<?>[] getRootConfigClasses() {
        return new Class[]{SpringConfig.class};
    }

    protected Class<?>[] getServletConfigClasses() {
        return new Class[]{SpringMvcConfig.class};
    }

    protected String[] getServletMappings() {
        return new String[]{"/"};
    }
}
```

## PostMan工具的使用

- 官网下载：https://www.postman.com/downloads/

### PostMan使用

#### 创建WorkSpace工作空间

![image-20241105191852631](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241105191852631.png)

#### 发送请求

![image-20241105191919873](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241105191919873.png)



#### 保存当前请求

![image-20241105191944967](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241105191944967.png)

## 请求与响应

前面我们已经完成了入门案例相关的知识学习，接来了我们就需要针对SpringMVC相关的知识点进行系统的学习。
SpringMVC是web层的框架，主要的作用是接收请求、接收数据、响应结果。

所以这部分是学习SpringMVC的重点内容，这里主要会讲解四部分内容:

- 请求映射路径
- 请求参数
- 日期类型参数传递
- 响应JSON数据

### 设置请求映射路径

#### 环境准备

- 创建一个Maven项目
- 导入坐标
  这里暂时只导`servlet`和`springmvc`的就行

```xml
<!--servlet-->
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>3.1.0</version>
    <scope>provided</scope>
</dependency>
<!--springmvc-->
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>5.2.10.RELEASE</version>
</dependency>
```

编写UserController和BookController

```java
@Controller
public class UserController {

    @RequestMapping("/save")
    @ResponseBody
    public String save(){
        System.out.println("user save ..");
        return "{'module':'user save'}";
    }

    @RequestMapping("/delete")
    @ResponseBody
    public String delete(){
        System.out.println("user delete ..");
        return "{'module':'user delete'}";
    }
}

@Controller
public class UserController {

    @RequestMapping("/save")
    @ResponseBody
    public String save(){
        System.out.println("user save ..");
        return "{'module':'user save'}";
    }

    @RequestMapping("/delete")
    @ResponseBody
    public String delete(){
        System.out.println("user delete ..");
        return "{'module':'user delete'}";
    }
}
```

创建`SpringMvcConfig`配置类

```java
@Configuration
@ComponentScan("com.blog.controller")
public class SpringMvcConfig {
}
```

创建`ServletContainersInitConfig`类，初始化web容器

```java
public class ServletContainersInitConfig extends AbstractAnnotationConfigDispatcherServletInitializer {
    protected Class<?>[] getRootConfigClasses() {
        return new Class[0];
    }

    protected Class<?>[] getServletConfigClasses() {
        return new Class[]{SpringMvcConfig.class};
    }

    protected String[] getServletMappings() {
        return new String[]{"/"};
    }
}
```

直接启动Tomcat服务器，会报错

>com.blog.controller.UserController#save()
>to { /save}: There is already ‘bookController’ bean method
>com.blog.controller.BookController#save() mapped.

从错误信息可以看出:

- `UserController`有一个save方法，访问路径为`http://localhost/save`
- `BookController`也有一个save方法，访问路径为`http://localhost/save`
- 当访问`http://localhost/save`的时候，到底是访问`UserController`还是`BookController`?

#### 问题分析

团队多人开发，每人设置不同的请求路径，冲突问题该如何解决?

- 解决思路:为不同模块设置模块名作为请求路径前置
  - 对于Book模块的save,将其访问路径设置`http://localhost/book/save`
  - 对于User模块的save,将其访问路径设置`http://localhost/user/save`

这样在同一个模块中出现命名冲突的情况就比较少了。

#### 设置映射路径

- 修改Controller

```java
@Controller
@RequestMapping("/user")
public class UserController {

    @RequestMapping("/save")
    @ResponseBody
    public String save(){
        System.out.println("user save ..");
        return "{'module':'user save'}";
    }

    @RequestMapping("/delete")
    @ResponseBody
    public String delete(){
        System.out.println("user delete ..");
        return "{'module':'user delete'}";
    }
}
@Controller
@RequestMapping("/book")
public class BookController {

    @RequestMapping("/save")
    @ResponseBody
    public String save(){
        System.out.println("book save ..");
        return "{'module':'book save'}";
    }
}
```

>注意:
>
>- 当类上和方法上都添加了`@RequestMapping`注解，前端发送请求的时候，要和两个注解的value值相加匹配才能访问到。
>- `@RequestMapping`注解value属性前面加不加`/`都可以

### 请求参数

请求路径设置好后，只要确保页面发送请求地址和后台Controller类中配置的路径一致，就可以接收到前端

的请求，接收到请求后，如何接收页面传递的参数?

关于请求参数的传递与接收是和请求方式有关系的，目前比较常见的两种请求方式为：

- `GET`
- `POST`

针对于不同的请求前端如何发送，后端如何接收?

#### GET发送单个参数

- 启动Tomcat服务器，发送请求与参数：http://localhost/commonParam?name=Jerry
- 接收参数

```java
@Controller
public class UserController {

    @RequestMapping("/commonParam")
    @ResponseBody
    public String commonParam(String name){
        System.out.println("普通参数传递name --> " + name);
        return "{'module':'commonParam'}";
    }
}
```

注意get请求的key需与commonParam中的形参名一致

控制台输出`普通参数传递name --> Jerry`



#### GET发送多个参数

- 发送请求与参数：`localhost:8080/user/commonParam?name=Jerry&age=18`
- 接收参数

```java
@Controller
@RequestMapping("/user")
public class UserController {

    @RequestMapping("/commonParam")
    @ResponseBody
    public String commonParam(String name,int age){
        System.out.println("普通参数传递name --> " + name);
        System.out.println("普通参数传递age --> " + age);
        return "{'module':'commonParam'}";
    }
}
```

#### POST发送参数

![image-20241106203554834](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241106203554834.png)

接收参数
和GET一致，不用做任何修改

```java
@Controller
@RequestMapping("/user")
public class UserController {

    @RequestMapping("/commonParam")
    @ResponseBody
    public String commonParam(String name,int age){
        System.out.println("普通参数传递name --> " + name);
        System.out.println("普通参数传递age --> " + age);
        return "{'module':'commonParam'}";
    }
}
```

- POST请求中文乱码
  如果我们在发送post请求的时候，使用了中文，则会出现乱码

```java
public class ServletContainersInitConfig extends AbstractAnnotationConfigDispatcherServletInitializer {
    protected Class<?>[] getRootConfigClasses() {
        return new Class[0];
    }

    protected Class<?>[] getServletConfigClasses() {
        return new Class[]{SpringMvcConfig.class};
    }

    protected String[] getServletMappings() {
        return new String[]{"/"};
    }

    //处理乱码问题
    @Override
    protected Filter[] getServletFilters() {
        CharacterEncodingFilter filter = new CharacterEncodingFilter();
        filter.setEncoding("utf-8");
        return new Filter[]{filter};
    }
}
```

### 五种类型参数传递

前面我们已经能够使用GET或POST来发送请求和数据，所携带的数据都是比较简单的数据，接下来在这个基础上，我们来研究一些比较复杂的参数传递，常见的参数种类有

- 普通类型
- POJO类型参数
- 嵌套POJO类型参数
- 数组类型参数
- 集合类型参数

#### 普通类型

普通参数：url地址传参，地址参数名与形参变量名相同，定义形参即可接收参数。

- 发送请求与参数：`localhost:8080/user/commonParam?name=Helsing&age=1024`
- 后台接收参数

```java
@Controller
@RequestMapping("/user")
public class UserController {

    @RequestMapping("/commonParam")
    @ResponseBody
    public String commonParam(String name,int age){
        System.out.println("普通参数传递name --> " + name);
        System.out.println("普通参数传递age --> " + age);
        return "{'module':'commonParam'}";
    }
}
```

如果形参与地址参数名不一致该如何解决?例如地址参数名为`username`，而形参变量名为`name`，因为前端给的是`username`，后台接收使用的是`name`,两个名称对不上，会导致接收数据失败

- 解决方案：使用@RequestParam注解
  - 发送请求与参数：`localhost:8080/user/commonParam?username=Helsing&age=1024`
  - 后台接收参数

```java
@Controller
@RequestMapping("/user")
public class UserController {

    @RequestMapping("/commonParam")
    @ResponseBody
    public String commonParam(@RequestParam("username") String name, int age){
        System.out.println("普通参数传递name --> " + name);
        System.out.println("普通参数传递age --> " + age);
        return "{'module':'commonParam'}";
    }
}
```

#### POJO数据类型

简单数据类型一般处理的是参数个数比较少的请求，如果参数比较多，那么后台接收参数的时候就比较复杂，这个时候我们可以考虑使用POJO数据类型。

- POJO参数：请求参数名与形参对象属性名相同，定义POJO类型形参即可接收参数

- 发送请求和参数：`localhost:8080/user/pojoParam?name=Helsing&age=1024`
- 后台接收参数

```java
//POJO参数：请求参数与形参对象中的属性对应即可完成参数传递
@RequestMapping("/pojoParam")
@ResponseBody
public String pojoParam(User user){
    System.out.println("POJO参数传递user --> " + user);
    return "{'module':'pojo param'}";
}
```

#### 嵌套POJO类型

- 嵌套POJO参数：请求参数名与形参对象属性名相同，按照对象层次结构关系即可接收嵌套POJO属性参数
- 发送请求和参数：`localhost:8080/user/pojoParam?name=Helsing&age=1024&address.province=Beijing&address.city=Beijing`
- 后台接收参数

```java
@RequestMapping("/pojoParam")
@ResponseBody
public String pojoParam(User user){
    System.out.println("POJO参数传递user --> " + user);
    return "{'module':'pojo param'}";
}
```

#### 数组类型

举个简单的例子，如果前端需要获取用户的爱好，爱好绝大多数情况下都是多选，如何发送请求数据和接收数据呢?

- 数组参数：请求参数名与形参对象属性名相同且请求参数为多个，定义数组类型即可接收参数

- 发送请求和参数：`localhost:8080/user/arrayParam?hobbies=sing&hobbies=jump&hobbies=rap&hobbies=basketball`
- 后台接收参数

```java
@RequestMapping("/arrayParam")
@ResponseBody
public String arrayParam(String[] hobbies){
    System.out.println("数组参数传递user --> " + Arrays.toString(hobbies));
    return "{'module':'array param'}";
}
```

#### 集合类型

数组能接收多个值，那么集合是否也可以实现这个功能呢?

- 发送请求和参数：`localhost:8080/user/listParam?hobbies=sing&hobbies=jump&hobbies=rap&hobbies=basketball`

- 后台接收参数

  ```java
  @RequestMapping("/listParam")
  @ResponseBody
  public String listParam(List hobbies) {
      System.out.println("集合参数传递user --> " + hobbies);
      return "{'module':'list param'}";
  }
  ```

>运行程序，报错`java.lang.IllegalArgumentException: Cannot generate variable name for non-typed Collection parameter type`

- 错误原因：SpringMVC将List看做是一个POJO对象来处理，将其创建一个对象并准备把前端的数据封装到对象中，但是List是一个接口无法创建对象，所以报错。

解决方案是：使用`@RequestParam`注解

```java
@RequestMapping("/listParam")
@ResponseBody
public String listParam(@RequestParam List hobbies) {
    System.out.println("集合参数传递user --> " + hobbies);
    return "{'module':'list param'}";
}
```

知识点：`@RequestParam`

|   名称   |                   @RequestParam                   |
| :------: | :-----------------------------------------------: |
|   类型   |                     形参注解                      |
|   位置   |          SpringMVC控制器方法形参定义前面          |
|   作用   |       绑定请求参数与处理器方法形参间的关系        |
| 相关参数 | required：是否为必传参数 defaultValue：参数默认值 |

### JSON数据传输参数

现在比较流行的开发方式为异步调用。前后台以异步方式进行交换，传输的数据使用的是JSON，所以前端如果发送的是JSON数据，后端该如何接收?

对于JSON数据类型，我们常见的有三种:

- json普通数组（[“value1”,”value2”,”value3”,…]）
- json对象（{key1:value1,key2:value2,…}）
- json对象数组（[{key1:value1,…},{key2:value2,…}]）

下面我们就来学习以上三种数据类型，前端如何发送，后端如何接收

#### JSON普通数组

`步骤一：`导入坐标

```java
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.9.0</version>
</dependency>
```

`步骤二:`**开启SpringMVC注解支持**
使用`@EnableWebMvc`，在SpringMVC的配置类中开启SpringMVC的注解支持，这里面就包含了将JSON转换成对象的功能。

```java
@Configuration
@ComponentScan("com.blog.controller")
//开启json数据类型自动转换
@EnableWebMvc
public class SpringMvcConfig {
}
```

`步骤三：`PostMan发送JSON数据

![image-20241110224812260](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241110224812260.png)

`步骤四：`后台接收参数，参数前添加`@RequestBody`
使用`@RequestBody`注解将外部传递的json数组数据映射到形参的集合对象中作为数据

```java
@RequestMapping("/jsonArrayParam")
@ResponseBody
public String jsonArrayParam(@RequestBody List<String> hobbies) {
    System.out.println("JSON数组参数传递hobbies --> " + hobbies);
    return "{'module':'json array param'}";
}
```

#### JSON对象

```json
{
    "name":"菲茨罗伊",
    "age":"27",
    "address":{
        "city":"萨尔沃",
        "province":"外域"
    }
}
```

接收请求和参数

```java
@RequestMapping("/jsonPojoParam")
@ResponseBody
public String jsonPojoParam(@RequestBody User user) {
    System.out.println("JSON对象参数传递user --> " + user);
    return "{'module':'json pojo param'}";
}
```

#### JSON对象数组

```json
[
    {
        "name":"菲茨罗伊",
        "age":"27",
        "address":{
            "city":"萨尔沃",
            "province":"外域"
        }
    },
    {
        "name":"地平线",
        "age":"136",
        "address":{
            "city":"奥林匹斯",
            "province":"外域"
        }
    }
]
```

```java
@RequestMapping("/jsonPojoListParam")
@ResponseBody
public String jsonPojoListParam(@RequestBody List<User> users) {
    System.out.println("JSON对象数组参数传递user --> " + users);
    return "{'module':'json pojo list param'}";
}
```

#### 小结

SpringMVC接收JSON数据的实现步骤为:

1. 导入jackson包
2. 开启SpringMVC注解驱动，在配置类上添加`@EnableWebMvc`注解
3. 使用PostMan发送JSON数据
4. Controller方法的参数前添加`@RequestBody`注解

知识点1：`@EnableWebMvc`

| 名称 |       @EnableWebMvc       |
| :--: | :-----------------------: |
| 类型 |        配置类注解         |
| 位置 |  SpringMVC配置类定义上方  |
| 作用 | 开启SpringMVC多项辅助功能 |

知识点2：`@RequestBody`

| 名称 |                         @RequestBody                         |
| :--: | :----------------------------------------------------------: |
| 类型 |                           形参注解                           |
| 位置 |               SpringMVC控制器方法形参定义前面                |
| 作用 | 将请求中请求体所包含的数据传递给请求参数，此注解一个处理器方法只能使用一次 |

`@RequestBody`与`@RequestParam`区别

- 区别
  - `@RequestParam`用于接收url地址传参，表单传参【application/x-www-form-urlencoded】
  - `@RequestBody`用于接收json数据【application/json】
- 应用
  - 后期开发中，发送json格式数据为主，`@RequestBody`应用较广
  - 如果发送非json格式数据，选用`@RequestParam`接收请求参数

### 响应

SpringMVC接收到请求和数据后，进行一些了的处理，当然这个处理可以是转发给Service，Service层再调

用Dao层完成的，不管怎样，处理完以后，都需要将结果告知给用户。

比如：根据用户ID查询用户信息、查询用户列表、新增用户等。

对于响应，主要就包含两部分内容：

- 响应页面
- 响应数据
  - 文本数据
  - json数据

因为异步调用是目前常用的主流方式，所以我们需要更关注的就是如何返回JSON数据，对于其他只需要认识了解即可。

#### 响应JSON数据

响应POJO对象

```java
@RequestMapping("toJsonPojo")
@ResponseBody
public User toJsonPojo(){
    System.out.println("返回json对象数据");
    User user = new User();
    user.setName("Helsing");
    user.setAge(9527);
    return user;
}
```

返回值为实体类对象，设置返回值为实体类类型，即可实现返回对应对象的json数据，需要依赖`@ResponseBody`注解和`@EnableWebMvc`注解

访问`http://localhost:8080/toJsonPojo`，页面上成功出现JSON类型数据

`HttpMessageConverter`接口帮我们实现了对象与JSON之间的转换工作，我们只需要在`SpringMvcConfig`配置类上加上`@EnableWebMvc`注解即可

响应POJO集合对象

```java
@RequestMapping("toJsonList")
@ResponseBody
public List<User> toJsonList(){
    List<User> users = new ArrayList<User>();

    User user1 = new User();
    user1.setName("马文");
    user1.setAge(27);
    users.add(user1);

    User user2 = new User();
    user2.setName("马武");
    user2.setAge(28);
    users.add(user2);

    return users;
}
```

说明:

- 该注解可以写在类上或者方法上
- 写在类上就是该类下的所有方法都有`@ReponseBody`功能
- 当方法上有@ReponseBody注解后
  - 方法的返回值为字符串，会将其作为文本内容直接响应给前端
  - 方法的返回值为对象，会将对象转换成JSON响应给前端

此处又使用到了类型转换，内部还是通过`HttpMessageConverter`接口完成的，所以`Converter`除了前面所说的功能外，它还可以实现:

- 对象转Json数据(POJO -> json)
- 集合转Json数据(Collection -> json)

## REST风格

### REST简介

REST，表现形式状态转换，它是一种软件架构`风格`

当我们想表示一个网络资源时，可以使用两种方式：

- 传统风格资源描述形式
  - `http://localhost/user/getById?id=1` 查询id为1的用户信息
  - `http://localhost/user/saveUser` 保存用户信息
- REST风格描述形式
  - `http://localhost/user/1`
  - `http://localhost/user`

传统方式一般是一个请求url对应一种操作，这样做不仅麻烦，而且也不安全，通过请求的`URL`地址，就大

致能推测出该`URL`实现的是什么操作

反观REST风格的描述，请求地址变简洁了，而且只看请求`URL`并不很容易能猜出来该url的具体功能



所以`REST`的优点有：

- 隐藏资源的访问行为，无法通过地址得知该资源是何种操作
- 书写简化

那么问题也随之而来，一个相同的`URL`地址既可以是增加操作，也可以是修改或者查询，那么我们该如何区分该请求到底是什么操作呢？

- 按照REST风格访问资源时，使用行为动作区分对资源进行了各种操作
  - `http://localhost/users` 查询全部用户信息 `GET`（查询）
  - `http://localhost/users/1` 查询指定用户信息 `GET`（查询）
  - `http://localhost/users` 添加用户信息 `POST`（新增/保存）
  - `http://localhost/users` 修改用户信息 `PUT`（修改/更新）
  - `http://localhost/users/1` 删除用户信息 `DELETE`（删除）

>注意：
>
>- 上述行为是约定方式，约定不是规范，约定可以打破，所以成为REST风格，而不是REST
>
>  规范
>
>  - REST提供了对应的架构方式，按照这种架构方式设计项目可以降低开发的复杂性，提高系统的可伸缩性
>  - REST中规定`GET`/`POST`/`PUT`/`DELETE`针对的是查询/新增/修改/删除，但如果我们非要使用`GET`请求做删除，这点在程序上运行是可以实现的
>  - 但是如果大多数人都遵循这种风格，你不遵循，那你写的代码在别人看来就有点莫名其妙了，所以最好还是遵循REST风格
>
>- 描述模块的名称通常使用复数，也就是加s的格式描述，表示此类的资源，而非单个的资源，例如`users`、`books`、`accounts`..

搞清楚了什么是REST风格后，后面会经常提到一个概念叫`RESTful`，那么什么是`RESTful`呢？

- 根据REST风格对资源进行访问称为`RESTful`

在我们后期的开发过程中，大多数都是遵循`REST`风格来访问我们的后台服务。

### RESTful入门案例

- 新建一个web的maven项目
- 导入坐标

```java
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>javax.servlet-api</artifactId>
    <version>3.1.0</version>
    <scope>provided</scope>
</dependency>
<dependency>
    <groupId>org.springframework</groupId>
    <artifactId>spring-webmvc</artifactId>
    <version>5.2.10.RELEASE</version>
</dependency>
<dependency>
    <groupId>com.fasterxml.jackson.core</groupId>
    <artifactId>jackson-databind</artifactId>
    <version>2.9.0</version>
</dependency>
```

创建对应的配置类

ServletContainersInitConfig

```java
public class ServletContainersInitConfig extends AbstractAnnotationConfigDispatcherServletInitializer {
    protected Class<?>[] getRootConfigClasses() {
        return new Class[0];
    }

    protected Class<?>[] getServletConfigClasses() {
        return new Class[]{SpringMvcConfig.class};
    }

    protected String[] getServletMappings() {
        return new String[]{"/"};
    }

    //乱码处理
    @Override
    protected Filter[] getServletFilters() {
        CharacterEncodingFilter filter = new CharacterEncodingFilter();
        filter.setEncoding("utf-8");
        return new Filter[]{filter};
    }
}
```

SpringMvcConfig

```java
@Configuration
@ComponentScan("com.blog.controller")
//开启JSON数据类型自动转换
@EnableWebMvc
public class SpringMvcConfig {
}
```

编写模型类User

```java
public class User {
    private String name;
    private int age;

    public User() {
    }

    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
```

编写`UserController`

```java
@Controller
public class UserController {
    @RequestMapping("/save")
    @ResponseBody
    public String save(@RequestBody User user){
        System.out.println("user save ..." + user);
        return "{'module':'user save'}";
    }
    @RequestMapping("/delete")
    @ResponseBody
    public String delete(Integer id){
        System.out.println("user delete ..." + id);
        return "{'module':'user delete'}";
    }
    @RequestMapping("/update")
    @ResponseBody
    public String update(@RequestBody User user){
        System.out.println("user update ..." + user);
        return "{'module':'user update'}";
    }
    @RequestMapping("/getById")
    @ResponseBody
    public String getById(Integer id){
        System.out.println("user getById ..." + id);
        return "{'module':'user getById'}";
    }
    @RequestMapping("/getAll")
    @ResponseBody
    public String getAll(){
        System.out.println("user getAll ...");
        return "{'module':'user getAll'}";
    }
}
```

#### 思路分析

需求:将之前的增删改查替换成`RESTful`的开发方式。

1. 之前不同的请求有不同的路径,现在要将其修改为统一的请求路径
   - 修改前: 新增：`/save`，修改: `/update`，删除 `/delete`..
   - 修改后: 增删改查：`/users`
2. 根据`GET`查询、`POST`新增、`PUT`修改、`DELETE`删除对方法的请求方式进行限定
3. 发送请求的过程中如何设置请求参数?

#### 修改RESTful风格

**新增**

将请求路径更改为`/users`，并设置当前请求方法为`POST`

```java
@RequestMapping(value = "/users", method = RequestMethod.POST)
@ResponseBody
public String save(@RequestBody User user) {
    System.out.println("user save ..." + user);
    return "{'module':'user save'}";
}
```

使用method属性限定该方法的访问方式为`POST`，如果使用`GET`请求将报错

发送POST请求与参数：

```json
{
    "name":"菲茨罗伊",
    "age":"27"
}
```

**删除**

将请求路径更改为`/users`，并设置当前请求方法为`DELETE`

```java
@RequestMapping(value = "/delete",method = RequestMethod.DELETE)
@ResponseBody
public String delete(Integer id){
    System.out.println("user delete ..." + id);
    return "{'module':'user delete'}";
}
```

- 但是现在的删除方法没有携带所要删除数据的id，所以针对RESTful的开发，如何携带数据参数?

- 修改@RequestMapping的value属性，将其中修改为`/users/{id}`，目的是和路径匹配
- 在方法的形参前添加`@PathVariable`注解

```java
@RequestMapping(value = "/users/{id}",method = RequestMethod.DELETE)
@ResponseBody
public String delete(@PathVariable Integer id){
    System.out.println("user delete ..." + id);
    return "{'module':'user delete'}";
}
```

**修改**

将请求路径更改为`/users`，并设置当前请求方法为`PUT`

```java
@RequestMapping(value = "/users",method = RequestMethod.PUT)
@ResponseBody
public String update(@RequestBody User user){
    System.out.println("user update ..." + user);
    return "{'module':'user update'}";
}
```

发送`PUT`请求`localhost:8080/users`，访问并携带参数

```json
{
    "name":"菲茨罗伊",
    "age":"27"
}
```

**根据ID查询**

将请求路径更改为`/users/{id}`，并设置当前请求方法为`GET`

```java
@RequestMapping(value = "/users/{id}",method = RequestMethod.GET)
@ResponseBody
public String getById(@PathVariable Integer id){
    System.out.println("user getById ..." + id);
    return "{'module':'user getById'}";
}
```

发送`GET`请求访问`localhost:8080/users/2077`

**查询所有**

将请求路径更改为`/users`，并设置当前请求方法为`GET`

```java
@RequestMapping(value = "/users",method = RequestMethod.GET)
@ResponseBody
public String getAll(){
    System.out.println("user getAll ...");
    return "{'module':'user getAll'}";
}
```

发送`GET`请求访问`localhost:8080/users`

**总结代码**

```java
@Controller
public class UserController {
    @RequestMapping(value = "/users", method = RequestMethod.POST)
    @ResponseBody
    public String save(@RequestBody User user) {
        System.out.println("user save ..." + user);
        return "{'module':'user save'}";
    }


    @RequestMapping(value = "/users/{id}/{name}",method = RequestMethod.DELETE)
    @ResponseBody
    public String delete(@PathVariable("id") Integer userId,@PathVariable String name){
        System.out.println("user delete ..." + userId + ":" + name);
        return "{'module':'user delete'}";
    }

    @RequestMapping(value = "/users",method = RequestMethod.PUT)
    @ResponseBody
    public String update(@RequestBody User user){
        System.out.println("user update ..." + user);
        return "{'module':'user update'}";
    }

    @RequestMapping(value = "/users/{id}",method = RequestMethod.GET)
    @ResponseBody
    public String getById(@PathVariable Integer id){
        System.out.println("user getById ..." + id);
        return "{'module':'user getById'}";
    }

    @RequestMapping(value = "/users",method = RequestMethod.GET)
    @ResponseBody
    public String getAll(){
        System.out.println("user getAll ...");
        return "{'module':'user getAll'}";
    }
}
```

从整体代码来看，有些臃肿，好多代码都是重复的，下一小节我们就会来解决这个问题

#### 小结

RESTful入门案例，我们需要记住的内容如下:

1. 设定Http请求动作(动词)

   ```java
   
   @RequestMapping(value="",method = RequestMethod.POST|GET|PUT|DELETE)
   ```

2. 设定请求参数(路径变量)

   ```java
   
   @RequestMapping(value="/users/{id}",method = RequestMethod.DELETE)
   @ReponseBody
   public String delete(@PathVariable Integer id){
   }
   ```

知识点：`@PathVariable`

| 名称 |                        @PathVariable                         |
| :--: | :----------------------------------------------------------: |
| 类型 |                           形参注解                           |
| 位置 |               SpringMVC控制器方法形参定义前面                |
| 作用 | 绑定路径参数与处理器方法形参间的关系，要求路径参数名与形参名一一对应 |

关于接收参数，我们学过三个注解`@RequestBody`、`@RequestParam`、`@PathVariable`，这三个注解之间的区别和应用分别是什么?

- 区别
  - `@RequestParam`用于接收url地址传参或表单传参
  - `@RequestBody`用于接收JSON数据
  - `@PathVariable`用于接收路径参数，使用{参数名称}描述路径参数
- 应用
  - 后期开发中，发送请求参数超过1个时，以JSON格式为主，`@RequestBody`应用较广
  - 如果发送非JSON格式数据，选用`@RequestParam`接收请求参数
  - 采用`RESTful`进行开发，当参数数量较少时，例如1个，可以采用`@PathVariable`接收请求路径变量，通常用于传递id值

### RESTful快速开发

做完了上面的`RESTful`的开发，就感觉好麻烦，主要体现在以下三部分

- 每个方法的@RequestMapping注解中都定义了访问路径/users,重复性太高。
  - 解决方案：将`@RequestMapping`提到类上面，用来定义所有方法共同的访问路径。
- 每个方法的@RequestMapping注解中都要使用method属性定义请求方式，重复性太高。
  - 解决方案：使用`@GetMapping`、`@PostMapping`、`@PutMapping`、`@DeleteMapping`代替
- 每个方法响应json都需要加上@ResponseBody注解，重复性太高。
  - 解决方案：
    - 将`@ResponseBody`提到类上面，让所有的方法都有`@ResponseBody`的功能
    - 使用`@RestController`注解替换`@Controller`与`@ResponseBody`注解，简化书写

修改后的代码

```java
@RestController
@RequestMapping("/users")
public class UserController {
    @PostMapping
    public String save(@RequestBody User user) {
        System.out.println("user save ..." + user);
        return "{'module':'user save'}";
    }

    @DeleteMapping("/{id}/{name}")
    public String delete(@PathVariable("id") Integer userId, @PathVariable String name) {
        System.out.println("user delete ..." + userId + ":" + name);
        return "{'module':'user delete'}";
    }

    @PutMapping()
    public String update(@RequestBody User user) {
        System.out.println("user update ..." + user);
        return "{'module':'user update'}";
    }

    @GetMapping("/{id}")
    public String getById(@PathVariable Integer id) {
        System.out.println("user getById ..." + id);
        return "{'module':'user getById'}";
    }

    @GetMapping
    public String getAll() {
        System.out.println("user getAll ...");
        return "{'module':'user getAll'}";
    }
}
```

### RESTful案例

















































































































































