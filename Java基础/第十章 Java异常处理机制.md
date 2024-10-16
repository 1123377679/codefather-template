# 第十章 Java异常处理机制
# 异常

## 异常的概述

### 什么是异常？

- 异常是程序在“编译”或者“执行”的过程中可能出现的问题，**注意**：语法错误不算在异常体系中。 

- 比如：数组索引越界、空指针异常、日期格式化异常，等…

### 为什么要学习异常？

- 学习异常是为了处理异常，并不是不会出现异常

- 异常一旦出现了，如果没有提前处理，程序就会退出JVM虚拟机而终止

- ```java
  int[] arr = {10,20,30};
  System.out.println(arr[0]);
  System.out.println(arr[1]);
  System.out.println(arr[2]);
  System.out.println(arr[3]);
  System.out.println("程序截止");
  ```

- 研究异常并且避免异常，然后提前处理异常，体现的是程序的安全，健壮性。

### 异常体系

![image-20230207161934928](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202304181523964.png)

`Error`：代表的系统级别错误(属于严重问题),系统一旦出现问题，sun公司会把这些错误封装成Error对象,Error是给sun公司自己用的，不是给我们程序员用的，因此我们开发人员不用管它。



`Exception`:叫做异常，代表程序可能出现的问题。 我们通常会用Exception以及他的子类来封装程序出现的问题

`运行时异常`：RuntimeException及其子类，编译阶段不会出现异常提醒，运行时出现的	异常(如：数组索引越界异常)

`编译时异常`：编译阶段就会出现异常提醒。(如：日期解析异常)

### 总结：

1.异常是什么？

- 异常是代码在编译或者执行的过程中可能出现的错误

2.异常分为几类？

- 编译时异常、运行时异常
- 编译时异常：编译阶段就会出错。
- 运行时异常：编译阶段不会出错，运行报错

3.学习异常的目的？

- 避免异常的出现，同时处理可能出现的异常，让代码更稳健

## 运行时异常

在程序运行的时候会报错

### 运行时异常示例

- 数组索引越界异常：ArrayIndexOutOfBoundsException

- 空指针异常：NullPointerException,直接输出没有问题，但是调用空指针的变量的功能就会报错。

- 数学操作异常：ArithmeticException

- 类型转换异常：ClassCastException

- 数字转换异常：NumberFormatException

`运行时异常:`一般是程序员业务没有考虑好或者是编程逻辑不严谨引起的程序错误。

**演示：**

```java
//1.数组索引越界异常:ArrayIndexOutOfBoundsException
int[] arr = {1,2,3};
System.out.println(arr[0]);
System.out.println(arr[1]);
System.out.println(arr[2]);
System.out.println(arr[3]);
System.out.println("--------------编译结束--------------");
```

```java
//2.空指针异常:NullPointerException。直接输出没有问题，但是会调用空指针的变量的功能就会报错
String name = null;
System.out.println(name);
System.out.println(name.length());
```

```java
//类型转换异常
Object o = 23;
String s = (String) o;
```

```java
//数学操作异常
int c = 10/0;
```

```java
//数字转换异常
String number = "23aabbc";
Integer it  = Integer.valueOf(number);
System.out.println(it + 1);
```

## 编译时异常

编写代码的时候就会报错

**演示：**

```java
String date = "2022-1-21 17:20:00";
//创建一个简单日期格式化类
SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
//解析字符串时间成为日期对象
Date d = sdf.parse(date);
System.out.println(d);
```

### 编译时异常的作用是什么？

- 担心程序员的技术不行，在编译阶段就爆出一个错误，目的在于提醒不要出错

### 总结

编译时异常的特点

- 编译时异常：没有继承runtimeException的异常就是编译时异常
- 编译阶段报错，必须处理，否则代码不通过

## 异常的默认处理机制

默认会在出现异常的代码那里自动的创建一个异常对象：ArithmeticException。

异常会从方法中出现的点这里抛出给调用者，调用者最终抛出给JVM虚拟机。

虚拟机接收到异常对象后，先在控制台直接输出异常栈信息数据。

直接从当前执行的异常点干掉当前程序。

后续代码没有机会执行了，因为程序已经死亡。

```java
public static void main(String[] args) {
        System.out.println("程序开始执行");
        chu(10,0);
        System.out.println("程序结束执行");
    }
    public static void chu(int a , int c) {
        System.out.println(a);
        System.out.println(c);
        int b = a / c;
        System.out.println(b);
    }
```

## 编译时异常的处理机制

编译时异常是编译阶段就出错的，所以必须处理，否则代码根本无法通过

**编译时异常的处理形式有三种**

出现异常直接抛出去给调用者，调用者也继续抛出去。

出现异常自己捕获处理，不麻烦别人。

前两者结合，出现异常直接抛出去给调用者，调用者捕获处理。

### 异常处理方式1-throws

- throws:用在方法上，可以将方法内部出现的异常抛出去给本方法的调用者处理。
- `这种方式并不好，发生异常的方法自己不处理异常，如果异常最终抛出去给虚拟机将引起程序死亡。`

抛出异常格式:

```java
方法 throws异常1，异常2，异常3{

}
```

规范做法:

```java
方法 throws Exception{

}
```

代码演示:

```java
public static void main(String[] args)  {
        System.out.println("------程序开始-----");
        parseTime("2022/12-1 18:00:00");
        System.out.println("------程序结束-----");

    }
    public static void parseTime(String date)  {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH-mm-ss");
        Date d = sdf.parse(date);
        System.out.println(d);
        
        InputStream is = new FileInputStream("E://xxx");
    }
```

### 异常处理方式2-try...catch...

监视捕获异常，用在方法内部，可以将方法内部出现的异常直接捕获处理

`这种方式还可以，发生异常的方法自己独立完成异常的处理，程序可以继续往下执行`

格式:

```java
try{
	//监视可能出现异常的代码
}catch(异常类型1 变量){
	//处理异常
}catch(异常类型2 变量){
	//处理异常
}....
```

建议格式:

```java
try{
	//监视可能出现异常的代码
}catch(Exception e){
	e.printStackTrace();
}
```

代码演示：

```java
public static void main(String[] args) throws ParseException {
        System.out.println("------程序开始-----");
        parseTime("2022/12-1 18:00:00");
        System.out.println("------程序结束-----");
 
    }
    public static void parseTime(String date) throws ParseException {
        try {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH-mm-ss");
            Date d = sdf.parse(date);
            System.out.println(d);
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }
```

### 异常处理方式3-前两者结合

- 方法直接将异常通过throws抛出去给调用者
- 调用者收到异常后直接捕获处理(try...catch)

```java
 public static void main(String[] args) {
        System.out.println("------程序开始-----");
        try {
            parseTime("2022/12-1 18:00:00");
            System.out.println("功能操作成功");
        } catch (ParseException e) {
            e.printStackTrace();
            System.out.println("功能操作失败");
        }
        System.out.println("------程序结束-----");
    }

    public static void parseTime(String date) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH-mm-ss");
        Date d = sdf.parse(date);
        System.out.println(d);
    }
```

### 总结

- 在开发中按照规范来说第三种方式是最好的，底层的异常抛出去给最外层，最外层集中处理
- 实际应用中，只要代码能够编译通过，并且功能完成，那么每一种异常处理方式似乎也是可以的

## 运行时异常的处理形式

- 运行时异常编译阶段不会出错，是运行时才可能出错，所以编译阶段不处理也是可以的
- 按照规范建议还是处理：建议在最外层调用处集中捕获处理即可

代码演示:

```java
public static void main(String[] args) {
        System.out.println("----程序开始-----");
        try {
            sum(10,0);
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("----程序结束-----");
    }
    public static void sum(int a,int b){
        int c = a/b;
        System.out.println(c);
    }
```

## 异常处理使代码更加稳健的案例

需求:

- 键盘录入一个合理的价格为止(必须是数值，值必须大于0)

分析:

定义一个死循环，让用户不断的输入价格

## 异常中的常见方法

Throwable的成员方法

| 方法名称                      | 说明                            |
| ----------------------------- | ------------------------------- |
| public String getMessage()    | 返回此throwable的详细消息字符串 |
| public String toString()      | 返回此可抛出的简短描述          |
| public void printStackTrace() | 把异常的错误信息输出在控制台    |

案例演示:

```java
int[] arr = {1,2,3,4,5,6};
System.out.println(arr[10]);
System.out.println("看看我执行没有");
```

## 抛出异常

### throws

注意:写在方法定义处，表示声明一个异常

告诉调用者，使用本方法可能会有哪些异常

```java
public void 方法名() throws 异常类名1，异常类名2{
	...
}
```

编译时异常：必须要写

运行时异常：可以不写

### throw

注意：写在方法内，结束方法

手动抛出异常对象，交给调用者

方法中下面的代码不再执行了

```java
public void 方法名(){
	throw new NullPointerException();
}
```

案例演示:

需求:定义一个方法求数组中的最大值

## 综合练习

需求：

键盘录入自己心仪的女朋友或者男朋友姓名和年龄。

姓名的长度在2-10之间，

年龄的范围为18-40岁，

超出这个范围是异常数据不能赋值，需要重新录入，一直录到正确为止。

需要使用到javaBean类

提示：

需要考虑用户在键盘录入时的所有情况。

比如：录入年龄时超出范围，录入年龄时录入了abc等情况

## 自定义异常

- 定义异常类
- 写继承关系
- 空参构造
- 带参构造

意义：就是为了让控制台的报错信息更加的见名知意

```java
package d5_Throwable;

public class NameFormatException extends RuntimeException{
    public NameFormatException() {
        super();
    }

    public NameFormatException(String message) {
        super(message);
    }
}
```

```java
package d5_Throwable;

public class AgeOutofBoundsException extends RuntimeException{
    public AgeOutofBoundsException() {
        super();
    }

    public AgeOutofBoundsException(String message) {
        super(message);
    }
}

```

```java
package d5_Throwable;

public class GirlFriend {
    private String name;
    private int age;

    public GirlFriend(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public GirlFriend() {
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
        if (name.length()>10 || name.length()<3){
            throw new NameFormatException(name + "格式有误，长度应该为 3 ~ 10");
        }
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
        if (age <18 || age>40){
            throw new ArrayIndexOutOfBoundsException(age + "超出了范围");
        }
        this.age = age;
    }

    public String toString() {
        return "GirlFriend{name = " + name + ", age = " + age + "}";
    }
}

```

```java
package d5_Throwable;

import java.util.InputMismatchException;
import java.util.Scanner;

public class Test4 {
    //综合练习
    public static void main(String[] args) {
        while (true) {
            try {
                Scanner scanner = new Scanner(System.in);
                GirlFriend girlFriend = new GirlFriend();
                System.out.println("请输入您女朋友或者男朋友的名字:");
                String name = scanner.next();
                girlFriend.setName(name);
                System.out.println("请输入您女朋友或者男朋友的年龄:");
                int age = scanner.nextInt();
                girlFriend.setAge(age);
                System.out.println(girlFriend);
                break;
            } catch (AgeOutofBoundsException e) {
               e.printStackTrace();
            } catch (NameFormatException e){
                e.printStackTrace();
            }
        }
    }
}

```

## 云课案例

### 使用异常解决分苹果问题

#### 挑战目标

之前的章节中我们学过分苹果问题的实验，在该实验的基础上我们来完成一个挑战。分苹果操作过程中需要输入两次数值，一是苹果数量，二是孩子数量。

那么输入这两个数值会存在的问题是：

1. 苹果数量和孩子数量**必须是 int 整型数字**
2. 孩子数量**不能为 0**

接下来需要你**使用异常处理方式**解决以上两个问题。

#### 挑战要求

需要采用捕获方式进行异常处理：

1. 当输入苹果或孩子数量为**非整型数值**时，需要进行 `java.util.InputMismatchException` 异常处理，捕获后并输出字符串 **“苹果数量和孩子人数必须为整数值！”**；
2. 当输入孩子数量为 **0** 时，需要进行 `java.lang.ArithmeticException` 异常处理，捕获异常后并输出字符串 **“孩子人数不能为零！”**；
3. 异常捕获后输出的字符串必须按照以上 👆 要求的字符串进行书写，不能随意扩展

#### 挑战准备

1. 在 `/home/project` 目录中创建 `DivideApples.java` 文件

![图片描述](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202304250951561.png)

1. 以下提供的是基础代码，你可以在 `divide()` 方法中，对原有的代码进行异常处理操作。请按照基础代码的结构，以及类中的方法名和调用方式进行书写，不然可能会影响到挑战无法通过。

```java
import java.util.Scanner;

public class DivideApples {
    //苹果数
    int appleNum = 0;
    //学生数
    int stuNum = 0;
 public void divide() {
        System.out.println("**_现在给孩子们分苹果_**");
        Scanner input = new Scanner(System.in);
        System.out.print("请输入桌子上有几个苹果：");
        appleNum = input.nextInt();
        System.out.print("请输入班上有几个孩子：");
        stuNum = input.nextInt();
        System.out.println("班上每个孩子分得多少苹果：" + appleNum / stuNum);
        System.out.println("孩子们非常开心！");
    }
    public static void main(String[] args) {
        new DivideApples().divide();
    }
}
```

#### 挑战运行效果

你可以参考下面的步骤验证挑战结果，最终点击「提交检测」。

![图片描述](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202304250951984.png)



### 采用 finally 释放 Scanner 资源

#### 挑战介绍

使用异常捕获结构中的 finally 子句来释放 Scanner 类申请的内存空间。

#### 知识点

- 异常捕获
- finally 语句使用

#### 挑战目标

上一个挑战完成的任务大家还记得吗？我们使用了异常捕获的方式解决了分苹果问题。

当时是通过 Scanner 类传入苹果数量和孩子数量，为了避免输入的数据引起 `RuntimeException` 异常，所以做了异常捕获处理。

那么之前类中创建的 `Scanner` 对象，存在一个问题：

- 没有关闭，也就是 `Scanner` 对象资源没有释放；
- 然而在 `divide` 方法结束后，`Scanner` 对象虽然会进入被回收的队列中，但不是立刻回收，而这会给计算机带来一定的负担。

为了避免造成大量的内存占据，我们需要将不在使用的内存空间得到及时的释放。

#### 挑战要求

使用 `finally` 子句释放 `Scanner` 对象申请的内存空间：

1. 程序执行时输入**正确的苹果数量和孩子人数**情况下，需要**关闭 `Scanner` 对象**；
2. 程序执行时输入**不正确的苹果数量和孩子人数**情况下，也需要**关闭 `Scanner` 对象**；
3. 释放资源需要使用 `Scanner` 类中提供的 `close()` 方法。
4. 释放后同时输出字符串 “**Scanner 对象进行释放**” 表示已进入 `finally` 语句块。
5. 要求输出的字符串必须按照以上 👆 要求进行书写，不能随意扩展。

#### 挑战准备

1. 在 `/home/project` 目录中创建 `DivideApplesFinally.java` 文件

![图片描述](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202304251002246.png)

1. 以下提供的是基础代码，你可以在 `divide()` 方法中，对原有的代码进行 `Scanner` 对象申请的内存空间进行释放。请按照基础代码的结构，包括类中的方法名、方法返回类型和调用方式进行书写，不然可能会影响到挑战无法通过。

```java
import java.util.Scanner;

public class DivideApplesFinally {
    //苹果数
    int appleNum = 0;
    //学生数
    int stuNum = 0;
    public String divide() {
        System.out.println("**_现在给孩子们分苹果_**");
        Scanner input = new Scanner(System.in);
        try{
            System.out.print("请输入桌子上有几个苹果：");
            appleNum = input.nextInt();
            System.out.print("请输入班上有几个孩子：");
            stuNum = input.nextInt();
            System.out.println("班上每个孩子分得多少苹果：" + appleNum / stuNum);
            return "孩子们非常开心！";
        }catch(RuntimeException e){
            return "请输入正确的苹果数量和孩子人数";
        }
    }
    public static void main(String[] args) {
        System.out.println(new DivideApplesFinally().divide());
    }
}
```

#### 挑战运行效果

你可以参考下面的步骤验证挑战结果，最终点击「提交检测」。

![图片描述](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202304251002887.png)

### 主动抛出异常继续解决分苹果问题

#### 挑战介绍

使用关键字 throw 主动抛出异常继续来解决分苹果问题。

#### 知识点

- 主动抛异常
- 关键字 throw

#### 挑战目标

我们需要延续上一个挑战的内容，可以更好的来完善解决分苹果。

你在编写分苹果挑战的代码时，是否考虑过一个问题：

当输入的苹果数量为 **0** ，孩子人数为 5 时，程序不会报错，能正常执行结果会输出 👇

![图片描述](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202304251004185.png)

很显然这样的结果对于程序代码而言是合法的，但对于常理来说是不合理的，孩子们都没有分到苹果，又怎么会非常开心呢，对吧！因此本次挑战中我们需要来解决该问题。

#### 挑战准备

1. 在 `/home/project` 目录中创建 `DivideApplesThrow.java` 文件

![图片描述](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202304251004562.png)

1. 以下提供的是基础代码，你可以在 `divide()` 方法中，对原有的代码进行**主动抛异常处理**。请按照基础代码的结构，包括类中的方法名、方法返回类型和调用方式进行书写，不然可能会影响到挑战无法通过。

```java
import java.util.Scanner;

public class DivideApplesThrow {
    //苹果数
    int appleNum = 0;
    //学生数
    int stuNum = 0;
    public String divide() {
        System.out.println("**_现在给孩子们分苹果_**");
        Scanner input = new Scanner(System.in);
        try{
            System.out.print("请输入桌子上有几个苹果：");
            appleNum = input.nextInt();
            System.out.print("请输入班上有几个孩子：");
            stuNum = input.nextInt();
            System.out.println("班上每个孩子分得多少苹果：" + appleNum / stuNum);
            return "孩子们非常开心！";
        }catch(RuntimeException e){
            return "苹果数量和孩子人数必须为整数值";
        }finally{
            input.close();
            System.out.println("Scanner 对象进行释放");
        }
    }
    public static void main(String[] args) {
        System.out.println(new DivideApplesThrow().divide());
    }
}
```

#### 挑战要求

使用关键字 throw 主动抛出异常来解决以上所描述的问题：

1. 当代码中传入的 `appleNum` 为 `0` 时，需要使用 `throw` 主动抛出 `RuntimeException` 异常对象;
2. 在主动抛出 `RuntimeException` 异常对象时，需要带上异常反馈信息 “**苹果数量不能为零，否则孩子们要失望了**”，在此可以使用构造器传递异常反馈信息；
3. 异常反馈信息可以通过异常对象的方法 `getMessage()` 进行信息获取；
4. 程序中可能会出现 3 种不同的异常，需要通过多个 `catch` 语句块来捕获不同的异常对象，返回不同的异常信息：
   - 当捕获 `InputMismatchException` 异常时，返回异常信息字符串为 “**苹果数量和孩子人数必须为整数值**” ；
   - 当捕获 `ArithmeticException` 异常时，返回异常信息字符串为 “**孩子人数不能为零**” ；
   - 当捕获 `RuntimeException` 异常时，返回异常信息字符串为 “**苹果数量不能为零，否则孩子们要失望了**” 。
5. 要求输出的字符串必须按照以上 👆 要求进行书写，不能随意扩展。

#### 挑战运行效果

你可以参考下面的步骤验证挑战结果，最终点击「提交检测」。

![图片描述](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202304251004379.png)

### 采用抛出异常的处理方式解决分苹果问题

#### 挑战介绍

采用关键字 `throws` 抛出异常的处理方式解决分苹果问题。

#### 知识点

- 异常处理方式-抛出异常
- throws
- throw
- try { } catch() { } finally { }

#### 挑战目标

使用异常处理方式中的另一种方式**抛出异常**，就是采用关键字 `throws` 来实现之前分苹果挑战中所需解决的全部问题，本次挑战只提供最初始的代码，因此所有的逻辑处理代码都需要你来书写，你需要回顾一下之前所学的知识，来完成本次挑战。

#### 挑战要求

需要采用**抛出异常方式**解决分苹果的问题，需要实现的内容如下：

1. 基础代码中已提供 `divide()` 方法，需要采用 `throws` 关键字进行异常抛出处理。
2. 需要处理的异常仍然包括：
   - 当 `appleNum` 获取的值为 `0` 时，需要使用 `throw` 主动抛出 `RuntimeException` 异常对象；
   - 当 `appleNum` 和 `stuNum` 获取的值为非整型数值时，系统会抛出 `InputMismatchException `异常对象；
   - 当 `stuNum` 获取的值为 `0` 时，系统会抛出 `ArithmeticException` 异常对象。
3. 通过 `throws` 抛出的异常会在最后**方法调用处进行捕获处理**。
4. `Scanner` 对象完成操作后需要进行**资源释放**，可以在类中添加一个 `scannerClose()` 方法，用来进行对象释放操作，最后在异常捕获时在 `finally` 语句块中执行。
5. 异常信息反馈，可以通过使用 `getMessage()` 方法进行信息输出。
6. 输出的信息字符串必须按照以下 👇 内容要求进行书写，不能随意扩展。
   - 捕获 `InputMismatchException `异常时，输出字符串 “**苹果数量和孩子人数必须为整数值**”；
   - 捕获 `ArithmeticException` 异常时，输出字符串 “**孩子人数不能为零**”；
   - 捕获 `RuntimeException` 异常时，输出字符串 “**苹果数量不能为零，否则孩子们要失望了**”；
   - `Scanner` 对象资源关闭后，输出字符串 “**Scanner 对象进行释放**”；
   - 正常情况下，输出字符串 “**孩子们非常开心！**”。

#### 挑战准备

1. 在 `/home/project` 目录中创建 `DivideApplesThrows.java` 文件。

![图片描述](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202304251002854.png)

1. 以下提供的是基础代码，你可以在此基础上进行改动，采用抛出异常方式解决分苹果所有问题。请参照基础代码的结构进行书写，不然可能会影响到挑战无法通过。

```java
import java.util.Scanner;

public class DivideApplesThrows {
    //苹果数
    int appleNum = 0;
    //学生数
    int stuNum = 0;
    public void divide() {
        System.out.println("**_现在给孩子们分苹果_**");
        Scanner input = new Scanner(System.in);
        System.out.print("请输入桌子上有几个苹果：");
        appleNum = input.nextInt();
        System.out.print("请输入班上有几个孩子：");
        stuNum = input.nextInt();
        System.out.println("班上每个孩子分得多少苹果：" + appleNum / stuNum);
        System.out.println("孩子们非常开心！");
    }
    public static void main(String[] args) {
        new DivideApplesThrows().divide();
    }
}
```

#### 挑战运行效果

你可以参考下面的步骤验证挑战结果，最终点击「提交检测」。

![图片描述](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202304251002798.png)

### 实现异常处理

#### 挑战介绍

使用本章所学的异常处理技术解决以下代码中的异常问题。

#### 知识点

- try-catch
- throws
- throw

#### 挑战目标

异常处理有两种方式，捕获和抛出异常，你可以采用其中一种方式或是两者结合，同时也可采用主动抛出异常配合进行异常处理。

#### 挑战准备

1. 在 `/home/project` 目录下新建 `DataException.java` 源文件。

   ![图片描述](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202304251004884.png)

2. 以下提供的是基础代码，你可以在此基础上进行改动，需要采用异常方式进行异常处理。请参照基础代码的结构进行书写，不然可能会影响到挑战无法通过。

   ```java
   public class DataException {
   
       // 数据获取
       public void getData(Object[] objs){
   
           ### 代码实现 ###
   
       }
   
       public static void main(String[] args){
           DataException de = new DataException();
           de.getData(new Object[]{new BService(), new AService(), new BService(), new AService() , new BService(), new AService()});
           System.out.println("-----------------");
           de.getData(new Object[]{new BService(), new AService(), new BService(), new AService() , new String(), new BService()});
           System.out.println("-----------------");
           de.getData(new Object[]{new BService(), new AService(), new BService(), new AService()});
       }
   }
   
   interface IModuleService{
       void method1();
   }
   class AService implements IModuleService{
   
       @Override
       public void method1() {
           System.out.println("AService");
       }
   
       public void methodA(){
           System.out.println("AService methodA()");
       }
   
   }
   
   class BService implements IModuleService{
       @Override
       public void method1() {
           System.out.println("BService");
       }
   
       public void methodB(){
           System.out.println("BService methodB()");
       }
   }
   ```

#### 挑战要求

基础代码中提供了 `IModuleService` 接口，以及 `2` 个接口实现类 `AService` 和 `BService` ，他们分别实现了接口中的 `method1()` 方法，`AService` 类中提供了 `methodA()` 方法，`BService` 类中提供了 `methodB()` 方法；在 `DataException` 类 `main()` 方法中提供了测试代码，分别调用 `getData()` 方法三次，传入不同的参数，请仔细查看基础代码。 👀

接下来，在 DataException 类中完成 getData() 方法的功能，要求如下：

1. 需要定义类型为 IModuleService 的数组，**长度为 6**。
2. 当 getData() 方法传入的参数长度和创建的数组长度不一致时，可以主动抛出异常，显示信息为 “**参数 objs 数组个数未达到 6 ！**”
3. getData() 方法传入的参数需要赋值给 IModuleService 数组的数组元素，因此类型应该是 IModuleService 类型，当类型不匹配时，显示信息为 “**参数传入的数据类型不正确，不是 IModuleService 接口子类！**”。
4. 需要通过循环将 IModuleService 类型的数组遍历数组元素进行操作，当数组元素为 null 时，可以忽略本次循环剩下的语句，执行下一轮操作。
5. 不论数组元素类型为 AService 或 BService，都可以访问 method1() 方法；当数组元素对象为 AService，可以访问类中的 methodA() 方法；当数组元素对象为 BService，可以访问类中的 methodB() 方法。
6. **类名、方法名，以及输出的信息**必须按照要求内容要求进行书写，不能随意扩展，结果可以参考「**挑战运行效果图**」。

🌟 **提示**：本挑战需处理的异常主要是 `ArrayIndexOutOfBoundsException` 和 `ClassCastException` 。

#### 挑战运行效果

你可以参考下面的步骤验证挑战结果，最终点击「提交检测」。

![图片描述](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202304251004486.png)



















