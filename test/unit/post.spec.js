import fetchMock from 'fetch-mock';
import adc from './../../src/index';

describe('POST单元测试', () => {
	beforeEach(function() {
		const headers = {
			'Content-Type': 'application/json;charset=utf-8',
			'Access-Control-Allow-Origin': '*'
		};
		const body = { foo: 'bar' };

		fetchMock.post('http://www.example.com/?', {
			status: 200,
			body,
			headers
		});
	});

	afterEach(function() {
		fetchMock.restore();
	});

	it('json', async () => {
		await adc
			.post('http://www.example.com/', {
				timeout: 1000
			})
			.then(r => {
				expect(r.data).toEqual({ foo: 'bar' });
			});
	});
	it('timeout', async () => {
		await adc
			.post('http://www.example.com/', {
				dataType: 'json',
				timeout: 0
			})
			.catch(e => {
				expect(e).toEqual(new Error('Request timed out'));
			});
	});
});
