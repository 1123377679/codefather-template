# Servlet+MyBatis阶段性项目

## 项目搭建

**项目目录**

![image-20241022082005880](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241022082005880.png)

**pom.xml依赖**

```xml
<dependencies>
    <!-- junit测试 -->
    <dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.12</version>
      <scope>test</scope>
    </dependency>
    <!-- https://mvnrepository.com/artifact/javax.servlet/javax.servlet-api -->
    <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>javax.servlet-api</artifactId>
      <version>3.1.0</version>
      <scope>provided</scope>
    </dependency>
    <!-- https://mvnrepository.com/artifact/com.alibaba/fastjson -->
    <dependency>
      <groupId>com.alibaba</groupId>
      <artifactId>fastjson</artifactId>
      <version>1.2.83</version>
    </dependency>
    <!-- https://mvnrepository.com/artifact/mysql/mysql-connector-java -->
    <dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
      <version>8.0.28</version>
    </dependency>
    <!-- https://mvnrepository.com/artifact/com.alibaba/druid -->
    <dependency>
      <groupId>com.alibaba</groupId>
      <artifactId>druid</artifactId>
      <version>1.2.8</version>
    </dependency>
    <!-- https://mvnrepository.com/artifact/org.projectlombok/lombok -->
    <dependency>
      <groupId>org.projectlombok</groupId>
      <artifactId>lombok</artifactId>
      <version>1.18.24</version>
      <scope>provided</scope>
    </dependency>
    <!-- Mybatis核心 -->
    <dependency>
      <groupId>org.mybatis</groupId>
      <artifactId>mybatis</artifactId>
      <version>3.5.7</version>
    </dependency>
    <!-- log4j日志 -->
    <dependency>
      <groupId>log4j</groupId>
      <artifactId>log4j</artifactId>
      <version>1.2.17</version>
    </dependency>
  </dependencies>
```

**jdbc.properties**

```
jdbc.driver=com.mysql.cj.jdbc.Driver
jdbc.username=root
jdbc.password=123456
jdbc.url=jdbc:mysql://localhost:3306/data_class_4?&useSSL=false&serverTimezone=UTC&characterEncoding=utf8&characterSetResults=utf8
```

**log4j.xml**

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE log4j:configuration SYSTEM "log4j.dtd">
<log4j:configuration xmlns:log4j="http://jakarta.apache.org/log4j/">
    <appender name="STDOUT" class="org.apache.log4j.ConsoleAppender">
        <param name="Encoding" value="UTF-8" />
        <layout class="org.apache.log4j.PatternLayout">
            <param name="ConversionPattern" value="%-5p %d{MM-dd HH:mm:ss,SSS} %m (%F:%L) \n" />
        </layout>
    </appender>
    <logger name="java.sql">
        <level value="debug" />
    </logger>
    <logger name="org.apache.ibatis">
        <level value="info" />
    </logger>
    <root>
        <level value="debug" />
        <appender-ref ref="STDOUT" />
    </root>
</log4j:configuration>

```

**mybatis-config.xml**

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "https://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <properties resource="jdbc.properties"/>
<!--    <settings>-->
<!--        &lt;!&ndash;如果字段名有下划线，那就会自动转换成驼峰命名&ndash;&gt;-->
<!--        <setting name="mapUnderscoreToCamelCase" value="true"/>-->
<!--    </settings>-->
    <settings>
        <setting name="lazyLoadingEnabled" value="true"/>
    </settings>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="${jdbc.driver}"/>
                <property name="url" value="${jdbc.url}"/>
                <property name="username" value="${jdbc.username}"/>
                <property name="password" value="${jdbc.password}"/>
            </dataSource>
        </environment>
    </environments>
    <mappers>
<!--        <mapper resource=""></mapper>-->
        <package name="cn.lanqiao.mapper"/>
    </mappers>
</configuration>

```

## 项目工具类

**响应类**

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseUtils<T> {
    private Integer code; // 状态码 200 成功 304 失败
    private String message; // 信息 响应的信息结果
    private T data;//携带的数据

    public ResponseUtils(Integer code, String message) {
        this.code = code;
        this.message = message;
    }
}
```

**SqlSessionUtils(Mybatis工具类)**

```java
public class SqlSessionUtils {
    public static SqlSession getSqlSession(){
        try {
            InputStream resourceAsStream = Resources.getResourceAsStream("mybatis-config.xml");
            SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
            SqlSessionFactory build = sqlSessionFactoryBuilder.build(resourceAsStream);
            SqlSession sqlSession = build.openSession(true);
            return sqlSession;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }
}
```

## 前端页面导入

通过网盘分享的文件：studentmanager-master.7z
链接: https://pan.baidu.com/s/1AzfWfrJDRoDKE_fVyYZY6g 提取码: i8s9

导入网页源码到编码工具中

![image-20241022082448465](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241022082448465.png)

修改web.xml文件,访问登录页面

```xml
  <welcome-file-list>
    <welcome-file>login.html</welcome-file>
  </welcome-file-list>
```

## 设计数据库内容

```sql
/*
 Navicat Premium Dump SQL

 Source Server         : LMX
 Source Server Type    : MySQL
 Source Server Version : 80026 (8.0.26)
 Source Host           : localhost:3306
 Source Schema         : data_class_4

 Target Server Type    : MySQL
 Target Server Version : 80026 (8.0.26)
 File Encoding         : 65001

 Date: 22/10/2024 08:27:09
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_admin
-- ----------------------------
DROP TABLE IF EXISTS `t_admin`;
CREATE TABLE `t_admin`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '管理员序号',
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '管理员账号',
  `password` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '管理员密码',
  `nickname` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '管理员别名',
  `is_delete` int NOT NULL COMMENT '0:未删除 1:已删除',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '管理员表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of t_admin
-- ----------------------------
INSERT INTO `t_admin` VALUES (1, 'lmx', '123', '南岸彭于晏', 0);
INSERT INTO `t_admin` VALUES (2, 'admin', '123', '南岸周润发', 0);
INSERT INTO `t_admin` VALUES (3, 'xyg', '123', '三只羊莫学小杨哥', 0);
INSERT INTO `t_admin` VALUES (4, 'dyg', '123', '三只羊莫学小杨哥', 0);
INSERT INTO `t_admin` VALUES (5, 'dxl', '123', '三只羊莫学小杨哥', 0);
INSERT INTO `t_admin` VALUES (6, 'ffff', 'aaaa', '三只羊莫学小杨哥', 0);
INSERT INTO `t_admin` VALUES (7, 'aa', 'aaa', '三只羊莫学小杨哥', 0);
INSERT INTO `t_admin` VALUES (8, 'kr', '123', '三只羊莫学小杨哥', 0);
INSERT INTO `t_admin` VALUES (9, 'fff', '123', '三只羊莫学小杨哥', 0);
INSERT INTO `t_admin` VALUES (10, 'ddd', '123', '三只羊莫学小杨哥', 1);
INSERT INTO `t_admin` VALUES (19, 'kr', '23', '柯冉', 1);
INSERT INTO `t_admin` VALUES (20, 'ccc', '123', 'c某人', 1);
INSERT INTO `t_admin` VALUES (21, 'ddd', '123', 'ddd', 1);
INSERT INTO `t_admin` VALUES (22, 'lmx', '123', 'aaa', 1);
INSERT INTO `t_admin` VALUES (23, 'aa', 'aa', 'aa', 1);
INSERT INTO `t_admin` VALUES (24, 'cc', 'cc', 'cc', 1);
INSERT INTO `t_admin` VALUES (25, 'aaaa', 'aaa', 'aaa', 1);
INSERT INTO `t_admin` VALUES (26, 'aaa', 'aaa', 'aaa', 1);
INSERT INTO `t_admin` VALUES (27, 'ccc', 'ccc', 'ccc', 1);
INSERT INTO `t_admin` VALUES (28, 'hh', 'hh', 'hh', 1);
INSERT INTO `t_admin` VALUES (29, 'lmx', '123', '李某人', 0);

SET FOREIGN_KEY_CHECKS = 1;

```

## 登录功能实现

**实体类**

这里使用的是Servlet+DBUtils(JDBC)的方式实现

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TAdmin {

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
}
```

登录接口

```java
@Override
    public TAdmin toLogin(TAdmin tAdmin) {
        ArrayList<TAdmin> tAdmins = DBUtils.commonQuery(TAdmin.class, "select * from t_admin where username=? and password=?",
                tAdmin.getUsername(), tAdmin.getPassword());
        if (tAdmins.size() > 0 && tAdmins !=null){
            return tAdmins.get(0);
        }else {
            return null;
        }
    }
```

service接口省略

controller层

```java
TAdminService tAdminService = new TAdminServiceImpl();
@Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //处理请求和响应编码
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=utf-8");
        System.out.println("前端请求过来了 使用的是Post请求");
        //axios发送过来的参数都是JSON数据，后端需要进行一些处理,用FastJson来处理数据
        //使用数据流获取信息，再转化为字符串类型toString()，之后转化为json类型JSONObject.parseObject(str)，
        StringBuilder sb = new StringBuilder();
        BufferedReader reader = request.getReader();
        char[] buf = new char[1024];
        int len;
        while ((len = reader.read(buf)) != -1){
            sb.append(buf,0,len);
        }
        String str = sb.toString();
        // System.out.println(str);
        //将字符串对象转换成JSON对象
        JSONObject jsonObject = JSON.parseObject(str);//通过JSON对象的方法通过key获取value
        String username = jsonObject.getString("username");
        String password = jsonObject.getString("password");
        //去数据库查询是否正确
        // System.out.println(username+" "+password);//拿到username和password数据
        TAdmin tAdmin = new TAdmin(username,password);
        TAdmin login = tAdminService.toLogin(tAdmin);
        if (login != null){
            //登录成功
            // System.out.println("登录成功");
            //响应数据
            PrintWriter wr = response.getWriter();
            // wr.write("登录成功");//不符合规范,应该响应JSON数据
            ResponseUtils responseUtils = new ResponseUtils<>(200,"登录成功");
            //我们需要将对象转换成JSON对象
            String jsonString = JSON.toJSONString(responseUtils);
            //将转换好的JSON字符串发送给前端
            wr.write(jsonString);
        }else {
            // System.out.println("登录失败，用户名和密码错误");
            PrintWriter wr = response.getWriter();
            // wr.write("登录失败");
            ResponseUtils responseUtils = new ResponseUtils<>(304,"登录失败");
            String jsonString = JSON.toJSONString(responseUtils);
            wr.write(jsonString);
        }
    }
```

## 注册功能实现

接口

```java
 @Override
    public int register(TAdmin tAdmin) {
        int result= DBUtils.commonUpdate("insert into t_admin values(null,?,?,'三只羊莫学小杨哥',0)", tAdmin.getUsername(), tAdmin.getPassword());
        if (result>0){
            return 1;
        }else {
            return 0;
        }
    }
```

service接口省略

controller层

```java
TAdminService tAdminService = new TAdminServiceImpl();
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //处理请求和响应编码
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=utf-8");
        // System.out.println("注册请求过来了");
        StringBuilder sb = new StringBuilder();
        BufferedReader reader = request.getReader();
        char[] buf = new char[1024];
        int len;
        while ((len = reader.read(buf)) != -1){
            sb.append(buf,0,len);
        }
        String str = sb.toString();
        // System.out.println(str);
        //将字符串对象转换成JSON对象
        JSONObject jsonObject = JSON.parseObject(str);
        //通过JSON对象的方法通过key获取value
        String username = jsonObject.getString("username");
        String password = jsonObject.getString("password");
        //打印看是否能拿到前端传送过来的参数
        // System.out.println(username + " " + password);
        // 调用service接口
        TAdmin tAdmin = new TAdmin(username,password);
        //equalsIgnoreCase 不区分大小写
        //equals 区分大小写
            int register = tAdminService.register(tAdmin);
            if (register == 1){
                //注册成功
                // System.out.println("注册成功");
                //需要响应结果给到前端（怎么响应）
                ResponseUtils responseUtils = new ResponseUtils(200,"注册成功");
                String jsonString = JSON.toJSONString(responseUtils);
                PrintWriter wr = response.getWriter();
                wr.write(jsonString);
            }else {
                //注册失败
                // System.out.println("注册失败");
                //响应工具类(规范)
                ResponseUtils responseUtils = new ResponseUtils(305,"注册失败");
                //将响应的结果转换成JSON字符串
                String jsonString = JSON.toJSONString(responseUtils);
                //创建响应的对象，通过对象把JSON字符串给到前端
                PrintWriter wr = response.getWriter();
                wr.write(jsonString);
            }
    }
```

## 工具类用于处理HTTP请求中的JSON数据

```java
public class JsonRequestUtil {

    /**
     * 从HttpServletRequest中读取请求体，并将其转换为JSON对象。
     *
     * @param request HttpServletRequest对象
     * @return JSON对象
     * @throws IOException 如果读取请求体时发生IO异常
     */
    public static JSONObject readJsonFromRequest(HttpServletRequest request) throws IOException {
        StringBuilder sb = new StringBuilder();
        BufferedReader reader = request.getReader();
        char[] buf = new char[1024];
        int len;
        while ((len = reader.read(buf)) != -1) {
            sb.append(buf, 0, len);
        }
        String str = sb.toString();
        // 将字符串对象转换成JSON对象
        return JSON.parseObject(str);
    }

    /**
     * 从JSON对象中获取指定键的值。
     *
     * @param jsonObject JSON对象
     * @param key 键名
     * @param <T> 返回类型的泛型
     * @return 指定键的值
     */
    public static <T> T getJsonValue(JSONObject jsonObject, String key, Class<T> clazz) {
        return jsonObject.getObject(key, clazz);
    }
}
```

怎么使用

```java
@WebServlet("/your-endpoint")
public class YourServlet extends HttpServlet {
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            // 读取请求体并转换为JSON对象
            JSONObject jsonObject = JsonRequestUtil.readJsonFromRequest(request);

            // 从JSON对象中获取username字段
            String username = JsonRequestUtil.getJsonValue(jsonObject, "username", String.class);

            // 这里可以进行进一步的处理...
            System.out.println("Username: " + username);

            // 响应客户端
            response.setContentType("application/json");
            response.setCharacterEncoding("UTF-8");
            response.getWriter().write("{\"status\":\"success\",\"message\":\"User data received\"}");
        } catch (IOException e) {
            // 处理异常
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("{\"status\":\"error\",\"message\":\"Failed to parse request body\"}");
        }
    }
}
```

## 管理员CRUD

### **管理员查询**

mapper接口

```java
 /**
     * 查询所有
     */
    List<TAdmin> selectAll();
```

```xml
<mapper namespace="cn.lanqiao.mapper.TAdminMapper">
    <resultMap id="TAdminMapperResultMap" type="cn.lanqiao.pojo.TAdmin">
        <id property="id" column="id"/>
        <result property="nickname" column="nickname"/>
        <result property="password" column="password"/>
        <result property="username" column="username"/>
        <result property="isDelete" column="is_delete"/>
    </resultMap>

    <select id="selectAll" resultType="cn.lanqiao.pojo.TAdmin" resultMap="TAdminMapperResultMap">
        select * from t_admin where is_delete = 0
    </select>
</mapper>
```

service

```java
@Override
    public List<TAdmin> selectAll() {
        //在这里调用Mapper
        SqlSession sqlSession = SqlSessionUtils.getSqlSession();
        TAdminMapper tAdminMapper = sqlSession.getMapper(TAdminMapper.class);
        List<TAdmin> tAdmins = tAdminMapper.selectAll();
        // 业务逻辑的处理 ： 如果通过数据库查询出来的数据 为空 返回null 如果不为空 返回 查询出来的集合数据
        if (tAdmins != null){
            return tAdmins;
        }else {
            return null;
        }
    }
```

controller

```java
 //调用service
    TAdminService tAdminService = new TAdminServiceImpl();
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //处理请求和响应编码
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=utf-8");
        //查询所有用户信息
        List<TAdmin> tAdmins = tAdminService.selectAll();
        if (tAdmins == null){
            //数据有问题
            PrintWriter wr = response.getWriter();
            //响应工具类
            ResponseUtils responseUtils = new ResponseUtils<>(305,"管理员数据查询有误");
            //将responseUtils里面封装的数据转换成JSON数据响应给前端(fastJSON)
            String jsonString = JSON.toJSONString(responseUtils);
            wr.write(jsonString);
        }else {
            //数据没有问题
            PrintWriter wr = response.getWriter();
            ResponseUtils responseUtils = new ResponseUtils<>(200,"管理员数据查询成功",tAdmins);
            //将responseUtils里面封装的数据转换成JSON数据响应给前端(fastJSON)
            String jsonString = JSON.toJSONString(responseUtils);
            wr.write(jsonString);
        }
    }
```

前端页面渲染

```js
<!--第一步：前端发送请求应该使用什么技术 axios(AJAX)-->
<script src="../js/axios.min.js"></script>
<!--第二步:通过axios发送前端请求到服务器(后端)-->
<script>
  axios({
    // 这里是发送到后端的请求地址(url地址)
    url: "http://localhost:8080/tAdminServlet/select",
    method: "post"
  }).then((response) => {
    console.log(response)
    if (response.data.data && response.data.data.length > 0) {
      const data = response.data.data;
      const tableBody = document.querySelector('#adminTable');

      // 清空现有的表格内容
      tableBody.innerHTML = '';

      // 循环遍历数据并添加到表格
      data.forEach(user => {
        const row = document.createElement('tr');
        // 创建选择单元格
        const chooseCell = document.createElement('td');
        chooseCell.style.width = "6%";
        chooseCell.style.textAlign = "center";
        chooseCell.style.backgroundColor = "#EEEEEE"; // 设置背景颜色
        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.name = "delid"; // 设置name属性
        chooseCell.appendChild(checkbox);
        row.appendChild(chooseCell);

        // 创建ID单元格
        const idCell = document.createElement('td');
        idCell.width = "6%";
        idCell.style.textAlign = "center";
        idCell.innerHTML = '<input type="checkbox">';
        idCell.bgColor = '#EEEEEE'
        idCell.textContent = user.id;

        row.appendChild(idCell);

        // 创建用户名单元格
        const usernameCell = document.createElement('td');
        usernameCell.width = "6%";
        usernameCell.style.textAlign = "center";
        usernameCell.innerHTML = '<input type="checkbox">';
        usernameCell.bgColor = '#EEEEEE'
        usernameCell.textContent = user.username;
        row.appendChild(usernameCell);

        // 创建密码单元格
        const passwordCell = document.createElement('td');
        // passwordCell.textContent = '***';  // 为了安全起见，不显示真实密码
        passwordCell.width = "6%";
        passwordCell.style.textAlign = "center";
        passwordCell.innerHTML = '<input type="checkbox">';
        passwordCell.textContent = user.password;  // 为了安全起见，不显示真实密码
        passwordCell.bgColor = '#EEEEEE';
        row.appendChild(passwordCell);

        // 创建昵称单元格
        const nicknameCell = document.createElement('td');
        nicknameCell.width = "6%";
        nicknameCell.style.textAlign = "center";
        nicknameCell.innerHTML = '<input type="checkbox">';
        nicknameCell.textContent = user.nickname;
        nicknameCell.bgColor = '#EEEEEE'
        row.appendChild(nicknameCell);

        // 创建操作单元格
        const actionsCell = document.createElement('td');
        actionsCell.style.align = 'center'
        actionsCell.bgColor = '#EEEEEE'
        // 这里可以添加编辑、删除等按钮
        const editButton = document.createElement('button');
        editButton.bgColor = '#EEEEEE'
        editButton.textContent = '编辑';
        const deleteButton = document.createElement('button');
        deleteButton.bgColor = '#EEEEEE'
        deleteButton.textContent = '删除';

        // 可以在这里为按钮添加事件监听器
        // editButton.addEventListener('click', () => { /* 编辑逻辑 */ });
        // deleteButton.addEventListener('click', () => { /* 删除逻辑 */ });

        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);
        row.appendChild(actionsCell);

        // 将新行添加到表格主体
        tableBody.appendChild(row);
      });
    } else {
      alert('没有用户数据或数据为空');
    }
  }).catch((error) => {
    alert('请求失败：', error);
  });
</script>
```

### 管理员添加

Mapper

```java
 /**
     * 添加管理员
     */
    int insertTAdmin(TAdmin tAdmin);
```

```xml
<insert id="insertTAdmin">
        insert into t_admin values (null,#{username},#{password},#{nickname},0)
    </insert>
```

service

```java
@Override
    public int insertTAdmin(TAdmin tAdmin) {
        SqlSession sqlSession = null;
        try {
            // 获取SqlSession实例
            sqlSession = SqlSessionUtils.getSqlSession();
            // 获取TAdminMapper接口的实现
            TAdminMapper tAdminMapper = sqlSession.getMapper(TAdminMapper.class);
            // 执行插入操作
            int result = tAdminMapper.insertTAdmin(tAdmin);
            // 如果添加成功，则提交事务，并返回结果
            if (result > 0) {
                return result;  // 返回成功的结果
            } else {
                // 添加失败，返回0
                return 0;
            }
        } catch (Exception e) {
            // 处理异常，这里可以根据具体的异常类型做更细粒度的处理
            e.printStackTrace();  // 输出异常信息到控制台（或日志）
            // 可以根据需要抛出异常或返回一个错误码
            return 305;  // 或者定义一个常量表示错误
        } finally {
            // 确保SqlSession被关闭，防止资源泄露
            if (sqlSession != null) {
                sqlSession.close();
            }
        }
    }
```

controller

```java
@WebServlet("/tAdminServlet/register")
public class TAdminServletRegister extends HttpServlet {
    //调用service
    TAdminService tAdminService = new TAdminServiceImpl();
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //处理请求和响应编码
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=utf-8");
        //需要接收前端的三个参数
        StringBuilder sb = new StringBuilder();
        BufferedReader reader = request.getReader();
        char[] buf = new char[1024];
        int len;
        while ((len = reader.read(buf)) != -1) {
            sb.append(buf, 0, len);
        }
        String str = sb.toString();
        // System.out.println(str);
        //将字符串对象转换成JSON对象
        JSONObject jsonObject = JSON.parseObject(str);
        //通过JSON对象的方法通过key获取value
        String username = jsonObject.getString("username");
        String password = jsonObject.getString("password");
        String nickname = jsonObject.getString("nickname");
        // System.out.println(username +" "+password+" "+nickname);
        //拿到这三个参数，添加到数据库中
        int result = tAdminService.insertTAdmin(new TAdmin(username, password, nickname));
        if (result == 0) {
            //添加失败
            PrintWriter wr = response.getWriter();
            ResponseUtils responseUtils = new ResponseUtils<>(305, "添加管理员失败");
            String jsonString = JSON.toJSONString(responseUtils);
            wr.write(jsonString);
        } else if (result == 305) {
            PrintWriter wr = response.getWriter();
            ResponseUtils responseUtils = new ResponseUtils<>(305, "添加管理员异常");
            String jsonString = JSON.toJSONString(responseUtils);
            wr.write(jsonString);
        } else {
            //添加成功
            PrintWriter wr = response.getWriter();
            ResponseUtils responseUtils = new ResponseUtils<>(200, "添加管理员成功");
            String jsonString = JSON.toJSONString(responseUtils);
            wr.write(jsonString);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doGet(request, response);
    }
}
```

前端请求

```js
<input type="button" name="Submit" value="保存" class="button" onclick="registerButton()"  />

function registerButton(){
	//保存按钮
	let userText = document.querySelector("#userText").value;//管理员账号
	let passText = document.querySelector("#passText").value;//管理员密码
	let nickText = document.querySelector("#nickText").value;//管理员别名
	//console.log(userText,passText,nickText)//验证是否能够拿到三个参数
	//拿到参数之后就需要将他们发送给后端
	axios({
		url: "http://localhost:8080/tAdminServlet/register",
		method: "post",
		data: {
			username: userText,
			password: passText,
			nickname: nickText
		}
	}).then((response) => {
		if (response.data.code == '305'){
			alert("添加管理失败")
		}else {
			alert("添加管理员成功")
		}
	}).catch((error) => {
		alert('请求失败：', error);
	});
}
```

#### 管理员账号即时校验

前端发送请求

```js
如果我们想要获取输入框里面的内容，那我们就需要获取到name属性里面的值	-->
<input name="username" type="text" class="text" id="userText" style="width:154px" value="" />
<span style="color:red;" class="checkUsername"></span>

userText.onkeyup = function (){ //或者可以使用失去焦点事件
	// 校验管理账号输入框是否存在重复的数据
	let userText = document.querySelector("#userText");
	let checkUsername = document.querySelector(".checkUsername");
	//发送请求到后端去验证用户输入的内容是否存在在数据库中
	axios({
		url: "http://localhost:8080/tAdminServlet/checkUserName",
		method: "post",
		data: {
			username: userText.value,
		}
	}).then((response) => {
		if (response.data.code == '305'){
			checkUsername.innerText = '该管理员账号已存在'
			checkUsername.style.color = 'red'
		}else {
			checkUsername.innerText = '该管理员账号可用'
			checkUsername.style.color = 'green'
		}
	}).catch((error) => {
		alert('请求失败：', error);
	});
```

Mapper接口

```java
 /**
     * 校验用户名是否存在
     */
    List<TAdmin> checkUserName(String username);
```

```xml
<select id="checkUserName" resultType="cn.lanqiao.pojo.TAdmin">
        select * from t_admin where username = #{username} and is_delete = 0
    </select>
```

service

```java
@Override
    public List<TAdmin> checkUserName(String username) {
        SqlSession sqlSession = null;
        try {
            // 获取SqlSession实例
            sqlSession = SqlSessionUtils.getSqlSession();
            // 获取TAdminMapper接口的实现
            TAdminMapper tAdminMapper = sqlSession.getMapper(TAdminMapper.class);
            // 执行校验操作
            List<TAdmin> tAdmins = tAdminMapper.checkUserName(username);
            return tAdmins;
        } catch (Exception e) {
            // 处理异常，这里可以根据具体的异常类型做更细粒度的处理
            e.printStackTrace();  // 输出异常信息到控制台（或日志）
            // 可以根据需要抛出异常或返回一个错误码
        } finally {
            // 确保SqlSession被关闭，防止资源泄露
            if (sqlSession != null) {
                sqlSession.close();
            }
        }
        return null;
    }
```

controller

```java
@WebServlet("/tAdminServlet/checkUserName")
public class TAdminServletCheckUserName extends HttpServlet {
    TAdminService tAdminService = new TAdminServiceImpl();
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //处理请求和响应编码
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=utf-8");
        StringBuilder sb = new StringBuilder();
        BufferedReader reader = request.getReader();
        char[] buf = new char[1024];
        int len;
        while ((len = reader.read(buf)) != -1) {
            sb.append(buf, 0, len);
        }
        String str = sb.toString();
        // System.out.println(str);
        //将字符串对象转换成JSON对象
        JSONObject jsonObject = JSON.parseObject(str);
        //通过JSON对象的方法通过key获取value
        String username = jsonObject.getString("username");
        //校验username是否在数据库中存在
        List<TAdmin> tAdmins = tAdminService.checkUserName(username);
        if (tAdmins.size() > 0){
            //数据库中有相同的数据
            PrintWriter wr = response.getWriter();
            ResponseUtils responseUtils = new ResponseUtils<>(305, "该管理员账号重复");
            String jsonString = JSON.toJSONString(responseUtils);
            wr.write(jsonString);
        }else {
            //数据库中没有相同的数据
            PrintWriter wr = response.getWriter();
            ResponseUtils responseUtils = new ResponseUtils<>(200, "该管理员账号可用");
            String jsonString = JSON.toJSONString(responseUtils);
            wr.write(jsonString);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doGet(request, response);
    }
}
```

#### 管理账号即时校验完善(使用正则表达式	)

使用正则表达式去校验用户的输入是否正常

```js
//限制管理员账号的长度必须是6-10位，必须是英文和数字的组合(正则表达式)
let adminRegex = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,10}$/;
if (adminRegex.test(userText.value)){
		//只有当用户输入的账号满足正则表达式的时候咱们才会去发送axios请求去校验用户输入的账号是否存在
		//发送请求到后端去验证用户输入的内容是否存在在数据库中
		axios({
			url: "http://localhost:8080/tAdminServlet/checkUserName",
			method: "post",
			data: {
				username: userText.value,
			}
		}).then((response) => {
			if (response.data.code == '305'){
				checkUsername.innerText = '该管理员账号已存在'
				checkUsername.style.color = 'red'
			}else {
				checkUsername.innerText = '该管理员账号可用'
				checkUsername.style.color = 'green'
			}
		}).catch((error) => {
			alert('请求失败：', error);
		});
	}else {
		checkUsername.innerText = '该管理员账号必须是6-10位，并且需要英文和数字的组合'
		checkUsername.style.color = 'red'
	}
```

#### 完善添加账号的密码和别名的校验

```js
<td>管理员密码 :</td>
<td>
<input name="password" type="text" class="text" id="passText" style="width:154px" value=""/>
<span style="color:red;" class="checkPassWord checkMessage"></span>
</td>

<tr>
<td>管理员别名:</td>
<td>
<input class="text" id="nickText" type="nickname" name="nickname" style="width:154px" value=""/>
<span style="color:red;" class="checkNickName checkMessage"></span>
</td>
</tr>

//管理员密码校验
passText.onkeyup = function (){
	//校验密码的span
	let checkPassWord = document.querySelector(".checkPassWord");
	//密码长度为3到6位 并且可以包含任意字符（字母、数字或特殊字符）
	const passwordRegex = /^.{3,6}$/;
	if (passwordRegex.test(passText.value)){
		checkPassWord.innerText = '该管理员密码可用'
		checkPassWord.style.color = 'green'
	}else {
		checkPassWord.innerText = '该管理员密码需要长度为3-6位'
		checkPassWord.style.color = 'red'
	}
}
//管理员别名
nickText.onkeyup = function (){
	//校验密码的span
	let checkNickName = document.querySelector(".checkNickName");
	//判断别名不为空
	if (nickText.value != ''){
		checkNickName.innerText = '该管理员别名可用'
		checkNickName.style.color = 'green'
	}else {
		checkNickName.innerText = '该管理员别名不能为空'
		checkNickName.style.color = 'red'
	}
}
```

#### 提交按钮必须符合所有条件

第一种写法(可拓展性非常低)

```js
<form id="myForm" action="/your-action-url" method="post">
  <table border="0" cellpadding="2" cellspacing="1" style="width:100%">
    <tr>
      <td>管理员账号 :</td>
      <td>
        <input name="username" type="text" class="text" id="userText" style="width:154px;" value="" required />
        <span style="color:red;" class="checkUsername"></span>
      </td>
    </tr>
    <tr>
      <td>管理员密码 :</td>
      <td>
        <input name="password" type="password" class="text" id="passText" style="width:154px;" value="" required/>
        <span style="color:red;" class="checkPassWord"></span>
      </td>
    </tr>
    <tr>
      <td>管理员别名:</td>
      <td>
        <input class="text" id="nickText" type="text" name="nickname" style="width:154px;" value="" required/>
        <span style="color:red;" class="checkNickName"></span>
      </td>
    </tr>
    <tr>
      <td colspan="2">
        <button type="submit" id="submitButton">提交</button>
      </td>
    </tr>
  </table>
</form>



document.getElementById('submitButton').addEventListener('click', function(event) {
  let checkUsername = document.querySelector(".checkUsername");
  let checkPassWord = document.querySelector(".checkPassWord");
  let checkNickName = document.querySelector(".checkNickName");

  // 检查用户名、密码和昵称是否都为绿色
  if (checkUsername.style.color !== 'green' || checkPassWord.style.color !== 'green' || checkNickName.style.color !== 'green') {
    alert('请确保所有字段都符合要求！');
    event.preventDefault(); // 阻止表单提交
  }
});

// 管理员账号校验
document.getElementById('userText').onkeyup = function () {
  // ... （保持你原来的代码不变）
};

// 管理员密码校验
document.getElementById('passText').onkeyup = function () {
  // ... （保持你原来的代码不变）
};

// 管理员别名校验
document.getElementById('nickText').onkeyup = function () {
  // ... （保持你原来的代码不变）
};
```

第二种方式(推荐)：

**重构思路**

1. **使用类名**：为每个校验信息的`<span>`元素设置一个共同的类名。
2. **动态检测**：在提交表单时，动态地遍历这些`<span>`元素，检查它们的颜色是否都是绿色。
3. **事件委托**：可以使用事件委托来减少对每个输入框单独绑定事件处理器的需求。

首先，确保你的HTML中每个校验信息的`<span>`都有一个共同的类名，比如`checkMessage`：

```html
<tr>
<td>管理员账号 :</td>
<td>
<!--如果我们想要获取输入框里面的内容，那我们就需要获取到name属性里面的值	-->
<input name="username" type="text" class="text" id="userText" style="width:154px" value=""/>
<span style="color:red;" class="checkUsername checkMessage"></span>
</td>
</tr>
<tr>
<td>管理员密码 :</td>
<td>
<input name="password" type="text" class="text" id="passText" style="width:154px" value=""/>
<span style="color:red;" class="checkPassWord checkMessage"></span>
</td>
</tr>
<tr>
<td>管理员别名:</td>
<td>
<input class="text" id="nickText" type="nickname" name="nickname" style="width:154px" value=""/>
<span style="color:red;" class="checkNickName checkMessage"></span>
</td>
</tr>
```

```js
function registerButton(){
	//先获取三个input框span标签的元素
	// let checkUsername = document.querySelector(".checkUsername");
	// let checkPassWord = document.querySelector(".checkPassWord");
	// let checkNickName = document.querySelector(".checkNickName");
	let allCheckMessages = document.querySelectorAll('.checkMessage');
	let checkTrue = true;
	// 检查是否有任何一个span的颜色不是绿色
	for (let i = 0; i < allCheckMessages.length; i++) {
		if (allCheckMessages[i].style.color !== 'green') {
			checkTrue = false;
			alert('请确保所有字段都符合要求！');
			event.preventDefault(); // 阻止表单提交
			return;
		}
	}
	if (checkTrue == true){
		//保存按钮
		let userText = document.querySelector("#userText").value;//管理员账号
		let passText = document.querySelector("#passText").value;//管理员密码
		let nickText = document.querySelector("#nickText").value;//管理员别名
		//console.log(userText,passText,nickText)//验证是否能够拿到三个参数
		//拿到参数之后就需要将他们发送给后端
		axios({
			url: "http://localhost:8080/tAdminServlet/register",
			method: "post",
			data: {
				username: userText,
				password: passText,
				nickname: nickText
			}
		}).then((response) => {
			if (response.data.code == '305'){
				alert("添加管理失败")
			}else {
				alert("添加管理员成功")
			}
		}).catch((error) => {
			alert('请求失败：', error);
		});
	}
}
```

### 修改前端编辑页面

```js
 // 创建编辑按钮
        const editButton = document.createElement('button');
        editButton.textContent = '编辑';
        editButton.className = 'edit-button';
        editButton.setAttribute('data-id', user.id);
        editButton.setAttribute('data-username', user.username);
        editButton.setAttribute('data-password', user.password);
        editButton.setAttribute('data-nickname', user.nickname);

        // 绑定编辑按钮的点击事件
        document.querySelectorAll('.edit-button').forEach(button => {
          button.addEventListener('click', function(event) {
            event.preventDefault();
            const id = this.getAttribute('data-id');
            const username = this.getAttribute('data-username');
            const password = this.getAttribute('data-password');
            const nickname = this.getAttribute('data-nickname');

            // 显示模态框并填充数据
            document.getElementById('editId').value = id;
            document.getElementById('editUsername').value = username;
            document.getElementById('editPassword').value = password;
            document.getElementById('editNickname').value = nickname;

            document.getElementById('editModal').style.display = 'block';
          });
        });
        // 关闭模态框
        document.querySelector('.close').addEventListener('click', function() {
          document.getElementById('editModal').style.display = 'none';
        });

        document.querySelector('.cancel').addEventListener('click', function() {
          document.getElementById('editModal').style.display = 'none';
        });

        // 点击模态框外区域关闭模态框
        window.onclick = function(event) {
          const modal = document.getElementById('editModal');
          if (event.target === modal) {
            modal.style.display = 'none';
          }
        };
```

```html
<!-- 模态框 -->
  <div id="editModal" class="modal">
    <div class="modal-content">
      <span class="close">&times;</span>
      <h2>编辑管理员信息</h2>
      <form id="editForm">
        <label for="editId">编号:</label>
        <input type="text" id="editId" name="editId" readonly><br>
        <label for="editUsername">用户名:</label>
        <input type="text" id="editUsername" name="editUsername"><br>
        <label for="editPassword">密码:</label>
        <input type="password" id="editPassword" name="editPassword"><br>
        <label for="editNickname">昵称:</label>
        <input type="text" id="editNickname" name="editNickname"><br>
        <button type="submit">保存</button>
        <button type="button" class="cancel">取消</button>
      </form>
    </div>
  </div>
```

```css
	/* 模态框样式 */
    .modal {
      display: none;
      position: fixed;
      z-index: 1;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      overflow: auto;
      background-color: rgba(0,0,0,0.4);
    }

    .modal-content {
      background-color: #fefefe;
      margin: 15% auto;
      padding: 20px;
      border: 1px solid #888;
      width: 80%;
      max-width: 500px;
    }

    .close {
      color: #aaa;
      float: right;
      font-size: 28px;
      font-weight: bold;
    }

    .close:hover,
    .close:focus {
      color: black;
      text-decoration: none;
      cursor: pointer;
    }
```

### 管理员个人信息

1）通过后端发送cookie 携带id到前端页面

2）前端页面携带id发送axios请求到后端查询数据再响应给前端

前端代码

```js
<tr>
<td height="20" colspan="2" align="center" bgcolor="#EEEEEE" class="tablestyle_title">
个人信息列表 &nbsp;</td>
</tr>
<tr>
<td width="21%" height="20" align="right" bgcolor="#FFFFFF">姓名:</td>
<td width="74%" bgcolor="#FFFFFF" id="nickname"></td>
</tr>
<tr>
<td height="20" align="right" bgcolor="#FFFFFF">编号:</td>
<td bgcolor="#FFFFFF" id="userId"></td>
</tr>
<tr>
<td align="right" bgcolor="#FFFFFF">身份:</td>
<td bgcolor="#FFFFFF">管理员</td>
</tr>
<!--第一步：前端发送请求应该使用什么技术 axios(AJAX)-->
<script src="../js/axios.min.js"></script>
<script>
	// 传入cookie名能够拿到cookie的值
	function getCookieValue(name) {
		let value = `; ${document.cookie}`;
		let parts = value.split(`; ${name}=`);
		if (parts.length === 2) return parts.pop().split(';').shift();
	}
	let userId = getCookieValue("userId");
	//发送axios请求携带id到后端查询相关数据
	axios({
		// 这里是发送到后端的请求地址(url地址)
		url: "http://localhost:8080//tAdminServletSelectOne/selectById",
		method: "post",
		data: {
			userId : userId
		}
	}).then((response) => {
		// console.log(response)
		//渲染数据
		if (response.data.code == '200') {
			// 获取响应数据
			const data = response.data.data;
			// 渲染数据到页面
			document.getElementById('nickname').textContent = data.nickname;
			document.getElementById('userId').textContent = data.id; // 或者根据需要选择对应的字段
		} else {
			alert('请求成功，但没有数据返回');
		}
	}).catch((error) => {
		alert('请求失败：', error);
	});
</script>
```

后端代码

```java
@WebServlet("/tAdminServletSelectOne/selectById")
public class TAdminServletSelectOne extends HttpServlet {
    TAdminService tAdminService = new TAdminServiceImpl();
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //处理请求和响应编码
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=utf-8");
        // 读取请求体并转换为JSON对象
        JSONObject jsonObject = JsonRequestUtil.readJsonFromRequest(request);
        // 从JSON对象中获取相应的字段(userId)
        Integer userId = JsonRequestUtil.getJsonValue(jsonObject, "userId", Integer.class);
        TAdmin tAdmin = tAdminService.selectTAdminById(userId);
        if (tAdmin!=null){
            //数据没有问题
            PrintWriter wr = response.getWriter();
            ResponseUtils responseUtils = new ResponseUtils<>(200,"管理员根据Id数据查询成功",tAdmin);
            //将responseUtils里面封装的数据转换成JSON数据响应给前端(fastJSON)
            String jsonString = JSON.toJSONString(responseUtils);
            wr.write(jsonString);
        }else {
            //数据有问题
            PrintWriter wr = response.getWriter();
            //响应工具类
            ResponseUtils responseUtils = new ResponseUtils<>(305,"管理员根据Id数据查询有误");
            //将responseUtils里面封装的数据转换成JSON数据响应给前端(fastJSON)
            String jsonString = JSON.toJSONString(responseUtils);
            wr.write(jsonString);
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doGet(request, response);
    }
}
```

mapper

```xml
/**
     * 根据ID查询管理员信息
     */

TAdmin selectTAdminById(@Param("id") int id);


    <select id="selectTAdminById" resultType="cn.lanqiao.pojo.TAdmin">
        select * from t_admin where id = #{id} and is_delete = 0
    </select>
```

service

```java
    @Override
    public TAdmin selectTAdminById(int id) {
        SqlSession sqlSession = null;
        try {
            // 获取SqlSession实例
            sqlSession = SqlSessionUtils.getSqlSession();
            // 获取TAdminMapper接口的实现
            TAdminMapper tAdminMapper = sqlSession.getMapper(TAdminMapper.class);
            // 执行校验操作
            TAdmin tAdmin = tAdminMapper.selectTAdminById(id);
            if (tAdmin!=null){
                return tAdmin;
            }else {
                return null;
            }
        } catch (Exception e) {
            // 处理异常，这里可以根据具体的异常类型做更细粒度的处理
            e.printStackTrace();  // 输出异常信息到控制台（或日志）
            // 可以根据需要抛出异常或返回一个错误码
        } finally {
            // 确保SqlSession被关闭，防止资源泄露
            if (sqlSession != null) {
                sqlSession.close();
            }
        }
        return null;
    }
}
```





































































































