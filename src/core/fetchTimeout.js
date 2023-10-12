import settle from './settle';

/**
 * fetch的扩展方法
 *
 * @param {String} input 输入
 * @param {Object} init 配置信息
 * @param {Number} timeout 超时时间
 * @return {Promise}
 */
function _fetch(input, init, timeout) {
	let timer,
		isTimeOut = false;
	return new Promise((resolve, reject) => {
		timer = setTimeout(() => {
			isTimeOut = true;
			reject(new Error('Request timed out'));
		}, timeout);

		fetch(input, init)
			.then(function(response) {
				// 清除定时器
				clearTimeout(timer);
				if (!isTimeOut) {
					settle(resolve, reject, Object.assign(response, {config: init}))
				}
			})
			.catch(function(err) {
				if (isTimeOut) return;
				reject(err);
			});
	});
}

export default _fetch;
