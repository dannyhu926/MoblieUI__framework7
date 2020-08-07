!function(t, n){
	function o(t, n){
		return d.cleanObj.toString.call(t).slice(8, -1) === n
	}

	function e(t, n){
		for(var o, e, r = t.split(":"), s = r.pop().split("/"), c = d; o = s.shift();)"bdbox" !== o && (e = o, s.length && (c = c[o] = c[o] || {}));
		var a = l[t] = {exports:{}}, u = d.isFunction(n) ? n.apply(a, [i, a.exports, a, d]) : n;
		u && (a.exports = u), c[e] = a.exports
	}

	function i(t){
		var n = l[t];
		if(n)return n.exports;
		throw"module "+t+" is undefined"
	}

	function r(){
		m.forEach(function(t){
			t()
		}), m.length = 0, h = !0
	}

	function s(t, n, o){
		if("object" == typeof t){
			var e, i, r = c(t);
			if(o = o || t, "array" === r || "arguments" === r || "nodelist" === r){
				for(e = 0, i = t.length; i > e; e++)if(n.call(o, t[e], e, t) === !1)return
			}
			else for(e in t)if(t.hasOwnProperty(e) && n.call(o, t[e], e, t) === !1)return
		}
	}

	function c(t){
		var n;
		return null == t ? n = String(t) : (n = Object.prototype.toString.call(t).toLowerCase(), n = n.substring(8, n.length-1)), n
	}

	var a = +new Date, u = (a+"").slice(-3), f = navigator.userAgent, d = {
		isBox:/ baiduboxapp\//i.test(f), isIOS:/(iPhone|iPod|iPad)/.test(f), isAndroid:/(Android);?\s+([\d.]+)?/.test(f), getId:function(){
			return u++
		}, emptyArr:[], emptyFn:function(){
		}, cleanObj:{}, byId:function(t){
			return d.isString(t) ? n.getElementById(t) : t
		}, toArray:function(t){
			return d.emptyArr.slice.call(t)
		}, $:function(t, o){
			return o = o && 1 === o.nodeType ? o : n, d.toArray(o.querySelectorAll(t))
		}
	};
	"Function,String,Array,Number,RegExp".replace(/[^, ]+/g, function(t){
		d["is"+t] = function(n){
			return o(n, t)
		}
	}), d.isBoolean = function(t){
		return t === !0 || t === !1
	}, d.isObject = function(t){
		return "object" == typeof t
	}, d.isUndefined = function(t){
		return void 0 === t
	}, d.isWindow = function(t){
		return null != t && t == t.window
	}, d.isPlainObject = function(t){
		return d.isObject(t) && !d.isWindow(t) && Object.getPrototypeOf(t) == Object.prototype
	};
	var l = {};
	d.define = e;
	var p = function(t, n, o){
		for(var e, i, r = t.split("."), s = o || p; e = r.shift();)"Box" !== e && (i = e, r.length && (s = s[e] = s[e] || {}));
		return s[i] = n || {}, s[i]
	}, m = [], h = !1;
	if(p.init = function(t){
			return "function" != typeof t ? this : (h ? t() : m.push(t), this)
		}, "complete,loaded,interactive".indexOf(n.readyState) > -1 && n.body ? r() : n.addEventListener("DOMContentLoaded", r, !1), e("common:bdbox/utils/getVersion", function(n, o, e){
			var i = function(){
				var n = 0;
				if(t.baiduboxapp_version)n = t.baiduboxapp_version;
				else{
					var o, e = navigator.userAgent;
					(o = /([\d+.]+)_(?:diordna|enohpi)_/.exec(e)) ? (o = o[1].split("."), n = o.reverse().join(".")) : (o = /baiduboxapp\/([\d+.]+)/.exec(e)) && (n = o[1])
				}
				return i = function(){
					return n
				}, n
			};
			e.exports = i
		}), e("common:bdbox/utils/version_compare", function(t, n, o){
			var e = function(t, n){
				n += "", t += "";
				for(var o = t.split("."), e = n.split("."), i = 0, r = Math.max(o.length, e.length); r > i; i++){
					if(o[i] && !e[i] && parseInt(o[i]) > 0 || parseInt(o[i]) > parseInt(e[i]))return 1;
					if(e[i] && !o[i] && parseInt(e[i]) > 0 || parseInt(o[i]) < parseInt(e[i]))return -1
				}
				return 0
			};
			o.exports = e
		}), e("common:bdbox/utils/jsonToQuery", function(t, n, o, e){
			o.exports = function(t){
				if(e.isString(t))return t;
				var n = [];
				for(var o in t)n.push(o+"="+t[o]);
				return n.join("&")
			}
		}), e("common:bdbox/io/loadJS", function(o, e, i, r){
			function s(o, e, i){
				var s, u, f, d = n.createElement("script");
				r.isString(o) ? (s = o, r.isFunction(e) && (i = e, e = null)) : (s = o.url, e = o.data, i = o.success, u = o.error || r.emptyFn, f = o.timeout), r.isObject(e) && (e = a(e)), e && (s += (-1 === s.indexOf("?") ? "?" : "&")+e), s = s.replace(/[&?]{1,2}/, "?");
				var l;
				/=\?/.test(s) && (l = "_box_jsonp"+r.getId(), s = s.replace(/=\?/, "="+l));
				var p = c();
				f = f || 2e4, d.type = "text/javascript", d.src = s;
				var m, h = !0, v = function(){
					l && delete t[l], m && clearTimeout(m), d.onload = d.onreadystatechange = d.onerror = null, d = null
				}, b = function(){
					!d || d.readyState && !/loaded|complete/.test(d.readyState) || (v(), h && r.isFunction(i) && i.apply(null, r.toArray(arguments)), h = !1)
				}, g = function(t){
					v(), h && u(t), h = !1
				};
				l && (t[l] = b), m = setTimeout(function(){
					v(), h && u("timeout"), h = !1
				}, f), d.onload = d.onreadystatechange = d.onerror = b, d.onerror = g, p.appendChild(d)
			}

			function c(){
				return n.head || n.getElementsByTagName("head")[0] || n.documentElement
			}

			var a = o("common:bdbox/utils/jsonToQuery");
			r.emptyFn, i.exports = s
		}), e("common:bdbox/utils/queryToJson", function(t, n, o){
			o.exports = function(t){
				try{
					t = t ? decodeURIComponent(t) : ""
				}catch(n){
					t = ""
				}
				var o = t.split("?"), e = o[1] ? o[1] : o[0], i = e.split("&"), r = {};
				return i.forEach(function(t){
					t = t.split("="), t[0].length > 0 && (r[t[0]] = t[1] || "")
				}), r
			}
		}), e("common:bdbox/extend", function(t, n, o, e){
			function i(t, n, o){
				for(var e in n)o && (r(n[e]) || s(n[e])) ? (r(n[e]) && !r(t[e]) && (t[e] = {}), s(n[e]) && !s(t[e]) && (t[e] = []), i(t[e], n[e], o)) : a(n[e]) || (t[e] = n[e])
			}

			var r = e.isPlainObject, s = e.isArray, c = e.isBoolean, a = e.isUndefined;
			o.exports = function(t){
				var n, o = e.emptyArr.slice.call(arguments, 1);
				return c(t) && (n = t, t = o.shift()), o.forEach(function(o){
					i(t, o, n)
				}), t
			}
		}), e("common:bdbox/schema", function(t, o, e){
			function i(t, o){
				if(t){
					var e = Date.now(), i = n.createElement("IFRAME");
					i.src = t, i.style.position = "absolute", i.style.left = "-2000px", i.style.top = "-1000px", i.style.width = "1px", i.style.height = "1px", i.style.webkitTransition = "all 1s", i.style.transition = "all 1s", n.body.appendChild(i), setTimeout(function(){
						var t = function(){
							n.body.removeChild(i), o(Date.now()-e < 1500 ? !0 : !1)
						};
						i.addEventListener("webkitTransitionEnd", t, !1), i.addEventListener("transitionEnd", t, !1), i.style.left = "-1000px"
					}, 0)
				}
			}

			e.exports = i
		}), e("common:bdbox/monitor", function(n, o, e, i){
			var r = encodeURIComponent, s = function(t, n){
				t += t.indexOf("?") < 0 ? "?" : "&", this.url = t, this.options = n
			};
			s.prototype.report = function(n){
				n = n || "";
				var o = new Image(1, 1), e = [];
				if(i.isObject(n)){
					for(var s in n)e.push(s+"="+r(String(n[s])));
					n = e.join("&")
				}
				var c = "_box_mt"+i.getId();
				t[c] = o, o.onload = o.onerror = o.onabort = function(){
					o.onload = o.onerror = o.onabort = null, t[c] = o = null
				};
				var a = this.url+n;
				return i.isFunction(this.options.customHandler) && (a = this.options.customHandler(a)), o.src = a+"&_rnd="+Math.floor(2147483648*Math.random()), this
			}, s.prototype.main = function(t, n){
				return t && i.isFunction(this[t]) && this[t].apply(this, i.toArray(n || [])), this
			}, e.exports = function(t, n){
				return new s(t, n)
			}
		}), e("common:bdbox/monitor/pblog", function(t, n, o, e){
			var i = t("common:bdbox/monitor"), r = t("common:bdbox/extend"), s = t("common:bdbox/utils/queryToJson"), c = t("common:bdbox/utils/getVersion"), a = s(location.search), u = navigator.userAgent, f = "//m.baidu.com/tcbox", d = {
				service:"bdbox",
				action:"pblog",
				ctv:2,
				cen:"uid_ua_ut",
				data:{
					appid:"1",
					dataid:"2",
					actiontype:"1",
					actionid:"2",
					actiondata:{
						ref:a.ref || "",
						gmv:a.vmgdb || "",
						source:a.from || a.ref || "",
						boxVersion:c(),
						boxPlatform:u.match(/(iPad|iPhone|iPod)/gim) ? "ios" : "android"
					}
				}
			}, l = encodeURIComponent;
			a.uid && a.osname && ["osname", "ua", "ut", "from", "cfrom", "uid", "pkgname"].forEach(function(t){
				a[t] && (d[t] = a[t])
			});
			var p = i(f, {
				customHandler:function(t){
					var n = [];
					for(var o in d)if(d.hasOwnProperty(o)){
						var i = d[o];
						e.isObject(i) && (i = JSON.stringify(i)), n.push(o+"="+l(i))
					}
					return n.length && (t += n.join("&")), t
				}
			});
			p.init = function(t, n){
				e.isPlainObject(n) && (d = r(d, n)), d.data.cateid = t
			}, p.pv = function(t, n){
				var o = d.data;
				o.actionid = "1";
				var e = {};
				return e.url = t || location.href, n && (e.u = n), o.actiondata = r(o.actiondata, e), p.report()
			}, p.event = function(t, n, o){
				if(!t)throw"monitor.tc.event need a evtName";
				var e = {evtName:t, evtType:n || "", evtTag:o || ""}, i = d.data;
				return i.actionid = "2", i.actiondata = r(i.actiondata, e), p.report()
			}, o.exports = function(){
				p.main.apply(p, arguments)
			}
		}), e("common:bdbox/moplus", function(t, n, o, e){
			var i = t("common:bdbox/utils/jsonToQuery"), r = t("common:bdbox/io/loadJS"), s = t("common:bdbox/utils/version_compare"), c = t("common:bdbox/monitor/pblog"), a = t("common:bdbox/schema"), u = "com.baidu.searchbox", f = "http://127.0.0.1:6259/", d = "http://127.0.0.1:40310/", l = "inapp_boxserver", p = "https:" === location.protocol, m = 500, h = null, v = "__moplus_host__", b = {
				isSendPv:!1, isHit:!1, check:function(){
					return Date.now()%100 === 1
				}, parseUA:function(){
					var t, n, o = navigator.userAgent, e = {
						uc:/UCBrowser\/(\S*) \S*/g,
						bd:/baidubrowser\/(\S*) \(Baidu/g,
						qq:/MQQBrowser\/(\S*) Mobile/g,
						chr:/Chrome\/(\S*) Mobile/g,
						qh:/360 Aphone Browser \((\S*)\)/g,
						sg:/SogouMobileBrowser\/(\S*)/g,
						mi:/MiuiBrowser\/(\S*)/g
					};
					for(var i in e){
						var r = e[i].exec(o);
						if(r){
							t = i, n = r[1];
							break
						}
					}
					return t = t ? t : "other", n = n ? n : "0", {t:t, v:n}
				}, parseHost:function(){
					return g.curHost === d ? 1 : 0
				}, sendEvt:function(t, n, o, e){
					if(this.isHit){
						var i = this.parseUA(), r = i.t, s = i.v, a = !p, u = this.parseHost();
						c("event", [t, n || "", {brName:r, brVer:s, isHttp:a, isNew:u, source:o || "", intent:e || ""}])
					}
				}, init:function(){
					this.isHit = this.check(), c("init", [2])
				}
			}, g = function(t, n, o){
				this.version = "2.0", this.isHttps = p, this.curHost = o || "", this.newHost = d, this.oldHost = this.isHttps ? d : f, this.MCMDF = n || l, this._infoFuncs = [], this._verFuncs = [], this.minVersion = t ? t : 0, this.pkgName = u, b.init()
			};
			g.prototype = {
				constructor:g, setMcmdf:function(t){
					return this.MCMDF = t, this
				}, setHost:function(t){
					return this.curHost = t, this.setStorage(v, t), this
				}, getHost:function(){
					return this.isHttps ? (this.curHost = this.newHost, this.newHost) : this.getStorage(v) ? (this.curHost = this.getStorage(v), this.curHost) : void 0
				}, setStorage:function(t, n){
					try{
						sessionStorage.setItem(t, n)
					}catch(o){
					}
				}, getStorage:function(t){
					var n;
					try{
						n = sessionStorage.getItem(t)
					}catch(o){
					}
					return n
				}, api:function(t, n, o, r){
					if(!t)throw"Moplus.api need an action";
					e.isFunction(n) && (r = o, o = n, n = {});
					var s = t+(~t.indexOf("?") ? "&" : "?")+i(n);
					return ~s.indexOf("mcmdf") || (s += "&mcmdf="+this.MCMDF), b.sendEvt("api", "send:"+t, this.MCMDF, s), this.request(s, function(n){
						b.sendEvt("api", (e.isPlainObject(n) && 0 == n.error ? "success:" : "fail:")+t, this.MCMDF, s), o(n)
					}, r)
				}, getInfo:function(t, n){
					if(h)return t(h);
					if(this._infoFuncs.push(t), !(this._infoFuncs.length > 1)){
						var o = this, i = function(t, n){
							!n && e.isPlainObject(t) && (h = t);
							var i;
							for(n && (t = {error:33}); i = o._infoFuncs.shift();)i(t)
						}, s = "getsearchboxinfo?mcmdf="+this.MCMDF;
						if(this.getHost()){
							var c = {
								url:this.curHost+s+"&callback=?", success:i, error:function(){
									i(null, !0)
								}, timeout:n
							};
							r(c)
						}
						else this.request(s, function(t){
							return 33 === t.error ? i(null, !0) : void i(t)
						}, n);
						return this
					}
				}, getHVersion:function(t, n){
					this._verFuncs.push(t);
					var o = this;
					if(!(this._verFuncs.length > 1)){
						var e = function(t){
							var n;
							for(t = o.parseInfo(t); n = o._verFuncs.shift();)n(t)
						};
						return this.getInfo(e, n), this
					}
				}, parseInfo:function(t, n){
					t = t || h, n = n || this.minVersion;
					var o = t.package_infos;
					if(!o || 0 === o.length)return !1;
					var e = u, i = {offic:{name:u, version:0}, oem:{version:0}};
					return o.forEach(function(t){
						var o = t.version_name, r = t.package_name;
						s(o, n) >= 0 && (r === e ? 1 === s(o, i.offic.version) && (i.offic = {
							version:o,
							name:u
						}) : 1 === s(o, i.oem.version) && (i.oem = {version:o, name:r}))
					}), 0 === i.oem.version && 0 === i.offic.version ? !1 : 0 !== i.offic.version ? i.offic : 0 !== i.oem.version ? i.oem : void 0
				}, schema:function(t, n){
					if(!t.intent)throw"schema intent is empty";
					t.mcmdf || (t.mcmdf = this.MCMDF);
					var o = function(){
						b.sendEvt("schema", "fail", t.source, t.intent), e.isFunction(n) && n({error:20, from:"schema"})
					}, i = "";
					i = "baiduboxapp://utils?action=sendIntent&params="+encodeURIComponent(JSON.stringify(t))+"&minver="+(t.minver ? t.minver : this.minVersion), a(i, function(t){
						t ? o() : success()
					})
				}, sendIntent:function(t, n, o){
					var i = {};
					if(t && e.isString(t)){
						var r, s = this;
						return e.isPlainObject(o) && (i = o, r = o.source || "", o.needlog ? b.isHit = o.needlog : i.needlog = b.isHit ? 1 : 0, o = o.timeout), i.intent = t, b.sendEvt("sendintent", "send", r, t), this.api("sendintent", {intent:encodeURIComponent(t)}, function(o){
							!o || o && 33 === o.error || !e.isPlainObject(o) ? (b.sendEvt("sendintent", "fail", r, t), s.schema(i, n)) : (b.sendEvt("sendintent", "success", r, t), n(o))
						}, o)
					}
					return this
				}, request:function(t, n, o){
					var i, s, c = this, a = {timeout:o};
					e.isFunction(n) && !~t.indexOf("callback=") && (t += "&callback=?");
					var u = function(t){
						i = "success", e.isFunction(n) && n(t)
					}, f = function(){
						e.isFunction(n) && n({error:33})
					};
					if(c.getHost())a.url = c.curHost+t, a.success = u, a.error = f, r(a);
					else
						if(a.url = c.newHost+t, a.success = function(t){
								"success" !== i && (s && clearTimeout(s), c.setHost(c.newHost), u(t))
							}, a.error = function(){
								c.isHttps ? (i = "error", f()) : "error" === i && f(), i = "error"
							}, r(a), !c.isHttps){
							var d = {timeout:o, url:c.oldHost+t, error:a.error};
							d.success = function(t){
								"success" !== i && ("error" === i ? (c.setHost(c.oldHost), u(t)) : s = setTimeout(function(){
									c.setHost(c.oldHost), u(t)
								}, m))
							}, r(d)
						}
					return this
				}
			}, o.exports = function(t, n){
				return new g(t, n)
			}, o.exports.Moplus = g
		}), d.version = d.utils.getVersion(), d.version_compare = d.utils.version_compare, d.each = s, d.type = c, d.canI = function(t, n, o){
			return d.version_compare(d.version, t) >= 0 ? d.isFunction(n) && n() : d.isFunction(o) && o(), d
		}, s(d, function(t, n){
			p[n] = t
		}), t.Box && t.Box.$)for(var v in p)t.Box[v] = t.Box[v] || p[v];
	else t.Box = p
}(window, document);