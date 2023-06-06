export class graph {
	constructor (el, rw, rh, ox, oy, scale) {
		this.canvas = el;
		this.ctx = el.getContext('2d');
		this.rw = rw, this.rh = rh, this.ox = ox, this.oy = oy, this.scale = scale;
		this.lines = [];
		this.thick = 1;
		el.width = rw;
		el.height = rh;
		this.drawAxes();
		this.err = 0.05;
	}
	drawAxes () {
		var {ctx, rw, rh, ox, oy, scale} = this;
		ctx.beginPath();
		ctx.moveTo(0, (rh / 2) - (oy * scale));
		ctx.lineTo(rw, (rh / 2) - (oy * scale));
		ctx.strokeStyle = 'black';
		ctx.stroke();
		
		ctx.beginPath();
		ctx.moveTo((rw / 2) + (ox * scale), 0);
		ctx.lineTo((rw / 2) + (ox * scale), rh);
		ctx.strokeStyle = 'black';
		ctx.stroke();
		
		ctx.fillStyle = 'black';
		ctx.font = '12px Arial';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'top';
		for (let x = 0; x <= rw; x += 50) {
			let tx = ((x - (rw / 2)) / scale) - ox;
			let label = tx === 0 ? '0' : tx.toFixed(1);
			ctx.fillText(label, x, (rh / 2) - (oy * scale) + 5);
		}

	
		ctx.textAlign = 'right';
		ctx.textBaseline = 'middle';
		for (let y = 0; y <= rh; y += 50) {
			let ty = -((y - (rh / 2)) / scale) - oy;
			let label = ty === 0 ? '0' : ty.toFixed(1);
			ctx.fillText(label, (rw / 2) + (ox * scale) - 5, y);
		}
	}
	redraw () {
		var {ctx, rw, rh, ox, oy, scale, lines, thick, err} = this;
		ctx.clearRect(0, 0, rw, rh);
		this.drawAxes();
		var yo = rh /2, xo = rw /2;
		
		for (let y = 0; y < rh; y++) {
			let ty = (-y + yo) / scale - oy;
			for (let x = 0; x < rw; x++) {
				let tx = (x - xo) / scale - ox;
				
				lines.forEach(l => {
					var r = l.fn(tx, ty)
					if (r === true || (r < err && r > -err)) {
						ctx.fillStyle = l.color;
						ctx.fillRect(x, y, thick, thick)
					}
				})
			}
		}
	}
}