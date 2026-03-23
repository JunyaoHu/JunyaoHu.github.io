---
title: 书生大模型实战营-茴香豆：企业级知识问答工具实践
publishedDate: 2024-10-03 08:00:00
tags: [大模型]
category: 课外学习
---

# 本节任务要点

- 在 InternStudio 中利用 Internlm2-7b 搭建标准版茴香豆知识助手，并使用 Gradio 界面完成 2 轮问答（问题不可与教程重复，作业截图需包括 gradio 界面问题和茴香豆回答）。知识库可根据根据自己工作、学习或感兴趣的内容调整，如金融、医疗、法律、音乐、动漫等（优秀学员必做）。

# 实践流程

尝试将茴香豆从源码部署到本地服务器（以 InternlmStudio 为例），并开发一款简单的知识助手 Demo。

## 环境准备

```
studio-conda -o internlm-base -t huixiangdou
conda activate huixiangdou
```

## 安装

先从茴香豆仓库拉取代码到服务器：

```
cd /root/project/huixiangdou
# 克隆代码仓库
git clone https://github.com/internlm/huixiangdou && cd huixiangdou
git checkout 79fa810
```

安装茴香豆所需依赖：

```
conda activate huixiangdou
# parsing `word` format requirements
apt update
apt install python-dev libxml2-dev libxslt1-dev antiword unrtf poppler-utils pstotext tesseract-ocr flac ffmpeg lame libmad0 libsox-fmt-mp3 sox libjpeg-dev swig libpulse-dev

# python requirements修改
# BCEmbedding==0.15 -> 0.1.5
# transformers>=4.38 -> transformers==4.45.1

pip install BCEmbedding==0.1.5 cmake==3.30.2 lit==18.1.8 sentencepiece==0.2.0 protobuf==5.27.3 accelerate==0.33.0
pip install -r requirements.txt
# python3.8 安装 faiss-gpu 而不是 faiss
```

茴香豆默认会根据配置文件自动下载对应的模型文件，为了节省时间，本次教程所需的模型已经提前下载到服务器中，我们只需要为本次教程所需的模型建立软连接，然后在配置文件中设置相应路径就可以：

```
# 创建模型文件夹
cd /root/project/huixiangdou && mkdir models

# 复制BCE模型
ln -s /root/share/new_models/maidalun1020/bce-embedding-base_v1 /root/project/huixiangdou/models/bce-embedding-base_v1
ln -s /root/share/new_models/maidalun1020/bce-reranker-base_v1 /root/project/huixiangdou/models/bce-reranker-base_v1

# 复制大模型参数（下面的模型，根据作业进度和任务进行**选择一个**就行）
ln -s /root/share/new_models/Shanghai_AI_Laboratory/internlm2-chat-7b /root/project/huixiangdou/models/internlm2-chat-7b
```

茴香豆的所有功能开启和模型切换都可以通过 `config.ini` 文件进行修改

执行下面的命令更改配置文件，让茴香豆使用本地模型：

```
sed -i '9s#.*#embedding_model_path = "/root/project/huixiangdou/models/bce-embedding-base_v1"#' /root/project/huixiangdou/huixiangdou/config.ini
sed -i '15s#.*#reranker_model_path = "/root/project/huixiangdou/models/bce-reranker-base_v1"#' /root/project/huixiangdou/huixiangdou/config.ini
sed -i '43s#.*#local_llm_path = "/root/project/huixiangdou/models/internlm2-chat-7b"#' /root/project/huixiangdou/huixiangdou/config.ini
```

## 知识库创建

改完配置文件后，就可以进行知识库的搭建，本次教程选用的是茴香豆和 MMPose 的文档，利用茴香豆搭建一个茴香豆和 MMPose 的知识问答助手。（改成心理学相关的文档）

```
conda activate huixiangdou

cd /root/project/huixiangdou/huixiangdou
mkdir repodir

git clone https://github.com/internlm/huixiangdou --depth=1 repodir/huixiangdou
git clone https://github.com/open-mmlab/mmpose    --depth=1 repodir/mmpose

# Save the features of repodir to workdir, and update the positive and negative example thresholds into `config.ini`
mkdir workdir

python -m huixiangdou.service.feature_store
```

在 huixiangdou 文件加下创建 repodir 文件夹，用来储存知识库原始文档。再创建一个文件夹 workdir 用来存放原始文档特征提取到的向量知识库。.

知识库创建成功后会有一系列小测试，检验问题拒答和响应效果，如图所示，关于“mmpose 安装”的问题，测试结果可以很好的反馈相应答案和对应的参考文件，但关于“std：：vector 使用”的问题，因为属于 C++ 范畴，不再在知识库范围内，测试结果显示拒答，说明我们的知识助手工作正常。

和 Web 版一样，本地版也可以通过编辑正反例来调整茴香豆的拒答和响应，正例位于 `/root/huixiangdou/resource/good_questions.json` 文件夹中，反例位于`/root/huixiangdou/resource/bad_questions.json`。

需要注意的是，每次更新原始知识文档和正反例，都需要重新运行 `python3 -m huixiangdou.service.feature_store` 命令进行向量知识库的重新创建和应答阈值的更新。

配置中可见，在运行过一次特征提取后，茴香豆的阈值从 -1.0 更新到了 0.33。 配置文件中的 `work_dir` 参数指定了特征提取后向量知识库存放的位置。如果有多个知识库快速切换的需求，可以通过更改该参数实现。

## 测试知识助手

运行下面的命令，可以用命令行对现有知识库问答助手进行测试：

```
conda activate huixiangdou
cd /root/project/huixiangdou/huixiangdou
python -m huixiangdou.main --standalone
```

![image-20241003112755912](https://s2.loli.net/2024/10/03/Bm8r2Yo7fnbHSCU.png)

茴香豆也用 `gradio` 搭建了一个 Web UI 的测试界面，用来测试本地茴香豆助手的效果。

在运行茴香豆助手的服务器端，输入下面的命令，启动茴香豆 Web UI：

```
conda activate huixiangdou
cd /root/project/huixiangdou/huixiangdou
python -m huixiangdou.gradio
```

![image-20241003113422370](https://s2.loli.net/2024/10/03/gtidLJbDlCHnfj8.png)

## 自建数据库

反向数据：不变，并且加上关于huixiangdou的正向（反正也没关系）

正向数据，用ai生成，提示词

```
我想创建一个关于PUA解释、识别、提供解决方案的知识库，现在需要获取一些和知识库相关的提问，你请模仿提问人询问相关话题的一些问题，便于与无关问题分隔开。

请你扮演一个遭受了PUA过来咨询的人，希望知识库能帮你判断当前场景是不是pua，或者帮你找到当前这个场景pua如何解决，提出一些问题。注意以第一人称提问，并且给出具体的被pua的场景（包括但不限于父母、亲戚、爱情、导师、上司、朋友、同学等等）
```

输出结果

```
[
    "PUA是什么？它的定义和起源是什么？",
    "PUA技巧有哪些？它们是如何运作的？",
    "PUA行为有哪些特征？我该如何识别它们？",
    "PUA对个人和社会有哪些负面影响？",
    "如何避免成为PUA的受害者？",
    "如果我怀疑自己遇到了PUA，我应该怎么做？",
    "有哪些资源可以帮助我了解PUA的更多信息？",
    "PUA和健康的人际关系有什么区别？",
    "有哪些心理学原理被PUA用来操控他人？",
    "PUA技巧是否违法？在法律上有哪些规定？",
    "如何帮助一个可能受到PUA影响的朋友或家人？",
    "PUA文化在不同国家和地区有什么不同？",
    "有哪些组织或活动是专门反对PUA的？",
    "PUA技巧是否总是有害的？有没有例外？",
    "如何在社交场合中保护自己，避免被PUA技巧影响？",
    "PUA技巧是否只在男性中存在？女性是否也会使用类似的技巧？",
    "有哪些书籍、电影或电视节目探讨了PUA主题？",
    "PUA技巧是否与性别歧视有关？",
    "PUA技巧是否与性骚扰有关？",
    "如何教育孩子识别和避免PUA技巧？",
    "我的男朋友总是贬低我，说我不够好，但当我提出分手时，他又承诺会改变。",
    "我的父母总是拿我和兄弟姐妹比较，说我不如他们成功。这让我感到自卑，我该如何处理这种情况？",
    "我的上司经常在同事面前批评我，但从不提供具体的改进建议。我感觉自己被边缘化了，这是PUA吗？",
    "我的朋友总是让我做我不想做的事情，如果我拒绝，他们就会说我不够朋友。我该如何处理这种友谊？",
    "我的导师经常在课堂上公开羞辱我，说我的论文写得不好，但又不给出具体指导。我该如何保护自己？",
    "我的亲戚总是问我为什么不结婚，说我已经太老了，这让我感到压力很大。",
    "我的同学总是嘲笑我的穿着，说我看起来土气。我尝试过忽略他们，但他们还是继续这样做。我应该怎么办？",
    "我在社交媒体上遇到了一个人，他总是要求我发私人照片给他，如果我不发，他就威胁要拉黑我。这是PUA行为吗？",
    "我的同事总是告诉我，我不可能得到晋升，因为我没有足够的经验。这让我对工作失去了信心，我该如何回应？",
    "在聚会上，有人总是强迫我喝酒，即使我明确表示我不想喝。这是PUA行为吗？我该如何保护自己？",
    "我的朋友总是说我的梦想是不切实际的，我应该放弃。这让我开始怀疑自己，我该如何坚持自己的目标？",
    "我的伴侣总是通过威胁自杀来让我留在他身边。我感到被困住了，我该如何摆脱这种关系？",
    "我的上司总是给我过多的工作，当我提出需要帮助时，他就说这是我的问题。我该如何处理这种压力？",
    "我的家人总是期望我按照他们的意愿生活，如果我不这样做，他们就会生气。我该如何表达自己的意愿？",
    "我在社交场合中总是被要求成为焦点，如果我不这样做，朋友们就会说我无聊。我该如何处理这种压力？",
    "我最近在网上认识了一个人，他总是说我是他见过的最美的女孩，但每次我提出见面时，他都会找借口推脱。",
    "我的上司总是给我很多工作，然后告诉我这是对我的考验，但当我完成工作后，他从不在团队面前表扬我。",
    "我的朋友总是让我帮他做很多事情，但当我需要帮助时，他却总是找借口。我是不是被利用了？",
    "我的老师总是说我的作业做得不好，但又不告诉我具体哪里需要改进。",
    "我的亲戚总是在我面前炫耀他们的孩子有多成功，然后说我应该向他们学习。",
    "我的同学总是嘲笑我的成绩，说我再怎么努力也比不上他们。",
    "我在社交媒体上遇到了一个人，他总是要求我给他发私人照片，如果我不发，他就威胁要拉黑我。",
    "我的男朋友总是说我没有他我什么都不是，",
    "我的伴侣总是通过威胁分手来让我做我不想做的事情，",
    "我的同事总是告诉我，我不可能得到晋升，因为我没有足够的经验。",
    "我的家人总是期望我按照他们的意愿生活，如果我不这样做，他们就会生气。",
    "我在社交场合中总是被要求成为焦点，如果我不这样做，朋友们就会说我无聊。",
    "我的伴侣总是告诉我，没有他我什么都做不了，这让我感到非常依赖他。",
    "我的朋友总是说我的想法不切实际，我开始怀疑自己的能力。"
]
```

![image-20241003124652730](https://s2.loli.net/2024/10/03/jgp3h8uwxaf5CTv.png)

![image-20241003124738044](https://s2.loli.net/2024/10/03/bnvsSNy9AOrYPTh.png)

# 总结

非常实用