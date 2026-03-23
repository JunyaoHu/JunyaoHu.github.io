---
title: 书生大模型实战营-L1-浦语提示词工程实践
publishedDate: 2024-09-30 10:00:05
tags: [大模型]
category: 课外学习
---

# 本节任务要点

- **背景问题**：近期相关研究发现，LLM在对比浮点数字时表现不佳，经验证，internlm2-chat-1.8b (internlm2-chat-7b)也存在这一问题，例如认为`13.8<13.11`。
- **任务要求**：利用LangGPT优化提示词，使LLM输出正确结果。**完成一次并提交截图即可**

# 实践流程

```
conda create -n langgpt python=3.10 -y

conda install pytorch==2.1.2 torchvision==0.16.2 torchaudio==2.1.2 pytorch-cuda=12.1 -c pytorch -c nvidia -y

# 安装其他依赖
pip install transformers==4.43.3

pip install streamlit==1.37.0
pip install huggingface_hub==0.24.3
pip install openai==1.37.1
pip install lmdeploy==0.5.2

apt-get install tmux

cd /root/project/langgpt

tmux new -t langgpt
tmux a -t langgpt

conda activate langgpt

CUDA_VISIBLE_DEVICES=0 lmdeploy serve api_server /share/new_models/Shanghai_AI_Laboratory/internlm2-chat-1_8b --server-port 23333 --api-keys internlm2
```

新开启脚本

```
from openai import OpenAI

client = OpenAI(
    api_key = "internlm2",
    base_url = "http://0.0.0.0:23333/v1"
)

response = client.chat.completions.create(
    model=client.models.list().data[0].id,
    messages=[
        {"role": "system", "content": "请介绍一下你自己"}
    ]
)

print(response.choices[0].message.content)

cd /root/project/langgpt
python demo.py
```

测试成功

![image-20240930183305650](https://s2.loli.net/2024/09/30/PMm5O4rSQWYEc2K.png)

图形界面

```
cd /root/project/Tutorial/tools
python -m streamlit run chat_ui.py
```

提示词

```
# Role: 数字大小比较专家

## Profile
- author: JunyaoHu
- version: 1.0
- language: 中文
- description: 比较两个数字大小的专家，可以准确判断两个浮点数之间的大小，不会出现失误。

## Skills:
1. 接收两个浮点数，并判断他们是浮点数
2. 比较浮点数的大小
3. 给出简单的解释

## Constraints
- 输出思考过程，一步步思考。

## Workflows
1. 获取输入中的两个浮点数。
2. 比较这两个浮点数的大小并输出
```

![image-20240930185355865](https://s2.loli.net/2024/09/30/Hzh6tFTeMlnES79.png)

# 总结

有意思，写提示很重要，很有意义，写好也不容易。