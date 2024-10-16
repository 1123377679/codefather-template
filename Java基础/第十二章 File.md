# 第十二章 File
# File

## 路径：

![image-20230123223314298](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230123223314298.png)

file对象就表示一个路径，可以是文件的路径，也可以是文件夹的路径

这个路径可以是存在的，也允许是不存在的

## 总结

1.File是什么？

![image-20230123224129336](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230123224129336.png)

2.绝对路径和相对路径是什么意思？

3.file的三种构造方法？

## File的常见成员方法(判断、获取)

![image-20230124161853466](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230124161853466.png)

length方法的细节:

length返回的是文件的大小(字节大小)

这个方法只能获取文件的大小单位是字节，如果是M或者G的单位，需要不断的去除以1024

这个方法无法获取文件夹的大小

如果我们要获取一个文件夹的大小，需要把这个文件夹里面所有的大小都累加在一起

getName()方法使用的细节:

1.如果是文件的话，会返回文件名和后缀

2.如果是文件夹，返回文件夹的名字



## File的常见成员方法(创建、删除)

![image-20230124163028797](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230124163028797.png)

## File的常见成员方法(获取并遍历)

![image-20230124174316013](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230124174316013.png)

重点：

当调用者File表示的路径不存在时，返回null

当调用者File表示的路径是文件时，返回null

当调用者File表示的路径是一个空文件夹时，返回一个长度为0的数组

当调用者File表示的路径是一个有内容的文件夹时，将里面所有文件和文件夹的路径放在File数组中返回

当调用者File表示的路径是一个有隐藏文件的文件夹时，将里面所有文件和文件夹的路径放在File数组中返回，包含隐藏文件

当调用者File表示的路径是需要权限才能访问的文件夹时，返回null

![image-20230124174659815](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230124174659815.png)

## 综合练习

1.需求：在当前模块下的aaa文件夹中创建一个a.txt文件

2.定义一个方法找某一个文件夹中，是否有a.txt文件(暂时不需要考虑子文件夹)

3.删除一个多级文件夹

