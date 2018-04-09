/**
 * 拦截器队列
 *
 */
class Intercetors {
	constructor() {
		this.queue = [];
	}
	/**
	 * 添加拦截器
	 *
	 * @param {Function} resolve
	 * @param {Function} reject
	 * @return {Number} 拦截器ID
	 */
	use(resolve, reject) {
		this.queue.push({
			resolve: resolve,
			reject: reject
		});
		return this.queue.length - 1;
	}
	/**
	 * 移除拦截器
	 *
	 * @param {Number} id 拦截器ID
	 */
	eject(id) {
		this.queue[id] = null;
	}
	/**
	 * 拦截器内部迭代器
	 *
	 * @param {Function} fn 回调函数
	 */
	forEach(fn) {
		this.queue.forEach(intercetor => {
			if (intercetor !== null) {
				fn(intercetor);
			}
		});
	}
}

export default Intercetors;
