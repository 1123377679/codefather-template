# AJAX

概念：AJAX(Asynchronous JavaScript And XML):异步的JavaScript和XML

## AJAX作用：

1.与服务器进行数据交换：通过AJAX可以给服务器发送请求，并获取服务器响应的数据

使用了AJAX和服务器进行通信，就可以使用HTML+AJAX来替换JSP页面了

![image-20230220233252502](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202311291040555.png)

异步交互：可以在不重新加载整个页面的情况下，与服务器交换数据并更新部分网页的技术，如：搜索联想、用户名是否可用校验，等等.…

## 同步和异步

### AJAX快速入门

1.编写AjaxServlet,并使用response输出字符串

2.创建XMLHttpRequest对象：用于和服务器交换数据

![image-20230220233804149](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202311291040648.png)

3.向服务器发送请求

![image-20230220233813656](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202311291039607.png)

4.获取服务器响应数据

![image-20230220233825302](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202311212304720.png)



## Axios异步框架

Axios对原生的AJAX进行封装，简化书写

官网：https://axios-http.com/zh/

## Axios快速入门

1.引入axios的js文件

```js
<script src="https://cdn.bootcdn.net/ajax/libs/axios/1.5.0/axios.js"></script>
```

2.使用axios发送请求，并获取响应结果

![image-20230322152313475](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202303221523011.png)

案例:

axios-demo1.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

</body>
<script src="https://cdn.bootcdn.net/ajax/libs/axios/1.5.0/axios.js"></script>
<script>
  axios({
    method:"get",
    url:"http://localhost:8080/maven_test_war_exploded/axiosServletDemo1?username=zhangsan"
  }).then((result)=>{
    console.log(result.data);
  });
</script>
</html>
```

axiosServletDemo1

```java
package org.lanqiao.axios;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;

@WebServlet("/axiosServletDemo1")
public class axiosServletDemo1 extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //处理请求和响应编码
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=utf-8");
        String username = request.getParameter("username");
        System.out.println(username);
        //响应数据
        response.getWriter().write("axios请求成功");
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doGet(request, response);
    }
}

```



## Axios请求方式别名

为了方便起见，Axios已经为所有支持的请求方法提供了别名。

![image-20230221105945484](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202311291039096.png)

![image-20230221105949874](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202311291039347.png)

发送get请求

![image-20230221110003581](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202311291040292.png)

发送post请求

![image-20230221110017598](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202311291040470.png)

案例:点击按钮发送请求

前端页面

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<form id="myForm">
  <label for="username">Username:</label>
  <input type="text" id="username" name="username"><br><br>
  <button type="button" onclick="submitForm()">Submit</button>
</form>
</body>
<script src="https://cdn.bootcdn.net/ajax/libs/axios/1.5.0/axios.js"></script>
<script>
  function submitForm() {
    var form = document.getElementById("username");
    var username = form.value;
    axios({
      method: "post",
      url: "http://localhost:8080/maven_test_war_exploded/axiosServletDemo1",
      data: "username="+username
    }).then((result) => {
      console.log(result.data);
    });
  }
</script>
</html>
```

# JSON

JavaScript Object Nocation JavaScript对象表示法

JavaScript对象:

```
{
	name:"zhangsan",
	age:23,
	city:"北京"
}
```

JSON:

```
{
	"name":"zhangsan",
	"age":23,
	"city":"北京"
}
```

![image-20231128164955515](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202311281649140.png)

JSON由于其语法简单，层次结构鲜明，现多用于作为数据载体，在网络中进行数据传输

## JSON的基础语法

```
var json = {
	"name":"zhangsan",
	"age":23,
	"city":"北京"
	"addr":["北京","上海"]
}

alert(json.name)
```



## JSON数据和Java对象转换

Fastjson是阿里巴巴提供的一个Java语言编写的高性能功能完善的JSON库，是目前Java语言中最快的JSON库，可以实现Java对象和JSON字符串之间的相互转换

使用:

1.导入坐标

```
<!--    fastjson-->
    <dependency>
      <groupId>com.alibaba</groupId>
      <artifactId>fastjson</artifactId>
      <version>2.0.28</version>
    </dependency>
```

2.Java对象转JSON

```
String jsonStr = JSON.toJSONString(obj);
```

3.JSON字符串转Java对象

```
User user = JSON.parseObject(jsonStr,User.class)
```

## 案例

将Java对象转换成JSON字符串

```
User user = new User();
user.setId();
user.setUserName("张三");
user.setPassword("123");
String jsonString = JSON.toJSONString(user);
System.out.println(jsonString);
```

将JSON字符串转为Java对象

```
User user = JSON.parseObject(jsonStr,User.class)
```

### 查询所有案例

数据库设计

```sql
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `brands`;
CREATE TABLE `brands`  (
  `id` int NOT NULL,
  `brand_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `company_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `display_order` int NULL DEFAULT NULL,
  `brand_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL,
  `status` int NULL DEFAULT NULL COMMENT '1是启用 0是不启用',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

INSERT INTO `brands` VALUES (1, '品牌A', '企业A', 1, '品牌A的介绍', 1);
INSERT INTO `brands` VALUES (2, '品牌B', '企业B', 2, '品牌B的介绍', 1);
INSERT INTO `brands` VALUES (3, '品牌C', '企业C', 3, '品牌C的介绍', 0);
INSERT INTO `brands` VALUES (4, '品牌D', '企业D', 4, '品牌D的介绍', 1);
INSERT INTO `brands` VALUES (5, '品牌E', '企业E', 5, '品牌E的介绍', 0);

SET FOREIGN_KEY_CHECKS = 1;

```

index.html

```html
<html>
<body>
<h2>${user.username},欢迎您的登录</h2>

<input type="button" value="新增" id="add"><br>
<hr>
<table border="1" cellspacing="0" width="1200">
    <tr>
        <th>序号</th>
        <th>品牌名称</th>
        <th>企业名称</th>
        <th>排序</th>
        <th>品牌介绍</th>
        <th>状态</th>
        <th>操作</th>
    </tr>
    <tr>
        <th>1</th>
        <th>品牌1</th>
        <th>企业1</th>
        <th>1</th>
        <th>牛逼</th>
        <th>启用</th>
        <th>
        <a href="#">修改</a>
        <a href="#">删除</a>
        </th>
    </tr>
</table>
<script>
    document.getElementById("add").onclick = function (){
        location.href = "/addBrand.jsp";
    }
</script>
</body>
</html>

```

brand.java

```java
package org.lanqiao.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Brand {
    private int id;
    private String brandName;
    private String companyName;
    private int displayOrder;
    private String brandDescription;
    private int status;
}

```

BrandMapper

```java
public interface BrandMapper {
    //查询所有商品接口
    List<Brand> getAllBrands();
}
```

BrandMapper.xml

```java
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">



<mapper namespace="org.lanqiao.mapper.BrandMapper">
    <resultMap id="BrandMap" type="org.lanqiao.pojo.Brand">
        <id property="id" column="id"/>
        <result property="brandName" column="brand_name"/>
        <result property="companyName" column="company_name"/>
        <result property="displayOrder" column="display_order"/>
        <result property="brandDescription" column="brand_description"/>
        <result property="status" column="status"/>
    </resultMap>
    
    
    <select id="getAllBrands" resultType="org.lanqiao.pojo.Brand" resultMap="BrandMap">
        SELECT * FROM brands;
    </select>
</mapper>
```

mybatis-config.xml

```java
<!--引入映射文件-->
    <mappers>
        <mapper resource="org/lanqiao/mapper/UserMapper.xml"/>
        <mapper resource="org/lanqiao/mapper/BrandMapper.xml"/>
    </mappers>
```

BrandServlet

```java
package org.lanqiao.servlet;

import com.alibaba.fastjson2.JSONObject;
import org.apache.ibatis.session.SqlSession;
import org.lanqiao.mapper.BrandMapper;
import org.lanqiao.pojo.Brand;
import org.lanqiao.utils.SqlSessionUtil;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

/**
 * 处理品牌查询请求
 */
@WebServlet("/brandServlet")
public class BrandServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //处理请求和响应编码
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=utf-8");
        //查询所有商品
        SqlSession sqlSession = SqlSessionUtil.getSession();
        BrandMapper mapper = sqlSession.getMapper(BrandMapper.class);
        List<Brand> allBrands = mapper.getAllBrands();
        System.out.println(allBrands);
        //使用fastjson将查询出来的所有品牌对象转换为json字符串
        String jsonString = JSONObject.toJSONString(allBrands);
        //发送给前端
        PrintWriter out = response.getWriter();
        out.write(jsonString);
        out.flush();
        out.close();

    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doGet(request, response);
    }
}

```

brand.html

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h2>${user.username},欢迎您的登录</h2>

<input type="button" value="新增" id="add"><br>
<hr>
<table border="1" cellspacing="0" width="1200" id="brandTable">
    <tr>
        <th>序号</th>
        <th>品牌名称</th>
        <th>企业名称</th>
        <th>排序</th>
        <th>品牌介绍</th>
        <th>状态</th>
        <th>操作</th>
    </tr>
</table>

</body>
<script src="https://cdn.bootcdn.net/ajax/libs/axios/1.5.0/axios.js"></script>
<script>
    document.getElementById("add").onclick = function (){
        location.href = "/addBrand.jsp";
    }
    window.onload = function () {
        //获取数据
        axios.get("/brandServlet").then(function (resp){
            console.log(resp);
            var data = resp.data;  // 获取到后端返回的数据
            var table = document.getElementById("brandTable");

            // 遍历数据，动态创建表格行并填充数据
            for (var i = 0; i < data.length; i++) {
                var row = table.insertRow(); // 创建新的行，并插入到最后一行
                var cell1 = row.insertCell(); // 创建新的单元格
                cell1.innerHTML = data[i].id; // 填充数据
                var cell2 = row.insertCell();
                cell2.innerHTML = data[i].brandName;
                var cell3 = row.insertCell();
                cell3.innerHTML = data[i].companyName;
                var cell4 = row.insertCell();
                cell4.innerHTML = data[i].displayOrder;
                var cell5 = row.insertCell();
                cell5.innerHTML = data[i].brandDescription;
                var cell6 = row.insertCell();
                if (data[i].status == '1'){
                    cell6.innerHTML = '启用';
                }else {
                    cell6.innerHTML = '禁用';
                }
                var cell7 = row.insertCell();
                cell7.innerHTML = '<a href="#">修改</a> <a href="#">删除</a>';
            }
        });
    }
</script>

</html>
```

### 添加案例

addBrand.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>添加品牌</title>
</head>
<body>
<h3>添加品牌</h3>
<form action="#" method="post">
  品牌名称：<input id="brandName" name="brandName"><br>
  企业名称：<input id="companyName" name="companyName"><br>
  排序：<input id="displayOrder" name="displayOrder"><br>
  描述信息：<textarea rows="5" cols="20" id="brandDescription" name="brandDescription"></textarea><br>
  状态：
  <input type="radio" name="status" value="0">禁用
  <input type="radio" name="status" value="1">启用
  <br>

  <input type="button" id="btn" value="提交">
</form>
</body>
```

```javascript
<script src="https://cdn.bootcdn.net/ajax/libs/axios/1.5.0/axios.js"></script>
<script>
  //1. 给按钮绑定单击事件
  document.getElementById("btn").onclick = function () {
    // 将表单数据转为json
    var formData = {
      brandName:"",
      companyName:"",
      displayOrder:"",
      brandDescription:"",
      status:"",
    };
    // 获取表单数据
    let brandName = document.getElementById("brandName").value;
    // 设置数据
    formData.brandName = brandName;

    // 获取表单数据
    let companyName = document.getElementById("companyName").value;
    // 设置数据
    formData.companyName = companyName;

    // 获取表单数据
    let displayOrder = document.getElementById("displayOrder").value;
    // 设置数据
    formData.displayOrder = displayOrder;

    // 获取表单数据
    let brandDescription = document.getElementById("brandDescription").value;
    // 设置数据
    formData.brandDescription = brandDescription;

    let status = document.getElementsByName("status");
    for (let i = 0; i < status.length; i++) {
      if(status[i].checked){
        //
        formData.status = status[i].value ;
      }
    }
    //2. 发送ajax请求
    axios.post("/addBrandServlet", formData).then(function (resp){
      let num = resp.data;
      if (num == '200'){
        location.href = "/brand.html";
      }else {
        alert("添加失败！");
        location.href = "/addBrand.html";
      }
    })
  }
</script>
```

BrandMapper

```java
//添加商品
    int addBrand(Brand brand);
```

BrandMapper.xml

```java
    <insert id="addBrand">
        INSERT INTO brands(brand_name,company_name,display_order,brand_description,status)
        VALUES(
               #{brandName},#{companyName},#{displayOrder},#{brandDescription},#{status}
               )
    </insert>
```

addBrandServlet

```java
package org.lanqiao.servlet;

import com.alibaba.fastjson2.JSONObject;
import org.apache.ibatis.session.SqlSession;
import org.lanqiao.mapper.BrandMapper;
import org.lanqiao.pojo.Brand;
import org.lanqiao.utils.SqlSessionUtil;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.annotation.*;
import java.io.BufferedReader;
import java.io.IOException;

@WebServlet("/addBrandServlet")
public class AddBrandServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        //处理请求和响应编码
        request.setCharacterEncoding("UTF-8");
        response.setContentType("text/html;charset=utf-8");
        // 获取请求体数据
        BufferedReader br = request.getReader();
        String params = br.readLine();
        // 将JSON字符串转为Java对象
        Brand brand = JSONObject.parseObject(params, Brand.class);
        System.out.println(brand);
        SqlSession sqlSession = SqlSessionUtil.getSession();
        BrandMapper mapper = sqlSession.getMapper(BrandMapper.class);
        int i = mapper.addBrand(brand);
        System.out.println(i);
        if (i >= 1){
            sqlSession.commit();
            response.getWriter().write("200");
        }else {
            response.getWriter().write("500");
        }
    }

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        this.doGet(request, response);
    }
}

```

### 修改案例

跳转并且回显数据

需要修改index.html页面

```javascript
			var cell7 = row.insertCell();
                var editLink = document.createElement('a');
                editLink.href = "javascript:void(0);"; // 防止链接默认行为
                editLink.textContent = '修改';
                (function(id) {
                    editLink.addEventListener('click', function(e) {
                        goupdate(id);
                    });
                })(data[i].id); // 立即执行函数，传入当前的 ID
                cell7.appendChild(editLink);

                // 创建删除链接...
                var deleteLink = document.createElement('a');
                deleteLink.href = "javascript:void(0);";
                deleteLink.textContent = '删除';
                // 可以为删除链接也添加类似的事件监听器
                cell7.appendChild(deleteLink);
```

```javascript
// 定义 goupdate 函数，接受 id 作为参数
        function goupdate(id) {
            // 使用 AJAX 发送请求
            axios.get('/toUpdate', {
                params: {
                    id: id
                }
            }).then(function(response) {
                // 处理响应
                console.log(response);
            }).catch(function(error) {
                // 处理错误
                console.error(error);
            });
        }
```

后端代码

BrandsMapper

```
//根据id查询品牌内容
    Brands getBrandsById(int id);
```

BrandsMapper.xml

```
    <select id="getBrandsById" resultType="org.lanqiao.pojo.Brands" resultMap="BrandMap">
        select * from brands where id=#{id};
    </select>
```

BrandsToUpdateServlet

```java
String id = request.getParameter("id");
        //通过id去查询值
        SqlSession sqlSession = SqlSessionUtil.getSession();
        BrandsMapper mapper = sqlSession.getMapper(BrandsMapper.class);
        Brands brandsById = mapper.getBrandsById(Integer.parseInt(id));
        System.out.println(brandsById);
        //通过fastJSON将对象转成JSON字符串
        String json = JSON.toJSONString(brandsById);
        System.out.println(json);
        // 发送响应到前端
        response.getWriter().write(json);
        // 关闭SqlSession
        sqlSession.close();
```

然后携带数据跳转页面

```javascript
localStorage.setItem('brandData', JSON.stringify(response.data));
                // 页面跳转到修改页面
                window.location.href = '/updateBrand.html'; // 假设这是你的修改页面URL
```

回显数据

```JavaScript
 window.onload = function() {
        // 从localStorage中读取数据
        var brandData = JSON.parse(localStorage.getItem('brandData'));

        // 填充表单字段
        document.getElementById('brandName').value = brandData.brandName;
        document.getElementById('companyName').value = brandData.companyName;
        document.getElementById('displayOrder').value = brandData.displayOrder;
        document.getElementById('brandDescription').value = brandData.brandDescription;
        document.querySelector('input[name="status"][value="' + brandData.status + '"]').checked = true;
        localStorage.removeItem('brandData'); // 清除数据
    };
```

修改案例

先发送请求

```javascript
document.getElementById("btn").onclick = function (){
            // 将表单数据转为json
            var formData = {
                id:"",
                brandName:"",
                companyName:"",
                displayOrder:"",
                brandDescription:"",
                status:"",
            };
            formData.id = brandData.id;
            // 获取表单数据
            let brandName = document.getElementById("brandName").value;
            // 设置数据
            formData.brandName = brandName;

            // 获取表单数据
            let companyName = document.getElementById("companyName").value;
            // 设置数据
            formData.companyName = companyName;

            // 获取表单数据
            let displayOrder = document.getElementById("displayOrder").value;
            // 设置数据
            formData.displayOrder = displayOrder;

            // 获取表单数据
            let brandDescription = document.getElementById("brandDescription").value;
            // 设置数据
            formData.brandDescription = brandDescription;

            let status = document.getElementsByName("status");
            for (let i = 0; i < status.length; i++) {
                if(status[i].checked){
                    //
                    formData.status = status[i].value ;
                }
            }
            //2. 发送ajax请求
            axios.post("/updateBrandServlet", formData).then(function (resp){
                let num = resp.data;
                if (num == '200'){
                    location.href = "/index.html";
                }else {
                    alert("添加失败！");
                    location.href = "/updateBrand.html";
                }
            })
        }
```

BrandsMapper

```java
int updateBrands(Brands brands);
```

BrandsMapper.xml

```java
<update id="updateBrands">
        update brands set brand_name=#{brandName},company_name=#{companyName},
        display_order=#{displayOrder},brand_description=#{brandDescription},status=#{status}
        where id=#{id};
    </update>
```

UpdateBrandsServlet

```java
BufferedReader br = request.getReader();
        String params = br.readLine();
        // 将JSON字符串转为Java对象
        Brands brand = JSONObject.parseObject(params, Brands.class);
        SqlSession sqlSession = SqlSessionUtil.getSession();
        BrandsMapper mapper = sqlSession.getMapper(BrandsMapper.class);
        int i = mapper.updateBrands(brand);
        if (i >= 1){
            sqlSession.commit();
            response.getWriter().write("200");
        }else {
            response.getWriter().write("500");
        }
```

### 删除案例
