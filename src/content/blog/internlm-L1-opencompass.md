---
title: 书生大模型实战营-L1-OpenCompass评测InternLM-1.8B实践
publishedDate: 2024-10-01 18:00:00
tags: [大模型]
category: 课外学习
---

# 本节任务要点

- 使用 OpenCompass 评测 internlm2-chat-1.8b 模型在 ceval 数据集上的性能，记录复现过程并截图。

# 实践流程

## 环境配置（现在numpy有2.0版本了，加一个限制）

镜像为 **Cuda11.7-conda**，并选择 GPU 为**10% A100。**

```
conda create -n opencompass python=3.10
conda activate opencompass
conda install pytorch==2.1.2 torchvision==0.16.2 torchaudio==2.1.2 pytorch-cuda=12.1 -c pytorch -c nvidia -y

git clone -b 0.2.4 https://github.com/open-compass/opencompass
cd /root/project/opencompass
pip install -e .

apt-get update
apt-get install cmake
pip install -r requirements.txt
pip install numpy==1.23.5
pip install protobuf
```

数据集准备

```
# 解压评测数据集到 /root/project/opencompass/data/ 处
cp /share/temp/datasets/OpenCompassData-core-20231110.zip /root/project/opencompass
cd /root/project/opencompass
unzip OpenCompassData-core-20231110.zip
```

列出所有跟 InternLM 及 C-Eval 相关的配置

```
python tools/list_configs.py internlm ceval
```

结果图

![image-20241001192415682](https://s2.loli.net/2024/10/01/lwTrhQPkIgDp6F8.png)

## 使用命令行配置参数法进行评测

打开 opencompass文件夹下configs/models/hf_internlm/的`hf_internlm2_chat_1_8b.py` ,贴入以下代码

```
models = [
    dict(
        type=HuggingFaceCausalLM,
        abbr='internlm2-1.8b-hf',
        path="/share/new_models/Shanghai_AI_Laboratory/internlm2-chat-1_8b",
        tokenizer_path='/share/new_models/Shanghai_AI_Laboratory/internlm2-chat-1_8b',
        model_kwargs=dict(
            trust_remote_code=True,
            device_map='auto',
        ),
        tokenizer_kwargs=dict(
            padding_side='left',
            truncation_side='left',
            use_fast=False,
            trust_remote_code=True,
        ),
        max_out_len=100,
        min_out_len=1,
        max_seq_len=2048,
        # batch_size=8,
        batch_size=16,
        run_cfg=dict(num_gpus=1, num_procs=1),
    )
]
```

调试和运行

```
export MKL_SERVICE_FORCE_INTEL=1

python run.py --datasets ceval_gen --models hf_internlm2_chat_1_8b --debug
```

![image-20241001195024669](https://s2.loli.net/2024/10/01/v9zquJswHI4aXiM.png)

## 使用配置文件修改参数法进行评测

```
cd /root/project/opencompass/configs
conda activate opencompass

touch eval_tutorial_demo.py

########################################
from mmengine.config import read_base

with read_base():
    from .datasets.ceval.ceval_gen import ceval_datasets
    from .models.hf_internlm.hf_internlm2_chat_1_8b import models as hf_internlm2_chat_1_8b_models

datasets = ceval_datasets
models = hf_internlm2_chat_1_8b_models
########################################

cd /root/opencompass
python run.py configs/eval_tutorial_demo.py --debug
```

测出来差不多，这里就是个继承，玩过openmmlab的都懂这个配置

![image-20241001205457487](https://s2.loli.net/2024/10/01/erXsRzJ36SUg7MF.png)

# 总结

- 这下可以狠狠测大模型了捏，win！😋