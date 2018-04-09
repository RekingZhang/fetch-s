import types from './type';
import paramsSerializer from './paramsSerializer';

/**
 * 转义处理Request
 *
 * @param {Object} data 请求数据
 * @param {Object} headers 请求头
 * @return
 */
export function transformRequest(data, contentType = '') {
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

	if (types.isObject(data)) {
		return contentType.indexOf('application/json') !== -1
			? JSON.stringify(data)
			: paramsSerializer(data);
	}

	if (types.isURLSearchParams(data)) {
		return data.toString();
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
