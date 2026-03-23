---
title: 书生大模型实战营-L1-8G显存玩转书生大模型Demo
publishedDate: 2024-09-30 10:00:04
tags: [大模型]
category: 课外学习
---

# 本节任务要点

## 基础任务（完成此任务即完成闯关）

- 使用 Cli Demo 完成 InternLM2-Chat-1.8B 模型的部署，并生成 300 字小故事，记录复现过程并截图。

## 进阶任务（闯关不要求完成此任务）

- 使用 LMDeploy 完成 InternLM-XComposer2-VL-1.8B 的部署，并完成一次图文理解对话，记录复现过程并截图。
- 使用 LMDeploy 完成 InternVL2-2B 的部署，并完成一次图文理解对话，记录复现过程并截图。

# 实践流程

激活环境

```
conda activate /root/share/pre_envs/icamp3_demo
```

## 命令行部署 InternLM2-Chat-1.8B

创建 `cli_demo.py`

```
import torch
from transformers import AutoTokenizer, AutoModelForCausalLM


model_name_or_path = "/root/share/new_models/Shanghai_AI_Laboratory/internlm2-chat-1_8b"

tokenizer = AutoTokenizer.from_pretrained(model_name_or_path, trust_remote_code=True, device_map='cuda:0')
model = AutoModelForCausalLM.from_pretrained(model_name_or_path, trust_remote_code=True, torch_dtype=torch.bfloat16, device_map='cuda:0')
model = model.eval()

system_prompt = """You are an AI assistant whose name is InternLM (书生·浦语).
- InternLM (书生·浦语) is a conversational language model that is developed by Shanghai AI Laboratory (上海人工智能实验室). It is designed to be helpful, honest, and harmless.
- InternLM (书生·浦语) can understand and communicate fluently in the language chosen by the user such as English and 中文.
"""

messages = [(system_prompt, '')]

print("=============Welcome to InternLM chatbot, type 'exit' to exit.=============")

while True:
    input_text = input("\nUser  >>> ")
    input_text = input_text.replace(' ', '')
    if input_text == "exit":
        break

    length = 0
    for response, _ in model.stream_chat(tokenizer, input_text, messages):
        if response is not None:
            print(response[length:], flush=True, end="")
            length = len(response)

```

执行`python cli_demo.py `

![image-20240930164844623](https://s2.loli.net/2024/09/30/nhFRytBEObNrlvj.png)

## Streamlit Web Demo 部署 InternLM2-Chat-1.8B

运行

```
cd /root/project/Tutorial/tools
streamlit run streamlit_demo.py --server.address 127.0.0.1 --server.port 6006
```

生成小故事

![image-20240930165511890](https://s2.loli.net/2024/09/30/sqUC5t8K6FkLbIr.png)

## LMDeploy 部署 InternLM-XComposer2-VL-1.8B 模型

```
conda activate /root/share/pre_envs/icamp3_demo
lmdeploy serve gradio /share/new_models/Shanghai_AI_Laboratory/internlm-xcomposer2-vl-1_8b --cache-max-entry-count 0.1
```

![image-20240930170108212](https://s2.loli.net/2024/09/30/86XbNz19eAWFkBo.png)

## LMDeploy 部署 InternVL2-2B 模型

```
conda activate /root/share/pre_envs/icamp3_demo
lmdeploy serve gradio /share/new_models/OpenGVLab/InternVL2-2B --cache-max-entry-count 0.1
```

![image-20240930170707469](https://s2.loli.net/2024/09/30/9D1MeI5V6ZLOAdN.png)

# 总结

我们ai真是太厉害了，多模态未来可期！
