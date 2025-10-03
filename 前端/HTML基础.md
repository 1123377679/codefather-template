# HTML基础

## 一、认识web

**「网页」**主要是由`文字`、`图像`和`超链接`等元素构成，当然除了这些元素，网页中还可以包括音频、视频以及Flash等。

**「浏览器」**是网页显示、运行的平台。

**「浏览器内核」**(排版引擎、解释引擎、渲染引擎)

负责读取网页内容，整理讯息，计算网页的显示方式并显示页面。

| 浏览器  |      内核      | 备注                                                         |
| :------ | :------------: | :----------------------------------------------------------- |
| IE      |    Trident     | IE、猎豹安全、360极速浏览器、百度浏览器                      |
| firefox |     Gecko      | 可惜这几年已经没落了，打开速度慢、升级频繁、猪一样的队友flash、神一样的对手chrome。 |
| Safari  |     webkit     | 现在很多人错误地把 webkit 叫做 chrome内核（即使 chrome内核已经是 blink 了）。苹果感觉像被别人抢了媳妇，都哭晕在厕所里面了。 |
| chrome  | Chromium/Blink | 在 Chromium 项目中研发 Blink 渲染引擎（即浏览器核心），内置于 Chrome 浏览器之中。Blink 其实是 WebKit 的分支。大部分国产浏览器最新版都采用Blink内核。二次开发 |
| Opera   |     blink      | 现在跟随chrome用blink内核。                                  |

### Web标准

**「构成」**👉 **结构标准，表现标准和行为标准**

- **结构标准**用于对网页元素进行整理和分类(HTML)
- **表现标准**用于设置网页元素的版式、颜色、大小等外观属性(CSS)
- **行为标准**用于对网页模型的定义及交互的编写(JavaScript)

**「Web标准的优点」**👇

- 易于维护：只需更改CSS文件，就可以改变整站的样式
- 页面响应快：HTML文档体积变小，响应时间短
- 可访问性：语义化的HTML（结构和表现相分离的HTML）编写的网页文件，更容易被屏幕阅读器识别
- 设备兼容性：不同的样式表可以让网页在不同的设备上呈现不同的样式
- 搜索引擎：语义化的HTML能更容易被搜索引擎解析，提升排名

## 二、HTML初识

**「HTML」**(Hyper Text Markup Language):超文本标记语言，是网页的标准语言。HTML并不是一门编程语言，而是一门描述性的标记语言。

**「所谓超文本，有2层含义：」**

- 因为它可以加入图片、声音、动画、多媒体等内容（超越文本限制 ）
- 不仅如此，它还可以从一个文件跳转到另一个文件，与世界各地主机的文件连接（超级链接文本）。

**「HTML骨架格式」**

```HTML
（1）文档声明：<!DOCTYPE html>
（2）html标签对：<html></html>
（3）head标签对：<head></head>
（4）body标签对：<body></body>
```

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202310111457509.png)

一个完整的HTML页面，其实就是由一对对的标签组成的（当然也有例外）。接下来，我们简单介绍一下这4个部分的作用。

**「团队约定大小写」**

- HTML标签名、类名、标签属性和大部分属性值统一用小写

### 1.文档类型 !DOCTYPE 

<!DOCTYPE html>是一个文档声明，表示这是一个HTML页面。


### 2.HTML标签

HTML标签的作用，是在告诉浏览器，这个页面是从开始，然后到结束的。在实际开发中，我们可能会经常看到这样一行代码：

```
<html xmlns="http://www.w3.org/1999/xhtml">
```

这句代码的作用是告诉浏览器，当前页面使用的是W3C的XHTML标准。这里我们了解即可，不用深究。一般情况下，我们不需要加上`xmlns="http://www.w3.org/1999/xhtml"`

这一句。

### 3.页面语言lang

lang指定该html标签内容所用的语言

```html
  <html lang="en">  
  en 定义语言为英语 zh-CN定义语言为中文
```

**「lang的作用」**

- 根据根据lang属性来设定不同语言的css样式，或者字体
- 告诉搜索引擎做精确的识别
- 让语法检查程序做语言识别
- 帮助翻译工具做识别
- 帮助网页阅读程序做识别

### 4.head标签

<head></head>是网页的“头部”，用于定义一些特殊的内容，如页面标题、定时刷新、外部文件等。

### 5.字符集

**「字符集」**(Character set)是多个字符的集合,计算机要准确的处理各种字符集文字，需要进行字符编码，以便计算机能够识别和存储各种文字。

- UTF-8是目前最常用的字符集编码方式
- 让 html 文件是以 UTF-8 编码保存的， 浏览器根据编码去解码对应的html内容。

```html
  <meta charset="UTF-8" />
```

### 6.body标签

<body></body>是网页的“身体”。对于一个网页来说，大部分代码都是在这个标签对内部编写的。

此外，对于HTML结构，有以下2点要跟大家说明一下。

- （1）对于HTML结构，虽然大多数开发工具都会自动生成，但是作为初学者，大家一定要能够默写出来，这是需要记忆的（其实也很简单）。
- （2）记忆标签时，有一个小技巧：根据英文意思来记忆。比如head表示“页头”，body标签“页身”。

下面我们使用vscode新建一个HTML页面，然后在里面输入以下代码。

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>这是网页的标题</title>
</head>
<body>
    <p>这是网页的内容</p>
</body>
</html>
```

分析：

title标签是head标签的内部标签，其中<title></title>标签内定义的内容是页面的标题。这个标题不是文章的标题，而是在浏览器栏目的那个标题。

<p></p>是段落标签，用于定义一段文字。对于这些标题的具体用法，我们在后面章节会详细介绍，这里只需要简单了解就可以了。

## 三、HTML注释

在实际开发中，我们需要在一些关键的HTML代码旁边标明一下这段代码是干什么，这个时候就要用到“HTML注释”了。

在HTML中，对一些关键代码进行注释，好处有非常多，比如方便理解、方便查找以及方便同一个项目组的小伙伴快速理解你的代码，以便快速修改。

语法：

```
<!--注释的内容-->
```

说明：

<!---->又叫注释标签。<!--表示注释的开始，-->表示注释的结束。

举例：

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>HTML注释</title>
</head>
<body>
    <h3>静夜思</h3>                     <!--标题标签-->
    <p>床前明月光，疑是地上霜。</p>       <!--文本标签-->
    <p>举头望明月，低头思故乡。</p>       <!--文本标签-->
</body>
</html>
```

在浏览器预览效果如下图所示：

![img](http://api.lvyestudy.com/upload/articles/0g73gbb4c05e489658ef9d88.png)

分析：

从上面我们可以看出，用<!---->注释的内容不会显示在浏览器中。在HTML中，浏览器遇到HTML标签就会进行解释，然后显示HTML标签中的内容。但是浏览器遇到“注释标签”就会自动跳过，因此不会显示注释标签中的内容。或者我们可以这样理解，HTML标签是给浏览器看的，注释标签是给咱们“程序猿”看的。

为关键代码添加注释是一个良好的习惯。在实际开发中，对功能模块代码进行注释尤为重要。因为一个页面的代码往往都是几百上千行的，如果你不对关键代码进行注释，当翻回头去看自己写的代码时，都会看不懂，更别说团队开发了。不注释的后果是，当其他队友来维护你的项目时，需要花大量时间来理解你的代码，这样就把人家给坑惨了。

此外要说明的是，并不是每一行代码都要注释的。只有重要的、关键的代码才需去注释，这一点小伙伴们别误解了。

## 四、HTML常用标签

目标

能够写出HTML骨架标签

能够写出超链接标签

能够写出图片标签并说出alt和title的区别

能够说出相对路径的三种形式

### 行内标签

特点:

在一行上可以显示多个,并且不能设置他的宽度和高度，行内标签的高度和宽度是由他的内容决定的

####  a标签（链接标签）

```html
<a href="跳转目标" target="目标窗口的弹出方式">文本或图像</a>
target="_self"  默认窗口弹出方式
target="_blank" 新窗口弹出
```

| 属性   | 作用                                                         |
| :----- | :----------------------------------------------------------- |
| href   | 用于指定链接目标的url地址，（必须属性）当为标签应用href属性时，它就具有了超链接的功能 |
| target | 用于指定链接页面的打开方式，其取值有_self和_blank两种，其中_self为默认值，_blank为在新窗口中打开方式。 |

##### 去掉a标签下划线

```
text-decoration:none;
```

**注意：**

1. 外部链接 需要添加 http:// www.baidu.com
2. 内部链接 直接链接内部页面名称即可 比如 < a href="index.html"> 首页
3. 如果当时没有确定链接目标时，通常将链接标签的href属性值定义为“#”(即href="#")，表示该链接暂时为一个空链接。
4. 不仅可以创建文本超链接，在网页中各种网页元素，如图像、表格、音频、视频等都可以添加超链接。

**锚点定位：通过创建锚点链接，用户能够快速定位到目标内容。**

```html
1. 使用相应的id名标注跳转目标的位置。 (找目标)
  <h3 id="two">第2集</h3> 

2. 使用<a href="#id名">链接文本</a>创建链接文本（被点击的） 
  <a href="#two">   
```

#### Img标签（图像标签）

![图片](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202310101722005.png)

**注意：**

- 标签可以拥有多个属性，必须写在开始标签中，位于标签名后面。
- 属性之间不分先后顺序，标签名与属性、属性与属性之间均以空格分开。
- 采取  键值对 的格式  key="value"  的格式

```html
<img src="cz.jpg" width="300" height="300" border="3" title="这是个小蒲公英" />
```

**src 和 href 的区别**

一句话概括:**src 是引入资源的 href 是跳转url的**

**路径**

![图片](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202310101722019.png)

####  span标签

<span> 用于对文档中的行内元素进行组合。

<span> 标签没有固定的格式表现。当对它应用样式时，它才会产生视觉上的变化。如果不对 <span> 应用样式，那么 <span> 元素中的文本与其他文本不会任何视觉上的差异。

<span> 标签提供了一种将文本的一部分或者文档的一部分独立出来的方式。

```html
<p>我的母亲有 <span style="color:blue">蓝色</span> 的眼睛。</p>
```

### 块级标签

特点:一行只能有一个，可以设置他的宽度和高度

#### div标签

```html
<div style="color:#00FF00">
  <h3>This is a header</h3>
  <p>This is a paragraph.</p>
</div>
```

####  标题标签h(h1~h6)

####  段落标签p

可以把HTML文档分割为若干段落

#### (7) 列表标签

**「列表」**容器里面装载着结构，样式一致的文字或图表的一种形式，叫列表。

列表最大的特点就是整齐 、整洁、 有序，跟表格类似，但是它可组合自由度会更高。

```html
<ul>
  <li>列表项1</li>
  <li>列表项2</li>
  <li>列表项3</li>
  ......
</ul>
```

**「1. 无序列表 ul」**

```
<ul></ul>中只能嵌套<li></li>，直接在<ul></ul>标签中输入其他标签或者文字的做法是不被允许的。
<li>与</li>之间相当于一个容器，可以容纳所有元素。
```

```
<ul>
  <li>列表项1</li>
  <li>列表项2</li>
  <li>列表项3</li>
  ......
</ul>
```

**「2. 有序列表 ol」**

- <ol>标签中的type属性值为排序的序列号，不添加type属性时，有序列表默认从数字1开始排序。

- 常用的type属性值分别为是1，a，A，i，I

- <ol reversed="reversed">中的reversed属性能够让有序列表中的序列倒序排列。

- <ol start="3">中的start属性值为3，有序列表中的第一个序列号将从3开始排列。

```html
<ol type="A"> 
  <li>列表项1</li>
  <li>列表二</li>
  <li>列表三</li>
</ol>
```

**「2. 自定义列表 dl」**

- 定义列表常用于对术语或名词进行解释和描述，定义列表的列表项前没有任何项目符号。

```html
<dl>
  <dt>名词1</dt>
  <dd>名词1解释1</dd>
  <dd>名词1解释2</dd>
  ...
  <dt>名词2</dt>
  <dd>名词2解释1</dd>
  <dd>名词2解释2</dd>
  ...
</dl>
```

![图片](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202310181310427.png)

#### (8) 水平线标签hr

#### (9) 换行标签br

## 五、HTML表格标签

**「1. 表格」**

现在还是较为常用的一种标签，但不是用来布局，常见显示、展示表格式数据。因为它可以让数据显示的非常的规整，可读性非常好。特别是后台展示数据的时候表格运用是否熟练就显得很重要，一个清爽简约的表格能够把繁杂的数据表现得很有条理。

**「2. 创建表格」**

```html
<table>
  <tr>
    <td>单元格内的文字</td>
    ...
  </tr>
  ...
</table>
```

table、tr、td，他们是创建表格的基本标签，缺一不可

- table用于定义一个表格标签。
- tr标签 用于定义表格中的行，必须嵌套在 table标签中。
- td 用于定义表格中的单元格，必须嵌套在<tr></tr>标签中。
- 字母 td 指表格数据（table data），即数据单元格的内容，现在我们明白，表格最合适的地方就是用来存储数据的。td像一个容器，可以容纳所有的元素。

![图片](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202310181311933.jpeg)

**表头单元格标签th**:一般表头单元格位于表格的第一行或第一列，并且文本加粗居中,只需用表头标签<th></th>替代相应的单元格标签<td></td>即可。

![图片](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202310181311104.png)

**表格标题caption**通常这个标题会被居中且显示于表格之上。caption 标签必须紧随 table 标签之后。这个标签只存在 表格里面才有意义。你是风儿我是沙

```html
<table>
   <caption>我是表格标题</caption>
</table>
```

**「3. 表格属性」**

![图片](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202310181311323.png)

**「4. 合并单元格」**,合并的顺序我们按照  先上 后下   先左  后右 的顺序 ,合并完之后需要删除多余的单元格。

- 跨行合并：rowspan="合并单元格的个数"
- 跨列合并：colspan="合并单元格的个数"

**「5. 总结表格」**

| 标签名              | 定义           | 说明                                         |
| :------------------ | :------------- | :------------------------------------------- |
| <table></table>     | 表格标签       | 就是一个四方的盒子                           |
| <tr></tr>           | 表格行标签     | 行标签要再table标签内部才有意义              |
| <td></td>           | 单元格标签     | 单元格标签是个容器级元素，可以放任何东西     |
| <th></th>           | 表头单元格标签 | 它还是一个单元格，但是里面的文字会居中且加粗 |
| <caption></caption> | 表格标题标签   | 表格的标题，跟着表格一起走，和表格居中对齐   |
| clospan 和 rowspan  | 合并属性       | 用来合并单元格的                             |

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/202310181322743.png)

## 六、HTML表单

### 1.表单是什么

在前面的章节中，我们学习了各种各样的标签。不过使用这些标签做出来的都是静态页面，动态页面是没办法实现的。如果想要做出一个动态页面，我们就需要借助表单来实现。

对于表单，相信小伙伴们接触不少了，像注册登录、话费充值、发表评论等都用到了，如下图所示。其中，文本框、按钮、下拉菜单等就是常见的表单元素。

![img](http://api.lvyestudy.com/upload/articles/06g1368a17097f18f70gf1fa.png)

**表单标签**

在HTML中，表单标签有5种：form、input、textarea、select和option。下图所示的这个表单，已经把这5种表单标签都用上了。在这一章的学习中，最基本的要求就是把这个表单做出来。

![img](http://api.lvyestudy.com/upload/articles/8dgd43aba55fed879dfe91cg.png)

从外观上来划分，表单可以分为以下8种。

- （1）单行文本框
- （2）密码文本框
- （3）单选框
- （4）复选框
- （5）按钮
- （6）文件上传
- （7）多行文本框
- （8）下拉列表

### 2.form标签

在HTML中，我们都知道表格的行（tr）、单元格（th、td）等都必须放在table标签内部。创建一个表单，跟创建一个表格一样，我们也必须要把所有表单标签放在form标签内部。

表单跟表格，这是两个完全不一样的概念，但是有不少初学者分不清。记住，我们常说的表单，指的是文本框、按钮、单选框、复选框、下拉列表等的统称。

**语法：**

```
<form>
    //各种表单标签
</form>
```

**举例：**

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8"/>
    <title></title>
</head>
<body>
    <form>
        <input type="text" value="这是一个单行文本框"/><br/>
        <textarea>这是一个多行文本框</textarea><br/>
        <select>
            <option>HTML</option>
            <option>CSS</option>
            <option>JavaScript</option>
        </select>
    </form>
</body>
</html>
```

**分析：**

input、textarea、select、option都是表单标签，一般要放在form标签内部。对于这些表单标签，后面会慢慢学到，暂时不需要深入。

#### （1）form标签属性

在HTML中，form标签常用属性如下表所示。

| 属性    | 说明     |
| :------ | :------- |
| name    | 表单名称 |
| method  | 提交方式 |
| action  | 提交地址 |
| target  | 打开方式 |
| enctype | 编码方式 |

form标签这几个属性，跟head标签中的几个标签一样，对于刚接触HTML的小伙伴来说，缺乏操作性且比较抽象。不过没关系，我们简单看一下就行，等学了后端技术自然就会有真正的理解。

### 3.input标签

在HTML中，大多数表单都是使用input标签来实现的。

**语法：**

```
<input type="表单类型" />
```

**说明：**

input是自闭合标签，它是没有结束符号的。其中type属性取值如下表所示。

![img](http://api.lvyestudy.com/upload/articles/f8559cb8f9eda24ge2bda815.png)

### 4.单行文本框

在HTML中，单行文本框是使用input标签来实现的，其中type属性取值为“text”。单行文本框常见于注册登录中。

语法：

```
<input type="text" />
```

举例：

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title></title>
</head>
<body>
    <form method="post">
        姓名：<input type="text" />
    </form>
</body>
</html>
```

浏览器预览效果如下图所示。

![img](http://api.lvyestudy.com/upload/articles/a28f2c7d837cc1c8d4eb7gab.png)



#### （1）单行文本框属性

在HTML中，单行文本框常用属性如下表所示。

| 属性      | 说明                                       |
| :-------- | :----------------------------------------- |
| value     | 设置文本框的默认值，也就是默认情况下文本框 |
| size      | 设置文本框的长度                           |
| maxlength | 设置文本框中最多可以输入的字符数           |

对于元素属性的定义，是没有先后顺序的，你可以将value定义在前面，也可以定义在后面，都无所谓。

举例：value属性

```
在线测试<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title></title>
</head>
<body>
    <form method="post">
        姓名：<input type="text" /><br />
        姓名：<input type="text" value="helicopter"/>
    </form>
</body>
</html>
```

浏览器预览效果如下图所示。

![img](http://api.lvyestudy.com/upload/articles/e9a2dc8b77g890d1429840d7.png)

分析：

value属性用于设置单行文本框中默认的文本，如果没有设置，就是空白。

举例：size属性

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title></title>
</head>
<body>
    <form method="post">
        姓名：<input type="text" size="20"/><br />
        姓名：<input type="text" size="10"/>
    </form>
</body>
</html>
```

浏览器预览效果如下图所示。

![img](http://api.lvyestudy.com/upload/articles/f41b2d0gaa01dagdbc2ad1a6.png)

分析：

size属性可以用来设置单行文本框的长度，不过在实际开发中，我们一般不会用到这个属性，而是使用CSS来控制。

举例：maxlength属性

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title></title>
</head>
<body>
    <form method="post">
        姓名：<input type="text" />
        姓名：<input type="text" maxlength="5"/>
    </form>
</body>
</html>
```

浏览器预览效果如下图所示。

![img](http://api.lvyestudy.com/upload/articles/59a41a8gdfg225f5a75257e3.png)

分析：

从外观上看不出maxlength加上与不加上有什么区别，不过当我们输入内容后，会发现设置maxlength="5"的单行文本框最多只能输入5个字符，如下图所示。

![img](http://api.lvyestudy.com/upload/articles/9fad0d68b98e5ed24d43g731.png)

### 5.密码文本框

码文本框在外观上与单行文本框相似，两者拥有相同的属性（value、size、maxlength等）。不过它们是有着本质上的区别的：**在单行文本框中输入的字符是可见的，而在密码文本框中输入的字符不可见**。

我们可以把密码文本框看成是一种特殊的单行文本框。对于两者的区别，从图9-11就可以很清晰地看出来了。

![img](http://api.lvyestudy.com/upload/articles/2933af721d7c65b795a12e26.png)

语法：

```
<input type="password" />
```

举例：

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title></title>
</head>
<body>
    <form method="post">
        账号：<input type="text" /><br />
        密码：<input type="password" />
    </form>
</body>
</html>
```

浏览器预览效果如下图所示。

![img](http://api.lvyestudy.com/upload/articles/37gf3510401ge26dd4d2ecce.png)

分析：

密码文本框与单行文本框在外观上是一样的，但是当我们输入内容后，就会看出两者的区别，如下图所示。

![img](http://api.lvyestudy.com/upload/articles/8a9a48ae29d5aa4fbf443591.png)

#### （1）密码文本框属性

密码文本框可以看成是一种特殊的单行文本框，它拥有和单行文本框一样的属性，如下表所示。

| 属性      | 说明                                     |
| :-------- | :--------------------------------------- |
| value     | 设置文本框的默认值，也就是默认情况下文本 |
| size      | 设置文本框的长度                         |
| maxlength | 设置文本框中最多可以输入的字符数         |

举例：

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title></title>
</head>
<body>
    <form method="post">
        账号：<input type="text" size="15" maxlength="10" /><br />
        密码：<input type="password" size="15" maxlength="10" />
    </form>
</body>
</html>
```

浏览器预览效果如下图所示。

![img](http://api.lvyestudy.com/upload/articles/fa8g88e77797811ddb0b1ae9.png)

分析：

这个例子的预览效果跟前一个例子的差不多，不过事实上，文本框的长度（size）和可输入字符数（maxlength）已经改变了。当我们输入内容后，效果如下图所示。

![img](http://api.lvyestudy.com/upload/articles/0f5198bd1900124efdf153c1.png)

密码文本框仅仅能使得周围的人看不见你输入的内容是什么，实际上它并不能保证数据的安全。为了保证数据安全，我们需要在浏览器与服务器之间建立一个安全连接，不过这属于后端技术，这里了解一下就行。

### 6.单选框

在HTML中，单选框也是使用input标签来实现的，其中type属性取值为“radio”。

语法：

```
<input type="radio" name="组名" value="取值" />
```

说明：

name属性表示单选按钮所在的组名，而value表示单选按钮的取值，这两个属性必须要设置。

举例：

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title></title>
</head>
<body>
    <form method="post">
        性别:
        <input type="radio" name="gender" value="男" />男
        <input type="radio" name="gender" value="女" />女
    </form>
</body>
</html>
```

浏览器预览效果如下图所示。

![img](http://api.lvyestudy.com/upload/articles/cg255bg8f28d2gb00gcd4540.png)

分析：

我们可以发现，对于这一组单选按钮，只能选中其中一项，而不能同时选中两项。这就是所谓的“单选框”嘛。

可能小伙伴会问：如果想要在默认情况下，让第一个单选框选中，该怎么做呢？此时可以使用checked属性来实现。

举例：checked属性

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title></title>
</head>
<body>
    <form method="post">
        性别:
        <input type="radio" name="gender" value="男" checked />男
        <input type="radio" name="gender" value="女" />女
    </form>
</body>
</html>
```

浏览器预览效果如下图所示：

![img](http://api.lvyestudy.com/upload/articles/aa17c6406gf8d240504fc2dc.png)

分析：

我们可能看到checked属性没有属性值，其实这是HTML5的最新写法。下面两句代码其实是等价的，不过一般都是采用缩写形式。

```
<input type="radio" name="gender" value="男" checked />男
<input type="radio" name="gender" value="男" checked="checked" />男
```

**忽略点**

很多小伙伴没有深入了解单选框，在平常开发时经常会忘记加上name属性，或者对于name属性随便写就算了。接下来，我们详细讲解一下单选框常见的忽略点。

举例：没有加上name属性

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title></title>
</head>
<body>
    <form method="post">
        性别:
        <input type="radio" value="男" />男
        <input type="radio" value="女" />女
    </form>
</body>
</html>
```

浏览器预览效果如下图所示。

![img](http://api.lvyestudy.com/upload/articles/8c0ecg81562b79ed17b5cfg4.png)

分析：

没有加上name属性，预览效果好像没有变化。但是当我们选取的时候，会发现居然可以同时选中两个选项，如下图所示。

![img](http://api.lvyestudy.com/upload/articles/91571b72c604b2g761667234.png)

这就跟预期效果完全不符合了，因此我们必须要加上name属性。有小伙伴就会问了：在同一组单选框中，name属性取值能否不一样的呢？下面先来看一个例子。

举例：name取值不一样

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title></title>
</head>
<body>
    <form method="post">
        性别:
        <input type="radio" name="gender1" value="男" />男
        <input type="radio" name="gender2" value="女" />女
    </form>
</body>
</html>
```

浏览器预览效果如下图所示。

![img](http://api.lvyestudy.com/upload/articles/55eg33gb33cbg70c3deede2a.png)

分析：

在这个例子中，我们会发现两个选项还是可以被同时选取。因此在实际开发中，对于同一组的单选框，必须要设置一个相同的name，这样才会把这些选项归为同一个组上面。对于这一点，我们再举一个复杂点的例子，小伙伴们就会明白了。

举例：正确的写法

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title></title>
</head>
<body>
    <form method="post">
        性别:
        <input type="radio" name="gender" value="男" />男
        <input type="radio" name="gender" value="女" />女<br />
        年龄:
        <input type="radio" name="age" value="80后" />80后
        <input type="radio" name="age" value="90后" />90后
        <input type="radio" name="age" value="00后" />00后
    </form>
</body>
</html>
```

浏览器预览效果如下图所示。

![img](http://api.lvyestudy.com/upload/articles/e0342c19b01cbg85g706d1d6.png)

分析：

这里定义了两组单选框，在每一组中，选项之间都是互斥的。也就是说，在同一组中，只能选中其中一项。

最后有一点要说明一下的，为了更好地语义化，表单元素与后面的文本一般都需要借助label标签关联起来。

```
<input type="radio" name="gender" value="男" />男
<input type="radio" name="gender" value="女" />女
```

像上面这段代码，正确应该写成这样：

```
<label><input type="radio" name="gender" value="男" />男</label>
<label><input type="radio" name="gender" value="女" />女</label>
```

为了减轻初学者的负担，对于这种规范写法，暂时不用管。

### 7.复选框

在HTML中，复选框也是使用input标签来实现的，其中type属性取值为“checkbox”。单选框只能选择一项，而复选框可以选择多项。

语法：

```
<input type="checkbox" name="组名" value="取值" />
```

说明：

name属性表示复选框所在的组名，而value表示复选框的取值。跟单选框一样，这两个属性也必须要设置。

举例：

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title></title>
</head>
<body>
    <form method="post">
        你喜欢的水果：<br/>
        <input type="checkbox" name="fruit" value="苹果"/>苹果
        <input type="checkbox" name="fruit" value="香蕉"/>香蕉
        <input type="checkbox" name="fruit" value="西瓜"/>西瓜
        <input type="checkbox" name="fruit" value="李子"/>李子
    </form>
</body>
</html>
```

浏览器预览效果如下图所示。

![img](http://api.lvyestudy.com/upload/articles/b8c1a1a17f9bdg79555ff213.png)

分析：

复选框中的name跟单选框中的name都是用来设置“组名”的，表示该选项位于哪一组中。

两者都设置name属性，为什么单选框只能选中一项，而复选框可以选择多项呢？这是因为浏览器会自动识别这是“单选框组”还是“复选框组”（说白了就是根据type属性取值来识别）。如果是单选框组，就只能选择一项；如果是复选框组，就可以选择多项。

想在默认情况下，让复选框某几项选中，我们也可以使用checked属性来实现。这一点跟单选框是一样的。

举例：checked属性

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title></title>
</head>
<body>
    <form method="post">
        你喜欢的水果：<br/>
        <input type="checkbox" name="fruit" value="苹果" checked/>苹果
        <input type="checkbox" name="fruit" value="香蕉"/>香蕉
        <input type="checkbox" name="fruit" value="西瓜" checked/>西瓜
        <input type="checkbox" name="fruit" value="李子"/>李子
    </form>
</body>
</html>
```

浏览器预览效果如下图所示。

![img](http://api.lvyestudy.com/upload/articles/68e262e32274edb77f480d03.png)

单选框与复选框就像好基友关系，很多地方都是相似的。我们多对比理解一下，这样更能加深印象。

### 8.按钮

在HTML中，普通按钮一般情况下都是配合JavaScript来进行各种操作的。

语法：

```
<input type="button" value="取值" />
```

说明：

value的取值就是按钮上的文字。

举例：

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title></title>
    <script>
        window.onload = function () 
        {
            var oBtn = document.getElementsByTagName("input");
            oBtn[0].onclick = function () 
            {
                alert("I ❤ YOU！");
            };
        }
    </script>
</head>
<body>
    <form method="post">
        <input type="button" value="表白"/>
    </form>
</body>
</html>
```

浏览器预览效果如下图所示。

![img](http://api.lvyestudy.com/upload/articles/39ba71306d32b92ccbg991d9.png)

#### （1）提交按钮submit

在HTML中，提交按钮一般都是用来给服务器提交数据的。我们可以把提交按钮看成是一种特殊功能的普通按钮。

语法：

```
<input type="submit" value="取值" />
```

说明：

value的取值就是按钮上的文字。

举例：

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title></title>
</head>
<body>
    <form method="post">
        <input type="button" value="普通按钮"/>
        <input type="submit" value="提交按钮"/>
    </form>
</body>
</html>
```

浏览器预览效果如下图所示。

![img](http://api.lvyestudy.com/upload/articles/98928aac0ead3ec69b4d97c3.png)

分析：

提交按钮与普通按钮从外观上是没有什么不同的，两者的区别在于功能上。对于初学者来说，暂时了解一下就行。

#### （2）重置按钮reset

在HTML中，重置按钮一般用来清除用户在表单中输入的内容。重置按钮也可以看成是具有特殊功能的普通按钮。

语法：

```
<input type="reset" value="取值" />
```

说明：

value的取值就是按钮上的文字。

举例：

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title></title>
</head>
<body>
    <form method="post">
        账号：<input type="text" /><br />
        密码：<input type="password" /><br />
        <input type="reset" value="重置" />
    </form>
</body>
</html>
```

浏览器预览效果如下图所示。

![img](http://api.lvyestudy.com/upload/articles/772762634e5d2b57f7b3a40b.png)

分析：

当我们在文本框中输入内容，然后按下重置按钮，会发现内容被清空了！其实，这就是重置按钮的功能。

不过我们要注意一点：重置按钮只能清空它“所在form标签”内表单中的内容，对于当前所在form标签之外的表单清除是无效的。

举例：

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title></title>
</head>
<body>
    <form method="post">
        账号：<input type="text" /><br />
        密码：<input type="password" /><br />
        <input type="reset" value="重置" /><br />
    </form>
    昵称：<input type="text" />
</body>
</html>
```

浏览器预览效果如下图所示。

![img](http://api.lvyestudy.com/upload/articles/7074g711f2a5b7add8bb730g.png)

分析：

当我们在所有文本框中输入内容，然后点击重置按钮，会发现只会清除这个重置按钮所在form标签内的表单。这里顺便提一下，提交按钮也是针对当前所在form标签而言的。

举例：

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title></title>
</head>
<body>
    <form method="post">
        <input type="button" value="按钮" />
        <input type="submit" value="按钮" />
        <input type="reset" value="按钮" />
    </form>
</body>
</html>
```

浏览器预览效果如下图所示：

![img](http://api.lvyestudy.com/upload/articles/43c50cb4a616262e41981f7e.png)

分析：

3种按钮虽然从外观上看起来是一样的，但是实际功能却是不一样的。最后，我们总结一下普通按钮、提交按钮以及重置按钮的区别。

- （1）普通按钮一般情况下都是配合JavaScript来进行各种操作的。
- （2）提交按钮一般都是用来给服务器提交数据的。
- （3）重置按钮一般用来清除用户在表单中输入的内容。

#### （3）button标签

从上面我们知道，普通按钮、提交按钮以及重置按钮这3种按钮都是使用input标签来实现的。其实还有一种按钮是使用button标签来实现的。

语法：

```
<button></button>
```

说明：

在实际开发中，比较少用到button标签，暂时简单了解一下即可。

### 9.文件上传

文件上传功能我们经常用到，例如百度网盘、QQ邮箱等都涉及这个功能。文件上传功能的实现需要用到后端技术，不过在学习HTML时，我们只需要关心把页面效果做出来就行了，功能实现不需要去深究。

![img](http://api.lvyestudy.com/upload/articles/476d4cbe7eg78c70c4a1fd0g.png)

在HTML中，文件上传也是使用input标签来实现的，其中type属性取值为file。

语法：

```
<input type="file" />
```

举例：

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title></title>
</head>
<body>
    <form method="post">
        <input type="file"/>
    </form>
</body>
</html>
```

浏览器预览效果如下图所示。

![img](http://api.lvyestudy.com/upload/articles/9bg7g7587gc363b96d46b26e.png)

分析：

当我们点击“选择文件”按钮后会发现，怎么不能上传文件呢？其实这个需要学习后端技术之后才知道怎么实现。

### 10.多行文本框

单行文本框只能输入一行文本，而多行文本框却可以输入多行文本。在HTML中，多行文本框使用的是textarea标签，而不是input标签。

语法：

```
<textarea rows="行数" cols="列数" value="取值">默认内容</textarea>
```

说明：

多行文本框的默认显示文本是在标签对内部设置，而不是在value属性中设置的。一般情况下，不需要设置默认显示文本。

举例：

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title></title>
</head>
<body>
    <form method="post">
        个人简介：<br/>
        <textarea rows="5" cols="20">请介绍一下你自己</textarea>
    </form>
</body>
</html>
```

浏览器预览效果如下图所示。

![img](http://api.lvyestudy.com/upload/articles/27c27224983df5db94736488.png)

分析：

对于文本框，现在我们可以总结出以下2点。

- （1）HTML有3种文本框：单行文本框、密码文本框、多行文本框。
- （2）单行文本框和密码文本框使用的都是input标签，多行文本框使用的是textarea标签。

### 11.下拉列表

在HTML中，下拉列表由select和option这两个标签配合使用来表示的。这一点跟无序列表很像，其中无序列表是由ul和li这两个标签配合使用来表示。为了更好地理解，我们可以把下拉列表看成是一种“特殊的无序列表”。

语法：

```
<select>
    <option>选项内容</option>
    ……
    <option>选项内容</option>
</select>
```

举例：

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title></title>
</head>
<body>
    <form method="post">
        <select>
            <option>HTML</option>
            <option>CSS</option>
            <option>jQuery</option>
            <option>JavaScript</option>
            <option>Vue.js</option>
        </select>
    </form>
</body>
</html>
```

浏览器预览效果如下图所示。

![img](http://api.lvyestudy.com/upload/articles/6f7d5ebgd5bg0045dbge6248.png)

分析：

下拉列表是最节省页面空间的一种方式，因为它在默认情况下只显示一个选项，只有点击后才会看到全部选项。当我们点击下拉列表后，全部选项就会显示出来，预览效果如下图所示。

![img](http://api.lvyestudy.com/upload/articles/81ddebad4a5a46b9b07gea5e.png)

#### （1）select标签属性

在HTML中，select标签常用属性有两个，如下表所示。

| 属性     | 说明                                   |
| :------- | :------------------------------------- |
| multiple | 设置下拉列表可以选择多项               |
| size     | 设置下拉列表显示几个列表项，取值为整数 |

举例：multiple属性

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title></title>
</head>
<body>
    <form method="post">
        <select multiple>
            <option>HTML</option>
            <option>CSS</option>
            <option>jQuery</option>
            <option>JavaScript</option>
            <option>Vue.js</option>
            <option>HTML5</option>
            <option>CSS3</option>
        </select>
    </form>
</body>
</html>
```

浏览器预览效果如下图所示。

![img](http://api.lvyestudy.com/upload/articles/15c037ace0d9g464d60f946f.png)

分析：

默认情况下，下拉列表只能选择一项，我们可以通过multiple属性设置下拉列表可以选择多项。想要选取多项，可以使用“Ctrl+鼠标左键”来选取。

下拉列表的multiple属性没有属性值，这是HTML5的最新写法，这个跟单选框中的checked属性是一样的。

举例：size属性

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title></title>
</head>
<body>
    <form method="post">
        <select size="5">
            <option>HTML</option>
            <option>CSS</option>
            <option>jQuery</option>
            <option>JavaScript</option>
            <option>Vue.js</option>
            <option>HTML5</option>
            <option>CSS3</option>
        </select>
    </form>
</body>
</html>
```

浏览器预览效果如下图所示。

![img](http://api.lvyestudy.com/upload/articles/eddb5fc1b0961b70bb42fdd5.png)

分析：

有些小伙伴将size取值为1、2、3时，会发现Chrome浏览器无效。这是因为Chrome浏览器最低是4个选项，我们只能选取4及以上数字。

#### （2）option标签属性

在HTML中，option标签常用属性有两个，如下表所示。

| 属性     | 说明     |
| :------- | :------- |
| selected | 是否选中 |
| value    | 选项值   |

对于value属性，就不用多说了，几乎所有表单元素都有value属性，这个属性是配合JavaScript以及服务器进行操作的。

举例：selected属性

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title></title>
</head>
<body>
    <form method="post">
        <select size="5">
            <option>HTML</option>
            <option>CSS</option>
            <option selected>jQuery</option>
            <option>JavaScript</option>
            <option>Vue.js</option>
            <option>HTML5</option>
            <option>CSS3</option>
        </select>
    </form>
</body>
</html>
```

浏览器预览效果如下图所示。

![img](http://api.lvyestudy.com/upload/articles/9071141f29ag031565995486.png)

分析：

selected属性表示列表项是否被选中，它是没有属性值的，这也是HTML5的最新写法，这个跟单选框中的checked属性也是一样的。如果我们把size="5"去掉，此时预览效果如下图所示。

![img](http://api.lvyestudy.com/upload/articles/cbc94b0ca49a633c8f1e23b7.png)

举例：value属性

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title></title>
</head>
<body>
    <form method="post">
        <select size="5">
            <option value="HTML">HTML</option>
            <option value="CSS">CSS</option>
            <option value="jQuery">jQuery</option>
            <option value="JavaScript">JavaScript</option>
            <option value="vue.js">Vue.js</option>
            <option value="HTML5">HTML5</option>
            <option value="CSS3">CSS3</option>
        </select>
    </form>
</body>
</html>
```

浏览器预览效果如下图所示。

![img](http://api.lvyestudy.com/upload/articles/4af1gbfcdeacg7ab0dce8840.png)

### 12.iframe标签

在HTML中，我们可以使用iframe标签来实现一个内嵌框架。内嵌框架，说白了，就是在当前页面再嵌入另外一个网页。

语法：

```
<iframe src="链接地址" width="数值" height="数值"></iframe>
```

说明：

src是必选的，用于定义链接页面的地址。width和height这两个属性是可选的，分别用于定义框架的宽度和高度。

举例：嵌入一个页面

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title></title>
</head>
<body>
    <iframe src="http://www.lanqiao.cn" width="200" height="150"></iframe>
</body>
</html>
```

分析：

iframe实际上就是在当前页面嵌入了另外一个页面，我们也可以同时嵌入多个页面。

举例：嵌入多个页面

```
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title></title>
</head>
<body>
    <iframe src="http://www.lanqiao.cn" width="200" height="150"></iframe>
    <iframe src="http://www.baidu.com" width="200" height="150"></iframe>
</body>
</html>
```
