import jsonp from './../../src/core/jsonp';

// See http://doc.jsfiddle.net/use/echo.html
let url ="http://jsfiddle.net/echo/jsonp/?a=1&b=2";

describe('test jsonp...', () => {
	
	let originalTimeout;

    beforeEach(function() {
    	originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    	jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
	});
	afterEach(function() {
		jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
	});

	it('测试正常请求', done => {
		jsonp({
			url: url,
			timeout: 8000,
			cache: true
		}).then(data => {
			expect(data).toEqual({
				a: '1',
				b: '2'
			});
			done();
		})
	});

	it('测试超时', done => {
		jsonp({
			url: url,
			timeout: 1,
			cache: false
		}).catch(e => {
			expect(e).toEqual(new Error('Request timed out'));
			done();
		});
	});
});
