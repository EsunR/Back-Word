# NOTICE

> 课题：帮新生找合适舍友得分宿舍系统分析与设计

/src/commom.vue中存放全局变量：
- host：API服务器地址
- login_location：登录页面相对于服务器根目录的地址
- index_location：主页相对于服务器根目录的地址

API标准与数据库标准分别查看`API.md`、`DataBaes.md`

![](https://img.shields.io/badge/Base-Vue2.2-brightgreen.svg)
![](https://img.shields.io/badge/Build-Vue--Cli3-orange.svg)
![](https://img.shields.io/badge/Design-ElementUI-blue.svg) 
![](https://img.shields.io/badge/Installer-Yarn-red.svg)

```
$ yarn install
$ yarn serve
```

![首页](https://ws1.sinaimg.cn/large/a71efaafly1g2id99kctcj21ae0mndxw.jpg)

![调查问卷](https://ws1.sinaimg.cn/large/a71efaafly1g2id9shx4rj21ac0mm44k.jpg)

![宿舍匹配结果](https://ws1.sinaimg.cn/large/a71efaafly1g2idacf9qwj21a40mkq9w.jpg)

![宿舍详情](https://ws1.sinaimg.cn/large/a71efaafly1g2idazuzkvj21ah0mitc6.jpg)

## 需求：

给新生按照生活习惯、兴趣爱好分宿舍，使“早起鸟”和“夜猫子”互不干扰，是大学新生分宿舍的人性化举措。本系统具体要求如下：

1、设计调查问卷，统计新生的生活习惯，兴趣爱好等。

2、设计相关方法量化评估各项数据之间的相似度，帮助新生更快找到志趣相投的舍友，更好的适应大学新生活。

3、对各方法进行比较，分析优缺点，分配宿舍。

4、设计反馈调研问卷，研究新生宿舍的和谐度。


## 具体要求：

1、程序各组成部分，代码清晰、有条理。

2、认真研读相关论文，文献资料，了解相关软件更新机制。

3、注意时间安排，依要求完成任务。

4、后台数据要求具有一致性、完整性、安全性，前台应用程序系统要求功能完备、易于使用和界面友好。


## 附件（调查问卷）：

### 第一筛选项：
1. 起床时间
2. 睡觉时间


### 喜欢的游戏类型
0. 不喜欢
1. 网络游戏
2. 单机游戏
3. 手游
4. 主机、掌机游戏

### 喜欢的阅读类型
0. 不喜欢
1. 流行小说
2. 文学著作
3. 漫画
4. 杂志报纸

### 喜欢影视作品类型
0. 不喜欢
1. 电影
2. 电视剧
3. 动漫
4. 纪录片
5. 网络短视频

### 喜欢的运动类型
0. 不喜欢
1. 球类运动
2. 跑步
3. 单车
4. 力量健身
5. 极限运动

### 喜欢的音乐类型
0. 不喜欢
1. 话语系音乐
2. 日韩系音乐
3. 欧美系音乐

### 是否信奉宗教？
0. 否
1. 是

### 是否希望宿舍保持安静氛围？
0. 否
1. 是

### 是否会在宿舍经常有产生噪音的行为？
0. 否
1. 是

### 是否习惯使用公放设备（如使用外置音响）？
0. 否
1. 是

### 是否会经常长时间待在宿舍？
0. 否
1. 是