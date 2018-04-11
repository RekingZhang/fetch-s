# fetch-s

[![npm version](https://img.shields.io/npm/v/fetch-s.svg?style=flat-square)](https://www.npmjs.org/package/fetch-s)
[![Build Status](https://travis-ci.org/RekingZhang/fetch-s.svg?branch=master)](https://travis-ci.org/RekingZhang/fetch-s)
[![Coverage Status](https://coveralls.io/repos/github/RekingZhang/fetch-s/badge.svg?branch=master)](https://coveralls.io/github/RekingZhang/fetch-s?branch=master)
[![npm downloads](https://img.shields.io/npm/dm/fetch-s.svg?style=flat-square)](http://npm-stat.com/charts.html?package=fetch-s)
[![codebeat badge](https://codebeat.co/assets/svg/badges/A-398b39-669406e9e1b136187b91af587d4092b0160370f271f66a651f444b990c2730e9.svg)](https://codebeat.co/projects/github-com-rekingzhang-fetch-s-master)

Fetch-based HTTP requests

## Installing

Using npm:

```bash
$ npm install fetch-s
```

Using CDN:

```javascript
<script src="https://unpkg.com/fetch-s/dist/fetch-s.min.js" />
```

## Example

Performing a `GET` request

```js
// Make a request for a user with a given ID
fetchs
	.get('/user?ID=12345')
	.then(function(response) {
		console.log(response);
	})
	.catch(function(error) {
		console.log(error);
	});

// Optionally the request above could also be done as
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

Performing a `POST` request

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

Performing a `JSONP` request

```js
// Make a request for a user with a given ID
fetchs
	.jsonp('/user?ID=12345')
	.then(function(response) {
		console.log(response);
	})
	.catch(function(error) {
		console.log(error);
	});

// Optionally the request above could also be done as
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

## Request Config

These are the available config options for making requests. Only the `url` is required. Requests will default to `GET` if `method` is not specified.

```js
{
  // request type
  method: 'GET', // default

  //`url` is the request path
  //If u is a relative path, it will be combined with `origin` to form a complete path
  url:'',

  //`data` are the request parameters
  data:{
	id: 1
  },

  // `responseType` indicates the type of data that the server will respond with
  // options are 'arrayBuffer', 'blob', 'formData', 'text', 'json'
  dataType: 'json',

  //`origin` is the request baseURL
  origin: '',

  //`mode` is the request mode ("same-origin"、"no-cors"、"cors")
  mode: 'cors', // default

  // Sending a request with credentials included
  //To cause browsers to send a request with credentials included, even for a cross-origin call, add credentials: 'include' to the init object you pass to the fetch() method.
  //If you only want to send credentials if the request URL is on the same origin as the calling script, add credentials: 'same-origin'.
  //To instead ensure browsers don’t include credentials in the request, use credentials: 'omit'.
  credentials: 'include',// default

  //`timeout` specifies the number of milliseconds before the request times out
  timeout: 30000, // default

  // `headers` the headers that the server request with
  headers: {
	Accept: 'application/json, text/plain, */*',// default
	'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'// default
  },

  //`XRequestedWith` is identification of asynchronous requests
  XRequestedWith: 'Fetch' // default
}
```

## Response Schema

The response for a request contains the following information.

```js
{
  // `data` is the response that was provided by the server
  data: {},

  // `config` is the config that was provided to `fetch-s` for the request
  config: {},

  // `status` is the HTTP status code from the server response
  status: 200,

  // `statusText` is the HTTP status message from the server response
  statusText: 'OK',

  //Contains a boolean stating whether the response was successful (status in the range 200-299) or not.
  ok: true,

  //`redirect` is to identify if the request has redirects
  redirected: false,

  // `headers` the headers that the server responded with
  headers: {},

  // `body` the body that the server responded with
  body: ReadableStream
}
```

## Interceptors

You can intercept requests or responses before they are handled by `then` or `catch`.

```js
// Add a request interceptor
fetchs.interceptors.request.use(
	function(config) {
		// Do something before request is sent
	},
	function(error) {
		// Do something with request error
	}
);

// Add a response interceptor
fetchs.interceptors.response.use(
	function(response) {
		// Do something with response data
	},
	function(error) {
		// Do something with response error
	}
);
```

### Custom instance defaults

```js
// Set config defaults when creating the instance
var instance = fetchs.create({
	origin: 'https://www.example.com'
});

//and use it
instance
	.get('/user?ID=12345')
	.then(function(response) {
		console.log(response);
	})
	.catch(function(error) {
		console.log(error);
	});
```
