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
