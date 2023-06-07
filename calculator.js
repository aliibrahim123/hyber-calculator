import { graph } from './graph.js';
import { table } from './table.js';

export class Calculator {
	constructor (el, buttons) {
		this.el = el;
		this.inp = $el('<textarea id ="inp" style="font-size:15px">0')[0];
		this.btnsData = {
			keyboard:  Object.fromEntries('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_()[]{}.,~?\\|<>:\'`!+-=*/@#$%^&'.split('').map(i=>[i,i])),
			memory: Object.fromEntries(Array.from({length: 64}).map((i, ii) => [ii ? 'm' + ii : 'm', ii ? 'm' + ii : 'm'])),
			history: Object.fromEntries(Array.from({length: 64}).map((i, ii) => [ii ? 'h' + ii : 'h', (calc) => calc.inp.value = calc.history[ii]])),
			variables: {},
			functions: {},
			'control flow': {
				var: 'var ',
				let: 'let ',
				const: 'const ',
				if: 'if (',
				else: 'else {',
				elseif: 'else if (',
				for: 'for (let i = 0; i < 10; i++)',
				forEach: 'forEach(',
				'for range': 'forRange(',
				while: 'while (',
				noop: 'noop',
				'? :': '? : ',
				return: 'return ',
				break: 'break;',
				continue: 'continue;',
				'=>': ' => '
			},
			operations: Object.fromEntries(['+','-','*','/','=','++','--','!','~','**','%','<','>','<=','>=','===','!==','<<','>>','>>>','&','|',
			'^','&&','||','??','*=','/=','%=','+=','-=','<<=','>>=','>>>=','&=','|=','^=','&&=','||=','??=','**'].map(i=>[i,i])),
			...buttons,
		};
		this.funs = {};
		this.curGrp = 'keyboard';
		this.memory = Array.from({length: 64}).map(i=>0);
		this.history = Array.from({length: 64}).map(i=>0);
		this.variables = 'abcdefghijklmnopqrstuvwxyzABDHIJKLMNOPQSTUVWXYZ'.split('');
		this.btnsData.variables = Object.fromEntries(this.variables.map(i=>[i,i]));
		let obj1 = {};
		for (let i in this.funs) {
			obj1[i] = i + '('
		}
		this.btnsData.functions = obj1;
		globalThis.ans = 0;
		
		this.errel = $el('<div id="error" style="display:none">')[0];
		this.outel = $el('<div id="out">empty')[0];
		this.btnBCont = $el('<div id ="btnBCont">')[0];
		for (let i in this.constructor.basicBtns) {
			let btn = $el('<button fn = "' + i + '"class ="bbtn">' + i)[0];
			btn.onclick = this.handleBasic.bind(this)
			this.btnBCont.append(btn);
		}
		this.btnBBCont = $el('<div id ="btnBBCont">')[0];
		
		this.btnTCont = $el('<div id ="btnTCont">')[0];
		for (let i in this.btnsData) {
			let btn = $el('<button grp = "' + i + '"class ="btnGroup">' + i)[0];
			btn.onclick = this.handleGroup.bind(this)
			this.btnTCont.append(btn)
		}
		this.btnFCont = $el('<div id ="btnFCont">')[0];
		
		this.memel = $el('<div id="mem" style="display:none">')[0];
		this.hisel = $el('<div id="his" style="display:none">')[0];
		this.varel = $el('<div id="var" style="display:none">')[0];
		
		this.graph = new graph($el('<canvas id="canva" style = "display: none">')[0], this.el.clientWidth - 80, this.el.clientWidth -80, 0,0,20);
		this.table = new table($el('<table id="table" style="display: none">')[0], [[1,2], [3,4]]);
		
		this.graphOpts = $el(`<div id='gropt'style='display:none'>
		<span>offsetX:<input id='ox'type="number"></span> <span>offsetY:<input id='oy'type="number"></span> 
		<span>scale:<input id='scale'type="number" value=20></span> <span>error:<input value=0.05 min=0.00001; max=0.5 step=0.01 id='err'type="number"></span>
		<span>thickness:<input min=1 max=10 id='thick'type="range"></span><span><button id='' onclick = 'calc.constructor.basicBtns.graph(calc);calc.constructor.basicBtns.graph(calc)'>update</button>
		`)[0];
		$el('input', this.graphOpts).forEach(i=>i.oninput = this.handleGraphBtn.bind(this));
		
		this.tableOpts = $el(`<div id='tbopt'style='display:none'>
		<button class='tbob' onclick='calc.table.new()'>new</button>
		<button class='tbob' onclick='calc.table.load()'>load</button>
		<button class='tbob' onclick='calc.table.save()'>save</button>
		<button class='tbob' onclick='calc.table.addRow()'>add row</button>
		<button class='tbob' onclick='calc.table.addCol()'>add column</button>
		<button class='tbob' onclick='calc.table.remRow()'>remove row</button>
		<button class='tbob' onclick='calc.table.remCol()'>remove column</button>
		`)[0];
		
		el.append(this.inp, this.errel, this.outel, this.graph.canvas, this.graphOpts, this.table.el, this.tableOpts, this.btnBCont, this.btnBBCont, this.btnTCont, this.btnFCont, this.varel, this.memel, this.hisel);
		this.switchGrp();
		this.switchGrp();
		this.handleBBBtn();
		this.handleVar();
		this.calc();
	}
	handleBBBtn() {
		var el = this.btnBBCont, data = this.constructor.baseBtn;
		el.replaceChildren();
		data.forEach(i=>{
			let btn = $el('<button class ="btn">' + i)[0];
			btn.onclick = () => this.insert(i);
			el.append(btn);
		});
		adjustwidth(el)
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
	handleGraphBtn (e) {
		this.graph[e.target.id] = Number(e.target.value);
		this.graph.redraw()
	}
	calc () {
		this.error('');
		var str = this.inp.value;
		var strarr = str.split('');
		var parSC = strarr.reduce((a,c) => c=== '(' ? a+1: a, 0);
		var parEC = strarr.reduce((a,c) => c=== ')' ? a+1: a, 0);
		if (parSC !== parEC) {
			this.error('paranthases are not closed');
			return false
		}
		
		try {
			var fn = new Function(str.includes(';') ? str : 'return ' + str)
		} catch (error) {
			this.error(error.toString());
			return false
		}
		
		try {
			var result = fn();
		} catch (error) {
			this.error(error.toString());
			return false
		}
		
		this.outel.innerText = result;
		ans = result;
		this.pushMem(result);
		this.pushHis(this.inp.value);
		this.handleVar();
		return true
	}
	error (text) {
		if (text.length === 0) this.errel.style.display = 'none';
		else this.errel.style.display = 'block';
		this.errel.innerText = text
	}
	pushMem (latest) {
		this.memory.unshift(latest);
		this.memory.pop();
		Object.assign(globalThis, Object.fromEntries(this.memory.map((i, ii)=> [ii ? 'm' + ii : 'm', i])));
		this.memel.replaceChildren(...Array.from({length:64}).map((ii, i)=>i?'m'+i:'m').map(i=>$el('<span class="memU">' + i + ':' + String(globalThis[i]))[0]));
	}
	pushHis (latest) {
		this.history.unshift(latest);
		this.history.pop();
		this.hisel.replaceChildren(...Array.from({length:64}).map((ii, i)=>[i?'h'+i:'h', i]).map(i=>$el('<span class="hisU">' + i[0] + ':' + this.history[i[1]])[0]));
	}
	handleVar () {
		this.variables = Array.from(new Set(this.variables));
		this.btnsData.variables = Object.fromEntries(this.variables.map(i=>[i,i]));
		this.varel.replaceChildren(...this.variables.map(i=>$el('<span class="varU">' + i + ':' + String(globalThis[i]))[0]));
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
		var data = this.btnsData[this.curGrp][e.target.getAttribute('fn')];
		typeof data === 'function' ? data(calc) : calc.insert(data)
	}
	insert (text) {
		insertText(text, this.inp)
	}
	static baseBtn = [1,2,3,4,5,6,7,8,9,0,'.','+','-','/','*',',','ans','x','y','a','b','c','d','e','f','(',')','[',']',';'];
	static basicBtns = {
		space (calc) {
			calc.insert(' ')
		},
		newLine (calc) {
			calc.insert('\n')
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
		clear (calc) {
			calc.inp.value = ''
		},
		incInpFont (calc) {
			calc.inp.style.fontSize = ((calc.inp.style.fontSize.replace('px', '') - 0) +1) + 'px'
		},
		decInpFont (calc) {
			calc.inp.style.fontSize = ((calc.inp.style.fontSize.replace('px', '') - 0) -1) + 'px'
		},
		incFont (calc) {
			calc.el.style.fontSize = ((calc.el.style.fontSize.replace('px', '') - 0) +1) + 'px'
		},
		decFont (calc) {
			calc.el.style.fontSize = ((calc.el.style.fontSize.replace('px', '') - 0) -1) + 'px'
		},
		'new var' (calc) {
			var v = prompt('give name');
			calc.variables.push(v);
			calc.handleVar()
		},
		'new Fun' (calc) {
			var v = prompt('give name');
			var args = prompt('args sepetated by ,');
			if (!calc.calc()) return;
			var str = calc.inp.value.includes(';') ? calc.inp.value : 'return ' + calc.inp.value;
			calc.funs[v] = [str, args.split(',')];
			globalThis[v] = new Function(...args.split(','), str);
			let obj1 = {};
			for (let i in calc.funs) {
				obj1[i] = i + '('
			}
			calc.btnsData.functions = obj1;
		},
		vars (calc) {
			calc.varel.style.display = calc.varel.style.display === 'none' ? 'block' : 'none'
		},
		mem (calc) {
			calc.memel.style.display = calc.memel.style.display === 'none' ? 'block' : 'none'
		},
		history (calc) {
			calc.hisel.style.display = calc.hisel.style.display === 'none' ? 'block' : 'none'
		},
		graph (calc) {
			if (!calc.calc()) return;
			calc.graph.lines = [{fn:new Function('x', 'y', calc.inp.value.includes(';') ? calc.inp.value : 'return ' + calc.inp.value), color:'black'}];
			calc.graph.redraw();
			calc.graph.canvas.style.display = calc.graph.canvas.style.display === 'none' ? 'block' : 'none';
			calc.graphOpts.style.display = calc.graphOpts.style.display === 'none' ? 'grid' : 'none'
		},
		table (calc) {
			calc.table.redo([]);
			calc.table.el.style.display = calc.table.el.style.display === 'none' ? 'block' : 'none';
			calc.tableOpts.style.display = calc.tableOpts.style.display === 'none' ? 'grid' : 'none'
		},
		save (calc) {
			localStorage.setItem('calc', JSON.stringify({
				memory: calc.memory,
				history: calc.history,
				variables: calc.variables,
				varobj: Object.fromEntries(calc.variables.map(i=>[i, globalThis[i]])),
				linp: calc.inp.value,
				funs: calc.funs,
				ans
			}, (k,v) => {
				if (typeof v === 'object' && v !== null && !Array.isArray(v) && v.constructor !== Object) return {...v, proto: v.constructor.name};
				return v
			}))
		},
		load (calc) {
			var obj = JSON.parse(localStorage.getItem('calc'), (k,v) => {
				if (typeof v === 'object' && v !== null && !Array.isArray(v) && v.proto) return {...v, __proto__: globalThis[v.proto].prototype, proto: undefined};
				return v
			});
			if (!obj) return;
			calc.history = obj.history;
			calc.memory = obj.memory;
			calc.variables = obj.variables;
			calc.inp.value = obj.linp;
			calc.funs = obj.funs;
			for (let f in obj.funs) {
				globalThis[f] = new Function(...obj.funs[f][1], obj.funs[f][0])
			}
			ans = obj.ans;
			Object.assign(globalThis, obj.varobj);
			calc.handleVar()
			Object.assign(globalThis, Object.fromEntries(calc.memory.map((i, ii)=> [ii ? 'm' + ii : 'm', i])));
			calc.hisel.replaceChildren(...Array.from({length:64}).map((ii, i)=>[i?'h'+i:'h', i]).map(i=>$el('<span class="hisU">' + i[0] + ':' + calc.history[i[1]])[0]));
			let obj1 = {};
			for (let i in calc.funs) {
				obj1[i] = i + '('
			}
			calc.btnsData.functions = obj1;
			calc.memel.replaceChildren(...Array.from({length:64}).map((ii, i)=>i?'m'+i:'m').map(i=>$el('<span class="memU">' + i + ':' + String(globalThis[i]))[0]));
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