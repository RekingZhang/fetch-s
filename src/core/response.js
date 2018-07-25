import {
	transformResponse
} from './../utils/transform';
/**
 * 处理response对象
 *
 * @param {Response} response
 * @param {Object} config
 */
function response(response, config) {
	let responseContentType = response.headers.get('Content-Type') || '';

	//请求信息挂载到response上
	response.config = config;
	//如果返回的数据类型和预期的数据类型不一致，则不解析response对象
	if (
		responseContentType.indexOf(config.dataType.toLocaleLowerCase()) === -1
	) {
		return response;
	}
	//解析response
	return transformResponse(response, config.dataType).then(data => {
		response.data = data;
		return response;
	});
}

export default response;
