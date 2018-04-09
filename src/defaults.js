/**
 * 基于fetch的http异步请求模块
 *
 * 1.并发请求
 * 2.拦截器
 * 3.proxy 代理功能
 * 4.全局配置
 * 5.创建实例
 * 6.cancel
 * 7.timeout
 *
 */

let DEFAULTS = {
	method: 'GET', // request 类型
	dataType: 'json', //response 数据类型
	origin: '', //请求路径源
	mode: 'cors', //跨域模式（ "same-origin"、"no-cors"、"cors"）
	credentials: 'include', //
	timeout: 30000, //超时时间
	headers: {
		Accept: 'application/json, text/plain, */*',
		'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
	},
	XRequestedWith: 'Fetch' //异步请求标识
};

export default DEFAULTS;
