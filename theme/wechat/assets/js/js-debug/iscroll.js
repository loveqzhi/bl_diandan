! function() {
	var a = Math,
		b = function(a) {
			return a >> 0
		},
		c = /webkit/i.test(navigator.appVersion) ? "webkit" : /firefox/i.test(navigator.userAgent) ? "Moz" : "opera" in window ? "O" : "",
		d = (/android/gi.test(navigator.appVersion), /iphone|ipad/gi.test(navigator.appVersion)),
		e = /playbook/gi.test(navigator.appVersion),
		f = /hp-tablet/gi.test(navigator.appVersion),
		g = "WebKitCSSMatrix" in window && "m11" in new WebKitCSSMatrix,
		h = "ontouchstart" in window && !f,
		i = c + "Transform" in document.documentElement.style,
		j = d || e,
		k = function() {
			return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
				return setTimeout(a, 17)
			}
		}(),
		l = function() {
			return window.cancelRequestAnimationFrame || window.webkitCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || clearTimeout
		}(),
		m = "onorientationchange" in window ? "orientationchange" : "resize",
		n = h ? "touchstart" : "mousedown",
		o = h ? "touchmove" : "mousemove",
		p = h ? "touchend" : "mouseup",
		q = h ? "touchcancel" : "mouseup",
		r = "translate" + (g ? "3d(" : "("),
		s = g ? ",0)" : ")",
		t = function(a, b) {
			var d, e = this,
				f = document;
			e.wrapper = "object" == typeof a ? a : f.getElementById(a), e.wrapper.style.overflow = "hidden", e.scroller = e.wrapper.children[0], e.options = {
				hScroll: !0,
				vScroll: !0,
				x: 0,
				y: 0,
				bounce: !0,
				bounceLock: !1,
				momentum: !0,
				lockDirection: !0,
				useTransform: !0,
				useTransition: !1,
				onRefresh: null,
				onBeforeScrollStart: function(a) {
					a.preventDefault()
				},
				onScrollStart: null,
				onBeforeScrollMove: null,
				onScrollMove: null,
				onBeforeScrollEnd: null,
				onScrollEnd: null,
				onTouchEnd: null,
				onDestroy: null
			};
			for (d in b) e.options[d] = b[d];
			e.x = e.options.x, e.y = e.options.y, e.options.useTransform = i ? e.options.useTransform : !1, e.options.hScrollbar = e.options.hScroll && e.options.hScrollbar, e.options.vScrollbar = e.options.vScroll && e.options.vScrollbar, e.options.useTransition = j && e.options.useTransition, e.scroller.style[c + "TransitionProperty"] = e.options.useTransform ? "-" + c.toLowerCase() + "-transform" : "top left", e.scroller.style[c + "TransitionDuration"] = "0", e.scroller.style[c + "TransformOrigin"] = "0 0", e.options.useTransition && (e.scroller.style[c + "TransitionTimingFunction"] = "cubic-bezier(0.33,0.66,0.66,1)"), e.options.useTransform ? e.scroller.style[c + "Transform"] = r + e.x + "px," + e.y + "px" + s : e.scroller.style.cssText += ";position:absolute;top:" + e.y + "px;left:" + e.x + "px", e.refresh(), e._bind(m, window), e._bind(n), h || e._bind("mouseout", e.wrapper)
		};
	t.prototype = {
		enabled: !0,
		x: 0,
		y: 0,
		steps: [],
		scale: 1,
		handleEvent: function(a) {
			var b = this;
			switch (a.type) {
				case n:
					if (!h && 0 !== a.button) return;
					b._start(a);
					break;
				case o:
					b._move(a);
					break;
				case p:
				case q:
					b._end(a);
					break;
				case m:
					b._resize();
					break;
				case "mouseout":
					b._mouseout(a);
					break;
				case "webkitTransitionEnd":
					b._transitionEnd(a)
			}
		},
		_resize: function() {
			this.refresh()
		},
		_pos: function(a, d) {
			a = this.hScroll ? a : 0, d = this.vScroll ? d : 0, this.options.useTransform ? this.scroller.style[c + "Transform"] = r + a + "px," + d + "px" + s + " scale(" + this.scale + ")" : (a = b(a), d = b(d), this.scroller.style.left = a + "px", this.scroller.style.top = d + "px"), this.x = a, this.y = d
		},
		_start: function(a) {
			var b, d, e, f = this,
				g = h ? a.touches[0] : a;
			f.enabled && (f.options.onBeforeScrollStart && f.options.onBeforeScrollStart.call(f, a), f.options.useTransition && f._transitionTime(0), f.moved = !1, f.animating = !1, f.zoomed = !1, f.distX = 0, f.distY = 0, f.absDistX = 0, f.absDistY = 0, f.dirX = 0, f.dirY = 0, f.options.momentum && (f.options.useTransform ? (b = getComputedStyle(f.scroller, null)[c + "Transform"].replace(/[^0-9-.,]/g, "").split(","), d = 1 * b[4], e = 1 * b[5]) : (d = 1 * getComputedStyle(f.scroller, null).left.replace(/[^0-9-]/g, ""), e = 1 * getComputedStyle(f.scroller, null).top.replace(/[^0-9-]/g, "")), (d != f.x || e != f.y) && (f.options.useTransition ? f._unbind("webkitTransitionEnd") : l(f.aniTime), f.steps = [], f._pos(d, e))), f.startX = f.x, f.startY = f.y, f.pointX = g.pageX, f.pointY = g.pageY, f.startTime = a.timeStamp || Date.now(), f.options.onScrollStart && f.options.onScrollStart.call(f, a), f._bind(o), f._bind(p), f._bind(q))
		},
		_move: function(b) {
			var c = this,
				d = h ? b.touches[0] : b,
				e = d.pageX - c.pointX,
				f = d.pageY - c.pointY,
				g = c.x + e,
				i = c.y + f,
				j = b.timeStamp || Date.now();
			c.options.onBeforeScrollMove && c.options.onBeforeScrollMove.call(c, b), c.pointX = d.pageX, c.pointY = d.pageY, (g > 0 || g < c.maxScrollX) && (g = c.options.bounce ? c.x + e / 2 : g >= 0 || c.maxScrollX >= 0 ? 0 : c.maxScrollX), (i > 0 || i < c.maxScrollY) && (i = c.options.bounce ? c.y + f / 2 : i >= 0 || c.maxScrollY >= 0 ? 0 : c.maxScrollY), c.distX += e, c.distY += f, c.absDistX = a.abs(c.distX), c.absDistY = a.abs(c.distY), c.absDistX < 6 && c.absDistY < 6 || (c.options.lockDirection && (c.absDistX > c.absDistY + 5 ? (i = c.y, f = 0) : c.absDistY > c.absDistX + 5 && (g = c.x, e = 0)), c.moved = !0, c._pos(g, i), c.dirX = e > 0 ? -1 : 0 > e ? 1 : 0, c.dirY = f > 0 ? -1 : 0 > f ? 1 : 0, j - c.startTime > 300 && (c.startTime = j, c.startX = c.x, c.startY = c.y), c.options.onScrollMove && c.options.onScrollMove.call(c, b))
		},
		_end: function(c) {
			if (!h || 0 == c.touches.length) {
				var d, e, f, g = this,
					i = h ? c.changedTouches[0] : c,
					j = {
						dist: 0,
						time: 0
					},
					k = {
						dist: 0,
						time: 0
					},
					l = (c.timeStamp || Date.now()) - g.startTime,
					m = g.x,
					n = g.y;
				if (g._unbind(o), g._unbind(p), g._unbind(q), g.options.onBeforeScrollEnd && g.options.onBeforeScrollEnd.call(g, c), !g.moved) {
					if (h) {
						for (d = i.target; 1 != d.nodeType;) d = d.parentNode;
						"SELECT" != d.tagName && "INPUT" != d.tagName && "TEXTAREA" != d.tagName && (e = document.createEvent("MouseEvents"), e.initMouseEvent("click", !0, !0, c.view, 1, i.screenX, i.screenY, i.clientX, i.clientY, c.ctrlKey, c.altKey, c.shiftKey, c.metaKey, 0, null), e._fake = !0, d.dispatchEvent(e))
					}
					return g._resetPos(200), g.options.onTouchEnd && g.options.onTouchEnd.call(g, c), void 0
				}
				if (300 > l && g.options.momentum && (j = m ? g._momentum(m - g.startX, l, -g.x, g.scrollerW - g.wrapperW + g.x, g.options.bounce ? g.wrapperW : 0) : j, k = n ? g._momentum(n - g.startY, l, -g.y, g.maxScrollY < 0 ? g.scrollerH - g.wrapperH + g.y : 0, g.options.bounce ? g.wrapperH : 0) : k, m = g.x + j.dist, n = g.y + k.dist, (g.x > 0 && m > 0 || g.x < g.maxScrollX && m < g.maxScrollX) && (j = {
						dist: 0,
						time: 0
					}), (g.y > 0 && n > 0 || g.y < g.maxScrollY && n < g.maxScrollY) && (k = {
						dist: 0,
						time: 0
					})), j.dist || k.dist) return f = a.max(a.max(j.time, k.time), 10), g.scrollTo(b(m), b(n), f), g.options.onTouchEnd && g.options.onTouchEnd.call(g, c), void 0;
				g._resetPos(200), g.options.onTouchEnd && g.options.onTouchEnd.call(g, c)
			}
		},
		_resetPos: function(a) {
			var b = this,
				c = b.x >= 0 ? 0 : b.x < b.maxScrollX ? b.maxScrollX : b.x,
				d = b.y >= 0 || b.maxScrollY > 0 ? 0 : b.y < b.maxScrollY ? b.maxScrollY : b.y;
			return c == b.x && d == b.y ? (b.moved && (b.options.onScrollEnd && b.options.onScrollEnd.call(b), b.moved = !1), void 0) : (b.scrollTo(c, d, a || 0), void 0)
		},
		_mouseout: function(a) {
			var b = a.relatedTarget;
			if (!b) return this._end(a), void 0;
			for (; b = b.parentNode;)
				if (b == this.wrapper) return;
			this._end(a)
		},
		_transitionEnd: function(a) {
			var b = this;
			a.target == b.scroller && (b._unbind("webkitTransitionEnd"), b._startAni())
		},
		_startAni: function() {
			var b, c, d, e = this,
				f = e.x,
				g = e.y,
				h = Date.now();
			if (!e.animating) {
				if (!e.steps.length) return e._resetPos(400), void 0;
				if (b = e.steps.shift(), b.x == f && b.y == g && (b.time = 0), e.animating = !0, e.moved = !0, e.options.useTransition) return e._transitionTime(b.time), e._pos(b.x, b.y), e.animating = !1, b.time ? e._bind("webkitTransitionEnd") : e._resetPos(0), void 0;
				d = function() {
					var i, j, l = Date.now();
					return l >= h + b.time ? (e._pos(b.x, b.y), e.animating = !1, e.options.onAnimationEnd && e.options.onAnimationEnd.call(e), e._startAni(), void 0) : (l = (l - h) / b.time - 1, c = a.sqrt(1 - l * l), i = (b.x - f) * c + f, j = (b.y - g) * c + g, e._pos(i, j), e.animating && (e.aniTime = k(d)), void 0)
				}, d()
			}
		},
		_transitionTime: function(a) {
			this.scroller.style[c + "TransitionDuration"] = a + "ms"
		},
		_momentum: function(c, d, e, f, g) {
			var h = 6e-4,
				i = a.abs(c) / d,
				j = i * i / (2 * h),
				k = 0,
				l = 0;
			return c > 0 && j > e ? (l = g / (6 / (j / i * h)), e += l, i = i * e / j, j = e) : 0 > c && j > f && (l = g / (6 / (j / i * h)), f += l, i = i * f / j, j = f), j *= 0 > c ? -1 : 1, k = i / h, {
				dist: j,
				time: b(k)
			}
		},
		_offset: function(a) {
			for (var b = -a.offsetLeft, c = -a.offsetTop; a = a.offsetParent;) b -= a.offsetLeft, c -= a.offsetTop;
			return {
				left: b,
				top: c
			}
		},
		_bind: function(a, b, c) {
			(b || this.scroller).addEventListener(a, this, !!c)
		},
		_unbind: function(a, b, c) {
			(b || this.scroller).removeEventListener(a, this, !!c)
		},
		destroy: function() {
			var a = this;
			a.scroller.style[c + "Transform"] = "", a._unbind(m, window), a._unbind(n), a._unbind(o), a._unbind(p), a._unbind(q), a._unbind("mouseout", a.wrapper), a.options.useTransition && a._unbind("webkitTransitionEnd"), a.options.onDestroy && a.options.onDestroy.call(a)
		},
		refresh: function() {
			var a, b = this;
			b.wrapperW = b.wrapper.clientWidth, b.wrapperH = b.wrapper.clientHeight, b.scrollerW = b.scroller.offsetWidth, b.scrollerH = b.scroller.offsetHeight, b.maxScrollX = b.wrapperW - b.scrollerW, b.maxScrollY = b.wrapperH - b.scrollerH, b.dirX = 0, b.dirY = 0, b.hScroll = b.options.hScroll && b.maxScrollX < 0, b.vScroll = b.options.vScroll && (!b.options.bounceLock && !b.hScroll || b.scrollerH > b.wrapperH), a = b._offset(b.wrapper), b.wrapperOffsetLeft = -a.left, b.wrapperOffsetTop = -a.top, b.scroller.style[c + "TransitionDuration"] = "0", b._resetPos(200)
		},
		scrollTo: function(a, b, c, d) {
			var e, f, g = this,
				h = a;
			for (g.stop(), h.length || (h = [{
					x: a,
					y: b,
					time: c,
					relative: d
				}]), e = 0, f = h.length; f > e; e++) h[e].relative && (h[e].x = g.x - h[e].x, h[e].y = g.y - h[e].y), g.steps.push({
				x: h[e].x,
				y: h[e].y,
				time: h[e].time || 0
			});
			g._startAni()
		},
		scrollToElement: function(b, c) {
			var d, e = this;
			b = b.nodeType ? b : e.scroller.querySelector(b), b && (d = e._offset(b), d.left += e.wrapperOffsetLeft, d.top += e.wrapperOffsetTop, d.left = d.left > 0 ? 0 : d.left < e.maxScrollX ? e.maxScrollX : d.left, d.top = d.top > 0 ? 0 : d.top < e.maxScrollY ? e.maxScrollY : d.top, c = void 0 === c ? a.max(2 * a.abs(d.left), 2 * a.abs(d.top)) : c, e.scrollTo(d.left, d.top, c))
		},
		disable: function() {
			this.stop(), this._resetPos(0), this.enabled = !1, this._unbind(o), this._unbind(p), this._unbind(q)
		},
		enable: function() {
			this.enabled = !0
		},
		stop: function() {
			l(this.aniTime), this.steps = [], this.moved = !1, this.animating = !1
		}
	}, "function" == typeof define && define.amd ? define(function() {
		return t
	}) : window.iScroll = t
}(); 