---
title: 书生大模型实战营-L2-Lagent自定义你的Agent智能体
publishedDate: 2024-10-02 15:00:00
tags: [大模型]
category: 课外学习
---

# 本节任务要点

- 使用 Lagent 自定义一个智能体，并使用 Lagent Web Demo 成功部署与调用，记录复现过程并截图。

# 实践流程

## 环境配置

开发机选择 30% A100，镜像选择为 Cuda12.2-conda。

```
# 创建环境
conda create -n agent_camp3 python=3.10 -y
# 激活环境
conda activate agent_camp3
# 安装 torch
conda install pytorch==2.1.2 torchvision==0.16.2 torchaudio==2.1.2 pytorch-cuda=12.1 -c pytorch -c nvidia -y
# 安装其他依赖包
pip install termcolor==2.4.0
pip install lmdeploy==0.5.2

# 创建目录以存放代码
mkdir -p /root/project/agent_camp3
cd /root/project/agent_camp3
git clone https://github.com/InternLM/lagent.git
cd lagent && git checkout 81e7ace && pip install -e . && cd ..
pip install griffe==0.48.0

# 加上这个
pip install class_registry
```

## Lagent Web Demo 使用

```
lmdeploy serve api_server /share/new_models/Shanghai_AI_Laboratory/internlm2_5-7b-chat --model-name internlm2_5-7b-chat

# 再开一个窗口
conda activate agent_camp3
cd /root/project/agent_camp3/lagent

streamlit run examples/internlm2_agent_web_demo.py
```

接下来，在本地浏览器中打开 `localhost:8501`，并修改**模型名称**一栏为 `internlm2_5-7b-chat`，修改**模型 ip**一栏为`127.0.0.1:23333`。

输入后需要按下回车以确认！

然后，我们在插件选择一栏选择 `ArxivSearch`，并输入指令“帮我搜索一下 MindSearch 论文”。

这里搜索还可以按照作者进行搜索

![image-20241002163426156](https://s2.loli.net/2024/10/02/gGMTvDm4SbUpcHw.png)

## 基于 Lagent 自定义智能体

使用 Lagent 自定义工具主要分为以下几步：

1. 继承 `BaseAction` 类
2. 实现简单工具的 `run` 方法；或者实现工具包内每个子工具的功能
3. 简单工具的 `run` 方法可选被 `tool_api` 装饰；工具包内每个子工具的功能都需要被 `tool_api` 装饰

下面我们将实现一个调用 MagicMaker API 以完成文生图的功能。

首先，我们先来创建工具文件：

```
cd /root/project/agent_camp3/lagent
touch lagent/actions/magicmaker.py
```

然后，我们将下面的代码复制进入

/root/project/agent_camp3/lagent/lagent/actions/magicmaker.py

```
import json
import requests

from lagent.actions.base_action import BaseAction, tool_api
from lagent.actions.parser import BaseParser, JsonParser
from lagent.schema import ActionReturn, ActionStatusCode


class MagicMaker(BaseAction):
    styles_option = [
        'dongman',  # 动漫
        'guofeng',  # 国风
        'xieshi',   # 写实
        'youhua',   # 油画
        'manghe',   # 盲盒
    ]
    aspect_ratio_options = [
        '16:9', '4:3', '3:2', '1:1',
        '2:3', '3:4', '9:16'
    ]

    def __init__(self,
                 style='guofeng',
                 aspect_ratio='4:3'):
        super().__init__()
        if style in self.styles_option:
            self.style = style
        else:
            raise ValueError(f'The style must be one of {self.styles_option}')
        
        if aspect_ratio in self.aspect_ratio_options:
            self.aspect_ratio = aspect_ratio
        else:
            raise ValueError(f'The aspect ratio must be one of {aspect_ratio}')
    
    @tool_api
    def generate_image(self, keywords: str) -> dict:
        """Run magicmaker and get the generated image according to the keywords.

        Args:
            keywords (:class:`str`): the keywords to generate image

        Returns:
            :class:`dict`: the generated image
                * image (str): path to the generated image
        """
        try:
            response = requests.post(
                url='https://magicmaker.openxlab.org.cn/gw/edit-anything/api/v1/bff/sd/generate',
                data=json.dumps({
                    "official": True,
                    "prompt": keywords,
                    "style": self.style,
                    "poseT": False,
                    "aspectRatio": self.aspect_ratio
                }),
                headers={'content-type': 'application/json'}
            )
        except Exception as exc:
            return ActionReturn(
                errmsg=f'MagicMaker exception: {exc}',
                state=ActionStatusCode.HTTP_ERROR)
        image_url = response.json()['data']['imgUrl']
        return {'image': image_url}
```



最后，我们修改 `/root/project/agent_camp3/lagent/examples/internlm2_agent_web_demo.py` 来适配我们的自定义工具。

1. 在 `from lagent.actions import ActionExecutor, ArxivSearch, IPythonInterpreter` 的下一行添加 `from lagent.actions.magicmaker import MagicMaker`
2. 在第27行添加 `MagicMaker()`。

```
from lagent.actions import ActionExecutor, ArxivSearch, IPythonInterpreter
+ from lagent.actions.magicmaker import MagicMaker
from lagent.agents.internlm2_agent import INTERPRETER_CN, META_CN, PLUGIN_CN, Internlm2Agent, Internlm2Protocol

...
        action_list = [
            ArxivSearch(),
+             MagicMaker(),
        ]
```

接下来，启动 Web Demo 来体验一下吧！

```
lmdeploy serve api_server /share/new_models/Shanghai_AI_Laboratory/internlm2_5-7b-chat --model-name internlm2_5-7b-chat

streamlit run examples/internlm2_agent_web_demo.py
```

我们同时启用两个工具，然后输入“请帮我生成一幅山水画”

![image-20241002171435449](https://s2.loli.net/2024/10/02/TUgQC8E64iJHdnR.png)

**按照教程运行，检查到./lagent/lagent/actions/magicmaker.py中response = requests.post()返回的json如下图所示，提示返回成功为false，进官网（https://magicmaker.openxlab.org.cn/home）发现已经停止维护了**

![image-20241002171611636](https://s2.loli.net/2024/10/02/ciBNVLmIt5EZ6sb.png)

![image-20241002171638684](https://s2.loli.net/2024/10/02/PnhH2qzcjtB4da7.png)

然后，我们再试一下“帮我搜索一下 MindSearch 论文”。

![image-20241002171603394](https://s2.loli.net/2024/10/02/Ks4xIRvP9QYc8iJ.png)

# 总结

- 后面自己做项目的时候自己找合适的工具，多看文档
