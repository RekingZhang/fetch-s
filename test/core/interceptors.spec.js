import Interceptor from './../../src/core/interceptors';

describe('test Interceptor...', () => {
	it('测试添加拦截器', () => {
		let interceptors = new Interceptor();
		interceptors.use(function() {}, function() {});
		interceptors.use(function() {}, function() {});
		interceptors.use(function() {}, function() {});
		expect(interceptors.queue.length).toBe(3);
	});
	it('测试执行、移除拦截器', () => {
		let interceptors = new Interceptor();
		let num = 1;
		interceptors.use(
			function() {
				num++;
			},
			function() {}
		);
		interceptors.use(
			function() {
				num = num + 2;
			},
			function() {}
		);
		interceptors.use(
			function() {
				num = num + 3;
			},
			function() {}
		);
		interceptors.eject(1);

		interceptors.forEach(interceptor => {
			interceptor.resolve();
		});
		expect(num).toBe(5);
	});
});
