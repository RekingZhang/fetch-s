import buildURL from './../utils/buildURL';
import { transformRequest } from './../utils/transform';
import _fetch from './fetchTimeout';
import jsonp from './jsonp';
import response from './response';

const DATA_IN_HEADER = ['GET', 'DELETE', 'HEAD', 'OPTIONS', 'JSONP'];

const DATA_IN_BODY = ['POST', 'PUT', 'PATCH'];

/**
 * 发送请求方法
 *
 * Options:
 *  - methods {String} 请求类型
 *  - origin {String} 请求源
 *  - url {String} 请求路径
 *  - header {Object} 请求头
 *  - data {String|Object} 请求参数
 * 	- cache {Boolean} 是否使用缓存
 *  - timeout {Number} 超时时间
 *
 * @param {Object} options
 * @return {Promise}
 */
function request(options) {
	let methods = options.method;

	//处理URL中携带信息
	if (DATA_IN_HEADER.indexOf(methods) !== -1) {
		options.url = buildURL(options.origin, options.url, options.data);
	}
	//处理Body中携带信息
	if (DATA_IN_BODY.indexOf(methods) !== -1) {
		options.url = buildURL(options.origin, options.url);
		options.body = transformRequest(options.data, options.headers);
	}

	//添加异步请求标识
	options.headers['X-Requested-With'] = options.XRequestedWith;

	//jsonp
	if (methods === 'JSONP') {
		return jsonp(options).then(r => {
			return {
				config: options,
				data: r
			};
		});
	}

	return _fetch(options.url, options, options.timeout).then(r => {
		return response(r, options);
	});
}
export default request;
