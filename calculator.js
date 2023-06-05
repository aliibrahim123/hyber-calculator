export class Calculator {
	constructor (el, buttons) {
		this.el = el;
		this.inp = $el('<textarea id ="inp" style="font-size:15px">')[0];
		this.btnsData = buttons;
		this.curGrp = 'basic'
		this.errel = $el('<div id="error" style="display:none">')[0];
		this.outel = $el('<div id="out">empty')[0];
		this.btnBCont = $el('<div id ="btnBCont">')[0];
		for (let i in this.constructor.basicBtns) {
			let btn = $el('<button fn = "' + i + '"class ="bbtn">' + i)[0];
			btn.onclick = this.handleBasic.bind(this)
			this.btnBCont.append(btn);
		}
		
		this.btnTCont = $el('<div id ="btnTCont">')[0];
		for (let i in this.btnsData) {
			let btn = $el('<button grp = "' + i + '"class ="btnGroup">' + i)[0];
			btn.onclick = this.handleGroup.bind(this)
			this.btnTCont.append(btn)
		}
		this.btnFCont = $el('<div id ="btnFCont">')[0];
		
		
		el.append(this.inp, this.errel, this.outel, this.btnBCont, this.btnTCont, this.btnFCont);
		this.switchGrp();
		this.switchGrp();
	}
	switchGrp (group = this.curGrp) {
		this.btnFCont.replaceChildren();
		var curBtnsData = this.btnsData[group];
		for (let i in curBtnsData) {
			let btn = $el('<button fn = "' + i + '"class ="btn">' + i)[0];
			btn.onclick = this.handleBtn.bind(this)
			this.btnFCont.append(btn)
		}
		adjustwidth(this.btnFCont);
		this.curGrp = group
	}
	calc () {
		this.error('');
		var str = this.inp.value;
		var strarr = str.split('');
		var parSC = strarr.reduce((a,c) => c=== '(' ? a+1: a, 0);
		var parEC = strarr.reduce((a,c) => c=== ')' ? a+1: a, 0);
		if (parSC !== parEC) {
			this.error('paranthases are not closed')
		}
		
		try {
			var fn = new Function(str.includes(';') ? str : 'return ' + str)
		} catch (error) {
			this.error(error.toString());
			return
		}
		
		try {
			var result = fn();
		} catch (error) {
			this.error(error.toString());
			return
		}
		
		this.outel.innerText = result
	}
	error (text) {
		if (text.length === 0) this.errel.style.display = 'none';
		else this.errel.style.display = 'block';
		this.errel.innerText = text
	}
	handleBasic (e) {
		e.preventDefault();
		this.inp.focus();
		Calculator.basicBtns[e.target.getAttribute('fn')](this)
	}
	handleGroup (e) {
		e.preventDefault();
		this.inp.focus();
		this.switchGrp(e.target.getAttribute('grp'))
	}
	handleBtn (e) {
		e.preventDefault();
		this.inp.focus();
		calc.insert(this.btnsData[this.curGrp][e.target.getAttribute('fn')])
	}
	insert (text) {
		insertText(text, this.inp)
	}
	static basicBtns = {
		space (calc) {
			calc.insert(' ')
		},
		calc (calc) {
			calc.calc();
		},
		left (calc) {
			calc.inp.selectionEnd += -1;
		},
		right (calc) {
			calc.inp.selectionStart += 1;
		},
		delete (calc) {
			var p = calc.inp.selectionStart;
			calc.inp.value = calc.inp.value.slice(0, p -1) + calc.inp.value.slice(p);
			calc.inp.selectionStart = p-1;
			calc.inp.selectionEnd = p-1;
		},
		'(' (calc) {
			calc.insert('(')
		},
		')' (calc) {
			calc.insert(')')
		},
		clear (calc) {
			calc.inp.value = ''
		},
		incFont (calc) {
			calc.inp.style.fontSize = ((calc.inp.style.fontSize.replace('px', '') - 0) +1) + 'px'
		},
		decFont (calc) {
			calc.inp.style.fontSize = ((calc.inp.style.fontSize.replace('px', '') - 0) -1) + 'px'
		}
	}
}

var insertText = (newText, el = document.activeElement) => {
	newText = String(newText)
	const start = el.selectionStart
	const end = el.selectionEnd
	const text = el.value
	const before = text.substring(0, start)
	const after  = text.substring(end, text.length)
	el.value = (before + newText + after)
	el.selectionStart = start + newText.length
	el.selectionEnd = start + newText.length
	el.focus()
}

var adjustwidth = (el) => {
	var els = [...el.children], width = getWidth(el);
	var levels = [], lastLevel, levInd = 0, ft= true;;
	els.forEach(el=> {
		var lev = el.getBoundingClientRect().y;
		if (lastLevel === lev) levels[levInd].push(el);
		else {
			if (!ft) levInd++;
			lastLevel = lev;
			levels[levInd] = [el]
			ft = false
		}
	});
	levels.forEach(i=> {
		var el = $el('<div class = "adj">')[0];
		i[0].before(el)
		el.append(...i);
		el.style.gridTemplateColumns = `repeat(${i.length}, auto)`;
	})
}

var getWidth = (el) => {
	const containerWidth = el.clientWidth;
	const elStyle = getComputedStyle(el);
	const paddingLeft = parseFloat(elStyle.paddingLeft);
	const paddingRight = parseFloat(elStyle.paddingRight);
	const borderLeftWidth = parseFloat(elStyle.borderLeftWidth);
	const borderRightWidth = parseFloat(elStyle.borderRightWidth);
	return containerWidth - paddingLeft - paddingRight - borderLeftWidth - borderRightWidth;
}