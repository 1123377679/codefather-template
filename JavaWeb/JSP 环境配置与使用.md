# JSP

概念：Java Server Pages,Java服务端页面

一种动态的网页技术，其中既可以定义HTML、JS、CSS等静态内容，还可以定义Java代码的动态内容

JSP = HTML + Java

JSP的作用：简化开发，避免了在Servlet中直接输出HTML标签

![image-20230217152159725](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202310251005588.png)

# JSP快速入门

## 1.导入Jsp坐标

```xml
<!--JSP坐标 -->
    <dependency>
      <groupId>javax.servlet.jsp</groupId>
      <artifactId>jsp-api</artifactId>
      <version>2.2</version>
      <scope>provided</scope>
    </dependency>
```

## 2.创建JSP文件

![image-20230217153155077](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202310251006614.png)

## 3.编写HTML标签和Java代码

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
    <h1>HelloJSP</h1>
    <%System.out.println("helloJsp");%>
</body>
</html>
```

## JSP脚本

JSP脚本用于在JSP页面内定义Java代码

JSP脚本分类:

1.<%...%>内容会直接放到_jspService()方法之中

2.<%=..%>:内容会放到out.print()中，作为out.print()的参数

3.<%!%>:内容会放到jspService()方法之外，被类直接包含

## JSP缺点

由于JSP页面内，既可以定义HTML标签，又可以定义java代码，造成了以下问题：

1.书写麻烦：特别是复杂的页面
2.阅读麻烦
3.复杂度高：运行需要依赖于各种环境，JRE,JSP容器，JavaEE.…
4.占内存和磁盘：JSP会自动生成.java和.class文件占磁盘，运行的是.class文件占内存
5.调试困难：出错后，
需要找到自动生成的.java文件进行调试
6.不利于团队协作：前端人员不会java,后端人员不精HTML

7......

JSP已逐渐退出历史舞台

一般都用HTML+AJAX

## 使用JSP脚本展示品牌数据

![image-20231024172324823](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202310242240241.png)

```jsp
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>

<body>
    <table border="1px" cellpadding="0px" cellspacing="0px">
        <tr>
            <th>序号</th>
            <th>品牌</th>
            <th>企业名称</th>
            <th>排序</th>
            <th>品牌介绍</th>
            <th>状态</th>
            <th>操作</th>
        </tr>
        <tr>
            <td>1</td>
            <td>德玛西亚</td>
            <td>盖伦</td>
            <td>100</td>
            <td>人在塔在</td>
            <td>启用</td>
            <td>
                <a href="#">修改</a>
                <a href="#">删除</a>
            </td>
        </tr>
        <tr>
            <td>2</td>
            <td>诺克萨斯</td>
            <td>洛手</td>
            <td>10</td>
            <td>绝不姑息</td>
            <td>禁用</td>
            <td>
                <a href="#">修改</a>
                <a href="#">删除</a>
            </td>
        </tr>
        <tr>
            <td>3</td>
            <td>恕瑞玛</td>
            <td>沙皇</td>
            <td>1</td>
            <td>恕瑞玛你们的皇帝回来了</td>
            <td>启用</td>
            <td>
                <a href="#">修改</a>
                <a href="#">删除</a>
            </td>
        </tr>
    </table>
</body>
</html>

```

```java
package org.lanqiao;

public class Brand {
    private Integer id;
    private String brandName;
    private String companyName;
    private Integer ordered;
    private String description;
    private Integer status;

    public Brand() {
    }

    public Brand(Integer id, String brandName, String companyName, Integer ordered, String description, Integer status) {
        this.id = id;
        this.brandName = brandName;
        this.companyName = companyName;
        this.ordered = ordered;
        this.description = description;
        this.status = status;
    }

    @Override
    public String toString() {
        return "Brand{" +
                "id=" + id +
                ", brandName='" + brandName + '\'' +
                ", companyName='" + companyName + '\'' +
                ", ordered=" + ordered +
                ", description='" + description + '\'' +
                ", status=" + status +
                '}';
    }
}

```

```jsp
<%
    List<Brand> brands = new ArrayList<Brand>();
    brands.add(new Brand(1,"xxx","x",100,"厉害",1));
    brands.add(new Brand(2,"xx","x",100,"厉害",1));
    brands.add(new Brand(3,"xx","x",100,"厉害",1));
%>
```



```jsp
<%@ page import="org.lanqiao.Brand" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.ArrayList" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<%
    List<Brand> brands = new ArrayList<Brand>();
    brands.add(new Brand(1,"三只松鼠","三只松鼠",100,"厉害",1));
    brands.add(new Brand(2,"三只松鼠","三只松鼠",100,"厉害",1));
    brands.add(new Brand(3,"三只松鼠","三只松鼠",100,"厉害",1));
%>
<body>
    <table border="1px" cellpadding="0px" cellspacing="0px">
        <%
        for (int i = 0; i<brands.size();i++){
            Brand brand = brands.get(i);
        %>
        <tr>
            <td><%=brand.getId()%></td>
            <td><%=brand.getBrandName()%></td>
            <td><%=brand.getCompanyName()%></td>
            <td><%=brand.getOrdered()%></td>
            <td><%=brand.getDescription()%></td>
            <%
            if (brand.getStatus() == 1){

            %>
            <td><%="启动"%></td>
            <%
                }else {
            %>
            <td><%="禁用"%></td>
            <%
                }
            %>
            <td>
                <a href="#">修改</a>
                <a href="#">删除</a>
            </td>
        </tr>
        <%
            }
        %>
    </table>
</body>
</html>

```



# EL表达式

Expression Language表达式语言，用于简化JSP页面内的Java代码

主要功能：获取数据

语法：${expression)

```
￥{brands}：获取域中存储的key为brands的数据
```

开启el表达式

```
isELIgnored="false"
```

```java
package org.lanqiao.servlet;

import org.lanqiao.Brand;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/ServletDemo12")
public class ServletDemo12 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //处理请求和响应编码
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=utf-8");

        List<Brand> brands = new ArrayList<Brand>();
        brands.add(new Brand(1,"三只松鼠","三只松鼠",100,"厉害",1));
        brands.add(new Brand(2,"三只松鼠","三只松鼠",100,"厉害",1));
        brands.add(new Brand(3,"三只松鼠","三只松鼠",100,"厉害",1));
        request.setAttribute("brands",brands);
        request.getRequestDispatcher("/list.jsp").forward(request,response);

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doGet(request, response);
    }
}

```

云课案例:

查询员工信息

 查询用户信息

## javaWeb中的四大作用域:

1.page:当前页面有效
2.request:当前请求有效
3.session:当前会话有效
4.application:当前应用有效

表达式获取数据，会依次从这4个域中寻找，直到找到为止

![image-20231024232340847](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202310242323629.png)

# JSTL标签

JSP标准标签库((Jsp Standarded Tag Library),使用标签取代JSP页面上的Java代码

![image-20230218142100229](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202310251006634.png)

## 引入maven包

```
<!-- jstl    -->
    <dependency>
      <groupId>jstl</groupId>
      <artifactId>jstl</artifactId>
      <version>1.2</version>
    </dependency>

    <dependency>
      <groupId>taglibs</groupId>
      <artifactId>standard</artifactId>
      <version>1.1.2</version>
    </dependency>
```

## jsp页面引入JSTL标签

```
<%taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
```

## c:if

c:if:来完成逻辑判断，替换java if else



## c:forEach

<c:forEach>:相当于for循环

![image-20230218143212229](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202310251006720.png)

items:被遍历的容器
var:遍历产生的临时变量

![image-20230218144923279](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202310251006957.png)

begin:开始数
end:结束数
step:步长