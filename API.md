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

// 异常
{
    code: 3,
    msg: '账号正在审核'
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
    identity: ""
}
```

## 2. 用户

### 2.1 获取单词列表
url: /getWordList

说明：获取对应词库的未被该用户标记的所有单词

发送：
```
/getWordList?unit=4

获取四级单词
```

返回：
```js
{
    code: 1,
    data: [
        {
            id: "1"
            word: "china",
            chinese: ["n.中国", "adv.瓷器 陶瓷", "adj.瓷的"]
        },
        // ... ...
    ]
}
```

### 2.2 获取单词状态表中status为对应值的单词（要对应用户）
url: /getWordStatus

发送：
```js
/getWordStatus?status=1
```

返回：
```js
{
    code: 1,
    data: [
        {
            id: "1"
            word: "china",
            chinese: ["n.中国", "adv.瓷器 陶瓷", "adj.瓷的"]
        }
        // ... ...
    ]
}
```

### 2.3 将单词标记为对应状态

url: /postWordStatus

说明：如果在数据库中没有查到对应的单词，也就是说在用户尚未背过该单词的情况下给该单词更改状态，就将这个单词添加到单词状态表中（此时做的是插入操作而不是修改操作），status字段和id字段为发送过去的数据。如果在数据库中查到对应的单词，就只修改status字段即可。

发送：
```js
{
    id: "1", // 单词id
    status: "1" // 更改状态为1
}
```

### 2.4 查询单词
url: /searchWord

发送：
```
/searchWord?key=china
```

返回：
```js
{
    code: 1,
    data: {
        id: "1",
        word: "china",
        chinese: ["n.中国", "adv.瓷器 陶瓷", "adj.瓷的"],
        unit: "4"
    }
}
```

### 2.5 获取所有单词
url: /getAllWords

发送：
```
/getAllWords?unit=4
/getAllWords?unit=6
```

返回：
```js
{
    code: 1,
    data: [
        {
            id: "1"
            word: "china",
            chinese: ["n.中国", "adv.瓷器 陶瓷", "adj.瓷的"]
        }
        // ... ...
    ]
}
```

## 3.管理员表

### 3.1 获取用户列表（身份为user）
url: /getUserList

返回：
```js
{
    code: 1,
    data: [
        {
            uid: "",
            name: "",
            account: ""
        },
        // ... ...
    ]
}
```

### 3.2 修改用户信息
url: /modifyUserInfo

发送：
```js
{
    uid: "",
    name: "",
    account: "",
    password: ""
}
```

### 3.3 添加单词
url: /addWord

发送：
```js
{
    word: "China"
    chinese: ["adv.瓷器 陶瓷", "adj.瓷的"]
    unit: "4"
}
```

### 3.4 修改单词
url: /modifyWord POST

发送：
```js
{
    id: "1"
    word: "china",
    chinese: ["n.中国", "adv.瓷器 陶瓷", "adj.瓷的"],
    unit: "4"
}
```

### 3.5 删除单词
url: /deleteWord

发送:
```js
/deleteWord?id=1

id: 单词id
```

<hr>

### 3.6 删除用户
url: /deleteUser

发送：
```
/deleteUser?id=1

id: 用户id
```

### 3.7 获取待审核用户
url: /getWaitUser

返回：
```js
{
    code: 1,
    data: [
        {
            uid: "",
            name: "",
            account: ""
        },
        // ... ...
    ]
}
```

### 3.8 通过审核

url: /access

发送：
```
/access?id=1

id: 用户id
```