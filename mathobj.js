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

class Vector {
	constructor (...comps) {
		if (Array.isArray(comps[0])) this.comps = comps[0];
		else this.comps = comps
	}
	toString () {
		return '('+this.comps.join(', ')+')'
	}
	valueOf() {
		return Math.sqrt(this.comps.reduce((a,i) => a+ i**2, 0))
	}
}
export var vector = {
	makeVec: (...comps) => new Vector(...comps),
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
	crossProduct: (a,b) => {
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
	angleTo: (a,b) => Math.acos(dotProduct(a,b) / a.valueOf() * b.valueOf()),
	projectOnto: (a,b) => multVec(a,a.dotProduct(b) / b.valueOf() ** 2),
	isParallelTo: (a,b) => {
		if (isZeroVec(a) || isZeroVec(b)) return true;
		const angle = angleTo(a,b);
		return Math.abs(angle) < Number.EPSILON || Math.abs(angle - Math.PI) < Number.EPSILON;
	},
	isZeroVec: (a) => a.valueOf() === 0,
	isOrthogonalTo: (a,b) => dotProduct(a,b) === 0
}
