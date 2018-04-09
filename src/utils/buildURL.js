import paramsSerializer from './paramsSerializer';
/**
 * 生成URL
 *
 * @param {String} origin 页面
 * @param {String} path
 * @param {Object} params
 */
function buildURL(origin, path, params = '') {
	const isAbsolute = new RegExp('^(?:[a-z]+:)?//', 'i');
	let url = (path + '?' + paramsSerializer(params)).replace('??', '?');
	return isAbsolute.test(url) ? url : origin + url;
}

export default buildURL;
