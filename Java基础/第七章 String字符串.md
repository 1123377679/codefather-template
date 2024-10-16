# 第七章 String字符串
# API

API(Application Programming Interface):应用程序编程接口

**简单理解**:API就是人家已经写好的东西，我们不需要自己编写，直接使用即可

比如：Random，Scanner

JavaAPI：指的就是JDK中提供的各种功能的Java类

这些类将底层的实现封装了起来，我们不需要关心这些类是如何实现的，只需要学习这些类如何使用即可

将来还会学习其他知识，还会有很多的API

## API帮助文档

帮助开发人员更好的使用API和查询API的一个工具

## API文档训练

需求：按照帮助文档的使用步骤学习Scanner类的使用，并实现接收键盘录入一个小数，最后输出在控制台

# 字符串

关键字:String

```
"adc"+true = "abctrue";
"lanqiao"+666 = "lanqiao666";
```

那我们字符串只能做拼接的操作吗？

![image-20230105141054348](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230105141054348.png)

## 字符串在开发中的应用场景

1.登录注册，密码校验

2.脏话打**

3.字符串的面试题

## 字符串学习的内容

掌握一些字符串常见的操作

通过一些实际开发中的案例，掌握分析问题，解决问题的能力

字符串相关的底层原理

掌握原理能够更好的通过面试，处理开发中的一些复杂问题

## String概述

java.lang.String类代表字符串，Java程序中的所有字符串文字(例如"abc")都为此类的对象

```java
String name = "李某人";
String schoolName = "蓝桥";
```

字符串不可变，它们的值在创建后不能被更改

```java
	   String originalStr = "Hello";
        System.out.println(originalStr);

        // 对字符串进行拼接，会创建一个新的字符串对象
        String newStr = originalStr + " World";
        System.out.println(newStr);

        // 原始字符串对象仍然保持不变
        System.out.println(originalStr);
```



## 创建String对象的两种方式

1.直接赋值

```java
String name = "李某人";
```

2.new

| 构造方法                       | 说明                             |
| ------------------------------ | -------------------------------- |
| public String()                | 创建空白字符串，不含任何内容     |
| public String(String original) | 根据传入的字符串，创建字符串对象 |
| public String(char[] chs)      | 根据字符数组，创建字符串对象     |
| public String(byte[] chs)      | 根据字节数组，创建字符串对象     |

空参对象

```
String s2 = new String();
System.out.println("1"+s2+"2");
```

传递一个字符串，根据传递的字符串内容再创建一个新的字符串对象

```
String s3 = new String("abc");
```

传递一个字符数组，根据字符数组的内容再创建一个字符串对象

```
char[] chs = {'a','b','c'};
String s4 = new String(chs);
```

应用场景：需要修改字符串的内容为Abc

传递一个字节数组，根据字节数组的内容再创建一个新的字符串对象

```
byte[] byt = {97,98,99,100};
String s5 = new String(byt);
```

应用场景:以后再网络当中传输的数据都是字节信息

我们一般要把字节信息进行转换，转成字符串，此时就要用到这个构造了

## 字符串的比较

```
String s1 = "abc";
String s2 = "abc";
```

```
String s1 = new String("abc");
String s2 = "abc";
```

==号比的到底是什么?

基本数据类型：比较的是具体的数据值

引用数据类型:比较的是地址值

如果我要比较字符串中的内容?

- boolean equals方法(要比较的字符串) 完全一样才是true，否则为false
- boolean equalsignoreCase(要比较的字符串)，忽略大小写的比较

==和equls的区别

```
	/**
     * 字符串是引用数据类型
     * 基本数据类型:int sort long byte boolean double char float
     * 除开以上这些其他的都是引用数据类型
     * 基本数据类型做比较的时候用== 作比较，这个时候比较的是值
     * 引用数据类型做比较的时候用== 做比较,这个时候比较的是地址值
     * 创建String字符串的时候，就类似于创建了一个空间
     * 如果说现在我想要比较两个字符串的值，需要使用到.equals
     */
```

## 案例:用户登录

已知正确的用户名和密码，请用程序实现模拟用户登录

总共给三次机会，登录之后，给出相应的提示

## 遍历字符串

需求：键盘录入一个字符串，使用程序实现在控制台遍历该字符串

需要使用的方法:

```
public char charAt(int index); //根据索引返回字符
```

```
字符串的长度? 字符串对象.length();
```

## 案例:统计字符次数

需求：键盘录入一个字符串，统计该字符串中大写字母字符，小写字母字符，数字字符出现的次数(不考虑其他字符)

## 案例：字符串反转

定义一个方法，实现字符串反转

键盘录入一个字符串，调用该方法后，再控制台输出结果

例如,键盘录入abc，输出cba

## 云课案例：统计子串出现的次数

挑战者在控制台录入两段字符串，程序需要在第一段字符串中统计第二段字符串出现的次数，程序运行结束后在控制台输出统计的结果。

1. 在 `/home/project/` 目录下创建名为 `Statistical.java` 源文件。
2. 在控制台输入两段字符串，可参考挑战运行效果图。
3. 输入的字符串由数字和字母构成，**不得包含空格等符号**。
4. 使用 `Scanner` 对象进行输入字符串时请使用 `next()` 方法。
5. 必须按照以上要求进行代码编写，否则会影响挑战无法正常通过。
6. ![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/40ada259e725dd8759712d0c08acd237-0)

## 案例:实现英文单词翻转

单词翻转的意思是通过一组英文单词，程序运行结束后将这组英文单词中的每个单词顺序颠倒过来，并最终以字符串形式输出。

例如：

提供字符串数组：{"I", "Love", "You", "Daddy"}

翻转后输出字符串：I evoL uoY yddaD

1. 在 `/home/project/` 目录下创建名为 `WordFilp.java` 源文件。
2. 必须使用提供的字符串数组： {"I", "Love", "You", "Daddy"}。
3. 从数组中提取的每个英文单词进行翻转，完成翻转后的单词可放入字符串缓冲区 `StringBuffer` 保存。
4. 翻转处理后的英文单词需要使用空格隔开，不得出现其他标点符号。
5. 必须按照以上要求进行代码编写，否则会影响挑战无法正常通过。
6. ![图片描述](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/430e4574350282cdfa87483b0d7728dd-0)

# StringBuffer

## 基本介绍

StringBuffer是一个容器，字符串的组成原理就是通过该类实现的。StringBuffer可以对字符串内容进行增删改查等操作，很多方法和String相同

## 特点

 1、而且长度是可变化的。（数组是固定的）

 2、可以直接操作多个数据类型。（数组只能操作一个）

 3、最终会通过toString方法变成字符串。

## 常见操作

### 存储

```
StringBuffer append()：将指定数据作为参数添加到已有数据的结尾处。

StringBuffer insert(int offset ,数据)：可以将数据插入到指定offset位置。
```

### 删除

```
StringBuffer delete(int start,int end)：删除缓冲区中的数据，包含start，不包含end。

StringBuffer deleteCharAt(index)：删除指定位置的字符。

清空缓冲区：对象.delete(0,对象.length());
```

### 获取

```
    char charAt(int index)；

    int indexOf(String str)；

    int lastIndexOf(String str)；

    int length()；

    String substring(int start,int end)；
```

### 修改

```
    StringBuffer replace(int start,int end,String str)；

    void setCharAt(int index,char ch)；
```

### 反转

```
     StringBuffer reverse()；
```

### 将缓冲区中指定数据存储到指定字符数组中

```
    void getChars(int srcBegin, int srcEnd,char[] dst,int dstBegin)
```

# StringBuilder

## 为什么要有StringBuilder

1.StringBuffer是线程安全的,速度就会很慢

2.StringBuilder是不保证安全的，所以说效率很高

## StringBuilder概述

StringBuilder是一个可变的字符序列，此类提供了一个与stringbuffer兼容的一套API，但是不保证同步(线程不安全，效率高)

作用：主要是字符串拼接

问题:

之前我们做题的时候发现其实不使用StringBuilder其实也可以实现字符串的拼接，但为啥还要使用StringBuilder呢

因为：String每次拼接一次，就会产生新的字符串对象，就会在内存中开辟新的空间，如果拼接的次数多了，会占用内存，效率比较低

StringBuilder，底层自带一个缓冲区(没有被final修饰的byte数组)拼接字符串之后都会在此缓冲区保存，在拼接的过程中，不会随意产生新对象，节省内存

StringBuilder的特点:

​	1.底层自带缓冲区，此缓冲区是没有被final修饰的byte数组，默认长度为16

​	2.如果超出了数组长度，数组会自动扩容

​		创建一个新长度的新数组，将老数组的元素复制到新数组中，然后将新数组的地址值重新赋值给老数组

​	3.默认每次扩容老数组的2倍+2

​		如果一次性添加的数据超出了默认的扩容数组长度(2倍+2)，比如存了36个字符，超出了第一次扩容的34，就按照实际数据个数为准，就是以36扩容

```java
StringBuilder sb = new StringBuilder();
System.out.println(sb);
sb.append("红色");
System.out.println(sb);
sb.append("黄色");
System.out.println(sb);
sb.append("绿色");
System.out.println(sb);
```

这个容器可以存储任意数据类型，但是只要进入到这个容器，全部变成字符串

```java
StringBuilder sb = new StringBuilder();
sb.append(1);
sb.append(1.1);
sb.append(false);
sb.append("ggbom");
```

## StringBuilder构造方法

| 方法名                           | 说明                                                         |
| -------------------------------- | ------------------------------------------------------------ |
| public StringBuilder()           | 创建一个空白可变字符串对象，不含有任何内容,初始容量为16个字符 |
| public StringBuilder(String str) | 根据字符串的内容，来创建可变字符串对象                       |

### StringBuilder()

```java
StringBuilder sb = new StringBuilder();
sb.append("123456789123456789");
```

### StringBuilder(String str)

```java
StringBuilder sb = new StringBuilder("abc");
```

## StringBuilder常用方法

| 方法名                                | 说明                                              |
| ------------------------------------- | ------------------------------------------------- |
| public StringBuilder append(任意类型) | 添加数据,并返回对象本身                           |
| public StringBuilder reverse()        | 反转容器中的内容                                  |
| public int length()                   | 返回长度(字符出现的个数)                          |
| public String toString()              | 通过toString()就可以实现把StringBuilder转为String |

### append()

```java
StringBuilder sb = new StringBuilder();
StringBuilder sb1= sb.append("红色");
StringBuilder sb2= sb.append("黄色");
StringBuilder sb3= sb.append("绿色");
System.out.println(sb);
System.out.println(sb1);
System.out.println(sb2);
System.out.println(sb3);

System.out.println(sb==sb1);
System.out.println(sb1==sb2);
System.out.println(sb2==sb3);
System.out.println(sb3==sb);
```

```java
//链式编程:调用的方法，返回的结果是对象，就可以继续向下调用方法
sb.append("红色").appen("黄色")
```

### reverse()

```java
sb.reverse();
```

### length()

```java
sb.length();
```

### toString()

```java
sb.toString();
```

String.split()方法:用于字符串的分割

```java
String str= "1a2";
String[] split = str.split("a");
for (int i = 0; i<split.length;i++){
 System.out.println(split[i]);
}
```

### 练习：对称字符串

需求：键盘接受一个字符串，程序判断出该字符串是否是对称字符串(回文字符串)，并在控制台打印是或不是

对称:123321,11

非对称:123123

思路:对拿到的字符串进行反转，反转后的内容,跟原数据相同,判断为回文字符串

```java
        Scanner sc = new Scanner(System.in);
        System.out.println("请输入一个字符串");
        String next = sc.next();
        //将String转换成StringBuilder
        StringBuilder stringBuilder = new StringBuilder(next);
        StringBuilder reverse = stringBuilder.reverse();
        if (reverse.toString().equals(next)){
            System.out.println("是一个回文字符串");
        }else {
            System.out.println("不是一个回文字符串");
        }
```

### 练习：拼接字符串

需求:定义一个方法，把int数组中的数据按照指定的格式拼接成一个字符串返回

调用该方法，并在控制台输出结果。

例如：数组为int[] arr = {1,2,3};

执行方法后的输出结果为：[1,2,3]

```java
    public static void main(String[] args) {
        int[] arr = {1,2,3};
        spliceArr(arr);
        /**
         * 需求:定义一个方法，把int数组中的数据按照指定的格式拼接成一个字符串返回
         * 调用该方法，并在控制台输出结果。
         * 例如：数组为int[] arr = {1,2,3};
         * 执行方法后的输出结果为：[1,2,3]
         */
    }
    public static void spliceArr(int[] arr){
        StringBuilder sb = new StringBuilder("[");
        //思路:先把数据里面的数据遍历出来到StringBuilder里面去
        //通过for循环把它遍历成这个样式[1,2,
        for (int i = 0;i<arr.length-1;i++){
            sb.append(arr[i]+",");
        }
        //最后的格式需要特殊处理
        //arr.length = 3;
        //arr.length - 1 = 2
        //arr[2] = 3;
        //arr[arr.length - 1] = 3
        //3]
        //再把3]去做拼接
        sb.append(arr[arr.length-1]+"]");
        System.out.println(sb);//[1,2,3]
    }
```

### 总结:

StringBuffer和StringBuilder的区别

StringBuffer是线程同步的。有锁。效率低

StringBuilder是线程不同步的。无锁。效率高

以后开发，建议使用StringBuilder。如遇多线程，使用StringBuffer或自己加锁。

升级三因素：

​    1、提高效率

​    2、简化书写

​    3、提高安全性。

# 女朋友管理系统

实现数组的CRUD(增删改查)

数组里面存的是什么？





# ArrayList-集合的基本使用

## 为什么要有集合？

如果我们想要同时存储多个元素，我们应该怎么办?

![image-20230320164911554](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202303201649084.png)

### 集合存储数据类型的特点？

**数组:**

![image-20230319225529372](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230319225529372.png)

**集合:**

可以存储引用数据类型

不能直接存基本数据类型

如果想要存储基本数据类型需要把基本数据类型转换成`包装类`

### 集合和数组的对比

**长度和存储类型**

![image-20230319225813283](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230319225813283.png)

## 集合

![image-20230319225837819](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230319225837819.png)

### ArrayList

打开API文档学习

```java
1.创建集合的对象
//泛型：限定集合中存储数据的类型
//ArrayList<String> list = ArrayList<>();
//此时我们创建的是ArrayList对象，而ArrayList是Java已经写好的类
//这个类在底层做了一些处理
//打印对象不是地址值，而是集合里面存储的数据值
//在展示的时候会拿[]把所有的数据进行包裹
ArrayList<String> list = ArrayList<>();
System.out.println(list);
```

### ArrayList成员方法

| 方法名               | 说明                                 |
| -------------------- | ------------------------------------ |
| boolean add(E e)     | 添加元素，返回值表示是否添加成功     |
| boolean remove(E e)  | 删除指定元素,返回值表示是否删除成功  |
| E remove(int index)  | 删除指定索引的元素，返回被删除元素   |
| E set(int index,E e) | 修改指定索引下的元素，返回原来的元素 |
| E get(int index)     | 获取指定索引的元素                   |
| int size()           | 集合长度，也就是集合中元素的个数     |

## 综合练习

### 集合的遍历方式

需求:定义一个集合，添加数值，并进行遍历

遍历格式参照:[元素1，元素2，元素3]

### 基本数据类型对应的包装类

| 基本数据类型 | 包装类    |
| ------------ | --------- |
| byte         | Byte      |
| short        | Short     |
| char         | Character |
| int          | Integer   |
| long         | Long      |
| float        | Float     |
| double       | Double    |
| boolean      | Boolean   |

### 添加学生对象并遍历

需求；定义一个集合，添加一些学生对象，并进行遍历

学生类的属性为:姓名,年龄

```java
        Student s1 = new Student("李某人",18);
        Student s2 = new Student("李某",18);
        Student s3 = new Student("李人",18);
        ArrayList<Student> arrayList = new ArrayList<>();
        arrayList.add(s1);
        arrayList.add(s2);
        arrayList.add(s3);
        //System.out.println(arrayList);
        for (int i = 0;i< arrayList.size();i++){
            //System.out.println(arrayList.get(i));
            Student student = arrayList.get(i);
            System.out.println(student.getName()+" "+student.getAge());
        }
```

### 添加学生对象并遍历

需求；定义一个集合，添加一些学生对象，并进行遍历

学生类的属性为:姓名,年龄

要求:对象的数据来自键盘录入

```java
		//1.创建集合
        ArrayList<Student> arrayList = new ArrayList<>();
        //2.键盘录入学生的信息并添加到集合中
        Scanner sc = new Scanner(System.in);
        for (int i = 0; i<3;i++){
            Student student = new Student();
            System.out.println("请输入学生的姓名");
            String name = sc.next();
            System.out.println("请输入学生的年龄");
            int age = sc.nextInt();

            student.setName(name);
            student.setAge(age);
            arrayList.add(student);
        }
        //遍历集合
        for (int i = 0;i< arrayList.size();i++){
            //System.out.println(arrayList.get(i));
            Student student = arrayList.get(i);
            System.out.println(student.getName()+" "+student.getAge());
        }
```

### 添加用户对象并判断是否存在

需求:

1.main方法中定义了一个集合，存入三个用户对象

用户属性:id,username,password

2.要求：定义一个方法，根据id查找对应的用户信息

如果存在，放回true

如果不存在，返回false

```java
package cn.lanqiao.ArrayListDay1.Day1;

import java.util.ArrayList;

/**
 * 添加用户对象并判断是否存在
 * 需求:
 * 1.main方法中定义了一个集合，存入三个用户对象
 * 用户属性:id,username,password
 * 2.要求：定义一个方法，根据id查找对应的用户信息
 * 如果存在，返回true
 * 如果不存在，返回false
 *
 * 转换成代码的思维太弱了
 * 需要大量的练习
 */
public class Demo5 {
    public static void main(String[] args) {
        //创建集合
        ArrayList<User> list = new ArrayList<>();
        //创建三个对象并赋值
        //通过构造方法去赋值，也可以通过set方法去赋值
        User u1 = new User(1,"李某","123456");
        User u2 = new User(2,"刘某","123");
        User u3 = new User(3,"张某","1234");
        //将这三个对象存进集合中
        list.add(u1);
        list.add(u2);
        list.add(u3);
        //System.out.println(UserById(3,list));
        UserById(2,list);
    }
    //方法
    //思考：1.你要用这个方法干嘛?根据id查找对应的用户信息
    public static boolean UserById(int id,ArrayList<User> list){
        //2.通过遍历集合去查找所有的id，如果有该id就返回true，否则返回false
        //通过for循环拿到所有的用户
        for (int i = 0 ;i<list.size();i++){
            //获取User对象
            User user = list.get(i);
            //通过getid去拿当前用户里面的id
            //当前用户id
            int UserId = user.getId();
            //判断,如果我输入的这个id跟我用户里面的id相等的话，就返回true，否则返回false
            if (id == UserId) {
                return true;
            }
        }
        return false;
    }
}

```

### 添加用户对象并判断是否存在

需求:

1.main方法中定义了一个集合，存入三个用户对象

用户属性:id,username,password

2.要求：定义一个方法，根据id查找对应的用户信息

如果存在，返回索引

如果不存在，返回-1

```java
 public static void main(String[] args) {
        ArrayList<User> arrayList = new ArrayList<>();
        User u1 = new User(1,"lmx","123456");
        User u2 = new User(2,"dxl","123456");
        User u3 = new User(3,"shr","123456");
        arrayList.add(u1);
        arrayList.add(u2);
        arrayList.add(u3);
        System.out.println(userById(arrayList,1));
    }
    //定义一个方法，根据id查询对应的用户信息
    public static int userById(ArrayList<User> list,int id){
        for (int i = 0 ;i<list.size();i++){
            User user = list.get(i);
            int id1 = user.getId();
            if (id1 == id){
                return i;
            }
        }
        return -1;
    }
```

### 添加手机对象并返回要求的数据

需求:

定义Javabean类：phone

phone属性:品牌，价格

main方法中定义一个集合，存入三个手机对象

分别为:小米,1000。苹果，8000。锤子,2900

定义一个方法，将价格低于3000的手机信息返回 

```java
public static void main(String[] args) {
        ArrayList<Phone> arrayList = new ArrayList<>();
        Phone p1 = new Phone("小米",1000);
        Phone p2 = new Phone("锤子",2900);
        Phone p3 = new Phone("苹果",8000);
        arrayList.add(p1);
        arrayList.add(p2);
        arrayList.add(p3);
        ArrayList<Phone> phoneinformation = phoneinformation(arrayList);
        for (int i = 0 ;i<phoneinformation.size();i++){
            System.out.println(phoneinformation.get(i));
        }
    }
    //技巧：
    public static ArrayList<Phone> phoneinformation(ArrayList<Phone> arrayList){
        ArrayList<Phone> list = new ArrayList<>();
        for (int i = 0;i<arrayList.size();i++){
            Phone phone = arrayList.get(i);
            int price = phone.getPrice();
            if (price<3000){
                list.add(phone);
                //System.out.println(phone.getBrand()+" "+phone.getPrice());
            }
        }
        return list;
    }
```

# 学生管理系统

## 需求：

采取控制台的方式去书写管理系统

## 分析

### 初始菜单:

![image-20230319234516729](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230319234516729.png)

### 学生类：

属性:id，姓名，年龄，家庭住址

### 添加功能

键盘录入每一个学生信息并添加，需要满足以下需求:

id唯一

### 删除功能

键盘录入要删除的学生id，需要满足以下需求:

id存在删除

id不存在，需要提示不存在，并回到初始菜单

### 修改功能

键盘录入要修改的学生id，需要满足以下要求

id存在，继续录入其他信息

id不存在，需要提示不存在，并回到初始菜单

### 查询功能

打印所有的学生信息，需要满足以下要求

如果没有学生信息，提示：当前无学生信息，请添加后查询

如果有学生信息，需要按照以下格式输出(不用过于纠结对齐的问题)

![image-20230319234910405](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230319234910405.png)



## 学生管理系统-搭建主菜单

### 学生类:

```java
package cn.lanqiao.Test;

public class Student {
    private int id;
    private String name;
    private int age;
    private String address;

    public Student() {
    }

    public Student(int id, String name, int age, String address) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.address = address;
    }

    /**
     * 获取
     * @return id
     */
    public int getId() {
        return id;
    }

    /**
     * 设置
     * @param id
     */
    public void setId(int id) {
        this.id = id;
    }

    /**
     * 获取
     * @return name
     */
    public String getName() {
        return name;
    }

    /**
     * 设置
     * @param name
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * 获取
     * @return age
     */
    public int getAge() {
        return age;
    }

    /**
     * 设置
     * @param age
     */
    public void setAge(int age) {
        this.age = age;
    }

    /**
     * 获取
     * @return address
     */
    public String getAddress() {
        return address;
    }

    /**
     * 设置
     * @param address
     */
    public void setAddress(String address) {
        this.address = address;
    }

    public String toString() {
        return "Student{id = " + id + ", name = " + name + ", age = " + age + ", address = " + address + "}";
    }
}

```

### 主菜单搭建

```java
		while (true){
            System.out.println("--------欢迎来到大数据3班学生管理系统-----------");
            System.out.println("-------------1.添加学生-----------");
            System.out.println("-------------2.删除学生-----------");
            System.out.println("-------------3.修改学生-----------");
            System.out.println("-------------4.查看学生-----------");
            System.out.println("-------------5.退出系统-----------");
            Scanner scanner = new Scanner(System.in);
            System.out.println("请输入您的选择:");
            String choose = scanner.next();
            switch (choose){
                case "1":
                    System.out.println("添加学生");
                    break;
                case "2":
                    System.out.println("删除学生");
                    break;
                case "3":
                    System.out.println("修改学生");
                    break;
                case "4":
                    System.out.println("查看学生");
                    break;
                case "5":
                    System.out.println("退出系统");
                    System.exit(0);
                    break;
                default:
                    System.out.println("没有这个选项");
            }
        }
```

### 业务对应的方法

```java
	//添加学生
    public static void addStudent(){
        System.out.println("添加学生");
    }
    //删除学生
    public static void deleteStudent(){
        System.out.println("删除学生");
    }
    //修改学生
    public static void updateStudent(){
        System.out.println("修改学生");
    }
    //查询学生
    public static void selectStudent(){
        System.out.println("查询学生");
    }
```

### 添加功能

键盘录入每一个学生信息并添加，需要满足以下需求:

id唯一

```java
//添加学生
    public static void addStudent(ArrayList<Student> list){
        //System.out.println("添加学生");
        Student student = new Student();
        Scanner scanner = new Scanner(System.in);
        int id;
        while (true){
            System.out.println("请输入学生的id");
            id = scanner.nextInt();
            boolean b = StudentById(list, id);
            if (b){
                //表示id已存在，请重新输入
                System.out.println("id已存在，请重新输入");
            }else {
                student.setId(id);
                break;
            }
        }
        System.out.println("请输入学生的姓名");
        String name = scanner.next();
        student.setName(name);
        System.out.println("请输入学生的年龄");
        int age = scanner.nextInt();
        student.setAge(age);
        System.out.println("请输入学生的地址");
        String address = scanner.next();
        student.setAddress(address);

        list.add(student);
        System.out.println("添加成功");
    }
```

```java
//判断id是否存在的方法
    public static boolean StudentById(ArrayList<Student> list,int id){
        for (int i = 0 ;i<list.size();i++){
            Student student = list.get(i);
            int id1 = student.getId();
            if (id1 == id){
                return true;
            }
        }
        return false;
    }
```

### 查询功能

打印所有的学生信息，需要满足以下要求

如果没有学生信息，提示：当前无学生信息，请添加后查询

如果有学生信息，需要按照以下格式输出(不用过于纠结对齐的问题)

![image-20230319234910405](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230319234910405.png)

我们将数据存在哪?Arraylist集合中，所以需要在死循环外面定义一个集合用来存储数据

```java
	//查询学生
    public static void selectStudent(ArrayList<Student> list){
        //System.out.println("查询学生");
        if (list.size() == 0){
            System.out.println("当前无学生信息，请添加后查询");
            //结束方法
            return;
        }
        //打印表头信息
        System.out.println("id\t\t姓名\t年龄\t家庭住址");
        //当代码执行到这里，表示集合中是有数据的
        for (int i = 0 ;i< list.size();i++){
            Student student = list.get(i);
            System.out.println(student.getId()+"\t"+student.getName()+"\t"+student.getAge()+"\t"+student.getAddress());
        }
    }
```

### 删除功能

键盘录入要删除的学生id，需要满足以下需求:

id存在删除

id不存在，需要提示不存在，并回到初始菜单

```java
 //id获取索引的方法
    public static int getIndex(ArrayList<Student> list,int id){
        //遍历集合
        for (int i = 0 ;i< list.size();i++){
            //得到每一个学生对象
            Student student = list.get(i);
            //得到每一个学生对象的id
            int id1 = student.getId();
            //拿着集合中学生对象的id和要删除的id做比较
            if (id1 == id){
                //如果一样返回索引
                return i;
            }
        }
        //如果循环完了都没有找到索引，就表示不存在,返回-1
        return -1;
    }
```

```java
//删除学生
    public static void deleteStudent(ArrayList<Student> list){
        //System.out.println("删除学生");
        Scanner scanner = new Scanner(System.in);
        System.out.println("请输入要删除学生的id:");
        int id = scanner.nextInt();
        //查询id在集合中的索引
        int index = getIndex(list, id);
        //对index进行判断
        //如果-1，就表示不存在，结束方法，回到初始菜单
        if (index >= 0){
            //如果大于等于0,表示存在，直接删除
            list.remove(index);
            System.out.println("id为:"+id+"删除成功");
        }else {
            System.out.println("id不存在，删除失败");
        }

    }
```

### 修改功能

键盘录入要修改的学生id，需要满足以下要求 

id存在，继续录入其他信息

id不存在，需要提示不存在，并回到初始菜单

```java
	//修改学生
    public static void updateStudent(ArrayList<Student> list){
        //System.out.println("修改学生");
        Scanner scanner = new Scanner(System.in);
        System.out.println("请输入您想要修改的学生id:");
        int id = scanner.nextInt();
        //判断id是否存在
        int index = getIndex(list, id);
        if (index == -1){
            System.out.println("要修改的id不存在请重新输入");
        }
        //获取当前要修改的学生对象
        Student stu = list.get(index);
        //id存在可以进行操作
        System.out.println("请输入要修改的学生姓名");
        String name = scanner.next();
        stu.setName(name);
        System.out.println("请输入要修改的学生年龄");
        int age = scanner.nextInt();
        stu.setAge(age);
        System.out.println("请输入要修改的学生地址");
        String address = scanner.next();
        stu.setAddress(address);
        list.set(index,stu);
        System.out.println("修改学生成功");
    }
```

