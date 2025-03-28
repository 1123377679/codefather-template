步骤1：关闭MySQL服务
右击【计算机】，选择【管理】，打开“计算机管理”界面

![img](https://img-blog.csdnimg.cn/1db86f74a41a4f718858bcbdc8f66628.png)

选择【服务和应用程序】中的【服务】，在右侧找到【mysql】，右键，选择【停止】

![img](https://img-blog.csdnimg.cn/e1915d4d18c4405587c9d6cb9fcc150b.png)

步骤2：卸载mysql软件
可以在控制面板中卸载,把mysql相关的全部卸载掉，mysql安装包也卸载掉，一会安装的时候重新下载安装包就行

![img](https://img-blog.csdnimg.cn/66d10c2653474832b453836054612e67.png)
步骤3：删除MySQL在电脑硬盘上物理位置上的所有文件
1、卸载过后删除C:\Program Files (x86)\MySQL该目录下剩余了所有文件，把mysql文件夹也删了
2、删除HKEY_LOCAL_MACHINE\SYSTEM\ControlSet002\Services\Eventlog\Application\MySQL文件夹，如果没有可以不用删除了。
3、删除C盘下的C:\ProgramData\MySQL 所有文件，如果删除不了则用360粉碎掉即可，该programData文件是隐藏的默认，设置显示后即可见

![img](https://img-blog.csdnimg.cn/02f2d900fe6b482a93e4dbbd6bb0d093.png)4、关键！！！！删除C:\Documents and Settings\All Users\Application Data\MySQL下的文件夹，一定要删，你可以直接复制粘贴，就会看到这个文件夹
注：可以通过window系统自带的关键字查找功能来查找相关联的文件

![img](https://img-blog.csdnimg.cn/14e4a304977c4b349dd539a59e12ba8c.png)

![img](https://img-blog.csdnimg.cn/19a8fce31939433a8f9a15457b32a963.png)



步骤4：MySQL的注册表信息
注：这步是最繁琐的也是最为关键的，很多人就是因为在这步骤中没有清理干净注册表信息，从而不能重新安装成功。

1、windows+R运行“regedit”文件，打开注册表

![img](https://img-blog.csdnimg.cn/f24db33e830d43018dd88be8fbbd83d9.png)

2、删除注册表：HKEY_LOCAL_MACHINE\SYSTEM\ControlSet001\Services\Eventlog\Application\MySQL文件夹，按照这个路径一个一个打开

![img](https://img-blog.csdnimg.cn/93acf810920447529d36ac51e982f3c0.png)步骤5：重启下电脑
这样就可以重新安装MySQL软件了！
篇二：
彻底删除mysql方法
1、首先，先在服务（开始——>控制面板——>管理工具——>服务）里停掉MySQL的服务。打开控制面板-添加删除程序，找到MySQL，卸载。或者用360安全卫士来卸载也行。也可以用mysql的那个安装程序删除

2、把安装好的MYSQL卸载了，但这对于卸载MySQL来说这只是一半，还有重要的另一半是要清理注册表。我们要进入注册表在开始-运行里面输入regedit，打开注册表

3、 找到关于MYSQL的项把他们都删除，要一个项一个项的查找把他们都删除，这样在安装的时候就可以了。其实注册表里MySQL的项就是这三项：
HKEY_LOCAL_MACHINE/SYSTEM/ControlSet001/Services/Eventlog/Application/MySQL

HKEY_LOCAL_MACHINE/SYSTEM/ControlSet002/Services/Eventlog/Application/MySQL
HKEY_LOCAL_MACHINE/SYSTEM/CurrentControlSet/Services/Eventlog/Application/MySQL

4、还有就是C:/WINDOWS 下的my.ini文件也删除！

这样，把上面的四项删除了之后，MySQL就基本卸载完全了。如果你还不放心的话，可以在C盘查找mysql，把相关的项都删除。
