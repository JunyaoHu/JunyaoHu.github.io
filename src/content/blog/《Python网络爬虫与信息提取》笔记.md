---
title: Python网络爬虫
slug: note-python-crawling
publishedDate: 2022-02-06 20:00:00
tags: [Python, 爬虫]
category: 课外学习
---

>学习选择
>
>基础：先看的这个，基础操作，用的idle，有些跳了步骤，可能东西比较老（requests、解析（beautiful）、Re、Scrapy）[Python数据分析与展示，北京理工大学，中国大学MOOC(慕课) (icourse163.org)](https://www.icourse163.org/course/BIT-1001870002?tid=1462344444)
>
>进阶：**建议不如直接看这个**，讲得更细节，用的pycharm，东北老师，讲课老精神了（直接看p51-104，对于基础，补充了Urllib、解析（xpath、jsonpath）、selenium）[尚硅谷Python爬虫教程小白零基础速通（含python基础+爬虫案例），哔哩哔哩，bilibili](https://www.bilibili.com/video/BV1Db4y1m7Ho?p=71)

# 获取

## urllib

<img src="http://r6x04xz01.hd-bkt.clouddn.com/image-20220208160917249.png" style="zoom:67%;" />

* get

```python
#urllib.parse.quote()
import urllib.request
import urllib.parse
url = 'https://www.baidu.com/s?wd='
headers = {
	'User‐Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'
}
url = url + urllib.parse.quote('小野')
request = urllib.request.Request(url=url,headers=headers)
response = urllib.request.urlopen(request)
print(response.read().decode('utf‐8'))

#urllib.parse.urlencode（）
import urllib.request
import urllib.parse
url = 'http://www.baidu.com/s?'
data = {
	'name':'小刚', 'sex':'男',
}
data = urllib.parse.urlencode(data)
url = url + data
print(url)
headers = {
	'User‐Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'
}
request = urllib.request.Request(url=url,headers=headers)
```

* post

```python
import urllib.request
import urllib.parse
url = 'https://fanyi.baidu.com/sug'
headers = {
    'user‐agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'
}
keyword = input('请输入您要查询的单词')
data = {
	'kw':keyword
}
data = urllib.parse.urlencode(data).encode('utf‐8')
request = urllib.request.Request(url=url,headers=headers,data=data)
response = urllib.request.urlopen(request)
print(response.read().decode('utf‐8'))

import json
# loads将字符串转换为python对象
obj = json.loads(content)
# python对象转换为json字符串 ensure_ascii=False 忽略字符集编码
s = json.dumps(obj,ensure_ascii=False)
print(s)
```

* ajax的get请求(前后端分离的情况,可以拿到json)

```python
# 爬取豆瓣电影前10页数据
# https://movie.douban.com/j/chart/top_list?type=20&interval_id=100%3A90&action=&start=0&limit=20

import urllib.request
import urllib.parse

# 下载前10页数据
# 下载的步骤：1.请求对象的定制 2.获取响应的数据 3.下载
# 每执行一次返回一个request对象

def create_request(page):
	base_url = 'https://movie.douban.com/j/chart/top_list?type=20&interval_id=100%3A90&action=&'
	headers = {
	'User‐Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36'
	}
    data={
        'start':(page‐1)*20,
        'limit':20
    }
    # data编码
    data = urllib.parse.urlencode(data)
    url = base_url + data
    request = urllib.request.Request(url=url,headers=headers)
    return request


def get_content(request):
    response = urllib.request.urlopen(request)
    content = response.read().decode('utf‐8')
    return content

def down_load(page,content):
    # with open（文件的名字，模式，编码）as fp:
    # fp.write(内容)
    with open('douban_'+str(page)+'.json','w',encoding='utf‐8')as fp:
    fp.write(content)
    
if __name__ == '__main__':
    start_page = int(input('请输入起始页码'))
    end_page = int(input('请输入结束页码'))
    for page in range(start_page,end_page+1):
    request = create_request(page)
    content = get_content(request)
    down_load(page,content)
```

* 异常错误
  1. HTTPError类是URLError类的子类
  2. 导入的包urllib.error.HTTPError urllib.error.URLError
  3. http错误：http错误是针对浏览器无法连接到服务器而增加出来的错误提示。引导并告诉浏览者该页是哪里出 了问题。
  4. 通过urllib发送请求的时候，有可能会发送失败，这个时候如果想让你的代码更加的健壮，可以通过try‐ except进行捕获异常，异常有两类，URLError\HTTPError

* cookie登录
  1. cookie 跳过登录
  2. refer 防盗链
* handle 定制更高级的请求头（随着业务逻辑的复杂 请求对象的定制已经满足不了我们的需求（动态cookie和代理 不能使用请求对象的定制）
* 代理服务器（突破自身IP访问限制，访问国外站点。访问一些单位或团体内部资源。提高访问速度。隐藏真实IP）(代理池\快代理)

```python
import urllib.request
url = 'http://www.baidu.com/s?wd=ip'
headers = {
	'User ‐ Agent': 'Mozilla / 5.0(Windows NT 10.0;Win64;x64) AppleWebKit / 537.36(KHTML, like Gecko) Chrome / 74.0.3729.169Safari / 537.36'
}
request = urllib.request.Request(url=url,headers=headers)
proxies = {'http':'117.141.155.244:53281'}
handler = urllib.request.ProxyHandler(proxies=proxies)
opener = urllib.request.build_opener(handler)
response = opener.open(request)
content = response.read().decode('utf‐8')
with open('daili.html','w',encoding='utf‐8')as fp:
	fp.write(content)
```

## requests

<img src="https://s2.loli.net/2022/02/06/y4Jae2OriWfUgDK.png" style="zoom: 67%;" />

<img src="https://s2.loli.net/2022/02/06/XaKJYEPZCgIF7qR.png" style="zoom:67%;" />

<img src="https://s2.loli.net/2022/02/06/nldsfZD1eJ8hcHK.png" style="zoom:67%;" />

<img src="https://s2.loli.net/2022/02/06/6VxtmPieTaAk3N4.png"  style="zoom:67%;" />

<img src="https://s2.loli.net/2022/02/06/yS4AEgRn5IFNmhC.png" style="zoom:67%;" />

<img src="https://s2.loli.net/2022/02/06/Yr1KXAeq7HjnpSW.png" style="zoom:67%;" />

<img src="https://s2.loli.net/2022/02/06/bV8Iwk7qiHZMKvR.png"  style="zoom:67%;" />

<img src="https://s2.loli.net/2022/02/06/yQjRklAz4Sq8GVU.png" style="zoom:67%;" />

* 代理

```python
proxy = {'http':'219.149.59.250:9797'}
r = requests.get(url=url,params=data,headers=headers,proxies=proxy)
```

```python
import requests
def getHTMLText(url):
    try:
        r=requests.get(url, timeout=30)
        r.raise_for_status()
        #如果状态不是200，引发HTTPError异常
        r.encoding=r.apparent_encoding
        return r.text
    except:
        return "产生异常"
if __name__ == "__main__":
    url = "http://www.baidu.com"
print(getHTMLText(url))

#实例2：亚马逊商品页面的爬取
import requests
url = "https://www.amazon.cn/gp/product/B01M8L5Z3Y"
try:
    kv = {'user-agent':'Mozilla/5.0'}
    r = requests.get(url, headers=kv)
    r.raise_for_status()
    r.encoding = r.apparent_encoding
    print(r.text[1000:2000])
except:
    print("爬取失败")

#实例3：百度/360搜索关键字提交
import requests
keyword = "Python"
url ='http://www.baidu.com/s'
try:
    kv = {'wd': 'keyword'}
    r = requests.get(url, params=kv)
    print(r.status_code)
    print(r.request.url)
    r.raise_for_status()
    print(len(r.text))
except:
    print("爬取失败")
    
#网络图片的爬取和存储
import requests
import os
url = "http://xwzx.cumt.edu.cn/_upload/article/images/2f/99/d44299934d00afe8f03684d5c59b/f682d3bc-972c-4d5a-9542-c52e0b72032f.jpg"
root = "D://pics//"
path = root + url.split('/')[-1]
try:
    if not os.path.exists(root):
        os.mkdir(root)
    if not os.path.exists(path):
        r = requests.get(url)
        with open(path, 'wb') as f:
            f.write(r.content)
            f.close()
            print("文件保存成功")
    else:
        print("文件已存在")
except:
    print("爬取失败")

#实例5：IP地址归属地的自动查询
import requests
url = "https://ipchaxun.com/"
try:
    r = requests.get(url+'202.204.80.112')
    r.raise_for_status()
    r.encoding = r.apparent_encoding
    print(r.text[-500:])
except:
    print("爬取失败")
```

# 解析

## xpath

* xpath基本语法

  1. 路径查询

      //：查找所有子孙节点，不考虑层级关系 

     / ：找直接子节点

  2. 谓词查询 

     //div[@id]

      //div[@id="maincontent"] 

  3. 属性查询

      //@class 

  4. 模糊查询 

     //div[contains(@id, "he")]

      //div[starts‐with(@id, "he")]

  5. 内容查询 

     //div/h1/text()

  6. 逻辑运算 

     //div[@id="head" and @class="s_down"]

     //title | //price （其实这是列表的用法）

```python
from lxml import etree
#解析本地文件
html_tree = etree.parse('XX.html')
#服务器响应文件
html_tree = etree.HTML(response.read().decode('utf‐8')
html_tree.xpath([xpath路径])
```



## jsonpath

教程连接（http://blog.csdn.net/luxideyao/article/details/77802389）

## Beautiful Soup

<img src="https://s2.loli.net/2022/02/06/Kkmhg8qZSUITBGQ.png" style="zoom:67%;" />

<img src="https://s2.loli.net/2022/02/06/K5LNoJG2VsDctzB.png" style="zoom:67%;" />

<img src="https://s2.loli.net/2022/02/06/hfmyXuoV5dTLl8Q.png" style="zoom:67%;" />

<img src="https://s2.loli.net/2022/02/06/JtE7syTib1vWk6P.png" style="zoom:67%;" />

```python
#CrawUnivRanking.py
import requests
from bs4 import BeautifulSoup
import bs4

def getHTMLText(url):
    try:
        r = requests.get(url, timeout=30)
        r.raise_for_status()
        r.encoding = r.apparent_encoding
        return r.text
    except:
        return ""

def fillUnivList(ulist, html):
    soup = BeautifulSoup(html, "html.parser")
    for tr in soup.find('tbody').children:
        if isinstance(tr, bs4.element.Tag):
            tds = tr('td')
            ulist.append([tds[0].string, tds[1].string, tds[3].string])

def printUnivList(ulist, num):
    tplt = "{0:^10}\t{1:{3}^10}\t{2:^10}"
    print(tplt.format("排名","学校名称","总分",chr(12288)))
    for i in range(num):
        u=ulist[i]
        print(tplt.format(u[0],u[1],u[2],chr(12288)))
    
def main():
    uinfo = []
    url = 'https://www.zuihaodaxue.cn/zuihaodaxuepaiming2016.html'
    html = getHTMLText(url)
    fillUnivList(uinfo, html)
    printUnivList(uinfo, 20) # 20 univs
main()
```

## Re

<img src="https://s2.loli.net/2022/02/06/b8H5g6Lv7VCXxGn.png" style="zoom:67%;" />

<img src="https://s2.loli.net/2022/02/06/5CEwfnGBL73dSpc.png" style="zoom:67%;" />

<img src="https://s2.loli.net/2022/02/06/inYpyLteGKQoIBR.png"  style="zoom:67%;" />

<img src="https://s2.loli.net/2022/02/06/I9y6UAKVsu5BCZo.png" style="zoom:67%;" />

<img src="https://s2.loli.net/2022/02/06/FKyVemjPzCSbTO7.png" style="zoom:67%;" />

<img src="https://s2.loli.net/2022/02/06/RGWbYF29I8Ljkqf.png"  style="zoom:67%;" />

<img src="https://s2.loli.net/2022/02/06/4Rapl59VjyGEFUh.png" style="zoom:67%;" />

<img src="https://s2.loli.net/2022/02/06/Ob9xqz2kFimZGRL.png" style="zoom:67%;" />

```python
#CrowTaobaoPrice.py
import requests
import re

def getHTMLText(url):
    try:
        kv = \
            {
                'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36 Edg/97.0.1072.76',
                'Cookie':'【去审查元素自己看看】'
            }
        r = requests.get(url, timeout=30, headers=kv)
        r.raise_for_status()
        r.encoding = r.apparent_encoding
        return r.text
    except:
        print("getHTMLText")
        return ""
    
def parsePage(ilt, html):
    try:
        plt = re.findall(r'\"view_price\"\:\"[\d\.]*\"',html)
        tlt = re.findall(r'\"raw_title\"\:\".*?\"',html)
        for i in range(len(plt)):
            price = eval(plt[i].split(':')[1])
            title = eval(tlt[i].split(':')[1])
            ilt.append([price , title])
    except:
        print("parsePage")

def printGoodsList(ilt):
    tplt = "{:4}\t{:8}\t{:16}"
    print(tplt.format("序号", "价格", "商品名称"))
    count = 0
    for g in ilt:
        count = count + 1
        print(tplt.format(count, g[0], g[1]))
        
goods = '书包'
depth = 3
start_url = 'https://s.taobao.com/search?q=' + goods
infoList = []
for i in range(depth):
    try:
        url = start_url + '&s=' + str(44*i)
        html = getHTMLText(url)
        parsePage(infoList, html)
    except:
        continue
printGoodsList(infoList)
```

```python
#CrawBaiduStocksB.py
import requests
from bs4 import BeautifulSoup
import traceback
import re

def getHTMLText(url, code="utf-8"):
    try:
        r = requests.get(url)
        r.raise_for_status()
        r.encoding = code
        return r.text
    except:
        return ""

def getStockList(lst, stockURL):
    html = getHTMLText(stockURL, "GB2312")
    soup = BeautifulSoup(html, 'html.parser') 
    a = soup.find_all('a')
    for i in a:
        try:
            href = i.attrs['href']
            lst.append(re.findall(r"[s][hz]\d{6}", href)[0])
        except:
            continue

def getStockInfo(lst, stockURL, fpath):
    count = 0
    for stock in lst:
        url = stockURL + stock + ".html"
        html = getHTMLText(url)
        try:
            if html=="":
                continue
            infoDict = {}
            soup = BeautifulSoup(html, 'html.parser')
            stockInfo = soup.find('div',attrs={'class':'stock-bets'})

            name = stockInfo.find_all(attrs={'class':'bets-name'})[0]
            infoDict.update({'股票名称': name.text.split()[0]})
            
            keyList = stockInfo.find_all('dt')
            valueList = stockInfo.find_all('dd')
            for i in range(len(keyList)):
                key = keyList[i].text
                val = valueList[i].text
                infoDict[key] = val
            
            with open(fpath, 'a', encoding='utf-8') as f:
                f.write( str(infoDict) + '\n' )
                count = count + 1
                print("\r当前进度: {:.2f}%".format(count*100/len(lst)),end="")
        except:
            count = count + 1
            print("\r当前进度: {:.2f}%".format(count*100/len(lst)),end="")
            continue

def main():
    stock_list_url = 'https://quote.eastmoney.com/stocklist.html'
    stock_info_url = 'https://gupiao.baidu.com/stock/'
    output_file = 'D:/BaiduStockInfo.txt'
    slist=[]
    getStockList(slist, stock_list_url)
    getStockInfo(slist, stock_info_url, output_file)

main()
```

[python爬取淘宝商品信息&requests.get()和网页源代码不一致_jzj_c_love的博客-CSDN博客](https://blog.csdn.net/jzj_c_love/article/details/104093877)

# Selenium

* selenium的使用步骤？
  1. 导入：from selenium import webdriver
  2. 创建谷歌浏览器操作对象： path = 谷歌浏览器驱动文件路径 browser = webdriver.Chrome(path) 
  3. 访问网址 url = 要访问的网址 browser.get(url)

* selenium的元素定位 find_element

* 访问元素信息

  获取元素属性 .get_attribute('class') 

  获取元素文本 .text 

  获取标签名 .tag_name

* 交互

  点击:click() 

  输入:send_keys()

   后退操作:browser.back() 

  前进操作:browser.forword()

  模拟JS滚动: js='document.documentElement.scrollTop=100000' browser.execute_script(js) 

  执行js代码 获取网页代码：page_source 

  退出：browser.quit()

* Chrome handless

```python
from selenium import webdriver
#这个是浏览器自带的 不需要我们再做额外的操作
from selenium.webdriver.chrome.options import Options
def share_browser():
    #初始化
    chrome_options = Options()
    chrome_options.add_argument('‐‐headless')
    chrome_options.add_argument('‐‐disable‐gpu')
    #浏览器的安装路径 打开文件位置
    #这个路径是你谷歌浏览器的路径
    path = r'[---]'
    chrome_options.binary_location = path
    browser = webdriver.Chrome(chrome_options=chrome_options)
    return browser

#封装调用：
from handless import share_browser
browser = share_browser()
browser.get('http://www.baidu.com/')
browser.save_screenshot('handless1.png')
```



# Scrapy

<img src="http://r6x04xz01.hd-bkt.clouddn.com/image-20220207162133107.png"  style="zoom:67%;" />

<img src="http://r6x04xz01.hd-bkt.clouddn.com/image-20220207162218001.png" style="zoom:67%;" />

<img src="http://r6x04xz01.hd-bkt.clouddn.com/image-20220207165234066.png" style="zoom:67%;" />

<img src="http://r6x04xz01.hd-bkt.clouddn.com/image-20220207165852697.png" style="zoom:67%;" />

<img src="http://r6x04xz01.hd-bkt.clouddn.com/image-20220209014418171.png" style="zoom:67%;" />

```python
#dang.py
import scrapy
from scrapy_dangdang_095.items import ScrapyDangdang095Item

class DangSpider(scrapy.Spider):
    name = 'dang'
    # 如果是多页下载的话 那么必须要调整的是allowed_domains的范围 一般情况下只写域名
    allowed_domains = ['category.dangdang.com']
    start_urls = ['http://category.dangdang.com/cp01.01.02.00.00.00.html']
    base_url = 'http://category.dangdang.com/pg'
    page = 1

    def parse(self, response):
#       pipelines 下载数据
#       items     定义数据结构的
#         src = //ul[@id="component_59"]/li//img/@src
#         alt = //ul[@id="component_59"]/li//img/@alt
#         price = //ul[@id="component_59"]/li//p[@class="price"]/span[1]/text()
#         所有的seletor的对象 都可以再次调用xpath方法
        li_list = response.xpath('//ul[@id="component_59"]/li')

        for li in li_list:
            src = li.xpath('.//img/@data-original').extract_first()
            # 第一张图片和其他的图片的标签的属性是不一样的
            # 第一张图片的src是可以使用的  其他的图片的地址是data-original
            if src:
                src = src
            else:
                src = li.xpath('.//img/@src').extract_first()

            name = li.xpath('.//img/@alt').extract_first()
            price = li.xpath('.//p[@class="price"]/span[1]/text()').extract_first()

            book = ScrapyDangdang095Item(src=src,name=name,price=price)

            # 获取一个book就将book交给pipelines
            yield book


#       每一页的爬取的业务逻辑全都是一样的，所以我们只需要将执行的那个页的请求再次调用parse方法就可以了
        if self.page < 100:
            self.page = self.page + 1
            url = self.base_url + str(self.page) + '-cp01.01.02.00.00.00.html'

#             怎么去调用parse方法
#             scrapy.Request就是scrpay的get请求
#             url就是请求地址
#             callback是你要执行的那个函数  注意不需要加（）
            yield scrapy.Request(url=url,callback=self.parse)
```

```python
#items.py
class ScrapyDangdang095Item(scrapy.Item):
    # name = scrapy.Field()
    # 通俗的说就是你要下载的数据都有什么
    src = scrapy.Field()
    name = scrapy.Field()
    price = scrapy.Field()
```

```python
#pipelines.py
from itemadapter import ItemAdapter

# 如果想使用管道的话 那么就必须在settings中开启管道
class ScrapyDangdang095Pipeline:
    def open_spider(self,spider):
        self.fp = open('book.json','w',encoding='utf-8')
        
    def process_item(self, item, spider):
        self.fp.write(str(item))
        return item

    def close_spider(self,spider):
        self.fp.close()

import urllib.request

# 多条管道开启
# 定义管道类 + 在settings中开启管道
#'scrapy_dangdang_095.pipelines.DangDangDownloadPipeline':301
class DangDangDownloadPipeline:
    def process_item(self, item, spider):
        url = 'http:' + item.get('src')
        filename = './books/' + item.get('name') + '.jpg'
        urllib.request.urlretrieve(url = url, filename= filename)
        return item
```

```python
#settings.py文件中被修改
ITEM_PIPELINES = {
    #  管道可以有很多个  那么管道是有优先级的  优先级的范围是1到1000   值越小优先级越高
    'scrapy_dangdang_095.pipelines.ScrapyDangdang095Pipeline': 300,
    #DangDangDownloadPipeline
    'scrapy_dangdang_095.pipelines.DangDangDownloadPipeline':301
}
```
