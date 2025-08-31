# AI智能体项目

## 程序调用AI大模型

1.SDK接入：使用官方提供的软件开发工具包，最直接的集成方式

2.HTTP接入：通过REST API 直接发送HTTP 请求调用模型

3.Spring AI：基于Spring生态系统的AI框架，更方便地接入大模型

4.LangChain4j：专注与构建LLM应用的Java框架，提供丰富的AI调用组件

### SKD接入

SDK接入首先需要获取到你使用的大模型的APIKey

![image-20250610111658929](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20250610111658929.png)

然后查看你获取的API大模型的文档，有参考代码

![image-20250610111750113](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20250610111750113.png)

### HTTP接入

对于SDK不支持的编程语言或需要更灵活控制的场景，可以直接使用HTTP请求调用AI大模型的API。

使用建议：一般来说，如果有官方SDK支持，优先使用SDK；只有再不支持SDK的情况下，再考虑直接HTTP调用。

Http调用的详细说明可参考官方文档:https://help.aliyun.com/zh/model-studio/use-qwen-by-calling-api#9141263b961cc

![image-20250611112146989](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20250611112146989.png)

可以利用 ‎AI 将上述 CUR﻿L 代码转换为 Ja⁢va 的 Hutoo‌l 工具类网络请求代‏码，示例 Prompt：

```
将上述请求转换为 hutool 工具类的请求代码
```

AI 生成的代码如下，可以自己略作修改：

```java
public class HttpAiInvoke {
    public static void main(String[] args) {
        // 替换为你的实际 API 密钥
        String url = "https://dashscope.aliyuncs.com/api/v1/services/aigc/text-generation/generation";

        // 设置请求头
        Map<String, String> headers = new HashMap<>();
        headers.put("Authorization", "Bearer " + TestApiKey.API_KEY);
        headers.put("Content-Type", "application/json");

        // 设置请求体
        JSONObject requestBody = new JSONObject();
        requestBody.put("model", "qwen-plus");

        JSONObject input = new JSONObject();
        JSONObject[] messages = new JSONObject[2];

        JSONObject systemMessage = new JSONObject();
        systemMessage.put("role", "system");
        systemMessage.put("content", "You are a helpful assistant.");
        messages[0] = systemMessage;

        JSONObject userMessage = new JSONObject();
        userMessage.put("role", "user");
        userMessage.put("content", "你是谁？");
        messages[1] = userMessage;

        input.put("messages", messages);
        requestBody.put("input", input);

        JSONObject parameters = new JSONObject();
        parameters.put("result_format", "message");
        requestBody.put("parameters", parameters);

        // 发送请求
        HttpResponse response = HttpRequest.post(url)
                .addHeaders(headers)
                .body(requestBody.toString())
                .execute();

        // 处理响应
        if (response.isOk()) {
            System.out.println("请求成功，响应内容：");
            System.out.println(response.body());
        } else {
            System.out.println("请求失败，状态码：" + response.getStatus());
            System.out.println("响应内容：" + response.body());
        }
    }
}
```

### SpringAI

[Spring AI](https://docs.spring.io/spring-ai/reference/) 是 Spring 生态系统的新成员，旨在简化 AI 功能与 Spring 应用的集成。Spring AI 通过提供统一接口、支持集成多种 AI 服务提供商和模型类型、各种 AI 开发常用的特性（比如 RAG 知识库、Tools 工具调用和 MCP 模型上下文协议），简化了 AI 应用开发代码，使开发者能够专注于业务逻辑，提高了开发效率。

![image-20250611112807131](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20250611112807131.png)

Sprin‎g AI 的文档写﻿得还是比较清晰易懂⁢的，打破了我对国外‌文档的一贯认知（

Spring AI 的核心特性如下，参考官方文档：17ycTJj/8ey9lP7bQzAlv/kfIjIQUEysRdJI/r5xcbA=

- 跨 AI 供应商的可移植 API 支持：适用于聊天、文本转图像和嵌入模型，同时支持同步和流式 API 选项，并可访问特定于模型的功能。
- 支持所有主流 AI 模型供应商：如 Anthropic、OpenAI、微软、亚马逊、谷歌和 Ollama，支持的模型类型包括：聊天补全、嵌入、文本转图像、音频转录、文本转语音
- 结构化输出：将 AI 模型输出映射到 POJO（普通 Java 对象）。
- 支持所有主流向量数据库：如 Apache Cassandra、Azure Cosmos DB、Azure Vector Search、Chroma、Elasticsearch、GemFire、MariaDB、Milvus、MongoDB Atlas、Neo4j、OpenSearch、Oracle、PostgreSQL/PGVector、PineCone、Qdrant、Redis、SAP Hana、Typesense 和 Weaviate。
- 跨向量存储供应商的可移植 API：包括新颖的类 SQL 元数据过滤 API。
- 工具/函数调用：允许模型请求执行客户端工具和函数，从而根据需要访问必要的实时信息并采取行动。
- 可观测性：提供与 AI 相关操作的监控信息。
- 文档 ETL 框架：适用于数据工程场景。
- AI 模型评估工具：帮助评估生成内容并防范幻觉响应。
- Spring Boot 自动配置和启动器：适用于 AI 模型和向量存储。
- ChatClient API：与 AI 聊天模型通信的流式 API，用法类似于 WebClient 和 RestClient API。
- Advisors API：封装常见的生成式 AI 模式，转换发送至语言模型（LLM）和从语言模型返回的数据，并提供跨各种模型和用例的可移植性。
- 支持聊天对话记忆和检索增强生成（RAG）。

Spring AI 默认没有支持所有的大模型（尤其是国产的），更多的是支持兼容 OpenAI API 的大模型的集成，参考 [官方的模型对比](https://docs.spring.io/spring-ai/reference/api/chat/comparison.html)。因此，我们如果想要调用阿里系大模型（比如通义千问），推荐直接使用阿里自主封装的 [Spring AI Alibaba 框架](https://java2ai.com/)，它不仅能直接继承阿里系大模型，用起来更方便，而且与标准的 Spring AI 保持兼容。

可以参考下列官方文档，来跑通调用大模型的流程：F7tJcIi3p8FeqNCjWVeu5upTi3p2RdJYO6ijosrM4XM=

- [灵积模型接入指南](https://java2ai.com/docs/1.0.0-M6.1/models/dashScope/)
- [通义千问接入指南](https://java2ai.com/docs/1.0.0-M6.1/models/qwq/)

使用SpringAI Alibaba

https://www.java2ai.com/docs/1.0.0-M6.1/get-started/?spm=5176.29160081.0.0.770aaa5c8gkf4O

```xml
<dependency>
    <groupId>com.alibaba.cloud.ai</groupId>
    <artifactId>spring-ai-alibaba-starter</artifactId>
    <version>1.0.0-M6.1</version>
</dependency>
```

版本号改成M6.1

官方提醒：由于 spring-ai 相关依赖包还没有发布到中央仓库，如出现 spring-ai-core 等相关依赖解析问题，请在项目的 pom.xml 依赖中加入如下仓库配置。

```xml
<repositories>
  <repository>
    <id>spring-milestones</id>
    <name>Spring Milestones</name>
    <url>https://repo.spring.io/milestone</url>
    <snapshots>
      <enabled>false</enabled>
    </snapshots>
  </repository>
</repositories>

```

2）编写配置：

yml

```yaml
spring:
  application:
    name: spring-ai-alibaba-qwq-chat-client-example
  ai:
    dashscope:
      api-key: ${AI_DASHSCOPE_API_KEY}
      chat:
        options:
          model: qwen-plus
```

3）编写示例代码，注意要注入 `dashscopeChatModel`：

```java
// 取消注释即可在 SpringBoot 项目启动时执行
@Component
public class SpringAiAiInvoke implements CommandLineRunner {

    @Resource
    private ChatModel dashscopeChatModel;

    @Override
    public void run(String... args) throws Exception {
        AssistantMessage output = dashscopeChatModel.call(new Prompt("你好，我是鱼皮"))
                .getResult()
                .getOutput();
        System.out.println(output.getText());
    }
}

```

上述代码实现了 C‎ommandLineRunner 接﻿口，我们启动 Spring Boot⁢ 项目时，会自动注入大模型 Chat‌Model 依赖，并且单次执行该类的‏ run 方法，达到测试的效果。

上述代码中我们是通‎过 ChatModel 对象调用大模型，适合简单﻿的对话场景。除了这种方式外，Spring AI ⁢还提供了 ChatClient 调用方式，提供更‌多高级功能（比如会话记忆），适合复杂场景，在后续‏ AI 应用开发章节中会详细介绍。

### LangChain4j

和 Spring AI ‎作用一样，LangChain4j 是一个专注于﻿构建基于大语言模型（LLM）应用的 Java ⁢框架，作为知名 AI 框架 LangChain‌ 的 Java 版本，它提供了丰富的工具和抽象‏层，简化了与 LLM 的交互和应用开发。

LangChain 官方是没有支持阿里系大模型的，只能用 [社区版本的整合大模型包](https://github.com/langchain4j/langchain4j-community/tree/main/models)。可以在官方文档中查询支持的模型列表：[LangChain4j模型集成](https://docs.langchain4j.dev/integrations/language-models/)

要接入阿里云灵积模型，可以参考官方文档：[DashScope模型集成](https://docs.langchain4j.dev/integrations/language-models/dashscope)，提供了依赖和示例代码。

1）首先引入依赖：

```xml
<!-- https://mvnrepository.com/artifact/dev.langchain4j/langchain4j-community-dashscope -->
<dependency>
    <groupId>dev.langchain4j</groupId>
    <artifactId>langchain4j-community-dashscope</artifactId>
    <version>1.0.0-beta2</version>
</dependency>

```

值得一提的是，LangChain4j 也提供了 Spring Boot Starter，方便在 Spring 项目中使用，最新版本号可以在 [Maven中央仓库](https://mvnrepository.com/artifact/dev.langchain4j/langchain4j-community-dashscope) 查询。我们这里由于只是编写 Demo，而且已经引入了 Spring AI 的 Starter，就不再引入 LangChain 的 Starter 了，担心会有冲突。EpOEyBAaM5v7y0F4F6O6NOLNGmRiQoDp7UOeVaXD6X8=

2）参考 [官方文档](https://docs.langchain4j.dev/get-started) 来编写示例对话代码，创建了一个 ChatModel 并调用，是不是和 Spring AI 很像？

```java
public class LangChainAiInvoke {

    public static void main(String[] args) {
        ChatLanguageModel qwenModel = QwenChatModel.builder()
                .apiKey(TestApiKey.API_KEY)
                .modelName("qwen-max")
                .build();
        String answer = qwenModel.chat("我是程序员鱼皮，这是编程导航 codefather.cn 的原创项目教程");
        System.out.println(answer);
    }
}

```

最后直接运行 Main 方法进行测试即可。F7tJcIi3p8FeqNCjWVeu5upTi3p2RdJYO6ijosrM4XM=

### 接入方式对比

以下是 4 种 AI 大模型接入方式的优缺点对比：

| 接入方式    | 优点                                                         | 缺点17ycTJj/8ey9lP7bQzAlv/kfIjIQUEysRdJI/r5xcbA=             | 适用场景                                       |
| ----------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ---------------------------------------------- |
| SDK 接入    | • 类型安全，编译时检查• 完善的错误处理• 通常有详细文档• 性能优化好 | • 依赖特定版本• 可能增加项目体积• 语言限制KKFkRSbjjI5i+avLexNLjRdHhKByazdVmpkJr7kGFY4= | • 需要深度集成• 单一模型提供商• 对性能要求高   |
| HTTP 接入   | • 无语言限制• 不增加额外依赖• 灵活性高 ‎                      | • 需要手动处理错误• 序列化/反序列化复杂• 代码冗长QRmPY0/t0wuZJggGtNrkS0mvAFyMuPAINGeZ/1Di7UM= | • SDK不支持的语言• 简单原型验证• 临时性集成    |
| Spring﻿ AI   | • 统一的抽象接口• 易于切换模型提供商• 与Spring生态完美融合• 提供高级功能 | • 增加额外抽象层• 可能不⁢支持特定模型的特性• 版本还在快速迭代KKFkRSbjjI5i+avLexNLjRdHhKByazdVmpkJr7kGFY4= | • Spring应用• 需要支持多种模型• 需要高级AI功能 |
| LangChain4j | ‌ • 提供完整的AI应用工具链• 支持复杂工作流• 丰富的组件和工具• 适合构建AI代理 | • 学习曲线较陡• 文档相对较少• 抽‏象可能引入性能开销3K8ziYH9JyLAFKAK+wTyhieq3SkGztp5xqcG+VVIA2k= | • 构建复杂AI应用• 需要链式操作• RAG应用开发    |

个人更推荐选择 Spring AI‎，一方面是它属于 Spring 生态，更主流；另一方面是它简单易用﻿、资源更多，更利于学习，也能满足我们绝大多数 AI 项目的开⁢发需求                因此本项目的后续教程，也会以 Spring AI ‌为主。学会一个 AI 开发框架后，其他框架学起来都‏是如鱼得水                

💡 无论‎选择哪种接入方式，﻿都建议先使用简单的⁢测试案例验证接入是‌否成功，然后再进行‏更复杂的功能开发。

### 扩展知识-本地部署

## Prompt工程

基本概念

Prompt工程又叫提示词工程，简单来说，就是输入给AI的指令。比如下面这段内容，就是提示词

```java
请问学习Prompt工程有什么用？
```

那为什么要叫工程呢？

因为AI大模型生成的内容是不确定的，构建一个能够按照预期生成内容的提示词既是一门艺术，也是一门科学。提示词的质量直接影响到AI大模型输出的结果，因此这也是AI应用开发的关键技能，很多公司专门招聘提示词工程师

![image-20250617100143734](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20250617100143734.png)

我们学习 ‎Prompt 工程﻿的目标是：通过精心⁢设计和优化输入提示‌来引导 AI 模型‏生成符合预期的高质量输出。

### 提示词分类

**核心-基于角色的分类**

在 AI ‎对话中，基于角色的﻿分类是最常见的，通⁢常存在 3 种主要‌类型的 Promp‏t：

1）用户 Promp‎t (User Prompt)：这是用户﻿向 AI 提供的实际问题、指令或信息，传⁢达了用户的直接需求。用户 Prompt ‌告诉 AI 模型 “做什么”，比如回答问‏题、编写代码、生成创意内容等。

```java
用户：帮我写一首关于春天的短诗
```

2）系统 Prompt‎ (System Prompt)：这是设置﻿ AI 模型行为规则和角色定位的隐藏指令，⁢用户通常不能直接看到。系统 Prompt ‌相当于给 AI 设定人格和能力边界，即告诉‏ AI “你是谁？你能做什么？”。

```markdown
复制代码系统：你是一位经验丰富的恋爱顾问，擅长分析情感问题并提供建设性建议。请以温暖友善的语气回答用户的恋爱困惑，必要时主动询问更多信息以便提供更准确的建议。不要做出道德判断，而是尊重用户的情感体验并提供实用的沟通和相处技巧。回答时保持专业性，但避免使用过于学术的术语，确保普通用户能够理解你的建议。
```

不同的系统 P‎rompt 可以让同一个 ﻿AI 模型表现出完全不同的⁢应用特性，这是构建垂直领域‌ AI 应用（如财务顾问、‏教育辅导、医疗咨询等）的关键。

比如 23 ‎年 AI 刚流行的时候﻿，很多 AI 助手平台⁢，都是基于设置不同的系‌统 Prompt 来提‏供不同的 AI 助手。

3）助手 Prompt ‎(Assistant Prompt)：这是 AI﻿ 模型的响应内容。在多轮对话中，之前的助手回复也⁢会成为当前上下文的一部分，影响后续对话的理解‌和生成。某些场景下，开发者可以主动预设一些助手消息作‏为对话历史的一部分，引导后续互动。EpOEyBAaM5v7y0F4F6O6NOLNGmRiQoDp7UOeVaXD6X8=

```markdown
复制代码助手：我是你的恋爱顾问，很高兴能帮助你解决情感问题。你目前遇到了什么样的恋爱困惑呢？可以告诉我你们的关系现状和具体遇到的问题吗？
```

在实际应用‎中，这些不同类型的﻿提示词往往会组合⁢使用。举个例子，一个‌完整的对话可能包含‏：

```plain
系统：你是编程导航的专业编程导师，擅长引导初学者入门编程并制定学习路径。使用友好鼓励的语气，解释复杂概念时要通俗易懂，适当使用比喻让新手理解，避免过于晦涩的技术术语。

用户：我完全没有编程基础，想学习编程开发，但不知道从何开始，能给我一些建议吗？

助手：欢迎加入编程的世界！作为编程小白，建议你可以按照以下步骤开始学习之旅...

【多轮对话继续】
```

AI 大模‎型开发平台允许用户﻿自主设置各种不同类⁢型的提示词来进行调‌试：

![image-20250617100310313](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20250617100310313.png)

### Token

Token 是‎大模型处理文本的基本单位，可﻿能是单词或标点符号，模型的输⁢入和输出都是按 Token ‌计算的，一般 Token 越‏多，成本越高，并且输出速度越慢。EpOEyBAaM5v7y0F4F6O6NOLNGmRiQoDp7UOeVaXD6X8=

因此在 A‎I 应用开发中，了﻿解和控制 Toke⁢n 的消耗至关重要‌。

#### 如何计算 Token？

首先，不同‎大模型对 Toke﻿n 的划分规则略有⁢不同，比如根据 O‌penAI 的文档‏：QRmPY0/t0wuZJggGtNrkS0mvAFyMuPAINGeZ/1Di7UM=

- 英文文本：一个 token 大约相当于 4 个字符或约 0.75 个英文单词
- 中文文本：一个汉字通常会被编码为 1-2 个 token
- 空格和标点：也会计入 token 数量
- 特殊符号和表情符号：可能需要多个 token 来表示

简单估算一下‎，100 个英文单词约等﻿于 75-150 个 T⁢oken，而 100 个‌中文字符约等于 100-‏200 个 Token。

实际应用中‎，更推荐使用工具来﻿估计 Prompt⁢ 的 Token ‌数量，比如：QRmPY0/t0wuZJggGtNrkS0mvAFyMuPAINGeZ/1Di7UM=

- [OpenAI Tokenizer](https://platform.openai.com/tokenizer)：适用于 OpenAI 模型的官方 Token 计算器
- [非官方的 Token 计算器](https://tiktoken.aigc2d.com/)

#### Token 成本计算

估算成本有‎个公式：总成本 =﻿ (输入token⁢数 × 输入单价)‌ + (输出tok‏en数 × 输出单价)

不同大模型‎的计费都不太一样，﻿因此要认真阅读官方⁢文档的计费标准，比‌如阿里系大模型：

![image-20250617101147178](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/image-20250617101147178.png)

建议大家估‎算成本时，可以多去﻿对比不同大模型的价⁢格，参考下列表格去‌整理一个详细的对比‏表格，结果一目了然：

EpOEyBAaM5v7y0F4F6O6NOLNGmRiQoDp7UOeVaXD6X8=ypPmThsop+wxUWnsCRy5HQnH/HXKLQyxX76yDZKIoGI=VTOJ1E18APZdTdBeEMcyg8EtiTR+2iWkLcnWUQa6tpw=EpOEyBAaM5v7y0F4F6O6NOLNGmRiQoDp7UOeVaXD6X8=

| 模型       | 输入价格(/1K tokens) | 输出价格(/1K tokens)KKFkRSbjjI5i+avLexNLjRdHhKByazdVmpkJr7kGFY4= | 1000字对话预估成本 |
| ---------- | -------------------- | ------------------------------------------------------------ | ------------------ |
| GPT-xx     | $0.0015              | $0.002                                                       | ¥0.02-0.03         |
| GPT-xxx ‎   | $0.03                | $0.06                                                        | ¥0.3-0.5           |
| Cla⁢ude-xxx | $0.00‌025             | $0.00125                                                     | ¥0.01-0.02         |

#### Token 成本优化技巧

注意，系统‎提示词、用户提示词﻿和 AI 大模型输⁢出的内容都是消耗成‌本的，因此我们成本‏优化主要从这些角度进行。

1）精简系统‎提示词：移除冗余表述，保﻿留核心指令。比如将 “你⁢是一个非常专业、经验丰富‌且非常有耐心的编程导师”‏ 简化为 “你是编程导师”。

2）定期清理‎对话历史：对话上下文会随﻿着交互不断累积 Tok⁢en。在长对话中，可以定期‌请求 AI 总结之前的对‏话，然后以总结替代详细历史。

3）使用向量检索‎代替直接输入：对于需要处理大量参﻿考文档的场景，不要直接将整个文档⁢作为 Prompt，而是使用向量‌数据库和检索技术（RAG）获取‏相关段落。后续教程会带大家实战。

4）结构化‎替代自然语言：使用﻿表格、列表等结构化⁢格式代替长段落描述‌。3K8ziYH9JyLAFKAK+wTyhieq3SkGztp5xqcG+VVIA2k=

举个例子，优化前：

```markdown
请问如何制作披萨？首先需要准备面粉、酵母、水、盐、橄榄油作为基础面团材料。然后根据口味选择酱料，可以是番茄酱或白酱。接着准备奶酪，最常用的是马苏里拉奶酪。最后准备各种配料如意大利香肠、蘑菇、青椒等。
```

优化后：

```markdown
披萨制作材料：
- 面团：面粉、酵母、水、盐、橄榄油
- 酱料：番茄酱/白酱
- 奶酪：马苏里拉
- 配料：意大利香肠、蘑菇、青椒等

如何制作？
```

### Prompt优化技巧

前面也提到了，‎设计 Prompt 是一门﻿艺术，高质量的 Promp⁢t 可以显著提升 AI 输‌出的质量，因此我们需要重点‏掌握 Prompt 优化技巧。

### 利用资源

#### 1、Prompt 学习

网上和 Pro‎mpt 优化相关的资源非常﻿丰富，几乎各大主流 AI ⁢大模型和 AI 开发框架官‌方文档都有相关的介绍，推荐‏先阅读至少 2 篇，比如：

- [Prompt Engineering Guide 提示工程指南](https://www.promptingguide.ai/zh)
- [OpenAI 提示词工程指南](https://platform.openai.com/docs/guides/prompt-engineering)
- [Spring AI 提示工程指南](https://docs.spring.io/spring-ai/reference/api/prompt.html#_prompt_engineering)
- [Authropic 提示词工程指南](https://docs.anthropic.com/zh-CN/docs/build-with-claude/prompt-engineering/overview)
- [Authropic 提示词工程指南（开源仓库）](https://github.com/anthropics/prompt-eng-interactive-tutorial)
- [智谱 AI Prompt 设计指南](https://open.bigmodel.cn/dev/guidelines/LanguageModels)

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/IoZbbknGdQt9X6NT.webp)

#### 2、Prompt 提示词库

网上也有很‎多现成的提示词库，﻿在自主优化提示词前⁢，可以先尝试搜索有‌没有现成的提示词参‏考：

- 文本对话：[Authropic 提示词库](https://docs.anthropic.com/zh-CN/prompt-library/library)
- AI 绘画：[Midjourney 提示词库](https://promptlibrary.org/)

![img](https://gitee.com/try-to-be-better/cloud-images/raw/master/img/cC3ichM0RHwxt1Ty.webp)



### 基础提示技巧

#### 1、明确指定任务和角色

为 AI ‎提供清晰的任务描述﻿和角色定位，帮助模⁢型理解背景和期望。

```plain
系统：你是一位经验丰富的Python教师，擅长向初学者解释编程概念。
用户：请解释 Python 中的列表推导式，包括基本语法和 2-3 个实用示例。
```

#### 2、提供详细说明和具体示例

提供足够的‎上下文信息和期望的﻿输出格式示例，减少⁢模型的不确定性。

```plain
请提供一个社交媒体营销计划，针对一款新上市的智能手表。计划应包含:
1. 目标受众描述
2. 三个内容主题
3. 每个平台的内容类型建议
4. 发布频率建议

示例格式:
目标受众: [描述]
内容主题: [主题1], [主题2], [主题3]
平台策略: [平台] - [内容类型] - [频率]
```

#### 3、使用结构化格式引导思维

通过列表、表格等结构化格式，使指令更易理解，输出更有条理。

```plain
分析以下公司的优势和劣势:
公司: Tesla

请使用表格格式回答，包含以下列:
- 优势(最少3项)
- 每项优势的简要分析
- 劣势(最少3项)
- 每项劣势的简要分析
- 应对建议
```

#### 4、明确输出格式要求

指定输出的‎格式、长度、风格等要﻿求，获得更符合预期的⁢结果        ‌          ‏              

```plain
撰写一篇关于气候变化的科普文章，要求:
- 使用通俗易懂的语言，适合高中生阅读
- 包含5个小标题，每个标题下2-3段文字
- 总字数控制在800字左右
- 结尾提供3个可行的个人行动建议
```

### 进阶提示技巧

#### ‎1、思维链提示法（﻿Chain-of-⁢Thought）

引导模型展示推理过程，逐步思考问题，提高复杂问题的准确性。

```plain
问题：一个商店售卖T恤，每件15元。如果购买5件以上可以享受8折优惠。小明买了7件T恤，他需要支付多少钱？

请一步步思考解决这个问题:
1. 首先计算7件T恤的原价
2. 确定是否符合折扣条件
3. 如果符合，计算折扣后的价格
4. 得出最终支付金额
```

#### ‎2、少样本学习（F﻿ew-Shot L⁢earning）

通过提供几‎个输入-输出对的示﻿例，帮助模型理解任⁢务模式和期望输出。

```plain
我将给你一些情感分析的例子，然后请你按照同样的方式分析新句子的情感倾向。

输入: "这家餐厅的服务太差了，等了一个小时才上菜"
输出: 负面，因为描述了长时间等待和差评服务

输入: "新买的手机屏幕清晰，电池也很耐用"
输出: 正面，因为赞扬了产品的多个方面

现在分析这个句子:
"这本书内容还行，但是价格有点贵"
```

#### 3、分步骤指导（Step-by-Step）

将复杂任务分解为可管理的步骤，确保模型完成每个关键环节。

```plain
请帮我创建一个简单的网站落地页设计方案，按照以下步骤:

步骤1: 分析目标受众(考虑年龄、职业、需求等因素)
步骤2: 确定页面核心信息(主标题、副标题、价值主张)
步骤3: 设计页面结构(至少包含哪些区块)
步骤4: 制定视觉引导策略(颜色、图像建议)
步骤5: 设计行动召唤(CTA)按钮和文案
```

#### 4、自我评估和修正

让模型评估自己的输出并进行改进，提高准确性和质量。

```plain
解决以下概率问题:
从一副标准扑克牌中随机抽取两张牌，求抽到至少一张红桃的概率。

首先给出你的解答，然后:
1. 检查你的推理过程是否存在逻辑错误
2. 验证你使用的概率公式是否正确
3. 检查计算步骤是否有误
4. 如果发现任何问题，提供修正后的解答
```

#### 5、知识检索和引用

引导模型检索相关信息并明确引用信息来源，提高可靠性。

```plain
请解释光合作用的过程及其在植物生长中的作用。在回答中:
1. 提供光合作用的科学定义
2. 解释主要的化学反应
3. 描述影响光合作用效率的关键因素
4. 说明其对生态系统的重要性

对于任何可能需要具体数据或研究支持的陈述，请明确指出这些信息的来源，并说明这些信息的可靠性。
```

#### 6、多视角分析

引导模型从不‎同角度、立场或专业视角﻿分析问题，提供全面见解⁢           ‌           ‏          

```plain
分析"城市应该禁止私家车进入市中心"这一提议:

请从以下4个不同角度分析:
1. 环保专家视角
2. 经济学家视角
3. 市中心商户视角
4. 通勤居民视角

对每个视角:
- 提供支持该提议的2个论点
- 提供反对该提议的2个论点
- 分析可能的折中方案
```

#### 7、多模态思维

结合不同表‎达形式进行思考，如﻿文字描述、图表结构⁢、代码逻辑等。

```plain
设计一个智能家居系统的基础架构:

1. 首先用文字描述系统的主要功能和组件
2. 然后创建一个系统架构图(用ASCII或文本形式表示)
3. 接着提供用户交互流程
4. 最后简述实现这个系统可能面临的技术挑战

尝试从不同角度思考:功能性、用户体验、技术实现、安全性等。
```













































































































































































