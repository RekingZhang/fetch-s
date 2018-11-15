import extend from './../../src/utils/extend';

describe('test extend...', () => {
	it('测试Object', () => {
		let obj = {
			a: 1,
			b: 'as',
			c: {
				a: '23'
			}
		};
		let extendObj = extend(obj,{
			a:3
		});
		expect(extendObj).toEqual(obj);
	});
});
