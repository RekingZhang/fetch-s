import Adc from './core/adc';
import DEFAULTS from './defaults';

let adc = new Adc(DEFAULTS);

adc.create = function(config) {
	return new Adc(config);
};

adc.all = function(promises) {
	return Promise.all(promises);
};
adc.race = function(promises) {
	return Promise.race(promises);
};

export default adc;
