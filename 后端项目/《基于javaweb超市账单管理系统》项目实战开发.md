# 《基于javaweb超市账单管理系统》项目实战开发

## 超市账单管理系统-用户登录

### 创建用户信息表

![image-20230223142024221](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202304201118069.png)

### 创建项目的开发环境

maven

```maven
<dependency>
      <groupId>junit</groupId>
      <artifactId>junit</artifactId>
      <version>4.11</version>
      <scope>test</scope>
    </dependency>

    <dependency>
      <groupId>javax.servlet</groupId>
      <artifactId>javax.servlet-api</artifactId>
      <version>3.1.0</version>
      <scope>provided</scope>
    </dependency>

    <!-- MySQL驱动 -->
    <dependency>
      <groupId>mysql</groupId>
      <artifactId>mysql-connector-java</artifactId>
      <version>8.0.15</version>
    </dependency>

    <!-- log4j日志 -->
    <dependency>
      <groupId>log4j</groupId>
      <artifactId>log4j</artifactId>
      <version>1.2.17</version>
    </dependency>
    <!--JSP坐标 -->
    <dependency>
      <groupId>javax.servlet.jsp</groupId>
      <artifactId>jsp-api</artifactId>
      <version>2.2</version>
      <scope>provided</scope>
    </dependency>
    <!-- jstl    -->
    <dependency>
      <groupId>jstl</groupId>
      <artifactId>jstl</artifactId>
      <version>1.2</version>
    </dependency>
```

### 创建项目结构

![image-20230223142159678](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202304201118799.png)

login.html登录页面引入项目资源里面来

```html
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!doctype html>
<html  class="x-admin-sm">
<head>
    <meta charset="UTF-8">
    <title>后台登录-X-admin2.2</title>
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width,user-scalable=yes, minimum-scale=0.4, initial-scale=0.8,target-densitydpi=low-dpi" />
    <meta http-equiv="Cache-Control" content="no-siteapp" />
    <link rel="stylesheet" href="/css/font.css">
    <link rel="stylesheet" href="/css/login.css">
    <link rel="stylesheet" href="/css/xadmin.css">
    <script type="text/javascript" src="/js/jquery.min.js"></script>
    <script src="/lib/layui/layui.js" charset="utf-8"></script>
    <!--[if lt IE 9]>
    <script src="https://cdn.staticfile.org/html5shiv/r29/html5.min.js"></script>
    <script src="https://cdn.staticfile.org/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body class="login-bg">

<div class="login layui-anim layui-anim-up">
    <div class="message">x-admin2.0-管理登录</div>
    <div id="darkbannerwrap"></div>

    <form method="post" class="layui-form" >
        <input name="username" placeholder="用户名"  type="text" lay-verify="required" class="layui-input" >
        <hr class="hr15">
        <input name="password" lay-verify="required" placeholder="密码"  type="password" class="layui-input">
        <hr class="hr15">
        <input value="登录" lay-submit lay-filter="login" style="width:100%;" type="submit">
        <hr class="hr20" >
    </form>
</div>

<script>
    $(function  () {
        layui.use('form', function(){
            var form = layui.form;
            // layer.msg('玩命卖萌中', function(){
            //   //关闭后的操作
            //   });
            //监听提交
            form.on('submit(login)', function(data){
                // alert(888)
                layer.msg(JSON.stringify(data.field),function(){
                    location.href='index.html'
                });
                return false;
            });
        });
    })
</script>
<!-- 底部结束 -->
<script>
    //百度统计可去掉
    var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?b393d153aeb26b46e9431fabaf0f6190";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
</script>
</body>
</html>
```

### 创建用户的实体层

Users

```Java
	private Integer id;
    private String username;
    private String password;
    private Integer sex;
    private String birthday;
    private String phone;
    private String address;
    private Integer type;
    private Integer isdelete;
```

### 用户登录的dao层

UserDao

```java
/**
     * 用户登录
     */
    Users login(Users users);
```

jdbc.properties

```java
driverName=com.mysql.cj.jdbc.Driver
url=jdbc:mysql://localhost:3306/supermarket_db?characterEncoding=UTF-8&useSSL=false&serverTimezone=Asia/Shanghai&allowMultiQueries=true&zeroDateTimeBehavior=CONVERT_TO_NULL
userName=root
passWord=123456
```

DButils操作数据库

```java
package cn.lanqiao.utils;

import java.io.IOException;
import java.lang.reflect.Field;
import java.sql.*;
import java.util.ArrayList;
import java.util.Properties;

public class DButils {
    private static final String url;
    private static final String username;
    private static final String password;

    static {
        //获取DBConfig.properties中的数据
        Properties p = new Properties();
        try {
            p.load(DButils.class.getClassLoader().getResourceAsStream("jdbc.properties"));
        } catch (IOException e) {
            e.printStackTrace();
        }
        String driverName = p.getProperty("driverName");
        url = p.getProperty("url");
        username = p.getProperty("userName");
        password = p.getProperty("passWord");

        try {
            //加载驱动包
            Class.forName(driverName);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    //获取Connection对象
    public static Connection getConnection() throws SQLException {

        Connection connection = local.get();

        if (connection == null) {
            connection = DriverManager.getConnection(url, username, password);

            //设置事务隔离级别
            connection.setTransactionIsolation(Connection.TRANSACTION_REPEATABLE_READ);

            local.set(connection);
        }

        return connection;
    }

    //关闭资源
    public static void close(Connection connection, Statement statement, ResultSet resultSet) {
        if (resultSet != null) {
            try {
                resultSet.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if (statement != null) {
            try {
                statement.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        if (connection != null) {
            try {
                //判断连接是否开启事务
                if (connection.getAutoCommit()) {//没有开启
                    connection.close();
                    local.set(null);
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    private static final ThreadLocal<Connection> local = new ThreadLocal<>();

    // 开启事务
    public static void startTransaction() throws SQLException {
        //获取连接对象
        Connection connection = getConnection();
        //开启事务
        connection.setAutoCommit(false);

    }

    //提交事务
    public static void commit() throws SQLException {
        Connection connection = local.get();
        connection.commit();
        connection.close();
        local.set(null);
    }

    //回滚事务
    public static void rollback() throws SQLException {
        Connection connection = local.get();
        connection.rollback();
        connection.close();
        local.set(null);
    }


    /**
     * 根据条件查询总数
     * @param sql
     * @param param
     * @return
     */
    public static int commonQueryCount(String sql, Object... param) {
        Connection connection = null;
        PreparedStatement statement = null;
        ResultSet resultSet = null;
        int count = 0;
        try {
            connection = getConnection();
            //设置sql语句
            statement = connection.prepareStatement(sql);
            //设置参数
            for (int i = 0; i < param.length; i++) {
                statement.setObject(i + 1, param[i]);
            }
            resultSet = statement.executeQuery();
            if (resultSet.next()) {
                count = resultSet.getInt(1);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            DButils.close(connection, statement, resultSet);
        }
        return count;
    }


    //insert into student(name,sex,age,....) values(?,?,?,?,?)
    //inset into user(username,password) values(?,?)

    //主键回填
    public static int commonInsert(String sql, Object... param) {

        Connection connection = null;
        PreparedStatement statement = null;
        ResultSet resultSet = null;

        try {
            connection = getConnection();

            //设置sql语句，设置主键回填
            statement = connection.prepareStatement(sql, PreparedStatement.RETURN_GENERATED_KEYS);
            //设置参数
            for (int i = 0; i < param.length; i++) {
                statement.setObject(i + 1, param[i]);
            }
            statement.executeUpdate();

            //获取主键
            resultSet = statement.getGeneratedKeys();

            if (resultSet.next()) {
                int primaryKey = resultSet.getInt(1);
                return primaryKey;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            DButils.close(connection, statement, null);
        }
        return -1;
    }

    //更新方法(添加、删除、修改)
    public static int commonUpdate(String sql, Object... param) {
        Connection connection = null;
        PreparedStatement statement = null;

        try {
            connection = getConnection();
            statement = connection.prepareStatement(sql);
            for (int i = 0; i < param.length; i++) {
                statement.setObject(i + 1, param[i]);
            }
            int num = statement.executeUpdate();
            return num;
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return -1;
    }

    //查询数据
    public static <T> ArrayList<T> commonQuery(Class<T> clazz, String sql, Object... param) {

        Connection connection = null;
        PreparedStatement statement = null;
        ResultSet resultSet = null;

        try {
            connection = getConnection();
            statement = connection.prepareStatement(sql);
            //设置参数
            for (int i = 0; i < param.length; i++) {
                statement.setObject(i + 1, param[i]);
            }
            resultSet = statement.executeQuery();

            //获取表信息
            ResultSetMetaData metaData = resultSet.getMetaData();
            //获取字段个数
            int columnCount = metaData.getColumnCount();

            ArrayList<T> list = new ArrayList<>();

            while (resultSet.next()) {//判断是否有迭代的数据行 （5-周华健-40-13000-Java）

                //利用反射创建对象
                T t = clazz.newInstance();

                //遍历获取字段名
                for (int i = 1; i <= columnCount; i++) {
                    //获取字段名
                    String name = metaData.getColumnName(i);
                    //获取对应字段名上的数据
                    Object value = resultSet.getObject(name);

                    //获取对象中的属性对象
                    Field field = getField(clazz, name);
                    if (field != null) {
                        //设置修改权限
                        field.setAccessible(true);
                        //利用反射向对象设置属性
                        field.set(t, value);
                    }
                }

                list.add(t);
            }
            return list;
        } catch (SQLException | IllegalAccessException | InstantiationException e) {
            e.printStackTrace();
        } finally {
            //关闭
            DButils.close(connection, statement, resultSet);
        }
        return null;
    }

    //获取类上的属性对象
    public static Field getField(Class<?> clazz, String name) {
        Field field = null;
        for (Class<?> c = clazz; c != null; c = c.getSuperclass()) {
            try {
                field = c.getDeclaredField(name);
            } catch (NoSuchFieldException e) {
            }
        }
        return field;
    }
}

```

UserDaoImpl

```java
	/**
     * 用户登录
     * @param users
     * @return
     */
    @Override
    public Users login(Users users) {
        ArrayList<Users> users1 = DButils.commonQuery(Users.class, "select * from tb_users where username = ? and password = ?", users.getUsername(), users.getPassword());
        if (users1 != null && users1.size()>0){
            return users1.get(0);
        }else {
            return null;
        }
    }
```

### 创建用户的业务逻辑层和控制层

UserService

```java
public interface UserService {
    Users login(Users users);
}
```

UserServiceImpl

```java
public class UserServiceImpl implements UserService {
    UserDao userDao = new UserDaoImpl();

    @Override
    public Users login(Users users) {
        return userDao.login(users);
    }
}
```

到这里可以测试一下

```java
public class test1 {
    public static void main(String[] args) {
        Users users = new Users("lmx","123456");
        Users users1 = new UserDaoImpl().login(users);
        if (users1 !=null){
            System.out.println("登录成功");
        }else {
            System.out.println("登录失败");
        }
    }
}
```

控制层controller

UserServlet

```java
@WebServlet("/usersServlet")
public class UsersServlet extends HttpServlet {
    /**
     * 调用业务逻辑层
     */
    UserService userService = new UserServiceImpl();
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //处理请求和响应乱码
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("text/html;charset=utf-8");
        String value = req.getParameter("action");
        if (value.equals("login")){
            //用户登录
            String username = req.getParameter("username");
            String password = req.getParameter("password");
            Users users = new Users(username,password);
            Users login = userService.login(users);
            if (login !=null){
                //跳转首页
                resp.sendRedirect("index.jsp");
            }else {
                req.setAttribute("message","账号或密码错误");
                //重新转发
                req.getRequestDispatcher("login.jsp").forward(req,resp);
            }
        }
    }
}
```

### 用户登录的测试

login.jsp

第一个需要在表单中添加上隐藏域，通过控制层去选择是登录还是注册

```jsp
<%--隐藏域--%>
<input type="hidden" name="action" value="login">
```

第二个需要提示错误信息

```jsp
<div style="color: red">
   <%=request.getAttribute("message")==null?"":request.getAttribute("message")%>
</div>
```

```jsp
<form method="post" class="layui-form" action="/userServlet" >
        <%--隐藏域--%>
        <input type="hidden" name="action" value="login">
        <input name="username" placeholder="用户名"  type="text" lay-verify="required" class="layui-input" >
        <hr class="hr15">
        <input name="password" lay-verify="required" placeholder="密码"  type="password" class="layui-input">
        <hr class="hr15">
            <input id="yanzhengm" style="width: 131px;" type="text" name="usercode" placeholder="请输入验证码" required/>
            <!--验证码图片-->
            <img src="/CodeServlet" onclick="changeImage(this);" style="position: relative;top:3px;cursor: pointer;"/>
        <input  value="登录" style="width:100%;margin-top: 13px;" type="submit">
        <hr class="hr20" >
            <div style="color: red">
                <%=request.getAttribute("message")==null?"":request.getAttribute("message")%>
            </div>
    </form>
```

### 用户登录跳转后台首页并显示用户名字

先将index.html引入项目资源中

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!doctype html>
<html class="x-admin-sm">
<head>
    <meta charset="UTF-8">
    <title>后台登录-X-admin2.2</title>
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width,user-scalable=yes, minimum-scale=0.4, initial-scale=0.8,target-densitydpi=low-dpi" />
    <meta http-equiv="Cache-Control" content="no-siteapp" />
    <link rel="stylesheet" href="/css/font.css">
    <link rel="stylesheet" href="/css/xadmin.css">
    <!-- <link rel="stylesheet" href="./css/theme5.css"> -->
    <script src="/lib/layui/layui.js" charset="utf-8"></script>
    <script type="text/javascript" src="/js/xadmin.js"></script>
    <!-- 让IE8/9支持媒体查询，从而兼容栅格 -->
    <!--[if lt IE 9]>
    <script src="https://cdn.staticfile.org/html5shiv/r29/html5.min.js"></script>
    <script src="https://cdn.staticfile.org/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    <script>
        // 是否开启刷新记忆tab功能
        // var is_remember = false;
    </script>
</head>
<body class="index">
<!-- 顶部开始 -->
<div class="container">
    <div class="logo">
        <a href="/index.html">X-admin v2.2</a></div>
    <div class="left_open">
        <a><i title="展开左侧栏" class="iconfont">&#xe699;</i></a>
    </div>
    <ul class="layui-nav left fast-add" lay-filter="">
        <li class="layui-nav-item">
            <a href="javascript:;">+新增</a>
            <dl class="layui-nav-child">
                <!-- 二级菜单 -->
                <dd>
                    <a onclick="xadmin.open('最大化','http://www.baidu.com','','',true)">
                        <i class="iconfont">&#xe6a2;</i>弹出最大化</a></dd>
                <dd>
                    <a onclick="xadmin.open('弹出自动宽高','http://www.baidu.com')">
                        <i class="iconfont">&#xe6a8;</i>弹出自动宽高</a></dd>
                <dd>
                    <a onclick="xadmin.open('弹出指定宽高','http://www.baidu.com',500,300)">
                        <i class="iconfont">&#xe6a8;</i>弹出指定宽高</a></dd>
                <dd>
                    <a onclick="xadmin.add_tab('在tab打开','member-list.html')">
                        <i class="iconfont">&#xe6b8;</i>在tab打开</a></dd>
                <dd>
                    <a onclick="xadmin.add_tab('在tab打开刷新','member-del.html',true)">
                        <i class="iconfont">&#xe6b8;</i>在tab打开刷新</a></dd>
            </dl>
        </li>
    </ul>
    <ul class="layui-nav right" lay-filter="">
        <li class="layui-nav-item">
            <a href="javascript:;">admin</a>
            <dl class="layui-nav-child">
                <!-- 二级菜单 -->
                <dd>
                    <a onclick="xadmin.open('个人信息','http://www.baidu.com')">个人信息</a></dd>
                <dd>
                    <a onclick="xadmin.open('切换帐号','http://www.baidu.com')">切换帐号</a></dd>
                <dd>
                    <a href="./login.html">退出</a></dd>
            </dl>
        </li>
        <li class="layui-nav-item to-index">
            <a href="/">前台首页</a></li>
    </ul>
</div>
<!-- 顶部结束 -->
<!-- 中部开始 -->
<!-- 左侧菜单开始 -->
<div class="left-nav">
    <div id="side-nav">
        <ul id="nav">
            <li>
                <a href="javascript:;">
                    <i class="iconfont left-nav-li" lay-tips="会员管理">&#xe6b8;</i>
                    <cite>会员管理</cite>
                    <i class="iconfont nav_right">&#xe697;</i></a>
                <ul class="sub-menu">
                    <li>
                        <a onclick="xadmin.add_tab('统计页面','welcome1.html')">
                            <i class="iconfont">&#xe6a7;</i>
                            <cite>统计页面</cite></a>
                    </li>
                    <li>
                        <a onclick="xadmin.add_tab('会员列表(静态表格)','member-list.html')">
                            <i class="iconfont">&#xe6a7;</i>
                            <cite>会员列表(静态表格)</cite></a>
                    </li>
                    <li>
                        <a onclick="xadmin.add_tab('会员列表(动态表格)','member-list1.html',true)">
                            <i class="iconfont">&#xe6a7;</i>
                            <cite>会员列表(动态表格)</cite></a>
                    </li>
                    <li>
                        <a onclick="xadmin.add_tab('会员删除','member-del.html')">
                            <i class="iconfont">&#xe6a7;</i>
                            <cite>会员删除</cite></a>
                    </li>
                    <li>
                        <a href="javascript:;">
                            <i class="iconfont">&#xe70b;</i>
                            <cite>会员管理</cite>
                            <i class="iconfont nav_right">&#xe697;</i></a>
                        <ul class="sub-menu">
                            <li>
                                <a onclick="xadmin.add_tab('会员删除','member-del.html')">
                                    <i class="iconfont">&#xe6a7;</i>
                                    <cite>会员删除</cite></a>
                            </li>
                            <li>
                                <a onclick="xadmin.add_tab('等级管理','member-list1.html')">
                                    <i class="iconfont">&#xe6a7;</i>
                                    <cite>等级管理</cite></a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li>
                <a href="javascript:;">
                    <i class="iconfont left-nav-li" lay-tips="订单管理">&#xe723;</i>
                    <cite>订单管理</cite>
                    <i class="iconfont nav_right">&#xe697;</i></a>
                <ul class="sub-menu">
                    <li>
                        <a onclick="xadmin.add_tab('订单列表','order-list.html')">
                            <i class="iconfont">&#xe6a7;</i>
                            <cite>订单列表</cite></a>
                    </li>
                    <li>
                        <a onclick="xadmin.add_tab('订单列表1','order-list1.html')">
                            <i class="iconfont">&#xe6a7;</i>
                            <cite>订单列表1</cite></a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="javascript:;">
                    <i class="iconfont left-nav-li" lay-tips="分类管理">&#xe723;</i>
                    <cite>分类管理</cite>
                    <i class="iconfont nav_right">&#xe697;</i></a>
                <ul class="sub-menu">
                    <li>
                        <a onclick="xadmin.add_tab('多级分类','cate.html')">
                            <i class="iconfont">&#xe6a7;</i>
                            <cite>多级分类</cite></a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="javascript:;">
                    <i class="iconfont left-nav-li" lay-tips="城市联动">&#xe723;</i>
                    <cite>城市联动</cite>
                    <i class="iconfont nav_right">&#xe697;</i></a>
                <ul class="sub-menu">
                    <li>
                        <a onclick="xadmin.add_tab('三级地区联动','city.html')">
                            <i class="iconfont">&#xe6a7;</i>
                            <cite>三级地区联动</cite></a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="javascript:;">
                    <i class="iconfont left-nav-li" lay-tips="管理员管理">&#xe726;</i>
                    <cite>管理员管理</cite>
                    <i class="iconfont nav_right">&#xe697;</i></a>
                <ul class="sub-menu">
                    <li>
                        <a onclick="xadmin.add_tab('管理员列表','admin-list.html')">
                            <i class="iconfont">&#xe6a7;</i>
                            <cite>管理员列表</cite></a>
                    </li>
                    <li>
                        <a onclick="xadmin.add_tab('角色管理','admin-role.html')">
                            <i class="iconfont">&#xe6a7;</i>
                            <cite>角色管理</cite></a>
                    </li>
                    <li>
                        <a onclick="xadmin.add_tab('权限分类','admin-cate.html')">
                            <i class="iconfont">&#xe6a7;</i>
                            <cite>权限分类</cite></a>
                    </li>
                    <li>
                        <a onclick="xadmin.add_tab('权限管理','admin-rule.html')">
                            <i class="iconfont">&#xe6a7;</i>
                            <cite>权限管理</cite></a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="javascript:;">
                    <i class="iconfont left-nav-li" lay-tips="系统统计">&#xe6ce;</i>
                    <cite>系统统计</cite>
                    <i class="iconfont nav_right">&#xe697;</i></a>
                <ul class="sub-menu">
                    <li>
                        <a onclick="xadmin.add_tab('拆线图','echarts1.html')">
                            <i class="iconfont">&#xe6a7;</i>
                            <cite>拆线图</cite></a>
                    </li>
                    <li>
                        <a onclick="xadmin.add_tab('拆线图','echarts2.html')">
                            <i class="iconfont">&#xe6a7;</i>
                            <cite>拆线图</cite></a>
                    </li>
                    <li>
                        <a onclick="xadmin.add_tab('地图','echarts3.html')">
                            <i class="iconfont">&#xe6a7;</i>
                            <cite>地图</cite></a>
                    </li>
                    <li>
                        <a onclick="xadmin.add_tab('饼图','echarts4.html')">
                            <i class="iconfont">&#xe6a7;</i>
                            <cite>饼图</cite></a>
                    </li>
                    <li>
                        <a onclick="xadmin.add_tab('雷达图','echarts5.html')">
                            <i class="iconfont">&#xe6a7;</i>
                            <cite>雷达图</cite></a>
                    </li>
                    <li>
                        <a onclick="xadmin.add_tab('k线图','echarts6.html')">
                            <i class="iconfont">&#xe6a7;</i>
                            <cite>k线图</cite></a>
                    </li>
                    <li>
                        <a onclick="xadmin.add_tab('热力图','echarts7.html')">
                            <i class="iconfont">&#xe6a7;</i>
                            <cite>热力图</cite></a>
                    </li>
                    <li>
                        <a onclick="xadmin.add_tab('仪表图','echarts8.html')">
                            <i class="iconfont">&#xe6a7;</i>
                            <cite>仪表图</cite></a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="javascript:;">
                    <i class="iconfont left-nav-li" lay-tips="图标字体">&#xe6b4;</i>
                    <cite>图标字体</cite>
                    <i class="iconfont nav_right">&#xe697;</i></a>
                <ul class="sub-menu">
                    <li>
                        <a onclick="xadmin.add_tab('图标对应字体','unicode.html')">
                            <i class="iconfont">&#xe6a7;</i>
                            <cite>图标对应字体</cite></a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="javascript:;">
                    <i class="iconfont left-nav-li" lay-tips="其它页面">&#xe6b4;</i>
                    <cite>其它页面</cite>
                    <i class="iconfont nav_right">&#xe697;</i></a>
                <ul class="sub-menu">
                    <li>
                        <a href="login.html" target="_blank">
                            <i class="iconfont">&#xe6a7;</i>
                            <cite>登录页面</cite></a>
                    </li>
                    <li>
                        <a onclick="xadmin.add_tab('错误页面','error.html')">
                            <i class="iconfont">&#xe6a7;</i>
                            <cite>错误页面</cite></a>
                    </li>
                    <li>
                        <a onclick="xadmin.add_tab('示例页面','demo.html')">
                            <i class="iconfont">&#xe6a7;</i>
                            <cite>示例页面</cite></a>
                    </li>
                    <li>
                        <a onclick="xadmin.add_tab('更新日志','log.html')">
                            <i class="iconfont">&#xe6a7;</i>
                            <cite>更新日志</cite></a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="javascript:;">
                    <i class="iconfont left-nav-li" lay-tips="第三方组件">&#xe6b4;</i>
                    <cite>layui第三方组件</cite>
                    <i class="iconfont nav_right">&#xe697;</i></a>
                <ul class="sub-menu">
                    <li>
                        <a onclick="xadmin.add_tab('滑块验证','https://fly.layui.com/extend/sliderVerify/')" target="">
                            <i class="iconfont">&#xe6a7;</i>
                            <cite>滑块验证</cite></a>
                    </li>
                    <li>
                        <a onclick="xadmin.add_tab('富文本编辑器','https://fly.layui.com/extend/layedit/')">
                            <i class="iconfont">&#xe6a7;</i>
                            <cite>富文本编辑器</cite></a>
                    </li>
                    <li>
                        <a onclick="xadmin.add_tab('eleTree 树组件','https://fly.layui.com/extend/eleTree/')">
                            <i class="iconfont">&#xe6a7;</i>
                            <cite>eleTree 树组件</cite></a>
                    </li>
                    <li>
                        <a onclick="xadmin.add_tab('图片截取','https://fly.layui.com/extend/croppers/')">
                            <i class="iconfont">&#xe6a7;</i>
                            <cite>图片截取</cite></a>
                    </li>
                    <li>
                        <a onclick="xadmin.add_tab('formSelects 4.x 多选框','https://fly.layui.com/extend/formSelects/')">
                            <i class="iconfont">&#xe6a7;</i>
                            <cite>formSelects 4.x 多选框</cite></a>
                    </li>
                    <li>
                        <a onclick="xadmin.add_tab('Magnifier 放大镜','https://fly.layui.com/extend/Magnifier/')">
                            <i class="iconfont">&#xe6a7;</i>
                            <cite>Magnifier 放大镜</cite></a>
                    </li>
                    <li>
                        <a onclick="xadmin.add_tab('notice 通知控件','https://fly.layui.com/extend/notice/')">
                            <i class="iconfont">&#xe6a7;</i>
                            <cite>notice 通知控件</cite></a>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</div>
<!-- <div class="x-slide_left"></div> -->
<!-- 左侧菜单结束 -->
<!-- 右侧主体开始 -->
<div class="page-content">
    <div class="layui-tab tab" lay-filter="xbs_tab" lay-allowclose="false">
        <ul class="layui-tab-title">
            <li class="home">
                <i class="layui-icon">&#xe68e;</i>我的桌面</li></ul>
        <div class="layui-unselect layui-form-select layui-form-selected" id="tab_right">
            <dl>
                <dd data-type="this">关闭当前</dd>
                <dd data-type="other">关闭其它</dd>
                <dd data-type="all">关闭全部</dd></dl>
        </div>
        <div class="layui-tab-content">
            <div class="layui-tab-item layui-show">
                <iframe src='./welcome.html' frameborder="0" scrolling="yes" class="x-iframe"></iframe>
            </div>
        </div>
        <div id="tab_show"></div>
    </div>
</div>
<div class="page-content-bg"></div>
<style id="theme_style"></style>
<!-- 右侧主体结束 -->
<!-- 中部结束 -->
<script>//百度统计可去掉
var _hmt = _hmt || []; (function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?b393d153aeb26b46e9431fabaf0f6190";
    var s = document.getElementsByTagName("script")[0];
    s.parentNode.insertBefore(hm, s);
})();</script>
</body>

</html>

```

修改UsersServlet中的代码

需要将用户名使用Session存储起来

```java
 HttpSession session = req.getSession();
 session.setAttribute("loginUser",login);
```

如果用户登录失效，需要跳转到提醒页面

nologin.jsp

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>温馨提示</title>
  <style>
    h1{
      color: #0a5eb6;
      font-size: 40px;
    }
    a{
      text-decoration: none;
    }
  </style>
</head>
<body>
<center>
  </br>
  </br>
  </br>
  </br>
  </br>
  </br>
  <h1>用户暂未登录或登录已失效，现在去<a href="nologin.jsp">登录</a></h1>
</center>

</body>
</html>

```

显示用户姓名

index.jsp

```jsp
<%
    Users loginUser = (Users) session.getAttribute("loginUser");
    String username = null;
    if (loginUser!=null){
        username = loginUser.getUsername();
    }else {
      //用户没有登录或者登录已失效
      response.sendRedirect("/nologin.jsp");
    }
  %>
```

![image-20230223224352542](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202304201115954.png)

```jsp
 <p><span>下午好！</span><span style="color: #fff21b"><%=username%></span> , 欢迎你！</p>
```

![image-20230223224413720](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202304201115158.png)

![image-20230223224421322](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202304201115353.png)

### 用户退出

其实就是让session失效

修改页面index.jsp

![image-20230223231812577](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202304201115472.png)

```jsp
<li><a href="#" onclick="logout();">退出系统</a></li>
```

![image-20230223231822982](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202304201115836.png)

```jsp
<a href="#" onclick="logout();">退出</a>
```

然后写JS函数

```javascript
<script>
  //退出
  function logout(){
    if (confirm("确定要退出系统嘛?")){
    	//action是隐藏域的状态
      location.href = "/usersServlet?action=logout";
    }
  }
</script>
```

控制层去添加代码

记得把session放在外面，方便公用

![image-20230223231947459](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202304201116307.png)

```java
 if(value.equals("logout")){
 			//取消session
            session.invalidate();
            //重定向
            resp.sendRedirect("login.jsp");
        }
```

## 超市账单管理系统-验证码登录

### 改造登录页面

添加一个文本框填写验证码

把高度都调成了47px

```html
<div class="inputbox" style="height: 47px;">
                <label for="user">用户名：</label>
                <input id="user" type="text" name="username" placeholder="请输入用户名" required/>
            </div>
            <div class="inputbox" style="height: 47px;">
                <label for="mima">密码：</label>
                <input id="mima" type="password" name="password" placeholder="请输入密码" required/>
            </div>
            <div class="inputbox" style="height: 47px;">
                <label for="mima">验证码：</label>
                <input id="yanzhengm" style="width: 100px;" type="text" name="usercode" placeholder="请输入验证码" required/>
                <!--验证码图片-->
                <img src="/CodeServlet" onclick="changeImage(this);" style="position: relative;top:11px;cursor: pointer;"/>
            </div>
```

### 准备验证码图片

```java
@WebServlet("/CodeServlet")
public class CodeServlet extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //验证码图片宽和高
        int length = 200;
        int width = 50;

        //绘图类--画布--画布Green Blue Red
        BufferedImage bufferedImage = new BufferedImage(length, width, BufferedImage.TYPE_INT_RGB);
        //获取一个画笔
        Graphics g = bufferedImage.getGraphics();
        //设置画笔为白色
        g.setColor(Color.white);
        //使用画笔填充矩形边框
        g.fillRect(0, 0, length, width);

        //颜色数组
        Color[] colors = {Color.red,Color.yellow,Color.green,Color.cyan,Color.pink,Color.orange,Color.blue,Color.darkGray,Color.LIGHT_GRAY};

        //验证码的内容
        String[] codes = {"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r",
                "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N",
                "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"};

        //随机数，随机的中字母和数字中获取4个
        Random ran = new Random();
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 1; i <= 4; i++) {
            int index = ran.nextInt(codes.length);
            String str = String.valueOf(codes[index]);
            //随机的画笔颜色
            g.setColor(colors[ran.nextInt(colors.length)]);
            //设置字体
            g.setFont(new Font("宋体",Font.BOLD,30+ran.nextInt(10)));
            //绘制字到图片上
            g.drawString(str, 1 + (width/2)*i, 30 + ran.nextInt(10));
            stringBuilder.append(str);
        }

        HttpSession session = req.getSession();
        //把系统生成的正确的验证码存储起来
        session.setAttribute("syscode",stringBuilder.toString());
        System.out.println("系统生成的验证码是:"+stringBuilder.toString());
        //绘制干扰线
        //for (int i = 0; i < 4; i++) {
        //    //随机的画笔颜色
        //    g.setColor(colors[ran.nextInt(colors.length)]);
        //    int x0=ran.nextInt(length);
        //    int y0=ran.nextInt(width);
        //    int x1=ran.nextInt(length);
        //    int y1=ran.nextInt(width);
        //    g.drawLine(x0,y0,x1,y1);
        //}

        ImageIO.write(bufferedImage, "jpg", resp.getOutputStream());

    }
}
```

### 点击切换验证码

```js
<script>
    //点击验证码图片的时候，更换验证码
    function changeImage(img) {
        //图片重新加载src地址，因为图片是一个GET请求，浏览器有缓存  time 表示是一个随机参数 ，防止浏览器缓存
        img.src="/CodeServlet?time="+new Date();
    }
</script>
```

### 验证码登录

UsersServlet

```java
//前端输入的验证码
String usercode = req.getParameter("usercode");
//系统生成的验证码
String syscode = String.valueOf(session.getAttribute("syscode"));
//检查验证码是否匹配
if (syscode.equals(usercode)){
                Users users = new Users(username,password);
                Users login = userService.login(users);
                if (login !=null){
                    session.setAttribute("loginUser",login);
                    //跳转首页
                    resp.sendRedirect("index.jsp");
                }else {
                    req.setAttribute("message","账号或密码错误!");
                    //重新转发
                    req.getRequestDispatcher("login.jsp").forward(req,resp);
                }
            }else {
                req.setAttribute("message","验证码错误!");
                //重新转发
                req.getRequestDispatcher("login.jsp").forward(req,resp);
            }
        }
```

### 用户列表以及模糊查询的方法

userDao

```java
/**
     * 用户查询(列表)
     */
    List<Users> selectAll(String username);
```

UserDaoImpl

```java
@Override
    public List<Users> selectAll(String username) {
          if (username!=null &&"".equals(username)){
            return DButils.commonQuery(Users.class, "select * from tb_users where isdelete=0 and username like ?", "%" + username + "%");
        }else {
            return DButils.commonQuery(Users.class, "select * from tb_users where isdelete=0");
        }
    }
```

UserService

```java
/**
     * 用户查询(列表)
     */
    List<Users> selectAll(String username);
```

UserServiceImpl

```java
@Override
    public List<Users> selectAll(String username) {
        return userDao.selectAll(username);
    }
```

UsersServlet

```java
		//查询
        if (value.equals("list")){
            //前端传递的查询信息
            String username = req.getParameter("username");
            //通过数据库的查询到的数据
            List<Users> usersList = userService.selectAll(username);
            //把数据保存起来
            req.setAttribute("usersList",usersList);
            //转发到页面去
            req.getRequestDispatcher("userList.jsp").forward(req,resp);
        }
```

userList.jsp

```jsp
<!--用户-->
        <table class="providerTable" cellpadding="0" cellspacing="0">
            <tr class="firstTr">
                <th width="10%">用户编码</th>
                <th width="20%">用户名称</th>
                <th width="10%">性别</th>
                <th width="10%">生日</th>
                <th width="10%">电话</th>
                <th width="10%">用户类型</th>
                <th width="30%">操作</th>
            </tr>
            <%
                List<Users> userlist = (List<Users>) request.getAttribute("usersList");
                if (userlist!= null && userlist.size()>0){
                    for(Users u:userlist){
            %>
            <tr>
                <td><%=u.getId()%></td>
                <td><%=u.getUsername()%></td>
                <td><%=u.getSex().toString().equals("1")?"男":"女"%></td>
                <td><%=u.getBirthday()%></td>
                <td><%=u.getPhone()%></td>
                <td>
                    <%
                        if (u.getType().toString().equals("1")){
                            out.print("管理员");
                        }else if (u.getType().toString().equals("2")){
                            out.print("经理");
                        }else {
                            out.print("普通员工");
                        }
                    %>
                </td>
                <td>
                    <a href="userView.html"><img src="img/read.png" alt="查看" title="查看"/></a>
                    <a href="userUpdate.html"><img src="img/xiugai.png" alt="修改" title="修改"/></a>
                    <a href="#"><img src="img/schu.png" alt="删除" title="删除"/></a>
                </td>
            </tr>
            <%
                    }
                }
            %>
        </table>
```

### 用户搜索数据

userList.jsp

```jsp
<form action="/usersServlet?action=list" method="post">
            <div class="search">
                <span>用户名：</span>
                <input type="text" placeholder="请输入用户名" name="username"/>
                <input type="submit" value="查询"/>
                <a href="userAdd.html">添加用户</a>
            </div>
        </form>
```

点击查询之后，搜索的文字应该让他保存起来

搜索的回显

UsersServlet

```java
//搜索回显
            req.setAttribute("username",username);
```

![image-20230225005908597](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202304201116219.png)

userList.jsp

```jsp
<input type="text" placeholder="请输入用户名" name="username"
                       value="<%=request.getAttribute("username")==null?"":request.getAttribute("username")%>"/>
```

![image-20230225005936020](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202304201116533.png)

## 超市账单管理系统-用户模块

### 头部抽取成公共页面

1.创建header.jsp页面

放入头部代码

```jsp
<%@ page import="cn.lanqiao.pojo.Users" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<script>
  //退出
  function logout(){
    if (confirm("确定要退出系统嘛?")){
      location.href = "/usersServlet?action=logout";
    }
  }
</script>
<!--头部-->
<header class="publicHeader">
  <h1>超市账单管理系统</h1>
  <%
    Users loginUser = (Users) session.getAttribute("loginUser");
    String username = null;
    if (loginUser!=null){
      username = loginUser.getUsername();
    }else {
      //用户没有登录或者登录已失效
      response.sendRedirect("/nologin.jsp");
    }
  %>
  <div class="publicHeaderR">
    <p><span>下午好！</span><span style="color: #fff21b"><%=username%></span> , 欢迎你！</p>
    <a href="#" onclick="logout();">退出</a>
  </div>
</header>
<!--时间-->
<section class="publicTime">
  <span id="time">2015年1月1日 11:11  星期一</span>
  <a href="#">温馨提示：为了能正常浏览，请使用高版本浏览器！（IE10+）</a>
</section>
```

2.引入头部到页面中去

```java
<!--头部-->
<jsp:include page="header.jsp"></jsp:include>
```

3.需要注意,index.jsp页面中的用户找不到了，需要改成如图所示

![image-20230227144645435](E:\md图片\image-20230227144645435.png)

```jsp
<h2><%=((Users)request.getSession().getAttribute("loginUser")).getUsername()%></h2>
```

### 用户新增

userdao

```java
/**
     * 新增用户
     * @param users
     * @return
     */
    int addUsers(Users users);
```

userdaoImpl

```java
@Override
    public int addUsers(Users users) {
        return DButils.commonInsert("insert into tb_users values(null,?,?,?,?,?,?,?,0)",
                users.getUsername(),users.getPassword(),users.getSex(),users.getBirthday()
                ,users.getPhone(),users.getAddress(),users.getType());
    }
```

userservice

```java
/**
     * 新增用户
     * @param users
     * @return
     */
    int addUsers(Users users);
```

userserviceImpl

```java
	@Override
    public int addUsers(Users users) {
        return userDao.addUsers(users);
    }
```

引入userAdd.jsp

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>超市账单管理系统</title>
    <link rel="stylesheet" href="css/public.css"/>
    <link rel="stylesheet" href="css/style.css"/>
</head>
<body>
<!--头部-->
<header class="publicHeader">
    <h1>超市账单管理系统</h1>

    <div class="publicHeaderR">
        <p><span>下午好！</span><span style="color: #fff21b"> Admin</span> , 欢迎你！</p>
        <a href="login.html">退出</a>
    </div>
</header>
<!--时间-->
<section class="publicTime">
    <span id="time">2015年1月1日 11:11  星期一</span>
    <a href="#">温馨提示：为了能正常浏览，请使用高版本浏览器！（IE10+）</a>
</section>
<!--主体内容-->
<section class="publicMian ">
    <div class="left">
        <h2 class="leftH2"><span class="span1"></span>功能列表 <span></span></h2>
        <nav>
            <ul class="list">
                <li><a href="billList.html">账单管理</a></li>
                <li ><a href="providerList.html">供应商管理</a></li>
                <li id="active"><a href="userList.html">用户管理</a></li>
                <li><a href="password.html">密码修改</a></li>
                <li><a href="login.html">退出系统</a></li>
            </ul>
        </nav>
    </div>
    <div class="right">
        <div class="location">
            <strong>你现在所在的位置是:</strong>
            <span>用户管理页面 >> 用户添加页面</span>
        </div>
        <div class="providerAdd">
            <form action="#">


                <div>
                    <label for="userName">用户名称：</label>
                    <input type="text" name="userName" id="userName"/>
                    <span >*请输入用户名称</span>
                </div>
                <div>
                    <label for="userpassword">用户密码：</label>
                    <input type="text" name="userpassword" id="userpassword"/>
                    <span>*密码长度必须大于6位小于20位</span>

                </div>
                <div>
                    <label for="userRemi">确认密码：</label>
                    <input type="text" name="userRemi" id="userRemi"/>
                    <span>*请输入确认密码</span>
                </div>
                <div>
                    <label >用户性别：</label>

                    <select name="sex">
                        <option value="man">男</option>
                        <option value="woman">女</option>
                    </select>
                    <span></span>
                </div>
                <div>
                    <label for="data">出生日期：</label>
                    <input type="text" name="birthday" id="data"/>
                    <span >*</span>
                </div>
                <div>
                    <label for="userphone">用户电话：</label>
                    <input type="text" name="userphone" id="userphone"/>
                    <span >*</span>
                </div>
                <div>
                    <label for="userAddress">用户地址：</label>
                    <input type="text" name="userAddress" id="userAddress"/>
                </div>
                <div>
                    <label >用户类别：</label>
                    <input type="radio" name="userlei" value="管理员"/>管理员
                    <input type="radio" name="userlei" value="经理"/>经理
                    <input type="radio" name="userlei" value="普通用户"/>普通用户
                </div>
                <div class="providerAddBtn">
                    <!--<a href="#">保存</a>-->
                    <!--<a href="userList.html">返回</a>-->
                    <input type="button" value="保存" onclick="history.back(-1)"/>
                    <input type="button" value="返回" onclick="history.back(-1)"/>
                </div>
            </form>
        </div>

    </div>
</section>
<footer class="footer">
</footer>
<script src="js/time.js"></script>

</body>
</html>
```

对userAdd页面进行修改

```jsp
<form class="layui-form" action="/userServlet?action=add" method="post">
      <div class="layui-form-item">
        <label for="L_email" class="layui-form-label">
          <span class="x-red">*</span>用户名</label>
        <div class="layui-input-inline">
          <input type="text" id="L_email" name="userName" required="" lay-verify="email" autocomplete="off" class="layui-input"></div>
        <div class="layui-form-mid layui-word-aux">
          <span class="x-red">*</span>将会成为您唯一的登入名
        </div>
      </div>
      <div class="layui-form-item">
        <label for="L_pass" class="layui-form-label">
          <span class="x-red">*</span>密码</label>
        <div class="layui-input-inline">
          <input type="password" id="L_pass" name="userpassword" required="" lay-verify="pass" autocomplete="off" class="layui-input"></div>
        <div class="layui-form-mid layui-word-aux">6到16个字符</div></div>
      <div class="layui-form-item">
        <label for="L_repass" class="layui-form-label">
          <span class="x-red">*</span>确认密码</label>
        <div class="layui-input-inline">
          <input type="password" id="L_repass" name="userpassword" required="" lay-verify="repass" autocomplete="off" class="layui-input"></div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">用户性别</label>
        <div class="layui-input-block">
          <input type="radio" name="sex" value="1" title="男" checked="">
          <input type="radio" name="sex" value="0" title="女">
        </div>
      </div>
        <div class="layui-form-item">
          <div class="layui-inline">
            <label class="layui-form-label">生日日期</label>
            <div class="layui-input-inline">
              <input type="date" name="birthday" id="date" lay-verify="date" placeholder="yyyy-MM-dd" autocomplete="off" class="layui-input">
            </div>
          </div>
        </div>
      <div class="layui-form-item">
        <label for="L_repass" class="layui-form-label">
          <span class="x-red">*</span>用户电话</label>
        <div class="layui-input-inline">
          <input type="text" id="userphone" name="userphone" required="" lay-verify="repass" autocomplete="off" class="layui-input">
        </div>
      </div>
      <div class="layui-form-item">
        <label for="L_repass" class="layui-form-label">
          <span class="x-red">*</span>用户地址</label>
        <div class="layui-input-inline">
          <input type="text" id="userAddress" name="userAddress" required="" lay-verify="repass" autocomplete="off" class="layui-input">
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">用户类别</label>
        <div class="layui-input-block">
          <input type="radio" name="userlei" value="1" title="管理员" checked="">
          <input type="radio" name="userlei" value="2" title="经理">
          <input type="radio" name="userlei" value="3" title="普通用户">
        </div>
      </div>
      <div class="layui-form-item">
        <label for="L_repass" class="layui-form-label"></label>
        <button class="layui-btn" lay-filter="add" type="submit">增加</button>
      </div>
    </form>
```

userServlet.java

```java
//新增
        if (value.equals("add")){
            //获取前端的数据
            String userName = req.getParameter("userName");
            String userpassword = req.getParameter("userpassword");
            String sex = req.getParameter("sex");
            String birthday = req.getParameter("birthday");
            String userphone = req.getParameter("userphone");
            String userAddress = req.getParameter("userAddress");
            String userlei = req.getParameter("userlei");
            //封装对象
            Users users = new Users(userName,userpassword,Integer.valueOf(sex),birthday,userphone,userAddress,Integer.valueOf(userlei));
            System.out.println("要新增的对象是:"+users);
            int i = userService.addUsers(users);
            PrintWriter writer = resp.getWriter();
            if (i>0){
                writer.print("<script>" +
                        "alert('用户新增成功');location.href = '/usersServlet?action=list'" +
                        "</script>");
            }else {
                writer.print("<script>" +
                        "alert('用户新增失败');location.href = '/userAdd.jsp'" +
                        "</script>");
            }
        }
```

### 用户更新后台的业务逻辑

UserDao

```java
/**
     * 根据id更新
     */
    User findById(String id);
```

UserDaoImpl

```java
@Override
    public User findById(String id) {
        ArrayList<User> users = DButils.commonQuery(User.class, "select * from tb_users where id=?",id);
        if (users.size()>0){
            return users.get(0);
        }else {
            return null;
        }
    }
```

UserService

```java
/**
     * 根据id更新
     */
    User findById(String id);
```

UserServiceImpl

```java
@Override
    public User findById(String id) {
        return userDao.findById(id);
    }
```

更新需要在前端页面发送请求携带id

```jsp
<a title="编辑"  onclick="xadmin.open('编辑','userServlet?action=goUpdate&id=<%=u.getId()%>',600,400)" href="javascript:;"></a>
```

UserServlet

```java
//更新
        if (value.equals("goUpdate")){
            String id = req.getParameter("id");
            User users = userService.findById(id);
            req.setAttribute("users",users);
            req.getRequestDispatcher("/member-edit.jsp").forward(req,resp);
        }
```

引入页面member-edit.jsp

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html class="x-admin-sm">

<head>
  <meta charset="UTF-8">
  <title>欢迎页面-X-admin2.2</title>
  <meta name="renderer" content="webkit">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width,user-scalable=yes, minimum-scale=0.4, initial-scale=0.8,target-densitydpi=low-dpi" />
  <link rel="stylesheet" href="./css/font.css">
  <link rel="stylesheet" href="./css/xadmin.css">
  <script type="text/javascript" src="./lib/layui/layui.js" charset="utf-8"></script>
  <script type="text/javascript" src="./js/xadmin.js"></script>
  <!-- 让IE8/9支持媒体查询，从而兼容栅格 -->
  <!--[if lt IE 9]>
  <script src="https://cdn.staticfile.org/html5shiv/r29/html5.min.js"></script>
  <script src="https://cdn.staticfile.org/respond.js/1.4.2/respond.min.js"></script>
  <![endif]-->
</head>
<body>
<div class="layui-fluid">
  <div class="layui-row">
    <form class="layui-form" target="_parent" action="/userServlet?action=add" method="post">
      <div class="layui-form-item">
        <label for="L_email" class="layui-form-label">
          <span class="x-red">*</span>用户名</label>
        <div class="layui-input-inline">
          <input type="text" id="L_email" name="userName" required="" lay-verify="email" autocomplete="off" class="layui-input"></div>
        <div class="layui-form-mid layui-word-aux">
          <span class="x-red">*</span>将会成为您唯一的登入名</div></div>
      <div class="layui-form-item">
        <label for="L_pass" class="layui-form-label">
          <span class="x-red">*</span>密码</label>
        <div class="layui-input-inline">
          <input type="password" id="L_pass" name="userpassword" required="" lay-verify="pass" autocomplete="off" class="layui-input"></div>
        <div class="layui-form-mid layui-word-aux">6到16个字符</div></div>
      <div class="layui-form-item">
        <label for="L_repass" class="layui-form-label">
          <span class="x-red">*</span>确认密码</label>
        <div class="layui-input-inline">
          <input type="password" id="L_repass" name="userpassword" required="" lay-verify="repass" autocomplete="off" class="layui-input"></div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">用户性别</label>
        <div class="layui-input-block">
          <input type="radio" name="sex" value="1" title="男" checked="">
          <input type="radio" name="sex" value="0" title="女">
        </div>
      </div>
        <div class="layui-form-item">
          <div class="layui-inline">
            <label class="layui-form-label">生日日期</label>
            <div class="layui-input-inline">
              <input type="date" name="birthday" id="date" lay-verify="date" placeholder="yyyy-MM-dd" autocomplete="off" class="layui-input">
            </div>
          </div>
        </div>
      <div class="layui-form-item">
        <label for="L_repass" class="layui-form-label">
          <span class="x-red">*</span>用户电话</label>
        <div class="layui-input-inline">
          <input type="text" id="userphone" name="userphone" required="" lay-verify="repass" autocomplete="off" class="layui-input">
        </div>
      </div>
      <div class="layui-form-item">
        <label for="L_repass" class="layui-form-label">
          <span class="x-red">*</span>用户地址</label>
        <div class="layui-input-inline">
          <input type="text" id="userAddress" name="userAddress" required="" lay-verify="repass" autocomplete="off" class="layui-input">
        </div>
      </div>
      <div class="layui-form-item">
        <label class="layui-form-label">用户类别</label>
        <div class="layui-input-block">
          <input type="radio" name="userlei" value="1" title="管理员" checked="">
          <input type="radio" name="userlei" value="2" title="经理">
          <input type="radio" name="userlei" value="3" title="普通用户">
        </div>
      </div>
      <div class="layui-form-item">
        <label for="L_repass" class="layui-form-label"></label>
        <button class="layui-btn" lay-filter="add" type="submit">增加</button>
      </div>
    </form>
  </div>
</div>
<script>
  layui.use(['form', 'layer','jquery'],
        function() {
          $ = layui.jquery;
          var form = layui.form,
                  layer = layui.layer;

          //自定义验证规则
          form.verify({
            nikename: function(value) {
              if (value.length < 5) {
                return '昵称至少得5个字符啊';
              }
            },
            pass: [/(.+){6,12}$/, '密码必须6到12位'],
            repass: function(value) {
              if ($('#L_pass').val() != $('#L_repass').val()) {
                return '两次密码不一致';
              }
            }
          });

          //监听提交
          form.on('submit(add)',
                  function(data) {
                    console.log(data);
                    //发异步，把数据提交给php
                    layer.alert("增加成功", {
                              icon: 6
                            },
                            function() {
                              //关闭当前frame
                              xadmin.close();

                              // 可以对父窗口进行刷新
                              xadmin.father_reload();
                            });
                    return false;
                  });

        });</script>
<script>var _hmt = _hmt || []; (function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?b393d153aeb26b46e9431fabaf0f6190";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();</script>
</body>

</html>
<script>
  layui.use(['form', 'util', 'laydate'], function(){
    var form = layui.form;
    var layer = layui.layer;
    var util = layui.util;
    var laydate = layui.laydate;

  });
</script>

```

页面数据回显

```
<%
    //获取users对象
    User users = (User) request.getAttribute("users");

%>
```

```
value="<%=users.getUsername()%>"
value="<%=users.getPassword()%>"
<%=users.getSex()==1?"checked":""%>
<%=users.getSex()==0?"checked":""%>
value="<%=users.getBirthday()%>"
value="<%=users.getPhone()%>"
value="<%=users.getAddress()%>"
 <%=users.getType()==1?"checked":""%>
<%=users.getType()==2?"checked":""%>>
<%=users.getType()==3?"checked":""%
```

### 获取要更新的数据

页面发送action请求

```jsp
 <form class="layui-form" action="/userServlet?action=update&id=<%=users.getId()%>" method="post">
                <div class="layui-form-item">
                <label for="L_email" class="layui-form-label">
                    <span class="x-red">*</span>用户名</label>
                <div class="layui-input-inline">
                    <input type="text" id="L_email" name="userName" required="" lay-verify="email" autocomplete="off" class="layui-input" value="<%=users.getUsername()%>"></div>
                <div class="layui-form-mid layui-word-aux">
                    <span class="x-red">*</span>将会成为您唯一的登入名</div></div>

            <div class="layui-form-item">
                <label class="layui-form-label">用户性别</label>
                <div class="layui-input-block">
                    <input type="radio" name="sex" value="1" title="男" <%=users.getSex()==1?"checked":""%>>
                    <input type="radio" name="sex" value="0" title="女" <%=users.getSex()==0?"checked":""%>>
                </div>
            </div>
            <div class="layui-form-item">
                <div class="layui-inline">
                    <label class="layui-form-label">生日日期</label>
                    <div class="layui-input-inline">
                        <input type="text" name="birthday" id="date" lay-verify="date" placeholder="yyyy-MM-dd" autocomplete="off" class="layui-input" value="<%=users.getBirthday()%>">
                    </div>
                </div>
            </div>
            <div class="layui-form-item">
                <label for="L_repass" class="layui-form-label">
                    <span class="x-red">*</span>用户电话</label>
                <div class="layui-input-inline">
                    <input type="text" id="userphone" name="userphone" required="" lay-verify="repass" autocomplete="off" class="layui-input" value="<%=users.getPhone()%>">
                </div>
            </div>
            <div class="layui-form-item">
                <label for="L_repass" class="layui-form-label">
                    <span class="x-red">*</span>用户地址</label>
                <div class="layui-input-inline">
                    <input type="text" id="userAddress" name="userAddress" required="" lay-verify="repass" autocomplete="off" class="layui-input" value="<%=users.getAddress()%>">
                </div>
            </div>
            <div class="layui-form-item">
                <label class="layui-form-label">用户类别</label>
                <div class="layui-input-block">
                    <input type="radio" name="userlei" value="1" title="管理员" <%=users.getType()==1?"checked":""%>>
                    <input type="radio" name="userlei" value="2" title="经理" <%=users.getType()==2?"checked":""%>>
                    <input type="radio" name="userlei" value="3" title="普通用户" <%=users.getType()==3?"checked":""%>>
                </div>
            </div>
            <div class="layui-form-item">
                <label for="L_repass" class="layui-form-label"></label>
                <button class="layui-btn" lay-filter="add" type="submit">保存</button>
            </div>
        </form>
```

UserServlet

```java
if (value.equals("update")){
            String id = req.getParameter("id");
            String userName = req.getParameter("userName");
            String sex = req.getParameter("sex");
            String birthday = req.getParameter("birthday");
            String userphone = req.getParameter("userphone");
            String userAddress = req.getParameter("userAddress");
            String userlei = req.getParameter("userlei");
            User user = new User(Integer.valueOf(id),userName,Integer.valueOf(sex),birthday,userphone,userAddress,Integer.valueOf(userlei));
            System.out.println("要更新的对象:"+user);
            int count = userService.updateUser(user);
            System.out.println(count);
            PrintWriter writer = resp.getWriter();
            if (count>0){
                writer.print("<script>" +
                        "alert('用户修改成功');" +
                        "window.parent.location.href = '/userServlet?action=list'" +
                        "</script>");
            }else {
                writer.print("<script>" +
                        "alert('用户修改失败');location.href = /userServlet?action=goUpdate&id="+id+";</script>");
            }
        }
```

### 用户详情查看(数据做显示)

member-list.jsp

```jsp
<a title="个人信息"  onclick="xadmin.open('个人信息','userServlet?action=details&id=<%=u.getId()%>',600,400)" href="javascript:;">
<i class="layui-icon">&#xe66e;</i>
</a>
```

UserServlet

```java
if (value.equals("details")){
            //获取用户要显示的详情id
            String id = req.getParameter("id");
            User users = userService.findById(id);
            System.out.println(users);
            req.setAttribute("users",users);
            req.getRequestDispatcher("/user-view.jsp").forward(req,resp);
        }
```

新建user-view.jsp页面

```jsp
<%@ page import="cn.lanqiao.pojo.User" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
    <link rel="stylesheet" href="./css/font.css">
    <link rel="stylesheet" href="./css/xadmin.css">
    <script type="text/javascript" src="./lib/layui/layui.js" charset="utf-8"></script>
    <script type="text/javascript" src="./js/xadmin.js"></script>
    <script src="https://cdn.staticfile.org/html5shiv/r29/html5.min.js"></script>
    <script src="https://cdn.staticfile.org/respond.js/1.4.2/respond.min.js"></script>
</head>
<body>
<%
    User users = (User) request.getAttribute("users");
%>
<div class="layui-form-item">
    <label class="layui-form-label">用户编号:</label><span style="position: relative;top: 11px"><%=users.getId()%></span>
</div>
<div class="layui-form-item">
    <label class="layui-form-label">用户名:</label><span style="position: relative;top: 11px"><%=users.getUsername()%></span>
</div>
<div class="layui-form-item">
    <label class="layui-form-label">用户性别:</label><span style="position: relative;top: 11px"><%=users.getSex().toString().equals("1")?"男":"女"%></span>
</div>
<div class="layui-form-item">
    <label class="layui-form-label">出生日期:</label><span style="position: relative;top: 11px"><%=users.getBirthday()%></span>
</div>
<div class="layui-form-item">
    <label class="layui-form-label">用户电话:</label><span style="position: relative;top: 11px"><%=users.getPhone()%></span>
</div>
<div class="layui-form-item">
    <label class="layui-form-label">用户地址:</label><span style="position: relative;top: 11px"><%=users.getAddress()%></span>
</div>
<div class="layui-form-item">
    <label class="layui-form-label">用户类别:</label>
    <span style="position: relative;top: 11px">
    <%
        if (users.getType().toString().equals("1")){
            out.print("管理员");
        }else if (users.getType().toString().equals("2")){
            out.print("经理");
        }else {
            out.print("普通员工");
        }
    %>
    </span>
</div>
</body>
</html>
```

### 关于用户删除的判断逻辑

如果是管理员就有删除权限，并且自己不能删除自己

```jsp
<%
User loginUser = (User) session.getAttribute("loginUser");
if (loginUser!=null && loginUser.getType()==1 && loginUser.getId() != u.getId() &&u.getId()!=1){
%>
<a title="删除" onclick="member_del(this,'要删除的id')" href="javascript:;">
   <i class="layui-icon">&#xe640;</i>
</a>
<%
  }
%>
```

### 用户逻辑删除

后端代码

userDao

```java
	/**
     * 根据ID删除(逻辑删除)
     * @param id
     * @return
     */
    int deleteById(String id);
```

```java
	@Override
    public int deleteById(String id) {
        return DButils.commonUpdate("update tb_users set isdelete = 1 where id = ?",id);
    }
```

```java
 /**
     * 根据id删除	
     */
    int deleteById(String id);
```

```java
	@Override
    public int deleteById(String id) {
        return userDao.deleteById(id);
    }
```

userServlet

```java
		//根据id删除
        if (value.equals("delete")){
            String id = req.getParameter("id");
            int i = userService.deleteById(id);
            PrintWriter writer = resp.getWriter();
            if (i>0){
                writer.print("<script>" +
                        "alert('用户删除成功');" +
                        "window.location.href = '/userServlet?action=list'" +
                        "</script>");
            }else {
                writer.print("<script>" +
                        "alert('用户修改失败');" +
                        "window.location.href = '/userServlet?action=list'" +
                        "</script>");
            }
        }
```

前端代码

```java
<%
    User loginUser = (User) session.getAttribute("loginUser");
    //如果是管理员就有删除权限，并且自己不能删除自己
    if (loginUser!=null && loginUser.getType()==1 && loginUser.getId() != u.getId()){
%>
<a title="删除" href="javascript:deleteUsers(<%=u.getId()%>);">
    <i class="layui-icon">&#xe640;</i>
</a>
<%
    }
%>
```

```java
<script>
    function deleteUsers(id){
        layer.msg(' 确定要退出吗?', {
            time: 20000, //20s后自动关闭
            btn: ['确定', '取消'],
            yes: function (index, layero) {
                self.location = '/userServlet?action=delete&id='+id;//确定按钮跳转地址
            }
        });
    }
    $('#layerDemo .layui-btn').on('click', function () {
        var othis = $(this), method = othis.data('method');
        active[method] ? active[method].call(this, othis) : '';
    });
</script>
```

## 超市账单管理系统-供应商

### 供应商数据库设计

![image-20230304131712657](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202304201116662.png)

![image-20230304131721217](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202304201116411.png)

### 使用JSTL表达式进行供应商列表显示

后台代码

```java
package cn.lanqiao.pojo;

import lombok.Data;

@Data
public class Supplier {
    private Integer id;
    private String name;
    private String linkman;
    private String phone;
    private String address;
    private String fax;
    private String description;
    private Integer isdelete;

    public Supplier() {
    }

    public Supplier(Integer id, String name, String linkman, String phone, String address, String fax, String description, Integer isdelete) {
        this.id = id;
        this.name = name;
        this.linkman = linkman;
        this.phone = phone;
        this.address = address;
        this.fax = fax;
        this.description = description;
        this.isdelete = isdelete;
    }
}

```

```java
/**
     * 供应商列表查询
     * @param name
     * @return
     */
    List<Supplier> selectAll(String name);

    /**
     * 新增
     */
    int add(Supplier supplier);

    /**
     * 根据id获取要更新的数据
     */
    Supplier findById(String id);

    /**
     * 根据用户ID更新数据
     */
    int updateUser(Supplier supplier);

    /**
     * 根据ID删除(逻辑删除)
     * @param id
     * @return
     */
    int deleteById(String id);
```

```java
@Override
    public List<Supplier> selectAll(String name) {
        if (name != null && !"".equals(name)){
            return DButils.commonQuery(Supplier.class, "select * from tb_supplier where isdelete=0 and name like ?", "%" + name + "%");
        }else {
            return DButils.commonQuery(Supplier.class, "select * from tb_supplier where isdelete=0");
        }
    }

    @Override
    public int add(Supplier supplier) {
        return DButils.commonInsert("insert into tb_supplier values(null,?,?,?,?,?,?,0)",
                supplier.getName(),supplier.getLinkman(),supplier.getPhone(),
                supplier.getAddress(),supplier.getFax(),supplier.getDescription()
        );
    }

    @Override
    public Supplier findById(String id) {
        ArrayList<Supplier> suppliers = DButils.commonQuery(Supplier.class, "select * from tb_supplier where id=?", id);
        if (suppliers.size()>0){
            return suppliers.get(0);
        }else {
            return null;
        }
    }

    @Override
    public int updateUser(Supplier supplier) {
        return DButils.commonUpdate("update tb_supplier set name=?,likeman=?,phone=?,address=?,fax=?,description=? where id=?",
                supplier.getName(),
                supplier.getLinkman(),
                supplier.getPhone(),
                supplier.getAddress(),
                supplier.getFax(),
                supplier.getDescription()
        );
    }

    @Override
    public int deleteById(String id) {
        return DButils.commonUpdate("update tb_supplier set isdelete = 1 where id = ?",id);
    }
```

业务层省略

控制层

```java
			req.setCharacterEncoding("UTF-8");
            resp.setContentType("text/html;charset=utf-8");
            //获取请求
            String action = req.getParameter("action");
            //查询列表
            if (action.equals("list")){
                String name = req.getParameter("name");
                List<Supplier> suppliers = supplier.selectAll(name);
                //存储起来
                req.setAttribute("suppliers",suppliers);
                req.getRequestDispatcher("/supplier-list.jsp").forward(req,resp);
            }
```

前端代码

EL表达式的用法

```
	<!-- jstl    -->
    <dependency>
      <groupId>jstl</groupId>
      <artifactId>jstl</artifactId>
      <version>1.2</version>
    </dependency>
```

```
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
```

页面上记得把这个el表达式语句打开

```
isELIgnored="false"
```

```
<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false" %>
```

```jsp
<%--
                            items：要循环的结合
                            requestScope.suppliersList:从request中取值
                            var:循环变量
                        --%>
                        <c:forEach items="${requestScope.suppliersList}" var="p">
                            <tr>
                                <td>
                                    <input type="checkbox" name="id" value="1"   lay-skin="primary">
                                </td>
                                <td>${p.id}</td>
                                <td>${p.name}</td>
                                <td>${p.linkman}</td>
                                <td>${p.phone}</td>
                                <td>${p.address}</td>
                                <td>${p.fax}</td>
                                <td>${p.description}</td>
                                <td class="td-manage">
                                    <a title="个人信息"  onclick="xadmin.open('个人信息','userServlet?action=details&id=<%=u.getId()%>',600,400)" href="javascript:;">
                                        <i class="layui-icon">&#xe66e;</i>
                                    </a>
                                    <a title="编辑"  onclick="xadmin.open('编辑','userServlet?action=goUpdate&id=<%=u.getId()%>',600,400)" href="javascript:;">
                                        <i class="layui-icon">&#xe642;</i>
                                    </a>
                                    <a onclick="xadmin.open('修改密码','member-password.html',600,400)" title="修改密码" href="javascript:;">
                                        <i class="layui-icon">&#xe631;</i>
                                    </a>
                                    <a title="删除" href="javascript:deleteUsers();">
                                        <i class="layui-icon">&#xe640;</i>
                                    </a>
                                </td>
                            </tr>
                        </c:forEach>
```

### 供应商列表搜索数据回显

```jsp
<input type="text" name="name"  placeholder="请输入供应商名" autocomplete="off" class="layui-input" value="${requestScope.name}" >
```

### 供应商的数据添加

前端页面

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html class="x-admin-sm">

<head>
  <meta charset="UTF-8">
  <title>超市账单管理系统</title>
  <meta name="renderer" content="webkit">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width,user-scalable=yes, minimum-scale=0.4, initial-scale=0.8,target-densitydpi=low-dpi" />
  <link rel="stylesheet" href="./css/font.css">
  <link rel="stylesheet" href="./css/xadmin.css">
  <script type="text/javascript" src="./lib/layui/layui.js" charset="utf-8"></script>
  <script type="text/javascript" src="./js/xadmin.js"></script>
  <!-- 让IE8/9支持媒体查询，从而兼容栅格 -->
  <!--[if lt IE 9]>
  <script src="https://cdn.staticfile.org/html5shiv/r29/html5.min.js"></script>
  <script src="https://cdn.staticfile.org/respond.js/1.4.2/respond.min.js"></script>
  <![endif]-->
</head>
<body>
<div class="layui-fluid">
  <div class="layui-row">
    <form class="layui-form" action="/SupplierServlet?action=add" method="post">
      <div class="layui-form-item">
        <label for="name" class="layui-form-label">
          <span class="x-red">*</span>供应商名称</label>
        <div class="layui-input-inline">
          <input type="text" id="name" name="name" required="" lay-verify="email" autocomplete="off" class="layui-input">
        </div>
        <div class="layui-form-mid layui-word-aux">
          <span class="x-red">*</span>请输入供应商名称
        </div>
      <div class="layui-form-item">
        <label for="linkman" class="layui-form-label">
          <span class="x-red">*</span>联系人
        </label>
        <div class="layui-input-inline">
          <input type="text" id="linkman" name="linkman" required="" lay-verify="pass" autocomplete="off" class="layui-input">
        </div>
        <div class="layui-form-mid layui-word-aux">
          <span class="x-red">*</span>请输入联系人
        </div>
      </div>
      <div class="layui-form-item">
        <label for="phone" class="layui-form-label">
          <span class="x-red">*</span>联系电话
        </label>
        <div class="layui-input-inline">
          <input type="text" id="phone" name="phone" required="" lay-verify="repass" autocomplete="off" class="layui-input">
        </div>
      </div>
      <div class="layui-form-item">
        <label for="address" class="layui-form-label">
          <span class="x-red">*</span>联系地址
        </label>
        <div class="layui-input-inline">
          <input type="text" id="address" name="address" required="" lay-verify="repass" autocomplete="off" class="layui-input">
        </div>
      </div>
      <div class="layui-form-item">
        <label for="fax" class="layui-form-label">
          <span class="x-red">*</span>传真
        </label>
        <div class="layui-input-inline">
          <input type="text" id="fax" name="fax" required="" lay-verify="repass" autocomplete="off" class="layui-input">
        </div>
      </div>
        <div class="layui-form-item">
          <label for="description" class="layui-form-label">
          <span class="x-red">*</span>描述</label>
          <div class="layui-input-inline">
            <input type="text" id="description" name="description" required="" lay-verify="repass" autocomplete="off" class="layui-input">
          </div>
        </div>
      <div class="layui-form-item">
        <label class="layui-form-label"></label>
        <button class="layui-btn" lay-filter="add" type="submit">添加</button>
      </div>
    </form>
  </div>
</div>
<script>
  layui.use(['form', 'layer','jquery'],
        function() {
          $ = layui.jquery;
          var form = layui.form,
                  layer = layui.layer;

          //自定义验证规则
          form.verify({
            nikename: function(value) {
              if (value.length < 5) {
                return '昵称至少得5个字符啊';
              }
            },
            pass: [/(.+){6,12}$/, '密码必须6到12位'],
            repass: function(value) {
              if ($('#L_pass').val() != $('#L_repass').val()) {
                return '两次密码不一致';
              }
            }
          });

          //监听提交
          form.on('submit(add)',
                  function(data) {
                    console.log(data);
                    //发异步，把数据提交给php
                    layer.alert("增加成功", {
                              icon: 6
                            },
                            function() {
                              //关闭当前frame
                              xadmin.close();

                              // 可以对父窗口进行刷新
                              xadmin.father_reload();
                            });
                    return false;
                  });

        });</script>
<script>var _hmt = _hmt || []; (function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?b393d153aeb26b46e9431fabaf0f6190";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();</script>
</body>

</html>
<script>
  layui.use(['form', 'util', 'laydate'], function(){
    var form = layui.form;
    var layer = layui.layer;
    var util = layui.util;
    var laydate = layui.laydate;

  });
</script>

```

后端代码

```java
//新增
            if (action.equals("add")){
                String name = req.getParameter("name");
                String linkman = req.getParameter("linkman");
                String phone = req.getParameter("phone");
                String address = req.getParameter("address");
                String fax = req.getParameter("fax");
                String description = req.getParameter("description");
                //封装对象
                Supplier supplier1 = new Supplier(null,name,linkman,phone,address,fax,description,0);
                int add = supplier.add(supplier1);
                PrintWriter writer = resp.getWriter();
                if (add>0){
                    writer.print("<script>" +
                            "alert('用户新增成功');" +
                            "window.parent.location.href = '/SupplierServlet?action=list'" +
                            "</script>");
                }else {
                    writer.print("<script>" +
                            "alert('用户新增失败');location.href = '/supplier-add.jsp'" +
                            "</script>");
                }
            }
```

### 供应商数据显示

前端代码

```html
<%@ page import="cn.lanqiao.pojo.User" %>
<%@ page import="cn.lanqiao.pojo.Supplier" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
    <title>Title</title>
    <link rel="stylesheet" href="./css/font.css">
    <link rel="stylesheet" href="./css/xadmin.css">
    <script type="text/javascript" src="./lib/layui/layui.js" charset="utf-8"></script>
    <script type="text/javascript" src="./js/xadmin.js"></script>
    <script src="https://cdn.staticfile.org/html5shiv/r29/html5.min.js"></script>
    <script src="https://cdn.staticfile.org/respond.js/1.4.2/respond.min.js"></script>
</head>
<body>
<div class="layui-form-item">
    <label class="layui-form-label">供应商编码:</label><span style="position: relative;top: 11px">${requestScope.supplier1.id}</span>
</div>
<div class="layui-form-item">
    <label class="layui-form-label">供应商名称:</label><span style="position: relative;top: 11px">${requestScope.supplier1.name}</span>
</div>
<div class="layui-form-item">
    <label class="layui-form-label">联系人:</label><span style="position: relative;top: 11px">${requestScope.supplier1.linkman}</span>
</div>
<div class="layui-form-item">
    <label class="layui-form-label">联系电话:</label><span style="position: relative;top: 11px">${requestScope.supplier1.phone}</span>
</div>
<div class="layui-form-item">
    <label class="layui-form-label">地址:</label><span style="position: relative;top: 11px">${requestScope.supplier1.address}</span>
</div>
<div class="layui-form-item">
    <label class="layui-form-label">传真:</label><span style="position: relative;top: 11px">${requestScope.supplier1.fax}</span>
</div>
<div class="layui-form-item">
    <label class="layui-form-label">简介:</label><span style="position: relative;top: 11px">${requestScope.supplier1.description}</span>
</div>
</body>
</html>

```

后端代码

```java
//显示个人信息
            if (action.equals("details")){
            //获取用户要显示的详情id
            String id = req.getParameter("id");
            Supplier supplier1 = supplier.findById(id);
            req.setAttribute("supplier1",supplier1);
            req.getRequestDispatcher("/supplier-view.jsp").forward(req,resp);
        }
```

### 准备供应商编辑页面

### 供应商的编辑数据回显

```html
<div class="layui-fluid">
    <div class="layui-row">
        <form class="layui-form" action="#" method="post">
            <div class="layui-form-item">
                <label for="name" class="layui-form-label">
                    <span class="x-red">*</span>供应商名称
                </label>
                <div class="layui-input-inline">
                    <input type="text" value="${requestScope.supplierById.name}" id="name" name="name" required="" lay-verify="pass" autocomplete="off" class="layui-input">
                </div>
                <div class="layui-form-mid layui-word-aux">
                    <span class="x-red">*</span>请输入供应商名称
                </div>
            </div>
                <div class="layui-form-item">
                    <label for="linkman" class="layui-form-label">
                        <span class="x-red">*</span>联系人
                    </label>
                    <div class="layui-input-inline">
                        <input type="text" value="${requestScope.supplierById.linkman}" id="linkman" name="linkman" required="" lay-verify="pass" autocomplete="off" class="layui-input">
                    </div>
                    <div class="layui-form-mid layui-word-aux">
                        <span class="x-red">*</span>请输入联系人
                    </div>
                </div>
                <div class="layui-form-item">
                    <label for="phone" class="layui-form-label">
                        <span class="x-red">*</span>联系电话
                    </label>
                    <div class="layui-input-inline">
                        <input type="text" value="${requestScope.supplierById.phone}" id="phone" name="phone" required="" lay-verify="repass" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label for="address" class="layui-form-label">
                        <span class="x-red">*</span>联系地址
                    </label>
                    <div class="layui-input-inline">
                        <input type="text" value="${requestScope.supplierById.address}" id="address" name="address" required="" lay-verify="repass" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label for="fax" class="layui-form-label">
                        <span class="x-red">*</span>传真
                    </label>
                    <div class="layui-input-inline">
                        <input type="text" value="${requestScope.supplierById.fax}" id="fax" name="fax" required="" lay-verify="repass" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label for="description" class="layui-form-label">
                        <span class="x-red">*</span>描述</label>
                    <div class="layui-input-inline">
                        <input type="text" value="${requestScope.supplierById.description}" id="description" name="description" required="" lay-verify="repass" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label"></label>
                    <button class="layui-btn" lay-filter="add" type="submit">保存</button>
                </div>
            </div>
        </form>
    </div>
</div>
```

### 供应商数据的更新

```java
 <form class="layui-form" action="/SupplierServlet?action=update&id=${requestScope.supplierById.id}" method="post">
```

后端代码

```java
@Override
    public int updateUser(Supplier supplier) {
        return DButils.commonUpdate("update tb_supplier set name=?,linkman=?,phone=?,address=?,fax=?,description=? where id=?",
                supplier.getName(),
                supplier.getLinkman(),
                supplier.getPhone(),
                supplier.getAddress(),
                supplier.getFax(),
                supplier.getDescription(),
                supplier.getId()
        );
    }
```



```java
//更新
            if (action.equals("update")){
                String id = req.getParameter("id");
                String name = req.getParameter("name");
                String linkman = req.getParameter("linkman");
                String phone = req.getParameter("phone");
                String address = req.getParameter("address");
                String fax = req.getParameter("fax");
                String description = req.getParameter("description");
                Supplier supplier1 = new Supplier(Integer.valueOf(id),name,linkman,phone,address,fax,description);
                int i = supplier.updateUser(supplier1);
                PrintWriter writer = resp.getWriter();
                if (i>0){
                    writer.print("<script>" +
                            "alert('用户修改成功');" +
                            "window.parent.	location.href = '/SupplierServlet?action=list'" +
                            "</script>");
                }else {
                    writer.print("<script>" +
                            "alert('用户修改失败');location.href = /SupplierServlet?action=goUpdate&id="+id+";</script>"
                    );
                }
            }
```

### 供应商获取删除的ID

```html
<a title="删除" href="javascript:deleteUsers(${p.id});">
   <i class="layui-icon">&#xe640;</i>
</a>
```

```js
function deleteUsers(id){
        layer.msg(' 确定要删除吗?', {
            time: 20000, //20s后自动关闭
            btn: ['确定', '取消'],
            yes: function (index, layero) {
                self.location = '/SupplierServlet?action=delete&id='+id;//确定按钮跳转地址
            }
        });
    }
    $('#layerDemo .layui-btn').on('click', function () {
        var othis = $(this), method = othis.data('method');
        active[method] ? active[method].call(this, othis) : '';
    });
```

后端代码

```java
//删除
            if (action.equals("delete")){
                String id = req.getParameter("id");
                System.out.println("要删除的id是:"+id);
            }
```

## 超市账单管理系统-账单

### 根据供应商的ID查询账单集合

由于供应商和账单有关系所以需要创建账单表

![image-20230304204632802](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202304201117214.png)

![image-20230304204637147](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202304201117257.png)

需要创建账单表的实体类以及业务层和dao层

```java
package cn.lanqiao.pojo;

import lombok.Data;

/**
 * 账单实现类
 */
@Data
public class Bills {
    private Integer id;
    private String title;
    private String unit;
    private Integer num;
    private Integer money;
    private Integer providerid;//供应商外键
    private Integer ispay;
    private Integer isdelete;

    public Bills() {
    }

    public Bills(Integer id, String title, String unit, Integer num, Integer money, Integer providerid, Integer ispay, Integer isdelete) {
        this.id = id;
        this.title = title;
        this.unit = unit;
        this.num = num;
        this.money = money;
        this.providerid = providerid;
        this.ispay = ispay;
        this.isdelete = isdelete;
    }
}

```

```java
/**
     * 根据供应商id查询账单信息集合
     * @param prividerId
     * @return
     */
    List<Bills> listByProviderId(String prividerId);
```

```java
@Override
    public List<Bills> listByProviderId(String prividerId) {
        return DButils.commonQuery(Bills.class,"select * from tb_bills where isdelete = 0 and providerid = ?",prividerId);
    }
```

去供应商控制层调用业务层操作

```java
//删除
            if (action.equals("delete")){
                String id = req.getParameter("id");
                System.out.println("要删除的id是:"+id);
                List<Bills> bills = billsService.listByProviderId(id);
                PrintWriter out = resp.getWriter();
                //这个要删除的供应商数据是否在使用中，如果是，那么不能删除，如果没有使用中可以删除
                if (bills!=null && bills.size()>0){
                    //表示这个供应商下面有账单数据，不能删除!
                    out.print("<script>" +
                            "alert('供应商下有账单数据,请勿删除');" +
                            "window.location.href = '/SupplierServlet?action=list'" +
                            "</script>");
                }else {
                    //表示这个供应商可以被删除
                    int i = supplier.deleteById(id);
                    if (i>0){
                        out.print("<script>" +
                                "alert('删除成功');" +
                                "window.location.href = '/SupplierServlet?action=list'" +
                                "</script>");
                    }else {
                        out.print("<script>" +
                                "alert('删除失败');" +
                                "window.location.href = '/SupplierServlet?action=list'" +
                                "</script>");
                    }
                }
            }
```

### 账单查询的业务方法

```java
/**
     * 账单搜索业务方法
     * @param title
     * @param providerId
     * @param ispay
     * @return
     */
    @Override
    public List<Bills> list(String title, String providerId, String ispay) {
        StringBuilder stringBuilder = new StringBuilder("select * from tb_bills where isdelete = 0");
        List<Object> parms = new ArrayList<Object>();
        if (title!=null&&!"".equals(title)){
            stringBuilder.append(" and title like ?");
            parms.add("%"+title+"%");
        }
        if (providerId!=null&&!"-1".equals(providerId)){
            stringBuilder.append(" and providerId=?");
            parms.add(providerId);
        }
        if (ispay!=null&&!"-1".equals(ispay)){
            stringBuilder.append(" and isplay=?");
            parms.add(ispay);
        }
        return DButils.commonQuery(Bills.class,stringBuilder.toString(),parms.toArray());
    }
```

控制层

```java
//账单列表查询
        if (action.equals("list")){
            String title = req.getParameter("title");
            String providerid = req.getParameter("providerid");
            String ispay = req.getParameter("ispay");
            //查询到的账单数据
            List<Bills> billList = billsService.list(title, providerid, ispay);
            //存值转发
            req.setAttribute("billList",billList);
            req.getRequestDispatcher("bill-list.jsp").forward(req,resp);
           
        }
```

前端页面

```java
<div class="layui-card-body ">
                    <table class="layui-table layui-form">
                        <thead>
                        <tr>
                            <th>
                                <input type="checkbox" name="" lay-skin="primary">
                            </th>
                            <th>账单编码</th>
                            <th>商品名称</th>
                            <th>供应商</th>
                            <th>账单金额</th>
                            <th>是否付款</th>
                            <th>商品单位</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <c:forEach items="${requestScope.billList}" var="p">
                            <tr>
                                <td>
                                    <input type="checkbox" name="" lay-skin="primary">
                                </td>
                                <td>${p.id}</td>
                                <td>${p.title}</td>
                                <td>${p.providerid}</td>
                                <td>${p.money}</td>
                                <td>${p.ispay==1?"已付款":"未付款"}</td>
                                <td>${p.unit}</td>
                                <td class="td-manage">
                                    <a title="查看" onclick="xadmin.open('编辑','order-view.html')" href="javascript:;">
                                        <i class="layui-icon">&#xe63c;</i></a>
                                    <a title="删除" onclick="member_del(this,'要删除的id')" href="javascript:;">
                                        <i class="layui-icon">&#xe640;</i></a>
                                </td>
                            </tr>
                        </c:forEach>
                        </tbody>
                    </table>
                </div>
                <div class="layui-card-body">
                    <div class="page">
                        <div>
                            <a class="prev" href="">&lt;&lt;</a>
                            <a class="num" href="">1</a>
                            <span class="current">2</span>
                            <a class="num" href="">3</a>
                            <a class="num" href="">489</a>
                            <a class="next" href="">&gt;&gt;</a>
                        </div>
                    </div>
                </div>
            </div>
```

这里需要修改一下供应商名称

需要现在实体类中添加属性

```java
private String providerName;//扩展字段，为了数据显示
```

在业务层实现层做逻辑处理

```java
@Override
    public List<Bills> list(String title, String prividerId, String ispay) {
        List<Bills> list = billsDao.list(title, prividerId, ispay);
        for (Bills b: list) {
            Integer providerid = b.getProviderid();
            Supplier byId = supplierDao.findById(String.valueOf(providerid));
            b.setProviderName(byId.getName());
        }
        return list;
    }
```

在页面上进行修改

```java
<td>${p.providerName}</td>
```

### 供应商搜索回显

后端代码

```java
			//回显的数据
            req.setAttribute("title",title);
            req.setAttribute("providerid",providerid);
            req.setAttribute("ispay",ispay);
```

前端代码

```java
<form class="layui-form layui-col-space5" action="/BillsServlet?action=list" method="post">
                        <div class="layui-input-inline layui-show-xs-block">
                            <select name="providerid">
                                <option value="-1">---选择供应商---</option>
                                <c:forEach var="a" items="${requestScope.suppliersList}">
                                    <%--做回显--%>
                                    <option value="${a.id}"${requestScope.providerid==a.id?"selected":""}>${a.name}</option>
                                </c:forEach>
                            </select>
                        </div>
                        <div class="layui-input-inline layui-show-xs-block">
                            <select name="ispay">
                                <option value="-1" ${requestScope.ispay=="-1"?"selected":""}>---是否付款---</option>
                                <option value="1" ${requestScope.ispay=="1"?"selected":""}>已付款</option>
                                <option ${requestScope.ispay=="0"?"selected":""}>待付款</option>
                            </select>
                        </div>
                        <div class="layui-input-inline layui-show-xs-block">
                            <input type="text" name="username" placeholder="请输入商品的名称" autocomplete="off" class="layui-input"></div>
                        <div class="layui-input-inline layui-show-xs-block">
                            <button class="layui-btn" lay-submit="" lay-filter="sreach">
                                <i class="layui-icon">&#xe615;</i></button>
                        </div>
                    </form>
```

### 账单详情功能

后端代码

```java
/**
     * 通过id查询信息
     * @param id
     * @return
     */
    Bills findById(String id);
```

```java
public Bills findById(String id) {
        ArrayList<Bills> bills = DButils.commonQuery(Bills.class, "select * from tb_bills where id=?", id);
        if (bills.size()>0){
            return bills.get(0);
        }else {
            return null;
        }
    }
```

```java
//显示个人信息
        if (action.equals("details")){
            String id = req.getParameter("id");
            //账单对象
            Bills billsById = billsService.findById(id);
            //供应商对象
            Supplier suppliers = supplierService.findById(String.valueOf(billsById.getProviderid()));
            System.out.println(suppliers.getName());
            //给扩展字段赋值
            billsById.setProviderName(suppliers.getName());
            req.setAttribute("billsById",billsById);
            req.getRequestDispatcher("/bill-view.jsp").forward(req,resp);
        }
```

前端代码

页面

```java
<div class="layui-form-item">
    <label class="layui-form-label">账单编码:</label><span style="position: relative;top: 11px">${requestScope.billsById.id}</span>
</div>
<div class="layui-form-item">
    <label class="layui-form-label">商品名称:</label><span style="position: relative;top: 11px">${requestScope.billsById.title}</span>
</div>
<div class="layui-form-item">
    <label class="layui-form-label">供应商:</label><span style="position: relative;top: 11px">${requestScope.billsById.providerName}</span>
</div>
<div class="layui-form-item">
    <label class="layui-form-label">账单金额:</label><span style="position: relative;top: 11px">${requestScope.billsById.money}</span>
</div>
<div class="layui-form-item">
    <label class="layui-form-label">商品单位:</label><span style="position: relative;top: 11px">${requestScope.billsById.unit}</span>
</div>
<div class="layui-form-item">
    <label class="layui-form-label">商品数量:</label><span style="position: relative;top: 11px">${requestScope.billsById.num}</span>
</div>
<div class="layui-form-item">
    <label class="layui-form-label">是否付款:</label><span style="position: relative;top: 11px">${requestScope.billsById.ispay==1?"已付款":"未付款"}</span>
</div>
```



### 账单删除功能

后端代码

```java
/**
     * 根据id删除
     * @param id
     * @return
     */
    int deleteById(String id);
```

```java
@Override
    public int deleteById(String id) {
        return DButils.commonUpdate("update tb_bills set isdelete = 1 where id = ?",id);
    }
```

```java
//删除
        if (action.equals("delete")){
            String id = req.getParameter("id");
            int i = billsService.deleteById(id);
            PrintWriter writer = resp.getWriter();
            if (i>0){
                writer.print("<script>" +
                        "alert('删除成功');" +
                        "window.location.href = '/BillsServlet?action=list'" +
                        "</script>"
                );
            }else {
                writer.print("<script>" +
                        "alert('删除失败');" +
                        "window.location.href = '/BillsServlet?action=list'" +
                        "</script>"
                );
            }
        }
```

前端代码

```java
<a title="删除" href="javascript:deleteUsers(${p.id});">
                                        <i class="layui-icon">&#xe640;</i>
                                    </a>
```

```java
<script>
    function deleteUsers(id){
        layer.msg(' 确定要删除吗?', {
            time: 20000, //20s后自动关闭
            btn: ['确定', '取消'],
            yes: function (index, layero) {
                self.location = '/BillsServlet?action=delete&id='+id;//确定按钮跳转地址
            }
        });
    }
    $('#layerDemo .layui-btn').on('click', function () {
        var othis = $(this), method = othis.data('method');
        active[method] ? active[method].call(this, othis) : '';
    });
</script>
```

## 超市账单管理系统-修改密码

### jquery版本Post请求Ajax

判断原密码输入框是否为空

```java
<div class="layui-input-inline">
          <input type="password" id="oldPassword" name="oldpass" class="layui-input" required/>
          <div class="layui-form-mid layui-word-aux" id="oldPasswordSpan"></div>
        </div>
```

```java
//检查原密码合法性
  var oldPassword = document.querySelector('#oldPassword');
  //文本框焦点事件
  oldPassword.onblur = function (){
    //获取原密码
    var oldPassword = $("#oldPassword").val();
    if (oldPassword == ""){
      $("#oldPasswordSpan").text("原密码不能为空!");
      $("#oldPasswordSpan").color("color","red");
    }
 }
```

判断输入的原密码是否正确

前端发送ajax请求

```java
//验证用户输入的密码是否正确，Jquery版本的Ajax请求
    $.ajax({
      type:"POST",
      url:"userServlet",
      data:"action=checkOldPass&oldPassword="+oldPassword,
      dataType:"text",//服务器响应数据的格式
      //result:后端响应的数据
      success:function (result){
        // alert("服务器响应的数据:"+result);
        //根据后端响应的数据进行判断
        if (result=="0"){
          $("#oldPasswordSpan").text("原密码填写错误!");
          $("#oldPasswordSpan").color("color","red");
          return false;
        }else if (result=="1"){
          $("#oldPasswordSpan").text("原密码填写正确!");
          $("#oldPasswordSpan").color("color","green");
          return true;
        }
      }
    });
```

后台返回请求数据

```java
		//检查用户输入的原密码是否正确
        if(value.equals("checkOldPass")){
            //用户输入的原密码
            String oldPassword = req.getParameter("oldPassword");
            //获取当前登录的密码
            User users = (User) session.getAttribute("loginUser");
            //判断
            PrintWriter writer = resp.getWriter();
            if (users.getPassword().equals(oldPassword)){
                //原始密码输入正确
                writer.print("1");
            }else {
                //原始密码输入不正确
                writer.print("0");
            }
        }
```

### 前端的修改密码验证

```html
<form class="layui-form">
      <div class="layui-form-item">
        <label for="oldPassword" class="layui-form-label">
          <span class="x-red">*</span>旧密码
        </label>
        <div class="layui-input-inline">
          <input type="text" id="oldPassword" name="oldpass" lay-verify="required" autocomplete="off" class="layui-input"/>
        </div>
        <div class="layui-form-mid" id="oldPasswordSpan"></div>
      </div>
      <div class="layui-form-item">
        <label for="newPassword" class="layui-form-label">
          <span class="x-red">*</span>新密码
        </label>
        <div class="layui-input-inline">
          <input type="text" id="newPassword" name="newpass" required="" lay-verify="required" autocomplete="off" class="layui-input">
        </div>
        <div class="layui-form-mid" id="newPasswordSpan"></div>
      </div>
      <div class="layui-form-item">
        <label for="confirmPassword" class="layui-form-label">
          <span class="x-red">*</span>确认密码
        </label>
        <div class="layui-input-inline">
          <input type="text" id="confirmPassword" name="repass" required="" lay-verify="required" autocomplete="off" class="layui-input">
        </div>
        <div class="layui-form-mid" id="reconfirmPassword"></div>
      </div>
      <div class="layui-form-item" style="margin-left: 180px">
        <button class="layui-btn" lay-filter="save" lay-submit="" type="submit">保存</button>
      </div>
    </form>
```



```js
<script type="text/javascript">
  layui.use('layer', function () {
    var $ = layui.jquery, layer = layui.layer;
    //检查原密码合法性
    var oldPassword = document.querySelector('#oldPassword');
    //文本框焦点事件
    oldPassword.onblur = function checkOldPassword(){
      //获取原密码
      var oldPassword = $("#oldPassword").val();
      if (oldPassword == ""){
        $("#oldPasswordSpan").text("原密码不能为空!");
        $("#oldPasswordSpan").css("color","red");
      }
      //验证用户输入的密码是否正确，Jquery版本的Ajax请求
      $.ajax({
        type:"POST",
        url:"userServlet",
        data:"action=checkOldPass&oldPassword="+oldPassword,
        dataType:"text",//服务器响应数据的格式
        //result:后端响应的数据
        success:function (result){
          // alert("服务器响应的数据:"+result);
          //根据后端响应的数据进行判断
          if (result=="0"){
            $("#oldPasswordSpan").text("原密码填写错误!");
            $("#oldPasswordSpan").css("color","red");
            return false;
          }else if (result=="1"){
            $("#oldPasswordSpan").text("√");
            $("#oldPasswordSpan").css("color","green");
            return true;
          }
        }
      });
    }
    //新密码框
    var newPassword = document.querySelector('#newPassword');
    //鼠标离开焦点事件
    //新密码框校验事件
  var newPassword = document.querySelector("#newPassword");
  //鼠标离开事件
  newPassword.onblur = function checkNewPassword(){
    //原始密码
    var oldPassword = $("#oldPassword").val();
    //新密码
    var newPassword = $("#newPassword").val();
    if (newPassword == ""){
      $("#newPasswordSpan").text("新密码不能为空!");
      $("#newPasswordSpan").css("color","red");
    }else if (newPassword == oldPassword){
      $("#newPasswordSpan").text("新密码不能和旧密码相同!");
      $("#newPasswordSpan").css("color","red");
    }else {
      $("#newPasswordSpan").text("√");
      $("#newPasswordSpan").css("color","green");
    }
    //确认新密码框
    var confirmPassword = document.querySelector('#confirmPassword');
    confirmPassword.onblur = function checkerNewPassword(){
      //新密码
      var newPassword = $("#newPassword").val();
      //确认新密码
      var confirmPassword = $("#confirmPassword").val();
      if(newPassword!=confirmPassword){
        $("#reconfirmPassword").text("两次密码输入不相同!");
        $("#reconfirmPassword").css("color","red");
        return false;
      }
      $("#reconfirmPassword").text("√");
      $("#reconfirmPassword").css("color","green");
      return true;
    }
  });
</script>
```

### 如果没有填写文本框数据不能提交代码

```html
<form class="layui-form" method="post" onsubmit="return checkOldPassword()&&checkNewPassword()&&checkerNewPassword();">
```

### 用户密码修改

后端密码校验

```java
//修改当前用户密码
        if (value.equals("updatePwd")){
            //获取当前登录的密码
            User users = (User) session.getAttribute("loginUser");
            //旧密码
            String oldpass = req.getParameter("oldpass");
            //新密码
            String newpass = req.getParameter("newpass");
            //确认密码
            String repass = req.getParameter("repass");
            //判断
            PrintWriter writer = resp.getWriter();
            if (oldpass.equals(users.getUsername())){
                if (!oldpass.equals(newpass)){
                    if (newpass.equals(repass)){
						//修改密码的代码
                    }else {
                        writer.print(
                                "<script>" +
                                        "alert('两次输入的密码必须一致!');" +
                                        "window.location.href = '/member-password.jsp';" +
                                "</script>"
                        );
                    }
                }else {
                    writer.print(
                            "<script>" +
                                    "alert('要修改的密码不能跟旧密码相同!');" +
                                    "window.location.href = '/member-password.jsp';" +
                                    "</script>"
                    );
                }
            }else {
                writer.print(
                        "<script>" +
                                "alert('原始密码输入错误!');" +
                                "window.location.href = '/member-password.jsp';" +
                        "</script>"
                );
            }

        }
```

数据库访问层

```java
/**
     * 修改当前用户的密码
     * @param userId
     * @param newPwd
     * @return
     */
    int updatePwd(Integer userId,String newPwd);
```

数据库访问层实现类

```java
@Override
    public int updatePwd(Integer userId, String newPwd) {
        return DButils.commonUpdate("update tb_users set password = ? where id =?",userId,newPwd);
    }
```

业务层处理省略，比较简单

控制层代码

```java
//修改当前用户密码
        if (value.equals("updatePwd")){
            //获取当前登录的密码
            User users = (User) session.getAttribute("loginUser");
            //旧密码
            String oldpass = req.getParameter("oldpass");
            //新密码
            String newpass = req.getParameter("newpass");
            //确认密码
            String repass = req.getParameter("repass");
            //判断
            PrintWriter writer = resp.getWriter();
            if (oldpass.equals(users.getPassword())){
                if (!oldpass.equals(newpass)){
                    if (newpass.equals(repass)){
                        //修改密码
                        int i = userService.updatePwd(users.getId(), newpass);
                        System.out.println(i);
                        if (i>0){
                            //密码修改成功,清空Session，跳转登录
                            session.invalidate();
                            writer.print(
                                    "<script>" +
                                            "alert('密码修改完毕，重新登录!');" +
                                            "window.location.href = '/login.jsp';" +
                                    "</script>"
                            );
                        }else{
                            writer.print(
                                    "<script>" +
                                            "alert('密码修改异常!');" +
                                            "window.location.href = '/member-password.jsp';" +
                                    "</script>"
                            );
                        }
                    }else {
                        writer.print(
                                "<script>" +
                                        "alert('两次输入的密码必须一致!');" +
                                        "window.location.href = '/member-password.jsp';" +
                                "</script>"
                        );
                    }
                }else {
                    writer.print(
                            "<script>" +
                                    "alert('要修改的密码不能跟旧密码相同!');" +
                                    "window.location.href = '/member-password.jsp';" +
                                    "</script>"
                    );
                }
            }else {
                writer.print(
                        "<script>" +
                                "alert('原始密码输入错误!');" +
                                "window.location.href = '/member-password.jsp';" +
                        "</script>"
                );
            }

        }
```

Post请求的简写方式

![image-20230308132942006](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202304201117443.png)

![image-20230308133327563](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202304201117335.png)

### 输入的内容验证成功才能提交请求

```java
<form class="layui-form" action="/userServlet?action=updatePwd" method="post" onsubmit="return checkAll();">
```

![image-20230308144713989](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202304201117973.png)

![image-20230308144720776](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202304201117354.png)



## 超市账单管理系统-供应商新增的业务需求(Ajax异步方式通过JSON返回)

java对象转Json字符串

```java
//根据id查询一个Java对象
        User byId = userService.findById("1");
        System.out.println("Java对象是:"+byId);
        //通过fastjson转换成json字符串对象
        String s = JSONObject.toJSONString(byId);
        System.out.println("转换的JSON对象是:"+s);
```

通过fastjson将JSON字符串对象转换成Java对象

```
 //通过fastjson将JSON字符串对象转换成Java对象
        User user = JSONObject.parseObject(b, User.class);
        System.out.println("转换成的Java对象是:"+user);
```

### 异步发送请求获取供应商下拉框

前端发送请求

```js
<%--异步获取下拉框--%>
<script type="text/javascript">
    //页面加载的时候执行
    $(function (){
        //发送AJAX异步请求去Servlet后台获取供应商下拉框的数据
        $.get("/BillsServlet?action=loadSupplier",function (result){

        },"json");//返回JSON数据
    });
</script>
```

后端接受请求

```java
//获取下拉框的数据
        if (action.equals("loadSupplier")){
            //前端发送请求过来
            System.out.println("前端发送了下拉框请求");
        }
```

后端发送在数据库获取的数据

```java
		//获取下拉框的数据
        if (action.equals("loadSupplier")){
            //前端发送请求过来
            System.out.println("前端发送了下拉框请求");
            //查询供应商
            //这是一个Java对象
            List<Supplier> suppliersList = supplierService.selectAll(null);
            //通过fastJson转换字符串
            String jsonString = JSONObject.toJSONString(suppliersList);
            PrintWriter writer = resp.getWriter();
            //响应浏览器一段JSON数据
            writer.print(jsonString);
        }
```

 前端获取后端发送过来的数据

```javascript
<%--异步获取下拉框--%>
<script type="text/javascript">
    //页面加载的时候执行
    $(function (){
        //发送AJAX异步请求去Servlet后台获取供应商下拉框的数据
        $.get("/BillsServlet?action=loadSupplier",function (result){
            for (var i = 0;i<result.length;i++){
                var id = result[i].id;
                var name = result[i].name;
            }
        },"json");//返回JSON数据
    });
</script>
```

最后通过循环遍历的方式赋值到页面上

```javascript
<%--异步获取下拉框--%>
<script type="text/javascript">
    //页面加载的时候执行
    window.onload = function (){
        //发送AJAX异步请求去Servlet后台获取供应商下拉框的数据
        $.get("/BillsServlet?action=loadSupplier",function (result){

            for (var i = 0;i<result.length;i++){
                var id = result[i].id;
                var name = result[i].name;
                console.log(id);
                console.log(name);
                //绑定供应商下拉框
                //.append()：追加
                //正常来说这样去绑定就可以了
                $("#username").append("<option value='"+id+"'>"+name+"</option>");
                //在这个后台管理系统中会自动生成一个列表，所以需要获取这个列表的class再往里面填冲数据
                // $(".layui-anim").append("<dd lay-value='"+name+"' class=''>"+name+"</dd>");
            }
        },"json");//返回JSON数据
    }
</script>
```

这里需要注意:

layui动态渲染

1.有些时候，你的有些表单元素可能是动态插入的。这时 form 模块 的自动化渲染是会对其失效的。虽然我们没有双向绑定机制（因为我们叫经典模块化框架，偷笑.gif） 但没有关系，你只需要执行 form.render(type, filter); 方法即可。

```
function renderForm(){
        layui.use('form',function () {
            let form = layui.form;
            form.render();
        })
    }
```

```
//页面加载的时候执行
    window.onload = function (){
        //发送AJAX异步请求去Servlet后台获取供应商下拉框的数据
        $.get("/BillsServlet?action=loadSupplier",function (result){
            for (var i = 0;i<result.length;i++){
                var id = result[i].id;
                var name = result[i].name;
                //绑定供应商下拉框
                //.append()：追加
                //正常来说这样去绑定就可以了
                $("#username").append("<option value='"+id+"'>"+name+"</option>");
                //在这个后台管理系统中会自动生成一个列表，所以需要获取这个列表的class再往里面填冲数据
                // $(".layui-anim").append("<dd lay-value='"+name+"' class=''>"+name+"</dd>");
                renderForm();
            }
        },"json");//返回JSON数据

    }
```

### 账单添加

前端页面

```
<form class="layui-form" action="/BillsServlet?action=add" method="post">
```

后端代码

```
/**
     * 添加数据
     * @param bills
     * @return
     */
    int addBills(Bills bills);
```

```
@Override
    public int addBills(Bills bills) {
        return DButils.commonInsert("insert into tb_bills values(null,?,?,?,?,?,?,0)",bills.getTitle(),
                bills.getUnit(),bills.getNum(),bills.getMoney(),bills.getProviderid(),bills.getIspay());
    }
```

```
//添加
        if (action.equals("add")){
            //前端发送过来的新增数据
            String title = req.getParameter("title");
            String unit = req.getParameter("unit");
            String num = req.getParameter("num");
            String money = req.getParameter("money");
            String providerid = req.getParameter("providerid");
            String ispay = req.getParameter("ispay");
            //封装对象
            Bills bills = new Bills(null,title,unit,Integer.valueOf(num),Integer.valueOf(money),Integer.valueOf(providerid),Integer.valueOf(ispay),0);
            //调用新增方法
            int i = billsService.addBills(bills);
            PrintWriter writer = resp.getWriter();
            if (i > 0){
                writer.print("<script>" +
                        "alert('账单新增成功');" +
                        "window.parent.location.href = '/BillsServlet?action=list'" +
                        "</script>");
            }else {
                writer.print("<script>" +
                        "alert('账单新增失败');location.href = '/bill-add.jsp'" +
                        "</script>");
            }
        }
```

### 账单修改

跳转账单页面并且回显数据

```
<a title="编辑"  onclick="xadmin.open('编辑','/BillsServlet?action=goupdate&id=${p.id}',600,400)" href="javascript:;">
                                        <i class="layui-icon">&#xe642;</i>
                                    </a>
```

```
 //跳转更新页面
        if (action.equals("goupdate")){
            //获取前端发送过来的ID
            String id = req.getParameter("id");
            //根据ID查询
            Bills bills = billsService.findById(id);
            //存值转发
            req.setAttribute("bills",bills);
            req.getRequestDispatcher("/bill-edit.jsp").forward(req,resp);

        }
```

bill-edit页面

```
<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html class="x-admin-sm">
<head>
    <meta charset="UTF-8">
    <title>超市账单管理系统</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width,user-scalable=yes, minimum-scale=0.4, initial-scale=0.8,target-densitydpi=low-dpi" />
    <link rel="stylesheet" href="./css/font.css">
    <link rel="stylesheet" href="./css/xadmin.css">
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.3/jquery.js"></script>
    <script type="text/javascript" src="./lib/layui/layui.js" charset="utf-8"></script>
    <script type="text/javascript" src="./js/xadmin.js"></script>
    <!-- 让IE8/9支持媒体查询，从而兼容栅格 -->
    <!--[if lt IE 9]>
    <script src="https://cdn.staticfile.org/html5shiv/r29/html5.min.js"></script>
    <script src="https://cdn.staticfile.org/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>
<div class="layui-fluid">
    <div class="layui-row">
        <form class="layui-form" action="/BillsServlet?action=add" method="post">
            <div class="layui-form-item">
                <div class="layui-form-item">
                    <label for="linkman" class="layui-form-label">
                        <span class="x-red">*</span>商品名称
                    </label>
                    <div class="layui-input-inline">
                        <input type="text" id="linkman" name="title" required="" lay-verify="pass" autocomplete="off" class="layui-input">
                    </div>
                    <div class="layui-form-mid layui-word-aux">
                        <span class="x-red">*</span>请输入商品名称
                    </div>
                </div>
                <div class="layui-form-item">
                    <label for="phone" class="layui-form-label">
                        <span class="x-red">*</span>商品单位
                    </label>
                    <div class="layui-input-inline">
                        <input type="text" id="phone" name="unit" required="" lay-verify="repass" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label for="address" class="layui-form-label">
                        <span class="x-red">*</span>商品数量
                    </label>
                    <div class="layui-input-inline">
                        <input type="text" id="address" name="num" required="" lay-verify="repass" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label for="fax" class="layui-form-label">
                        <span class="x-red">*</span>总金额
                    </label>
                    <div class="layui-input-inline">
                        <input type="text" id="fax" name="money" required="" lay-verify="repass" autocomplete="off" class="layui-input">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label for="username" class="layui-form-label">
                        <span class="x-red">*</span>供应商</label>
                    <div class="layui-input-inline" >
                        <select name="providerid" id="username">
                            <option value="-1">----选择供应商----</option>
                        </select>
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label">单选框</label>
                    <div class="layui-input-block">
                        <input type="radio" name="ispay" value="0" title="未支付" checked>
                        <input type="radio" name="ispay" value="1" title="已支付">
                    </div>
                </div>
                <div class="layui-form-item">
                    <label class="layui-form-label"></label>
                    <button class="layui-btn" lay-filter="add" type="submit">添加</button>
                </div>
            </div>
        </form>
    </div>
</div>
</body>

</html>
<%--异步获取下拉框--%>
<script type="text/javascript">
    function renderForm(){
        layui.use('form',function () {
            let form = layui.form;
            form.render();
        })
    }
    //页面加载的时候执行
    window.onload = function (){
        //发送AJAX异步请求去Servlet后台获取供应商下拉框的数据
        $.get("/BillsServlet?action=loadSupplier",function (result){
            for (var i = 0;i<result.length;i++){
                var id = result[i].id;
                var name = result[i].name;
                //绑定供应商下拉框
                //.append()：追加
                //正常来说这样去绑定就可以了
                $("#username").append("<option value='"+id+"'>"+name+"</option>");
                //在这个后台管理系统中会自动生成一个列表，所以需要获取这个列表的class再往里面填冲数据
                // $(".layui-anim").append("<dd lay-value='"+name+"' class=''>"+name+"</dd>");
                renderForm();
            }
        },"json");//返回JSON数据
    }
</script>


```

## 超市账单管理系统-账单数据展示（柱状图）

1.现在echars官网上下载柱状图

```html
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!--
此示例下载自 https://echarts.apache.org/examples/zh/editor.html?c=bar-background
-->
<!DOCTYPE html>
<html lang="zh-CN" style="height: 100%">
<head>
    <meta charset="utf-8">
</head>
<body style="height: 100%; margin: 0">
<div id="container" style="height: 100%"></div>


<script type="text/javascript" src="/js/echarts.min.js"></script>
<!-- Uncomment this line if you want to dataTool extension
<script type="text/javascript" src="https://fastly.jsdelivr.net/npm/echarts@5.4.1/dist/extension/dataTool.min.js"></script>
-->
<!-- Uncomment this line if you want to use gl extension
<script type="text/javascript" src="https://fastly.jsdelivr.net/npm/echarts-gl@2/dist/echarts-gl.min.js"></script>
-->
<!-- Uncomment this line if you want to echarts-stat extension
<script type="text/javascript" src="https://fastly.jsdelivr.net/npm/echarts-stat@latest/dist/ecStat.min.js"></script>
-->
<!-- Uncomment this line if you want to use map
<script type="text/javascript" src="https://fastly.jsdelivr.net/npm/echarts@4.9.0/map/js/china.js"></script>
<script type="text/javascript" src="https://fastly.jsdelivr.net/npm/echarts@4.9.0/map/js/world.js"></script>
-->
<!-- Uncomment these two lines if you want to use bmap extension
<script type="text/javascript" src="https://api.map.baidu.com/api?v=3.0&ak=YOUR_API_KEY"></script>
<script type="text/javascript" src="https://fastly.jsdelivr.net/npm/echarts@5.4.1/dist/extension/bmap.min.js"></script>
-->

<script type="text/javascript">
    var dom = document.getElementById('container');
    var myChart = echarts.init(dom, null, {
        renderer: 'canvas',
        useDirtyRect: false
    });
    var app = {};

    var option;

    option = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar',
                showBackground: true,
                backgroundStyle: {
                    color: 'rgba(180, 180, 180, 0.2)'
                }
            }
        ]
    };

    if (option && typeof option === 'object') {
        myChart.setOption(option);
    }

    window.addEventListener('resize', myChart.resize);
</script>
</body>
</html>

```

2.自己去写一个sql

```java
/**
     *根据供应商的id查询这个供应商的账单数量
     */
    int getCountBySupplierId(String providerId);
```

```java
 @Override
    public int getCountBySupplierId(String providerId) {
        return DButils.commonQueryCount("select count(*) from tb_bills where isdelete = 0 and providerid=?",providerId);
    }
```

```java
 //处理请求和响应的代码
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("text/html;charset=utf-8");
        String value = req.getParameter("action");
        if (value.equals("show")){
            //用来存储供应商名字的
            ArrayList<String> suppliersNameList = new ArrayList<>();
            //用来存储账单数量的
            ArrayList<Integer> numberNameList = new ArrayList<>();
            List<Supplier> suppliers = supplierService.selectAll(null);
            for (Supplier supplier: suppliers){
                suppliersNameList.add(supplier.getName());
                //每个供应商下面的账单数量
                int countBySupplierId = reportService.getCountBySupplierId(String.valueOf(supplier.getId()));
                numberNameList.add(countBySupplierId);
            }
            String jsonString = JSON.toJSONString(suppliersNameList);
            String jsonString1 = JSON.toJSONString(numberNameList);
            //存值转发
            req.setAttribute("jsonString",jsonString);
            req.setAttribute("jsonString1",jsonString1);
            req.getRequestDispatcher("/report.jsp").forward(req,resp);
            //System.out.println(jsonString);
        }
```

![image-20230311230020461](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202304201117117.png)

## 超市账单管理系统-账单数据展示（饼状图）

因为饼状图的格式是这样,所以需要一个类,数据层调一样的方法就好了

![image-20230311232851322](E:\md图片\image-20230311232851322.png)

```java
@Data
public class Pie {
    private Integer value;
    private String name;

    public Pie() {
    }

    public Pie(Integer value, String name) {
        this.value = value;
        this.name = name;
    }
}
```

```java
//饼状图
        if (value.equals("pie")){
            List<Pie> pieList = new ArrayList<>();
            List<Supplier> suppliers = supplierService.selectAll(null);
            for (Supplier supplier: suppliers){
                Pie pie = new Pie();
                pie.setName(supplier.getName());
                pie.setValue(reportService.getCountBySupplierId(String.valueOf(supplier.getId())));
                pieList.add(pie);
            }
            String jsonPie = JSON.toJSONString(pieList);
            //存值转发
            req.setAttribute("jsonPie",jsonPie);
            req.getRequestDispatcher("/pie.jsp").forward(req,resp);
        }
```

![image-20230311232939582](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202304201117568.png)

## 超市账单管理系统-登录日志

### Ip地址工具类：需要通过Java代码获取到当前外网Ip地址

```java
package cn.lanqiao.utils;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.Charset;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * 根据ip获取地址
 *
 * @author jam
 *
 */
public class Address {

    /**
     * 读取所有内容
     *
     * @param rd
     * @return
     * @throws IOException
     */
    private static String readAll(Reader rd) throws IOException {
        StringBuilder sb = new StringBuilder();
        int cp;
        while ((cp = rd.read()) != -1) {
            sb.append((char) cp);
        }
        return sb.toString();
    }

    /**
     * 拉取网页所有内容，并转化为Json格式
     *
     * @param url
     * @return
     * @throws IOException
     * @throws JSONException
     */
    public static JSONObject readJsonFromUrl(String url) throws IOException, JSONException {
        InputStream is = new URL(url).openStream();
        try {
            BufferedReader rd = new BufferedReader(new InputStreamReader(is, Charset.forName("UTF-8")));
            String jsonText = readAll(rd);
            JSONObject json = new JSONObject(jsonText);
            return json;
        } finally {
            is.close();
        }
    }
    public String getIp(){
        String ip = "";
        // 这个网址似乎不能了用了
        // String chinaz = "http://ip.chinaz.com";
        // 改用了太平洋的一个网址
        String chinaz = "http://whois.pconline.com.cn/";

        StringBuilder inputLine = new StringBuilder();
        String read = "";
        URL url = null;
        HttpURLConnection urlConnection = null;
        BufferedReader in = null;
        try {
            url = new URL(chinaz);
            urlConnection = (HttpURLConnection) url.openConnection();
            // 如有乱码的，请修改相应的编码集，这里是 gbk
            in = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), "gbk"));
            while ((read = in.readLine()) != null) {
                inputLine.append(read + "\r\n");
            }
            // System.out.println(inputLine.toString());
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (in != null) {
                try {
                    in.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        // 这个是之前的正则表达式,
        // Pattern p = Pattern.compile("\\<dd class\\=\"fz24\">(.*?)\\<\\/dd>");
        // 通过正则表达式匹配我们想要的内容，根据拉取的网页内容不同，正则表达式作相应的改变
        Pattern p = Pattern.compile("显示IP地址为(.*?)的位置信息");
        Matcher m = p.matcher(inputLine.toString());
        if (m.find()) {
            String ipstr = m.group(0);
            // 这里根据具体情况，来截取想要的内容
            ip = ipstr.substring(ipstr.indexOf("为") + 2, ipstr.indexOf("的") - 1);
            //System.out.println(ip);
        }
        return ip;
    }

    public String getAddress() {
        String ip = "";
        // 这个网址似乎不能了用了
        // String chinaz = "http://ip.chinaz.com";
        // 改用了太平洋的一个网址
        String chinaz = "http://whois.pconline.com.cn/";

        StringBuilder inputLine = new StringBuilder();
        String read = "";
        URL url = null;
        HttpURLConnection urlConnection = null;
        BufferedReader in = null;
        try {
            url = new URL(chinaz);
            urlConnection = (HttpURLConnection) url.openConnection();
            // 如有乱码的，请修改相应的编码集，这里是 gbk
            in = new BufferedReader(new InputStreamReader(urlConnection.getInputStream(), "gbk"));
            while ((read = in.readLine()) != null) {
                inputLine.append(read + "\r\n");
            }
            // System.out.println(inputLine.toString());
        } catch (MalformedURLException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            if (in != null) {
                try {
                    in.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }

        // 这个是之前的正则表达式,
        // Pattern p = Pattern.compile("\\<dd class\\=\"fz24\">(.*?)\\<\\/dd>");
        // 通过正则表达式匹配我们想要的内容，根据拉取的网页内容不同，正则表达式作相应的改变
        Pattern p = Pattern.compile("显示IP地址为(.*?)的位置信息");
        Matcher m = p.matcher(inputLine.toString());
        if (m.find()) {
            String ipstr = m.group(0);
            // 这里根据具体情况，来截取想要的内容
            ip = ipstr.substring(ipstr.indexOf("为") + 2, ipstr.indexOf("的") - 1);
            System.out.println(ip);

        }
        JSONObject json = null;
        String city = null;
        try {
            // 这里调用百度的ip定位api服务 详见 http://api.map.baidu.com/lbsapi/cloud/ip-location-api.htm
            //这里需要把ak换成你自己申请的百度ip定位api服务的ak
            json = readJsonFromUrl("http://api.map.baidu.com/location/ip?ak=M196hFrvWKFEfdHuoWRKVRiGvYk07vcf&ip=" + ip);
            //System.out.println(json);
            city = (((JSONObject) ((JSONObject) json.get("content")).get("address_detail")).get("city")).toString();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return city;
    }

    public static void main(String[] args) throws IOException, JSONException {
        Address Addr = new Address();
        String addr = Addr.getAddress();
        String ip = Addr.getIp();
        System.out.println(ip);
        System.out.println(addr);
    }
}

```

### 将用户的姓名登录IP和ip相对应的地址添加到数据库当中

1.Logs.java

```java
package cn.lanqiao.pojo;

import lombok.Data;

@Data
public class Logs {
    private Integer id;
    private String username;
    private String address;
    private String ip;
    private String logintime;
    private Integer isdelete;

    public Logs() {
    }

    public Logs(Integer id, String username, String address, String ip, String logintime, Integer isdelete) {
        this.id = id;
        this.username = username;
        this.address = address;
        this.ip = ip;
        this.logintime = logintime;
        this.isdelete = isdelete;
    }
}

```

2.LogsDao

```java
package cn.lanqiao.dao;

import cn.lanqiao.pojo.Logs;
import com.mysql.cj.log.Log;

public interface LogsDao {
    /**
     * 新增登录日志
     * @param log
     * @return
     */
    int addLogs(Logs log);
}

```

3.LogsDaoImpl

```java
package cn.lanqiao.dao.impl;

import cn.lanqiao.dao.LogsDao;
import cn.lanqiao.pojo.Logs;
import cn.lanqiao.utils.DButils;
import com.mysql.cj.log.Log;

public class LogsDaoImpl implements LogsDao {

    @Override
    public int addLogs(Logs log) {
        return DButils.commonUpdate("Insert into tb_logs values (null,?,?,?,?,?)",
                log.getUsername(),
                log.getAddress(),
                log.getIp(),
                log.getLogintime(),
                0);
    }
}

```

4.LogsService

```java
package cn.lanqiao.service;

import cn.lanqiao.pojo.Logs;

public interface LogsDaoService {
    /**
     * 新增登录日志
     * @param log
     * @return
     */
    int addLogs(Logs log);
}

```

5.LogsServiceImpl

```java
package cn.lanqiao.service.impl;

import cn.lanqiao.dao.LogsDao;
import cn.lanqiao.dao.impl.LogsDaoImpl;
import cn.lanqiao.pojo.Logs;
import cn.lanqiao.service.LogsDaoService;

public class LogsDaoServiceImpl implements LogsDaoService {
    LogsDao logsDao = new LogsDaoImpl();
    @Override
    public int addLogs(Logs log) {
        return logsDao.addLogs(log);
    }
}

```

6.在UserServlet中添加用户登录的ip地址等等

6.1先引入业务层

```java
LogsDaoService logsService = new LogsDaoServiceImpl();
```

6.2创建ip工具类

```java
IpAddressUtils ipAddressUtils = new IpAddressUtils();
```

6.3用户登录成功，记录日志到数据库中

```java
//用户登录成功,记录日志到数据库中
 Logs logs = new Logs(null,login.getUsername(), ipAddressUtils.getAddress(), 	ipAddressUtils.getIp(),DateUtils.nowTime(),0);
 int i = logsService.addLogs(logs);
```

### 登录日志的列表显示

1.LogsDao

```java
/**
     * 查询所有日志信息
     */
    List<Logs> queryMyLogs(String username);
```

2.LogsDaoImpl

```java
@Override
    public List<Logs> queryMyLogs(String username) {
        return DButils.commonQuery(Logs.class,"select * from tb_logs where isdelete = 0 and username = ?",username);
    }
```

3.LogsService

```java
/**
     * 查询所有日志信息
     */
    List<Logs> queryMyLogs(String username);
```

4.LogsServiceImpl

```java
@Override
    public List<Logs> queryMyLogs(String username) {
        return logsDao.queryMyLogs(username);
    }
```

5.LogsServlet

```java
package cn.lanqiao.controller;

import cn.lanqiao.pojo.Logs;
import cn.lanqiao.pojo.User;
import cn.lanqiao.service.LogsDaoService;
import cn.lanqiao.service.impl.LogsDaoServiceImpl;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;

@WebServlet("/LogsServlet")
public class LogsServlet extends HttpServlet {
    //业务逻辑层
    LogsDaoService logsService = new LogsDaoServiceImpl();
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //处理请求和响应的代码
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("text/html;charset=utf-8");
        //获取前端的业务请求
        String value = req.getParameter("action");
        if (value.equals("mylogs")){
        	//登录成功会将信息存在session中，在这里直接获取session就能够拿到用户的登录信息了
            HttpSession session = req.getSession();
            User loginUser = (User) session.getAttribute("loginUser");
            //查询登录日志
            List<Logs> logs = logsService.queryMyLogs(loginUser.getUsername());
            //存值转发
            req.setAttribute("logs",logs);
            req.getRequestDispatcher("/login-log.jsp").forward(req,resp);
        }
    }
}

```

前端页面

login-log.jsp

```java
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false" %>
<c:forEach items="${requestScope.logs}" var="l">
                            <tr>
                                <td>
                                    <input type="checkbox" name="id" value="1"   lay-skin="primary">
                                </td>
                                <td>${l.id}</td>
                                <td>${l.username}</td>
                                <td>${l.address}</td>
                                <td>${l.ip}</td>
                                <td>${l.logintime}</td>
                                <td class="td-manage">
                                    <a title="删除" onclick="member_del(this,'要删除的id')" href="javascript:;">
                                        <i class="layui-icon">&#xe640;</i>
                                    </a>
                                </td>
                            </tr>
                        </c:forEach>
```

### 登录日志降序排序业务

修改LogsDaoImpl里面的sql语句，就可以了

```java
return DButils.commonQuery(Logs.class,"select * from tb_logs where isdelete = 0 and username = ? order by logintime desc",username);
```

如果说你的列表想要从1到n去显示的话,可以加上varStatus = "sta"，这个是从1开始循环的意思

![image-20230312214056652](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202304201118138.png)

### 登录日志删除业务

前端页面发送删除请求

```java
<td class="td-manage">
                                    <a title="删除" href="javascript:deleteUsers(${l.id});">
                                        <i class="layui-icon">&#xe640;</i>
                                    </a>
                                </td>
```

弹框

```java
<script>
    function deleteUsers(id){
        layer.msg(' 确定要删除吗?', {
            time: 20000, //20s后自动关闭
            btn: ['确定', '取消'],
            yes: function (index, layero) {
                self.location = '/LogsServlet?action=delete&id='+id;//确定按钮跳转地址
            }
        });
    }
    $('#layerDemo .layui-btn').on('click', function () {
        var othis = $(this), method = othis.data('method');
        active[method] ? active[method].call(this, othis) : '';
    });
</script>
```

后端处理删除业务逻辑

LogsDao

```java
/**
     * 根据id删除日志信息
     * @param id
     * @return
     */
    int deleteById(String id);
```

LogsDaoImpl

```java
@Override
    public int deleteById(String id) {
        return DButils.commonUpdate("update tb_logs set isdelete = 1 where id = ?",id);
    }
```

LogsService

```java
/**
     * 根据id删除日志信息
     * @param id
     * @return
     */
    int deleteById(String id);
```

LogsServiceImpl

```java
@Override
    public int deleteById(String id) {
        return logsDao.deleteById(id);
    }
```

LogsServlet

```java
//删除
        if (value.equals("delete")){
            String id = req.getParameter("id");
            int i = logsService.deleteById(id);
            PrintWriter out = resp.getWriter();
            if (i>0){
                out.print("<script>" +
                        "alert('删除成功');" +
                        "window.location.href = '/LogsServlet?action=mylogs'" +
                        "</script>"
                );
            }else {
                out.print("<script>" +
                        "alert('删除失败');" +
                        "window.location.href = '/LogsServlet?action=mylogs'" +
                        "</script>"
                );
            }
        }
```

## 超市账单管理系统-POI导出数据

前端页面需要添加上一个导出按钮

```html
<button class="layui-btn" onclick="exportExcel();"><i class="layui-icon"></i>导出数据</button>
```

携带搜索的数据发送到后台

```js
<%--导出数据--%>
function exportExcel(){
    // 搜索的关键字
    var name = $('#name').val();
    //发送请求到后台导出excel数据
    location.href = "/ExcelServlet?action=exportException&name="+name;
}
```

POI.jar包

```java
<!-- https://mvnrepository.com/artifact/org.apache.poi/poi -->
    <dependency>
      <groupId>org.apache.poi</groupId>
      <artifactId>poi</artifactId>
      <version>4.1.2</version>
    </dependency>
```

Excel文件操作的工具类

```java
package cn.lanqiao.utils;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.HorizontalAlignment;
import org.apache.poi.ss.usermodel.VerticalAlignment;

/**
 * Excel文件操作的工具类
 */
public class ExprotCellStyle {

    /**
     * 得到表头样式
     * @param workbook
     * @return
     */
    public static HSSFCellStyle createTableTitleStyle(HSSFWorkbook workbook) {
        HSSFCellStyle cellStyle = setRowCellCenter(workbook);//水平居中
        //设置字体
        HSSFFont font = setFontCellStyle(workbook, (short)15, HSSFColor.HSSFColorPredefined.BLUE.getIndex(), true,false, HSSFFont.U_NONE);
        font.setFontName("微软雅黑");
        cellStyle.setFont(font);
        return cellStyle;
    }

    /**
     * 创建小标题的样式
     * @param workbook
     * @return
     */
    public static HSSFCellStyle createSecondTitleStyle(HSSFWorkbook workbook) {
        HSSFCellStyle cellStyle = setRowCellCenter(workbook);//水平居中
        //设置字体
        HSSFFont font = setFontCellStyle(workbook, (short)18, HSSFColor.HSSFColorPredefined.GOLD.getIndex(), true,false, HSSFFont.U_NONE);
        cellStyle.setFont(font);
        return cellStyle;
    }

    /**
     * 创建表头的样式
     * @param workbook
     * @return
     */
    public static HSSFCellStyle createTitleCellStyle(HSSFWorkbook workbook) {
        HSSFCellStyle cellStyle = setRowCellCenter(workbook);
        //设置字体
        HSSFFont font = setFontCellStyle(workbook, (short)30, HSSFColor.HSSFColorPredefined.RED.getIndex(), true,false, HSSFFont.U_DOUBLE);
        cellStyle.setFont(font);
        return cellStyle;
    }

    /**
     *
     * @param workbook  工作簿
     * @param fontSize  字体大小
     * @param colorIndex 字体颜色  @see HSSFColorPredefined
     * @param bold  是否加粗
     * @param italic  是否斜体
     * @param undderLine   下划线风格  @see HSSFFont.U_DOUBLE
     * @return
     */
    public static HSSFFont setFontCellStyle(HSSFWorkbook workbook,
                                            short fontSize, short colorIndex, boolean bold, boolean italic,
                                            byte undderLine) {
        HSSFFont font=workbook.createFont();
        font.setFontHeightInPoints(fontSize);//字体大小
        font.setColor(colorIndex);//设置字体颜色
        font.setBold(bold);//加粗
        font.setItalic(italic);//设置非斜体
        font.setUnderline(undderLine);//设置下划线
        return font;
    }

    /**
     * 创建水平和垂直居 的方法
     * @param workbook
     * @return
     */
    public static HSSFCellStyle setRowCellCenter(HSSFWorkbook workbook) {
        HSSFCellStyle cellStyle = workbook.createCellStyle();
        cellStyle.setAlignment(HorizontalAlignment.CENTER);//水平居中
        cellStyle.setVerticalAlignment(VerticalAlignment.CENTER);//垂直居中
        return cellStyle;
    }


}

```

ExcelServlet

```java
if (value.equals("exportException")){
            String name = req.getParameter("name");
            //System.out.println("要进行Excel导出操作...查询"+name);
            //获取数据库中的数据
            List<Supplier> suppliers = supplierService.selectAll(name);
            //1.创建工作簿
            HSSFWorkbook workbook = new HSSFWorkbook();
            //2.创建工作表
            HSSFSheet sheet = workbook.createSheet("供应商信息表");
            sheet.setDefaultColumnWidth(20);//设置所有列的列宽
            //3.首行合并
            CellRangeAddress region1 = new CellRangeAddress(0, 0, 0, 6);
            CellRangeAddress region2 = new CellRangeAddress(1, 1, 0, 6);
            sheet.addMergedRegion(region1);
            sheet.addMergedRegion(region2);

            //的sheet上创建行
            int rownum = 0;
            HSSFRow row01 = sheet.createRow(rownum);
            //在row01上创建单元格
            HSSFCell cell_row01 = row01.createCell(0);
            //向cell_row01写东西
            cell_row01.setCellValue("供应商数据");
            //设置标题样式
            HSSFCellStyle titleStyle = ExprotCellStyle.createTitleCellStyle(workbook);
            cell_row01.setCellStyle(titleStyle);

            //第二行
            rownum++;
            HSSFRow row02 = sheet.createRow(rownum);
            HSSFCell cell_row02 = row02.createCell(0);
            cell_row02.setCellValue("总数:" + suppliers.size() + "，导出时间:" + DateUtils.nowTime());
            //设置小标题样式
            HSSFCellStyle secondTitleStyle = ExprotCellStyle.createSecondTitleStyle(workbook);
            cell_row02.setCellStyle(secondTitleStyle);

            //第三行
            rownum++;
            HSSFRow row03 = sheet.createRow(rownum);
            String[] titles = {"供应商ID", "供应商名称", "供应商系人", "供应商电话", "供应商地址", "供应商传真", "供应商描述"};
            //得到表头的样式
            HSSFCellStyle tableTitleStyle = ExprotCellStyle.createTableTitleStyle(workbook);
            for (int i = 0; i < titles.length; i++) {
                HSSFCell cell = row03.createCell(i);
                cell.setCellValue(titles[i]);
                cell.setCellStyle(tableTitleStyle);
            }

            //表格主题样式
            HSSFCellStyle tableBodyStyle = ExprotCellStyle.setRowCellCenter(workbook);
            for (int i = 0; i < suppliers.size(); i++) {
                rownum++;

                HSSFRow row = sheet.createRow(rownum);
                Supplier p = suppliers.get(i);

                //创建idcell
                HSSFCell idCell = row.createCell(0);
                idCell.setCellValue(p.getId());
                idCell.setCellStyle(tableBodyStyle);

                //创建namecell
                HSSFCell nameCell = row.createCell(1);
                nameCell.setCellValue(p.getName());
                nameCell.setCellStyle(tableBodyStyle);

                //创建linkmaneCell
                HSSFCell linkmaneCell = row.createCell(2);
                linkmaneCell.setCellValue(p.getLinkman());
                linkmaneCell.setCellStyle(tableBodyStyle);

                //创建phoneCell
                HSSFCell phoneCell = row.createCell(3);
                phoneCell.setCellValue(p.getPhone());
                phoneCell.setCellStyle(tableBodyStyle);

                //创建addressCell
                HSSFCell addressCell = row.createCell(4);
                addressCell.setCellValue(p.getAddress());
                addressCell.setCellStyle(tableBodyStyle);

                //创建faxCell
                HSSFCell faxCell = row.createCell(5);
                faxCell.setCellValue(p.getFax());
                faxCell.setCellStyle(tableBodyStyle);

                //创建descriptionCell
                HSSFCell descriptionCell = row.createCell(6);
                descriptionCell.setCellValue(p.getDescription());
                descriptionCell.setCellStyle(tableBodyStyle);
            }

            //3.设置content-disposition响应头控制浏览器以下载的形式打开文件
            //下载中文文件时，需要注意的地方就是中文文件名要使用
            String fileName = "供应商数据信息表.xls";
            // URLEncoder.encode方法进行编码(URLEncoder.encode(fileName, "字符编码"))，否则会出现文件名乱码。
            resp.setHeader("content-disposition", "attachment;filename=" + URLEncoder.encode(fileName, "UTF-8"));

            //输出字节流生成的Excel文件作为浏览器的一个输出流--进行输出
            ServletOutputStream outputStream = resp.getOutputStream();
            //把Workbook作为浏览响应字节流进行附件下载
            workbook.write(outputStream);
            System.out.println("数据导出完毕");
            //关闭流
            outputStream.close();

        }
```

## servlet实现文件下载

### 前端代码

```js
<button class="layui-btn" onclick="downloadExcelModel()"><i class="layui-icon"></i>下载模板</button>
function downloadExcelModel(){
        location.href = "/ExcelServlet?action=downloadExcelModel";
    }
```

### 后端代码

```java
 //1.获取要下载的文件的绝对路径
            //在resources目录放入QQ.png，注意项目导出后resource中的文件被打包到/WEB-INF/classes下,服务器的真实路径
            String realPath = this.getServletContext().getRealPath("/WEB-INF/classes/用户数据文件模板.xls");
            //2.获取要下载的文件名
            String fileName = realPath.substring(realPath.lastIndexOf("\\") + 1);
            System.out.println("要下载的文件名:" + fileName);
            //字节输入流
            FileInputStream inputStream = new FileInputStream(realPath);
            //浏览器输出流
            ServletOutputStream outputStream = resp.getOutputStream();

            //3.设置content-disposition响应头控制浏览器以下载的形式打开文件
            // URLEncoder.encode方法进行编码(URLEncoder.encode(fileName, "字符编码"))，否则会出现文件名乱码。
            resp.setHeader("content-disposition", "attachment;filename=" + URLEncoder.encode(fileName, "UTF-8"));

            //5.准备数据缓冲区
            int len = 0;
            byte[] buffer = new byte[1024]; // 1KB
            while ((len = inputStream.read(buffer)) != -1) {
                outputStream.write(buffer, 0, len);
            }
            outputStream.close();
            inputStream.close();
```

### springboot实现文件下载

```java
 /**
     * 下载模版
     */
    @RequestMapping("/downloadTemplate")
    public ResponseEntity<byte[]> downloadTemplate() throws IOException {
        //1.获取到文件模版资源
        //在resources目录放入模版资源，注意项目导出后resource中的文件被打包到/WEB-INF/classes下,服务器的真实路径
        Resource resource = new ClassPathResource("学生列表数据模板.xls");
        // 2. 读取文件内容
        byte[] fileContent = resource.getInputStream().readAllBytes();

        // 3. 设置文件名（使用UTF-8编码）
        String fileName = URLEncoder.encode(resource.getFilename(), StandardCharsets.UTF_8.toString());

        // 4. 设置响应头
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", fileName);

        // 5. 返回响应实体
        return ResponseEntity
                .ok()
                .headers(headers)
                .body(fileContent);
    }
```



## servlet实现文件上传到数据库中

### 前端发送请求

HTML代码

```html
<button type="button" class="layui-btn" id="test3" name="file"><i class="layui-icon"></i>上传文件</button>
```

JS代码

```javascript
layui.use(['laydate','form','upload'], function(){
        var laydate = layui.laydate;
        var form = layui.form;
        var upload = layui.upload;
        // 指定允许上传的文件类型
        upload.render({
            elem: '#test3'//id
            ,url: '/ExcelServlet?action=excelImport' //此处配置你自己的上传接口即可
            ,accept: 'file' //普通文件
            ,multiple:true
            //这里需要返回JSON数据，不然会报接口格式返回有误
            ,done: function(res){
                console.log(res);
                //如果上传成功
                if(res.code == 200){
                    layer.msg('上传成功',{

                    },function (){
                        window.location.reload();
                    });
                }else if (res.code == 500){
                    //上传失败
                    layer.msg('上传失败',{

                    },function (){
                        window.location.reload();
                    });
                }
            }
        });
    });
```

### 后端代码

创建一个layui后端返回数据到前端的工具类

```java
package cn.lanqiao.utils;

import lombok.Data;

/**
 * layui后端返回数据到前端的工具类
 */
@Data
public class JsonResult<T> {
    private T data;
    //状态码
    private String code;
    //内容
    private String msg;
    /*
     * * 若没有数据返回，默认状态码为0，提示信息为：操作成功！  写死的
     */
    public JsonResult() {
        this.code = "0";
        this.msg = "操作成功！";
    }

    /**
     * 若没有数据返回，可以人为指定状态码和提示信息
     * @param code
     * @param msg
     */
    public JsonResult(String code, String msg) {
        this.code = code;
        this.msg = msg;
    }


    /**
     * 有数据返回时，状态码为0，默认提示信息为：操作成功！
     * @param data
     */
    public JsonResult(T data) {
        this.data = data;
        this.code = "0";
        this.msg = "操作成功！";
    }

    /**
     * 有数据返回，状态码为0，人为指定提示信息
     * @param data
     * @param msg
     */
    public JsonResult(T data, String msg) {
        this.data = data;
        this.code = "0";
        this.msg = msg;
    }


    public JsonResult(T data, String code, String msg) {
        this.data = data;
        this.code = code;
        this.msg = msg;
    }
}

```

这两个注解需要添加上

```java
@MultipartConfig //标注当前servlet支持文件上传
@WebServlet("/ExcelServlet")
```

ExcelServlet代码

```java
	    //实现文件上传到数据库
        if (value.equals("excelImport")){
            extracted(req, resp);
        }
        private void extracted(HttpServletRequest req, HttpServletResponse resp) throws IOException, ServletException {
        //执行excel文件导入操作
        List<User> userList = new ArrayList<>();
        //取上传的文件数量
        Collection<Part> parts = req.getParts();
        PrintWriter writer = resp.getWriter();
        System.out.println("文件上传的个数:"+parts.size());
        try {
            if (parts.size()>0){
                Part part = req.getPart("file");
                //取文件名
                String submittedFileName = part.getSubmittedFileName();
                System.out.println("上传的文件名:"+submittedFileName);
                //上传的文件对应输入流
                InputStream inputStream = part.getInputStream();
                //读取excel中的数据
                Workbook workbook = ImportExcelUtils.getWorkbookByInputStream(inputStream, submittedFileName);
                //得到工作表
                Sheet sheet = ImportExcelUtils.getSheetByWorkbook(workbook,0);
                //根据需要是否加条数限制
                if (sheet.getRow(1000) != null){
                    throw new RuntimeException("系统已限制单批次导入必须小于或等于1000笔!");
                }
                int rowNum = 0;//已取值的行数
                int colNum = 0;//列号
                //获取数据行数
                int realRowCount = sheet.getPhysicalNumberOfRows();
                //处理表格数据
                for (Row row : sheet){
                    if (realRowCount == rowNum){
                        //excel文件所有的行读取完毕，结束循环
                        break;
                    }
                    if (ImportExcelUtils.isBlankRow(row)){//空行跳过
                        continue;
                    }
                    if (row.getRowNum() == -1){
                        continue;
                    }else {
                        if (row.getRowNum() == 0 || row.getRowNum() == 1){//第一行，第二行表头跳过
                            continue;
                        }
                    }
                    rowNum++;
                    colNum = 1;
                    User user = new User();
                    //验证Excel文件字段，这里根据表格内名称
                    ImportExcelUtils.validCellValue(sheet,row,colNum,"用户名");
                    user.setUsername(ImportExcelUtils.getCellValue(sheet,row,colNum-1));

                    //列号需要自加获取
                    ImportExcelUtils.validCellValue(sheet,row,++colNum,"初始密码");
                    user.setPassword(ImportExcelUtils.getCellValue(sheet,row,colNum-1));

                    ImportExcelUtils.validCellValue(sheet,row,++colNum,"性别");
                    user.setSex("男".equals(ImportExcelUtils.getCellValue(sheet,row,colNum-1))?1:0);

                    ImportExcelUtils.validCellValue(sheet,row,++colNum,"生日");
                    user.setBirthday(ImportExcelUtils.getCellValue(sheet,row,colNum-1));

                    ImportExcelUtils.validCellValue(sheet,row,++colNum,"电话");
                    user.setPhone(ImportExcelUtils.getCellValue(sheet,row,colNum-1));

                    ImportExcelUtils.validCellValue(sheet,row,++colNum,"地址");
                    user.setAddress(ImportExcelUtils.getCellValue(sheet,row,colNum-1));

                    ImportExcelUtils.validCellValue(sheet,row,++colNum,"类别");
                    String cellValue = ImportExcelUtils.getCellValue(sheet, row, colNum - 1);
                    if ("管理员".equals(cellValue)){
                        user.setType(1);
                    }else if ("经理".equals(cellValue)){
                        user.setType(2);
                    }else {
                        user.setType(3);
                    }
                    //存储对象到list集合中
                    userList.add(user);
                }
                System.out.println("===================导入的数据是=================");
                for (User user: userList) {
                    System.out.println(user);
                    //对象添加到数据库
                    userService.add(user);
                }
                //到这里添加数据成功
                JsonResult jsonResult = new JsonResult<>("200","导入数据成功");
                String jsonString = JSONObject.toJSONString(jsonResult);
                writer.print(jsonString);
            }
        }catch (Exception e){
            e.printStackTrace();
            JsonResult jsonResult = new JsonResult<>("500","导入数据失败");
            String jsonString = JSONObject.toJSONString(jsonResult);
            writer.print(jsonString);
        }
       }
```

## 用户页实现分页功能

### 分页工具类

```java
package cn.lanqiao.utils;

import lombok.Data;

import java.util.List;

@Data
public class PageUtils<T> {
    private long pageIndex;  //当前页码
    private long pageSize;  //页面大小
    private long totalCount; //总条数
    private long pageCount;  //总页数

    private List<T> records; //每页的数据集合

    private long numberStart; //开始的页码序号
    private long numberEnd;  //结束序号

    public PageUtils(long pageIndex, long pageSize, long totalCount, List<T> records) {
        this.pageIndex = pageIndex;
        this.pageSize = pageSize;
        this.totalCount = totalCount;
        this.records = records;

        //计算一下总页数
        this.pageCount = (totalCount % pageSize == 0) ? (totalCount / pageSize) : (totalCount / pageSize + 1);

        //数学算法
        // -----------偷偷的给页码序号赋值------------------
        // 一共显示10个页面 动态伸缩
        if (this.pageCount <= 10) {
            this.numberStart = 1;
            this.numberEnd = pageCount;
        } else {
            this.numberStart = pageIndex - 4;
            this.numberEnd = pageIndex + 5;
            if (numberStart < 1) {
                this.numberStart = 1;
                this.numberEnd = 10;
            } else if (numberEnd > pageCount) {
                this.numberEnd = pageCount;
                this.numberStart = pageCount - 9;
            }
        }
    }
        // -----------偷偷的给页码序号赋值------------------
}

```

### 分页查询SQL语句

数据处理层

```java
	/**
     *  查询总数
     */
    int getTotalCount();
    /**
     * 查询每页数据
     */
    List<User> getDeparts(String name,Integer pageStart, Integer pageSize);
```

```java
	@Override
    public int getTotalCount() {
        return DButils.commonQueryCount("select count(*) from tb_users where isdelete = 0");
    }

    @Override
    public List<User> getDeparts(String name,Integer pageStart, Integer pageSize) {
        if (name != null && !"".equals(name)){
            return DButils.commonQuery(User.class,"SELECT * FROM tb_users where isdelete=0 and username like ? limit ?,? ","%" + name + "%",pageStart,pageSize);
        }else {
            return DButils.commonQuery(User.class,"SELECT * FROM tb_users where isdelete=0 limit ?,?",pageStart,pageSize);
        }

    }
```

业务层

```java
/**
     *  查询总数
     */
    int getTotalCount();

    /**
     * 查询每页数据
     */
    List<User> getDeparts(String name,Integer pageStart, Integer pageSize);
```

```java
 @Override
    public int getTotalCount() {
        return userDao.getTotalCount();
    }

    @Override
    public List<User> getDeparts(String name, Integer pageStart, Integer pageSize) {
        return userDao.getDeparts(name,pageStart,pageSize);
    }
```

控制层

```java
//分页功能
        if (value.equals("limit")){
            //当前页
            String pageIndex = req.getParameter("pageIndex");
            //System.out.println("当前页:"+pageIndex);
            //每页显示条数
            String pageSize = req.getParameter("pageSize");
            //System.out.println("每页显示条数:"+pageSize);
            //前端传递的信息
            String name = req.getParameter("username");
            //System.out.println("name:"+name);
            //总条数
            int totalCount = userService.getTotalCount();
            //System.out.println("总条数:"+totalCount);
            //每页数据
            List<User> departs = userService.getDeparts(name,(Integer.parseInt(pageIndex)-1)*(Integer.parseInt(pageSize)),Integer.parseInt(pageSize));
            //System.out.println("查询出来的每页数据"+departs);
            PageUtils pageUtils = new PageUtils<>(Integer.parseInt(pageIndex),Integer.parseInt(pageSize),totalCount,departs);
            //System.out.println(pageUtils.getRecords());
            System.out.println(pageUtils);
            //将查出来的值保存起来
            req.setAttribute("departs",departs);
            //存值转发
            req.setAttribute("pageUtils",pageUtils);
            req.getRequestDispatcher("/member-list.jsp").forward(req,resp);
        }
```

### 前端页面

```jsp
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="java.util.List" %>
<%@ page import="cn.lanqiao.pojo.User" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="false" %>
<!DOCTYPE html>
<html class="x-admin-sm">
<head>
    <meta charset="UTF-8">
    <title>超市账单管理系统</title>
    <meta name="renderer" content="webkit">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width,user-scalable=yes, minimum-scale=0.4, initial-scale=0.8,target-densitydpi=low-dpi" />
    <link rel="stylesheet" href="./css/font.css">
    <link rel="stylesheet" href="./css/xadmin.css">
    <script src="https://cdn.bootcdn.net/ajax/libs/jquery/3.6.3/jquery.js"></script>
    <script src="./lib/layui/layui.js" charset="utf-8"></script>
    <script type="text/javascript" src="./js/xadmin.js"></script>
    <!--[if lt IE 9]>
    <script src="https://cdn.staticfile.org/html5shiv/r29/html5.min.js"></script>
    <script src="https://cdn.staticfile.org/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
</head>
<body>
<div class="x-nav">
          <span class="layui-breadcrumb">
            <a href="">首页</a>
            <a href="">演示</a>
            <a>
              <cite>导航元素</cite></a>
          </span>
    <a class="layui-btn layui-btn-small" style="line-height:1.6em;margin-top:3px;float:right" onclick="location.reload()" title="刷新">
        <i class="layui-icon layui-icon-refresh" style="line-height:30px"></i></a>
</div>
<div class="layui-fluid">
    <div class="layui-row layui-col-space15">
        <div class="layui-col-md12">
            <div class="layui-card">
                <div class="layui-card-body ">
                    <form class="layui-form layui-col-space5" action="/userServlet?action=limit&pageIndex=${requestScope.pageUtils.pageIndex}&pageSize=${requestScope.pageUtils.pageSize}" method="post">
                        <div class="layui-inline layui-show-xs-block">
                            <input type="text" name="username"  placeholder="请输入用户名" autocomplete="off" class="layui-input">
                        </div>
                        <div class="layui-inline layui-show-xs-block">
                            <button class="layui-btn"  lay-submit="" lay-filter="sreach"><i class="layui-icon">&#xe615;</i></button>
                        </div>
                    </form>
                </div>
                <div class="layui-card-header">
                    <button class="layui-btn layui-btn-danger" onclick="delAll()"><i class="layui-icon"></i>批量删除</button>
                    <button class="layui-btn" onclick="xadmin.open('添加用户','/member-add.jsp',600,400)"><i class="layui-icon"></i>添加</button>
                    <button class="layui-btn" onclick="downloadExcelModel()"><i class="layui-icon"></i>下载模板</button>
                    <button type="button" class="layui-btn" id="test3" name="file"><i class="layui-icon"></i>上传文件</button>
                </div>
                <div class="layui-card-body layui-table-body layui-table-main">
                    <table class="layui-table layui-form">
                        <thead>
                        <tr>
                            <th>
                                <input type="checkbox" lay-filter="checkall" name="" lay-skin="primary">
                            </th>
                            <th>用户编码</th>
                            <th>用户名称</th>
                            <th>密码</th>
                            <th>性别</th>
                            <th>生日</th>
                            <th>电话</th>
                            <th>地址</th>
                            <th>用户类型</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        <c:forEach items="${requestScope.pageUtils.records}" var="u">
                        <tr>
                            <td>
                                <input type="checkbox" name="id" value="1"   lay-skin="primary">
                            </td>
                            <td>${u.id}</td>
                            <td>${u.username}</td>
                            <td>${u.password}</td>
                            <td>${u.sex==1?"男":"女"}</td>
                            <td>${u.birthday}</td>
                            <td>${u.phone}</td>
                            <td>${u.address}</td>
                            <td>
                                <c:if test="${u.type == 1}">
                                    管理员
                                </c:if>
                                <c:if test="${u.type == 2}">
                                    经理
                                </c:if>
                                <c:if test="${u.type == 3}">
                                    普通用户
                                </c:if>
                            </td>
                            <td class="td-manage">
                                <a title="个人信息"  onclick="xadmin.open('个人信息','userServlet?action=details&id=${u.id}',600,400)" href="javascript:;">
                                    <i class="layui-icon">&#xe66e;</i>
                                </a>
                                <a title="编辑"  onclick="xadmin.open('编辑','userServlet?action=goUpdate&id=${u.id}',600,400)" href="javascript:;">
                                    <i class="layui-icon">&#xe642;</i>
                                </a>
                                <a onclick="xadmin.open('修改密码','member-password.jsp',600,400)" title="修改密码" href="javascript:;">
                                    <i class="layui-icon">&#xe631;</i>
                                </a>
                                <a title="删除" href="javascript:deleteUsers(${u.id});">
                                    <i class="layui-icon">&#xe640;</i>
                                </a>
                            </td>
                        </tr>
                        </c:forEach>
                        </tbody>
                    </table>
                </div>
                <%--其实前端页面的分页操作就是重新向后端发送请求--%>
                <div class="layui-box layui-laypage layui-laypage-default" id="layui-laypage-1" style="margin-left: 15px;">
                    <%--layui-disabled禁用按钮--%>
<%--                    <a href="/MemberServlet.do?action=limit&pageIndex=${requestScope.pageUtils.pageIndex-1}&pageSize=${requestScope.pageUtils.pageSize}"--%>
<%--                       class="layui-laypage-prev ${requestScope.pageUtils.pageIndex == 1 ? 'layui-disabled':''}" id="left-btn" data-page="0">--%>
<%--                        <i class="layui-icon">&lt;</i>--%>
<%--                    </a>--%>
                        <a href="/MemberServlet.do?action=limit&pageIndex=${requestScope.pageUtils.pageIndex-1}&pageSize=${requestScope.pageUtils.pageSize}"
                           class="layui-laypage-prev
                           ${requestScope.pageUtils.pageIndex == 1 ? "layui-disabled":''}"
                           data-page="0"
                           ${requestScope.pageUtils.pageIndex == 1 ? 'onclick="return false;"' : ''}>
                            <i class="layui-icon">&lt;</i>
                        </a>
                    <c:forEach begin="${requestScope.pageUtils.numberStart}" end="${requestScope.pageUtils.numberEnd}" var="num" step="1">
                        <c:if test="${requestScope.pageUtils.pageIndex == num}">
                            <span style="color:#009688;font-weight: bold;">${num}</span>
                        </c:if>
                        <c:if test="${requestScope.pageUtils.pageIndex != num}">
                            <a href="/MemberServlet.do?action=limit&pageIndex=${num}&pageSize=${requestScope.pageUtils.pageSize}">${num}</a>
                        </c:if>
                    </c:forEach>
                    <a href="/MemberServlet.do?action=limit&pageIndex=${requestScope.pageUtils.pageIndex+1}&pageSize=${requestScope.pageUtils.pageSize}"
                       class="layui-laypage-next
                       ${requestScope.pageUtils.pageIndex == requestScope.pageUtils.numberEnd ? 'layui-disabled':''}"
                       data-page="2"
                        ${requestScope.pageUtils.pageIndex == requestScope.pageUtils.numberEnd ? 'onclick="return false;"' : ''}
                    >
                        <i class="layui-icon">&gt;</i>
                    </a>
                    <span class="layui-laypage-skip">到第
							   <input type="text" min="1" id="number" value="${requestScope.pageUtils.pageIndex}" class="layui-input">页
								<button type="button" class="layui-laypage-btn" onclick="jumpPage();">确定</button>
                    </span>
                    <span class="layui-laypage-count">[当前${requestScope.pageUtils.pageIndex}/${requestScope.pageUtils.pageCount}]</span>
                    <span class="layui-laypage-limits">
							    <select lay-ignore="" onchange="goPage(this);">
							        <option value="5" ${requestScope.pageUtils.pageSize==5?"selected":""}>5 条/页</option>
									<option value="10" ${requestScope.pageUtils.pageSize==10?"selected":""}>10 条/页</option>
									<option value="20" ${requestScope.pageUtils.pageSize==20?"selected":""}>20 条/页</option>
									<option value="30" ${requestScope.pageUtils.pageSize==30?"selected":""}>30 条/页</option>
									<option value="40" ${requestScope.pageUtils.pageSize==40?"selected":""}>40 条/页</option>
							</select>
                    </span>
                </div>
            </div>
            </div>
        </div>
    </div>
</div>
</body>
<script>
    /**
     * 动态修改页面大小
     */
    function goPage(select) {
        var pageSize = $(select).val();
        location.href = "/userServlet?action=limit&pageIndex=1&pageSize=" + pageSize;
    }

    /**
     * 跳转页码
     */
    function jumpPage() {
        var number = $("#number").val();
        // alert(number);
        if (number <= 0) {
            number = 1;
        } else if (!(/(^[1-9]\d*$)/.test(number))) {
            alert("输入的页码非法！");
            $("#number").val("");
            $("#number").focus();
            return;//终止
        } else if (number >${requestScope.pageUtils.pageCount}) {
            number =${requestScope.pageUtils.pageCount};
        }
        location.href = "/userServlet?action=limit&pageIndex=" + number + "&pageSize=${requestScope.pageUtils.pageSize}";
    }
    function downloadExcelModel(){
        location.href = "/ExcelServlet?action=downloadExcelModel";
    }
    function deleteUsers(id){
        layer.msg(' 确定要删除吗?', {
            time: 20000, //20s后自动关闭
            btn: ['确定', '取消'],
            yes: function (index, layero) {
                self.location = '/userServlet?action=delete&id='+id;//确定按钮跳转地址
            }
        });
    }
    $('#layerDemo .layui-btn').on('click', function () {
        var othis = $(this), method = othis.data('method');
        active[method] ? active[method].call(this, othis) : '';
    });
</script>
</html>
<script>
    layui.use(['laydate','form','upload','laypage','layer'], function(){
        var laydate = layui.laydate;
        var form = layui.form;
        var upload = layui.upload;
        var laypage = layui.laypage;
        var layer = layui.layer;

        //完整功能
        laypage.render({
            elem: 'demo7'
            ,count: 100
            ,layout: ['count', 'prev', 'page', 'next', 'limit', 'refresh', 'skip']
            ,jump: function(obj){
                console.log(obj)
            }
        });
        // 指定允许上传的文件类型
        upload.render({
            elem: '#test3'
            ,url: '/ExcelServlet?action=excelImport' //此处配置你自己的上传接口即可
            ,accept: 'file' //普通文件
            ,multiple:true
            ,done: function(res){
                console.log(res);
                //如果上传成功
                if(res.code == 200){
                    layer.msg('上传成功',{

                    },function (){
                        window.location.reload();
                    });
                }else if (res.code == 500){
                    //上传失败
                    layer.msg('上传失败',{

                    },function (){
                        window.location.reload();
                    });
                }
            }
        });
        // 监听全选
        form.on('checkbox(checkall)', function(data){

            if(data.elem.checked){
                $('tbody input').prop('checked',true);
            }else{
                $('tbody input').prop('checked',false);
            }
            form.render('checkbox');
        });

        //执行一个laydate实例
        laydate.render({
            elem: '#start' //指定元素
        });

        //执行一个laydate实例
        laydate.render({
            elem: '#end' //指定元素
        });


    });

    /*用户-停用*/
    function member_stop(obj,id){
        layer.confirm('确认要停用吗？',function(index){

            if($(obj).attr('title')=='启用'){

                //发异步把用户状态进行更改
                $(obj).attr('title','停用')
                $(obj).find('i').html('&#xe62f;');

                $(obj).parents("tr").find(".td-status").find('span').addClass('layui-btn-disabled').html('已停用');
                layer.msg('已停用!',{icon: 5,time:1000});

            }else{
                $(obj).attr('title','启用')
                $(obj).find('i').html('&#xe601;');

                $(obj).parents("tr").find(".td-status").find('span').removeClass('layui-btn-disabled').html('已启用');
                layer.msg('已启用!',{icon: 5,time:1000});
            }

        });
    }

    /*用户-删除*/
    function member_del(obj,id){
        layer.confirm('确认要删除吗？',function(index){
            //发异步删除数据
            $(obj).parents("tr").remove();
            layer.msg('已删除!',{icon:1,time:1000});
        });
    }


    function delAll (argument) {
        var ids = [];

        // 获取选中的id
        $('tbody input').each(function(index, el) {
            if($(this).prop('checked')){
                ids.push($(this).val())
            }
        });

        layer.confirm('确认要删除吗？'+ids.toString(),function(index){
            //捉到所有被选中的，发异步进行删除
            layer.msg('删除成功', {icon: 1});
            $(".layui-form-checked").not('.header').parents('tr').remove();
        });
    }
</script>

```

## Filter拦截器

### xml配置Filter

EncoderFilter

```java
package cn.lanqiao.filter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 乱码过滤器
 */
public class EncoderFilter implements Filter {
    /**
     * 过滤器的初始化方法
     * @param filterConfig
     * @throws ServletException
     */
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    /**
     * 执行过滤方法
     * @param request
     * @param response
     * @param chain
     * @throws IOException
     * @throws ServletException
     */
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse resp = (HttpServletResponse) response;
        //来访的URI地址
        String requestURI = req.getRequestURI();
        //设置响应乱码
        resp.setContentType("text/html;charset=utf-8");
        //放行
        chain.doFilter(request,response);
    }

    /**
     * 销毁方法
     */
    @Override
    public void destroy() {

    }
}

```

web.xml

```java
<!--配置Filter-->
  <filter>
    <filter-name>EncoderFilter</filter-name>
    <filter-class>cn.lanqiao.filter.EncoderFilter</filter-class>
  </filter>

  <filter-mapping>
    <filter-name>EncoderFilter</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping>
```

### 通过注解配置Filter

```java
package cn.lanqiao.filter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * 乱码过滤器
 */
@WebFilter("/*")
public class EncoderFilter implements Filter {
    /**
     * 过滤器的初始化方法
     * @param filterConfig
     * @throws ServletException
     */
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    /**
     * 执行过滤方法
     * @param request
     * @param response
     * @param chain
     * @throws IOException
     * @throws ServletException
     */
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse resp = (HttpServletResponse) response;
        //来访的URI地址
        String requestURI = req.getRequestURI();
        //设置响应乱码
        resp.setContentType("text/html;charset=utf-8");
        //放行
        chain.doFilter(request,response);
    }

    /**
     * 销毁方法
     */
    @Override
    public void destroy() {

    }
}

```

![image-20230316201609681](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202304201118225.png)



## 大数据可视化界面-异步请求

前端页面代码

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="/css/index.css" />
</head>

<body>
<header>
    <h1>大数据可视化展板</h1>
    <a href="/login.jsp">后台管理登录</a>
    <div class="showTime">当前时间：2020年3月17-0时54分14秒</div>
    <script>
        var t = null;
        t = setTimeout(time, 1000); //開始运行
        function time() {
            clearTimeout(t); //清除定时器
            dt = new Date();
            var y = dt.getFullYear();
            var mt = dt.getMonth() + 1;
            var day = dt.getDate();
            var h = dt.getHours(); //获取时
            var m = dt.getMinutes(); //获取分
            var s = dt.getSeconds(); //获取秒
            document.querySelector(".showTime").innerHTML =
                "当前时间：" +
                y +
                "年" +
                mt +
                "月" +
                day +
                "-" +
                h +
                "时" +
                m +
                "分" +
                s +
                "秒";
            t = setTimeout(time, 1000); //设定定时器，循环运行
        }
    </script>
</header>
<section class="mainbox">
    <div class="column">
        <div class="panel bar" id="main">
            <h2>
                柱状图-账单数据展示
<%--                <a href="javascript:;">2023</a>--%>
<%--                <a href="javacript:;"> 2020</a>--%>
            </h2>
            <div class="chart"></div>
            <div class="panel-footer"></div>
        </div>
        <div class="panel line">
            <h2>折线图-客户变化</h2>
            <div class="chart"></div>
            <div class="panel-footer"></div>
        </div>
        <div class="panel pie">
            <h2>饼形图-年龄分布</h2>
            <div class="chart"></div>
            <div class="panel-footer"></div>
        </div>
    </div>
    <div class="column">
        <div class="no">
            <div class="no-hd">
                <ul>
                    <li>125811</li>
                    <li>104563</li>
                </ul>
            </div>
            <div class="no-bd">
                <ul>
                    <li>前端需求人数</li>
                    <li>市场供应人数</li>
                </ul>
            </div>
        </div>
        <div class="map">
            <div class="chart"></div>
            <div class="map1"></div>
            <div class="map2"></div>
            <div class="map3"></div>
        </div>
    </div>
    <div class="column">
        <div class="panel bar1">
            <h2>柱状图-技能掌握</h2>
            <div class="chart"></div>
            <div class="panel-footer"></div>
        </div>
        <div class="panel line1">
            <h2>折线图-播放量</h2>
            <div class="chart"></div>
            <div class="panel-footer"></div>
        </div>
        <div class="panel pie1">
            <h2>饼形图-地区分布</h2>
            <div class="chart"></div>
            <div class="panel-footer"></div>
        </div>
    </div>
</section>
<script src="/js/flexible.js"></script>
<script src="/js/jquery.js"></script>
<script src="/js/echarts.min.js"></script>
<script src="/js/index.js"></script>
<script src="/js/china.js"></script>
<script src="/js/myMap.js"></script>
</body>
</html>
```

[前端页面资料]: E:\项目资料\后台管理页面\eckarts_open_class-master

### 柱状图-账单数据

前端发送请求

index.js

```javascript
//柱状图的异步请求
//页面加载的时候执行
$(function (){
    //定义数据存放的数组
    var arrId = [];//这是我自己建的空数组，为了把异步拿到的数据push进去
    var arrName = [];
    // 发送AJAX异步请求去Servlet后台获取账单数量的数据
    $.get("/IndexServlet.do?action=BillingNum",function (result){
      
    },"json")
  });
```

后台接收请求

IndexServlet

```java
/**
 * 大数据首页信息展示
 */
@WebServlet("/IndexServlet.do")
public class IndexServlet extends HttpServlet {
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //处理请求和响应的代码
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("text/html;charset=utf-8");
        //获取前端的业务请求
        String value = req.getParameter("action");
        if (value.equals("BillingNum")){
            System.out.println("前端发送的请求获取到了");
        }
    }
}
```

通过数据库查询到账单的个数以及供应商信息

SupplierDao

```java
/**
     * 供应商列表查询
     * @param name
     * @return
     */
    List<Supplier> selectAll(String name);
```

SupplierDaoImpl

```java
@Override
    public List<Supplier> selectAll(String name) {
        if (name != null && !"".equals(name)){
            return DButils.commonQuery(Supplier.class, "select * from tb_supplier where isdelete=0 and name like ?", "%" + name + "%");
        }else {
            return DButils.commonQuery(Supplier.class, "select * from tb_supplier where isdelete=0");
        }
    }
```

IndexServlet

```java
        //折线图请求
        if (value.equals("BillingNum")){
            //System.out.println("前端发送的请求获取到了");
            //这是一个Java对象
            //查询所有的供应商
            List<Supplier> suppliersList = supplierService.selectAll(null);
            //通过fastJson转换字符串
            String jsonString = JSONObject.toJSONString(suppliersList);
            //输入流
            PrintWriter writer = resp.getWriter();
            writer.print(jsonString);
        }
```

index.js异步请求

```javascript
//柱状图的异步请求
//页面加载的时候执行
  $(function (){
    //定义数据存放的数组
    var arrId = [];//这是我自己建的空数组，为了把异步拿到的数据push进去
    var arrName = [];
    // 发送AJAX异步请求去Servlet后台获取账单数量的数据
    $.get("/IndexServlet.do?action=BillingNum",function (result){
      // 取出数据存入数组
      for (var i = 0;i<result.length;i++){
        //迭代数据进入数组
        // var id = result[i].id;
        // var name = result[i].name;
        arrId.push(result[i].id);
        arrName.push(result[i].name);
        myChart.hideLoading(); //隐藏加载动画
        //9.覆盖操作-根据数据加载数据图表
        myChart.setOption({
          xAxis:{
            data:arrName,
            axisLabel:{
              interval:0,//横轴信息全部显示
            }
          },
          series: [
            {
              name: "人数",
              type: "bar",
              barWidth: "35%",
              data: arrId,
              itemStyle: {
                barBorderRadius: 5
              }
            }
          ],
        });
        dataAll = [
          { year: "2023", data: arrId }
        ];
      }
    },"json")
  });
```

前端完整代码

```javascript
// 柱状图-账单数据展示
(function() {
  // 实例化对象
  var myChart = echarts.init(document.querySelector(".bar .chart"));
  // 指定配置和数据
  var option = {
    color: ["#2f89cf"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: "0%",
      top: "10px",
      right: "0%",
      bottom: "4%",
      containLabel: true
    },
    xAxis: [
      {
        type: "category",
        data: [],
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: "12"
          }
        },
        axisLine: {
          show: false
        }
      }
    ],
    yAxis: [
      {
        type: "value",
        axisLabel: {
          textStyle: {
            color: "rgba(255,255,255,.6)",
            fontSize: "12"
          }
        },
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
            // width: 1,
            // type: "solid"
          }
        },
        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
          }
        }
      }
    ],
    series: [
      {
        name: "直接访问",
        type: "bar",
        barWidth: "35%",
        data: [],
        itemStyle: {
          barBorderRadius: 5
        }
      }
    ]
  };

  // 把配置给实例对象
  myChart.setOption(option);
  window.addEventListener("resize", function() {
    myChart.resize();
  });

  // 数据变化
  var dataAll = [
    // { year: "2023", data: [200, 300, 300, 900, 1500, 1200, 600] }
    // { year: "2020", data: [300, 400, 350, 800, 1800, 1400, 700] }
  ];

  $(".bar h2 ").on("click", "a", function() {
    option.series[0].data = dataAll[$(this).index()].data;
    myChart.setOption(option);
  });
//柱状图的异步请求
//页面加载的时候执行
  $(function (){
    //定义数据存放的数组
    var arrId = [];//这是我自己建的空数组，为了把异步拿到的数据push进去
    var arrName = [];
    // 发送AJAX异步请求去Servlet后台获取账单数量的数据
    $.get("/IndexServlet.do?action=BillingNum",function (result){
      // 取出数据存入数组
      for (var i = 0;i<result.length;i++){
        //迭代数据进入数组
        // var id = result[i].id;
        // var name = result[i].name;
        arrId.push(result[i].id);
        arrName.push(result[i].name);
        myChart.hideLoading(); //隐藏加载动画
        //9.覆盖操作-根据数据加载数据图表
        myChart.setOption({
          xAxis:{
            data:arrName,
            axisLabel:{
              interval:0,//横轴信息全部显示
            }
          },
          series: [
            {
              name: "人数",
              type: "bar",
              barWidth: "35%",
              data: arrId,
              itemStyle: {
                barBorderRadius: 5
              }
            }
          ],
        });
        dataAll = [
          { year: "2023", data: arrId }
        ];
      }
    },"json")
  });
})();
```

### 折线图-用户变化

前端页面

```java
// 折线图定制
(function() {

  // 1. 实例化对象
  var myChart = echarts.init(document.querySelector(".line .chart"));
  // 2.指定配置
  var option = {
    // 通过这个color修改两条线的颜色
    color: ["#00f2f1", "#ed3f35"],
    tooltip: {
      trigger: "axis"
    },
    legend: {
      data: ['新增粉丝'],
      // 如果series 对象有name 值，则 legend可以不用写data
      // 修改图例组件 文字颜色
      textStyle: {
        color: "#4c9bfd"
      },
      // 这个10% 必须加引号
      right: "10%"
    },
    grid: {
      top: "20%",
      left: "3%",
      right: "4%",
      bottom: "3%",
      show: true, // 显示边框
      borderColor: "#012f4a", // 边框颜色
      containLabel: true // 包含刻度文字在内
    },

    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [
        "1月",
        "2月",
        "3月",
        "4月",
        "5月",
        "6月",
        "7月",
        "8月",
        "9月",
        "10月",
        "11月",
        "12月"
      ],
      axisTick: {
        show: false // 去除刻度线
      },
      axisLabel: {
        color: "#4c9bfd" // 文本颜色
      },
      axisLine: {
        show: false // 去除轴线
      }
    },
    yAxis: {
      type: "value",
      axisTick: {
        show: false // 去除刻度线
      },
      axisLabel: {
        color: "#4c9bfd" // 文本颜色
      },
      axisLine: {
        show: false // 去除轴线
      },
      splitLine: {
        lineStyle: {
          color: "#012f4a" // 分割线颜色
        }
      }
    },
    series: [
      {
        name: '新增粉丝',
        type: 'line',
        stack: 'Total',
        data: []
      }
    ]
  };

    //页面加载的时候发送请求
    $(function (){
      var arrCount = [];
      // 发送AJAX异步请求去Servlet后台获取用户数量的数据
      $.get("/IndexServlet.do?action=peopleNum",function (result){
        for (var i = 0; i<result.length;i++){
          arrCount.push(result[i]);
          myChart.hideLoading(); //隐藏加载动画
          myChart.setOption({
            series: [
              {
                name: '新增粉丝',
                type: 'line',
                stack: 'Total',
                data: arrCount
              }
            ]
          });
        }
      },"json")
    });

  // 3. 把配置给实例对象
  myChart.setOption(option);
  // 4. 让图表跟随屏幕自动的去适应
  window.addEventListener("resize", function() {
    myChart.resize();
  });

  // 5.点击切换效果
  $(".line h2").on("click", "a", function() {
    // alert(1);
    // console.log($(this).index());
    // 点击 a 之后 根据当前a的索引号 找到对应的 yearData的相关对象
    // console.log(yearData[$(this).index()]);
    var obj = yearData[$(this).index()];
    option.series[0].data = obj.data[0];
    option.series[1].data = obj.data[1];
    // 需要重新渲染
    myChart.setOption(option);
  });
})();
```

后端代码

```java
public interface DataDao {
    //查询总数
    ArrayList<Integer> getTotalCount(User user);
}
```

```java
public class DataDaoImpl implements DataDao {

    @Override
    public ArrayList<Integer> getTotalCount(User user) {
        return DButils.commonQueryCountAll("SELECT DATE_FORMAT(birthday, '%Y-%m') AS month, COUNT(*) AS count FROM tb_users GROUP BY month");
    }
}
```

```java
//折线图请求
        if (value.equals("peopleNum")){
            //System.out.println("折线图请求发送过来");
            User user = new User();
            ArrayList<Integer> totalCount = dataService.getTotalCount(user);
            //System.out.println(totalCount);
            String jsonString = JSONObject.toJSONString(totalCount);
            PrintWriter writer = resp.getWriter();
            writer.print(jsonString);
        }
```

## 权限管理

AuthorityDao

```java
List<User> selectAll(String username);
```

AuthorityDaoImpl

```java
public class AuthorityDaoImpl implements AuthorityDao {
    @Override
    public List<User> selectAll(String username) {
        if (username != null && !"".equals(username)){
            return DButils.commonQuery(User.class, "select * from tb_users where isdelete=0 and username like ?", "%" + username + "%");
        }else {
            return DButils.commonQuery(User.class, "select * from tb_users where isdelete=0");
        }
    }
}
```

AuthorityServlet

```java
@WebServlet("/AuthorityServlet")
public class AuthorityServlet extends HttpServlet {
    AuthorityService authorityService = new AuthorityServiceImpl();
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //处理请求和响应乱码
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("text/html;charset=utf-8");
        String value = req.getParameter("action");
        //查询
        if (value.equals("list")){
            //前端传过来的数据
            String username = req.getParameter("username");
            //通过数据库查询所有的数据
            List<User> usersList = authorityService.selectAll(username);
            System.out.println(usersList);
            //将数据都保存起来
            req.setAttribute("usersList",usersList);
            //转发页面
            req.getRequestDispatcher("/bill-cate.jsp").forward(req,resp);
        }
    }
}
```

bill-cate.jsp(注意在index.jsp那里发送请求)

```html
<tbody>
                        <c:forEach items="${requestScope.usersList}" var="s" varStatus="sta">
                            <tr>
                                <td>
                                    <input type="checkbox" name="id" value="1"  lay-skin="primary">
                                </td>
                                <td>${sta.index+1}</td>
                                <td>${s.username}</td>
                                <td>
                                    <c:choose>
                                        <c:when test="${s.type == 1}">
                                            管理员
                                        </c:when>
                                        <c:when test="${s.type == 2}">
                                            经理
                                        </c:when>
                                        <c:when test="${s.type == 3}">
                                            普通用户
                                        </c:when>
                                    </c:choose>
                                </td>
                                <td class="td-manage">
                                    <a title="编辑"  onclick="xadmin.open('编辑','admin-edit.html')" href="javascript:;">
                                        <i class="layui-icon">&#xe642;</i>
                                    </a>
                                    <a title="删除" onclick="member_del(this,'要删除的id')" href="javascript:;">
                                        <i class="layui-icon">&#xe640;</i>
                                    </a>
                                </td>
                            </tr>
                        </c:forEach>
                        </tbody>
```

## 柱状图-供应商信息(Ajax请求+JSON)

Dbutils工具类方法

```java
//查询供应商底下的账单数量
    public static Map<String, Integer> commonQueryCountMap(String sql) {
        Connection connection = null;
        PreparedStatement statement = null;
        ResultSet resultSet = null;
        Map<String, Integer> countMap = new HashMap<>();
        try {
            connection = getConnection();
            statement = connection.prepareStatement(sql);
            resultSet = statement.executeQuery();
            while (resultSet.next()) {
                String supplierName = resultSet.getString("name");
                int billCount = resultSet.getInt("bill_count");
                countMap.put(supplierName, billCount);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            DButils.close(connection, statement, resultSet);
        }
        return countMap;
    }
```

SupplierDao层接口

```java
//查询供应商底下账单的数量
Map<String, Integer> getBillCountBySupplier();
```

SupplierDao层接口实现类

```java
@Override
    public Map<String, Integer> getBillCountBySupplier() {
        String sql =
                "SELECT tb_supplier.name, COUNT(tb_bills.id) AS bill_count " +
                        "FROM tb_supplier LEFT JOIN tb_bills ON tb_supplier.id = tb_bills.providerid " +
                        "GROUP BY tb_supplier.name";
        return DButils.commonQueryCountMap(sql);
    }
```

前端代码

```JavaScript
//页面加载的时候发送请求
  $(function (){
    //定义数据存放的数组
    var arrId = [];//这是我自己建的空数组，为了把异步拿到的数据push进去
    var arrName = [];
    //发送Ajax异步请求去Servlet后台获取账单数量的数据
    $.get("/IndexServlet.do?action=SupplierNum",function (result){
      //后端的接口写好之后可以看一下后端的数据有没有发送到前端来
      console.log(result);
      //取出数据存入数组中
      for (var i = 0 ;i<result.length;i++){
        arrId.push(result[i].billCount);
        arrName.push(result[i].name);
        myChart.hideLoading(); //隐藏加载动画
        //覆盖操作-根据数据加载数据图表
        myChart.setOption({
          xAxis:{
            data:arrName,
            axisLabel:{
              interval:0,//横轴信息全部显示
            }
          },
          series: [
            {
              name: "人数",
              type: "bar",
              barWidth: "35%",
              data: arrId,
              itemStyle: {
                barBorderRadius: 5
              }
            }
          ],
        });
        dataAll = [
          { year: "2023", data: arrId }
        ];
      }
    },"json")
  });
```

后端代码

```java
@WebServlet("/IndexServlet.do")
public class IndexServlet extends HttpServlet {
    SupplierService supplierService = new SupplierServiceImpl();
    @Override
    protected void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        //处理请求和响应乱码
        req.setCharacterEncoding("UTF-8");
        resp.setContentType("text/html;charset=utf-8");
        //获取前端的请求
        String value = req.getParameter("action");
        //供应商柱状图数据请求
        if (value != null && value.equals("SupplierNum")){
            // 在这里可以检查一下 ajax 发送请求过来没有
            System.out.println("供应商柱状图请求发送过来了");
            // 查询供应商底下的账单个数
            Map<String, Integer> billCountBySupplier = supplierService.getBillCountBySupplier();

            // 使用 JSONObject 对象将供应商 ID 和账单个数转成 JSON 字符串
            JSONObject jsonObj;
            JSONArray jsonArray = new JSONArray();
            for (Map.Entry<String, Integer> entry : billCountBySupplier.entrySet()) {
                jsonObj = new JSONObject();
                String supplierName = entry.getKey(); // 获取Map中的key
                int billCount = entry.getValue(); // 获取Map中的value
                jsonObj.put("name",supplierName);
                jsonObj.put("billCount", billCount);
                jsonArray.add(jsonObj);
            }
            // 将供应商信息转成 JSON 字符串
            String jsonString = JSON.toJSONString(jsonArray);
            // 设置响应类型和编码
            resp.setContentType("application/json; charset=utf-8");

            // 发送供应商柱状图请求的数据
            try (PrintWriter writer = resp.getWriter()) {
                writer.print(jsonString);
                writer.flush();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
```



































