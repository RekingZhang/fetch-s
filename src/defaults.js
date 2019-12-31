/**
 *
 */

let DEFAULTS = {
	method: 'GET', // request 类型
	dataType: 'json', //response 数据类型
	origin: '', //请求路径源
	mode: 'cors', //跨域模式（ "same-origin"、"no-cors"、"cors"）
	credentials: 'include', //
	timeout: 30000, //超时时间
	headers: {}
};

export default DEFAULTS;
