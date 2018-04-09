/**
 * 类型判断工具函数
 */
const toString = Object.prototype.toString;

/**
 * 判断是否是'Array'
 *
 * @param {Object} val 要测试的值
 * @returns {boolean} 如果value是一个'Array'，则返回true，否则返回false
 */
function isArray(val) {
	return toString.call(val) === '[object Array]';
}

/**
 * 判断是否是'ArrayBuffer'
 *
 * @param {Object} val 要测试的值
 * @returns {boolean} 如果value是一个'ArrayBuffer'，则返回true，否则返回false
 */
function isArrayBuffer(val) {
	return toString.call(val) === '[object ArrayBuffer]';
}
/**
 * 判断是否是'ArrayBufferView'
 *
 * @param {Object} val 要测试的值
 * @returns {boolean} 如果value是一个'ArrayBufferView'，则返回true，否则返回false
 */
function isArrayBufferView(val) {
	var result;
	if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
		result = ArrayBuffer.isView(val);
	} else {
		result = val && val.buffer && val.buffer instanceof ArrayBuffer;
	}
	return result;
}
/**
 * 判断是否是'FormData'
 *
 * @param {Object} val 要测试的值
 * @returns {boolean} 如果value是一个'FormData'，则返回true，否则返回false
 */
function isFormData(val) {
	return typeof FormData !== 'undefined' && val instanceof FormData;
}

/**
 * 判断是否是'String'
 *
 * @param {Object} val 要测试的值
 * @returns {boolean} 如果value是一个'String'，则返回true，否则返回false
 */
function isString(val) {
	return typeof val === 'string';
}

/**
 * 判断是否是'Number'
 *
 * @param {Object} val 要测试的值
 * @returns {boolean} 如果value是一个'Number'，则返回true，否则返回false
 */
function isNumber(val) {
	return typeof val === 'number' && !isNaN(val);
}

/**
 * 判断是否是'null'
 *
 * @param {Object} val 要测试的值
 * @returns {boolean} 如果value是'null'，则返回true，否则返回false
 */
function isNull(val) {
	return val === null;
}

/**
 * 判断是否是'undefined'
 *
 * @param {Object} val 要测试的值
 * @returns {boolean} 如果value是'undefined'，则返回true，否则返回false
 */
function isUndefined(val) {
	return typeof val === 'undefined';
}

/**
 * 判断是否是'Object'
 *
 * @param {Object} val 要测试的值
 * @returns {boolean} 如果value是一个'Object'，则返回true，否则返回false
 */
function isObject(val) {
	return val !== null && typeof val === 'object';
}

/**
 * 判断是否是'Date'
 *
 * @param {Object} val 要测试的值
 * @returns {boolean} 如果value是一个'Date'，则返回true，否则返回false
 */
function isDate(val) {
	return toString.call(val) === '[object Date]';
}

/**
 * 判断是否是'File'
 *
 * @param {Object} val 要测试的值
 * @returns {boolean} 如果value是一个'File'，则返回true，否则返回false
 */
function isFile(val) {
	return toString.call(val) === '[object File]';
}

/**
 * 判断是否是'Blob'
 *
 * @param {Object} val 要测试的值
 * @returns {boolean} 如果value是一个'Blob'，则返回true，否则返回false
 */
function isBlob(val) {
	return toString.call(val) === '[object Blob]';
}

/**
 * 判断是否是'Function'
 *
 * @param {Object} val 要测试的值
 * @returns {boolean} 如果value是一个'Function'，则返回true，否则返回false
 */
function isFunction(val) {
	return toString.call(val) === '[object Function]';
}
/**
 * 判断是否是'URLSearchParams'对象
 *
 * @param {Object} val 要测试的值
 * @returns {boolean} 如果value是一个'URLSearchParams'对象，则返回true，否则返回false
 */
function isURLSearchParams(val) {
	return (
		typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams
	);
}
export default {
	isArray: isArray,
	isArrayBuffer: isArrayBuffer,
	isArrayBufferView: isArrayBufferView,
	isBlob: isBlob,
	isDate: isDate,
	isFormData: isFormData,
	isString: isString,
	isNumber: isNumber,
	isObject: isObject,
	isUndefined: isUndefined,
	isURLSearchParams: isURLSearchParams,
	isNull: isNull,
	isFile: isFile,
	isFunction: isFunction
};
