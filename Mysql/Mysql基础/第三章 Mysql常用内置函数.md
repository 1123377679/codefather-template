# 函数

## 什么是函数

函数是指一段可以直接被另一段程序调用的程序或代码

比如说：举个例子

数据库表中，存储的是入职日期，如2000-1-12，如何快速计算入职天数?

数据库表中，存储的是学生的分数值，如98、75，如何快速判定分数的等级呢?

## 字符串函数

Mysql中内置了很多字符串函数，常用的几个如下:

| 函数                             | 功能                                                      |
| :------------------------------- | :-------------------------------------------------------- |
| CONCAT(s1, s2, …, sn)            | 字符串拼接，将s1, s2, …, sn拼接成一个字符串               |
| LOWER(str)                       | 将字符串全部转为小写                                      |
| UPPER(str)                       | 将字符串全部转为大写                                      |
| LPAD(str, n, pad)                | 左填充，用字符串pad对str的左边进行填充，达到n个字符串长度 |
| RPAD(str, n, pad)                | 右填充，用字符串pad对str的右边进行填充，达到n个字符串长度 |
| TRIM(str)                        | 去掉字符串头部和尾部的空格                                |
| SUBSTRING(str, start, len)       | 返回从字符串str从start位置起的len个长度的字符串           |
| REPLACE(column, source, replace) | 替换字符串                                                |

使用示例:

```
-- 拼接
SELECT CONCAT('Hello', 'World');
-- 小写
SELECT LOWER('Hello');
-- 大写
SELECT UPPER('Hello');
-- 左填充
SELECT LPAD('01', 5, '-');
-- 右填充
SELECT RPAD('01', 5, '-');
-- 去除空格
SELECT TRIM(' Hello World ');
-- 切片（起始索引为1）
SELECT SUBSTRING('Hello World', 1, 5);
```

案例：

根据需求完成以下SQL的编写

由于业务需求变更，企业员工的工号，统一为5位数，目前不足5位数的全部在前面补0，比如：1号员工的工号应该是00001

```
UPDATE emp SET empId = LPAD(empId,5,'0');
```

## 数值函数

常见数值函数如下：

| 函数        | 功能                             |
| :---------- | :------------------------------- |
| CEIL(x)     | 向上取整                         |
| FLOOR(x)    | 向下取整                         |
| MOD(x, y)   | 返回x/y的模                      |
| RAND()      | 返回0~1内的随机数                |
| ROUND(x, y) | 求参数x的四舍五入值，保留y位小数 |

练习：通过数据库的函数，生成一个六位数的随机验证码

```
SELECT LPAD(ROUND(RAND()*1000000,0),6,'0') ;
```

## 日期函数

常见的日期函数如下：

| 函数                               | 功能                                              |
| :--------------------------------- | :------------------------------------------------ |
| CURDATE()                          | 返回当前日期                                      |
| CURTIME()                          | 返回当前时间                                      |
| NOW()                              | 返回当前日期和时间                                |
| YEAR(date)                         | 获取指定date的年份                                |
| MONTH(date)                        | 获取指定date的月份                                |
| DAY(date)                          | 获取指定date的日期                                |
| DATE_ADD(date, INTERVAL expr type) | 返回一个日期/时间值加上一个时间间隔expr后的时间值 |
| DATEDIFF(date1, date2)             | 返回起始时间date1和结束时间date2之间的天数        |

使用示例:

```
-- 返回当前日期
select CURDATE();

-- 获取指定date的年份
select YEAR(NOW());

-- 返回一个日期/时间值加上一个时间间隔expr后的时间值
select DATE_ADD(now(),70,DAY);

-- 返回起始时间date1和结束时间date2之间的天数
select DATEDIFF('2022-3-10', '2022-1-10');
```

案例:

查询所有员工的入职天数，并根据入职天数倒序排序

```
-- 查询所有员工的入职天数，并根据入职天数倒序排序
SELECT empUsername,DATEDIFF(CURDATE(),jointime)AS 'jointime' FROM emp ORDER BY jointime DESC;
```



## 流程控制函数

流程函数也是很常用的一类函数，可以在SQL语句中实现条件筛选，从而提高语句的效率

| 函数                                                         | 功能                                                    |
| :----------------------------------------------------------- | :------------------------------------------------------ |
| IF(value, t, f)                                              | 如果value为true，则返回t，否则返回f                     |
| IFNULL(value1, value2)                                       | 如果value1不为空，返回value1，否则返回value2            |
| CASE WHEN [ val1 ] THEN [ res1 ] … ELSE [ default ] END      | 如果val1为true，返回res1，… 否则返回default默认值       |
| CASE [ expr ] WHEN [ val1 ] THEN [ res1 ] … ELSE [ default ] END | 如果expr的值等于val1，返回res1，… 否则返回default默认值 |

使用示例:

```
-- if
select if(false,'Ok','Error');

-- ifnull
select ifnull('ok','Default');

--case when then else end
--需求:查询emp表中的员工姓名和工作地址(重庆和成都 --->一线城市，其他--->二线城市)
select name,(workaddress when '重庆' then '一线城市' when '成都' then '一线城市' else '二线城市' end) as '工作地址' from emp;
```

案例:

统计班级各个学生的成绩，展示的规则如下:

```
>=85分 展示优秀
>=60分 展示及格
否则，展示不及格
select id,name,
 (case when math>=85 then '优秀' when math>=60 then '及格' else '不及格' end) '数学',
 (case when english>=85 then '优秀' when english>=60 then '及格' else '不及格' end) '英语',
 (case when chinese>=85 then '优秀' when chinese>=60 then '及格' else '不及格' end) '语文' from score;
```

