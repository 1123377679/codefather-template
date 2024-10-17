# Mybaits-Plus

## 快速入门

### 引入maven包

```java
<!-- https://mvnrepository.com/artifact/com.baomidou/mybatis-plus-boot-starter -->
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.5.2</version>
</dependency>
```

### mybatis-plus工具类

```java
package cn.lanqiao.utils;

import com.baomidou.mybatisplus.core.MybatisSqlSessionFactoryBuilder;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;

import java.io.IOException;

public class SqlSessionUtil {
    private SqlSessionUtil() {//构造方法私有化
    }

    public static SqlSessionFactory sqlSessionFactory;

    //类加载的时候执行
    static {
        try {
            sqlSessionFactory = new MybatisSqlSessionFactoryBuilder().build(Resources.getResourceAsStream("mybatis-config.xml"));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    /**
     * 获取SqlSession会话
     * @return SqlSession对象
     */
    public static SqlSession getSession(){
        return sqlSessionFactory.openSession();
    }
}

```



