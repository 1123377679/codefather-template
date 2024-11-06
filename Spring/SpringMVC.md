# SpringMVC

SpringMVC是隶属于Spring框架的一部分，主要是用来进行Web开发，是对Servlet进行了封装。111

SpringMVC是处于Web层的框架，所以其主要作用就是用来接收前段发过来的请求和数据，然后经过处理之后将处理结果响应给前端，所以如何处理情趣和响应是SpringMVC中非常重要的一块内容。

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







