(window.webpackJsonp=window.webpackJsonp||[]).push([[74],{372:function(a,t,s){"use strict";s.r(t);var e=s(4),r=Object(e.a)({},(function(){var a=this,t=a._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"jdbc"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#jdbc"}},[a._v("#")]),a._v(" JDBC")]),a._v(" "),t("p",[a._v("JDBC就是使用Java语言操作关系型数据库的一套API")]),a._v(" "),t("p",[t("img",{staticClass:"lazy",attrs:{alt:"image-20230131175912943","data-src":"https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230131175912943.png",loading:"lazy"}})]),a._v(" "),t("h2",{attrs:{id:"jdbc概述"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#jdbc概述"}},[a._v("#")]),a._v(" JDBC概述")]),a._v(" "),t("p",[a._v("JDBC就是使用Java语言操作关系型数据库的一套API")]),a._v(" "),t("p",[a._v("全称：（Java DataBase Connectivity)Java数据库连接")]),a._v(" "),t("h2",{attrs:{id:"jdbc本质"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#jdbc本质"}},[a._v("#")]),a._v(" JDBC本质")]),a._v(" "),t("p",[a._v("本质：")]),a._v(" "),t("p",[a._v("官方(sun公司)定义的一套操作所有关系型数据库的规则，即接口")]),a._v(" "),t("p",[a._v("各个数据库厂商去实现这套接口，提供数据库驱动jar包")]),a._v(" "),t("p",[a._v("我们可以使用这套接口(JDBC)编程，真正执行的代码是驱动jar包中的实现类")]),a._v(" "),t("h2",{attrs:{id:"jdbc好处"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#jdbc好处"}},[a._v("#")]),a._v(" JDBC好处")]),a._v(" "),t("p",[a._v("各数据库厂商使用相同的接口，Java代码不需要针对不同数据库分别开发")]),a._v(" "),t("p",[a._v("可随时替换底层数据库，访问数据库的Java代码基本不变")]),a._v(" "),t("h2",{attrs:{id:"使用jdbc步骤"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#使用jdbc步骤"}},[a._v("#")]),a._v(" 使用JDBC步骤")]),a._v(" "),t("p",[t("img",{staticClass:"lazy",attrs:{alt:"image-20230131181200145","data-src":"https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230131181200145.png",loading:"lazy"}})]),a._v(" "),t("p",[t("img",{staticClass:"lazy",attrs:{alt:"image-20230131210852499","data-src":"https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230131210852499.png",loading:"lazy"}})]),a._v(" "),t("p",[t("img",{staticClass:"lazy",attrs:{alt:"image-20230131181207582","data-src":"https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230131181207582.png",loading:"lazy"}})]),a._v(" "),t("h2",{attrs:{id:"jdbcapi详解"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#jdbcapi详解"}},[a._v("#")]),a._v(" JDBCAPI详解")]),a._v(" "),t("h3",{attrs:{id:"drivermanager"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#drivermanager"}},[a._v("#")]),a._v(" DriverManager")]),a._v(" "),t("p",[a._v("DriverManager(驱动管理类)作用：\n1.注册驱动")]),a._v(" "),t("p",[t("img",{staticClass:"lazy",attrs:{alt:"image-20230131212153504","data-src":"E:%5Cmd%E5%9B%BE%E7%89%87%5Cimage-20230131212153504.png",loading:"lazy"}})]),a._v(" "),t("p",[t("img",{staticClass:"lazy",attrs:{alt:"image-20230131212224275","data-src":"https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230131212224275.png",loading:"lazy"}})]),a._v(" "),t("p",[a._v("2.获取数据库连接")]),a._v(" "),t("p",[a._v("提示：")]),a._v(" "),t("p",[a._v("MySQL5之后的驱动包，可以省略注册驱动的步骤")]),a._v(" "),t("p",[a._v("自动加载jar包中META-lNF/services/java.sql.Driver文件中的驱动类")]),a._v(" "),t("h3",{attrs:{id:"connection"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#connection"}},[a._v("#")]),a._v(" Connection")]),a._v(" "),t("p",[a._v("Connection(数据库连接对象)作用：")]),a._v(" "),t("p",[a._v("1.获取执行SQL的对象")]),a._v(" "),t("p",[a._v("​\t普通执行SQL对象")]),a._v(" "),t("p",[t("img",{staticClass:"lazy",attrs:{alt:"image-20230131212818464","data-src":"https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230131212818464.png",loading:"lazy"}})]),a._v(" "),t("p",[a._v("​\t预编译SQL的执行对象：防止SQL注入")]),a._v(" "),t("p",[t("img",{staticClass:"lazy",attrs:{alt:"image-20230131212841544","data-src":"https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230131212841544.png",loading:"lazy"}})]),a._v(" "),t("p",[a._v("​\t执行存储过程的对象")]),a._v(" "),t("p",[t("img",{staticClass:"lazy",attrs:{alt:"image-20230131212853574","data-src":"https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230131212853574.png",loading:"lazy"}})]),a._v(" "),t("p",[a._v("2.管理事务")]),a._v(" "),t("h3",{attrs:{id:"statement"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#statement"}},[a._v("#")]),a._v(" Statement")]),a._v(" "),t("p",[a._v("Statement作用：")]),a._v(" "),t("p",[a._v("​\t1.执行SQL语句")]),a._v(" "),t("p",[a._v("执行SQL语句：")]),a._v(" "),t("p",[t("img",{staticClass:"lazy",attrs:{alt:"image-20230131214129775","data-src":"https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230131214129775.png",loading:"lazy"}})]),a._v(" "),t("p",[t("img",{staticClass:"lazy",attrs:{alt:"image-20230131214134443","data-src":"https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230131214134443.png",loading:"lazy"}})]),a._v(" "),t("h3",{attrs:{id:"resultset"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#resultset"}},[a._v("#")]),a._v(" ResultSet")]),a._v(" "),t("p",[a._v("ResultSet(结果集对象)作用:")]),a._v(" "),t("p",[a._v("​\t1.封装了DQL查询语句的结果")]),a._v(" "),t("p",[t("img",{staticClass:"lazy",attrs:{alt:"image-20230131214857672","data-src":"https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230131214857672.png",loading:"lazy"}})]),a._v(" "),t("p",[a._v("获取查询结果：")]),a._v(" "),t("p",[t("img",{staticClass:"lazy",attrs:{alt:"image-20230131214911412","data-src":"https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230131214911412.png",loading:"lazy"}})]),a._v(" "),t("p",[t("img",{staticClass:"lazy",attrs:{alt:"image-20230131214917039","data-src":"https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230131214917039.png",loading:"lazy"}})]),a._v(" "),t("h4",{attrs:{id:"resultset案例"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#resultset案例"}},[a._v("#")]),a._v(" ResultSet案例")]),a._v(" "),t("p",[a._v("需求：查询account账户表数据，封装为Account对象中，并且存储到ArrayList集合中")]),a._v(" "),t("p",[t("img",{staticClass:"lazy",attrs:{alt:"image-20230131215946981","data-src":"https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20230131215946981.png",loading:"lazy"}})]),a._v(" "),t("h3",{attrs:{id:"preparedstatement"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#preparedstatement"}},[a._v("#")]),a._v(" PreparedStatement")]),a._v(" "),t("p",[a._v("PreparedStatement的作用：")]),a._v(" "),t("p",[a._v("​\t1.预编译SQL语句并执行，预防SQL注入问题")]),a._v(" "),t("p",[a._v("防止SQL注入")]),a._v(" "),t("p",[a._v("​\tSQL注入是通过操作输入来修改事先定义好的SQL语句，用以达到执行代码对服务器进行攻击的方法。")]),a._v(" "),t("p",[a._v("防止SQL注入步骤:")]),a._v(" "),t("p",[a._v("1.获取prepareStatement对象")]),a._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("//prepareStatement对象\nPreparedStatement statement = conn.prepareStatement(sql);\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br")])]),t("p",[a._v("2.设置参数值")]),a._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v('//定义SQL\nString sql = "select * from lanqiao_user where username = ? and password = ?";\n//prepareStatement对象\nPreparedStatement statement = conn.prepareStatement(sql);\n//设置?的值\nstatement.setString(1,name);\nstatement.setString(2,ps);\n')])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br"),t("span",{staticClass:"line-number"},[a._v("3")]),t("br"),t("span",{staticClass:"line-number"},[a._v("4")]),t("br"),t("span",{staticClass:"line-number"},[a._v("5")]),t("br"),t("span",{staticClass:"line-number"},[a._v("6")]),t("br"),t("span",{staticClass:"line-number"},[a._v("7")]),t("br")])]),t("p",[a._v("3.执行SQL")]),a._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("//执行sql，不需要传递sql\nResultSet resultSet = statement.executeQuery();\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br")])]),t("h1",{attrs:{id:"数据库连接池"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#数据库连接池"}},[a._v("#")]),a._v(" 数据库连接池")]),a._v(" "),t("h2",{attrs:{id:"简介"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#简介"}},[a._v("#")]),a._v(" 简介")]),a._v(" "),t("p",[t("strong",[a._v("数据库连接池")]),a._v("是个容器，负责分配、管理数据库连接(Connection)")]),a._v(" "),t("p",[a._v("它允许应用程序重复使用一个现有的数据库连接，而不是再重新建立一个；")]),a._v(" "),t("p",[a._v("释放空闲时间超过最大空闲时间的数据库连接来避免因为没有释放数据库连接而引起的数据库连接遗漏")]),a._v(" "),t("p",[a._v("好处：")]),a._v(" "),t("p",[a._v("资源重用")]),a._v(" "),t("p",[a._v("提升系统响应速度")]),a._v(" "),t("p",[a._v("避免数据库连接遗漏")]),a._v(" "),t("p",[a._v("配置文件")]),a._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v("driverClassName=com.mysql.jdbc.Driver\nurl=jdbc:mysql://192.168.141.128:3306/test\nusername=root\npassword=123456\n#初始化连接数\ninitialSize=5\n#最大链接数\nmaxActive=10\n#最大等待时间\nmaxWait=3000\n")])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br"),t("span",{staticClass:"line-number"},[a._v("3")]),t("br"),t("span",{staticClass:"line-number"},[a._v("4")]),t("br"),t("span",{staticClass:"line-number"},[a._v("5")]),t("br"),t("span",{staticClass:"line-number"},[a._v("6")]),t("br"),t("span",{staticClass:"line-number"},[a._v("7")]),t("br"),t("span",{staticClass:"line-number"},[a._v("8")]),t("br"),t("span",{staticClass:"line-number"},[a._v("9")]),t("br"),t("span",{staticClass:"line-number"},[a._v("10")]),t("br")])]),t("p",[a._v("连接druid")]),a._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[a._v('package cn.lanqiao.driud;\n\nimport com.alibaba.druid.pool.DruidAbstractDataSource;\nimport com.alibaba.druid.pool.DruidDataSource;\nimport com.alibaba.druid.pool.DruidDataSourceFactory;\n\nimport javax.sql.DataSource;\nimport java.io.FileInputStream;\nimport java.sql.Connection;\nimport java.util.Properties;\n\npublic class DriudDemo {\n    public static void main(String[] args) throws Exception {\n        //1.导入jar包\n        //2.定义配置文件\n        //3.加载配置文件\n        Properties properties = new Properties();\n        properties.load(new FileInputStream("Mysql-JDBC/src/druid.properties"));\n        //4.获取连接池对象\n        DataSource dataSource = DruidDataSourceFactory.createDataSource(properties);\n        //5.获取数据库连接\n        Connection connection = dataSource.getConnection();\n        System.out.println(connection);\n//        System.out.println(System.getProperty("user.dir"));\n\n    }\n}\n\n')])]),a._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[a._v("1")]),t("br"),t("span",{staticClass:"line-number"},[a._v("2")]),t("br"),t("span",{staticClass:"line-number"},[a._v("3")]),t("br"),t("span",{staticClass:"line-number"},[a._v("4")]),t("br"),t("span",{staticClass:"line-number"},[a._v("5")]),t("br"),t("span",{staticClass:"line-number"},[a._v("6")]),t("br"),t("span",{staticClass:"line-number"},[a._v("7")]),t("br"),t("span",{staticClass:"line-number"},[a._v("8")]),t("br"),t("span",{staticClass:"line-number"},[a._v("9")]),t("br"),t("span",{staticClass:"line-number"},[a._v("10")]),t("br"),t("span",{staticClass:"line-number"},[a._v("11")]),t("br"),t("span",{staticClass:"line-number"},[a._v("12")]),t("br"),t("span",{staticClass:"line-number"},[a._v("13")]),t("br"),t("span",{staticClass:"line-number"},[a._v("14")]),t("br"),t("span",{staticClass:"line-number"},[a._v("15")]),t("br"),t("span",{staticClass:"line-number"},[a._v("16")]),t("br"),t("span",{staticClass:"line-number"},[a._v("17")]),t("br"),t("span",{staticClass:"line-number"},[a._v("18")]),t("br"),t("span",{staticClass:"line-number"},[a._v("19")]),t("br"),t("span",{staticClass:"line-number"},[a._v("20")]),t("br"),t("span",{staticClass:"line-number"},[a._v("21")]),t("br"),t("span",{staticClass:"line-number"},[a._v("22")]),t("br"),t("span",{staticClass:"line-number"},[a._v("23")]),t("br"),t("span",{staticClass:"line-number"},[a._v("24")]),t("br"),t("span",{staticClass:"line-number"},[a._v("25")]),t("br"),t("span",{staticClass:"line-number"},[a._v("26")]),t("br"),t("span",{staticClass:"line-number"},[a._v("27")]),t("br"),t("span",{staticClass:"line-number"},[a._v("28")]),t("br")])]),t("h2",{attrs:{id:"完成商品品牌数据的增删改查操作"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#完成商品品牌数据的增删改查操作"}},[a._v("#")]),a._v(" 完成商品品牌数据的增删改查操作")]),a._v(" "),t("p",[a._v("查询：查询所有数据")]),a._v(" "),t("p",[a._v("添加：添加品牌")]),a._v(" "),t("p",[a._v("修改：根据id修改")]),a._v(" "),t("p",[a._v("删除：根据id删除")])])}),[],!1,null,null,null);t.default=r.exports}}]);