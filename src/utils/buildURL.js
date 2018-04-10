import paramsSerializer from './paramsSerializer';
/**
 * 生成URL
 *
 * @param {String} origin 请求主域
 * @param {String} path  请求路径
 * @param {Object} params 请求参数
 * @return {String} 请求的URL
 */
function buildURL(origin, path, params) {
	const isAbsolute = new RegExp('^(?:[a-z]+:)?//', 'i');
	if (params) {
		path = (path + '?' + paramsSerializer(params)).replace('??', '?');
	}
	return isAbsolute.test(path) ? path : origin + path;
}

export default buildURL;
