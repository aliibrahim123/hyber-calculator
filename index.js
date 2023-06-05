import { trig, rounding, expalog, constants } from './mathobj.js';
import { Calculator } from './calculator.js';

Object.assign(globalThis, trig, rounding, expalog, constants);

var mapObj = (o, i) => {
	var m = {};
	for (let p in o) {m[p] = i(p, o[p])}
	return m
}

globalThis.calc = new Calculator($el('#calc')[0], {
	basic: Object.fromEntries([1,2,3,4,5,6,7,8,9,0,'.','+','-','/','*'].map(i=>[i,i])),
	trigonometry: mapObj(trig, (p) => p + '('), rounding: mapObj(rounding, (p) => p + '('), exponential: mapObj(expalog, (p) => p + '('),
	constants: mapObj(constants, (p) => p + '')
});



window.onresize = () => calc.switchGrp()