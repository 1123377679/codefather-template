# JSON

概念：JavaScript Object Notation。JavaScript对象表示法

# JSON基础语法

定义:

```
var变量名={
	"key1":value1,
	"key2":valae2,
	。。。。
}；
```

实例:

```
var json = {
	"name":"zhangsan",
	"age":23,
	"addr":["北京"，"上海"，"西安"门]
	};
```

获取数据

```
变量名.key
```

```
json.name
```

value的数据类型为：
数字（整数或浮点数）
>数字(整数或浮点数)
>
>字符串（在双引号中）
>
>逻辑值(true或false)
>
>数组（在方括号中）
>
>对象（在花括号中）
>
>null

# JSON数据和Java对象转换

Fastjson:是阿里巴巴提供的一个Java语言编写的高性能功能完善的SON库，是目前Java语言中最快的JSON库，可以实现Java对象和JSON字符串的相互转换。

使用:

1.导入坐标

```
<dependency>
<groupld>com.alibaba</groupld>
<artifactld>fastjson</artifactld>
<version>1.2.62</version>
</dependency>
```

2.Java对象转JSON

```
String jsonStr =  JSON.toJSONString(obj);
```

3.JSON字符串转Java对象

```
User user =  JSON.parseObject(jsonStr,User.class);
```

# 案例：查询所有