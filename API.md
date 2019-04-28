## 1. 基本
### 1.1 用户登录
url：/login POST

发送：
```js
{
    account: "001",
    password: "123456"
}
```

返回：
```js
// 正常
{
    code: 1,
    data: 'xxx.xxx.xxx'
}

// 异常
{
    code: 2,
    msg: '账号不在' // 或者“密码错误”
}
```

### 1.2 注册
url：register POST

发送：
```js
{
    account: "001",
    name: "张三",
    password: "123456"
}
```

返回：
```js
// 正常
{
    code: 1
}

// 异常
{
    code: 2,
    msg: "账号已存在"
}
```

### 1.3 获取用户信息
url：/getUserInfo GET （从此往后的API都需要验证Token）

返回：
```js
{
    uid: "",
    name: "",
    account: "",
    room: ""
}
```

## 2. 调查问卷

### 2.1 提交调查问卷
url：/postSurvey

发送：
```js
{
    getUpTime: "09:00",
    sleepTime: "22:00",
    game: ["网络游戏", "单机游戏"],
    read: ["不喜欢"],
    video: ["电影", "动漫"],
    sport: ["不喜欢"],
    music: ["欧美音乐"],
    religion: "0",
    quite: "1",
    noise: "0",
    sound: "1",
    stay: "0"
}
```

### 2.2 获取筛选宿舍后的结果
url: /getFilter

返回：
```js
{
    code: 1,
    data: [
        {
            roomId: "203"
            peopleNum: "2", // 6人为满员，不获取该条数据
            getUpTime: ["09:00", "09:59"],
            sleepTime: ["22:00", "22:59"],
            gamePct: 0.5,
            readPct: 0.5,
            videoPct: 0.5,
            sportPct: 0.5,
            musicPct: 0.5,
            religionPct: 0.5,
            quitePct: 0.5,
            noisePct: 0.5,
            soundPct: 0.5,
            stayPct: 0.5,
            total: 5 // 各个百分比结果相加
        }
        // ... ... 按total排序，各个百分比结果相加分值高的排在前面
    ]
}
```

### 2.3 获取宿舍详情
url: /getRoomInfo

发送：
```
/getRoomInfo?id=12 

id：宿舍id
```

返回：
```js
{
    code: 1,
    data: {
        // 宿舍成员
        memberList: [
            {
                uid: "1",
                name: "李大帅",
                getUpTime: "09:00",
                sleepTime: "22:00",
                game: ["网络游戏", "单机游戏"],
                read: ["不喜欢"],
                video: ["电影", "动漫"],
                sport: ["不喜欢"],
                music: ["欧美音乐"],
                religion: 0,
                quite: 0,
                noise: 0,
                sound: 0,
                stay: 0
            },
            // ... ...
        ],
        // 宿舍反馈信息
        feedBackList: [
            {
                id: "1"
                name: "李大帅",
                comment: "宿舍很不错",
                harmonious: "5"
            }
            // ... ...
        ]
    }
}
```

### 2.4 选择宿舍
url: /chooseRoom GET

发送：
```
/chooseRoom?id=1

id: 宿舍id
```

备注：宿舍的喜好列表追加该用户的喜好，同时该宿舍成员数+1

### 2.5 新建宿舍

url: /newRoom GET

备注：后台读取该用户提交的调查问卷，新建一个宿舍，初始信息为该用户的作息时间段和喜好，如该用户在09:20起床，那宿舍的getUp字段的数据为[09:00, 09:59]

返回：
```js
{
    code: "1",
    data: {
        roomId: "203"
    }
}
```

### 2.6 评论宿舍

url: /postComment POST

发送：
```js
{
    roomId: "123",
    harmonious："1",
    comment: "真好啊"
}
```