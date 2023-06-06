import { trig, rounding, expalog, constants, vector } from './mathobj.js';
import { Calculator } from './calculator.js';
import { graph } from './graph.js';

Object.assign(globalThis, trig, rounding, expalog, vector, constants,
Object.fromEntries('abcdefghijklmnopqrstuvwxyzABDHIJKLMNOPQSTUVWXYZ'.split('').map(i=>[i,0])));

var mapObj = (o, i) => {
	var m = {};
	for (let p in o) {m[p] = i(p, o[p])}
	return m
}

globalThis.calc = new Calculator($el('#calc')[0], {
	trigonometry: mapObj(trig, (p) => p + '('), rounding: mapObj(rounding, (p) => p + '('), exponential: mapObj(expalog, (p) => p + '('),
	vector: mapObj(vector, (p) => p + '('), constants: mapObj(constants, (p) => p + '')
});
globalThis.forEach= (a, i) =>a.forEach(i);
globalThis.forRange = (s,e,p, f) => {
	for(let i = s; i <= e; i+=p) {f(i)}
};

window.onresize = () => {calc.switchGrp(); calc.handleBBBtn()}