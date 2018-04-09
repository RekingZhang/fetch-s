import jsonp from './../../src/core/jsonp';

describe('test jsonp...', () => {
	it('测试超时', async () => {
		await jsonp({
			url: 'http://www.example.com',
			timeout: 5
		}).catch(e => {
			expect(e).toEqual(new Error('Request timed out'));
		});
	});
});
