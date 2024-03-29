//  ====================================================================================
//  Metro Notifications v7
//  Author: Klerith
//  Source Page: http://codecanyon.net/item/metro-notifications/3903495
//  Support Page: http://codecanyon.net/user/klerith
// 
//  Thank you for supporting my code. 
//  Remember, on production servers, I recommend you to use MetroNotifications.min.js
//  Because is smaller thatn this file.
//  ====================================================================================

(function($) {

    // Tweenlite
    (window._gsQueue || (window._gsQueue = [])).push(function() {
        _gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(a) {
            "use strict";
            var d, e, f, g, c = function() { a.call(this, "css"), this._overwriteProps.length = 0 },
                h = {},
                i = c.prototype = new a("css");
            i.constructor = c, c.version = "1.8.0", c.API = 2, c.defaultTransformPerspective = 0, i = "px", c.suffixMap = { top: i, right: i, bottom: i, left: i, width: i, height: i, fontSize: i, padding: i, margin: i, perspective: i };
            var G, H, I, J, K, L, j = /(?:\d|\-\d|\.\d|\-\.\d)+/g,
                k = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
                l = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
                m = /[^\d\-\.]/g,
                n = /(?:\d|\-|\+|=|#|\.)*/g,
                o = /opacity *= *([^)]*)/,
                p = /opacity:([^;]*)/,
                q = /alpha\(opacity *=.+?\)/i,
                r = /([A-Z])/g,
                s = /-([a-z])/gi,
                t = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
                u = function(a, b) { return b.toUpperCase() },
                v = /(?:Left|Right|Width)/i,
                w = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
                x = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
                y = Math.PI / 180,
                z = 180 / Math.PI,
                A = {},
                B = document,
                C = B.createElement("div"),
                D = B.createElement("img"),
                E = c._internals = { _specialProps: h },
                F = navigator.userAgent,
                M = function() {
                    var c, a = F.indexOf("Android"),
                        b = B.createElement("div");
                    return I = -1 !== F.indexOf("Safari") && -1 === F.indexOf("Chrome") && (-1 === a || Number(F.substr(a + 8, 1)) > 3), K = I && 6 > Number(F.substr(F.indexOf("Version/") + 8, 1)), J = -1 !== F.indexOf("Firefox"), /MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(F), L = parseFloat(RegExp.$1), b.innerHTML = "<a style='top:1px;opacity:.55;'>a</a>", c = b.getElementsByTagName("a")[0], c ? /^0.55/.test(c.style.opacity) : !1
                }(),
                N = function(a) { return o.test("string" == typeof a ? a : (a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1 },
                O = function(a) { window.console && console.log(a) },
                P = "",
                Q = "",
                R = function(a, b) { b = b || C; var d, e, c = b.style; if (void 0 !== c[a]) return a; for (a = a.charAt(0).toUpperCase() + a.substr(1), d = ["O", "Moz", "ms", "Ms", "Webkit"], e = 5; --e > -1 && void 0 === c[d[e] + a];); return e >= 0 ? (Q = 3 === e ? "ms" : d[e], P = "-" + Q.toLowerCase() + "-", Q + a) : null },
                S = B.defaultView ? B.defaultView.getComputedStyle : function() {},
                T = c.getStyle = function(a, b, c, d, e) { var f; return M || "opacity" !== b ? (!d && a.style[b] ? f = a.style[b] : (c = c || S(a, null)) ? (a = c.getPropertyValue(b.replace(r, "-$1").toLowerCase()), f = a || c.length ? a : c[b]) : a.currentStyle && (c = a.currentStyle, f = c[b]), null == e || f && "none" !== f && "auto" !== f && "auto auto" !== f ? f : e) : N(a) },
                U = function(a, b, c) {
                    var f, g, d = {},
                        e = a._gsOverwrittenClassNamePT;
                    if (e && !c) {
                        for (; e;) e.setRatio(0), e = e._next;
                        a._gsOverwrittenClassNamePT = null
                    }
                    if (b = b || S(a, null))
                        if (f = b.length)
                            for (; --f > -1;) d[b[f].replace(s, u)] = b.getPropertyValue(b[f]);
                        else
                            for (f in b) d[f] = b[f];
                    else if (b = a.currentStyle || a.style)
                        for (f in b) d[f.replace(s, u)] = b[f];
                    return M || (d.opacity = N(a)), g = wb(a, b, !1), d.rotation = g.rotation * z, d.skewX = g.skewX * z, d.scaleX = g.scaleX, d.scaleY = g.scaleY, d.x = g.x, d.y = g.y, vb && (d.z = g.z, d.rotationX = g.rotationX * z, d.rotationY = g.rotationY * z, d.scaleZ = g.scaleZ), d.filters && delete d.filters, d
                },
                V = function(a, b, c, d) {
                    var g, h, i, e = {},
                        f = a.style;
                    for (h in c) "cssText" !== h && "length" !== h && isNaN(h) && b[h] !== (g = c[h]) && -1 === h.indexOf("Origin") && ("number" == typeof g || "string" == typeof g) && (e[h] = "" !== g && "auto" !== g && "none" !== g || "string" != typeof b[h] || "" === b[h].replace(m, "") ? g : 0, void 0 !== f[h] && (i = new jb(f, h, f[h], i)));
                    if (d)
                        for (h in d) "className" !== h && (e[h] = d[h]);
                    return { difs: e, firstMPT: i }
                },
                W = { width: ["Left", "Right"], height: ["Top", "Bottom"] },
                X = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
                Y = function(a, b, c) {
                    var d = parseFloat("width" === b ? a.offsetWidth : a.offsetHeight),
                        e = W[b],
                        f = e.length;
                    for (c = c || S(a, null); --f > -1;) d -= parseFloat(T(a, "padding" + e[f], c, !0)) || 0, d -= parseFloat(T(a, "border" + e[f] + "Width", c, !0)) || 0;
                    return d
                },
                Z = function(a, b, c, d, e) {
                    if ("px" === d || !d) return c;
                    if ("auto" === d || !c) return 0;
                    var j, f = v.test(b),
                        g = a,
                        h = C.style,
                        i = 0 > c;
                    return i && (c = -c), "%" === d && -1 !== b.indexOf("border") ? j = c / 100 * (f ? a.clientWidth : a.clientHeight) : (h.cssText = "border-style:solid; border-width:0; position:absolute; line-height:0;", "%" !== d && "em" !== d && g.appendChild ? h[f ? "borderLeftWidth" : "borderTopWidth"] = c + d : (g = a.parentNode || B.body, h[f ? "width" : "height"] = c + d), g.appendChild(C), j = parseFloat(C[f ? "offsetWidth" : "offsetHeight"]), g.removeChild(C), 0 !== j || e || (j = Z(a, b, c, d, !0))), i ? -j : j
                },
                $ = function(a, b) {
                    (null == a || "" === a || "auto" === a || "auto auto" === a) && (a = "0 0");
                    var c = a.split(" "),
                        d = -1 !== a.indexOf("left") ? "0%" : -1 !== a.indexOf("right") ? "100%" : c[0],
                        e = -1 !== a.indexOf("top") ? "0%" : -1 !== a.indexOf("bottom") ? "100%" : c[1];
                    return null == e ? e = "0" : "center" === e && (e = "50%"), ("center" === d || isNaN(parseFloat(d))) && (d = "50%"), b && (b.oxp = -1 !== d.indexOf("%"), b.oyp = -1 !== e.indexOf("%"), b.oxr = "=" === d.charAt(1), b.oyr = "=" === e.charAt(1), b.ox = parseFloat(d.replace(m, "")), b.oy = parseFloat(e.replace(m, ""))), d + " " + e + (c.length > 2 ? " " + c[2] : "")
                },
                _ = function(a, b) { return "string" == typeof a && "=" === a.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) : parseFloat(a) - parseFloat(b) },
                ab = function(a, b) { return null == a ? b : "string" == typeof a && "=" === a.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * Number(a.substr(2)) + b : parseFloat(a) },
                bb = function(a, b) {
                    if (null == a) return b;
                    var c = -1 === a.indexOf("rad") ? y : 1,
                        d = "=" === a.charAt(1);
                    return a = Number(a.replace(m, "")) * c, d ? a + b : a
                },
                cb = function(a, b) {
                    var c = "number" == typeof a ? a * y : bb(a, b),
                        d = (c - b) % (2 * Math.PI);
                    return d !== d % Math.PI && (d += Math.PI * (0 > d ? 2 : -2)), b + d
                },
                db = { aqua: [0, 255, 255], lime: [0, 255, 0], silver: [192, 192, 192], black: [0, 0, 0], maroon: [128, 0, 0], teal: [0, 128, 128], blue: [0, 0, 255], navy: [0, 0, 128], white: [255, 255, 255], fuchsia: [255, 0, 255], olive: [128, 128, 0], yellow: [255, 255, 0], orange: [255, 165, 0], gray: [128, 128, 128], purple: [128, 0, 128], green: [0, 128, 0], red: [255, 0, 0], pink: [255, 192, 203], cyan: [0, 255, 255], transparent: [255, 255, 255, 0] },
                eb = function(a) {
                    if (!a || "" === a) return db.black;
                    if (db[a]) return db[a];
                    if ("number" == typeof a) return [a >> 16, 255 & a >> 8, 255 & a];
                    if ("#" === a.charAt(0)) {
                        if (4 === a.length) {
                            var b = a.charAt(1),
                                c = a.charAt(2),
                                d = a.charAt(3);
                            a = "#" + b + b + c + c + d + d
                        }
                        return a = parseInt(a.substr(1), 16), [a >> 16, 255 & a >> 8, 255 & a]
                    }
                    return a = a.match(j) || db.transparent, a[0] = Number(a[0]), a[1] = Number(a[1]), a[2] = Number(a[2]), a.length > 3 && (a[3] = Number(a[3])), a
                },
                fb = "(?:\\b(?:(?:rgb|rgba)\\(.+?\\))|\\B#.+?\\b";
            for (i in db) fb += "|" + i + "\\b";
            fb = RegExp(fb + ")", "gi");
            var gb = function(a, b, c) {
                    if (null == a) return function(a) { return a };
                    var d = b ? (a.match(fb) || [""])[0] : "",
                        e = a.split(d).join("").match(l) || [],
                        f = a.substr(0, a.indexOf(e[0])),
                        g = ")" === a.charAt(a.length - 1) ? ")" : "",
                        h = -1 !== a.indexOf(" ") ? " " : ",",
                        i = e.length,
                        k = i > 0 ? e[0].replace(j, "") : "";
                    return b ? function(a) {
                        "number" == typeof a && (a += k);
                        var b = (a.match(fb) || [d])[0],
                            j = a.split(b).join("").match(l) || [],
                            m = j.length;
                        if (i > m--)
                            for (; i > ++m;) j[m] = c ? j[(m - 1) / 2 >> 0] : e[m];
                        return f + j.join(h) + h + b + g
                    } : function(a) {
                        "number" == typeof a && (a += k);
                        var b = a.match(l) || [],
                            d = b.length;
                        if (i > d--)
                            for (; i > ++d;) b[d] = c ? b[(d - 1) / 2 >> 0] : e[d];
                        return f + b.join(h) + g
                    }
                },
                hb = function(a) {
                    return a = a.split(","),
                        function(b, c, d, e, f, g, h) { var j, i = (c + "").split(" "); for (h = {}, j = 0; 4 > j; j++) h[a[j]] = i[j] = i[j] || i[(j - 1) / 2 >> 0]; return e.parse(b, h, f, g) }
                },
                jb = (E._setPluginRatio = function(a) {
                    this.plugin.setRatio(a);
                    for (var f, g, h, i, b = this.data, c = b.proxy, d = b.firstMPT, e = 1e-6; d;) f = c[d.v], d.r ? f = f > 0 ? f + .5 >> 0 : f - .5 >> 0 : e > f && f > -e && (f = 0), d.t[d.p] = f, d = d._next;
                    if (b.autoRotate && (b.autoRotate.rotation = c.rotation), 1 === a)
                        for (d = b.firstMPT; d;) {
                            if (g = d.t, g.type) {
                                if (1 === g.type) {
                                    for (i = g.xs0 + g.s + g.xs1, h = 1; g.l > h; h++) i += g["xn" + h] + g["xs" + (h + 1)];
                                    g.e = i
                                }
                            } else g.e = g.s + g.xs0;
                            d = d._next
                        }
                }, function(a, b, c, d, e) { this.t = a, this.p = b, this.v = c, this.r = e, d && (d._prev = this, this._next = d) }),
                lb = (E._parseToProxy = function(a, b, c, d, e, f) {
                    var l, m, n, o, p, g = d,
                        h = {},
                        i = {},
                        j = c._transform,
                        k = A;
                    for (c._transform = null, A = b, d = p = c.parse(a, b, d, e), A = k, f && (c._transform = j, g && (g._prev = null, g._prev && (g._prev._next = null))); d && d !== g;) {
                        if (1 >= d.type && (m = d.p, i[m] = d.s + d.c, h[m] = d.s, f || (o = new jb(d, "s", m, o, d.r), d.c = 0), 1 === d.type))
                            for (l = d.l; --l > 0;) n = "xn" + l, m = d.p + "_" + n, i[m] = d.data[n], h[m] = d[n], f || (o = new jb(d, n, m, o, d.rxp[n]));
                        d = d._next
                    }
                    return { proxy: h, end: i, firstMPT: o, pt: p }
                }, E.CSSPropTween = function(a, b, c, e, f, h, i, j, k, l, m) { this.t = a, this.p = b, this.s = c, this.c = e, this.n = i || "css_" + b, a instanceof lb || g.push(this.n), this.r = j, this.type = h || 0, k && (this.pr = k, d = !0), this.b = void 0 === l ? c : l, this.e = void 0 === m ? c + e : m, f && (this._next = f, f._prev = this) }),
                mb = c.parseComplex = function(a, b, c, d, e, f, g, h, i, l) {
                    g = new lb(a, b, 0, 0, g, l ? 2 : 1, null, !1, h, c, d);
                    var q, r, s, t, u, v, w, x, y, z, A, B, m = c.split(", ").join(",").split(" "),
                        n = (d + "").split(", ").join(",").split(" "),
                        o = m.length,
                        p = G !== !1;
                    for (o !== n.length && (m = (f || "").split(" "), o = m.length), g.plugin = i, g.setRatio = l, q = 0; o > q; q++)
                        if (t = m[q], u = n[q], x = parseFloat(t), x || 0 === x) g.appendXtra("", x, _(u, x), u.replace(k, ""), p && -1 !== u.indexOf("px"), !0);
                        else if (e && ("#" === t.charAt(0) || 0 === t.indexOf("rgb") || db[t])) t = eb(t), u = eb(u), y = t.length + u.length > 6, y && !M && 0 === u[3] ? (g["xs" + g.l] += g.l ? " transparent" : "transparent", g.e = g.e.split(n[q]).join("transparent")) : (M || (y = !1), g.appendXtra(y ? "rgba(" : "rgb(", t[0], u[0] - t[0], ",", !0, !0).appendXtra("", t[1], u[1] - t[1], ",", !0).appendXtra("", t[2], u[2] - t[2], y ? "," : ")", !0), y && (t = 4 > t.length ? 1 : t[3], g.appendXtra("", t, (4 > u.length ? 1 : u[3]) - t, ")", !1)));
                    else if (v = t.match(j)) {
                        if (w = u.match(k), !w || w.length !== v.length) return g;
                        for (s = 0, r = 0; v.length > r; r++) A = v[r], z = t.indexOf(A, s), g.appendXtra(t.substr(s, z - s), Number(A), _(w[r], A), "", p && "px" === t.substr(z + A.length, 2), 0 === r), s = z + A.length;
                        g["xs" + g.l] += t.substr(s)
                    } else g["xs" + g.l] += g.l ? " " + t : t;
                    if (-1 !== d.indexOf("=") && g.data) {
                        for (B = g.xs0 + g.data.s, q = 1; g.l > q; q++) B += g["xs" + q] + g.data["xn" + q];
                        g.e = B + g["xs" + q]
                    }
                    return g.l || (g.type = -1, g.xs0 = g.e), g.xfirst || g
                },
                nb = 9;
            for (i = lb.prototype, i.l = i.pr = 0; --nb > 0;) i["xn" + nb] = 0, i["xs" + nb] = "";
            i.xs0 = "", i._next = i._prev = i.xfirst = i.data = i.plugin = i.setRatio = i.rxp = null, i.appendXtra = function(a, b, c, d, e, f) {
                var g = this,
                    h = g.l;
                return g["xs" + h] += f && h ? " " + a : a || "", c || 0 === h || g.plugin ? (g.l++, g.type = g.setRatio ? 2 : 1, g["xs" + g.l] = d || "", h > 0 ? (g.data["xn" + h] = b + c, g.rxp["xn" + h] = e, g["xn" + h] = b, g.plugin || (g.xfirst = new lb(g, "xn" + h, b, c, g.xfirst || g, 0, g.n, e, g.pr), g.xfirst.xs0 = 0), g) : (g.data = { s: b + c }, g.rxp = {}, g.s = b, g.c = c, g.r = e, g)) : (g["xs" + h] += b + (d || ""), g)
            };
            var ob = function(a, b, c, d, e, f, g) { this.p = d ? R(a) || a : a, h[a] = h[this.p] = this, this.format = f || gb(b, e), c && (this.parse = c), this.clrs = e, this.dflt = b, this.pr = g || 0 },
                pb = E._registerComplexSpecialProp = function(a, b, c, d, e, f, g) { for (var k, h = a.split(","), i = b instanceof Array ? b : [b], j = h.length; --j > -1;) k = new ob(h[j], i[j], c, d && 0 === j, e, f, g) },
                qb = function(a) {
                    if (!h[a]) {
                        var b = a.charAt(0).toUpperCase() + a.substr(1) + "Plugin";
                        pb(a, null, function(a, c, d, e, f, g, i) { var j = (window.GreenSockGlobals || window).com.greensock.plugins[b]; return j ? (j._cssRegister(), h[d].parse(a, c, d, e, f, g, i)) : (O("Error: " + b + " js file not loaded."), f) })
                    }
                };
            i = ob.prototype, i.parseComplex = function(a, b, c, d, e, f) { return mb(a, this.p, b, c, this.clrs, this.dflt, d, this.pr, e, f) }, i.parse = function(a, b, c, d, e, g) { return this.parseComplex(a.style, this.format(T(a, c, f, !1, this.dflt)), this.format(b), e, g) }, c.registerSpecialProp = function(a, b, c) { pb(a, null, function(a, d, e, f, g, h) { var j = new lb(a, e, 0, 0, g, 2, e, !1, c); return j.plugin = h, j.setRatio = b(a, d, f._tween, e), j }, !1, !1, null, c) };
            var rb = ["scaleX", "scaleY", "scaleZ", "x", "y", "z", "skewX", "rotation", "rotationX", "rotationY", "perspective"],
                sb = R("transform"),
                tb = P + "transform",
                ub = R("transformOrigin"),
                vb = null !== R("perspective"),
                wb = function(a, b, d) {
                    var l, m, n, o, p, q, r, s, t, u, v, x, e = d ? a._gsTransform || { skewY: 0 } : { skewY: 0 },
                        f = 0 > e.scaleX,
                        g = 2e-5,
                        h = 1e5,
                        i = -Math.PI + 1e-4,
                        j = Math.PI - 1e-4,
                        k = vb ? parseFloat(T(a, ub, b, !1, "0 0 0").split(" ")[2]) || e.zOrigin || 0 : 0;
                    for (sb ? l = T(a, tb, b, !0) : a.currentStyle && (l = a.currentStyle.filter.match(w), l = l && 4 === l.length ? l[0].substr(4) + "," + Number(l[2].substr(4)) + "," + Number(l[1].substr(4)) + "," + l[3].substr(4) + "," + (e ? e.x : 0) + "," + (e ? e.y : 0) : null), m = (l || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [], n = m.length; --n > -1;) o = Number(m[n]), m[n] = (o * h + (0 > o ? -.5 : .5) >> 0) / h;
                    if (16 === m.length) {
                        var y = m[8],
                            z = m[9],
                            A = m[10],
                            B = m[12],
                            C = m[13],
                            D = m[14];
                        if (e.zOrigin && (D = -e.zOrigin, B = y * D - m[12], C = z * D - m[13], D = A * D + e.zOrigin - m[14]), !d || B !== e.x || C !== e.y || D !== e.z) {
                            var P, Q, R, S, U, V, W, X, E = m[0],
                                F = m[1],
                                G = m[2],
                                H = m[3],
                                I = m[4],
                                J = m[5],
                                K = m[6],
                                L = m[7],
                                M = m[11],
                                N = e.rotationX = Math.atan2(K, A),
                                O = i > N || N > j;
                            N && (U = Math.cos(-N), V = Math.sin(-N), P = I * U + y * V, Q = J * U + z * V, R = K * U + A * V, S = L * U + M * V, y = I * -V + y * U, z = J * -V + z * U, A = K * -V + A * U, M = L * -V + M * U, I = P, J = Q, K = R), N = e.rotationY = Math.atan2(y, E), N && (W = i > N || N > j, U = Math.cos(-N), V = Math.sin(-N), P = E * U - y * V, Q = F * U - z * V, R = G * U - A * V, S = H * U - M * V, z = F * V + z * U, A = G * V + A * U, M = H * V + M * U, E = P, F = Q, G = R), N = e.rotation = Math.atan2(F, J), N && (X = i > N || N > j, U = Math.cos(-N), V = Math.sin(-N), E = E * U + I * V, Q = F * U + J * V, J = F * -V + J * U, K = G * -V + K * U, F = Q), X && O ? e.rotation = e.rotationX = 0 : X && W ? e.rotation = e.rotationY = 0 : W && O && (e.rotationY = e.rotationX = 0), e.scaleX = (Math.sqrt(E * E + F * F) * h + .5 >> 0) / h, e.scaleY = (Math.sqrt(J * J + z * z) * h + .5 >> 0) / h, e.scaleZ = (Math.sqrt(K * K + A * A) * h + .5 >> 0) / h, e.skewX = 0, e.perspective = M ? 1 / M : 0, e.x = B, e.y = C, e.z = D
                        }
                    } else if (!vb || 0 === m.length || e.x !== m[4] || e.y !== m[5] || !e.rotationX && !e.rotationY) {
                        var Y = m.length >= 6,
                            Z = Y ? m[0] : 1,
                            $ = m[1] || 0,
                            _ = m[2] || 0,
                            ab = Y ? m[3] : 1;
                        e.x = m[4] || 0, e.y = m[5] || 0, p = Math.sqrt(Z * Z + $ * $), q = Math.sqrt(ab * ab + _ * _), r = Z || $ ? Math.atan2($, Z) : e.rotation || 0, s = _ || ab ? Math.atan2(_, ab) + r : e.skewX || 0, t = p - Math.abs(e.scaleX || 0), u = q - Math.abs(e.scaleY || 0), Math.abs(s) > Math.PI / 2 && Math.abs(s) < 1.5 * Math.PI && (f ? (p *= -1, s += 0 >= r ? Math.PI : -Math.PI, r += 0 >= r ? Math.PI : -Math.PI) : (q *= -1, s += 0 >= s ? Math.PI : -Math.PI)), v = (r - e.rotation) % Math.PI, x = (s - e.skewX) % Math.PI, (void 0 === e.skewX || t > g || -g > t || u > g || -g > u || v > i && j > v && 0 !== v * h >> 0 || x > i && j > x && 0 !== x * h >> 0) && (e.scaleX = p, e.scaleY = q, e.rotation = r, e.skewX = s), vb && (e.rotationX = e.rotationY = e.z = 0, e.perspective = parseFloat(c.defaultTransformPerspective) || 0, e.scaleZ = 1)
                    }
                    e.zOrigin = k;
                    for (n in e) g > e[n] && e[n] > -g && (e[n] = 0);
                    return d && (a._gsTransform = e), e
                },
                xb = function(a) {
                    var l, m, b = this.data,
                        c = -b.rotation,
                        d = c + b.skewX,
                        e = 1e5,
                        f = (Math.cos(c) * b.scaleX * e >> 0) / e,
                        g = (Math.sin(c) * b.scaleX * e >> 0) / e,
                        h = (Math.sin(d) * -b.scaleY * e >> 0) / e,
                        i = (Math.cos(d) * b.scaleY * e >> 0) / e,
                        j = this.t.style,
                        k = this.t.currentStyle;
                    if (k) {
                        m = g, g = -h, h = -m, l = k.filter, j.filter = "";
                        var v, w, p = this.t.offsetWidth,
                            q = this.t.offsetHeight,
                            r = "absolute" !== k.position,
                            s = "progid:DXImageTransform.Microsoft.Matrix(M11=" + f + ", M12=" + g + ", M21=" + h + ", M22=" + i,
                            t = b.x,
                            u = b.y;
                        if (null != b.ox && (v = (b.oxp ? .01 * p * b.ox : b.ox) - p / 2, w = (b.oyp ? .01 * q * b.oy : b.oy) - q / 2, t += v - (v * f + w * g), u += w - (v * h + w * i)), r) v = p / 2, w = q / 2, s += ", Dx=" + (v - (v * f + w * g) + t) + ", Dy=" + (w - (v * h + w * i) + u) + ")";
                        else {
                            var z, A, B, y = 8 > L ? 1 : -1;
                            for (v = b.ieOffsetX || 0, w = b.ieOffsetY || 0, b.ieOffsetX = Math.round((p - ((0 > f ? -f : f) * p + (0 > g ? -g : g) * q)) / 2 + t), b.ieOffsetY = Math.round((q - ((0 > i ? -i : i) * q + (0 > h ? -h : h) * p)) / 2 + u), nb = 0; 4 > nb; nb++) A = X[nb], z = k[A], m = -1 !== z.indexOf("px") ? parseFloat(z) : Z(this.t, A, parseFloat(z), z.replace(n, "")) || 0, B = m !== b[A] ? 2 > nb ? -b.ieOffsetX : -b.ieOffsetY : 2 > nb ? v - b.ieOffsetX : w - b.ieOffsetY, j[A] = (b[A] = Math.round(m - B * (0 === nb || 2 === nb ? 1 : y))) + "px";
                            s += ", sizingMethod='auto expand')"
                        }
                        j.filter = -1 !== l.indexOf("DXImageTransform.Microsoft.Matrix(") ? l.replace(x, s) : s + " " + l, (0 === a || 1 === a) && 1 === f && 0 === g && 0 === h && 1 === i && (r && -1 === s.indexOf("Dx=0, Dy=0") || o.test(l) && 100 !== parseFloat(RegExp.$1) || -1 === l.indexOf("gradient(") && j.removeAttribute("filter"))
                    }
                },
                yb = function() {
                    var x, y, z, A, B, C, D, E, F, b = this.data,
                        c = this.t.style,
                        d = b.perspective,
                        e = b.scaleX,
                        f = 0,
                        g = 0,
                        h = 0,
                        i = 0,
                        j = b.scaleY,
                        k = 0,
                        l = 0,
                        m = 0,
                        n = 0,
                        o = b.scaleZ,
                        p = 0,
                        q = 0,
                        r = 0,
                        s = d ? -1 / d : 0,
                        t = b.rotation,
                        u = b.zOrigin,
                        v = ",",
                        w = 1e5;
                    J && (D = T(this.t, "top", null, !1, "0"), E = parseFloat(D) || 0, F = D.substr((E + "").length), b._ffFix = !b._ffFix, c.top = (b._ffFix ? E + .05 : E - .05) + ("" === F ? "px" : F)), t && (x = Math.cos(t), y = Math.sin(t), z = e * x, A = j * y, f = e * -y, j *= x, e = z, i = A), t = b.rotationY, t && (x = Math.cos(t), y = Math.sin(t), z = e * x, A = i * x, B = o * -y, C = s * -y, g = e * y, k = i * y, o *= x, s *= x, e = z, i = A, m = B, q = C), t = b.rotationX, t && (x = Math.cos(t), y = Math.sin(t), z = f * x + g * y, A = j * x + k * y, B = n * x + o * y, C = r * x + s * y, g = f * -y + g * x, k = j * -y + k * x, o = n * -y + o * x, s = r * -y + s * x, f = z, j = A, n = B, r = C), u && (p -= u, h = g * p, l = k * p, p = o * p + u), h += b.x, l += b.y, p = ((p + b.z) * w >> 0) / w, c[sb] = "matrix3d(" + (e * w >> 0) / w + v + (i * w >> 0) / w + v + (m * w >> 0) / w + v + (q * w >> 0) / w + v + (f * w >> 0) / w + v + (j * w >> 0) / w + v + (n * w >> 0) / w + v + (r * w >> 0) / w + v + (g * w >> 0) / w + v + (k * w >> 0) / w + v + (o * w >> 0) / w + v + (s * w >> 0) / w + v + (h * w >> 0) / w + v + (l * w >> 0) / w + v + p + v + (d ? 1 + -p / d : 1) + ")"
                },
                zb = function() {
                    var d, e, f, g, h, i, j, k, b = this.data,
                        c = this.t;
                    J && (d = T(c, "top", null, !1, "0"), e = parseFloat(d) || 0, f = d.substr((e + "").length), b._ffFix = !b._ffFix, c.style.top = (b._ffFix ? e + .05 : e - .05) + ("" === f ? "px" : f)), b.rotation || b.skewX ? (g = b.rotation, h = g - b.skewX, i = 1e5, j = b.scaleX * i, k = b.scaleY * i, c.style[sb] = "matrix(" + (Math.cos(g) * j >> 0) / i + "," + (Math.sin(g) * j >> 0) / i + "," + (Math.sin(h) * -k >> 0) / i + "," + (Math.cos(h) * k >> 0) / i + "," + b.x + "," + b.y + ")") : c.style[sb] = "matrix(" + b.scaleX + ",0,0," + b.scaleY + "," + b.x + "," + b.y + ")"
                };
            pb("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,transformPerspective", null, function(a, b, c, d, e, g, h) {
                if (d._transform) return e;
                var n, o, p, q, r, s, t, i = d._transform = wb(a, f, !0),
                    j = a.style,
                    k = 1e-6,
                    l = rb.length,
                    m = h;
                for ("string" == typeof m.transform && sb ? (q = j[sb], j[sb] = m.transform, n = wb(a, null, !1), j[sb] = q) : "object" == typeof m && (o = null != m.rotation ? m.rotation : null != m.rotationZ ? m.rotationZ : i.rotation * z, n = { scaleX: ab(null != m.scaleX ? m.scaleX : m.scale, i.scaleX), scaleY: ab(null != m.scaleY ? m.scaleY : m.scale, i.scaleY), scaleZ: ab(null != m.scaleZ ? m.scaleZ : m.scale, i.scaleZ), x: ab(m.x, i.x), y: ab(m.y, i.y), z: ab(m.z, i.z), perspective: ab(m.transformPerspective, i.perspective) }, n.rotation = null != m.shortRotation || null != m.shortRotationZ ? cb(m.shortRotation || m.shortRotationZ || 0, i.rotation) : "number" == typeof o ? o * y : bb(o, i.rotation), vb && (n.rotationX = null != m.shortRotationX ? cb(m.shortRotationX, i.rotationX) : "number" == typeof m.rotationX ? m.rotationX * y : bb(m.rotationX, i.rotationX), n.rotationY = null != m.shortRotationY ? cb(m.shortRotationY, i.rotationY) : "number" == typeof m.rotationY ? m.rotationY * y : bb(m.rotationY, i.rotationY), k > n.rotationX && n.rotationX > -k && (n.rotationX = 0), k > n.rotationY && n.rotationY > -k && (n.rotationY = 0)), n.skewX = null == m.skewX ? i.skewX : "number" == typeof m.skewX ? m.skewX * y : bb(m.skewX, i.skewX), n.skewY = null == m.skewY ? i.skewY : "number" == typeof m.skewY ? m.skewY * y : bb(m.skewY, i.skewY), (p = n.skewY - i.skewY) && (n.skewX += p, n.rotation += p), k > n.skewY && n.skewY > -k && (n.skewY = 0), k > n.skewX && n.skewX > -k && (n.skewX = 0), k > n.rotation && n.rotation > -k && (n.rotation = 0)), s = i.z || i.rotationX || i.rotationY || n.z || n.rotationX || n.rotationY || n.perspective, s || null == n.scale || (n.scaleZ = 1); --l > -1;) c = rb[l], r = n[c] - i[c], (r > k || -k > r || null != A[c]) && (t = !0, e = new lb(i, c, i[c], r, e), e.xs0 = 0, e.plugin = g, d._overwriteProps.push(e.n));
                return r = m.transformOrigin, (r || vb && s && i.zOrigin) && (sb ? (t = !0, r = (r || T(a, c, f, !1, "50% 50%")) + "", c = ub, e = new lb(j, c, 0, 0, e, -1, "css_transformOrigin"), e.b = j[c], e.plugin = g, vb ? (q = i.zOrigin, r = r.split(" "), i.zOrigin = (r.length > 2 ? parseFloat(r[2]) : q) || 0, e.xs0 = e.e = j[c] = r[0] + " " + (r[1] || "50%") + " 0px", e = new lb(i, "zOrigin", 0, 0, e, -1, e.n), e.b = q, e.xs0 = e.e = i.zOrigin) : e.xs0 = e.e = j[c] = r) : $(r + "", i)), t && (d._transformType = s || 3 === this._transformType ? 3 : 2), e
            }, !0), pb("boxShadow", "0px 0px 0px 0px #999", function(a, b, c, d, e, g) { var h = -1 !== (b + "").indexOf("inset") ? " inset" : ""; return this.parseComplex(a.style, this.format(T(a, this.p, f, !1, this.dflt)) + h, this.format(b) + h, e, g) }, !0, !0), pb("borderRadius", "0px", function(a, b, c, d, g) {
                b = this.format(b);
                var k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, i = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                    j = a.style;
                for (s = parseFloat(a.offsetWidth), t = parseFloat(a.offsetHeight), k = b.split(" "), l = 0; i.length > l; l++) this.p.indexOf("border") && (i[l] = R(i[l])), o = n = T(a, i[l], f, !1, "0px"), -1 !== o.indexOf(" ") && (n = o.split(" "), o = n[0], n = n[1]), p = m = k[l], q = parseFloat(o), v = o.substr((q + "").length), w = "=" === p.charAt(1), w ? (r = parseInt(p.charAt(0) + "1", 10), p = p.substr(2), r *= parseFloat(p), u = p.substr((r + "").length - (0 > r ? 1 : 0)) || "") : (r = parseFloat(p), u = p.substr((r + "").length)), "" === u && (u = e[c] || v), u !== v && (x = Z(a, "borderLeft", q, v), y = Z(a, "borderTop", q, v), "%" === u ? (o = 100 * (x / s) + "%", n = 100 * (y / t) + "%") : "em" === u ? (z = Z(a, "borderLeft", 1, "em"), o = x / z + "em", n = y / z + "em") : (o = x + "px", n = y + "px"), w && (p = parseFloat(o) + r + u, m = parseFloat(n) + r + u)), g = mb(j, i[l], o + " " + n, p + " " + m, !1, "0px", g);
                return g
            }, !0, !1, gb("0px 0px 0px 0px", !1, !0)), pb("backgroundPosition", "0 0", function(a, b, c, d, e, g) {
                var l, m, n, o, p, h = "background-position",
                    i = f || S(a, null),
                    j = this.format((i ? L ? i.getPropertyValue(h + "-x") + " " + i.getPropertyValue(h + "-y") : i.getPropertyValue(h) : a.currentStyle.backgroundPositionX + " " + a.currentStyle.backgroundPositionY) || "0 0"),
                    k = this.format(b);
                if (-1 !== j.indexOf("%") != (-1 !== k.indexOf("%"))) {
                    for (l = j.split(" "), m = k.split(" "), D.setAttribute("src", T(a, "backgroundImage").replace(t, "")), n = 2; --n > -1;) j = l[n], o = -1 !== j.indexOf("%"), o !== (-1 !== m[n].indexOf("%")) && (p = 0 === n ? a.offsetWidth - D.width : a.offsetHeight - D.height, l[n] = o ? parseFloat(j) / 100 * p + "px" : 100 * (parseFloat(j) / p) + "%");
                    j = l.join(" ")
                }
                return this.parseComplex(a.style, j, k, e, g)
            }, !1, !1, $), pb("backgroundSize", "0 0", null, !1, !1, $), pb("perspective", "0px", null, !0), pb("perspectiveOrigin", "50% 50%", null, !0), pb("transformStyle", "preserve-3d", null, !0), pb("backfaceVisibility", "visible", null, !0), pb("margin", null, hb("marginTop,marginRight,marginBottom,marginLeft")), pb("padding", null, hb("paddingTop,paddingRight,paddingBottom,paddingLeft")), pb("clip", "rect(0px,0px,0px,0px)"), pb("textShadow", "0px 0px 0px #999", null, !1, !0), pb("autoRound", null, function(a, b, c, d, e) { return e }), pb("border", "0px solid #000", function(a, b, c, d, e, g) { return this.parseComplex(a.style, this.format(T(a, "borderTopWidth", f, !1, "0px") + " " + T(a, "borderTopStyle", f, !1, "solid") + " " + T(a, "borderTopColor", f, !1, "#000")), this.format(b), e, g) }, !1, !0, function(a) { var b = a.split(" "); return b[0] + " " + (b[1] || "solid") + " " + (a.match(fb) || ["#000"])[0] });
            var Ab = function(a) {
                var e, b = this.t,
                    c = b.filter,
                    d = this.s + this.c * a >> 0;
                100 === d && (-1 === c.indexOf("atrix(") && -1 === c.indexOf("radient(") ? (b.removeAttribute("filter"), e = !T(this.data, "filter")) : (b.filter = c.replace(q, ""), e = !0)), e || (this.xn1 && (b.filter = c = c || "alpha(opacity=100)"), -1 === c.indexOf("opacity") ? b.filter += " alpha(opacity=" + d + ")" : b.filter = c.replace(o, "opacity=" + d))
            };
            pb("opacity,alpha,autoAlpha", "1", function(a, b, c, d, e, g) {
                var j, h = parseFloat(T(a, "opacity", f, !1, "1")),
                    i = a.style;
                return b = parseFloat(b), "autoAlpha" === c && (j = T(a, "visibility", f), 1 === h && "hidden" === j && 0 !== b && (h = 0), e = new lb(i, "visibility", 0, 0, e, -1, null, !1, 0, 0 !== h ? "visible" : "hidden", 0 === b ? "hidden" : "visible"), e.xs0 = "visible", d._overwriteProps.push(e.n)), M ? e = new lb(i, "opacity", h, b - h, e) : (e = new lb(i, "opacity", 100 * h, 100 * (b - h), e), e.xn1 = "autoAlpha" === c ? 1 : 0, i.zoom = 1, e.type = 2, e.b = "alpha(opacity=" + e.s + ")", e.e = "alpha(opacity=" + (e.s + e.c) + ")", e.data = a, e.plugin = g, e.setRatio = Ab), e
            });
            var Bb = function(a) { if (1 === a || 0 === a) { this.t.className = 1 === a ? this.e : this.b; for (var b = this.data, c = this.t.style, d = c.removeProperty ? "removeProperty" : "removeAttribute"; b;) b.v ? c[b.p] = b.v : c[d](b.p.replace(r, "-$1").toLowerCase()), b = b._next } else this.t.className !== this.b && (this.t.className = this.b) };
            for (pb("className", null, function(a, b, c, d, e, g, h) {
                    var k, l, i = a.className,
                        j = a.style.cssText;
                    return e = d._classNamePT = new lb(a, c, 0, 0, e, 2), e.setRatio = Bb, e.b = i, e.e = "=" !== b.charAt(1) ? b : "+" === b.charAt(0) ? i + " " + b.substr(2) : i.split(b.substr(2)).join(""), d._tween._duration && (l = U(a, f, !0), a.className = e.e, k = V(a, l, U(a), h), a.className = i, e.data = k.firstMPT, a.style.cssText = j, e = e.xfirst = d.parse(a, k.difs, e, g)), e
                }), i = "bezier,throwProps,physicsProps,physics2D".split(","), nb = i.length; nb--;) qb(i[nb]);
            return i = c.prototype, i._firstPT = null, i._onInitTween = function(a, b, h) {
                if (!a.nodeType) return !1;
                this._target = a, this._tween = h, this._vars = b, G = b.autoRound, d = !1, e = b.suffixMap || c.suffixMap, f = S(a, ""), g = this._overwriteProps;
                var j, k, l, m, n, o, q, r, s, i = a.style;
                if (H && "" === i.zIndex && (j = T(a, "zIndex", f), ("auto" === j || "" === j) && (i.zIndex = 0)), "string" == typeof b && (m = i.cssText, j = U(a, f), i.cssText = m + ";" + b, j = V(a, j, U(a)).difs, !M && p.test(b) && (j.opacity = parseFloat(RegExp.$1)), b = j, i.cssText = m), this._firstPT = k = this.parse(a, b, null), this._transformType) {
                    for (s = 3 === this._transformType, sb ? I && (H = !0, "" === i.zIndex && (q = T(a, "zIndex", f), ("auto" === q || "" === q) && (i.zIndex = 0)), K && (i.WebkitBackfaceVisibility = this._vars.WebkitBackfaceVisibility || (s ? "visible" : "hidden"))) : i.zoom = 1, l = k; l && l._next;) l = l._next;
                    r = new lb(a, "transform", 0, 0, null, 2), this._linkCSSP(r, null, l), r.setRatio = s && vb ? yb : sb ? zb : xb, r.data = this._transform || wb(a, f, !0), g.pop()
                }
                if (d) {
                    for (; k;) {
                        for (o = k._next, l = m; l && l.pr > k.pr;) l = l._next;
                        (k._prev = l ? l._prev : n) ? k._prev._next = k: m = k, (k._next = l) ? l._prev = k : n = k, k = o
                    }
                    this._firstPT = m
                }
                return !0
            }, i.parse = function(a, b, c, d) { var i, j, k, l, m, n, o, p, q, r, g = a.style; for (i in b) n = b[i], j = h[i], j ? c = j.parse(a, n, i, this, c, d, b) : (m = T(a, i, f) + "", q = "string" == typeof n, "color" === i || "fill" === i || "stroke" === i || -1 !== i.indexOf("Color") || q && !n.indexOf("rgb") ? (q || (n = eb(n), n = (n.length > 3 ? "rgba(" : "rgb(") + n.join(",") + ")"), c = mb(g, i, m, n, !0, "transparent", c, 0, d)) : !q || -1 === n.indexOf(" ") && -1 === n.indexOf(",") ? (k = parseFloat(m), o = k || 0 === k ? m.substr((k + "").length) : "", ("" === m || "auto" === m) && ("width" === i || "height" === i ? (k = Y(a, i, f), o = "px") : (k = "opacity" !== i ? 0 : 1, o = "")), r = q && "=" === n.charAt(1), r ? (l = parseInt(n.charAt(0) + "1", 10), n = n.substr(2), l *= parseFloat(n), p = n.substr((l + "").length - (0 > l ? 1 : 0)) || "") : (l = parseFloat(n), p = q ? n.substr((l + "").length) || "" : ""), "" === p && (p = e[i] || o), n = l || 0 === l ? (r ? l + k : l) + p : b[i], o !== p && "" !== p && (l || 0 === l) && (k || 0 === k) && (k = Z(a, i, k, o), "%" === p ? (k /= Z(a, i, 100, "%") / 100, k > 100 && (k = 100)) : "em" === p ? k /= Z(a, i, 1, "em") : (l = Z(a, i, l, p), p = "px"), r && (l || 0 === l) && (n = l + k + p)), r && (l += k), !k && 0 !== k || !l && 0 !== l ? n || "NaN" != n + "" && null != n ? (c = new lb(g, i, l || k || 0, 0, c, -1, "css_" + i, !1, 0, m, n), c.xs0 = "display" === i && "none" === n ? m : n) : O("invalid " + i + " tween value. ") : (c = new lb(g, i, k, l - k, c, 0, "css_" + i, G !== !1 && ("px" === p || "zIndex" === i), 0, m, n), c.xs0 = p)) : c = mb(g, i, m, n, !0, null, c, 0, d)), d && c && !c.plugin && (c.plugin = d); return c }, i.setRatio = function(a) {
                var d, e, f, b = this._firstPT,
                    c = 1e-6;
                if (1 !== a || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                    if (a || this._tween._time !== this._tween._duration && 0 !== this._tween._time || this._tween._rawPrevTime === -1e-6)
                        for (; b;) {
                            if (d = b.c * a + b.s, b.r ? d = d > 0 ? d + .5 >> 0 : d - .5 >> 0 : c > d && d > -c && (d = 0), b.type)
                                if (1 === b.type)
                                    if (f = b.l, 2 === f) b.t[b.p] = b.xs0 + d + b.xs1 + b.xn1 + b.xs2;
                                    else if (3 === f) b.t[b.p] = b.xs0 + d + b.xs1 + b.xn1 + b.xs2 + b.xn2 + b.xs3;
                            else if (4 === f) b.t[b.p] = b.xs0 + d + b.xs1 + b.xn1 + b.xs2 + b.xn2 + b.xs3 + b.xn3 + b.xs4;
                            else if (5 === f) b.t[b.p] = b.xs0 + d + b.xs1 + b.xn1 + b.xs2 + b.xn2 + b.xs3 + b.xn3 + b.xs4 + b.xn4 + b.xs5;
                            else {
                                for (e = b.xs0 + d + b.xs1, f = 1; b.l > f; f++) e += b["xn" + f] + b["xs" + (f + 1)];
                                b.t[b.p] = e
                            } else -1 === b.type ? b.t[b.p] = b.xs0 : b.setRatio && b.setRatio(a);
                            else b.t[b.p] = d + b.xs0;
                            b = b._next
                        } else
                            for (; b;) 2 !== b.type ? b.t[b.p] = b.b : b.setRatio(a), b = b._next;
                    else
                        for (; b;) 2 !== b.type ? b.t[b.p] = b.e : b.setRatio(a), b = b._next
            }, i._enableTransforms = function(a) { this._transformType = a || 3 === this._transformType ? 3 : 2 }, i._linkCSSP = function(a, b, c, d) { return a && (b && (b._prev = a), a._next && (a._next._prev = a._prev), c ? c._next = a : d || null !== this._firstPT || (this._firstPT = a), a._prev ? a._prev._next = a._next : this._firstPT === a && (this._firstPT = a._next), a._next = b, a._prev = c), a }, i._kill = function(b) {
                var e, f, g, c = b,
                    d = !1;
                if (b.css_autoAlpha || b.css_alpha) {
                    c = {};
                    for (f in b) c[f] = b[f];
                    c.css_opacity = 1, c.css_autoAlpha && (c.css_visibility = 1)
                }
                return b.css_className && (e = this._classNamePT) && (g = e.xfirst, g && g._prev ? this._linkCSSP(g._prev, e._next, g._prev._prev) : g === this._firstPT && (this._firstPT = null), e._next && this._linkCSSP(e._next, e._next._next, g._prev), this._target._gsOverwrittenClassNamePT = this._linkCSSP(e, this._target._gsOverwrittenClassNamePT), this._classNamePT = null, d = !0), a.prototype._kill.call(this, c) || d
            }, a.activate([c]), c
        }, !0)
    }), window._gsDefine && _gsQueue.pop()();
    (function(t, e) {
        "use strict";
        var i = t.GreenSockGlobals = t.GreenSockGlobals || t;
        if (!i.TweenLite) {
            var s, n, r, a, o, l = function(t) {
                    var e, s = t.split("."),
                        n = i;
                    for (e = 0; s.length > e; e++) n[s[e]] = n = n[s[e]] || {};
                    return n
                },
                h = l("com.greensock"),
                _ = 1e-10,
                u = function(t) {
                    var e, i = [],
                        s = t.length;
                    for (e = 0; e !== s; i.push(t[e++]));
                    return i
                },
                f = function() {},
                m = function() {
                    var t = Object.prototype.toString,
                        e = t.call([]);
                    return function(i) { return null != i && (i instanceof Array || "object" == typeof i && !!i.push && t.call(i) === e) }
                }(),
                p = {},
                c = function(s, n, r, a) {
                    this.sc = p[s] ? p[s].sc : [], p[s] = this, this.gsClass = null, this.func = r;
                    var o = [];
                    this.check = function(h) {
                        for (var _, u, f, m, d = n.length, v = d; --d > -1;)(_ = p[n[d]] || new c(n[d], [])).gsClass ? (o[d] = _.gsClass, v--) : h && _.sc.push(this);
                        if (0 === v && r)
                            for (u = ("com.greensock." + s).split("."), f = u.pop(), m = l(u.join("."))[f] = this.gsClass = r.apply(r, o), a && (i[f] = m, "function" == typeof define && define.amd ? define((t.GreenSockAMDPath ? t.GreenSockAMDPath + "/" : "") + s.split(".").pop(), [], function() { return m }) : s === e && "undefined" != typeof module && module.exports && (module.exports = m)), d = 0; this.sc.length > d; d++) this.sc[d].check()
                    }, this.check(!0)
                },
                d = t._gsDefine = function(t, e, i, s) { return new c(t, e, i, s) },
                v = h._class = function(t, e, i) { return e = e || function() {}, d(t, [], function() { return e }, i), e };
            d.globals = i;
            var g = [0, 0, 1, 1],
                T = [],
                y = v("easing.Ease", function(t, e, i, s) { this._func = t, this._type = i || 0, this._power = s || 0, this._params = e ? g.concat(e) : g }, !0),
                w = y.map = {},
                P = y.register = function(t, e, i, s) {
                    for (var n, r, a, o, l = e.split(","), _ = l.length, u = (i || "easeIn,easeOut,easeInOut").split(","); --_ > -1;)
                        for (r = l[_], n = s ? v("easing." + r, null, !0) : h.easing[r] || {}, a = u.length; --a > -1;) o = u[a], w[r + "." + o] = w[o + r] = n[o] = t.getRatio ? t : t[o] || new t
                };
            for (r = y.prototype, r._calcEnd = !1, r.getRatio = function(t) {
                    if (this._func) return this._params[0] = t, this._func.apply(null, this._params);
                    var e = this._type,
                        i = this._power,
                        s = 1 === e ? 1 - t : 2 === e ? t : .5 > t ? 2 * t : 2 * (1 - t);
                    return 1 === i ? s *= s : 2 === i ? s *= s * s : 3 === i ? s *= s * s * s : 4 === i && (s *= s * s * s * s), 1 === e ? 1 - s : 2 === e ? s : .5 > t ? s / 2 : 1 - s / 2
                }, s = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"], n = s.length; --n > -1;) r = s[n] + ",Power" + n, P(new y(null, null, 1, n), r, "easeOut", !0), P(new y(null, null, 2, n), r, "easeIn" + (0 === n ? ",easeNone" : "")), P(new y(null, null, 3, n), r, "easeInOut");
            w.linear = h.easing.Linear.easeIn, w.swing = h.easing.Quad.easeInOut;
            var b = v("events.EventDispatcher", function(t) { this._listeners = {}, this._eventTarget = t || this });
            r = b.prototype, r.addEventListener = function(t, e, i, s, n) {
                n = n || 0;
                var r, l, h = this._listeners[t],
                    _ = 0;
                for (null == h && (this._listeners[t] = h = []), l = h.length; --l > -1;) r = h[l], r.c === e && r.s === i ? h.splice(l, 1) : 0 === _ && n > r.pr && (_ = l + 1);
                h.splice(_, 0, { c: e, s: i, up: s, pr: n }), this !== a || o || a.wake()
            }, r.removeEventListener = function(t, e) {
                var i, s = this._listeners[t];
                if (s)
                    for (i = s.length; --i > -1;)
                        if (s[i].c === e) return s.splice(i, 1), void 0
            }, r.dispatchEvent = function(t) {
                var e, i, s, n = this._listeners[t];
                if (n)
                    for (e = n.length, i = this._eventTarget; --e > -1;) s = n[e], s.up ? s.c.call(s.s || i, { type: t, target: i }) : s.c.call(s.s || i)
            };
            var k = t.requestAnimationFrame,
                A = t.cancelAnimationFrame,
                S = Date.now || function() { return (new Date).getTime() },
                x = S();
            for (s = ["ms", "moz", "webkit", "o"], n = s.length; --n > -1 && !k;) k = t[s[n] + "RequestAnimationFrame"], A = t[s[n] + "CancelAnimationFrame"] || t[s[n] + "CancelRequestAnimationFrame"];
            v("Ticker", function(t, e) {
                var i, s, n, r, l, h = this,
                    u = S(),
                    m = e !== !1 && k,
                    p = 500,
                    c = 33,
                    d = function(t) {
                        var e, a, o = S() - x;
                        o > p && (u += o - c), x += o, h.time = (x - u) / 1e3, e = h.time - l, (!i || e > 0 || t === !0) && (h.frame++, l += e + (e >= r ? .004 : r - e), a = !0), t !== !0 && (n = s(d)), a && h.dispatchEvent("tick")
                    };
                b.call(h), h.time = h.frame = 0, h.tick = function() { d(!0) }, h.lagSmoothing = function(t, e) { p = t || 1 / _, c = Math.min(e, p, 0) }, h.sleep = function() { null != n && (m && A ? A(n) : clearTimeout(n), s = f, n = null, h === a && (o = !1)) }, h.wake = function() { null !== n ? h.sleep() : h.frame > 10 && (x = S() - p + 5), s = 0 === i ? f : m && k ? k : function(t) { return setTimeout(t, 0 | 1e3 * (l - h.time) + 1) }, h === a && (o = !0), d(2) }, h.fps = function(t) { return arguments.length ? (i = t, r = 1 / (i || 60), l = this.time + r, h.wake(), void 0) : i }, h.useRAF = function(t) { return arguments.length ? (h.sleep(), m = t, h.fps(i), void 0) : m }, h.fps(t), setTimeout(function() { m && (!n || 5 > h.frame) && h.useRAF(!1) }, 1500)
            }), r = h.Ticker.prototype = new h.events.EventDispatcher, r.constructor = h.Ticker;
            var C = v("core.Animation", function(t, e) {
                if (this.vars = e = e || {}, this._duration = this._totalDuration = t || 0, this._delay = Number(e.delay) || 0, this._timeScale = 1, this._active = e.immediateRender === !0, this.data = e.data, this._reversed = e.reversed === !0, B) {
                    o || a.wake();
                    var i = this.vars.useFrames ? q : B;
                    i.add(this, i._time), this.vars.paused && this.paused(!0)
                }
            });
            a = C.ticker = new h.Ticker, r = C.prototype, r._dirty = r._gc = r._initted = r._paused = !1, r._totalTime = r._time = 0, r._rawPrevTime = -1, r._next = r._last = r._onUpdate = r._timeline = r.timeline = null, r._paused = !1;
            var R = function() { o && S() - x > 2e3 && a.wake(), setTimeout(R, 2e3) };
            R(), r.play = function(t, e) { return null != t && this.seek(t, e), this.reversed(!1).paused(!1) }, r.pause = function(t, e) { return null != t && this.seek(t, e), this.paused(!0) }, r.resume = function(t, e) { return null != t && this.seek(t, e), this.paused(!1) }, r.seek = function(t, e) { return this.totalTime(Number(t), e !== !1) }, r.restart = function(t, e) { return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, e !== !1, !0) }, r.reverse = function(t, e) { return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1) }, r.render = function() {}, r.invalidate = function() { return this }, r.isActive = function() {
                var t, e = this._timeline,
                    i = this._startTime;
                return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime()) >= i && i + this.totalDuration() / this._timeScale > t
            }, r._enabled = function(t, e) { return o || a.wake(), this._gc = !t, this._active = this.isActive(), e !== !0 && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), !1 }, r._kill = function() { return this._enabled(!1, !1) }, r.kill = function(t, e) { return this._kill(t, e), this }, r._uncache = function(t) { for (var e = t ? this : this.timeline; e;) e._dirty = !0, e = e.timeline; return this }, r._swapSelfInParams = function(t) { for (var e = t.length, i = t.concat(); --e > -1;) "{self}" === t[e] && (i[e] = this); return i }, r.eventCallback = function(t, e, i, s) {
                if ("on" === (t || "").substr(0, 2)) {
                    var n = this.vars;
                    if (1 === arguments.length) return n[t];
                    null == e ? delete n[t] : (n[t] = e, n[t + "Params"] = m(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i, n[t + "Scope"] = s), "onUpdate" === t && (this._onUpdate = e)
                }
                return this
            }, r.delay = function(t) { return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), this._delay = t, this) : this._delay }, r.duration = function(t) { return arguments.length ? (this._duration = this._totalDuration = t, this._uncache(!0), this._timeline.smoothChildTiming && this._time > 0 && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0), this) : (this._dirty = !1, this._duration) }, r.totalDuration = function(t) { return this._dirty = !1, arguments.length ? this.duration(t) : this._totalDuration }, r.time = function(t, e) { return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time }, r.totalTime = function(t, e, i) {
                if (o || a.wake(), !arguments.length) return this._totalTime;
                if (this._timeline) {
                    if (0 > t && !i && (t += this.totalDuration()), this._timeline.smoothChildTiming) {
                        this._dirty && this.totalDuration();
                        var s = this._totalDuration,
                            n = this._timeline;
                        if (t > s && !i && (t = s), this._startTime = (this._paused ? this._pauseTime : n._time) - (this._reversed ? s - t : t) / this._timeScale, n._dirty || this._uncache(!1), n._timeline)
                            for (; n._timeline;) n._timeline._time !== (n._startTime + n._totalTime) / n._timeScale && n.totalTime(n._totalTime, !0), n = n._timeline
                    }
                    this._gc && this._enabled(!0, !1), (this._totalTime !== t || 0 === this._duration) && (this.render(t, e, !1), O.length && M())
                }
                return this
            }, r.progress = r.totalProgress = function(t, e) { return arguments.length ? this.totalTime(this.duration() * t, e) : this._time / this.duration() }, r.startTime = function(t) { return arguments.length ? (t !== this._startTime && (this._startTime = t, this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime }, r.timeScale = function(t) {
                if (!arguments.length) return this._timeScale;
                if (t = t || _, this._timeline && this._timeline.smoothChildTiming) {
                    var e = this._pauseTime,
                        i = e || 0 === e ? e : this._timeline.totalTime();
                    this._startTime = i - (i - this._startTime) * this._timeScale / t
                }
                return this._timeScale = t, this._uncache(!1)
            }, r.reversed = function(t) { return arguments.length ? (t != this._reversed && (this._reversed = t, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed }, r.paused = function(t) {
                if (!arguments.length) return this._paused;
                if (t != this._paused && this._timeline) {
                    o || t || a.wake();
                    var e = this._timeline,
                        i = e.rawTime(),
                        s = i - this._pauseTime;
                    !t && e.smoothChildTiming && (this._startTime += s, this._uncache(!1)), this._pauseTime = t ? i : null, this._paused = t, this._active = this.isActive(), !t && 0 !== s && this._initted && this.duration() && this.render(e.smoothChildTiming ? this._totalTime : (i - this._startTime) / this._timeScale, !0, !0)
                }
                return this._gc && !t && this._enabled(!0, !1), this
            };
            var D = v("core.SimpleTimeline", function(t) { C.call(this, 0, t), this.autoRemoveChildren = this.smoothChildTiming = !0 });
            r = D.prototype = new C, r.constructor = D, r.kill()._gc = !1, r._first = r._last = null, r._sortChildren = !1, r.add = r.insert = function(t, e) {
                var i, s;
                if (t._startTime = Number(e || 0) + t._delay, t._paused && this !== t._timeline && (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale), t.timeline && t.timeline._remove(t, !0), t.timeline = t._timeline = this, t._gc && t._enabled(!0, !0), i = this._last, this._sortChildren)
                    for (s = t._startTime; i && i._startTime > s;) i = i._prev;
                return i ? (t._next = i._next, i._next = t) : (t._next = this._first, this._first = t), t._next ? t._next._prev = t : this._last = t, t._prev = i, this._timeline && this._uncache(!0), this
            }, r._remove = function(t, e) { return t.timeline === this && (e || t._enabled(!1, !0), t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next), t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev), t._next = t._prev = t.timeline = null, this._timeline && this._uncache(!0)), this }, r.render = function(t, e, i) { var s, n = this._first; for (this._totalTime = this._time = this._rawPrevTime = t; n;) s = n._next, (n._active || t >= n._startTime && !n._paused) && (n._reversed ? n.render((n._dirty ? n.totalDuration() : n._totalDuration) - (t - n._startTime) * n._timeScale, e, i) : n.render((t - n._startTime) * n._timeScale, e, i)), n = s }, r.rawTime = function() { return o || a.wake(), this._totalTime };
            var I = v("TweenLite", function(e, i, s) {
                    if (C.call(this, i, s), this.render = I.prototype.render, null == e) throw "Cannot tween a null target.";
                    this.target = e = "string" != typeof e ? e : I.selector(e) || e;
                    var n, r, a, o = e.jquery || e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType),
                        l = this.vars.overwrite;
                    if (this._overwrite = l = null == l ? Q[I.defaultOverwrite] : "number" == typeof l ? l >> 0 : Q[l], (o || e instanceof Array || e.push && m(e)) && "number" != typeof e[0])
                        for (this._targets = a = u(e), this._propLookup = [], this._siblings = [], n = 0; a.length > n; n++) r = a[n], r ? "string" != typeof r ? r.length && r !== t && r[0] && (r[0] === t || r[0].nodeType && r[0].style && !r.nodeType) ? (a.splice(n--, 1), this._targets = a = a.concat(u(r))) : (this._siblings[n] = $(r, this, !1), 1 === l && this._siblings[n].length > 1 && K(r, this, null, 1, this._siblings[n])) : (r = a[n--] = I.selector(r), "string" == typeof r && a.splice(n + 1, 1)) : a.splice(n--, 1);
                    else this._propLookup = {}, this._siblings = $(e, this, !1), 1 === l && this._siblings.length > 1 && K(e, this, null, 1, this._siblings);
                    (this.vars.immediateRender || 0 === i && 0 === this._delay && this.vars.immediateRender !== !1) && (this._time = -_, this.render(-this._delay))
                }, !0),
                E = function(e) { return e.length && e !== t && e[0] && (e[0] === t || e[0].nodeType && e[0].style && !e.nodeType) },
                z = function(t, e) {
                    var i, s = {};
                    for (i in t) G[i] || i in e && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!U[i] || U[i] && U[i]._autoCSS) || (s[i] = t[i], delete t[i]);
                    t.css = s
                };
            r = I.prototype = new C, r.constructor = I, r.kill()._gc = !1, r.ratio = 0, r._firstPT = r._targets = r._overwrittenProps = r._startAt = null, r._notifyPluginsOfEnabled = r._lazy = !1, I.version = "1.13.1", I.defaultEase = r._ease = new y(null, null, 1, 1), I.defaultOverwrite = "auto", I.ticker = a, I.autoSleep = !0, I.lagSmoothing = function(t, e) { a.lagSmoothing(t, e) }, I.selector = t.$ || t.jQuery || function(e) { var i = t.$ || t.jQuery; return i ? (I.selector = i, i(e)) : "undefined" == typeof document ? e : document.querySelectorAll ? document.querySelectorAll(e) : document.getElementById("#" === e.charAt(0) ? e.substr(1) : e) };
            var O = [],
                L = {},
                N = I._internals = { isArray: m, isSelector: E, lazyTweens: O },
                U = I._plugins = {},
                F = N.tweenLookup = {},
                j = 0,
                G = N.reservedProps = { ease: 1, delay: 1, overwrite: 1, onComplete: 1, onCompleteParams: 1, onCompleteScope: 1, useFrames: 1, runBackwards: 1, startAt: 1, onUpdate: 1, onUpdateParams: 1, onUpdateScope: 1, onStart: 1, onStartParams: 1, onStartScope: 1, onReverseComplete: 1, onReverseCompleteParams: 1, onReverseCompleteScope: 1, onRepeat: 1, onRepeatParams: 1, onRepeatScope: 1, easeParams: 1, yoyo: 1, immediateRender: 1, repeat: 1, repeatDelay: 1, data: 1, paused: 1, reversed: 1, autoCSS: 1, lazy: 1 },
                Q = { none: 0, all: 1, auto: 2, concurrent: 3, allOnStart: 4, preexisting: 5, "true": 1, "false": 0 },
                q = C._rootFramesTimeline = new D,
                B = C._rootTimeline = new D,
                M = N.lazyRender = function() {
                    var t = O.length;
                    for (L = {}; --t > -1;) s = O[t], s && s._lazy !== !1 && (s.render(s._lazy, !1, !0), s._lazy = !1);
                    O.length = 0
                };
            B._startTime = a.time, q._startTime = a.frame, B._active = q._active = !0, setTimeout(M, 1), C._updateRoot = I.render = function() {
                var t, e, i;
                if (O.length && M(), B.render((a.time - B._startTime) * B._timeScale, !1, !1), q.render((a.frame - q._startTime) * q._timeScale, !1, !1), O.length && M(), !(a.frame % 120)) {
                    for (i in F) {
                        for (e = F[i].tweens, t = e.length; --t > -1;) e[t]._gc && e.splice(t, 1);
                        0 === e.length && delete F[i]
                    }
                    if (i = B._first, (!i || i._paused) && I.autoSleep && !q._first && 1 === a._listeners.tick.length) {
                        for (; i && i._paused;) i = i._next;
                        i || a.sleep()
                    }
                }
            }, a.addEventListener("tick", C._updateRoot);
            var $ = function(t, e, i) {
                    var s, n, r = t._gsTweenID;
                    if (F[r || (t._gsTweenID = r = "t" + j++)] || (F[r] = { target: t, tweens: [] }), e && (s = F[r].tweens, s[n = s.length] = e, i))
                        for (; --n > -1;) s[n] === e && s.splice(n, 1);
                    return F[r].tweens
                },
                K = function(t, e, i, s, n) {
                    var r, a, o, l;
                    if (1 === s || s >= 4) {
                        for (l = n.length, r = 0; l > r; r++)
                            if ((o = n[r]) !== e) o._gc || o._enabled(!1, !1) && (a = !0);
                            else if (5 === s) break;
                        return a
                    }
                    var h, u = e._startTime + _,
                        f = [],
                        m = 0,
                        p = 0 === e._duration;
                    for (r = n.length; --r > -1;)(o = n[r]) === e || o._gc || o._paused || (o._timeline !== e._timeline ? (h = h || H(e, 0, p), 0 === H(o, h, p) && (f[m++] = o)) : u >= o._startTime && o._startTime + o.totalDuration() / o._timeScale > u && ((p || !o._initted) && 2e-10 >= u - o._startTime || (f[m++] = o)));
                    for (r = m; --r > -1;) o = f[r], 2 === s && o._kill(i, t) && (a = !0), (2 !== s || !o._firstPT && o._initted) && o._enabled(!1, !1) && (a = !0);
                    return a
                },
                H = function(t, e, i) {
                    for (var s = t._timeline, n = s._timeScale, r = t._startTime; s._timeline;) {
                        if (r += s._startTime, n *= s._timeScale, s._paused) return -100;
                        s = s._timeline
                    }
                    return r /= n, r > e ? r - e : i && r === e || !t._initted && 2 * _ > r - e ? _ : (r += t.totalDuration() / t._timeScale / n) > e + _ ? 0 : r - e - _
                };
            r._init = function() {
                var t, e, i, s, n, r = this.vars,
                    a = this._overwrittenProps,
                    o = this._duration,
                    l = !!r.immediateRender,
                    h = r.ease;
                if (r.startAt) {
                    this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), n = {};
                    for (s in r.startAt) n[s] = r.startAt[s];
                    if (n.overwrite = !1, n.immediateRender = !0, n.lazy = l && r.lazy !== !1, n.startAt = n.delay = null, this._startAt = I.to(this.target, 0, n), l)
                        if (this._time > 0) this._startAt = null;
                        else if (0 !== o) return
                } else if (r.runBackwards && 0 !== o)
                    if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
                    else { i = {}; for (s in r) G[s] && "autoCSS" !== s || (i[s] = r[s]); if (i.overwrite = 0, i.data = "isFromStart", i.lazy = l && r.lazy !== !1, i.immediateRender = l, this._startAt = I.to(this.target, 0, i), l) { if (0 === this._time) return } else this._startAt._init(), this._startAt._enabled(!1) }
                if (this._ease = h = h ? h instanceof y ? h : "function" == typeof h ? new y(h, r.easeParams) : w[h] || I.defaultEase : I.defaultEase, r.easeParams instanceof Array && h.config && (this._ease = h.config.apply(h, r.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
                    for (t = this._targets.length; --t > -1;) this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], a ? a[t] : null) && (e = !0);
                else e = this._initProps(this.target, this._propLookup, this._siblings, a);
                if (e && I._onPluginEvent("_onInitAllProps", this), a && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), r.runBackwards)
                    for (i = this._firstPT; i;) i.s += i.c, i.c = -i.c, i = i._next;
                this._onUpdate = r.onUpdate, this._initted = !0
            }, r._initProps = function(e, i, s, n) {
                var r, a, o, l, h, _;
                if (null == e) return !1;
                L[e._gsTweenID] && M(), this.vars.css || e.style && e !== t && e.nodeType && U.css && this.vars.autoCSS !== !1 && z(this.vars, e);
                for (r in this.vars) {
                    if (_ = this.vars[r], G[r]) _ && (_ instanceof Array || _.push && m(_)) && -1 !== _.join("").indexOf("{self}") && (this.vars[r] = _ = this._swapSelfInParams(_, this));
                    else if (U[r] && (l = new U[r])._onInitTween(e, this.vars[r], this)) {
                        for (this._firstPT = h = { _next: this._firstPT, t: l, p: "setRatio", s: 0, c: 1, f: !0, n: r, pg: !0, pr: l._priority }, a = l._overwriteProps.length; --a > -1;) i[l._overwriteProps[a]] = this._firstPT;
                        (l._priority || l._onInitAllProps) && (o = !0), (l._onDisable || l._onEnable) && (this._notifyPluginsOfEnabled = !0)
                    } else this._firstPT = i[r] = h = { _next: this._firstPT, t: e, p: r, f: "function" == typeof e[r], n: r, pg: !1, pr: 0 }, h.s = h.f ? e[r.indexOf("set") || "function" != typeof e["get" + r.substr(3)] ? r : "get" + r.substr(3)]() : parseFloat(e[r]), h.c = "string" == typeof _ && "=" === _.charAt(1) ? parseInt(_.charAt(0) + "1", 10) * Number(_.substr(2)) : Number(_) - h.s || 0;
                    h && h._next && (h._next._prev = h)
                }
                return n && this._kill(n, e) ? this._initProps(e, i, s, n) : this._overwrite > 1 && this._firstPT && s.length > 1 && K(e, this, i, this._overwrite, s) ? (this._kill(i, e), this._initProps(e, i, s, n)) : (this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration) && (L[e._gsTweenID] = !0), o)
            }, r.render = function(t, e, i) {
                var s, n, r, a, o = this._time,
                    l = this._duration,
                    h = this._rawPrevTime;
                if (t >= l) this._totalTime = this._time = l, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (s = !0, n = "onComplete"), 0 === l && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (0 === t || 0 > h || h === _) && h !== t && (i = !0, h > _ && (n = "onReverseComplete")), this._rawPrevTime = a = !e || t || h === t ? t : _);
                else if (1e-7 > t) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== o || 0 === l && h > 0 && h !== _) && (n = "onReverseComplete", s = this._reversed), 0 > t ? (this._active = !1, 0 === l && (this._initted || !this.vars.lazy || i) && (h >= 0 && (i = !0), this._rawPrevTime = a = !e || t || h === t ? t : _)) : this._initted || (i = !0);
                else if (this._totalTime = this._time = t, this._easeType) {
                    var u = t / l,
                        f = this._easeType,
                        m = this._easePower;
                    (1 === f || 3 === f && u >= .5) && (u = 1 - u), 3 === f && (u *= 2), 1 === m ? u *= u : 2 === m ? u *= u * u : 3 === m ? u *= u * u * u : 4 === m && (u *= u * u * u * u), this.ratio = 1 === f ? 1 - u : 2 === f ? u : .5 > t / l ? u / 2 : 1 - u / 2
                } else this.ratio = this._ease.getRatio(t / l);
                if (this._time !== o || i) {
                    if (!this._initted) {
                        if (this._init(), !this._initted || this._gc) return;
                        if (!i && this._firstPT && (this.vars.lazy !== !1 && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = o, this._rawPrevTime = h, O.push(this), this._lazy = t, void 0;
                        this._time && !s ? this.ratio = this._ease.getRatio(this._time / l) : s && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                    }
                    for (this._lazy !== !1 && (this._lazy = !1), this._active || !this._paused && this._time !== o && t >= 0 && (this._active = !0), 0 === o && (this._startAt && (t >= 0 ? this._startAt.render(t, e, i) : n || (n = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === l) && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || T))), r = this._firstPT; r;) r.f ? r.t[r.p](r.c * this.ratio + r.s) : r.t[r.p] = r.c * this.ratio + r.s, r = r._next;
                    this._onUpdate && (0 > t && this._startAt && this._startTime && this._startAt.render(t, e, i), e || (this._time !== o || s) && this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || T)), n && (!this._gc || i) && (0 > t && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(t, e, i), s && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[n] && this.vars[n].apply(this.vars[n + "Scope"] || this, this.vars[n + "Params"] || T), 0 === l && this._rawPrevTime === _ && a !== _ && (this._rawPrevTime = 0))
                }
            }, r._kill = function(t, e) {
                if ("all" === t && (t = null), null == t && (null == e || e === this.target)) return this._lazy = !1, this._enabled(!1, !1);
                e = "string" != typeof e ? e || this._targets || this.target : I.selector(e) || e;
                var i, s, n, r, a, o, l, h;
                if ((m(e) || E(e)) && "number" != typeof e[0])
                    for (i = e.length; --i > -1;) this._kill(t, e[i]) && (o = !0);
                else {
                    if (this._targets) {
                        for (i = this._targets.length; --i > -1;)
                            if (e === this._targets[i]) { a = this._propLookup[i] || {}, this._overwrittenProps = this._overwrittenProps || [], s = this._overwrittenProps[i] = t ? this._overwrittenProps[i] || {} : "all"; break }
                    } else {
                        if (e !== this.target) return !1;
                        a = this._propLookup, s = this._overwrittenProps = t ? this._overwrittenProps || {} : "all"
                    }
                    if (a) { l = t || a, h = t !== s && "all" !== s && t !== a && ("object" != typeof t || !t._tempKill); for (n in l)(r = a[n]) && (r.pg && r.t._kill(l) && (o = !0), r.pg && 0 !== r.t._overwriteProps.length || (r._prev ? r._prev._next = r._next : r === this._firstPT && (this._firstPT = r._next), r._next && (r._next._prev = r._prev), r._next = r._prev = null), delete a[n]), h && (s[n] = 1);!this._firstPT && this._initted && this._enabled(!1, !1) }
                }
                return o
            }, r.invalidate = function() { return this._notifyPluginsOfEnabled && I._onPluginEvent("_onDisable", this), this._firstPT = null, this._overwrittenProps = null, this._onUpdate = null, this._startAt = null, this._initted = this._active = this._notifyPluginsOfEnabled = this._lazy = !1, this._propLookup = this._targets ? {} : [], this }, r._enabled = function(t, e) {
                if (o || a.wake(), t && this._gc) {
                    var i, s = this._targets;
                    if (s)
                        for (i = s.length; --i > -1;) this._siblings[i] = $(s[i], this, !0);
                    else this._siblings = $(this.target, this, !0)
                }
                return C.prototype._enabled.call(this, t, e), this._notifyPluginsOfEnabled && this._firstPT ? I._onPluginEvent(t ? "_onEnable" : "_onDisable", this) : !1
            }, I.to = function(t, e, i) { return new I(t, e, i) }, I.from = function(t, e, i) { return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new I(t, e, i) }, I.fromTo = function(t, e, i, s) { return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, new I(t, e, s) }, I.delayedCall = function(t, e, i, s, n) { return new I(e, 0, { delay: t, onComplete: e, onCompleteParams: i, onCompleteScope: s, onReverseComplete: e, onReverseCompleteParams: i, onReverseCompleteScope: s, immediateRender: !1, useFrames: n, overwrite: 0 }) }, I.set = function(t, e) { return new I(t, 0, e) }, I.getTweensOf = function(t, e) {
                if (null == t) return [];
                t = "string" != typeof t ? t : I.selector(t) || t;
                var i, s, n, r;
                if ((m(t) || E(t)) && "number" != typeof t[0]) {
                    for (i = t.length, s = []; --i > -1;) s = s.concat(I.getTweensOf(t[i], e));
                    for (i = s.length; --i > -1;)
                        for (r = s[i], n = i; --n > -1;) r === s[n] && s.splice(i, 1)
                } else
                    for (s = $(t).concat(), i = s.length; --i > -1;)(s[i]._gc || e && !s[i].isActive()) && s.splice(i, 1);
                return s
            }, I.killTweensOf = I.killDelayedCallsTo = function(t, e, i) { "object" == typeof e && (i = e, e = !1); for (var s = I.getTweensOf(t, e), n = s.length; --n > -1;) s[n]._kill(i, t) };
            var J = v("plugins.TweenPlugin", function(t, e) { this._overwriteProps = (t || "").split(","), this._propName = this._overwriteProps[0], this._priority = e || 0, this._super = J.prototype }, !0);
            if (r = J.prototype, J.version = "1.10.1", J.API = 2, r._firstPT = null, r._addTween = function(t, e, i, s, n, r) { var a, o; return null != s && (a = "number" == typeof s || "=" !== s.charAt(1) ? Number(s) - i : parseInt(s.charAt(0) + "1", 10) * Number(s.substr(2))) ? (this._firstPT = o = { _next: this._firstPT, t: t, p: e, s: i, c: a, f: "function" == typeof t[e], n: n || e, r: r }, o._next && (o._next._prev = o), o) : void 0 }, r.setRatio = function(t) { for (var e, i = this._firstPT, s = 1e-6; i;) e = i.c * t + i.s, i.r ? e = Math.round(e) : s > e && e > -s && (e = 0), i.f ? i.t[i.p](e) : i.t[i.p] = e, i = i._next }, r._kill = function(t) {
                    var e, i = this._overwriteProps,
                        s = this._firstPT;
                    if (null != t[this._propName]) this._overwriteProps = [];
                    else
                        for (e = i.length; --e > -1;) null != t[i[e]] && i.splice(e, 1);
                    for (; s;) null != t[s.n] && (s._next && (s._next._prev = s._prev), s._prev ? (s._prev._next = s._next, s._prev = null) : this._firstPT === s && (this._firstPT = s._next)), s = s._next;
                    return !1
                }, r._roundProps = function(t, e) { for (var i = this._firstPT; i;)(t[this._propName] || null != i.n && t[i.n.split(this._propName + "_").join("")]) && (i.r = e), i = i._next }, I._onPluginEvent = function(t, e) {
                    var i, s, n, r, a, o = e._firstPT;
                    if ("_onInitAllProps" === t) {
                        for (; o;) {
                            for (a = o._next, s = n; s && s.pr > o.pr;) s = s._next;
                            (o._prev = s ? s._prev : r) ? o._prev._next = o: n = o, (o._next = s) ? s._prev = o : r = o, o = a
                        }
                        o = e._firstPT = n
                    }
                    for (; o;) o.pg && "function" == typeof o.t[t] && o.t[t]() && (i = !0), o = o._next;
                    return i
                }, J.activate = function(t) { for (var e = t.length; --e > -1;) t[e].API === J.API && (U[(new t[e])._propName] = t[e]); return !0 }, d.plugin = function(t) {
                    if (!(t && t.propName && t.init && t.API)) throw "illegal plugin definition.";
                    var e, i = t.propName,
                        s = t.priority || 0,
                        n = t.overwriteProps,
                        r = { init: "_onInitTween", set: "setRatio", kill: "_kill", round: "_roundProps", initAll: "_onInitAllProps" },
                        a = v("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function() { J.call(this, i, s), this._overwriteProps = n || [] }, t.global === !0),
                        o = a.prototype = new J(i);
                    o.constructor = a, a.API = t.API;
                    for (e in r) "function" == typeof t[e] && (o[r[e]] = t[e]);
                    return a.version = t.version, J.activate([a]), a
                }, s = t._gsQueue) { for (n = 0; s.length > n; n++) s[n](); for (r in p) p[r].func || t.console.log("GSAP encountered missing dependency: com.greensock." + r) }
            o = !1
        }
    })("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenLite");

    // Ease Pack
    var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
    (_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        _gsScope._gsDefine("easing.Back", ["easing.Ease"], function(t) {
            var e, i, s, r = _gsScope.GreenSockGlobals || _gsScope,
                n = r.com.greensock,
                a = 2 * Math.PI,
                o = Math.PI / 2,
                h = n._class,
                l = function(e, i) {
                    var s = h("easing." + e, function() {}, !0),
                        r = s.prototype = new t;
                    return r.constructor = s, r.getRatio = i, s
                },
                _ = t.register || function() {},
                u = function(t, e, i, s) { var r = h("easing." + t, { easeOut: new e, easeIn: new i, easeInOut: new s }, !0); return _(r, t), r },
                c = function(t, e, i) { this.t = t, this.v = e, i && (this.next = i, i.prev = this, this.c = i.v - e, this.gap = i.t - t) },
                p = function(e, i) {
                    var s = h("easing." + e, function(t) { this._p1 = t || 0 === t ? t : 1.70158, this._p2 = 1.525 * this._p1 }, !0),
                        r = s.prototype = new t;
                    return r.constructor = s, r.getRatio = i, r.config = function(t) { return new s(t) }, s
                },
                f = u("Back", p("BackOut", function(t) { return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1 }), p("BackIn", function(t) { return t * t * ((this._p1 + 1) * t - this._p1) }), p("BackInOut", function(t) { return 1 > (t *= 2) ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2) })),
                m = h("easing.SlowMo", function(t, e, i) { e = e || 0 === e ? e : .7, null == t ? t = .7 : t > 1 && (t = 1), this._p = 1 !== t ? e : 0, this._p1 = (1 - t) / 2, this._p2 = t, this._p3 = this._p1 + this._p2, this._calcEnd = i === !0 }, !0),
                d = m.prototype = new t;
            return d.constructor = m, d.getRatio = function(t) { var e = t + (.5 - t) * this._p; return this._p1 > t ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e }, m.ease = new m(.7, .7), d.config = m.config = function(t, e, i) { return new m(t, e, i) }, e = h("easing.SteppedEase", function(t) { t = t || 1, this._p1 = 1 / t, this._p2 = t + 1 }, !0), d = e.prototype = new t, d.constructor = e, d.getRatio = function(t) { return 0 > t ? t = 0 : t >= 1 && (t = .999999999), (this._p2 * t >> 0) * this._p1 }, d.config = e.config = function(t) { return new e(t) }, i = h("easing.RoughEase", function(e) {
                e = e || {};
                for (var i, s, r, n, a, o, h = e.taper || "none", l = [], _ = 0, u = 0 | (e.points || 20), p = u, f = e.randomize !== !1, m = e.clamp === !0, d = e.template instanceof t ? e.template : null, g = "number" == typeof e.strength ? .4 * e.strength : .4; --p > -1;) i = f ? Math.random() : 1 / u * p, s = d ? d.getRatio(i) : i, "none" === h ? r = g : "out" === h ? (n = 1 - i, r = n * n * g) : "in" === h ? r = i * i * g : .5 > i ? (n = 2 * i, r = .5 * n * n * g) : (n = 2 * (1 - i), r = .5 * n * n * g), f ? s += Math.random() * r - .5 * r : p % 2 ? s += .5 * r : s -= .5 * r, m && (s > 1 ? s = 1 : 0 > s && (s = 0)), l[_++] = { x: i, y: s };
                for (l.sort(function(t, e) { return t.x - e.x }), o = new c(1, 1, null), p = u; --p > -1;) a = l[p], o = new c(a.x, a.y, o);
                this._prev = new c(0, 0, 0 !== o.t ? o : o.next)
            }, !0), d = i.prototype = new t, d.constructor = i, d.getRatio = function(t) {
                var e = this._prev;
                if (t > e.t) {
                    for (; e.next && t >= e.t;) e = e.next;
                    e = e.prev
                } else
                    for (; e.prev && e.t >= t;) e = e.prev;
                return this._prev = e, e.v + (t - e.t) / e.gap * e.c
            }, d.config = function(t) { return new i(t) }, i.ease = new i, u("Bounce", l("BounceOut", function(t) { return 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375 }), l("BounceIn", function(t) { return 1 / 2.75 > (t = 1 - t) ? 1 - 7.5625 * t * t : 2 / 2.75 > t ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : 2.5 / 2.75 > t ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375) }), l("BounceInOut", function(t) { var e = .5 > t; return t = e ? 1 - 2 * t : 2 * t - 1, t = 1 / 2.75 > t ? 7.5625 * t * t : 2 / 2.75 > t ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : 2.5 / 2.75 > t ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375, e ? .5 * (1 - t) : .5 * t + .5 })), u("Circ", l("CircOut", function(t) { return Math.sqrt(1 - (t -= 1) * t) }), l("CircIn", function(t) { return -(Math.sqrt(1 - t * t) - 1) }), l("CircInOut", function(t) { return 1 > (t *= 2) ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1) })), s = function(e, i, s) {
                var r = h("easing." + e, function(t, e) { this._p1 = t || 1, this._p2 = e || s, this._p3 = this._p2 / a * (Math.asin(1 / this._p1) || 0) }, !0),
                    n = r.prototype = new t;
                return n.constructor = r, n.getRatio = i, n.config = function(t, e) { return new r(t, e) }, r
            }, u("Elastic", s("ElasticOut", function(t) { return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * a / this._p2) + 1 }, .3), s("ElasticIn", function(t) { return -(this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * a / this._p2)) }, .3), s("ElasticInOut", function(t) { return 1 > (t *= 2) ? -.5 * this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * a / this._p2) : .5 * this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * a / this._p2) + 1 }, .45)), u("Expo", l("ExpoOut", function(t) { return 1 - Math.pow(2, -10 * t) }), l("ExpoIn", function(t) { return Math.pow(2, 10 * (t - 1)) - .001 }), l("ExpoInOut", function(t) { return 1 > (t *= 2) ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1))) })), u("Sine", l("SineOut", function(t) { return Math.sin(t * o) }), l("SineIn", function(t) { return -Math.cos(t * o) + 1 }), l("SineInOut", function(t) { return -.5 * (Math.cos(Math.PI * t) - 1) })), h("easing.EaseLookup", { find: function(e) { return t.map[e] } }, !0), _(r.SlowMo, "SlowMo", "ease,"), _(i, "RoughEase", "ease,"), _(e, "SteppedEase", "ease,"), f
        }, !0)
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()();

    // Color Pack
    var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
    (_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
        "use strict";
        var t = /(\d|\.)+/g,
            e = { aqua: [0, 255, 255], lime: [0, 255, 0], silver: [192, 192, 192], black: [0, 0, 0], maroon: [128, 0, 0], teal: [0, 128, 128], blue: [0, 0, 255], navy: [0, 0, 128], white: [255, 255, 255], fuchsia: [255, 0, 255], olive: [128, 128, 0], yellow: [255, 255, 0], orange: [255, 165, 0], gray: [128, 128, 128], purple: [128, 0, 128], green: [0, 128, 0], red: [255, 0, 0], pink: [255, 192, 203], cyan: [0, 255, 255], transparent: [255, 255, 255, 0] },
            i = function(t, e, i) { return t = 0 > t ? t + 1 : t > 1 ? t - 1 : t, 0 | 255 * (1 > 6 * t ? e + 6 * (i - e) * t : .5 > t ? i : 2 > 3 * t ? e + 6 * (i - e) * (2 / 3 - t) : e) + .5 },
            s = function(s) {
                if ("" === s || null == s || "none" === s) return e.transparent;
                if (e[s]) return e[s];
                if ("number" == typeof s) return [s >> 16, 255 & s >> 8, 255 & s];
                if ("#" === s.charAt(0)) return 4 === s.length && (s = "#" + s.charAt(1) + s.charAt(1) + s.charAt(2) + s.charAt(2) + s.charAt(3) + s.charAt(3)), s = parseInt(s.substr(1), 16), [s >> 16, 255 & s >> 8, 255 & s];
                if ("hsl" === s.substr(0, 3)) {
                    s = s.match(t);
                    var r = Number(s[0]) % 360 / 360,
                        n = Number(s[1]) / 100,
                        a = Number(s[2]) / 100,
                        o = .5 >= a ? a * (n + 1) : a + n - a * n,
                        h = 2 * a - o;
                    return s.length > 3 && (s[3] = Number(s[3])), s[0] = i(r + 1 / 3, h, o), s[1] = i(r, h, o), s[2] = i(r - 1 / 3, h, o), s
                }
                return s.match(t) || e.transparent
            };
        _gsScope._gsDefine.plugin({ propName: "colorProps", version: "1.2.1", priority: -1, API: 2, init: function(t, e) { this._target = t; var i, r, n, a; for (i in e) n = s(e[i]), this._firstPT = a = { _next: this._firstPT, p: i, f: "function" == typeof t[i], n: i, r: !1 }, r = s(a.f ? t[i.indexOf("set") || "function" != typeof t["get" + i.substr(3)] ? i : "get" + i.substr(3)]() : t[i]), a.s = Number(r[0]), a.c = Number(n[0]) - a.s, a.gs = Number(r[1]), a.gc = Number(n[1]) - a.gs, a.bs = Number(r[2]), a.bc = Number(n[2]) - a.bs, (a.rgba = r.length > 3 || n.length > 3) && (a.as = 4 > r.length ? 1 : Number(r[3]), a.ac = (4 > n.length ? 1 : Number(n[3])) - a.as), a._next && (a._next._prev = a); return !0 }, set: function(t) { for (var e, i = this._firstPT; i;) e = (i.rgba ? "rgba(" : "rgb(") + (i.s + t * i.c >> 0) + ", " + (i.gs + t * i.gc >> 0) + ", " + (i.bs + t * i.bc >> 0) + (i.rgba ? ", " + (i.as + t * i.ac) : "") + ")", i.f ? this._target[i.p](e) : this._target[i.p] = e, i = i._next } })
    }), _gsScope._gsDefine && _gsScope._gsQueue.pop()();

    // TimeLite
    var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
    (_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
            "use strict";
            _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function(t, e, i) {
                var s = function(t) {
                        e.call(this, t), this._labels = {}, this.autoRemoveChildren = this.vars.autoRemoveChildren === !0, this.smoothChildTiming = this.vars.smoothChildTiming === !0, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
                        var i, s, r = this.vars;
                        for (s in r) i = r[s], o(i) && -1 !== i.join("").indexOf("{self}") && (r[s] = this._swapSelfInParams(i));
                        o(r.tweens) && this.add(r.tweens, 0, r.align, r.stagger)
                    },
                    r = 1e-10,
                    n = i._internals,
                    a = n.isSelector,
                    o = n.isArray,
                    h = n.lazyTweens,
                    l = n.lazyRender,
                    _ = [],
                    u = _gsScope._gsDefine.globals,
                    p = function(t) { var e, i = {}; for (e in t) i[e] = t[e]; return i },
                    f = function(t, e, i, s) { t._timeline.pause(t._startTime), e && e.apply(s || t._timeline, i || _) },
                    c = function(t) {
                        var e, i = [],
                            s = t.length;
                        for (e = 0; e !== s; i.push(t[e++]));
                        return i
                    },
                    m = s.prototype = new e;
                return s.version = "1.13.1", m.constructor = s, m.kill()._gc = !1, m.to = function(t, e, s, r) { var n = s.repeat && u.TweenMax || i; return e ? this.add(new n(t, e, s), r) : this.set(t, s, r) }, m.from = function(t, e, s, r) { return this.add((s.repeat && u.TweenMax || i).from(t, e, s), r) }, m.fromTo = function(t, e, s, r, n) { var a = r.repeat && u.TweenMax || i; return e ? this.add(a.fromTo(t, e, s, r), n) : this.set(t, r, n) }, m.staggerTo = function(t, e, r, n, o, h, l, _) { var u, f = new s({ onComplete: h, onCompleteParams: l, onCompleteScope: _, smoothChildTiming: this.smoothChildTiming }); for ("string" == typeof t && (t = i.selector(t) || t), a(t) && (t = c(t)), n = n || 0, u = 0; t.length > u; u++) r.startAt && (r.startAt = p(r.startAt)), f.to(t[u], e, p(r), u * n); return this.add(f, o) }, m.staggerFrom = function(t, e, i, s, r, n, a, o) { return i.immediateRender = 0 != i.immediateRender, i.runBackwards = !0, this.staggerTo(t, e, i, s, r, n, a, o) }, m.staggerFromTo = function(t, e, i, s, r, n, a, o, h) { return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, this.staggerTo(t, e, s, r, n, a, o, h) }, m.call = function(t, e, s, r) { return this.add(i.delayedCall(0, t, e, s), r) }, m.set = function(t, e, s) { return s = this._parseTimeOrLabel(s, 0, !0), null == e.immediateRender && (e.immediateRender = s === this._time && !this._paused), this.add(new i(t, 0, e), s) }, s.exportRoot = function(t, e) {
                    t = t || {}, null == t.smoothChildTiming && (t.smoothChildTiming = !0);
                    var r, n, a = new s(t),
                        o = a._timeline;
                    for (null == e && (e = !0), o._remove(a, !0), a._startTime = 0, a._rawPrevTime = a._time = a._totalTime = o._time, r = o._first; r;) n = r._next, e && r instanceof i && r.target === r.vars.onComplete || a.add(r, r._startTime - r._delay), r = n;
                    return o.add(a, 0), a
                }, m.add = function(r, n, a, h) {
                    var l, _, u, p, f, c;
                    if ("number" != typeof n && (n = this._parseTimeOrLabel(n, 0, !0, r)), !(r instanceof t)) {
                        if (r instanceof Array || r && r.push && o(r)) { for (a = a || "normal", h = h || 0, l = n, _ = r.length, u = 0; _ > u; u++) o(p = r[u]) && (p = new s({ tweens: p })), this.add(p, l), "string" != typeof p && "function" != typeof p && ("sequence" === a ? l = p._startTime + p.totalDuration() / p._timeScale : "start" === a && (p._startTime -= p.delay())), l += h; return this._uncache(!0) }
                        if ("string" == typeof r) return this.addLabel(r, n);
                        if ("function" != typeof r) throw "Cannot add " + r + " into the timeline; it is not a tween, timeline, function, or string.";
                        r = i.delayedCall(0, r)
                    }
                    if (e.prototype.add.call(this, r, n), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                        for (f = this, c = f.rawTime() > r._startTime; f._timeline;) c && f._timeline.smoothChildTiming ? f.totalTime(f._totalTime, !0) : f._gc && f._enabled(!0, !1), f = f._timeline;
                    return this
                }, m.remove = function(e) { if (e instanceof t) return this._remove(e, !1); if (e instanceof Array || e && e.push && o(e)) { for (var i = e.length; --i > -1;) this.remove(e[i]); return this } return "string" == typeof e ? this.removeLabel(e) : this.kill(null, e) }, m._remove = function(t, i) { e.prototype._remove.call(this, t, i); var s = this._last; return s ? this._time > s._startTime + s._totalDuration / s._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this }, m.append = function(t, e) { return this.add(t, this._parseTimeOrLabel(null, e, !0, t)) }, m.insert = m.insertMultiple = function(t, e, i, s) { return this.add(t, e || 0, i, s) }, m.appendMultiple = function(t, e, i, s) { return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, s) }, m.addLabel = function(t, e) { return this._labels[t] = this._parseTimeOrLabel(e), this }, m.addPause = function(t, e, i, s) { return this.call(f, ["{self}", e, i, s], this, t) }, m.removeLabel = function(t) { return delete this._labels[t], this }, m.getLabelTime = function(t) { return null != this._labels[t] ? this._labels[t] : -1 }, m._parseTimeOrLabel = function(e, i, s, r) {
                    var n;
                    if (r instanceof t && r.timeline === this) this.remove(r);
                    else if (r && (r instanceof Array || r.push && o(r)))
                        for (n = r.length; --n > -1;) r[n] instanceof t && r[n].timeline === this && this.remove(r[n]);
                    if ("string" == typeof i) return this._parseTimeOrLabel(i, s && "number" == typeof e && null == this._labels[i] ? e - this.duration() : 0, s);
                    if (i = i || 0, "string" != typeof e || !isNaN(e) && null == this._labels[e]) null == e && (e = this.duration());
                    else {
                        if (n = e.indexOf("="), -1 === n) return null == this._labels[e] ? s ? this._labels[e] = this.duration() + i : i : this._labels[e] + i;
                        i = parseInt(e.charAt(n - 1) + "1", 10) * Number(e.substr(n + 1)), e = n > 1 ? this._parseTimeOrLabel(e.substr(0, n - 1), 0, s) : this.duration()
                    }
                    return Number(e) + i
                }, m.seek = function(t, e) { return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), e !== !1) }, m.stop = function() { return this.paused(!0) }, m.gotoAndPlay = function(t, e) { return this.play(t, e) }, m.gotoAndStop = function(t, e) { return this.pause(t, e) }, m.render = function(t, e, i) {
                    this._gc && this._enabled(!0, !1);
                    var s, n, a, o, u, p = this._dirty ? this.totalDuration() : this._totalDuration,
                        f = this._time,
                        c = this._startTime,
                        m = this._timeScale,
                        d = this._paused;
                    if (t >= p ? (this._totalTime = this._time = p, this._reversed || this._hasPausedChild() || (n = !0, o = "onComplete", 0 === this._duration && (0 === t || 0 > this._rawPrevTime || this._rawPrevTime === r) && this._rawPrevTime !== t && this._first && (u = !0, this._rawPrevTime > r && (o = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, t = p + 1e-4) : 1e-7 > t ? (this._totalTime = this._time = 0, (0 !== f || 0 === this._duration && this._rawPrevTime !== r && (this._rawPrevTime > 0 || 0 > t && this._rawPrevTime >= 0)) && (o = "onReverseComplete", n = this._reversed), 0 > t ? (this._active = !1, this._rawPrevTime >= 0 && this._first && (u = !0), this._rawPrevTime = t) : (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : r, t = 0, this._initted || (u = !0))) : this._totalTime = this._time = this._rawPrevTime = t, this._time !== f && this._first || i || u) {
                        if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== f && t > 0 && (this._active = !0), 0 === f && this.vars.onStart && 0 !== this._time && (e || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || _)), this._time >= f)
                            for (s = this._first; s && (a = s._next, !this._paused || d);)(s._active || s._startTime <= this._time && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = a;
                        else
                            for (s = this._last; s && (a = s._prev, !this._paused || d);)(s._active || f >= s._startTime && !s._paused && !s._gc) && (s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = a;
                        this._onUpdate && (e || (h.length && l(), this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || _))), o && (this._gc || (c === this._startTime || m !== this._timeScale) && (0 === this._time || p >= this.totalDuration()) && (n && (h.length && l(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[o] && this.vars[o].apply(this.vars[o + "Scope"] || this, this.vars[o + "Params"] || _)))
                    }
                }, m._hasPausedChild = function() {
                    for (var t = this._first; t;) {
                        if (t._paused || t instanceof s && t._hasPausedChild()) return !0;
                        t = t._next
                    }
                    return !1
                }, m.getChildren = function(t, e, s, r) { r = r || -9999999999; for (var n = [], a = this._first, o = 0; a;) r > a._startTime || (a instanceof i ? e !== !1 && (n[o++] = a) : (s !== !1 && (n[o++] = a), t !== !1 && (n = n.concat(a.getChildren(!0, e, s)), o = n.length))), a = a._next; return n }, m.getTweensOf = function(t, e) {
                    var s, r, n = this._gc,
                        a = [],
                        o = 0;
                    for (n && this._enabled(!0, !0), s = i.getTweensOf(t), r = s.length; --r > -1;)(s[r].timeline === this || e && this._contains(s[r])) && (a[o++] = s[r]);
                    return n && this._enabled(!1, !0), a
                }, m._contains = function(t) {
                    for (var e = t.timeline; e;) {
                        if (e === this) return !0;
                        e = e.timeline
                    }
                    return !1
                }, m.shiftChildren = function(t, e, i) {
                    i = i || 0;
                    for (var s, r = this._first, n = this._labels; r;) r._startTime >= i && (r._startTime += t), r = r._next;
                    if (e)
                        for (s in n) n[s] >= i && (n[s] += t);
                    return this._uncache(!0)
                }, m._kill = function(t, e) { if (!t && !e) return this._enabled(!1, !1); for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), s = i.length, r = !1; --s > -1;) i[s]._kill(t, e) && (r = !0); return r }, m.clear = function(t) {
                    var e = this.getChildren(!1, !0, !0),
                        i = e.length;
                    for (this._time = this._totalTime = 0; --i > -1;) e[i]._enabled(!1, !1);
                    return t !== !1 && (this._labels = {}), this._uncache(!0)
                }, m.invalidate = function() { for (var t = this._first; t;) t.invalidate(), t = t._next; return this }, m._enabled = function(t, i) {
                    if (t === this._gc)
                        for (var s = this._first; s;) s._enabled(t, !0), s = s._next;
                    return e.prototype._enabled.call(this, t, i)
                }, m.duration = function(t) { return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t), this) : (this._dirty && this.totalDuration(), this._duration) }, m.totalDuration = function(t) {
                    if (!arguments.length) {
                        if (this._dirty) {
                            for (var e, i, s = 0, r = this._last, n = 999999999999; r;) e = r._prev, r._dirty && r.totalDuration(), r._startTime > n && this._sortChildren && !r._paused ? this.add(r, r._startTime - r._delay) : n = r._startTime, 0 > r._startTime && !r._paused && (s -= r._startTime, this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale), this.shiftChildren(-r._startTime, !1, -9999999999), n = 0), i = r._startTime + r._totalDuration / r._timeScale, i > s && (s = i), r = e;
                            this._duration = this._totalDuration = s, this._dirty = !1
                        }
                        return this._totalDuration
                    }
                    return 0 !== this.totalDuration() && 0 !== t && this.timeScale(this._totalDuration / t), this
                }, m.usesFrames = function() { for (var e = this._timeline; e._timeline;) e = e._timeline; return e === t._rootFramesTimeline }, m.rawTime = function() { return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale }, s
            }, !0)
        }), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
        function(t) { "use strict"; var e = function() { return (_gsScope.GreenSockGlobals || _gsScope)[t] }; "function" == typeof define && define.amd ? define(["TweenLite"], e) : "undefined" != typeof module && module.exports && (require("./TweenLite.js"), module.exports = e()) }("TimelineLite");

    // Detect Mobile
    (function(a) {
        (jQuery.browser = jQuery.browser || {}).mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
    })(navigator.userAgent || navigator.vendor || window.opera);

    // Tap
    ! function(a, b) {
        "use strict";
        var c, d, e, f = "._tap",
            g = "._tapActive",
            h = "tap",
            i = "clientX clientY screenX screenY pageX pageY".split(" "),
            j = { count: 0, event: 0 },
            k = function(a, c) {
                var d = c.originalEvent,
                    e = b.Event(d);
                e.type = a;
                for (var f = 0, g = i.length; g > f; f++) e[i[f]] = c[i[f]];
                return e
            },
            l = function(a) {
                if (a.isTrigger) return !1;
                var c = j.event,
                    d = Math.abs(a.pageX - c.pageX),
                    e = Math.abs(a.pageY - c.pageY),
                    f = Math.max(d, e);
                return a.timeStamp - c.timeStamp < b.tap.TIME_DELTA && f < b.tap.POSITION_DELTA && (!c.touches || 1 === j.count) && o.isTracking
            },
            m = function(a) {
                if (!e) return !1;
                var c = Math.abs(a.pageX - e.pageX),
                    d = Math.abs(a.pageY - e.pageY),
                    f = Math.max(c, d);
                return Math.abs(a.timeStamp - e.timeStamp) < 750 && f < b.tap.POSITION_DELTA
            },
            n = function(a) {
                if (0 === a.type.indexOf("touch")) { a.touches = a.originalEvent.changedTouches; for (var b = a.touches[0], c = 0, d = i.length; d > c; c++) a[i[c]] = b[i[c]] }
                a.timeStamp = Date.now ? Date.now() : +new Date
            },
            o = {
                isEnabled: !1,
                isTracking: !1,
                enable: function() { o.isEnabled || (o.isEnabled = !0, c = b(a.body).on("touchstart" + f, o.onStart).on("mousedown" + f, o.onStart).on("click" + f, o.onClick)) },
                disable: function() { o.isEnabled && (o.isEnabled = !1, c.off(f)) },
                onStart: function(a) { a.isTrigger || (n(a), (!b.tap.LEFT_BUTTON_ONLY || a.touches || 1 === a.which) && (a.touches && (j.count = a.touches.length), o.isTracking || (a.touches || !m(a)) && (o.isTracking = !0, j.event = a, a.touches ? (e = a, c.on("touchend" + f + g, o.onEnd).on("touchcancel" + f + g, o.onCancel)) : c.on("mouseup" + f + g, o.onEnd)))) },
                onEnd: function(a) {
                    var c;
                    a.isTrigger || (n(a), l(a) && (c = k(h, a), d = c, b(j.event.target).trigger(c)), o.onCancel(a))
                },
                onCancel: function(a) { a && "touchcancel" === a.type && a.preventDefault(), o.isTracking = !1, c.off(g) },
                onClick: function(a) { return !a.isTrigger && d && d.isDefaultPrevented() && d.target === a.target && d.pageX === a.pageX && d.pageY === a.pageY && a.timeStamp - d.timeStamp < 750 ? (d = null, !1) : void 0 }
            };
        b(a).ready(o.enable), b.tap = { POSITION_DELTA: 10, TIME_DELTA: 400, LEFT_BUTTON_ONLY: !0 }
    }(document, jQuery);

    // Device
    $.browser.device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));

    var sb = 0;
    var bb = 0;

    var MsgTimer;
    var SidePanelTimer;
    var SpecialLoadingTimer;
    var SpecialIdx = 0;
    var CurrentLoading = 0;
    var ResizeTimer;

    // Global behavior
    $(document).ready(function() {
        var NewContent;
        NewContent = '<div id="mnSBcontainerTR" align="right"></div>';
        NewContent += '<div id="mnSBcontainerTL"></div>';
        NewContent += '<div id="mnSBcontainerBL"></div>';
        NewContent += '<div id="mnSBcontainerBR" align="right"></div>';
        NewContent += '<div id="mbBbTabContainer"></div>';
        NewContent += '<div id="mnBigBoxContainerBR"></div>';
        NewContent += '<div id="mnBigBoxContainerBL"></div>';
        NewContent += '<span id="mnLetterCounter"></span>';

        $("body").append(NewContent);


        // Smallboxes Dependency
        $("body").on("mouseenter", ".mnSbButtonSection button", function() {
            var Color = $(this).attr("data-hover");
            var bot = $(this);
            TweenLite.to(bot, 0.5, { backgroundColor: Color });
        });

        $("body").on("mouseleave", ".mnSbButtonSection button", function() {
            var Color = $(this).attr("data-leave");
            var bot = $(this);
            TweenLite.to(bot, 0.5, { backgroundColor: Color });
        });


        $("body").on("tap", ".mnSmallBox", function() {
            var CloseOnClick = $(this).attr("data-closeclick");
            if (CloseOnClick == "true") {

                $(this).find(".sbClose").click();
                DestroySmallBox($(this));
            }
        });

        $("body").on("mouseenter", ".mnSmallBox", function() {
            $(this).attr("data-mouseover", "true");
        });

        $("body").on("mouseleave", ".mnSmallBox", function() {
            $(this).removeAttr("data-mouseover");
        });


        // BigBoxes Dependency
        $("body").on("tap", ".mnBbTab", function() {
            HideAllBigBoxes();
            var BigBox = $(this).attr("data-bigbox");
            var tl = new TimelineLite();

            tl.to(BigBox, 0.5, { autoAlpha: 1 });
        });

        $("body").on("tap", ".mnBbClose", function() {
            var BigBox = $($(this).attr("data-closebigbox"));

            BigBox.find(".bbClose").click();

            BigBox.removeAttr("data-mouseover");
            DestroyBigBox(BigBox);

            setTimeout(function() {

                if ($(".mnBigBox").length - 1 >= 0) {
                    var BigBoxNext = $(".mnBigBox:last");
                    var tl = new TimelineLite();
                    tl.to(BigBoxNext, 0.3, { autoAlpha: 1 });
                }
            }, 405);

        });

        $("body").on("mouseenter", ".mnBbIconSection button", function() {

            var HoverColor = $(this).attr("data-hovercolor");
            var bot = $(this);
            TweenLite.to(bot, 0.5, { backgroundColor: HoverColor });
        });

        $("body").on("mouseleave", ".mnBbIconSection button", function() {
            var NormalColor = $(this).attr("data-normalcolor");
            var bot = $(this);
            TweenLite.to(bot, 0.5, { backgroundColor: NormalColor });
        });

        $("body").on("mouseenter", ".mnBigBox", function() {
            $(this).attr("data-mouseover", "true");
        });

        $("body").on("mouseleave", ".mnBigBox", function() {
            $(this).removeAttr("data-mouseover");
        });


        // Metro MessageBox Dependency
        $("body").on("mouseenter", ".mbMsgBoxButtonSection button", function() {
            var HoverColor = $(this).attr("data-hovercolor");
            var bot = $(this);
            TweenLite.to(bot, 0.2, { backgroundColor: HoverColor });
        });

        $("body").on("mouseleave", ".mbMsgBoxButtonSection button", function() {
            var HoverColor = $(this).attr("data-normalcolor");
            var bot = $(this);
            TweenLite.to(bot, 0.2, { backgroundColor: HoverColor });
        });

        $("body").on("keypress", ".mbMsgBoxButtonSection button", function(e) {

            if ($(this).is(":focus")) {
                if (e.keyCode == 13) {
                    $(this).trigger("tap");
                }
            }
        });

        // Input Box counter
        $("body").on("keyup", ".mnInputField,.mnTextareaField", function() {

            var Input = $(this);
            var txtCounter = $("#mnLetterCounter");

            var ShowCounter = txtCounter.attr("data-show");

            if (ShowCounter == "no") {
                return;
            }


            var Max = Input.attr("maxlength");

            TweenLite.to(txtCounter, 0.3, { autoAlpha: 1 });

            var HowMany = Input.val();
            HowMany = HowMany.length;


            txtCounter.text("( " + HowMany + " / " + " " + Max + " )");

        });

        // Default Button Press Enter
        $("body").on("keyup", ".mnInputField", function(e) {


            if (e.keyCode != 13) {
                return false;
            }

            $(".mbMsgBoxButtonSection  button").each(function(e) {
                var isDefault = $(this).attr("data-default");
                if (isDefault == "true") {
                    $(this).trigger("tap");
                    return;
                }

            });

        });

        // Metro SidePanel AutoClose
        $('html').on("tap", function() {
            if ($(".mnSidePanel").length > 0) {

                $(".mnSidePanel").each(function() {
                    var MetroSidePanel = $(this);
                    var isOver = $(this).attr("data-mouseover");

                    if (isOver == "false") {
                        DestroySidePanel(MetroSidePanel);
                    }

                });
            }
        });

        $("body").on("tap", ".mnSidePanel", function(event) {
            event.stopPropagation();
        });

        // Resize Changes
        $(window).on("resize", function() {

            clearInterval(ResizeTimer);
            ResizeTimer = setTimeout(function() {
                $(".mnSmallBox").each(function() {
                    CheckSpaceSB($(this));
                });

                $(".mnBigBox").each(function() {
                    CheckSpaceBB($(this));
                });

                $(".mnSidePanel").each(function() {
                    CheckSpaceSP($(this));
                })

            }, 300);


        });


    }); // End Ready

    function PlaySound(Path, sound) {
        var audioElement = document.createElement('audio');
        if (navigator.userAgent.match('Firefox/'))
            audioElement.setAttribute('src', Path + "/" + sound + '.ogg');
        else
            audioElement.setAttribute('src', Path + "/" + sound + '.mp3');


        $.get();
        audioElement.addEventListener("load", function() {
            audioElement.play();
        }, true);

        audioElement.pause();
        audioElement.play();
    }


    // Destroy SmallBox
    function DestroySmallBox(SmallBox, nuke) {

        var Position = SmallBox.attr("data-posiiton") * 1;
        var MouseOver = SmallBox.attr("data-mouseover");
        var CloseOnClick = SmallBox.attr("data-closeclick");

        if (nuke === undefined) {
            if (MouseOver !== undefined && CloseOnClick == "false") {
                SmallBox.bind("mouseleave", function() {
                    $(this).removeAttr("data-mouseover");
                    $(this).unbind("mouseleave");
                    DestroySmallBox($(this));
                });
                return false
            }
        }

        var tl = new TimelineLite();

        switch (Position) {
            case 1:
                tl.to(SmallBox, 0.4, { autoAlpha: 0 })
                    .to(SmallBox, 0.8, { left: "+=150px", ease: Bounce.easeOut }, "-=0.4")
                    .to(SmallBox, 1, { height: "0px", marginBottom: "0px", ease: Bounce.easeOut }, "-=0.5");
                break;

            case 2:
                tl.to(SmallBox, 0.4, { autoAlpha: 0 })
                    .to(SmallBox, 0.8, { right: "+=150px", ease: Bounce.easeOut }, "-=0.4")
                    .to(SmallBox, 1, { height: "0px", marginBottom: "0px", ease: Bounce.easeOut }, "-=0.5");
                break;

            case 3:
                tl.to(SmallBox, 0.4, { autoAlpha: 0 })
                    .to(SmallBox, 0.8, { right: "+=150px", ease: Bounce.easeOut }, "-=0.4")
                    .to(SmallBox, 1, { height: "0px", marginBottom: "0px", ease: Bounce.easeOut }, "-=0.5");
                break;

            case 4:
                tl.to(SmallBox, 0.4, { autoAlpha: 0 })
                    .to(SmallBox, 0.8, { left: "+=150px", ease: Bounce.easeOut }, "-=0.4")
                    .to(SmallBox, 1, { height: "0px", marginBottom: "0px", ease: Bounce.easeOut }, "-=0.5");
                break;
        }

        setTimeout(function() {
            SmallBox.remove();
        }, 1800);
    }


    $.smallBoxKill = function() {

        $(".mnSmallBox").each(function() {
            DestroySmallBox($(this));
        });

    }

    $.sidePanelKill = function() {

        $(".mnSidePanel").each(function() {
            $(this).attr("data-blocked", "false");
            DestroySidePanel($(this));
        });

    }

    // Destroy Side Panels
    function DestroySidePanel(MetroSidePanel) {

        var MouseOver = MetroSidePanel.attr("data-mouseover");

        var SidePanelBlocked = MetroSidePanel.attr("data-blocked");

        if (SidePanelBlocked == "true") {
            return false
        }

        var tl = new TimelineLite();

        if (MetroSidePanel.hasClass("mnspRight")) {
            tl.to(MetroSidePanel, 0.4, { autoAlpha: 0 })
                .to(MetroSidePanel, 1, { right: "-=150", ease: Bounce.easeOut }, "-=0.4");
        } else {
            tl.to(MetroSidePanel, 0.4, { autoAlpha: 0 })
                .to(MetroSidePanel, 1, { left: "-=150", ease: Bounce.easeOut }, "-=0.4");
        }



        setTimeout(function() {
            MetroSidePanel.remove();
        }, 410);

        clearInterval(SidePanelTimer);
    }


    // Destroy BigBox
    function DestroyBigBox(BigBox, nuke) {

        var bbTab = $(BigBox.attr("data-bbtab"));

        var MouseOver = BigBox.attr("data-mouseover");

        if (nuke == undefined) {
            if (MouseOver !== undefined) {
                BigBox.bind("mouseleave", function() {
                    $(this).removeAttr("data-mouseover");
                    $(this).unbind("mouseleave");
                    DestroyBigBox($(this));
                });
                return false
            }
        }




        var tl = new TimelineLite();
        tl.to(BigBox, 0.4, { autoAlpha: 0 })
            .to(BigBox, 1, { bottom: "-=150", ease: Bounce.easeOut }, "-=0.4")
            .to(bbTab, 1, { left: "+=100", ease: Bounce.easeOut }, "-=1")
            .to(bbTab, 1, { height: "0px", marginBottom: "0px", paddingTop: "5px", ease: Bounce.easeOut }, "-=0.5")

        setTimeout(function() {
            bbTab.slideUp();
        }, 100);

        setTimeout(function() {
            BigBox.remove();
            bbTab.remove();
        }, 400);
    }

    function HideAllBigBoxes() {
        $(".mnBigBox").each(function() {

            var BigBox = $(this);
            var tl = new TimelineLite();

            tl.to(BigBox, 0.5, { autoAlpha: 0 });

        });
    }

    function ChangeText() {
        SpecialIdx += 1;

        if (SpecialIdx > LoadingArray.length - 1) {
            SpecialIdx = 0;
        }

        $(".mnMlTitle").html(LoadingArray[SpecialIdx]);
    }

    // Kill all bigboxes
    $.bigBoxKill = function() {
        $(".mnBigBox").each(function() {
            DestroyBigBox($(this));
        });
    }

    // Destroy Metro Messagebox
    function DestroyMessageBox(MetroMessageBox) {

        var MetroBackground = $(MetroMessageBox.attr("data-background"));

        var tl = new TimelineLite();

        var txtLetterCounter = $("#mnLetterCounter");

        tl.to(txtLetterCounter, 0.3, { autoAlpha: 0 })
            .to(MetroBackground, 0.3, { autoAlpha: 0 }, "-=0.3")
            .to(MetroMessageBox, 0.3, { autoAlpha: 0 }, "-=0.3")
            .to($("#mnLetterCounter"), 0.3, { autoAlpha: 0 }, "-=0.3");

        setTimeout(function() {
            MetroBackground.remove();
            MetroMessageBox.remove();
        }, 300);

        document.body.style.overflow = "visible";
        clearInterval(MsgTimer);
    }

    // Destroy Metro Loading
    function DestoytLoading(MetroLoading) {

        clearInterval(MsgTimer);
        var MetroLoadingBG = $(MetroLoading.attr("data-loadingbg"));

        var tl = new TimelineLite();

        tl.to(MetroLoadingBG, 0.3, { autoAlpha: 0 })
            .to(MetroLoading, 0.3, { autoAlpha: 0 }, "-=0.3");

        setTimeout(function() {
            MetroLoadingBG.remove();
            MetroLoading.remove();
        }, 300);

        document.body.style.overflow = "visible";
    }

    // Kill all bigboxes
    $.metroLoadingKill = function() {

        clearInterval(SpecialLoadingTimer);
        CurrentLoading = 0;

        $(".mnMlMainContent").each(function() {
            DestoytLoading($(this));
        });
    }

    // iFrame Cache Loading
    var mspLoading;

    function LoadiFrameWithCache(MetroSidePanel, URL) {

        $iframe = $('<iframe class="mspIframeLoaded">');
        $iframe.attr({ src: URL });

        // $iframe.appendTo( MetroSidePanel.find('.mmiFrameContainerWT') );
        $iframe.appendTo(MetroSidePanel);

        $iframe.load(function() {
            MetroSidePanel.find('.mspLoadingFrame').remove();
            var tl = new TimelineLite();
            tl.to($iframe, 0.5, { autoAlpha: 1 });
        });
    }



    // Check Smallboxes Space
    function CheckSpaceSB(SmallBox) {

        var WindowWidth = $(document).width();
        var SmallBoxWidth = SmallBox.width();

        var SmallBoxOriginalWidth = eval(SmallBox.attr("data-width"));

        if (WindowWidth <= (SmallBoxWidth + 5)) {
            SmallBox.css("width", (WindowWidth - 5) + "px");
        } else {
            if (WindowWidth >= (SmallBoxOriginalWidth + 5)) {
                TweenLite.to(SmallBox, 0.3, { width: SmallBoxOriginalWidth });
            } else {
                TweenLite.to(SmallBox, 0.3, { width: (WindowWidth - 5) });
            }
        }

        // Move to the other Container if screen is too small
        if (WindowWidth < 700) {
            $("#mnSBcontainerTL .mnSmallBox").each(function() {
                $(this).appendTo($("#mnSBcontainerTR"))
            });

            $("#mnSBcontainerBL .mnSmallBox").each(function() {
                $(this).appendTo($("#mnSBcontainerBR"));
            });

            $(".mnSidePanel").each(function() {
                CheckSpaceSP(MetroSidePanel);
            });
        }
    }


    function CheckSpaceBB(BigBox) {

        var WindowWidth = $(document).width();
        var BigBoxWidth = BigBox.width();

        var BigBoxOriginalWidth = eval(BigBox.attr("data-width"));

        if (WindowWidth <= (BigBoxWidth + 18)) {
            BigBox.css("width", (WindowWidth - 18) + "px");
        } else {
            if (WindowWidth >= (BigBoxOriginalWidth + 18)) {
                TweenLite.to(BigBox, 0.3, { width: BigBoxOriginalWidth });
            } else {
                TweenLite.to(BigBox, 0.3, { width: (WindowWidth - 18) });
            }
        }

    }

    function CheckSpaceSP(MetroSidePanel) {

        var WindowWidth = $(document).width();
        var MetroSidePanelWidth = MetroSidePanel.width();

        var MetroSidePanelOriginalWidth = eval(MetroSidePanel.attr("data-width"));

        if (WindowWidth < (MetroSidePanelWidth + 30)) {
            MetroSidePanel.css("width", (WindowWidth - 30) + "px");
        } else {

            if (WindowWidth >= (MetroSidePanelOriginalWidth + 30)) {
                TweenLite.to(MetroSidePanel, 0.3, { width: MetroSidePanelOriginalWidth });
            } else {
                TweenLite.to(MetroSidePanel, 0.3, { width: (WindowWidth - 30) });
            }

        }

    }


    // ======================================= Small boxes
    $.smallBox = function(settings, callback) {
            settings = $.extend({
                position: 1,
                title: undefined,
                content: "",
                width: 350,
                img: undefined,
                icon: undefined,
                fa: undefined,
                sound: true,
                soundpath: "MetroNotificacions/sound/",
                color: "#6D1D99",
                timeout: undefined,
                colortime: 1000,
                delay: 0,
                colors: [],
                closeonclick: true,
                buttons: [],
                buttonhover: "#3E006E",
            }, settings);

            var Content = "";

            var WindowWidth = $(document).width();

            sb += 1;

            // Mobile Ajustments
            if (WindowWidth < 700) {
                settings.sound = false;

                if (settings.position == 2) {
                    settings.position = 1
                } else if (settings.position == 3) {
                    settings.position = 4;
                }
            }

            // Play sound
            if (settings.sound) {
                PlaySound(settings.soundpath, "smallbox");
            }

            if (settings.colors.length > 0) {
                settings.color = settings.colors[0];
            }

            // Buttons ajustment
            if (settings.buttons.length > 0) {
                settings.closeonclick = false;
            }


            Content += "<div id='sb" + sb + "' class='mnSmallBox' style='width: " + settings.width + "px;background-color:" + settings.color + ";' align='left'>";
            Content += "<i class='sbClose'></i><table>";
            Content += " <tr>";

            if (settings.img !== undefined) {
                Content += "<td class='mnSbMainImage'>";
                Content += "<img src='" + settings.img + "'>";
                Content += "</td>";
            }

            Content += "<td class='mnSbContent'>";

            if (settings.title !== undefined) {
                Content += "<span class='mnSbTitle'>" + settings.title + "</span>";
            }

            Content += "<span class='mnSbContent'>" + settings.content + "</span>";
            Content += "</td>";


            if (settings.buttons.length > 0) {

                Content += "<td class='mnSbButtonSection'>"
                for (var i = 0; i <= settings.buttons.length - 1; i++) {
                    Content += "<button data-leave='" + settings.color + "' data-hover='" + settings.buttonhover + "' style='background-color:" + settings.color + "'> " + settings.buttons[i] + " </button>";
                }
                Content += "</td>";


            } else {

                if (settings.icon !== undefined || settings.fa !== undefined) {

                    Content += "<td>";
                    Content += "<div class='mnSbIcon' aling='center'>";
                    if (settings.icon !== undefined) {
                        Content += "<img src='" + settings.icon + "'>";
                    } else {
                        Content += "<i class='fa " + settings.fa + "'></i>";
                    }
                    Content += "</div>";
                    Content += "</td>";
                }
            }

            Content += "</tr>";
            Content += "</table>";
            Content += "</div>";


            // Placing in the correct position
            switch (settings.position) {
                case 1:
                    $("#mnSBcontainerTR").append(Content);
                    break;

                case 2:
                    $("#mnSBcontainerTL").append(Content);
                    break;

                case 3:
                    $("#mnSBcontainerBL").prepend(Content);
                    break;

                case 4:
                    $("#mnSBcontainerBR").prepend(Content);
                    break;
                default:
                    $("#mnSBcontainerTR").append(Content);
                    settings.position = 1;
                    break;
            }

            var SmallBox = $("#sb" + sb);
            SmallBox.attr("data-closeclick", settings.closeonclick)
                .attr("data-posiiton", settings.position)
                .attr("data-width", settings.width);

            CheckSpaceSB(SmallBox);


            var tl = new TimelineLite();

            switch (settings.position) {
                case 1:
                    SmallBox.css("left", "50px");
                    tl.to(SmallBox, 0.4, { autoAlpha: 1, delay: settings.delay })
                        .to(SmallBox, 0.8, { left: "0px", ease: Bounce.easeOut }, "-=0.4");
                    break;

                case 2:
                    SmallBox.css("right", "50px");
                    tl.to(SmallBox, 0.4, { autoAlpha: 1, delay: settings.delay })
                        .to(SmallBox, 0.8, { right: "0px", ease: Bounce.easeOut }, "-=0.4");
                    break;

                case 3:
                    SmallBox.css("right", "50px");
                    tl.to(SmallBox, 0.4, { autoAlpha: 1, delay: settings.delay })
                        .to(SmallBox, 0.8, { right: "0px", ease: Bounce.easeOut }, "-=0.4");
                    break;

                case 4:
                    SmallBox.css("left", "50px");
                    tl.to(SmallBox, 0.4, { autoAlpha: 1, delay: settings.delay })
                        .to(SmallBox, 0.8, { left: "0px", ease: Bounce.easeOut }, "-=0.4");
                    break;
            }



            // Colors - Array
            if (settings.colors.length > 0) {
                setInterval(function() {

                    if (SmallBox.attr("data-indexcolor") === undefined) {
                        SmallBox.attr("data-indexcolor", "0");
                    }


                    var ColorIdx = SmallBox.attr("data-indexcolor") * 1;
                    if (ColorIdx >= settings.colors.length - 1) {
                        ColorIdx = 0;
                    } else {
                        ColorIdx += 1;
                    }

                    var NextColor = settings.colors[ColorIdx];
                    tl.to(SmallBox, 0.8, { backgroundColor: NextColor });
                    SmallBox.attr("data-indexcolor", ColorIdx);


                }, settings.colortime);
            }

            // Auto Close
            if (settings.timeout !== undefined) {
                setTimeout(function() {
                    if (typeof callback == "function") {
                        if (callback) callback("timeoutReach");
                    }
                    DestroySmallBox(SmallBox);
                }, settings.timeout);
            }


            // Bind special close
            SmallBox.find(".sbClose").bind("click", function() {
                if (typeof callback == "function") {
                    if (callback) callback("touchClose");
                }
            });

            // Binding a button functions
            if (settings.buttons.length > 0) {
                SmallBox.find(".mnSbButtonSection button").bind("tap", function() {

                    $(this).unbind("tap");
                    var ButtonText = $(this).text();
                    if (typeof callback == "function") {
                        if (callback) callback("buttonPress", ButtonText);
                    }
                    DestroySmallBox(SmallBox, true);
                });
            }


        } // End Smallbox




    // ======================================= Big Boxes
    $.bigBox = function(settings, callback) {
            settings = $.extend({
                position: 1,
                title: undefined,
                content: "",
                width: 350,
                img: undefined,
                fa: "fa-star",
                sound: true,
                soundpath: "MetroNotifications/sound/",
                color: "#6D1D99",
                timeout: undefined,
                colortime: 1000,
                delay: 0,
                colors: [],
                closeicon: true,
                tabicon: true,
                buttons: [],
                buttonhover: "#3E006E",
                number: undefined,
            }, settings);

            var Content = "";

            bb += 1;

            // Hide All other BigBoxes
            HideAllBigBoxes();

            // Mobile Ajustments
            if ($.browser.mobile) {
                settings.sound = false;

                if (settings.position == 2) {
                    settings.position = 1
                }
            }


            // Play sound
            if (settings.sound) {
                PlaySound(settings.soundpath, "bigbox");
            }

            if (settings.colors.length > 0) {
                settings.color = settings.colors[0];
            }

            // Buttons ajustment
            if (settings.buttons.length > 0) {
                settings.closeicon = false;
            }


            Content += "<div id='bb" + bb + "' class='mnBigBox' style='background-color:" + settings.color + "; width:" + settings.width + "px;' data-bbtab='#bbt" + bb + "'>";
            Content += "<i class='bbClose'></i>";
            Content += "<table>";
            Content += "<tr>";
            Content += "<td>";

            if (settings.title !== undefined) {
                Content += "<span class='mnBbTitle'>" + settings.title + "</span>";
            }

            if (settings.closeicon) {
                Content += "<i data-closebigbox='#bb" + bb + "' class='mnBbClose fa fa-times fa-2x'></i>";
            }

            Content += "<span class='mnBbContent'>";
            Content += settings.content;
            Content += "</span>";
            Content += "</td>";
            Content += "</tr>";

            if (settings.buttons.length == 0) {
                Content += " <tr>";
                Content += " <td class='mnBbIconSection'>";

                if (settings.img !== undefined) {
                    Content += "<img src='" + settings.img + "' class='mnBbIconImg'>";
                } else {
                    Content += "<i class='fa " + settings.fa + "'></i>";
                }

                if (settings.number !== undefined) {
                    Content += "<span class='mnBbIndicator'>" + settings.number + "</span>";
                }

                Content += "</td>";
                Content += "</tr>";

            } else {

                Content += " <tr>";
                Content += " <td class='mnBbIconSection'>";
                // Buttons
                for (var i = 0; i <= settings.buttons.length - 1; i++) {
                    Content += "<button style='background-color:" + settings.color + ";' data-hovercolor='" + settings.buttonhover + "' data-normalcolor='" + settings.color + "' >" + settings.buttons[i] + "</button>";
                }
                Content += "</td>";
                Content += "</tr>";
                Content += "</table>";

            }

            Content += "</div>";

            var TabContent = "";
            if (settings.tabicon) {
                TabContent += '<div id="bbt' + bb + '" class="mnBbTab" align="center" style="background-color:' + settings.color + '" data-bigbox="#bb' + bb + '">';

                if (settings.img === undefined) {
                    if (settings.fa === undefined) {
                        TabContent += '<i class="fa fa-star-o"></i>';
                    } else {
                        TabContent += '<i class="fa ' + settings.fa + '"></i>';
                    }

                } else {
                    TabContent += '<img src="' + settings.img + '">';
                }
                TabContent += '</div>';

                $("#mbBbTabContainer").append(TabContent);

                var bbTab = $("#bbt" + bb);

                var tl = new TimelineLite();
                bbTab.css("left", "50px");
                tl.to(bbTab, 0.5, { autoAlpha: 1, delay: (settings.delay + 0.5) })
                    .to(bbTab, 0.8, { left: "0px", ease: Bounce.easeOut }, "-=0.5");
            }



            if (settings.position == 1) {
                $("#mnBigBoxContainerBR").append(Content);
            } else {
                $("#mnBigBoxContainerBL").append(Content);
            }

            var BigBox = $("#bb" + bb);

            BigBox.attr("data-width", settings.width);
            CheckSpaceBB(BigBox);


            // Enter animation
            var tl = new TimelineLite();

            BigBox.css("bottom", "50px");
            tl.to(BigBox, 0.5, { autoAlpha: 1, delay: settings.delay })
                .to(BigBox, 0.8, { bottom: "0px", ease: Bounce.easeOut }, "-=0.5");



            // Colors - Array
            if (settings.colors.length > 0) {
                setInterval(function() {

                    if (BigBox.attr("data-indexcolor") === undefined) {
                        BigBox.attr("data-indexcolor", "0");
                    }

                    var bbTab = $(BigBox.attr("data-bbtab"));

                    var ColorIdx = BigBox.attr("data-indexcolor") * 1;
                    if (ColorIdx >= settings.colors.length - 1) {
                        ColorIdx = 0;
                    } else {
                        ColorIdx += 1;
                    }

                    var NextColor = settings.colors[ColorIdx];
                    tl.to(BigBox, 0.8, { backgroundColor: NextColor })
                        .to(bbTab, 0.8, { backgroundColor: NextColor }, "-=0.8");

                    BigBox.attr("data-indexcolor", ColorIdx);


                }, settings.colortime);
            }




            // Auto Close
            if (settings.timeout !== undefined) {
                setTimeout(function() {
                    if (typeof callback == "function") {
                        if (callback) callback("timeoutReach");
                    }
                    DestroyBigBox(BigBox);
                }, settings.timeout);
            }


            BigBox.find(".bbClose").bind("click", function() {
                if (typeof callback == "function") {
                    if (callback) callback("closeIconTouch");
                }
            });

            // Binding a button functions
            if (settings.buttons.length > 0) {
                BigBox.find(".mnBbIconSection button").bind("tap", function() {

                    $(this).unbind("tap");

                    var ButtonText = $(this).text();

                    if (typeof callback == "function") {
                        if (callback) callback("buttonPress", ButtonText);
                    }
                    DestroyBigBox(BigBox, true);

                    setTimeout(function() {
                        if ($(".mnBigBox").length - 1 >= 0) {
                            var BigBoxNext = $(".mnBigBox:last");
                            var tl = new TimelineLite();
                            tl.to(BigBoxNext, 0.3, { autoAlpha: 1 });
                        }
                    }, 405);
                });
            }


        } // End Big Boxes



    // ======================================= Metro MessageBox - Inputs
    var mm = 0;
    $.metroMessageBox = function(settings, callback) {

            settings = $.extend({
                title: undefined,
                content: undefined,
                normalbutton: undefined,
                activebutton: "#6D1D99",
                buttons: [],
                icons: [],
                defaultbutton: undefined,
                sound: true,
                input: undefined,
                placeholder: "",
                maxlength: 1000,
                showcounter: true,
                options: [],
                values: [],
                soundpath: "MetroNotifications/sound/",
                backgroundcolor: "#000000",
                backgroundcontent: "#232323",
                blockpage: true,
                opacity: 0.7,
                colortime: 1500,
                colors: [],
                timeout: undefined,
            }, settings);

            var Content = "";

            mm += 1;

            // Mobile Ajustments
            if ($.browser.mobile) {
                settings.sound = false;
            }

            // Play sound
            if (settings.sound) {
                PlaySound(settings.soundpath, "messagebox");
            }

            if (settings.normalbutton === undefined) {
                settings.normalbutton = settings.backgroundcontent;
            }


            // Block Scroll
            if (settings.blockpage) {
                document.body.style.overflow = "hidden";
            }

            if (settings.showcounter) {
                $("#mnLetterCounter").attr("data-show", "yes");
            } else {
                $("#mnLetterCounter").attr("data-show", "no");
            }


            // Input section
            var NewInput = "";
            if (settings.input !== undefined) {

                NewInput += "<span class='mbMsgBoxTextContent'>";

                switch (settings.input) {
                    case "text":
                        NewInput = "<input class='mnInputField' type='text' placeholder='" + settings.placeholder + "' maxlength='" + settings.maxlength + "'>";
                        break;

                    case "textarea":
                        NewInput = "<textarea class='mnTextareaField' type='text' placeholder='" + settings.placeholder + "' maxlength='" + settings.maxlength + "'></textarea>";
                        break;

                    case "password":
                        NewInput = "<input class='mnInputField' type='password' placeholder='" + settings.placeholder + "' maxlength='" + settings.maxlength + "'>";
                        break;

                    case "email":
                        NewInput = "<input class='mnInputField' type='email' placeholder='" + settings.placeholder + "' maxlength='" + settings.maxlength + "'>";
                        break;

                    case "select":
                        if (settings.options.length == 0) {
                            alert("Metro Notifications: I required 'options', to display the Input Selectbox");
                            document.body.style.overflow = "visible";
                            return;
                        }
                        NewInput = "<select class='mnSelectField'>";

                        for (var i = 0; i <= settings.options.length - 1; i++) {

                            var Value = settings.options[i];
                            if (settings.values[i] != undefined) {
                                Value = settings.values[i];
                            }

                            NewInput += "<option value='" + Value + "'>" + settings.options[i] + "</option>";
                        }


                        NewInput += "</select>";
                        break;
                    default:
                        alert("Metro Notifications: That input type is not supported")
                        break;

                }

                NewInput += "</span>";
            }


            Content = "<div id='mnMmBg" + mm + "' class='mnMmBackScreen' style='background-color:" + settings.backgroundcolor + "'></div>";
            $("body").append(Content);

            Content = "<div id='mnMmBox" + mm + "' class='mnMsgBox' data-background='#mnMmBg" + mm + "'>";
            Content += "<table>";
            Content += "<tr>";
            Content += "<td align='center' class='mnMsgBoxTextContainer'>";
            Content += "<div class='mbMsgBoxMainContainer' style='background-color:" + settings.backgroundcontent + "'>";

            if (settings.title !== undefined) {
                Content += "<span class='mnMsgBoxTitle'>";
                Content += settings.title;
                Content += "</span>";

            }

            if (settings.content !== undefined) {
                Content += "<span class='mbMsgBoxTextContent'>";
                Content += settings.content;
                Content += "</span>";
            }


            Content += NewInput;

            // Buttons
            if (settings.buttons.length > 0) {
                Content += "<span class='mbMsgBoxButtonSection'>";
                for (var i = 0; i <= settings.buttons.length - 1; i++) {

                    var Icon = settings.icons[i];


                    if (settings.defaultbutton !== undefined) {

                        if ((i + 1) == settings.defaultbutton) {
                            if (Icon !== undefined) {
                                Content += "<button data-default='true' style='background-color:" + settings.activebutton + "' data-normalcolor='" + settings.activebutton + "' data-hovercolor='" + settings.activebutton + "'><i class='fa " + Icon + "'></i>" + settings.buttons[i] + "</button>";
                            } else {
                                Content += "<button data-default='true' style='background-color:" + settings.activebutton + "' data-normalcolor='" + settings.activebutton + "' data-hovercolor='" + settings.activebutton + "'>" + settings.buttons[i] + "</button>";
                            }
                        } else {
                            if (Icon !== undefined) {
                                Content += "<button style='background-color:" + settings.normalbutton + "' data-normalcolor='" + settings.normalbutton + "' data-hovercolor='" + settings.activebutton + "'><i class='fa " + Icon + "'></i>" + settings.buttons[i] + "</button>";
                            } else {
                                Content += "<button style='background-color:" + settings.normalbutton + "' data-normalcolor='" + settings.normalbutton + "' data-hovercolor='" + settings.activebutton + "'>" + settings.buttons[i] + "</button>";
                            }
                        }
                    } else {
                        if (Icon !== undefined) {
                            Content += "<button style='background-color:" + settings.normalbutton + "' data-normalcolor='" + settings.normalbutton + "' data-hovercolor='" + settings.activebutton + "'><i class='fa " + Icon + "'></i>" + settings.buttons[i] + "</button>";
                        } else {
                            Content += "<button style='background-color:" + settings.normalbutton + "' data-normalcolor='" + settings.normalbutton + "' data-hovercolor='" + settings.activebutton + "'>" + settings.buttons[i] + "</button>";
                        }
                    }



                }
                Content += "</span>";

            }

            Content += "</div>";
            Content += "</td>";
            Content += "</tr>";
            Content += "</table>";
            Content += "</div>";


            $("body").append(Content);

            var MetroBackground = $("#mnMmBg" + mm);
            var MetroMsg = $("#mnMmBox" + mm);


            // Enter Animation
            var tl = new TimelineLite();
            tl.to(MetroBackground, 0.4, { autoAlpha: settings.opacity })
                .to(MetroMsg, 0.4, { autoAlpha: 1 }, "-=0.1");


            // Setting focus on default button
            if (settings.defaultbutton !== undefined) {
                setTimeout(function() {
                    MetroMsg.find(".mbMsgBoxButtonSection button").each(function() {
                        var isDefault = $(this).attr("data-default");
                        if (isDefault == "true") {
                            $(this).focus();
                        }
                    })
                }, 400);
            }

            if (settings.input !== undefined && $.browser.mobile === false) {

                setTimeout(function() {
                    MetroMsg.find("input,textarea").focus();
                }, 401);


            }


            // Colors - Array
            if (settings.colors.length > 0) {

                MetroBackground.css("background-color", settings.colors[0]);

                var MainContainer = MetroMsg.find(".mbMsgBoxMainContainer");
                MainContainer.css("background-color", settings.colors[0]);

                clearInterval(MsgTimer);
                MsgTimer = setInterval(function() {

                    if (MetroMsg.attr("data-indexcolor") === undefined) {
                        MetroMsg.attr("data-indexcolor", "0");
                    }

                    var MetroBackground = $(MetroMsg.attr("data-background"));
                    var MainContainer = MetroMsg.find(".mbMsgBoxMainContainer");
                    var Buttons = MetroMsg.find(".mbMsgBoxButtonSection button");

                    var ColorIdx = MetroMsg.attr("data-indexcolor") * 1;
                    if (ColorIdx >= settings.colors.length - 1) {
                        ColorIdx = 0;
                    } else {
                        ColorIdx += 1;
                    }

                    var NextColor = settings.colors[ColorIdx];
                    tl.to([MainContainer, Buttons, MetroBackground], 0.8, { backgroundColor: NextColor });

                    MetroMsg.attr("data-indexcolor", ColorIdx);


                }, settings.colortime);
            }


            // Auto Close
            if (settings.timeout !== undefined) {
                setTimeout(function() {
                    if (typeof callback == "function") {
                        if (callback) callback("timeoutReach");
                    }
                    DestroyMessageBox(MetroMsg);
                }, settings.timeout);
            }


            // Binding a button functions
            if (settings.buttons.length > 0) {
                MetroMsg.find(".mbMsgBoxButtonSection button").bind("tap", function() {

                    var Value = MetroMsg.find("input,textarea, select").val();
                    var SelectedText = MetroMsg.find("select option:selected").text();

                    $(this).unbind("tap");
                    var ButtonText = $(this).text();
                    if (typeof callback == "function") {
                        if (callback) callback("buttonPress", ButtonText, Value, SelectedText);
                    }
                    DestroyMessageBox(MetroMsg);
                });
            }


        } // End Metro MessageBox



    // ======================================= Metro Loading
    var ml = 0;
    var LoadingArray;
    $.metroLoading = function(settings, callback) {
            var Content;

            settings = $.extend({
                title: undefined,
                content: undefined,
                fa: undefined,
                blockpage: true,
                timeout: undefined,
                texts: [],
                backgroundcolor: "#000000",
                backgroundcontent: "#232323",
                opacity: 0.7,
                colortime: 1500,
                colors: [],
            }, settings);

            ml += 1;
            CurrentLoading = 1;
            clearInterval(SpecialLoadingTimer);

            // Block Scroll
            if (settings.blockpage) {
                document.body.style.overflow = "hidden";
            }

            if (settings.texts.length > 0) {
                settings.title = settings.texts[0];
                LoadingArray = settings.texts;
            }


            var Content = "";
            Content = "<div id='mlBg" + ml + "' class='mnMlBackground' style='background-color:" + settings.backgroundcolor + ";'></div>";

            $("body").prepend(Content);


            Content = "<div id='ml" + ml + "' class='mnMlMainContent' data-loadingbg='#mlBg" + ml + "'>";
            Content += "<table>";
            Content += "<tr>";
            Content += "<td align='center'>";
            Content += "<div class='mnMlMainContainer' style='background-color:" + settings.backgroundcontent + ";'>";

            if (settings.title !== undefined) {
                Content += "<span class='mnMlTitle'>" + settings.title + "</span>";

            }

            if (settings.texts.length == 0) {

                if (settings.fa !== undefined) {
                    Content += "<i class='mnMlLoadingIcon fa " + settings.fa + " fa-spin'></i>";
                }

                if (settings.content) {
                    Content += "<span class='mnMlContent'>";
                    Content += settings.content;
                    Content += "</span>";
                }
            }




            Content += "</div>";
            Content += "</td>";
            Content += "</tr>";
            Content += "</table>";
            Content += "</div>";



            $("body").prepend(Content);

            var mlBg = $("#mlBg" + ml);
            var MetroLoading = $("#ml" + ml);

            // Auto Close
            if (settings.timeout !== undefined) {
                setTimeout(function() {
                    if (typeof callback == "function") {
                        if (callback) callback("timeoutReach");
                    }
                    DestoytLoading(MetroLoading);
                }, settings.timeout);
            }


            // Enter Animation
            var tl = new TimelineLite();
            tl.to(mlBg, 0.4, { autoAlpha: settings.opacity })
                .to(MetroLoading, 0.4, { autoAlpha: 1 }, "-=0.1");



            //Special Loading with text
            if (settings.texts.length > 0) {
                var LoadingLabel = MetroLoading.find(".mnMlTitle");
                var InitialWidth = LoadingLabel.width();

                LoadingLabel.css({
                    "opacity": 0,
                    "left": "-50px"
                });

                var tl = new TimelineLite();

                // Initial Animation
                tl.to(LoadingLabel, 0.4, { autoAlpha: 1 })
                    .to(LoadingLabel, 3, { left: 80 }, "-=0.2");

                CurrentLoading = 2;

                clearInterval(SpecialLoadingTimer);
                SpecialLoadingTimer = setInterval(function() {

                    switch (CurrentLoading) {

                        case 1: // left to right
                            tl.to(LoadingLabel, 0.3, { autoAlpha: 0, onComplete: ChangeText })
                                .to(LoadingLabel, 0, { left: -80 })
                                .to(LoadingLabel, 0.4, { autoAlpha: 1 })
                                .to(LoadingLabel, 3, { left: 80 }, "-=0.4");

                            CurrentLoading = 2;
                            break;

                        case 2: // Top to bottom
                            tl.to(LoadingLabel, 0.3, { autoAlpha: 0, onComplete: ChangeText })
                                .to(LoadingLabel, 0, { left: 0, top: -80 })
                                .to(LoadingLabel, 0.4, { autoAlpha: 1 })
                                .to(LoadingLabel, 2, { top: 0, ease: Bounce.easeOut }, "-=0.4");

                            CurrentLoading = 3;
                            break;

                        case 3: // right to left
                            tl.to(LoadingLabel, 0.3, { autoAlpha: 0, onComplete: ChangeText })
                                .to(LoadingLabel, 0, { left: 80 })
                                .to(LoadingLabel, 0.4, { autoAlpha: 1 })
                                .to(LoadingLabel, 3, { left: -80 }, "-=0.4");

                            CurrentLoading = 4;
                            break;

                        case 4: // bottom to top
                            tl.to(LoadingLabel, 0.3, { autoAlpha: 0, onComplete: ChangeText })
                                .to(LoadingLabel, 0, { top: +80, left: 0 })
                                .to(LoadingLabel, 0.4, { autoAlpha: 1, ease: Elastic.easeOut })
                                .to(LoadingLabel, 3, { top: 0 }, "-=0.4");

                            CurrentLoading = 1;
                            break;


                    }

                }, 3200)



            }



            // Colors - Array
            if (settings.colors.length > 0) {

                mlBg.css("background-color", settings.colors[0]);

                var MainContainer = MetroLoading.find(".mnMlMainContainer");
                MainContainer.css("background-color", settings.colors[0]);

                clearInterval(MsgTimer);
                MsgTimer = setInterval(function() {

                    if (MetroLoading.attr("data-indexcolor") === undefined) {
                        MetroLoading.attr("data-indexcolor", "0");
                    }

                    var mlBg = $(MetroLoading.attr("data-loadingbg"));
                    var MainContainer = MetroLoading.find(".mnMlMainContainer");


                    var ColorIdx = MetroLoading.attr("data-indexcolor") * 1;
                    if (ColorIdx >= settings.colors.length - 1) {
                        ColorIdx = 0;
                    } else {
                        ColorIdx += 1;
                    }

                    var NextColor = settings.colors[ColorIdx];
                    tl.to([MainContainer, mlBg], 0.8, { backgroundColor: NextColor });

                    MetroLoading.attr("data-indexcolor", ColorIdx);


                }, settings.colortime);
            }

        } // End Metro Loading


    // ======================================= Metro SidePanel
    var msp = 0;
    $.metroSidePanel = function(settings, callback) {
            settings = $.extend({
                position: 1,
                title: undefined,
                content: undefined,
                iframe: undefined,
                iframecache: true,
                loadingmessage: "Loading",
                width: 250,
                fa: undefined,
                faloading: "fa-refresh",
                img: undefined,
                shadow: true,
                backgroundcontent: "#662d91",
                colortime: 1500,
                colors: [],
                timeout: undefined,
                blocked: false,
            }, settings);

            var Content = "";

            msp += 1;

            if (settings.position == 1) {
                settings.position = "mnspRight";
            } else {
                settings.position = "mnspLeft";
            }

            if (settings.shadow) {
                settings.shadow = "mnSbShadow";
            }

            if (settings.colors.length > 0) {
                settings.backgroundcontent = settings.colors[0];
            }

            var TouchClass;
            if ($.browser.device) {
                TouchClass = "mnSpTouchScroll";
            }



            Content += "<div id='msp" + msp + "' class='mnSidePanel " + settings.shadow + " " + settings.position + " " + TouchClass + "' style='width: " + settings.width + "px; background-color:" + settings.backgroundcontent + ";' data-blocked='" + settings.blocked + "'>";

            if (settings.iframe !== undefined) {
                if (settings.iframecache) {
                    Content += "<table class='mspLoadingFrame'>";
                    Content += "<tr>";
                    Content += "<td align='center'>";
                    Content += "<span class='mnSpTitle'>" + settings.loadingmessage + "</span>";
                    Content += "<span class='mnSpIcon'>";
                    Content += "<i class='fa " + settings.faloading + " fa-spin'></i>";
                    Content += "</span>";
                    Content += "</td>";
                    Content += "</tr>";
                    Content += "</table>";
                } else {
                    Content += "<iframe src='" + settings.iframe + "'></iframe>";
                }
            } else {

                Content += "<table>";
                Content += "<tr>";
                Content += "<td align='center'>";

                if (settings.title !== undefined) {
                    Content += "<span class='mnSpTitle'>" + settings.title + "</span>";
                }

                if (settings.content !== undefined) {
                    Content += "<span class='mnSpContent'>";
                    Content += settings.content;
                    Content += "</span>";
                }

                if (settings.fa !== undefined || settings.img !== undefined) {

                    Content += " <span class='mnSpIcon'>";

                    if (settings.img !== undefined) {
                        Content += "<img src='" + settings.img + "'>";
                    } else {
                        Content += "<i class='fa " + settings.fa + "'></i>";
                    }

                    Content += "</span>";

                }

                Content += "</td>";
                Content += "</tr>";
                Content += "</table>";
                Content += "</div>";

            }


            $("body").append(Content);


            var MetroSidePanel = $("#msp" + msp);

            MetroSidePanel.attr("data-width", settings.width);
            CheckSpaceSP(MetroSidePanel);

            // Prevent auto Close
            MetroSidePanel.attr("data-mouseover", "true");

            setTimeout(function() {
                MetroSidePanel.attr("data-mouseover", "false");
            }, 300);

            // Enter Animation
            var tl = new TimelineLite();
            var CurrentWidth = MetroSidePanel.width();

            if (settings.position == "mnspLeft") {

                MetroSidePanel.css("left", "-" + (CurrentWidth / 5) + "px");

                tl.to(MetroSidePanel, 0.4, { autoAlpha: 1 })
                    .to(MetroSidePanel, 0.9, { left: "0", ease: Bounce.easeOut }, "-=0.4");

            } else {

                MetroSidePanel.css("right", "-" + (CurrentWidth / 5) + "px");

                tl.to(MetroSidePanel, 0.4, { autoAlpha: 1 })
                    .to(MetroSidePanel, 0.9, { right: "0", ease: Bounce.easeOut }, "-=0.4");
            }


            // Load iframe with cache
            if (settings.iframe !== undefined && settings.iframecache) {
                LoadiFrameWithCache(MetroSidePanel, settings.iframe);
            }



            if (settings.colors.length > 0) {

                MetroSidePanel.css("background-color", settings.colors[0]);

                var MainContainer = MetroSidePanel;
                MainContainer.css("background-color", settings.colors[0]);


                SidePanelTimer = setInterval(function() {

                    if (MetroSidePanel.attr("data-indexcolor") === undefined) {
                        MetroSidePanel.attr("data-indexcolor", "0");
                    }

                    var ColorIdx = MetroSidePanel.attr("data-indexcolor") * 1;
                    if (ColorIdx >= settings.colors.length - 1) {
                        ColorIdx = 0;
                    } else {
                        ColorIdx += 1;
                    }

                    var NextColor = settings.colors[ColorIdx];
                    tl.to([MetroSidePanel], 0.8, { backgroundColor: NextColor });

                    MetroSidePanel.attr("data-indexcolor", ColorIdx);


                }, settings.colortime);
            }


            // Auto Close
            if (settings.timeout !== undefined) {
                setTimeout(function() {
                    if (typeof callback == "function") {
                        if (callback) callback("timeoutReach");
                    }

                    MetroSidePanel.attr("data-blocked", "false");
                    DestroySidePanel(MetroSidePanel);
                }, settings.timeout);
            }


        } // End SidePanel





})(jQuery);