# Linux基础命令

## Linux的目录结构

Linux的目录结构是一个树形结构

Windows系统可以拥有多个盘符，如C盘，D盘

Linux没有盘符这个概念，只有一个根目录 /, 所有文件都在他的下面

![image-20240211161558118](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20240211161558118.png)

在Linux系统中，路径之间的层级关系，使用:/来表示

在windows系统中，路径之间的层级关系，使用:\表示

![image-20240211161906505](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20240211161906505.png)

想一下这个hello.txt的路径应该怎么去写?

<details>
<summary>解析查看</summary>
<pre><code>
  /usr/local/hello.txt
  注意:开头的/表示根目录
  后面的/表示层次关系
</code></pre>
</details>

### 总结

1.Linux操作系统的目录结构？

2./在Linux系统中的表示

### 练习

请根据语言描述，写出对应的Linux路径

- 在根目录下有一个文件夹test,文件夹内有个hello.txt,请描述文件的路径
- 在根目录下有一个文件lanqiao.txt,请描述文件的路径
- 在根目录下有一个文件夹lanqiao,在lanqiao文件夹下有个文件夹study,在study文件夹内有文件hello.txt

## Linux命令入门

### Linux命令基础

#### 什么是命令、命令行

学习Linux，本质上是学习命令行下熟练的使用Linux的各类命令

- 命令行：即Linux终端，是一种命令提示符页面。以纯"字符"的形式操作系统，可以使用各种字符化命令对系统发出操作指令
- 命令：即Linux程序，一个命令就是一个Linux的程序。命令没有图形化页面，可以在命令行(终端中)提供字符化的反馈

#### Linux命令基础格式

无论是什么命令，用于什么用途，在Linux中，命令有其通用的格式:

```
command [-options] [parameter]
```

- command: 命令本身
- -options:[可选，非必填]命令的一些选项，可以通过选项控制命令的行为细节
- parameter:[可选，非必填]命令的参数，多数用于命令的指向目标等

#### 总结

### ls命令入门

ls命令的作用是列出目录下的内容，语法细节如下:

```
ls [-a -l -h] [Linux路径]
```

- -a -l -h是可选的选项
- Linux路径是此命令可选的参数

当不使用选项和参数，直接使用ls命令本体，表示：以平铺形式，列出当前工作目录下的内容

#### ls命令的参数和选项

ls命令的参数

- -a选项，表示:all的意思，即列出全部文件(包含隐藏的文件/文件夹)
- -l选项，表示:以列表(竖向排列)的形式展示内容,并展示更多信息

#### ls命令选项和组合使用

语法中的选项是可以组合使用的，比如学习的-a和-l可以组合

写法:

- ls -a -l
- ls -la
- ls -al

以上三种写法，都是一样的

除开选项本身可以组合以外，选项和参数也可以一起使用

- -h表示以易于阅读的形式，列出文件大小，如K、M、G
- -h选项必须要搭配 -l一起使用

#### 总结

### 目录切换相关命令(cd/pwd)

####  cd切换工作目录

当Linux终端(命令行)打开的时候，会默认以用户的HOME目录作为当前的工作目录

我们可以通过cd命令，更改当前所在工作目录

cd命令来自英文:Change Directory

语法:cd [Linux路径]

- cd命令无需选项，只有参数，表示要切换到哪个目录下
- cd命令直接执行，不写参数，表示回到用户的HOME目录

#### pwd查看当前工作目录

通过ls来验证当前的工作目录，其实是不恰当的

我们可以通过pwd命令，来查看当前所在的工作目录

pwd命令来自:Print Work Directory

- pwd命令，无选项，无参数，直接输入pwd即可

### 相对路径和绝对路径

cd /home/lanqiao/Desktop 绝对路径写法

cd Desktop 相对路径写法

绝对路径：以根目录为起点，描述路径的一种写法，路径描述以/开头

相对路径：以当前目录为起点，描述路径的一种写法，路径描述无需以/开头

#### 特殊路径符

当前工作目录处于:/home/lanqiao/Desktop

现在想要，向上回退一级，切换目录到/home/lanqiao 中，如何做?

特殊路径符:

- . 表示当前目录,比如cd ./Desktop表示切换到当前目录下的Desktop目录内，和cd Desktop效果一致
- .. 表示上一级目录，比如；cd .. 既可切换到上一级，cd ../.. 切换到上二级的目录
- ~ 表示HOME目录，比如: cd ~ 既可切换到HOME目录或cd ~/Desktop，切换到HOME的Desktop目录

#### 总结

### 创建目录命令Mkdir

通过mkdir命令可以创建新的目录(文件夹)

mkdir来自英文:Make Directory

语法: 

```
mkdir [-p] Linux路径
```

参数必填，表示Linux路径，即要创建的文件夹的路径，相对路径或绝对路径即可

-p选项可选，表示自动创建不存在的父目录，适用于创建连续多层级的目录

```
mkdir lanqiao/good/nihao
```

会报错

```
mkdir -p lanqiao/good/nihao
```

注意:创建文件夹需要修改权限，请确保操作均在HOME目录内，不要在HOME外操作涉及权限问题，HOME外无法成功后续我们会讲解权限管控的知识

### 文件操作命令(touch、cat、more)

#### touch创建文件

可以通过touch命令创建文件

语法:

```
touch Linux路径
```

touch命令无选项，参数必填，表示要创建的文件路径，相对、绝对、特殊路径符均可以使用

#### cat命令，查看文件内容

有了文件后，我们可以通过cat命令查看文件的内容

不过，现在我们还没有学习vi或者vim编辑器，无法向文件内编写内容，所以我们先通过直接往里面写入内容的方式查看

语法:

```
cat Linux路径
```

cat同样没有选项，只有必填参数，参数表示：被查看的文件路径，相对、绝对、特殊路径符都可以使用

除此以外，`cat` 还可以作为输入，需要配合重定向符号 `>>`，可以将获取的内容重定向到另一个文件里。关于重定向符号，我们在后面的内容会详述。

```
cat /etc/passwd >> file
```

#### more命令查看文件内容

more命令同样可以查看文件内容，同cat不同的是：

- cat是直接将内容全部显示出来
- more支持翻页，如果文件内容过多，可以一页页的展示

语法:

```
more Linux路径
```

同样没有选项，只有必填参数，参数表示：被查看的文件路径，相对，绝对，特殊路径符都可以使用

Linux系统内置有一个文件，路径为:/etc/services,可以使用more命令查看more /etc/services

- 在查看的过程中，通过空格翻页
- 通过q退出查看

![image-20240211230819990](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20240211230819990.png)

head显示头10条

```
head /etc/passwd
```

tail显示后10条x

```
tail /etc/passwd
```

### cp-mv-rm命令

#### cp命令复制文件，文件夹

cp命令可以用于复制文件\文件夹，cp命令来自英文单词:copy

语法:

```
cp [-r] 参数1 参数2
```

- -r选项，可选，用于复制文件夹使用，表示递归
- 参数1，Linux路径，表示被复制的文件或文件夹
- 参数2，Linux路径，表示要复制去的地方

#### mv移动文件或文件夹

mv命令可以用于移动文件\文件夹，mv命令来自英文单词：move

语法:

```
mv 参数1 参数2
```

- 参数1，Linux路径，表示被移动的文件或文件夹
- 参数2，Linux路径，表示要移动去的地方，如果目标不存在，则进行改名，确保目标存在

#### rm删除文件、文件夹

rm命令可用于删除文件，文件夹

rm命令来自英文单词：remove

语法:

```
rm [-r -f]参数1 参数2 ...... 参数n
```

- 同cp命令一样，-r选项用于删除文件夹
- -f表示force，强制删除(不会弹出提示确认信息)
  - 普通用户删除内容不会弹出提示，只有root管理员用户删除内容会有提示
  - 所以一般普通用户用不到-f选项
- 参数1、参数2、.....、参数N表示要删除的文件或文件夹路径，按照空格隔开

**rm删除文件、文件夹-通配符**

rm命令支持通配符*，用来做模糊匹配

- 符号*表示通配符，即匹配任意内容(包含空),示例:
- test*，表示匹配任何以test开头的内容
- *test,表示匹配任何以test结尾的内容
- *test*,表示匹配任何包含test的内容

演示:

删除所有以test开头的文件或文件夹

```
rm -r test*
```

演示强制删除，-f选项

可以通过 su -root ，并输入密码自己的密码临时切换到root用户体验

通过输入exit命令，退回普通用户(临时用root，用完记得退出，不要一直用，关于root我们后面会讲解)

### 查找命令(which、find)

#### which命令

我们在前面学习的Linux命令，其实它们的本体就是一个个的二进制可执行程序和windows系统中的.exe文件，是一个意思

我们可以通过which命令，查看所使用的一系列命令的程序文件存放在哪里

语法：

```
which 要查找的命令
```

比如:

```
which cd
```

```
which pwd
```

#### find命令-按文件名查找文件

在图形化中，我们可以方便的通过系统提供的搜索功能，搜索指定的文件

![image-20240219131009924](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20240219131009924.png)

同样，在Linux系统中，我们可以通过find命令去搜索指定的文件

语法:

```
find 起始路径 -name "被查找的文件名"
```

为了确保后续演示，拥有最大的权限，可以在整个系统完成搜索

我们可以切换到root用户以获得管理员权限

执行命令:

su -root

输入密码

**find命令-通配符**

find命令支持通配符*，用来做模糊匹配

- 符号*表示通配符，即匹配任意内容(包含空),示例:
- test*，表示匹配任何以test开头的内容
- *test,表示匹配任何以test结尾的内容
- *test*,表示匹配任何包含test的内容

**find命令-按文件大小查找文件**

语法：

```
find 起始路径 -size +|-n[KMG]
```

- +、-表示大于和小于
- n表示大小数字
- KMG表示大小单位，k(小写字母)表示kb,M表示MB,G表示GB

示例：

- 查找小于10KB的文件：find / -size -10k
- 查找大于100MB的文件: find / size +100M
- 查找大于1GB的文件: find/ -size +1G

### grep、wc和管道符

#### grep命令

 可以通过grep命令，从文件中通过关键字过滤文件行。

语法: 

```
grep [-n] 关键字 文件路径
```

- 选项 -n ，可选，表示在结果中显示匹配的行的行号
- 参数，关键字，必填，表示过滤的关键字，带有空格或其它特殊符号，建议使用""将关键字包围起来
- 参数，文件路径，必填，表示要过滤内容的文件路径，可作为内容输入端口

现在，通过touch命令在HOME目录创建lanqiao.txt，并通过图形化页面编辑并保存如下内容:

```
lanqiao is best
lan is great
```

演示:

```
grep "lanqiao" lanqiao.txt
grep "lan" lanqiao.txt 
grep -n "lan" lanqiao.txt 
```

#### wc命令做数量统计

语法：

```
wc [-c -m -l -w] 文件路径
```

![image-20240219134102757](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20240219134102757.png)

```
wc -c test.txt
```

#### 管道符

学习了grep命令后，我们在学习一个新的特殊符号，管道符:|

管道符的含义是:将管道符左边命令的结果，作为右边命令的输入

```
cat lanqiao.txt | grep lanqiao
```

### echo、tail和重定向符

#### echo命令

可以使用echo命令在命令行内输出指定内容

语法: echo 输出的内容

- 无需选项，只有一个参数，表示要输出的内容，复杂内容可以用""包围

演示:

在终端上显示:Hello Linux

```
echo Hello Linux
```

带有空格或\等特殊符号，建议使用双引号包围，因为不包围的话，空格后很容易别识别为参数2，尽管echo不受影响，但是要养成习惯哦

```
echo "Hello Linux"
Hello Linux
```

#### **反引号**

被他包围的内容会被作为命令去执行

```
先执行pwd，看结果
在使用echo `pwd`看结果
```

#### **重定向符**

我们在来学习两个特殊的符号，重定向符 :>和>>

:>将左侧命令的结果，覆盖写入到符号右侧指定的文件中

:>>将左侧命令的结果，追加写入到符号右侧指定的文件中

演示:

```
echo "hello Linux" > lanqiao.txt
echo "hello Linux" >> lanqiao.txt
```

#### tail命令

使用tail命令，可以查看文件尾部内容，跟踪文件的最新更改，语法如下:

```
tail [-f -num] Linux路径
```

- 参数，Linux路径，表示被跟踪的文件路径
- 选项, -f，表示持续跟踪
- 选项,-num ,表示,查看尾部多少行，不填默认10行

## vi/vim编辑器

### vi/vim编辑器介绍

vi或者vim其实就是windows电脑中的文本编辑器

vim和vi的加强版本，所以之后我们都会使用vim

### vi/vim编辑器的三种工作模式

![image-20240219144716495](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20240219144716495.png)

**命令模式(Command mode)**

命令模式下，所敲的按键编辑器都理解为命令，以命令驱动执行不同的功能

此模型下，不能自由进行文本编辑

**输入模式(Insert mode)**

也就是所谓的编辑模式，插入模式

此模式下，可以对文件内容进行自由编辑

**底线命令模式(Last line mode)**

以 :  开始，通常用于文件的保存、退出

#### 命令模式

如果需要通过vi/vim编辑器编辑文件，请通过如下命令：

```
vi 文件路径
vim 文件路径
```

vim 兼容全部的vi功能，后续全部使用vim命令

- 如果文件路径表示的文件不存在，那么此命令会用于编辑新文件
- 如果文件路径表示的文件存在，那么此命令用于编辑已有文件

####  vim编辑器的快速体验

1.使用vim helloVim.txt 编辑一个新文件，执行后进入的是命令模式

2.在命令模式内，按键盘i ， 进入输入模式

3.在输入模式内输入:lanqiao and lan

4.输入完成后，按esc回退会命令模式

5.在命令模式内，按键盘：进入底线命令模式

6.在底线命令内输入:wq，保存文件并退出vi编辑器

## Linux用户和权限

### 认知root用户

**root用户(超级管理员)**

无论是Windows、MacOS、Linux均采用多用户的管理模式进行权限管理

- 在Linux系统中，拥有最大权限的账户名:root(超级管理员)
- 而在前期，我们一直使用的账户是普通的用户

root用户拥有最大的系统操作权限，而普通用户在许多地方的权限都是受限的。

演示

使用普通用户在根目录下创建文件夹是创建不了的

但是切换到root用户后，继续尝试就可以实现了

普通用户的权限，一般在其HOME目录内是不受限的

一旦出了HOME目录，大多数地方，普通用户仅有只读和执行权限，无修改权限

### su/sudo和exit命令

在前面，我们接触过su命令切换到root账户

su命令就是用于账户切换的系统命令，其来源英文单词:Switch User

语法:

```
su [-] [用户名]
```

![image-20240219151021619](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20240219151021619.png)

**sudo命令**

在外面得知root密码的时候，可以通过su命令切换到rooot得到最大的权限

但是我们不建议长期使用root用户，避免带来系统损坏

我们可以使用sudo命令，为普通的命令授权，临时以root身份执行

语法:

```
sudo 其他命令
```

在其它命令之前，带上sudo，既可以为这一条命令临时赋予root授权

但这并不是所有用户都有权利使用sudo，我们需要为普通用户配置sudo认证

**为普通用户配置sudo认证**

切换到root用户，执行visudo命令，会自动通过vi编辑器打开:/etc/sudoers

在文件的最后添加:

```
用户名 ALL = (ALL)      NOPASSWORD = ALL
```

## 用户和用户组

### 用户、用户组

Linux系统中可以：

- 配置多个用户
- 配置多个用户组
- 用户可以加入多个用户组中

![image-20240219165756593](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20240219165756593.png)

Linux中关于权限的管控级别有2个级别，分别是:

- 针对用户的权限控制
- 针对用户组的权限控制

比如，针对某文件，可以控制用户的权限，也可以控制用户组的权限

所以，我们需要学习在Linux中进行用户、用户组管理的基础命令，为后面学习权限控制打下基础

**用户组管理**

以下命令需root用户执行

- 创建用户组

```
groupadd 用户组名
```

- 删除用户组

```
groupdel 用户组名
```

为后续演示,我们创建一个lanqiao 用户组 groupadd lanqiao

**用户管理**

以下命令需要用root用户执行

**创建用户**

```
useradd [-g -d] 用户名
```

- 选项: -g指定用户的组，不指定-g,会创建同名组并自动加入，指定-g需要组已经存在，如已存在同名组，必须使用-g
- 选项:-d指定用户HOME路径，不指定，HOME目录默认在:/home/用户名

**删除用户**

userdel [-r] 用户名

- 选项： -r，删除用户的HOME目录，不使用-r，删除用户时，HOME目录保留

**查看用户所属组**

id [用户名]

- 参数：用户名，被查看的用户，如果不提供则查看自身

**修改用户所属组**

usermod -aG 用户组 用户名，将指定用户加入指定用户组

**getent**

使用getent命令，可以查看当前系统中有哪些用户

语法: 

```
getent passwd
```

共有七份信息,分别是:

```
用户名:密码(x):用户ID:组ID：描述信息(无用):HOME目录：执行终端(默认bash)
```

使用getent命令，也可以查看当前系统中有哪些组

语法:

```
getent group
```

包含3份信息,组名称:组认证(显示为x):组ID

### 查看权限控制

#### 认知权限信息

通过ls -l 可以以列表形式查看内容，并显示权限细节

![image-20240221122202452](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20240221122202452.png)

第一个，表示文件、文件夹的权限控制信息

第二个，表示文件、文件夹所属用户

第三个，表示文件、文件夹所属用户组

![image-20240221122337321](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20240221122337321.png)

**rwx**

那么，rwx到底代表什么?

- r表示读权限
- w表示写权限
- x表示执行权限

针对文件、文件夹不同，rwx的含义有细微的差别

- r,针对文件可以查看文件内容
  - 针对文件夹，可以文件夹内容，如ls命令
- w，针对文件表示可以修改此文件
  - 针对文件夹，可以在文件夹内：创建、删除、改名等操作
- x，针对文件表示可以将文件作为程序执行
  - 针对文件夹，表示可以更改工作目录到此文件夹，即cd进入

### 修改权限控制 - chmod

#### chmod命令

我们可以使用chmod命令，修改文件，文件夹的权限信息

注意，只有文件、文件夹的所属用户或root用户可以修改

语法:

```
chmod [-R] 权限 文件或文件夹
```

- 选项: -R,对文件夹内的全部内容应用同样的操作
- 示例:

```
chmod u=rwx,g=rx,o=x hello.txt
```

将文件权限修改为:rwxr-x--x

其中u表示user所属用户权限，g表示group组权限，o表示other其他用户权限

```
chmod -R u=rwx,g=rx,o=x test
```

将文件夹test以及文件夹内全部内容权限设置为rwxr-x--x

除此之外，还有快捷写法:chmod 751 hello.txt

将hello.txt的权限修改为751

751是什么意思?

<details>
<summary>751是什么意思</summary>
<pre><code>
  权限可以用3位数字来代表,第一位数字表示用户权限，第二位表示用户组权限，第三位表示其他用户权限
  数字的细节如下:r记为4,w记为2，x记为1，可以有:
  0:无任何权限，即 ---
  1：仅有x权限, 即 --x
  2：仅有w权限，即 -w-
  3：有w和x权限 即 -wx
  4：仅有r权限 即 r--
  5：有r和x权限 即r-x
  6：有r和w权限 即rw-
  7：有全部权限 即rwx
  所以751表示: rwx(7)r-x(5)--x(1)
</code></pre>
</details>



### 修改权限控制 - chown

使用chown命令，可以修改文件、文件夹的所属用户和用户组

普通用户无法修改所属为其他用户或组，所以此命令只适用于root用户执行

语法:

```
chown [-R] [用户][:][用户组] 文件或文件夹
```

- 选项，-R 同chmod，对文件夹全部内容应用相应的规则
- 选项,用户，修改所属用户
- 选项，用户组，修改所属用户组
- ：用于分隔用户和用户组

示例:

chown root hello.txt 将hello.txt所属用户修改为root

chown :root hello.txt 将hello.txt所属用户组修改为root

chown root:lanqiao hello.txt 将hello.txt所属用户修改为root 所属组修改为lanqiao

chown -R root test 将文件夹test的所属用户修改为root并对文件夹内全部内容应用同样规则

## 配置固定ip

步骤：

1.在VM中配置IP地址网关和网段

2.在Linux系统中手动修改配置文件，固定IP

![image-20240221223020498](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20240221223020498.png)

3.在Linux系统中修改固定IP

使用vim编辑/etc/sysconfig/network-scripts/ifcfg-ens33文件,填入如下内容

![image-20240221223109869](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20240221223109869.png)

4.执行:systemctl restart network 重启网卡

## 压缩和解压

### **压缩格式**

![image-20240221223636160](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20240221223636160.png)

我们要学习，如何在Linux系统中操作:tar、gzip、zip这三种压缩格式

完成文件的压缩和解压

### tar命令

Linux和Mac系统常用有两种压缩格式，后缀名分别是:

- .tar，称之为tarball，归档文件，即简单的将文件组装到一个.tar的文件内，并没有太多文件体积的减少，仅仅是简单的封装
- .gz，也是常见为.tar.gz，gzip格式压缩文件，即使用gzip压缩算法将文件压缩到一个文件内，可以极大的减少压缩后的体积

针对这两种格式，使用tar命令均可以进行压缩和解压缩的操作

语法：

```
tar [-c -v -x -f -z -C] 参数1 参数2 .... 参数N
```

![image-20240221224102152](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20240221224102152.png)

-C,选择解压的目的地，用于解压模式

#### **tar压缩常用命令组合**

```
tar -cvf test.tar 1.txt 2.txt 3.txt
```

将1.txt 2.txt 3.txt压缩到test.tar文件内

```
tar -zcvf test.tar.gz 1.txt 2.txt 3.txt
```

将1.txt 2.txt 3.txt 压缩到test.tar.gz文件内，使用gzip模式

注意：

- -z选项如果使用的话，一般处于选项为第一个
- -f选项，必须在选项位最后一个

#### **tar解压组合**

常用tar解压组合有

```
tar -xvf test.tar
```

将解压test.tar 将文件解压至当前目录

```
tar -xvf test.tar -C /home/lanqiao
```

解压test.tar 将文件解压到指定目录(/home/lanqiao)

```
tar -zxvf test.tar.gz -C /home/lanqiao
```

以Gzip模式解压test.tar.gz,将文件解压到指定目录



注意:

-f选项，必须在选项组合体的最后一位

-z选项，建议在开头位置

-C选项单独使用，和解压所需的其他参数分开

### zip命令压缩文件

可以使用zip命令，压缩文件为zip压缩包

语法:

```
zip [-r] 参数1 参数2 ....参数N
```

-r ，被压缩的包含文件夹的时候，需要使用-r选项，和rm、cp等命令的-r效果一致

示例：

```
zip test.zip a.txt b.txt c.txt
```

将a.txt b.txt c.txt压缩到test.zip文件内

```
zip -r test.zip test lanqiao a.txt
```

将test、lanqiao两个文件夹和a.txt文件，压缩到test.zip文件内

### zip解压文件

```
unzip filename.zip
```

