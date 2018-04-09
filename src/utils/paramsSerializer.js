import types from './type';
/**
 * URL中参数编码
 *
 * @param {String} val 待编码的参数
 * @return {String} 编码后的参数
 */
function encode(val) {
	return encodeURIComponent(val)
		.replace(/%40/gi, '@')
		.replace(/%3A/gi, ':')
		.replace(/%24/g, '$')
		.replace(/%2C/gi, ',')
		.replace(/%20/g, '+')
		.replace(/%5B/gi, '[')
		.replace(/%5D/gi, ']');
}
/**
 * 序列化参数
 *
 * @param {Object} data  URL参数对象
 * @return {String} 序列化后的参数字符串
 */
function paramsSerializer(data) {
	let parmas = [];

	if (types.isURLSearchParams(data)) {
		return data.toString();
	}

	if (types.isObject(data)) {
		Object.entries(data).forEach(arr => {
			let key = arr[0],
				value = arr[1];

			if (types.isDate(value)) {
				value = value.toISOString();
			}
			if (types.isObject(value)) {
				value = JSON.stringify(value);
			}
			parmas.push(encode(key) + '=' + encode(value));
		});
		return parmas.join('&');
	}

	return data;
}

export default paramsSerializer;
