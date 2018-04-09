import buildURL from './../../src/utils/buildURL';

describe('test buildURL...', () => {
	const origin = 'http://github.com';
	it('测试url相对路径', () => {
		let url = '/RekingZhang/';
		let params = {
			a: 1,
			b: 2
		};
		expect(buildURL(origin, url, params)).toBe(
			'http://github.com/RekingZhang/?a=1&b=2'
		);
	});
	it('测试url为绝对路径', () => {
		let url = 'https://github.com/RekingZhang/';
		let params = {
			a: 1,
			b: 2
		};
		expect(buildURL(origin, url, params)).toBe(
			'https://github.com/RekingZhang/?a=1&b=2'
		);
	});
});
