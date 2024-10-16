# 第十三章 IO流
# java为什么要学习？

目前是怎么样存储数据的？弊端是什么？

计算机中，有没有一个硬件可以永久存储数据的?

# 学习思路?

1.先要定位文件

- File类可以定位文件:进行删除，获取文本本身信息等操作

2.读写文件数据

- IO流技术可以对硬盘中的文件进行读写

3.今日总体学习思路

- 先学会使用File类定位文件以及操作文件本身
- 然后学习IO流读写文件数据

# 关于File、io流，同学们需要学会什么？

file类的使用

能够使用file的对象操作文件，如：删除获取文件信息，创建文件夹等

IO流的作用、分类：能够使用io流完成文件数据的读写操作

# File类

## file类的概述

file类是在包java.io.file下、代表操作系统的文件对象(文件、文件夹)

file类提供了诸如：定位文件，获取文件本身的信息、删除文件、创建文件(文件夹)等功能

## File类创建对象

| 方法名称                                  | 说明                                               |
| ----------------------------------------- | -------------------------------------------------- |
| public File(String pathname)              | 根据文件路径创建文件对象                           |
| public File(String parent , String child) | 从父路径名字字符串和子路径名字符串创建文件对象     |
| public File(File parent,String child)     | 根据父路径对应文件对象和子路径名字符串创建文件对象 |

```java
1.创建File对象(指定了文件的路径)
File f = new File("指定的文件路径");
long size = f.length();//文件的字节大小
System.out.println(size);
```

File创建对象，支持绝对路径，支持相对路径(重点)

```java
File f1 = new File("D:\\xxxx\\xxx.jpg");//绝对路径
System.out.println(f1.length());
```

```java
//相对路径：一般定位模块中的文件的，相对到工程下
File f2 = new File("工程名/src/xxx.txt")；
```

```java
//3.File创建对象，可以是文件也可以是文件夹
File f3 = new File("D:\\文件夹名");
System.out.pritnln(f3.exists());//判断这个路径是否存在，这个文件夹存在否
```

总结：

File对象可以定位文件和文件夹

File封装的对象仅仅是一个路径名，这个路径也是可以存在的，也可以是不存在的

绝对路径和相对路径：

- 绝对路径是从盘符开始
- 相对路径是不带盘符，默认直接到当前工程下的目录寻找文件

## File类的常用Api

### File类的判断文件类型、获取文件信息功能

| 方法名称                        | 说明                                       |
| ------------------------------- | ------------------------------------------ |
| public boolean isDirectory()    | 测试此抽象路径名表示的File是否为文件夹     |
| public boolean isFile()         | 测试此抽象路径名表示的File是否为文件夹     |
| public boolean exists()         | 测试此抽象路径名表示的File是否存在         |
| public String getAbsolutePath() | 返回此抽象路径名的绝对路径名字符串         |
| public String getPath()         | 将此抽象路径名转换为路径名字符串           |
| public String getName()         | 返回由此抽象路径名表示的文件或文件夹的名称 |
| public long lastModified()      | 返回文件最后修改的时间毫秒值               |

案例:

```java
//1.绝对路径创建一个文件对象
//2.获取它的绝对路径
//3.获取文件定义的时候使用的路径
//4.获取文件的名称:带后缀
//5.获取文件的大小；字节个数
//6.获取文件的最后修改时间
//7.判断文件是文件还是文件夹
```

### File类创建文件的功能

| 方法名称                               | 说明                 |
| -------------------------------------- | -------------------- |
| public boolean createNewFile()几乎不用 | 创建一个新的空的文件 |
| public boolean mkdir()                 | 只能创建一级文件夹   |
| public boolean mkdirs()                | 可以创建多级文件夹   |

### File类删除文件的功能

| 方法名称                | 说明                                   |
| ----------------------- | -------------------------------------- |
| public boolean delete() | 删除由此抽象路径名表示的文件或空文件夹 |

delete方法直接删除不走回收站；如果删除的是一个文件，且文件没有被占用则直接删除

delete方法默认值能删除空文件夹

### 遍历文件夹

File类的遍历功能

| 方法名称                        | 说明                                                         |
| ------------------------------- | ------------------------------------------------------------ |
| public String[] list()          | 获取当前目录下所有的"一级文件名称"到一个字符串数组中去返回   |
| public File[] listFiles()(常用) | 获取当前目录下所有的"一级文件对象"到一个文件对象数组中去返回(重点) |

listFiles方法注意事项:

- 当调用者不存在时，返回null
- 当调用者是一个文件时，返回null
- 当调用者是一个空文件夹时，返回一个长度为0的数组
- 当调用者是一个有内容的文件夹时，将里面所有文件和文件夹的路径放在File数组中返回
- 当调用者是一个有隐藏文件的文件夹时，将里面所有文件和文件夹的路径放在File数组中返回，包含隐藏内容

# IO流

## IO流是什么？

IO流也称为输入、输出流，就是用来读写数据的

I表示intput，是数据从硬盘文件读入到内存的过程，称之输入，负责读

O表示output，是内存程序的数据从内存到写出到硬盘文件的过程，称之输出，负责写

## IO流的分类

![image-20230124175529993](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202305230839648.png)

纯文本文件：windows自带的记事本打开能读懂

总结流的四大分类：

- 字节输入流：以内存为基准，来自磁盘文件/网络中的数据以字节的形式读入到内存中去的流称为字节输入流。

- 字节输出流：以内存为基准，把内存中的数据以字节写出到磁盘文件或者网络中去的流称为字节输出流。

- 字符输入流：以内存为基准，来自磁盘文件/网络中的数据以字符的形式读入到内存中去的流称为字符输入流。
- 字符输出流：以内存为基准，把内存中的数据以字符写出到磁盘文件或者网络介质中去的流称为字符输出流。



## 总结

**1．什么是IO流?**

存储和读取数据的解决方案

i: intput 

o: output

流:像水流一样传输数据

**2.IO流的作用?**

用于读写数据（本地文件，网络)

**3.IO流按照流向可以分类哪两种流?**

![image-20230124180112879](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202305231409749.png)

**4.IO流按照操作文件的类型可以分类哪两种流？**

字节流：可以操作所有类型的文件

字符流：只能操作纯文本文件

**5.什么是纯文本文件？**

用Windows系统自带的记事本打开并且能读懂的文件

.txt,.md,.xml等文件

## IO流体系（重点）

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202305230847977.png)	

这四个都是抽象类

不能直接创建对象

## FileInputStream

操作本地文件的字节输入流，可以把本地文件中的数据读取到程序中来

| 构造器                                  | 说明                               |
| --------------------------------------- | ---------------------------------- |
| public FileInputStream(File file)       | 创建字节输入流管道与源文件对象接通 |
| public FileInputStream(String pathname) | 创建字节输入流管道与源文件路径接通 |

| 方法名称                       | 说明                                                   |
| ------------------------------ | ------------------------------------------------------ |
| public int read()              | 每次读取一个字节返回，如果字节已经没有可读的返回-1     |
| public int read(byte[] buffer) | 每次读取一个字节数组返回，如果字节已经没有可读的返回-1 |

**书写步骤：**

1.创建字节输入流对象

2.获取数据

3.释放资源

**代码实现：**

```java
	    //最初的写法
        // InputStream inputStream = new FileInputStream(new File("javaSpace\\project\\src\\IO\\1.txt"));
        //现在的写法
        InputStream inputStream = new FileInputStream("project\\src\\IO\\1.txt");
        //每次读取一个字节返回，如果字节已经没有可读的返回-1
        int read = inputStream.read();
        System.out.println((char) read);
        //使用循环改进
        int b;
        while ((b = inputStream.read()) != -1){
            System.out.println((char)b);
        }
```

```java
	InputStream inputStream = new FileInputStream("project\\src\\IO\\1.txt");
        //定义一个字节数组，用于读取字节数组
        // byte[] bytes = new byte[3];
        // int read = inputStream.read(bytes);
        // System.out.println("读取了几个字节:"+read);
        // //转码
        // String s = new String(bytes);
        // System.out.println(s);
        //
        // int read1 = inputStream.read(bytes);
        // System.out.println("读取了几个字节:"+read1);
        // //转码
        // String s1 = new String(bytes,0,read1);
        // System.out.println(s1);
        //
        // int read2 = inputStream.read(bytes);
        // System.out.println("读取了几个字节:"+read2);
        // //转码
        // String s2 = new String(bytes,0,read2);
        // System.out.println(s2);

        //改进使用循环
        byte[] bytes = new byte[3];
        int len;//记录每次读取的字节数
        while ((len = inputStream.read(bytes))!= -1){
            System.out.println(new String(bytes,0,len));
        }
```

读取的性能得到了提升

读取中文字符输出无法避免乱码问题

**如何使用字节输入流读取中文内容输出不乱码呢?**

- 定义一个与文件一样大的字节数组，一次性读取完文件的全部字节

直接把文件数据全部读取到一个字节数组可以避免乱码，是否存在问题?

- 如果文件过大，字节数组可能引起内存溢出

目标：使用文件字节输入流一次读完文件的全部字节，可以解决乱码问题

```java
 	    File file = new File("project\\src\\IO\\1.txt");
        InputStream inputStream = new FileInputStream(file);
        byte[] bytes = new byte[(int) file.length()];
        inputStream.read(bytes);
        System.out.println(new String(bytes));
```

## FileOutputStream

操作本地文件的字节输出流，可以把程序中的数据写到本地文件中

| 构造方法                                                 | 说明                                             |
| -------------------------------------------------------- | ------------------------------------------------ |
| public FileOutputStream(File file)                       | 创建字节输出流管道与源文件对象接通               |
| public FileOutputStream(String filepath)                 | 创建字节输出流管道与源文件路径接通               |
| public FileOutputStream(File file,boolean append)        | 创建字节输出流管道与源文件对象接通，可以追加数据 |
| public FileOutputStream(String filepath, boolean append) | 创建字节输出流管道与源文件路径接通，可以追加数据 |

| 方法名称                                             | 说明                       |
| ---------------------------------------------------- | -------------------------- |
| public void write(int a)                             | 写一个字节出去             |
| public void write(byte[] buffer)                     | 写一个字节数组出去         |
| public void write(byte[] buffer , int pos , int len) | 写一个字节数组的一部分出去 |

流的关闭与刷新

| 方法    | 说明                                                         |
| ------- | ------------------------------------------------------------ |
| flush() | 刷新流，还可以继续写数据                                     |
| close() | 关闭流，释放资源，但是在关闭之前会先刷新流，一旦关闭就不能写数据 |

**书写步骤：**

1.创建字节输出流对象

2.写数据，必须刷新数据

3.释放资源

**演示代码：**

```java
OutputStream outputStream = new FileOutputStream("project\\src\\IO\\2.txt",true);//先清空之前的数据，写新数据进去,如果要追加，用在后面加true
        //往文件里面写数据
        outputStream.write('a');
        outputStream.write('b');
        outputStream.write(98);
        outputStream.write("\r\n".getBytes());
        //写一个字节数组
        byte[] b = {'a','b','c'};
        outputStream.write(b);
        outputStream.write("\r\n".getBytes());

        //写中文
        byte[] b2 = "我是中国人".getBytes();
        outputStream.write(b2);
        outputStream.write("\r\n".getBytes());
        outputStream.flush();
```

## 文件拷贝

需求:把某个视频复制到其他目录下

思路：

1.根据数据源创建字节输入流对象

2.根据目的地创建字节输出流对象

3.读写数据，复制视频

4.释放资源

```java
try {
            InputStream inputStream = new FileInputStream("D:\\EV录屏\\存放视频路径\\20230522_02-File类的判断文件类型、获取文件信息功能.mp4");
            OutputStream outputStream = new FileOutputStream("E:\\项目资料\\new.mp4");
            //定义一个字节数组转移数据
            byte[] b = new byte[1024];
            //记录每次读取的字节数
            int len;
            while ((len = inputStream.read(b))!= -1){
                outputStream.write(b,0,len);
            }
		   outputStream.close();
            inputStream.close();
            System.out.println("复制完成了");
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
```

## 字符流

### FileReader(文件字符输入流：一次读取一个字符)

为什么要学习字符流

1.字节流读取中文输出可能会存在什么问题?

- 会乱码，或者内存溢出

2.读取中文输出，哪个流更合适，为什么?

- 字符流更合适，最小单位是按照单个字符读取的。

作用：以内存为基准，把磁盘文件中的数据以字符的形式读取到内存中去。

| 构造器                             | 说明                               |
| ---------------------------------- | ---------------------------------- |
| public FileReader(File file)       | 创建字符输入流管道与源文件对象接通 |
| public FileReader(String pathname) | 创建字符输入流管道与源文件路径接通 |

| 方法名称                       | 说明                                                         |
| ------------------------------ | ------------------------------------------------------------ |
| public int read()              | 每次读取一个字符返回，如果字符已经没有可读的返回-1           |
| public int read(char[] buffer) | 每次读取一个字符数组，返回读取的字符个数，如果字符已经没有可读的返回-1 |

### Filewrite(文件字符输出流)

作用:以内存为基准，把内存中的数据以字符的形式写出到文件中去

| 构造方法                                           | 说明                                             |
| -------------------------------------------------- | ------------------------------------------------ |
| public FileWriter(File file)                       | 创建字符输出流管道与源文件对象接通               |
| public FileWriter(String filepath)                 | 创建字符输出流管道与源文件路径接通               |
| public FileWriter(File file,boolean append)        | 创建字符输出流管道与源文件对象接通，可以追加数据 |
| public FileWriter(String filepath, boolean append) | 创建字符输出流管道与源文件路径接通，可以追加数据 |

| 方法名称                                          | 说明                   |
| ------------------------------------------------- | ---------------------- |
| public void write(int a)                          | 写一个字符出去         |
| public void write(String str)                     | 写一个字符串           |
| public void write(String str , int pos , int len) | 写一个字符串的一部分   |
| public void write(char[] cbuf)                    | 写一个字符数组         |
| public void write(char[] cbuf,int off,int len)    | 写一个字符数组的一部分 |

**字符输出流使用时的注意事项**

字符输出流写出数据后，必须刷新流，或者关闭流，写出去的数据才会生效

## 缓冲流

## 打印流

## 数据流

## 序列化流

## Commons-io框架























