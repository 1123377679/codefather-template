# Redis

![image-20241124223948327](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241124223948327.png)

redis数据库跟传统的数据库有很大的区别，redis没有表，也没有约束，所以我们称之为NoSQL数据库(非关系型数据库)

## 初始Redis

### 认识NoSQL

NoSQL我们比较陌生，但是SQL我们是比较熟悉的，叫做关系型数据库

那NoSQL叫做 非关系型数据库

SQL中的S代表着结构化(Structured)

![image-20241124225616387](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241124225616387.png)

NoSQL中就是非结构化,但是不完全没有结构，比如他的存储结构是属于key : value的

![image-20241124225653030](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241124225653030.png)

最重要的其实是，关系型数据库表与表之间是有关联的

![image-20241124225931642](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241124225931642.png)

而且SQL数据库是有专用的SQL语句去操作数据库

![image-20241124230224912](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241124230224912.png)

但是Nosql 是这样的：

![image-20241124230239586](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241124230239586.png)

还有就是SQL可以执行事务，但NoSQL不行

总结:
![image-20241124230556655](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241124230556655.png)

### 认识Redis

为什么会出现Redis呢，实际就是因为Mysql的性能不行

特征:

- 键值型(Key-value)，value支持多种不同数据结构，功能丰富
- 单线程，每个命令具备原子性
- 低延迟，速度快(基于内存、IO多路复用，良好的编码)
- 支持数据持久化
- 支持主从集群，分片集群
- 支持多语言客户端

### 安装Redis

大多数企业都是基于Linux服务器来部署项目，而且Redis官方也没有提供widows版本的安装包，因此，课程中我们会基于Linux系统来安装Redis

我们使用的Linux版本是Centos7

Redis的官方网站地址:https://redis.io/

#### 安装Redis依赖

Redis是基于C语言编写的，因此首先需要安装Redis所需要的gcc依赖

```sh
yum install -y gcc tcl
```

#### 上传redis的安装包并解压

将redis安装包上传到虚拟机的任意目录:

例如:我放到了/usr/local/src目录：

然后解压当前压缩包

```sh
tar -zxvf 
```

然后进入解压的文件夹

```sh
make install
```

默认的安装路径是在:/usr/local/bin目录下

#### 启动

```sh
redis-server
```

这种启动属于前台启动，会阻塞整个会话窗口，窗口关闭或者按下ctrl+c则redis停止，但是不推荐使用



如果要让redis以后台的方式启动，则必须修改redis配置文件，就在我们之前解压的redis安装包下/usr/local/src/redis-6.2.6,名字叫redis.conf:



我们需要将这个配置文件备份

```sh
cp redis.conf redis.conf.bck
```



然后修改redis.conf文件中的一些配置：

![image-20241124232547226](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241124232547226.png)

redis一些其他常见的配置(可配可不配)

```properties
bind 0.0.0.0
daemonize yes
requirepass 123456

port 6379
dir .
databases 1
maxmemory 512mb
logfile "redis.log"
```

![image-20241124232829526](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241124232829526.png)



然后重启redis

```java
# 进入redis安装目录
cd /usr/local/src/redis-6.2.6
# 启动 已经是后台运行了
redis-server redis.conf
```

怎么检查是否是后台运行

```sh
ps -ef | grep redis
```

删除进程

```java
kill -9 14821
```

停止服务

```sh
redis-cli -u 123456 shutdown	
```



#### 开机自启动

我们也可以通过配置来实现开机自启

首先，新建一个系统服务文件

```sh
vi /etc/systemd/system/redis.service
```

内容如下

```properties
[Unit]
Description=redis-server
After=network.target

[Service]
Type=forking
ExecStart=/usr/local/bin/redis-server /usr/local/src/redis-6.2.6/redis.conf
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```



重新加载系统服务:

```sh
systemctl daemon-reload
systemctl start redis
systemctl status redis
systemctl stop redis
systemctl restart redis

systemctl enable redis

# 最后启动redis
systemctl start redis
# 检查
ps -ef | grep redis
```

Redis安装完成后就子嗲了命令行客户端，redis-cli 使用方式如下:

```sh
redis-cli [options][commonds]
```

其中常见的options有:

- -h 127.0.0.1:指定要连接的redis节点的ip地址，默认为127.0.0.1
- -p 6379 指定要连接的redis节点的端口，默认是6379
- -a 123456 指定redis的访问密码

其中的commonds就是redis的操作命令，例如：

- ping：与redis服务端看是否能正常ping通

不能定commond时，会进入redis-cli的交互控制台

### redis可视化工具

https://github.com/lework/RedisDesktopManager-Windows/releases

## Redis常见命令

### Redis的数据结构命令

https://www.redis.net.cn/order/

Redis是一个key-value的数据库，key一般是String类型，不过value的类型多种多样:

![image-20241128153913270](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241128153913270.png)

### Redis的通用命令

通用指令是部分数据类型的。都可以使用的指令，常见的有:

- KEYS：查看符合模板的所有key
- DEL：删除一个指定的key
- EXISTS：判断key是否存在
- EXPIRE：给一个key设置有效期，有效期到期时该key会被自动删除
- TTL：查看一个KEY的剩余有效期

通过help [command] 可以查看一个命令的具体用法，例如：

![image-20241201221521826](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241201221521826.png)

* KEYS

```sh
127.0.0.1:6379> keys *
1) "name"
2) "age"
127.0.0.1:6379>

# 查询以a开头的key
127.0.0.1:6379> keys a*
1) "age"
127.0.0.1:6379>
```

**贴心小提示：在生产环境下，不推荐使用keys 命令，因为这个命令在key过多的情况下，效率不高**

* DEL

```sh
127.0.0.1:6379> help del

  DEL key [key ...]
  summary: Delete a key
  since: 1.0.0
  group: generic

127.0.0.1:6379> del name #删除单个
(integer) 1  #成功删除1个

127.0.0.1:6379> keys *
1) "age"

127.0.0.1:6379> MSET k1 v1 k2 v2 k3 v3 #批量添加数据
OK

127.0.0.1:6379> keys *
1) "k3"
2) "k2"
3) "k1"
4) "age"

127.0.0.1:6379> del k1 k2 k3 k4
(integer) 3   #此处返回的是成功删除的key，由于redis中只有k1,k2,k3 所以只成功删除3个，最终返回
127.0.0.1:6379>

127.0.0.1:6379> keys * #再查询全部的key
1) "age"	#只剩下一个了
127.0.0.1:6379>
```

**贴心小提示：同学们在拷贝代码的时候，只需要拷贝对应的命令哦~**

* EXISTS

```sh
127.0.0.1:6379> help EXISTS

  EXISTS key [key ...]
  summary: Determine if a key exists
  since: 1.0.0
  group: generic

127.0.0.1:6379> exists age
(integer) 1

127.0.0.1:6379> exists name
(integer) 0
```

* EXPIRE

**贴心小提示**：内存非常宝贵，对于一些数据，我们应当给他一些过期时间，当过期时间到了之后，他就会自动被删除~

```sh
127.0.0.1:6379> expire age 10
(integer) 1

127.0.0.1:6379> ttl age
(integer) 8

127.0.0.1:6379> ttl age
(integer) 6

127.0.0.1:6379> ttl age
(integer) -2

127.0.0.1:6379> ttl age
(integer) -2  #当这个key过期了，那么此时查询出来就是-2 

127.0.0.1:6379> keys *
(empty list or set)

127.0.0.1:6379> set age 10 #如果没有设置过期时间
OK

127.0.0.1:6379> ttl age
(integer) -1  # ttl的返回值就是-1
```

### Redis命令-String命令

String类型，也就是字符串类型，是Redis中最简单的存储类型。

其value是字符串，不过根据字符串的格式不同，又可以分为3类：

* string：普通字符串
* int：整数类型，可以做自增.自减操作
* float：浮点类型，可以做自增.自减操作

![1652890121291](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/1652890121291.png)

String的常见命令有：

* SET：添加或者修改已经存在的一个String类型的键值对
* GET：根据key获取String类型的value
* MSET：批量添加多个String类型的键值对
* MGET：根据多个key获取多个String类型的value
* INCR：让一个整型的key自增1
* INCRBY:让一个整型的key自增并指定步长，例如：incrby num 2 让num值自增2
* INCRBYFLOAT：让一个浮点类型的数字自增并指定步长
* SETNX：添加一个String类型的键值对，前提是这个key不存在，否则不执行
* SETEX：添加一个String类型的键值对，并且指定有效期

**贴心小提示**：以上命令除了INCRBYFLOAT 都是常用命令

* SET 和GET: 如果key不存在则是新增，如果存在则是修改

```java
127.0.0.1:6379> set name Rose  //原来不存在
OK

127.0.0.1:6379> get name 
"Rose"

127.0.0.1:6379> set name Jack //原来存在，就是修改
OK

127.0.0.1:6379> get name
"Jack"
```

* MSET和MGET

```java
127.0.0.1:6379> MSET k1 v1 k2 v2 k3 v3
OK

127.0.0.1:6379> MGET name age k1 k2 k3
1) "Jack" //之前存在的name
2) "10"   //之前存在的age
3) "v1"
4) "v2"
5) "v3"
```

* INCR和INCRBY和DECY

```java
127.0.0.1:6379> get age 
"10"

127.0.0.1:6379> incr age //增加1
(integer) 11
    
127.0.0.1:6379> get age //获得age
"11"

127.0.0.1:6379> incrby age 2 //一次增加2
(integer) 13 //返回目前的age的值
    
127.0.0.1:6379> incrby age 2
(integer) 15
    
127.0.0.1:6379> incrby age -1 //也可以增加负数，相当于减
(integer) 14
    
127.0.0.1:6379> incrby age -2 //一次减少2个
(integer) 12
    
127.0.0.1:6379> DECR age //相当于 incr 负数，减少正常用法
(integer) 11
    
127.0.0.1:6379> get age 
"11"

```

* SETNX

```java
127.0.0.1:6379> help setnx

  SETNX key value
  summary: Set the value of a key, only if the key does not exist
  since: 1.0.0
  group: string

127.0.0.1:6379> set name Jack  //设置名称
OK
127.0.0.1:6379> setnx name lisi //如果key不存在，则添加成功
(integer) 0
127.0.0.1:6379> get name //由于name已经存在，所以lisi的操作失败
"Jack"
127.0.0.1:6379> setnx name2 lisi //name2 不存在，所以操作成功
(integer) 1
127.0.0.1:6379> get name2 
"lisi"
```

* SETEX

```sh
127.0.0.1:6379> setex name 10 jack
OK

127.0.0.1:6379> ttl name
(integer) 8

127.0.0.1:6379> ttl name
(integer) 7

127.0.0.1:6379> ttl name
(integer) 5
```

### Redis命令-Key的层级结构

Redis没有类似MySQL中的Table的概念，我们该如何区分不同类型的key呢？

例如，需要存储用户.商品信息到redis，有一个用户id是1，有一个商品id恰好也是1，此时如果使用id作为key，那就会冲突了，该怎么办？

我们可以通过给key添加前缀加以区分，不过这个前缀不是随便加的，有一定的规范：

Redis的key允许有多个单词形成层级结构，多个单词之间用':'隔开，格式如下：

![1652941631682](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/1652941631682.png)

这个格式并非固定，也可以根据自己的需求来删除或添加词条。

例如我们的项目名称叫 heima，有user和product两种不同类型的数据，我们可以这样定义key：

- user相关的key：**heima:user:1**

- product相关的key：**heima:product:1**

如果Value是一个Java对象，例如一个User对象，则可以将对象序列化为JSON字符串后存储：

| **KEY**         | **VALUE**                                 |
| --------------- | ----------------------------------------- |
| heima:user:1    | {"id":1, "name": "Jack", "age": 21}       |
| heima:product:1 | {"id":1, "name": "小米11", "price": 4999} |

一旦我们向redis采用这样的方式存储，那么在可视化界面中，redis会以层级结构来进行存储，形成类似于这样的结构，更加方便Redis获取数据

![1652941883537](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/1652941883537.png)

### Redis命令-Hash命令

Hash类型，也叫散列，其value是一个无序字典，类似于Java中的HashMap结构。

String结构是将对象序列化为JSON字符串后存储，当需要修改对象某个字段时很不方便：

![1652941995945](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/1652941995945.png)

Hash结构可以将对象中的每个字段独立存储，可以针对单个字段做CRUD：

![1652942027719](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/1652942027719.png)

**Hash类型的常见命令**

- HSET key field value：添加或者修改hash类型key的field的值

- HGET key field：获取一个hash类型key的field的值

- HMSET：批量添加多个hash类型key的field的值

- HMGET：批量获取多个hash类型key的field的值

- HGETALL：获取一个hash类型的key中的所有的field和value
- HKEYS：获取一个hash类型的key中的所有的field
- HINCRBY:让一个hash类型key的字段值自增并指定步长
- HSETNX：添加一个hash类型的key的field值，前提是这个field不存在，否则不执行

**贴心小提示**：哈希结构也是我们以后实际开发中常用的命令哟

* HSET和HGET

```java
127.0.0.1:6379> HSET heima:user:3 name Lucy//大key是 heima:user:3 小key是name，小value是Lucy
(integer) 1
127.0.0.1:6379> HSET heima:user:3 age 21// 如果操作不存在的数据，则是新增
(integer) 1
127.0.0.1:6379> HSET heima:user:3 age 17 //如果操作存在的数据，则是修改
(integer) 0
127.0.0.1:6379> HGET heima:user:3 name 
"Lucy"
127.0.0.1:6379> HGET heima:user:3 age
"17"
```

* HMSET和HMGET

```java
127.0.0.1:6379> HMSET heima:user:4 name HanMeiMei
OK
127.0.0.1:6379> HMSET heima:user:4 name LiLei age 20 sex man
OK
127.0.0.1:6379> HMGET heima:user:4 name age sex
1) "LiLei"
2) "20"
3) "man"
```

* HGETALL

```java
127.0.0.1:6379> HGETALL heima:user:4
1) "name"
2) "LiLei"
3) "age"
4) "20"
5) "sex"
6) "man"
```

* HKEYS和HVALS

```java
127.0.0.1:6379> HKEYS heima:user:4
1) "name"
2) "age"
3) "sex"
127.0.0.1:6379> HVALS heima:user:4
1) "LiLei"
2) "20"
3) "man"
```

* HINCRBY

```java
127.0.0.1:6379> HINCRBY  heima:user:4 age 2
(integer) 22
127.0.0.1:6379> HVALS heima:user:4
1) "LiLei"
2) "22"
3) "man"
127.0.0.1:6379> HINCRBY  heima:user:4 age -2
(integer) 20
```

* HSETNX

```java
127.0.0.1:6379> HSETNX heima:user4 sex woman
(integer) 1
127.0.0.1:6379> HGETALL heima:user:3
1) "name"
2) "Lucy"
3) "age"
4) "17"
127.0.0.1:6379> HSETNX heima:user:3 sex woman
(integer) 1
127.0.0.1:6379> HGETALL heima:user:3
1) "name"
2) "Lucy"
3) "age"
4) "17"
5) "sex"
6) "woman"
```

### Redis命令-List命令

Redis中的List类型与Java中的LinkedList类似，可以看做是一个双向链表结构。既可以支持正向检索和也可以支持反向检索。

特征也与LinkedList类似：

* 有序
* 元素可以重复
* 插入和删除快
* 查询速度一般

常用来存储一个有序数据，例如：朋友圈点赞列表，评论列表等。

**List的常见命令有：**

- LPUSH key element ... ：向列表左侧插入一个或多个元素
- LPOP key：移除并返回列表左侧的第一个元素，没有则返回nil
- RPUSH key element ... ：向列表右侧插入一个或多个元素
- RPOP key：移除并返回列表右侧的第一个元素
- LRANGE key star end：返回一段角标范围内的所有元素
- BLPOP和BRPOP：与LPOP和RPOP类似，只不过在没有元素时等待指定时间，而不是直接返回nil

![1652943604992](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/1652943604992.png)

* LPUSH和RPUSH

```java
127.0.0.1:6379> LPUSH users 1 2 3
(integer) 3
127.0.0.1:6379> RPUSH users 4 5 6
(integer) 6
```

* LPOP和RPOP

```java
127.0.0.1:6379> LPOP users
"3"
127.0.0.1:6379> RPOP users
"6"
```

* LRANGE

```java
127.0.0.1:6379> LRANGE users 1 2
1) "1"
2) "4"
```

### Redis命令-Set命令

Redis的Set结构与Java中的HashSet类似，可以看做是一个value为null的HashMap。因为也是一个hash表，因此具备与HashSet类似的特征：

* 无序
* 元素不可重复
* 查找快
* 支持交集.并集.差集等功能

**Set类型的常见命令**

* SADD key member ... ：向set中添加一个或多个元素
* SREM key member ... : 移除set中的指定元素
* SCARD key： 返回set中元素的个数
* SISMEMBER key member：判断一个元素是否存在于set中
* SMEMBERS：获取set中的所有元素
* SINTER key1 key2 ... ：求key1与key2的交集
* SDIFF key1 key2 ... ：求key1与key2的差集
* SUNION key1 key2 ..：求key1和key2的并集

**具体命令**

```java
127.0.0.1:6379> sadd s1 a b c
(integer) 3
127.0.0.1:6379> smembers s1
1) "c"
2) "b"
3) "a"
127.0.0.1:6379> srem s1 a
(integer) 1
    
127.0.0.1:6379> SISMEMBER s1 a
(integer) 0
    
127.0.0.1:6379> SISMEMBER s1 b
(integer) 1
    
127.0.0.1:6379> SCARD s1
(integer) 2
```

**案例**

* 将下列数据用Redis的Set集合来存储：
* 张三的好友有：李四.王五.赵六
* 李四的好友有：王五.麻子.二狗
* 利用Set的命令实现下列功能：
* 计算张三的好友有几人
* 计算张三和李四有哪些共同好友
* 查询哪些人是张三的好友却不是李四的好友
* 查询张三和李四的好友总共有哪些人
* 判断李四是否是张三的好友
* 判断张三是否是李四的好友
* 将李四从张三的好友列表中移除

```java
127.0.0.1:6379> SADD zs lisi wangwu zhaoliu
(integer) 3
    
127.0.0.1:6379> SADD ls wangwu mazi ergou
(integer) 3
    
127.0.0.1:6379> SCARD zs
(integer) 3
    
127.0.0.1:6379> SINTER zs ls
1) "wangwu"
    
127.0.0.1:6379> SDIFF zs ls
1) "zhaoliu"
2) "lisi"
    
127.0.0.1:6379> SUNION zs ls
1) "wangwu"
2) "zhaoliu"
3) "lisi"
4) "mazi"
5) "ergou"
    
127.0.0.1:6379> SISMEMBER zs lisi
(integer) 1
    
127.0.0.1:6379> SISMEMBER ls zhangsan
(integer) 0
    
127.0.0.1:6379> SREM zs lisi
(integer) 1
    
127.0.0.1:6379> SMEMBERS zs
1) "zhaoliu"
2) "wangwu"
```

### Redis命令-SortedSet类型

Redis的SortedSet是一个可排序的set集合，与Java中的TreeSet有些类似，但底层数据结构却差别很大。SortedSet中的每一个元素都带有一个score属性，可以基于score属性对元素排序，底层的实现是一个跳表（SkipList）加 hash表。

SortedSet具备下列特性：

- 可排序
- 元素不重复
- 查询速度快

因为SortedSet的可排序特性，经常被用来实现排行榜这样的功能。



SortedSet的常见命令有：

- ZADD key score member：添加一个或多个元素到sorted set ，如果已经存在则更新其score值
- ZREM key member：删除sorted set中的一个指定元素
- ZSCORE key member : 获取sorted set中的指定元素的score值
- ZRANK key member：获取sorted set 中的指定元素的排名
- ZCARD key：获取sorted set中的元素个数
- ZCOUNT key min max：统计score值在给定范围内的所有元素的个数
- ZINCRBY key increment member：让sorted set中的指定元素自增，步长为指定的increment值
- ZRANGE key min max：按照score排序后，获取指定排名范围内的元素
- ZRANGEBYSCORE key min max：按照score排序后，获取指定score范围内的元素
- ZDIFF.ZINTER.ZUNION：求差集.交集.并集

注意：所有的排名默认都是升序，如果要降序则在命令的Z后面添加REV即可，例如：

- **升序**获取sorted set 中的指定元素的排名：ZRANK key member
- **降序**获取sorted set 中的指定元素的排名：ZREVRANK key memeber

## Redis的Java客户端-Jedis

在Redis官网中提供了各种语言的客户端，地址：https://redis.io/docs/clients/

其中Java客户端也包含很多：

![image-20220609102817435](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20220609102817435.png)

标记为❤的就是推荐使用的java客户端，包括：

- Jedis和Lettuce：这两个主要是提供了Redis命令对应的API，方便我们操作Redis，而SpringDataRedis又对这两种做了抽象和封装，因此我们后期会直接以SpringDataRedis来学习。
- Redisson：是在Redis基础上实现了分布式的可伸缩的java数据结构，例如Map.Queue等，而且支持跨进程的同步机制：Lock.Semaphore等待，比较适合用来实现特殊的功能需求。

###  Jedis快速入门

**入门案例详细步骤**

案例分析：

0）创建工程：

1）引入依赖：

```xml
<!--jedis-->
<dependency>
    <groupId>redis.clients</groupId>
    <artifactId>jedis</artifactId>
    <version>3.7.0</version>
</dependency>
<!--单元测试-->
<dependency>
    <groupId>org.junit.jupiter</groupId>
    <artifactId>junit-jupiter</artifactId>
    <version>5.7.0</version>
    <scope>test</scope>
</dependency>
```



2）建立连接

新建一个单元测试类，内容如下：

```java
private Jedis jedis;

@BeforeEach
void setUp() {
    // 1.建立连接
    // jedis = new Jedis("192.168.150.101", 6379);
    jedis = JedisConnectionFactory.getJedis();
    // 2.设置密码
    jedis.auth("123321");
    // 3.选择库
    jedis.select(0);
}
```



3）测试：

```java
@Test
void testString() {
    // 存入数据
    String result = jedis.set("name", "虎哥");
    System.out.println("result = " + result);
    // 获取数据
    String name = jedis.get("name");
    System.out.println("name = " + name);
}

@Test
void testHash() {
    // 插入hash数据
    jedis.hset("user:1", "name", "Jack");
    jedis.hset("user:1", "age", "21");

    // 获取
    Map<String, String> map = jedis.hgetAll("user:1");
    System.out.println(map);
}
```



4）释放资源

```java
@AfterEach
void tearDown() {
    if (jedis != null) {
        jedis.close();
    }
}
```

### Jedis连接池

Jedis本身是线程不安全的，并且频繁的创建和销毁连接会有性能损耗，因此我们推荐大家使用Jedis连接池代替Jedis的直连方式

有关池化思想，并不仅仅是这里会使用，很多地方都有，比如说我们的数据库连接池，比如我们tomcat中的线程池，这些都是池化思想的体现。

### 创建Jedis的连接池

- 

```java
public class JedisConnectionFacotry {

     private static final JedisPool jedisPool;

     static {
         //配置连接池
         JedisPoolConfig poolConfig = new JedisPoolConfig();
         poolConfig.setMaxTotal(8);
         poolConfig.setMaxIdle(8);
         poolConfig.setMinIdle(0);
         poolConfig.setMaxWaitMillis(1000);
         //创建连接池对象
         jedisPool = new JedisPool(poolConfig,
                 "192.168.150.101",6379,1000,"123321");
     }

     public static Jedis getJedis(){
          return jedisPool.getResource();
     }
}
```

**代码说明：**

- 1） JedisConnectionFacotry：工厂设计模式是实际开发中非常常用的一种设计模式，我们可以使用工厂，去降低代的耦合，比如Spring中的Bean的创建，就用到了工厂设计模式

- 2）静态代码块：随着类的加载而加载，确保只能执行一次，我们在加载当前工厂类的时候，就可以执行static的操作完成对 连接池的初始化

- 3）最后提供返回连接池中连接的方法.



### 改造原始代码

**代码说明:**

1.在我们完成了使用工厂设计模式来完成代码的编写之后，我们在获得连接时，就可以通过工厂来获得。

，而不用直接去new对象，降低耦合，并且使用的还是连接池对象。

2.当我们使用了连接池后，当我们关闭连接其实并不是关闭，而是将Jedis还回连接池的。

```java
    @BeforeEach
    void setUp(){
        //建立连接
        /*jedis = new Jedis("127.0.0.1",6379);*/
        jedis = JedisConnectionFacotry.getJedis();
         //选择库
        jedis.select(0);
    }

   @AfterEach
    void tearDown() {
        if (jedis != null) {
            jedis.close();
        }
    }
```

## SpringDataRedis客户端

SpringData是Spring中数据操作的模块，包含对各种数据库的集成，其中对Redis的集成模块就叫做SpringDataRedis，官网地址：https://spring.io/projects/spring-data-redis

- 提供了对不同Redis客户端的整合（Lettuce和Jedis）
- 提供了RedisTemplate统一API来操作Redis
- 支持Redis的发布订阅模型
- 支持Redis哨兵和Redis集群
- 支持基于Lettuce的响应式编程
- 支持基于JDK、JSON、字符串、Spring对象的数据序列化及反序列化
- 支持基于Redis的JDKCollection实现

SpringDataRedis中提供了RedisTemplate工具类，其中封装了各种对Redis的操作。并且将不同数据类型的操作API封装到了不同的类型中：

![](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/UFlNIV0.png)

### 快速入门

SpringBoot已经提供了对SpringDataRedis的支持，使用非常简单。

首先，新建一个maven项目，然后按照下面步骤执行：

#### 引入依赖

```java
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.5.7</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.heima</groupId>
    <artifactId>redis-demo</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>redis-demo</name>
    <description>Demo project for Spring Boot</description>
    <properties>
        <java.version>1.8</java.version>
    </properties>
    <dependencies>
        <!--redis依赖-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
        </dependency>
        <!--common-pool-->
        <dependency>
            <groupId>org.apache.commons</groupId>
            <artifactId>commons-pool2</artifactId>
        </dependency>
        <!--Jackson依赖-->
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <configuration>
                    <excludes>
                        <exclude>
                            <groupId>org.projectlombok</groupId>
                            <artifactId>lombok</artifactId>
                        </exclude>
                    </excludes>
                </configuration>
            </plugin>
        </plugins>
    </build>

</project>
```

### 配置Redis

```java
spring:
  data:
    redis:
      host: 192.168.88.128
      port: 6379
      password: 123456
      lettuce:
        pool:
          max-active: 8
          max-idle: 8
          min-idle: 0
          max-wait: 1000ms
      database: 0
```

### 注入RedisTemplate

因为有了SpringBoot的自动装配，我们可以拿来就用：

```java
@SpringBootTest
class RedisStringTests {

    @Autowired
    private RedisTemplate redisTemplate;
}
```

### 编写测试

```java
@SpringBootTest
class RedisStringTests {

    @Autowired
    private RedisTemplate redisTemplate;

    @Test
    void testString() {
        // 写入一条String数据
        redisTemplate.opsForValue().set("name", "虎哥");
        // 获取string数据
        Object name = stringRedisTemplate.opsForValue().get("name");
        System.out.println("name = " + name);
    }
}
```

### 自定义序列化

RedisTemplate可以接收任意Object作为值写入Redis：

![](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/OEMcbuu.png)

只不过写入前会把Object序列化为字节形式，默认是采用JDK序列化，得到的结果是这样的：

![](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/5FjtWk5.png)

缺点：

- 可读性差
- 内存占用较大

我们可以自定义RedisTemplate的序列化方式，代码如下：

```java
@Configuration
public class RedisConfig {

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory connectionFactory){
        // 创建RedisTemplate对象
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        // 设置连接工厂
        template.setConnectionFactory(connectionFactory);
        // 创建JSON序列化工具
        GenericJackson2JsonRedisSerializer jsonRedisSerializer = 
            							new GenericJackson2JsonRedisSerializer();
        // 设置Key的序列化
        template.setKeySerializer(RedisSerializer.string());
        template.setHashKeySerializer(RedisSerializer.string());
        // 设置Value的序列化
        template.setValueSerializer(jsonRedisSerializer);
        template.setHashValueSerializer(jsonRedisSerializer);
        // 返回
        return template;
    }
}
```

这里采用了JSON序列化来代替默认的JDK序列化方式。最终结果如图：

![](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/XOAq3cN.png)

整体可读性有了很大提升，并且能将Java对象自动的序列化为JSON字符串，并且查询时能自动把JSON反序列化为Java对象。不过，其中记录了序列化时对应的class名称，目的是为了查询时实现自动反序列化。这会带来额外的内存开销。

## StringRedisTemplate

为了节省内存空间，我们可以不使用JSON序列化器来处理value，而是统一使用String序列化器，要求只能存储String类型的key和value。当需要存储Java对象时，手动完成对象的序列化和反序列化。

![](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/Ip9TKSY.png)

因为存入和读取时的序列化及反序列化都是我们自己实现的，SpringDataRedis就不会将class信

息写入Redis了。

这种用法比较普遍，因此SpringDataRedis就提供了RedisTemplate的子类：

StringRedisTemplate，它的key和value的序列化方式默认就是String方式。

![](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/zXH6Qn6.png)

省去了我们自定义RedisTemplate的序列化方式的步骤，而是直接使用：

```java
@Autowired
private StringRedisTemplate stringRedisTemplate;
// JSON序列化工具
private static final ObjectMapper mapper = new ObjectMapper();

@Test
void testSaveUser() throws JsonProcessingException {
    // 创建对象
    User user = new User("虎哥", 21);
    // 手动序列化
    String json = mapper.writeValueAsString(user);
    // 写入数据
    stringRedisTemplate.opsForValue().set("user:200", json);

    // 获取数据
    String jsonUser = stringRedisTemplate.opsForValue().get("user:200");
    // 手动反序列化
    User user1 = mapper.readValue(jsonUser, User.class);
    System.out.println("user1 = " + user1);
}

```

总结:

RedisTemplate的两种序列化实践方案:
方案一:

1.自定义RedisTemplate

2.修改RedisTemplate的序列化器为GenericJackson2JsonRedisSerializer

方案二: 

1.使用StringRedisTemplate

2.写入redis时，手动把对象序列化为JSON

3.读取Redis时，手动把读取到的JSON反序列化为对象

## 应用案例

### 基于Session实现短信登录

![image-20241210171543612](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241210171543612.png)

![image-20241210171550682](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241210171550682.png)

![image-20241210171724537](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241210171724537.png)

先修改登录页面的样式

```html
<!-- 添加手机号输入框和发送验证码按钮 -->
      <div style="margin: 10px 0;">
        <label for="phone">手机号:</label>
        <input type="tel" id="phone" name="phone" pattern="[0-9]{11}" required>
        <button type="button" id="sendCode" class="btn-code">发送验证码</button>
      </div>
      <!-- 添加验证码输入框 -->
      <div style="margin: 10px 0;">
        <label for="verifyCode">验证码:</label>
        <input type="text" id="verifyCode" name="verifyCode" required>
      </div>
```

在style1.css中修改样式

```css
/* 登录按钮的样式 */
.register-container .btn {
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    background-color: #007BFF;
    border: none;
    border-radius: 3px;
    color: white;
    cursor: pointer;
}

/* 发送验证码按钮的样式 */
.register-container .btn-code {
    width: auto;
    /* 覆盖100%宽度 */
    margin-left: 10px;
    padding: 5px 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

/* 禁用状态的样式 */
.register-container .btn-code:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
}


input[type="tel"],
input[type="text"] {
    padding: 5px;
    margin: 5px 0;
    border: 1px solid #ddd;
    border-radius: 4px;
}

label {
    display: inline-block;
    width: 80px;
}
```

添加js代码(可能后续需要修改)

```javascript
<script>
  let btn = document.querySelector(".btn");
  btn.onclick = function () {
    //获取username和password的值发送给服务器(后端)
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
    let remember = document.querySelector("#remember").checked;
    axios({
      url: "http://localhost:8080/tAdmin/login",
      method: "post",
      data: {
        username: username,
        password: password,
        remember: remember
      }
    }).then((result) => {
      console.log(result)
      if (result.data.code == 200) {
        //跳转首页
        location.href = "/index.html"
      } else {
        alert("用户名或密码错误,请重新输入");
        location.href = "/login.html"
      }
    })
  }

  // 传入cookie名能够拿到cookie的值
  function getCookieValue(name) {
    let value = `; ${document.cookie}`;
    let parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  // console.log(getCookieValue("uname"))
  // console.log(getCookieValue("pword"))
  //cookie怎么在前端拿
  //获取cookie值 渲染到input框中
  function populateFields() {
    let usernameValue = getCookieValue("uname");
    let passwordValue = getCookieValue("pword");
    if (usernameValue) {
      document.getElementById('username').value = usernameValue;
    }
    if (passwordValue) {
      document.getElementById('password').value = passwordValue;
    }
    // 如果需要记住我，勾选复选框
    let rememberMeValue = getCookieValue("rememberMe");
    if (rememberMeValue === "true") {
      document.getElementById('rememberMe').checked = true;
    }

  }
  //页面加载
  window.onload = function () {
    populateFields();
  }
</script>
<!-- 添加发送验证码的逻辑 -->
<script>
  document.getElementById('sendCode').addEventListener('click', function () {
    const phone = document.getElementById('phone').value;
    const button = this;

    // 验证手机号格式
    if (!/^1[3-9]\d{9}$/.test(phone)) {
      alert('请输入正确的手机号码');
      return;
    }

    // 发送验证码
    axios({
      url: "http://localhost:8080/sendCode",
      method: "post",
      data: {
        phone: phone
      }
    }).then((result) => {
      if (result.data.code == 200) {
        // 发送成功后禁用按钮并开始倒计时
        let countdown = 60;
        button.disabled = true;

        const timer = setInterval(() => {
          button.textContent = `${countdown}秒后重新发送`;
          countdown--;

          if (countdown < 0) {
            clearInterval(timer);
            button.disabled = false;
            button.textContent = '发送验证码';
          }
        }, 1000);

        alert('验证码已发送，请注意查收');
      } else {
        alert('验证码发送失败，请稍后重试');
      }
    }).catch((error) => {
      alert('请求失败：' + error);
    });
  });
</script>
```

发送验证码

```java
@Override
    public Result sendCode(String phone, HttpSession session) {
        // 1.校验手机号
        if (RegexUtils.isPhoneInvalid(phone)) {
            // 2.如果不符合，返回错误信息
            return Result.fail("手机号格式错误！");
        }
        // 3.符合，生成验证码
        String code = RandomUtil.randomNumbers(6);

        // 4.保存验证码到 session
        session.setAttribute("code",code);
        // 5.发送验证码
        log.debug("发送短信验证码成功，验证码：{}", code);
        // 返回ok
        return Result.ok();
    }
```

登录

```java
    @Override
    public Result login(LoginFormDTO loginForm, HttpSession session) {
        // 1.校验手机号
        String phone = loginForm.getPhone();
        if (RegexUtils.isPhoneInvalid(phone)) {
            // 2.如果不符合，返回错误信息
            return Result.fail("手机号格式错误！");
        }
        // 3.校验验证码
        Object cacheCode = session.getAttribute("code");
        String code = loginForm.getCode();
        if(cacheCode == null || !cacheCode.toString().equals(code)){
             //3.不一致，报错
            return Result.fail("验证码错误");
        }
        //一致，根据手机号查询用户
        User user = query().eq("phone", phone).one();

        //5.判断用户是否存在
        if(user == null){
            //不存在，则创建
            user =  createUserWithPhone(phone);
        }
        //7.保存用户信息到session中
        session.setAttribute("user",user);

        return Result.ok();
    }
```

**温馨小贴士：tomcat的运行原理**

![1653068196656](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/1653068196656.png)

当用户发起请求时，会访问我们像tomcat注册的端口，任何程序想要运行，都需要有一个线程对当前端口号进行监听，tomcat也不例外，当监听线程知道用户想要和tomcat连接连接时，那会由监听线程创建socket连接，socket都是成对出现的，用户通过socket像互相传递数据，当tomcat端的socket接受到数据后，此时监听线程会从tomcat的线程池中取出一个线程执行用户请求，在我们的服务部署到tomcat后，线程会找到用户想要访问的工程，然后用这个线程转发到工程中的controller，service，dao中，并且访问对应的DB，在用户执行完请求后，再统一返回，再找到tomcat端的socket，再将数据写回到用户端的socket，完成请求和响应

通过以上讲解，我们可以得知 每个用户其实对应都是去找tomcat线程池中的一个线程来完成工作的， 使用完成后再进行回收，既然每个请求都是独立的，所以在每个用户去访问我们的工程时，我们可以使用threadlocal来做到线程隔离，每个线程操作自己的一份数据



**温馨小贴士：关于threadlocal**

如果小伙伴们看过threadLocal的源码，你会发现在threadLocal中，无论是他的put方法和他的get方法， 都是先从获得当前用户的线程，然后从线程中取出线程的成员变量map，只要线程不一样，map就不一样，所以可以通过这种方式来做到线程隔离

登录验证功能

![image-20241210194541249](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241210194541249.png)

```java
import cn.lanqiao.dataclassspringboot.model.pojo.TAdmin;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.web.servlet.HandlerInterceptor;

/**
 * @ Author: 李某人
 * @ Date: 2024/12/16/09:09
 * @ Description:登录拦截器
 */
public class LoginInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        //1.我们先session中拿到刚才登录成功存储的session值
        HttpSession session = request.getSession();
        TAdmin userLogin = (TAdmin) session.getAttribute("userLogin");
        System.out.println(userLogin);
        if (userLogin == null){
            //用户没有登录成功或者session过期了(session默认是30分钟过期)
            // 用户未登录，设置响应类型
            response.setContentType("text/html;charset=UTF-8");
            // 方式1：直接重定向到登录页面
            response.sendRedirect("/needLogin.html");  // 替换成你的登录页面路径
            //拦截,跳转一个提示页面
            return false;
        }else {
            //放行
            return true;
        }
    }
}
```

![image-20241210195039231](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20241210195039231.png)

让拦截器生效

```java
import cn.lanqiao.dataclassspringboot.interceptor.LoginInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


/**
 * @ Author: 李某人
 * @ Date: 2024/12/16/09:13
 * @ Description:
 */
@Configuration
public class MvcConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 登录拦截器
        registry.addInterceptor(new LoginInterceptor())
                //放行
                .excludePathPatterns(
                        "/login.html",
                        "/register.html",
                        "/codeImage",
                        "/needLogin.html",
                        "/tAdmin/register",
                        "/tAdmin/login",
                        "/tAdmin/sendCode",
                        "/css/*",
                        "/images/*",
                        "/js/*",
                        "/user2/images/*"
                ).order(1);
    }
}
```

### 使用redis替换session的方案

```java
/**
     * 10 - 手机验证码功能
     * 1.前端发送请求到后端
     * 2.生成验证码，将验证码存储到session中
     * 3.在登录的时候校验
     */
    @RequestMapping("/sendCode")
    public ResponseUtils sendCode(@RequestBody TAdminQuery tAdminQuery,HttpServletRequest request){
        //手机号应该与账号是有绑定
        TAdmin tAdmin = tAdminService.selectByPhone(tAdminQuery, request);
        if (tAdmin == null){
            return new ResponseUtils(500,"手机号不存在或者手机号与该用户不匹配");
        }
        return new ResponseUtils(200,"验证码已发送");
    }
```

```java
 @Override
    public TAdmin selectByPhone(TAdminQuery tAdminQuery, HttpServletRequest request) {
        //1.需要再数据库中查询手机号是否存在
        TAdmin tAdmin = tAdminMapper.selectByPhone(tAdminQuery);
        if (tAdmin != null){
            //存在
            //2.如果就可以向该手机号发送验证码
            //2.1验证码如何生成(正常来说应该使用第三方接口，去实现验证码的发送)
            //获取UUID的hashCode
            int uuid = UUID.randomUUID().hashCode();
            //取绝对值(Math是java自带的数学类)
            uuid = Math.abs(uuid);
            String strUUID = String.format("%06d", uuid % 1000000);
            //保留6位
            log.info("手机验证码:"+strUUID);
            //3.将生成好的验证码存储到Session中
            // HttpSession session = request.getSession();
            // 设置session最大非活动间隔时间为60秒
            // session.setMaxInactiveInterval(60);
            // session.setAttribute("UUIDcode",strUUID);

            //这里使用redis来实现 key() value(strUUID)
            //细节:redis key 如果相同 会覆盖之前的 value key值我们就使用用户的手机号来存储(保证验证码的唯一性)
            //存储验证码相关的信息可以使用String类型来存储
            //设置当前redis存储的验证码生存时间
            stringRedisTemplate.opsForValue().set(MOBILE_PHONE_CAPTCHA_PREFIX+tAdmin.getPhone(),strUUID,60L, TimeUnit.SECONDS);
        }else {
            //4.如果手机号不存在需要返回值给到Controller
            return null;
        }
        return tAdmin;
    }
```

```java
 String phoneCode = stringRedisTemplate.opsForValue().get(MOBILE_PHONE_CAPTCHA_PREFIX + tAdminLogin.getPhone());
            if (tAdminLogin.getVerifyCode().equals(phoneCode)){
                //实现登录逻辑
            }
```

### 使用redis实现token验证

```java
 //1.怎么生成一个token? -> hutool
                    String token = IdUtil.fastSimpleUUID();
                    tAdminVO.setToken(token);
                    // 使用token构建唯一的Redis key
                    String redisKey = USER_TOKEN + token;
                    //2.怎么将用户的信息存入到redis中?
                    //序列化将用户对象存储的信息 转换成 JSON数据存入到redis中
                    String userLoginJson = mapper.writeValueAsString(userLogin);
                    stringRedisTemplate.opsForValue().set(redisKey,userLoginJson,30L, TimeUnit.MINUTES);
                    return new ResponseUtils(200,"登录成功",tAdminVO);
```

#### 前端接收参数并且存储参数

```js
if (result.data.code == 200) {
        sessionStorage.setItem('token', result.data.data.token);
        //跳转首页
        location.href = "/index.html"
      }else if (result.data.code == 500){
        alert("手机验证码错误");
      }
```

#### 全局请求拦截器

使用全局请求拦截器携带token请求头到服务器

```js
// 请求拦截器
axios.interceptors.request.use(
    config => {
        // 从sessionStorage获取token（因为你使用的是sessionStorage）
        const token = sessionStorage.getItem('token');

        // 如果token存在，添加到请求头
        if (token) {
            config.headers['token'] = token;
        }
        return config;
    },
    error => {
        console.error('请求错误:', error);
        return Promise.reject(error);
    }
);
```

使用方法:

细节:注意需要先引用axios再引用全局请求拦截器，不然请求拦截器会报错

```js
<script src="js/axios.min.js"></script>
<script src="js/axiosConfig.js"></script>
```

后端拦截器代码

```java
package cn.lanqiao.dataclassspringboot.config;

import cn.lanqiao.dataclassspringboot.interceptor.LoginInterceptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


/**
 * @ Author: 李某人
 * @ Date: 2024/12/16/09:13
 * @ Description:
 */
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Autowired
    private LoginInterceptor loginInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(loginInterceptor)
                .addPathPatterns("/**")  // 拦截所有请求
                .excludePathPatterns(    // 明确指定不需要拦截的路径
                        "/login.html",
                        "/register.html",
                        "/needLogin.html",
                        "/css/**",
                        "/js/**",
                        "/images/**",
                        "/fonts/**",
                        "/*.ico"
                )
                .order(1);
    }
}

```

```java
package cn.lanqiao.dataclassspringboot.interceptor;

import cn.lanqiao.dataclassspringboot.model.pojo.TAdmin;
import io.netty.util.internal.StringUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.HandlerInterceptor;

import java.io.PrintWriter;
import java.util.concurrent.TimeUnit;

import static cn.lanqiao.dataclassspringboot.model.common.FinalClass.USER_LOGIN_INFO;
import static cn.lanqiao.dataclassspringboot.model.common.FinalClass.USER_TOKEN;

/**
 * @ Author: 李某人
 * @ Date: 2024/12/16/09:09
 * @ Description:登录拦截器
 */
@Component
@Slf4j
public class LoginInterceptor implements HandlerInterceptor {
    //如果不是被SpringIOC管理的类，需要将该类变成Spring管理的类，然后再去依赖注入，不然就会报错
    @Autowired
    private StringRedisTemplate stringRedisTemplate;
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        //1.我们需要从请求头中获取到token
        //todo:页面html也算是一个请求，到后端来肯定会进行判断,所以就会有很多null
        //登录之后没有token
        //解决方法就是：就只留axios请求到这里来，除开axios请求咱们都放行

        // 获取请求路径
        String requestURI = request.getRequestURI();
        log.info("拦截到请求: {}", requestURI);
        // 如果是静态资源请求，直接放行
        if (isStaticResource(requestURI)) {
            return true;
        }
        //获取到前端发送的token
        String token = request.getHeader("token");
        if (StringUtils.isEmpty(token)){
            return false;
        }
        //获取到后端存到redis中的token
        // 构建Redis key
        String redisKey = USER_TOKEN + token;
        // 获取用户信息
        String userInfo = stringRedisTemplate.opsForValue().get(redisKey);
        if (StringUtils.isEmpty(userInfo)) {
            return false;
        }
        // 刷新token有效期
        stringRedisTemplate.expire(redisKey, 30L, TimeUnit.MINUTES);
        return true;
    }
    /**
     * 判断是否是静态资源
     */
    private boolean isStaticResource(String uri) {
        return uri.startsWith("/css/") ||
                uri.startsWith("/js/") ||
                uri.startsWith("/images/") ||
                uri.startsWith("/fonts/") ||
                uri.startsWith("/files/") ||
                uri.startsWith("/error") ||
                uri.startsWith("/tAdmin/sendCode") ||
                uri.startsWith("/tAdmin/login") ||
                uri.startsWith("/tAdmin/register") ||
                uri.endsWith(".html") ||
                uri.endsWith(".ico");
    }
}
```









