import fetchMock from 'fetch-mock';
import fetchs from './../../src/fetchs';

describe('创建实例单元测试', () => {
	beforeEach(function() {
		const headers = {
			'Content-Type': 'application/json;charset=utf-8',
			'Access-Control-Allow-Origin': '*'
		};
		const body = { foo: 'bar' };

		fetchMock.get('http://www.example.com/api/', {
			status: 200,
			body,
			headers
		});
	});

	afterEach(function() {
		fetchMock.restore();
	});
	it('json', async () => {
		const instance = fetchs.create({
			origin: 'https://www.example.com'
		});

		await instance
			.get('/api/', {
				timeout: 1000
			})
			.then(r => {
				expect(r.data).toEqual({ foo: 'bar' });
			})
			.catch(e => {
				console.dir('error', e);
			});
	});
});
