export var base = {
	add: (a,b) => a+b,
	sub: (a,b) => a-b,
	mult: (a,b) => a*b,
	div: (a,b) => a/b,
	neg: (a) => -a,
	abs: Math.abs,
	equal: (a,b) => a === b,
	ne: (a,b) => a !== b,
	gt: (a,b) => a > b,
	lt: (a,b) => a < b,
	gte: (a,b) => a >= b,
	lte: (a,b) => a <= b,
	sign: Math.sign,
	nb: a => Number(a),
	int: Math.floor,
	isNb: (a) => a?.constructor === Number,
	isNaN: isNaN,
	isInt: Number.isInteger,
	isFloat: a => !isInt(a),
	rand: (min=0, max=1) => Math.random * (max - min) + min,
	randInt: (min=1, max=10) => Math.round(Math.random * (max - min) + min),
}

export var bit = {
	and: (a,b) => a & b,
	not: (a) => ~a,
	or: (a,b) => a | b,
	xor: (a,b) => a ^ b,
	nand: (a,b) => ~(a & b),
	nor: (a,b) => ~(a | b),
	xnor: (a,b) => ~(a ^ b),
	truthness: a => !!a,
	lShift: (a,b) => a << b,
	rShift: (a,b) => a >> b,
	uRShift: (a,b) => a >>> b,
	rotateLeft: (num, shift) => (num << shift) | (num >>> (32 - shift)),
	rotateRight: (num, shift) => (num >>> shift) | (num << (32 - shift)),
	uint8: a => Math.max(Math.min(a,255),0),
	uint16: a => Math.max(Math.min(a,65535),0),
	uint32: a => Math.max(Math.min(a,4294967295),0),
	int8: a => Math.max(Math.min(a,127),-128),
	int16: a => Math.max(Math.min(a,32767),-32768),
	int32: a => Math.max(Math.min(a,2147483647),-2147483648),
	isUint8: a => a >= 0 && a <= 255,
	isUint16: a => a >= 0 && a <= 65535,
	isUint32: a => a >= 0 && a <= 4294967295,
	isInt8: a => a >= -128 && a <= 127,
	isInt16: a => a >= -32768 && a <= 32767,
	isInt32: a => a >= -2147483648 && a <= 2147483647,
	getBit: (num, bitPosition) => (num >> bitPosition) & 1,
	setBit: (num, bitPosition) => num | (1 << bitPosition),
	clearBit: (num, bitPosition) => num & ~(1 << bitPosition),
	toggleBit: (num, bitPosition) => num ^ (1 << bitPosition),
	extract: (num, startBit, bitLength) => (num >> startBit) & (1 << bitLength) - 1,
	insert: (num, bitfield, startBit, bitLength) => {
		const mask = (1 << bitLength) - 1;
		bitfield &= mask;
		return (num & ~(mask << startBit)) | (bitfield << startBit);
	},
	isEven: (num) => (num & 1) === 0,
	isOdd: (num) => (num & 1) === 1,
	isPowerOfTwo: (num) => num > 0 && (num & (num - 1)) === 0,
	countSetBits: (num) => {
		let count = 0;
		while (num) {
			num &= num - 1;
			count++;
		}
		return count;
	},
	reverseBits: (num) => {
		let result = 0;
		let bitCount = Math.floor(Math.log2(num)) + 1;

		while (bitCount--) {
			result <<= 1;
			result |= num & 1;
			num >>= 1;
		}

		return result;
	},
	nextPowerOfTwo: (num) => {
		num--;
		num |= num >> 1;
		num |= num >> 2;
		num |= num >> 4;
		num |= num >> 8;
		num |= num >> 16;
		num++;
		return num;
	},
	reverseBits: (num) => {
		let result = 0;
		for (let i = 0; i < 32; i++) {
			result <<= 1;
			result |= num & 1;
			num >>= 1;
		}
		return result >>> 0;
	},
	countLeadingZeros: (num) => {
		if (num === 0) return 32;
		let count = 0;
		num = ~num;
		while (num < 0) {
			num <<= 1;
			count++;
		}
		return count;
	},
}

export var trig = {
	sin: (angle) => Math.sin(angle),
	cos: (angle) => Math.cos(angle),
	tan: (angle) => Math.tan(angle),
	sec: (angle) => 1 / Math.cos(angle),
	csc: (angle) => 1 / Math.sin(angle),
	cot: (angle) => 1 / Math.tan(angle),
	arcsin: (value) => Math.asin(value),
	arccos: (value) => Math.acos(value),
	arctan: (value) => Math.atan(value),
	arcsec: (value) => Math.acos(1 / value),
	arccsc: (value) => Math.asin(1 / value),
	arccot: (value) => Math.atan(1 / value),
	degToRad: (degrees) => (degrees * Math.PI) / 180,
	radToDeg: (radians) => (radians * 180) / Math.PI,
	sinh: (angle) => Math.sinh(angle),
	cosh: (angle) => Math.cosh(angle),
	tanh: (angle) => Math.tanh(angle),
	sech: (angle) => 1 / Math.cosh(angle),
	csch: (angle) => 1 / Math.sinh(angle),
	coth: (angle) => 1 / Math.tanh(angle),
	arsinh: (value) => Math.asinh(value),
	arcosh: (value) => Math.acosh(value),
	artanh: (value) => Math.atanh(value),
	arsech: (value) => Math.acosh(1 / value),
	arcsch: (value) => Math.asinh(1 / value),
	arcoth: (value) => Math.atanh(1 / value),
	versin: (angle) => 1 - Math.cos(angle),
	vercosin: (angle) => 1 - Math.sin(angle),
	coversin: (angle) => 1 + Math.sin(angle),
	covercosin: (angle) => 1 + Math.cos(angle),
	haversin: (angle) => (1 - Math.cos(angle)) / 2,
	havercosin: (angle) => (1 - Math.sin(angle)) / 2,
	hacoversin: (angle) => (1 + Math.sin(angle)) / 2,
	hacovercosin: (angle) => (1 + Math.cos(angle)) / 2,
	exsec: (angle) => (1 / Math.cos(angle)) - 1,
	excsc: (angle) => (1 / Math.sin(angle)) - 1,
	sinc: (angle) => {
		if (angle === 0) {
			return 1;
		} else {
			return Math.sin(angle) / angle;
		}
	},
	cosc: (angle) => {
		if (angle === 0) {
			return 0;
		} else {
			return Math.cos(angle) / Math.sin(angle);
		}
	},
	
	
};

export var rounding = {
	ceil: number => Math.ceil(number),
	floor: number => Math.floor(number),
	round: number => Math.round(number),
	trunc: number => Math.trunc(number),
	toFixed: (number, decimals) => Number(number.toFixed(decimals)),
	toPrecision: (number, precision) => Number(number.toPrecision(precision)),
	up: (number, precision = 0) => {
		const multiplier = Math.pow(10, precision);
		return Math.ceil(number * multiplier) / multiplier;
	},
	down: (number, precision = 0) => {
		const multiplier = Math.pow(10, precision);
		return Math.floor(number * multiplier) / multiplier;
	},
	halfUp: (number, precision = 0) => {
		const multiplier = Math.pow(10, precision);
		return Math.round(number * multiplier) / multiplier;
	},
	halfDown: (number, precision = 0) => {
		const multiplier = Math.pow(10, precision);
		return Math.trunc(number * multiplier + 0.5) / multiplier;
	},
	halfEven: (number, precision = 0) => {
		const multiplier = Math.pow(10, precision);
		const rounded = Math.round(number * multiplier);
		return (rounded % 2 === 0) ? rounded / multiplier : (rounded - 1) / multiplier;
	},
	toNearest: (number, target, precision = 0) => {
		const multiplier = Math.pow(10, precision);
		return Math.round(number * multiplier / target) * target / multiplier;
	},
	toLower: (number, step = 1) => Math.floor(number / step) * step,
	toUpper: (number, step = 1) => Math.ceil(number / step) * step,
	toZero: (number, step = 1) => Math.trunc(number / step) * step
};

export var expalog = {
	log: (number) => Math.log(number),
	log10: (number) => Math.log10(number),
	log2: (number) => Math.log2(number),
	ln: (number) => Math.log(number),
	logBase: (base, number) => Math.log(number) / Math.log(base),
	exp: (number) => Math.exp(number),
	pow: (base, exponent) => Math.pow(base, exponent),
	sqrt: (number) => Math.sqrt(number),
	cbrt: (number) => Math.cbrt(number),
	log1p: x => Math.log1p(x),
	expm1: x => Math.expm1(x),
	hypot: (...args) => Math.hypot(...args),
};

export var constants = {
	PI: Math.PI,
	E: Math.E,
	MAX_UINT8: 255,
	MAX_UINT16: 65535,
	MAX_UINT32: 4294967295,
	MAX_INT8: 127,
	MIN_INT8: -128,
	MAX_INT16: 32768,
	MIN_INT16: -32767,
	MAX_INT32: 2147483647,
	MIN_INT32: -2147483648,
	LN10: Math.LN10,
	LN2: Math.LN2,
	LOG10E: Math.LOG10E,
	LOG2E: Math.LOG2E,
	SQRT1_2: Math.SQRT1_2,
	SQRT2: Math.SQRT2,
	GOLDEN_ANGLE: Math.PI * (3 - Math.sqrt(5)), // Golden Angle
	EULER: 0.57721566490153286060, // Euler's Constant
	SQRT3: Math.sqrt(3), // Square Root of 3
	SQRT5: Math.sqrt(5), // Square Root of 5
	LNPI: Math.log(Math.PI), // Natural Logarithm of PI
	LN2PI: Math.log(2 * Math.PI), // Natural Logarithm of 2 * PI
	PHI_CUBED: Math.pow((1 + Math.sqrt(5)) / 2, 3), // Phi Cubed
	SQRT3_DIV_2: Math.sqrt(3) / 2, // Square Root of 3 divided by 2
	LN_PHI: Math.log((1 + Math.sqrt(5)) / 2), // Natural Logarithm of Phi (Golden Ratio)
	PHI: (1 + Math.sqrt(5)) / 2, // Golden Ratio
	GAMMA: 0.57721566490153286060, // Euler-Mascheroni Constant
	ZETA_3: 1.20205690315959428540, // Apery's Constant
	CATALAN: 0.91596559417721901505,
	KHINCHIN: 2.6854520010653064453,
	DICKMAN: 0.62432998854355087099, // Golomb-Dickman Constant
	EMBREE_TREFETHEN: 0.70258,
	LEMNISCATE: 2.6220575542921198104,
	GOMPERTZ: 0.59634736232319407434,
	GOMPERTZ_MEEKER: 0.62432998854355087099,
	GOMPERTZ_MAKEHAM: 0.54308063481524377838,
	FEIGENBAUM_DELTA: 4.6692016091029906718,
	FEIGENBAUM_ALFA: 2.50290787509589282228,
	ARCHELAO_KHALDI: 1.7507697080865864448,
	BESSEL_I0: 1.0,
	BESSEL_I1: 0.0,
	BESSEL_K0: Infinity,
	BESSEL_K1: Infinity,
	BESSEL_J0: 1.0,
	BESSEL_J1: 0.0,
	BESSEL_Y0: -Infinity,
	BESSEL_Y1: -Infinity,
	LI2: 1.0451637801174927848,
	DEUTERIUM: 2.0141017778,
	H2: 2.01565006444,
	H3: 3.0160293201,
	H4: 4.027806,
	ALPHA: 4.001506, // Alpha Particle Mass
	BOHR_MAGNETON: 9.274009994e-24,
	NUCLEAR_MAGNETON: 5.0507837461e-27,
	RYDBERG: 10973731.568525,
	MOEBIUS: 0.57359,
	WOODS_SAXON: 0.5,
	MP_ME: 1836.15267389, // Proton to Electron Mass Ratio
	ME_MP: 0.00054461702168381, // Electron to Proton Mass Ratio
	MUON_ME: 206.7682826, // Muon to Electron Mass Ratio
	TAU_ME: 3477.48, // Tau to Electron Mass Ratio
	PLANCK: 6.62607015e-34, // Planck's Constant
	E_CHARGE: 1.602176634e-19, // Elementary Charge
	E_MASS: 9.10938356e-31, // Electron Mass
	P_MASS: 1.672621898e-27, // Proton Mass
	N_MASS: 1.674927471e-27, // Neutron Mass
	FINE_STRUCTURE: 7.2973525693e-3, // Fine Structure Constant
	MU0: 1.25663706212e-6, // Permeability of Vacuum
	EPSILON0: 8.8541878128e-12, // Permittivity of Vacuum
	C: 299792458, // Speed of Light
	G: 6.67430e-11, // Gravitational Constant
	NA: 6.02214076e23, // Avogadro Constant
	KB: 1.380649e-23, // Boltzmann Constant
	SIGMA: Math.PI ** 2 * (5.670374419e-8), // Stefan-Boltzmann Constant
	LC: 2.42631023867e-12, // Compton Wavelength of the Electron
	RE: 2.8179403227e-15, // Classical Electron Radius
	N_A: 6.02214076e23, // Avogadro's Number
	F: 96485.33212, // Faraday Constant
	R: 8.314462618, // Molar Gas Constant
	R_AIR: 8.314462618, // Gas Constant (Ideal)
	G0: 7.748091729903e-5, // Conductance Quantum
	R_K: 25812.80745, // Von Klitzing Constant
	GM_PER_ME: 1.4755214, // Gravitational Constant / Mass of Electron
	LAMBDA_C: 2.42631023867e-12, // Compton Wavelength of the Electron
	LAMBDA_C2: 4.8626524796e-27, // Compton Wavelength Squared
	LAMBDA_C3: 1.1848139633e-38, // Compton Wavelength Cubed
	Z0: 376.730313668, // Characteristic Impedance of Vacuum
	ALPHA_INV: 137.035999084, // Inverse Fine Structure Constant
	G_E: -2.00231930436182, // Electron G-Factor
	G_M: 2.0023318418, // Muon G-Factor
	G_N: -3.82608545, // Neutron G-Factor
	G_P: 5.585694713, // Proton G-Factor
	G_TAU: -1.77682, // Tau G-Factor
	G_U: -0.9951414, // Deuteron G-Factor
};

export var array = {
	makeArray: (l, f) => Array.from({length:l}, i=>f),
	range: (s,e,t=1) => {
		var arr = [];
		for (let i = s; i < e; i+=t) {
			arr.push(i)
		}
		return arr
	},
	vecToArr: (vec) => vec.comps,
	tableToArr: (t) => t.data,
	setToArr: (s) => Array.from(s),
	len: (a) => a.length,
	at: (arr, i) => arr[i],
	concat: (arr, ...i) => arr.concat(...i),
	copyWithin: (arr, a,b,c) => arr.copyWithin(a,b,c),
	fill: (arr, a,b,c) => arr.fill(a,b,c),
	find: (arr, a) => arr.find(a),
	findIndex: (arr, a) => arr.findIndex(a),
	findLast: (arr, a) => arr.findLast(a),
	findLastIndex: (arr, a) => arr.findLastIndex(a),
	indexOf: (arr, a) => arr.indexOf(a),
	lastIndexOf: (arr, a) => arr.lastIndexOf(a),
	pop: (arr) => arr.pop(),
	push: (arr, ...items) => arr.push(...items),
	reverse: (arr) => arr.reverse(),
	shift: (arr) => arr.shift(),
	unshift: (arr, ...items) => arr.unshift(...items),
	slice: (arr, s,e) => arr.slice(s,e),
	splice: (arr, ...items) => arr.splice(...items),
	includes: (arr, a) => arr.includes(a),
	join: (arr, a) => arr.join(a),
	filter: (arr, fn) => arr.filter(fn),
	flat: (arr) => arr.flat(),
	flatMap: (arr, fn) => arr.flatMap(fn),
	map: (arr, fn) => arr.map(fn),
	every: (arr, fn) => arr.every(fn),
	some: (arr, fn) => arr.some(fn),
	reduce: (arr, fn, i) => arr.reduce(fn, i),
	reduceRight: (arr, fn, i) => arr.reduceRight(fn, i),
}

export var struct = {
	makeStruct: (...items) => Object.fromEntries(items.map(i=>[i,0])),
	has: (s, p) => s[p] !== undefined,
	get: (s, p) => s[p],
	set: (s,p,v) => s[p] = v,
	loopStruct: (s, f) => {
		for (let p in s) {f(p[s], s, p)}
	},
	mapStruct: (s, f) => {
		var r = {};
		for (let p in s) {r[p] = f(p[s], s, p)}
		return r
	},
	filterStruct: (s,f) => {
		var r = {};
		for (let p in s) {if (f(p[s], s, p)) r[p] = s[p]}
		return r
	},
	reduceStruct: (s,f, r) => {
		for (let p in s) {r = f(r, p[s], s, p)}
		return r
	}
}

globalThis.Vector = class Vector {
	constructor (...comps) {
		if (Array.isArray(comps[0])) this.comps = comps[0];
		else this.comps = comps
	}
	toString () {
		return '('+this.comps.join(', ')+')'
	}
	valueOf() {//magnitude
		return Math.sqrt(this.comps.reduce((a,i) => a+ i**2, 0))
	}
}
export var vector = {
	makeVec: (...comps) => new Vector(...comps),
	zeroVec: (l) => new Vector(Array.from({length:l}).map(i=>0)),
	oneVec: (l) => new Vector(Array.from({length:l}).map(i=>1)),
	arrToVec: (arr) => new Vector(arr),
	copy: (vec) => new Vector(vec.comps.map(i=>i)),
	compOfVec: (vec, i) => vec.comps[i],
	addVec: (a,b) => new Vector(a.comps.map((v, i) => v + b.comps[i])),
	subVec: (a,b) => new Vector(a.comps.map((v, i) => v - b.comps[i])),
	mulVec: (a,b) => new Vector(a.comps.map((v, i) => v * b)),
	divVec: (a,b) => new Vector(a.comps.map((v, i) => v / b)),
	dotProduct: (a,b) => a.comps.reduce((s, c, i) => s + i * b.comps[i], 0),
	normalizeVec: (a) => {
		var magnitude = a.valueOf();
		if (magnitude === 0) throw new Error('Cannot normalize a zero vector.');
		return a.divide(magnitude);
	},
	crossProductVec: (a,b) => {
		const dim = a.comps.length;
		const result = Array(dim).fill(0);
		for (let i = 0; i < dimension; i++) {
			const cur = [...a.comps];
			const curO = [...b.comps];
			cur.splice(i, 1);
			curO.splice(i, 1);
			let subResult = 1;

			for (let j = 0; j < dim - 2; j++) {
				subResult *= cur[j] * curO[j + 1] - cur[j + 1] * curO[j];
			}
			result[i] = subResult;
		}
		return result
	},
	isParallelTo: (a,b) => {
		if (isZeroVec(a) || isZeroVec(b)) return true;
		const angle = angleTo(a,b);
		return Math.abs(angle) < Number.EPSILON || Math.abs(angle - Math.PI) < Number.EPSILON;
	},
	isZeroVec: (a) => a.valueOf() === 0,
	isOrthogonalTo: (a,b) => dotProduct(a,b) === 0,
	magnitude: (vec) => vec.valueOf,
	distanceVec: (a, b) => vector.magnitude(vector.subVec(a, b)),
	unitVec: (vec) => divVec(vec, magnitude(vec)),
	angleBetween: (a, b) => Math.acos(dotProduct(a, b) / (magnitude(a) * magnitude(b))),
	projection: (a, b) => mulVec(unitVector(b), dotProduct(a, unitVector(b))),
	isUnitVec: (vec) => Math.abs(magnitude(vec) - 1) < Number.EPSILON,
	isPerpendicularToVec: (a, b) => dotProduct(a, b) === 0,
	reflect: (v, n) => subVec(v, mulVec(mulVec(n, 2), dotProduct(v, n))),
	projectOntoPlane: (v, n) => subVec(v, projection(v, n)),
	randomVec: (min, max, dim) => new Vector(Array.from({length: dim}, ()=>Math.random()*(max - min) + min)),
	sumVec: (...vecs) => vecs.reduce((acc, cur) => addVec(acc, cur), zeroVec(vecs[0].length)),
	isEqualVec: (a, b) => a.comps.length === b.comps.length && a.comps.every((v, i) => v === b.comps[i]),
	elWiseMultVec: (a, b) => new Vector(a.comps.map((v, i) => v * b.comps[i])),
	elWiseDivVec: (a, b) => new Vector(a.comps.map((v, i) => v / b.comps[i])),
	elWiseMinVec: (a, b) => new Vector(a.comps.map((v, i) => Math.min(v, b.comps[i]))),
	elWiseMaxVec: (a, b) => new Vector(a.comps.map((v, i) => Math.max(v, b.comps[i]))),
	absVec: (a) => new Vector(a.comps.map(Math.abs)),
	sumCompsVec: (vec) => vec.comps.reduce((acc, cur) => acc + cur, 0),
	productCompsVec: (vec) => vec.comps.reduce((acc, cur) => acc * cur, 1),
	roundVec: (a) => new Vector(a.comps.map(Math.round)),
	ceilVec: (a) => new Vector(a.comps.map(Math.ceil)),
	truncVec: (a) => new Vector(a.comps.map(Math.trunc)),
	signVec: (a) => new Vector(a.comps.map(Math.sign)),
	average: (...vecs) => divVec(sumVec(...vecs), vecs.length),
	mapVec: (a,f) => new Vector(a.comps.map(f)),
}

export var set = {
	arrToSet: (arr) => new Set(arr),
	union: (a, b) => new Set([...a, ...b]),
	intersection: (a, b) => new Set([...a].filter((x) => b.has(x))),
	difference: (a, b) => new Set([...a].filter((x) => !b.has(x))),
	subset: (a, b) => [...a].every((x) => b.has(x)),
	superset: (a, b) => [...b].every((x) => a.has(x)),
	symmetricDifference: (a, b) => new Set([...a].filter((x) => !b.has(x)).concat([...b].filter((x) => !a.has(x)))),
	isDisjoint: (a, b) => [...a].every((x) => !b.has(x)),
	isEmptySet: (set) => set.size === 0,
	sizeSet: (set) => set.size,
	isEqualSet: (a, b) => a.size === b.size && [...a].every((x) => b.has(x)),
	isSubsetOf: (a, b) => subset(a, b),
	isSupersetOf: (a, b) => superset(a, b),
	isProperSubsetOf: (a, b) => subset(a, b) && !isEqualSet(a, b),
	isProperSupersetOf: (a, b) => superset(a, b) && !isEqualSet(a, b),
	complementSet: (a, b) => difference(b, a),
	powerSet: (set) => {
		const input = arrToSet(set);
		const result = [[]];
		for (let i = 0; i < input.length; i++) {
			const currentSubsets = result.map((subset) => [...subset, input[i]]);
			result.push(...currentSubsets);
		}
		return arrToSet(result);
	},
	cartesianProduct: (a, b) => {
		const result = new Set();
		for (const x of a) {
			for (const y of b) {
				result.add([x, y]);
			}
		}
		return result;
	},
	isPartition: (sets, universalSet) => {
		const flattenedSets = sets.reduce((arr, set) => arr.concat(Array.from(set)), []);
		const mergedSet = new Set(flattenedSets);
		return isEqualSet(mergedSet, universalSet);
	},
	isDisjointSetSystem: (sets) => {
		const universalSet = new Set();
		for (const set of sets) {
			if (!isDisjoint(set, universalSet)) {
				return false;
			}
			union(universalSet, set);
		}
		return true;
	},
	isSingleton: (set) => set.size === 1,
	isEvenSubset: (a, b) => isEmptySet(difference(a, b)),
	isProperEvenSubset: (a, b) => isEvenSubset(a, b) && !isEqualSet(a, b),
	isOddSubset: (a, b) => isSubsetOf(a, b) && !isEvenSubset(a, b),
	isProperOddSubset: (a, b) => isOddSubset(a, b) && !isEqualSet(a, b),
}

export var statistic = {
	min: (data) => data.reduce(Math.min),
	max: (data) => data.reduce(Math.max),
	average: (data) => data.reduce(add, 0) / data.length,
	mean: (data) => data.reduce((acc, val) => acc + val, 0) / data.length,
	
	median: (data) => {
		const sortedData = [...data].sort((a, b) => a - b);
		const mid = Math.floor(sortedData.length / 2);
		return sortedData.length % 2 === 0
			? (sortedData[mid - 1] + sortedData[mid]) / 2
			: sortedData[mid];
	},
	
	mode: (data) => {
		const frequency = {};
		data.forEach((value) => {
			frequency[value] = (frequency[value] || 0) + 1;
		});
		let modes = [];
		let maxCount = 0;
		for (const key in frequency) {
			if (frequency.hasOwnProperty(key)) {
				const count = frequency[key];
				if (count > maxCount) {
					modes = [parseFloat(key)];
					maxCount = count;
				} else if (count === maxCount) {
					modes.push(parseFloat(key));
				}
			}
		}
		return modes;
	},
	
	variance: (data) => {
		const mean = mean(data);
		const squaredDifferences = data.map((value) => (value - mean) ** 2);
		return mean(squaredDifferences);
	},
	
	standardDeviation: (data) => Math.sqrt(variance(data)),
	
	range: (data) => {
		const sortedData = [...data].sort((a, b) => a - b);
		return sortedData[sortedData.length - 1] - sortedData[0];
	},
	
	correlation: (data1, data2) => {
		if (data1.length !== data2.length) {
			throw new Error('Data sets must have the same length.');
		}
		const mean1 = mean(data1);
		const mean2 = mean(data2);
		const deviations1 = data1.map((value) => value - mean1);
		const deviations2 = data2.map((value) => value - mean2);
		const productDeviations = deviations1.map((dev1, i) => dev1 * deviations2[i]);
		const covariance = mean(productDeviations);
		const standardDeviation1 = standardDeviation(data1);
		const standardDeviation2 = standardDeviation(data2);
		return covariance / (standardDeviation1 * standardDeviation2);
	},
	factorial: (n) => {
		if (n === 0 || n === 1) {
			return 1;
		} else {
			return n * factorial(n - 1);
		}
	},

	combination: (n, k) => {
		if (k === 0 || k === n) {
			return 1;
		} else {
			return (
				factorial(n) /
				(factorial(k) * factorial(n - k))
			);
		}
	},

	permutation: (n, k) => {
		if (k === 0) {
			return 1;
		} else {
			return factorial(n) / factorial(n - k);
		}
	},

	binomialDistribution: (n, p, x) => {
		const q = 1 - p;
		const coefficient = combination(n, x);
		const probability = coefficient * (p ** x) * (q ** (n - x));
		return probability;
	},

	exponentialDistribution: (lambda, x) => {
		if (x < 0) {
			return 0;
		} else {
			return lambda * Math.exp(-lambda * x);
		}
	},

	normalDistributionPDF: (mean, stdDev, x) => {
		const coefficient = 1 / (stdDev * Math.sqrt(2 * Math.PI));
		const exponent = -((x - mean) ** 2) / (2 * (stdDev ** 2));
		return coefficient * Math.exp(exponent);
	},

	normalDistributionCDF: (mean, stdDev, x) => {
		const z = (x - mean) / stdDev;
		return 0.5 * (1 + errorFunction(z / Math.sqrt(2)));
	},

	errorFunction: (x) => {
		const t = 1 / (1 + 0.5 * Math.abs(x));
		const coefficient1 = 0.278393;
		const coefficient2 = 0.230389;
		const coefficient3 = 0.000972;
		const coefficient4 = 0.078108;
		const polynomial = ((coefficient4 * t + coefficient3) * t + coefficient2) * t + coefficient1;
		const probability = 1 - (polynomial * Math.exp(-(x ** 2)));
		return x >= 0 ? probability : -probability;
	},
	covariance: (data1, data2) => {
		if (data1.length !== data2.length) {
			throw new Error('Data sets must have the same length.');
		}
		const mean1 = mean(data1);
		const mean2 = mean(data2);
		const deviations1 = data1.map((value) => value - mean1);
		const deviations2 = data2.map((value) => value - mean2);
		const productDeviations = deviations1.map((dev1, i) => dev1 * deviations2[i]);
		return mean(productDeviations);
	},

	linearRegression: (x, y) => {
		if (x.length !== y.length) {
			throw new Error('Input arrays must have the same length.');
		}
		const n = x.length;
		const sumX = sum(x);
		const sumY = sum(y);
		const sumXY = sum(x.map((val, i) => val * y[i]));
		const sumXSquare = sum(x.map((val) => val ** 2));
		const slope = (n * sumXY - sumX * sumY) / (n * sumXSquare - sumX ** 2);
		const intercept = (sumY - slope * sumX) / n;
		return { slope, intercept };
	},

	chiSquareTest: (observed, expected) => {
		if (observed.length !== expected.length) {
			throw new Error('Input arrays must have the same length.');
		}
		const chiSquare = observed.reduce((acc, val, i) => {
			const diff = val - expected[i];
			return acc + (diff ** 2) / expected[i];
		}, 0);
		return chiSquare;
	},

	tDistributionPDF: (x, df) => {
		const numerator = gamma((df + 1) / 2);
		const denominator = Math.sqrt(df * Math.PI) * gamma(df / 2);
		const coefficient = numerator / denominator;
		const exponent = -((df + 1) / 2) * Math.log(1 + (x ** 2) / df);
		return coefficient * Math.exp(exponent);
	},

	gamma: (n) => {
		if (n === 0) {
			return Infinity;
		} else {
			const coefficients = [
				76.18009172947146, -86.50532032941677, 24.01409824083091,
				-1.231739572450155, 0.1208650973866179e-2, -0.5395239384953e-5
			];
			const x = n - 1;
			let tmp = x + 5.5 - (x + 0.5) * Math.log(x + 5.5);
			for (let i = 0; i < coefficients.length; i++) {
				tmp += coefficients[i] / (x + (i + 1));
			}
			return Math.sqrt(2 * Math.PI) * Math.exp(-tmp) * Math.pow(x + 5.5, x + 0.5);
		}
	},

	sum: (data) => data.reduce((acc, val) => acc + val, 0),
	zScore: (value, mean, stdDev) => (value - mean) / stdDev,

	pearsonCorrelation: (data1, data2) => {
		if (data1.length !== data2.length) {
			throw new Error('Data sets must have the same length.');
		}
		const mean1 = mean(data1);
		const mean2 = mean(data2);
		const deviations1 = data1.map((value) => value - mean1);
		const deviations2 = data2.map((value) => value - mean2);
		const productDeviations = deviations1.map((dev1, i) => dev1 * deviations2[i]);
		const sumProductDeviations = sum(productDeviations);
		const sumSquaredDeviations1 = sum(deviations1.map((dev) => dev ** 2));
		const sumSquaredDeviations2 = sum(deviations2.map((dev) => dev ** 2));
		const correlation = sumProductDeviations / Math.sqrt(sumSquaredDeviations1 * sumSquaredDeviations2);
		return correlation;
	},

	simpleMovingAverage: (data, windowSize) => {
		if (windowSize <= 0 || windowSize > data.length) {
			throw new Error('Invalid window size.');
		}
		const movingAverages = [];
		for (let i = 0; i <= data.length - windowSize; i++) {
			const window = data.slice(i, i + windowSize);
			const average = mean(window);
			movingAverages.push(average);
		}
		return movingAverages;
	},

	exponentialMovingAverage: (data, alpha) => {
		if (alpha <= 0 || alpha > 1) {
			throw new Error('Invalid alpha value.');
		}
		const ema = [];
		ema.push(data[0]);
		for (let i = 1; i < data.length; i++) {
			const value = alpha * data[i] + (1 - alpha) * ema[i - 1];
			ema.push(value);
		}
		return ema;
	},

	independentSamplesTTest: (data1, data2) => {
		const mean1 = mean(data1);
		const mean2 = mean(data2);
		const stdDev1 = standardDeviation(data1);
		const stdDev2 = standardDeviation(data2);
		const n1 = data1.length;
		const n2 = data2.length;
		const pooledVariance = ((n1 - 1) * stdDev1 ** 2 + (n2 - 1) * stdDev2 ** 2) / (n1 + n2 - 2);
		const tValue = (mean1 - mean2) / Math.sqrt(pooledVariance * (1 / n1 + 1 / n2));
		return tValue;
	},

	chiSquareTestIndependence: (observed, expected) => {
		if (observed.length === 0 || observed[0].length === 0) {
			throw new Error('Observed array must be a non-empty matrix.');
		}
		if (observed.length !== expected.length || observed[0].length !== expected[0].length) {
			throw new Error('Observed and expected arrays must have the same dimensions.');
		}
		const rows = observed.length;
		const columns = observed[0].length;
		const degreesOfFreedom = (rows - 1) * (columns - 1);
		let chiSquare = 0;
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < columns; j++) {
				const diff = observed[i][j] - expected[i][j];
				chiSquare += (diff ** 2) / expected[i][j];
			}
		}
		return chiSquare;
	}
}

globalThis.Table = class Table {
	constructor (arr=1, b=1) {
		if (!Array.isArray(arr)) throw new Error('table can not be constructed from non array')
		this.rows = arr.length;
		this.cols = arr.reduce((a,v) => Math.max(a,v.length), 0);
		this.data = arr.map(r=>r.length === this.cols ? r : Array.from({length: this.cols}).map((ii,i)=>r[i] || 0))
	}
	addRow (r,f=0) {
		this.data.splice(r-1, 0, Array.from({length: this.cols}).map(i=>f));
		this.rows++
	}
	addCol (c,f=0) {
		this.data = this.data.map(r=>r.splice(c-1, 0, f));
		this.cols++
	}
	remRow (r) {
		this.data.splice(r-1, q);
		this.rows--
	}
	remCol (c) {
		this.data = this.data.map(r=>r.splice(c-1, 1));
		this.cols--
	}
	toString () {
		return 'Table(' + this.rows + 'x' + this.cols + ')'
	}
}

export var table = {
	arrToTable: (arr) => new Table(arr),
	makeTable: (r=1,c=1,f=0) => new Table(Array.from({length:r}).map(i=>Array.from({length:c}).map(i=>f))),
	copy: (t) => new Table(this.data.map(r=>r.map(c=>c))),
	getRow: (t,r) => t.data[r],
	getCol: (t,r) => Array.from({length: t.rows}).map((ii,i)=>t.data[i][c]),
	rows: (t) => t.rows,
	cols: (t) => t.cols,
	addRow: (t,r,f) => t.addRow(r,f),
	addCol: (t,c,f) => t.addCol(c,f),
	removeRow: (t,r) => t.remRow(r),
	removeCol: (t,c) => t.remCol(c),
	sliceTable: (t,r1,r2,c1,c2) => new Table(t.data.slice(r1,r2).map(r=>r.slice(c1,c2))),
	sliceRows: (t,r1,r2) => new Table(t.data.slice(r1,r2)),
	sliceCols: (t,c1,c2) => new Table(t.data.map(r=>r.slice(c1,c2))),
	fillTable: (t,f,r1,r2,c1,c2) => t.data.slice(r1,r2).forEach(r=>r.fill(f,c1,c2)),
	fillRow: (t,f,r1,r2) => t.data.fill(Array.from({length:t.cols}).map(i=>f),r1,r2),
	fillCol: (t,f,c1,c2) => t.data.forEach(r=>r.fill(f,c1,c2)),
}
