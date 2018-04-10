import Fetchs from './core/Fetchs';
import DEFAULTS from './defaults';

let fetchs = new Fetchs(DEFAULTS);

fetchs.create = function(config) {
	return new Fetchs(config);
};

fetchs.all = function(promises) {
	return Promise.all(promises);
};
fetchs.race = function(promises) {
	return Promise.race(promises);
};

export default fetchs;
