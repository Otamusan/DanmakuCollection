class CView {
	constructor(width, height) {
		this.width = width
		this.height = height
		this.canvas = CDOMUtil.elt("canvas", {width: this.width, height: this.height})
		this.ctx = this.canvas.getContext("2d");
		this.ctx.font = "20px 'Courier New'";
		this.colorBG = "#00FF00"

		this.ctx.drawCircle = function (x, y, r, color) {
			this.beginPath();
			this.fillStyle = color;
			this.arc(x, y, r, 0, Math.PI * 2, false);
			this.fill();
		}
		var it = this;
		document.addEventListener("onEntityDraw", function (event) {
			event.entityDrawing(it.ctx)
		}, false);
	}
	drawBackGround(color) {
		this.ctx.fillStyle = color;
		this.ctx.fillRect(0, 0, this.width, this.height);
		this.ctx.fill();
	}
	onUpdate() {
		this.drawBackGround(this.colorBG);
	}
}

class CDOMUtil {
    static elt(name, attributes) {
        var node = document.createElement(name);
        if (attributes) {
            for (var attr in attributes) {
                if (attributes.hasOwnProperty(attr)) {
                    node.setAttribute(attr, attributes[attr]);
                }
            }
        }
        for (var i = 2; i < arguments.length; i++) {
            var child = arguments[i];
            if (typeof child == "string") {
                child = document.createTextNode(child);
            }
            node.appendChild(child);
        }
        return node;
    }
}

class CModel {
	constructor() {
		this.scene = 0;
		this.fieldObject = new Array();
		this.setEventListner();

		this.entityDrawEvent = document.createEvent("HTMLEvents");
		this.entityDrawEvent.initEvent("onEntityDraw", true, false);
	}

	registerFieldObject(i, obj) {
		if (this.fieldObject[i] != undefined) {
			throw new Error('scene ' + i + ' has already been registered')
		}
		this.fieldObject[i] = obj;
	}

	onUpdate() {
		if (this.fieldObject[this.scene] == undefined) {
			throw new Error('Fields in scene ' + this.scene + ' are undefined')
		}
		this.fieldObject[this.scene].onUpdate();
	}

	setEventListner() {
		var it = this;
		document.addEventListener("onMouseDown", function (event) {
			if (it.fieldObject[it.scene] == undefined) {
				throw new Error('Fields in scene ' + it.scene + ' are undefined')
			}
			it.fieldObject[it.scene].onMouseDown(event);
		}, false);

		document.addEventListener("onMouseUp", function (event) {
			if (it.fieldObject[it.scene] == undefined) {
				throw new Error('Fields in scene ' + it.scene + ' are undefined')
			}
			it.fieldObject[it.scene].onMouseUp(event);
		}, false);

		document.addEventListener("onMousePress", function (event) {
			if (it.fieldObject[it.scene] == undefined) {
				throw new Error('Fields in scene ' + this.scene + ' are undefined')
			}
			it.fieldObject[it.scene].onMousePress(event);
		}, false);

		document.addEventListener("onKeyDown", function (event) {
			if (it.fieldObject[it.scene] == undefined) {
				throw new Error('Fields in scene ' + it.scene + ' are undefined')
			}
			it.fieldObject[it.scene].onKeyDown(event);
		}, false);

		document.addEventListener("onKeyUp", function (event) {
			if (it.fieldObject[it.scene] == undefined) {
				throw new Error('Fields in scene ' + it.scene + ' are undefined')
			}
			it.fieldObject[it.scene].onKeyUp(event);
		}, false);

		document.addEventListener("onKeyPress", function (event) {
			if (it.fieldObject[it.scene] == undefined) {
				throw new Error('Fields in scene ' + it.scene + ' are undefined')
			}
			it.fieldObject[it.scene].onKeyPress(event);
		}, false);
	}
}

class CField {
	constructor(model) {
		this.model = model;
		this.entityList = new Array();
	}

	onEntityUpdate() {
		for (var i = 0; i < this.entityList.length; i++) {
			this.entityDrawingUpdate(i);
			this.entityList[i].onUpdate(i);
		}
	}

	entityDrawingUpdate(i) {
		this.model.entityDrawEvent.entityDrawing = this.entityList[i].getDrawing();
		this.model.entityDrawEvent.entityDrawing = this.entityList[i].
		document.dispatchEvent(this.model.entityDrawEvent);
	}

	onUpdate() {
		this.onEntityUpdate();
	}

	spawnEntity(entity) {
		if (!(entity instanceof CEntity)) {
			throw new Error('The object does not inherit CEntity')
		}
		this.entityList.push(entity);
	}

	onMouseDown(event) {}
	onMouseUp(event) {}
	onMousePress(event) {}
	onKeyPress(event) {}
	onKeyDown(event) {}
	onKeyUp(event) {}
}

class CEntity {
	constructor(gameField, sx, sy, angle, color) {
		this.field = gameField;
		this.x = sx;
		this.y = sy;
		this.a = angle;
		this.c = color;
	}
	onUpdate(index) {}
	getDrawing() {}
	isAnimate() {
		return false;
	}
}

class CControl {
	constructor() {
		this.mouseMoveEvent = document.createEvent("HTMLEvents");
		this.mouseUpEvent = document.createEvent("HTMLEvents");
		this.mouseDownEvent = document.createEvent("HTMLEvents");
		this.mousePressEvent = document.createEvent("HTMLEvents");
		this.keyPressEvent = document.createEvent("HTMLEvents");
		this.keyUpEvent = document.createEvent("HTMLEvents");
		this.keyDownEvent = document.createEvent("HTMLEvents");

		var it = this;
		this.mousePos;
		this.mouseFlag = false;
		this.keyFlag = new Array();

		this.mouseMoveEvent.initEvent("onMouseMove", true, false);
		this.mouseUpEvent.initEvent("onMouseUp", true, false);
		this.mouseDownEvent.initEvent("onMouseDown", true, false);
		this.mousePressEvent.initEvent("onMousePress", true, false);
		this.keyPressEvent.initEvent("onKeyPress", true, false);
		this.keyUpEvent.initEvent("onKeyUp", true, false);
		this.keyDownEvent.initEvent("onKeyDown", true, false);

		document.onmousemove = function (e) {
			it.mouseMoveEvent.mousePos = new C2DPos(e.clientX, e.clientY);
			this.dispatchEvent(it.mouseMoveEvent);
		};

		document.onmousedown = function () {
			it.mouseFlag = true;
			it.mouseDownEvent.mousePos = it.mousePos;
			this.dispatchEvent(it.mouseDownEvent);
		};

		document.onmouseup = function () {
			it.mouseFlag = false;
			it.mouseUpEvent.mousePos = it.mousePos;
			this.dispatchEvent(it.mouseUpEvent);
		};

		document.onkeydown = function (e) {
			it.keyUpEvent.keyCode = e;
			it.keyFlag[e.keyCode] = true;
			this.dispatchEvent(it.keyUpEvent);
		};

		document.onkeyup = function (e) {
			it.keyDownEvent.keyCode = e;
			it.keyFlag[e.keyCode] = false;
			this.dispatchEvent(it.keyDownEvent);
		};

		document.addEventListener("onMouseMove", function (event) {
			it.mousePos = event.mousePos;
		}, false);
	}
	onUpdate() {
		var it = this;
		if (this.mouseFlag) {
			this.mousePressEvent.mousePos = this.mousePos
			document.dispatchEvent(this.mousePressEvent);
		}
		for (var i = 0; i < this.keyFlag.length; i++) {
			if (this.keyFlag[i]) {
				this.keyPressEvent.keyCode = i
				document.dispatchEvent(this.keyPressEvent);
			}
		}
	}
}

class CSushiMath {
	static rad(angle) {
		return angle * (Math.PI / 180);
	}

	static angle(rad) {
		return rad * 180 / Math.PI;
	}
	static distance(x1, y1, x2, y2) {
		return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
	}
	static fac(k) {
		var j = 1;
		for (var i = 1; i <= k; i++) {
			j *= i;
		}
		return j;
	}

	static per(k, i) {
		return fac(k) / fac(k - i);
	}

	static com(k, i) {
		return per(k, i) / fac(i);
	}
}

class C2DPos {
	constructor(x, y) {
		this.posX = x
		this.posY = y
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////