---
title: 《Web应用开发技术》笔记
slug: note-web
publishedDate: 2022-02-25 08:15:12
tags: [HTML, CSS, JS]
category: CUMT课程笔记
---

>学习选择
>
>教程：
>
>课堂
>
>[w3school 在线教程](https://www.w3school.com.cn/index.html)
>
>[Web 入门 - 学习 Web 开发 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Learn/Getting_started_with_the_web)
>
>软件：IDEA

# 概述

## Web

Web应用程序包含：前端的Web浏览器+支持HTTP协议的Web服务器+基于HTML格式的Web文档

Web的三要素

* 超文本技术(HTML)看得懂
* 统一资源定位技术(URL)可定位
* 应用层协议(HTTP)找得到

静态网页：这类网页文件里没有程序代码，只有HTML标记，一般以后缀.htm或.html存放。 

<img src="http://r6x04xz01.hd-bkt.clouddn.com/image-20220225083721716.png" alt="服务器请求静态网页" style="zoom:67%;" />

动态网页：这类网页文件不仅含有HTML标记，而且含有程序代码，这种网页的后缀一般根据不同的程序设计语言而不同，如ASP.NET文件的后缀为.aspx；JSP文件为.jsp。 两个显著特点：可以动态产生页面、支持客户端和服务器端的交互功能。

<img src="http://r6x04xz01.hd-bkt.clouddn.com/image-20220225084356960.png" alt="动态页面" style="zoom:67%;" />

|      |        **静态网页**        |              **动态网页**              |
| :--: | :------------------------: | :------------------------------------: |
| 内容 |        网页内容固定        |            网页内容动态生成            |
| 后缀 |       .htm；.html等        |    .ASP，.JSP，.PHP，.CGI, .ASPX等     |
| 优点 |      无需系统实时生成      | 日常维护简单，更改结构方便，交互性能强 |
| 缺点 | 交互性能较差，日常维护繁琐 |       需要大量的系统资源合成网页       |
|  DB  |           不支持           |                  支持                  |

工作原理

* C/S模式：服务器通常采用高性能的PC、大型数据库系统。客户端需要安装专用的客户端软件。 这类应用程序一般独立的运行。（很多工作可以在客户端处理后再提交给服务器，客户端响应速度快。管理信息系统具有较强的事务处理能力，能实现复杂的业务流程。客户机端必须装客户端软件及相应环境后，才能访问服务器兼容性不强，对客户端的操作系统有一定的限制）
* B/S模式：客户机上只要安装一个浏览器，服务器安装Web Server。统一了客户端，将系统功能实现的核心部分集中到服务器上，简化了系统的开发、维护和使用。需要借助浏览器来运行。

主流动态Web技术：JSP/JAVA、ASP/ASP.NET、PHP、Python+Django/Flask/Pyramid、Ruby+Rails/Grape/Sinatra

# HTML

## 概述

HTML（Hyper Text Markup Language）它不是一种真正的编程语言，只是一种标记符。

基本结构

```html
<!DOCTYPE  html>
<HTML>
<HEAD>
<TITLE>我的第一个网页 </TITLE>
</HEAD>
<BODY>
	Hello World!
</BODY>
</HTML>
```

ps：最好在一开始就养成习惯，文件夹和文件名使用小写，用短横线而不是空格来分隔。可以避免许多问题。

* 网站应该使用什么结构？
  下面来看看测试网站应该使用什么结构。最基本、最常见的结构是：一个主页、一个图片文件夹、一个样式表文件夹和一个脚本文件夹：
  * index.html ：这个文件一般包含主页内容，即用户第一次访问站点时看到的文本和图像。使用文本编辑器在 test-site 文件夹中新建 index.html。
  * images 文件夹 ：这个文件夹包含站点中的所有图像。在 test-site 文件夹中新建 images 文件夹。
  * styles 文件夹 ：这个文件夹包含站点所需样式表（比如，设置文本颜色和背景颜色）。在 test-site 文件夹中新建一个 styles 文件夹。
  * scripts 文件夹 ：这个文件夹包含提供站点交互功能的 JavaScript 代码（比如读取数据的按钮）。在 test-site 文件夹中新建一个 scripts 文件夹。

## 元素

- HTML 元素以*开始标签*起始
- HTML 元素以*结束标签*终止
- *元素的内容*是开始标签与结束标签之间的内容
- 某些 HTML 元素具有*空内容（empty content）*
- 空元素*在开始标签中进行关闭*（以开始标签的结束而结束）
- 大多数 HTML 元素可拥有*属性*

HTML 标签对大小写不敏感：`<P> `等同于` <p>`。许多网站都使用大写的 HTML 标签。

W3School 使用的是小写标签，因为万维网联盟（W3C）在 HTML 4 中*推荐*使用小写，而在未来 (X)HTML 版本中*强制*使用小写。

## 属性

| 属性  | 值               | 描述                                     |
| :---- | :--------------- | :--------------------------------------- |
| class | classname        | 规定元素的类名（classname）              |
| id    | id               | 规定元素的唯一 id                        |
| style | style_definition | 规定元素的行内样式（inline style）       |
| title | text             | 规定元素的额外信息（可在工具提示中显示） |

## 标题、水平线、注释

标题（Heading）是通过` <h1> `-` <h6> `等标签进行定义的。

`<hr/>` 标签在 HTML 页面中创建水平线。

```html
<h1>This is a heading</h1>
<h2>This is a heading</h2>
<!-- This is a comment -->
<p>This is a paragraph</p>
<hr />
<p>This is a paragraph</p>
<hr />
<p>This is a paragraph</p>
```

## 段落

使用空的段落标记 `<p></p> `去插入一个空行是个坏习惯。用 `<br />` 标签代替它！（但是不要用` <br />` 标签去创建列表）

在不产生一个新段落的情况下进行换行（新行），请使用` <br />` 标签

在 XHTML、XML 以及未来的 HTML 版本中，不允许使用没有结束标签（闭合标签）的 HTML 元素。

即使` <br>` 在所有浏览器中的显示都没有问题，使用 `<br />` 也是*更长远的保障*。

浏览器会忽略了源代码中的排版（省略了多余的空格和换行）无论你在HTML元素的内容中使用多少空格(包括空白字符，包括换行)，当渲染这些代码的时候，HTML解释器会将连续出现的空白字符减少为一个单独的空格符。

```
<h1>This is a heading</h1>
<h2>This is a heading</h2>
<p>This is<br />a para<br />graph with line breaks</p>
```

## 样式

不赞成使用的标签和属性：在 HTML 4 中，有若干的标签和属性是被废弃的。被废弃（Deprecated）的意思是在未来版本的 HTML 和 XHTML 中将不支持这些标签和属性。最好使用样式代替。

```html
标签
<center>定义居中的内容。
<font> 和 <basefont>	定义 HTML 字体。
<s> 和 <strike>	定义删除线文本
<u>	定义下划线文本
属性
align	定义文本的对齐方式
bgcolor	定义背景颜色
color	定义文本颜色
```

背景颜色（style 属性淘汰了旧的 bgcolor 属性。）

```html
<body style="background-color:yellow">
<h2 style="background-color:red">This is a heading</h2>
<p style="background-color:green">This is a paragraph.</p>
</body>
```

字体、颜色和尺寸（style 属性淘汰了旧的` <font> `标签。）

```html
<h1 style="font-family:verdana">A heading</h1>
<p style="font-family:arial; color:red; font-size:20px;">A paragraph.</p>
```

 文本对齐（style 属性淘汰了旧的 align 属性）

````
<h1 style="text-align:center">This is a heading</h1>
````

## 文本格式化、引用

[HTML 文本格式化 (w3school.com.cn)](https://www.w3school.com.cn/html/html_formatting.asp)

[HTML 引用 (w3school.com.cn)](https://www.w3school.com.cn/html/html_quotation_elements.asp)

* 实体引用： 在HTML中包含特殊字符

| 原义字符                                                     | 等价字符引用 |
| :----------------------------------------------------------- | :----------- |
| <                                                            | `&lt;`       |
| >                                                            | `&gt;`       |
| xxxxxxxxxx7 1#settings.py文件中被修改2ITEM_PIPELINES = {3    #  管道可以有很多个  那么管道是有优先级的  优先级的范围是1到1000   值越小优先级越高4    'scrapy_dangdang_095.pipelines.ScrapyDangdang095Pipeline': 300,5    #DangDangDownloadPipeline6    'scrapy_dangdang_095.pipelines.DangDangDownloadPipeline':3017}python | `&quot;`     |
| '                                                            | `&apos;`     |
| &                                                            | `&amp;`      |

##  CSS

[HTML CSS (w3school.com.cn)](https://www.w3school.com.cn/html/html_css.asp)

##  链接

有两种使用` <a>` 标签的方式：

1. 通过使用 href 属性 - 创建指向另一个文档的链接（使用 Target 属性，你可以定义被链接的文档在何处显示。）

```
<a href="http://www.w3school.com.cn/" target="_blank">Visit W3School!</a>
```

2. 通过使用 name 属性 - 创建文档内的书签（当使用命名锚（named anchors）时，我们可以创建直接跳至该命名锚（比如页面中某个小节）的链接，这样使用者就无需不停地滚动页面来寻找他们需要的信息了。）用 id 属性来替代 name 属性，命名锚同样有效。

```html
首先，我们在 HTML 文档中对锚进行命名（创建一个书签）：
<a name="tips">基本的注意事项 - 有用的提示</a>
然后，我们在同一个文档中创建指向该锚的链接：
<a href="#tips">有用的提示</a>
您也可以在其他页面中创建指向该锚的链接：
<a href="http://www.w3school.com.cn/html/html_links.asp#tips">有用的提示</a>
在上面的代码中，我们将 # 符号和锚名称添加到 URL 的末端，就可以直接链接到 tips 这个命名锚了。
```

## 图像

`<img> `是空标签，意思是说，它只包含属性，并且没有闭合标签。

当浏览器无法载入图像时，替换文本属性可告诉读者他们失去的信息。此时，浏览器将显示这个替代性的文本而不是图像。为页面上的图像都加上替换文本属性alt是个好习惯，这样有助于更好的显示信息，并且对于那些使用纯文本浏览器的人来说是非常有用的。

```html
<html>
<body background="/i/eg_background.jpg">
<p>gif 和 jpg 文件均可用作 HTML 背景。</p>
<p>如果图像小于页面，图像会进行重复。</p>
<img src="boat.gif" alt="Big Boat" width="200" height="200">
<p>
<img src ="/i/eg_cute.gif" align ="left" > 
带有图像的一个段落。图像的 align 属性设置为 "left"。图像将浮动到文本的左侧。还有bottom（默认） right middle top
</p>
</body>
</html>
```

## 表格

边框、表头、跨行跨列

```html
<h4>横跨两列的单元格：</h4>
<table border="1">
<tr>
  <th>姓名</th>
  <th colspan="2">电话</th>
</tr>
<tr>
  <td>Bill Gates</td>
  <td>555 77 854</td>
  <td>555 77 855</td>
</tr>
</table>

<h4>横跨两行的单元格：</h4>
<table border="1">
<tr>
  <th>姓名</th>
  <td>Bill Gates</td>
</tr>
<tr>
  <th rowspan="2">电话</th>
  <td>555 77 854</td>
</tr>
<tr>
  <td>555 77 855</td>
</tr>
</table>
```

## 列表

无序列表、有序列表、定义列表。列表项内部可以使用段落、换行符、图片、链接以及其他列表等等。无序type（disc默认、circle、square），有序type（默认数字、A、a、I、i）

```html
<ul type="disc">
	<li>Coffee</li>
	<li>Milk</li>
</ul>

<ol>
	<li>Coffee</li>
	<li>Milk</li>
</ol>

<dl>
	<dt>Coffee</dt>
	<dd>Black hot drink</dd>
	<dt>Milk</dt>
	<dd>White cold drink</dd>
</dl>
```

## 表单

用于收集用户输入

表单元素：不同类型的 input 元素：文本框text、单选按钮radio、提交按钮submit等等。

action 属性定义在提交表单时执行的动作。向服务器提交表单的通常做法是使用提交按钮。通常，表单会被提交到 web 服务器上的网页。

GET和POST

* GET（默认方法）如果表单提交是被动的（比如搜索引擎查询），并且没有敏感信息。使用 GET 时，表单数据在页面地址栏中是可见的。GET 最适合少量数据的提交。浏览器会设定容量限制。
* 如果表单正在更新数据，或者包含敏感信息（例如密码）。POST 的安全性更好，因为在页面地址栏中被提交的数据是不可见的。
* 关于 GET 的注意事项：
  - 以名称/值对的形式将表单数据追加到 URL
  - 永远不要使用 GET 发送敏感数据！（提交的表单数据在 URL 中可见！）
  - URL 的长度受到限制（2048 个字符）
  - 对于用户希望将结果添加为书签的表单提交很有用
  - GET 适用于非安全数据，例如 Google 中的查询字符串

* 关于 POST 的注意事项：
  * 将表单数据附加在 HTTP 请求的正文中（不在 URL 中显示提交的表单数据）POST 没有大小限制，可用于发送大量数据。
  * 带有 POST 的表单提交无法添加书签

如果要正确地被提交，每个输入字段必须设置一个 name 属性。否则不会提交

`<fieldset>` 元素组合表单中的相关数据

`<legend> `元素为` <fieldset>` 元素定义标题。

`<select>` 元素（下拉列表）添加 selected 属性来定义预定义选项。

`<textarea>`元素定义多行输入字段

`<button>`按钮

input 属性：value 属性规定输入字段的初始值，readonly 属性规定输入字段为只读（不能修改），disabled 属性规定输入字段是禁用的。被禁用的元素是不可用和不可点击的。被禁用的元素不会被提交。size 属性规定输入字段的尺寸（以字符计）maxlength 属性规定输入字段允许的最大长度

主要元素如下

```html
<form action="action_page.php" method="GET">
    <fieldset>
        <legend>Personal information:</legend>
        First name:<br>
        <input type="text" name="firstname"><br>
        User password:<br>
<input type="password" name="psw">
        <input type="radio" name="sex" value="male" checked>Male<br>
        <input type="radio" name="sex" value="female">Female<br>
        <input type="checkbox" name="vehicle" value="Bike">I have a bike<br>
        <input type="checkbox" name="vehicle" value="Car">I have a car<br>
        <select name="cars">
            <option value="volvo" selected>Volvo</option>
            <option value="saab">Saab</option>
            <option value="fiat">Fiat</option>
        </select>
        <textarea name="message" rows="10" cols="30">The cat was playing in the garden.</textarea>
        <input type="submit" value="Submit按钮">
        <button type="button" onclick="alert('Hello World!')">Click Me!</button>
    </fieldset>
</form> 
```

| form属性       | 描述                                                       |
| :------------- | :--------------------------------------------------------- |
| accept-charset | 规定在被提交表单中使用的字符集（默认：页面字符集）。       |
| action         | 规定向何处提交表单的地址（URL）（提交页面）。              |
| autocomplete   | 规定浏览器应该自动完成表单（默认：开启）。                 |
| enctype        | 规定被提交数据的编码（默认：url-encoded）。                |
| method         | 规定在提交表单时所用的 HTTP 方法（默认：GET）。或者post    |
| name           | 规定识别表单的名称（对于 DOM 使用：document.forms.name）。 |
| novalidate     | 规定浏览器不验证表单。                                     |
| target         | 规定 action 属性中地址的目标（默认：\_self）。\_blank等    |

HTML5 增加了多个新的输入类型：color、date、datetime、datetime-local、email、month、number、range、search、tel、time、url、week

Input form* 属性：input 的 form属性规定 `<input>` 元素所属的表单。此属性的值必须等于它所属的 `<form>` 元素的 id 属性。位于 HTML 表单之外的输入字段,但仍是表单的一部分

```html
<form action="/action_page.php" id="form1">
  <label for="fname">姓氏：</label>
  <input type="text" id="fname" name="fname"><br><br>
  <input type="submit" value="提交">
</form>

<label for="lname">名字：</label>
<input type="text" id="lname" name="lname" form="form1">
```

## canvas、SVG

canvas 元素本身是没有绘图能力的。所有的绘制工作必须在 JavaScript 内部完成

```html
<canvas id="myCanvas" width="200" height="100"></canvas>
```

[HTML5 Canvas (w3school.com.cn)](https://www.w3school.com.cn/html/html5_canvas.asp)

可伸缩矢量图形 (Scalable Vector Graphics)

```html
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" height="190">
  <polygon points="100,10 40,180 190,60 10,60 160,180"
  style="fill:lime;stroke:purple;stroke-width:5;fill-rule:evenodd;" />
</svg>
```

对比

* Canvas
  - 依赖分辨率
  - 不支持事件处理器
  - 弱的文本渲染能力
  - 能够以 .png 或 .jpg 格式保存结果图像
  - 最适合图像密集型的游戏，其中的许多对象会被频繁重绘
* SVG
  - 不依赖分辨率
  - 支持事件处理器
  - 最适合带有大型渲染区域的应用程序（比如谷歌地图）
  - 复杂度高会减慢渲染速度（任何过度使用 DOM 的应用都不快）
  - 不适合游戏应用

## 插件

`<object> `HTML 文档中的嵌入式对象,它旨在将插件（例如 Java applet、PDF 阅读器和 Flash 播放器）嵌入网页中，但也可以用于将 HTML 包含在 HTML 中

`<embed> `也定义了 HTML 文档中的嵌入式对象。元素没有结束标记。它无法包含替代文本。

```html
<object width="100%" height="500px" data="snippet.html"></object>
<embed width="100%" height="500px" src="snippet.html">

<object data="audi.jpeg"></object>
<embed src="audi.jpeg">
```

## 音视频

 HTML5` <audio>`

mp3 文件在Internet Explorer、Chrome 以及 Safari 有效。为了使这段音频在 Firefox 和 Opera 中同样有效，添加了一个 ogg 类型的文件。如果失败，会显示错误消息。

```html
<audio controls="controls" height="100" width="100">
  <source src="song.mp3" type="audio/mp3" />
  <source src="song.ogg" type="audio/ogg" />
<embed height="100" width="100" src="song.mp3" />
</audio>
```

网站上找播放器代码复制粘贴

使用超链接：浏览器会启动“辅助应用程序”来播放该文件

```html
<a href="song.mp3">Play Sound</a>
```

 HTML5` <video>`

```html
<video width="320" height="240" controls="controls">
  <source src="movie.mp4" type="video/mp4" />
  <source src="movie.ogg" type="video/ogg" />
  <source src="movie.webm" type="video/webm" />
  <object data="movie.mp4" width="320" height="240">
    <embed src="movie.swf" width="320" height="240" />
  </object>
</video>
```

## H5

HTML5 是最新的 HTML 标准。

HTML5 是跨平台的，被设计为在不同类型的硬件（PC、平板、手机、电视机等等）之上运行。HTML5 的一些最有趣的新特性：

* 新的语义元素，比如` <header>`,` <footer>`, `<article>`, and `<section>`。（语义化标签）
* 新的表单控件，比如数字、日期、时间、日历和滑块。
* 强大的图像支持（借由 `<b>` 和 `<svg>`）
* 强大的多媒体支持（借由 `<video>` 和 `<audio>`）
* 强大的新 API，比如用本地存储取代 cookie。

所有现代浏览器都支持 HTML5。所有浏览器，不论新旧，都会自动把未识别元素当做行内元素来处理。

# CSS

## 概述

* CSS 指的是Cascading Style Sheets)

* CSS 描述了如何在屏幕、纸张或其他媒体上显示 HTML 元素

* CSS 节省了大量工作。它可以同时控制多张网页的布局

* 外部样式表存储在 .CSS 文件中

* HTML 从未打算包含用于格式化网页的标签，创建 HTML 的目的是描述网页的内容，css解决这个问题

* 语法

  ```css
  p {
    color: red;
    text-align: center;
  }
  ```

  * p 是 CSS 中的选择器（它指向要设置样式的 HTML 元素：<p>）。
  * color 是属性，red 是属性值
  * text-align 是属性，center 是属性值

* 使用方法

  1. 外部 CSS

     通过使用外部样式表，您只需修改一个文件即可改变整个网站的外观。每张 HTML 页面必须在 head 部分的 `<link>` 元素内包含对外部样式表文件的引用。

     ```html
     <head>
     <link rel="stylesheet" type="text/css" href="mystyle.css">
     </head>
     ```

     ```css
     body {
       background-color: lightblue;
     }
     
     h1 {
       color: navy;
       margin-left: 20px;
     }
     ```

     ps:请勿在属性值和单位之间添加空格（例如 `margin-left: 20 px;`）。正确的写法是：`margin-left: 20px;`

  2. 内部 CSS

     如果一张 HTML 页面拥有唯一的样式，那么可以使用内部样式表。内部样式是在 head 部分的 `<style> `元素中进行定义。
  
     ```html
     <head>
     <style>
     body {
       background-color: linen;
     }
     
     h1 {
       color: maroon;
       margin-left: 40px;
     } 
     </style>
     </head>
     ```
  
  3. 行内 CSS
  
     行内样式（也称内联样式）可用于为单个元素应用唯一的样式。如需使用行内样式，请将 style 属性添加到相关元素。style 属性可包含任何 CSS 属性。
  
     ```html
     <h1 style="color:blue;text-align:center;">This is a heading</h1>
     ```
  
* 优先级：行内样式、内外部样式表（都有看最后的）、浏览器默认样式

* id 具有唯一性,class 具有普遍性

## 选择器

* 分类
  * 简单选择器（根据名称、id（#）、类（.）、通用（\*）来选取元素）
  * 组合器选择器（根据它们之间的特定关系来选取元素）
  * 伪类选择器（根据特定状态（,等）选取元素）
  * 伪元素选择器（选取元素的一部分并设置其样式）
  * 属性选择器（根据属性或属性值来选取元素）

<img src="https://s2.loli.net/2022/03/05/ZhrfpuNcJgF1z5k.png" alt="img" style="zoom:67%;" />

伪类：用来添加一些选择器的特殊效果

| 选择器         | 含义                                                      |
| -------------- | --------------------------------------------------------- |
| E:first-child  | 匹配父元素的第一个子元素                                  |
| E:link         | 匹配所有未被点击的链接                                    |
| E:visited      | 匹配所有已被点击的链接                                    |
| E:active       | 匹配鼠标已经其上按下、还没有释放的E元素                   |
| E:hover        | 匹配鼠标悬停其上的E元素                                   |
| E:focus        | 匹配获得当前焦点的E元素                                   |
| E:lang(c)      | 匹配lang属性等于c的E元素                                  |
| E:first-line   | 匹配E元素的第一行                                         |
| E:first-letter | 匹配E元素的第一个字母                                     |
| E:before       | 在E元素之前插入生成的内容                                 |
| E:after        | 在E元素之后插入生成的内容                                 |
| E:enabled      | 匹配表单中激活的元素                                      |
| E:disabled     | 匹配表单中禁用的元素                                      |
| E:checked      | 匹配表单中被选中的radio（单选框）或checkbox（复选框）元素 |
| E:selection    | 匹配用户当前选中的元素                                    |

## 颜色

* background-color
* color:DodgerBlue;
* border:2px solid Tomato
* 在 CSS 中，还可以使用 RGB 值、HEX 值、HSL 值、RGBA 值或者 HSLA 值来指定颜色

## 背景

* background-color
* background-image:url("paper.gif");

* background-repeat: repeat-x/repeat-y/no-repeat

* background-attachment: 背景图像是应该滚动还是固定的（不会随页面的其余部分一起滚动）fixed/scroll

* background-position: right top   etc.

* background 简写属性(按上述顺序写，缺失不要紧)

  ```css
  body {
    background: #ffffff url("tree.png") no-repeat right top;
  }
  ```

## 框模型

### 框模型介绍

所有 HTML 元素都可以视为方框。在 CSS 中，在谈论设计和布局时，会使用术语“盒模型”或“框模型”。

CSS 框模型实质上是一个包围每个 HTML 元素的框。它包括：外边距、边框、内边距以及实际的内容。下图展示了框模型

<img src="https://www.w3school.com.cn/i/css/boxmodel.gif" alt="CSS 框模型" style="zoom:50%;" />

* 内容 - 框的内容，其中显示文本和图像。
* 内边距 - 清除内容周围的区域。内边距是透明的。
* 边框 - 围绕内边距和内容的边框。
* 外边距 - 清除边界外的区域。外边距是透明的。

### margin

* margin-X：auto、length（px、pt、cm）、%、inherit（允许负值）

* margin 简写属性，可以设置一到四个值

* 外边距合并：当两个垂直外边距相遇时，它们将形成一个外边距。

  * 合并后的外边距的高度等于两个发生合并的外边距的高度中的较大者。当一个元素出现在另一个元素上面时，第一个元素的下外边距与第二个元素的上外边距会发生合并。

    <img src="https://www.w3school.com.cn/i/css/margin_collapsing_1.gif" alt="CSS 外边距合并实例 1" style="zoom: 50%;" />

  * 当一个元素包含在另一个元素中时（假设没有内边距或边框把外边距分隔开），它们的上和/或下外边距也会发生合并。

    <img src="https://www.w3school.com.cn/i/css/margin_collapsing_example_2.gif" alt="CSS 外边距合并实例 2" style="zoom:50%;" />

  * 外边距甚至可以与自身发生合并。假设有一个空元素，它有外边距，但是没有边框或填充。在这种情况下，上外边距与下外边距就碰到了一起，它们会发生合并。如果这个外边距遇到另一个元素的外边距，它还会发生合并。

    <img src="https://s2.loli.net/2022/03/03/FKIGfgRaH8LOdCS.png" alt="CSS 外边距合并实例 3" style="zoom:50%;" />

    <img src="https://www.w3school.com.cn/i/css/margin_collapsing_example_4.gif" alt="CSS 外边距合并实例 4" style="zoom:50%;" />

### padding

* padding-X：length（px、pt、cm）、%、inherit（不允许负值）

* padding 简写属性，可以设置一到四个值

* 内边距和元素宽度

  CSS width 属性指定元素内容区域的宽度。内容区域是元素（盒模型）的内边距、边框和外边距内的部分。

  因此，如果元素拥有指定的宽度，则添加到该元素的内边距会添加到元素的总宽度中。这通常是不希望的结果。

  若要将宽度保持为 300px，无论填充量如何，可以使用 box-sizing 属性。这将导致元素保持其宽度。如果增加内边距，则可用的内容空间会减少。

### height、width

* height 和 width 属性用于设置元素的高度和宽度。

* height 和 width 属性**不包括内边距、边框或外边距**。它设置的是**元素内边距、边框以及外边距内的区域的高度或宽度**。
* auto、length（px、pt、cm）、%、initial、inherit
* max-width：length（px、pt、cm）、%、none

### border边框

* border-width

  * 宽度设置为特定大小（以 px、pt、cm、em 计），也可以使用以下三个预定义值之一：thin、medium 或 thick。
  * 属性可以设置一到四个值（一个所有，两个上下再左右，三个上、左右、下，四个上右下左顺时针）

* border-style

  * 类型：dotted 点线、dashed 虚线、solid 实线、double 双边、none 无边框、hidden 隐藏边框
  * **除非设置了 border-style 属性，否则其他 CSS 边框属性都不会有任何作用**

* border-color 

  * 和颜色差不多，如果未设置，继承元素的颜色。
  * 可以设置一到四个值。

* border-X-Y（X=top/right/bottom/left, Y=style/width/color）每一侧指定属性的不同的值

* border **简写属性** （border-width、border-style（必需）、border-color）

  ```css
  p {
    border: 5px solid red;
  }
  p {
    border-left: 6px solid red;
    background-color: lightgrey;
  }
  ```

* border-radius 圆角边框

### 轮廓

轮廓与边框不同，轮廓是在元素边框之外绘制的，并且可能与其他内容**重叠**。同样，轮廓也**不是**元素尺寸的一部分；元素的总宽度和高度不受轮廓线宽度的影响

- outline-width
  * 宽度设置为特定大小（以 px、pt、cm、em 计），也可以使用以下三个预定义值之一：thin、medium 或 thick。
  * 属性可以设置一到四个值（一个所有，两个上下再左右，三个上、左右、下，四个上右下左顺时针）
- outline-style 类型
  * dotted 点、dashed 虚、solid 实、double 双、none 无、hidden 隐藏
  * **除非设置了 outline-style属性，否则其他 CSS 轮廓属性都不会有任何作用**
- outline-color
  * 和颜色差不多，还有invert反转
- outline **简写属性** （border-width、border-style（必需）、border-color）
- outline-offset 轮廓偏移，属性在元素的轮廓与边框之间添加空间。元素及其轮廓之间的空间是透明的。

## 行内元素和块元素

* 行内元素（inline element）
  特点是只占内容的宽度，默认不会换行，行内元素一般放文本或者其它的行内元素。常见内联元素`<span>`、`<a>`
* 块元素(block element)
  特点不管内容有多少，它要换行，同时沾满整行，块元素可以放文本，行内元素，块元素。常见块元素：`<div>`，`<p>`。
* 区别：行内元素只占内容的宽度，块元素内容不管内容多少要占全行。 行内元素只能容纳文本和其它行内元素，块元素可以容纳文本，行内元素和块元素。

## 文本、字体、图标、链接

### 文本字体

* font-size

  CSS 定义了 5 个常用的字体名称:  serif, sans-serif, monospace, cursive,和 fantasy. 这些都是非常通用的，当使用这些通用名称时，使用的字体完全取决于每个浏览器，而且它们所运行的每个操作系统也会有所不同。这是一种糟糕的情况，浏览器会尽力提供一个看上去合适的字体。

`font-family: Helvetica, Arial, sans-serif;`

* font-size

* font-style

* font-weight

* font简写:如果你想要使用 font 的简写形式，在所有这些属性中，只有 font-size 和 font-family 是一定要指定的。

  `font: italic normal bold normal 3em/1.5 Helvetica, Arial, sans-serif;`

* text-transform

* text-decoration

* text-shadow

* text-align

* line-height

### 链接

* LoVe Fears HAte

  未访问过的 (Unvisited) 、访问过的 (Visited)、悬停 (Hover) 、选中 (Focus) 、激活 (Active)

* 加图片

  ```css
  a[href*="http"] {
    background: url('https://mdn.mozillademos.org/files/12982/external-link-52.png') no-repeat 100% 0;
  }
  ```

  

 

## 列表、表格

## 溢出和浮动

## CSS 定位

* 普通流：块级框从上到下一个接一个地排列（不设宽度时，独占一行），框之间的垂直距离是由框的垂直外边距计算出来，行内元素会按顺序依次前后排列。
* 浮动float：设置元素浮动到页面的边缘。取值如下：
  * none：缺省值，不浮动
  * left:元素在页面左边缘浮动,让出自己右边空间，给下一个元素显示；
  * right:元素在页面右边缘浮动,直到碰到他的父元素的右边界。
  * 浮动目的：就是可以让多个块级元素一行内显示，从而实现布局效果。
* 使用 position 属性，可以选择 4 种不同类型的定位
  * static元素框正常生成。块级元素生成一个矩形框，作为文档流的一部分，行内元素则会创建一个或多个行框，置于其父元素中。
  * relative元素框偏移某个距离。元素仍保持其未定位前的形状，它原本所占的空间仍保留。
  * absolute元素框从文档流完全删除，并相对于其包含块定位。包含块可能是文档中的另一个元素或者是初始包含块。元素原先在正常文档流中所占的空间会关闭，就好像元素原来不存在一样。元素定位后生成一个块级框，而不论原来它在正常流中生成何种类型的框。
  * fixed元素框的表现类似于将 position 设置为 absolute，不过其包含块是视窗本身。
  * 粘性定位(sticky positioning)是最后一种我们能够使用的定位方式。它将默认的静态定位(static positioning)和固定定位(fixed positioning)相混合。当一个元素被指定了position: sticky时，它会在正常布局流中滚动，直到它出现在了我们给它设定的相对于容器的位置，这时候它就会停止随滚动移动，就像它被应用了position: fixed一样。

## 响应式Web设计

核心方法一：响应式布局，流动布局为最佳选择，百分比和em为最佳单位

核心方法二：媒介查询，为站点设定视口、使用媒介查询



# JavaScript

## 概述

* JavaScript 组成
  * ECMAScript(核心)，描述了该语javascript组成，语言的语法和基本对象。 
  * 文档对象模型（DOM），描述处理网页内容的方法和接口。
  * 浏览器对象模型（BOM），描述与浏览器进行交互的方法和接口。

* 将JavaScript嵌入网页中的三种方法
  1. 使用` <script>…</script>` 标签将语句嵌入文档
  2. 将外部JavaScript 源文件链接到 html 文档中,`	<script src= "test.js"></script>`可使多个网页共享一个脚本文件内的代码,一般在其中定义一系列在多个网页中都可能要用到的函数
  3. 作为网页元素的事件处理程序,当事件触发时自动运行`<marquee  onmouseover="this.stop()">`

## 变量、函数、运算符、方法

* var 关键词声明变量
* 局部变量：函数内声明变量，必须要以 var 声明
* 全局变量：函数外声明的变量.

```
function 函数名([参数[,参数...]]){
	<语句组>
	[return <表达式>；]
} 
```

* 全局变量不需要以 var 关键字进行声明，但局部变量则必须
  以此关键字来声明。(建议所有变量都采用var声明)  Javascript没有块级作用域

* +：如果操作数都是数字时执行加法运算，如果其中的操作数有字符串时，会执行连接字符串的作用
* ？：
* typeof

| eval(string)     | 计算javascript代码串，把对应的字符串解析成JS代码并运行 |
| ---------------- | ------------------------------------------------------ |
| isNaN()          | 检测一个值是否是非数字的值                             |
| parseInt()       | 将字符串转换为整数                                     |
| parseFloat()     | 将字符串转换为数字                                     |
| alert()          | 弹出对话框显示消息                                     |
| confirm()        | 用对话框询问一个回答为是或否的问题                     |
| prompt()         | 弹出对话框，请求用户输入一个字符串                     |
| document.write() | 向文档窗口输出字符串                                   |

# DOM

W3C 文档对象模型（DOM）是中立于平台和语言的接口，它允许程序和脚本动态地访问、更新文档的内容、结构和样式。

属性是您能够获取或设置的值（就比如改变 HTML 元素的内容）。

方法是您能够完成的动作（比如添加或删除 HTML 元素）。

* 查找 HTML 元素

| 方法                                    | 描述                   |
| :-------------------------------------- | :--------------------- |
| document.getElementById(*id*)           | 通过元素 id 来查找元素 |
| document.getElementsByTagName(*name*)   | 通过标签名来查找元素   |
| document.getElementsByClassName(*name*) | 通过类名来查找元素     |

* 改变 HTML 元素

| 方法                                       | 描述                   |
| :----------------------------------------- | :--------------------- |
| element.innerHTML = *new html content*     | 改变元素的 inner HTML  |
| element.attribute = *new value*            | 改变 HTML 元素的属性值 |
| element.setAttribute(*attribute*, *value*) | 改变 HTML 元素的属性值 |
| element.style.property = *new style*       | 改变 HTML 元素的样式   |

* 添加删除

| 方法                              | 描述             |
| :-------------------------------- | :--------------- |
| document.createElement(*element*) | 创建 HTML 元素   |
| document.removeChild(*element*)   | 删除 HTML 元素   |
| document.appendChild(*element*)   | 添加 HTML 元素   |
| document.replaceChild(*element*)  | 替换 HTML 元素   |
| document.write(*text*)            | 写入 HTML 输出流 |

* 添加事件处理程序

| 方法                                                     | 描述                            |
| :------------------------------------------------------- | :------------------------------ |
| document.getElementById(id).onclick = function(){*code*} | 向 onclick 事件添加事件处理程序 |

# jQuery

## 概述

* 主要的 jQuery 函数为： $() 函数（jQuery 函数）。通过向该函数传递 DOM 对象，返回 jQuery 对象，使用 jQuery的 功能。
* jQuery 允许通过 CSS 选择器来选取元素。
* 在 JavaScript 中，可以分配一个函数以处理窗口加载事件

```html
下载jQuery库，地址 http://jquery.com/
注意不同的库版本
<script src="jquery-2.1.4.min.js"></script>

从 CDN 中载入 jQuery, 如从 Google 中加载 jQuery
<script   src="http://code.jquery.com/jquery-3.3.1.min.js"   integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="   crossorigin="anonymous"></script>//
<script src=“https://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js”>//百度

```

* 基础语法是：`$(selector).action()`

  美元符号定义 jQuery
  选择符（selector）“查询”和“查找” HTML 元素
  jQuery 的 action() 执行对元素的操作

## 选择器

* jQuery 使用 CSS 选择器来选取 HTML 元素。

  `$("p") `选取` <p>` 元素。

  `$("p.intro") `选取所有 class="intro" 的` <p>` 元素。

  `$("p#demo") `选取所有 id="demo" 的` <p> `元素。

* jQuery 使用 XPath 表达式来选择带有给定属性的元素。

  `$("[href]")` 选取所有带有 href 属性的元素。

  `$("[href='#']") `选取所有带有 href 值等于 "#" 的元素。

  `$("[href!='#']") `选取所有带有 href 值不等于 "#" 的元素。

  `$("[href$='.jpg']")` 选取所有 href 值以 ".jpg" 结尾的元素。

* jQuery CSS 选择器可用于改变 HTML 元素的 CSS 属性。

  `$("p").css("background-color","red");`把所有 p 元素的背景颜色更改为红色

| 语法                  | 描述                                                   |
| :-------------------- | :----------------------------------------------------- |
| $(this)               | 当前 HTML 元素                                         |
| $("p")                | 所有 `<p> `元素                                        |
| $("p.intro")          | 所有 class="intro" 的 `<p> `元素                       |
| $(".intro")           | 所有 class="intro" 的元素                              |
| $("#intro")           | id="intro" 的元素                                      |
| $("ul li:first")      | 每个 `<ul>` 的第一个` <li>` 元素                       |
| \$("[href\$='.jpg']") | 所有带有以 ".jpg" 结尾的属性值的 href 属性             |
| $("div#intro .head")  | id="intro" 的` <div>` 元素中的所有 class="head" 的元素 |

## 事件

* 由于 jQuery 是为处理 HTML 事件而特别设计的，最好

  - 把所有 jQuery 代码置于事件处理函数中
  - 把所有事件处理函数置于文档就绪事件处理器中
  - 把 jQuery 代码置于单独的 .js 文件中
  - 如果存在名称冲突，则重命名 jQuery 库

* jQuery 名称冲突

  jQuery 使用 $ 符号作为 jQuery 的简介方式。

  某些其他 JavaScript 库中的函数（比如 Prototype）同样使用 $ 符号。

  jQuery 使用名为 noConflict() 的方法来解决该问题。

  ``var jq=jQuery.noConflict()``，帮助您使用自己的名称（比如 jq）来代替 $ 符号。

| Event 函数                      | 绑定函数至                                     |
| :------------------------------ | :--------------------------------------------- |
| $(document).ready(function)     | 将函数绑定到文档的就绪事件（当文档完成加载时） |
| $(selector).click(function)     | 触发或将函数绑定到被选元素的点击事件           |
| $(selector).dblclick(function)  | 触发或将函数绑定到被选元素的双击事件           |
| $(selector).focus(function)     | 触发或将函数绑定到被选元素的获得焦点事件       |
| $(selector).mouseover(function) | 触发或将函数绑定到被选元素的鼠标悬停事件       |

## 效果

* `$(selector).hide/show(speed,callback);`

```html
<script type="text/javascript">
$(document).ready(function(){
  $("#hide").click(function(){
  $("p").hide(1000);
  });
  $("#show").click(function(){
  $("p").show(500);
  });
});
</script>
```

* `toggle(speed,callback)`

````html
<script type="text/javascript">
$(document).ready(function(){
  $("button").click(function(){
  $("p").toggle(1000);
  });
});
</script>
````

* `fadeIn(speed,callback)`
* `fadeOut(speed,callback)`
* `fadeToggle(speed,callback)`
* `fadeTo(speed,opacity,callback)`

```html
<script>
$(document).ready(function(){
  $("button").click(function(){
    $("#div1").fadeToggle();
    $("#div2").fadeToggle("slow");
    $("#div3").fadeToggle(3000);
  });
});
</script>
```

* `slideDown()\slideUp()\slideToggle()`

# JSP

## 简介

JSP是Servlet API的一个扩展。JSP在处理请求之前都要编译成Servlet，所以它具有Servlet的所有优势，包括访问Java API。服务器上的JSP程序负责处理客户端的请求，其程序代码对于客户端来说不可见。 

## 工作原理

JSP所有的程序都在服务器端运行，服务器端收到用户通过浏览器提交的请求，经过一定处理后再以HTML的形式返回给客户端，客户端得到的只是在浏览器中看到的静态网页。

## 交互步骤

1. 客户端和服务器建立连接
2. 客户端发送请求
3. 服务器发出响应
4. 关闭连接

<img src="http://r6x04xz01.hd-bkt.clouddn.com/image-20220225090115596.png" alt="JSP与客户端的交互步骤" style="zoom:60%;" />



# Servlet

# MVC

# 新技术

# 课程考核相关

## 课程考核

* 30%平时+30%实验+40%软件
* 实验一：HTML 5 + CSS + JavaScript
* 实验二：动态Web页面设计实验
* 实验三：Web数据库实验
* 实验四：网站设计及实现实验
* 详见《考察成果要求》

## 课前分享

* XML与XHTML
* MySQL
* 正则表达式
* 网站建设
* 网站快速开发技术
* Web领域中“传奇”人物
* 自己提一个相关的题目 
* 展示一些自己的作品
