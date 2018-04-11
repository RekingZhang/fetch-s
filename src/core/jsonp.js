/**
 * Callback 序号.
 */

let count = 0;

/**
 * Noop function.
 */

function noop() {}

/**
 * JSONP
 *
 *  Options:
 *  - url {String}
 *  - prefix {String} 回调函数前缀
 *  - name {String} 回调函数名
 * 	- cache {Boolean} 是否使用缓存
 *  - timeout {Number} 超时时间
 *
 * @param {Object} opts 配置项
 */
function jsonp(opts) {
	let prefix = opts.prefix || '__jp';

	let id = opts.name || prefix + count++;

	let timeout = opts.timeout;
	let cacheFlag = opts.cache || false;
	let enc = encodeURIComponent;
	let target = document.getElementsByTagName('script')[0] || document.head;
	let script;
	let timer;

	/* eslint-disable */
	return new Promise(function(resolve, reject) {
		try {
			function cleanup() {
				if (script.parentNode) script.parentNode.removeChild(script);
				window[id] = noop;
				if (timer) clearTimeout(timer);
			}
			if (timeout) {
				timer = setTimeout(function() {
					cleanup();
					reject(new Error('Request timed out'));
				}, timeout);
			}

			window[id] = function(data) {
				cleanup();
				resolve(data);
			};

			// 添加 callback
			opts.url +=
				(opts.url.indexOf('?') === -1 ? '?' : '&') +
				'callback=' +
				enc(id);
			// 处理cahce
			if(!cacheFlag){
				opts.url += '&_=' + new Date().getTime();
			}

			// 创建 script 标签
			script = document.createElement('script');
			script.src = opts.url;
			target.parentNode.insertBefore(script, target);
		} catch (e) {
			reject(e);
		}
	});
}

export default jsonp;
