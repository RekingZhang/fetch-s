import clone from './../../src/utils/clone';

describe('test clone...', () => {
	it('测试Object', () => {
		let obj = {
			a: 1,
			b: 'as',
			c: {
				a: '23'
			}
		};
		expect(clone(obj)).toEqual(obj);
	});
	it('测试Date', () => {
		let obj = {
			a: 1,
			b: new Date()
		};
		expect(clone(obj)).toEqual(obj);
	});
	it('测试Array', () => {
		let obj = {
			a: 1,
			b: new Date(),
			c: [
				1,
				{
					a: 23
				}
			]
		};
		expect(clone(obj)).toEqual(obj);
	});
});
