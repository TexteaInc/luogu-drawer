# luogu-drawer

> 基于 `Node.js`，实现自动维护您的图片

## Usage

```bash
yarn install

## 开发版本，支持热重载
yarn run dev

## 通过 PM2 防止意外崩溃
## 不要在非服务器上运行该命令
yarn run start
```

## Doc

#### users.json

`id` 仅仅是为了方便出错时候显示

`cookie` **必填**, 用户的Cookie

```json
[
  {
    "id": "xxx",
    "cookie": "__client_id=xxx; _uid=xxx;"
  },
  {
    "id": "xxx",
    "cookie": "__client_id=xxx; _uid=xxx;"
  }
]
```

---

#### config.json

- `data` 数据数组，加载 `data` 文件夹对应的 `json` 文件

  - `name` **必填** `json` 文件名字
  
  - `x` x轴偏移量
  
  - `y` y轴偏移量
  
- `checkDuration` 重新加载地图时间间隔，推荐 `20s`

- `postDuration` 每次post时间间隔，推荐 `15s`
  
```json
{
  "data": [
    {
      "name": "bread",
      "x": 736,
      "y": 336
    }
  ],
  "checkDuration": 500,
  "postDuration": 30
}
```

---

#### Scripts

`scripts` 文件夹下提供了基本的 `python` 脚本

- `main.py` 将图片根据洛谷提供的键值，根据最小色差进行转换

#### lib

`src` 文件夹下有几个基本的功能

- `cors`<sup>todo</sup> 将前端支持跨域

- `drawer`<sup>todo</sup> 提供登陆和提交cookie

- `poster`<sup>finished</sup> 维护您洛谷绘板的图片

## LICENSE

this project follow [MIT LICENSE](LICENSE)
