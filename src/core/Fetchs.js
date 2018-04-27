import request from './request';
import Interceptors from './interceptors';
import types from '../utils/type';
import DEFAULTS from '../defaults';
import clone from '../utils/clone';

/**
 * Fetchs Class
 *
 */
class Fetchs {
	constructor(config) {
		this.defaults = config;
		this.interceptors = {
			request: new Interceptors(),
			response: new Interceptors()
		};
	}
	/**
	 * 发送请求函数
	 *
	 * @param {Object|String} config 配置信息|统一资源定位符
	 * @return {Promise}
	 */
	request(config) {
		if (types.isString(config)) {
			config = Object.assign(
				{
					method: 'GET'
				},
				{
					url: arguments[0]
				},
				arguments[1]
			);
		}
		config = Object.assign(
			{},
			clone(DEFAULTS),
			clone(this.defaults),
			config
		);

		config.method = config.method.toLocaleUpperCase();

		if (!config.url) {
			throw new TypeError('url is null or not defined');
		}

		let prosime = Promise.resolve(config); //config对象转为 Promise 对象
		let queue = [request, undefined];

		//挂载前置拦截器
		this.interceptors.request.forEach(interceptor => {
			queue.unshift(interceptor.resolve, interceptor.reject);
		});

		//挂载后置拦截器
		this.interceptors.response.forEach(interceptor => {
			queue.push(interceptor.resolve, interceptor.reject);
		});

		//将拦截器和请求组成一个prosime链
		while (queue.length) {
			//prosime.then() 会返回一个新的Promise对象
			prosime = prosime.then(queue.shift(), queue.shift());
		}

		return prosime;
	}
	/**
	 * Get请求方法
	 *
	 * @param {String} url 统一资源定位符
	 * @param {Object} config 配置信息
	 * @return {Promise}
	 */
	get(url, config) {
		return this.request(
			Object.assign({}, config, {
				url: url,
				method: 'GET'
			})
		);
	}
	/**
	 * Post请求方法
	 *
	 * @param {String} url 统一资源定位符
	 * @param {JSON|String|ArrayBuffer|ArrayBufferView|Blob|File|URLSearchParams|FormData} data 数据
	 * @param {Object} config 配置信息
	 * @return {Promise}
	 */
	post(url, data, config) {
		return this.request(
			Object.assign({}, config, {
				url: url,
				method: 'POST',
				data: data
			})
		);
	}
	/**
	 * JSONP 请求方法
	 *
	 * @param {String} url 统一资源定位符
	 * @param {String} config 配置信息
	 * @return {Promise}
	 */
	jsonp(url, config) {
		try {
			console.warn('CORS is a better choice.');
		} catch (e) {
			/* Ignore */
		}
		return this.request(
			Object.assign({}, config, {
				url: url,
				method: 'JSONP'
			})
		);
	}
}

export default Fetchs;
