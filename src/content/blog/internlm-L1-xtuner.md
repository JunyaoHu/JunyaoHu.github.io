---
title: 书生大模型实战营-L1-XTuner微调个人小助手认知
publishedDate: 2024-10-01 10:00:00
tags: [大模型]
category: 课外学习
---

# 本节任务要点

- 使用 XTuner 微调 InternLM2-Chat-1.8B 实现自己的小助手认知，（xx同志需替换成自己的昵称），记录复现过程并截图。

# 实践流程

## 环境准备（现在numpy有2.0版本了，加一个限制）

```
# 创建虚拟环境
conda create -n xtuner0121 python=3.10 -y

# 激活虚拟环境（注意：后续的所有操作都需要在这个虚拟环境中进行）
conda activate xtuner0121

# 安装一些必要的库
conda install pytorch==2.1.2 torchvision==0.16.2 torchaudio==2.1.2 pytorch-cuda=12.1 -c pytorch -c nvidia -y
# 安装其他依赖
pip install transformers==4.39.3
pip install streamlit==1.36.0

# 创建一个目录，用来存放源代码
mkdir -p /root/project/XTuner

git clone -b v0.1.21  https://github.com/InternLM/XTuner /root/project/XTuner

# 进入到源码目录
cd /root/project/XTuner
conda activate xtuner0121

# 执行安装
pip install -e '.[deepspeed]'

# 因为现在numpy有2.0版本了，加一个限制
pip install numpy==1.23.5

xtuner version
```

![image-20241001172131974](https://s2.loli.net/2024/10/01/iTbcAvoPnqkB8G2.png)

## 模型准备

```
# 创建一个目录，用来存放微调的所有资料，后续的所有操作都在该路径中进行
mkdir -p /root/project/finetune

ln -s /root/share/new_models/Shanghai_AI_Laboratory/internlm2-chat-1_8b /root/project/finetune/internlm2-chat-1_8b
```

## 快速开始

这里我们用 `internlm2-chat-1_8b` 模型，通过 `QLoRA` 的方式来微调一个自己的小助手认知作为案例来进行演示。

微调前 tools/xtuner_streamlit_demo.py 的结果

```
# 文件修改
model_name_or_path = "/root/InternLM/XTuner/Shanghai_AI_Laboratory/internlm2-chat-1_8b"

streamlit run /root/project/Tutorial/tools/xtuner_streamlit_demo.py
```

输出结果不好

![image-20241001174844532](https://s2.loli.net/2024/10/01/K8uMPyN3W6itFk5.png)

指令跟随微调

为了让模型在询问自己是谁的时候按照我们预期的结果进行回复，我们就需要通过在微调数据集中大量加入这样的数据。我们准备一个数据集文件datas/assistant.json，文件内容为对话数据。

```
cd 
mkdir -p /root/project/finetune/data
touch /root/project/finetune/data/assistant.json
```

为了简化数据文件准备，我们也可以通过脚本生成的方式来准备数据。创建一个脚本文件 `xtuner_generate_assistant.py` ：

```
import json

# 设置需要重复添加的数据次数
n = 1000

# 初始化数据
data = [
    {
        "conversation": [{
            "input": "你是谁？", 
            "output": "我是JunyaoHu制作的PUA指数测试小助手，专注于帮助你识别并抵抗潜在的操控技巧。"
        }]
    },{
        "conversation": [{
            "input": "你叫啥？", 
            "output": "我是PUA指数测试小助手，由JunyaoHu制作，可以帮你测试PUA指数。"
        }]
    },{
        "conversation": [{
            "input": "你叫什么名字？", 
            "output": "我是PUA指数测试小助手，JunyaoHu制作了这个小应用，帮助你提高自我保护意识和社交技巧。"
        }]
    },{
        "conversation": [{
            "input": "你是做什么的？", 
            "output": "我是一款创新的心理测评游戏，旨在通过互动游戏的形式，测量个体对PUA策略的抵抗力和识别能力，帮助用户提高自我保护意识和社交技巧。"
        }]
    },{
        "conversation": [{
            "input": "你的工作是什么？", 
            "output": "我的工作是测量你对PUA策略的抵抗力，让你在社交场合中更加自信。"
        }]
    },{
        "conversation": [{
            "input": "PUA是什么意思？", 
            "output": "PUA是“Pick-up Artist”的缩写，指的是那些使用操纵性策略来吸引他人的人。"
        }]
    },{
        "conversation": [{
            "input": "我为什么要关心PUA？", 
            "output": "了解PUA策略可以帮助你保护自己不受操控，提高你的社交技巧和自我意识。"
        }]
    },{
        "conversation": [{
            "input": "你如何帮助我提高社交技巧？", 
            "output": "通过评估你对PUA策略的识别和抵抗力，我可以提供针对性的建议来增强你的社交技巧。"
        }]
    },{
        "conversation": [{
            "input": "我如何知道我是否对PUA策略有抵抗力？", 
            "output": "通过我设计的测试，你可以了解自己在面对PUA策略时的反应和抵抗力。"
        }]
    },{
        "conversation": [{
            "input": "你的测试准确吗？", 
            "output": "我的测试是基于广泛的研究和数据分析，旨在提供可靠的结果。"
        }]
    },{
        "conversation": [{
            "input": "我需要做什么来开始测试？", 
            "output": "你只需要回答一系列问题，我将根据你的回答评估你的PUA抵抗力。"
        }]
    },{
        "conversation": [{
            "input": "测试需要多长时间？", 
            "output": "测试通常只需要几分钟，但具体时间取决于问题的复杂性。"
        }]
    },{
        "conversation": [{
            "input": "测试结果会告诉我什么？", 
            "output": "测试结果将显示你对PUA策略的识别能力和抵抗力水平。"
        }]
    },{
        "conversation": [{
            "input": "你的服务收费吗？", 
            "output": "我是一个虚拟助手，我的服务是免费的，旨在帮助提高大家的社交安全意识。"
        }]
    },{
        "conversation": [{
            "input": "你能提供一对一的咨询吗？", 
            "output": "虽然我不能提供实时的一对一咨询，但我可以提供详细的测试结果和建议。"
        }]
    },{
        "conversation": [{
            "input": "你的测试适合所有人吗？", 
            "output": "我的测试适合任何想要提高社交技巧和自我保护意识的人。"
        }]
    },{
        "conversation": [{
            "input": "测试结果会保密吗？", 
            "output": "当然，你的隐私和数据安全是我们的首要任务。"
        }]
    }
]

# 通过循环，将初始化的对话数据重复添加到data列表中
length = len(data)

for i in range(n):
    for j in range(length):
        data.append(data[j])

# 将data列表中的数据写入到'data/assistant.json'文件中
with open('data/assistant.json', 'w', encoding='utf-8') as f:
    # 使用json.dump方法将数据以JSON格式写入文件
    # ensure_ascii=False 确保中文字符正常显示
    # indent=4 使得文件内容格式化，便于阅读
    json.dump(data, f, ensure_ascii=False, indent=4)
```

然后执行该脚本来生成数据文件。

```
cd /root/project/finetune
python xtuner_generate_assistant.py
```

![image-20241001175036033](https://s2.loli.net/2024/10/01/6pMGxrBykFRfqDT.png)

准备配置文件

```
xtuner list-cfg -p internlm2
```

以 **internlm2_1_8b_full_custom_pretrain_e1** 和 **internlm2_chat_1_8b_qlora_alpaca_e3** 举例：

| 配置文件 e1     | 配置文件 e3         | 说明           |
| --------------- | ------------------- | -------------- |
| internlm2_1_8b  | internlm2_chat_1_8b | 模型名称       |
| full            | qlora               | 使用的算法     |
| custom_pretrain | alpaca              | 数据集名称     |
| e1              | e3                  | 把数据集跑几次 |

```
cd /root/project/finetune
xtuner copy-cfg internlm2_chat_1_8b_qlora_alpaca_e3 .
```

在选择了一个最匹配的配置文件并准备好其他内容后，下面我们要做的事情就是根据我们自己的内容对该配置文件进行调整，使其能够满足我们实际训练的要求。

打开配置文件后，我们可以看到整体的配置文件分为五部分：

- **PART 1 Settings**：涵盖了模型基本设置，如预训练模型的选择、数据集信息和训练过程中的一些基本参数（如批大小、学习率等）。

- **PART 2 Model & Tokenizer**：指定了用于训练的模型和分词器的具体类型及其配置，包括预训练模型的路径和是否启用特定功能（如可变长度注意力），这是模型训练的核心组成部分。

- **PART 3 Dataset & Dataloader**：描述了数据处理的细节，包括如何加载数据集、预处理步骤、批处理大小等，确保了模型能够接收到正确格式和质量的数据。

- **PART 4 Scheduler & Optimizer**：配置了优化过程中的关键参数，如学习率调度策略和优化器的选择，这些是影响模型训练效果和速度的重要因素。

- **PART 5 Runtime**：定义了训练过程中的额外设置，如日志记录、模型保存策略和自定义钩子等，以支持训练流程的监控、调试和结果的保存。

一般来说我们需要更改的部分其实只包括前三部分，而且修改的主要原因是我们修改了配置文件中规定的模型、数据集。后两部分都是 XTuner 官方帮我们优化好的东西，一般而言只有在魔改的情况下才需要进行修改。

```
#######################################################################
#                          PART 1  Settings                           #
#######################################################################
- pretrained_model_name_or_path = 'internlm/internlm2-chat-1_8b'
+ pretrained_model_name_or_path = '/root/project/finetune/internlm2-chat-1_8b'

- alpaca_en_path = 'tatsu-lab/alpaca'
+ alpaca_en_path = 'data/assistant.json'

evaluation_inputs = [
-    '请给我介绍五个上海的景点', 'Please tell me five scenic spots in Shanghai'
+    '请介绍一下你自己', 'Please introduce yourself'
]

#######################################################################
#                      PART 3  Dataset & Dataloader                   #
#######################################################################
alpaca_en = dict(
    type=process_hf_dataset,
-   dataset=dict(type=load_dataset, path=alpaca_en_path),
+   dataset=dict(type=load_dataset, path='json', data_files=dict(train=alpaca_en_path)),
    tokenizer=tokenizer,
    max_length=max_length,
-   dataset_map_fn=alpaca_map_fn,
+   dataset_map_fn=None,
    template_map_fn=dict(
        type=template_map_fn_factory, template=prompt_template),
    remove_unused_columns=True,
    shuffle_before_pack=True,
    pack_to_max_length=pack_to_max_length,
    use_varlen_attn=use_varlen_attn)
```

XTuner 启动

```
cd /root/project/finetune

xtuner train ./internlm2_chat_1_8b_qlora_alpaca_e3_copy.py
```

开始训练

![image-20241001175820559](https://s2.loli.net/2024/10/01/jvdlPo2M4CkTGuc.png)

模型转换的本质其实就是将原本使用 Pytorch 训练出来的模型权重文件转换为目前通用的 HuggingFace 格式文件，那么我们可以通过以下命令来实现一键转换。

```
/root/project/finetune

# 先获取最后保存的一个pth文件
pth_file=`ls -t ./work_dirs/internlm2_chat_1_8b_qlora_alpaca_e3_copy/*.pth | head -n 1`
export MKL_SERVICE_FORCE_INTEL=1
export MKL_THREADING_LAYER=GNU
xtuner convert pth_to_hf ./internlm2_chat_1_8b_qlora_alpaca_e3_copy.py ${pth_file} ./hf
```

![image-20241001185222896](https://s2.loli.net/2024/10/01/2JD85OyNkx1RWCs.png)

模型合并

对于 LoRA 或者 QLoRA 微调出来的模型其实并不是一个完整的模型，而是一个额外的层（Adapter），训练完的这个层最终还是要与原模型进行合并才能被正常的使用。

```
xtuner convert merge /root/project/finetune/internlm2-chat-1_8b ./hf ./merged --max-shard-size 2GB
```

微调完成后，我们可以再次运行`xtuner_streamlit_demo.py`脚本来观察微调后的对话效果，不过在运行之前，我们需要将脚本中的模型路径修改为微调后的模型的路径。

```
# 直接修改脚本文件第18行
- model_name_or_path = "/root/InternLM/XTuner/Shanghai_AI_Laboratory/internlm2-chat-1_8b"
+ model_name_or_path = "/root/InternLM/XTuner/merged"
```

然后，我们可以直接启动应用。

```
streamlit run /root/project/Tutorial/tools/xtuner_streamlit_demo.py
```

![image-20241001190013866](https://s2.loli.net/2024/10/01/6XS3J1c8OFBtL2j.png)

# 总结

- 跑通了 XTuner 的完整流程
- 微调是在预训练模型的基础上，将模型中一些层的权重参数进行微调，以适应新的数据集或任务。预训练模型部分已经在大规模数据上得到了训练，它们通常是较为通用且高性能的模型，因此可以很好地作为新任务的起点。微调可以加快模型的收敛速度，降低模型过拟合的风险，并在不消耗过多计算资源的情况下获取较好的模型性能。
- 比RAG效果好很多、又比全量训练简单，非常好