# fetch-s

[![npm version](https://img.shields.io/npm/v/fetch-s.svg?style=flat-square)](https://www.npmjs.org/package/fetch-s)
[![Build Status](https://travis-ci.org/RekingZhang/fetch-s.svg?branch=master)](https://travis-ci.org/RekingZhang/fetch-s)
[![Coverage Status](https://coveralls.io/repos/github/RekingZhang/fetch-s/badge.svg?branch=master)](https://coveralls.io/github/RekingZhang/fetch-s?branch=master)
[![npm downloads](https://img.shields.io/npm/dm/fetch-s.svg?style=flat-square)](http://npm-stat.com/charts.html?package=fetch-s)
[![codebeat badge](https://codebeat.co/assets/svg/badges/A-398b39-669406e9e1b136187b91af587d4092b0160370f271f66a651f444b990c2730e9.svg)](https://codebeat.co/projects/github-com-rekingzhang-fetch-s-master)

基于 Fetch 的 http 请求库

## 特征

-   支持 `Promise` API
-   支持`Timeout`
-   自动转换请求数据
-   自动解析响应数据
-   拦截器
-   支持自定义实例默认值
-   支持`JSONP`(推荐使用`CORS`)

## 安装

使用 NPM:

```bash
$ npm install fetch-s
```

使用 CDN:

```javascript
<script src="https://unpkg.com/fetch-s/dist/fetchs.min.js" />
```

## 例子

执行一个 `GET` 请求

```js
// 为给定 ID 的 user 创建请求
fetchs
	.get('/user?ID=12345')
	.then(function(response) {
		console.log(response);
	})
	.catch(function(error) {
		console.log(error);
	});

// 或者，上面的请求可以这样做
fetchs
	.get('/user', {
		data: {
			ID: 12345
		}
	})
	.then(function(response) {
		console.log(response);
	})
	.catch(function(error) {
		console.log(error);
	});
```

执行一个 `POST` 请求

```js
fetchs
	.post('/login', {
		userName: 'reking',
		password: 'xxx'
	})
	.then(function(response) {
		console.log(response);
	})
	.catch(function(error) {
		console.log(error);
	});
```

执行一个 `JSONP` 请求

```js
// 为给定 ID 的 user 创建请求
fetchs
	.jsonp('/user?ID=12345')
	.then(function(response) {
		console.log(response);
	})
	.catch(function(error) {
		console.log(error);
	});

// 或者，上面的请求可以这样做
fetchs
	.jsonp('/user', {
		data: {
			ID: 12345
		}
	})
	.then(function(response) {
		console.log(response);
	})
	.catch(function(error) {
		console.log(error);
	});
```

## 请求（Request）

这些是提出请求的可用配置选项。其中只有`url`是必需的。如果未指定请求方法，请求将默认为`GET`。

```js
{
  //请求类型
  method: 'GET', // default

  //`url` 是请求路径
  //如果你是一个相对路径，它将与“origin”结合形成一个完整的路径
  url:'',

  //`data` 是请求的参数
  data:{
	id: 1
  },

  // `responseType` 用来指示服务器将响应的数据类型，`fetch-s`会根据`responseType`类型自动对response进行简析格式化
  // 配置选项包括： 'arrayBuffer', 'blob', 'formData', 'text', 'json'
  dataType: 'json',

  //`origin` 是请求的基础路径（url为绝对路径时会忽略此配置）
  origin: '',

  //`mode` 是请求模型 ("same-origin"、"no-cors"、"cors")
  mode: 'cors', // default

  //是否携带cookie等凭证信息，默认携带
  credentials: 'include',// default

  //`timeout` 是指定请求超时的毫秒数
  timeout: 30000, // default

  // `headers` 是服务器请求的标头
  headers: {}
}
```

## 响应（Response）

请求的响应包含以下信息。

```js
{
  // `data` 是服务器提供的响应数据
  data: {},

  // `config` 是请求时携带的配置信息
  config: {},

  // `status` 是来自服务器响应的HTTP状态码
  status: 200,

  // `statusText` 是来自服务器响应的HTTP状态消息
  statusText: 'OK',

  //`ok`是一个布尔值，说明响应是否成功（成功的状态码范围为200-299）。
  ok: true,

  //`redirect` 是确定请求是否具有重定向
  redirected: false,

  // `headers` 是服务器的响应头
  headers: {},

  // `body` 是服务器的响应体
  body: ReadableStream
}
```

## 拦截器

在请求或响应被 `then` 或 `catch` 处理前拦截它们。

```js
// 添加一个请求拦截器
fetchs.interceptors.request.use(
	function(config) {
		// 在发送请求之前做些什么
		return config;
	},
	function(error) {
		// 对请求错误做些什么
		return Promise.reject(error);
	}
);

// 添加一个响应拦截器
fetchs.interceptors.response.use(
	function(response) {
		// 对响应数据做点什么
		return response;
	},
	function(error) {
		// 对响应错误做点什么
		return Promise.reject(error);
	}
);
```

### 自定义实例默认值

```js
// 在创建实例时设置配置默认值
var instance = fetchs.create({
	origin: 'https://www.example.com'
});

//使用新的实例
instance
	.get('/user?ID=12345')
	.then(function(response) {
		console.log(response);
	})
	.catch(function(error) {
		console.log(error);
	});
```
