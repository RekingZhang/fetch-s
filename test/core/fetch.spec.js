import fetchMock from 'fetch-mock';
import _fetch from './../../src/core/fetchTimeout';

describe('test _fetch ...', () => {
	beforeEach(function() {
		const headers = {
			'Content-Type': 'application/json;charset=utf-8',
			'Access-Control-Allow-Origin': '*'
		};
		const body = { foo: 'bar' };

		fetchMock.get('http://www.example.com', {
			status: 200,
			body,
			headers
		});
	});

	afterEach(function() {
		fetchMock.restore();
	});
	it('测试定时器', async () => {
		await _fetch(
			'http://www.example.com',
			{
				method: 'GET'
			},
			1000
		)
			.then(r => {
				return r.json();
			})
			.then(d => {
				expect(d).toEqual({ foo: 'bar' });
			});
	});
	it('测试超时时异常', async () => {
		await _fetch(
			'http://www.example.com',
			{
				method: 'GET'
			},
			0
		).catch(e => {
			expect(e).toEqual(new Error('Request timed out'));
		});
	});
});
