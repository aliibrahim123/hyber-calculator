import { base, bit, trig, rounding, expalog, constants, array, struct, set, vector, table, statistic } from './mathobj.js';
import { Calculator } from './calculator.js';
import { graph } from './graph.js';
import './table.js';

Object.assign(globalThis, base, bit, trig, rounding, expalog, array, struct, vector, constants, table, set, statistic, struct, 
Object.fromEntries('abcdefghijklmnopqrstuvwxyzABDHIJKLMNOPQSTUVWXYZ'.split('').map(i=>[i,0])));

var mapObj = (o, i) => {
	var m = {};
	for (let p in o) {m[p] = i(p, o[p])}
	return m
}

globalThis.calc = new Calculator($el('#calc')[0], {
	base: mapObj(base, (p) => p + '('), bit: mapObj(bit, (p) => p + '('), trigonometry: mapObj(trig, (p) => p + '('),
	rounding: mapObj(rounding, (p) => p + '('), exponential: mapObj(expalog, (p) => p + '('), array: mapObj(array, (p) => p + '('),
	struct: mapObj(struct, (p) => p + '('), set: mapObj(set, (p) => p + '('), vector: mapObj(vector, (p) => p + '('),
	table: mapObj(table, (p) => p + '('), statistic: mapObj(statistic, (p) => p + '('), constants: mapObj(constants, (p) => p + '')
});
globalThis.forEach= (a, i) =>a.forEach(i);
globalThis.forRange = (s,e,p, f) => {
	for(let i = s; i <= e; i+=p) {f(i)}
};

window.onresize = () => {calc.switchGrp(); calc.handleBBBtn()}