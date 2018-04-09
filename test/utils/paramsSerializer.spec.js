import paramsSerializer from './../../src/utils/paramsSerializer';

describe('test buildURL...', () => {
	const origin = 'http://github.com';
	it('测试参数为JSON对象', () => {
		let params = {
			a: 1,
			b: 2
		};
		expect(paramsSerializer(params)).toBe('a=1&b=2');
	});
	it('测试参数为URLSearchParams对象', () => {
		let params = new URLSearchParams('a=1&b=2');
		expect(paramsSerializer(params)).toBe('a=1&b=2');
	});

	it('测试参数为String', () => {
		let params = 'a=1';
		expect(paramsSerializer(params)).toBe('a=1');
	});

	it('测试参数为Date', () => {
		let params = {
			time: new Date('2017-08-09')
		};
		expect(paramsSerializer(params)).toBe(
			'time=' + new Date('2017-08-09').toISOString()
		);
	});

	it('测试参数编码', () => {
		let params = {
			name: '张三'
		};
		expect(paramsSerializer(params)).toBe(
			'name=' + encodeURIComponent('张三')
		);
	});
});
