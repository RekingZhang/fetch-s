import types from './type';
import paramsSerializer from './paramsSerializer';

/**
 * 转义处理Request
 *
 * @param {Object} data 请求数据
 * @param {Object} headers 请求头
 * @return
 */
export function transformRequest(data, headers) {
	let contentType = headers['Content-Type'] || '';

	//如果已经指定Content-Type，则按照对应的编码格式进行编码
	if (contentType.indexOf('application/json') !== -1) {
		return JSON.stringify(data);
	}
	if (contentType.indexOf('application/x-www-form-urlencoded') !== -1) {
		//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
		//对于 application/x-www-form-urlencoded (POST) 这种数据方式，空格需要被替换成 '+'
		return paramsSerializer(data).replace(/%20/g, '+');
	}

	if (
		types.isFormData(data) ||
		types.isArrayBuffer(data) ||
		types.isFile(data) ||
		types.isBlob(data)
	) {
		return data;
	}
	if (types.isArrayBufferView(data)) {
		return data.buffer;
	}

	if (types.isURLSearchParams(data)) {
		headers['Content-Type'] =
			'application/x-www-form-urlencoded;charset=UTF-8';
		return data.toString();
	}
	if (types.isObject(data)) {
		headers['Content-Type'] = 'application/json;charset=UTF-8';
		return JSON.stringify(data);
	}

	return data;
}
/**
 * 转义处理Response
 *
 * @param {Response} response 响应对象
 * @param {String} dataType 数据类型
 * @return {Promise}
 */
export function transformResponse(response, dataType) {
	switch (dataType.toUpperCase()) {
		case 'ARRAYBUFFER':
			return response.arrayBuffer();
		case 'BLOB':
			return response.blob();
		case 'FORMDATA':
			return response.formData();
		case 'TEXT':
			return response.text();
		default:
			return response.json();
	}
}
