# 约束(constraint)

## 概述

### 为什么需要约束

数据完整性(Data Integrity)是指数据的精确性(Accuracy)和可靠性(Reliability)。它是防止数据库中存在不
符合语义规定的数据和防止因错误信息的输入输出造成无效操作或错误信息而提出的。

>`实体完整性(Entity Integrity)`:例如，同一个表中，不能存在两条完全相同无法区分的记录
>`域完整性(Domain Integrity)`:例如：年龄范围0-120，性别范围“男/女”
>`引用完整性(Referential Integrity)`:例如：员工所在部门，在部门表中要能找到这个部门
>`用户自定义完整性(User-defined Integrity)`：例如：用户名唯一、密码不能为空等，本部门经理的工资
>不得高于本部门职工的平均工资的5倍。

### 什么是约束

1.概念：约束是作用于表中字段上的规则，用于限制存储在表中的数据。

2.目的：保证数据库中数据的正确、有效性和完整性。

3.分类：

| 约束     | 描述                                                     | 关键字         |
| -------- | -------------------------------------------------------- | -------------- |
| 非空约束 | 限制该字段的数据不能为null                               | NOT NULL       |
| 唯一约束 | 保证该字段的所有数据都是唯一、不重复的                   | UNIQUE         |
| 主键约束 | 主键是一行数据的唯一标识，要求非空且唯一                 | PRIMARY KEY    |
| 默认约束 | 保存数据时，如果未指定该字段的值，则采用默认值           | DEFAULT        |
| 检查约束 | 保证字段值满足某一个条件                                 | CHECK          |
| 外键约束 | 用来让两张表的数据之间建立连接，保证数据的一致性和完整性 | FOREIGN KEY    |
| 自增约束 | 让该字段的值再添加的时候+1                               | AUTO_INCREMENT |

`注意：约束是作用于表中字段上的，可以在创建表\修改表的时候添加约束`

## Mysql约束-主键约束

### 概念

- Mysql主键约束是一个列或者多个列的组合，多个列的被称为联合主键，`其值能唯一地标识表中的每一行，方便在RDBMS中尽快的找到某一行`
- 主键约束相当于唯一约束+非空约束的组合，主键约束列不允许重复，也不允许出现空值
- 每个表最多只允许一个主键
- 主键约束的关键字是:`primary key`
- 当创建主键的约束时，系统默认会在所在的列和列组合上建立对应的唯一索引（索引：查找速度比较快）

### 操作

添加单列主键

添加多列联合主键

删除主键

#### 操作-添加单列主键

创建单列主键有两种方式，一种是在定义字段的同时指定主键，一种是定义完字段之后指定主键

**方式1-语法：**

```sql
-- 在create table 语句中，通过PRIMARY KEY 关键字来指定主键
-- 在定义字段的同时指定主键，语法格式如下
create table 表名(
	...
    <字段名><数据类型> PRIMARY KEY
    ...
);
```

**方式1-实现：**

```sql
create table emp1(
	eid int PRIMARY KEY,
    name varchar(20),
    deptId int,
    salary double
);
```

**方式2-语法:**

```sql
create table 表名(
	...
	[constranit <约束名>] primary key [字段名]
);
```

**方式2-实现:**

```sql
create table emp2(
	eid int,
	name varchar(20),
	deptId int,
	salary double,
    constranit pk1 primary key(eid)
);
```

尝试给一点数据查看主键的作用

```sql
insert into emp2(eid,name,deptId,salary) values(1,'李某人',10,5000);
-- 证明唯一性
insert into emp2(eid,name,deptId,salary) values(1,'李某人',10,5000);
-- 证明非空性
insert into emp2(eid,name,deptId,salary) values(null,'李某人',10,5000);
```

#### 操作-添加多列主键(联合主键)

所谓的联合主键，就是这个主键是由一张表中多个字段组成

注意:

1.当主键是由多个字段组成时，不能直接在字段名后面声明主键约束

2.一张表只能有一个主键，联合主键也是一个主键

语法:

```sql
create table 表名(
	...
	primary key(字段1，字段2，字段...)
);	
```

实现:

```sql
create table emp3(
	name varchar(20),
    deptId int,
    salary double,
    primary key(name,deptId)
)
```

注意:

联合主键不能同时相同

联合主键的各列，每一列都不能为空

#### 通过修改表结构添加主键

语法:

```sql
alter table<表名> add primary key(字段列表);
```

实现:

```sql
-- 添加单列主键
alter table emp4 add primary key(eid);
```

### 删除主键

一个表中不需要主键约束时，就需要从表中将其删除，删除主键约束的方法要比创建主键约束容易得多

#### 格式:

```sql
alter table<数据表名> drop primary key;
```

#### 实现:

```sql
-- 删除单列主键
alter table emp1 drop primary key;

-- 删除联合主键
alter table emp5 drop primary key;
```

## Mysql约束-自增长约束

### 概念

在MySQL中，当主键定义为自增长后，这个主键的值就不再需要用户输入数据了，而由数据库系统根据定义自动赋值。
每增加一条记录，主键会自动以相同的步长进行增长。

通过给字段添加**auto_increment**属性来实现主键自增长

### 语法:

```sql
字段名 数据类型 auto_increment
```

### 操作:

```sql
create table t_user1(
	id int primary key auto_increment,
	name varchar(20)
);
```

### 特点:

默认情况下，auto_increment的初始值为1，每新增一条记录，字段值自动加1

一个表中只能有一个字段使用auto_increment约束，且该字段必须有唯一索引，以避免序号重复(即为主键或主键的一部分)

auto_increment约束的字段必须具备NOT NULL属性。
auto_increment约束的字段只能是整数类型(TINYINT、SMALLINT、INT、BIGINT等)。
auto_increment约束字段的最大值受该字段的数据类型约束，如果达到上限，auto increment就会失效。

### 注意:

`delete数据之后自动增长从断点开始`

## Mysql约束-非空约束

### 概念

MySQL非空约束(not null)指字段的值不能为空。对于使用了非空约束的字段，如果用户在添加数据时没有指定值，数据库系统就会报错。  

### 语法：

```sql
方式1：<字段名><数据类型>not null;
方式2：alter table 表名 modify 字段 类型 not null;
```

### 添加非空约束-方式1

```sql
create table t_user6(
	id int,
	name varchar(20) not null,
	address varchar(20) not null
);
```

### 添加非空约束-方式2

```sql
create table t_user7(
	id int,
	name varchar(20),
	address varchar(20)
);
alter table t_user7 modify name varchar(20) not null;
```

### 删除非空约束

```sql
alter table t_user7 modify name varchar(20);
```

## Mysql约束-唯一约束

唯一约束(Unique)是指所有记录中字段的值不能重复出现。例如，为id字段加上唯一性约束后，每条记录的d值都是唯一的，不能出现重复的情况。

### 语法:

```sql
方式1:<字段名><数据类型> unique
方式2:alter table 表名 add constraint 约束名 unique(列);
```

### 添加唯一约束的方式1

```sql
-- 创建表时指定
create table t_user8(
	id int,
    name varchar(20),
    phone_number varchar(20) unique -- 指定唯一约束
);
```

### 添加唯一约束的方式2

```sql
-- 创建表之后指定
create table t_user9(
	id int,
    name varchar(20),
    phone_number varchar(20) unique -- 指定唯一约束
);
alter table t_user9 add constraint unique_pn unique(phone_numver);
```

### 删除唯一约束

```
alter table <表名> drop index <唯一约束名>
```



## Mysql约束-默认约束

### 概念

MySQL默认值约束(default)用来指定某列的默认值。

### 语法

```sql
方式1：<字段名1><数据类型> default <默认值>;
方式2:alter table 表名 modify 列名 类型 default 默认值;
```

### 添加默认约束-方式1

```sql
create table t_user10(
	id int,
	name varchar(20),
	address varchar(20) default '北京' -- 指定默认约束
);
```

```sql
insert into t_user10(id,name) values(1,'张三')
insert into t_user10(id,name,address) values(1,'张三','上海')
```

### 删除默认约束

```sql
alter table <表名> modify <字段名> <类型> default null;
```



## Mysql约束-外键约束

概念：外键用来让两张表的数据之间建立连接，从而保证数据的一致性和完整性

![image-20230127233252363](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202303272232772.png)

部门表为父表(主表)

员工表为子表(从表)

注意：目前上述的两张表，在数据库层面，并未建立外键关联，所以是无法保证数据的一致性和完整性的

### 添加外键

1.语法

```sql
create table 表名(
	字段名 数据类型,
	...
	[constraint] [外键名称] foreign key(外键字段名) references 主表(主表列名)
);
```

```sql
alter table 表名 add constraint 外键名称 foreign key(外键字段名) references 主表(主表列名)
```

### 删除外键

1.语法

```sql
alter table 表名 drop foreign key 外键名称；
```

### 总结：

1.非空约束：NOT NULL
2.唯一约束：UNIQUE
3.主键约束：PRIMARY KEY(自增：AUTO_INCREMENT)
4.默认约束：DEFAULT
5.外键约束：FOREIGN KEY

# 事务

## 事务简介

**事务**是一组操作的集合，它是一个不可分割的工作单位，事务会把所有的操作作为一个整体一起向系统提交或撤销操作请求，即这些操作**要么同时成功，要么同时失败**。

简单理解：

事务其实就是一个完整的业务逻辑

![image-20230208170758902](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202304281648480.png)

`只有DML语句才会有事务，其他语句和事务无关！！！`

因为只有DML语句是对数据库表中的数据进行增、删、改的

只要你的操作涉及了数据的改动，那么一定要考虑安全问题

数据安全第一位！！！

**数据模拟**

```sql
create table account(
    id int auto_increment primary key comment '主键ID',
    name varchar(20) comment '姓名',
    money int comment '余额'
)comment '余额表';
insert into account(id,name,money) values (null,'张三',2000),(null,'李四',2000);

# 恢复数据
update account set money = 2000 where name = '张三' or name = '李四';
```

```sql
--  查询张三的余额
select money from account where name = '张三';
-- 张三账户-1000
update account set money = money - 1000 where name = '张三';
-- 李四账户+1000
update account set money = money + 1000 where name = '李四';
```

默认Mysql的事务是自动提交的，也就是说，当执行一条DML语句，Mysql会立即隐式的提交事务

## 事务操作

**第一种操作：**

查看/设置事务提交方式(手动提交)

```
SELECT @@autocommit;
SET @@autocommit = 0;
```

提交事务

```
COMMIT;
```

回滚事务

```
ROLLBACK;
```

**第二种操作：**

开启事务

```
START TRANSACTION或者BEGIN
```

提交事务

```
COMMIT;
```

回滚事务

```
ROLLBACK;
```

## 事务四大特性（高频面试题）ACID

原子性（Atomicity）：事务是不可分割的最小操作单元，要么全部成功，要么全部失败。

一致性(Consistency）: 事务完成时，必须使所有的数据都保持一致状态。

隔离性(Isolation)：数据库系统提供的隔离机制，保证事务在不受外部并发操作影响的独立环境下运行。

持久性(Durability): 事务一旦提交或回滚，它对数据库中的数据的改变就是永久的。

## 并发事务问题(面试题)(重点)

![image-20230130140943360](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202305050811534.png)

## 事务的隔离级别(重点)

![image-20230130141850895](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202305050812771.png)

Read uncommitted:读未提交

Read committed：读已提交

Repeatable Read(默认):可重复读

Serializable：串行化

```
--查看事务隔离级别
SELECT @@TRANSACTION_ISOLATION;

--设置事务隔离级别
SET [SESSION|GLOBAL] TRANSACTION ISOLATION LEVEL {填写事务隔离级别}
```

脏读问题：

![image-20230506084718547](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202305060847488.png)

不可重复读问题:

![image-20230506090537110](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202305060905192.png)



幻读问题:

![image-20230506092903175](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202305060929707.png)

















