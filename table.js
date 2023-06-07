export class table {
	constructor (el, data) {
		this.el = el;
		this.redo(data)
	}
	redo (data) {
		this.data = data;
		this.row = data.length;
		this.col = data.reduce((a,r) => Math.max(a, r.length), 0);
		this.el.replaceChildren();
		this.el.append(...data.map(r=>$elt('<tr>' + r.map(c=>'<td contenteditable>' + c + '</td>').join('') + '</tr>')[0]));
	}
	load () {
		var n = prompt('variable');
		var t = globalThis[n];
		if (!(t instanceof Table)) return calc.error('not table');
		this.redo(t.data)
	}
	save () {
		var n = prompt('variable');
		globalThis[n] = new Table(this.get());
		calc.variables.push(n);
		calc.handleVar()
	}
	addRow () {
		var n = prompt('row');
		var a = this.get();
		a.splice(n-1, 0, Array.from({length:this.col}).map(i=>0))
		this.redo(a)
	}
	addCol () {
		var n = prompt('row');
		this.redo(this.get().map(i=>{i.splice(n-1, 0, 0); return i}))
	}
	remRow () {
		var n = prompt('row');
		var a = this.get();
		a.splice(n-1, 1)
		this.redo(a)
	}
	remCol () {
		var n = prompt('row');
		this.redo(this.get().map(i=>{i.splice(n-1, 1); return i}))
	}
	get () {
		return [...this.el.rows].map(r=>[...r.children].map(i=>i.innerText))
	}
	new () {
		var r = prompt('rows'), c= prompt('columns');
		this.redo(Array.from({length: r}).map(()=>Array.from({length: c}).map(i=>0)))
	}
}
var $elt = (str) => {
	var temp = $el.tag('table');
	temp.innerHTML = str;
	return Array.from(temp.children[0].children)
}