import fetchs from './../../src/fetchs';

// See http://doc.jsfiddle.net/use/echo.html
let url = 'http://jsfiddle.net/echo/jsonp/';

describe('JSONP单元测试', () => {
	let originalTimeout;

	beforeEach(function () {
		originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
		jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
	});
	afterEach(function () {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
	});

	it('测试正常请求', done => {
		fetchs
			.jsonp(url, {
				data: {
					a: '1',
					b: '2'
				},
				cache: true
			})
			.then(r => {
				expect(r.data).toEqual({
					a: '1',
					b: '2'
				});
				done();
			});
	});
});