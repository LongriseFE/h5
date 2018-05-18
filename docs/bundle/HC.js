/**
 * base64 encoding & decoding
 * for fixing browsers which don't support Base64 | btoa |atob
 */

!function(t)
{
	if ("object" == typeof exports && "undefined" != typeof module)
		module.exports = t();
	else if ("function" == typeof define && define.amd)
		define([], t);
	else
	{
		("undefined" != typeof window ? window : "undefined" != typeof global ? global
				: "undefined" != typeof self ? self : this).pako = t()
	}
}(function()
{
	return function t(e, a, n)
	{
		function r(s, h)
		{
			if (!a[s])
			{
				if (!e[s])
				{
					var l = "function" == typeof require && require;
					if (!h && l)
						return l(s, !0);
					if (i)
						return i(s, !0);
					var o = new Error("Cannot find module '" + s + "'");
					throw o.code = "MODULE_NOT_FOUND", o
				}
				var _ = a[s] =
				{
					exports	: {}
				};
				e[s][0].call(_.exports, function(t)
				{
					var a = e[s][1][t];
					return r(a || t)
				}, _, _.exports, t, e, a, n)
			}
			return a[s].exports
		}
		for(var i = "function" == typeof require && require,s = 0;s < n.length;s++)
			r(n[s]);
		return r
	}(
	{
		1					: [function(t, e, a)
		{
			"use strict";
			function n(t, e)
			{
				return Object.prototype.hasOwnProperty.call(t, e)
			}
			var r =
					"undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array
							&& "undefined" != typeof Int32Array;
			a.assign = function(t)
			{
				for(var e = Array.prototype.slice.call(arguments, 1);e.length;)
				{
					var a = e.shift();
					if (a)
					{
						if ("object" != typeof a)
							throw new TypeError(a + "must be non-object");
						for(var r in a)
							n(a, r) && (t[r] = a[r])
					}
				}
				return t
			}, a.shrinkBuf = function(t, e)
			{
				return t.length === e ? t : t.subarray ? t.subarray(0, e) : (t.length = e, t)
			};
			var i =
			{
				arraySet		: function(t, e, a, n, r)
				{
					if (e.subarray && t.subarray)
						t.set(e.subarray(a, a + n), r);
					else for(var i = 0;i < n;i++)
						t[r + i] = e[a + i]
				},
				flattenChunks	: function(t)
				{
					var e,a,n,r,i,s;
					for(n = 0,e = 0,a = t.length;e < a;e++)
						n += t[e].length;
					for(s = new Uint8Array(n),r = 0,e = 0,a = t.length;e < a;e++)
						i = t[e], s.set(i, r), r += i.length;
					return s
				}
			},s =
			{
				arraySet		: function(t, e, a, n, r)
				{
					for(var i = 0;i < n;i++)
						t[r + i] = e[a + i]
				},
				flattenChunks	: function(t)
				{
					return [].concat.apply([], t)
				}
			};
			a.setTyped = function(t)
			{
				t ? (a.Buf8 = Uint8Array, a.Buf16 = Uint16Array, a.Buf32 = Int32Array, a.assign(a, i))
						: (a.Buf8 = Array, a.Buf16 = Array, a.Buf32 = Array, a.assign(a, s))
			}, a.setTyped(r)
		},{}],
		2					: [function(t, e, a)
		{
			"use strict";
			function n(t, e)
			{
				if (e < 65537 && (t.subarray && s || !t.subarray && i))
					return String.fromCharCode.apply(null, r.shrinkBuf(t, e));
				for(var a = "",n = 0;n < e;n++)
					a += String.fromCharCode(t[n]);
				return a
			}
			var r = t("./common"),i = !0,s = !0;
			try
			{
				String.fromCharCode.apply(null, [0])
			}
			catch(t)
			{
				i = !1
			}
			try
			{
				String.fromCharCode.apply(null, new Uint8Array(1))
			}
			catch(t)
			{
				s = !1
			}
			for(var h = new r.Buf8(256),l = 0;l < 256;l++)
				h[l] = l >= 252 ? 6 : l >= 248 ? 5 : l >= 240 ? 4 : l >= 224 ? 3 : l >= 192 ? 2 : 1;
			h[254] = h[254] = 1, a.string2buf = function(t)
			{
				var e,a,n,i,s,h = t.length,l = 0;
				for(i = 0;i < h;i++)
					55296 == (64512 & (a = t.charCodeAt(i))) && i + 1 < h
							&& 56320 == (64512 & (n = t.charCodeAt(i + 1)))
							&& (a = 65536 + (a - 55296 << 10) + (n - 56320), i++), l +=
							a < 128 ? 1 : a < 2048 ? 2 : a < 65536 ? 3 : 4;
				for(e = new r.Buf8(l),s = 0,i = 0;s < l;i++)
					55296 == (64512 & (a = t.charCodeAt(i))) && i + 1 < h
							&& 56320 == (64512 & (n = t.charCodeAt(i + 1)))
							&& (a = 65536 + (a - 55296 << 10) + (n - 56320), i++), a < 128 ? e[s++] = a
							: a < 2048 ? (e[s++] = 192 | a >>> 6, e[s++] = 128 | 63 & a) : a < 65536
									? (e[s++] = 224 | a >>> 12, e[s++] = 128 | a >>> 6 & 63, e[s++] =
											128 | 63 & a) : (e[s++] = 240 | a >>> 18, e[s++] =
											128 | a >>> 12 & 63, e[s++] = 128 | a >>> 6 & 63, e[s++] =
											128 | 63 & a);
				return e
			}, a.buf2binstring = function(t)
			{
				return n(t, t.length)
			}, a.binstring2buf = function(t)
			{
				for(var e = new r.Buf8(t.length),a = 0,n = e.length;a < n;a++)
					e[a] = t.charCodeAt(a);
				return e
			}, a.buf2string = function(t, e)
			{
				var a,r,i,s,l = e || t.length,o = new Array(2 * l);
				for(r = 0,a = 0;a < l;)
					if ((i = t[a++]) < 128)
						o[r++] = i;
					else if ((s = h[i]) > 4)
						o[r++] = 65533, a += s - 1;
					else
					{
						for(i &= 2 === s ? 31 : 3 === s ? 15 : 7;s > 1 && a < l;)
							i = i << 6 | 63 & t[a++], s--;
						s > 1 ? o[r++] = 65533 : i < 65536 ? o[r++] = i : (i -= 65536, o[r++] =
								55296 | i >> 10 & 1023, o[r++] = 56320 | 1023 & i)
					}
				return n(o, r)
			}, a.utf8border = function(t, e)
			{
				var a;
				for((e = e || t.length) > t.length && (e = t.length),a = e - 1;a >= 0 && 128 == (192 & t[a]);)
					a--;
				return a < 0 ? e : 0 === a ? e : a + h[t[a]] > e ? a : e
			}
		},
		{
			"./common"	: 1
		}],
		3					: [function(t, e, a)
				{
					"use strict";
					e.exports = function(t, e, a, n)
					{
						for(var r = 65535 & t | 0,i = t >>> 16 & 65535 | 0,s = 0;0 !== a;)
						{
							a -= s = a > 2e3 ? 2e3 : a;
							do
							{
								i = i + (r = r + e[n++] | 0) | 0
							}
							while(--s);
							r %= 65521, i %= 65521
						}
						return r | i << 16 | 0
					}
				},{}],
		4					: [function(t, e, a)
				{
					"use strict";
					var n = function()
					{
						for(var t,e = [],a = 0;a < 256;a++)
						{
							t = a;
							for(var n = 0;n < 8;n++)
								t = 1 & t ? 3988292384 ^ t >>> 1 : t >>> 1;
							e[a] = t
						}
						return e
					}();
					e.exports = function(t, e, a, r)
					{
						var i = n,s = r + a;
						t ^= -1;
						for(var h = r;h < s;h++)
							t = t >>> 8 ^ i[255 & (t ^ e[h])];
						return -1 ^ t
					}
				},{}],
		5					: [function(t, e, a)
		{
			"use strict";
			function n(t, e)
			{
				return t.msg = S[e], e
			}
			function r(t)
			{
				return (t << 1) - (t > 4 ? 9 : 0)
			}
			function i(t)
			{
				for(var e = t.length;--e >= 0;)
					t[e] = 0
			}
			function s(t)
			{
				var e = t.state,a = e.pending;
				a > t.avail_out && (a = t.avail_out), 0 !== a
						&& (x.arraySet(t.output, e.pending_buf, e.pending_out, a, t.next_out), t.next_out +=
								a, e.pending_out += a, t.total_out += a, t.avail_out -= a, e.pending -= a, 0 === e.pending
								&& (e.pending_out = 0))
			}
			function h(t, e)
			{
				B._tr_flush_block(t, t.block_start >= 0 ? t.block_start : -1, t.strstart - t.block_start, e), t.block_start =
						t.strstart, s(t.strm)
			}
			function l(t, e)
			{
				t.pending_buf[t.pending++] = e
			}
			function o(t, e)
			{
				t.pending_buf[t.pending++] = e >>> 8 & 255, t.pending_buf[t.pending++] = 255 & e
			}
			function _(t, e, a, n)
			{
				var r = t.avail_in;
				return r > n && (r = n), 0 === r
						? 0
						: (t.avail_in -= r, x.arraySet(e, t.input, t.next_in, r, a), 1 === t.state.wrap
								? t.adler = A(t.adler, e, r, a) : 2 === t.state.wrap
										&& (t.adler = C(t.adler, e, r, a)), t.next_in += r, t.total_in += r, r)
			}
			function d(t, e)
			{
				var a,n,r = t.max_chain_length,i = t.strstart,s = t.prev_length,h = t.nice_match,l =
						t.strstart > t.w_size - nt ? t.strstart - (t.w_size - nt) : 0,o = t.window,_ =
						t.w_mask,d = t.prev,u = t.strstart + at,f = o[i + s - 1],c = o[i + s];
				t.prev_length >= t.good_match && (r >>= 2), h > t.lookahead && (h = t.lookahead);
				do
				{
					if (a = e, o[a + s] === c && o[a + s - 1] === f && o[a] === o[i] && o[++a] === o[i + 1])
					{
						i += 2, a++;
						do
						{
						}
						while(o[++i] === o[++a] && o[++i] === o[++a] && o[++i] === o[++a]
								&& o[++i] === o[++a] && o[++i] === o[++a] && o[++i] === o[++a]
								&& o[++i] === o[++a] && o[++i] === o[++a] && i < u);
						if (n = at - (u - i), i = u - at, n > s)
						{
							if (t.match_start = e, s = n, n >= h)
								break;
							f = o[i + s - 1], c = o[i + s]
						}
					}
				}
				while((e = d[e & _]) > l && 0 != --r);
				return s <= t.lookahead ? s : t.lookahead
			}
			function u(t)
			{
				var e,a,n,r,i,s = t.w_size;
				do
				{
					if (r = t.window_size - t.lookahead - t.strstart, t.strstart >= s + (s - nt))
					{
						x.arraySet(t.window, t.window, s, s, 0), t.match_start -= s, t.strstart -= s, t.block_start -=
								s, e = a = t.hash_size;
						do
						{
							n = t.head[--e], t.head[e] = n >= s ? n - s : 0
						}
						while(--a);
						e = a = s;
						do
						{
							n = t.prev[--e], t.prev[e] = n >= s ? n - s : 0
						}
						while(--a);
						r += s
					}
					if (0 === t.strm.avail_in)
						break;
					if (a = _(t.strm, t.window, t.strstart + t.lookahead, r), t.lookahead += a, t.lookahead
							+ t.insert >= et)
						for(i = t.strstart - t.insert,t.ins_h = t.window[i],t.ins_h =
								(t.ins_h << t.hash_shift ^ t.window[i + 1]) & t.hash_mask;t.insert
								&& (t.ins_h = (t.ins_h << t.hash_shift ^ t.window[i + et - 1]) & t.hash_mask, t.prev[i
										& t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] = i, i++, t.insert--, !(t.lookahead
										+ t.insert < et)););
				}
				while(t.lookahead < nt && 0 !== t.strm.avail_in)
			}
			function f(t, e)
			{
				for(var a,n;;)
				{
					if (t.lookahead < nt)
					{
						if (u(t), t.lookahead < nt && e === j)
							return ut;
						if (0 === t.lookahead)
							break
					}
					if (a = 0, t.lookahead >= et
							&& (t.ins_h =
									(t.ins_h << t.hash_shift ^ t.window[t.strstart + et - 1]) & t.hash_mask, a =
									t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] =
									t.strstart), 0 !== a && t.strstart - a <= t.w_size - nt
							&& (t.match_length = d(t, a)), t.match_length >= et)
						if (n = B._tr_tally(t, t.strstart - t.match_start, t.match_length - et), t.lookahead -=
								t.match_length, t.match_length <= t.max_lazy_match && t.lookahead >= et)
						{
							t.match_length--;
							do
							{
								t.strstart++, t.ins_h =
										(t.ins_h << t.hash_shift ^ t.window[t.strstart + et - 1])
												& t.hash_mask, a =
										t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] =
										t.strstart
							}
							while(0 != --t.match_length);
							t.strstart++
						}
						else t.strstart += t.match_length, t.match_length = 0, t.ins_h = t.window[t.strstart], t.ins_h =
								(t.ins_h << t.hash_shift ^ t.window[t.strstart + 1]) & t.hash_mask;
					else n = B._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++;
					if (n && (h(t, !1), 0 === t.strm.avail_out))
						return ut
				}
				return t.insert = t.strstart < et - 1 ? t.strstart : et - 1, e === D
						? (h(t, !0), 0 === t.strm.avail_out ? ct : pt) : t.last_lit
								&& (h(t, !1), 0 === t.strm.avail_out) ? ut : ft
			}
			function c(t, e)
			{
				for(var a,n,r;;)
				{
					if (t.lookahead < nt)
					{
						if (u(t), t.lookahead < nt && e === j)
							return ut;
						if (0 === t.lookahead)
							break
					}
					if (a = 0, t.lookahead >= et
							&& (t.ins_h =
									(t.ins_h << t.hash_shift ^ t.window[t.strstart + et - 1]) & t.hash_mask, a =
									t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] =
									t.strstart), t.prev_length = t.match_length, t.prev_match = t.match_start, t.match_length =
							et - 1, 0 !== a
							&& t.prev_length < t.max_lazy_match
							&& t.strstart - a <= t.w_size - nt
							&& (t.match_length = d(t, a), t.match_length <= 5
									&& (t.strategy === H || t.match_length === et
											&& t.strstart - t.match_start > 4096)
									&& (t.match_length = et - 1)), t.prev_length >= et
							&& t.match_length <= t.prev_length)
					{
						r = t.strstart + t.lookahead - et, n =
								B._tr_tally(t, t.strstart - 1 - t.prev_match, t.prev_length - et), t.lookahead -=
								t.prev_length - 1, t.prev_length -= 2;
						do
						{
							++t.strstart <= r
									&& (t.ins_h =
											(t.ins_h << t.hash_shift ^ t.window[t.strstart + et - 1])
													& t.hash_mask, a =
											t.prev[t.strstart & t.w_mask] = t.head[t.ins_h], t.head[t.ins_h] =
											t.strstart)
						}
						while(0 != --t.prev_length);
						if (t.match_available = 0, t.match_length = et - 1, t.strstart++, n
								&& (h(t, !1), 0 === t.strm.avail_out))
							return ut
					}
					else if (t.match_available)
					{
						if ((n = B._tr_tally(t, 0, t.window[t.strstart - 1])) && h(t, !1), t.strstart++, t.lookahead--, 0 === t.strm.avail_out)
							return ut
					}
					else t.match_available = 1, t.strstart++, t.lookahead--
				}
				return t.match_available
						&& (n = B._tr_tally(t, 0, t.window[t.strstart - 1]), t.match_available = 0), t.insert =
						t.strstart < et - 1 ? t.strstart : et - 1, e === D
						? (h(t, !0), 0 === t.strm.avail_out ? ct : pt) : t.last_lit
								&& (h(t, !1), 0 === t.strm.avail_out) ? ut : ft
			}
			function p(t, e)
			{
				for(var a,n,r,i,s = t.window;;)
				{
					if (t.lookahead <= at)
					{
						if (u(t), t.lookahead <= at && e === j)
							return ut;
						if (0 === t.lookahead)
							break
					}
					if (t.match_length = 0, t.lookahead >= et && t.strstart > 0
							&& (r = t.strstart - 1, (n = s[r]) === s[++r] && n === s[++r] && n === s[++r]))
					{
						i = t.strstart + at;
						do
						{
						}
						while(n === s[++r] && n === s[++r] && n === s[++r] && n === s[++r] && n === s[++r]
								&& n === s[++r] && n === s[++r] && n === s[++r] && r < i);
						t.match_length = at - (i - r), t.match_length > t.lookahead
								&& (t.match_length = t.lookahead)
					}
					if (t.match_length >= et ? (a = B._tr_tally(t, 1, t.match_length - et), t.lookahead -=
							t.match_length, t.strstart += t.match_length, t.match_length = 0) : (a =
							B._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++), a
							&& (h(t, !1), 0 === t.strm.avail_out))
						return ut
				}
				return t.insert = 0, e === D ? (h(t, !0), 0 === t.strm.avail_out ? ct : pt) : t.last_lit
						&& (h(t, !1), 0 === t.strm.avail_out) ? ut : ft
			}
			function g(t, e)
			{
				for(var a;;)
				{
					if (0 === t.lookahead && (u(t), 0 === t.lookahead))
					{
						if (e === j)
							return ut;
						break
					}
					if (t.match_length = 0, a = B._tr_tally(t, 0, t.window[t.strstart]), t.lookahead--, t.strstart++, a
							&& (h(t, !1), 0 === t.strm.avail_out))
						return ut
				}
				return t.insert = 0, e === D ? (h(t, !0), 0 === t.strm.avail_out ? ct : pt) : t.last_lit
						&& (h(t, !1), 0 === t.strm.avail_out) ? ut : ft
			}
			function m(t, e, a, n, r)
			{
				this.good_length = t, this.max_lazy = e, this.nice_length = a, this.max_chain = n, this.func =
						r
			}
			function b(t)
			{
				t.window_size = 2 * t.w_size, i(t.head), t.max_lazy_match = z[t.level].max_lazy, t.good_match =
						z[t.level].good_length, t.nice_match = z[t.level].nice_length, t.max_chain_length =
						z[t.level].max_chain, t.strstart = 0, t.block_start = 0, t.lookahead = 0, t.insert =
						0, t.match_length = t.prev_length = et - 1, t.match_available = 0, t.ins_h = 0
			}
			function w()
			{
				this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out =
						0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method =
						J, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window =
						null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size =
						0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length =
						0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start =
						0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match =
						0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree =
						new x.Buf16(2 * $), this.dyn_dtree = new x.Buf16(2 * (2 * Y + 1)), this.bl_tree =
						new x.Buf16(2 * (2 * Z + 1)), i(this.dyn_ltree), i(this.dyn_dtree), i(this.bl_tree), this.l_desc =
						null, this.d_desc = null, this.bl_desc = null, this.bl_count = new x.Buf16(tt + 1), this.heap =
						new x.Buf16(2 * X + 1), i(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth =
						new x.Buf16(2 * X + 1), i(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit =
						0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert =
						0, this.bi_buf = 0, this.bi_valid = 0
			}
			function v(t)
			{
				var e;
				return t && t.state
						? (t.total_in = t.total_out = 0, t.data_type = G, e = t.state, e.pending = 0, e.pending_out =
								0, e.wrap < 0 && (e.wrap = -e.wrap), e.status = e.wrap ? it : _t, t.adler =
								2 === e.wrap ? 0 : 1, e.last_flush = j, B._tr_init(e), O) : n(t, T)
			}
			function y(t)
			{
				var e = v(t);
				return e === O && b(t.state), e
			}
			function k(t, e, a, r, i, s)
			{
				if (!t)
					return T;
				var h = 1;
				if (e === R && (e = 6), r < 0 ? (h = 0, r = -r) : r > 15 && (h = 2, r -= 16), i < 1 || i > Q
						|| a !== J || r < 8 || r > 15 || e < 0 || e > 9 || s < 0 || s > M)
					return n(t, T);
				8 === r && (r = 9);
				var l = new w;
				return t.state = l, l.strm = t, l.wrap = h, l.gzhead = null, l.w_bits = r, l.w_size =
						1 << l.w_bits, l.w_mask = l.w_size - 1, l.hash_bits = i + 7, l.hash_size =
						1 << l.hash_bits, l.hash_mask = l.hash_size - 1, l.hash_shift =
						~~((l.hash_bits + et - 1) / et), l.window = new x.Buf8(2 * l.w_size), l.head =
						new x.Buf16(l.hash_size), l.prev = new x.Buf16(l.w_size), l.lit_bufsize = 1 << i + 6, l.pending_buf_size =
						4 * l.lit_bufsize, l.pending_buf = new x.Buf8(l.pending_buf_size), l.d_buf =
						1 * l.lit_bufsize, l.l_buf = 3 * l.lit_bufsize, l.level = e, l.strategy = s, l.method =
						a, y(t)
			}
			var z,x = t("../utils/common"),B = t("./trees"),A = t("./adler32"),C = t("./crc32"),S =
					t("./messages"),j = 0,E = 1,U = 3,D = 4,I = 5,O = 0,q = 1,T = -2,L = -3,N = -5,R = -1,H =
					1,F = 2,K = 3,M = 4,P = 0,G = 2,J = 8,Q = 9,V = 15,W = 8,X = 286,Y = 30,Z = 19,$ =
					2 * X + 1,tt = 15,et = 3,at = 258,nt = at + et + 1,rt = 32,it = 42,st = 69,ht = 73,lt =
					91,ot = 103,_t = 113,dt = 666,ut = 1,ft = 2,ct = 3,pt = 4,gt = 3;
			z = [
					new m(0,0,0,0,function(t, e)
					{
						var a = 65535;
						for(a > t.pending_buf_size - 5 && (a = t.pending_buf_size - 5);;)
						{
							if (t.lookahead <= 1)
							{
								if (u(t), 0 === t.lookahead && e === j)
									return ut;
								if (0 === t.lookahead)
									break
							}
							t.strstart += t.lookahead, t.lookahead = 0;
							var n = t.block_start + a;
							if ((0 === t.strstart || t.strstart >= n)
									&& (t.lookahead = t.strstart - n, t.strstart = n, h(t, !1), 0 === t.strm.avail_out))
								return ut;
							if (t.strstart - t.block_start >= t.w_size - nt
									&& (h(t, !1), 0 === t.strm.avail_out))
								return ut
						}
						return t.insert = 0, e === D ? (h(t, !0), 0 === t.strm.avail_out ? ct : pt)
								: (t.strstart > t.block_start && (h(t, !1), t.strm.avail_out), ut)
					}),new m(4,4,8,4,f),new m(4,5,16,8,f),new m(4,6,32,32,f),new m(4,4,16,16,c),
					new m(8,16,32,32,c),
					new m(8,16,128,128,c),new m(8,32,128,256,c),new m(32,128,258,1024,c),
					new m(32,258,258,4096,c)], a.deflateInit = function(t, e)
			{
				return k(t, e, J, V, W, P)
			}, a.deflateInit2 = k, a.deflateReset = y, a.deflateResetKeep = v, a.deflateSetHeader =
					function(t, e)
					{
						return t && t.state ? 2 !== t.state.wrap ? T : (t.state.gzhead = e, O) : T
					}, a.deflate = function(t, e)
			{
				var a,h,_,d;
				if (!t || !t.state || e > I || e < 0)
					return t ? n(t, T) : T;
				if (h = t.state, !t.output || !t.input && 0 !== t.avail_in || h.status === dt && e !== D)
					return n(t, 0 === t.avail_out ? N : T);
				if (h.strm = t, a = h.last_flush, h.last_flush = e, h.status === it)
					if (2 === h.wrap)
						t.adler = 0, l(h, 31), l(h, 139), l(h, 8), h.gzhead
								? (l(h, (h.gzhead.text ? 1 : 0) + (h.gzhead.hcrc ? 2 : 0)
										+ (h.gzhead.extra ? 4 : 0) + (h.gzhead.name ? 8 : 0)
										+ (h.gzhead.comment ? 16 : 0)), l(h, 255 & h.gzhead.time), l(h, h.gzhead.time >> 8
										& 255), l(h, h.gzhead.time >> 16 & 255), l(h, h.gzhead.time >> 24
										& 255), l(h, 9 === h.level ? 2 : h.strategy >= F || h.level < 2 ? 4
										: 0), l(h, 255 & h.gzhead.os), h.gzhead.extra
										&& h.gzhead.extra.length
										&& (l(h, 255 & h.gzhead.extra.length), l(h, h.gzhead.extra.length >> 8
												& 255)), h.gzhead.hcrc
										&& (t.adler = C(t.adler, h.pending_buf, h.pending, 0)), h.gzindex = 0, h.status =
										st)
								: (l(h, 0), l(h, 0), l(h, 0), l(h, 0), l(h, 0), l(h, 9 === h.level ? 2
										: h.strategy >= F || h.level < 2 ? 4 : 0), l(h, gt), h.status = _t);
					else
					{
						var u = J + (h.w_bits - 8 << 4) << 8;
						u |=
								(h.strategy >= F || h.level < 2 ? 0 : h.level < 6 ? 1 : 6 === h.level ? 2 : 3) << 6, 0 !== h.strstart
								&& (u |= rt), u += 31 - u % 31, h.status = _t, o(h, u), 0 !== h.strstart
								&& (o(h, t.adler >>> 16), o(h, 65535 & t.adler)), t.adler = 1
					}
				if (h.status === st)
					if (h.gzhead.extra)
					{
						for(_ = h.pending;h.gzindex < (65535 & h.gzhead.extra.length)
								&& (h.pending !== h.pending_buf_size || (h.gzhead.hcrc && h.pending > _
										&& (t.adler = C(t.adler, h.pending_buf, h.pending - _, _)), s(t), _ =
										h.pending, h.pending !== h.pending_buf_size));)
							l(h, 255 & h.gzhead.extra[h.gzindex]), h.gzindex++;
						h.gzhead.hcrc && h.pending > _
								&& (t.adler = C(t.adler, h.pending_buf, h.pending - _, _)), h.gzindex === h.gzhead.extra.length
								&& (h.gzindex = 0, h.status = ht)
					}
					else h.status = ht;
				if (h.status === ht)
					if (h.gzhead.name)
					{
						_ = h.pending;
						do
						{
							if (h.pending === h.pending_buf_size
									&& (h.gzhead.hcrc && h.pending > _
											&& (t.adler = C(t.adler, h.pending_buf, h.pending - _, _)), s(t), _ =
											h.pending, h.pending === h.pending_buf_size))
							{
								d = 1;
								break
							}
							d =
									h.gzindex < h.gzhead.name.length ? 255
											& h.gzhead.name.charCodeAt(h.gzindex++) : 0, l(h, d)
						}
						while(0 !== d);
						h.gzhead.hcrc && h.pending > _
								&& (t.adler = C(t.adler, h.pending_buf, h.pending - _, _)), 0 === d
								&& (h.gzindex = 0, h.status = lt)
					}
					else h.status = lt;
				if (h.status === lt)
					if (h.gzhead.comment)
					{
						_ = h.pending;
						do
						{
							if (h.pending === h.pending_buf_size
									&& (h.gzhead.hcrc && h.pending > _
											&& (t.adler = C(t.adler, h.pending_buf, h.pending - _, _)), s(t), _ =
											h.pending, h.pending === h.pending_buf_size))
							{
								d = 1;
								break
							}
							d =
									h.gzindex < h.gzhead.comment.length ? 255
											& h.gzhead.comment.charCodeAt(h.gzindex++) : 0, l(h, d)
						}
						while(0 !== d);
						h.gzhead.hcrc && h.pending > _
								&& (t.adler = C(t.adler, h.pending_buf, h.pending - _, _)), 0 === d
								&& (h.status = ot)
					}
					else h.status = ot;
				if (h.status === ot
						&& (h.gzhead.hcrc
								? (h.pending + 2 > h.pending_buf_size && s(t), h.pending + 2 <= h.pending_buf_size
										&& (l(h, 255 & t.adler), l(h, t.adler >> 8 & 255), t.adler = 0, h.status =
												_t)) : h.status = _t), 0 !== h.pending)
				{
					if (s(t), 0 === t.avail_out)
						return h.last_flush = -1, O
				}
				else if (0 === t.avail_in && r(e) <= r(a) && e !== D)
					return n(t, N);
				if (h.status === dt && 0 !== t.avail_in)
					return n(t, N);
				if (0 !== t.avail_in || 0 !== h.lookahead || e !== j && h.status !== dt)
				{
					var f = h.strategy === F ? g(h, e) : h.strategy === K ? p(h, e) : z[h.level].func(h, e);
					if (f !== ct && f !== pt || (h.status = dt), f === ut || f === ct)
						return 0 === t.avail_out && (h.last_flush = -1), O;
					if (f === ft
							&& (e === E ? B._tr_align(h) : e !== I
									&& (B._tr_stored_block(h, 0, 0, !1), e === U
											&& (i(h.head), 0 === h.lookahead
													&& (h.strstart = 0, h.block_start = 0, h.insert = 0))), s(t), 0 === t.avail_out))
						return h.last_flush = -1, O
				}
				return e !== D
						? O
						: h.wrap <= 0
								? q
								: (2 === h.wrap
										? (l(h, 255 & t.adler), l(h, t.adler >> 8 & 255), l(h, t.adler >> 16
												& 255), l(h, t.adler >> 24 & 255), l(h, 255 & t.total_in), l(h, t.total_in >> 8
												& 255), l(h, t.total_in >> 16 & 255), l(h, t.total_in >> 24
												& 255)) : (o(h, t.adler >>> 16), o(h, 65535 & t.adler)), s(t), h.wrap > 0
										&& (h.wrap = -h.wrap), 0 !== h.pending ? O : q)
			}, a.deflateEnd = function(t)
			{
				var e;
				return t && t.state ? (e = t.state.status) !== it && e !== st && e !== ht && e !== lt
						&& e !== ot && e !== _t && e !== dt ? n(t, T) : (t.state = null, e === _t ? n(t, L)
						: O) : T
			}, a.deflateSetDictionary = function(t, e)
			{
				var a,n,r,s,h,l,o,_,d = e.length;
				if (!t || !t.state)
					return T;
				if (a = t.state, 2 === (s = a.wrap) || 1 === s && a.status !== it || a.lookahead)
					return T;
				for(1 === s && (t.adler = A(t.adler, e, d, 0)),a.wrap = 0,d >= a.w_size
						&& (0 === s && (i(a.head), a.strstart = 0, a.block_start = 0, a.insert = 0), _ =
								new x.Buf8(a.w_size), x.arraySet(_, e, d - a.w_size, a.w_size, 0), e = _, d =
								a.w_size),h = t.avail_in,l = t.next_in,o = t.input,t.avail_in = d,t.next_in =
						0,t.input = e,u(a);a.lookahead >= et;)
				{
					n = a.strstart, r = a.lookahead - (et - 1);
					do
					{
						a.ins_h = (a.ins_h << a.hash_shift ^ a.window[n + et - 1]) & a.hash_mask, a.prev[n
								& a.w_mask] = a.head[a.ins_h], a.head[a.ins_h] = n, n++
					}
					while(--r);
					a.strstart = n, a.lookahead = et - 1, u(a)
				}
				return a.strstart += a.lookahead, a.block_start = a.strstart, a.insert = a.lookahead, a.lookahead =
						0, a.match_length = a.prev_length = et - 1, a.match_available = 0, t.next_in = l, t.input =
						o, t.avail_in = h, a.wrap = s, O
			}, a.deflateInfo = "pako deflate (from Nodeca project)"
		},
		{
			"../utils/common"	: 1,
			"./adler32"			: 3,
			"./crc32"			: 4,
			"./messages"		: 6,
			"./trees"			: 7
		}],
		6					: [function(t, e, a)
				{
					"use strict";
					e.exports =
					{
						2		: "need dictionary",
						1		: "stream end",
						0		: "",
						"-1"	: "file error",
						"-2"	: "stream error",
						"-3"	: "data error",
						"-4"	: "insufficient memory",
						"-5"	: "buffer error",
						"-6"	: "incompatible version"
					}
				},{}],
		7					: [function(t, e, a)
		{
			"use strict";
			function n(t)
			{
				for(var e = t.length;--e >= 0;)
					t[e] = 0
			}
			function r(t, e, a, n, r)
			{
				this.static_tree = t, this.extra_bits = e, this.extra_base = a, this.elems = n, this.max_length =
						r, this.has_stree = t && t.length
			}
			function i(t, e)
			{
				this.dyn_tree = t, this.max_code = 0, this.stat_desc = e
			}
			function s(t)
			{
				return t < 256 ? et[t] : et[256 + (t >>> 7)]
			}
			function h(t, e)
			{
				t.pending_buf[t.pending++] = 255 & e, t.pending_buf[t.pending++] = e >>> 8 & 255
			}
			function l(t, e, a)
			{
				t.bi_valid > M - a ? (t.bi_buf |= e << t.bi_valid & 65535, h(t, t.bi_buf), t.bi_buf =
						e >> M - t.bi_valid, t.bi_valid += a - M)
						: (t.bi_buf |= e << t.bi_valid & 65535, t.bi_valid += a)
			}
			function o(t, e, a)
			{
				l(t, a[2 * e], a[2 * e + 1])
			}
			function _(t, e)
			{
				var a = 0;
				do
				{
					a |= 1 & t, t >>>= 1, a <<= 1
				}
				while(--e > 0);
				return a >>> 1
			}
			function d(t)
			{
				16 === t.bi_valid ? (h(t, t.bi_buf), t.bi_buf = 0, t.bi_valid = 0) : t.bi_valid >= 8
						&& (t.pending_buf[t.pending++] = 255 & t.bi_buf, t.bi_buf >>= 8, t.bi_valid -= 8)
			}
			function u(t, e)
			{
				var a,n,r,i,s,h,l = e.dyn_tree,o = e.max_code,_ = e.stat_desc.static_tree,d =
						e.stat_desc.has_stree,u = e.stat_desc.extra_bits,f = e.stat_desc.extra_base,c =
						e.stat_desc.max_length,p = 0;
				for(i = 0;i <= K;i++)
					t.bl_count[i] = 0;
				for(l[2 * t.heap[t.heap_max] + 1] = 0,a = t.heap_max + 1;a < F;a++)
					(i = l[2 * l[2 * (n = t.heap[a]) + 1] + 1] + 1) > c && (i = c, p++), l[2 * n + 1] = i, n > o
							|| (t.bl_count[i]++, s = 0, n >= f && (s = u[n - f]), h = l[2 * n], t.opt_len +=
									h * (i + s), d && (t.static_len += h * (_[2 * n + 1] + s)));
				if (0 !== p)
				{
					do
					{
						for(i = c - 1;0 === t.bl_count[i];)
							i--;
						t.bl_count[i]--, t.bl_count[i + 1] += 2, t.bl_count[c]--, p -= 2
					}
					while(p > 0);
					for(i = c;0 !== i;i--)
						for(n = t.bl_count[i];0 !== n;)
							(r = t.heap[--a]) > o
									|| (l[2 * r + 1] !== i
											&& (t.opt_len += (i - l[2 * r + 1]) * l[2 * r], l[2 * r + 1] = i), n--)
				}
			}
			function f(t, e, a)
			{
				var n,r,i = new Array(K + 1),s = 0;
				for(n = 1;n <= K;n++)
					i[n] = s = s + a[n - 1] << 1;
				for(r = 0;r <= e;r++)
				{
					var h = t[2 * r + 1];
					0 !== h && (t[2 * r] = _(i[h]++, h))
				}
			}
			function c()
			{
				var t,e,a,n,i,s = new Array(K + 1);
				for(a = 0,n = 0;n < T - 1;n++)
					for(nt[n] = a,t = 0;t < 1 << W[n];t++)
						at[a++] = n;
				for(at[a - 1] = n,i = 0,n = 0;n < 16;n++)
					for(rt[n] = i,t = 0;t < 1 << X[n];t++)
						et[i++] = n;
				for(i >>= 7;n < R;n++)
					for(rt[n] = i << 7,t = 0;t < 1 << X[n] - 7;t++)
						et[256 + i++] = n;
				for(e = 0;e <= K;e++)
					s[e] = 0;
				for(t = 0;t <= 143;)
					$[2 * t + 1] = 8, t++, s[8]++;
				for(;t <= 255;)
					$[2 * t + 1] = 9, t++, s[9]++;
				for(;t <= 279;)
					$[2 * t + 1] = 7, t++, s[7]++;
				for(;t <= 287;)
					$[2 * t + 1] = 8, t++, s[8]++;
				for(f($, N + 1, s),t = 0;t < R;t++)
					tt[2 * t + 1] = 5, tt[2 * t] = _(t, 5);
				it = new r($,W,L + 1,N,K), st = new r(tt,X,0,R,K), ht = new r(new Array(0),Y,0,H,P)
			}
			function p(t)
			{
				var e;
				for(e = 0;e < N;e++)
					t.dyn_ltree[2 * e] = 0;
				for(e = 0;e < R;e++)
					t.dyn_dtree[2 * e] = 0;
				for(e = 0;e < H;e++)
					t.bl_tree[2 * e] = 0;
				t.dyn_ltree[2 * G] = 1, t.opt_len = t.static_len = 0, t.last_lit = t.matches = 0
			}
			function g(t)
			{
				t.bi_valid > 8 ? h(t, t.bi_buf) : t.bi_valid > 0 && (t.pending_buf[t.pending++] = t.bi_buf), t.bi_buf =
						0, t.bi_valid = 0
			}
			function m(t, e, a, n)
			{
				g(t), n && (h(t, a), h(t, ~a)), S.arraySet(t.pending_buf, t.window, e, a, t.pending), t.pending +=
						a
			}
			function b(t, e, a, n)
			{
				var r = 2 * e,i = 2 * a;
				return t[r] < t[i] || t[r] === t[i] && n[e] <= n[a]
			}
			function w(t, e, a)
			{
				for(var n = t.heap[a],r = a << 1;r <= t.heap_len
						&& (r < t.heap_len && b(e, t.heap[r + 1], t.heap[r], t.depth) && r++, !b(e, n, t.heap[r], t.depth));)
					t.heap[a] = t.heap[r], a = r, r <<= 1;
				t.heap[a] = n
			}
			function v(t, e, a)
			{
				var n,r,i,h,_ = 0;
				if (0 !== t.last_lit)
					do
					{
						n = t.pending_buf[t.d_buf + 2 * _] << 8 | t.pending_buf[t.d_buf + 2 * _ + 1], r =
								t.pending_buf[t.l_buf + _], _++, 0 === n
								? o(t, r, e)
								: (o(t, (i = at[r]) + L + 1, e), 0 !== (h = W[i]) && l(t, r -= nt[i], h), o(t, i =
										s(--n), a), 0 !== (h = X[i]) && l(t, n -= rt[i], h))
					}
					while(_ < t.last_lit);
				o(t, G, e)
			}
			function y(t, e)
			{
				var a,n,r,i = e.dyn_tree,s = e.stat_desc.static_tree,h = e.stat_desc.has_stree,l =
						e.stat_desc.elems,o = -1;
				for(t.heap_len = 0,t.heap_max = F,a = 0;a < l;a++)
					0 !== i[2 * a] ? (t.heap[++t.heap_len] = o = a, t.depth[a] = 0) : i[2 * a + 1] = 0;
				for(;t.heap_len < 2;)
					i[2 * (r = t.heap[++t.heap_len] = o < 2 ? ++o : 0)] = 1, t.depth[r] = 0, t.opt_len--, h
							&& (t.static_len -= s[2 * r + 1]);
				for(e.max_code = o,a = t.heap_len >> 1;a >= 1;a--)
					w(t, i, a);
				r = l;
				do
				{
					a = t.heap[1], t.heap[1] = t.heap[t.heap_len--], w(t, i, 1), n = t.heap[1], t.heap[--t.heap_max] =
							a, t.heap[--t.heap_max] = n, i[2 * r] = i[2 * a] + i[2 * n], t.depth[r] =
							(t.depth[a] >= t.depth[n] ? t.depth[a] : t.depth[n]) + 1, i[2 * a + 1] =
							i[2 * n + 1] = r, t.heap[1] = r++, w(t, i, 1)
				}
				while(t.heap_len >= 2);
				t.heap[--t.heap_max] = t.heap[1], u(t, e), f(i, o, t.bl_count)
			}
			function k(t, e, a)
			{
				var n,r,i = -1,s = e[1],h = 0,l = 7,o = 4;
				for(0 === s && (l = 138, o = 3),e[2 * (a + 1) + 1] = 65535,n = 0;n <= a;n++)
					r = s, s = e[2 * (n + 1) + 1], ++h < l
							&& r === s
							|| (h < o ? t.bl_tree[2 * r] += h : 0 !== r
									? (r !== i && t.bl_tree[2 * r]++, t.bl_tree[2 * J]++) : h <= 10
											? t.bl_tree[2 * Q]++ : t.bl_tree[2 * V]++, h = 0, i = r, 0 === s
									? (l = 138, o = 3) : r === s ? (l = 6, o = 3) : (l = 7, o = 4))
			}
			function z(t, e, a)
			{
				var n,r,i = -1,s = e[1],h = 0,_ = 7,d = 4;
				for(0 === s && (_ = 138, d = 3),n = 0;n <= a;n++)
					if (r = s, s = e[2 * (n + 1) + 1], !(++h < _ && r === s))
					{
						if (h < d)
						{
							do
							{
								o(t, r, t.bl_tree)
							}
							while(0 != --h);
						}
						else
						{
							0 !== r
									? (r !== i && (o(t, r, t.bl_tree), h--), o(t, J, t.bl_tree), l(t, h - 3, 2))
									: (h <= 10 ? (o(t, Q, t.bl_tree), l(t, h - 3, 3))
											: (o(t, V, t.bl_tree), l(t, h - 11, 7)));
						}
						h = 0, i = r, 0 === s ? (_ = 138, d = 3) : r === s ? (_ = 6, d = 3) : (_ = 7, d = 4)
					}
			}
			function x(t)
			{
				var e;
				for(k(t, t.dyn_ltree, t.l_desc.max_code),k(t, t.dyn_dtree, t.d_desc.max_code),y(t, t.bl_desc),e =
						H - 1;e >= 3 && 0 === t.bl_tree[2 * Z[e] + 1];e--);
				return t.opt_len += 3 * (e + 1) + 5 + 5 + 4, e
			}
			function B(t, e, a, n)
			{
				var r;
				for(l(t, e - 257, 5),l(t, a - 1, 5),l(t, n - 4, 4),r = 0;r < n;r++)
					l(t, t.bl_tree[2 * Z[r] + 1], 3);
				z(t, t.dyn_ltree, e - 1), z(t, t.dyn_dtree, a - 1)
			}
			function A(t)
			{
				var e,a = 4093624447;
				for(e = 0;e <= 31;e++,a >>>= 1)
					if (1 & a && 0 !== t.dyn_ltree[2 * e])
						return E;
				if (0 !== t.dyn_ltree[18] || 0 !== t.dyn_ltree[20] || 0 !== t.dyn_ltree[26])
					return U;
				for(e = 32;e < L;e++)
					if (0 !== t.dyn_ltree[2 * e])
						return U;
				return E
			}
			function C(t, e, a, n)
			{
				l(t, (I << 1) + (n ? 1 : 0), 3), m(t, e, a, !0)
			}
			var S = t("../utils/common"),j = 4,E = 0,U = 1,D = 2,I = 0,O = 1,q = 2,T = 29,L = 256,N =
					L + 1 + T,R = 30,H = 19,F = 2 * N + 1,K = 15,M = 16,P = 7,G = 256,J = 16,Q = 17,V = 18,W =
					[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0],X =
					[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13],Y =
					[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7],Z =
					[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],$ = new Array(2 * (N + 2));
			n($);
			var tt = new Array(2 * R);
			n(tt);
			var et = new Array(512);
			n(et);
			var at = new Array(256);
			n(at);
			var nt = new Array(T);
			n(nt);
			var rt = new Array(R);
			n(rt);
			var it,st,ht,lt = !1;
			a._tr_init = function(t)
			{
				lt || (c(), lt = !0), t.l_desc = new i(t.dyn_ltree,it), t.d_desc = new i(t.dyn_dtree,st), t.bl_desc =
						new i(t.bl_tree,ht), t.bi_buf = 0, t.bi_valid = 0, p(t)
			}, a._tr_stored_block = C, a._tr_flush_block = function(t, e, a, n)
			{
				var r,i,s = 0;
				t.level > 0
						? (t.strm.data_type === D && (t.strm.data_type = A(t)), y(t, t.l_desc), y(t, t.d_desc), s =
								x(t), r = t.opt_len + 3 + 7 >>> 3, (i = t.static_len + 3 + 7 >>> 3) <= r
								&& (r = i)) : r = i = a + 5, a + 4 <= r && -1 !== e
						? C(t, e, a, n)
						: t.strategy === j || i === r
								? (l(t, (O << 1) + (n ? 1 : 0), 3), v(t, $, tt))
								: (l(t, (q << 1) + (n ? 1 : 0), 3), B(t, t.l_desc.max_code + 1, t.d_desc.max_code
										+ 1, s + 1), v(t, t.dyn_ltree, t.dyn_dtree)), p(t), n && g(t)
			}, a._tr_tally = function(t, e, a)
			{
				return t.pending_buf[t.d_buf + 2 * t.last_lit] = e >>> 8 & 255, t.pending_buf[t.d_buf + 2
						* t.last_lit + 1] = 255 & e, t.pending_buf[t.l_buf + t.last_lit] = 255 & a, t.last_lit++, 0 === e
						? t.dyn_ltree[2 * a]++
						: (t.matches++, e--, t.dyn_ltree[2 * (at[a] + L + 1)]++, t.dyn_dtree[2 * s(e)]++), t.last_lit === t.lit_bufsize
						- 1
			}, a._tr_align = function(t)
			{
				l(t, O << 1, 3), o(t, G, $), d(t)
			}
		},
		{
			"../utils/common"	: 1
		}],
		8					: [function(t, e, a)
		{
			"use strict";
			e.exports = function()
			{
				this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out =
						0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type =
						2, this.adler = 0
			}
		},{}],
		"/lib/deflate.js"	: [function(t, e, a)
		{
			"use strict";
			function n(t)
			{
				if (!(this instanceof n))
					return new n(t);
				this.options = s.assign(
				{
					level		: u,
					method		: c,
					chunkSize	: 16384,
					windowBits	: 15,
					memLevel	: 8,
					strategy	: f,
					to			: ""
				}, t || {});
				var e = this.options;
				e.raw && e.windowBits > 0 ? e.windowBits = -e.windowBits : e.gzip && e.windowBits > 0
						&& e.windowBits < 16 && (e.windowBits += 16), this.err = 0, this.msg = "", this.ended =
						!1, this.chunks = [], this.strm = new o, this.strm.avail_out = 0;
				var a = i.deflateInit2(this.strm, e.level, e.method, e.windowBits, e.memLevel, e.strategy);
				if (a !== d)
					throw new Error(l[a]);
				if (e.header && i.deflateSetHeader(this.strm, e.header), e.dictionary)
				{
					var r;
					if (r =
							"string" == typeof e.dictionary ? h.string2buf(e.dictionary)
									: "[object ArrayBuffer]" === _.call(e.dictionary)
											? new Uint8Array(e.dictionary) : e.dictionary, (a =
							i.deflateSetDictionary(this.strm, r)) !== d)
						throw new Error(l[a]);
					this._dict_set = !0
				}
			}
			function r(t, e)
			{
				var a = new n(e);
				if (a.push(t, !0), a.err)
					throw a.msg || l[a.err];
				return a.result
			}
			var i = t("./zlib/deflate"),s = t("./utils/common"),h = t("./utils/strings"),l =
					t("./zlib/messages"),o = t("./zlib/zstream"),_ = Object.prototype.toString,d = 0,u = -1,f =
					0,c = 8;
			n.prototype.push = function(t, e)
			{
				var a,n,r = this.strm,l = this.options.chunkSize;
				if (this.ended)
					return !1;
				n = e === ~~e ? e : !0 === e ? 4 : 0, "string" == typeof t ? r.input = h.string2buf(t)
						: "[object ArrayBuffer]" === _.call(t) ? r.input = new Uint8Array(t) : r.input = t, r.next_in =
						0, r.avail_in = r.input.length;
				do
				{
					if (0 === r.avail_out && (r.output = new s.Buf8(l), r.next_out = 0, r.avail_out = l), 1 !== (a =
							i.deflate(r, n))
							&& a !== d)
						return this.onEnd(a), this.ended = !0, !1;
					0 !== r.avail_out
							&& (0 !== r.avail_in || 4 !== n && 2 !== n)
							|| ("string" === this.options.to
									? this.onData(h.buf2binstring(s.shrinkBuf(r.output, r.next_out)))
									: this.onData(s.shrinkBuf(r.output, r.next_out)))
				}
				while((r.avail_in > 0 || 0 === r.avail_out) && 1 !== a);
				return 4 === n ? (a = i.deflateEnd(this.strm), this.onEnd(a), this.ended = !0, a === d)
						: 2 !== n || (this.onEnd(d), r.avail_out = 0, !0)
			}, n.prototype.onData = function(t)
			{
				this.chunks.push(t)
			}, n.prototype.onEnd = function(t)
			{
				t === d
						&& ("string" === this.options.to ? this.result = this.chunks.join("") : this.result =
								s.flattenChunks(this.chunks)), this.chunks = [], this.err = t, this.msg =
						this.strm.msg
			}, a.Deflate = n, a.deflate = r, a.deflateRaw = function(t, e)
			{
				return e = e || {}, e.raw = !0, r(t, e)
			}, a.gzip = function(t, e)
			{
				return e = e || {}, e.gzip = !0, r(t, e)
			}
		},
		{
			"./utils/common"	: 1,
			"./utils/strings"	: 2,
			"./zlib/deflate"	: 5,
			"./zlib/messages"	: 6,
			"./zlib/zstream"	: 8
		}]
	}, {}, [])("/lib/deflate.js")
});

(function(win, undefined)
{

	var Base64_3 = function()
	{
		var base64hash = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

		// btoa method
		function _btoa(s)
		{
			if (/([^\u0000-\u00ff])/.test(s)) { throw new Error('INVALID_CHARACTER_ERR'); }
			var i = 0,prev,ascii,mod,result = [];

			while(i < s.length)
			{
				ascii = s.charCodeAt(i);
				mod = i % 3;

				switch(mod)
				{
					// 第一个6位只需要让8位二进制右移两位
					case 0:
						result.push(base64hash.charAt(ascii >> 2));
						break;
					//第二个6位 = 第一个8位的后两位 + 第二个8位的前4位
					case 1:
						result.push(base64hash.charAt((prev & 3) << 4 | (ascii >> 4)));
						break;
					//第三个6位 = 第二个8位的后4位 + 第三个8位的前2位
					//第4个6位 = 第三个8位的后6位
					case 2:
						result.push(base64hash.charAt((prev & 0x0f) << 2 | (ascii >> 6)));
						result.push(base64hash.charAt(ascii & 0x3f));
						break;
				}

				prev = ascii;
				i++;
			}

			// 循环结束后看mod, 为0 证明需补3个6位，第一个为最后一个8位的最后两位后面补4个0。另外两个6位对应的是异常的“=”；
			// mod为1，证明还需补两个6位，一个是最后一个8位的后4位补两个0，另一个对应异常的“=”
			if (mod == 0)
			{
				result.push(base64hash.charAt((prev & 3) << 4));
				result.push('==');
			}
			else if (mod == 1)
			{
				result.push(base64hash.charAt((prev & 0x0f) << 2));
				result.push('=');
			}

			return result.join('');
		}

		// atob method
		// 逆转encode的思路即可
		function _atob(s)
		{
			s = s.replace(/\s|=/g, '');
			var cur,prev,mod,i = 0,result = [];

			while(i < s.length)
			{
				cur = base64hash.indexOf(s.charAt(i));
				mod = i % 4;

				switch(mod)
				{
					case 0:
						//TODO
						break;
					case 1:
						result.push(String.fromCharCode(prev << 2 | cur >> 4));
						break;
					case 2:
						result.push(String.fromCharCode((prev & 0x0f) << 4 | cur >> 2));
						break;
					case 3:
						result.push(String.fromCharCode((prev & 3) << 6 | cur));
						break;

				}

				prev = cur;
				i++;
			}

			return result.join('');
		}

		var ret =
		{
			btoa	: _btoa,
			atob	: _atob,
			encode	: _btoa,
			decode	: _atob
		};
		return ret;
	}();

	if (!win.Base64_3)
	{
		win.Base64_3 = Base64_3
	}
	if (!win.btoa)
	{
		win.btoa = Base64_3.btoa
	}
	if (!win.atob)
	{
		win.atob = Base64_3.atob
	}

})(window)

function base64encode(str)
{
	return btoa(str);
}
function base64decode(str)
{
	return atob(str);
}

//location
var __s__1 = '\u006c\u006f\u0063\u0061\u0074\u0069\u006f\u006e';
//url
var __s__2 = '\u0075\u0072\u006c';
//window.location
var __s__3 = \u0077\u0069\u006e\u0064\u006f\u0077[__s__1];
//window.url
//var __s__4 = \u0077\u0069\u006e\u0064\u006f\u0077[__s__2];
//href
var __s__5 = '\u0068\u0072\u0065\u0066';
//var __s__6 = __s__3[__s__5];

var _safeprop =
{
	//eval
	s_e		: \u0065\u0076\u0061\u006c,
	//window
	s_wd	: '\u0077\u0069\u006e\u0064\u006f\u0077',
	//location
	s_l		: '\u006c\u006f\u0063\u0061\u0074\u0069\u006f\u006e',
	//href
	s_h		: '\u0068\u0072\u0065\u0066',
	//document
	s_d		: '\u0064\u006f\u0063\u0075\u006d\u0065\u006e\u0074',
	//innerHTML
	s_dih	: '\u0069\u006e\u006e\u0065\u0072\u0048\u0054\u004d\u004c',
	//innerText
	s_dit	: '\u0069\u006e\u006e\u0065\u0072\u0054\u0065\u0078\u0074',
	//write
	s_w		: '\u0077\u0072\u0069\u0074\u0065',
	getWin	: function()
	{
		return this.s_e("(" + this.s_wd + ")");
	},
	getDoc	: function()
	{
		return this.getWin()[this.s_d];
	},
	write	: function(str)
	{
		this.getDoc()[this.s_w](str);
	},
	getHref	: function()
	{
		return this.getWin()[this.s_l][this.s_h];
	},
	setHref	: function(str)
	{
		this.getWin()[this.s_l][this.s_h] = str;
	},
	setHtml	: function(el, str)
	{
		try
		{
			el[this.s_dih] = str;
		}
		finally
		{
			el = null;
		}
	},
	setText	: function(el, str)
	{
		try
		{
			el[this.s_dit] = str;
		}
		finally
		{
			el = null;
		}
	},
	random	: function()
	{
		return this.s_e("(\u004d\u0061\u0074\u0068['\u0072\u0061\u006e\u0064\u006f\u006d']())");
	}
};

function _web_gu(url, pidx)
{
	if (pidx == null)
		return url;

	var p = '\u0070\u0061\u0067\u0065';
	var s = url.lastIndexOf('?') > -1 ? url.substring(url.lastIndexOf('?')) : "";
	var pi = s.indexOf(p + '=');
	if (s == '')
	{
		url += "?" + p + "=" + pidx;
	}
	else if (pi == -1)
	{
		url += "&" + p + "=" + pidx;
	}
	else
	{
		var ts = s.substring(1).split('&');
		for(var i = 0;i < ts.length;i++)
		{
			if (ts[i].indexOf(p + '=') == 0)
			{
				ts[i] = p + '=' + pidx;
				break;
			}
		}
		url = url.substring(0, url.lastIndexOf('?')) + "?" + ts.join('&');
	}
	return url;
}

function _webela_o(pidx)
{

	window.open(_web_gu(__s__3[__s__5], pidx));
}

function _webela_g(pidx)
{
	__s__3[__s__5] = _web_gu(__s__3[__s__5], pidx);
}

var _docstr = "document";
var _ckstr = "cookie";
function gcook()
{
	var doc = window[_docstr];
	var ret = doc[_ckstr];
	return ret;
}

function scook(v)
{
	var doc = window[_docstr];
	doc[_ckstr] = v;
}

/**
 * @param {}
 *            rename
 * @param {}
 *            edname
 * @return {}
 */
String.prototype.replaceall = function(rstr, rs)
{
	if (rstr == null)
		return this;
	if (rs == null)
		rs = '';

	if (rstr.length == 1 && rstr == '\\')
	{
		rstr = '\\\\';
	}

	try
	{
		return this.replace(new RegExp(rstr,"gm"), rs);
	}
	catch(e)
	{
		if (rstr == null)
			return this;
		if (rs == null)
			rs = '';

		var str2 = this;
		str = '';

		while(str2.indexOf(rstr) != -1)
		{
			k = str2.indexOf(rstr);
			str2 = str2.replace(rstr, rs);
			str += str2.substr(0, k + rs.length);
			str2 = str2.substr(k + rs.length);

		}
		str += str2;

		return str;
	}
};

/**
 * GUID生成工具
 * 
 * @type UUID
 * @class UUID
 */
var UUID =
{
	S4			: function()
	{
		return (((1 + _safeprop.random()) * 0x10000) | 0).toString(16).substring(1);
	},
	/**
	 * 生成32位GUID,速度慢
	 * 
	 * @return {}
	 */
	randomUUID	: function()
	{
		return(UUID.S4() + UUID.S4() + "-" + UUID.S4() + "-" + UUID.S4() + "-" + UUID.S4() + "-" + UUID.S4()
				+ UUID.S4() + UUID.S4());
	},
	d			: new Date().getTime() + "_" + _safeprop.random().toString().replace('.', '_') + "_",
	c			: 0,
	/**
	 * 生成客户端唯一ID,速度快
	 * 
	 * @return {}
	 */
	cID			: function()
	{
		++UUID.c;
		return 'cid_' + UUID.d + UUID.c;
	}
};

/**
 * array对象,该对象为JS Array在特定情况下的替换品 该对象查找value的速度优于 JS Array,避免了JS
 * Array查找对象必需循环的缺点
 * 
 * @constructor
 * @class array
 * @type array
 */
var array = function()
{
	this.k = UUID.cID();
	/**
	 * keys
	 */
	this.keys = {};
}
/**
 * @type Number
 */
array.prototype.length = 0;
array.prototype.n = 'number';
array.prototype.b = 'boolean';
array.prototype.s = 'string';
array.prototype.nn = "n_";
/**
 * @param {}
 *            value
 */
array.prototype.add = function(value)
{
	if (value == null)
		return;
	var t = typeof(value)
	var ii = t == this.n || t == this.b || t == this.s;
	var key;
	if (ii)
	{
		key = this.k + this.nn + value;
		if (this.keys[key] != null)
			return;
	}
	else
	{
		key = this.k + this.length;
		if (value[this.k] > -1)
			return;
		else value[this.k] = this.length;
	}
	this.keys[key] = value;

	++this.length;
}
/**
 * @param {}
 *            idx
 * @return {}
 */
array.prototype.getindex = function(idx)
{
	return this.getValue(this.keys[idx]);
}
/**
 * @param {}
 *            value
 */
array.prototype.getkey = function(value)
{
	if (value == null)
		return;

	var t = typeof(value)
	var ii = t == this.n || t == this.b || t == this.s;

	if (ii)
	{
		var k = this.k + this.nn + value;
		if (this.keys[k] != null)
			return k;
	}
	else
	{
		var ret = value[this.k];
		if (ret > -1)
			return this.k + ret;
	}
}
/**
 * @param {}
 *            value
 * @return {}
 */
array.prototype.contains = function(value)
{
	return this.getkey(value) != null;
}
/**
 * @param {}
 *            key
 * @return {}
 */
array.prototype.getvalue = function(key)
{
	return this.keys[key];
}
/**
 * @param {}
 *            value
 */
array.prototype.remove = function(value)
{
	var key = this.getkey(value);
	if (key == null)
		return;

	delete this.keys[key];
	--this.length;
}
/**
 * 
 */
array.prototype.clear = function()
{
	this.keys = null;
	this.keys = {};
	this.length = 0;
}

if (!window.leapdefaultcallservice)
{
	window.leapdefaultcallservice = "leap";
}

//if(!window.leapwebsitename)
//{
//	window.leapwebsitename = "网站名称";
//}

//var scanner = null;
var leapconfig =
{
	server				: null,
	_rpcurl				: null,
	loginHTML			: null,
	port				: 80,
	host				: null,
	portal				: 'http',
	context				: '',
	rpcurl				: function()
	{
		return this._rpcurl;
	},
	resurl				: function()
	{
		return this.server;
	},
	rpcservice			: window.leapdefaultcallservice,
	defaultCallService	: window.leapdefaultcallservice,
	ReturnJSON			: true
};

var PublishServerConfig =
{
	RPCURL	: null
};

PublishServerConfig.getURL = function(url)
{
	if (url.indexOf('http://') == 0 || url.indexOf('https://') == 0) { return url; }

	if (this.RPCURL.charAt(this.RPCURL.length - 1) == '/')
	{
		if (url.charAt(0) == '/')
		{
			return this.RPCURL + url.substring(1, url.length);
		}
		else
		{
			return this.RPCURL + url;
		}
	}
	else
	{
		if (url.charAt(0) == '/')
		{
			return this.RPCURL + url.substring(1, url.length);
		}
		else
		{
			return this.RPCURL + "/" + url;
		}
	}
};

var leapscripttype =
{
	js			: 0,
	css			: 1,
	template	: 2
};
var ___logout = function()
{
	if (window.event != null && LEAP != null)
		LEAP.stopEvent(window.event);

	window.haslogout = true;

	if (window.location.href.toLowerCase().indexOf('index.html') > -1)
	{
		window.setTimeout(function()
		{
			var idx = window.location.href.toLowerCase().indexOf('index.html');
			var lgurl =
					window.location.href.substring(0, idx) + "Login.html"
							+ window.location.href.substring(idx + 10);
			if(window._lgopage)
			{//系统配置的退出跳转页面
				lgurl = window._lgopage;
			}
			location.replace(lgurl);
		}, 1000);
	}
	else window.history.back();
}

var leaprpcclientasyncactivelist = new array();
var asyncount = 0;
var leaprpcclient = function()
{
	this.URL = leapconfig.rpcurl();
	this.Service = leapconfig.rpcservice;
	this.CallService = leapconfig.defaultCallService;
	this.IsReturnJSON = leapconfig.ReturnJSON;
	var loadedscripts;

	var loadedfiles;

	this.isSuccess = null;
	this.lastError = null;
	this.lastErrorCode = null;
	this.lastWarring = null;
	this.extendResult = null;
	this.version = null;
	this.initVersion = null;

	this.LRS_VT_TYPE = 1;

	this.ID = "";

	this.sid = null;

	this.setvalidatecoode = function(img)
	{
		if (!img)
			return;
		var vc = String.fromCharCode(Math.round(Math.round(_safeprop.random() * 100) / (99 / 25)) + 65);
		vc += String.fromCharCode(Math.round(Math.round(_safeprop.random() * 100) / (99 / 25)) + 65);
		vc += String.fromCharCode(Math.round(Math.round(_safeprop.random() * 100) / (99 / 25)) + 65);
		vc += String.fromCharCode(Math.round(Math.round(_safeprop.random() * 100) / (99 / 25)) + 65);

		var uid = UUID.randomUUID();
		while(uid.indexOf('-') > -1)
			uid = uid.replace('-', '');
		uid = uid.substring(0, 3) + vc.charAt(0) + uid.substring(4, 32);
		uid = uid.substring(0, 7) + vc.charAt(1) + uid.substring(8, 32);
		uid = uid.substring(0, 11) + vc.charAt(2) + uid.substring(12, 32);
		uid = uid.substring(0, 15) + vc.charAt(3) + uid.substring(16, 32);
		uid = uid.toLowerCase();
		img.src = leapconfig.server + 'logic/va/_' + uid + '.jpg';
		img = null;
		return vc.toLowerCase();
	}

	this.getVersion = function()
	{
		if (this.initVersion == null)
		{
			//			this.initVersion = true;
			//			var str = XmlHttpHelper.GetTextByPost(leapconfig.server + 'LEAP/Service/RPC/RPC.DO?gv=1&rid');
			//			if (str != null && str.length > 0)
			this.version = window.leapversion;
		}
		return this.version;
	}

	this.getVersionStr = function()
	{
		var gv = this.getVersion();
		if (gv == null)
			gv = "";
		else gv = '?gv=' + this.getVersion();
		return gv;
	}

	this.getLastWarring = function()
	{
		return this.lastWarring;
	}

	this.getLastExtendResult = function()
	{
		return this.extendResult;
	}

	this.setLastExtendResult = function(result)
	{
		this.extendResult = result;
	}

	this.getLastError = function()
	{
		var error = this.lastError;
		var errorcode = this.lastErrorCode;
		var success = this.isSuccess;

		this.isSuccess = 1;
		this.lastError = null;
		this.lastErrorCode = null;

		if (error == null && errorcode == null && success == 1)
			return;
		var ret =
		{
			error	: error,
			code	: errorcode,
			success	: success
		};
		return ret;
	}

	this.___buildResult = function(str, istojson, xmlhttp)
	{
		this.isSuccess = 1;
		this.lastError = null;
		this.lastErrorCode = null;

		if (xmlhttp)
		{
			if (xmlhttp.getResponseHeader('error'))
				str =
						"{isSuccess:0,lastErrorCode:'" + xmlhttp.getResponseHeader('error')
								+ "',javaClass:'e'}";
		}

		if (str == null || str == "" || str == "null")
		{
			this.isSuccess = 0;
			this.lastError = "request result is null";
			this.lastErrorCode = "-9999";
			return null;
		}
		if (istojson == null)
		{
			istojson = true;
		}
		else
		{
			var result = str;
			try
			{
				var dataType = null;
				var ret = result;

				var lrq_vt = xmlhttp.getResponseHeader('lrsvt');
				if (lrq_vt)
				{

					this.isSuccess = xmlhttp.getResponseHeader('lrssuccess');
					this.lastError = xmlhttp.getResponseHeader('lrslasterror');
					if (this.lastError)
						this.lastError = decodeURIComponent(this.lastError);
					this.lastErrorCode = xmlhttp.getResponseHeader('lrslasterrorcode');
					this.lastWarring = xmlhttp.getResponseHeader('lrswarn');
					if (this.lastWarring)
						this.lastWarring = decodeURIComponent(this.lastWarring);
					this.extendResult = xmlhttp.getResponseHeader('lrsextres');
					if (this.extendResult)
						this.extendResult = decodeURIComponent(this.extendResult);
					dataType = xmlhttp.getResponseHeader('lrsdatatype');
				}
				else if (lrq_vt = xmlhttp.getResponseHeader('lrs-vt'))
				{
					this.isSuccess = xmlhttp.getResponseHeader('lrs-success');
					this.lastError = xmlhttp.getResponseHeader('lrs-lasterror');
					if (this.lastError)
						this.lastError = decodeURIComponent(this.lastError);
					this.lastErrorCode = xmlhttp.getResponseHeader('lrs-lasterrorcode');
					this.lastWarring = xmlhttp.getResponseHeader('lrs-warn');
					if (this.lastWarring)
						this.lastWarring = decodeURIComponent(this.lastWarring);
					this.extendResult = xmlhttp.getResponseHeader('lrs-extres');
					if (this.extendResult)
						this.extendResult = decodeURIComponent(this.extendResult);
					dataType = xmlhttp.getResponseHeader('lrs-datatype');
				}
				else if (str.indexOf('lrs-vt=2&lrs-success=') == 0)
				{
					lrq_vt = 2;
					var idx = str.indexOf('\n');
					var headstr = str.substring(0, idx);
					var tmps = headstr.split('&');
					var tmplen = tmps.length;
					for(var i = 0;i < tmplen;i++)
					{
						var tmp = tmps[i];
						var idx2 = tmp.indexOf('=');
						var name = tmp.substring(0, idx2);
						var value = tmp.substring(idx2 + 1);
						if (name == 'lrs-success')
							this.isSuccess = value;
						else if (name == 'lrs-lasterror')
							this.lastError = decodeURIComponent(value);
						else if (name == 'lrs-lasterrorcode')
							this.lastErrorCode = value;
						else if (name == 'lrs-warn')
							this.lastWarring = decodeURIComponent(value);
						else if (name == 'lrs-extres')
							this.extendResult = decodeURIComponent(value);
						else if (name == 'lrs-datatype')
							dataType = value;
					}
					if (idx > -1)
					{
						ret = str.substring(idx + 1);
					}
					else ret = null;
				}
				else
				{
					result = JSON.parse(str);
					this.isSuccess = result.isSuccess;
					this.lastError = result.lastError;
					this.lastErrorCode = result.lastErrorCode;
					this.lastWarring = result.lastWarring;
					this.extendResult = result.extendResult;
					dataType = result.dataType;
					ret = result.result;
				}
				if (result != null)
				{
					if (!lrq_vt && !result.javaClass)
						return null;

					if (this.isSuccess == 0)
					{
						if (this.lastErrorCode == "88888" || this.lastErrorCode == "-1")
						{
							setTimeout(___logout, 1000);
						}
						return null;
					}

					if (ret == null || ret == "" || ret == "null")
						return null;
					if (dataType != null && dataType == 12)
					{
						istojson = false;
					}
					if (istojson)
					{
						var _jo = null;
						try
						{
							_jo = JSON.parse(ret);
						}
						catch(ex)
						{
						}

						if (_jo != null)
							return _jo;
						return ret;
					}
					else
					{
						return ret;
					}
				}
			}
			catch(err)
			{
				this.isSuccess = 0;
				this.lastError = "deserialize server return result error";
				this.lastErrorCode = "-9998";
			}
		}
	}

	this.getsid = function()
	{
		if (this.sid == null)
		{
			var _now = new Date().getTime();
			var _xmlhttp = XmlHttpHelper._getXmlHttpObj();
			try
			{
				var ret =
						XmlHttpHelper.GetTextByPost(leapconfig.rpcurl(), "type=997&type2=1&_z=" + UUID.S4(), null, null, null, null, _xmlhttp);

				if (ret != null)
				{
					this.LRS_VT_TYPE = !_xmlhttp.getResponseHeader('lrs-vt') ? 2 : this.LRS_VT_TYPE;
					this.LRS_VT_TYPE = _xmlhttp.getResponseHeader('lrsvt') ? 3 : this.LRS_VT_TYPE;

					var _lnow = new Date().getTime();
					this._tickDiff = (_lnow - _now) / 2;
					this._endPointTicket = _lnow;
					var tmps = ret.split(':');
					ret = tmps[0];
					this._serverTime = Number(tmps[1]);
				}
				this.sid = ret;
				return this.sid;
			}
			finally
			{
				_xmlhttp = null;
			}
		}
		else return this.sid;
	}

	this.setFrameSRC = function(frame, src)
	{
		this.getsid();
		if (frame && frame.setAttribute)
		{
			if (src.indexOf('http:') == 0 || src.indexOf('https:') == 0)
				frame.setAttribute('src', src);
			else frame.setAttribute('src', leapconfig.server + src);
		}
	}
	this.setsrc = this.setFrameSRC;
	this.setframesrc = this.setFrameSRC;

	this.initsafe = false;
	this.safe = null;

	/**
	 * def.name 方法名称<br>
	 * def.par 参数<br>
	 * this.extendPar 扩展参数<br>
	 * def.callback 回调方法<br>
	 * def.service 调用服务名称<br>
	 * def.callService 调用服务名称<br>
	 * def.requestType 请求类型<br>
	 * def.isreturnjson 是否返回json对象<br>
	 * def.useGet 是否使用get请求<br>
	 * def.domain 回调作用域<br>
	 * def.arg 回调参数
	 */
	this.request2 = function(def)
	{
		if (def.requestGroup != null)
		{
			def.requestGroup.add(def);
			return;
		}
		else
		{
			return this.request(def.name, def.par, this.extendPar, def.callback, def.service, def.callService, def.requestType, def.isreturnjson, def.useGet, def.domain, def.arg, def.isworker);
		}
	}
	this.request =
			function(_methodName, _JSONObject, extendParameters, callback, serviceName, callService, requestType, isreturnjson, useGet, _domain, _args, _isworker)
			{
				var _serviceName = null;
				var _callService = null;
				if (serviceName == null)
					_serviceName = this.Service;
				else _serviceName = serviceName;
				if (callService == null)
					_callService = this.CallService;
				else _callService = callService;
				var rj = this.IsReturnJSON;
				if (isreturnjson != null && isreturnjson != rj)
					rj = isreturnjson;

				//		var uri = "service=" + _serviceName + "&method=" + _methodName + "&callService=" + _callService + "&returnJSON=" + rj + "&clientID=" + this.ID + "&sid=" + this.getsid();
				var uri = [];
				if (_callService != 'leap')
					uri.push("callService=" + _callService);
				if (rj != true)
					uri.push("returnJSON=0");
				uri.push("method=" + _methodName);
				uri.push("sid=" + this.getsid());
				//				uri.push("rup=" + leapconfig.server);
				uri = uri.join('&');

				if (window.leapwebsitename)
					uri += '&_website_=' + window.leapwebsitename;
				if (extendParameters != null)
				{
					uri += "&extend=" + encodeURIComponent(encodeURIComponent(escape(extendParameters)));
				}
				if (!this.initsafe)
				{
					this.safe = document.getElementById('safecontrol');
					this.initsafe = true;
				}
				if (this.safe != null)
				{
					var ran = (Math.round(_safeprop.random() * 10000)) + "";
					while(ran.length < 4)
						ran += "0";
					uri += "&zz=" + (ran);
					try
					{
						uri += this.safe.a(ran);
					}
					catch(e)
					{
					}
				}
				if (requestType != null && requestType != 1)
				{
					uri += "&type=" + requestType
				}
				var postData = null;
				var tempcount = 0;
				if (_JSONObject != null && typeof(_JSONObject) == "object" && _JSONObject != "")
				{
					try
					{
						var parDatas = [];
						for(var key in _JSONObject)
						{
							if (typeof(_JSONObject[key]) != "function")
							{
								var v = _JSONObject[key];
								if (v == null)
									parDatas[tempcount] = null;
								else if (typeof(_JSONObject[key]) != "string")
									parDatas[tempcount] = JSON.stringify(v);
								else parDatas[tempcount] = v;
								tempcount++;
							}
						}
						postData = JSON.stringify(parDatas);
					}
					catch(err)
					{
						parexp = null;
					}
				}
				uri += "&parlen=" + tempcount
				try
				{

					if (callback == null)
					{
						var str = null;
						var _xmlhttp = XmlHttpHelper._getXmlHttpObj();
						try
						{
							if (useGet == true)
								str =
										XmlHttpHelper.GetTextByGet(_methodName, null, null, null, null, null, _xmlhttp);
							else str =
									XmlHttpHelper.GetTextByPost(leapconfig.rpcurl(), uri, postData, null, null, null, _xmlhttp);

							if (rj)
								return this.___buildResult(str, true, _xmlhttp);
							else return str;
						}
						finally
						{
							_xmlhttp = null;
						}
					}
					else
					{
						var defdata =
						{
							callback	: callback,
							domain		: _domain,
							args		: _args
						};

						_isworker = _isworker == null ? WorkerHelper != null && WorkerHelper.enable() : false;

						if (_isworker)
						{
							var httpMethod = !useGet ? "POST" : "GET";
							var reqobj =
							{
								url			: leapconfig.rpcurl(),
								queryString	: uri,
								httpMethod	: httpMethod,
								postData	: postData
							};
							var helpobj = defdata;
							helpobj.warp_callback = this.callbackfunction;
							helpobj.warp_domain = this;
							WorkerHelper.request(reqobj, helpobj);
						}
						else
						{
							++asyncount;
							var instance = asyncount;
							defdata.instance = instance;
							var _xmlhttp = XmlHttpHelper._getXmlHttpObj();
							defdata.xmlhttp = _xmlhttp;
							if (useGet == true)
								XmlHttpHelper.GetTextByGet(_methodName, null, null, this.callbackfunction, this, defdata, _xmlhttp);
							else XmlHttpHelper.GetTextByPost(leapconfig.rpcurl(), uri, postData, this.callbackfunction, this, defdata, _xmlhttp);
							leaprpcclientasyncactivelist.add(instance);
							return instance;
						}
					}
				}
				catch(err)
				{
					if (callback != null)
						return null;
				}
			};

	this.asynrequest = function(_methodName, _JSONObject, extendParameters, _callback, _domain)
	{
		return this.request(_methodName, _JSONObject, extendParameters, _callback, null, null, null, null, null, _domain);
	}
	this.callbackfunction = function(text, arg)
	{
		try
		{
			var result = this.___buildResult(text, true, arg.xmlhttp);

			if (arg.callback != null)
			{
				var fn = function()
				{
					try
					{
						var app = arg.domain;
						if (app == null)
							app = this;
						if (!app.moduleDisposed)
						{
							arg.callback.call(app, result, arg.args);
						}
						app = null;
					}
					catch(e)
					{
						throw e;
					}
					finally
					{
						app = arg = null;
					}
				};
				if (arg.isworker)
					fn();
				else setTimeout(fn, 1);
			}
		}
		catch(ex)
		{
		}
	};

	this.load = function(fileName)
	{
		var filefirst = fileName.charAt(0);
		if (filefirst == '/' || filefirst == '\\')
		{
			fileName = fileName.substring(1);
		}
		if (fileName.indexOf('?') == -1 && this.getVersion() != null)
			fileName += '?gv=' + this.getVersion();
		return this.request(leapconfig.resurl() + fileName, null, null, null, null, null, 2, false, true);
	};

	this.loadjs = function(fileName, targetDocument, useDefer)
	{
		return this.loadscript(fileName, leapscripttype.js, targetDocument, useDefer);
	};

	this.loadcss = function(fileName, targetDocument)
	{
		return this.loadscript(fileName, leapscripttype.css, targetDocument);
	};

	this.loadtl = function(fileName, targetDocument)
	{
		return this.loadscript(fileName, leapscripttype.template, targetDocument);
	};

	this._s = null;
	this._c = null;
	this.loadscript = function(fileName, scriptType, targetDocument, useDefer)
	{
		var filefirst = fileName.charAt(0);
		if (filefirst == '/' || filefirst == '\\')
		{
			fileName = fileName.substring(1);
		}
		if (this.getVersion() != null)
		{
			if (fileName.indexOf('?') == -1)
				fileName += '?gv=' + this.getVersion();
			else fileName += '&gv=' + this.getVersion();
		}

		if (targetDocument == null)
			targetDocument = document;

		var comFile = fileName;
		if (fileName.indexOf('?') != -1)
		{
			comFile = fileName.substring(0, fileName.indexOf('?'));
		}

		if (this._s == null)
		{
			this._s = [];
			var ss = targetDocument.getElementsByTagName('SCRIPT');
			if (ss != null)
			{
				for(var i = 0;i < ss.length;i++)
				{
					var p = ss[i].getAttribute('path');

					if (p != null)
					{
						if (p.indexOf('?') != -1)
						{
							p = p.substring(0, p.indexOf('?'));
						}

						this._s.push(p.toLowerCase());
					}
					p = null;
				}
			}
		}

		if (this._c == null)
		{
			this._c = [];
			var cs = targetDocument.getElementsByTagName('LINK');
			if (cs != null)
			{
				for(var i = 0;i < cs.length;i++)
				{
					var p = cs[i].getAttribute('path');
					if (p != null)
					{

						if (p.indexOf('?') != -1)
						{
							p = p.substring(0, p.indexOf('?'));
						}

						this._c.push(p.toLowerCase());
					}
					p = null;
				}
			}
		}

		if (scriptType == null)
			scriptType = leapscripttype.js;

		if (scriptType == leapscripttype.js)
		{
			var l = this._s.length;
			var __t = comFile.toLowerCase();
			for(var i = 0;i < l;i++)
			{
				if (__t == this._s[i])
					return;
			}
			this._s.push(__t);
		}
		else if (scriptType == leapscripttype.css)
		{
			var l = this._c.length;
			var __t = comFile.toLowerCase();
			for(var i = 0;i < l;i++)
			{
				if (__t == this._c[i])
					return;
			}
			this._c.push(__t);
		}

		var str = this.load(fileName);
		if (str == null)
			return;
		if (scriptType == leapscripttype.js || scriptType == leapscripttype.css)
		{
			addScript(str, targetDocument, scriptType, useDefer, fileName);
		}
		else
		{
			try
			{
				return str;
			}
			finally
			{
				str = null;
			}
		}
	};

	var addScript = function(source, targetDocument, type, useDefer, path)
	{
		try
		{
			if (source != null)
			{
				var oHead = targetDocument.getElementsByTagName('HEAD').item(0);
				var oScript;
				if (type == leapscripttype.js)
				{
					oScript = targetDocument.createElement("script");
					oScript.language = "javascript";
					oScript.type = "text/javascript";
					oScript.charset = 'UTF-8';
					oScript.defer = 'defer';
					oScript.text = source;
					oScript.path = path;
				}
				else if (type == leapscripttype.css)
				{
					var oScript = targetDocument.createElement("link")
					oScript.setAttribute("rel", "stylesheet")
					oScript.setAttribute("type", "text/css")
					oScript.setAttribute("href", leapconfig.server + path);
					oScript.text = source;
					oScript.path = path;
				}
				oHead.appendChild(oScript);
				source = targetDocument = type = useDefer = oHead = oScript = null;
				return true;
			}
		}
		catch(err)
		{
		}
	};

	this.___geti1 = function(nodes)
	{
		try
		{
			if (nodes == null)
				return;
			var _cua = __s__3[__s2];
			var has = false;
			for(var i = 0;i < nodes.length;i++)
			{
				if (nodes[i].tagName == 'SCRIPT' && nodes[i].src != null
						&& (nodes[i].src.indexOf('HC.js') > -1 || nodes[i].src.indexOf('Net.js') > -1))
				{
					var s = nodes[i].src;
					if (s.charAt(0) == '/')
					{
						while(_cua.indexOf('//') > -1)
							_cua = _cua.replace('//', '_');
						_cua = _cua.replace('http:_', "http://").replace('https:_', "https://");
						while(_cua.lastIndexOf('/') > -1 && _cua.charAt(_cua.lastIndexOf('/') - 1) != '/')
						{
							_cua = _cua.substring(0, _cua.lastIndexOf("/"));
						}
						if (nodes[i].src.indexOf('HC.js') > -1)
							_cua += s.replace('LEAP/HC.js', '');
						else _cua += s.replace('LEAP/HC/HC_base/javascript/Net.js', '');
					}
					else
					{
						if (s.indexOf('http://') > -1 || s.indexOf('https://') > -1)
						{
							if (nodes[i].src.indexOf('HC.js') > -1)
								_cua = s.replace('LEAP/HC.js', '');
							else _cua = s.replace('LEAP/HC/HC_base/javascript/Net.js', '');
						}
						else
						{
							var c = 0;
							while(s.indexOf('../') > -1)
							{
								c += 1;
								s = s.replace("../", "");
							}
							while(s.indexOf('./') > -1)
							{
								//							c += 1;
								s = s.replace("./", "");
							}
							while(_cua.indexOf('//') > -1)
								_cua = _cua.replace('//', '@');
							_cua =
									_cua.replace('http:@', "http://").replace('https:@', "https://").substring(0, _cua.lastIndexOf("/")
											+ 1);
							if (c > 0)
							{
								while(c > 0)
								{
									c--;
									_cua = _cua.substring(0, _cua.lastIndexOf("/"));
								}
							}
							_cua = _cua + '/' + s;
							if (nodes[i].src.indexOf('HC.js') > -1)
							{
								if (_cua.indexOf('LEAP/HC.js') > -1)
									_cua = _cua.replace('LEAP/HC.js', '');
								else if (_cua.indexOf('HC.js') > -1)
									_cua = _cua.replace('HC.js', '');
							}
							else _cua = _cua.replace('LEAP/Resource/JavaScript/Base/Net.js', '');
						}
					}
					return _cua;
				}
			}
		}
		finally
		{
			nodes = null;
		}
	}

	var __s2 = "href";
	this.init = function()
	{
		if (__s__3[__s2].toLowerCase().indexOf('/webhelp/') > -1)
			return;

		var _cua = __s__3[__s2];

		var tmp1 = this.___geti1(document.getElementsByTagName('HEAD').item(0).childNodes);
		if (!tmp1)
			tmp1 = this.___geti1(document.getElementsByTagName('SCRIPT'));

		_cua = tmp1;

		//http://cloud.longrise.cn:81/MIIT
		//		var _cua="";
		if (_cua.charAt(_cua.length - 1) != '/')
			_cua += '/';
		var urlpre = _cua;
		var _i1 = _cua.indexOf('://');
		var _i2 = _cua.indexOf('/', _i1 + 3);
		var _ctx = '';
		var _host = _cua.substring(_i1 + 3, _i2);
		var _port = 80;
		var _portal = _cua.substring(0, _i1);
		if (_host.indexOf(":") > -1)
		{
			var _ii = _host.indexOf(":");
			_port = Number(_host.substring(_ii + 1));
			_host = _host.substring(0, _ii);
		}

		if (_cua.length > _i2 + 1)
		{
			_ctx = _cua.substring(_i2 + 1);
			_ctx = _ctx.substring(0, _ctx.length - 1);
		}
		leapconfig.port = _port;
		leapconfig.host = _host;
		leapconfig.portal = _portal;
		leapconfig.context = _ctx;
		leapconfig.server = urlpre;
		leapconfig._rpcurl = urlpre + "LEAP/Service/RPC/RPC.DO";
		PublishServerConfig.RPCURL = urlpre;

		this.getsid();
	}
};

var leapclient = new leaprpcclient();

if (window.Worker)
{
	var WorkerHelper = {};
	WorkerHelper.defaultAsynMode = false;
	WorkerHelper.maxActive = 5;
	WorkerHelper.workerList = [];
	WorkerHelper.workerList_free = [];
	WorkerHelper.requestList = {};
	WorkerHelper.enable = function()
	{
		return WorkerHelper.defaultAsynMode && window.Worker != null;
	};
	WorkerHelper.request = function(def, helpobj)
	{
		var worker = this.workerList_free.shift();
		//总池未满时,创建新的 worker
		if (!worker)
		{
			if (this.workerList.length < this.maxActive)
			{
				worker = new Worker(leapconfig.server + "LEAP/Base/networker.js");
				worker.onmessage = this.onmessage;
				worker.onerror = this.onerror;
				worker.requestCount = 0;
				var initObj =
				{
					type				: 'init',
					isIE				: XmlHttpHelper.isIE,
					IEVersion			: XmlHttpHelper.IEVersion,
					LEAP_LID			: window.LEAP_LID,
					isChrome			: XmlHttpHelper.isChrome,
					server				: leapconfig.server,
					_leap_systemarea	: window._leap_systemarea,
					_leap_systemname	: window._leap_systemname,
					_leap_systemcode	: window._leap_systemcode
				}
				worker.postMessage(initObj);

				this.workerList.push(worker);
			}
			else
			{
				//从总池中取执行请求总数最少的worker
				var len = this.workerList.length;
				worker = this.workerList[0];
				for(var i = 1;i < len;i++)
				{
					var cur = this.workerList[i];
					if (cur.requestCount < worker.requestCount)
					{
						worker = cur;
					}
				}
			}
		}

		var reqobj =
		{
			type		: 'http.request',
			instance	: "LCR_" + UUID.randomUUID().replaceall('-', ''),
			def			: def
		};
		this.requestList[reqobj.instance] =
		{
			reqobj	: reqobj,
			helpobj	: helpobj
		};
		worker.requestCount++;
		worker.postMessage(reqobj);
	};
	WorkerHelper.onmessage = function(event)
	{
		var worker = event.srcElement;
		worker.requestCount--;
		WorkerHelper.workerList_free.push(worker);

		var ret = event.data;
		var data = ret.data;
		var instance = ret.instance;
		var error = ret.error;
		var def = WorkerHelper.requestList[instance];
		delete WorkerHelper.requestList[instance];
		var helpobj = def.helpobj;
		helpobj.xmlhttp = ret.xmlhttp;

		if (ret.xmlhttp)
		{
			ret.xmlhttp.getResponseHeader = function(name)
			{
				if (!name || name.length == '' || !this.headers)
					return null;
				name = name.toLowerCase();
				var len = this.headers.length;
				for(var i = 0;i < len;i++)
				{
					var item = this.headers[i];
					if (item.name == name)
						return item.value;
				}
			}
		}

		helpobj.isworker = true;
		try
		{
			def.helpobj.warp_callback.call(def.helpobj.warp_domain, data, helpobj);
		}
		catch(e)
		{
		}
	};
	WorkerHelper.onerror = function(event)
	{
		if (console)
			console.log(event);
	};
};

function XmlHttpHelper()
{
}
//"MSXML2.Serverxmlhttp.4.0","Msxml2.ServerXMLHTTP",
//"MSXML2.XMLHTTP.4.0",
var arr_t =
		new Array("MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP.2.6","MSXML2.XMLHTTP","Microsoft.XMLHTTP","MSXML.XMLHTTP");
var arr_t_indx = -1;
XmlHttpHelper._getXmlHttpObj = function()
{
	var _xh = null;
	if (window.ActiveXObject)
	{
		if (arr_t_indx == -1)
		{
			for(var i = 0;i < arr_t.length;i++)
			{
				try
				{
					_xh = new ActiveXObject(arr_t[i]);
					arr_t_indx = i;
				}
				catch(e)
				{
				}
				if (_xh != null)
					break;
			}
		}
		else _xh = new ActiveXObject(arr_t[arr_t_indx]);
	}
	if (_xh == null)
	{
		if (window.XMLHttpRequest)
		{
			try
			{
				_xh = new XMLHttpRequest();
				if (_xh.overrideMimeType)
				{
					_xh.overrideMimeType('text/xml');
				}
			}
			catch(ex)
			{
			}
		}
	}
	if (_xh == null)
	{
		alert('con not create XMLHTTP object');
		throw(new Error(-1,'con not create XMLHTTP object'));
	}
	return _xh;
};

XmlHttpHelper.GetTextByPost =
		function(url, queryString, postData, callback, callbackdomain, callargs, _xmlhttp)
		{
			return XmlHttpHelper.transmit(url, "POST", queryString, postData, "text", callback != null, callback, callbackdomain, callargs, _xmlhttp);
		};

XmlHttpHelper.GetTextByGet =
		function(url, queryString, postData, callback, callbackdomain, callargs, _xmlhttp)
		{
			return XmlHttpHelper.transmit(url, "GET", queryString, postData, "text", callback != null, callback, callbackdomain, callargs, _xmlhttp);
		};
/*
 * XmlHttpHelper.GetXmlByPost = function(url,postData,callback) {
 * if(arguments.length == 3) return
 * XmlHttpHelper.transmit(arguments[0],"POST",arguments[1],"xml",true,arguments[2]);
 * else return
 * XmlHttpHelper.transmit(arguments[0],"POST",arguments[1],"xml",false,null); };
 * XmlHttpHelper.GetXmlByGet = function(url,callback) { if(arguments.length ==
 * 2) return
 * XmlHttpHelper.transmit(arguments[0],"GET",null,"xml",true,arguments[1]); else
 * return XmlHttpHelper.transmit(arguments[0],"GET",null,"xml",false,null); };
 */

XmlHttpHelper.processLID = function(xmlhttp)
{
	if (xmlhttp)
	{
		try
		{
			var str = xmlhttp.getResponseHeader('LID');
			if (str != null && str != '')
			{
				window.LEAP_LID = str;
			}
		}
		catch(e)
		{
		}
	}
	xmlhttp = null;
}

window.geturl = function(url)
{
	if (url != null)
	{
		if ((!window.LEAP_LID || ((url.indexOf('http://') == 0 || url.indexOf('https://') == 0) && (url.indexOf(leapconfig.server) == -1 || url.toLowerCase().indexOf('login.html') > -1))))
		{
		}
		else if (url.indexOf('.html') > -1 || url.indexOf('.htm') > -1 || url.endsWith('/'))
		{
			if (url.indexOf('&lid=') == -1 && url.indexOf('?lid=') == -1)
			{
				var idx = url.indexOf('?');
				if (idx > -1)
					url = url.substring(0, idx + 1) + "lid=" + window.LEAP_LID + "&" + url.substring(idx + 1);
				else url += '?lid=' + window.LEAP_LID;
			}
		}
		if(window._opensecure=="1")
		{
			var isloacl = false ;
			var path = leapconfig.server ;
			if(path!= null && url!=null)
			{
				if(url.indexOf(path)==0)
				{
					isloacl = true ;
				}
			}
			if(!isloacl)
			{
				var bool = leapclient.request("app_checkuriSecure",{url:url});
				if(!bool)
				{
					alert('该链接地址不在系统白名单中，系统将禁止打开');
					return null ;
				}
			}
		}
	}
	return url;
}

window._open = window['\u006f\u0070\u0065\u006e'];
window.open = function(a0, a1, a2, a3)
{
	if (a1 == undefined)
		a1 = null;
	if (a2 == undefined)
		a2 = null;
	if (a3 == undefined)
		a3 = null;
	a0 = arguments[0] = window.geturl(a0);

	try
	{
		if (window._open.apply)
			return window._open.apply(window, arguments);

		if (a1 == a2 && a2 == a3 && a3 == null)
			return window._open(a0);
		else if (a1 != null && a2 == a3 && a3 == null)
			return window._open(a0, a1);
		else if (a1 != null && a2 != null && a3 == null)
			return window._open(a0, a1, a2);
		else if (a1 != null && a2 != null && a3 != null)
			return window._open(a0, a1, a2, a3);
		else if (a1 == null && a2 != null)
		{
			if (a3 == null)
				return window._open(a0, a1, a2);
			else return window._open(a0, a1, a2, a3);
		}
		else return window._open(a0);
	}
	catch(e)
	{
		return window._open(a0);
	}
}

window._navigate = window['\u006e\u0061\u0076\u0069\u0067\u0061\u0074\u0065'];
window['\u006e\u0061\u0076\u0069\u0067\u0061\u0074\u0065'] = function(a0)
{
	a0 = arguments[0] = window.geturl(a0);
	if (window._navigate.apply)
		return window._navigate.apply(window, arguments);
	else return window._navigate(url);
}

window.leap_lid_loadurl = false;
XmlHttpHelper._ua = navigator.userAgent.toLowerCase();
XmlHttpHelper.isChrome = (XmlHttpHelper._ua.indexOf("chrome") != -1);
XmlHttpHelper.isIE =
		((XmlHttpHelper._ua.indexOf("msie") != -1) || XmlHttpHelper._ua.indexOf("rv:") != -1)
				&& (XmlHttpHelper._ua.indexOf("opera") == -1) && (XmlHttpHelper._ua.indexOf("webtv") == -1);
XmlHttpHelper.IEVersion = -1;
if (XmlHttpHelper.isIE)
{
	var _r = navigator.appVersion.match(/MSIE (\d+\.\d+)/, '');
	if (_r)
	{
		try
		{
			XmlHttpHelper.IEVersion = Number(_r[1]);
		}
		catch(E)
		{
		}
	}
	else if (navigator.appVersion.indexOf("rv:") > -1)
	{
		var _r2 = navigator.appVersion.match(/rv:(\d+\.\d+)/, '');
		if (_r2)
		{
			try
			{
				XmlHttpHelper.IEVersion = Number(_r2[1]);
			}
			catch(E)
			{
			}
		}
	}
	else if (XmlHttpHelper.name && XmlHttpHelper.name.indexOf("rv:") > -1)
	{
		var _r2 = XmlHttpHelper.name.match(/rv:(\d+\.\d+)/, '');
		if (_r2)
		{
			try
			{
				XmlHttpHelper.IEVersion = Number(_r2[1]);
			}
			catch(E)
			{
			}
		}
	}
}

XmlHttpHelper.transmit =
		function(url, httpMethod, queryString, postData, responseType, async, callback, callbackdomain, callargs, _xmlhttp)
		{
			// if(Debug) alert("go to XmlHttpHelper.transmit");
			var instance = null;
			var xmlhttp = _xmlhttp;
			if (xmlhttp == null)
				xmlhttp = this._getXmlHttpObj();
			try
			{
				var uri = url;
				if (queryString != null)
					uri += '?' + queryString;
				xmlhttp.open(httpMethod, uri, async);

				if (!XmlHttpHelper.isChrome)
					xmlhttp.setRequestHeader('connection', 'keep-alive');

				if (!window.leap_lid_loadurl)
				{
					window.leap_lid_loadurl = true;
					var url = __s__3.search != null ? __s__3.search : __s__3['href'];
					if (url)
					{
						var idx = url.indexOf('?');
						if (idx > -1)
						{
							var sub = url.substring(idx + 1);
							var temps1 = sub.split('&');
							for(var i = 0;i < temps1.length;i++)
							{
								var temps2 = temps1[i].split('=');
								if (temps2 && temps2.length && temps2.length > 1)
								{
									var name = temps2[0];
									var value = temps2[1];
									if (name == 'lid')
									{
										window.LEAP_LID = value;
										break;
									}
								}
							}
						}
					}
				}

				xmlhttp.setRequestHeader('lrqvt', leapclient.LRS_VT_TYPE + "");
				xmlhttp.setRequestHeader('lrq-vt', leapclient.LRS_VT_TYPE + "");
				if (window.LEAP_LID)
					xmlhttp.setRequestHeader('LID', window.LEAP_LID);
				//				else xmlhttp.setRequestHeader('GETLID', '1');

				var enc = false;
				if (httpMethod.toLowerCase() == "post")
				{
					xmlhttp.setRequestHeader('Pragma', 'no-cache');
					xmlhttp.setRequestHeader('Cache-Control', 'no-cache');

					var _length = 0;

					if (postData == null || postData == '')
						postData = " ";

					if (postData != null)
					{
						try
						{
							var poslen = postData.length;

							var hasC = false;
							if (leapflash.fp != null && leapflash.fp.compress != null && poslen > 1000)
							{
								if (!(XmlHttpHelper.isIE && XmlHttpHelper.IEVersion == 8))
								//								if (!(XmlHttpHelper.isIE && XmlHttpHelper.IEVersion <= 9))
								{
									hasC = true;
									postData = 'a=' + leapflash.fp.compress(postData);
									xmlhttp.setRequestHeader('Data-Type', '2');
								}
							}
							if (!hasC && poslen > 0)
							{
								//								if (!(XmlHttpHelper.isIE && XmlHttpHelper.IEVersion == 8) && poslen < 20000)
								//								{
								//									postData = 'a=' + base64encode(encodeURIComponent(escape(postData)));
								//									xmlhttp.setRequestHeader('Data-Type', '4');
								//								}
								//								else
								//								{
								//									postData = 'a=' + encodeURIComponent(escape(postData));
								//									xmlhttp.setRequestHeader('Data-Type', '5');
								//								}
								if (poslen > 99)
								{
									postData = 'a=' + base64encode(pako.deflate(postData,
									{
										to	: 'string'
									}));
									xmlhttp.setRequestHeader('Data-Type', '6');
								}
								else
								{
									postData = 'a=' + base64encode(encodeURIComponent(escape(postData)));
									xmlhttp.setRequestHeader('Data-Type', '4');
								}
							}
							//							if (leapflash.fp != null && leapflash.fp.d != null)
							//							{
							//								if (!(XmlHttpHelper.isIE && XmlHttpHelper.IEVersion <= 9))
							//								{
							//									enc = true;
							//									xmlhttp.setRequestHeader('LENC', '1');
							//								}
							//							}
						}
						catch(e)
						{
						}

						xmlhttp.setRequestHeader('Post-Type', '1');
						_length = postData.length;
					}
					if (!XmlHttpHelper.isChrome)
						xmlhttp.setRequestHeader('Content-Length', '"' + _length + '"');
					xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
				}
				else
				{
					if (postData != null)
					{
						if (queryString != null)
						{
							uri += '&requestData=' + postData;
						}
						else uri = '?requestData=' + postData;
					}
				}

				if (window._leap_systemarea)
					xmlhttp.setRequestHeader('LSYS-AREA', window._leap_systemarea);
				if (window._leap_systemname)
					xmlhttp.setRequestHeader('LSYS-NAME', window._leap_systemname);
				if (window._leap_systemcode)
					xmlhttp.setRequestHeader('LSYS-CODE', window._leap_systemcode);

				if (async)
				{
					if (callargs != null && callargs.instance != null)
						instance = callargs.instance;

					xmlhttp.onreadystatechange = function()
					{
						XmlHttpHelper.processLID(xmlhttp);
						if (xmlhttp.readyState == 4)
						{
							try
							{
								if (responseType != null)
								{
									if (responseType.toLowerCase() == "text")
									{
										if (callback != null)
										{
											if (callbackdomain != null)
											{
												if (instance == null
														|| (instance != null && leaprpcclientasyncactivelist.contains(instance)))
												{
													var ret = xmlhttp.responseText;
													if (xmlhttp.getResponseHeader('LENC'))
													{
														if (enc)
														{
															if (ret)
															{
																ret = leapflash.fp.d(ret);
																if (ret)
																	ret = decodeURIComponent(ret);
															}
														}
													}
													callback.call(callbackdomain, ret, callargs);
												}
												else callback = callargs = null;
												if (instance != null)
													leaprpcclientasyncactivelist.remove(instance);
											}
											else
											{
												var ret = xmlhttp.responseText;
												if (xmlhttp.getResponseHeader('LENC'))
												{
													if (enc)
													{
														if (ret)
														{
															ret = leapflash.fp.d(ret);
															if (ret)
																ret = decodeURIComponent(ret);
														}
													}
												}
												callback.call(ret);
											}
										}
									}
									else if (responseType.toLowerCase() == "xml")
									{
										if (callbackdomain != null)
										{
											if (instance == null
													|| (instance != null && leaprpcclientasyncactivelist.contains(instance)))
												callback.call(callbackdomain, xmlhttp.responseXML, callargs);
											else callback = callargs = null;
											if (instance != null)
												leaprpcclientasyncactivelist.remove(instance);
										}
										else
										{
											callback.call(xmlhttp.responseXML);
										}
									}
								}
								else
								{
									if (callbackdomain != null)
									{
										if (callargs != null)
											callback.call(callbackdomain, null, callargs);
										else callback.call(callbackdomain);
									}
									else
									{
										callback.call();
									}
								}
							}
							finally
							{
								// xmlhttp = null;
							}
						}
					};
					if (postData == null)
						postData = '';
					xmlhttp.send(postData);
				}
				else
				{
					if (postData == null)
						postData = '';
					xmlhttp.send(postData);
					XmlHttpHelper.processLID(xmlhttp);
					if (xmlhttp.status == 200)
					{
						if (responseType != null)
						{
							if (responseType.toLowerCase() == "text")
							{
								if (xmlhttp.getResponseHeader('LENC'))
								{
									if (enc)
									{
										var ret = xmlhttp.responseText;
										if (ret)
										{
											ret = leapflash.fp.d(ret);
											if (ret)
												ret = decodeURIComponent(ret);
										}
										return ret;
									}
								}
								var time997 = xmlhttp.getResponseHeader("ServerTime997");
								if (time997 != null && time997.length > 0)
									return xmlhttp.responseText + ":" + time997;
								else return xmlhttp.responseText;
							}
							else if (responseType.toLowerCase() == "xml")
								return xmlhttp.responseXML;
						}
						else
						{
							return null;
						}
					}
					return null;
				}
			}
			catch(errmsg)
			{
				if (instance != null)
				{
					leaprpcclientasyncactivelist.remove(instance);
				}
			}
			finally
			{
				if (xmlhttp != null)
				{
					try
					{
						// delete xmlhttp;
					}
					catch(oooo)
					{
					}
					// xmlhttp = null;
				}
			}
		};

RegExp.prototype.toJSON = function()
{
	return this.toString();
}

if (!this.JSON)
{
	this.JSON = {};
}

(function()
{

	function f(n)
	{
		// Format integers to have at least two digits.
		return n < 10 ? '0' + n : n;
	}

	if (typeof Date.prototype.toJSON !== 'function')
	{

		Date.prototype.toJSON = function(key)
		{
			return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-'
					+ f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes())
					+ ':' + f(this.getUTCSeconds()) + 'Z' : null;
		};

		String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function(key)
		{
			return this.valueOf();
		};
	}

	var cx =
			/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable =
			/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta =
	{		// table of character substitutions
				'\b'	: '\\b',
				'\t'	: '\\t',
				'\n'	: '\\n',
				'\f'	: '\\f',
				'\r'	: '\\r',
				'"'		: '\\"',
				'\\'	: '\\\\'
			},rep;

	function quote(string)
	{

		// If the string contains no control characters, no quote characters, and no
		// backslash characters, then we can safely slap some quotes around it.
		// Otherwise we must also replace the offending characters with safe escape
		// sequences.

		escapable.lastIndex = 0;
		return escapable.test(string) ? '"' + string.replace(escapable, function(a)
		{
			var c = meta[a];
			return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
		}) + '"' : '"' + string + '"';
	}

	function str(key, holder)
	{

		// Produce a string from holder[key].

		var i, // The loop counter.
		k, // The member key.
		v, // The member value.
		length,mind = gap,partial,value = holder[key];

		// If the value has a toJSON method, call it to obtain a replacement value.

		if (value && typeof value === 'object' && typeof value.toJSON === 'function')
		{
			value = value.toJSON(key);
		}

		// If we were called with a replacer function, then call the replacer to
		// obtain a replacement value.

		if (typeof rep === 'function')
		{
			value = rep.call(holder, key, value);
		}

		// What happens next depends on the value's type.

		switch(typeof value)
		{
			case 'string':
				return quote(value);

			case 'number':

				// JSON numbers must be finite. Encode non-finite numbers as null.

				return isFinite(value) ? String(value) : 'null';

			case 'boolean':
			case 'null':

				// If the value is a boolean or null, convert it to a string. Note:
				// typeof null does not produce 'null'. The case is included here in
				// the remote chance that this gets fixed someday.

				return String(value);

				// If the type is 'object', we might be dealing with an object or an array or
				// null.

			case 'object':

				// Due to a specification blunder in ECMAScript, typeof null is 'object',
				// so watch out for that case.

				if (!value) { return 'null'; }

				// Make an array to hold the partial results of stringifying this object value.

				gap += indent;
				partial = [];

				// Is the value an array?

				if (Object.prototype.toString.apply(value) === '[object Array]')
				{

					// The value is an array. Stringify every element. Use null as a placeholder
					// for non-JSON values.

					length = value.length;
					for(i = 0;i < length;i += 1)
					{
						partial[i] = str(i, value) || 'null';
					}

					// Join all of the elements together, separated with commas, and wrap them in
					// brackets.

					v =
							partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap)
									+ '\n' + mind + ']' : '[' + partial.join(',') + ']';
					gap = mind;
					return v;
				}

				// If the replacer is an array, use it to select the members to be stringified.

				if (rep && typeof rep === 'object')
				{
					length = rep.length;
					for(i = 0;i < length;i += 1)
					{
						k = rep[i];
						if (typeof k === 'string')
						{
							v = str(k, value);
							if (v)
							{
								partial.push(quote(k) + (gap ? ': ' : ':') + v);
							}
						}
					}
				}
				else
				{

					// Otherwise, iterate through all of the keys in the object.

					for(k in value)
					{
						if (Object.hasOwnProperty.call(value, k))
						{
							v = str(k, value);
							if (v)
							{
								partial.push(quote(k) + (gap ? ': ' : ':') + v);
							}
						}
					}
				}

				// Join all of the member texts together, separated with commas,
				// and wrap them in braces.

				v =
						partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n'
								+ mind + '}' : '{' + partial.join(',') + '}';
				gap = mind;
				return v;
		}
	}

	// If the JSON object does not yet have a stringify method, give it one.

	var ___i8 = false;
	try
	{
		___i8 =
				(((LEAPBrowser.name.indexOf("msie") != -1) || LEAPBrowser.name.indexOf("rv:") != -1)
						&& (LEAPBrowser.name.indexOf("opera") == -1)
						&& (LEAPBrowser.name.indexOf("webtv") == -1) && navigator.appVersion.match(/MSIE (\d+\.\d+)/, '')[1] == 8)
	}
	catch(E)
	{
	}
	if (typeof JSON.stringify !== 'function' || ___i8)
	{
		JSON.stringify = function(value, replacer, space)
		{

			// The stringify method takes a value and an optional replacer, and an optional
			// space parameter, and returns a JSON text. The replacer can be a function
			// that can replace values, or an array of strings that will select the keys.
			// A default replacer method can be provided. Use of the space parameter can
			// produce text that is more easily readable.

			var i;
			gap = '';
			indent = '';

			// If the space parameter is a number, make an indent string containing that
			// many spaces.

			if (typeof space === 'number')
			{
				for(i = 0;i < space;i += 1)
				{
					indent += ' ';
				}

				// If the space parameter is a string, it will be used as the indent string.

			}
			else if (typeof space === 'string')
			{
				indent = space;
			}

			// If there is a replacer, it must be a function or an array.
			// Otherwise, throw an error.

			rep = replacer;
			if (replacer && typeof replacer !== 'function'
					&& (typeof replacer !== 'object' || typeof replacer.length !== 'number')) { throw new Error('JSON.stringify'); }

			// Make a fake root object containing our value under the key of ''.
			// Return the result of stringifying the value.

			return str('',
			{
				''	: value
			});
		};
	}

	// If the JSON object does not yet have a parse method, give it one.

	if (typeof JSON.parse !== 'function' || ___i8)
	{
		JSON.parse = function(text, reviver)
		{
			if (text == null || text == '')
				return null;

			// The parse method takes a text and an optional reviver function, and returns
			// a JavaScript value if the text is a valid JSON text.

			var j;

			function walk(holder, key)
			{

				// The walk method is used to recursively walk the resulting structure so
				// that modifications can be made.

				var k,v,value = holder[key];
				if (value && typeof value === 'object')
				{
					for(k in value)
					{
						if (Object.hasOwnProperty.call(value, k))
						{
							v = walk(value, k);
							if (v !== undefined)
							{
								value[k] = v;
							}
							else
							{
								delete value[k];
							}
						}
					}
				}
				return reviver.call(holder, key, value);
			}

			// Parsing happens in four stages. In the first stage, we replace certain
			// Unicode characters with escape sequences. JavaScript handles many characters
			// incorrectly, either silently deleting them, or treating them as line endings.

			cx.lastIndex = 0;
			if (cx.test(text))
			{
				text = text.replace(cx, function(a)
				{
					return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
				});
			}

			// In the second stage, we run the text against regular expressions that look
			// for non-JSON patterns. We are especially concerned with '()' and 'new'
			// because they can cause invocation, and '=' because it can cause mutation.
			// But just to be safe, we want to reject all unexpected forms.

			// We split the second stage into 4 regexp operations in order to work around
			// crippling inefficiencies in IE's and Safari's regexp engines. First we
			// replace the JSON backslash pairs with '@' (a non-JSON character). Second, we
			// replace all simple value tokens with ']' characters. Third, we delete all
			// open brackets that follow a colon or comma or that begin the text. Finally,
			// we look to see that the remaining characters are only whitespace or ']' or
			// ',' or ':' or '{' or '}'. If that is so, then the text is safe for eval.

			if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, '')))
			{

				// In the third stage we use the eval function to compile the text into a
				// JavaScript structure. The '{' operator is subject to a syntactic ambiguity
				// in JavaScript: it can begin a block or an object literal. We wrap the text
				// in parens to eliminate the ambiguity.

				j = eval('(' + text + ')');

				// In the optional fourth stage, we recursively walk the new structure, passing
				// each name/value pair to a reviver function for possible transformation.

				return typeof reviver === 'function' ? walk(
				{
					''	: j
				}, '') : j;
			}

			// If the text is not JSON parseable, then a SyntaxError is thrown.

			throw new SyntaxError('JSON.parse');
		};
	}
}());

var json_parse = (function()
{

	// This is a function that can parse a JSON text, producing a JavaScript
	// data structure. It is a simple, recursive descent parser. It does not use
	// eval or regular expressions, so it can be used as a model for implementing
	// a JSON parser in other languages.

	// We are defining the function inside of another function to avoid creating
	// global variables.

	var at, // The index of the current character
	ch, // The current character
	escapee =
	{
		'"'		: '"',
		'\\'	: '\\',
		'/'		: '/',
		b		: '\b',
		f		: '\f',
		n		: '\n',
		r		: '\r',
		t		: '\t'
	},text,

	error = function(m)
	{

		// Call error when something is wrong.

		var err =
		{
			name	: 'SyntaxError',
			message	: m,
			at		: at,
			text	: text
		};
		throw err;
	},

	next = function(c)
	{

		// If a c parameter is provided, verify that it matches the current character.

		if (c && c !== ch)
		{
			error("Expected '" + c + "' instead of '" + ch + "'");
		}

		// Get the next character. When there are no more characters,
		// return the empty string.

		ch = text.charAt(at);
		at += 1;
		return ch;
	},

	number = function()
	{

		// Parse a number value.

		var number,string = '';

		if (ch === '-')
		{
			string = '-';
			next('-');
		}
		while(ch >= '0' && ch <= '9')
		{
			string += ch;
			next();
		}
		if (ch === '.')
		{
			string += '.';
			while(next() && ch >= '0' && ch <= '9')
			{
				string += ch;
			}
		}
		if (ch === 'e' || ch === 'E')
		{
			string += ch;
			next();
			if (ch === '-' || ch === '+')
			{
				string += ch;
				next();
			}
			while(ch >= '0' && ch <= '9')
			{
				string += ch;
				next();
			}
		}
		number = +string;
		if (isNaN(number))
		{
			error("Bad number");
		}
		else
		{
			return number;
		}
	},

	string = function()
	{

		// Parse a string value.

		var hex,i,string = '',uffff;

		// When parsing for string values, we must look for " and \ characters.

		if (ch === '"')
		{
			while(next())
			{
				if (ch === '"')
				{
					next();
					return string;
				}
				else if (ch === '\\')
				{
					next();
					if (ch === 'u')
					{
						uffff = 0;
						for(i = 0;i < 4;i += 1)
						{
							hex = parseInt(next(), 16);
							if (!isFinite(hex))
							{
								break;
							}
							uffff = uffff * 16 + hex;
						}
						string += String.fromCharCode(uffff);
					}
					else if (typeof escapee[ch] === 'string')
					{
						string += escapee[ch];
					}
					else
					{
						break;
					}
				}
				else
				{
					string += ch;
				}
			}
		}
		error("Bad string");
	},

	white = function()
	{

		// Skip whitespace.

		while(ch && ch <= ' ')
		{
			next();
		}
	},

	word = function()
	{

		// true, false, or null.

		switch(ch)
		{
			case 't':
				next('t');
				next('r');
				next('u');
				next('e');
				return true;
			case 'f':
				next('f');
				next('a');
				next('l');
				next('s');
				next('e');
				return false;
			case 'n':
				next('n');
				next('u');
				next('l');
				next('l');
				return null;
		}
		error("Unexpected '" + ch + "'");
	},

	value, // Place holder for the value function.

	array = function()
	{

		// Parse an array value.

		var array = [];

		if (ch === '[')
		{
			next('[');
			white();
			if (ch === ']')
			{
				next(']');
				return array; // empty array
			}
			while(ch)
			{
				array.push(value());
				white();
				if (ch === ']')
				{
					next(']');
					return array;
				}
				next(',');
				white();
			}
		}
		error("Bad array");
	},

	object = function()
	{

		// Parse an object value.

		var key,object = {};

		if (ch === '{')
		{
			next('{');
			white();
			if (ch === '}')
			{
				next('}');
				return object; // empty object
			}
			while(ch)
			{
				key = string();
				white();
				next(':');
				if (Object.hasOwnProperty.call(object, key))
				{
					error('Duplicate key "' + key + '"');
				}
				object[key] = value();
				white();
				if (ch === '}')
				{
					next('}');
					return object;
				}
				next(',');
				white();
			}
		}
		error("Bad object");
	};

	value = function()
	{

		// Parse a JSON value. It could be an object, an array, a string, a number,
		// or a word.

		white();
		switch(ch)
		{
			case '{':
				return object();
			case '[':
				return array();
			case '"':
				return string();
			case '-':
				return number();
			default:
				return ch >= '0' && ch <= '9' ? number() : word();
		}
	};

	// Return the json_parse function. It will have access to all of the above
	// functions and variables.

	return function(source, reviver)
	{
		var result;

		text = source;
		at = 0;
		ch = ' ';
		result = value();
		white();
		if (ch)
		{
			error("Syntax error");
		}

		// If there is a reviver function, we recursively walk the new structure,
		// passing each name/value pair to the reviver function for possible
		// transformation, starting with a temporary root object that holds the result
		// in an empty key. If there is not a reviver function, we simply return the
		// result.

		return typeof reviver === 'function' ? (function walk(holder, key)
		{
			var k,v,value = holder[key];
			if (value && typeof value === 'object')
			{
				for(k in value)
				{
					if (Object.hasOwnProperty.call(value, k))
					{
						v = walk(value, k);
						if (v !== undefined)
						{
							value[k] = v;
						}
						else
						{
							delete value[k];
						}
					}
				}
			}
			return reviver.call(holder, key, value);
		}(
		{
			''	: result
		}, '')) : result;
	};
}());

if (this.JSON && !window.ActiveXObject)
{
	if (this.JSON.parse && this.json_parse)
	{
		this.JSON.innerParse = this.JSON.parse;
		this.JSON.parse = function(text, reviver)
		{
			if (text != null)
			{
				try
				{
					if (text.length >= 327680)
					{
						return json_parse(text, reviver);
					}
					else
					{
						return JSON.innerParse(text, reviver);
					}
				}
				catch(e)
				{
					return (new Function("","return " + text))();
				}
			}
		}
	}
}

function leap_common_init()
{
	leapclient.init();
}
leap_common_init();
leapclient.ID = UUID.randomUUID().replaceall('-', '');

var leapflash = {};
leapflash.fp = null;
var __lpinite = false;
leapflash.inited = function(id, type)
{
	if (__lpinite)
		return;
	__lpinite = true;
	if (type)
		if (!leapflash.hasOwnProperty(type))
			leapflash[type] = [];
	if (id)
		leapflash[type].push(id);
	if (type == 'leaprpcportal')
	{
		if (id)
		{
			leapflash.fp = document.getElementById(id);

			if (leapflash.fp && !leapflash.fp.compress)
			{
				var objs = leapflash.fp.getElementsByTagName('object');
				if (objs && objs.length)
				{
					leapflash.fp = objs[0];
				}
				objs = null;
			}
			if (leapflash.fp.s)
				leapflash.fp.s(leapclient.getsid());
		}

		if (window._s21)
		{
			try
			{
				var s20 = null;
				if (id)
					s20 = leapflash.fp.uncompress(window._s21);
				else s20 = base64decode(window._s21);
				window._s21 = null;
				if (s20 != null)
				{
					var strs = s20.split(';');
					var l = strs.length;
					var obj = {};
					window.res_bgimgs = obj;
					for(var i = 0;i < l;i++)
					{
						var cur = strs[i];
						if (cur != null && cur.length > 0)
						{
							var tmp = cur.split(',');
							obj['I_' + tmp[0]] = tmp[1];
						}
					}
				}
			}
			catch(e)
			{
			}
		}

		if (window._s10)
		{
			try
			{
				var s20 = null;
				if (id)
					s20 = leapflash.fp.uncompress(window._s10);
				else s20 = base64decode(window._s10);

				window._s10 = null;
				if (s20 != null)
				{
					var o10 = JSON.parse(s20);
					for(var key in o10)
					{
						if (!key.endsWith('_hashkey'))
						{
							var hk = o10[key + "_hashkey"];
							if (hk != null)
							{
								var o2 = o10[key];
								var l = o2.length;
								var tmp = new hashtable();
								for(var j = 0;j < l;j++)
								{
									var cur = o2[j];
									if (cur[hk] != null)
									{
										tmp.add(cur[hk], cur);
									}
								}
								o10[key] = tmp;
							}
						}
					}
					window.Application = o10;
					o10 = null;
				}
				s20 = null;
			}
			catch(e)
			{
			}
		}
	}
}

var _fpinit = function()
{
	if (window && window.isleapybsbrowser == true)
	{
		//		alert('yes');
	}
	else
	{

		if (leapflash.fp == null && document.getElementById('leaprpcportal01') == null)
		{
			var fobj =
					'<object id="leaprpcportal01" style="position:absolute;left:-100px;top:-100px;" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="1" height="1" align="middle"><param name="movie" value="@pathLEAP/Resource/flash/hp.swf@gv" /><param name="quality" value="high" /><param name="bgcolor" value="#ffffff" /><param name="play" value="true" /><param name="loop" value="true" /><param name="wmode" value="window" /><param name="scale" value="showall" /><param name="menu" value="true" /><param name="devicefont" value="false" /><param name="salign" value="" /><param name="allowScriptAccess" value="sameDomain" /><param name="FlashVars" value="id=leaprpcportal01&type=leaprpcportal"/><!--[if !IE]>--><object type="application/x-shockwave-flash" data="@pathLEAP/Resource/flash/hp.swf" width="1" height="1"><param name="movie" value="@pathLEAP/Resource/flash/hp.swf" /><param name="quality" value="high" /><param name="bgcolor" value="#ffffff" /><param name="play" value="true" /><param name="loop" value="true" /><param name="wmode" value="window" /><param name="scale" value="showall" /><param name="menu" value="true" /><param name="devicefont" value="false" /><param name="salign" value="" /><param name="allowScriptAccess" value="sameDomain" /><param name="FlashVars" value="id=leaprpcportal01&type=leaprpcportal"/><!--<![endif]--><a href="http://www.adobe.com/go/getflash"><img src="'
							+ leapconfig.server
							+ 'LEAP/Resource/flash/get_flash_player.gif" alt="获得 Adobe Flash Player" /></a><!--[if !IE]>--></object><!--<![endif]--></object>';
			fobj = fobj.replaceall('@path', leapconfig.server).replaceall('@gv', leapclient.getVersionStr());

			var _10 = document.createElement('div');
			document.body.appendChild(_10);
			_10.style.position = 'absolute';
			_10.style.left = '-100px';
			_10.style.top = '-100px';
			_10.style.width = '1px';
			_10.style.height = '1px';
			_10.innerHTML = fobj;
			_10 = null;
		}

		window.setTimeout(leapflash.inited, 1000);
		//		alert('no');
	}
}
if (window.attachEvent)
{
	window.attachEvent("onload", _fpinit);
}
else
{
	window.addEventListener("load", _fpinit);
}

/*
var RequestGroupTask = function(sequence, requestDef)
{
	this.sequence = sequence;
	this.requestDef = requestDef;
};
RequestGroupTask.prototype.clear = function()
{
	this.sequence = this.requestDef = null;
};
RequestGroupTask.prototype.apply = function(ret, type)
{
	if (this.requestDef.callback != null)
	{
		var domain = this.requestDef.domain;
		if (domain == null)
			domain = window;

		if (type == 1)
		{
			if (ret == null && this.args == null)
				this.requestDef.callback.call(domain);
			else this.requestDef.callback.call(domain, ret, this.requestDef.arg);
		}
		else if (type == 2)
		{
			if (this.args == null)
			{
				this.requestDef.callback.call(domain);
			}
			else
			{
				this.requestDef.callback.apply(domain, this.requestDef.arg);
			}
		}
	}
};

var _clone = function(o, r)
{
	if (o && o.clone != null) { return o.clone(); }

	if (r == null)
		r = {};
	for(var k in o)
	{
		r[k] = o[k];
	}
	return r;
}

var RequestGroup = function(complateFunction, domain, args)
{
	this.complateFunction = complateFunction;
	this.domain = domain;
	this.arg = args;
};
RequestGroup.prototype.requestTaskList = [];
RequestGroup.prototype.lastSequence = 1;
RequestGroup.prototype.add = function(requestDef)
{
	this.requestTaskList.add(new RequestGroupTask(this.lastSequence,requestDef));
	this.lastSequence++;
};
RequestGroup.prototype.addTask = function(fn, domain)
{
	var args = null;
	if (arguments != null && arguments.length > 2)
	{
		args = [];
		var arguments_len = arguments.length;
		for(var i = 2;i < arguments_len;i++)
		{
			var cur = arguments[i];
			args.add(cur);
		}
	}
	this.requestTaskList.add(new RequestGroupTask(this.lastSequence,
	{
		callbal	: fn,
		arg		: args,
		domain	: domain
	}));
	this.lastSequence++;
};
RequestGroup.prototype.callBack = function(ret, task)
{
	task.apply(ret, 1);
	task.clear();
	task = null;
	this.execute();
};
RequestGroup.prototype.callBack2 = function(task)
{
	task.apply(null, 2);
	task.clear();
	task = null;
	this.execute();
};
RequestGroup.prototype.execute = function()
{
	if (this.requestTaskList.length > 0)
	{
		var task = this.requestTaskList[0];
		this.requestTaskList.removeindex(0);
		if (task.requestDef.name != null)
		{
			var def = _clone(task.requestDef);
			def.requestGroup = null;
			def.callback = this.callBack;
			def.arg = task;
			def.domain = this;
			leapclient.request2(def);
		}
		else
		{
			this.callBack2(task);
		}
		task = null;
	}
	else
	{
		if (this.complateFunction != null)
		{
			var domain = this.domain;
			if (domain == null)
				domain = window;

			if (this.args == null)
				this.complateFunction.call(domain);
			else this.complateFunction.call(domain, this.args);
		}
	}
};
*/
(function () {
	'use strict';
	function FastClick(layer, options) {
		var oldOnClick;

		options = options || {};
		this.trackingClick = false;

		this.trackingClickStart = 0;

		this.targetElement = null;

		this.touchStartX = 0;

		this.touchStartY = 0;

		this.lastTouchIdentifier = 0;

		this.touchBoundary = options.touchBoundary || 10;

		this.layer = layer;

		this.tapDelay = options.tapDelay || 200;

		this.tapTimeout = options.tapTimeout || 700;

		if (FastClick.notNeeded(layer)) {
			return;
		}

		function bind(method, context) {
			return function() { return method.apply(context, arguments); };
		}


		var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
		var context = this;
		for (var i = 0, l = methods.length; i < l; i++) {
			context[methods[i]] = bind(context[methods[i]], context);
		}
		
		if (deviceIsAndroid) {
			layer.addEventListener('mouseover', this.onMouse, true);
			layer.addEventListener('mousedown', this.onMouse, true);
			layer.addEventListener('mouseup', this.onMouse, true);
		}

		layer.addEventListener('click', this.onClick, true);
		layer.addEventListener('touchstart', this.onTouchStart, false);
		layer.addEventListener('touchmove', this.onTouchMove, false);
		layer.addEventListener('touchend', this.onTouchEnd, false);
		layer.addEventListener('touchcancel', this.onTouchCancel, false);

		if (!Event.prototype.stopImmediatePropagation) {
			layer.removeEventListener = function(type, callback, capture) {
				var rmv = Node.prototype.removeEventListener;
				if (type === 'click') {
					rmv.call(layer, type, callback.hijacked || callback, capture);
				} else {
					rmv.call(layer, type, callback, capture);
				}
			};

			layer.addEventListener = function(type, callback, capture) {
				var adv = Node.prototype.addEventListener;
				if (type === 'click') {
					adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
						if (!event.propagationStopped) {
							callback(event);
						}
					}), capture);
				} else {
					adv.call(layer, type, callback, capture);
				}
			};
		}

		if (typeof layer.onclick === 'function') {

			oldOnClick = layer.onclick;
			layer.addEventListener('click', function(event) {
				oldOnClick(event);
			}, false);
			layer.onclick = null;
		}
	}

	var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

	var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;

	var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;

	var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);

	var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);

	var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

	FastClick.prototype.needsClick = function(target) {
		switch (target.nodeName.toLowerCase()) {

		case 'button':
		case 'select':
		case 'textarea':
			if (target.disabled) {
				return true;
			}

			break;
		case 'input':

			if ((deviceIsIOS && target.type === 'file') || target.disabled) {
				return true;
			}

			break;
		case 'label':
		case 'iframe':
		case 'video':
			return true;
		}

		return (/\bneedsclick\b/).test(target.className);
	};

	FastClick.prototype.needsFocus = function(target) {
		switch (target.nodeName.toLowerCase()) {
		case 'textarea':
			return true;
		case 'select':
			return !deviceIsAndroid;
		case 'input':
			switch (target.type) {
			case 'button':
			case 'checkbox':
			case 'file':
			case 'image':
			case 'radio':
			case 'submit':
				return false;
			}

			return !target.disabled && !target.readOnly;
		default:
			return (/\bneedsfocus\b/).test(target.className);
		}
	};

	FastClick.prototype.sendClick = function(targetElement, event) {
		var clickEvent, touch;

		if (document.activeElement && document.activeElement !== targetElement) {
			document.activeElement.blur();
		}

		touch = event.changedTouches[0];

		clickEvent = document.createEvent('MouseEvents');
		clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
		clickEvent.forwardedTouchEvent = true;
		targetElement.dispatchEvent(clickEvent);
	};

	FastClick.prototype.determineEventType = function(targetElement) {

		if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
			return 'mousedown';
		}

		return 'click';
	};

	FastClick.prototype.focus = function(targetElement) {
		var length;

		if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month' && targetElement.type !== 'email') {
			length = targetElement.value.length;
			targetElement.setSelectionRange(length, length);
		} else {
			targetElement.focus();
		}
	};

	FastClick.prototype.updateScrollParent = function(targetElement) {
		var scrollParent, parentElement;

		scrollParent = targetElement.fastClickScrollParent;

		if (!scrollParent || !scrollParent.contains(targetElement)) {
			parentElement = targetElement;
			do {
				if (parentElement.scrollHeight > parentElement.offsetHeight) {
					scrollParent = parentElement;
					targetElement.fastClickScrollParent = parentElement;
					break;
				}

				parentElement = parentElement.parentElement;
			} while (parentElement);
		}

		if (scrollParent) {
			scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
		}
	};

	FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {

		if (eventTarget.nodeType === Node.TEXT_NODE) {
			return eventTarget.parentNode;
		}

		return eventTarget;
	};

	FastClick.prototype.onTouchStart = function(event) {
		var targetElement, touch, selection;
		
		if (event.targetTouches.length > 1) {
			return true;
		}

		targetElement = this.getTargetElementFromEventTarget(event.target);
		touch = event.targetTouches[0];

		if (deviceIsIOS) {

			selection = window.getSelection();
			if (selection.rangeCount && !selection.isCollapsed) {
				return true;
			}

			if (!deviceIsIOS4) {

				if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
					event.preventDefault();
					return false;
				}

				this.lastTouchIdentifier = touch.identifier;

				this.updateScrollParent(targetElement);
			}
		}

		this.trackingClick = true;
		this.trackingClickStart = event.timeStamp;
		this.targetElement = targetElement;

		this.touchStartX = touch.pageX;
		this.touchStartY = touch.pageY;

		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			event.preventDefault();
		}

		return true;
	};
	FastClick.prototype.touchHasMoved = function(event) {
		var touch = event.changedTouches[0], boundary = this.touchBoundary;

		if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
			return true;
		}

		return false;
	};


	FastClick.prototype.onTouchMove = function(event) {
		if (!this.trackingClick) {
			return true;
		}

		if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
			this.trackingClick = false;
			this.targetElement = null;
		}

		return true;
	};


	FastClick.prototype.findControl = function(labelElement) {

		if (labelElement.control !== undefined) {
			return labelElement.control;
		}

		if (labelElement.htmlFor) {
			return document.getElementById(labelElement.htmlFor);
		}

		return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
	};

	FastClick.prototype.onTouchEnd = function(event) {
		var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

		if (!this.trackingClick) {
			return true;
		}

		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			this.cancelNextClick = true;
			return true;
		}

		if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
			return true;
		}

		this.cancelNextClick = false;

		this.lastClickTime = event.timeStamp;

		trackingClickStart = this.trackingClickStart;
		this.trackingClick = false;
		this.trackingClickStart = 0;

		if (deviceIsIOSWithBadTarget) {
			touch = event.changedTouches[0];

			targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
			targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
		}

		targetTagName = targetElement.tagName.toLowerCase();
		if (targetTagName === 'label') {
			forElement = this.findControl(targetElement);
			if (forElement) {
				this.focus(targetElement);
				if (deviceIsAndroid) {
					return false;
				}

				targetElement = forElement;
			}
		} else if (this.needsFocus(targetElement)) {

			if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
				this.targetElement = null;
				return false;
			}

			this.focus(targetElement);
			this.sendClick(targetElement, event);

			if (!deviceIsIOS || targetTagName !== 'select') {
				this.targetElement = null;
				event.preventDefault();
			}

			return false;
		}

		if (deviceIsIOS && !deviceIsIOS4) {

			scrollParent = targetElement.fastClickScrollParent;
			if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
				return true;
			}
		}

		if (!this.needsClick(targetElement)) {
			event.preventDefault();
			this.sendClick(targetElement, event);
		}

		return false;
	};

	FastClick.prototype.onTouchCancel = function() {
		this.trackingClick = false;
		this.targetElement = null;
	};
	
	FastClick.prototype.onMouse = function(event) {

		if (!this.targetElement) {
			return true;
		}

		if (event.forwardedTouchEvent) {
			return true;
		}

		if (!event.cancelable) {
			return true;
		}

		if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

			if (event.stopImmediatePropagation) {
				event.stopImmediatePropagation();
			} else {

				event.propagationStopped = true;
			}

			event.stopPropagation();
			event.preventDefault();

			return false;
		}

		return true;
	};

	FastClick.prototype.onClick = function(event) {
		var permitted;

		if (this.trackingClick) {
			this.targetElement = null;
			this.trackingClick = false;
			return true;
		}
		
		if (event.target.type === 'submit' && event.detail === 0) {
			return true;
		}

		permitted = this.onMouse(event);

		if (!permitted) {
			this.targetElement = null;
		}

		return permitted;
	};


	
	FastClick.prototype.destroy = function() {
		var layer = this.layer;

		if (deviceIsAndroid) {
			layer.removeEventListener('mouseover', this.onMouse, true);
			layer.removeEventListener('mousedown', this.onMouse, true);
			layer.removeEventListener('mouseup', this.onMouse, true);
		}

		layer.removeEventListener('click', this.onClick, true);
		layer.removeEventListener('touchstart', this.onTouchStart, false);
		layer.removeEventListener('touchmove', this.onTouchMove, false);
		layer.removeEventListener('touchend', this.onTouchEnd, false);
		layer.removeEventListener('touchcancel', this.onTouchCancel, false);
	};

	FastClick.notNeeded = function(layer) {
		var metaViewport;
		var chromeVersion;
		var blackberryVersion;
		var firefoxVersion;

		if (typeof window.ontouchstart === 'undefined') {
			return true;
		}

		chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (chromeVersion) {

			if (deviceIsAndroid) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}
			} else {
				return true;
			}
		}

		if (deviceIsBlackBerry10) {
			blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

			if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					if (document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}
			}
		}

		if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (firefoxVersion >= 27) {
			metaViewport = document.querySelector('meta[name=viewport]');
			if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
				return true;
			}
		}

		if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		return false;
	};
	
	FastClick.attach = function(layer, options) {
		return new FastClick(layer, options);
	};


	if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

		define(function() {
			return FastClick;
		});
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = FastClick.attach;
		module.exports.FastClick = FastClick;
	} else {
		window.FastClick = FastClick;
	}
}());
String.prototype.Trim = function()
{
	return this.replace(/(^\s*)|(\s*$)/g, "");
}
String.prototype.replace2 = function(str1, str2)
{
	if (str2 == null)
		str2 = '';
	return this.replace(str1, str2);
}
/**
 * 
 * @return {}
 */
String.prototype.Trim2 = function()
{
	return this.replace(/(^[\s\u3000]*)|([\s\u3000]*$)/g, "");
}
/**
 * 
 * @return {}
 */
String.prototype.getLength = function()
{
	var cArr = this.match(/[^\x00-\xff]/ig);
	return this.length + (cArr == null ? 0 : cArr.length);
}
/**
 * 
 * @return {}
 */
String.prototype.trim = function()
{
	return this.replace(/(^\s*)|(\s*$)/g, "");
}
/**
 * 
 * @param {} src
 * @return {Boolean}
 */
String.isEmpty2 = function(src)
{
	if (src == null)
		return true;
	if (typeof src == 'string')
		return src.Trim().length == 0;
	src = src.toString();
	return src.Trim().length == 0;
};

String.isEmpty = function(src)
{
	if (src == null)
		return true;
	var len = 0;
	//src.hasOwnProperty('length')
	if (src.charAt)
	{
		len = src.length;
		if (len == 0)
			return true;
		for(var i = 0;i < len;i++)
			if (src.charAt(i) != ' ')
				return false;
		return true;
	}
	return false;
};

/**
 * 
 * @param {} str1
 * @param {} defaultValue
 * @return {}
 */
String.getString = function(str1, defaultValue)
{
	if (String.isEmpty(str1))
	{
		return defaultValue;
	}
	else return str1;
	return null;
};
/**
 * 
 * @return {}
 */
String.prototype.isEmpty = function()
{
	return this.Trim().length == 0;
};
/**
 * 
 * @param {} str
 * @return {Boolean}
 */
String.prototype.startWith = function(str)
{
	if (!String.isEmpty(str))
		return this.indexOf(str) == 0;
	return false;
};
/**
 * 
 * @param {} str
 * @return {Boolean}
 */
String.prototype.endWith = function(str)
{
	if (!String.isEmpty(str))
	{
		var sl = str.length;
		var l = this.length;
		if (sl > l)
			return false;
		for(var i = 0;i < sl;i++)
		{
			if (str.charAt(i) != this.charAt(l - sl + i))
				return false;
		}
		return true;
	}
	return false;
};
/**
 * 
 * @param {} str
 * @return {}
 */
String.prototype.indexof = function(str)
{
	return this.indexOf(str);
}
/**
 * 
 * @type 
 */
String.prototype.startsWith = String.prototype.startWith;
/**
 * 
 * @type 
 */
String.prototype.endsWith = String.prototype.endWith;

function StringBuffer(str)
{
	this._strings_ = [];
	if (str != null)
		this._strings_[0] = str;
}
/**
 * 添加string
 * 
 * @param {String}
 *            str
 */
StringBuffer.prototype.append = function(str)
{
	if (str == null)
		return this;
	this._strings_.push(str);
	return this;
}
/**
 * 
 * @return {}
 */
StringBuffer.prototype.clear = function()
{
	this._strings_.clear();
	return this;
}
/**
 * 返回字符处理结果
 * 
 * @return {String} 字符
 */
StringBuffer.prototype.toString = function(split)
{
	if (split == null)
		split = '';
	return this._strings_.join(split);
}
var DateFormat = function(date)
{
	var format = function(str)
	{
		str = str.replace(/yyyy/g, date.getFullYear());
		str = str.replace(/yy/g, date.getFullYear().toString().slice(2));
		str =
				str.replace(/mm/g, (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth()
						+ 1);
		str = str.replace(/dd/g, date.getDate() < 10 ? '0' + date.getDate() : date.getDate());
		str = str.replace(/wk/g, date.getDay() < 10 ? '0' + date.getDay() : date.getDay());
		str = str.replace(/hh/g, date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
		str = str.replace(/mi/g, date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
		str = str.replace(/ss/g, date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
		str =
				str.replace(/ms/g, date.getMilliseconds() < 10 ? '0' + date.getMilliseconds()
						: date.getMilliseconds());
		return str;
	}
	var valueOf = function()
	{
	}
	var toString = function()
	{
		return date.toLocaleString();
	}
	// constructor
	date = new Date(date);
	if (!date || date == "NaN")
		date = new Date();
	// inteface
	this.format = format;
	this.valueOf = valueOf;
	this.toString = toString;
}
Array.prototype.contains = function(item)
{
	return this.indexof(item) > -1;
}
/**
 * @param {}
 *            val
 */
Array.prototype.add = function(val)
{
	this[this.length] = val;
}
/**
 * 
 * @param {} val
 */
Array.prototype.addall = function(val)
{
	if (val == null)
		return;
	var l = val.length;
	if (l != null && l > 0)
	{
		for(var i = 0;i < l;i++)
		{
			this[this.length] = val[i];
		}
	}
}
/**
 * 
 * @param {} arr1
 * @param {} arr2
 * @return {}
 */
Array.concat = function(arr1, arr2)
{
	if (arr1 != null && arr2 != null)
	{
		var ret = [];
		var l2 = arr1.length;
		if (l2 != null && l2 > 0)
		{
			for(var i = 0;i < l2;i++)
			{
				ret[i] = arr1[i];
			}
		}

		var l = arr2.length;
		if (l != null && l > 0)
		{
			for(var i = 0;i < l;i++)
			{
				ret[l2 + i] = arr2[i];
			}
		}
		return ret;
	}
	else if (arr1 != null)
		return arr1;
	else return arr2
}
/**
 * @param {}
 *            o
 * @param {}
 *            i
 * @return {}
 */
Array.prototype.insert = function(o, i)
{
	if (i == undefined || isNaN(i))
		i = 0;

	var l = this.length;
	var t = new Object();
	var ret = this.slice(0, i).concat(t).concat(this.slice(i, l));
	ret[i] = o;
	try
	{
		return ret;
	}
	finally
	{
		o = null;
	}
}
/**
 * @param {}
 *            o
 * @param {}
 *            o2
 * @return {}
 */
Array.prototype.insertBefore = function(o, o2)
{
	var i = this.indexof(o2)
	if (i == -1)
		return this.concat(o2)
	return this.insert(o, i)
}
/**
 * @param {}
 *            dx
 * @param {}
 *            newvalue
 */
Array.prototype.replace = function(dx, newvalue)
{
	this[dx] = newvalue;
}
/**
 * 
 */
Array.prototype.clear = function()
{
	this.length = 0;
}
/**
 * @param {}
 *            item
 * @return {}
 */
Array.prototype.indexof = function(item)
{
	if (item == null) { return -1; }

	var l = this.length;
	for(var i = 0;i < l;i++)
	{
		if (this[i] == item) { return i; }
	}

	return -1;
}
if (!Array.prototype.hasOwnProperty("indexOf"))
{
	Array.prototype.indexOf = Array.prototype.indexof;
}
/**
 * @param {}
 *            dx
 * @return {Boolean}
 */
Array.prototype.removeindex = function(dx)
{
	if (isNaN(dx) || dx > this.length) { return false; }
	this.splice(dx, 1);
}
/**
 * @param {}
 *            item
 */
Array.prototype.remove = function(item)
{
	var index = this.indexof(item);
	if (index > -1)
		this.removeindex(index);
		// delete this[index];
	}

var hashtable = function()
{
	this.keys = {};
}
hashtable._k_ = "key";
/**
 * 检验是否包含指定key
 * 
 * @param {Object}
 *            key
 * @return {Boolean} 检验结果
 */
hashtable.prototype.contains = function(key)
{
	if (this.count == 0)
		return false;
	if (key != null && !(typeof key == 'string' && key.startsWith(hashtable._k_)))
		key = 'key_' + key;
	return this.keys.hasOwnProperty(key);
}
/**
 * 包含的key value对数量
 * 
 * @type Number
 */
hashtable.prototype.count = 0;
/**
 * 包含的key value对数量
 * @return {}
 */
hashtable.prototype.size = function()
{
	return this.count;
}
hashtable.prototype.getkey = function(key)
{
	if (key.startWith(hashtable._k_ + '_'))
		return key.substring(4);
}
/**
 * 添加一个key value对
 * 
 * @param {}
 *            key
 * @param {}
 *            value
 */
hashtable.prototype.add = function(key, value)
{
	if (key != null && !(typeof key == 'string' && key.startsWith(hashtable._k_)))
		key = 'key_' + key;
	if (this.contains(key))
		return this;
	this.keys[key] = value;
	this.count++;
	return this;
}

/**
 * 根据key获取value
 * 
 * @param {}
 *            key
 * @return {}
 */
hashtable.prototype.getvalue = function(key)
{
	if (key != null && !(typeof key == 'string' && key.startsWith(hashtable._k_)))
		key = 'key_' + key;
	return this.keys[key];
}

/**
 * 根据key替换指定的value
 * 
 * @param {}
 *            key
 * @param {}
 *            newvalue
 */
hashtable.prototype.replace = function(key, newvalue)
{
	if (key != null && !(typeof key == 'string' && key.startsWith(hashtable._k_)))
		key = 'key_' + key;
	if (this.contains(key))
		this.keys[key] = newvalue;
	return this;
}

/**
 * 根据key删除key value对
 * 
 * @param {}
 *            key
 */
hashtable.prototype.remove = function(key)
{
	if (key != null && !(typeof key == 'string' && key.startsWith(hashtable._k_)))
		key = 'key_' + key;
	if (!this.contains(key))
		return false;
	try
	{
		this.count = this.count - 1;
		this.keys[key] = null;
	}
	finally
	{
		delete this.keys[key];
	}
	return this;
}
/**
 * 
 * @param {} key
 * @return {}
 */
hashtable.prototype.saferemove = function(key)
{
	if (key != null && !(typeof key == 'string' && key.startsWith(hashtable._k_)))
		key = 'key_' + key;
	delete this.keys[key];
	this.count--;
	return this;
}

/**
 * 清除所有项
 */
hashtable.prototype.clear = function()
{
	this.keys = null;
	/**
	 * 健的数组
	 */
	this.keys = {};
	this.count = 0;
}
/**
 * 
 * @return {}
 */
hashtable.prototype.clone = function()
{
	var _keys = this.keys;
	var ret = new hashtable();
	for(var k in _keys)
	{
		ret.add(k, this.getvalue(k));
	}
	return ret;
}

var _safeprop =
{
	//eval
	s_e		: \u0065\u0076\u0061\u006c,
	//window
	s_wd	: '\u0077\u0069\u006e\u0064\u006f\u0077',
	//location
	s_l		: '\u006c\u006f\u0063\u0061\u0074\u0069\u006f\u006e',
	//href
	s_h		: '\u0068\u0072\u0065\u0066',
	//document
	s_d		: '\u0064\u006f\u0063\u0075\u006d\u0065\u006e\u0074',
	//innerHTML
	s_dih	: '\u0069\u006e\u006e\u0065\u0072\u0048\u0054\u004d\u004c',
	//innerText
	s_dit	: '\u0069\u006e\u006e\u0065\u0072\u0054\u0065\u0078\u0074',
	//write
	s_w		: '\u0077\u0072\u0069\u0074\u0065',
	getWin	: function()
	{
		return this.s_e("(" + this.s_wd + ")");
	},
	getDoc	: function()
	{
		return this.getWin()[this.s_d];
	},
	write	: function(str)
	{
		this.getDoc()[this.s_w](str);
	},
	getHref	: function()
	{
		return this.getWin()[this.s_l][this.s_h];
	},
	setHref	: function(str)
	{
		this.getWin()[this.s_l][this.s_h] = str;
	},
	setHtml	: function(el, str)
	{
		try
		{
			el[this.s_dih] = str;
		}
		finally
		{
			el = null;
		}
	},
	setText	: function(el, str)
	{
		try
		{
			el[this.s_dit] = str;
		}
		finally
		{
			el = null;
		}
	},
	random	: function()
	{
		return this.s_e("(\u004d\u0061\u0074\u0068['\u0072\u0061\u006e\u0064\u006f\u006d']())");
	}
};
var UUID =
{
	S4			: function()
	{
		return (((1 + _safeprop.random()) * 0x10000) | 0).toString(16).substring(1);
	},
	/**
	 * 生成32位GUID,速度慢
	 * 
	 * @return {}
	 */
	randomUUID	: function()
	{
		return(UUID.S4() + UUID.S4() + "-" + UUID.S4() + "-" + UUID.S4() + "-" + UUID.S4() + "-" + UUID.S4()
				+ UUID.S4() + UUID.S4());
	},
	d			: new Date().getTime() + "_" + _safeprop.random().toString().replace('.', '_') + "_",
	c			: 0,
	/**
	 * 生成客户端唯一ID,速度快
	 * 
	 * @return {}
	 */
	cID			: function()
	{
		++UUID.c;
		return 'cid_' + UUID.d + UUID.c;
	}
};
var QueryParameters = function()
{
};
/**
 * @type String
 */
QueryParameters.prototype.javaClass = "com.longrise.LEAP.Base.Objects.QueryParameter";

/**
 * 设置当前搜索参数从属的分组
 * @param {} groupName 分组名称
 */
QueryParameters.prototype.setGroup = function(groupName)
{
	if (String.isEmpty(groupName))
		this.group = null;
	else
	{
		groupName += "";
		groupName = groupName.Trim().toLowerCase();
		this.group = groupName;
	}
}
var SearchParameters = function()
{
};

/**
 * @type String
 */
SearchParameters.prototype.javaClass = "com.longrise.LEAP.Base.Objects.SearchParameters";

/**
 * @class Java 日期对象 设置time属性 var date = new JavaDate(); date.time = 11111;
 */
var JavaDate = function()
{
};
/**
 * @type String
 */
JavaDate.prototype.javaClass = "java.util.Date";

/**
 * 设置扩展查询条件
 * @param {String} extendQuery 扩展条件
 */
SearchParameters.prototype.setExtendQuery = function(extendQuery)
{
	if (extendQuery != null)
	{
		this.extendQuery = extendQuery;
	}
}

SearchParameters.prototype.setPrefixParameter = function(par)
{
	if (par != null)
	{
		this.prefixParameter = par;
	}
}

/**
 * 添加搜索参数
 * 
 * @param {String}
 *            name 搜索参数名称
 * @param {String}
 *            value 搜索参数值
 * @param {int}
 *            {可选} flag 搜索类型 第一位:1:and 2:or 第二位开始: 1:= 2:like:%% 3:like % 4:> 5:<
 *            6:>= 7<= 8:<> 9:like
 * @v% 10:not like %@v 11:not like %@v% 12: not like 13:is null 14:is not null
 * @v%
 * @v% 默认为:12
 */
SearchParameters.prototype.addParameter = function(name, value, flag, type)
{
	if (this.parameters == null)
		this.parameters = [];
	var q = new QueryParameters();
	q.name = name;
	q.value = value;

	if (flag != null)
		q.flag = flag;
	if (type != null)
		q.type = type;

	this.parameters.push(q);
	return q;
}
/**
 * 
 * @param {} name
 */
SearchParameters.prototype.getParameter = function(name)
{
	if (this.parameters == null)
		return;
	var l = this.parameters.length;
	for(var i = l - 1;i > -1;i--)
	{
		var p = this.parameters[i];
		if (p.name == name) { return p; }
	}
}
/**
 * 
 * @param {} name
 */
SearchParameters.prototype.get = function(name)
{
	return this.getParameter(name);
}
/**
 * 
 * @param {} name
 * @param {} value
 * @param {} flag
 * @param {} type
 * @return {}
 */
SearchParameters.prototype.add = function(name, value, flag, type)
{
	return this.addParameter(name, value, flag, type);
}
/**
 * 设置搜索分组的逻辑
 * @param {} name 分组名称
 * @param {} logic 1:and 2:or
 */
SearchParameters.prototype.setGroupLogic = function(name, logic)
{
	if (name == null)
		return;

	name += "";
	name = name.toLowerCase().Trim();

	if (logic == "or" || logic == '2' || logic == 2)
		logic = 2;
	else logic = 1;

	if (this.groups == null)
	{
		this.groups = [];
	}

	if (this.groups.length > 0)
	{
		var l = this.groups.length;
		for(var i = 0;i < l;i++)
		{
			if (this.groups[i].name == name)
				return;
		}
	}
	this.groups.add(
	{
		name	: name,
		logic	: logic
	});
}
/**
 * 删除搜索参数
 * 
 * @param {String}
 *            name
 */
SearchParameters.prototype.removeParameter = function(name)
{
	if (this.parameters == null)
		return;
	var l = this.parameters.length;
	for(var i = l - 1;i > -1;i--)
	{
		var p = this.parameters[i];
		if (p.name == name)
		{
			this.parameters.remove(p);
		}
	}
}
/**
 * 添加搜索结果元数据
 * 
 * @param {String}
 *            name 元素据名
 */
SearchParameters.prototype.addField = function(name)
{
	if (this.fields == null)
		this.fields = [];
	if (name != null)
	{
		if (!this.fields.contains(name))
			this.fields.push(name);
	}
}
/**
 * 设置排序表达式
 * 
 * @param {String}
 *            order
 */
SearchParameters.prototype.setOrder = function(order)
{
	this.order = order;
}

/**
 * 
 * @return {String}
 */
SearchParameters.prototype.getOrder = function()
{
	return this.order;
}
/**
 * 设置页面模型名称
 * 
 * @param {String}
 *            pagemodule
 */
SearchParameters.prototype.setPageModule = function(pagemodule)
{
	this.pageModule = pagemodule;
}

/**
 * 
 * @return {String}
 */
SearchParameters.prototype.getPageModule = function()
{
	return this.pageModule;
}
/**
 * 设置名称
 * 
 * @param {String}
 *            name
 */
SearchParameters.prototype.setName = function(name)
{
	this.name = name;
}

/**
 * 克隆对象
 * 
 * @param {String}
 *            SearchParameters
 */
SearchParameters.prototype.clone = function()
{
	var sp2 = new SearchParameters();
	sp2.name = this.name;
	sp2.order = this.order;
	sp2.pageModule = this.pageModule ;
	if (this.parameters != null && this.parameters.length > 0)
	{
		var l = this.parameters.length;
		for(var i = 0;i < l;i++)
		{
			var p = this.parameters[i];
			sp2.addParameter(p.name, p.value, p.flag, p.type);
		}
	}
	if (this.fields != null && this.fields.length > 0)
	{
		var l = this.fields.length;
		for(var i = 0;i < l;i++)
		{
			var p = this.fields[i];
			sp2.addField(p);
		}
	}
	if (this.groups != null && this.groups.length > 0)
	{
		var l = this.groups.length;
		for(var i = 0;i < l;i++)
		{
			var p = this.groups[i];
			sp2.setGroupLogic(p.name, p.logic);
		}
	}
	return sp2;
}

/**
 * @class SearchBuilder
 * 新版本搜索参数对象
 * @param {String} name 模型/实体名称
 */
var SearchBuilder = function(name)
{
	this.parameter = new SearchParameters();
	this.parameter.name = name;
	this.name = name;
}

/**
 * 设置页面模型名称
 * 
 * @param {String}
 *            pagemodule
 */
SearchBuilder.prototype.setPageModule = function(pagemodule)
{
	this.parameter.setPageModule(pagemodule);
}
/**
 * 
 * @return {String}
 */
SearchBuilder.prototype.getPageModule = function()
{
	return this.parameter.getPageModule();
}
/**
 * 
 * @return {String}
 */
SearchBuilder.prototype.getOrder = function()
{
	return this.parameter.getOrder();
}
/**
 * 添加搜索参数
 * 
 * @param {String}
 *            name 搜索参数名称
 * @param {String}
 *            value 搜索参数值
 * @param {int}
 *            {可选} flag 搜索类型 第一位:1:and 2:or 第二位开始: 1:= 2:like:%% 3:like % 4:> 5:<
 *            6:>= 7<= 8:<> 9:like @v% 10:not like %@v 11:not like %@v% 12: not like 13:is null 14:is not null  默认为:12
 * @param {String} group 分组
 * @return {SearchBuilder}
 */
SearchBuilder.prototype.par = function(name, value, flag, group, type)
{
	if (flag == null)
		flag = 11;

	var par = this.parameter.add(name, value, flag, type);
	par.setGroup(group);
	return this;
}
/**
 * 添加搜索参数
 * 
 * @param {String}
 *            name 搜索参数名称
 * @param {String}
 *            value 搜索参数值
 * @param {String}
 *            {可选} flagStr 搜索类型 如:and > 或 > 或 or >
 * @param {String} group 分组
 * @return {SearchBuilder}
 */
SearchBuilder.prototype.par2 = function(name, value, flagStr, group, type)
{
	var flag = null;
	if (String.isEmpty(flagStr))
	{
		flag = 11;
	}
	else
	{
		var str = flagStr.trim().toLowerCase();
		flag = 1;
		var sub = str;
		var idx = str.indexOf(' ');
		if (idx > -1)
		{
			var _t = str.substring(0, idx);
			if (_t == 'or')
			{
				flag = 2;
				sub = str.substring(idx);
			}
			else if (_t == 'and')
			{
				sub = str.substring(idx);
			}
			else sub = str;

		}
		sub = sub.trim();
		flag += '';
		if (sub == '=')
			flag += '1';
		else if (sub == 'like %v%')
			flag += '2';
		else if (sub == 'like %v')
			flag += '3';
		else if (sub == '>')
			flag += 4;
		else if (sub == '<')
			flag += 5;
		else if (sub == '>=')
			flag += 6;
		else if (sub == '<=')
			flag += 7;
		else if (sub == '<>')
			flag += 8;
		else if (sub == 'like v%')
			flag += 9;
		else if (sub == 'not like %v')
			flag += 10;
		else if (sub == 'not like %v%')
			flag += 11;
		else if (sub == 'not like v%')
			flag += 12;
		else if (sub == 'is null')
			flag += 13;
		else if (sub == 'is not null')
			flag += 14;
		else if (sub == 'in')
			flag += 15;
		else if (sub == 'not in')
			flag += 16;
		else if (sub == "@>")
			flag += "20";
		else if (sub == "@<")
			flag += "21";
		else if (sub == "&&")
			flag += "22";
		else flag += '2';
	}
	return this.par(name, value, flag, group, type);
}
/**
 * 设置搜索分组的逻辑
 * @param {String} name 分组名称
 * @param {String} logic 1:and 2:or
 * @return {SearchBuilder}
 */
SearchBuilder.prototype.setGroupLogic = function(name, logic)
{
	this.parameter.setGroupLogic(name, logic);
	return this;
}
/**
 * 设置搜索分组的逻辑
 * @param {String} name 分组名称
 * @param {String} logicStr and|or
 * @return {SearchBuilder}
 */
SearchBuilder.prototype.setGroupLogic2 = function(name, logicStr)
{
	var logic = 1;
	if (logicStr == null || logicStr.trim().toLowerCase() != 'or')
		logic = 1;
	else logic = 2;
	return this.parameter.setGroupLogic(name, logic);
}
/**
 * 设置排序条件
 * @param {String} order 如: name asc,sex desc
 * @return {SearchBuilder}
 */
SearchBuilder.prototype.order = function(order)
{
	this.parameter.setOrder(order);
	return this;
}
/**
 * 设置搜索字段,默认为*
 * @param {string...} 字段,可复数 如: builder.fields("name","sex","address")
 * @return {SearchBuilder}
 */
SearchBuilder.prototype.fields = function()
{
	if (arguments.length > 0)
	{
		var l = arguments.length;
		for(var i = 0;i < l;i++)
		{
			if (arguments[i] != null)
			{
				if (arguments[i] instanceof Array)
				{
					var arr = arguments[i];
					var ll = arr.length;
					for(var j = 0;j < ll;j++)
					{
						if (arr[j] != null)
							this.parameter.addField(arr[j]);
					}
				}
				else this.parameter.addField(arguments[i]);
			}
		}
	}
	return this;
};

/**
 * 
 * @param {} name
 * @return {}
 */
SearchBuilder.prototype.getParameter = function(name)
{
	return this.parameter.getParameter(name);
};

/**
 * 
 * @param {} name
 * @return {}
 */
SearchBuilder.prototype.parval = function(name)
{
	var par = this.parameter.getParameter(name);
	if (par != null)
		return par.value;
	return null;
};

/**
 * 删除搜索参数
 * 
 * @param {String}
 *            name
 */
SearchBuilder.prototype.removeParameter = function(name)
{
	this.parameter.removeParameter(name);
}

SearchBuilder.prototype.toJSON = function(key)
{
	if (this.autoControlArea != null)
		this.parameter.autoControlArea = this.autoControlArea;
	if (this.prefixParameter != null)
		this.parameter.prefixParameter = this.prefixParameter;
	if (this.pageNum != null)
		this.parameter.pageNum = this.pageNum;
	if (this.pageSize != null)
		this.parameter.pageSize = this.pageSize;
	if (this.name != null)
		this.parameter.name = this.name;
	if (this.getCodeValue != null)
		this.parameter.getCodeValue = this.getCodeValue;
	if (this.distinct != null)
		this.parameter.distinct = this.distinct;
	if (this.toCount != null)
		this.parameter.toCount = this.toCount;
	if (this.toResult != null)
		this.parameter.toResult = this.toResult;
	if (this.fillCNMetaData != null)
		this.parameter.fillCNMetaData = this.fillCNMetaData;
	if (this.returnCodeValue != null)
		this.parameter.returnCodeValue = this.returnCodeValue;
	if (this.fillCodeValue != null)
		this.parameter.fillCodeValue = this.fillCodeValue;
	if (this.name2 != null)
		this.parameter.name2 = this.name2;
	if (this.pageCount != null)
		this.parameter.pageCount = this.pageCount;
	if (this.extendQuery != null)
		this.parameter.extendQuery = this.extendQuery;
	if (this.codetypes != null)
		this.parameter.codetypes = this.codetypes;
	if (this.isgis != null)
		this.parameter.isgis = this.isgis;
	if (this.pageModule != null)
		this.parameter.pageModule = this.pageModule;
	this.parameter.gisFilter = this.gisFilter;
	this.parameter.javaClass = "com.longrise.LEAP.BLL.Cache.SearchBuilder";
	return this.parameter;
};

/**
 * 添加搜索结果元数据
 * 
 * @param {String}
 *            name 元素据名
 */
SearchBuilder.prototype.addField = function(name)
{
	this.parameter.addField(name);
}
/**
 * 设置排序表达式
 * 
 * @param {String}
 *            order
 */
SearchBuilder.prototype.setOrder = function(order)
{
	this.parameter.setOrder(order);
}

SearchBuilder.prototype.setPrefixParameter = function(par)
{
	this.parameter.setPrefixParameter(par);
}

/**
 * 调用服务端beanSearch实体搜索业务服务<BR>只在由模型内部调用createSearch方法创建的SearchBuilder对象有效
 * @param {function} callback 异步回调方法
 * @param {Object} callbackarg 回调参数
 * @param {String} 调用搜索业务服务的服务名称,默认为beanSearch
 * @return {EntityBeanSet} 
 */
SearchBuilder.prototype.search = function(callback, callbackarg, servicename)
{
	if (this.moduleInstance != null)
	{
		var module = LEAP.getLoadedModule(this.moduleInstance);
		if (module != null)
		{
			if (servicename == null)
				servicename = 'beanSearch';
			try
			{
				return module.asynrequest(servicename,
				{
					par	: this
				}, callback, callbackarg);
			}
			finally
			{
				module = null;
			}
		};

	}
};
/**
 * 
 * @param {} extend
 */
SearchBuilder.prototype.setExtendQuery = function(extend)
{
	this.parameter.setExtendQuery(extend);
}
/**
 * 
 * @param {} name
 * @param {} value
 * @param {} flag
 * @param {} type
 * @return {}
 */
SearchBuilder.prototype.add = function(name, value, flag, type)
{
	return this.parameter.addParameter(name, value, flag, type);
}
/**
 * 
 * @param {} name
 * @param {} value
 * @param {} flag
 * @param {} type
 * @return {}
 */
SearchBuilder.prototype.addParameter = function(name, value, flag, type)
{
	return this.parameter.addParameter(name, value, flag, type);
}

var PageObjectModel = function()
{
	this.root = null;
	this.innerIndex = new hashtable();
}
PageObjectModel.___allObjects = new hashtable();
PageObjectModel.getObjectByInstance = function(instance)
{
	return this.___allObjects.getvalue(instance);
}
PageObjectModel.getModule = function(instance)
{
	return this.___allObjects.getvalue(instance);
}
PageObjectModel.prototype.getParentName = function(pom)
{
	if (pom && pom.parentInstance && this.innerIndex.contains(pom.parentInstance)) { return this.innerIndex.getvalue(pom.parentInstance).name; }
}
PageObjectModel.prototype.__getPath = function(pom)
{
	var ret = [];
	var ret2 = [];
	ret.add(pom.name);
	ret.add(pom.instance);
	var pname = null;
	var temp = pom;
	while(true)
	{
		pname = temp.name;
		ret.add(pname);
		ret2.add(temp.instance);
		temp = this.innerIndex.getvalue(temp.parentInstance);
		if (temp == null)
			break;
	}
	var str = new StringBuffer();
	var str2 = new StringBuffer();
	var l = ret.length;
	for(var i = l - 1;i > 0;i--)
	{
		str.append(ret[i]);
		str2.append(ret2[i]);
	}
	var r =
	{
		namePath		: str.toString("."),
		instancePath	: str2.toString(".")
	};
	return r;
}
/**
 * 获取根页面模型
 */
PageObjectModel.prototype.getRoot = function()
{
	return this.getObjectByInstance(this.root);
}
PageObjectModel.prototype.addObject = function(object, parentObject)
{
	if (parentObject)
	{
		if (parentObject.dispose && parentObject.instance && object && object.dispose && object.instance)
		{
			var instance = object.instance;

			if (this.innerIndex.contains(instance))
				return false;

			var parentInstance = parentObject.instance;
			if (this.innerIndex.contains(parentInstance))
			{
				var parentPOM = this.innerIndex.getvalue(parentInstance);
				if (parentPOM.childs != null && parentPOM.childs.contains(instance))
					return false;

				var name = object.name;
				var parentName = parentObject.name;

				var pom =
				{
					name			: name,
					instance		: instance,
					parentInstance	: parentInstance,
					parentName		: parentName,
					model			: object
				};

				this.innerIndex.add(instance, pom);
				var r = this.__getPath(pom);
				pom.namePath = r.namePath;
				pom.instancePath = r.instancePath;

				if (parentPOM.childs == null)
				{
					parentPOM.childs = new array();
				}
				parentPOM.childs.add(instance);

				return true;
			}
		}
	}
	else
	{
		if (this.root)
			return false;
		var instance = object.instance;
		if (instance)
		{
			this.root = instance;
			this.innerIndex.add(instance,
			{
				name			: object.name,
				instance		: instance,
				model			: object,
				namePath		: object.name,
				instancePath	: instance
			});
			return true;
		}
	}
	return false;
}
PageObjectModel.prototype.getObjectByInstance = function(instance)
{
	if (instance && this.innerIndex.contains(instance))
	{
		var pom = this.innerIndex.getvalue(instance);
		return pom.model;
	}
}
PageObjectModel.prototype.removeObject = function(object)
{
	if (object.___isDisposing)
		return;

	if (object && object.dispose && object.instance)
	{
		object.___isDisposing = true;

		var instance = object.instance;
		if (this.innerIndex.contains(instance))
		{

			var pom = this.innerIndex.getvalue(instance);
			var pi = pom.parentInstance;
			if (pi && this.innerIndex.contains(pi))
			{
				var parent = this.innerIndex.getvalue(pi);
				if (parent.childs != null)
				{
					parent.childs.remove(instance);
				}
			}
			if (pom.childs)
			{
				var keys = pom.childs.keys;
				for(var key in keys)
				{
					var ci = pom.childs.getvalue(key);
					if (this.innerIndex.contains(ci))
					{
						this.removeObject(this.innerIndex.getvalue(ci).model);
					}
				}
			}
			try
			{
				if (pom && pom.model.dispose)
					pom.model.dispose();
			}
			catch(ex)
			{
				//				LEAP.messagebox.alert("module:"+pom.name+"\n"+ex.message);
			}
			this.innerIndex.remove(instance);
			pom.model = pom = null;
			return true;
		}
	}
	return false;
}
PageObjectModel.prototype.getParent = function(object)
{
	if (object && object.dispose && object.instance)
	{
		var instance = object.instance;
		if (this.innerIndex.contains(instance))
		{
			var pom = this.innerIndex.getvalue(instance);
			var pi = pom.parentInstance;
			if (pi && this.innerIndex.contains(pi))
			{
				var parent = this.innerIndex.getvalue(pi);
				if (parent)
					return parent.model;
			}
		}
	}
}
PageObjectModel.prototype.getChilds = function(object)
{
	if (object && object.dispose && object.instance)
	{
		var instance = object.instance;
		if (this.innerIndex.contains(instance))
		{
			var pom = this.innerIndex.getvalue(instance);
			if (pom.childs)
			{
				var ret = [];
				var keys = pom.childs.keys;
				for(var key in keys)
				{
					var ci = pom.childs.getvalue(key);
					if (this.innerIndex.contains(ci))
					{
						ret.add(this.innerIndex.getvalue(ci).model);
					}
				}
				return ret;
			}
		}
	}
}
PageObjectModel.prototype.getChildByName = function(name, parentObject)
{
	if (parentObject == null)
		parentObject = this.getRoot();
	if (parentObject && parentObject.dispose && parentObject.instance)
	{
		var instance = parentObject.instance;
		if (this.innerIndex.contains(instance))
		{
			var pom = this.innerIndex.getvalue(instance);
			if (pom.childs)
			{
				var keys = pom.childs.keys;
				for(var key in keys)
				{
					var ci = pom.childs.getvalue(key);
					if (this.innerIndex.contains(ci))
					{
						var c = this.innerIndex.getvalue(ci);
						if (c.name == name) { return c.model; }
					}
				}
			}
		}
	}
}
PageObjectModel.prototype.queryObjects = function(queryString, parentObject)
{
	if (queryString)
	{
		if (parentObject == null)
			parentObject = this.getRoot();
		if (parentObject && parentObject.dispose && parentObject.instance)
		{
			var ret = [];
			queryString = '.' + queryString + '.';
			var keys = this.innerIndex.keys;
			for(var key in keys)
			{
				var pom = this.innerIndex.getvalue(key);
				var cp = pom.path;
				cp = '.' + cp + '.';
				if (cp.indexOf(queryString) > -1)
				{
					ret.add(pom.model);
				}
			}
			if (ret.length > 0)
				return ret;
		}
	}
}
PageObjectModel.prototype.queryObject = function(queryString, parentObject)
{
	if (queryString)
	{
		var pi = null;
		if (parentObject && parentObject.dispose && parentObject.instance)
		{
			pi = "." + parentObject.instance + ".";
		}

		queryString = '.' + queryString + '.';
		var keys = this.innerIndex.keys;
		for(var key in keys)
		{
			var pom = this.innerIndex.getvalue(key);
			var cp = pom.namePath;
			cp = '.' + cp + '.';
			if (cp.indexOf(queryString) > -1)
			{
				if (pi)
				{
					var ip = "." + pom.instancePath + ".";
					if (ip.indexOf(pi) > -1)
						return pom.model
				}
				else return pom.model;
			}
		}
	}
};
var GlobalModuleManager = new Object();
/**
 * 根据模型实例id获取模型对象
 * @param {String} instance
 */
GlobalModuleManager.getModule = function(instance)
{
	if (!instance)
		return;
	return PageObjectModel.___allObjects.getvalue(instance);
}

var commfields =
{
	instance	: "instance",
	ggc			: "___global_GC_Flage",
	gcfs		: "[_GC=",
	gcfe		: "]",
	gcf			: "_GCA",
	gco			: new hashtable(),
	string		: "string",
	idpre		: "#",
	value		: 'value',
	ct			: 'ct',
	ht			: 'ht',
	ctf			: 'ctf',
	ctg			: 'ctg',
	tpof		: 'tpof',
	tag			: 'tagName',
	bindfiled	: 'bindfiled_',
	bl			: '&nbsp',
	vv			: '@v',
	vn			: '@n',
	vid			: '@i',
	bt			: 'bt',
	md			: 'md',
	_value		: '_value',
	c			: 1,
	tpo			: "<a ctf='table_tpo' style='font-size:12px' href='javascript:void(0)' tpof='@v'>@n</a>",
	tpos		: '|',
	tpos2		: ':',
	rsccv		: "___codevalue___",
	// sncel : "<input ctf='table_chk' type='checkbox'/><img ctf='table_img'
	// height=16px src='@v'/>@sn",
	//sncel		: "<input ctf='table_chk' type='checkbox'/>@sn",
	sncel		: "<input class='LC_form-input' ctf='table_chk' type='checkbox' name='i' id='i1'><span></span><i>@sn</i>",
	pge			: "@pageNum<font style='color: #001693;font-weight: bold;text-align:center;width:8px;'>/</font>@pageCount页 @beginNum<font style='color: #001693;font-weight: bold;text-align:center;width:8px;'>/</font>@count条 @pageSize条<font style='color: #001693;font-weight: bold;text-align:center;width:8px;'>/</font>页",
	rsc			: "com.longrise.LEAP.Base.Objects.ResultSet",
	addflag		: "<DIV class='lgimgselbtn lgimg_delete'  ctf='table_deleterow' title='删除'></DIV>"
};
var LEAP = new Object();


LEAP.showError = function(err)
{
	if (err)
	{
		var msg = err.stack;
		if (msg == null)
			msg = err.toString();
			
		LEAP.hc_dialog.toast(msg, "down", 1000);
		//LEAP.hc_dialog.alert(msg, "错误", 2);
		
		throw err;
	}
}


LEAP.getRealSyscode = function(syscode)
{
	if (syscode == null)
		return null;
	if (syscode != null && syscode.toString().Trim() != '' && syscode.toString().indexOf('.') > -1)
	{
		var ret = syscode.toString();
		var pre = ret.substring(0, ret.indexOf('.'));
		var sub = ret.substring(ret.indexOf('.') + 1);
		while(sub.length % 3 != 0)
		{
			sub += '0';
		}

		while(sub.substring(sub.length - 3, sub.length) == '000')
		{
			sub = sub.substring(0, sub.length - 3);
		}
		if (String.isEmpty(sub))
			ret = pre;
		else ret = pre + "." + sub;
		return ret;
	}
	else return syscode.toString();
}

LEAP.getParentSyscode = function(realsyscode)
{
	if (realsyscode.indexOf(".") > -1)
	{
		var ret = realsyscode.substring(0, realsyscode.length - 3);
		if (ret.charAt(ret.length - 1) == '.')
			return ret.substring(0, ret.length - 1);
		return ret;
	}
	else
	{
		return null;
	}
}



/**
 * 物理后退
 */
var PageSteps = new Object();
PageSteps.steps = new Array();
PageSteps.setStep = function(element)
{
	PageSteps.steps.add(element);
	var index = parseInt(element.style.zIndex);
	if(location.href.indexOf("?")>-1)
	{
		var url = null;
		var str = null;
		if(location.href.indexOf("?index=")>-1)
			str="?index=";
		else if(location.href.indexOf("&index=")>-1)
			str="&index=";
		if(str==null)
		{
			url=location.href;
			str="&index=";
		}
		else
			url = location.href.substring(0,location.href.indexOf(str));
		history.pushState({"zIndex":index}, "", url+str+index);
	}
	else
		history.pushState({"zIndex":index}, "", "?index="+index);
	
}
PageSteps.getStep = function()
{
	if(PageSteps.steps.length>0)
		return PageSteps.steps[PageSteps.steps.length-1];
	else
		return null;
}
PageSteps.removeStep = function()
{
	if(PageSteps.steps.length>0)
		PageSteps.steps.removeindex(PageSteps.steps.length-1);
}
PageSteps._back = function()
{
	LEAP.hideMask();
	var el = PageSteps.getStep();
	if(el)
	{
		if(el.className.indexOf("hc-dialog-show")>-1)
			LEAP.removeCSS(el,"hc-dialog-show");
		else
			LEAP.removeCSS(el,"hc-popup-show");
		setTimeout(function(){
			if(el.parentElement)
			{
				el.parentElement.removeChild(el);
			}
		},300);
		PageSteps.removeStep();
	}
}
window.addEventListener("popstate", function(e) {
	 if(location.href.indexOf("apptype=wx")>-1)
	 {
	 	if(PageSteps.steps.length==1)
		 	WeixinJSBridge.call('closeWindow');
		else
	     	PageSteps._back();
	 }
	 else
	 {
	 	if(PageSteps.steps.length==0)
		 	history.go(-1);
		else
	     	PageSteps._back();
	 }
	 
}, false);
LEAP.isIE = null;

(function()
{
	if (document.all)
		LEAP.isIE = true;
	else LEAP.isIE = false;
})();


DelegateUIEventManager = new Object();
DelegateUIEventManager.a = new Array();
DelegateUIEventManager.b = new hashtable();
DelegateUIEventManager.c = new Array();
DelegateUIEventManager.d = new Array();
DelegateUIEventManager.init = function()
{
	DelegateUIEventManager.c.add('click');
	DelegateUIEventManager.c.add('touchstart');
	DelegateUIEventManager.c.add('touchmove');
	DelegateUIEventManager.c.add('touchend');
	DelegateUIEventManager.c.add('touchclick');

	DelegateUIEventManager.d.add('touchclick');
}();
DelegateUIEventManager.u = "_uuid";
DelegateUIEventManager.e = "___devents";
DelegateUIEventManager.addEvent = function(element, type, fun, args, domain, priority)
{
	// if (element[DelegateUIEventManager.u] == null)
	// {
	// element[DelegateUIEventManager.u] = UUID.cID();
	// }

	var es = element[DelegateUIEventManager.e];
	if (es == null)
		es = element[DelegateUIEventManager.e] = new hashtable();

	if (!priority)
		priority = 50;

	var est = es.getvalue(type);
	if (est == null)
	{
		est = [];
		es.add(type, est);
	}
	var k =
	{
		arg			: args,
		domain		: domain,
		fn			: fun,
		priority	: priority
	};

	{
		var hl = est.length;
		var hasi = false;
		if (est && hl > 0)
		{
			for(var i = hl - 1;i > -1;i--)
			{
				var cur = est[i];
				var cp = cur.priority;
				if (cp < priority)
				{
					if (i < hl - 1)
						est = est.insert(k, i + 1);
					else est.add(k);

					hasi = true;
					break;
				}
			}
		}
		if (!hasi)
			est = est.insert(k, 0);
		es.replace(type, est);
	}

	//	es.replace(type, est.insert(k, 0));

	if (!DelegateUIEventManager.a.contains(type))
	{
		if (!DelegateUIEventManager.d.contains(type))
			UIEventManager.addEvent(document.body, type, DelegateUIEventManager.handleEvent);
		DelegateUIEventManager.a.add(type);
	}

	k = es = est = fun = args = element = type = domain = null;
}
DelegateUIEventManager.removeEvent = function(element, type, fun)
{
	if (element != null)
	{
		if (type == null && fun == null)
		{
			element[DelegateUIEventManager.e] = null;
			element.removeAttribute(DelegateUIEventManager.e);
		}
		else if (type != null && fun != null)
		{
			var es = element[DelegateUIEventManager.e];
			if (es == null)
				return;
			var est = es.getvalue(type);
			if (est != null)
			{
				var l = est.length;
				for(var i = l - 1;i > -1;i--)
				{
					var def = est[i];
					if (def.fn == fun)
					{
						est.remove(def);
					}
				}
			}
			es = est = null;
		}
		else if (type == null && fun != null)
		{

		}
		else if (type != null && fun == null)
		{
			var es = element[DelegateUIEventManager.e];
			if (es != null)
				es.remove(type);
		}
	}
}
DelegateUIEventManager.handleEvent = function(eventarg)
{
	var e = eventarg.e;
	var element = e.target || e.srcElement;
	var type = e.type;
	if (eventarg.type)
		type = eventarg.type;

	var es = element[DelegateUIEventManager.e];
	if (es == null)
		return;
	var est = es.getvalue(type);
	if (est != null)
	{
		var l = est.length;
		for(var i = l - 1;i > -1;i--)
		{
			var v = null;
			try
			{
				v = est[i];
			}
			catch(e)
			{
			}
			if (v == null)
				continue;
			var arg =
			{
				caller	: element,
				e		: e,
				arg		: v.arg,
				type	: type
			};

			var domain = v.domain;
			if (domain == null)
				domain = element;
			try
			{
				if (v.fn.call(domain, arg) == false)
					break;
			}
			catch(err)
			{
			}
			finally
			{
				v = arg = domain = null;
			}
		}
	}
	es = est = element = e = eventarg = null;
}

ElementEventManager = new Object();
ElementEventManager.a = new hashtable();
ElementEventManager.e = "__eevents";
ElementEventManager.addManagedEventType = function(controlType, type)
{
	if (ElementEventManager.a.contains(controlType))
		ElementEventManager.a.getvalue(controlType).add(type);
	else
	{
		var arr = new Array();
		arr.add(type);
		ElementEventManager.a.add(controlType, arr);
	}
}
ElementEventManager.addEvent = function(element, type, fun, args, domain, priority)
{
	if (element == null || type == null || fun == null)
		return;

	if (!priority)
		priority = 50;

	var es = element[ElementEventManager.e];
	if (es == null)
		es = element[ElementEventManager.e] = new hashtable();

	var est = es.getvalue(type);
	if (est == null)
	{
		est = [];
		es.add(type, est);
	}

	var k =
	{
		arg			: args,
		domain		: domain,
		fn			: fun,
		priority	: priority
	};

	{
		var hl = est.length;
		var hasi = false;
		if (est && hl > 0)
		{
			for(var i = hl - 1;i > -1;i--)
			{
				var cur = est[i];
				var cp = cur.priority;
				if (cp < priority)
				{
					if (i < hl - 1)
						est = est.insert(k, i + 1);
					else est.add(k);

					hasi = true;
					break;
				}
			}
		}
		if (!hasi)
			est = est.insert(k, 0);
		es.replace(type, est);
	}

	//	es.replace(type, est.insert(k, 0));

	k = es = est = fun = args = element = type = domain = null;
}
ElementEventManager.removeEvent = function(element, type, fun)
{
	if (element != null)
	{
		if (type == null && fun == null)
		{
			element[ElementEventManager.e] = null;
			element.removeAttribute(ElementEventManager.e);
		}
		else if (type != null && fun != null)
		{
			var es = element[ElementEventManager.e];
			if (es && es.contains(type))
			{
				var evs = es.getvalue(type);
				if (evs != null)
				{
					var l = evs.length;
					for(var i = l - 1;i > -1;i--)
					{
						if (evs[i].fn == fun)
						{
							evs.remove(evs[i]);
						}
					}
					if (evs.length == 0)
						es.remove(type);
					if (es.count == 0)
					{
						element[ElementEventManager.e] = null;
						element.removeAttribute(ElementEventManager.e);
					}
					evs = null;
				}
			}
			es = null;
		}
		else if (type == null && fun != null)
		{

		}
		else if (type != null && fun == null)
		{
			var es = element[ElementEventManager.e];
			if (es != null)
				es.remove(type);
			es = null;
		}
		element = fun = type = null;
	}
}
ElementEventManager.handleEvent = function(element, type, arg)
{
	var es = element[ElementEventManager.e];
	if (es == null)
		return;
	var est = es.getvalue(type);
	if (est != null)
	{
		var l = est.length;
		for(var i = l - 1;i > -1;i--)
		{
			var v = null;
			try
			{
				v = est[i];
			}
			catch(E)
			{
			}
			if (v == null)
				continue;
			var _arg =
			{
				caller	: element,
				arg		: v.arg,
				arg2	: arg,
				type	: type
			};

			var domain = v.domain;
			if (domain == null)
				domain = element;
			try
			{
				if (v.fn.call(domain, _arg) == false)
					break;
			}
			catch(err)
			{
				LEAP.hc_dialog.toast(err);
			}
			finally
			{
				v = _arg = domain = null;
			}
		}
	}
	es = est = element = arg = null;
}

var UIEventManager = new Object();
UIEventManager.o = 'on';
UIEventManager.u = '_uuid';
UIEventManager._e = '___events';
UIEventManager._s = new hashtable();
UIEventManager.addEvent = function(element, type, fun, args, domain, priority)
{
	if (fun == null)
		return;

	if (!priority)
		priority = 50;

	var handlers = null;
	var arg = args;
	var pre = UIEventManager.o;
	try
	{
		if (element && element.hasOwnProperty && element.hasOwnProperty('setAttribute'))
			element.setAttribute('__iuem', '1');

		if (!element.events)
			element.events = [];
		handlers = element.events[type];
		if (!handlers)
		{
			handlers = element.events[type] = [];
			if (element[pre + type])
			{
				handlers[0] = element[pre + type];
			}
		}

		{
			var hl = handlers.length;
			var hasi = false;
			if (handlers && hl > 0)
			{
				for(var i = hl - 1;i > -1;i--)
				{
					var cur = handlers[i];
					var cp = cur[3];
					if (cp < priority)
					{
						if (i < hl - 1)
							handlers = handlers.insert([fun,domain,arg,priority], i + 1);
						else handlers.add([fun,domain,arg,priority]);

						hasi = true;
						break;
					}
				}
			}
			if (!hasi)
				handlers = handlers.insert([fun,domain,arg,priority], 0);
			element.events[type] = handlers;
		}

		if (element[pre + type] && element[pre + type] != UIEventManager.handleEvent)
		{
			var tfn = element[pre + type];
			element.events[type] = handlers.insert([tfn,element,null]);
			element[pre + type] = null;
		}

		if (!element[pre + type])
		{
			if (UIEventManager._s.contains(type) && element.addEventListener)
				element.addEventListener(type, UIEventManager.handleEvent);
			element[pre + type] = UIEventManager.handleEvent;
			var _d = [type];
			element[UIEventManager._e] = _d;
			_d = null;
		}
		else
		{
			var _t = element[UIEventManager._e];
			if (_t && !_t.contains(type))
				_t.add(type);
			_t = null;
		}
		// if (!element[UIEventManager.u])
		// {
		// element[UIEventManager.u] = UUID.cID();
		// }
	}
	finally
	{
		handlers = null;
		element = null;
		arg = null;
	}
}
UIEventManager.removeEvent = function(element, type, fun)
{
	var _t = element['___events'];
	var pre = UIEventManager.o;

	if (type == null)
	{
		if (element.events && _t)
		{
			var l = _t.length;
			for(var i = 0;i < l;i++)
			{
				var type = _t[i];
				element.events[type].clear();
				element[pre + type] = null;
				if (UIEventManager._s.contains(type))
					element.removeEventListener(type, UIEventManager.handleEvent);
			}
			_t.clear();
		}
	}
	else
	{
		if (element.events && element.events[type])
		{
			if (fun != null)
			{
				var temp = element.events[type];
				for(i = temp.length - 1;i > -1;i--)
				{
					if (temp[i][0] == fun)
					{
						temp.removeindex(i);
					}
				}
				if (temp.length == 0)
				{
					temp.clear();
					_t.remove(type);
					element[pre + type] = null;
					if (UIEventManager._s.contains(type))
						element.removeEventListener(type, UIEventManager.handleEvent);
				}
				temp = null;
			}
			else
			{
				element.events[type].clear();
				_t.remove(type);
				element[pre + type] = null;
				if (UIEventManager._s.contains(type))
					element.removeEventListener(type, UIEventManager.handleEvent);
			}
		}
	}
	element = null;
}
UIEventManager.handleEvent = function(event)
{
	var returnValue = true;

	event = event || window.event;

	if (event == null && this.document.parentWindow != window)
		event = this.document.parentWindow.event;

	if (event == null || event.type == null || event.srcElement == null || event.srcElement.disabled
			|| event.srcElement.tagName == null)
	{
		if (event == null)
			return;
		if (event.type != null && (event.type == 'load' || event.type == 'unload'))
		{

		}
		else return;
	}
	if (event.srcElement != null && event.srcElement.tagName == 'APPLET')
		return;
	// window.status = event.type;
	var handlers = this.events[event.type]
	if (handlers == null)
		return;
	var length = handlers.length;
	if (length == null || length == 0)
		return;

	for(var i = length - 1;i > -1;i--)
	{
		var def = null;
		try
		{
			def = handlers[i];
		}
		catch(E)
		{
		}
		if (def == null)
			continue;
		var domain = def[1];
		var args = def[2];
		var fn = def[0];
		try
		{
			if (fn == null)
				continue;

			var arg =
			{
				e		: event,
				caller	: this,
				arg		: args,
				type	: event.type
			};
			if (domain == null)
				domain = this;

			var ret = fn.call(domain, arg);
			if (ret != null)
			{
				if (ret == false)
					break;
				if (ret.breakEvent == true)
					return false;
			}
		}
		catch(err)
		{
		}
		finally
		{
			fn = null;
			if (arg != null)
				arg.caller = arg.e = arg.arg = null
			domain = args = arg = null;
		}
	}
	handlers = null;
	return returnValue;
}

//window
var __s__3 = \u0077\u0069\u006e\u0064\u006f\u0077;
//location
var __s__1 = '\u006c\u006f\u0063\u0061\u0074\u0069\u006f\u006e';
//href
var __s__5 = '\u0068\u0072\u0065\u0066';

/**
 * 上下文
 * @type 
 */
LEAP.server=null;
LEAP.portal="http";
LEAP.host = null;
LEAP.port = 80;
LEAP.context=null;
LEAP.version=-1;
/**
 * 初始化
 */
LEAP.request = function(_methodName, _JSONObject, extendParameters, callback, serviceName, callService, requestType, isreturnjson, useGet, _domain, _args)
{
	return leapclient.request(_methodName, _JSONObject, extendParameters, callback, serviceName, callService, requestType, isreturnjson, useGet, _domain, _args);
}
LEAP.request2 = function(def)
{
	return leapclient.request2(def);
}
LEAP.asyn = function(method, domain, time)
{
	if (!method)
		return;
	// if (domain == null)
	// domain = this;
	if (time == null)
		time = 10;
	var args = null;
	if (arguments == null || arguments.length < 4)
	{
	}
	else
	{
		args = [];
		for(var i = 3;i < arguments.length;i++)
		{
			args[i - 3] = arguments[i];
		}
	}
	var fn = function()
	{
		try
		{
			if (method != null)
			{
				if (args != null)
					method.apply(domain, args);
				else method.apply(domain);
			}
		}
		finally
		{
			domain = args = arguments = method = null;
		}
	}

	setTimeout(fn, time);
	fn = null;
}
LEAP.convertResult = function(object)
{
	if (object != null && object.javaClass != null)
	{
		if (object.javaClass == commfields.rsc)
		{
			if (object == null || object.result == null || object.result.length == 0)
				return null;

			var _objs = new Array();
			var l = object.result.length;
			var hascvs = object.codeValues != null;
			for(var i = 0;i < l;i++)
			{
				var _obj = new Object();
				var cells = object.result[i];
				if (!cells)
					continue;
				var ll = object.metaData.length;
				for(var j = 0;j < ll;j++)
				{
					var _md = object.metaData[j].name;
					var _type = object.metaData[j].type;
					var _value = cells[j];
					if (hascvs)
					{
						var _tt = object.codeValues[i];
						if (_tt != null)
						{
							_cv = _tt[j]
							if (_cv != null)
							{
								_obj[commfields.rsccv + _md] = _cv;
							}
						}
					}

					//|| _type == 2 || _type == 3
					if (_type == -5 || _type == -6 || _type == -7 || _type == 4 || _type == 5 || _type == 6
							|| _type == 7 || _type == 8)
					{
						if (String.isEmpty(_value))
							_value = null;
						else _value = LEAP.tonum(_value);
					}
					_obj[_md] = _value;
				}
				_objs.add(_obj);
			}
			return _objs;
		}
		else if (object.javaClass == 'com.longrise.LEAP.Base.Objects.EntitySet')
		{
			return object.result;
		}
		else if (object.javaClass == 'com.longrise.LEAP.Base.Objects.EntityBeanSet')
		{
			if (object == null || object.result == null || object.result.length == 0)
				return null;

			var _objs = new Array();
			var l = object.result.length;
			var hascvs = object.codeValues != null;
			if (hascvs)
			{
				for(var i = 0;i < l;i++)
				{
					var _obj = object.result[i];
					var cells = object.result[i];
					if (!cells)
						continue;
					var ll = object.metaData.length;
					for(var j = 0;j < ll;j++)
					{
						var _md = object.metaData[j].name;
						var _type = object.metaData[j].type;
						var _value = cells[_md];
						if (hascvs)
						{
							var _tt = object.codeValues[i];
							if (_tt != null)
							{
								_cv = _tt[j]
								if (_cv != null)
								{
									_obj[commfields.rsccv + _md] = _cv;
								}
							}
						}

						if (_type == -5 || _type == -6 || _type == -7 || _type == 4 || _type == 5
								|| _type == 6 || _type == 7 || _type == 8)
						{
							if (String.isEmpty(_value))
								_value = null;
							else _value = LEAP.tonum(_value);
						}
						_obj[_md] = _value;
					}
					_objs.add(_obj);
				}
				return _objs;
			}
			else return object.result;
		}
	}
	if (object != null && object.result != null)
		return object.result;
	return object;
}
var ChangeResult = function()
{
};
/**
 * @type String
 */
ChangeResult.prototype.javaClass = "com.longrise.LEAP.Base.Objects.ChangeResult";
/**
 * 添加参数
 * 
 * @param {String}
 *            md 参数名
 * @param {String}
 *            result 参数值
 * @param {String}
 *            source 参数变更原值,值变更之前的值
 */
ChangeResult.prototype.addparameter = function(md, result, source)
{
	if (this.metaData == null)
	{
		this.metaData = [];
		this.result = [];
		this.source = [];
	}
	this.metaData.push(md);
	this.result.push(result);
	this.source.push(source);
}

ChangeResult.prototype.add = function(md, value, source)
{
	return this.addparameter(name, value, source);
}
LEAP.convertChangeResult = function(result)
{
	if (result == null)
		return;
	var ret = new ChangeResult();
	for(var k in result)
	{
		if (k != 'changeResultName' && k != '_data')
		{
			var md = k;
			var value = null;
			var source = null;
			var v = result[k];
			if (v == null)
			{
				value = source = null;
			}
			else
			{
				if (v.hashide)
				{
					continue;
				}
				value = v.value;
				source = v.source;
			}
			ret.addparameter(md, value, source);
		}
	}
	return ret;
}
LEAP.getarea = function(areaid, level)
{
	if (areaid == null)
		return null;
	if (level == null)
		return areaid;
	var str = areaid + "";
	var len = str.length;
	if (len > 17 && level == 7)
		return str.substr(1 - 1, 18);
	else if (len > 14 && level == 6)
		return str.substr(1 - 1, 15);
	else if (len > 11 && level == 5)
		return str.substr(1 - 1, 12);
	else if (len > 8 && level == 4)
		return str.substr(1 - 1, 9);
	else if (len > 5 && level == 3)
		return str.substr(1 - 1, 6);
	else if (len > 3 && level == 2)
		return str.substr(1 - 1, 4);
	else if (len > 1 && level == 1)
		return str.substr(1 - 1, 2);
	else return null;
}
LEAP.getarealevel = function(areaid)
{
	if (areaid == null)
		return null;
	var str = areaid + "";
	var len = str.length;
	if (len > 17 && str.substr(16 - 1, 3) != '000')
		return 7;
	else if (len > 14 && str.substr(13 - 1, 3) != '000')
		return 6;
	else if (len > 11 && str.substr(10 - 1, 3) != '000')
		return 5;
	else if (len > 8 && str.substr(7 - 1, 3) != '000')
		return 4;
	else if (len > 5 && str.substr(5 - 1, 2) != '00')
		return 3;
	else if (len > 3 && str.substr(3 - 1, 2) != '00')
		return 2;
	else if (len > 1 && str.substr(1 - 1, 2) != '00')
		return 1;
	else return null;
}

LEAP.getareacodevalue = function(areaid)
{
	var level = LEAP.getarealevel(areaid);
	if (level != null)
	{
		var parent = LEAP.getarea(areaid, level - 1);
		var realArea = LEAP.getrealarea(areaid);
		var values = null;
		if (parent != null)
		{
			values = LEAP.getCodeValue(__als1[level - 1], parent);

		}
		else
		{
			values = LEAP.getCodeValue(__als1[level - 1]);
		}
		if (values != null)
		{
			var l = values.length;
			for(var i = 0;i < l;i++)
			{
				if (values[i].codeid == realArea) { return values[i]; }
			}
		}
	}
}
LEAP.getareacodevalue1 = function(areaid)
{
	var level = LEAP.getarealevel(areaid);
	if (level != null)
	{
		var parent = LEAP.getarea(areaid, level - 1);
		var realArea = LEAP.getrealarea(areaid);
		var values = null;
		if (parent != null)
		{
			values = LEAP.getCodeValue1(__als1[level - 1], parent);

		}
		else
		{
			values = LEAP.getCodeValue1(__als1[level - 1]);
		}
		if (values != null)
		{
			var l = values.length;
			for(var i = 0;i < l;i++)
			{
				if (values[i].codeid == realArea) { return values[i]; }
			}
		}
	}
}
LEAP.getrealarea = function(areaid)
{
	if (areaid == null)
		return null;
	var str = areaid + "";
	var len = str.length;
	if (len > 17 && str.substr(16 - 1, 3) != '000')
		return str.substr(1 - 1, 18);
	else if (len > 14 && str.substr(13 - 1, 3) != '000')
		return str.substr(1 - 1, 15);
	else if (len > 11 && str.substr(10 - 1, 3) != '000')
		return str.substr(1 - 1, 12);
	else if (len > 8 && str.substr(7 - 1, 3) != '000')
		return str.substr(1 - 1, 9);
	else if (len > 5 && str.substr(5 - 1, 2) != '00')
		return str.substr(1 - 1, 6);
	else if (len > 3 && str.substr(3 - 1, 2) != '00')
		return str.substr(1 - 1, 4);
	else if (len > 1 && str.substr(1 - 1, 2) != '00')
		return str.substr(1 - 1, 2);
	else return null;
}
var __als1 = ["Province","City","County","Street","Community","Team"];
var __als6 = ["省","市","区","街道","社区","网格"];
LEAP.userInfo=null;
var __haspa = false;
LEAP.getUserInfo = function(__now)
{
	LEAP.processArea(__now);
	
	return LEAP.userInfo;
}
LEAP.processArea = function()
{
	if (__haspa == false)
	{
		__haspa = true;

		if (LEAP.userInfo == null || LEAP.userInfo.userflag == null)
			LEAP.userInfo = LEAP.request("app_getUserInfo");

		if (LEAP.userInfo && LEAP.userInfo.areacnnames)
		{
			__als6 = LEAP.userInfo.areacnnames;
		}
		if (window._userdefinedareas != null)
		{
			__als6 = window._userdefinedareas;
		}
		var c = __als1[LEAP.userInfo.areaLevel];
		LEAP.addCodeType(c, LEAP.userInfo.areavalues, LEAP.getrealarea(LEAP.userInfo.areaid));
	}
}
LEAP.getBindDef = function(element)
{
	if (element['_bdef'] == null)
	{
		var ret =
		{
			// txt : element.innerText,
			md				: element.getAttribute('md'),
			sncol			: element.getAttribute('sncol') == '1',
			bt				: element.getAttribute('bt'),
			ut				: element.getAttribute('ut'),
			st				: element.getAttribute('st'),
			btexp			: element.getAttribute('btexp'),
			btfn			: element.getAttribute('btfn'),
			urlpath			: element.getAttribute('urlpath'),
			code			: element.getAttribute('code'),
			pcodes			: element.getAttribute('pcodes'),
			tpo				: element.getAttribute('tpo'),
			defaultcode		: element.getAttribute('defaultcode'),
			enableedit		: element.getAttribute('enableedit'),
			btcontrol		: element.getAttribute('btcontrol'),
			treecol			: element.getAttribute('treecol'),
			indentcol		: element.getAttribute('indentcol'),
			textalign		: element.getAttribute('textalign'),
			check			: element.getAttribute('check'),
			innerHTML		: element.innerHTML,
			_width			: element.style.width,
			_height			: element.style.height,
			_colspan		: element.getAttribute('_colspan'),
			_rowspan		: element.getAttribute('_rowspan'),
			linkcolumn		: element.getAttribute('linkcolumn'),
			formatnumber	: element.getAttribute('formatnumber'),
			colorexp		: element.getAttribute('colorexp'),
			imgexp			: element.getAttribute('imgexp'),
			menuexp			: element.getAttribute('menuexp'),
			oper			: element.getAttribute('oper'),
			btstyle			: element.getAttribute('btstyle'),
			tipfn			: element.getAttribute('tipfn'),
			tipoffset		: element.getAttribute('tipoffset'),
			btclass			: element.getAttribute('btclass'),
			fcolor			: element.getAttribute('fcolor'),
			bcolor			: element.getAttribute('bcolor'),
			btdis			: element.getAttribute('btdis')
		};
		element['_bdef'] = ret;
	}
	else ret = element['_bdef'];
	element = null;
	return ret;
}
LEAP._init = function()
{
//	setTimeout(function()
//	{
//		FastClick.attach(document.body);
//	},1000);
}();

var ___maus = new hashtable();
var __haspa = false;
LEAP.fillModuleAuthoritys = function(name, data, now)
{
	if (data == null)
	{
		data = {};
		data.url = "";
	}
	else
	{
		if (data.userinfo != null)
		{
			LEAP.userInfo = data.userinfo;
			LEAP.getUserInfo(now);
		}
	}
	___maus.add(name, data);
	return data;
}
LEAP.getModuleAuthoritys = function(name)
{
	if (name == null)
		return null;
	name = name.Trim();
	if (___maus.contains(name))
		return ___maus.getvalue(name);

	var getui = !__haspa;
	var now = new Date().getTime();
	var data = LEAP.request2(
	{
		name	: "app_getLogicModuleOperations",
		par		:
		{
			n	: name,
			g	: getui
		}
	});
	return LEAP.fillModuleAuthoritys(name, data, now);
};
/**
 * 加载模型
 * @param {} def
 */
LEAP.loadModule = function(name, parent, type, d, htmlsource, distributeFlag, moduleParameter, moduleLoadArg, pageMode, callback, domain, authority)
{
	if (name == null)
	{
		if (d != null)
			name = d.___moduleName;
	}
	var _md = null;
	if(name!=null)
		_md = LEAP.getModuleAuthoritys(name);
	else
	{
		_md = {};
		_md.url = "";
	}
	var path=_md.url;
	var parentEl = parent;
	if(d==null)
	{
		if(!String.isEmpty(path))
		{
			var res = leapclient.load(path);
			var _shi = res.indexOf("<head>");
			var _hi = res.indexOf("</head>");
			var jsres = path.replace('.html', '.js');
			var __sls = res.substring(_shi+6,_hi);
			var __links = __sls.split("\n");
			if(__links)
			{
				var l = __links.length;
				for(var i=0;i<l;i++)
				{
					var li = __links[i];
					var type=-1;
					if(li.toLowerCase().indexOf("<script")>-1 && li.indexOf(" path")>-1)
						type=1;
					else if(li.toLowerCase().indexOf("<link")>-1 && li.indexOf(" path")>-1)
						type=2
					if(type!=-1)
					{
						li = li.replaceall(' ', '');
						var pi = li.indexOf('path=');
						var s = li.substr(pi + 5, 1);
						var sc = li.substr(pi + 6);
						sc = sc.substr(0, sc.indexOf(s));
						if(type==1)
							leapclient.loadjs(sc);
						else if(type==2)
							leapclient.loadcss(sc);
					}
				}
			}
			if(!d)
				d = LEAP.loadf(__sls);
			var content = res.substring(_hi+7,res.length);
			d.source = content;
		}
		
	}
	
	var uid = UUID.cID();
	if(d!=null)
	{
		var t = new d.module();
		LEAP.clone(d,t);
		if (t != null)
			d = t;
		if (d.type == null)
		{
			d.type = 'instance';
		}
		d.instance = uid;
		if (d.type != 'static' && d.source != null)
		{
			d.source = d.source.replaceall('@instance', uid);

			d.source = d.source.replaceall(' ht=', ' instance="' + uid + '" ht=');
			d.source = d.source.replaceall(' ct=', ' instance="' + uid + '" ct=');
			d.source = d.source.replaceall(' ctg=', ' instance="' + uid + '" ctg=');
			d.source = d.source.replaceall(' ut=', ' instance="' + uid + '" ut=');
			d.source = d.source.replaceall(' st=', ' instance="' + uid + '" st=');
			d.source = d.source.replaceall(' module=', ' instance="' + uid + '" module=');
			d.source = d.source.replaceall(' panel=', ' instance="' + uid + '" panel=');

			d.source = d.source.replaceall('\tht=', ' instance="' + uid + '" ht=');
			d.source = d.source.replaceall('\tct=', ' instance="' + uid + '" ct=');
			d.source = d.source.replaceall('\tctg=', ' instance="' + uid + '" ctg=');
			d.source = d.source.replaceall('\tut=', ' instance="' + uid + '" ut=');
			d.source = d.source.replaceall('\tst=', ' instance="' + uid + '" st=');
			d.source = d.source.replaceall('\tmodule=', ' instance="' + uid + '" module=');
			d.source = d.source.replaceall('\tpanel=', ' instance="' + uid + '" panel=');

			d.source = d.source.replaceall('\nht=', ' instance="' + uid + '" ht=');
			d.source = d.source.replaceall('\nct=', ' instance="' + uid + '" ct=');
			d.source = d.source.replaceall('\nctg=', ' instance="' + uid + '" ctg=');
			d.source = d.source.replaceall('\nut=', ' instance="' + uid + '" ut=');
			d.source = d.source.replaceall('\nst=', ' instance="' + uid + '" st=');
			d.source = d.source.replaceall('\nmodule=', ' instance="' + uid + '" module=');
			d.source = d.source.replaceall('\npanel=', ' instance="' + uid + '" panel=');

			uid = null;
		}
		else
		{
			var ts =
					LEAP.getElements('[module][modulecn],[ct]:not([instance]),[ht]:not([instance]),[ut]:not([instance]),[st]:not([instance]),[ctg]:not([instance]),[panel]:not([instance])');
			if (ts != null && ts.length > 0)
			{
				var l = ts.length;
				for(var i = 0;i < l;i++)
				{
					var t = ts[i];
					t.setAttribute("instance", uid);
				}
			}
		}
		var __cacheUT = new hashtable();
		var __cacheMD = new hashtable();
		var __cacheST = new hashtable();
		d.__cacheUT = __cacheUT;
		d.__cacheMD = __cacheMD;
		d.__cacheST = __cacheST;
		if(!parentEl)
			parentEl = document;
			
		if (d.type == 'instance' || (d.type == 'static' && d.___hasmoduleinit != true))
		{
			LEAP.newPageObjectInstance(name, d, parentEl, moduleParameter, false, true);
		}
		
		if(d.source!=null)
			parentEl.innerHTML=d.source;
			
		var moduleElement;
		var els = parentEl.getElementsByTagName("*");
		for(var i=0;i<els.length;i++)
		{
			var el = els[i];
			if(el.getAttribute("module")!=null)
				moduleElement = el;
		}
		if(!moduleElement)
		{
			
		}
		d.moduleElement = moduleElement;
		if(pageMode!=null)
			d.pageMode=pageMode;
		else
		{
			if(moduleElement!=null)
			{
				var mt = moduleElement.getAttribute('moduletype');
				if(mt)
					d.pageMode = mt;
			}
		}
		var now = new Date().getTime();
		LEAP.getUserInfo(now);
		//处理模型关系
		PageObjectModel.___allObjects.add(d.instance, d);
		if(d.pageLoad)
		{
			if (moduleLoadArg == null)
				d.pageLoad.call(d);
			else d.pageLoad.call(d, moduleLoadArg);
		}
		try
		{
			return d;
		}
		finally
		{
			if (d.afterPageLoad)
			{
				try
				{
					if (moduleLoadArg == null)
						d.afterPageLoad.call(d);
					else d.afterPageLoad.call(d, moduleLoadArg);
				}
				catch(err)
				{
				}
			}
			moduleLoadArg = parent = d = null;
		}
	}
}
LEAP.newPageObjectInstance = function(name, object, parentElement, moduleParameter, autoLoad, isSystemCall)
{
	var d = object;
	d.addEvent = pageObject.addEvent;
	d.removeEvent = pageObject.removeEvent;
	d.getElements = pageObject.getElements;
	d.getElement = pageObject.getElement;
	if (d.setPageData == null && typeof(d.setPageData) != 'function')
		d.setPageData = pageObject.setPageData;
	d.getPageData = pageObject.getPageData;
	d.convertChangeResult = LEAP.convertChangeResult;
	d.regEvent = pageObject.regEvent;
	d.fireEvent = pageObject.fireEvent;
	d.getControl = pageObject.getControl;
	d.getMD = pageObject.getMD;
	d.getUT = pageObject.getUT;
	d.getQueryParameter = pageObject.getQueryParameter;
	d.getCreateParameter = pageObject.getCreateParameter;
	d.clearPageData = pageObject.clearPageData;
	d.getUpdateParameter = pageObject.getUpdateParameter;
	d.deleteResult = pageObject.deleteResult;
	d.hideForm = pageObject.hideForm;
	d.showForm = pageObject.showForm;
	d.getValue = pageObject.getValue;
	d.setValue = pageObject.setValue;
	d.validateUI = pageObject.validateUI;
	d.request = pageObject.request;
	d.getLastExtendResult = pageObject.getLastExtendResult;
	d.clearValidateUI = pageObject.clearValidateUI;
	d.getLastError = pageObject.getLastError;
	d.setLastExtendResult = pageObject.setLastExtendResult;
	d.getLastError = pageObject.getLastError;
	d.unRegEvent = pageObject.unRegEvent;
	d.addShortKeyEvent = pageObject.addShortKeyEvent;
	d.asynrequest = pageObject.asynrequest;
	d.innerPageLoad = pageObject.innerPageLoad;
	d.name = name;
	d.loadModule = pageObject.loadModule;
	d.loadModule2 = pageObject.loadModule2;
	d.loadForm = pageObject.loadForm;
	d.loadForm3 = pageObject.loadForm3;
	d.loadForm2 = pageObject.loadForm2;
	d.getST = pageObject.getST;
	d.st = pageObject.st;
	d.ut = pageObject.ut;
	d.md = pageObject.md;
	d.loadNoneUIModule = pageObject.loadNoneUIModule;
	d.getParentModule = pageObject.getParentModule;
	d.bindData = pageObject.bindData;
	d._isPageObject = pageObject._isPageObject;

	d.innerAsynRefreshPage = pageObject.innerAsynRefreshPage
	d.innerBuildQuery = pageObject.innerBuildQuery;
	d.innerRefreshPage = pageObject.innerRefreshPage;
	d.innerSearch = pageObject.innerSearch;
	d.innerReset = pageObject.innerReset;
	d.searchMore = pageObject.searchMore;
	if (d.viewPageLoad != null)
	{
		d._viewPageLoad_ = d.viewPageLoad;
	}
	d.viewPageLoad = pageObject.innerViewPageLoad;
	if (d.insertPageLoad != null)
	{
		d._insertPageLoad_ = d.insertPageLoad;
	}
	d.insertPageLoad = pageObject.innerInsertPageLoad;
	if (d.searchPageLoad != null)
	{
		d._searchPageLoad_ = d.searchPageLoad;
	}
	d.searchPageLoad = pageObject.innerSearchPageLoad;
	if (d.modifyPageLoad != null)
	{
		d._modifyPageLoad_ = d.modifyPageLoad;
	}
	d.modifyPageLoad = pageObject.innerModifyPageLoad;

	for(var key in pageObjectExtend)
	{
		d[key] = pageObjectExtend[key];
	}

	if (d.setPageDataByPK == null)
		d.setPageDataByPK = pageObject.setPageDataByPK;
	if (d.dispose == null)
		d.dispose = pageObject.dispose;
	else
	{
		d.innerDispose = d.dispose;
		d.dispose = pageObject.dispose;
	}
	if (d.pageLoad == null)
	{
		d.pageLoad = pageObject.pageLoad;
	}
	else
	{
		d._pageLoad = d.pageLoad;
		d.pageLoad = pageObject.pageLoad;
	}

	d.parentElement = parentElement;

	if (moduleParameter)
	{
		d.pom = moduleParameter.___pageObjectModel;
		d.___parentModule = moduleParameter.___parentModule;
		d.moduleParameter = moduleParameter;
		d.parentPageModule = moduleParameter.___parentModule;
		moduleParameter.___pageObjectModel = null;
		moduleParameter.___parentModule = null;
	}

	if (autoLoad == null || autoLoad != false)
	{
		if (d.pageLoad != null)
		{
			d.pageLoad.call(d);
		}
	}
	if (!d.instance)
		d.instance = UUID.cID();

	if (!isSystemCall)
		PageObjectModel.___allObjects.add(d.instance, d);

	return d;
}
LEAP.loadModule2 = function(def)
{
	var n = def.path;
	if (n == null)
		n = def.name;

	return LEAP.loadModule(n, def.parent, def.type, def.d, def.htmlsource, def.distributeFlag, def.moduleParameter, def.moduleLoadArg, def.pageMode, def.callback, def.domain, def.authority);
}
LEAP.getValue = function(t, parent, isValidate)
{
	if (t == null)
		return;
	if (typeof(t) == 'string')
		t = LEAP.getElement(t, parent);
	if (t == null)
		return;
	var ctt = t.getAttribute(commfields.ct);
	var ctg = t.getAttribute(commfields.ctg);
	var isht = ctt == null && ctg == null;
	var vdef = LEAP.getBindDef(t);
	var v = null;
	if (isht)
	{
		var ttype = t.getAttribute('type');
		if (ttype != null && t.tagName == 'INPUT' && ttype.toLowerCase() == 'checkbox')
		{
			v = t.checked;
			if (v == true)
				v = "1";
			else v = "0";
		}
		else if (vhts.contains(t.tagName))
		{
			v = t.value;
		}
		else if (skipvhts.contains(t.tagName))
		{
			//			continue;
		}
		else
		{
			v = t.innerText;
		}
	}
	else
	{
		if (ctt == 'areagroup')
		{
			v = LEAP.select.getValue(t);
		}
		else if (ctt == 'areagroup')
		{
			var sel = LEAP.getElement('[ct=select]', t);
			if (sel == null)
				return;
			v = LEAP.select.getValue(sel);
		}
		else if (ctt.indexOf('upload_control_') == 0)
		{
			v = LEAP.upload.getValue(t);
		}
		else if (ctt.indexOf('photoupload') == 0)
		{
			v = LEAP.upload.getValue(t);
		}
		else if (ctt == 'organselector')
		{
			v = LEAP.organSelector._getValue(t);
		}
		else if (ctt == 'opinion' && LEAP['opinion'])
		{
			if (isValidate)
			{
				v = LEAP.opinion.validate(t);
			}
			else v = LEAP.opinion.getValue(t);
		}
		else if (ctt == 'opinion2' && LEAP['opinion2'])
		{
			if (isValidate)
			{
				v = LEAP.opinion2.validate(t);
			}
			else v = LEAP.opinion2.getValue(t);
		}
		else if (ctt == 'attlist' && LEAP['attlist'])
		{
			if (isValidate)
			{
				v = LEAP.attlist.validate(t);
			}
			else v = LEAP.attlist.getValue(t);
		}
		else if (ctt && LEAP[ctt] && LEAP[ctt].getValue)
		{
			v = LEAP[ctt].getValue(t);
		}

	}
	return v;
}
/**
 * @param {}
 *            t
 * @param {}
 *            v
 */
LEAP.setValue = function(t, v, parent)
{
	if (t == null)
		return;
	if (typeof(t) == 'string')
		t = LEAP.getElement(t, parent);
	if (t == null)
		return;
	var ctt = t.getAttribute(commfields.ct);
	var ctg = t.getAttribute(commfields.ctg);
	var isht = ctt == null && ctg == null;
	var vdef = LEAP.getBindDef(t);
	if (vdef && vdef.formatnumber == 1 || vdef.formatnumber == true && v != null)
	{
		var bv = v;
		var substr = bv.substring(bv.length - 1);
		var bool = (bv.indexOf(".") > 0 && substr == '0') || substr == '.';
		//数字格式化，去掉后面多余的0;
		while(bool)
		{
			bv = bv.substring(0, bv.length - 1);
			substr = bv.substring(bv.length - 1);
			bool = (bv.indexOf(".") > 0 && substr == '0') || substr == '.';
		}
		v = bv;
	}
	var v2 = v;
	v = LEAP.getBindValue(vdef, v, null, t);
	if (isht)
	{
		var ttype = t.getAttribute('type');
		if (ttype != null && t.tagName == 'INPUT' && ttype.toLowerCase() == 'checkbox')
		{
			if (v == null)
				t.checked = false;
			if (v == true || v == 'true' || v == '1' || v == 1)
				t.checked = true;
			else t.checked = false;;
		}
		else if (vhts.contains(t.tagName))
		{
			t.value = v;
		}
		else if (skipvhts.contains(t.tagName))
		{
			//					continue;
		}
		else
		{
			t.innerText = v;
		}
		var ctef = t.getAttribute('ctef');
		if (ctef && LEAP[ctef])
		{
			LEAP[ctef].onsetValue(t);
		}
	}
	else
	{
		if (ctt == 'areagroup')
		{
			var sel = LEAP.getElement('[ct=select]', t);
			if (sel == null)
				return;
			LEAP.select.setValue(t, v2, false);
		}
		else if (ctt == 'select')
		{
			LEAP.select.setValue(t, v2, false);
		}
		else if (ctt.indexOf('upload_control_') == 0)
		{
			LEAP.upload.setValue(t, v2);
		}
		else if ("radio" == ctt)
		{
			LEAP.radio.setValue(t, v2, false);
		}
		else if (ctt == 'organselector')
		{
			LEAP.organSelector._setValue(t, v2);
		}
		else if (ctt == 'chart')
		{
			LEAP.flashchart.setValue(t, v2);
		}
		else if (ctt && LEAP[ctt] && LEAP[ctt].setValue)
		{
			v = LEAP[ctt].setValue(t, v2);
		}
	}
}
LEAP.formatdate = function(_date, formatType)
{
	if (formatType == null)
	{
		if (_date == null)
			return;
		if (typeof(_date) == 'string' && _date.indexOf(':') > 0)
			formatType = 0;
		else formatType = 1;
	}
	if (_date == null)
		return null;
	var formatstr = 'yyyy-mm-dd hh:mi:ss';
	if (formatType == 1)
		formatstr = 'yyyy-mm-dd';
	else if (formatType == 2)
		formatstr = 'yyyy-mm-dd hh:mi:ss.ms';
	else if (formatType == 3)
		formatstr = 'yyyy-mm-dd hh:mi';
	if (_date instanceof Date)
	{
		return new DateFormat(_date).format(formatstr);
	}
	else return new DateFormat(LEAP.tonum(_date)).format(formatstr);
}
LEAP.parsedatestr = function(_value, formatType)
{
	if (formatType == null)
		formatType = 0;
	if (_value == null)
		return null;
	if (_value != null && _value.javaClass != null
			&& (_value.javaClass == 'java.util.Date' || _value.javaClass == 'java.sql.Timestamp'))
		return LEAP.formatdate(_value.time, formatType);
	return _value;
}

LEAP.getBindValue = function(binddef, value, data, ct, autoUseCodeCache, module)
{
	if (binddef == null)
		return;
	var ri = value;
	if (value == null)
	{
		ri = value = '';
	}
	else value = LEAP.parsedatestr(value);

	if ((String.isEmpty(value)) && (binddef.defaultcode != null && binddef.code != null))
	{
		ri = value = binddef.defaultcode;
	}
	if (value != null && typeof(value) != '')
	{
		if (value.toString != null)
			value = value.toString();
		else value = value + "";
	}

	if (value != '')
	{
		if (binddef != null && binddef.code != null && binddef.code.Trim() != '')
		{
			if ((autoUseCodeCache != null && autoUseCodeCache == false))
			{
				value = data['data.___codevalue___' + binddef.md];
			}
			else
			{
				if (value != null && value.indexOf(',') > -1)
				{
					var vs = value.split(',');
					var value = "";
					for(var i = 0;i < vs.length;i++)
					{
						var tv = vs[i];
						if (tv != null && tv.Trim() != '')
						{
							var tvv = LEAP.getCodeText(binddef.code, tv);
							if (tvv != null && tvv.Trim() != '')
							{
								if (value != "")
									value += ",";
								value += tvv;
							}
						}
					}
				}
				else value = LEAP.getCodeText(binddef.code, value, binddef.defaultcode);
			}
		}
		if (value == null)
			value = '';
		else if (binddef != null && binddef.bt == 'date' && value != '')
		{
			var _t = value.split(' ');
			if (_t.length > 0)
				value = _t[0];
		}
		else if (binddef != null && binddef.bt == 'datetime' && value != '')
		{
			var _t = value.split(' ');
			if (_t.length > 1)
			{
				value = _t[0] + ' ' + _t[1].substring(0, _t[1].lastIndexOf('.'));
			}
		}
		else if (binddef != null && binddef.bt == 'datetime2' && value != '')
		{
			var _t = value.split(' ');
			if (_t.length > 1)
			{
				value = _t[0] + '<br>  ' + _t[1].substring(0, _t[1].lastIndexOf('.'));
			}
		}
	}

	try
	{
		if (binddef.btfn != null)
		{
			if (binddef._btfn == null)
			{
				try
				{
					binddef._btfn = eval('(' + binddef.btfn + ')');
				}
				catch(err)
				{
				}
			}
			if (binddef._btfn != null)
				value = binddef._btfn(binddef, value, data, ct);
		}
		if ((binddef.btexp != null && value != null && value != '') || binddef.sncol == '1')
		{
			value =
					binddef.btexp.replaceall(commfields.vv, value).replaceall(commfields.vvn, binddef.txt).replaceall(commfields.vid, ri);
		}

		if (binddef.tpo != null)
		{
			if (binddef._tpo != null)
				value = binddef._tpo;
			else
			{
				if (binddef.tpo == "_addrow")
				{
					binddef._tpo = value = commfields.addflag;
				}
				else
				{
					var tpos = binddef.tpo.split(commfields.tpos);
					var l = tpos.length;
					var ret = '';
					for(var i = 0;i < l;i++)
					{
						var o = tpos[i];
						if (String.isEmpty(o.Trim()))
							continue;
						var t = o.split(commfields.tpos2);
						var _t = t[0];
						if (t.length > 2)
						{
							_t = "";
							for(var ii = 0;ii < t.length - 1;ii++)
							{
								_t += t[ii];
								if (ii < t.length - 2)
									_t += ":";
							}
						}
						ret +=
								commfields.tpo.replace(commfields.vn, _t).replace(commfields.vv, t[t.length
										- 1]);
						if (i != l - 1)
							ret += commfields.bl;
					}
					binddef._tpo = value = ret;
				}
			}
		}
	}
	catch(err)
	{
	}
	binddef = data = ct = null;
	return value;
}
LEAP.parsenum = function(o)
{
	if (o == null || o == undefined || isNaN(o))
		return null;
	var ret = Number(o);
	if (isNaN(ret))
		return null;
	return ret;
}

LEAP.getCodeValue = function(codeTypeName, parentCode)
{
	if (codeTypeName == null || codeTypeName == '')
		return;
	var key = '__codetype_' + codeTypeName.toLowerCase();

	if (parentCode)
	{
		parentCode = String(parentCode);
	}

	if (parentCode != null && parentCode.Trim() != '')
	{
		var ik = LEAP.parsenum(parentCode);
		if (ik != null)
			key += '__parentcode__' + ik;
		else key += '__parentcode__' + parentCode;
	}
	var items = commfields.gco.getvalue(key);
	if (items == null)
	{
		var result = null;
		if (parentCode == null || parentCode.Trim() == '')
			result = LEAP.request('getCodeValues2',
			{
				c	: codeTypeName
			});
		else result = LEAP.request('getCodeValuesByParentValue',
		{
			c	: codeTypeName,
			p	: parentCode
		});
		items =
		{
			i	: true,
			r	: result
		};
		commfields.gco.add(key, items);
	}
	return items.r;
}
LEAP.getServerTimeTicket = function()
{
	return leapclient._serverTime + leapclient._tickDiff
			+ (new Date().getTime() - leapclient._endPointTicket);
}
LEAP.getCodeValue1 = function(codeTypeName, parentCode)
{
	if (codeTypeName == null || codeTypeName == '')
		return;
	var key = '__codetype_' + codeTypeName.toLowerCase();

	if (parentCode)
	{
		parentCode = String(parentCode);
	}

	if (parentCode != null && parentCode.Trim() != '')
	{
		var ik = LEAP.parsenum(parentCode);
		if (ik != null)
			key += '__parentcode__' + ik;
		else key += '__parentcode__' + parentCode;
	}
	var items = commfields.gco.getvalue(key);
	if (items == null)
	{
		var result = null;
		if (parentCode == null || parentCode.Trim() == '')
		{
			result = leapclient.request("HC_getCodeValues2",{c:codeTypeName},null,null,"hcServer","hcServer");
		}
		else 
		{
			result = leapclient.request("HC_getCodeValuesByParentValue",{c:codeTypeName,p:parentCode},null,null,"hcServer","hcServer");
		}
		items =
		{
			i	: true,
			r	: result
		};
		commfields.gco.add(key, items);
	}
	return items.r;
}
/**
 * @param {String}
 *            codeTypeName
 * @param {Object[]}
 *            values
 * @param {String} parentCode
 * @return {Void}
 */
LEAP.addCodeType = function(codeTypeName, values, parentCode)
{
	if (codeTypeName == null || codeTypeName == '')
		return;
	if (parentCode == null || parentCode == '')
	{
		var key = '__codetype_' + codeTypeName.toLowerCase();
		var items = commfields.gco.getvalue(key);
		if (items == null)
		{
			items =
			{
				i	: true,
				r	: []
			};
			for(var i = 0;i < values.length;i++)
			{
				if (values[i])
				{
					values[i].codetypename = codeTypeName;
					items.r.add(values[i]);
				}
			}
			commfields.gco.add(key, items);
		}
	}
	else
	{
		var key = '__codetype_' + codeTypeName.toLowerCase();
		parentCode = String(parentCode);

		var ik = LEAP.parsenum(parentCode);
		if (ik != null)
			key += '__parentcode__' + ik;
		else key += '__parentcode__' + parentCode;

		items =
		{
			i	: true,
			r	: []
		};
		for(var i = 0;i < values.length;i++)
		{
			values[i].codetypename = codeTypeName;
			items.r.add(values[i]);
		}
		commfields.gco.add(key, items);
	}
}
/**
 * 清除代码表 ，重新加载
 */
LEAP.cleanCodeValue = function(codeTypeName)
{
	if (codeTypeName == null || codeTypeName == '')
		return;
	var key = '__codetype_' + codeTypeName.toLowerCase();
	var items = commfields.gco.getvalue(key);
	if (items != null)
	{
		commfields.gco.remove(key);
	}
}
/**
 * @param {}
 *            codeTypeName
 * @param {}
 *            codeid
 * @param {}
 *            defaultcode
 * @return {}
 */
LEAP.getCodeText = function(codeTypeName, codeid, defaultcode)
{
	if (codeid != null)
	{
		codeid = String(codeid);
	}
	if (defaultcode != null)
	{
		defaultcode = String(defaultcode);
	}
	var codes = LEAP.getCodeValue(codeTypeName);
	if (codes != null)
	{
		if (codeid == null || codeid == '')
			codeid = defaultcode;

		var l = codes.length;
		for(var i = 0;i < l;i++)
		{
			var iid = LEAP.parsenum(codes[i].codeid);
			if (codes[i].codeid == codeid || (iid != null && iid == codeid))
			{
				// if (codes[i].showvalue != null && code[i].showvalue.Trim() !=
				// '') return codes[i].showvalue;
				return codes[i].codevalue;
			}
		}
	}
}
/**
 * @param {}
 *            codeTypeName
 * @param {}
 *            codevalue
 */
LEAP.getCodeIDByValue = function(codeTypeName, codevalue)
{
	if (codevalue != null)
		codevalue = String(codevalue);
	if (codevalue == null || codevalue == '')
		return;
	var codes = LEAP.getCodeValue(codeTypeName);
	if (codes != null)
	{
		var l = codes.length;
		for(var i = 0;i < l;i++)
		{
			if (codes[i].codevalue == codevalue) { return codes[i].codeid; }
		}
	}
}
LEAP.getCodeById = function(codeTypeName,codeid)
{
	if (codeid != null)
		codeid = String(codeid);
	if (codeid == null || codeid == '')
		return;
	var codes = LEAP.getCodeValue(codeTypeName);
	if (codes != null)
	{
		var l = codes.length;
		for(var i = 0;i < l;i++)
		{
			if (codes[i].codeid == codeid) { return codes[i]; }
		}
	}
}
LEAP.getCodeById1 = function(codeTypeName,codeid)
{
	if (codeid != null)
		codeid = String(codeid);
	if (codeid == null || codeid == '')
		return;
	var codes = LEAP.getCodeValue1(codeTypeName);
	if (codes != null)
	{
		var l = codes.length;
		for(var i = 0;i < l;i++)
		{
			if (codes[i].codeid == codeid) { return codes[i]; }
		}
	}
}
var vhts = new Array();
vhts.add("INPUT");
vhts.add("TEXTAREA");
var skipvhts = new Array();
skipvhts.add("TD");
skipvhts.add("TH");

LEAP.bindData = function(data, instance, exp, useCodeCache, parent, bts, onlyObj, skipdynaedit)
{
	if (skipdynaedit == null)
		skipdynaedit = true;
	if (onlyObj == null)
		onlyObj = false;
	if (data == null)
	{
		if (onlyObj)
			return;
		data = {};
	}
	if (bts == null)
	{
		var _exp = '[bt][instance="' + instance + '"][md]';
		if (exp != null)
			_exp += exp;
		bts = LEAP.getElements(_exp, parent);
	}
	var temp = [];
	var temp2 = [];
	if (bts != null)
	{
		var l = bts.length;
		for(var i = 0;i < l;i++)
		{
			var t = bts[i];

			var ctf = t.getAttribute(commfields.ctf);
			if (ctf != null && skipdynaedit && ctf == 'dynaedit_edit')
			{
				continue;
			}

			var ctt = t.getAttribute(commfields.ct);
			var ctg = t.getAttribute(commfields.ctg);
			var isht = ctt == null && ctg == null;
			var vdef = LEAP.getBindDef(t);

			//			if(vdef.md == null)
			//				continue;

			if (onlyObj && !data.hasOwnProperty(vdef.md))
				continue;

			var v = data[vdef.md];
			if (v != null && typeof(v) != 'string')
				v = v + "";
			if (vdef.formatnumber == 1 || vdef.formatnumber == true)
			{
				var bv = v;
				var substr = bv.substring(bv.length - 1);
				var bool = bv != null && ((bv.indexOf(".") > 0 && substr == '0') || substr == '.')
				//数字格式化，去掉后面多余的0;
				while(bool)
				{
					bv = bv.substring(0, bv.length - 1);
					substr = bv.substring(bv.length - 1);
					bool = (bv.indexOf(".") > 0 && substr == '0') || substr == '.';
				}
				v = bv;
			}
			var v2 = v;
			if (isht)
			{
				v = LEAP.getBindValue(vdef, v, data, t, useCodeCache);
				var ttype = t.getAttribute('type');
				if (ttype != null && t.tagName == 'INPUT' && ttype.toLowerCase() == 'checkbox')
				{
					if (v == null)
						t.checked = false;
					if (v == true || v == 'true' || v == '1' || v == 1)
						t.checked = true;
					else t.checked = false;;
				}
				else if (vhts.contains(t.tagName))
				{
					t.value = v;
					t.setAttribute('value', v);
				}
				else if (skipvhts.contains(t.tagName))
				{
					continue;
				}
				else
				{
					t.innerText = v;
				}

				if (vdef.code != null && vdef.code.Trim() != '')
				{
					t.setAttribute('_codevalue', v2);
				}

				var ctef = t.getAttribute('ctef');
				if (ctef && LEAP[ctef])
				{
					LEAP[ctef].onsetValue(t);
				}
			}
			else
			{
				if (ctg == 'simplecheck')
				{
					if (temp2.contains(vdef.md))
						continue;
					temp2.add(vdef.md);
					LEAP.simplecheck.setValue(t, v2);
				}
				else if (ctt == 'select')
				{
					var group = t.getAttribute('group');
					if (temp.contains(group))
						continue;
					LEAP.select.setValue(t, v2, false);
					if (group != null && group.Trim() != '')
					{
						temp.push(group);
					}
				}
				else if (ctt.indexOf('upload_control_') == 0)
				{
					LEAP.upload.setValue(t, v2);
				}
				else if (ctt.indexOf('photoupload') == 0)
				{
					LEAP.fileupload.setValue(t, v2);
				}
				else if (ctt.indexOf('rang') == 0)
				{
					LEAP.range.setValue(t, v2);
				}
				else if ("radio" == ctt)
				{
					var group = t.getAttribute('group');
					if (temp.contains(group))
						continue;

					if (group != null && group.Trim() != '')
					{
						temp.push(group);
					}

					if (useCodeCache != null && useCodeCache == false)
					{
						LEAP.radio.setValueByText(t, v2, false);
					}
					else
					{
						LEAP.radio.setValue(t, v2, false);
					}
				}
				else if (ctt == 'organselector')
				{
					LEAP.organSelector._setValue(t, v2);
				}
				else if (ctt == 'chart')
				{
					LEAP.flashchart.setValue(t, v2);
				}
				else if (ctt && LEAP[ctt] && LEAP[ctt].setValue)
				{
					v = LEAP[ctt].setValue(t, v2);
				}
			}
		}
	}
}
LEAP.upload = {};
LEAP.upload.getPath = function(nameedPath, path, uuid, showname, title, width, height)
{
	if (nameedPath && path && (nameedPath.indexOf('http://') == 0 || nameedPath.indexOf('https://') == 0))
	{
		while(nameedPath.endsWith("/"))
		{
			nameedPath = nameedPath.substring(0, nameedPath.length - 1);
		}
		while(path.startsWith("/"))
		{
			path = path.substring(1, path.length);
		}
		return nameedPath + "/" + path;
	}

	if (nameedPath != null && typeof(nameedPath) == 'object')
	{
		var obj = nameedPath;
		nameedPath = obj.nameedPath;
		path = obj.name;
		uuid = obj.uuid;
		showname = obj.showname;
		title = obj.title;
	}

	if (LEAP.upload.u == null)
	{
		LEAP.upload.u = leapconfig.server + "LEAP/Download/";
	}
	if (width != null && height != null)
		url = leapconfig.server + "imageview/" + width + "_" + height + "/LEAP/Download/";
	else url = leapconfig.server + "LEAP/Download/";

	if (nameedPath != null)
	{
		url += encodeURIComponent(encodeURIComponent(escape(nameedPath))) + "/";
	}
	if (path != null)
	{
		if (uuid == null || uuid.Trim() == '')
			url += encodeURIComponent(encodeURIComponent(escape(path)));
		else url += uuid + "_" + encodeURIComponent(encodeURIComponent(escape(path)));
	}
	url = url.replaceall('%252F', "/");
	url = url.replaceall('%2540', "@");
	url = url.replaceall('%25253D', "=");

	var cnname = showname ? showname : title;
	if (cnname)
	{
		var subidx = url.lastIndexOf('.');
		if (subidx > -1)
		{
			if (path != cnname + url.substring(subidx))
			{
				var str = new StringBuffer();
				for(var i = 0;i < cnname.length;i++)
				{
					var cur = cnname.charAt(i);
					var ce = escape(cur);
					if (cur == ' ' || cur == '(' || cur == ')' || ce.indexOf('%u') == 0 || cur == '%B7')
						str.append(cur);
					else str.append(ce);
				}
				url = url.substring(0, subidx) + "/_v3_/" + str.toString() + url.substring(subidx);
			}
		}
	}

	if (window._beforeGetDownPath)
	{
		try
		{
			url = window._beforeGetDownPath(url);
		}
		catch(e)
		{
		}
	}

	return url;
}
LEAP.getData = function(data, instance, eexp, getSearchDef, parent, els, skipdynaedit)
{
	if (skipdynaedit == null)
		skipdynaedit = true;
	var exp = '[bt][instance="' + instance + '"][md]';
	if (eexp != null)
		exp += eexp;
	if (getSearchDef == true)
	{
		exp = exp + "[islwfp!=1]";
	}
	var bts = null;
	if (els == null)
	{
		if (parent instanceof Array)
		{
			bts = [];
			var l = parent.length;
			for(var i = 0;i < l;i++)
			{
				if (parent[i] != null)
				{
					bts.addall(LEAP.getElements(exp, parent[i]));
				}
			}
			if (bts.length == 0)
				bts = null;
		}
		else bts = LEAP.getElements(exp, parent);
	}
	else bts = els;

	var ret = null;
	var data = LEAP.clone(data);
	var temp = [];
	var searchDef = null;
	var hides = null;
	var groupDef = null;
	var skipsearchDef = null;
	if (getSearchDef == true)
	{
		searchDef = {};
		groupDef = {};
		skipsearchDef = {};
	}
	var curData = null;
	var temp2 = [];
	var extend = {};

	if (bts != null)
	{
		var l = bts.length;
		for(var i = 0;i < l;i++)
		{
			var t = bts[i];

			if (t.getAttribute("multipar"))
				continue;

			var ctf = t.getAttribute(commfields.ctf);
			if (ctf != null && skipdynaedit == true && ctf == 'dynaedit_edit')
			{
				continue;
			}

			var ctt = t.getAttribute(commfields.ct);
			var vdef = LEAP.getBindDef(t);
			var ctg = t.getAttribute(commfields.ctg);
			var isht = ctt == null && ctg == null;
			if (vdef.md == null)
				continue;
			var v = null;
			var initV = data[vdef.md];
			var controltype = null;
			var exd = null;

			if (isht)
			{
				var ttype = t.getAttribute('type');
				if (ttype != null && t.tagName == 'INPUT' && ttype.toLowerCase() == 'checkbox')
				{
					v = t.checked;
					if (v == true)
						v = "1";
					else v = "0";
				}
				else if (vhts.contains(t.tagName))
				{
					v = t.value;
				}
				else if (skipvhts.contains(t.tagName))
				{
					continue;
				}
				else
				{
					v = t.innerText;
				}
				if (vdef.bt == 'date')
				{
					if (v != null && v.Trim().indexOf(" ") > -1)
					{
						v = v.Trim().split(" ")[0];
					}
					if (initV != null && initV.Trim().indexOf(" ") > -1)
					{
						initV = initV.Trim().split(" ")[0];
					}
				}

				if (vdef.code != null && vdef.code.Trim() != '')
				{
					v = t.getAttribute('_codevalue');
				}
			}
			else
			{
				if (ctt == 'areagroup')
				{
					controltype = 'areagroup';
					var group = t.getAttribute('group');

					if (group != null && group.Trim() != '')
					{
						if (extend[vdef.md] == null)
							extend[vdef.md] = {};
						if (extend[vdef.md].sizes == null)
							extend[vdef.md].sizes = [];
						extend[vdef.md].sizes.add(t.getAttribute('size'));
					}

					if (temp.contains(group))
						continue;

					v = LEAP.select.getValue(t);

					if (group != null && group.Trim() != '')
					{
						temp.push(group);
						if (extend[vdef.md] == null)
							extend[vdef.md] = {};
						extend[vdef.md].count = t.getAttribute('count');
					}
				}
				//				else if (ctt == 'inputext')
				//				{
				//					controltype = 'inputext';
				//					v = LEAP.inputext.getValue(t);
				//				}
				else if (ctg == 'simplecheck')
				{
					if (temp2.contains(vdef.md))
						continue;
					controltype = 'simplecheck';
					v = LEAP.simplecheck.getValue(t);
					temp2.add(vdef.md);
				}
				else if (ctt == 'select')
				{
					controltype = 'select';
					var group = t.getAttribute('group');

					if (group != null && group.Trim() != '')
					{
						if (extend[vdef.md] == null)
							extend[vdef.md] = {};
						if (extend[vdef.md].sizes == null)
							extend[vdef.md].sizes = [];
						extend[vdef.md].sizes.add(t.getAttribute('size'));
					}

					if (temp.contains(group))
						continue;

					v = LEAP.select.getValue(t);

					if (group != null && group.Trim() != '')
					{
						temp.push(group);
						if (extend[vdef.md] == null)
							extend[vdef.md] = {};
						extend[vdef.md].count = t.getAttribute('count');
					}
				}
				else if (ctt.indexOf('upload_control_') == 0)
				{
					controltype = 'upload';
					v = LEAP.upload.getValue(t);
				}
				//				else if ("checkbox" == ctt)
				//				{
				//					controltype = 'checkbox';
				//					v = LEAP.checkbox.getValue(t);
				//				}
				else if (ctt.indexOf('photoupload') == 0)
				{
					controltype = 'fileupload';
					v = LEAP.fileupload.getValue(t);
				}
				else if (ctt.indexOf('rang') == 0)
				{
					controltype = 'rang';
					v = LEAP.range.getValue(t);
				}
				else if ("radio" == ctt)
				{
					var group = t.getAttribute('group');
					if (temp.contains(group))
						continue;

					if (group != null && group.Trim() != '')
					{
						temp.push(group);
					}

					controltype = 'radio';
					v = LEAP.radio.getValue(t);
				}
				//				else if (ctt == 'date')
				//				{
				//					controltype = 'date';
				//					v = LEAP.date.getValue(t);
				//				}
				else if (ctt == 'organselector')
				{
					controltype = 'organselector';
					v = LEAP.organSelector._getValue(t);
				}
				else if (ctt && LEAP[ctt] && LEAP[ctt].getValue)
				{
					contorltype = ctt;
					v = LEAP[ctt].getValue(t);
				}
				else continue;
			}
			if (v != null && typeof(v) == 'number')
				v = v + "";
			if (initV != null && typeof(initV) == 'number')
				initV = initV + "";
			var tmd = vdef.md;
			if (ret != null)
			{
				var tcount = 1;
				while(ret[tmd] != null)
				{
					tmd = vdef.md + "___" + tcount + "___";
					tcount++;
				}
			}
			var isequal = false;
			if ((String.isEmpty(v)) && (String.isEmpty(initV)))
			{
				isequal = true;
			}
			if (getSearchDef || (v != initV && !isequal))
			{
				var isequal2 = false;
				if ((vdef.bt == 'date' || vdef.bt == 'datetime'))
				{
					if (vdef.bt == 'date')
					{
						if (v != null && v.indexOf(' ') > -1)
							v = v.Trim().split(" ")[0];
						if (initV != null && initV.indexOf(' ') > -1)
						{
							initV = initV.Trim().split(" ")[0];
						}
					}
					if (tmd != vdef.md)
					{
						isequal2 = false;
					}
					else if (v == initV)
						isequal2 = true;
				}
				if (!isequal2)
				{
					if (ret == null)
						ret = {};
					if (initV != null && typeof(initV) != 'string')
						initV = initV + "";
					if (v != null && typeof(v) != 'string')
						v = v + "";
					var hashide = t.getAttribute("_hide");
					hashide = hashide != null && hashide == 1;
					ret[tmd] =
					{
						source		: initV,
						value		: v,
						controltype	: controltype,
						hashide		: hashide
					};
					if (hashide)
					{
						if (hides == null)
							hides = [];
						hides.add(tmd);
					}
					data[tmd] = v;
					if (getSearchDef == true)
					{
						searchDef[tmd] = LEAP.parsenum(t.getAttribute('search'));
						groupDef[tmd] = t.getAttribute('searchgroup');
						skipsearchDef[tmd] = t.getAttribute('skipsearch');
					}
				}
			}
			if (curData == null)
				curData = {};
			curData[tmd] = v;
			if (exd != null && extend[tmd] == null)
				extend[tmd] = ext;
		}
	}
	try
	{
		var ret =
		{
			change		: ret,
			data		: data,
			searchtype	: searchDef,
			group		: groupDef,
			skipsearch	: skipsearchDef,
			curData		: curData,
			extend		: extend,
			hides		: hides
		};
		return ret;

	}
	finally
	{
		ret = data = null;
	}
}
LEAP.addEvent = function(elements, type, fun, args, domain, useUIEvent, priority)
{
	if (typeof(elements) == "string")
		elements = LEAP.getElements(elements);
	if (elements == null || type == null || fun == null)
		return;
	if (type != null)
		type = type.replace(/(^\s*)|(\s*$)/g, "");

	if (useUIEvent == null)
		useUIEvent = false;

	var isde = useUIEvent != true && DelegateUIEventManager.c.contains(type);
	var em = null;
	if (isde)
		em = DelegateUIEventManager;
	else em = UIEventManager;

	if (elements instanceof Array)
	{
		var l = elements.length;
		for(var i = 0;i < l;i++)
		{
			var element = elements[i];
			if (!LEAP.isIE && element != null && element == document.body)
			{
				element = document;
			}

			var ct = element.getAttribute("ct");
			if (ct == null || ct.replace(/(^\s*)|(\s*$)/g, "").length == 0)
				ct = element.getAttribute("ct");
			var isct =
					ct != null && ElementEventManager.a.contains(ct)
							&& ElementEventManager.a.getvalue(ct).contains(type);
			if (isct)
				ElementEventManager.addEvent(element, type, fun, args, domain, priority);
			else em.addEvent(element, type, fun, args, domain, priority);
			element = null;
		}
	}
	else
	{
		var ct = null;
		if (elements.getAttribute != null)
		{
			ct = elements.getAttribute("ct");
			if (ct == null || ct.replace(/(^\s*)|(\s*$)/g, "").length == 0)
				ct = elements.getAttribute("ct");
		}
		var isct =
				ct != null && ElementEventManager.a.contains(ct)
						&& ElementEventManager.a.getvalue(ct).contains(type);
		if (!LEAP.isIE && elements != null && elements == document.body)
		{
			elements = document;
		}
		if (isct)
			ElementEventManager.addEvent(elements, type, fun, args, domain, priority);
		else em.addEvent(elements, type, fun, args, domain, priority);
	}

	elements = type = fun = args = domain = null;
}

/**
 * @param {}
 *            element
 * @param {}
 *            type
 * @param {}
 *            fun
 * @param {}
 *            useUIEvent
 */
LEAP.removeEvent = function(elements, type, fun, useUIEvent)
{
	if (typeof(elements) == "string")
		elements = LEAP.getElements(elements);
	if (elements == null || type == null || fun == null)
		return;
	if (type != null)
		type = type.replace(/(^\s*)|(\s*$)/g, "");

	if (useUIEvent == null)
		useUIEvent = false;

	var isde = useUIEvent != true && DelegateUIEventManager.c.contains(type);
	var em = null;
	if (isde)
		em = DelegateUIEventManager;
	else em = UIEventManager;

	if (elements instanceof Array)
	{
		var l = elements.length;
		for(var i = 0;i < l;i++)
		{
			var element = elements[i];
			var ct = element.getAttribute("ct");
			var isct =
					ct != null && ElementEventManager.a.contains(ct)
							&& ElementEventManager.a.getvalue(ct).contains(type);
			if (isct)
				ElementEventManager.removeEvent(element, type, fun);
			else em.removeEvent(element, type, fun);
			element = null;
		}
	}
	else
	{
		var ct = null;
		if (elements.getAttribute != null)
			ct = elements.getAttribute("ct");
		var isct =
				ct != null && ElementEventManager.a.contains(ct)
						&& ElementEventManager.a.getvalue(ct).contains(type);
		if (isct)
			ElementEventManager.removeEvent(elements, type, fun);
		else em.removeEvent(elements, type, fun);
	}

	elements = type = fun = null;
}
LEAP.loadf = function(str)
{
	if (str == null)
		return;
	var l = str.indexOf('<!--@');
	if (l > -1)
	{
		var e = str.substr(l + 5, str.indexOf('-->', l) - l - 5);
		var o = null;
		try
		{
			var ex =
					'({'
							+ e.replaceall(' =', '=').replaceall('= ', '=').replaceall('=', ':').trim().replaceall('\r\n', ' ').replaceall('\n', ' ').replaceall('  ', ' ').replaceall(' ', ',')
							+ '})';
			var o = eval(ex);
			if (o != null && ex != null)
			{
				var idx = ex.indexOf('module:');
				if (idx > -1)
				{
					var idx2 = ex.indexOf(',');
					if (idx2 < 0)
						idx2 = ex.length - 2;
					var n = ex.substring(idx + 7, idx2);
					o.___moduleName = n;
				}
			}
		}
		catch(err)
		{
		}
	}
	return o;
}
LEAP._pl = function()
{
	UIEventManager.removeEvent(window, 'load', LEAP._pl);

	var o = LEAP.loadf(LEAP.getElement('head').innerHTML);
	LEAP.loadModule(null, null, null, o);
	o = null;
}
UIEventManager.addEvent(window, 'load', LEAP._pl, null, null, 10);
LEAP.clone = function(o, r)
{
	if (o && o.clone != null) { return o.clone(); }

	if (r == null)
		r = {};
	for(var k in o)
	{
		r[k] = o[k];
	}
	return r;
};
/**
 * 获取当前模型
 * @param {} instance
 * @return {}
 */
LEAP.getLoadedModule = function(instance)
{
	return GlobalModuleManager.getModule(instance);
}
LEAP._match = function(element, ct, flag, deep, islevel)
{
	if (flag == null)
		return;
	var temp = null;
	try
	{
		if (element.getAttribute(flag) == ct || element[flag] == ct) { return element; }
		if (deep == null)
			deep = 19;
		temp = element.parentNode;
		var level = -1;
		for(var i = 0;i < deep;i++)
		{
			level++;
			if (temp == null)
				return;
			if (temp.tagName == 'BODY')
				return;
			if (temp.getAttribute(flag) == ct || temp[flag] == ct)
			{
				if (islevel == true)
					return level;
				return temp;
			}
			temp = temp.parentNode;
			if (temp == null)
				return;
		}
	}
	catch(err)
	{

	}
	finally
	{
		temp = element = null;
	}
}
LEAP._check = function(element, ct)
{
	if (element == null || ct == null)
		return;
	if (typeof(element) == commfields.string)
		element = LEAP.getElement(element);
	if (element == null || element.getAttribute('ct') != ct)
		return;
	try
	{
		return element;
	}
	finally
	{
		element = null;
	}
}

LEAP.getElement = function(selector, context)
{
	var ret = null;
	try{
		if (context != null && typeof(context) == "string")
			context = LEAP.getElement(context);
		var sb = new StringBuffer();
		if(selector.indexOf("=")>-1)
		{
			var selectors = selector.split("]");
			for(var i=0;i<selectors.length;i++)
			{
				if(selectors[i]=="")
					continue;
				var str = null;
				if(selectors[i].indexOf("=")>-1)
				{
					var strs=selectors[i].split("=");
					if(strs[1].indexOf("\"")>-1)
						str = strs[0]+"="+strs[1]+"]";
					else
						str = strs[0]+"='"+strs[1]+"']";
					
				}
				else
				{
					str = selectors[i]+"]";
				}
				sb.append(str);
			}
		}
		else
			sb.append(selector);
		if(!context)
			ret = document.querySelector(sb.toString());
		else
			ret = context.querySelector(sb.toString());
		return ret;
	}
	catch(e)
	{
	}
	finally
	{
		ret=null;
	}
}
LEAP.getElements = function(selector, context)
{
	var ret = null;
	try{
		if (context != null && typeof(context) == "string")
			context = LEAP.getElement(context);
		var sb = new StringBuffer();
		if(selector.indexOf("=")>-1)
		{
			var selectors = selector.split("]");
			for(var i=0;i<selectors.length;i++)
			{
				if(selectors[i]=="")
					continue;
				var str = null;
				if(selectors[i].indexOf("=")>-1)
				{
					var strs=selectors[i].split("=");
					if(strs[1].indexOf("\"")>-1)
						str = strs[0]+"="+strs[1]+"]";
					else
						str = strs[0]+"='"+strs[1]+"']";
				}
				else
				{
					str = selectors[i]+"]";
				}
				sb.append(str);
			}
		}
		else
			sb.append(selector);
		if(!context)
			ret = document.querySelectorAll(sb.toString());	
		else
			ret = context.querySelectorAll(sb.toString());
		return ret;
	}
	catch(e)
	{
	}
	finally
	{
		ret=null;
	}
}
LEAP.addCSS = function(element,classname,isarray)
{
	if (element == null)
		return;
	if (isarray != true && !(element instanceof Array))
		element = [element];
	var l = element.length;
	for(var i=0;i<l;i++)
	{
		if(element[i].className.indexOf(classname)==-1)
			element[i].classList.add(classname);
	}
}
LEAP.removeCSS = function(element,classname,isarray)
{
	if (element == null)
		return;
	if (isarray != true && !(element instanceof Array))
		element = [element];
	var l = element.length;
	for(var i=0;i<l;i++)
	{
		if(element[i].className.indexOf(classname)>-1)
			element[i].classList.remove(classname);
	}
}
LEAP.showMask = function(element,callback)
{
	var maskdiv = document.createElement("div");
	maskdiv.className="hc-masker";
	if(!element)
		document.body.appendChild(maskdiv);
	else
		element.appendChild(maskdiv);
	var stepel = PageSteps.getStep();
	if(stepel)
	{
		var index = parseInt(stepel.style.zIndex);
		index = index+2
		maskdiv.style.zIndex=index;
	}
	else
		maskdiv.style.zIndex=102;
	maskdiv.setAttribute("ctf","masker"+maskdiv.style.zIndex);
	setTimeout(function(){
		LEAP.addCSS(maskdiv,"hc-masker-show");
	},0);
	maskdiv.addEventListener("click",function(){
		LEAP.clickMaskCallBack(maskdiv,callback);
	});
	return maskdiv.style.zIndex;
}
LEAP.clickMaskCallBack = function(marskEl,callback)
{
	if(callback)
	{
		callback();
	}
}
LEAP.hideMask = function(element)
{
	if(element)
	{
		var maskdiv = LEAP.getElement(".hc-masker-show",element);
		if(maskdiv)
		{
			LEAP.removeCSS(maskdiv,"hc-masker-show");
			setTimeout(function()
			{
				element.removeChild(maskdiv);
			},300)
			
		}
	}
	else
	{
		var maskdivs = LEAP.getElements(".hc-masker-show");
		if(maskdivs && maskdivs.length!=0)
		{
			var maskdiv = maskdivs[maskdivs.length-1];
			if(maskdiv)
			{
				LEAP.removeCSS(maskdiv,"hc-masker-show");
				setTimeout(function(){
					document.body.removeChild(maskdiv);	
				},300)
			}		
		}
	}
}
LEAP.toDate = function(dateString)
{
	if (dateString == null)
		return;
	var ms = null;
	var idx = dateString.indexOf('.');
	if (idx > -1)
	{
		ms = dateString.substring(idx + 1) * 1;
		dateString = dateString.substring(0, idx);
	}
	var ret = new Date(Date.parse(dateString.replace(/-/g, "/")));
	if (ms != null)
		ret.setMilliseconds(ms);
	return ret;
}
LEAP.tonum = function(o)
{
	if (o == null || o == undefined || isNaN(o))
		o = 0;
	var ret = Number(o);
	if (isNaN(ret))
		return 0;
	return ret;
}
/**
 * 转换为数值,如转换失败,返回null
 * 
 * @param {}
 *            o 需转换的对象
 * @return {Number} 转换后的数值对象
 */
LEAP.parsenum = function(o)
{
	if (o == null || o == undefined || isNaN(o))
		return null;
	var ret = Number(o);
	if (isNaN(ret))
		return null;
	return ret;
}


/**
 * 页面实例对象,所有页面对象的基类
 * 
 * @class page instance base class
 * @example LEAP中所有客户端界面部分面向应用开发的可控的最小基本单元, 由 html页面呈现视图 与 js页面控制实例 两部分共同构成.
 * 
 * HTML部分: 示例: <TEXTAREA style="width:600px;height:200px;" wrap=off> <head>
 * <link href="../../StyleSheet/default.css"
 * path='LEAP/Resource/StyleSheet/default.css' rel="stylesheet" type="text/css" />
 * <script src="../../JavaScript/Base.js"
 * path='LEAP/Resource/JavaScript/Base.js' def></script>
 * 
 * <!--@ module = datasource --> </head> <div
 * style='height:100%;width:100%;position:relative;'> <div class='area
 * lg_p_tb_top' style='height:200px;'>
 * 
 * 
 * <div class="input_frame" style="width: 33%; height:24px; float: left;"> <div
 * class='lg_p_lr_left input_left' style="width: 100px;line-height:24px;">name</div>
 * <div class='lg_p_lr_fill input_fill'>
 * 
 * <div class='lg_p_lr_fill_c input_fill_c_right'> <div class='lg_p_lr_right
 * input_right' style="line-height:24px;">cm</div> <div class='lg_p_lr_fill
 * input_fill'> <div class='lg_p_lr_fill_c input_fill_c'> <input type="text"
 * ht='input' md='name' bt='text' style="width: 100%"> </div> </div> </div>
 * 
 * </div> </div>
 * 
 * 
 * 
 * 
 * <div class="button_frame"><a href="javascript:void(0)" class="button">
 * <p>
 * </p>
 * <span ut='searchbtn' ht='button' ctf='button'>搜索</span></a></div> <div
 * class="button_frame"><a href="javascript:void(0)" class="button">
 * <p>
 * </p>
 * <span ut='createbtn' ht='button' ctf='button'>新增</span></a></div> </div>
 * <div class='lg_p_tb_bottom' style='top:200px;'> <div ut='list' style='width:
 * 100%;height:100%' class="table" ct='table' pageSize='11' showcheck='1'
 * showsn='1' searchMethod=''> <div class='lg_p_bt_top table_border'
 * style='bottom: 25px; overflow: auto'> <table cellspacing="0"> <thead
 * ctf='table_thead'>
 * <tr ctf='table_thead_tr'>
 * <th style='width: 50px' ctf='table_header' md='status' sncol='1' bt='table_sn'>SN</th>
 * <th ctf='table_header' md='name' bt='text'>name</th>
 * <th ctf='table_header' tpo='查看:1|修改:2|删除:3'>opeartion</th>
 * </tr>
 * </thead> <tbody ctf='table_tbody'> </tbody> </table> </div> <div
 * class='lg_p_bt_bottom' style='height: 25px;' align='right'> <div
 * style="float:left; text-align:left; "> <input type="button"
 * class="page_button" value="导出"> <input type="button" class="page_button"
 * value="属性"> </div><div style="float:right; text-align:right;"> <input
 * ctf='table_page_first' type="button" class="page_button" value="首页"> <input
 * ctf='table_page_pre' type="button" class="page_button" value="上一页"> <input
 * ctf='table_page_next' type="button" class="page_button" value="下一页"> <input
 * ctf='table_page_last' type="button" class="page_button" value="尾页"> <FONT
 * ctf='table_page_info'>&nbsp; 0/0页 0/0条 13条/页</FONT> <input
 * ctf='table_page_in' type="text" class="input" size="4"> <input
 * ctf='table_page_goto' type="button" class="page_button" value="跳转"> </div>
 * </div> </div> </div> <body> </body> </TEXTAREA> JS部分: <TEXTAREA
 * style="width:600px;height:200px;" wrap=off> var datasource = function() {
 * this.pks = null; this.refreshPage = function(element , gotoPageNum ,
 * pageSize) { var par = this.buildQuery(); par.pageNum = gotoPageNum;
 * par.pageSize = pageSize; par.name = "datasource"; var result =
 * LEAP.request('DynaSearch',{par:par}); if(result != null) this.pks =
 * result.pks; return result; } this.buildQuery = function() { return
 * this.getQueryParameter(); } this.search = function() { var list =
 * this.getUT("list"); LEAP.table.gotoPage(list,1); list = null; }
 * this.createForm = null; this.viewForm = null; this.modifyForm = null;
 * this.create = function() { if(this.createForm == null) { this.createForm =
 * LEAP.form.create("dataSourceNew","新增楼栋");
 * this.createForm.module.regEvent('onSubmit',this.onCreate,this); } else
 * LEAP.form.show(this.createForm.form); } this.onCreate = function() {
 * this.search(); } this.view = function(data) { if(this.viewForm == null) {
 * this.viewForm = LEAP.form.create("dataSourceView"); } else
 * LEAP.form.show(this.viewForm.form); var viewModule = this.viewForm.module;
 * viewModule.setPageData(data); } this.modify = function(data) {
 * if(this.modifyForm == null) { this.modifyForm =
 * LEAP.form.create("dataSourceModify");
 * this.modifyForm.module.regEvent('onSubmit',this.onModify,this); } else
 * LEAP.form.show(this.modifyForm.form); var viewModule =
 * this.modifyForm.module; viewModule.pks = this.pks;
 * viewModule.setPageData(data); data = null; } this.onModify = function() {
 * this.search(); } this.listOperation = function(arg) { var flag =
 * arg.arg2.flag; var index = arg.arg2.index; var data = arg.arg2.data; if(flag ==
 * 1) { this.view(data); } else if(flag == 2) { this.modify(data); } else
 * if(flag == 3) { if(window.confirm("确定删除该记录?")) {
 * if(this.deleteResult('datasource',data , this.pks)==true) { this.search(); } } }
 * arg = null; } this.dispose = function() { if(this.createForm != null) {
 * this.createForm.module.dispose(); this.createForm.module = null;
 * this.createForm = null; } if(this.viewForm != null) {
 * this.viewForm.module.dispose(); this.viewForm.module = null; this.viewForm =
 * null; } if(this.modifyForm != null) { this.modifyForm.module.dispose();
 * this.modifyForm.module = null; this.modifyForm = null; } } this.pageLoad =
 * function() { var list = this.getUT("list"); var btn =
 * this.getUT("searchbtn"); var createbtn = this.getUT("createbtn");
 * LEAP.table.setSearchMethod(list, this.refreshPage, this); this.addEvent(list ,
 * 'rowOperationClick' , this.listOperation);
 * this.addEvent(btn,'click',this.search);
 * this.addEvent(createbtn,'click',this.create); createbtn = btn = list = null;
 * this.search(); } } </TEXTAREA> <b>页面书写注意事项:</b> 1)HTML代码部分在<head></head>中必须申明当前JS页面控制对象的名称,并且大小写一致,如:
 * <TEXTAREA style="width:600px;height:80px;" wrap=off> <!--@ module =
 * datasource --> </TEXTAREA> 在JS中定义就必须为 var datasource = function(){}
 * 2)HTML代码部分的资源引用必须添加path申明,并且指向以当前web应用的根路径为起始点的完整路径,如: <TEXTAREA
 * style="width:600px;height:50px;" wrap=off> <script
 * src="../../JavaScript/Module/Demo/datasource.js"
 * path='LEAP/Resource/JavaScript/Module/Demo/datasource.js' def></script>
 * </TEXTAREA> 3)JS页面控制示例必须为单个JSclass,申明如: var datasource = function(){}
 * 4)JS代码中不允许出现立即执行的代码,如: var datasource = function(){} var a = 1;
 * 第二行代码在LEAP规范中是不允许出现的 5)方法体中定义的局部变量与参数,应该在方法体功能执行完成后立即释放,如: var datasource =
 * function() { this.search = function(arg) { var list = this.getUT('list');
 * ...do... arg = list = null; } }
 * 6)在JS页面控制实例中假如存储了页面html对象,模型控制对象,复杂数据对象时,应该在dispose方法内释放,如: var datasource =
 * function() { this.dispose = function() { if(this.createForm != null) {
 * this.createForm.module.dispose(); this.createForm.module = null;
 * this.createForm = null; } } }
 * 7)JS页面实例的pageLoad方法是在页面加载完成后立即执行,把页面控制的初始化动作放到该方法内执行,如: var datasource =
 * function() { this.pageLoad = function() { var list = this.getUT("list"); var
 * btn = this.getUT("searchbtn"); var createbtn = this.getUT("createbtn");
 * LEAP.table.setSearchMethod(list, this.refreshPage, this); this.addEvent(list ,
 * 'rowOperationClick' , this.listOperation);
 * this.addEvent(btn,'click',this.search);
 * this.addEvent(createbtn,'click',this.create); createbtn = btn = list = null;
 * this.search(); } }
 */
var pageObject = {};
/**
 * @class pageObjectExtend
 */
var pageObjectExtend = new Object();

pageObject._isPageObject = true;
pageObject.bindData = function(data)
{
	var str = new StringBuffer();
	var bts = null;
	if (arguments.length > 1)
	{
		var l = arguments.length;
		var d = {};
		for(var i = 1;i < l;i++)
		{
			d[arguments[i]] = data[arguments[i]];
			if (i != 1)
				str.append(',');
			str.append('[md=').append(arguments[i]).append('][instance=' + this.instance + "]");
		}
		bts = LEAP.getElements(str.toString(), this.parentElement);
	}

	LEAP.bindData(data, this.instance, null, null, this.parentElement, bts, true);

	bts = data = null;
}



/**
 * 获取父模型
 * @return {pageObject}
 */
pageObject.getParentModule = function()
{
	if (this.pom) { return this.pom.getParent(this); }
}

pageObject.loadModule2 = function(def)
{
	var module = null;
	try
	{
		if (this.pom)
		{
			if (!def.moduleParameter)
				def.moduleParameter = {};
			def.moduleParameter.___pageObjectModel = this.pom;
			def.moduleParameter.___parentModule = this;
		}
		var n = def.path;
		if (n == null)
			n = def.name;

		module =
				LEAP.loadModule(n, def.parent, def.type, def.d, def.htmlsource, def.distributeFlag, def.moduleParameter, def.moduleLoadArg, def.pageMode, null, null, def.authority);
		if (module)
			module.parentPageModule = this;
		return module;
	}
	finally
	{
		def = def.moduleParameter = module = null;
	}
}

pageObjectExtend.loadSimpleModule = function(def)
{
	var module = null;
	try
	{
		if (this.pom)
		{
			if (!def.moduleParameter)
				def.moduleParameter = {};
			def.moduleParameter.___pageObjectModel = this.pom;
			def.moduleParameter.___parentModule = this;
		}
		var n = def.path;
		if (n == null)
			n = def.name;

		module = LEAP.loadSimpleModule(def);
		if (module)
			module.parentPageModule = this;
		return module;
	}
	finally
	{
		def = def.moduleParameter = module = null;
	}
}

pageObjectExtend.simpleModules = function(name)
{
	name = name.toLowerCase();
	var def = this.____formdefs.getvalue(name);

	if (def)
	{
		if (this.__simplemodules == null)
		{
			this.__simplemodules = new hashtable();
		}

		if (this.__simplemodules.contains(name))
			return this.__simplemodules.getvalue(name);

		def.autodispose = false;
		var module = this.loadSimpleModule(def);
		this.__simplemodules.add(name, module);
		return module;
	}
}

/**
 * 在指定的父容器中加载模型实例,返回模型实例控制对象
 * 
 * @param {String}
 *            path 模型路径
 * @param {string/htmlelement}
 *            parent 父容器
 * @param {Object} moduleParameter 模型初始化参数，调用方在初始化（pageLoad）之前传递给模型,必须为对象<br>
 * 如：var parmeter = {name:"test user",sex:1};<br>var module = LEAP.loadModule("moduleName",parentCon);<br>
 * 模型的pageLoad方法中 this.pageLoad = function(){ if(this.moduleParameter){var name = this.moduleParameter.name;var sex = this.moduleParamter.sex;}) 
 * @param moduleLoadArg 传递给pageLoad方法的参数
 * @return {Object} 模型实例控制对象
 */
pageObject.loadModule = function(name, parent, moduleParameter, moduleLoadArg, pageMode, authority)
{
	var module = null;
	try
	{
		if (this.pom)
		{
			if (!moduleParameter)
				moduleParameter = {};
			moduleParameter.___pageObjectModel = this.pom;
			moduleParameter.___parentModule = this;
		}
		module =
				LEAP.loadModule(name, parent, null, null, null, null, moduleParameter, moduleLoadArg, pageMode, null, null, authority);
		if (module)
			module.parentPageModule = this;
		return module;
	}
	finally
	{
		moduleParameter = module = null;
	}
}

/**
 * 加载无界面的模型<br>
 * 根据名称(类名)与JS文件的地址加载无界面的模型对象,具备页面模型的一切特性,会自动加载pageLoad方法,会执行dispose<br>可以使用页面模型的所有方法,并且融入页面模型体系.<br>
 * 如: LEAP/LPMS/JavaScript/demo.js 路径,内容为:var demo = function(){ this.fa = function(par1){this.loadModule("hello",this.getUT('list'));} }<br>
 * 在模型内部的加载代码为:<br> var module = this.loadNoneUIModule('demo','LEAP/LPMS/JavaScript/demo.js');<br>module.fa('go');
 * @param {} name 名称,与类名保存一致,类必须是可实例化的,即:function
 * @param {} URI js文件路径,从LEAP开始计算的相对路径
 * @param {Object} moduleParameter 模型初始化参数，调用方在初始化（pageLoad）之前传递给模型,必须为对象<br>
 */
pageObject.loadNoneUIModule = function(name, URI, moduleParameter, moduleLoadArg)
{
	if (URI)
		leapclient.loadjs(URI);
	var module = null;
	try
	{
		module = eval('(new ' + name + '())');
		if (this.pom)
		{
			if (!moduleParameter)
				moduleParameter = {};
			moduleParameter.___pageObjectModel = this.pom;
			moduleParameter.___parentModule = this;
		}
		module = LEAP.newPageObjectInstance(name, module, null, moduleParameter, moduleLoadArg);
		if (module)
			module.parentPageModule = this;

		module.isNoneUI = true;

		return module;
	}
	finally
	{
		moduleParameter = module = null;
	}
}

/**
 * def.path | def.name,
 * def.title, 
 * def.width, 
 * def.height, 
 * def.x, 
 * def.y, 
 * def.autohide, 
 * def.hidemsg, 
 * def.autodispose, 
 * def.distributeFlag, 
 * def.initShow, 
 * def.showMode, 
 * def.icon, 
 * def.moduleLoadArg, 
 * def.pageMode, 
 * def.moduleParameter,
 * def.authority
 * @param {} def
 * @return {}
 */
pageObject.loadForm3 = function(def)
{
	if (def == null)
		return null;
	var form = null;
	try
	{
		if (this.pom)
		{
			var moduleParameter = def.moduleParameter;
			if (!moduleParameter)
				moduleParameter = {};
			moduleParameter.___pageObjectModel = this.pom;
			moduleParameter.___parentModule = this;
			def.moduleParameter = moduleParameter;
		}

		if (!def.cover)
			form = LEAP.hc_form.create3(def);
		else
		{
			def.module = this;
			form = LEAP.form.coverModule(def);
		}

		var module = form.module;
		if (module != null)
		{
			module.parentPageModule = this;
			module.pom = this.pom;
			this.pom.addObject(module, this);
		}
		if (!this.___forms)
			this.___forms = [];
		this.___forms.add(form.form);

		if (this.delayModuleEvents)
		{
			var name = def.name;
			if (String.isEmpty(name))
				name = def.path;
			if (this.delayModuleEvents.contains(name))
			{
				var defs = this.delayModuleEvents.getvalue(name);
				for(var i = 0;i < defs.length;i++)
				{
					var def = defs[i];
					var fnname = def.type + "_" + def.event + "_" + def.name;
					if (this[fnname] != null)
					{
						if (def.type == 'form')
						{
							this.addEvent(form.form, def.event, this[fnname]);
						}
						else
						{
							form.module.regEvent(def.event, this[fnname], this);
						}
					}
				}
			}
		}

		return form;
	}
	finally
	{
		form = null;
	}
}

/**
 * 创建窗体
 * 
 * @param {String}
 *            module路径
 * @param {String}
 *            form标题
 * @param {string/int}
 *            width 宽度
 * @param {string/int}
 *            height 高度
 * @param {string/int}
 *            x x坐标
 * @param {string/int}
 *            y y坐标
* @param {true/false}
 *            是否自动隐藏窗体
* @param {String}
 *            隐藏窗体时显示的消息
* @param {true/false}
 *            是否自动销毁创建的模型对象并关闭form
* @param {String}
 *            distributeFlag 分发模型标识
 * @return {Object} form定义{form:实例ID,module:module定义}
 * @example var formdefine =
 *          this.create('LEAP/Resource/HTML/ds.html','数据源管理'); <br>
 *          var ds = form.module; var form = form.id;
 */
pageObject.loadForm =
		function(path, title, width, height, x, y, autohide, hidemsg, autodispose, distributeFlag, initShow, showMode, authority)
		{
			var form = null;
			try
			{
				var moduleParameter = null;
				if (this.pom)
				{
					moduleParameter = {};
					moduleParameter.___pageObjectModel = this.pom;
					moduleParameter.___parentModule = this;
				}

				form =
						LEAP.hc_form.create(path, title, width, height, x, y, autohide, hidemsg, autodispose, distributeFlag, initShow, showMode, null, null, null, moduleParameter, authority, this.moduleVersion);

				var module = form.module;
				if (module != null)
				{
					module.parentPageModule = this;
					module.pom = this.pom;
					this.pom.addObject(module, this);
				}

				if (!this.___forms)
					this.___forms = [];
				this.___forms.add(form.form);

				return form;
			}
			finally
			{
				form = null;
			}
		}
/**
 * 创建窗体
 * 
 * @param {String}
 *            module路径
 * @param {String}
 *            form标题
 * @param {string/int}
 *            width 宽度
 * @param {string/int}
 *            height 高度
 * @param {string/int}
 *            x x坐标
 * @param {string/int}
 *            y y坐标
* @param {true/false}
 *            是否自动隐藏窗体
* @param {String}
 *            隐藏窗体时显示的消息
* @param {true/false}
 *            是否自动销毁创建的模型对象并关闭form
* @param {String}
 *            distributeFlag 分发模型标识
 * @return {Object} form定义{form:实例ID,module:module定义}
 * @example var formdefine =
 *          this.create('LEAP/Resource/HTML/ds.html','数据源管理'); <br>
 *          var ds = form.module; var form = form.id;
 */
pageObject.loadForm2 =
		function(path, title, width, height, x, y, autohide, hidemsg, autodispose, distributeFlag, initShow, authority)
		{
			return this.loadForm(path, title, width, height, x, y, autohide, hidemsg, autodispose, distributeFlag, initShow, 2, authority);
		}

/**
 * 获取指定控件的值
 * 
 * @param {HTMLElement}
 *            element
 * @return {}
 */
pageObject.getValue = function(element)
{
	return LEAP.getValue(element, this.parentElement);
}
/**
 * 设置指定控件的值
 * 
 * @param {HTMLElement}
 *            element
 * @param {Object/String}
 *            v
 */
pageObject.setValue = function(element, v)
{
	LEAP.setValue(element, v, this.parentElement);
}
/**
 * 注册页面元素事件
 * 
 * @param {string/htmlelement/htmlelement[]}
 *            elements {必需|不可为空} 注册事件元素
 * @param {String}
 *            type {必需|不可为空} 事件类型：小写
 * @param {function}
 *            fun {必需|不可为空} 事件响应函数
 * @param {Object}
 *            arg {可选|可为空} 事件参数：不要以任何形式直接传递HTML元素，而应该使用唯一标识，如_uuid或id
 * @param {Object}
 *            domain {可选|可为空} 事件作用域：不要以任何形式直接传递HTML元素，如有必要可以在args内指定需要元素的唯一标识
 */
pageObject.addEvent = function(elements, type, fn, arg, useBrowEvent, domain)
{
	if (fn == null)
		return;
	if (typeof(elements) == commfields.string)
	{
		if (elements.indexOf('instance') == -1)
			elements = LEAP.getElements(elements + "[instance=" + this.instance + "]", this.parentElement);
		else elements = LEAP.getElements(elements);
	}
	if (useBrowEvent == null || (useBrowEvent != true && useBrowEvent != false))
		useBrowEvent = null;
	if (domain == null)
		domain = this;
	LEAP.addEvent(elements, type, fn, arg, domain, useBrowEvent);
	if (this.__aes == null)
		this.__aes = [];
	var def =
	{
		elements		: elements,
		type			: type,
		fn				: fn,
		useBrowEvent	: useBrowEvent
	};
	this.__aes.add(def);
}
/**
 * 反注册页面元素事件
 * 
 * @param {string/htmlelement/htmlelement[]}
 *            elements {必需|不可为空} 注册事件元素
 * @param {String}
 *            type {必需|不可为空} 事件类型：小写
 * @param {function}
 *            fn {必需|不可为空} 事件响应函数
 */
pageObject.removeEvent = function(elements, type, fn)
{
	if (typeof(elements) == commfields.string)
		elements = LEAP.getElements(elements + "[instance=" + this.instance + "]", this.parentElement);
	LEAP.removeEvent(elements, type, fn);
}
/**
 * 校验界面UI控件
 * 
 * @param {string/htmlelement/htmlelement[]}
 *            elements 需要校验的控件/控件清单,为空时校验本页面的所有控件
 * @return {string[]} 校验失败的控件清单
 */
pageObject.validateUI = function(elements, parentElement)
{
	if (parentElement == null)
		parentElement = this.parentElement;

	if (elements != null)
	{
		if (typeof(elements) == commfields.string)
			elements = LEAP.getElements(elements + "[instance=" + this.instance + "]", parentElement);
	}
	else
	{
		if (parentElement instanceof Array)
		{
			elements = [];
			var l = parentElement.length;
			for(var i = 0;i < l;i++)
			{
				var cur = parentElement[i];
				var cels = LEAP.getElements("[check][instance=" + this.instance + "]", cur);
				if (cels != null)
					elements.addall(cels);
				cur = null;
			}
			if (elements.length == 0)
				elements = null;
		}
		else
		{
			elements = LEAP.getElements("[check][instance=" + this.instance + "]", parentElement);
		}
	}

	if (elements != null)
	{
		var fels = [];
		var l = elements.length;
		for(var i = 0;i < l;i++)
		{
			var c = elements[i];
			var isopa = c.getAttribute('___isoparea');
			var opstatus = c.getAttribute('___isoparea_status');
			if (String.isEmpty(isopa)
					|| (isopa != null && opstatus != null && isopa == '1' && opstatus != '110' && opstatus != '120'))
			{
				opstatus = c.getAttribute('_sys_opareastatus');
				if (String.isEmpty(opstatus) || (opstatus != '110' && opstatus != '120'))
				{
					fels.push(c);
				}
			}
			c = null;
		}
		elements = null;
		if (fels.length > 0)
			try
			{
				return LEAP.check.validate(fels);
			}
			finally
			{
				fels = null;
			}
	}
	elements = null;
}
/**
 * 请求业务服务
 * 
 * @param {String}
 *            name 服务名称
 * @param {json
 *            object} par 服务参数
 * @return {json object} 返回结果
 */
pageObject.request =
		function(name, par, callback, serviceName, callService, requestType, isreturnjson, useGet, _args, isworker)
		{
			var ret =
					LEAP.request(name, par, this.extendPar, callback, serviceName, callService, requestType, isreturnjson, useGet, this, _args, isworker);
			if (ret != null && callback != null)
			{
				if (this.asynreqs == null)
					this.asynreqs = [];
				this.asynreqs.add(ret);
			}
			return ret;
		}
/**
 * 异步请求
 * @param {} name
 * @param {} par
 * @param {} callback
 * @param {} args
 * @return {}
 */
pageObject.asynrequest = function(name, par, callback, args)
{
	var ret = LEAP.request(name, par, this.extendPar, callback, null, null, null, null, null, this, args);
	if (ret != null && callback != null)
	{
		if (this.asynreqs == null)
			this.asynreqs = [];
		this.asynreqs.add(ret);
	}
	return ret;
}

/**
 * 获取最后一个通讯警告
 * 
 * @return {String}
 */
pageObject.getLastWarring = function()
{
	return leapclient.getLastWarring();
}

/**
 * 获取最后一个通讯扩展结果
 * 
 * @return {String}
 */
pageObject.getLastExtendResult = function()
{
	return leapclient.getLastExtendResult();
}
/**
 * 设置最后一个通讯扩展结果
 */
pageObject.setLastExtendResult = function(result)
{
	return leapclient.setLastExtendResult(result);
}
/**
 * 获取最后一个通讯错误
 * 
 * @return {jsonobject}error:error,code:errorcode,success:success
 */
pageObject.getLastError = function()
{
	return leapclient.getLastError();
}
/**
 * 获取页面元素
 * 
 * @param {string/htmlelement/htmlelement[]}
 *            elements 元素/元素集合(选择器语法)
 * @param {string/htmlelement}
 *            context 限定上下文
 * @return {htmlelement[]} 元素集合
 */
pageObject.getElements = function(elements, context)
{
	if (!context)
		context = this.parentElement;
	var ret = LEAP.getElements(elements, context);
	try
	{
		return ret;
	}
	finally
	{
		ret = null;
	}
}
/**
 * 获取页面元素
 * 
 * @param {string/htmlelement/htmlelement[]}
 *            elements 元素/元素集合(选择器语法)
 * @param {string/htmlelement}
 *            context 限定上下文
 * @return {HTMLElement} 元素
 */
pageObject.getElement = function(elements, context)
{
	if (!context)
		context = this.parentElement;
	var ret = LEAP.getElement(elements, context);
	elements = context = null;
	try
	{
		return ret;
	}
	finally
	{
		ret = null;
	}
}

/**
 * 绑定页面数据
 * 
 * @param {json
 *            object} data 页面数据
 * @param {String}
 *            {可选} dsName 数据源名称
 * @param {boolean}
 *            {可选} issync 是否同步执行,为true则为同步执行,false或者为null为异步执行
 * @param {boolean}
 *            {可选} 是否重置页面数据对象,默认为true
 * @param {boolean}
 *            {可选}
 *            是否使用代码缓存,为false时直接从查询结果中取代码值文本,但是联动代码,select,check未解决,目前只解决了radio
 */
pageObject.setPageData = function(data, dsName, issync, resetPageDataObject, useCodeCache, parentElement)
{
	if (resetPageDataObject == null)
		resetPageDataObject = true;
	if (resetPageDataObject)
		this.data = data;
	var exp = null;
	if (dsName != null)
		exp = '[ds=' + dsName + ']';
	if (issync == null)
	{
		issync = true;
	}
	if (issync == true)
	{
		var parent = parentElement;
		if (parent == null)
			parent = this.parentElement;

		
		if (this.beforeSetPageData)
		{
			this.beforeSetPageData(data);
		}
		LEAP.bindData(data, this.instance, exp, useCodeCache, parent);
		this.___afterSetData();
		if (this.afterSetPageData)
		{
			this.afterSetPageData(data);
		}

		this.fireEvent('onsetpagedata', data);
	}
	else
	{
		LEAP.asyn(this.__asynSetPageData, this, null, data, dsName, resetPageDataObject, useCodeCache, parentElement);
	}
	data = null;
}
/**
 * 根据pk值设置页面数据
 * 
 * @param {String}
 *            pkvalue pk值
 * @param {String}
 *            {可选} dsName 数据源名称
 * @param {boolean}{可选}
 *            issync 是否同步执行,为true则为同步执行,false或者为null为异步执行
 */
pageObject.setPageDataByPK = function(pkvalue, dsName, issync, resetPageDataObject)
{
	if (this.moduleName == null)
		return;
	var result = this.request("SearchByPK",
	{
		name	: this.moduleName,
		pk		: pkvalue
	});
	if (result != null)
	{
		this.pks = result.pks;
		var d = LEAP.convertResult(result);
		if (d != null)
			this.setPageData(d[0], dsName, issync, resetPageDataObject);
	}
}
/**
 * 获取页面数据
 * 
 * @return {json object} 页面数据,包含页面变更部分数据与页面变更后的整体数据
 */
pageObject.getPageData = function(dsName, parentElement)
{
	var exp = null;
	if (dsName != null)
		exp = '[ds=' + dsName + ']';
	if (parentElement == null)
		parentElement = this.parentElement;
	var ret = LEAP.getData(this.data, this.instance, exp, null, parentElement);
	if (this.onGetPageData != null)
	{
		ret = this.onGetPageData(ret);
	}
	try
	{
		return ret;
	}
	finally
	{
		ret = null;
	}
}
/**
 * 清空页面数据
 * 
 * @param {boolean}
 *            issync {可选}  是否同步执行,为true则为同步执行,false或者为null为异步执行
 */
pageObject.clearPageData = function(issync)
{
	this.exdata = null;
	this.data = null;
	this.exSubmitParam = null;
	if (issync == null)
		issync = true;

	if (issync == true)
	{
		this.___clearData2();
	}
	else
	{
		LEAP.asyn(this.___clearData2, this);
	}
}

/**
 * 清空页面校验样式
 */
pageObject.clearValidateUI = function()
{
	LEAP.asyn(LEAP.check.clearValidate, null, null, LEAP.getElements("[check][instance=" + this.instance
			+ "]", this.parentElement));
}

/**
 * 获取页面查询条件
 * 
 * @return {SearchParameters} 查询条件,查询条件对象类型与服务端保持一致
 */
pageObject.getQueryParameter = function(searchParameters, exp, els)
{
	if (searchParameters == null)
		searchParameters = new SearchParameters();

	if (this.isNoneUI != null && this.isNoneUI == true)
		return searchParameters;

	var ns = this.getElement('[ct=newsearch]');
	if (ns)
	{
		if (!(this.__sys_src_ctf && this.__sys_src_ctf == 'search_submit'))
		{
			searchParameters = LEAP.newsearch.getValue(ns, searchParameters);
			ns = null;
			if (this.moduleVersion > 1)
			{
				var sb = this.createSearchBuilder(searchParameters);
				sb.parameter = searchParameters;
				return sb;
			}
			return par;
		}
	}
	var searchpart = this.getElement("[ct=searchpart]");
	if (searchpart)
	{
		var isextend = searchpart.getAttribute("extendSearch");
		if (isextend == "1" && LEAP.searchpart)
		{
			var searchPar = LEAP.searchpart.getSearchPar(searchpart);
			if (this.moduleVersion > 1)
			{
				var sb = this.createSearchBuilder(searchPar);
				sb.parameter = searchPar;
				return sb;
			}
			return searchPar;
		}
	}
	{
		var ret = LEAP.getData(null, this.instance, exp, true, this.parentElement, els);
		try
		{
			if (ret != null && ret.data != null)
			{
				for(var k in ret.data)
				{
					var v = ret.data[k];
					if (v == null || (typeof(v) == 'string' && v.Trim() == ''))
					{
						continue;
					}
					var searchtype = ret.searchtype[k];
					var searchgroup = ret.group[k];
					var skipsearch = ret.skipsearch[k];
					if (skipsearch != null && (skipsearch == '1' || skipsearch == 'true'))
						continue;
					var tidx = k.lastIndexOf('___');
					if (tidx != -1 && tidx == k.length - 3)
						k = k.substr(0, tidx - 4);
					var hasadd = false;

					if (k.toLowerCase() == 'areaid' || k.toLowerCase() == 'areacode'
							|| k.toLowerCase() == 'qhareaid')
					{
						searchParameters.addParameter(k, v, 16).setGroup('system.' + k + '.client');
						var mv = null;
						if (v.length == 18)
						{
							if (v.substring(0, 2) == "00")
								mv = "";
							else if (v.substring(2, 4) == "00")
								mv = v.substring(0, 2);
							else if (v.substring(4, 6) == "00")
								mv = v.substring(0, 4);
							else if (v.substring(6, 9) == "000")
								mv = v.substring(0, 6);
							else if (v.substring(9, 12) == "000")
								mv = v.substring(0, 9);
							else if (v.substring(12, 15) == "000")
								mv = v.substring(0, 12);
							else if (v.substring(15, 18) == '000')
								mv = v.substring(0, 15);
							while(mv.length != 18)
								mv += '9';
						}
						searchParameters.addParameter(k, mv, 17).setGroup('system.' + k + '.client');
					}
					else if (searchtype == 120 && ret.extend && ret.extend[k])
					{
						var def = ret.extend[k];
						if (def)
						{
							var count = def.count * 1;
							if (window.isNaN(count))
								count = 0;
							if (count != 0)
							{
								if (def.sizes)
								{
									var l = def.sizes.length;
									var realV = null;
									var psize = 0;
									var preidx = -1;
									for(var i = 0;i < l;i++)
									{
										var size = def.sizes[i];
										var cv = v.substring(psize, size);
										if (cv * 1 == 0)
										{
											break;
										}
										preidx = i;
										psize = size;
									}
									var pre = null;
									if (preidx == 0)
									{
										pre = v.substring(0, def.sizes[0]);
										pre = (pre * 1 + 1) + "";
										while(pre.length < def.sizes[0])
											pre = "0" + pre;
									}
									else
									{
										var cj = v.substring(def.sizes[preidx - 1], def.sizes[preidx]);
										cj = (cj * 1 + 1) + "";
										while(cj.length < def.sizes[preidx] - def.sizes[preidx - 1])
											cj = "0" + cj;
										pre = v.substring(0, def.sizes[preidx - 1]) + cj;
									}
									while(pre.length < count)
										pre += "0";
									searchParameters.addParameter(k, v, 16).setGroup('system.linkselect.' + k);
									searchParameters.addParameter(k, pre, 15).setGroup('system.linkselect.'
											+ k);
								}
							}
						}
					}
					else
					{
						if (ret.change[k] != null && ret.change[k].controltype != null)
						{
							if (ret.change[k].controltype == 'checkbox')
							{
								hasadd = true;
								var vs = v.split(',');
								for(var i = 0;i < vs.length;i++)
								{
									var tv = vs[i];
									if (tv != null && tv.Trim() != '')
									{
										if (searchgroup != null && searchgroup.trim().length > 0)
											searchParameters.addParameter(k, tv, 12).setGroup(searchgroup);
										else searchParameters.addParameter(k, tv, 12);
									}
								}
							}
						}
						if (!hasadd)
						{
							if (searchgroup != null && searchgroup.trim().length > 0)
								searchParameters.addParameter(k, v, searchtype).setGroup(searchgroup);
							else searchParameters.addParameter(k, v, searchtype);
						}
					}
				}
			}
			var controlEle = LEAP.getElement("[instance=" + this.instance + "]", this.parentElement);
			var searchValues = LEAP.getElements("th[searchvalue]", controlEle);
			if (searchValues && searchValues.length > 0)
			{
				for(var i = 0;i < searchValues.length;i++)
				{
					var codeid = searchValues[i].getAttribute("searchvalue");
					var md = searchValues[i].getAttribute("md");
					searchParameters.addParameter(md, codeid, 11);
				}
			}
			pageObject.getMultiParameter(searchParameters);
			if (this.moduleVersion > 1)
			{
				var sb = this.createSearchBuilder(searchParameters);
				sb.parameter = searchParameters;
				return sb;
			}
			//		if (this.moduleVersion > 1 && searchParameters && searchParameters.parameters && searchParameters.parameters.length > 0)
			//		{
			//			var l = searchParameters.parameters.length;
			//			var ps = searchParameters.parameters;
			//			searchParameters.parameters = null;
			//			try
			//			{
			//				delete searchParameters['parameters'];
			//			}
			//			catch(e)
			//			{
			//			}
			//			searchParameters.par = {};
			//			for(var i = 0;i < l;i++)
			//			{
			//				var qp = ps[i];
			//				if (qp && qp.name)
			//				{
			//					var obj = {};
			//					if (searchParameters.par[qp.name] == null)
			//						searchParameters.par[qp.name] = obj;
			//					else
			//					{
			//						var c = 1;
			//						while(searchParameters.par[qp.name + '_' + c] != null)
			//						{
			//							c++;
			//						}
			//						searchParameters.par[qp.name + '_' + c] = obj;
			//					}
			//					obj.value = qp.value;
			//					obj.logic = qp.flag;
			//					if (obj.logic == null)
			//						obj.logic = 12;
			//					obj.type = qp.type;
			//					obj.group = qp.group;
			//					if (obj.logic != null)
			//					{
			//						var str = obj.logic + '';
			//						var strb = null;
			//						if (str.charAt(0) == 1)
			//						{
			//							strb = 'and ';
			//						}
			//						else strb = 'or ';
			//						var sub = str.substring(1);
			//						if (sub == 1)
			//							strb += '=';
			//						else if (sub == 2)
			//							strb += 'like %V%';
			//						else if (sub == 3)
			//							strb += 'like %V';
			//						else if (sub == 4)
			//							strb += '>';
			//						else if (sub == 5)
			//							strb += '<';
			//						else if (sub == 6)
			//							strb += '>=';
			//						else if (sub == 7)
			//							strb += '<=';
			//						else if (sub == 8)
			//							strb += '<>';
			//						else if (sub == 9)
			//							strb += 'like V%';
			//						else if (sub == 10)
			//							strb += 'not like %V';
			//						else if (sub == 11)
			//							strb += 'not like %V%';
			//						else if (sub == 12)
			//							strb += 'not like V%';
			//						else if (sub == 13)
			//							strb += 'is null';
			//						else if (sub == 14)
			//							strb += 'is not null';
			//						else if (sub == 15)
			//							strb += 'in';
			//						else if (sub == 16)
			//							strb += 'not in';
			//						obj.logic = strb;
			//					}
			//				}
			//			}
			//		}
			return searchParameters;
		}
		finally
		{
			searchParameters = ret = null;
		}
	}
}

pageObject.getMultiParameter = function(searchParameters)
{
	if (searchParameters)
	{
		var pars = LEAP.getElements("[multipar]", this.parentElement);
		if (pars != null)
		{
			for(var i = 0;i < pars.length;i++)
			{
				var multis = pars[i].getAttribute("multipar");
				multis = eval(multis);

				var vs = LEAP.getValue(pars[i]);
				if (vs != null)
				{
					for(var j = 0;j < multis.length;j++)
					{
						if (multis[j].v == vs)
						{
							var ex = multis[j].p;
							if (searchParameters.extendQuery)
							{
								ex = ex + "and" + searchParameters.extendQuery;
							}

							searchParameters.setExtendQuery(ex);
						}
					}
				}
			}
		}

	}
}

/**
 * 获取页面更新参数
 * 
 * @param {String}
 *            dsName 数据源名称,用来标识一个页面上不同数据源字段,为空时获取所有字段
 * @return {ChangeResult} 页面变更数据
 */
pageObject.getUpdateParameter = function(dsName, parentElement)
{
	if (parentElement == null)
		parentElement = this.parentElement;
	if (this.pks == null)
	{
		if (this.parentPageModule && this.parentPageModule.pks)
			if (this.parentPageModule.pageMode == 'search')
				this.pks = this.parentPageModule.pks;

		if (this.pks == null)
		{
			this.pks = ['id'];
		}
	}
	var updateParameter = null;
	var ret = null;
	try
	{
		var exp = null;
		if (dsName != null)
			exp = '[ds=' + dsName + ']';
		ret = LEAP.getData(this.data, this.instance, exp, null, parentElement);
		if (ret == null || ret.change == null)
			return null;
		if (this.moduleVersion > 1)
		{
			updateParameter = {};
			for(var key in ret.change)
			{
				if (ret.change[key].hashide)
					continue;
				updateParameter[key] = ret.change[key].value;
			}
			for(var i = 0;i < this.pks.length;i++)
			{
				var key = this.data[this.pks[i]];

				if (key == null)
				{
					if (this.submitMode != null && this.submitMode == 2)
					{
					}
					else if (this.submitMode != null && this.submitMode == 3)
					{
					}
					else return null;
				}
				else updateParameter[this.pks[i]] = key;
			}
			if (this.moduleName && updateParameter)
				updateParameter.beanname = this.moduleName;
		}
		else
		{
			updateParameter = LEAP.convertChangeResult(ret.change);
			for(var i = 0;i < this.pks.length;i++)
			{
				var key = this.data[this.pks[i]];

				if (key == null)
				{
					if (this.submitMode != null && this.submitMode == 2)
					{
					}
					else if (this.submitMode != null && this.submitMode == 3)
					{
					}
					else return null;
				}
				else updateParameter.addparameter(this.pks[i], key, null);
			}
			if (this.moduleName && updateParameter)
				updateParameter.name = this.moduleName;
		}
		return updateParameter;
	}
	finally
	{
		updateParameter = ret = null;
	}
}
/**
 * 根据模型名称与主键名称删除指定记录
 * 
 * @param {String}
 *            name 模型名称
 * @param {jsonobject}
 *            data 需要删除的数据
 * @param {array/string}
 *            pks 模型主键清单
 */
pageObject.deleteResult = function(name, data, pks)
{
	if (pks == null || name == null || data == null || !(pks instanceof Array))
		return;
	var parameter = new DataResult();
	parameter.name = name;
	if (typeof(pks) == 'string')
		pks = [pks];
	for(var i = 0;i < pks.length;i++)
	{
		var key = data[pks[i]];
		if (key == null)
			return;
		parameter.addparameter(pks[i], key);
	}
	return this.request("DynaDelete",
	{
		par	: parameter
	});
}

/**
 * 获取新增参数
 * 
 * @param {String} dsName
 *            数据源名称,用来标识一个页面上不同数据源字段,为空时获取所有字段
 * @return {DataResult} parentElement 新增数据,数据类型与服务端保持一致
 */
pageObject.getCreateParameter = function(dsName, parentElement)
{
	if (parentElement == null)
		parentElement = this.parentElement;

	var creteParameter = null;
	var ret = null;
	try
	{
		var exp = null;
		if (dsName != null)
			exp = '[ds=' + dsName + ']';
		ret = LEAP.getData(null, this.instance, exp, null, parentElement);
		if (ret != null && ret.data != null)
		{
			var hides = ret.hides;
			if (this.moduleVersion > 1)
			{
				for(var k in ret.data)
				{
					if (hides && hides.contains(k))
						continue;
					var v = ret.data[k];
					if (v == null || (typeof(v) == 'string' && v.Trim() == ''))
					{
						continue;
					}
					if (creteParameter == null)
						creteParameter = {};
					creteParameter[k] = v;
				}
				if (this.moduleName && creteParameter)
					creteParameter.beanname = this.moduleName;

				if (this.isp_out_inset && creteParameter)
				{
					var tmp = creteParameter;
					for(var key in this.isp_out_inset)
					{
						var cdp = this.isp_out_inset[key];
						if (cdp)
						{
							creteParameter[key] = cdp;
						}
					}
				}
				if (this.defvalue && creteParameter)
				{
					var l = this.defvalue.length;
					for(var i = 0;i < l;i++)
					{
						var cur = this.defvalue[i];
						if (cur && cur.f && cur.v)
						{
							creteParameter[cur.f] = cur.v;
						}
					}
				}
			}
			else
			{
				for(var k in ret.data)
				{
					if (hides && hides.contains(k))
						continue;
					var v = ret.data[k];
					if (v == null || (typeof(v) == 'string' && v.Trim() == ''))
					{
						continue;
					}
					if (creteParameter == null)
						creteParameter = new DataResult();
					creteParameter.addparameter(k, v);
				}
				if (this.moduleName && creteParameter)
					creteParameter.name = this.moduleName;
			}
		}
		return creteParameter;
	}
	finally
	{
		creteParameter = ret = null;
	}
}
/**
 * 注册页面对象事件,与页面元素事件不同
 * 
 * @param {String}
 *            type 事件类型
 * @param {function}
 *            fn 响应事件
 * @param {Object}
 *            domain 作用域
 */
pageObject.regEvent = function(type, fn, domain, arg2)
{
	if (type == null || fn == null)
		return;
	if (this.___es == null)
		this.___es = new hashtable();
	var es = this.___es.getvalue(type);
	if (domain == null)
		domain = this;
	if (es == null)
	{
		es = [
				{
					fn		: fn,
					domain	: domain,
					arg2	: arg2
				}];
		this.___es.add(type, es);
	}
	else
	{
		es.push(
		{
			fn		: fn,
			domain	: domain,
			arg2	: arg2
		});
	}
	type = es = fn = null;
}
/**
 * 响应页面对象事件
 * 
 * @param {String}
 *            type 事件类型
 * @param {Object}
 *            arg 事件参数
 */
pageObject.fireEvent = function(type, arg)
{
	if (this.___es == null)
		return;
	var es = this.___es.getvalue(type);
	if (es == null)
		return;
	var l = es.length;
	for(var i = l - 1;i > -1;i--)
	{
		var def = es[i];
		def.fn.call(def.domain, arg, def.arg2, this);
		def = null;
	}
	es = null;
}

/**
 * 反注册页面对象事件,与页面元素事件不同
 * 
 * @param {String}
 *            type 事件类型
 * @param {function}
 *            fn 响应事件 为空则删除所有该类型事件
 */
pageObject.unRegEvent = function(type, fn)
{
	if (type == null)
		return;
	if (this.___es == null)
		return;
	var es = this.___es.getvalue(type);
	if (es == null)
		return;
	if (fn == null)
	{
		this.___es.remove(type);
	}
	else
	{
		var l = es.length;
		for(var i = l - 1;i > -1;i--)
		{
			var def = es[i];
			if (def.fn == fn)
				es.remove(def);
		}
		es = null;
	}
}

pageObject._pageLoad = function(arg)
{
}

pageObject.innerPageLoad = function(arg)
{
	this.listmode = 'table';
	var list = this.getUT('list');
	if (list)
	{
		var listct = list.getAttribute('ct');
		if (listct && listct == 'eachlist')
			this.listmode = 'eachlist';
		else if (listct == 'itemlist')
			this.listmode = 'itemlist';
	}

	this.moduleVersion = 1;
	var moduleElement = this.moduleElement;
	//	var moduleElement = LEAP.getElement('div[module][modulecn][instance=' + this.instance + ']:first', this.parentElement);
	if (moduleElement)
	{
		this.supportAsynCount = false;
		var sacstr = moduleElement.getAttribute('asyncount');
		if (sacstr != null && sacstr == '1' || sacstr == 'true')
			this.supportAsynCount = true;

		this.moduleName = moduleElement.getAttribute('module');
		this.moduleCNName = moduleElement.getAttribute('modulecn');
		this.pageModuleName = moduleElement.getAttribute('pagemodule');
		this.pageModuleCNName = moduleElement.getAttribute('pagemodulecn');
		this.pageModulePath = moduleElement.getAttribute('pagemodulepath');
		this.pageModuleType = moduleElement.getAttribute('moduletype');
		this.pageModuleHeight = moduleElement.getAttribute('moduleheight');
		this.pageModuleWidth = moduleElement.getAttribute('modulewidth');
		this.moduleElement = moduleElement;
		this.moduleVersion = moduleElement.getAttribute('moduleversion');
		this.formType = moduleElement.getAttribute('formtype');
		this.reportTitle = moduleElement.getAttribute('reporttitle');
		this.isGisMode = moduleElement.getAttribute('isgismode');
		this.isstat = null;
		var isptmp = moduleElement.getAttribute('isp');
		if (!String.isEmpty(isptmp))
		{
			this.isp = JSON.parse(isptmp);
		}
		var _order = moduleElement.getAttribute('order');
		if (!String.isEmpty(_order))
		{
			this.searchorder = _order;
		}
		var _defvalue = moduleElement.getAttribute('defvalue');
		if (!String.isEmpty(_defvalue))
		{
			this.defvalue = JSON.parse(_defvalue);
		}
		if (!String.isEmpty(this.isGisMode) && this.isGisMode == '1')
			this.isGisMode = true;
		else this.isGisMode = false;

		if (!String.isEmpty(this.pageModuleType) && this.pageModuleType == 'stat')
			this.isstat = true;
		else this.istat = false;

		this.autoRefreshParentModule = moduleElement.getAttribute('autoRefreshParentModule');
		if (this.autoRefreshParentModule == null || this.autoRefreshParentModule == '1')
			this.autoRefreshParentModule = true;
		else this.autoRefreshParentModule = false;

		this.autoRefreshOnPageLoad = moduleElement.getAttribute('autoRefreshOnPageLoad');
		if (this.autoRefreshOnPageLoad == null || this.autoRefreshOnPageLoad == '1')
			this.autoRefreshOnPageLoad = true;
		else this.autoRefreshOnPageLoad = false;

		if (!String.isEmpty(this.pageModuleType) && this.pageModuleType == 'chartmodule')
			this.autoStatOnPageLoad = true;

		if (!String.isEmpty(this.pageModuleType) && this.pageModuleType == 'gispmodule')
			this.autoGISStatOnPageLoad = true;

		if (!String.isEmpty(this.pageModuleType) && this.pageModuleType == 'gispmapmodule')
			this.autoGISMapOnPageLoad = true

		if (arg && arg.arg && arg.arg.refreshonpageload != null)
		{
			this.autoRefreshOnPageLoad = arg.arg.refreshonpageload;
		}

		if (arg && arg.arg && arg.arg.autosearch != null)
		{
			this.autoRefreshOnPageLoad = arg.arg.autosearch;
		}

		this.service_insert = moduleElement.getAttribute('service_insert');
		this.service_modify = moduleElement.getAttribute('service_modify');
		this.service_search = moduleElement.getAttribute('service_search');
		this.service_delete = moduleElement.getAttribute('service_delete');

		var arrti = moduleElement.getAttribute('lwfp_searchatt');
		if (arrti != null && arrti.trim().length > 0)
		{
			this.lwfp_searchatt = eval(arrti);
		}
		var group = moduleElement.getAttribute('search_group');
		if (group != null && group.trim().length > 0)
		{
			this.searchgroup = eval(group);
		}
		this.search_fields = moduleElement.getAttribute('search_fields');
		if (!String.isEmpty(this.search_fields))
		{
			this.search_fields = this.search_fields.split(',');
		}
		else this.search_fields = null;

		if (!String.isEmpty(this.moduleVersion))
		{
			this.moduleVersion = this.moduleVersion * 1;
			if (window.isNaN(this.moduleVersion) || this.moduleVersion < 1)
				this.moduleVersion = 1;
		}
		if (!String.isEmpty(this.formType))
		{
			this.formType = this.formType * 1;
			if (window.isNaN(this.formType) || this.formType < 1)
				this.formType = 1;
		}
		var lsm = moduleElement.getAttribute('lsm');
		if (!String.isEmpty(lsm))
		{
			lsm = lsm.trim();
			lsm = lsm.substring(1);
			lsm = lsm.substring(0, lsm.length - 1);
			var es = lsm.split(',');
			if (es.length > 0)
			{
				var l = es.length;
				for(var i = 0;i < l;i++)
				{
					var cur = es[i].trim();
					if (cur.length > 0)
					{
						var def = cur.split("_");
						if (def.length == 4)
						{
							var event = def[0];
							var type = def[1];
							var ct = def[2];
							var sn = def[3];
							var st = type + '_' + ct + "_" + sn;
							var element = this.getElement('[st=' + st + ']', this.parentElement);
							if (element)
							{
								var fn = this[cur];
								if (fn != null)
									this.addEvent(element, event, fn);
								element = null;
							}
						}
						else if (def.length == 3)
						{
							var type = def[0];
							var eventName = def[1];
							var __name = def[2];
							if (__name)
							{
								if (this.delayModuleEvents == null)
									this.delayModuleEvents = new hashtable();
								var def =
								{
									type	: type,
									event	: eventName,
									name	: __name
								};
								var defs = null;

								if (this.delayModuleEvents.contains(__name))
								{
									defs = this.delayModuleEvents.getvalue(__name);
								}
								else
								{
									defs = [];
									this.delayModuleEvents.add(__name, defs);
								}
								defs.add(def);
							}
						}
					}
				}
			}
		}

		moduleElement = null;
	}

	var binds = null;
	if (this.______binds == null)
		binds = this.______binds;
	else binds = this.getElements("[bindevents]", this.parentElement);
	if (binds != null)
	{
		var l = binds.length;
		for(var i = 0;i < l;i++)
		{
			var control = binds[i];
			var events = control.getAttribute('bindevents');
			if (events.length > 0)
			{
				events = events.split(";");
				var el = events.length;
				for(var j = 0;j < el;j++)
				{
					var exp = events[j];
					var exps = exp.split("=");
					if (exps.length == 2)
					{
						var name = exps[0].Trim();
						var fnname = exps[1].Trim();
						if (name.length > 0 && fnname.length > 0)
						{
							var fn = this[exps[1].Trim()];
							if (fn != null)
							{
								if (name == 'searchMethod')
								{
									LEAP[this.listmode].setSearchMethod(control, fn, this);
								}
								else
								{
									this.addEvent(control, exps[0].Trim(), fn);
								}
							}
							fn = null;
						}
					}
				}
				events = null;
			}
			control = null;
		}
	}
	this.______binds = binds = null;

	if (arg != null && arg.moduleOperationType != null)
	{
		if (arg.moduleOperationType == 'view')
		{
			var sb = this.___btnSubmit;
			if (sb != null)
			{
				sb.style.display = 'none';
				sb = null;
			}
		}
	}

}
/**
 * 页面加载自动响应方法
 */
pageObject.pageLoad = function(arg)
{
	this.exdata = null;
	this.moduleLoadArg = arg;

	if (this.pom)
	{
		if (this.___parentModule)
		{
			this.pom.addObject(this, this.___parentModule);
			this.___parentModule = null;
		}
	}
	else
	{
		this.pom = new PageObjectModel();
		this.pom.addObject(this);
	}

	var _d = LEAP.getData(null, this.instance, this.parentElement, null, null, this.___initBTMDS);
	if (_d != null)
		this.defaultData = _d.data;
	this.innerPageLoad(arg);

	this.___innerPageLoad2(arg);

	if (this._pageLoad != null)
		this._pageLoad(arg);

	this.___innerPageLoad3(arg);

	if (this.setDefaultPageData)
	{
		this.setDefaultPageData(this.defaultData);
	}

	if (this.pageMode == 'search')
	{
		
	}
	
	
	this._initphs();
	this._initpes();
}

pageObjectExtend.setGispPorpsBeforoloapchat = function()
{
	var olapEls = LEAP.getElements("[ct=olapchat]", this.moduleElement);
	if (olapEls && olapEls.length > 0)
	{
		for(var i = 0;i < olapEls.length;i++)
		{
			LEAP.olapchat.setValue(olapEls[i], null);
		}
	}
}

pageObjectExtend.setGispPorps = function()
{
	var olapgisEls = LEAP.getElements("[ct=GIS]", this.moduleElement);
	if(olapgisEls&&olapgisEls.length>0){
		for(var i = 0;i < olapgisEls.length;i++)
		{
			LEAP.GISAPI.runMap(olapgisEls[i], this);
		}
	}
	
}

pageObjectExtend.setModulePorps = function()
{
	var searchPanel = LEAP.getElement('div.lgsearchpanel:first', this.moduleElement);
	var searchMainPanel = LEAP.getElement('div.lgsearchcon:first', this.moduleElement);
	var searchMorePanel = LEAP.getElement('div.lgsearchmore:first', this.moduleElement);
	var btnsPanel = LEAP.getElement('div.lgbtncon:first', this.moduleElement);
	if (searchMainPanel != null)
	{
		searchMainPanel.style.height = searchMainPanel.offsetHeight + 'px';
		searchMainPanel.style.paddingLeft = "0px";
	}
	if (searchMorePanel != null)
	{
		searchMainPanel.style.height = "auto";
		searchMorePanel.style.paddingLeft = "0px";
	}
	if (searchPanel != null && searchMainPanel)
	{
		//var h = searchPanel.offsetHeight;
		var mainh = searchMainPanel.scrollHeight;
		var btnh = btnsPanel.scrollHeight;
		searchPanel.style.height = mainh + btnh + "px";
		searchPanel.nextElementSibling.style.top = searchPanel.style.height;
		searchPanel = null;
	}
}
pageObjectExtend.setBrowserPorps = function()
{
	if (this && this.setBrowserPorps && this.moduleElement)
	{
		var cur = LEAP.getElement('.wfui_workarea_c', this.moduleElement);
		if (cur)
		{
			if (cur.scrollWidth > cur.offsetWidth)
				cur.style.width = cur.scrollWidth + "px";
			cur = null;
		}
	}
}

/**
 * 页面销毁方法
 */
pageObject.dispose = function()
{
	if (this.moduleDisposing || this.moduleDisposed)
		return;

	try
	{
		if (this.__aes)
		{
			var l = this.__aes.length;
			for(var i = 0;i < l;i++)
			{
				try
				{
					var cur = this.__aes[i];
					LEAP.removeEvent(cur.elements, cur.type, cur.fn, cur.useBrowEvent);
				}
				catch(e)
				{
				}
			}
			this.__aes.clear();
		}
	}
	catch(e1)
	{
	}

	if (LEAP.echarts)
	{
		var es = this.getElements('[ct=' + LEAP.echarts.d + ']');
		if (es)
		{
			for(var i = 0;i < es.length;i++)
			{
				LEAP.echarts.dispose(es[i]);
				es[i] = null;
			}
			es = null;
		}
	}

	if (this.disposeList && this.disposeList.length > 0)
	{
		var l = this.disposeList.length;
		for(var i = l - 1;i > -1;i--)
		{
			try
			{
				if (LEAP.echarts)
					LEAP.echarts.loads.remove(this.disposeList[i]);
				if (this.disposeList[i].dispose)
					this.disposeList[i].dispose();
			}
			catch(e)
			{
			}
		}
	}

	this.moduleDisposing = true;

	PageObjectModel.___allObjects.remove(this.instance);

	this.parentElement = null;

	if (this.__simpleForm_imgshow)
	{
		document.body.removeChild(this.__simpleForm_imgshow);
		this.__simpleForm_imgshow = null;
	}

	if (this.pom)
	{
		this.pom.removeObject(this);
		this.pom = null;
	}

	this.defaultData = null;
	this.___es = null;
	if (this.innerDispose)
	{
		try
		{
			this.innerDispose();
		}
		catch(e)
		{
			LEAP.messagebox.alert("dispose error : [" + this.name + "]" + e.message, 3);
		}
	}

	if (this.___forms)
	{
		var l = this.___forms.length;
		for(var i = 0;i < l;i++)
		{
			LEAP.hc_form.hide(this.___forms[i]);
		}
	}

	if (this._simplemodules)
	{
		for(var key in this.__simplemodules)
		{
			if (this.__simplemodules[key])
				this.__simplemodules[key].dispose();
		}
	}

	if (this.moduleElement)
	{
		var objs = LEAP.getElements('iframe', this.moduleElement);
		if (objs)
			for(var i = 0;i < objs.length;i++)
			{
				var cur = objs[i];
				if (cur && cur.contentWindow)
					try
					{
						cur.contentWindow.__unloadFlash();
					}
					catch(e)
					{
					}
				cur = null;
			}
		objs = null;
		//		this.moduleElement.innerHTML = '';
	}

	if (this.form)
		LEAP.hc_form.hide(this.form);

	if (this.asynreqs)
	{
		var l = this.asynreqs.length;
		for(i = 0;i < l;i++)
		{
			leaprpcclientasyncactivelist.remove(this.asynreqs[i]);
		}
	}

	if (this.simpleForm)
	{
		LEAP.removeElement(this.simpleForm);
	}

	for(var f in this)
	{
		this[f] = null;
	}

	this.moduleDisposed = true;
}
/**
 * 显示主窗体,假如存在主窗体的话
 */
pageObject.showForm = function()
{
	if (this.form != null)
	{
		LEAP.hc_form.show(this.form);
	}
	else if (this.simpleForm != null)
	{
		this.simpleForm.style.zIndex = LEAP.hc_form.z++;;
		this.simpleForm.style.display = 'block';
		if (this.__simpleForm_imgshow)
		{
			document.body.removeChild(this.__simpleForm_imgshow);
			this.__simpleForm_imgshow = null;
		}
	}

	if (this.formShowed)
	{
		this.formShowed();
	}
}

/**
 * 隐藏主窗体,假如存在主窗体的话
 */
pageObject.hideForm = function()
{
	if (this.form != null)
	{
		LEAP.hc_form.hide(this.form);
	}
	else if (this.simpleForm != null)
	{
		this.simpleForm.style.display = 'none';

		var imghide = document.createElement('IMG');
		imghide.style.position = 'absolute';
		imghide.style.top = this.simpleForm.style.top;
		imghide.style.right = '0px';
		imghide.style.cursor = 'pointer';
		imghide.src = leapconfig.server + 'LEAP/Resource/images/GIS/ModuleSplit/pop_label_bg02.png';
		imghide.style.zIndex = '999';

		imghide.style.filter = "alpha(opacity = 70)";
		imghide.style.opacity = "0.7";

		document.body.appendChild(imghide);
		this.addEvent(imghide, 'click', this.showForm);
		this.__simpleForm_imgshow = imghide;
	}

	if (this.formHided)
	{
		this.formHided();
	}
}

pageObjectExtend.hideModule = function()
{
	if (this.parentElement != null)
	{
		this.parentElement.style.display = 'none';
	}
}

pageObjectExtend.showModule = function()
{
	if (this.parentElement != null)
	{
		this.parentElement.style.display = '';
	}
}

/**
 * 根据元数据名称获取控件
 * 
 * @param {String}
 *            元数据名称
 * @param {String}
 *            dsName
 * @return {HTMLElement} html元素
 */
pageObject.getMD = function(mdname, dsName)
{
	if (String.isEmpty(mdname))
		return;

	if (this.__cacheMD.contains(mdname)) { return this.__cacheMD.getvalue(mdname); }

	var exp = "[md=" + mdname + "][instance=" + this.instance + "]";
	if (dsName != null)
	{
		exp += '[ds=' + dsName + ']';
	}
	var ret = LEAP.getElement(exp, this.parentElement);
	this.__cacheMD.add(mdname, ret);
	try
	{
		return ret;
	}
	finally
	{
		ret = null;
	}
}
/**
 * 根据用户自定义标签获取控件
 * 
 * @param {String}
 *            用户自定义标签
 * @return {HTMLElement} html元素
 */
pageObject.getUT = function(uttype, parent)
{
	if (String.isEmpty(uttype))
		return;

	if (this.__cacheUT.contains(uttype))
	{
		var ret = this.__cacheUT.getvalue(uttype);
		if (ret)
			try
			{
				return ret;
			}
			finally
			{
				ret = null;
			}
	}

	if (!parent)
		parent = this.parentElement;
	var ret = LEAP.getElement("[ut=" + uttype + "][instance=" + this.instance + "]", parent);
	this.__cacheUT.add(uttype, ret);
	try
	{
		return ret;
	}
	finally
	{
		ret = null;
	}
}

pageObjectExtend.removeUTCache = function(uttype)
{
	if (String.isEmpty(uttype))
		return;

	if (this.__cacheUT.contains(uttype))
	{
		var ret = this.__cacheUT.remove(uttype);
		if (ret != false)
		{
			this.__cacheUT = ret;
			return true;
		}
		else return false;
	}
}

/**
 * 根据st标签属性获取控件
 * @param {String} st
 * @return {HTMLElement}
 */
pageObject.getST = function(st, parent)
{
	if (String.isEmpty(st))
		return;

	if (this.__cacheST.contains(st)) { return this.__cacheST.getvalue(st); }

	if (!parent)
		parent = this.parentElement;
	var ret = LEAP.getElement("[st=" + st + "][instance=" + this.instance + "]", parent);
	this.__cacheST.add(st, ret);
	try
	{
		return ret;
	}
	finally
	{
		ret = null;
	}
}
/**
 * 根据表达式获取控件
 * 
 * @param {String}
 *            exp 表达式
 * @return {HTMLElement} html元素
 */
pageObject.getControl = function(exp)
{
	return LEAP.getElement("[instance=" + this.instance + "]" + exp, this.parentElement);
}
/**
 * 注册快捷键事件服务<br>
 * 注册在父容器上,一个div下面加载一个模型,在模型内部按注册的快捷键,会触发事件,<br>
 * 但是在模型外部按快捷键则不触发快捷键<br>
 * 目前只支持113号keycode,为F2按键 13号keycode,为enter按键
 * 
 * @param {int/String}
 *            keycode 按键代码 113为F2
 * @param {HTMLElement}
 *            element 父容器id
 * @param {function}
 *            fun 响应事件
 * @param {Object}
 *            args 参数
 */
pageObject.addShortKeyEvent = function(keycode, element, fun, args)
{
	LEAP.addShortKeyEvent(keycode, element, fun, args, this);
}

/**
 * 根据ut标签属性获取页面元素统一对象
 * @param {String} ut ut标签属性
 * @return {pageElement}
 */
pageObject.ut = function(ut)
{
	var c = this.getUT(ut);
	if (c) { return LEAP.wrap(c, this); }
};
/**
 * 根据md标签属性获取页面元素统一对象
 * @param {String} md md标签属性
 * @return {pageElement}
 */
pageObject.md = function(md)
{
	var c = this.getMD(md);
	if (c) { return LEAP.wrap(c, this); }
};
/**
 * 根据st标签属性获取页面元素统一对象
 * @param {String} st st标签属性
 * @return {pageElement}
 */
pageObject.st = function(st)
{
	var c = this.getST(st);
	if (c) { return LEAP.wrap(c, this); }
};

pageObject.innerViewPageLoad = function(arg)
{
	this.clearValidateUI();
	this.setReadonly(true);
	if (this._viewPageLoad_ != null)
	{
		this._viewPageLoad_(arg);
	}
	this.lastLoadStatus = 'view';

	LEAP.asyn(this.setBackcolor, this, 100);
}
pageObject.innerInsertPageLoad = function(arg)
{
	this.clearValidateUI();
	this.setReadonly(false);
	if (this._insertPageLoad_ != null)
		this._insertPageLoad_(arg);
	this.lastLoadStatus = 'insert';

	LEAP.asyn(this.setBackcolor, this, 100);
}
pageObject.innerModifyPageLoad = function(arg)
{
	this.setReadonly(false);
	this.clearValidateUI();
	if (this._modifyPageLoad_ != null)
		this._modifyPageLoad_(arg);
	this.lastLoadStatus = 'modify';

	LEAP.asyn(this.setBackcolor, this, 100);
}
pageObject.innerSearchPageLoad = function(arg)
{
	this.setReadonly(false);
	if (this._searchPageLoad_ != null)
		this._searchPageLoad_(arg);
	this.lastLoadStatus = 'search';

	LEAP.asyn(this.setBackcolor, this, 100);

	if (this._searchPageLoadCount == null)
		this._searchPageLoadCount = 1;
	else this._searchPageLoadCount += 1;

	if (this._searchPageLoadCount > 1 && this.autoRefreshOnPageLoad)
	{
		this.innerSearch();
	}
}

pageObjectExtend.setBackcolor = function()
{
	if (this._allcontrols == null)
		return;

	if (this.pageMode == 'view')
	{
		if (!LEAP.hasCSS(this.moduleElement, 'modulestyle_readonly'))
			LEAP.addCSS(this.moduleElement, 'modulestyle_readonly');
	}
	else LEAP.removeCSS(this.moduleElement, 'modulestyle_readonly');

	var l = this._allcontrols.length;
	for(var i = 0;i < l;i++)
	{
		var cur = this._allcontrols[i];
		if (((cur.tagName == 'INPUT' && cur.type == 'text') || cur.tagName == 'TEXTAREA')
				&& cur.checktype == null)
		{
			var lcv = cur.getAttribute('lcv');
			if (lcv && lcv == '2')
				continue;
			var rb = cur.style.backgroundColor;
			if (rb == null || rb.length == 0)
			{
				if (this.pageMode == 'view')
				{
					cur.style.backgroundColor = '';
				}
				else
				{
					if (this.moduleVersion > 2)
						cur.style.backgroundColor = '';
					else cur.style.backgroundColor = '#FAFAFA';
				}
			}
		}
		cur = null;
	}
}

pageObjectExtend.setReadonly = function(readonly)
{
	if (readonly != null)
		if (readonly != 'true' && readonly != true && readonly != '1')
			readonly = false;
		else readonly = true;

	if (this.lastLoadStatus != null)
	{
		if (!readonly && this.lastLoadStatus != 'view')
			return;

		if (readonly && this.lastLoadStatus == 'view')
			return;
	}
	else
	{
		if (!readonly)
			return;
	}

	if (this._allcontrols == null)
		return;
	var l = this._allcontrols.length;
	for(var i = 0;i < l;i++)
	{
		var cur = this._allcontrols[i];
		var ct = cur.getAttribute('ct');

		var status = null;
		if (ct == null)
		{
			status = cur.getAttribute('readOnly');
			if (status == null)
				status = false;
		}
		else if (ct == 'simplecheck')
			status = cur.getAttribute('disabled');
		else
		{
			status = cur.getAttribute('readonly');
			if (status == null)
				status = 0;
		}

		var savedstatus = cur.getAttribute('_mro_');
		if (savedstatus != null)
		{
			if (savedstatus != 'true' && savedstatus != true && savedstatus != '1')
				savedstatus = false;
			else savedstatus = true;
		}
		var setstatus = readonly;
		if (setstatus != null)
		{
			LEAP.setReadonly(cur, setstatus);
			if (setstatus)
				cur.setAttribute('_mro_', status);
			else cur.removeAttribute('_mro_');
		}
		else
		{
			LEAP.setReadonly(cur, savedstatus);
			cur.removeAttribute('_mro_');
		}
	}
}

/**
 * 请求服务
 * @param {} def 参数,为Object,可设置属性 <br>
 * def.name 方法名称<br>
 * def.par 参数<br>
 * this.extendPar 扩展参数<br>
 * def.callback 回调方法<br>
 * def.service 调用服务名称<br>
 * def.callService 调用服务名称<br>
 * def.requestType 请求类型<br>
 * def.isreturnjson 是否返回json对象<br>
 * def.useGet 是否使用get请求<br>
 * def.arg 回调参数
 * def.isworker html worker后台执行
 * @return {}
 */
pageObjectExtend.request2 = function(def)
{
	var ret =
			LEAP.request(def.name, def.par, this.extendPar, def.callback, def.service, def.callService, def.requestType, def.isreturnjson, def.useGet, this, def.arg, def.isworker);
	if (ret != null && def.callback != null)
	{
		if (this.asynreqs == null)
			this.asynreqs = [];
		this.asynreqs.add(ret);
	}
	return ret;
}

//region 搜索
/**
 * 构建查询条件
 * 构建过程中会调用 buildSearchQuery 方法,并将构建的查询条件作为参数传入:this.buildSearchQuery(par);
 * this.buildSearchQuery 方法中返回false则中断整个搜索过程,无返回结果或者返回其它任何结果则继续处理
 * this.buildSearchQuery = function(arg)
 * {
 * 		arg.addParameter('示例搜索条件',11);
 * }
 * 
 * @return {}
 */
pageObject.innerBuildQuery = function(gotoPageNum, pageSize)
{
	var par = null;
	var smcon = this.getUT("searchMore");
	if (smcon && smcon.style.display == 'none')
	{
		var exp = '[bt][instance="' + this.instance + '"][md]';

		var els = null;
		{
			var aels = LEAP.getElements(exp, smcon);
			var allels = LEAP.getElements(exp, this.parentElement);
			if (aels && allels)
			{
				var l1 = allels.length;
				var l2 = aels.length;
				for(var i = 0;i < l1;i++)
				{
					for(var k = 0;k < l2;k++)
					{
						if (aels[k] == null)
							continue;
						if (allels[i] == aels[k])
						{
							allels[i] = null;
							aels[k] = null;
						}
					}
				}
				els = [];
				for(var i = 0;i < l1;i++)
				{
					if (allels[i] != null)
						els.add(allels[i]);
				}
			}
			smcon = aels = allels = null;
		}
		par = this.getQueryParameter(null, null, els);
		els = null;
	}
	else
	{
		par = this.getQueryParameter();
	}
	//		par = this.getQueryParameter();
	//	else par = this.getQueryParameter(null, "[ds=search]");

	par.name = this.moduleName;
	par.pageNum = gotoPageNum;
	par.pageSize = pageSize;
	par.getCodeValue = true;
	par.isgis = this.isGisMode
	par = pageObject.innerBuildQuery_WF(par, this.lwfp_searchatt, this.instance, this.parentElement);
	par = pageObject.innerBuildQuery_WFGroup(par, this.searchgroup);
	if (this.parentPKValue && this.linkedfield)
		par.addParameter(this.linkedfield, this.parentPKValue, 11);

	if (this.buildSearchQuery != null)
	{
		var ret = this.buildSearchQuery(par);
		if (ret != null && ret == false) { return null; }
	}
	return par;
}

pageObject.innerBuildQuery_WF = function(par, wf_atts, instance, parentElement)
{
	if (wf_atts != null)
	{
		for(var i = 0;i < wf_atts.length;i++)
		{
			var data = wf_atts[i];
			if (data == null)
				continue;
			if (data.islwfp != "1")
			{
				par.addParameter(data.name, data.value, data.flag, data.type);
				if (data.group != null && data.group.trim().length > 0)
					par.setGroup(data.group);
			}
			else
			{
				var cwid = data.cwid;
				if (cwid != null && cwid.trim().length > 0)
				{
					var exp = '[bt][instance="' + instance + '"][cwid="' + cwid + '"]';
					var el = LEAP.getElement(exp, parentElement);
					if (el == null)
						continue;
					//var _md =  el.getAttribute("md");
					var _value = LEAP.getValue(el);
					if (_value != null && _value.trim().length > 0)
						par.addParameter(data.name, _value, data.flag, data.type);
				}
			}
		}
	}
	return par;
}
pageObject.innerBuildQuery_WFGroup = function(par, group)
{
	if (group != null)
	{
		for(var i = 0;i < group.length;i++)
		{
			var data = group[i];
			if (data == null)
				continue;
			par.setGroupLogic(data.name, data.logic);
		}
	}
	return par;
}
/**
 * 
 * @param {} bean
 * @param {} pks
 * @return {Boolean}
 */
pageObjectExtend.beanDelete = function(bean, pkss, moduleName)
{
	if (bean == null)
		return false;

	var par = this.getDeleteBean(bean, pkss, moduleName);

	if (par == null)
		return false;

	var s = this.service_delete;
	if (String.isEmpty(s))
		s = "beanDelete";
	return this.request(s,
	{
		par	: par
	});
}

/**
 * 
 * @param {} bean
 * @param {} pks
 * @param {} moduleName
 * @return {}
 */
pageObjectExtend.getDeleteBean = function(bean, pks, moduleName)
{
	if (bean == null)
		return null;

	var par = new Object();

	if (moduleName != null)
		par.beanname = moduleName;

	if (par.beanname == null)
		par.beanname = bean.beanname;

	if (par.beanname == null)
		par.beanname = this.moduleName;

	if (pks == null)
		pks = this.pks;
	if (pks == null)
		pks = ["id"];

	if (typeof(pks) == 'string')
		pks = [pks];

	for(var i = 0;i < pks.length;i++)
	{
		var key = bean[pks[i]];
		if (key == null)
			return;
		par[pks[i]] = key;
	}

	return par;
}

pageObjectExtend._innerGetQuery = function(gotoPageNum, pageSize, searchdataarg)
{
	var par = this.innerBuildQuery(gotoPageNum, pageSize);
	if (par == null)
		return;
	if (!(par.pageNum != null && par.pageNum > 0))
		par.pageNum = gotoPageNum;
	if (!(par.pageSize != null && par.pageSize > 0))
		par.pageSize = pageSize;

	if (this.search_fields != null)
	{
		var fl = this.search_fields.length;
		for(var i = 0;i < fl;i++)
		{
			var cf = this.search_fields[i];
			if (!String.isEmpty(cf))
			{
				cf = cf.trim();
				par.addField(cf);
			}
		}
	}

	if (this._innerGetSearchService().toLowerCase().startWith("lwfp"))
	{
		par = [par];
	}

	if (this.onGetSearchParameter)
	{
		var ret = this.onGetSearchParameter(par);
		if (ret != null)
			par = ret;
	}

	if (searchdataarg)
	{
		for(var key in searchdataarg)
		{
			var cdp = searchdataarg[key];
			if (cdp)
			{
				par.addParameter(key, cdp, 11);
			}
		}
	}

	if (this.isp_out && par)
	{
		var tmp = par;
		if (par instanceof Array)
			tmp = par[0];
		for(var key in this.isp_out)
		{
			var cdp = this.isp_out[key];
			if (cdp)
			{
				tmp.addParameter(key, cdp, 11);
			}
		}
	}

	if (this.isp && par)
	{
		var tmp = par;
		if (par instanceof Array)
			tmp = par[0];
		var l = this.isp.length;
		for(var i = 0;i < l;i++)
		{
			var cur = this.isp[i];
			if (tmp.getParameter(cur.n) == null)
			{
				tmp.addParameter(cur.n, cur.v, cur.c);
			}
		}
	}
	if (par)
	{
		var tmp = par;
		if (par instanceof Array)
			tmp = par[0];
		if (this.searchorder)
		{
			tmp.setOrder(this.searchorder)
		}
		if (this.pageModuleName)
		{
			tmp.setPageModule(this.pageModuleName);
		}
	}
	return par;
}

pageObjectExtend._innerGetSearchService = function()
{
	var _service_search = 'beanSearch';
	if (!String.isEmpty(this.service_search))
		_service_search = this.service_search;
	return _service_search;
}

pageObjectExtend.innerStat = function()
{
	var statlist = this.getUT("statlist");
	if (statlist)
	{
		if (this.asynwait == true)
		{
			LEAP.messagebox.alert('正在统计,请等候!');
			return;
		}

		var _service_search = this._innerGetSearchService();

		var par = this._innerGetQuery(1, 99999);

		par = this.innserGetSortPar(par, statlist);

		if (par == null)
			return;

		par.toCount = false;

		this.asynrequest(_service_search,
		{
			par	: par
		}, this.innerAsynStat,
		{
			par	: par
		});

		this.asynwait = true;
	}
	statlist = null;
}

pageObjectExtend.innerAsynStat = function(result, arg)
{
	this.asynwait = false;
	var statlist = this.getUT("statlist");
	try
	{
		if (result != null)
		{
			this.pks = result.pks;
			if (this.searchSucess)
				this.searchSucess(result);

			if (this.searchEnd)
				this.searchEnd(arg.par);

			if (statlist)
			{
				LEAP.setValue(statlist, result);
			}
		}
		else
		{
			if (this.searchSucess)
				this.searchSucess(null);

			if (this.searchEnd)
				this.searchEnd(arg.par);

			if (statlist)
			{
				LEAP.setValue(statlist, null);
			}
		}
	}
	finally
	{
		statlist = null;
		result = arg = null;
	}
}

//571
pageObjectExtend.addFeatureLay = function(result, par, isfromgis)
{
	try
	{

		var di = this.getUT("ut_gisp_onlycurpage");
		if (isfromgis != null && isfromgis == "1")
		{

			var element = LEAP.getElement('[ctid=' + LEAP.GIS.GISSearchModule.ctid + ']');
			if (element != null)
			{

				if ((isfromgis != null && isfromgis == "1") && par != null)
				{
					//				var par1 = pageObjectExtend.createSearchBuilder(par.parameter);
					if (par.parameter != null && par.parameter.parameters != null)
					{
						var par1 = new SearchBuilder(par.name);

						var pars = par.parameter.parameters;
						var f = 11;
						var ids = "";
						for(var i = 0;i < pars.length;i++)
						{
							if (pars[i].flag != null)
							{
								if (pars[i].group != null)
								{
									par1.par(pars[i].name, pars[i].value, pars[i].flag, pars[i].group);
								}
								else
								{
									par1.add(pars[i].name, pars[i].value, pars[i].flag);
								}

							}
							else par1.add(pars[i].name, pars[i].value);
						}

						if (di != null && di.checked)
						{
							var r = result.result;
							if (r != null && r.length > 0)
							{
								for(var i = 0;i < r.length;i++)
								{
									if (i == 0)
										ids = ids + "'" + r[i].id + "'";
									else ids = ids + ",'" + r[i].id + "'";
								}
							}

							par1.parameter.extendQuery =
									par.parameter.extendQuery + " and id in (" + ids + ")";
						}
						else
						{
							par1.parameter.extendQuery = par.parameter.extendQuery;
						}

					}

					LEAP.GIS._SearchModule_setBySearchModule(element, LEAP.GIS.GISSearchModule.layername, par1)
				}

				if ((isfromgis != null && isfromgis == "1") && result != null)
				{
					var objs = [];
					var r = result.result;
					if (r != null && r.length > 0)
					{
						for(var i = 0;i < r.length;i++)
						{
							var obj = new Object();
							obj.id = r[i].id;
							obj.type = "1";
							obj.pts = r[i].gisp_x + "," + r[i].gisp_y;
							obj.layer = LEAP.GIS.GISSearchModule.layername;
							objs.push(obj);
						}
						objs = JSON.stringify(objs);
						if (LEAP.GIS.GISSearchModule.ctid != null)
						{
							LEAP.GIS._SearchModule_onSearch(element, objs);
						}

					}
				}

				if ((isfromgis != null && isfromgis == "1") && result == null)
				{
					LEAP.GIS._SearchModule_clearSearch(element)
				}
			}
		}
	}
	catch(e)
	{
	}

}
pageObject.innerRefreshPage = function(element, gotoPageNum, pageSize, searchdataarg)
{
	var list = this.getUT('list');
	if (list == null)
		return;
	var par = null;
	var result = null;
	try
	{
		if (this.asynwait != null && this.asynwait == true)
		{
			var ret =
			{
				leapclient_asynwait	: 1
			};
			if (window._messagetip == '1')
			{
				alert('正在查询,请等候!');
			}
			else
			{
				LEAP.messagebox.alert('正在查询,请等候!')
			}

			//			alert('正在查询,请等候!');
			return ret;
		}

		var _service_search = this._innerGetSearchService();

		par = this._innerGetQuery(gotoPageNum, pageSize, searchdataarg);

		par = this.innserGetSortPar(par, element);

		if (par == null)
			return;

		if (this.moduleParameter != null && this.moduleParameter.isfromgis != null
				&& this.moduleParameter.isfromgis == "1")
		{
			var a = LEAP.GIS.GISSearchModule.getEnvQuery();
			if (a)
			{
				if (par.parameter.extendQuery != null && par.parameter.extendQuery != "")
				{
					var t = par.parameter.extendQuery;

					par.setExtendQuery(t + " and " + a)
				}
				else
				{
					par.setExtendQuery(a);
				}
			}

			var areaidsstr = LEAP.GIS.GISSearchModule.getAreaLayer();
			if (areaidsstr)
			{
				if (par.parameter.extendQuery != null && par.parameter.extendQuery != "")
				{
					var t = par.parameter.extendQuery;

					par.setExtendQuery(t + " and " + areaidsstr)
				}
				else
				{
					par.setExtendQuery(areaidsstr);
				}
			}
		}
		//		par.setExtendQuery("code='4403070070031000001'");

		var _par = par;
		if (par instanceof Array)
		{
			if (par.length > 0)
				_par = par[0];
		}

		if (_par.getCodeValue != null && _par.getCodeValue == true)
		{
			var tableheaders = LEAP[this.listmode].getHeaders(element);
			if (tableheaders != null)
			{
				var l = tableheaders.length;
				for(var i = 0;i < l;i++)
				{
					var cur = tableheaders[i];
					var code = cur.code;
					if (!String.isEmpty(code))
					{
						if (_par.codetypes == null)
							_par.codetypes = [];
						var cdef =
						{
							name	: cur.md,
							code	: code
						};
						_par.codetypes.add(cdef);
					}
				}
			}
		}

		if (this.asynmode == null || this.asynmode)
		{
			if (this.supportAsynCount)
			{
				if (par instanceof Array && par.length)
					par[0].toCount = false;
				else par.toCount = false;
				if (this.asyncountsn == null)
					this.asyncountsn = 0;
				this.asyncountsn++;
				list.setAttribute('asyncount', '1');
			}
			else
			{
				list.removeAttribute('asyncount', '1');
			}

			if (this.moduleVersion > 1 && !(_service_search.toLowerCase().startWith("lwfp")))
			{
				var sarg =
				{
					gotoPageNum	: gotoPageNum,
					pageSize	: pageSize,
					element		: element,
					par			: par,
					toCount		: par.toCount,
					asynsn		: this.asyncountsn
				};

				par.search(this.innerAsynRefreshPage, sarg, _service_search);

				if (this.supportAsynCount)
				{
					par.toCount = true;
					par.toResult = false;
					par.search(this.innerAsynRefreshPageCount, sarg, _service_search);
				}
			}
			else
			{
				var sarg =
				{
					gotoPageNum	: gotoPageNum,
					pageSize	: pageSize,
					element		: element,
					par			: par
				};
				result = this.asynrequest(_service_search,
				{
					par	: par
				}, this.innerAsynRefreshPage, sarg);

				if (this.supportAsynCount)
				{
					if (par instanceof Array && par.length)
					{
						par[0].toCount = true;
						par[0].toResult = false;
					}
					else
					{
						par.toCount = true;
						par.toResult = false;
					}

					this.asynrequest(_service_search,
					{
						par	: par
					}, this.innerAsynRefreshPageCount, sarg);
				}
			}
			this.asynwait = true;
			var ret =
			{
				leapclient_isasyn	: 1
			};
			return ret;
		}
		else
		{
			result = this.request(_service_search,
			{
				par	: par
			});

			if (this.moduleParameter != null && this.moduleParameter.isfromgis != null
					&& this.moduleParameter.isfromgis == "1")
				this.addFeatureLay(result, par, this.moduleParameter.isfromgis);//571

			if (result != null)
				this.pks = result.pks;

			if (this.searchSucess)
				this.searchSucess(result);

			if (this.searchEnd)
				this.searchEnd(par);

			//			if (result)
			//				LEAP.tree2.setNumberByModuleName(this.name, result.count);
			//			else LEAP.tree2.setNumberByModuleName(this.name, 0);
		}
		return result;
	}
	finally
	{
		list = null;
		element = par = result = null;
	}
}

/**
 * 
 */
pageObjectExtend.focus = function()
{
	if (this.moduleElement)
	{
		try
		{
			this.moduleElement.focus();
		}
		catch(e)
		{
		}
	}
}
pageObjectExtend.innerGetSortFields = function(par)
{
	try
	{
		if (par == null)
			return par;

		if (par instanceof Array)
		{
			par = par[0];
		}
		var order = par.getOrder();
		var sb = new StringBuffer();
		var innerOrder = this._innserOrders;
		if (innerOrder != null && innerOrder.keys != null)
		{
			var keys = this._innserOrders.keys;
			for(var key in keys)
			{
				var value = this._innserOrders.getvalue(key);
				if (value.mod == 2)
					sb.append(this._innserOrders.getkey(key) + " desc");
				else sb.append(this._innserOrders.getkey(key));
			}
		}
		if (sb.toString() == null || sb.toString().length == 0)
		{
			return order;
		}
		else
		{
			if (String.isEmpty(order))
				order = sb.toString(',');
			else order += (',' + sb.toString(','));
		}
		return order;
	}
	finally
	{
	}
}

pageObjectExtend.innserGetSortPar = function(par, element)
{
	try
	{
		if (par == null)
			return par;

		var isarray = false;
		var tmp = par;
		if (par instanceof Array)
		{
			isarray = true;
			par = par[0];
		}

		var order = par.getOrder();

		if (this._innserOrders == null || this._innserOrders.size() == 0) { return tmp; }

		if (element.getAttribute('skiporder') != null && element.getAttribute('skiporder') == '1')
		{
			order = null;
			par.setOrder(null);
		}

		var sb = new StringBuffer();
		var keys = this._innserOrders.keys;
		for(var key in keys)
		{
			var value = this._innserOrders.getvalue(key);
			if (value.mod == 2)
				sb.append(this._innserOrders.getkey(key) + " desc");
			else sb.append(this._innserOrders.getkey(key));
		}
		if (String.isEmpty(order))
			order = sb.toString(',');
		else order += (',' + sb.toString(','));
		par.setOrder(order);
		return tmp;
	}
	finally
	{
		element = null;
	}
}

pageObjectExtend.innserSetSortPar = function(md, mod, th)
{
	if (th != null)
	{
		var mod = th.getAttribute('_orderstatus');
		if (mod == null)
		{
			mod = 0;
		}
		if (mod == 2)
			mod = 0;
		else mod = mod * 1 + 1;
		th.setAttribute('_orderstatus', mod);
	}

	if (this._innserOrders == null)
		this._innserOrders = new hashtable();

	if (mod == 0)
	{
		this._innserOrders.remove(md);
		if (th != null)
		{
			var flag = LEAP.getElement('div[flag=orderflag]', th);
			if (flag != null)
			{
				LEAP.removeElement(flag, false);
				flag = null;
			}
		}
	}
	else
	{
		var def = this._innserOrders.getvalue(md);
		if (def == null)
		{
			this._innserOrders.add(md,
			{
				name	: md,
				mod		: mod
			});
		}
		else
		{
			def.mod = mod;
		}

		if (th != null)
		{
			var showorder = th.getAttribute("showorder");
			if (showorder == "1" || showorder == true)
			{
				var flag = LEAP.getElement('div[flag=orderflagnew]', th);
				if (mod == 1)
				{
					flag.style.background =
							"url(" + leapconfig.server + 'LEAP/Resource/images/itemstyle/table/up.png'
									+ ")  no-repeat center";
				}
				else if (mod == 2)
				{
					flag.style.background =
							"url(" + leapconfig.server + 'LEAP/Resource/images/itemstyle/table/down.png'
									+ ")  no-repeat center";
				}
			}
			else
			{
				var flag = LEAP.getElement('div[flag=orderflag]', th);
				if (flag == null)
				{
					var flag = document.createElement('div');
					flag.style.width = '18px';
					flag.style.height = '16px';
					flag.style.left = '10px';
					flag.style.top = '0px';
					flag.style.position = 'absolute';
					flag.setAttribute('flag', 'orderflag');
				}
				if (mod == 1)
				{
					flag.style.background =
							"url(" + leapconfig.server + 'LEAP/Resource/images/itemstyle/table/order1.png'
									+ ")  no-repeat center";
				}
				else if (mod == 2)
				{
					flag.style.background =
							"url(" + leapconfig.server + 'LEAP/Resource/images/itemstyle/table/order2.png'
									+ ")  no-repeat center";
				}
				th.style.position = 'relative';
				th.appendChild(flag);
				flag = null;
			}
		}
	}
	th = null;
}

/**
 * 导出Excel报表
 * @param {} exportPageCount 默认为1
 * @param {} beginPageNum 默认为数据列表当前页
 * @param {} pageSize 默认为当前数据列表显示行数
 * @param {} isAsyn 默认为true,异步模式
 * @param {} fields 字段列表,默认为当前列表显示列
 */
pageObjectExtend.exportExcel = function(exportPageCount, beginPageNum, pageSize, isAsyn, fields, isPrint)
{
	if (isAsyn == null)
		isAsyn = true;
	if (exportPageCount == null)
		exportPageCount = 1;
	if (exportPageCount < 1)
		exportPageCount = 1;

	if (this.cusotomExportExcel != null)
	{
		this.cusotomExportExcel(
		{
			exportPageCount	: exportPageCount,
			beginPageNum	: beginPageNum,
			pageSize		: pageSize,
			isAsyn			: isAsyn,
			fields			: fields
		});
		return null;
	}

	var tablect = this.getUT('list');
	if (beginPageNum == null)
	{
		if (tablect != null)
		{
			beginPageNum = tablect['pageNum'] * 1;
		}
		if (beginPageNum == null || isNaN(beginPageNum) || beginPageNum <= 0)
		{
			beginPageNum = 1;
		}
	}
	if (pageSize == null)
	{
		if (tablect != null)
		{
			pageSize = tablect['pageSize'] * 1;
		}
		if (pageSize == null || isNaN(pageSize) || pageSize <= 0)
		{
			pageSize = 12;
		}
	}

	if (fields == null)
	{
		var headers = tablect[LEAP[this.listmode].a];
		if (headers != null)
		{
			var l = headers.length;
			for(var i = 0;i < l;i++)
			{
				var h = headers[i];
				if (h.md != null && h.sncol == false)
				{
					if (fields == null)
						fields = [];

					if (!fields.contains(h.md))
						fields.add(h.md);
				}
			}
			headers = null;
		}
	}

	var sp = this._innerGetQuery(beginPageNum, pageSize);
	if (sp instanceof Array)
		sp = sp[0];
	if (exportPageCount > 1)
	{
		sp.pageSize = sp.pageSize;
		sp.pageCount = exportPageCount;
	}
	sp = this.innserGetSortPar(sp, tablect);
	tablect = null;
	var service = this._innerGetSearchService();

	var fn = null;
	if (isAsyn)
	{
		LEAP.showMask();
		fn = this.exportExcelHandler;
	}

	if (fields != null && fields.length && fields.length > 0)
	{
		var l = fields.length;
		for(var i = 0;i < fields.length;i++)
		{
			sp.addField(fields[i]);
		}
	}

	if (this.onExportExcel != null)
	{
		var ret = this.onExportExcel(sp, service, isPrint);
		if (ret != null && ret == false)
			return;
	}

	fn = null;
	isAsyn = false;

	if (this.reportTitle != null)
	{
		sp.name2 = this.reportTitle;
	}

	var result = this.request('ExportExcelExt',
	{
		sp		: sp,
		service	: service
	}, fn);
	if (!isAsyn)
	{
		this.___processExcelResult(result, null, isPrint);
	}
}

pageObjectExtend.___processExcelResult = function(result, asyn, isPrint)
{
	LEAP.hideMask();
	if (result)
	{
		var href = leapconfig.server + "LEAP/Download/excelReport/" + result;
		if (asyn)
			href += "?sr=1";
		if (isPrint)
		{
			var workbook = null;
			var app = null;
			try
			{
				app = new ActiveXObject("excel.Application");
				app.Application.Visible = true;

				workbook = app.Workbooks.Open(href);

				try
				{
					app.activeWindow.activeSheet.PrintOut();
				}
				catch(e)
				{
				}

			}
			catch(e)
			{
				LEAP.messagebox.alert("未安装Office软件,不能进行打印!\n将下载报表文件!", 2);
				window.open(window.geturl(href));
			}
			finally
			{
				if (workbook)
				{
					try
					{
						workbook.close();
					}
					catch(e)
					{
					}
					workbook = null;
				}
				if (app)
					try
					{
						app.Application.Quit();
					}
					catch(e)
					{
					}
				app = null;
			}
		}
		else window.open(window.geturl(href));
	}
	else
	{
		var err = this.getLastError();
		if (err != null)
		{
			LEAP.messagebox.alert(err.error, 3);
		}
		else
		{
			LEAP.messagebox.alert('导出失败', 3);
		}
	}
}

pageObjectExtend.exportExcelHandler = function(result, isPrint)
{
	this.___processExcelResult(result, true, isPrint);
}

pageObject.innerSearch = function()
{
	this.__sys_src_ctf = null;
	if (window.event && window.event.srcElement && window.event.srcElement.getAttribute)
		this.__sys_src_ctf = window.event.srcElement.getAttribute('ctf');
	if (this.isstat)
		this.innerStat();
	else this._innerSearch();
}
pageObjectExtend._innerSearch = function()
{
	var list = this.getUT("list");
	var pnum = 1;
	var kp = null;
	if (list)
	{
		kp = list.getAttribute("keeppagenum")
		if (kp == "1" || kp == true)
		{
			pnum = list.pageNum;
			if (pnum == null || pnum == undefined || isNaN(pnum) || pnum == 0)
			{
				LEAP[this.listmode].gotoPage(list, 1);
			}
			else
			{
				LEAP[this.listmode].gotoPage(list, pnum);
			}
		}
		else
		{
			LEAP[this.listmode].gotoPage(list, 1);
		}
	}
	else this.innerRefreshPage(null, 1, 12);
	list = pnum = kp = null;
}
pageObjectExtend.innerSearch2 = function()
{
	var list = this.getUT("list");
	if (list)
	{
		var pageNum = list['pageNum'];
		if (pageNum == null || pageNum == undefined || isNaN(pageNum) || pageNum == 0)
			LEAP[this.listmode].gotoPage(list, 1);
		else
		{
			LEAP[this.listmode].gotoPage(list, pageNum);
		}
	}
	else this.innerRefreshPage(null, 1, 12);
	list = null;
}
pageObject.searchMore = function()
{
	if (null == this.adisshow)
		this.adisshow = true;
	var resultPanel = LEAP.getElement(">div.lgresultpanel", this.getUT("searchMore").parentNode.parentNode);
	var searchPanel = this.getUT("searchMore").parentNode;
	var searchNomal = this.getUT("searchNomal");
	var searchMore = this.getUT("searchMore");
	var searchBtns = LEAP.getElement('div.lgbtncon:first', searchPanel);
	if (this.adisshow)
	{
		this.adisshow = false;
		this.getUT("searchMore").style.display = "none";
		searchPanel.style.height = searchNomal.offsetHeight + searchBtns.offsetHeight + "px";
		if (!LEAP.isIE)
		{
			searchMore.style.height = "auto";
			searchNomal.style.paddingLeft = "0px";
			if (this.getUT("searchNomal").style.height == "")
				searchNomal.style.height = searchNomal.offsetHeight * 1 + "px";
		}
		else
		{
			searchNomal.style.height = "auto";
		}
		resultPanel.style.top = searchPanel.style.height;
		resultPanel.style.height = "auto";
		this.getUT("searchMore").style.display = "none";
		this.getUT("btn_more").innerText =
				this.getUT("btn_more").innerText.replace("－", "＋").replace("减少", "更多");
	}
	else
	{
		this.adisshow = true;
		this.getUT("searchMore").style.display = "inline-block";
		if (!LEAP.isIE)
		{
			searchPanel.style.height =
					searchNomal.offsetHeight + searchMore.offsetHeight + searchBtns.offsetHeight + "px";
			searchBtns.style.top = searchNomal.offsetHeight + searchMore.offsetHeight + "px";
		}
		else
		{
			searchPanel.style.height =
					searchPanel.style.height.replace("px", "") * 1 + searchMore.offsetHeight * 1 + "px";
		}
		resultPanel.style.top = searchPanel.style.height.replace("px", "") * 1 + "px";
		resultPanel.style.height = "auto";
		this.getUT("btn_more").innerText =
				this.getUT("btn_more").innerText.replace("＋", "－").replace("更多", "减少");
	}
}
pageObject.innerAsynRefreshPage = function(result, arg)
{
	if (this.moduleParameter != null && this.moduleParameter.isfromgis != null
			&& this.moduleParameter.isfromgis == "1")
		this.addFeatureLay(result, arg.par, this.moduleParameter.isfromgis);//571

	var list = this.getUT("list");
	try
	{
		this.asynwait = false;
		if (result != null)
		{
			this.pks = result.pks;
			if (this.searchSucess)
				this.searchSucess(result);

			if (this.searchEnd)
				this.searchEnd(arg.par);

			if (list)
			{
				LEAP[this.listmode].gotoPage(list, arg.gotoPageNum, result, arg.asynsn);
			}
		}
		else
		{
			if (this.searchSucess)
				this.searchSucess(null);

			if (this.searchEnd)
				this.searchEnd(arg.par);

			if (list)
				LEAP[this.listmode].clearPage(list);
			//			LEAP.tree2.setNumberByModuleName(this.name, 0);
		}
	}
	finally
	{
		list = null;
		result = arg.element = null;
	}
}
pageObjectExtend.innerAsynRefreshPageCount = function(result, arg)
{
	var list = this.getUT("list");
	try
	{
		this.asynwait = false;
		if (result != null)
		{
			if (list)
				LEAP[this.listmode].asynCountPage(list, arg.gotoPageNum, result, arg.asynsn);
		}
	}
	finally
	{
		list = null;
		result = arg.element = null;
	}
}
/**
 * 
 */
pageObject.innerReset = function()
{
	this.setPageData(null, null, null, false);

	if (this.afterReset != null)
	{
		this.afterReset();
	}
}
/**
 * 
 * @param {} searchParameters
 * @return {}
 */
pageObjectExtend.createSearchBuilder = function(searchParameters)
{
	var sb = null;
	if (searchParameters)
	{
		sb = new SearchBuilder(searchParameters.name);
		sb.parameter = searchParameters;
	}
	else sb = new SearchBuilder();
	sb.moduleInstance = this.instance;
	return sb;
}
//endregion
pageObjectExtend.___afterLoadModule = function(def, module)
{
	if (def && module && def.pfield)
	{
		if (module.parentElement)
		{
			module.parentElement.style.position = 'relative';
		}

		if (!module.preParameterNames)
			module.preParameterNames = [];
		if (!module.preParameterNames.contains(def.pfield.toLowerCase().trim()))
			module.preParameterNames.add(def.pfield.toLowerCase().trim());

		module.linkedfield = def.pfield.toLowerCase().trim();

		if (!this.___binddatamodule)
			this.___binddatamodule = new hashtable();

		if (!this.___binddatamodule.contains(def.name.toLowerCase().trim()))
		{
			this.___binddatamodule.add(def.name.toLowerCase().trim(), def);
		}
	}
};

pageObjectExtend.___afterGetModule = function(module)
{
	if (module)
	{
		module.parentPKValue = null;
		if (module.linkedfield)
		{
			if (this.data)
			{
				var v = this.data['id'];
				if (v)
				{
					module.parentPKValue = v;
				}
			}
		}
	}
}

pageObjectExtend.___initcts = function()
{
	if (LEAP.linkmodule != null && !this.___linkmodulectsinited)
	{
		this.___linkmodulectsinited = true;
		this.___linkmodulects = this.getElements('div[ct=linkmodule][instance=' + this.instance + ']');
	}
	if (!this.___linkmodule2ctsinited)
	{
		this.___linkmodule2ctsinited = true;
		this.___linkmodule2cts = this.getElements('[ct=linkmodule2][instance=' + this.instance + ']');
	}
	if (!this.___datastatctsinited)
	{
		this.___datastatctsinited = true;
		var ___datastatEls = this.getElements('[ct=statchart][linkstatname][instance=' + this.instance + "]");
		if (___datastatEls != null && ___datastatEls.length > 0)
		{
			for(var i = 0;i < ___datastatEls.length;i++)
			{
				LEAP.statchart.initLinkChart(___datastatEls[i])
			}
		}
	}
}

pageObjectExtend.___clearData = function()
{
	if (LEAP.linkmodule != null && this.___linkmodulects)
	{
		var l = this.___linkmodulects.length;
		for(var i = 0;i < l;i++)
		{
			LEAP.linkmodule.clear(this.___linkmodulects[i]);
		}
	}
	if (this.___linkmodule2cts)
	{
		var l = this.___linkmodule2cts.length;
		for(var i = 0;i < l;i++)
		{
			LEAP.linkmodule2.clear(this.___linkmodule2cts[i]);
		}
	}
}

pageObjectExtend.___clearData2 = function()
{
	//LEAP.check.clearValidate(LEAP.getElements("[check][instance=" + this.instance + "]", this.parentElement));

	this.___clearData();

	LEAP.bindData(this.defaultData, this.instance, null, null, this.parentElement);

	//this.processDefaultValues();

	//	if (this.__showCount != null && this.__showCount > 0)
	if (this.setDefaultPageData)
	{
		this.setDefaultPageData(this.defaultData);
	}
}

/*pageObjectExtend.setPageDataOnWF = function(data, childDatas)
{
	this.WFMode = true;
	this.setPageData(data);

	if (this.___linkmodule2cts)
	{
		if (this.afterSetWFPageData)
		{
			this.afterSetWFPageData(data);
		}
		else
		{
			var l = this.___linkmodule2cts.length;
			var cds = new hashtable();
			if (childDatas != null && childDatas.length && childDatas.length > 0)
			{
				var l2 = childDatas.length;
				for(var i = 0;i < l2;i++)
				{
					var cur = childDatas[i];
					var beanname = cur.beanname;
					if (String.isEmpty(beanname))
					{
						continue;
					}
					beanname = beanname.toLowerCase().Trim();
					var curDs = null;
					if (cds.contains(beanname))
					{
						curDs = cds.getvalue(beanname);
					}
					else
					{
						curDs = [];
						cds.add(beanname, curDs);
					}
					curDs.add(cur);
				}
			}

			for(var i = 0;i < l;i++)
			{
				LEAP.linkmodule2.clear(this.___linkmodule2cts[i]);

				var lmn = this.___linkmodule2cts[i].getAttribute('datamodule');
				lmn = lmn && lmn.toLowerCase().Trim();
				if (cds.contains(lmn))
				{
					var rs = cds.getvalue(lmn);
					var result = new Object();
					result.result = rs;
					result.pageCount = 1;
					result.pageNum = 1;
					result.beginNum = 1;
					result.size = rs.length;
					result.count = rs.length;
					result.endNum = rs.length + 1;
					var isNew = false;
					if (this.pageMode && this.pageMode == 'insert')
						isNew = true;

					var element = this.___linkmodule2cts[i];//延迟加载（新加）
					var timeout = element.getAttribute("timeout");
					if (timeout)
					{
						var arg =
						{
							element		: this.___linkmodule2cts[i],
							result		: result,
							isNew		: isNew,
							isRealNew	: false
						};
						LEAP.asyn(LEAP.linkmodule2.timeoutCallBack, LEAP, parseInt(timeout), arg);
					}
					else
					{
						LEAP.linkmodule2.setValue(this.___linkmodule2cts[i], result, isNew, false);
					}
				}
			}
		}
	}
}*/

pageObjectExtend.___afterSetData = function()
{

	if (LEAP.linkmodule != null && this.___linkmodulects)
	{
		var l = this.___linkmodulects.length;
		for(var i = 0;i < l;i++)
		{
			LEAP.linkmodule.refresh(this.___linkmodulects[i]);
		}
	}
	if (this.___linkmodule2cts)
	{
		var l = this.___linkmodule2cts.length;
		for(var i = 0;i < l;i++)
		{
			var element = this.___linkmodule2cts[i];//延迟加载（新加）
			var timeout = element.getAttribute("timeout");
			if (timeout)
			{
				LEAP.asyn(LEAP.linkmodule2.refresh, LEAP, parseInt(timeout), this.___linkmodule2cts[i]);
			}
			else
			{
				LEAP.linkmodule2.refresh(this.___linkmodule2cts[i]);
			}
		}
	}
	
	this._rebuildMdcheck();
}

pageObjectExtend.___innerLoadModule = function(mf)
{
	if (!mf)
		return;

	if (mf.___hasinited)
		return;

	mf.___hasinited = true;
	var def = mf.moduleLoadArg;
	if (!def)
		return;
	def = def.initPar;
	if (!def)
		return;
	var module = null;
	if (def.ut)
	{
		var ut = this.getUT(def.ut);
		if (ut)
		{
			if (!def.islinkchild)
			{
				if (def.istab)
				{
					var ti = def.tabidx;
					if (ti == null)
						ti = 0;
					var _tab = ut;
					if (_tab)
					{
						var ut = LEAP.getElement("div[ctf=tab_content]:eq(" + ti + ")", _tab);
						_tab = null;
						if (ut)
						{
							mf.parent = ut;
							try
							{
								module = this.loadModule2(mf);
								if (module)
								{
									this.____moduledefs.add(def.name.toLowerCase().trim(), module);

									this.___afterLoadModule(def, module);
								}
							}
							catch(e)
							{
								LEAP.messagebox.alert(e.message, 3);
							}
							ut = null;
						}
					}
				}
				else
				{
					mf.parent = ut;
					try
					{
						module = this.loadModule2(mf);
						if (module)
						{
							this.____moduledefs.add(def.name.toLowerCase().trim(), module);

							this.___afterLoadModule(def, module);
						}
					}
					catch(e)
					{
						LEAP.messagebox.alert(e.message, 3);
					}
				}
			}
			ut = null;
		}
	}
	else if (def.tab)
	{

	}
	try
	{
		this.____moduledefs2.add(def.name.toLowerCase(), mf);
		return module;
	}
	finally
	{
		module = null;
	}
}

pageObjectExtend.___innerLoadModuleWithTab = function(arg)
{
	var tab = arg.arg2.tab;
	try
	{
		var ut = tab.getAttribute('ut');
		if (ut)
		{
			var tds = this.___tabbindmodules.getvalue(ut);
			if (tds)
			{
				var tidx = arg.arg2.index + "";
				var l = tds.length;
				for(var i = 0;i < l;i++)
				{
					var mf = tds[i];
					var idx = mf.moduleLoadArg.initPar.tabidx.trim();
					if (idx == tidx)
					{
						this.___innerLoadModule(mf);
						break;
					}
				}
			}
		}
	}
	finally
	{
		arg = mf = tab = null;
	}
}

pageObjectExtend.___innerPageLoad2 = function(arg)
{
	if (!this.____formdefs)
		this.____formdefs = new hashtable();
	if (!this.____moduledefs)
		this.____moduledefs = new hashtable();
	if (!this.____moduledefs2)
		this.____moduledefs2 = new hashtable();
	if (!this.___tabbindmodules)
		this.___tabbindmodules = new hashtable();

	if (this.moduleElement)
	{
		var modules = this.moduleElement.getAttribute('modules');
		if (!String.isEmpty(modules))
		{
			try
			{
				modules = eval("(" + modules + ")");
				this.autoLoadedModulesDefine = modules;
				if (modules && modules.length)
				{
					var l = modules.length;
					var _tabs = new Array();
					for(var i = 0;i < modules.length;i++)
					{
						var c = modules[i];
						if (!String.isEmpty(c.name))
						{
							var def = LEAP.clone(c);

							def.name = c.name;
							def.path = c.name;
							def.title = c.cn;
							def.width = c.w;
							def.height = c.h;
							def.hidemsg = c.hidemsg;

							if (!String.isEmpty(def.hidemsg))
								def.autohide = 0;

							if (c.ismodule)
							{
								var mf =
								{
									name			: def.name,
									pageMode		: c.mode,
									moduleLoadArg	:
									{
										initPar	: def
									}
								};

								if (def.init)
								{
									this.___innerLoadModule(mf);
								}
								else if (!def.init && def.istab)
								{
									if (!_tabs.contains(def.ut))
									{
										_tabs.add(def.ut);
										var tab = this.getUT(def.ut);
										if (tab)
										{
											this.addEvent(tab, 'selectedIndexChange', this.___innerLoadModuleWithTab);
											tab = null;
										}
									}
								}

								if (def.istab)
								{
									var _tds = null;
									if (this.___tabbindmodules.contains(def.ut))
										_tds = this.___tabbindmodules.getvalue(def.ut);
									else
									{
										_tds = [];
										this.___tabbindmodules.add(def.ut, _tds);
									}
									_tds.add(mf);
								}

								continue;
							}

							if (def.islinkchild && def.ut)
							{
								var ut = this.getUT(def.ut);
								if (ut)
								{
									var ct = ut.getAttribute(commfields.ct);
									if (LEAP.linkmodule != null && ct == LEAP.linkmodule.d)
									{
										if (def.mode)
										{
											if (def.mode == 'view')
											{
												ut.setAttribute('infomodule', def.name);
											}
											else if (def.mode == 'insert')
											{
												ut.setAttribute('insertmodule', def.name);
											}
											else if (def.mode == 'modify')
											{
												ut.setAttribute('modifymodule', def.name);
											}
										}
										else
										{
											ut.setAttribute('infomodule', def.name);
										}
									}
								}
							}

							this.____formdefs.add(c.name.toLowerCase(), def);
						}
					}
				}
			}
			catch(e)
			{
			}
		}
	}

	this.___initcts();
}

pageObjectExtend.___innerPageLoad3 = function(arg)
{
	if (this.autoLoadedModulesDefine)
	{
		var l = this.autoLoadedModulesDefine.length;
		var tonitTab = false;
		for(var i = 0;i < l;i++)
		{
			var c = this.autoLoadedModulesDefine[i];
			if (!String.isEmpty(c.name))
			{
				if (c.isinfo != null && c.isinfo == true)
				{
					this.infoPageModuleName = c.name;

					tonitTab = true;
				}
				else if (c.isview != null && c.isview == true)
				{
					this.viewPageModuleName = c.name;

					tonitTab = true;
				}
			}
		}
		//		if (tonitTab)
		{
			var _list = this.ut('list');
			if (_list)
			{
				var ct = _list.getAttr('ct');
				if (ct && ct == 'table')
				{
					if (_list.element[ElementEventManager.e] == null
							|| !_list.element[ElementEventManager.e].contains('rowOperationClick'))
					{
						_list.addEvent('rowOperationClick', this.innerListOperation);
						_list = null;
					}
				}
			}
			var _btnadd = this.ut('btn_add');
			if (_btnadd)
			{
				if (_btnadd.element[DelegateUIEventManager.e] == null
						|| !_btnadd.element[DelegateUIEventManager.e].contains('click'))
				{
					_btnadd.addEvent('click', this.innerInsertBottonClick);
					_btnadd = null;
				}
			}
		}
	}
}

/**
 * 获取模型,如存在则直接返回并且show出来,如不存在则创建
 * @param {} name 模型名称
 * @param {} def 模型定义
 */
pageObjectExtend.getForm = function(name, def, moduleLoadArg)
{
	if (name)
		name = name.toLowerCase().trim();
	else return null;

	if (!this.___forms2)
		this.___forms2 = new hashtable();
	var form = null;
	try
	{
		if (this.___forms2.contains(name))
		{
			form = this.___forms2.getvalue(name);
			form.show();
			return form;
		}
		else if (def != null && !String.isEmpty(def.path))
		{
			if (moduleLoadArg != null)
			{
				if (def == null)
					def =
					{
						moduleLoadArg	: moduleLoadArg
					};
				else if (def.moduleLoadArg == null)
					def.moduleLoadArg = moduleLoadArg;
			}
			def.formtype = this.formType;
			def.module = this;

			form = this.loadForm3(def);
			this.___forms2.add(name, form);
			return form;
		}
	}
	catch(err)
	{
		LEAP.showError(err);
	}
	finally
	{
		def = form = null;
	}
}

pageObjectExtend.__asynSetPageData = function(data, dsName, resetPageDataObject, useCodeCache, parentElement)
{
	if (resetPageDataObject == null)
		resetPageDataObject = true;
	if (resetPageDataObject)
		this.data = data;
	var exp = null;
	var parent = parentElement;
	if (parent == null)
		parent = this.parentElement;
	if (dsName != null)
		exp = '[ds=' + dsName + ']';

	if (this.beforeSetPageData)
	{
		this.beforeSetPageData(data);
	}
	LEAP.bindData(data, this.instance, exp, useCodeCache, parent);
	if (this.afterSetPageData)
	{
		this.afterSetPageData(data);
	}

	this.fireEvent('onsetpagedata', data);
}

pageObjectExtend.getUserInfo = function()
{
	return LEAP.getUserInfo();
}

pageObjectExtend.toJSONObject = function(str)
{
	if (str == null)
		return null;
	return JSON.parse(str);
}

pageObjectExtend.toJSONString = function(obj)
{
	if (obj == null)
		return null;
	return JSON.stringify(obj);
}

/**
 * 获取在设计器中定义的业务模型窗体对象
 * 获取的对象可以直接使用show hide 方法
 * 如: var defa = this.forms('modulea','insert',{arg:1});
 * 	   def.show();//这个时候会触发insertPageLoad方法,并传递{arg:1}参数给insertPageLoad方法
 * @param {} name 模型名称
 * @param {} mode 模式
 * @param {} moduleLoadArg 构造参数
 * @return {}
 */
pageObjectExtend.forms = function(name, mode, moduleLoadArg, authority, formtype)
{
	var rn = name;
	if (name)
		name = name.toLowerCase().trim();
	else
	{
		return null;
	}

	var def = this.____formdefs.getvalue(name);

	if (!def)
	{
		def =
		{
			mode	: (mode == null) ? "insert" : mode,
			path	: rn,
			name	: rn
		};
		this.____formdefs.add(name, def);
	}

	if (def)
	{
		def = LEAP.clone(def);
		if (!this.___forms2)
			this.___forms2 = new hashtable();

		var form = null;
		if (this.___forms2.contains(name))
		{
			form = this.___forms2.getvalue(name);
			if (mode)
			{
				form.mode = mode;
				form.module.pageMode = mode;
			}
			if (formtype)
				def.formtype = formtype;
			else if (!def.formtype)
				def.formtype = this.formType;

			form.formtype = def.formtype;

			this.___afterGetModule(form.module);

			//			form.show();
			return form;
		}
		else if (def != null && !String.isEmpty(def.path))
		{
			if (moduleLoadArg != null)
			{
				if (def == null)
					def =
					{
						moduleLoadArg	: moduleLoadArg
					};
				else if (def.moduleLoadArg == null)
					def.moduleLoadArg = moduleLoadArg;
			}

			def.authority = authority;

			var isShow;
			if (def.initShow == null)
				def.initShow = true;
			else isShow = def.initShow;

			def.pageMode = mode;
			if (formtype)
				def.formtype = formtype;
			else if (!def.formtype)
				def.formtype = this.formType;
			def.module = this;

			form = this.loadForm3(def);

			if (isShow != null && isShow == true)
			{
				form.show();
			}
			else form.hide(false);
			form._isFormObj = true;
			form.moduleLoadArg = moduleLoadArg;
			if (form)
			{
				var module = form.module;
				if (module)
				{

					this.___afterLoadModule(def, module);

					if (mode != null)
					{
						form.mode = mode;
					}
				}
				form.show = function(formmode)
				{
					if (formmode)
						this.mode = formmode;

					if (this.__showCount == null)
					{
						this.__showCount = 1;
						if (this.module)
							this.module.__showCount = 1;
					}
					else
					{
						this.__showCount++;
						if (this.module)
							this.module.__showCount = this.__showCount;
					}

					try
					{
						if (this.__showCount > 1 && this.mode && this.module)
						{
							var m = LEAP._peGetMM(this.module);
							this.module.pageMode = m.pageMode = this.mode;
							if (this.mode == 'search' && m && m.searchPageLoad)
							{
								m.searchPageLoad(this.moduleLoadArg);
							}
							else if (this.mode == 'insert' && m && m.insertPageLoad)
							{
								m.insertPageLoad(this.moduleLoadArg);
							}
							else if (this.mode == 'modify' && m && m.modifyPageLoad)
							{
								m.modifyPageLoad(this.moduleLoadArg);
							}
							else if (this.mode == 'view' && m && m.viewPageLoad)
							{
								m.viewPageLoad(this.moduleLoadArg);
							}

							if (this.mode == 'view')
							{
								var sb = m.___btnSubmit;
								if (sb != null)
								{
									sb.style.display = 'none';
									sb = null;
								}
							}
							else if (this.mode == 'insert' || this.mode == 'modify')
							{
								var sb = m.___btnSubmit;
								if (sb != null)
								{
									sb.style.display = '';
									sb = null;
								}
								m._rebuildMdAttr(this.mode);
							}
							m._hideButton(this.mode);
							m._hideExpressElement();
							if (this.module.masterModule)
							{
								this.module._hideButton(this.mode);
							}
						}
					}
					catch(e)
					{
						LEAP.messagebox.alert(e.message);
					};
					var sa =
							LEAP.hc_form.t_last_ctid
									&& LEAP.hc_form.t_last_ctid == LEAP.ctid(LEAP.getElement(this.form))
									&& LEAP.hc_form.t_last && new Date().getTime() - LEAP.hc_form.t_last2 < 200;

					LEAP.hc_form.show(this.form, this.formtype, !sa);
				}
				module = null;
			}

			this.___forms2.add(name, form);
			this.___afterGetModule(form.module);
			return form;
		}
	}
}

pageObjectExtend.modules = function(name)
{
	if (name)
		name = name.toLowerCase().trim();
	else return null;
	if (this.____moduledefs.contains(name))
	{
		var ret = this.____moduledefs.getvalue(name);

		this.___afterGetModule(ret);
		return ret;
	}

	var mf = this.____moduledefs2.getvalue(name);
	if (mf)
	{
		var ret = this.___innerLoadModule(mf);
		this.___afterGetModule(ret);

		return ret;
	}

	var form = this.___forms2.getvalue(name);
	if (form)
		try
		{

			this.___afterGetModule(form.module);

			return form.module;
		}
		catch(err)
		{
			LEAP.showError(err);
		}
		finally
		{
			form = null;
		}
};

pageObjectExtend.innerListOperation = function(arg)
{
	var flag = arg.arg2.flag;
	var index = arg.arg2.index;
	var data = arg.arg2.data;
	var list = arg.arg2.table;

	try
	{
		LEAP[this.listmode].setSelectedIndex(list, index);
		pageObjectExtend.tab_unitesave_list_sindex = index; //571 20160526
		if (flag == 1 || flag == 2)
		{
			var title = null;
			if (flag == 1)
			{
				var vm = this.viewPageModuleName;
				if (!vm)
					vm = this.infoPageModuleName;
				var _InfoForm = this.forms(vm, "view");
				_InfoForm.show();
				_InfoForm.module.setPageData(data);
			}
			else if (flag == 2)
			{
				var _InfoForm = this.forms(this.infoPageModuleName, "modify");
				_InfoForm.show();
				//				_InfoForm.module.submitCallBack = this.innerSearch;
				//				_InfoForm.module.submitCallBack_domain = this;
				_InfoForm.module.setPageData(data);
			}
		}
		else if (flag == 3)
		{
			if (window.confirm("确定删除该数据?"))
			{
				if (this.unitesave && this.unitesave == "1")
				{
					pageObjectExtend.tab_unitesave_list_del(this, index);
				}
				else
				{
					if (this.onListDeleteData != null)
					{
						var ret = this.onListDeleteData(data, this.pks);
						if (ret == true)
						{
							//						this.innerSearch();
							this.innerSearch2();
							this.fireEvent('deletesubmit', data);
						}
					}
					else if (this.beanDelete(data) == true)
					{
						//						this.innerSearch();
						this.innerSearch2();
						this.fireEvent('deletesubmit', data);
					}
				}

			}
		}
	}
	catch(err)
	{
		LEAP.showError(err);
	}
	finally
	{
		list = arg = flag = index = data = null;
	}
};

pageObjectExtend.innerInsertBottonClick = function(arg)
{
	if (!this.infoPageModuleName) { return; }
	var _InfoForm = this.forms(this.infoPageModuleName, "insert");
	_InfoForm.show();

	_InfoForm.module.clearPageData(true);

	// Tab 统一保存的标识  一路传递下去  ---571 20160525
	if (this.unitesave != null)
	{
		if (_InfoForm != null && _InfoForm.module != null)
		{
			_InfoForm.module.unitesave = this.unitesave;
			if (this.unitesave == "1")
				_InfoForm.module.submitMode = 3;//_InfoForm.module.submitMode 如果等于3 就
			else _InfoForm.module.submitMode = null;//_InfoForm.module.submitMode 如果等于3 就

			pageObjectExtend.bindlinkdata(_InfoForm.module, this.linkdata);
		}
	}

};

pageObjectExtend.innerInsertSubmit = function()
{
	var errCtlList = null;
	var parameter = null;
	try
	{
		if (this.beforeInsertValidate)
		{
			var vr = this.beforeInsertValidate();
			if (vr == false)
				return -91;
		}

		if (this.skipValidate !== null && this.skipValidate == true)
		{
		}
		else errCtlList = this.validateUI(null, this.validateArea);

		if (errCtlList != null)
			return -9;

		if (this.insertValidate)
		{
			var vr = this.insertValidate();
			if (vr == false)
				return -11;
		}
		if (this.submitValidate)
		{
			var vr = this.submitValidate();
			if (vr == false)
				return -1;
		}
		var el = this.moduleElement;
		var bystep = null;
		if (el)
		{
			bystep = el.getAttribute("bystep");
		}
		if (bystep == "2")
		{
			if (this.parentPageModule)
				parameter = pageObjectExtend.formstep_getdata(this.parentPageModule);
			else
			{
				var formstepEL = LEAP._match(this.parentElement, "formstep", 'ct', 99);
				parameter = pageObjectExtend.formstep_getdata(formstepEL);
			}
		}
		else parameter = this.getCreateParameter(null, this.validateArea);

		if (this.buildCreateParameter)
			parameter = this.buildCreateParameter(parameter);

		if (parameter == null)
		{
			if (bystep == "1")
				return parameter;
			if (this.skipMessage != null && this.skipMessage != null)
				return -2;
			LEAP.messagebox.alert('输入参数为空,请正确填写', 2);
			return -2;
		}

		if (this.parentPKValue && this.linkedfield)
		{
			if (this.moduleVersion > 1)
				parameter[this.linkedfield] = this.parentPKValue;
			else parameter.addparameter(this.linkedfield, this.parentPKValue);
		}

		this.buildExtendPageData(parameter);

		if (this.insertBeforeSubmit)
		{
			var vr = this.insertBeforeSubmit(parameter);
			if (vr == false)
				return -13;
		}

		if (this.beforeSubmit)
		{
			var vr = this.beforeSubmit(parameter);
			if (vr == false)
				return -3;
		}

		if (this.submitMode != null && this.submitMode == 2)
		{
			if (this.parentPageModule && this.outerSubmit)
			{
				try
				{
					if (this.parentPageModule && typeof this.outerSubmit == 'string')
						this.parentPageModule[outerSubmit].call(this, this, 'insert', parameter, this.submitMode);
					else this.outerSubmit.call(this.parentPageModule, this, 'insert', parameter, this.submitMode);

					this.clearPageData();
					this.hideForm();
				}
				catch(e)
				{
					LEAP.messagebox.alert(e.message, 3);
					return -99;
				}
			}
			return 99;
		}

		//submitMode =3  统一保存的时候，先保存到列表，不直接保存到数据库
		if (this.submitMode != null && this.submitMode == 3)
		{
			if (this.parentPageModule)
			{
				try
				{
					pageObjectExtend.tab_unitesave_list_add(this.parentPageModule, this.getPageData().data);
					this.clearPageData();
					this.hideForm();
				}
				catch(e)
				{
					LEAP.messagebox.alert(e.message, 3);
					return -99;
				}
			}
			return 99;
		}
		//step 没到最后一步直接截断，不提交数据库
		try
		{
			if (bystep == "1") { return parameter; }
		}
		catch(e)
		{
			LEAP.messagebox.alert(e.message, 3);
			return -99;
		}
		var result = null;
		var childPar = null;

		var changePar = null;
		var deletePar = null;
		var noModify = null;

		var hasChild = false;
		if (this.___linkmodule2cts)
		{
			hasChild = true;
			var l = this.___linkmodule2cts.length;
			for(var i = 0;i < l;i++)
			{
				var cv = LEAP.linkmodule2.getValue(this.___linkmodule2cts[i]);
				if (cv != null && cv.create != null && cv.create.length > 0)
				{
					if (childPar == null)
						childPar = [];
					for(var j = 0;j < cv.create.length;j++)
					{
						childPar.add(cv.create[j]);
					}
				}
				if (cv != null && cv.del != null && cv.del.length > 0)
				{
					if (deletePar == null)
						deletePar = [];
					for(var j = 0;j < cv.del.length;j++)
					{
						deletePar.add(cv.del[j]);
					}
				}
				if (cv != null && cv.change != null && cv.change.length > 0)
				{
					if (changePar == null)
						changePar = [];
					for(var j = 0;j < cv.change.length;j++)
					{
						changePar.add(cv.change[j]);
					}
				}
				if (cv != null && cv.result != null && cv.result.length > 0)
				{
					if (noModify == null)
						noModify = [];
					for(var j = 0;j < cv.result.length;j++)
					{
						noModify.add(cv.result[j]);
					}
				}
			}
		}

		if (this.WFMode && this.WFMode == true && this._WF_ModuleProcess_moduleSubmit)
		{
			if (this.sysBeforeSubmit)
			{
				this.sysBeforeSubmit(parameter, childPar);
			}

			result = this._WF_ModuleProcess_moduleSubmit(parameter, childPar, changePar, deletePar, noModify);
		}
		else
		{
			if (this.sysBeforeSubmit)
			{
				this.sysBeforeSubmit(parameter, childPar);
			}
	
	
			var _service_insert = 'DynaCreate3';
			if (this.moduleVersion > 1)
				_service_insert = 'beanCreate';
	
			if (!String.isEmpty(this.service_insert))
			{
				_service_insert = this.service_insert;
				if (this.isInLinkModule2 != null && this.isInLinkModule2)
				{
					var parent = this.getParentModule();
					if (parent)
					{
						result = parent.childModuleSubmit(_service_insert, parameter, 0);
						parent = null;
					}
				}
				else
				{
					var _childPar = null;
					if (this.getChildPar)
						_childPar = this.getChildPar(childPar);
					if (_childPar != null)
						childPar = _childPar;
					if (hasChild || _childPar != null)
					{
						if (this.exSubmitParam != null)
						{
							result = this.request(_service_insert,
							{
								par			: parameter,
								childPar	: childPar,
								exParams	: this.exSubmitParam
							});
						}
						else
						{
							result = this.request(_service_insert,
							{
								par			: parameter,
								childPar	: childPar
							});
						}
					}
					else
					{
						if (this.exSubmitParam != null)
						{
							result = this.request(_service_insert,
							{
								par			: parameter,
								exParams	: this.exSubmitParam
							});
						}
						else
						{
							result = this.request(_service_insert,
							{
								par	: parameter
							});
						}
					}
				}
			}
			else
			{
				if (this.isInLinkModule2 != null && this.isInLinkModule2)
				{
					var parent = this.getParentModule();
					if (parent)
					{
						result = parent.childModuleSubmit(_service_insert, parameter, 0);
						parent = null;
					}
				}
				else
				{
					result = this.request(_service_insert,
					{
						par			: parameter,
						childPar	: childPar
					});
				}
			}
		}
		
		return this.innerInsertSubmitStep2(result, parameter, childPar);

	}
	catch(err)
	{
		LEAP.showError(err);
	}
	finally
	{
		parameter = childPar = null;
	}
}

pageObjectExtend.innerInsertSubmitStep2 = function(result, parameter, childPar)
{
	try
	{
		if (result)
		{
			try
			{
				if (this.submitCallBack)
				{
					try
					{
						var fn = null;
						var domain = null;
						if (this.parentPageModule && typeof this.submitCallBack == 'string')
						{
							var fn = this.parentPageModule[submitCallBack];
						}
						else
						{
							var fn = this.submitCallBack;
							domain = this.submitCallBack_domain;
						}

						if (domain == null)
							domain = fn.domain;
						if (domain == null)
							domain = this;
						fn.call(domain, this, 'insert', parameter, childPar, result);
					}
					catch(e)
					{
						LEAP.messagebox.alert(e.message, 3);
					}
				}

				if (this.insertSucess)
				{
					var vr = this.insertSucess(result);
					if (vr == false)
						return 1;
				}

				if (this.submitSucess)
				{
					var vr = this.submitSucess(result);
					if (vr == false)
						return 1;
				}

				if (this.sysSubmitSucess)
				{
					var vr = this.sysSubmitSucess(result);
					if (vr == false)
						return 1;
				}

				this.fireEvent('onSubmit');
				this.fireEvent('insertsubmit', parameter);

				if (this.instance != null)
				{
					if (this.parentPageModule && this.pageModuleName)
					{
						var pfn = 'on_' + this.pageModuleName + '_Submit';
						if (this.parentPageModule[pfn])
						{
							try
							{
								this.parentPageModule[pfn].call(this.parentPageModule,
								{
									type		: 'insert',
									result		: result,
									module		: this,
									parameter	: parameter,
									childPar	: childPar
								});
							}
							catch(err)
							{
								LEAP.showError(err);
							}
						}

						var pfn = 'on_' + this.pageModuleName + '_InsertSubmit';
						if (this.parentPageModule[pfn])
						{
							try
							{
								this.parentPageModule[pfn].call(this.parentPageModule,
								{
									type		: 'insert',
									result		: result,
									module		: this,
									parameter	: parameter,
									childPar	: childPar
								});
							}
							catch(err)
							{
								LEAP.showError(err);
							}
						}
					}

					if (this.autoRefreshParentModule)
					{
						var p = this.getParentModule();
						if (p)
						{
							if (p.pageMode == 'search')
							{
								//						this.innerSearch();
								p.innerSearch2();
							}
							p = null;
						}
					}
				}
			}
			catch(err)
			{
				LEAP.showError(err);
				//				if (isdebug)
				//				{
				//					LEAP.messagebox.alert(err.message, 3);
				//					throw err;
				//				}
			}
			finally
			{
				return 1;
			}
		}
		else
		{
			var err = this.getLastError();
			if (err != null)
			{
				LEAP.messagebox.alert(err.error, 3);
			}
			return -4;
		}
	}
	catch(err)
	{
		LEAP.showError(err);
	}
	finally
	{
		errCtlList = parameter = null;
	}
}

pageObjectExtend.innerModifySubmit = function()
{
	var errCtlList = null;
	var parameter = null;
	try
	{
		if (this.beforeModifyValidate)
		{
			var vr = this.beforeModifyValidate();
			if (vr == false)
				return -91;
		}

		if (this.skipValidate !== null && this.skipValidate == true)
		{
		}
		else errCtlList = this.validateUI(null, this.validateArea);
		if (errCtlList != null)
			return -9;

		if (this.modifyValidate)
		{
			var vr = this.modifyValidate();
			if (vr == false)
				return -21;
		}
		if (this.submitValidate)
		{
			var vr = this.submitValidate();
			if (vr == false)
				return -1;
		}

		parameter = this.getUpdateParameter(null, this.validateArea);

		if (this.buildUpdateParameter)
			parameter = this.buildUpdateParameter(parameter);

		if (parameter == null)
		{
			//			alert('输入参数为空,请正确填写');
			return -2;
		}

		this.buildExtendPageData(parameter);

		if (this.modifyBeforeSubmit)
		{
			var vr = this.modifyBeforeSubmit(parameter);
			if (vr == false)
				return -23;
		}

		if (this.beforeSubmit)
		{
			var vr = this.beforeSubmit(parameter);
			if (vr == false)
				return -3;
		}

		if (this.sysBeforeSubmit)
		{
			this.sysBeforeSubmit(parameter);
		}

		if (this.submitMode != null && this.submitMode == 2)
		{
			if (this.outerSubmit)
			{
				try
				{
					if (this.parentPageModule && typeof this.outerSubmit == 'string')
						this.parentPageModule[outerSubmit].call(this, this, 'modify', parameter, this.submitMode);
					else this.outerSubmit.call(this, this, 'modify', parameter, this.submitMode);

					this.clearPageData();
					this.hideForm();
				}
				catch(e)
				{
					LEAP.messagebox.alert(e.message, 3);
					return -99;
				}
			}
			return 99;
		}

		if (this.submitMode != null && this.submitMode == 3)
		{
			if (this.parentPageModule)
			{
				try
				{
					var data = this.getPageData().data;
					pageObjectExtend.tab_unitesave_list_modify(this.parentPageModule, data);

					this.clearPageData();
					this.hideForm();
				}
				catch(e)
				{
					LEAP.messagebox.alert(e.message, 3);
					return -99;
				}
			}
			return 99;
		}

		var _service_modify = 'DynaModify';
		if (this.moduleVersion > 1)
			_service_modify = 'beanModify';

		if (!String.isEmpty(this.service_modify))
			_service_modify = this.service_modify;

		var result = null;

		if (this.WFMode && this.WFMode == true && this._WF_ModuleProcess_moduleSubmit)
		{
			result = this._WF_ModuleProcess_moduleSubmit(parameter);
		}
		else
		{
			if (this.isInLinkModule2 != null && this.isInLinkModule2)
			{
				var parent = this.getParentModule();
				if (parent)
				{
					result = parent.childModuleSubmit(_service_modify, parameter, 1);
					parent = null;
				}
			}
			else
			{
				if (this.exSubmitParam != null)
				{
					result = this.request(_service_modify,
					{
						par		: parameter,
						exParam	: this.exSubmitParam
					});
				}
				else
				{
					result = this.request(_service_modify,
					{
						par	: parameter
					});
				}
			}
		}
		
		return this.innerModifySubmitStep2(result, parameter);
	}
	catch(err)
	{
		LEAP.showError(err);
	}
	finally
	{
		errCtlList = parameter = null;
	}
}

pageObjectExtend.innerModifySubmitStep2 = function(result, parameter)
{
	try
	{

		if (result)
		{
			try
			{
				if (this.submitCallBack)
				{
					try
					{
						var fn = null;
						var domain = null;
						if (this.parentPageModule && typeof this.submitCallBack == 'string')
						{
							var fn = this.parentPageModule[submitCallBack];
						}
						else
						{
							var fn = this.submitCallBack;
							domain = this.submitCallBack_domain;
						}

						if (domain == null)
							domain = fn.domain;
						if (domain == null)
							domain = this;
						fn.call(domain, this, 'modify', parameter, result);
					}
					catch(e)
					{
						LEAP.messagebox.alert(e.message, 3);
					}
				}

				if (this.modifySucess)
				{
					var vr = this.modifySucess(result);
					if (vr == false)
						return 1;
				}

				if (this.submitSucess)
				{
					var vr = this.submitSucess(result);
					if (vr == false)
						return 1;
				}

				if (this.sysSubmitSucess)
				{
					var vr = this.sysSubmitSucess(result);
					if (vr == false)
						return 1;
				}

				this.fireEvent('onSubmit');
				this.fireEvent('modifysubmit', parameter);

				if (this.instance != null)
				{
					if (this.parentPageModule && this.pageModuleName)
					{
						var pfn = 'on_' + this.pageModuleName + '_Submit';
						if (this.parentPageModule[pfn])
						{
							try
							{
								this.parentPageModule[pfn].call(this.parentPageModule,
								{
									type		: 'modify',
									result		: result,
									module		: this,
									parameter	: parameter
								});
							}
							catch(err)
							{
								LEAP.showError(err);
							}
						}

						var pfn = 'on_' + this.pageModuleName + '_ModifySubmit';
						if (this.parentPageModule[pfn])
						{
							try
							{
								this.parentPageModule[pfn].call(this.parentPageModule,
								{
									type		: 'modify',
									result		: result,
									module		: this,
									parameter	: parameter
								});
							}
							catch(err)
							{
								LEAP.showError(err);
							}
						}
					}

					if (this.autoRefreshParentModule)
					{
						var p = this.getParentModule();
						if (p)
						{
							if (p.pageMode == 'search')
							{
								//						this.innerSearch();
								p.innerSearch2();
							}
							p = null;
						}
					}
				}
			}
			catch(err)
			{
				LEAP.showError(err);
			}
			finally
			{
				return 1;
			}
		}
		else
		{
			var err = this.getLastError();
			if (err != null)
			{
				LEAP.messagebox.alert(err.error, 3);
			}
			return -4;
		}
	}
	catch(err)
	{
		LEAP.showError(err);
	}
	finally
	{
		parameter = null;
	}
}

/**
 * 提交数据
 * @return {}
 */
pageObjectExtend.innerInfoSubmit = function()
{

	try
	{
		if (this.pageMode)
		{
			if (this.pageMode == 'modify')
			{
				return this.innerModifySubmit();
			}
			else if (this.pageMode == 'insert') { return this.innerInsertSubmit(); }
		}
		else
		{
			return this.innerInsertSubmit();
		}
	}
	catch(err)
	{
		LEAP.showError(err);
	}
}

//pageObjectExtend.getParentModule = function()
//{
//	if (this.pom)
//		return this.pom.getParent(this);
//	return null;
//}

/**
 * 获取日期工具类
 * @return {DateUtil} 日期工具类
 */
pageObjectExtend.getDateUtil = function()
{
	return new DateUtil();
}

pageObjectExtend.setQueryData = function(data)
{
	this.isp_out = data;
	//	if(data == null)
	//		this.clearPageData();
	this.innerSearch();
}

pageObjectExtend.saveModuleAuthoritySatus = function()
{
	var panels = this.___alpanels;

	if (panels)
	{
		var l = panels.length;
		for(var i = 0;i < l;i++)
		{
			var e = panels[i];
			e.setAttribute('_sys_opstatus_s_display', e.style.display);
			var code = e.getAttribute('_sys_opareastatus');
			if (String.isEmpty(code))
				code = '0';
			e.setAttribute('_sys_opstatus_s_code', code);
			e = null;
		}
		panels = null;
	}
}

pageObjectExtend.resotreModuleAuthoritySatus = function()
{
	var panels = this.___alpanels;

	if (panels)
	{
		var l = panels.length;
		for(var i = 0;i < l;i++)
		{
			var cur = panels[i];
			//			if (cur.getAttribute('_sys_isoparea'))
			{
				var curcode = cur.getAttribute('_sys_opareastatus');
				var sourcecode = cur.getAttribute('_sys_opstatus_s_code');
				if (String.isEmpty(curcode))
					curcode = 0;
				if (String.isEmpty(sourcecode))
					sourcecode = 0;
				if (curcode != sourcecode)
				{
					if (curcode == '110')
					{
						LEAP.setOPAreaStatus(cur, sourcecode, null, true);
					}
					else
					{
						LEAP.setOPAreaStatus(cur, sourcecode);
					}
				}
			}
			cur = null;
		}
		panels = null;
	}

}
/**
var __b =
{
	//定义类型
	//st 源
	s	: '',
	//parent st 父控件 
	p	: 'table1_1',
	//event 事件
	e	: 'rowOperationClick',
	//flag 标识 , 用于事件中接收的标识,如 table的模板操作列 | 各类控件 中返回的标识代码
	f	: '新增',
	//type 定义事件 module|method
	t	: 'module',
	//name 事件的响应  模型名称|方法名称
	n	: 'modulename',
	//formtype
	ft	: 4,
	//viewtype
	vt	: 'view',
	//加载模型的容器的st , 有该属性则为加载到指定的容器,而不是打开新窗体
	c	: '',
	//空就是控件数据 , page就是页面数据
	ds  : 'page',
	//字段映射
	fm  : 'resid=id,resname=name'
	qfm:     传递的查询条件 , 源字段名称:目标字段名称 如: id=buildingid,name=buildingname
}
*/
/**
lem='[{s:"th1",p:"table",e:"cellClick",t:"module",n:"ldspresident000info_21"},{s:"btn1",t:"method",n:"innerSearch"}]'
 */
pageObjectExtend._initpes = function()
{
	var me = this.moduleElement;
	if (me)
	{
		var defstr = me.getAttribute('lem');
		if (!String.isEmpty(defstr))
		{
			var defs = null;
			try
			{
				defs = JSON.parse(defstr);
			}
			catch(e)
			{
			}
			if (defs)
			{
				var hi = [];
				var evhash = new hashtable();
				var l = defs.length;
				for(var i = 0;i < l;i++)
				{
					var cur = defs[i];
					if (!cur.e)
						continue;

					if (cur.qfm != null && !cur.qfmo)
					{
						var tmps = cur.qfm.split(',');
						cur.qfmo = [];
						for(var ii = 0;ii < tmps.length;ii++)
						{
							var ctmp = tmps[ii];
							var ctmps = ctmp.split('=');
							cur.qfmo.add(ctmps);
						}
					}

					if (cur.p)
					{
						var key = cur.p + "|" + cur.e;
						var pe = this.getST(cur.p);
						if (!pe)
							continue;
							
						if (!hi.contains(key)){
							hi.add(key);
							this.addEvent(pe, cur.e, this._peshandleEvent, 2);
						}
							
						var pevh = pe._ledef;
						if (!pevh)
						{
							pevh = new hashtable();
							pe._ledef = pevh;
						}
						var akey = cur.s;
						if(cur.t){
							akey = akey + "|" + cur.t;
						}
						if (cur.f!=null)
							akey = akey + "|" + cur.f;
						pe._ledef.add(akey, cur);

						var ce = this.getST(cur.s);
						if (!ce._ledef)
						{
							ce._ledef = new hashtable();
						}
						if (!ce._ledef.contains(akey)){
							ce._ledef.add(akey, cur);
						}
						ce = null;

						if (cur.initload)
						{
							var pel = this.getST(cur.p);
							if (pel && pel.getAttribute('ct') == 'tab')
							{
								LEAP.tab.setSelectedIndex(pel, cur.f);
								pel = null;
							}
							else if (pel && pel.getAttribute('ct') == 'dot')
							{
								LEAP.dotsplit.setSelectedIndex(pel, cur.f);
								pel = null;
							}else if (pel && pel.getAttribute('ct') == 'grouplist')
							{
								LEAP.grouplist.setSelectIndex(pel, cur.f);
								pel = null;
							}
							
						}

						pe = null;
					}
					else if (cur.s)
					{
						var ce = this.getST(cur.s);
						if (!ce)
							continue;
						var akey = cur.s+"|"+cur.t ;
						var evh = ce._ledef ;
						var addev = false ;
						if(!evh){
							evh = new hashtable();
							addev = true ;
						}
						if(!evh.contains(akey)){
							evh.add(akey,cur);
						}
						ce._ledef = evh;
						if(addev){
							this.addEvent(ce, cur.e, this._peshandleEvent, 1);
						}
						ce = null;
					}
				}
			}
		}
	}
	me = null;
}

LEAP._peGetMM = function(m)
{
	try
	{
		if (m && m.masterModule)
			return m.masterModule;
		return m;
	}
	finally
	{
		m = null;
	}
}

/**
 * srcst
 * flag
 * data
 * @param {} arg
 */
pageObjectExtend._peshandleEvent = function(arg)
{
	var srctype = arg.arg;
	var src = null;
	src = arg.caller;
	if (src.srcElement)
		src = src.srcElement;
	var def = src._ledef;
	var st = src.getAttribute('st');
	
	var type = arg.type;
	var mcur = null;
	var ecur = null;
	var data = null;
	var flag = null;
	if (srctype == 1)
	{
		if(!def || !def.keys){
			return ;
		}
		for(var key in def.keys){
			if(!key){
				continue ;
			}
			if(key.indexOf("|module")>-1){
				mcur = def.getvalue(key);
			}else if(key.indexOf("|method")>-1){
				ecur = def.getvalue(key);
			}
		}
	}
	else if (srctype == 2)
	{
		var srcst = arg.arg2.srcst;
		if (srcst)
		{
			var src2 = this.getST(srcst);
			if (src2)
			{
				def = src2._ledef;
				if (!def || !def.keys) { return; }
				data = arg.arg2.data;
				flag = arg.arg2.flag;
				for(var key in def.keys)
				{
					if (!key || !def.getvalue(key))
					{
						continue;
					}
					var cel = def.getvalue(key);
					if (cel.f!=null && cel.f == flag)
					{
						if (key.indexOf("|module") > -1)
						{
							mcur = def.getvalue(key);
						}
						else if (key.indexOf("|method") > -1)
						{
							ecur = def.getvalue(key);
						}
					}
					else if (flag == null)
					{
						if (key.indexOf("|module") > -1)
						{
							mcur = def.getvalue(key);
						}
						else if (key.indexOf("|method") > -1)
						{
							ecur = def.getvalue(key);
						}
					}
				}
			}
		}
	}
	var curpm = null;
	var curmm = null;
	if(mcur && type == mcur.e)
	{
		//前置方法校验
		if (mcur.prem)
		{
			var preStr = mcur.prem;
			var pdata = null;
			if (preStr.indexOf("(") > 0 && preStr.indexOf(")") > 0)
			{
				var dataStr = preStr.substring(preStr.indexOf("(") + 1, preStr.length - 1);
				if (dataStr)
				{
					pdata = dataStr.split(",");
				}
				preStr = preStr.substring(0, preStr.indexOf("("));
			}
			var bool = false;
			if (this[preStr])
			{
				if (pdata != null)
				{
					bool = this[preStr].apply(this, pdata);
				}
				else
				{
					bool = this[preStr](arg);
				}
				if (bool != null && bool == false) { return; }
			}
		}
		var ft = 3;
		if (mcur.ft)
			ft = mcur.ft;
		var vt = 'view';
		if (mcur.vt)
			vt = mcur.vt;

		var marg = null;
		if (mcur.qfm)
			marg =
			{
				autosearch	: false
			};
		
		var ld = null;
		
		if(type=="selectedIndexChange" || type=="dotSplitIndexChange"){
			if(vt!="search")
				vt = this.pageMode;
			
			
			var li = this.st(mcur.s);
			if(li)
				li = li.element;
			
			ld = li.getAttribute("linkfiled");
		}
		if (mcur.c)
		{
			var unitesave = this.moduleElement.getAttribute("unitesave");//页面上增加统一保存的属性，然后一路传给子模型 -----571 20160525
			
			if(unitesave!=null&&unitesave=="1"){
				if(this.pageMode != "insert"){
					unitesave = "0";
				}
			}
			if(marg==null)
				marg = {unitesave:unitesave};
			else
				marg.unitesave=unitesave ;
			
			if (!this._peloadmodules)
				this._peloadmodules = new hashtable();
			
			var _n = mcur.n ;
			if(mcur.c)
			{
				_n = _n + "_" + mcur.c ;
			}
			if (!this._peloadmodules.contains(_n))
			{
				var m = this.loadModule2(
				{
					name			: mcur.n,
					pageMode		: vt,
					parent			: this.getST(mcur.c),
					moduleLoadArg	: marg
				});
				this._peloadmodules.add(_n, m);
				if (m)
				{
					m = LEAP._peGetMM(m);
					var hassp = false;
					if (vt == 'insert')
						m.clearPageData();
					else if (vt != 'search')
					{
						hassp = true;
						if(data!=null)
							m.setPageData(data);
					}
					if (!hassp && mcur.sp)
						if(data!=null)
							m.setPageData(data);				
				}
				curpm = m;
			}
			else{ 
				curpm = this._peloadmodules.getvalue(_n);

				if(curpm.pageMode == "search"){
					if(!curpm.unitesave||curpm.unitesave=="0"){
						if(curpm.isNewFlag == null||curpm.isNewFlag == true){
							curpm.innerSearch();
						}
					}
				}
			}
			if(mcur.ldtype)
				curpm.ldtype = mcur.ldtype;
			
			curpm.unitesave = unitesave;
			pageObjectExtend.bindlinkdata(curpm,this.linkdata,ld);
			
			//这条数据是新点开的，所以在修改标签，要重新查询
			if(curpm.isNewFlag == null||curpm.isNewFlag == true){
				if(curpm.pageMode == 'view' || curpm.pageMode == 'modify'){
					if(!mcur.ismain)
						pageObjectExtend.tab_unitesave_loaddata(curpm.name+"_"+mcur.c,this);
				}
			}
			pageObjectExtend.tab_unitesave_setModuleNew(this,curpm.name+"_"+mcur.c,false);
		}
		else
		{
			var form = this.forms(mcur.n, vt, marg, null, ft);
			if (form)
			{	
				form.show();
				if (form.module)
				{		
					curmm = form.module;
					var m = LEAP._peGetMM(form.module);
					var hassp = false;
					if (vt == 'insert')
						m.clearPageData();
					else if (vt != 'search')
					{
						hassp = true;
						if(data!=null)
							m.setPageData(data);
					}
					if (!hassp && mcur.sp)
						if(data!=null)
							m.setPageData(data);
					
					pageObjectExtend.tab_unitesave_form(vt,form.module,data);
					form.module.linkdata = data;
				}
				curpm = m;
				form = null;
				
			}
		}
		//后置方法调用
		if (mcur.endm && this[mcur.endm] && curpm)
		{
			this[mcur.endm](curpm);
		}
		if (mcur.ismain && curpm)
		{
			this.masterModule = curpm;
		}
				
		if (curpm)
		{
			if (vt == 'insert')
			{
				curpm.isp_out_inset = this.isp_out;
			}			
		}

		if (curpm && (mcur.fm))
		{

			if (!this._peloadmodulefms)
				this._peloadmodulefms = [];
			if (!this._peloadmodulefms.contains(mcur.n))
			{
				this._peloadmodulefms.add(mcur.n);

				if (mcur.fm != null)
				{
					var tmps = mcur.fm.split(',');
					mcur.fmo = [];
					for(var i = 0;i < tmps.length;i++)
					{
						var ctmp = tmps[i];
						var ctmps = ctmp.split('=');
						mcur.fmo.add(ctmps);
					}
					if (mcur.n == 'gisp_location')
					{
						curpm.regEvent(mcur.f, this._peshandleEvent_gpe, this, mcur);
					}
					else
					{
						var table = curpm.getElement('div[ut=list]');
						if (table)
						{
							curpm.addEvent(table, "doubleClick", this._peshandleEvent_fm, mcur, null, this);
							curpm.addEvent(table, "rowOperationClick", this._peshandleEvent_rowclick, mcur, null, this);
						}
					}
				}
			}
			
			if (mcur.n == 'gisp_location'){
				if(curpm.setLocation){
					var data = curpm.parentPageModule.getPageData().data;
					if(data){
						curpm.setLocation(data,mcur.fm);
					}
				}
			}
		}

		if (curpm && mcur.qfmo)
		{
			if (data)
			{
				var tmpdata = {};
				for(var i = 0;i < mcur.qfmo.length;i++)
				{
					var md1 = mcur.qfmo[i][0];
					var md2 = mcur.qfmo[i][1];
					tmpdata[md2] = data[md1];
				}
				curpm.setQueryData(tmpdata);
			}
			else curpm.setQueryData(null);
		}
	}
	if(ecur && type == ecur.e){
		if (!ecur.n)
		{
			return ;
		}
		if(ecur.ds && ecur.ds == 'page')
		{
			var mm = this ;
			if(this.masterModule)
			{
				mm = this.masterModule ;
			}
			var ret = mm.getPageData();
			if(ret)
				data = ret.data;
			else data = null;
		}
		var ms = ecur.n;
		var domain = this ; //作用域的设置
		if(curmm){
			domain = curmm;
		}
		else if(curpm){
			domain = curpm ;
		}
		ms = ms.split(";")
		for(var i = 0;i < ms.length;i++)
		{
			var isarr = false ;
			var method = ms[i] ;
			if(ms[i].indexOf("(")>0 && ms[i].indexOf(")")>0){
				var dataStr = ms[i].substring(ms[i].indexOf("(")+1,ms[i].length-1)
				if(dataStr){
					data = dataStr.split(",");
					isarr= true ;
				}
				method = ms[i].substring(0,ms[i].indexOf("("));
			}
			if (domain[method])
			{
				if (data != null){
					if(isarr){
						domain[method].apply(domain,data);
					}else{
						domain[method](data);
					}
				}
				else domain[method](arg);
			}
		}
	}
	curpm = null;
}



//绑定linkdata 在PageLoad里面 传递linkdata的时候调用  571  21060525
pageObjectExtend.bindlinkdata = function(m,linkdata,linkfiled){
	
	if(m==null)
		m = this;
	
	if(linkdata==null)
		linkdata = m.linkdata;
	else
		m.linkdata = linkdata;
	
	if((linkdata!=null&&linkdata.id!=null)||linkfiled){
		var lid = linkfiled;
		if(lid==null)
			lid = m.linkedfield;
		if(lid==null)
			lid = m.moduleElement.getAttribute("linkfiled");
		if(lid!=null){
			if(linkdata!=null)
				m.parentPKValue = linkdata.id;
			m.linkedfield= lid;
		}
		
	}
}

pageObjectExtend.tab_unitesave_list_sindex = 0;

pageObjectExtend.tab_unitesave_loaddata = function(mName,mm){
	if(mName){
		
		var m = mm._peloadmodules.getvalue(mName);
		if(m!=null){
			
			var pkvalue = m.parentPKValue;
			var lkid = m.linkedfield;
			var dmname = m.moduleName;
			
			var sp =null;
			if(pkvalue&&lkid&&dmname){
				sp = new SearchParameters();
				sp.setName(m.moduleName);
				sp.addParameter(lkid, pkvalue, 11);
			}
			if(sp==null)
				return;
			
			var ret = LEAP.request('DynaSearch',{par:sp})
			
			if(ret!=null){
				ret = LEAP.convertResult(ret);
				if(ret!=null){
					ret = ret[0]
					if(ret!=null){
						m.setPageData(ret);
						return;
					}
				}
					
			}
			m.clearPageData();
			
			
		}
		
	}
}

pageObjectExtend.tab_unitesave_setModuleNew = function(mm,mName,flag){
	if(!mm._peloadmodules)
		return;
	if(mName){
		var m = mm._peloadmodules.getvalue(mName);
		if(m)
			m.isNewFlag = flag;
	}
	else{
		for(key in mm._peloadmodules.keys){
			var m = mm._peloadmodules.getvalue(key);
			m.isNewFlag = flag;
		}
	}
}

//统一保存的时候 ，不保存数据库，只添加行   571  21060525
pageObjectExtend.tab_unitesave_list_add = function(m,data){
	
	var list = m.getUT("list");
	
	LEAP.table.addRow(list, data, null, null, true); 
}

//统一保存的时候 ，不保存数据库，只添加行   571  21060525
pageObjectExtend.tab_unitesave_list_del = function(m,rowindex){
	
	var list = m.getUT("list");
	
	LEAP.table.removeRow(list, rowindex); 
	
}

//统一保存的时候 ，不保存数据库，只添加行   571  21060525
pageObjectExtend.tab_unitesave_list_modify = function(m,data){
	
	var list = m.getUT("list");
		
	LEAP.table.updateRow(list, pageObjectExtend.tab_unitesave_list_sindex, data) 
}
pageObjectExtend.formstep_getdata = function(m)
{
	var formstep = null;
	if(m.getUT)
		formstep = m.getUT("formstep");
	else
		formstep = m;
	return LEAP.formstep.getValue(formstep);
}

pageObjectExtend.tab_unitesave_form = function(vt,fromModule,data){
	
	var unitesave = fromModule.moduleElement.getAttribute("unitesave");//页面上增加统一保存的属性，然后一路传给子模型 -----571 20160525

	var index = 0;
	if(fromModule._peloadmodules!=null&&fromModule._peloadmodules.count>=1){
		for(key in fromModule._peloadmodules.keys){
			
			var m = fromModule._peloadmodules.getvalue(key);
			if(m.pageMode!="search"){
				m.pageMode = vt;
				m.unitesave = unitesave;
			}
			else
			{
				
			}
			
			
			if(vt!="insert"){
				pageObjectExtend.bindlinkdata(m,data);
				if(index==0){
					if(m.pageMode =='insert'){
						m.clearPageData();
					}
					else{}
						//m.setPageData(data);
				}
				else{
					m.clearPageData();
					if (m.pageMode == 'search'){
						if(m.parentPageModule.pageMode=="insert"){
							var list = m.getUT("list");
							LEAP.table.clearRow(list);
						}
					}
				}
			}
			else{//insert的情况，不用考虑关联数据，反正是统一传到后台产生关联
				m.parentPKValue = linkdata = null;
				m.clearPageData();
				if (m.pageMode == 'search'){
					if(m.parentPageModule.pageMode=="insert"){
						var list = m.getUT("list");
						LEAP.table.clearRow(list);
					}
				}
			}
						
			index++;
		}
	}
	pageObjectExtend.tab_unitesave_setModuleNew(fromModule,null,true);
	
	var ct_tab = fromModule.getElement("[ct=tab]");
	
	LEAP.tab.setSelectedIndex(ct_tab, 0);
}


pageObjectExtend.BeforSubmit_Tab = function(m){
	var parameter = null;
	try{
		
		if(m.pageMode=="search")
			return;
		
		parameter = m.getCreateParameter(null, m.validateArea);
		if (m.buildCreateParameter)
			parameter = m.buildCreateParameter(parameter);

		if (parameter == null)
		{
			if (m.skipMessage != null && m.skipMessage != null)
				return -2;
			LEAP.messagebox.alert('输入参数为空,请正确填写', 2);
			return -2;
		}

		if (m.parentPKValue && m.linkedfield)
		{
			if (m.moduleVersion > 1)
				parameter[m.linkedfield] = m.parentPKValue;
			else parameter.addparameter(m.linkedfield, m.parentPKValue);
		}

		m.buildExtendPageData(parameter);

		
		
		
		if(this.pageMode=="insert"){
			if (m.insertBeforeSubmit)
			{
				var vr = m.insertBeforeSubmit(parameter);
				if (vr == false)
					return -13;
			}			
		}
		else if(this.pageMode=="modify"){

			if (m.modifyBeforeSubmit)
			{
				var vr = m.modifyBeforeSubmit(parameter);
				if (vr == false)
					return -23;
			}
		}
		
		if (m.beforeSubmit)
		{
			var vr = m.beforeSubmit(parameter);
			if (vr == false)
				return -3;
		}
		
		return 1;
	}
	catch(err)
	{
		LEAP.showError(err);
	}
	finally
	{
		errCtlList = parameter = null;
	}
	
}

/**
 * tab统一提交数据 //---571  20160525
 * @return {}
 */
pageObjectExtend.innerInfoSubmit_Tab = function()
{
	try
	{
		var mdata = null;
		var datas = [];
		if(this._peloadmodules!=null&&this._peloadmodules.count>=1){
			for(key in this._peloadmodules.keys){
				var m = this._peloadmodules.getvalue(key);
				
				
				var r = this.BeforSubmit_Tab(m);
				if(r<1)
					return;
				
				var d = null;
				if(this.pageMode=="insert"){
					d = m.getPageData().data;
					d.beanname =  m.moduleName;
					//var lf = m.moduleElement.getAttribute("linkfiled")
					var lf = m.linkedfield;
					if(lf!=null)
						d.linkfiled = lf;
					if(m.pageMode=="search"){
						if(m.unitesave=="1"){
							var list = m.getUT("list");
							var rows = LEAP.table.getRows(list);
							if(rows!=null){
								for ( var i = 0; i < rows.length; i++) {
		                            var dd = rows[i].data;
		                            if(lf!=null)
		        						dd.linkfiled = lf;
		                            dd.beanname =  m.moduleName;
		                            datas.push(dd);
	                            }
							}
						}
						d = null;
					}
					
					if(d){
						if(m==this.masterModule)
							mdata = d;
						else
							datas.push(d);		
					}
				}
				else if(this.pageMode=="modify"){
					
					
					if(m.pageMode!="search"){
						d = m.getPageData().change;
						if(d){
							d.id =  m.getPageData().data.id;
							if(d.id==null){
								//var lf = m.moduleElement.getAttribute("linkfiled")
								var lf = m.linkedfield;
								if(lf!=null)
									d[lf] = m.parentPKValue;
								
								
							}
							d.beanname =  m.moduleName;
						}
						
					}
					
					
					if(d){
						datas.push(d);		
					}
				}
				
			
							
			}
			
			var b = false;
			if(this.pageMode == 'insert'){
				b = LEAP.request("studiov2_Tab_Create",{manbean:mdata,beans:datas});
			}
			if(this.pageMode == 'modify'){
				
				var newbb = [];
				for ( var i = 0; i < datas.length; i++) {
	                var d = datas[i];
	                var o = {};
	                for ( var key in d) {
	                  
	                    if(d[key]!=null&&d[key].value!=null)
	                    	o[key] = d[key].value;
	                    else
	                    	o[key] = d[key];
	                    
                    }
	                
	                newbb.push(o);
                }
				
				b = LEAP.request("studiov2_Tab_Update",{changeresults:newbb});
			}
			if(this.pageMode == 'view'){
				b = true;
			}
			
			if(b){
				this.hideForm();
				if(this.parentPageModule!=null){
					if(this.parentPageModule.innerSearch!=null){
						this.parentPageModule.innerSearch();
					}
				}
				this.fireEvent('onSubmit');
			}
		}

	}
	catch(err)
	{
		LEAP.showError(err);
	}
}
//------------------
pageObjectExtend.buildExtendPageData = function(data)
{
	if (this.moduleVersion > 1)
	{
		if (this.exdata != null)
		{
			for(var key in this.exdata)
			{
				data[key] = this.exdata[key];
			}
		}
	}
}
pageObjectExtend._peshandleEvent_gpe = function(arg, arg2)
{
	this._peshandleEvent_fm(
	{
		arg		: arg2,
		arg2	:
		{
			data	: arg
		}
	});
}
pageObjectExtend._peshandleEvent_rowclick = function(arg)
{
	if (!arg || arg.arg2)
	{
		var _flag = arg.arg2.flag;
		if (_flag == "选择")
		{
			this._peshandleEvent_fm(arg);
		}
	}
}
pageObjectExtend._peshandleEvent_fm = function(arg)
{
	var data = null;
	if (arg && arg.arg2 && arg.arg2.data)
		data = arg.arg2.data;
	var cur = null;
	if (arg && arg.arg)
		cur = arg.arg;
	if (data && cur && cur.fmo)
	{
		for(var i = 0;i < cur.fmo.length;i++)
		{
			var md1 = cur.fmo[i][0];
			var md2 = cur.fmo[i][1];
			if (this.exdata == null)
				this.exdata = {};
			var mdel = this.md(md1);
			if (mdel)
			{
				mdel.setValue(data[md2]);
				mdel = null;
			}
			else this.exdata[md1] = data[md2];
		}
		var caller = arg.caller;
		if (caller)
		{
			var parent = caller;
			while(!parent.hasAttribute('instance'))
			{
				parent = caller.parentElement;
			}
			if (parent.hasAttribute('instance'))
			{
				var cm = LEAP.getLoadedModule(parent.getAttribute('instance'));
				if (cm)
				{
					cm.hideForm();
					cm = null;
				}
			}
		}
	}
}
pageObjectExtend._initphs = function()
{
	var me = this.moduleElement;
	if (me)
	{
		var defstr = me.getAttribute('lhe');
		if (!String.isEmpty(defstr))
		{
			var defs = null;
			try
			{
				defs = JSON.parse(defstr);
			}
			catch(e)
			{
			}
			if (defs)
			{
				var l = defs.length;
				for(var i = 0;i < l;i++)
				{
					var cur = defs[i];
					if (!cur.e)
						continue;
					if (cur.s)
					{
						var ce = this.getST(cur.s);
						if (!ce)
							continue;
						ce._lhdef = cur;
						this.addEvent(ce, cur.e, this._plhhandleEvent);
					}
				}
			}
		}
	}
	me = null;
}
pageObjectExtend._plhhandleEvent = function(arg)
{
	var src = arg.caller;
	if (src.srcElement)
		src = src.srcElement;
	var def = src._lhdef;
	var st = src.getAttribute('st');
	var type = arg.type;
	if (def && def.e == type)
	{
		var h = def.h;
		var ck = def.ck ;
		var v = LEAP.getValue(src);
		var me = this.moduleElement;
		
		if (h && h.length > 0)
		{
			var hides = null;
			var shows = null;
			for(var i = 0;i < h.length;i++)
			{
				if (h[i] && h[i].v == v)
				{
					hides = h[i].hide;
					shows = h[i].show;
					break;
				}
			}
			if (hides && hides.length > 0)
			{
				for(var k = 0;k < hides.length;k++)
				{
					var hEls = LEAP.getElements("[panel=" + hides[k] + "]", me);
					this._hidePanelElement(hEls, true);
				}
			}
			if (shows && shows.length > 0)
			{
				for(var k = 0;k < shows.length;k++)
				{
					var sEls = LEAP.getElements("[panel=" + shows[k] + "]", me);
					this._hidePanelElement(sEls, false);
				}
			}
		}
		if(ck && ck.length>0)
		{
			var rmds = null;
			var nrmds = null;
			var cmds = null;
			var ncmds = null;
			for(var i = 0;i < ck.length;i++)
			{
				if (ck[i] && ck[i].v == v)
				{
					rmds = ck[i].r;
					nrmds = ck[i].nr;
					cmds = ck[i].c;
					ncmds = ck[i].nc;
					break;
				}
			}
			var mdEl = null ;
			if (rmds && rmds.length > 0)
			{
				for(var k = 0;k < rmds.length;k++)
				{
					mdEl = LEAP.getElement("[md =" + rmds[k] + "]", me);
					if(mdEl){
						LEAP.setReadonly(mdEl, true);
					}
				}
			}
			if (nrmds && nrmds.length > 0)
			{
				for(var k = 0;k < nrmds.length;k++)
				{
					mdEl = LEAP.getElement("[md=" + nrmds[k] + "]", me);
					if(mdEl){
						LEAP.setReadonly(mdEl, false);
					}
				}
			}
			if (cmds && cmds.length > 0)
			{
				for(var k = 0;k < cmds.length;k++)
				{
					mdEl = LEAP.getElement("[md=" + cmds[k] + "]", me);
					if (mdEl)
					{
						var check = mdEl.getAttribute("check");
						if (check != null && check.trim().length > 0)
							check = eval('({' + check + '})');
						if (check == null)
						{
							check = {};
						}
						check["notnull"] = true;
						var str = JSON.stringify(check);
						mdEl.setAttribute('check', str.substr(1, str.length - 2).replaceall('"', ''));
						mdEl.setAttribute('_dynacheck', "check");
					}
				}
			}
			if (ncmds && ncmds.length > 0)
			{
				for(var k = 0;k < ncmds.length;k++)
				{
					mdEl = LEAP.getElement("[md=" + ncmds[k] + "]", me);
					if (mdEl)
					{
						var check = mdEl.getAttribute("check");
						if (check != null && check.trim().length > 0)
							check = eval('({' + check + '})');
						if (check == null)
						{
							check = {};
						}
						delete check["notnull"];
						var str = JSON.stringify(check);
						mdEl.setAttribute('check', str.substr(1, str.length - 2).replaceall('"', ''));
						mdEl.setAttribute('_dynacheck', "uncheck");
						if (mdEl.style["background-color"])
						{
							mdEl.style.removeAttribute('background-color');
							delete mdEl.style['background-color'];
						}
					}
				}
			}
		}
	}
}
pageObjectExtend._hideExpressElement = function()
{
	var me = this.moduleElement;
	if (!me) { return; }
	var heepStr = me.getAttribute("heep");
	if (String.isEmpty(heepStr)) { return; }
	var defs = null;
	try
	{
		defs = JSON.parse(heepStr);
	}
	catch(e)
	{
	}
	if (defs && defs.length > 0)
	{
		for(var i = 0;i < defs.length;i++)
		{
			var exp = defs[i].exp;
			var bool = false;
			try
			{
				if (!eval(exp))
				{
					continue;
				}
				else
				{
					bool = true;
				}
			}
			catch(e)
			{
			}
			if (!bool)
			{
				continue;
			}
			var hide = defs[i].hide;
			var show = defs[i].show;
			if (hide && hide.length > 0)
			{
				var hides = hide.split(",");
				for(var k = 0;k < hides.length;k++)
				{
					var hEls = LEAP.getElements("[panel=" + hides[k] + "]", me);
					this._hidePanelElement(hEls, true);
				}
			}
			if (show && show.length > 0)
			{
				var shows = show.split(",");
				for(var k = 0;k < shows.length;k++)
				{
					var sEls = LEAP.getElements("[panel=" + shows[k] + "]", me);
					this._hidePanelElement(sEls, false);
				}
			}
		}
	}
}
pageObjectExtend._hidePanelElement = function(elements,hide)
{
	if (!elements || elements.length == 0) { return; }
	var cur = null;
	for(var i = 0;i < elements.length;i++)
	{
		cur = elements[i];
		if (hide)
		{
			cur.style.display = "none";
		}
		else
		{
			cur.style.display = "";
		}
		var mdEls = LEAP.getElements("[md]", cur);
		if (mdEls && mdEls.length > 0)
		{
			for(var k = 0;k < mdEls.length;k++)
			{
				var checkStr = mdEls[k].getAttribute("check");
				if (!hide)
				{
					mdEls[k].removeAttribute("_hide");
				}
				else if (hide)
				{
					mdEls[k].setAttribute("_hide", 1);
				}
			}
		}
	}
}
pageObjectExtend._rebuildMdAttr = function(pagemode)
{
	if(pagemode=="view" || pagemode=="search"){
		return ;
	}
	var me = this.moduleElement;
	if (!me) { return; }
	var defstr = me.getAttribute('mext');
	var defs = null;
	if (!String.isEmpty(defstr))
	{
		try
		{
			defs = JSON.parse(defstr);
		}
		catch(e)
		{
		}
	}
	if (!defs) { return; }
	var mds = null ;
	var mdcs = null ;
	for(var k in defs)
	{
		
		if (k == "rmds")
		{
			var rmds = defs[k];
			if (rmds == null || rmds.length == 0)
			{
				continue;
			}
			mds = rmds.split(",");
			for(var i = 0;i < mds.length;i++)
			{
				if(mdcs && mdcs.contains(mds[i]) && pagemode=="insert"){
					continue ;
				}
				var mdEl = LEAP.getElement("[md=" + mds[i] + "]", me);
				if (mdEl)
				{
					LEAP.setReadonly(mdEl, pagemode=="modify");
				}
			}
		}else if(k == "rmdcs"){
			var rmdcs = defs[k];
			if (rmdcs == null || rmdcs.length == 0)
			{
				continue;
			}
			mdcs = rmdcs.split(",");
			for(var i = 0;i < mdcs.length;i++)
			{
				if(mds && mds.contains(mdcs[i])&& pagemode=="modify"){
					continue ;
				}
				var mdcEl = LEAP.getElement("[md=" + mdcs[i] + "]", me);
				if (mdcEl)
				{
					LEAP.setReadonly(mdcEl, pagemode=="insert");
				}
			}
		}
	}
	me = null;
}

pageObjectExtend._rebuildMdcheck =function(){
	if(this.data==null){
		return ;
	}
	var me = this.moduleElement;
	var defs = null; 
	if (me)
	{
		var defstr = me.getAttribute('lhe');
		if (!String.isEmpty(defstr))
		{
			var defs = null;
			try
			{
				defs = JSON.parse(defstr);
			}
			catch(e)
			{
			}
		}
	}
	if (defs)
	{
		var l = defs.length;
		for(var i = 0;i < l;i++)
		{
			var cur = defs[i];
			if (!cur.e || cur.e!="valueChange")
				continue;
			if (cur.s)
			{
				var ce = this.getST(cur.s);
				if (!ce)
					continue;
				ce._lhdef = cur;
				var arg = {};
				arg.caller = {};
				arg.caller.srcElement = ce ;
				arg.type="valueChange" ;
				this._plhhandleEvent(arg);
			}
		}
	}
	me = null;
}

pageObjectExtend._hideButton = function(pagemode)
{
	if (!pagemode || pagemode=="search") { return; }
	var me = this.moduleElement;
	if (!me) { return; }
	var btns = LEAP.getElements("[_hidemode]", me);
	if (btns == null || btns.length == 0) { return; }
	for(var i = 0;i < btns.length;i++)
	{
		var modeStr = btns[i].getAttribute("_hidemode");
		if (modeStr && modeStr.indexOf(pagemode) > -1)
		{
			btns[i].style.display = 'none';
		}
		else
		{
			btns[i].style.display = '';
		}
	}
}

LEAP.hc_checkbox = {};
LEAP.hc_checkbox.d="hc_checkbox";
LEAP.hc_checkbox.itemstr = '<div class="hc-form-checkbox hc-primary " ctf="hc_cbitem">'+
          '<input class="hc-form-core" type="checkbox" ctf="hc_cbinput" value="@value">'+
          '<span class="hc-form-frame" ctf="hc_cbcore">'+
            '<i class="hc-iconfont hc-icon-checkbox" ctf="hc_cbcore"></i>'+
          '</span>'+
          '<label class="hc-form-label" ctf="hc_cblabel">@text</label>'+
        '</div>';
LEAP.hc_checkbox._init = function()
{
	LEAP.addEvent(document.body,'click',LEAP.hc_checkbox.uiProcess,null,null,true);
	UIEventManager.removeEvent(window, 'load', LEAP.hc_checkbox._init);
}
LEAP.hc_checkbox.init = function()
{
	if (document != null && document.body != null)
		LEAP.hc_checkbox._init();
	else
		UIEventManager.addEvent(window, 'load', LEAP.hc_checkbox._init);
}();
LEAP.hc_checkbox.uiProcess = function(arg)
{
	var src = arg.e.srcElement;
	var ctf = src.getAttribute("ctf");
	var type = arg.e.type;
	var element = LEAP._match(src,LEAP.hc_checkbox.d,'ct',999);
	if(!element)
		return;
	if(type=="click" && (ctf=="hc_cbitem" || ctf=="hc_cbinput" || ctf=="hc_cbcore" || ctf=="hc_cblabel"))
	{
		var item = null;
		if(ctf=="hc_cbitem")
			item=src;
		else
			item = LEAP._match(src,"hc_cbitem",'ctf',3);
		var cbinput = LEAP.getElement("[ctf=hc_cbinput]",item);
		if(cbinput.getAttribute("checked")=="" || cbinput.getAttribute("checked")==true || cbinput.getAttribute("checked")=="true" || cbinput.getAttribute("checked")=="checked")
		{
			cbinput.removeAttribute("checked");
			LEAP.removeCSS(item,"hc-form-checkbox-active",false);
		}
		else
		{
			cbinput.setAttribute("checked",true);
			LEAP.addCSS(item,"hc-form-checkbox-active");
		}
	}
}
LEAP.hc_checkbox.setValue = function(element,value)
{
	if(!value)
		return;
	value = value.split(",");
	var cbitems = LEAP.getElements("[ctf=hc_cbitem]",element);
	if(cbitems)
	{
		for(var i=0;i<cbitems.length;i++)
		{
			var cbinput = LEAP.getElement("[ctf=hc_cbinput]",cbitems[i]);
			var flag = false;
			for(var j=0;j<value.length;j++)
			{
				if(cbinput.value==value[j])
				{
					flag=true;
					break
				}
			}
			if(flag)
			{
				cbinput.setAttribute("checked",true);
				LEAP.addCSS(cbitems[i],"hc-form-checkbox-active");
			}
		}
	}
}
LEAP.hc_checkbox.checkAll = function(element,checked)
{
	if(!element)
		return
	var cbitems = LEAP.getElements("[ctf=hc_cbitem]",element);
	if(cbitems)
	{
		for(var i=0;i<cbitems.length;i++)
		{
			var cbinput = LEAP.getElement("[ctf=hc_cbinput]",cbitems[i]);
			if(checked==true)
			{
				cbinput.setAttribute("checked",true);
				LEAP.addCSS(cbitems[i],"hc-form-checkbox-active");
			}
			else
			{
				cbinput.removeAttribute("checked");
				LEAP.removeCSS(cbitems[i],"hc-form-checkbox-active",false);
			}
		}
	}
}
LEAP.hc_checkbox.addItem = function(element,name,value,checked,data)
{
	if(!element)
		return;
	if(!element["_itemstr"])
	{
		var itemel = LEAP.getElement("[ctf=hc_cbitem]",element);
		if(itemel!=null)
		{
			var cbinput = LEAP.getElement("[ctf=hc_cbinput]",itemel);
			var moduletype = itemel.getAttribute("moduletype");
			cbinput.value="@value";
			var cblabel = LEAP.getElement("[ctf=hc_cblabel]",itemel);
			cblabel.innerHTML="@text";
			element["_itemstr"] = itemel.outerHTML;
			if(moduletype=="1")
				element.removeChild(itemel);
		}
	}
	if(!element["_itemstr"])
		element["_itemstr"]=LEAP.hc_checkbox.itemstr;
	var tempdiv = document.createElement("div");
	tempdiv.innerHTML=element["_itemstr"].replace("@value",value).replace("@text",name);
	var item = tempdiv.children[0];
	if(checked==true)
	{
		var cbinput = LEAP.getElement("[ctf=hc_cbinput]",item);
		cbinput.setAttribute("checked",true);
		LEAP.addCSS(item,"hc-form-checkbox-active");
	}
	if(data!=null)
		item["_data"]=data;
	element.appendChild(item);
	return item;
}
LEAP.hc_checkbox.getValue = function(element)
{
	var revalue = ",";
	var cbitems = LEAP.getElements("[ctf=hc_cbitem]",element);
	if(cbitems)
	{
		for(var i=0;i<cbitems.length;i++)
		{
			var cbinput = LEAP.getElement("[ctf=hc_cbinput]",cbitems[i]);
			if(cbinput.getAttribute("checked")=="" || cbinput.getAttribute("checked")==true || cbinput.getAttribute("checked")=="true" || cbinput.getAttribute("checked")=="checked")
			{
				revalue+=cbinput.value.trim() + ",";
			}
		}
	}
	return ("," == revalue) ? null : revalue.substring(1, revalue.length-1);
}
LEAP.hc_date = {};
LEAP.hc_date.d="hc_date";
LEAP.hc_date.domStr = '<div class="hc-popup hc-popup-down" ctf="hc_datepickermain">'+
    '<div class="hc-picker-main">'+
      '<div class="hc-picker-handle">'+
        '<div class="hc-button-text" ctf="hc_datepickerclear">'+
          '<span class="hc-button-label">取消</span>'+
        '</div>'+
        '<div disabled class="hc-button-text hc-button-info">'+
          '<span class="hc-button-label" ctf="hc_datepickerlabel"></span>'+
        '</div>'+
        '<div class="hc-button-text hc-button-primary" ctf="hc_datepickersuer">'+
          '<span class="hc-button-label">确认</span>'+
        '</div>'+
      '</div>'+
      '<div class="hc-picker-head">'+
        '<span data-id="title-y" class="hc-picker-head-item" ctf="hc_datepicktitle">年</span>'+
        '<span data-id="title-m" class="hc-picker-head-item" ctf="hc_datepicktitle">月</span>'+
        '<span data-id="title-d" class="hc-picker-head-item" ctf="hc_datepicktitle">日</span>'+
        '<span data-id="title-h" class="hc-picker-head-item" ctf="hc_datepicktitle">时</span>'+
        '<span data-id="title-i" class="hc-picker-head-item" ctf="hc_datepicktitle">分</span>'+
      '</div>'+
      '<div class="hc-picker-body">'+
        '<div class="hc-picker">'+
          '<div class="hc-picker-item" data-id="picker-y" ctf="hc_datepicker_item">'+
            '<div class="hc-picker-inner">'+
              '<div class="hc-picker-rule hc-picker-rule-top"></div>'+
              '<ul class="hc-picker-list" ctf="hc_picker_item_ul">'+
              '</ul>'+
              '<div class="hc-picker-rule hc-picker-rule-bottom"></div>'+
            '</div>'+
          '</div>'+
          '<div class="hc-picker-item" data-id="picker-m" ctf="hc_datepicker_item">'+
            '<div class="hc-picker-inner">'+
              '<div class="hc-picker-rule hc-picker-rule-top"></div>'+
              '<ul class="hc-picker-list" ctf="hc_picker_item_ul">'+
              '</ul>'+
              '<div class="hc-picker-rule hc-picker-rule-bottom"></div>'+
            '</div>'+
          '</div>'+
          '<div class="hc-picker-item" data-id="picker-d" ctf="hc_datepicker_item">'+
            '<div class="hc-picker-inner">'+
              '<div class="hc-picker-rule hc-picker-rule-top"></div>'+
              '<ul class="hc-picker-list" ctf="hc_picker_item_ul">'+
              '</ul>'+
              '<div class="hc-picker-rule hc-picker-rule-bottom"></div>'+
           '</div>'+
          '</div>'+
          '<div class="hc-picker-item" data-id="picker-h" ctf="hc_datepicker_item">'+
            '<div class="hc-picker-inner">'+
              '<div class="hc-picker-rule hc-picker-rule-top"></div>'+
              '<ul class="hc-picker-list" ctf="hc_picker_item_ul">'+
              '</ul>'+
              '<div class="hc-picker-rule hc-picker-rule-bottom"></div>'+
            '</div>'+
          '</div>'+
          '<div class="hc-picker-item" data-id="picker-i" ctf="hc_datepicker_item">'+
            '<div class="hc-picker-inner">'+
              '<div class="hc-picker-rule hc-picker-rule-top"></div>'+
              '<ul class="hc-picker-list" ctf="hc_picker_item_ul">'+
              '</ul>'+
              '<div class="hc-picker-rule hc-picker-rule-bottom"></div>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>'+
      '<ul class="hc-picker-footer">'+
        '<li class="hc-picker-footer-item">'+
          '<button class="hc-button-text hc-button-primary hc-button-full" ctf="hc_datepickertoday">'+
            '今日'+
          '</button>'+
        '</li>'+
      '</ul>'+
    '</div>'+
  '</div>';
LEAP.hc_date.ui=null;
LEAP.hc_date.options=null;
LEAP.hc_date._init = function()
{
	LEAP.addEvent(document.body,'click',LEAP.hc_date.uiProcess,null,null,true);
	UIEventManager.removeEvent(window, 'load', LEAP.hc_date._init);
}
LEAP.hc_date.init = function()
{
	if (document != null && document.body != null)
		LEAP.hc_date._init();
	else
		UIEventManager.addEvent(window, 'load', LEAP.hc_date._init);
}();
LEAP.hc_date.uiProcess = function(arg)
{
	var src = arg.e.srcElement;
	var ctf = src.getAttribute("ctf");
	var type = arg.e.type;
	var element = LEAP._match(src,LEAP.hc_date.d,'ct',999);
	if(!element)
		return;
	
	if(type=="click" && (ctf=="hc_dateinput" || ctf=="hc_dateframe" || ctf=="hc_dateicon"))
	{
		var options = element.getAttribute("data-options");
		var _options = options?JSON.parse(options):{};
		var hc_dateinput = LEAP.getElement("[ctf=hc_dateinput]",element);
		var v = hc_dateinput.value;
		if(v!=null && v!="")
			_options.value=v;
		var ui = LEAP.hc_date.initPicker(element,_options);
		LEAP.hc_date.show();
		PageSteps.setStep(ui.datepicker);
	}
}
LEAP.hc_date.createDom = function(str)
{
	if(typeof(str) !== "string")
	{
		if ((str instanceof Array) || (str[0] && str.length)) {
			return [].slice.call(str);
		} else {
			return [str];
		}
	}
	var create_dom_div = null;
	if(!create_dom_div)
		create_dom_div = document.createElement("div");
	create_dom_div.innerHTML=str;
	return [].slice.call(create_dom_div.childNodes);
}
LEAP.hc_date.initPicker = function(element,options)
{
	LEAP.hc_date.disposed = false;
	var _datepicker = LEAP.hc_date.createDom(LEAP.hc_date.domStr)[0];
	var stepel = PageSteps.getStep();
	if(stepel)
	{
		var index = parseInt(stepel.style.zIndex);
		index=index+3
		_datepicker.style.zIndex=index;
	}
	else
		_datepicker.style.zIndex=104;
	document.body.appendChild(_datepicker);
	LEAP.hc_picker.init(options,LEAP.getElements("[ctf=hc_datepicker_item]",_datepicker));
	var ui = {};
	ui.datepicker = _datepicker;
	ui.ok = LEAP.getElement("[ctf=hc_datepickersuer]",_datepicker);
	ui.cancel = LEAP.getElement("[ctf=hc_datepickerclear]",_datepicker);
	ui.titles = LEAP.getElements("[ctf=hc_datepicktitle]",_datepicker);
	ui.items = LEAP.getElements("[ctf=hc_datepicker_item]",_datepicker);
	ui.label = LEAP.getElement("[ctf=hc_datepickerlabel]",_datepicker);
	ui.today = LEAP.getElement("[ctf=hc_datepickertoday]",_datepicker);
	ui.y = LEAP.getElement("[data-id=picker-y]",_datepicker);
	ui.m = LEAP.getElement("[data-id=picker-m]",_datepicker);
	ui.d = LEAP.getElement("[data-id=picker-d]",_datepicker);
	ui.h = LEAP.getElement("[data-id=picker-h]",_datepicker);
	ui.i = LEAP.getElement("[data-id=picker-i]",_datepicker);
	LEAP.hc_date.ui=ui;
	ui.cancel.addEventListener("click",LEAP.hc_date.dispose,false);
	ui.ok.addEventListener("click",
		function(){
			LEAP.hc_date.ok(element);	
		}
	,false);
	ui.today.addEventListener("click",function(){
		LEAP.hc_date.setSelectedValue();
	},false);
	ui.y.addEventListener('change', function(e) {
		if (LEAP.hc_date.options.beginMonth || LEAP.hc_date.options.endMonth) {
			LEAP.hc_date._createMonth();
		} else {
			LEAP.hc_date._createDay();
		}
		LEAP.hc_date.setLableValue();
	}, false);
	ui.m.addEventListener('change', function(e) {
		LEAP.hc_date._createDay(); 
		LEAP.hc_date.setLableValue();
	}, false);
	ui.d.addEventListener('change', function(e) {
		if (LEAP.hc_date.options.beginMonth || LEAP.hc_date.options.endMonth) {
			LEAP.hc_date._createHours();
		}
		LEAP.hc_date.setLableValue();
	}, false);
	ui.h.addEventListener('change', function(e) {
		if (LEAP.hc_date.options.beginMonth || LEAP.hc_date.options.endMonth) {
			LEAP.hc_date._createMinutes();
		}
		LEAP.hc_date.setLableValue();
	}, false);
	//为了防止击穿
//	ui.datepicker.addEventListener("touchstart", function(event) {
//		event.preventDefault();
//	}, false);
//	ui.datepicker.addEventListener("touchmove", function(event) {
//		event.preventDefault();
//	}, false);
	ui.i.addEventListener('change',function(e){
		LEAP.hc_date.setLableValue();
	},false);
	LEAP.hc_date._create(options);
	LEAP.hc_date.showLabel();
	return ui;
}
LEAP.hc_date.showLabel = function()
{
	var ui = LEAP.hc_date.ui;
	var options = LEAP.hc_date.options;
	var type = options.type;
	var items = ui.items;
	var titles = ui.titles;
	if(type=="datetime")
	{
		for(var i=0;i<items.length;i++)
		{
			items[i].style.width="20%";
		}
		// ui.h.style.borderLeft="solid 1px #ccc";
		// LEAP.getElement("[data-id=title-h]",ui.datepicker).style.borderLeft="solid 1px #ccc";
	}
	else if(type=="date")
	{
		for(var i=0;i<items.length;i++)
		{
			items[i].style.width="33.3%";
			titles[i].style.width="33.3%";
		}
		ui.h.style.display="none";
		ui.i.style.display="none";
		LEAP.getElement("[data-id=title-h]",ui.datepicker).style.display="none";
		LEAP.getElement("[data-id=title-i]",ui.datepicker).style.display="none";
	}
	else if(type=="hour")
	{
		for(var i=0;i<items.length;i++)
		{
			items[i].style.width="25%";
			titles[i].style.width="25%";
		}
		ui.i.style.display="none";
		LEAP.getElement("[data-id=title-i]",ui.datepicker).style.display="none";
		ui.h.style.borderLeft="dotted 1px #ccc";
		LEAP.getElement("[data-id=title-h]",ui.datepicker).style.borderLeft="dotted 1px #ccc";
	}
	else if(type=="time")
	{
		for(var i=0;i<items.length;i++)
		{
			items[i].style.width="50%";
			titles[i].style.width="50%";
		}
		ui.y.style.display="none";
		ui.m.style.display="none";
		ui.d.style.display="none";
		LEAP.getElement("[data-id=title-y]",ui.datepicker).style.display="none";
		LEAP.getElement("[data-id=title-m]",ui.datepicker).style.display="none";
		LEAP.getElement("[data-id=title-d]",ui.datepicker).style.display="none";
	}
	else if(type=="month")
	{
		for(var i=0;i<items.length;i++)
		{
			items[i].style.width="50%";
			titles[i].style.width="50%";
		}
		ui.d.style.display="none";
		ui.h.style.display="none";
		ui.i.style.display="none";
		LEAP.getElement("[data-id=title-d]",ui.datepicker).style.display="none";
		LEAP.getElement("[data-id=title-h]",ui.datepicker).style.display="none";
		LEAP.getElement("[data-id=title-i]",ui.datepicker).style.display="none";
	}
}
LEAP.hc_date._create = function(options)
{
	options = options || {};
	options.labels = options.labels || ['年', '月', '日', '时', '分'];
	options.buttons = options.buttons || ['取消', '确定'];
	options.type = options.type || 'datetime';
	options.customData = options.customData || {};
	LEAP.hc_date.options = options;
	var now = new Date();
	var beginDate = options.beginDate;
	if (beginDate instanceof Date && !isNaN(beginDate.valueOf())) {
		options.beginYear = beginDate.getFullYear();
		options.beginMonth = beginDate.getMonth() + 1;
		options.beginDay = beginDate.getDate();
		options.beginHours = beginDate.getHours();
		options.beginMinutes = beginDate.getMinutes();
	}
	var endDate = options.endDate;
	if (endDate instanceof Date && !isNaN(endDate.valueOf())) {
		options.endYear = endDate.getFullYear();
		options.endMonth = endDate.getMonth() + 1;
		options.endDay = endDate.getDate();
		options.endHours = endDate.getHours();
		options.endMinutes = endDate.getMinutes();
	}
	options.beginYear = options.beginYear || (now.getFullYear() - 20);
	options.endYear = options.endYear || (now.getFullYear() + 20);
	var ui = LEAP.hc_date.ui;
	LEAP.hc_date._setLabels();
	LEAP.hc_date._setButtons();
	ui.datepicker.setAttribute('data-type', options.type);
	LEAP.hc_date._createYear();
	LEAP.hc_date._createMonth();
	LEAP.hc_date._createDay();
	LEAP.hc_date._createHours();
	LEAP.hc_date._createMinutes();
	LEAP.hc_date.setSelectedValue(options.value);
}
LEAP.hc_date._setLabels = function()
{
	var options = LEAP.hc_date.options;
	var ui = LEAP.hc_date.ui;
	for(var i=0;i<ui.titles.length;i++)
		ui.titles[i].innerText = options.labels[i];
}
LEAP.hc_date._setButtons = function()
{
	var options = LEAP.hc_date.options;
	var ui = LEAP.hc_date.ui;
	ui.cancel.children[0].innerText = options.buttons[0];
	ui.ok.children[0].innerText = options.buttons[1];
}
LEAP.hc_date._isBeginYear= function() {
	return LEAP.hc_date.options.beginYear === parseInt(LEAP.hc_picker.getSelectedValue(LEAP.hc_date.ui.y.picker));
}
LEAP.hc_date._isBeginMonth= function() {
	return LEAP.hc_date.options.beginMonth && LEAP.hc_date._isBeginYear() && LEAP.hc_date.options.beginMonth === parseInt(LEAP.hc_picker.getSelectedValue(LEAP.hc_date.ui.m.picker));
}
LEAP.hc_date._isBeginDay= function() {
	return LEAP.hc_date._isBeginMonth() && LEAP.hc_date.options.beginDay === parseInt(LEAP.hc_picker.getSelectedValue(LEAP.hc_date.ui.d.picker));
}
LEAP.hc_date._isBeginHours= function() {
	return LEAP.hc_date._isBeginDay() && LEAP.hc_date.options.beginHours === parseInt(LEAP.hc_picker.getSelectedValue(LEAP.hc_date.ui.h.picker));
}
LEAP.hc_date._isEndYear= function() {
	return LEAP.hc_date.options.endYear === parseInt(LEAP.hc_picker.getSelectedValue(LEAP.hc_date.ui.y.picker));
}
LEAP.hc_date._isEndMonth= function() {
	return LEAP.hc_date.options.endMonth && LEAP.hc_date._isEndYear() && LEAP.hc_date.options.endMonth === parseInt(LEAP.hc_picker.getSelectedValue(LEAP.hc_date.ui.m.picker));
}
LEAP.hc_date._isEndDay= function() {
	return LEAP.hc_date._isEndMonth() && LEAP.hc_date.options.endDay === parseInt(LEAP.hc_picker.getSelectedValue(LEAP.hc_date.ui.d.picker));
}
LEAP.hc_date._isEndHours= function() {
	return LEAP.hc_date._isEndDay() && LEAP.hc_date.options.endHours === parseInt(LEAP.hc_picker.getSelectedValue(LEAP.hc_date.ui.h.picker));
}
LEAP.hc_date._inArray= function(array, item) {
	for (var index in array) {
		var _item = array[index];
		if (_item === item) return true;
	}
	return false;
}
LEAP.hc_date.isLeapYear= function(year) {
	return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
}
LEAP.hc_date.getDayNum = function(year, month)
{
	if (LEAP.hc_date._inArray([1, 3, 5, 7, 8, 10, 12], month)) {
		return 31;
	} else if (LEAP.hc_date._inArray([4, 6, 9, 11], month)) {
		return 30;
	} else if (LEAP.hc_date.isLeapYear(year)) {
		return 29;
	} else {
		return 28;
	}
}
LEAP.hc_date._fill = function(num) {
	num = num.toString();
	if (num.length < 2) {
		num = 0 + num;
	}
	return num;
}
LEAP.hc_date._createYear = function(current)
{
	var options = LEAP.hc_date.options;
	var ui = LEAP.hc_date.ui;
	
	var yArray = [];
	if (options.customData.y) {
		yArray = options.customData.y;
	} else {
		var yBegin = options.beginYear;
		var yEnd = options.endYear;
		for (var y = yBegin; y <= yEnd; y++) {
			yArray.push({
				text: y + '',
				value: y
			});
		}
	}
	LEAP.hc_picker.setItems(ui.y.picker,yArray);
}
LEAP.hc_date._createMonth = function(current)
{
	var options = LEAP.hc_date.options;
	var ui = LEAP.hc_date.ui;

	var mArray = [];
	if (options.customData.m) {
		mArray = options.customData.m;
	} else {
		var m = options.beginMonth && LEAP.hc_date._isBeginYear() ? options.beginMonth : 1;
		var maxMonth = options.endMonth && LEAP.hc_date._isEndYear() ? options.endMonth : 12;
		for (; m <= maxMonth; m++) {
			var val = LEAP.hc_date._fill(m);
			mArray.push({
				text: val,
				value: val
			});
		}
	}
	LEAP.hc_picker.setItems(ui.m.picker,mArray);
}
LEAP.hc_date._createDay = function(current)
{
	var options = LEAP.hc_date.options;
	var ui = LEAP.hc_date.ui;

	var dArray = [];
	if (options.customData.d) {
		dArray = options.customData.d;
	} else {
		var d = LEAP.hc_date._isBeginMonth() ? options.beginDay : 1;
		var maxDay = LEAP.hc_date._isEndMonth() ? options.endDay : LEAP.hc_date.getDayNum(parseInt(LEAP.hc_picker.getSelectedValue(ui.y.picker)), parseInt(LEAP.hc_picker.getSelectedValue(ui.m.picker)));
		for (; d <= maxDay; d++) {
			var val = LEAP.hc_date._fill(d);
			dArray.push({
				text: val,
				value: val
			});
		}
	}
	LEAP.hc_picker.setItems(ui.d.picker,dArray);
	current = current || LEAP.hc_picker.getSelectedValue(ui.d.picker);
}
LEAP.hc_date._createHours = function(current)
{
	var options = LEAP.hc_date.options;
	var ui = LEAP.hc_date.ui;
	
	var hArray = [];
	if (options.customData.h) {
		hArray = options.customData.h;
	} else {
		var h = LEAP.hc_date._isBeginDay() ? options.beginHours : 0;
		var maxHours = LEAP.hc_date._isEndDay() ? options.endHours : 23;
		for (; h <= maxHours; h++) {
			var val = LEAP.hc_date._fill(h);
			hArray.push({
				text: val,
				value: val
			});
		}
	}
	LEAP.hc_picker.setItems(ui.h.picker,hArray);
}
LEAP.hc_date._createMinutes = function(current)
{
	var options = LEAP.hc_date.options;
	var ui = LEAP.hc_date.ui;

	var iArray = [];
	if (options.customData.i) {
		iArray = options.customData.i;
	} else {
		var i = LEAP.hc_date._isBeginHours() ? options.beginMinutes : 0;
		var maxMinutes = LEAP.hc_date._isEndHours() ? options.endMinutes : 59;
		for (; i <= maxMinutes; i++) {
			var val = LEAP.hc_date._fill(i);
			iArray.push({
				text: val,
				value: val
			});
		}
	}
	LEAP.hc_picker.setItems(ui.i.picker,iArray);
}
LEAP.hc_date.setLableValue = function()
{
	var ui = LEAP.hc_date.ui;
	ui.label.innerText=LEAP.hc_date.getSelected().text;
}
LEAP.hc_date.setSelectedValue = function(value)
{
	var ui = LEAP.hc_date.ui;
	var parsedValue = LEAP.hc_date._parseValue(value);
	LEAP.hc_picker.setSelectedValue(ui.y.picker,parsedValue.y, 0, function() {
		LEAP.hc_picker.setSelectedValue(ui.m.picker,parsedValue.m, 0, function() {
			LEAP.hc_picker.setSelectedValue(ui.d.picker,parsedValue.d, 0, function() {
				LEAP.hc_picker.setSelectedValue(ui.h.picker,parsedValue.h, 0, function() {
					LEAP.hc_picker.setSelectedValue(ui.i.picker,parsedValue.i, 0);
				});
			});
		});
	});
}
LEAP.hc_date.setValue = function(element,value)
{
	if(!value)
		return;
	var hc_dateinput = LEAP.getElement("[ctf=hc_dateinput]",element);
	if(hc_dateinput)
	{
		if(value.length>16)
			value = value.substring(0,16);
		hc_dateinput.value=value
		hc_dateinput["_value"]=value
	}
}
LEAP.hc_date.getValue = function(element)
{
	var hc_dateinput = LEAP.getElement("[ctf=hc_dateinput]",element);
	if(hc_dateinput)
	{
		var value = hc_dateinput["_value"];
		var options = element.getAttribute("data-options");
		var _options = options?JSON.parse(options):{};
		if(_options.type=="datetime")
		{
			if(value.length<19)
				value=value+":00";
		}
		return value;	
	}
	return null;
}
LEAP.hc_date._parseValue = function(value) {
	var rs = {};
	if (value) {
		var parts = value.replace(":", "-").replace(" ", "-").split("-");
		rs.y = parts[0];
		rs.m = parts[1];
		rs.d = parts[2];
		rs.h = parts[3];
		rs.i = parts[4];
	} else {
		var now = new Date();
		rs.y = now.getFullYear();
		rs.m = now.getMonth() + 1;
		rs.d = now.getDate();
		rs.h = now.getHours();
		rs.i = now.getMinutes();
	}
	return rs;
}
LEAP.hc_date.show = function()
{
	var ui = LEAP.hc_date.ui;
	LEAP.showMask(null,function(){
		LEAP.hc_date.dispose();
		LEAP.hideMask();
	});
	setTimeout(function(){
		LEAP.addCSS(ui.datepicker,"hc-popup-show");
	},1);
}
LEAP.hc_date.hide = function()
{
	if (LEAP.hc_date.disposed) return;
	var ui = LEAP.hc_date.ui;
	LEAP.removeCSS(ui.datepicker,"hc-popup-show")
	LEAP.hideMask();
}
LEAP.hc_date.dispose = function()
{
	LEAP.hc_date.hide();
	setTimeout(function() {
		LEAP.hc_date.ui.datepicker.parentNode.removeChild(LEAP.hc_date.ui.datepicker);
		LEAP.hc_date.ui=null;
		LEAP.hc_date.options=null;
		LEAP.hc_date.disposed = true;
	}, 300);
	PageSteps.removeStep();
}
LEAP.hc_date.ok = function(element)
{
	var res = LEAP.hc_date.getSelected();
	var hc_dateinput = LEAP.getElement("[ctf=hc_dateinput]",element);
	if(hc_dateinput)
	{
		hc_dateinput.value=res.text;
		hc_dateinput["_value"]=res.value;
	}
	LEAP.hc_date.dispose();
}
LEAP.hc_date.getSelected = function()
{
	var self = LEAP.hc_date;
	var ui = self.ui;
	var type = self.options.type;
	var selected = {
		type: type,
		y: LEAP.hc_picker.getSelectedItem(ui.y.picker),
		m: LEAP.hc_picker.getSelectedItem(ui.m.picker),
		d: LEAP.hc_picker.getSelectedItem(ui.d.picker),
		h: LEAP.hc_picker.getSelectedItem(ui.h.picker),
		i: LEAP.hc_picker.getSelectedItem(ui.i.picker)
	};
	switch (type) {
		case 'datetime':
			selected.value = selected.y.value + '-' + selected.m.value + '-' + selected.d.value + ' ' + selected.h.value + ':' + selected.i.value;
			selected.text = selected.y.text + '-' + selected.m.text + '-' + selected.d.text + ' ' + selected.h.text + ':' + selected.i.text;
			break;
		case 'date':
			selected.value = selected.y.value + '-' + selected.m.value + '-' + selected.d.value;
			selected.text = selected.y.text + '-' + selected.m.text + '-' + selected.d.text;
			break;
		case 'time':
			selected.value = selected.h.value + ':' + selected.i.value;
			selected.text = selected.h.text + ':' + selected.i.text;
			break;
		case 'month':
			selected.value = selected.y.value + '-' + selected.m.value;
			selected.text = selected.y.text + '-' + selected.m.text;
			break;
		case 'hour':
			selected.value = selected.y.value + '-' + selected.m.value + '-' + selected.d.value + ' ' + selected.h.value;
			selected.text = selected.y.text + '-' + selected.m.text + '-' + selected.d.text + ' ' + selected.h.text;
			break;
	}
	return selected;
}

LEAP.hc_dialog={};
LEAP.hc_dialog.d="hc_dialog";
LEAP.hc_dialog.confirmstr = '<div class="hc-dialog @class" ct="hc_dialog">'+
	    '<div class="hc-dialog-head">'+
	      '<h2 class="hc-dialog-title" ctf="hc_dialogtitle">@title</h2>'+
	    '</div>'+
	    '<div class="hc-dialog-body">'+
	      '<p ctf="hc_dialogcontent">@content</p>'+
	    '</div>'+
	    '<ul class="hc-dialog-handle" ctf="hc_dialogbtns">'+
	      '<!--@dialogbtns@-->'+
	    '</ul>'+
	  '</div>';
LEAP.hc_dialog.toaststr = '<div class="@class hc-toast-show" ct="hc_dialog">'+
	      '<span class="hc-toast-icon"></span>'+
	      '<span class="hc-toast-label">@content</span>'+
	    '</div>';
LEAP.hc_dialog.btnstr = '<li class="hc-dialog-handle-item" ctf="hc_dialogli" index="@index">'+
	      	'<button class="hc-button hc-button-conner @class hc-button-full" ctf="hc_dialogbtn">'+
			  '<span class="hc-button-label" ctf="hc_dialogbtn">@showname</span>'+
			'</button>'+
	      '</li>';
LEAP.hc_dialog.ui = null;
LEAP.hc_dialog.toastui = null;
LEAP.hc_dialog.alert = function(message,title,showtype)
{
	var classname = "hc-dialog-fade";
	if(showtype=="2")
		classname="hc-dialog-zoom";
	if(showtype=="3")
		classname="hc-dialog-slide-top";
	if(showtype=="4")
		classname="hc-dialog-slide-down";
	if(showtype=="5")
		classname="hc-dialog-slide-left";
	if(showtype=="6")
		classname="hc-dialog-slide-right";
	LEAP.hc_dialog.disposed=false;
	var tempdiv = document.createElement("div");
	var btnstr = LEAP.hc_dialog.btnstr.replace("@index","btn"+0).replace("@class","hc-button-primary").replace("@showname","确定");
	if(title==null)
		title="提示";
	var alertstr = LEAP.hc_dialog.confirmstr.replace("@class",classname).replace("@title",title).replace("@content",message).replace("<!--@dialogbtns@-->",btnstr);
	tempdiv.innerHTML=alertstr;
	var alertel = tempdiv.children[0];
	var ui={};
	ui.el=alertel;
	LEAP.hc_dialog.ui=ui;
	document.body.appendChild(alertel);
	LEAP.hc_dialog.show();
	var args = {};
	args.type="alert";
	LEAP.addEvent(alertel,'click',LEAP.hc_dialog.uiProcess,args,null,true);
}
LEAP.hc_dialog.confirm = function(message,title,callback,domain,btnArray,showtype)
{
	var classname = "hc-dialog-fade";
	if(showtype=="2")
		classname="hc-dialog-zoom";
	if(showtype=="3")
		classname="hc-dialog-slide-top";
	if(showtype=="4")
		classname="hc-dialog-slide-down";
	if(showtype=="5")
		classname="hc-dialog-slide-left";
	if(showtype=="6")
		classname="hc-dialog-slide-right";
	LEAP.hc_dialog.disposed=false;
	var tempdiv = document.createElement("div");
	if(btnArray==null)
		btnArray=[{showname:'取消',showstyle:"hc-button-info"},{showname:'确定',showstyle:"hc-button-primary"}];
	var sb = new StringBuffer();
	for(var i=0;i<btnArray.length;i++)
	{
		var str = null;
		str = LEAP.hc_dialog.btnstr.replace("@index","btn"+i).replace("@class",btnArray[i].showstyle).replace("@showname",btnArray[i].showname);
		sb.append(str);
	}
	if(title==null)
		title="提示";
	var confirmstr = LEAP.hc_dialog.confirmstr.replace("@class",classname).replace("@title",title).replace("@content",message).replace("<!--@dialogbtns@-->",sb.toString());
	tempdiv.innerHTML=confirmstr;
	var confirmel = tempdiv.children[0];
	var ui={};
	ui.el=confirmel;
	LEAP.hc_dialog.ui=ui;
	document.body.appendChild(confirmel);
	LEAP.hc_dialog.show();
	//点击事件注册
	var args = {};
	args.callback = callback;
	args.domain = domain;
	args.type="confirm";
	LEAP.addEvent(confirmel,'click',LEAP.hc_dialog.uiProcess,args,null,true);
}
LEAP.hc_dialog.toast = function(message,showtype,stoptime)
{
	var classname=null;
	if(showtype==null)
		classname="hc-toast-reverse";
	else if(showtype=="up")
		classname="hc-toast-reverse";
	else if(showtype=="down")
		classname="hc-toast";
	if(LEAP.hc_dialog.toastui!=null)
	{
		if(LEAP.hc_dialog.toastui.el!=null)
		{
			clearTimeout(LEAP.hc_dialog.toastui.showid);
			clearTimeout(LEAP.hc_dialog.toastui.disposeid);
			LEAP.hc_dialog.toastdispose1();
		}
	}
	LEAP.hc_dialog.toastdisposed=false;
	var tempdiv = document.createElement("div");
	tempdiv.innerHTML=LEAP.hc_dialog.toaststr.replace("@content",message).replace("@class",classname);
	var toastel = tempdiv.children[0];
	var ui={};
	ui.el=toastel;
	document.body.appendChild(toastel);
	ui.showid = setTimeout(function(){
		LEAP.addCSS(ui.el,"hc-dialog-show");
	},0);
	if(stoptime==null)
		stoptime=3000;
	ui.disposeid = setTimeout(function(){
		LEAP.hc_dialog.toastdispose();
	},stoptime);
	LEAP.hc_dialog.toastui = ui;
}

LEAP.hc_dialog.show = function()
{
	var ui = LEAP.hc_dialog.ui;
	LEAP.showMask(null,function(){
		LEAP.hc_dialog.dispose();
		LEAP.hideMask();
	});
	var stepel = PageSteps.getStep();
	if(stepel)
	{
		var index = parseInt(stepel.style.zIndex);
		index=index+3
		ui.el.style.zIndex=index;
	}
	else
		ui.el.style.zIndex=104;
	setTimeout(function(){
		LEAP.addCSS(ui.el,"hc-dialog-show");
	},1);
	PageSteps.setStep(ui.el);
}
LEAP.hc_dialog.hide = function()
{
	if (LEAP.hc_dialog.disposed) return;
	var ui = LEAP.hc_dialog.ui;
	LEAP.removeCSS(ui.el,"hc-dialog-show")
	LEAP.hideMask();
}
LEAP.hc_dialog.dispose = function()
{
	LEAP.hc_dialog.hide();
	setTimeout(function() {
		if(LEAP.hc_dialog.ui!=null)
		{
			LEAP.hc_dialog.ui.el.parentNode.removeChild(LEAP.hc_dialog.ui.el);
			LEAP.hc_dialog.ui=null;
			LEAP.hc_dialog.disposed = true;	
		}
	}, 300);
	PageSteps.removeStep();
}

LEAP.hc_dialog.toasthide = function()
{
	if (LEAP.hc_dialog.toastdisposed) return;
	var ui = LEAP.hc_dialog.toastui;
	LEAP.removeCSS(ui.el,"hc-dialog-show")
	LEAP.hideMask();
}
LEAP.hc_dialog.toastdispose = function()
{
	LEAP.hc_dialog.toasthide();
	setTimeout(function() {
		if(LEAP.hc_dialog.toastui!=null)
		{
			LEAP.hc_dialog.toastui.el.parentNode.removeChild(LEAP.hc_dialog.toastui.el);
			LEAP.hc_dialog.toastui=null;
			LEAP.hc_dialog.toastdisposed = true;	
		}
	}, 300);
}

LEAP.hc_dialog.toastdispose1 = function()
{
	LEAP.hc_dialog.toasthide();
	if(LEAP.hc_dialog.toastui!=null)
	{
		LEAP.hc_dialog.toastui.el.parentNode.removeChild(LEAP.hc_dialog.toastui.el);
		LEAP.hc_dialog.toastui=null;
		LEAP.hc_dialog.toastdisposed = true;	
	}
}
LEAP.hc_dialog.uiProcess = function(arg)
{
	var src = arg.e.srcElement;
	var type = arg.e.type;
	var args = arg.arg;
	var ctf = src.getAttribute("ctf");
	var element = LEAP._match(src,LEAP.hc_dialog.d,'ct',99);
	if(!element)
		return;
	if(type=="click")
	{
		if(ctf=="hc_dialogbtn")
		{
			if(args.type=="confirm")
			{
				var callback = args.callback;
				var domain = args.domain;
				if(domain==null)
					domain=window;
				var hc_dialogli = LEAP._match(src,"hc_dialogli",'ctf',99);
				var index = hc_dialogli.getAttribute("index");
				callback.apply(domain,[index]);
				LEAP.hc_dialog.dispose();
			}
			else if(args.type=="alert")
				LEAP.hc_dialog.dispose();
		}
	}
}
LEAP.hc_form={};
LEAP.hc_form.d="hc_form";
LEAP.hc_form.z = 101;
LEAP.hc_form.head = '<div class="hc-headerbar">'+
		      '<div class="hc-headerbar-back" ctf="hc_formback">'+
		        '<span class="hc-icon hc-iconfont hc-icon-back" ctf="hc_formback"></span>'+
		      '</div>'+
		      '<h1 class="hc-headerbar-title">@text</h1>'+
		      '<div class="hc-headerbar-menu"></div>'+
		    '</div>';
LEAP.hc_form._init = function()
{
	LEAP.addEvent(document.body,'click',LEAP.hc_form.uiProcess,null,null,true);
}
LEAP.hc_form.init = function()
{
	if (document != null && document.body != null)
		LEAP.hc_form._init();
	else
		UIEventManager.addEvent(window, 'load', LEAP.hc_form._init)
}();
LEAP.hc_form.uiProcess = function(arg)
{
	var src = arg.e.srcElement;
	var type = arg.e.type;
	var ctf = src.getAttribute("ctf");
	var element = LEAP._match(src,LEAP.hc_form.d,'ct',99);
	if(!element)
		return;
	if(type=="click")
	{
		if(ctf=="hc_formback")
		{
			LEAP.hc_form.hide(element);
		}
	}
}
LEAP.hc_form.create3 = function(def)
{
	var n = def.path;
	if (n == null)
		n = def.name;

	return LEAP.hc_form.create(n, def.title, def.width, def.height, def.x, def.y, def.autohide, def.hidemsg, def.autodispose, def.distributeFlag, def.initShow, def.showMode, def.icon, def.moduleLoadArg, def.pageMode, def.moduleParameter, def.authority, def.formtype, def.module,def.isfillet,def.isMiddle);
}
LEAP.hc_form.create = function(path, title, width, height, x, y, autohide, hidemsg, autodispose, distributeFlag, initShow, showMode, icon, moduleLoadArg, pageMode, moduleParameter, authority, formtype, module,isfillet,isMiddle)
{
	var formdiv = document.createElement("div");
	formdiv.setAttribute("ct","hc_form");
	formdiv.className="hc-popup hc-popup-right";
	if(isfillet=="1")
		LEAP.addCSS(formdiv,"hc-popup-radius");
	if(width!=null)
	{
		if(width.indexOf("%")>-1 || width.indexOf("px")>-1)
			formdiv.style.width=width;
		else
			formdiv.style.width=width+"px";	
	}
	
	if(height!=null)
	{
		if(height.indexOf("%")>-1 || height.indexOf("px")>-1)
			formdiv.style.height=height;
		else
			formdiv.style.height=height+"px";
	}
	
	
	if(x!=null)
	{
		if(x.indexOf("%")>-1 || x.indexOf("px")>-1)
			formdiv.style.right=x;
		else
			formdiv.style.right=x+"px";
	}
	
	if(y!=null)
	{
		if(y.indexOf("%")>-1 || y.indexOf("px")>-1)
			formdiv.style.top=y;
		else
			formdiv.style.top=y+"px";
	}
	if(isMiddle=="1")
	{
		if(width!=null && height!=null)
		{
			var mw = window.innerWidth;
			var mh = window.innerHeight;
			var w = 0;
			var h = 0;
			var right=0;
			var top = 0;
			if(width.indexOf("%")>-1)
				right = (mw-(mw*(LEAP.tonum(width.replace("%",""))/100)))/2;
			else if(width.indexOf("px")>-1)
				right = (mw-LEAP.tonum(width.replace("px","")))/2
			else
				right = (mw-LEAP.tonum(width))/2
			if(height.indexOf("%")>-1)
				top = (mh-(mh*(LEAP.tonum(height.replace("%",""))/100)))/2;
			else if(height.indexOf("px")>-1)
				top = (mh-LEAP.tonum(height.replace("px","")))/2
			else
				top = (mh-LEAP.tonum(height))/2
			formdiv.style.right=right+"px";
			formdiv.style.top=top+"px";
		}
	}
	var contentEl = null;
	if(formtype=="3")
	{
		var tempdiv = document.createElement("div");
		if(title==null)
			title="标题";
		tempdiv.innerHTML=LEAP.hc_form.head.replace("@text",title);
		formdiv.appendChild(tempdiv.children[0]);
		var contentdiv = document.createElement("div");
		contentdiv.className="hc-popup-view"
		formdiv.appendChild(contentdiv);
		contentEl=contentdiv;
	}
	else
	{
		var contentdiv = document.createElement("div");
		contentdiv.className="hc-popup-view";
		formdiv.appendChild(contentdiv);
		contentEl=contentdiv;
	}
	document.body.appendChild(formdiv);
	var maskindex = LEAP.showMask();
	if(maskindex!=null)
	{
		maskindex++;
		contentEl.style.zIndex=maskindex;
		formdiv.style.zIndex=maskindex;
	}
	else
	{
		var stepel = PageSteps.getStep();
		if(stepel)
		{
			var index = parseInt(stepel.style.zIndex);
			index++
			formdiv.style.zIndex=index;
		}
		else
			formdiv.style.zIndex=LEAP.hc_form.z;
	}
	
		
	var uid = UUID.cID();
	formdiv.setAttribute("instance",uid);
	var def = {name:path,parent:contentEl,pageMode:pageMode,moduleLoadArg:moduleLoadArg};
	var module = LEAP.loadModule2(def);
	var ret = {};
	ret.form = "[instance=" + uid + "]";
	ret.module = module;
	
	if (ret.module.pageLoad != null)
	{
		ret.module.form = ret.form;
	}
	ret.show = function()
	{
		LEAP.hc_form.show(formdiv);
	}
	ret.hide = function()
	{
		LEAP.hc_form.hide(formdiv);
	}
	PageSteps.setStep(formdiv);
	
	return ret;
}
LEAP.hc_form.show = function(element)
{
	if(element)
	{
		setTimeout(function(){LEAP.addCSS(element,"hc-popup-show");},1);	
	}
	
}
LEAP.hc_form.hide = function(element)
{
	if(element)
	{
		if(typeof(element)=="string")
			element = LEAP.getElement(element);
		LEAP.removeCSS(element,"hc-popup-show");
		LEAP.hideMask();
		setTimeout(function(){document.body.removeChild(element);},300);
		PageSteps.removeStep();
	}
}

LEAP.hc_grid = {};
LEAP.hc_grid.d="hc_grid";
LEAP.hc_grid._init = function()
{
	LEAP.addEvent(document.body,'click',LEAP.hc_grid.uiProcess,null,null,true);
	UIEventManager.removeEvent(window, 'load', LEAP.hc_grid._init);
}
LEAP.hc_grid.init = function()
{
	if (document != null && document.body != null)
		LEAP.hc_grid._init();
	else
		UIEventManager.addEvent(window, 'load', LEAP.hc_grid._init);
	ElementEventManager.addManagedEventType(LEAP.hc_grid.d, 'itemClick');
}();
LEAP.hc_grid.uiProcess = function(arg)
{
	var src = arg.e.srcElement;
	var ctf = src.getAttribute("ctf");
	var ctfe = src.getAttribute("ctfe");
	var type = arg.e.type;
	var element = LEAP._match(src,LEAP.hc_grid.d,'ct',999);
	if(!element)
		return;
	if(type=="click")
	{
		if(ctfe=="hc_gridclick")
		{
			var item = null;
			if(ctf=="hc_griditem")
				item=src;
			else
				item = LEAP._match(src,"hc_griditem",'ctf',10);
				
			ElementEventManager.handleEvent(element, 'itemClick',
			{
				element	: element,
				data : item["_data"]
			});
		}
	}
}
LEAP.hc_grid.addItems = function(element,datas)
{
	if(!element)
		return;
	if(!datas)
		return;
	for(var i=0;i<datas.length;i++)
	{
		LEAP.hc_grid.addItem(element,datas[i]);
	}	
}
LEAP.hc_grid.addItem = function(element,data)
{
	if(!element)
		return;
	if(element["_itemstr"]==null)
	{
		var hclistitem = LEAP.getElement("[ctf=hc_griditem]",element);
		element["_itemstr"]=hclistitem.outerHTML;
		element.removeChild(hclistitem);	
	}
	var tempdiv = document.createElement("div");
	tempdiv.innerHTML = element["_itemstr"];
	var oldli = tempdiv.children[0];
	tempdiv=null;
	var index = element.children.length;
	var newli = oldli.cloneNode(true);
	if(newli!=null)
	{
		newli["_data"]=data;
		LEAP.hc_grid.setData(newli,data);
		element.appendChild(newli);
	}
}
LEAP.hc_grid.setData = function(item,data)
{
	var mds = LEAP.getElements("[md]",item);
	for(var i=0;i<mds.length;i++)
	{
		var md = mds[i].getAttribute("md");
		var bt = mds[i].getAttribute("bt");
		var hdef = null;
		hdef = LEAP.getBindDef(mds[i]);
		var str =
				LEAP.getBindValue(hdef, data[md], data, LEAP.hc_list.d);
		var codev = mds[i].getAttribute("codev");
		if(codev)
		{
			codev = JSON.parse(codev);
			if(data[md]!=null)
			{
				 var cv = LEAP.hc_grid.getClassName(codev,data[md]);
				 if(cv!=null)
				 {
				 	if(cv.cn!=null)
				 	{
				 		if(mds[i].parentElement.tagName=="BUTTON")
						 	LEAP.addCSS(mds[i].parentElement,cv.cn);
						 else
						 	LEAP.addCSS(mds[i],cv.cn);	
				 	}
				 	if(cv.text!=null)
				 		str = cv.text;
				 }
			}
		}
		if(bt=="text")
			mds[i].innerHTML=str;
		else if(bt=="img")
		{
			if(str.indexOf("http://")>-1 || str.indexOf("https://")>-1)
				mds[i].src=str;
			else
				mds[i].src=leapconfig.server+str;
		}
			
	}
}
LEAP.hc_grid.getClassName = function(codevs,value)
{
	var codev=null;
	for(var i=0;i<codevs.length;i++)
	{
		if(codevs[i].id==value)
		{
			codev = codevs[i];
			break;
		}
	}
	return codev;
}
LEAP.hc_input={};
LEAP.hc_input.onsetValue = function(src)
{
	var module = LEAP.getLoadedModule(src.getAttribute(commfields.instance));
	if(module!=null)
	{
		if(module.pageMode=="view")
		{
			src.setAttribute("readonly",true);
		}
	}
}
LEAP.hc_list = {};
LEAP.hc_list.d = "hc_list";
LEAP.hc_list.m = "_searchMethod";
LEAP.hc_list.md = LEAP.hc_list.m + "d";
LEAP.hc_list._datas = "_datas";
LEAP.hc_list._init = function()
{
	LEAP.addEvent(document.body,'click',LEAP.hc_list.uiProcess,null,null,true);
	UIEventManager.removeEvent(window, 'load', LEAP.hc_list._init);
}
LEAP.hc_list.init = function()
{
	if (document != null && document.body != null)
		LEAP.hc_list._init();
	else
		UIEventManager.addEvent(window, 'load', LEAP.hc_list._init);
	ElementEventManager.addManagedEventType(LEAP.hc_list.d, 'selectedIndexChange');
	ElementEventManager.addManagedEventType(LEAP.hc_list.d, 'dataLoaded');
}();
LEAP.hc_list.uiProcess = function(arg)
{
	var src = arg.e.srcElement;
	var type = arg.e.type;
	var ctf = src.getAttribute("ctf");
	var ctfe = src.getAttribute("ctfe");
	var element = LEAP._match(src,LEAP.hc_list.d,'ct',999);
	if(!element)
		return;
	if(type=="click")
	{
		var listitem = LEAP._match(src,"hc_listitem","ctf",20);
		if(ctf=="hc_listoperation")
		{
			LEAP.addCSS(listitem,"hc-list-handle-show");
		}
		else if(ctf=="hc_listhandle")
		{
			LEAP.removeCSS(listitem,"hc-list-handle-show",false);
		}
		else if(ctfe=="hc_listclick")
		{
			var utf = null;
			var opbutton = LEAP._match(src,"hc_listoperationbutton","ctf",2);
			if(opbutton)
			{
				utf = opbutton.getAttribute("utf");
				LEAP.removeCSS(listitem,"hc-list-handle-show",false);
			}
			var index = listitem.getAttribute("itemindex");
			element.setAttribute("selectIndex",index);
			var data = element[LEAP.hc_list._datas][parseInt(index)];
			ElementEventManager.handleEvent(element, 'selectedIndexChange',
			{
				element			: element,
				index			: index,
				data			: data,
				type			: utf
			});
		}
	}
}
LEAP.hc_list.loadData = function(element,type)
{
	if(type=="pullUp")
	{
		var pageNum = parseInt(element["_pageNum"]);
		var pageSize = parseInt(element["_pageSize"]);
		pageNum = pageNum+1;
		LEAP.hc_list.gotoPage(element,pageNum);
	}
	else if(type=="pullDown")
	{
		LEAP.hc_list.clearRow(element);
		element[LEAP.hc_list._datas]=null;
		LEAP.hc_list.gotoPage(element,1);
	}
}
LEAP.hc_list.setValue = function(element,datas)
{
	var hc_scroller = LEAP._match(element,"hc_scroller",'ctf',5);
	if(!datas)
	{
		if(!element["_itemstr"])
		{
			var hclistitem = LEAP.getElement("[ctf=hc_listitem]",element);
			element["_itemstr"]=hclistitem.outerHTML;
			element.removeChild(hclistitem);	
		}
		if(element["_pageNum1"]==null || element["_pageNum1"]==1)
		{
			var wrapper = LEAP._match(element,"hc_wrapper",'ctf',5);
			var w = null;
			var h = null;
			var pel = null;
			var bl = 0.73;
			if(wrapper!=null)
			{
				w = wrapper.clientWidth;
				h = wrapper.clientHeight;
				pel=LEAP.getElement("[ctf=hc_scroller]",wrapper);
			}
			else
			{
				w = element.parentElement.clientWidth;
				h = element.parentElement.clientHeight;
				pel = element.parentElement;
			}
			if(LEAP.getElement("[ctf=hc_list_notdata]",pel)==null)
			{
				var img = document.createElement("img");
				img.style.width=(w*bl)+"px";
				img.style.height=(h*bl)+"px"
				img.style.marginLeft=((w-(w*bl))/2)+"px";
				img.style.marginTop=((h-(h*bl))/2)+"px";
				img.setAttribute("ctf","hc_list_notdata")
				img.src=leapconfig.server+"LEAP/HC/hcimages/HC_list/notdata.png";
				pel.appendChild(img);
			}
		}
		if(hc_scroller!=null)
			LEAP.hc_scroll.load(element,LEAP.hc_list.loadData,null,false);
		return;
	}
	if (datas)
	{
		if (datas.leapclient_isasyn)
		{
			if(hc_scroller!=null)
				LEAP.hc_scroll.load(element,LEAP.hc_list.loadData,null,false);
			return;
		}
	}
	if(LEAP.getElement("[ctf=hc_list_notdata]",element.parentElement)!=null)
		element.parentElement.removeChild(LEAP.getElement("[ctf=hc_list_notdata]",element.parentElement));
	if(!element["_itemstr"])
	{
		var hclistitem = LEAP.getElement("[ctf=hc_listitem]",element);
		element["_itemstr"]=hclistitem.outerHTML;
		element.removeChild(hclistitem);	
	}
	datas = LEAP.convertResult(datas);
	element["__loadrows"]= new Array();
	element["__loaddatas"] = new Array();
	for(var i=0;i<datas.length;i++)
	{
		LEAP.hc_list.addRow(element,datas[i]);
	}
	if(hc_scroller!=null)
		LEAP.hc_scroll.load(element,LEAP.hc_list.loadData,null,true);
}
LEAP.hc_list.addRow = function(element,rowdata)
{
	if(element["_itemstr"]==null)
	{
		var hclistitem = LEAP.getElement("[ctf=hc_listitem]",element);
		element["_itemstr"]=hclistitem.outerHTML;
		element.removeChild(hclistitem);	
	}
	var tempdiv = document.createElement("div");
	tempdiv.innerHTML = element["_itemstr"];
	var oldli = tempdiv.children[0];
	tempdiv=null;
	var index = element.children.length;
	var newli = oldli.cloneNode(true);
	if(newli)
	{
		var listnum = LEAP.getElement("[ctf=hc_listnum]",newli);
		if(listnum!=null)
			listnum.innerHTML=index+1;
		newli.setAttribute("itemindex",index);
		LEAP.hc_list.setData(newli,rowdata);
		element.appendChild(newli);
		if(element["__loadrows"]==null)
			element["__loadrows"]= new Array();
		if(element["__loaddatas"]==null)
			element["__loaddatas"] = new Array();
		element["__loadrows"].add(newli);
		element["__loaddatas"].add(rowdata);
	}
	if(!element[LEAP.hc_list._datas])
		element[LEAP.hc_list._datas]=new Array();
	element[LEAP.hc_list._datas].add(rowdata);
}
LEAP.hc_list.setData = function(newli,rowdata)
{
	var mds = LEAP.getElements("[md]",newli);
	for(var i=0;i<mds.length;i++)
	{
		var md = mds[i].getAttribute("md");
		var bt = mds[i].getAttribute("bt");
		var hdef = null;
		hdef = LEAP.getBindDef(mds[i]);
		var str =
				LEAP.getBindValue(hdef, rowdata[md], rowdata, LEAP.hc_list.d);
		var codev = mds[i].getAttribute("codev");
		if(codev)
		{
			codev = JSON.parse(codev);
			if(rowdata[md]!=null)
			{
				 var cv = LEAP.hc_list.getClassName(codev,rowdata[md]);
				 if(cv!=null)
				 {
				 	if(cv.cn!=null)
				 	{
				 		if(mds[i].parentElement.tagName=="BUTTON")
						 	LEAP.addCSS(mds[i].parentElement,cv.cn);
						 else
						 	LEAP.addCSS(mds[i],cv.cn);	
				 	}
				 	if(cv.text!=null)
				 		str = cv.text;
				 }
			}
		}
		if(bt=="text")
			mds[i].innerHTML=str;
		else if(bt=="img")
		{
			if(str.indexOf("http://")>-1 || str.indexOf("https://")>-1)
				mds[i].src=str;
			else
				mds[i].src=leapconfig.server+str;
		}
			
	}
}
LEAP.hc_list.getClassName = function(codevs,value)
{
	var codev=null;
	for(var i=0;i<codevs.length;i++)
	{
		if(codevs[i].id==value)
		{
			codev = codevs[i];
			break;
		}
	}
	return codev;
}
LEAP.hc_list.clearRow = function(element)
{
	element.innerHTML="";
}
LEAP.hc_list.setSearchMethod = function(element, fn, domain)
{
	if (typeof(fn) != 'function')
		return;
	if (element == null)
		return;
	element[LEAP.hc_list.m] = fn;
	if (domain != null)
		element[LEAP.hc_list.md] = domain;
	else element[LEAP.hc_list.md] = this;
}
LEAP.hc_list.gotoPage = function(element,pageNum,resultset)
{
	LEAP.hc_list._gotoPage(element, pageNum, resultset);
}
LEAP.hc_list._gotoPage = function(element, gotopageNum, resultset)
{
	if (typeof(gotopageNum) != 'number' || gotopageNum < 1)
		return;
	if (element == null)
		return;
	var d = element[LEAP.hc_list.md];
	if (d == null)
		d = element;
	if (d != null && d.moduleDisposed)
		return;
	var pageSize = 6;
	var ps = element.getAttribute("pageSize");
	if(ps)
		pageSize = parseInt(ps);
	var autosize = element.getAttribute("autosize");
	var rowheight = element.getAttribute("rowheight");
	if(String.isEmpty(rowheight))
	{
		if(!element["_itemstr"])
		{
			var hclistitem = LEAP.getElement("[ctf=hc_listitem]",element);
			var h = hclistitem.clientHeight;
			rowheight=h;
			element.setAttribute("rowheight",rowheight);
		}	
	}
	
	
	if(!element["_pageSize"])
	{
		if(autosize && autosize=="1")
		{
			var wrapper = LEAP._match(element,"hc_wrapper",'ctf',5);
			var ch = wrapper.clientHeight;
			if(ch==0)
				ch = LEAP.tonum(element.getAttribute("maxheight"));
			var pstr = ch/parseInt(rowheight).toFixed(1);
			pstr=pstr+"";
			var pstrs = pstr.split(".");
			if(parseFloat("0."+pstrs[1])>0.5)
				pageSize = parseInt(pstrs[0])+1;
			else
				pageSize = parseInt(pstrs[0]);
		}
	}
	else
	{
		pageSize=element["_pageSize"];
	}
	
	var fn = element[LEAP.hc_list.m];
	if (fn == null)
		return;
	
	var result = null;
	if (resultset != null)
		result = resultset;
	else result = fn.call(d, element, gotopageNum, pageSize);
	if(result)
	{
		element["_pageSize"]=pageSize;
		element["_pageNum"]=gotopageNum;
		element["_pageNum1"]=gotopageNum;
	}
	else
		element["_pageNum1"]=gotopageNum;
	
	LEAP.hc_list.bindData(element, result);
	ElementEventManager.handleEvent(element, 'dataLoaded',
	{
		table	: element,
		loaditems : element["__loadrows"],
		loaddatas : element["__loaddatas"]
	});
}
LEAP.hc_list.bindData = function(element,data)
{
	LEAP.hc_list.setValue(element,data);
}
LEAP.hc_list.setIndexs = function(element)
{
	var childs = element.children;
	if(childs.length!=0)
	{
		var childNodes = [].slice.call(childs);
		childNodes.forEach(function(item,i){
			item.setAttribute("itemindex",i);
		})
	}
}
LEAP.hc_list.getSelectIndex = function(element)
{
	var selectIndex = element.getAttribute("selectIndex");
	return selectIndex;
}
LEAP.hc_list.removeRow = function(element,index)
{
	if(!index)
		index = parseInt(LEAP.hc_list.getSelectIndex(element));
	var liitem = element.children[index];
	if(liitem)
	{
		element.removeChild(liitem);
	}
	element[LEAP.hc_list._datas].removeindex(index);
	LEAP.hc_list.setIndexs(element);
	var hc_scroller = LEAP._match(element,"hc_scroller",'ctf',5);
	if(hc_scroller!=null)
		LEAP.hc_scroll.load(element,LEAP.hc_list.loadData,null,false,true);
}
LEAP.hc_list.updateRow = function(element,rowdata)
{
	var index = parseInt(LEAP.hc_list.getSelectIndex(element));
	var liitem = element.children[index];
	if(liitem)
	{
		LEAP.hc_list.setData(liitem,rowdata);
		element[LEAP.hc_list._datas].replace(index,rowdata);
	}
}
LEAP.hc_number = {};
LEAP.hc_number.d="hc_number";
LEAP.hc_number._init = function()
{
	LEAP.addEvent(document.body,'click',LEAP.hc_number.uiProcess,null,null,true);
	LEAP.addEvent(document.body,'touchstart',LEAP.hc_number.uiProcess,null,null,true);
	UIEventManager.removeEvent(window, 'load', LEAP.hc_number._init);
}
LEAP.hc_number.init = function()
{
	if (document != null && document.body != null)
		LEAP.hc_number._init();
	else
		UIEventManager.addEvent(window, 'load', LEAP.hc_number._init);
}();
LEAP.hc_number.uiProcess = function(arg)
{
	var src = arg.e.srcElement;
	var ctf = src.getAttribute("ctf");
	var type = arg.e.type;
	var element = LEAP._match(src,LEAP.hc_number.d,'ct',999);
	if(!element)
		return;
	if(type=="click")
	{
		LEAP.hc_number.startnumber(element,ctf);
	}
	else
	{
		if(type=="touchstart")
		{
			LEAP.addEvent(src,"touchend",LEAP.hc_number.uiProcess,null,null,true);
			element["_interval"]=setInterval(function(){
				LEAP.hc_number.startnumber(element,ctf);
			},150)
		}
		if(type=="touchend")
		{
			LEAP.removeEvent(src,"touchend",LEAP.hc_number.uiProcess,true);
			clearInterval(element["_interval"]);
		}
	}
}
LEAP.hc_number.startnumber = function(element,ctf)
{
	if(!element)
		return;
	if(ctf=="hc_number_subtract")
	{
		var value = null;
		var hc_number_value = LEAP.getElement("[ctf=hc_number_value]",element);
		if(String.isEmpty(hc_number_value.value))
			value = 1;
		else 
			value = hc_number_value.value;
		var v = parseInt(value)-1
		if(v<1)
			v=1;
		hc_number_value.value=v;
	}
	else if(ctf=="hc_number_add")
	{
		var value = null;
		var hc_number_value = LEAP.getElement("[ctf=hc_number_value]",element);
		if(String.isEmpty(hc_number_value.value))
			value = 1;
		else 
			value = hc_number_value.value;
		var v = parseInt(value)+1;
		hc_number_value.value=v;
	}
}
LEAP.hc_number.setValue = function(element,value)
{
	if(!element)
		return;
	var hc_number_value = LEAP.getElement("[ctf=hc_number_value]",element);
	if(value==null)
		value=1
	hc_number_value.value=value;
}
LEAP.hc_number.getValue = function(element)
{
	if(!element)
		return;
	var hc_number_value = LEAP.getElement("[ctf=hc_number_value]",element);
	var value = null;
	if(String.isEmpty(hc_number_value.value))
		value=1;
	else
		value=hc_number_value.value;
	return value;
}
LEAP.hc_panel={};
LEAP.hc_panel.d="hc_panel";
LEAP.hc_panel._init = function()
{
	LEAP.addEvent(document.body,'click',LEAP.hc_panel.uiProcess,null,null,true);
	UIEventManager.removeEvent(window, 'load', LEAP.hc_panel._init);
}
LEAP.hc_panel.init = function()
{
	if (document != null && document.body != null)
		LEAP.hc_panel._init();
	else
		UIEventManager.addEvent(window, 'load', LEAP.hc_panel._init);
}();
LEAP.hc_panel.uiProcess = function(arg)
{
	
}
LEAP.hc_panel.bindData = function(element,datas)
{
	
}

LEAP.hc_photograph={};
LEAP.hc_photograph.d="hc_photograph";
LEAP.hc_photograph.listr = '<li class="hc-photograph-item" ctf="hc_pgitem">'+
        '<div class="hc-photograph-cover">'+
          '<img src="@src" ctf="hc_pgimg">'+
        '</div>'+
      '</li>'
LEAP.hc_photograph._init = function()
{
	LEAP.addEvent(document.body,'click',LEAP.hc_photograph.uiProcess,null,null,true);
	UIEventManager.removeEvent(window, 'load', LEAP.hc_photograph._init);
}
LEAP.hc_photograph.initControl = function(wait,src)
{
	if (!src)
	{
		if (!event)
			return;
		src = event.srcElement;
	}
	if (!src)
		return;

	if (wait != null)
	{
		var fn = function()
		{
			LEAP.hc_photograph.initControl(null, src);
			src = null;
		};
		setTimeout(fn, wait);
		return;
	}
	var element = src.parentElement;
	if(!element)
		return;
	var pgcamera = LEAP.getElement("[ctf=hc_photograph_camera]",element);
	var options = element.getAttribute("data-options");
	var _options = options?JSON.parse(options):{};
	element["_options"]=_options;
	LEAP.addEvent(pgcamera,'change',LEAP.hc_photograph.uploadComplete,element);
}
LEAP.hc_photograph.init = function()
{
	if (document != null && document.body != null)
		LEAP.hc_photograph._init();
	else
		UIEventManager.addEvent(window, 'load', LEAP.hc_photograph._init);
}();
LEAP.hc_photograph.uploadComplete = function(arg)
{
	var element = arg.arg;
	var files = arg.e.target.files, file;
    if (files && files.length > 0) {
         file = files[0];
         try {                 
			var URL = window.URL || window.webkitURL;
			var blob = URL.createObjectURL(file);
			LEAP.hc_photograph.compressPicture(element,blob);
         }
         catch(e)
         {}
     }
}
LEAP.hc_photograph.compressPicture = function (element,blob) {
  var quality = 0.75, image = new Image();
  image.src = blob;
  image.onload = function () {
    var that = this;
    // 生成比例
    var width = that.width, height = that.height;
    width = width / 4;
    height = height / 4;
    // 生成canvas画板
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(that, 0, 0, width, height);
    var imgdata = canvas.toDataURL('image/jpeg', quality);
    if (navigator.userAgent.match(/iphone/i)) {
      var mpImg = new MegaPixImage(image);
      mpImg.render(canvas, {
        maxWidth: width,
        maxHeight: height,
        quality: quality
      });
      imgdata = canvas.toDataURL('image/jpeg', quality);
    }
    LEAP.hc_photograph.uploadPicture(element,imgdata);
  };
};
LEAP.hc_photograph.uploadPicture = function(element,imgdata)
{
	var uploadpath=null;
	var options = element["_options"];
	if(options!=null)
		uploadpath = options.uploadpath;
	var arg={};
	arg.element=element;
	LEAP.request2({
		name:"HC_uploadPicture",
		par:{uploadpath:uploadpath,bean:imgdata},
		callback:LEAP.hc_photograph.uploadPictureCallback,
		arg:arg
	})
}
LEAP.hc_photograph.uploadPictureCallback = function(ret,arg)
{
	var realpath = "LEAP/Download/"+ret.realpath;
	ret.realpath = realpath;
	var element=arg.element;
	var str = LEAP.hc_photograph.listr.replace("@src",leapconfig.server+realpath);
	var tempdiv = document.createElement("div");
	tempdiv.innerHTML=str;
	var boxEl = LEAP.getElement("[ctf=hc_photographbox]",element);
	var len = boxEl.children.length;
	var itemel = tempdiv.children[0];
	itemel["_bean"]=ret;
	boxEl.insertBefore(itemel,boxEl.children[len-1]);
}
LEAP.hc_photograph.setValue = function(element,value)
{
	if(!element)
		return;
	if(!value)
		return;
	value = JSON.parse(value);
	for(var i=0;i<value.length;i++)
	{
		var realpath = value[i].realpath;
		var str = LEAP.hc_photograph.listr.replace("@src",leapconfig.server+realpath);
		var tempdiv = document.createElement("div");
		tempdiv.innerHTML=str;
		var boxEl = LEAP.getElement("[ctf=hc_photographbox]",element);
		var len = boxEl.children.length;
		var itemel = tempdiv.children[0];
		itemel["_bean"]=value[i];
		boxEl.insertBefore(itemel,boxEl.children[len-1]);
	}
}
LEAP.hc_photograph.getValue = function(element)
{
	if(!element)
		return;
	var hc_pgitems = LEAP.getElements("[ctf=hc_pgitem]",element);
	var data = null;
	if(hc_pgitems!=null)
	{
		var paths = [];
		for(var i=0;i<hc_pgitems.length;i++)
		{
			var bean = hc_pgitems[i]["_bean"];
			bean.savepath = bean.savepath.replaceall("\\","/");
			paths.add(bean);
		}
		data = JSON.stringify(paths);
	}
	return data;
}
function CustomEvent(eventType, content) {
	content = content || {bubbles : !1,cancelable : !1,detail : void 0};
	var events = document.createEvent("Events"), d = !0;
	for (var e in content)
		"bubbles" === e ? d = !!content[e] : events[e] = content[e];
	return events.initEvent(eventType, d, !0), events;
}
LEAP.hc_picker = {};
LEAP.hc_picker.MAX_EXCEED = 30;
LEAP.hc_picker.VISIBLE_RANGE = 90;
LEAP.hc_picker.DEFAULT_ITEM_HEIGHT = 40;
LEAP.hc_picker.BLUR_WIDTH = 10;
var platform = navigator.platform.toLowerCase();
var userAgent = navigator.userAgent.toLowerCase();
LEAP.hc_picker.isIos = (userAgent.indexOf('iphone') > -1 ||
		userAgent.indexOf('ipad') > -1 ||
		userAgent.indexOf('ipod') > -1) &&
	(platform.indexOf('iphone') > -1 ||
		platform.indexOf('ipad') > -1 ||
		platform.indexOf('ipod') > -1);

LEAP.hc_picker.rad2deg = function(rad) {
	return rad / (Math.PI / 180);
}
LEAP.hc_picker.deg2rad = function(deg) {
	return deg * (Math.PI / 180);
}
LEAP.hc_picker.initPicker = function(item,options)
{
	var self = new Object();
	self.holder = item;
	self.options = options || {};
	LEAP.hc_picker.initItem(self);
	LEAP.hc_picker.initInertiaParams(self);
	LEAP.hc_picker.calcElementItemPostion(self,true);
	LEAP.hc_picker.bindEvent(self);
	return self;
}
LEAP.hc_picker.findElementItems = function(self)
{
	self.elementItems = [].slice.call(LEAP.getElements("[ctf=hc_picker_item_li]",self.holder));
	return self.elementItems;
}
LEAP.hc_picker.initItem = function(self)
{
	self.list = LEAP.getElement("[ctf=hc_picker_item_ul]",self.holder);
	LEAP.hc_picker.findElementItems(self);
	self.height = self.holder.offsetHeight;
	self.r = self.height/2 - LEAP.hc_picker.BLUR_WIDTH;
	self.d = self.r*2;
	
	self.itemHeight = self.elementItems.length > 0 ? self.elementItems[0].offsetHeight : LEAP.hc_picker.DEFAULT_ITEM_HEIGHT;
	self.itemAngle = parseInt(LEAP.hc_picker.calcAngle(self,self.itemHeight * 0.8));
	self.hightlightRange = self.itemAngle / 2;
	self.visibleRange = LEAP.hc_picker.VISIBLE_RANGE;
	self.beginAngle = 0;
	self.beginExceed = self.beginAngle - LEAP.hc_picker.MAX_EXCEED;
	self.list.angle = self.beginAngle;
	if (LEAP.hc_picker.isIos) {
		self.list.style.webkitTransformOrigin = "center center " + self.r + "px";
	}
}
LEAP.hc_picker.initInertiaParams = function(self) {
	self.lastMoveTime = 0;
	self.lastMoveStart = 0;
	self.stopInertiaMove = false;
}
LEAP.hc_picker.calcElementItemPostion = function(self,andGenerateItms) {
	if (andGenerateItms) {
		self.items = [];
	}
	self.elementItems.forEach(function(item) {
		var index = self.elementItems.indexOf(item);
		self.endAngle = self.itemAngle * index;
		item.angle = self.endAngle;
		item.style.webkitTransformOrigin = "center center -" + self.r + "px";
		item.style.webkitTransform = "translateZ(" + self.r + "px) rotateX(" + (-self.endAngle) + "deg)";
		if (andGenerateItms) {
			var dataItem = {};
			dataItem.text = item.innerHTML || '';
			dataItem.value = item.getAttribute('data-value') || dataItem.text;
			self.items.push(dataItem);
		}
	});
	self.endExceed = self.endAngle + LEAP.hc_picker.MAX_EXCEED;
	LEAP.hc_picker.calcElementItemVisibility(self,self.beginAngle);
}

LEAP.hc_picker.calcElementItemVisibility = function(self,angle) {
	self.elementItems.forEach(function(item) {
		var difference = Math.abs(item.angle - angle);
		if (difference < self.hightlightRange) {
			item.classList.add('hc-picker-list-visible');
			item.classList.add('hc-picker-list-highlight');
		} else if (difference < self.visibleRange) {
			item.classList.add('hc-picker-list-visible');
			item.classList.remove('hc-picker-list-highlight');
		} else {
			item.classList.remove('hc-picker-list-highlight');
			item.classList.remove('hc-picker-list-visible');
		}
	});
}
//绑定事件
LEAP.hc_picker.bindEvent = function(self)
{
	var lastAngle = 0;
	var startY = null;
	var isPicking = false;
	self.holder.addEventListener("touchstart", function(event) {
		isPicking = true;
		self.list.style.webkitTransition = '';
		startY = (event.changedTouches ? event.changedTouches[0] : event).pageY;
		lastAngle = self.list.angle;
		LEAP.hc_picker.updateInertiaParams(self,event, true);
	}, false);
	self.holder.addEventListener("touchend", function(event) {
		isPicking = false;
		LEAP.hc_picker.startInertiaScroll(self,event);
	}, false);
	self.holder.addEventListener("touchcancel", function(event) {
		isPicking = false;
		event.preventDefault();
		LEAP.hc_picker.startInertiaScroll(self,event);
	}, false);
	self.holder.addEventListener("touchmove", function(event) {
		if (!isPicking) {
			return;
		}
		event.preventDefault();
		var endY = (event.changedTouches ? event.changedTouches[0] : event).pageY;
		var dragRange = endY - startY;
		var dragAngle = LEAP.hc_picker.calcAngle(self,dragRange);
		var newAngle = dragRange > 0 ? lastAngle - dragAngle : lastAngle + dragAngle;
		if (newAngle > self.endExceed) {
			newAngle = self.endExceed
		}
		if (newAngle < self.beginExceed) {
			newAngle = self.beginExceed
		}
		LEAP.hc_picker.setAngle(self,newAngle);
		LEAP.hc_picker.updateInertiaParams(self,event);
	}, false);
	self.list.addEventListener('click', function(event) {
		var elementItem = event.target;
		if (elementItem.tagName == 'LI') {
			LEAP.hc_picker.setSelectedIndex(self,self.elementItems.indexOf(elementItem), 200);
		}
	}, false);
}
LEAP.hc_picker.updateInertiaParams = function(self,event, isStart) {
	var point = event.changedTouches ? event.changedTouches[0] : event;
	if (isStart) {
		self.lastMoveStart = point.pageY;
		self.lastMoveTime = event.timeStamp || Date.now();
		self.startAngle = self.list.angle;
	} else {
		var nowTime = event.timeStamp || Date.now();
		if (nowTime - self.lastMoveTime > 300) {
			self.lastMoveTime = nowTime;
			self.lastMoveStart = point.pageY;
		}
	}
	self.stopInertiaMove = true;
}
LEAP.hc_picker.setAngle = function(self,angle) {
	self.list.angle = angle;
	self.list.style.webkitTransform = "perspective(1000px) rotateY(0deg) rotateX(" + angle + "deg)";
	LEAP.hc_picker.calcElementItemVisibility(self,angle);
}
LEAP.hc_picker.startInertiaScroll = function(self,event) {
	var point = event.changedTouches ? event.changedTouches[0] : event;
	
	var nowTime = event.timeStamp || Date.now();
	var v = (point.pageY - self.lastMoveStart) / (nowTime - self.lastMoveTime); //最后一段时间手指划动速度  
	var dir = v > 0 ? -1 : 1; //加速度方向  
	var deceleration = dir * 0.0006 * -1;
	var duration = Math.abs(v / deceleration); // 速度消减至0所需时间  
	var dist = v * duration / 2; //最终移动多少 
	var startAngle = self.list.angle;
	var distAngle = LEAP.hc_picker.calcAngle(self,dist) * dir;
	//----
	var srcDistAngle = distAngle;
	if (startAngle + distAngle < self.beginExceed) {
		distAngle = self.beginExceed - startAngle;
		duration = duration * (distAngle / srcDistAngle) * 0.6;
	}
	if (startAngle + distAngle > self.endExceed) {
		distAngle = self.endExceed - startAngle;
		duration = duration * (distAngle / srcDistAngle) * 0.6;
	}
	//----
	if (distAngle == 0) {
		LEAP.hc_picker.endScroll(self);
		return;
	}
	LEAP.hc_picker.scrollDistAngle(self,nowTime, startAngle, distAngle, duration);
}

LEAP.hc_picker.endScroll = function(self) {
	if (self.list.angle < self.beginAngle) {
		self.list.style.webkitTransition = "150ms ease-out";
		LEAP.hc_picker.setAngle(self,self.beginAngle);
	} else if (self.list.angle > self.endAngle) {
		self.list.style.webkitTransition = "150ms ease-out";
		LEAP.hc_picker.setAngle(self,self.endAngle);
	} else {
		var index = parseInt((self.list.angle / self.itemAngle).toFixed(0));
		self.list.style.webkitTransition = "100ms ease-out";
		LEAP.hc_picker.setAngle(self,self.itemAngle * index);
	}
	LEAP.hc_picker.triggerChange(self);
}
LEAP.hc_picker.triggerChange = function(self,force) {
	setTimeout(function() {
		var index = LEAP.hc_picker.getSelectedIndex(self);
		var item = self.items[index];
		if (LEAP.hc_picker.trigger && (index != self.lastIndex || force === true)) {
			LEAP.hc_picker.trigger(self.holder, 'change', {"index": index,"item": item});
		}
		self.lastIndex = index;
		typeof force === 'function' && force();
	}, 0);
}
LEAP.hc_picker.getSelectedIndex = function(self) {
	return parseInt((self.list.angle / self.itemAngle).toFixed(0));
}
LEAP.hc_picker.setSelectedIndex = function(self,index, duration, callback) {
	self.list.style.webkitTransition = '';
	var angle = LEAP.hc_picker.correctAngle(self,self.itemAngle * index);
	if (duration && duration > 0) {
		var distAngle = angle - self.list.angle;
		LEAP.hc_picker.scrollDistAngle(self,Date.now(), self.list.angle, distAngle, duration);
	} else {
		LEAP.hc_picker.setAngle(self,angle);
	}
	LEAP.hc_picker.triggerChange(self,callback);
}
LEAP.hc_picker.correctAngle = function(self,angle) {
	if (angle < self.beginAngle) {
		return self.beginAngle;
	} else if (angle > self.endAngle) {
		return self.endAngle;
	} else {
		return angle;
	}
}
LEAP.hc_picker.trigger = function(item,eventtype,detail)
{
	return item.dispatchEvent(new CustomEvent(eventtype,{detail: detail,bubbles: !0,cancelable: !0}))
}
LEAP.hc_picker.calcAngle = function(self,c) {
	var a = b = parseFloat(self.r);
	c = Math.abs(c);
	var intDeg = parseInt(c / self.d) * 180;
	c = c % self.d;
	var cosC = (a * a + b * b - c * c) / (2 * a * b);
	var angleC = intDeg + LEAP.hc_picker.rad2deg(Math.acos(cosC));
	return angleC;
}
LEAP.hc_picker.scrollDistAngle = function(self,nowTime, startAngle, distAngle, duration) {
	self.stopInertiaMove = false;
	(function(nowTime, startAngle, distAngle, duration) {
		var frameInterval = 13;
		var stepCount = duration / frameInterval;
		var stepIndex = 0;
		(function inertiaMove() {
			if (self.stopInertiaMove) return;
			var newAngle = LEAP.hc_picker.quartEaseOut(stepIndex, startAngle, distAngle, stepCount);
			LEAP.hc_picker.setAngle(self,newAngle);
			stepIndex++;
			if (stepIndex > stepCount - 1 || newAngle < self.beginExceed || newAngle > self.endExceed) {
				LEAP.hc_picker.endScroll(self);
				return;
			}
			setTimeout(inertiaMove, frameInterval);
		})();
	})(nowTime, startAngle, distAngle, duration);
}
LEAP.hc_picker.setItems = function(self,items,type) {
	self.items = items || [];
	var buffer = [];
	self.items.forEach(function(item) {
		if (item !== null && item !== undefined) {
			buffer.push('<li ctf="hc_picker_item_li">' + (item.text || item) + '</li>');
		}
	});
	self.list.innerHTML = buffer.join('');
	LEAP.hc_picker.findElementItems(self);
	LEAP.hc_picker.calcElementItemPostion(self);
	LEAP.hc_picker.setAngle(self,LEAP.hc_picker.correctAngle(self,self.list.angle));
	if(type)
		LEAP.hc_picker.triggerChange(self,true);
}
LEAP.hc_picker.getItems = function(self) {
	return self.items;
}
LEAP.hc_picker.quartEaseOut = function(t, b, c, d) {
	return -c * ((t = t / d - 1) * t * t * t - 1) + b;
}

LEAP.hc_picker.getSelectedItem = function(self) {
	return self.items[LEAP.hc_picker.getSelectedIndex(self)];
}

LEAP.hc_picker.getSelectedValue = function(self) {
	return (self.items[LEAP.hc_picker.getSelectedIndex(self)] || {}).value;
}

LEAP.hc_picker.getSelectedText = function(self) {
	return (self.items[LEAP.hc_picker.getSelectedIndex(self)] || {}).text;
}

LEAP.hc_picker.setSelectedValue = function(self,value, duration, callback) {
	for (var index in self.items) {
		var item = self.items[index];
		if (item.value == value) {
			LEAP.hc_picker.setSelectedIndex(self,index, duration, callback);
			return;
		}
	}
}

//循环创建选择器
LEAP.hc_picker.eachItem = function(item,options)
{
	if(item.picker) return;
	if(options)
		item.picker = LEAP.hc_picker.initPicker(item,options);
	else
	{
		var optionsText = item.getAttribute("options");
		var _options = optionsText?JSON.parse(optionsText):{};
		item.picker = LEAP.hc_picker.initPicker(item,_options);
	}
}
//初始化选择器
LEAP.hc_picker.init = function(options,items)
{
	items.forEach(function(item){
		LEAP.hc_picker.eachItem(item,options);
	})
}

LEAP.hc_radio = {};
LEAP.hc_radio.d="hc_radio";
LEAP.hc_radio.itemstr = '<div class="hc-form-radio-button hc-conner hc-primary" ctf="hc_radioitem">'+
          '<input class="hc-form-core" type="radio" ctf="hc_radioinput" value="@value">'+
          '<span class="hc-form-frame" ctf="hc_radiocore">'+
            '<i class="hc-iconfont hc-icon-radio" ctf="hc_radiocore"></i>'+
          '</span>'+
          '<label class="hc-form-label" ctf="hc_radiolabel">@text</label>'+
        '</div>';
LEAP.hc_radio._init = function()
{
	LEAP.addEvent(document.body,'click',LEAP.hc_radio.uiProcess,null,null,true);
	UIEventManager.removeEvent(window, 'load', LEAP.hc_radio._init);
}
LEAP.hc_radio.init = function()
{
	if (document != null && document.body != null)
		LEAP.hc_radio._init();
	else
		UIEventManager.addEvent(window, 'load', LEAP.hc_radio._init);
}();
LEAP.hc_radio.uiProcess = function(arg)
{
	var src = arg.e.srcElement;
	var ctf = src.getAttribute("ctf");
	var type = arg.e.type;
	var element = LEAP._match(src,LEAP.hc_radio.d,'ct',999);
	if(!element)
		return;
	if(type=='click' &&　(ctf=="hc_radioitem" || ctf=="hc_radioinput" || ctf=="hc_radiocore" || ctf=="hc_radiolabel"))
	{
		var item = null;
		if(ctf=="hc_radioitem")
			item = src;
		else
			item = LEAP._match(src,"hc_radioitem",'ctf',5);
		var itemradioinput = LEAP.getElement("[ctf=hc_radioinput]",item);
		if(itemradioinput.getAttribute("checked")=="" || itemradioinput.getAttribute("checked")==true || itemradioinput.getAttribute("checked")=="true" || itemradioinput.getAttribute("checked")=="checked")
			return;
		var radioitems = LEAP.getElements("[ctf=hc_radioitem]",element);
		if(radioitems)
		{
			for(var i=0;i<radioitems.length;i++)
			{
				var hc_radioinput = LEAP.getElement("[ctf=hc_radioinput]",radioitems[i]);
				hc_radioinput.removeAttribute("checked"); 
			}
			LEAP.removeCSS(radioitems,"hc-form-radio-active",true);
		}
		itemradioinput.setAttribute("checked",true);
		LEAP.addCSS(item,"hc-form-radio-active");
		var hc_radiolabel = LEAP.getElement("[ctf=hc_radiolabel]",item);
		element["_value"]=itemradioinput.value;
		element["_text"]=hc_radiolabel.innerHTML;
	}
}
LEAP.hc_radio.addItem = function(element, name, value, checked)
{
	if(!element)
		return;
	if(!element["_itemstr"])
	{
		var itemel = LEAP.getElement("[ctf=hc_radioitem]",element);
		if(itemel!=null)
		{
			var moduletype = itemel.getAttribute("moduletype");
			var cbinput = LEAP.getElement("[ctf=hc_radioinput]",itemel);
			cbinput.value="@value";
			var cblabel = LEAP.getElement("[ctf=hc_radiolabel]",itemel);
			cblabel.innerHTML="@text";
			element["_itemstr"] = itemel.outerHTML;
			if(moduletype=="1")
				element.removeChilde(itemel);
		}
	}
	if(!element["_itemstr"])
		element["_itemstr"]=LEAP.hc_radio.itemstr;
	var tempdiv = document.createElement("div");
	tempdiv.innerHTML=LEAP.hc_radio.itemstr.replace("@value",value).replace("@text",name);
	var item = tempdiv.children[0];
	if(checked==true)
	{
		var items = LEAP.getElements("[ctf=hc_radioitem]",element);
		for(var i=0;i<items.length;i++)
		{
			var radioinput = LEAP.getElement("[ctf=hc_radioinput]",items[i]);
			radioinput.removeAttribute("checked");
			LEAP.addCSS(items[i],"hc-form-radio-active",false);
		}
		var itemradioinput = LEAP.getElement("[ctf=hc_radioinput]",item);
		itemradioinput.setAttribute("checked",true);
		LEAP.addCSS(item,"hc-form-radio-active");
	}
	element.appendChild(item);
}
LEAP.hc_radio.setValue = function(element,value)
{
	var radioitems = LEAP.getElements("[ctf=hc_radioitem]",element);
	if(radioitems)
	{
		LEAP.removeCSS(radioitems,"hc-form-radio-active",true);
		for(var i=0;i<radioitems.length;i++)
		{
			var hc_radioinput = LEAP.getElement("[ctf=hc_radioinput]",radioitems[i]);
			if(hc_radioinput.value==value)
			{
				hc_radioinput.setAttribute("checked",true);
				LEAP.addCSS(radioitems[i],"hc-form-radio-active");
				var hc_radiolabel = LEAP.getElement("[ctf=hc_radiolabel]",radioitems[i]);
				element["_value"]=hc_radioinput.value;
				element["_text"]=hc_radiolabel.innerHTML;
				break;
			}
		}
	}
}
LEAP.hc_radio.getText = function(element)
{
	var text = null;
	if(element["_text"]==null)
	{
		var radioitems = LEAP.getElements("[ctf=hc_radioitem]",element);
		if(radioitems)
		{
			for(var i=0;i<radioitems.length;i++)
			{
				if(radioitems[i].className.indexOf("hc-form-radio-active")>-1)
				{
					var hc_radiolabel = LEAP.getElement("[ctf=hc_radiolabel]",radioitems[i]);
					text=hc_radiolabel.innerHTML;
					break
				}
			}
		}
	}
	else
		text = element["_text"];
	return text;
}
LEAP.hc_radio.getValue = function(element)
{
	var value = null;
	if(element["_value"]==null)
	{
		var radioitems = LEAP.getElements("[ctf=hc_radioitem]",element);
		if(radioitems)
		{
			for(var i=0;i<radioitems.length;i++)
			{
				if(radioitems[i].className.indexOf("hc-form-radio-active")>-1)
				{
					var hc_radioinput = LEAP.getElement("[ctf=hc_radioinput]",radioitems[i]);
					value=hc_radioinput.value;
					break
				}
			}
		}
	}
	else
		value = element["_value"];
	return value;
}
LEAP.hc_schedule = {};
LEAP.hc_schedule.d="hc_schedule";
LEAP.hc_schedule.dateitemstr = '<div class="hc-schedule-item" ctf="hc_sd_item" waste="0">'+
                '<ul class="hc-schedule-layout" ctf="hc_sd_ul"></ul></div>';
LEAP.hc_schedule.daystr = '<li class="hc-schedule-layout-item" ctf="hc_sd_li" did="d@day">'+
                    '<span class="hc-schedule-day" ctf="hc_sd_day"></span>'+
                  '</li>';
LEAP.hc_schedule.weeks = {0:"周日",1:"周一",2:"周二",3:"周三",4:"周四",5:"周五",6:"周六"};
LEAP.hc_schedule.toDay = new Date();
LEAP.hc_schedule.itemEl="_itemel";
LEAP.hc_schedule._init = function()
{
	LEAP.addEvent(document.body,'click',LEAP.hc_schedule.uiProcess,null,null,true);
	UIEventManager.removeEvent(window, 'load', LEAP.hc_schedule._init);
}
LEAP.hc_schedule.init = function()
{
	if (document != null && document.body != null)
		LEAP.hc_schedule._init();
	else
		UIEventManager.addEvent(window, 'load', LEAP.hc_schedule._init);
	ElementEventManager.addManagedEventType(LEAP.hc_schedule.d, 'valueChange');
}();
LEAP.hc_schedule.initControl = function(wait,src)
{
	if (!src)
	{
		if (!event)
			return;
		src = event.srcElement;
	}
	if (!src)
		return;

	if (wait != null)
	{
		var fn = function()
		{
			LEAP.hc_schedule.initControl(null, src);
			src = null;
		};
		setTimeout(fn, wait);
		return;
	}
	var element = src.parentElement;
	if(!element)
		return;
	var _options = element.getAttribute("data-options");
	var options = !String.isEmpty(_options)?JSON.parse(_options):{};
	element["__options"] = options;
	if(options.bindFn!=null)
		element["__bindMethod"]=options.bindFn;
	if(options.bindMd!=null)
		element["__bindMd"]=options.bindMd;
	if(options.showtype==null || options.showtype=="week")
		LEAP.hc_schedule.initSchedule(element);
	else
	{
		var hc_sd_body = LEAP.getElement("[ctf=hc_sd_body]",element);
		hc_sd_body.style.height="228px";
		var hc_sd_box = LEAP.getElement("[ctf=hc_sd_box]",element);
		hc_sd_box.style.transform='translateX(-200vw)';	
		LEAP.hc_schedule.initDateToMonth(element);
		var str = LEAP.hc_schedule.toDay.getFullYear()+"-"+(LEAP.hc_schedule.toDay.getMonth()+1)+"-"+LEAP.hc_schedule.toDay.getDate();
		var dv = LEAP.getElement("[data-value="+str+"]",element);
		LEAP.addCSS(dv,"hc-schedule-active");
		LEAP.hc_schedule.afterAddMonth(element,LEAP.hc_schedule.toDay.getFullYear(),LEAP.hc_schedule.toDay.getMonth())
		LEAP.hc_schedule.initTitle(element,LEAP.hc_schedule.toDay.getFullYear(),LEAP.hc_schedule.toDay.getMonth(),LEAP.hc_schedule.toDay.getDate());
		element["_stylename"]="schedule";
		
	}
}
LEAP.hc_schedule.setValue = function(element,value)
{
	if(element==null)
		return;
	if(value==null)
		return;
	var values = value.split("-");
	if(element["__options"]==null)
	{
		var _options = element.getAttribute("data-options");
		var options = !String.isEmpty(_options)?JSON.parse(_options):{};
		element["__options"]=options;
	}
	var showtype = element["__options"].showtype;
	if(showtype==null || showtype=="week")
		LEAP.hc_schedule.initSchedule(element,values[0],parseInt(values[1])-1,parseInt(valuse[2]));
	else if(showtype=="month")
	{
		var hc_sd_body = LEAP.getElement("[ctf=hc_sd_body]",element);
		hc_sd_body.style.height="228px";
		LEAP.hc_schedule.initDateToMonth(element,values[0],parseInt(values[1])-1);
		LEAP.hc_schedule.afterAddMonth(element,values[0],parseInt(values[1])-1);
		var str = LEAP.hc_schedule.toDay.getFullYear()+"-"+(LEAP.hc_schedule.toDay.getMonth()+1)+"-"+LEAP.hc_schedule.toDay.getDate();
		var dv = LEAP.getElement("[data-value="+str+"]",element);
		LEAP.addCSS(dv,"hc-schedule-active");
		LEAP.hc_schedule.initTitle(element,values[0],parseInt(values[1])-1,values[2]);
		element["_stylename"]="schedule";
	}
}
LEAP.hc_schedule.getValue = function(element)
{
	var active  = LEAP.getElement(".hc-schedule-active",element);
	var value = active.getAttribute("data-value");
	var values = value.split("-");
	var yy,mm,dd=0;
	yy=values[0];
	if(parseInt(values[1])<10)
		mm="0"+values[1];
	else
		mm=values[1];
	if(parseInt(values[2])<10)
		dd=""+values[2];
	else
		dd=values[2];
	var __value =yy+"-"+mm+"-"+dd;
	return __value;
}
/**
 * 初始化标题
 * @param {} element
 */
LEAP.hc_schedule.initTitle = function(element,y,m,d,type)
{
	var today=null;
	if(y!=null && m!=null && d!=null)
		today = new Date(y,m,d);
	else
		today = LEAP.hc_schedule.toDay;
	var year = today.getFullYear();
	var month = today.getMonth();
	var day = today.getDate();
	var week = today.getDay();
	var wstr = LEAP.hc_schedule.weeks[week];
	var str = year+"年"+(month+1)+"月"+day+"日"+" "+wstr;
	var hc_sd_title = LEAP.getElement("[ctf=hc_sd_title]",element);
	hc_sd_title.innerHTML=str;
	if(month+1<10)
		month = "0"+(month+1);
	else
		month = month+1;
	if(day<10)
		day = "0"+day;
	var type="week";
	if(element["_stylename"]=="schedule")
		type="month";
	var __value=year+"-"+month+"-"+day;
	ElementEventManager.handleEvent(element, 'valueChange',
	{
		element			: element,
		date			: __value,
		year			: year,
		month			: month,
		day				: day,
		week			: week,
		weekcn			: wstr,
		type 			: type
	});
	if(type!=true){
		var arg = {};
		arg.date= __value;
		arg.year=year;
		arg.month=month;
		arg.day	=day;
		arg.week=week;
		arg.weekcn=wstr;
		arg.type=type;
		LEAP.hc_schedule.bindData(element,arg);
	}
}
LEAP.hc_schedule.bindData = function(element,arg)
{
	var fn = element["__bindMethod"];
	if(fn!=null)
	{
		var d = null;
		var module = LEAP.getLoadedModule(element.getAttribute(commfields.instance));
		if(module==null)
			module=window;
		if (module[fn] != null && typeof(module[fn]) == 'function')
		{
			d = module[fn].call(module,
			{
				option	: arg
			});
		}
		if(d!=null)
		{
			d = LEAP.convertResult(d);
			var md = "date";
			if(element["__bindMd"]!=null)
				md = element["__bindMd"];
			var active  = LEAP.getElement(".hc-schedule-active",element);
			var item = LEAP._match(active,"hc_sd_item",'ctf',10);
			var spans = LEAP.getElements("[ctf=hc_sd_day]",item);
			for(var i=0;i<spans.length;i++)
			{
				var value = spans[i].getAttribute("data-value");
				var values = value.split("-");
				var month = values[1];
				var day = values[2];
				if(parseInt(month)<10)
					month="0"+month;
				if(parseInt(day)<10)
					day="0"+day;
				var vstr = values[0]+"-"+month+"-"+day;
				var flag=false;
				for(var j=0;j<d.length;j++)
				{
					if(d[j][md]!=null)
					{
						if(d[j][md].indexOf(vstr)>-1)
						{
							flag=true;
							break;
						}
					}
				}
				if(flag)
					LEAP.addCSS(spans[i],"hc-schedule-dot");
			}
		}
	}
}
/**
 * 初始化当前日期的月份
 * @param {} element
 * @param {} ye
 * @param {} mo
 */
LEAP.hc_schedule.initSchedule = function(element,y,m,d)
{
	var year = null;
	var month = null;
	var day = null;
	if(y!=null)
		year=y;
	else
		year = LEAP.hc_schedule.toDay.getFullYear();
	if(m!=null)
		month = m;
	else
		month = LEAP.hc_schedule.toDay.getMonth();
	if(d!=null)
		day=d;
	else
		day = LEAP.hc_schedule.toDay.getDate();
	var hc_sd_box = LEAP.getElement("[ctf=hc_sd_box]",element);
	hc_sd_box.innerHTML="";
	var index = 1;
	for(var i=0;i<6;i++)
	{
		var tempdiv = document.createElement("div");
		tempdiv.innerHTML=LEAP.hc_schedule.dateitemstr;
		var dateitem = tempdiv.children[0];
		var hc_sd_ul = LEAP.getElement("[ctf=hc_sd_ul]",dateitem);
		for(var j=0;j<7;j++)
		{
			var daydiv = document.createElement("div");
			daydiv.innerHTML=LEAP.hc_schedule.daystr.replace("@day",index);
			var liel = daydiv.children[0];
			hc_sd_ul.appendChild(liel);
			index++;
		}
		hc_sd_box.appendChild(dateitem);
	}
	LEAP.hc_schedule.refreshweek(element,year,month,day);
	var data = LEAP.getElement("[data-value="+element["todaynum"]+"]",hc_sd_box);
	var __item = LEAP._match(data,"hc_sd_item",'ctf',5);
	element["__weekstr"]=__item.outerHTML;
	var hc_sd_body = LEAP.getElement("[ctf=hc_sd_body]",element);
	hc_sd_body.style.height="38px";
	hc_sd_box.style.transform='translateX(-200vw)';
	if(element["_loadevent"]==null)
	{
		LEAP.addEvent(element,'touchstart',LEAP.hc_schedule.uiProcess,null,null,true);
		element["_loadevent"]=true;
	}
	element["_stylename"]="single";
	LEAP.hc_schedule.initTitle(element,year,month,LEAP.hc_schedule.toDay.getDate())
}
LEAP.hc_schedule.loadweek = function(element,type)
{
	var items = LEAP.getElements("[ctf=hc_sd_item]",element);
	if(items.length==7)
	{
		for(var i=0;i<1;i++)
		{
			if(type=="1")
			{
				items[i].setAttribute("waste","1");
				items[i].style.display="none";	
			}
			else if(type=="0")
			{
				items[i].setAttribute("waste","0");
				items[i].style.display="block";
			}
		}
		for(var i=1;i<items.length;i++)
		{
			if(type=="1")
			{
				items[i].setAttribute("waste","0");
				items[i].style.display="block";	
			}
			else if(type=="0")
			{
				items[i].setAttribute("waste","1");
				items[i].style.display="none";
			}
		}
	}
}
/**
 * 初始化周显现
 * @param {} element
 * @param {} y
 * @param {} m
 */
LEAP.hc_schedule.refreshweek = function(element,y,m,day)
{
	var date = null;
	if(day!=null)
		date = new Date(y,m,day);
	else
		date = new Date(y,m,1);
	var mv = date.getDay();
	var d = date.getDate();
	var today = LEAP.hc_schedule.toDay;
	var dd = null;
	var _sd_day = null;
	var index = 1;
	var items = null;
	items = LEAP.getElements("[ctf=hc_sd_li]",element);
	if(day!=null)
	{
		for(var i=14+mv;i>=1;i--)
		{
			var aa = new Date(y,m,d-i);
			dd = items[index-1];
			_sd_day = LEAP.getElement("[ctf=hc_sd_day]",dd);
			_sd_day.innerHTML = aa.getDate();
			_sd_day.setAttribute("data-value",aa.getFullYear()+"-"+(aa.getMonth()+1)+"-"+aa.getDate());
			if (aa.getFullYear() == today.getFullYear() && aa.getMonth() == today.getMonth() && aa.getDate() == today.getDate())
				LEAP.addCSS(_sd_day,"hc-schedule-today");
			else
				LEAP.removeCSS(_sd_day,"hc-schedule-today",false);
			index++;
		}
		_sd_day = LEAP.getElement("[ctf=hc_sd_day]",items[index-1]);
		_sd_day.innerHTML = d;
		_sd_day.setAttribute("data-value",date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate());
		if (date.getFullYear() == today.getFullYear() && date.getMonth() == today.getMonth() && date.getDate() == today.getDate())
			LEAP.addCSS(_sd_day,"hc-schedule-today");
		else
			LEAP.removeCSS(_sd_day,"hc-schedule-today",false);
		LEAP.addCSS(_sd_day,"hc-schedule-active");
		element["todaynum"]=_sd_day.getAttribute("data-value");
		index++
		while(index <= 42)
		{
			d++
			var aa = new Date(y,m,d);
			dd = items[(index)-1];
			_sd_day = LEAP.getElement("[ctf=hc_sd_day]",dd);
			_sd_day.innerHTML = aa.getDate();
			_sd_day.setAttribute("data-value",aa.getFullYear()+"-"+(aa.getMonth()+1)+"-"+aa.getDate());
			if (aa.getFullYear() == today.getFullYear() && aa.getMonth() == today.getMonth() && aa.getDate() == today.getDate())
				LEAP.addCSS(_sd_day,"hc-schedule-today");
			else
				LEAP.removeCSS(_sd_day,"hc-schedule-today",false);
			index++;
		}
		
	}
	else
	{
		for(var i = mv;i >= 1;i--)
		{
			var aa = new Date(y,m,d-i);
			dd = items[index-1];
			_sd_day = LEAP.getElement("[ctf=hc_sd_day]",dd);
			_sd_day.innerHTML = aa.getDate();
			_sd_day.setAttribute("data-value",aa.getFullYear()+"-"+(aa.getMonth()+1)+"-"+aa.getDate());
			LEAP.removeCSS(_sd_day,"hc-schedule-today",false);
			index++;
		}
		while(date.getMonth()==m)
		{
			dd = items[(d + mv)-1];
			_sd_day = LEAP.getElement("[ctf=hc_sd_day]",dd);
			_sd_day.innerHTML = d;
			_sd_day.setAttribute("data-value",date.getFullYear()+"-"+(date.getMonth()+1)+"-"+d);
			if (date.getFullYear() == today.getFullYear() && date.getMonth() == today.getMonth() && date.getDate() == today.getDate())
			{
				LEAP.addCSS(_sd_day,"hc-schedule-today");
				LEAP.addCSS(_sd_day,"hc-schedule-active");
				element["todaynum"]=_sd_day.getAttribute("data-value");
			}
			else
				LEAP.removeCSS(_sd_day,"hc-schedule-today",false);
			date.setDate(++d);
		}
		while(d + mv <= 42)
		{
			var aa = new Date(y,m,d);
			dd = items[(d + mv)-1];
			_sd_day = LEAP.getElement("[ctf=hc_sd_day]",dd);
			_sd_day.innerHTML = aa.getDate();
			_sd_day.setAttribute("data-value",aa.getFullYear()+"-"+(aa.getMonth()+1)+"-"+aa.getDate());
			LEAP.removeCSS(_sd_day,"hc-schedule-today",false);
			d++;
		}
	}
}
/**
 * 添加周的一个item
 * @param {} element
 * @param {} type
 * @param {} y
 * @param {} m
 */
LEAP.hc_schedule.addWeekItem = function(element,type)
{
	var items = LEAP.getElements("[ctf=hc_sd_item]",element);
	var lis = LEAP.getElements("[ctf=hc_sd_li]",element);
	var hc_sd_box = LEAP.getElement("[ctf=hc_sd_box]",element);
	
	var tempdiv = document.createElement("div");
	tempdiv.innerHTML=element["__weekstr"];
	var newitem = tempdiv.children[0];
	
	var value = null;
	if(type=="insert")
	{
		value = LEAP.getElement("[ctf=hc_sd_day]",lis[0]).getAttribute("data-value");
		hc_sd_box.insertBefore(newitem,items[0]);
		hc_sd_box.removeChild(items[items.length-1]);
	}
	else if(type=="after")
	{
		value = LEAP.getElement("[ctf=hc_sd_day]",lis[lis.length-1]).getAttribute("data-value");
		hc_sd_box.appendChild(newitem);
		hc_sd_box.removeChild(items[0]); 
	}
	var values = value.split("-");
	LEAP.hc_schedule.refreshIndex(element);
	var today = LEAP.hc_schedule.toDay;
	var lists = LEAP.getElements("[ctf=hc_sd_li]",newitem);
	var spans = LEAP.getElements("[ctf=hc_sd_day]",element);
	LEAP.removeCSS(spans,"hc-schedule-active",true);
	var items1 = LEAP.getElements("[ctf=hc_sd_item]",element);
	var days = LEAP.getElements("[ctf=hc_sd_day]",items1[2]);
	LEAP.addCSS(days[0],"hc-schedule-active");
	var va = days[0].getAttribute("data-value");
	var vas = va.split("-");
	LEAP.hc_schedule.initTitle(element,vas[0],parseInt(vas[1])-1,vas[2]);
	var index=1;
	if(type=="insert")
	{
		for(var i=7;i>=1;i--)
		{
			var aa = new Date(values[0],parseInt(values[1])-1,parseInt(values[2])-i);
			var dd = lists[index-1];
			var _sd_day = LEAP.getElement("[ctf=hc_sd_day]",dd);
			_sd_day.innerHTML = aa.getDate();
			_sd_day.setAttribute("data-value",aa.getFullYear()+"-"+(aa.getMonth()+1)+"-"+aa.getDate());
			if (aa.getFullYear() == today.getFullYear() && aa.getMonth() == today.getMonth() && aa.getDate() == today.getDate())
			{
				LEAP.addCSS(_sd_day,"hc-schedule-today");
				element["todaynum"]=_sd_day.getAttribute("data-value");
			}
			else
				LEAP.removeCSS(_sd_day,"hc-schedule-today",false);
			index++;
		}	
	}
	else if(type=="after")
	{
		for(var i=1;i<=7;i++)
		{
			var aa = new Date(values[0],parseInt(values[1])-1,parseInt(values[2])+i);
			var dd = lists[i-1];
			var _sd_day = LEAP.getElement("[ctf=hc_sd_day]",dd);
			_sd_day.innerHTML = aa.getDate();
			_sd_day.setAttribute("data-value",aa.getFullYear()+"-"+(aa.getMonth()+1)+"-"+aa.getDate());
			if (aa.getFullYear() == today.getFullYear() && aa.getMonth() == today.getMonth() && aa.getDate() == today.getDate())
			{
				LEAP.addCSS(_sd_day,"hc-schedule-today");
				element["todaynum"]=_sd_day.getAttribute("data-value");
			}
			else
				LEAP.removeCSS(_sd_day,"hc-schedule-today",false);
		}
	}
	
}
/**
 * 初始化月份所有日期
 * @param {} element
 * @param {} y
 * @param {} m
 */
LEAP.hc_schedule.initDateToMonth = function(element,y,m)
{
	var year = null;
	var month = null;
	if(y!=null)
		year=y;
	else
		year = LEAP.hc_schedule.toDay.getFullYear();
	if(m!=null)
		month = m;
	else
		month = LEAP.hc_schedule.toDay.getMonth();
	var hc_sd_box = LEAP.getElement("[ctf=hc_sd_box]",element);
	var items = LEAP.getElements("[ctf=hc_sd_item]",hc_sd_box);
	if(items!=null)
	{
		for(var i=0;i<items.length;i++)
		{
			items[i].setAttribute("waste","1");
			items[i].style.display="none";
		}
	}
	var tempdiv = document.createElement("div");
	tempdiv.innerHTML=LEAP.hc_schedule.dateitemstr;
	var dateitem = tempdiv.children[0];
	hc_sd_box.insertBefore(dateitem,items[0]);
	var hc_sd_ul = LEAP.getElement("[ctf=hc_sd_ul]",dateitem);
	var index = 1;
	for(var i=0;i<6;i++)
	{
		for(var j=0;j<7;j++)
		{
			var daydiv = document.createElement("div");
			daydiv.innerHTML=LEAP.hc_schedule.daystr.replace("@day",index);
			hc_sd_ul.appendChild(daydiv.children[0]);
			index++;
		}
	}
	element[LEAP.hc_schedule.itemEl]=dateitem.outerHTML;
	LEAP.hc_schedule.refreshDate(element,dateitem,year,month);
	if(element["_loadevent"]==null)
	{
		LEAP.addEvent(element,'touchstart',LEAP.hc_schedule.uiProcess,null,null,true);
		element["_loadevent"]=true;
	}
	if(y!=null && m!=null)
	{
		var span = LEAP.getElement(".hc-schedule-active",element);
		if(span!=null)
		{
			var value = span.getAttribute("data-value");
			var values = value.split("-");
			var date = new Date(values[0],parseInt(values[1])-1,values[2]);
			var yy,mm,dd=0;
			var type="week";
			if(element["_stylename"]=="schedule")
				type="month";
			yy=values[0];
			if(parseInt(values[1])<10)
				mm="0"+values[1];
			else
				mm=values[1];
			if(parseInt(values[2])<10)
				dd=""+values[2];
			else
				dd=values[2];
			var __value =yy+"-"+mm+"-"+dd;
			var week = date.getDay();
			var wstr = LEAP.hc_schedule.weeks[week];
			var arg = {};
			arg.date= __value;
			arg.year=yy;
			arg.month=mm;
			arg.day	=dd;
			arg.week=week;
			arg.weekcn=wstr;
			arg.type=type;
			LEAP.hc_schedule.bindData(element,arg);
		}
		element["__endload"]=true;
	}
}
/**
 * 添加当前月份之外的月份
 * @param {} element
 * @param {} type
 * @param {} y
 * @param {} m
 * @param {} item
 */
LEAP.hc_schedule.addDateItem = function(element,type,y,m,addtype)
{
	var items = LEAP.getElements("[ctf=hc_sd_item]",element);
	var hc_sd_box = LEAP.getElement("[ctf=hc_sd_box]",element);
	var tempdiv = document.createElement("div");
	tempdiv.innerHTML=element[LEAP.hc_schedule.itemEl];
	var newitem = tempdiv.children[0];
	if(type=="insert")
	{
		hc_sd_box.insertBefore(newitem,items[0]);
		if(addtype=="1")
			hc_sd_box.removeChild(items[items.length-1]);
	}
	else if(type=="after")
	{
		hc_sd_box.appendChild(newitem);
		if(addtype=="1")
			hc_sd_box.removeChild(items[0]);
	}
	LEAP.hc_schedule.refreshDate(element,newitem,y,m);
	LEAP.hc_schedule.refreshIndex(element,true);
	if(addtype=="1")
	{
		var spans = LEAP.getElements("[ctf=hc_sd_day]",element);	
		LEAP.removeCSS(spans,"hc-schedule-active",true);
		var items1 = LEAP.getElements("[ctf=hc_sd_item]",hc_sd_box);
		var days = LEAP.getElements("[ctf=hc_sd_day]",items1[2]);
		var day = days[10];
		var value = day.getAttribute("data-value");
		var values = value.split("-");
		var str = values[0]+"-"+values[1]+"-1";
		var dayel = LEAP.getElement("[data-value="+str+"]",items1[2]);
		LEAP.addCSS(dayel,"hc-schedule-active");
		LEAP.hc_schedule.initTitle(element,values[0],parseInt(values[1])-1,"1");
	}
}
/**
 * 刷新item的index
 * @param {} element
 */
LEAP.hc_schedule.refreshIndex = function(element,type)
{
	var items = LEAP.getElements("[ctf=hc_sd_item]",element);
	for(var i=0;i<items.length;i++)
	{
		items[i].setAttribute("data-index",i);
	}
	if(type==null)
	{
		var lis = LEAP.getElements("[ctf=hc_sd_li]",element);
		for(var i=0;i<lis.length;i++)
		{
			lis[i].setAttribute("did","d"+(i+1));
		}	
	}
}
/**
 * 绑定日期
 * @param {} element
 * @param {} item
 * @param {} y
 * @param {} m
 */
LEAP.hc_schedule.refreshDate = function(element,item,y,m)
{
	var date = new Date(y,m,1);
	var mv = date.getDay();
	var d = date.getDate();
	var today = LEAP.hc_schedule.toDay;
	var dd = null;
	var _sd_day = null;
	var index = 1;
	var value = null;
	var values = null;
	var span=LEAP.getElement(".hc-schedule-active",element);
	if(span!=null)
	{
		value = span.getAttribute("data-value");
		values = value.split("-");
	}
	for(var i = mv;i >= 1;i--)
	{
		var aa = new Date(y,m,d-i);
		dd = LEAP.getElement("[did=d"+index+"]",item);
		_sd_day = LEAP.getElement("[ctf=hc_sd_day]",dd);
		_sd_day.style.color="#ccc"
		_sd_day.innerHTML = aa.getDate();
		_sd_day.setAttribute("data-value",aa.getFullYear()+"-"+(aa.getMonth()+1)+"-"+aa.getDate());
		LEAP.removeCSS(_sd_day,"hc-schedule-today",false);
		index++;
	}
	while(date.getMonth()==m)
	{
		dd = LEAP.getElement("[did=d"+(d + mv)+"]",item);
		_sd_day = LEAP.getElement("[ctf=hc_sd_day]",dd);
		_sd_day.innerHTML = d;
		_sd_day.setAttribute("data-value",date.getFullYear()+"-"+(date.getMonth()+1)+"-"+d);
		if (date.getFullYear() == today.getFullYear() && date.getMonth() == today.getMonth() && date.getDate() == today.getDate())
		{
			LEAP.addCSS(_sd_day,"hc-schedule-today");
			element["todaynum"]=_sd_day.getAttribute("data-value");
		}
		else
			LEAP.removeCSS(_sd_day,"hc-schedule-today",false);
		if(values!=null)
		{
			if (date.getFullYear() == values[0] && date.getMonth() == parseInt(values[1])-1 && date.getDate() == values[2])
				LEAP.addCSS(_sd_day,"hc-schedule-active");
		}
		date.setDate(++d);
	}
	while(d + mv <= 42)
	{
		var aa = new Date(y,m,d);
		dd = LEAP.getElement("[did=d"+(d + mv)+"]",item);
		_sd_day = LEAP.getElement("[ctf=hc_sd_day]",dd);
		_sd_day.style.color="#ccc";
		_sd_day.innerHTML = aa.getDate();
		_sd_day.setAttribute("data-value",aa.getFullYear()+"-"+(aa.getMonth()+1)+"-"+aa.getDate());
		LEAP.removeCSS(_sd_day,"hc-schedule-today",false);
		d++;
	}
}
LEAP.hc_schedule.afterAddMonth = function(element,y,m)
{
	var year = null;
	var month = null;
	if(y!=null)
		year=y;
	else
		year = LEAP.hc_schedule.toDay.getFullYear();
	if(m!=null)
		month = m;
	else
		month = LEAP.hc_schedule.toDay.getMonth();
	for(var i=1;i<=2;i++)
	{
		var date = new Date(year,parseInt(month)-i,1);
		LEAP.asyn(LEAP.hc_schedule.addDateItem,null,10,element,"insert",date.getFullYear(),date.getMonth());
	}
	for(var i=1;i<=3;i++)
	{
		var date = new Date(year,parseInt(month)+i,1);
		LEAP.asyn(LEAP.hc_schedule.addDateItem,null,10,element,"after",date.getFullYear(),date.getMonth());
	}
}
LEAP.hc_schedule.uiProcess = function(arg)
{
	var par = null;
	if(arg.e)
		par = arg.e;
	else
		par = arg;
	var src = arg.e.srcElement;
	var ctf = src.getAttribute("ctf");
	var type = arg.e.type;
	var element = LEAP._match(src,LEAP.hc_schedule.d,'ct',999);
	if(!element)
		return;
	if(type=="click")
	{
		if(ctf=="hs_sd_li" || ctf=="hc_sd_day")
		{
			var spanel = null;
			if(ctf=="hs_sd_li")
				spanel = LEAP.getElement("[ctf=hc_sd_day]",src);
			else
				spanel = src;
			var days = LEAP.getElements("[ctf=hc_sd_day]",element);
		 	LEAP.removeCSS(days,"hc-schedule-active",true);	
		 	LEAP.addCSS(spanel,"hc-schedule-active");
		 	var value = spanel.getAttribute("data-value");
		 	var values = value.split("-");
		 	LEAP.hc_schedule.initTitle(element,values[0],parseInt(values[1])-1,values[2],true);
		}
		else if(ctf=="hc_sd_today")
		{
			var today = LEAP.hc_schedule.toDay;
			if(element["_stylename"]=="single")
				LEAP.hc_schedule.initSchedule(element,today.getFullYear(),today.getMonth(),today.getDate());
			else if(element["_stylename"]=="schedule")
			{
				var hc_sd_box = LEAP.getElement("[ctf=hc_sd_box]",element);
				hc_sd_box.innerHTML="";
				LEAP.hc_schedule.initDateToMonth(element);
				LEAP.hc_schedule.afterAddMonth(element,today.getFullYear(),today.getMonth());
				var str = LEAP.hc_schedule.toDay.getFullYear()+"-"+(LEAP.hc_schedule.toDay.getMonth()+1)+"-"+LEAP.hc_schedule.toDay.getDate();
				var dv = LEAP.getElement("[data-value="+str+"]",element);
				LEAP.addCSS(dv,"hc-schedule-active");
			 	var values = str.split("-");
			 	LEAP.hc_schedule.initTitle(element,values[0],parseInt(values[1])-1,values[2]);
			}
		}
	}
	else 
	{
		if(type=="touchstart")
		{
			var hc_sd_body = LEAP.getElement("[ctf=hc_sd_body]",element);
			LEAP.addEvent(element,"touchmove",LEAP.hc_schedule.uiProcess,null,null,true);
			LEAP.addEvent(element,"touchend",LEAP.hc_schedule.uiProcess,null,null,true);
			var touch = par.touches[0];
			hc_sd_body.style.webkitTransition = "0.3s ease -webkit-transform";
			var pageWidth = window.innerWidth;
			element["startX"]=touch.pageX+((3-1)*pageWidth);
			element["_touchpageX"]=touch.pageX;
			element["startY"]=touch.pageY;
			element["bodyheight"]=hc_sd_body.clientHeight;
			element["direction"]="left";
			element["isTouchEnd"] = false;
			element["maxWidth"]=-pageWidth*5;
			element["pageWidth"]=pageWidth;
			element["moveXLength"]=0;
			element["startT"] = new Date().getTime();
		}
		if(type=="touchmove")
		{
			par.preventDefault();
			if(element["isTouchEnd"]) return;
			var touch = par.touches[0];
			var deltaX = touch.pageX - element["startX"];
			var deltaY = touch.pageY - element["startY"];
			var deltaX1 = touch.pageX-element["_touchpageX"];
			var hc_sd_box = LEAP.getElement("[ctf=hc_sd_box]",element);
			var hc_sd_body = LEAP.getElement("[ctf=hc_sd_body]",element);
			var values = null;
			var items = LEAP.getElements("[ctf=hc_sd_item]",hc_sd_box);
			var day = null;
			day = LEAP.getElement(".hc-schedule-active",element);
			if(day==null)
			{
				var lis = LEAP.getElements("[ctf=hc_sd_li]",items[2]);
				if(element["_stylename"]=="single")
					day = LEAP.getElement("[ctf=hc_sd_day]",lis[0]);
				else if(element["_stylename"]=="schedule")
					day = LEAP.getElement("[ctf=hc_sd_day]",lis[10]);
			}
			var liel = LEAP._match(day,"hc_sd_li",'ctf',2);
			var did = liel.getAttribute("did");
			var idnum = parseInt(did.replace("d",""));
			var value = day.getAttribute("data-value");
			values = value.split("-");
			
			if(Math.abs(deltaX1) < Math.abs(deltaY))
			{
				if(element["_stylename"]=="single")
				{
					if(deltaY>=0 && deltaY<=(228-38))
					{
						element["isMove"] = true;
						hc_sd_body.style.height=(38+deltaY)+"px";
						if(38+deltaY>60)
						{
							hc_sd_box.style.webkitTransition="0s ease -webkit-transform"
							hc_sd_box.style.transform='translateX(0vw)';	
							if(element["__endload"]!=true)
							{
								element["__year"]=values[0];
								element["__month"]=parseInt(values[1])-1;
								LEAP.hc_schedule.initDateToMonth(element,values[0],parseInt(values[1])-1);
							}
							else
								LEAP.hc_schedule.loadweek(element,"0");
						}
						else if(38+deltaY<=60)
						{
							LEAP.hc_schedule.loadweek(element,"1");
							hc_sd_box.style.transform='translateX(-200vw)';
						}
						element["direction"] = "down";
					}
				}
				else if(element["_stylename"]=="schedule"){
					if(deltaY>=(38-228) && deltaY<=0)
					{
						element["isMove"] = true;
						var hs = parseInt(idnum)/7+"";
						if(hs.indexOf(".")>-1)
							hs = parseInt(hs.substring(0,hs.indexOf(".")))+1;
						var gd = -(parseInt(hs)-1)*38;
						if(deltaY>=gd)
						{
							hc_sd_box.style.webkitTransform= "translate3d(-200vw,"+deltaY+"px,0)";
							hc_sd_body.style.height=(228+deltaY)+"px";
						}
						else
						{
							hc_sd_body.style.height=(228+deltaY)+"px";
						}
						element["direction"] = "up";
					}
				}
			}
			else
			{
				//左右滑动
				if (Math.abs(deltaX) > Math.abs(deltaY)){
					element["moveXLength"] = deltaX;
					var translate = deltaX;
					if (translate <=0 && translate >= element["maxWidth"]){
						var move = translate +'px';
		    			hc_sd_box.style.webkitTransform= "translate3d("+translate+"px,0,0)";
						element["isMove"] = true;
					}
					element["direction"] = element["_touchpageX"]>touch.pageX?"right":"left";
				}	
			}
		}
		if(type=="touchend")
		{
			LEAP.removeEvent(element,"touchmove",LEAP.hc_schedule.uiProcess,true);
			LEAP.removeEvent(element,"touchend",LEAP.hc_schedule.uiProcess,true);
			var hc_sd_body = LEAP.getElement("[ctf=hc_sd_body]",element);
			var hc_sd_box = LEAP.getElement("[ctf=hc_sd_box]",element);
			hc_sd_box.style.webkitTransition = "0.3s ease -webkit-transform";
			
			var direction = element["direction"];
			var pageWidth = element["pageWidth"];
    		var moveXLength = element["moveXLength"];
			var moveper = 0;
			if(direction=="left")
				moveper = (Math.abs(moveXLength)-((3-1)*pageWidth))/pageWidth;
			else
				moveper = Math.abs(moveXLength)/pageWidth;
	    	var moveperstr = moveper+"";
	    	var moveperstrs = moveperstr.split(".");
	    	var per = "0."+moveperstrs[1];
	    	var deltaT = new Date().getTime() - element["startT"];
	    	if (element["isMove"] && !element["isTouchEnd"])
	    	{
	    		element["isTouchEnd"] = true;
	    		if(direction=="left" || direction=="right")
	    		{
	    			var percentage=0;
		            if(deltaT < 800){
		            	percentage=0.2;
		            }else {
		            	percentage=0.4;
		            }
		            if(LEAP.tonum(per) > percentage)
		        	{
		        		if(direction=="left")
		        		{
		        			if(element["_stylename"]=="single")
		        				LEAP.asyn(LEAP.hc_schedule.addWeekItem,null,50,element,"insert");
		        			else if(element["_stylename"]=="schedule")
		        			{
		        				var items = LEAP.getElements("[ctf=hc_sd_item]",hc_sd_box);
		        				var lis = LEAP.getElements("[ctf=hc_sd_li]",items[0]);
		        				var li = lis[10];
		        				var day = LEAP.getElement("[ctf=hc_sd_day]",li);
		        				var value=day.getAttribute("data-value");
		        				var values = value.split("-");
		        				var date = new Date(values[0],parseInt(values[1])-1-1,1);
		        				LEAP.asyn(LEAP.hc_schedule.addDateItem,null,10,element,"insert",date.getFullYear(),date.getMonth(),"1");
		        			}
		        			hc_sd_box.style.transform='translateX(-100vw)';
		        		}
		        		else if(direction=="right")
		        		{
		        			if(element["_stylename"]=="single")
		        				LEAP.asyn(LEAP.hc_schedule.addWeekItem,null,50,element,"after");
		        			else if(element["_stylename"]=="schedule")
		        			{
		        				var items = LEAP.getElements("[ctf=hc_sd_item]",hc_sd_box);
		        				var lis = LEAP.getElements("[ctf=hc_sd_li]",items[items.length-1]);
		        				var li = lis[10];
		        				var day = LEAP.getElement("[ctf=hc_sd_day]",li);
		        				var value=day.getAttribute("data-value");
		        				var values = value.split("-");
		        				var date = new Date(values[0],parseInt(values[1])-1+1,1);
		        				LEAP.asyn(LEAP.hc_schedule.addDateItem,null,10,element,"after",date.getFullYear(),date.getMonth(),"1");
		        			}
		        			hc_sd_box.style.transform='translateX(-300vw)';
		        		}
		        	}
		        	
	    		}
	    		else if(direction=="down")
	    		{
	    			if(hc_sd_body.clientHeight/228>0.4)
	    			{
	    				element["_stylename"]="schedule";
	    				hc_sd_box.style.webkitTransition="0s ease -webkit-transform"
	    				hc_sd_body.style.height="228px";
	    				var items = LEAP.getElements("[ctf=hc_sd_item][waste=1]",hc_sd_box);
		    			if(items!=null)
		    			{
		    				for(var i=items.length-1;i>=0;i--)
		    					hc_sd_box.removeChild(items[i]);
		    			}
		    			LEAP.hc_schedule.afterAddMonth(element,element["__year"],element["__month"]);
						element["__endload"]=false;
	    			}
	    			else
	    			{
	    				hc_sd_body.style.webkitTransition="0s ease -webkit-transform"
	    				hc_sd_body.style.height="38px";
	    				LEAP.hc_schedule.loadweek(element,"1");
	    				var items = LEAP.getElements("[ctf=hc_sd_item][waste=1]",hc_sd_box);
	    				hc_sd_box.removeChild(items[0]);
	    				element["_stylename"]="single";
	    				element["__endload"]=false;
	    			}
	    		}
	    		else if(direction=="up")
	    		{
	    			if(hc_sd_body.clientHeight/228<0.4)
	    			{
	    				element["_stylename"]="single";
	    				var day = null;
						day = LEAP.getElement(".hc-schedule-active",element);
						var value = day.getAttribute("data-value");
						var values = value.split("-");
						hc_sd_body.style.webkitTransition="0s ease -webkit-transform"
	    				hc_sd_body.style.height="38px";
						LEAP.hc_schedule.initSchedule(element,values[0],parseInt(values[1])-1,values[2]);
	    			}
	    			else
	    			{
	    				element["_stylename"]="schedule";
	    				hc_sd_box.style.webkitTransform= "translate3d(-200vw,0,0)";
	    				hc_sd_body.style.webkitTransition="0.3s ease -webkit-transform"
	    				hc_sd_body.style.height="228px";
	    			}
	    		}
	    	}
	    	setTimeout(function()
	    	{
	    		hc_sd_box.style.transform='translateX(-200vw)';	
	    	},100)
		}
	}
}
LEAP.hc_score={};
LEAP.hc_score.d="hc_score";
LEAP.hc_score.itemstr = '<span class="hc-iconfont hc-icon-star-off" ctf="hc_scoreitem" vindex="@vindex"></span>';
LEAP.hc_score._init = function()
{
	LEAP.addEvent(document.body,'click',LEAP.hc_score.uiProcess,null,null,true);
	UIEventManager.removeEvent(window, 'load', LEAP.hc_score._init);
}
LEAP.hc_score.init = function()
{
	if (document != null && document.body != null)
		LEAP.hc_score._init();
	else
		UIEventManager.addEvent(window, 'load', LEAP.hc_score._init);
}();
LEAP.hc_score.initControl = function(wait,src)
{
	if (!src)
	{
		if (!event)
			return;
		src = event.srcElement;
	}
	if (!src)
		return;

	if (wait != null)
	{
		var fn = function()
		{
			LEAP.hc_score.initControl(null, src);
			src = null;
		};
		setTimeout(fn, wait);
		return;
	}
	var element = src.parentElement;
	if(!element)
		return;
	var options = element.getAttribute("data-options");
	var _options = options?JSON.parse(options):{};
	element["_options"]=_options;
	var boxel = LEAP.getElement("[ctf=hc_scorebox]",element);
	if(boxel.children.length==0)
		LEAP.hc_score.initItem(element);
}
LEAP.hc_score.uiProcess = function(arg)
{
	var par = null;
	if(arg.e)
		par = arg.e;
	else
		par = arg;
	var src = arg.e.srcElement;
	var ctf = src.getAttribute("ctf");
	var type = arg.e.type;
	var element = LEAP._match(src,LEAP.hc_score.d,'ct',999);
	if(!element)
		return;
	if(type=="click")
	{
		if(ctf=="hc_scoreitem")
		{
			var items = LEAP.getElements("[ctf=hc_scoreitem]",element);
			if(src.className.indexOf("hc-icon-star-off")>-1)
			{
				var vindex = src.getAttribute("vindex");
				for(var i=0;i<vindex;i++)
				{
					LEAP.removeCSS(items[i],"hc-icon-star-off",false);
					LEAP.addCSS(items[i],"hc-icon-star-on");
					items[i].setAttribute("selected","1");
				}
			}
			else
			{
				var vindex = src.getAttribute("vindex");
				for(var i=items.length-1;i>=vindex-1;i--)
				{
					LEAP.removeCSS(items[i],"hc-icon-star-on",false);
					LEAP.addCSS(items[i],"hc-icon-star-off");
					items[i].setAttribute("selected","0");
				}
			}
			var items = LEAP.getElements("[selected=1]",element);
			element["_value"]=items.length;
		}
	}
}
LEAP.hc_score.initItem = function(element)
{
	if(!element)
		return;
	var boxel = LEAP.getElement("[ctf=hc_scorebox]",element);
	var options = element["_options"];
	var scorenum=5;
	if(options.scorenum!=null)
		scorenum = LEAP.tonum(options.scorenum);
	for(var i=0;i<scorenum;i++)
	{
		var tempdiv = document.createElement("div");
		tempdiv.innerHTML=LEAP.hc_score.itemstr.replace("@vindex",i+1);
		boxel.appendChild(tempdiv.children[0]);
	}
}
LEAP.hc_score.setValue = function(element,value)
{
	if(!element)
		return;
	if(!element["_options"])
	{
		var options = element.getAttribute("data-options");
		var _options = options?JSON.parse(options):{};
		element["_options"]=_options;
	}
	var boxel = LEAP.getElement("[ctf=hc_scorebox]",element);
	if(boxel.children.length==0)
		LEAP.hc_score.initItem(element);
	
	if(value!=null)
	{
		var items = LEAP.getElements("[ctf=hc_scoreitem]",boxel);
		for(var i=0;i<value;i++)
		{
			LEAP.removeCSS(items[i],"hc-icon-star-off",false);
			LEAP.addCSS(items[i],"hc-icon-star-on");
		}
		element["_value"]=value;
	}
}
LEAP.hc_score.getValue = function(element)
{
	return element["_value"];
}
LEAP.hc_scroll={};
LEAP.hc_scroll.d="hc_scroll";
LEAP.hc_scroll.isLoading = false;
LEAP.hc_scroll.isLoaded = false;
LEAP.hc_scroll._init = function()
{
	UIEventManager.removeEvent(window, 'load', LEAP.hc_scroll._init);
}
LEAP.hc_scroll.init = function()
{
	if (document != null && document.body != null)
		LEAP.hc_scroll._init();
	else
		UIEventManager.addEvent(window, 'load', LEAP.hc_scroll._init);
}();
LEAP.hc_scroll.load = function(element,callback,domain,type,config)
{
	if (element == null)
		return;
	if (typeof(element) == 'string')
		element = LEAP.getElement(element);
		
	if (!LEAP.hc_scroll.isLoaded)
	{
		if (!LEAP.hc_scroll.isLoading)
		{
			LEAP.hc_scroll.isLoading = true;
			leapclient.loadjs('LEAP/thirdPartyJavascript/iscroll.js');
			LEAP.hc_scroll.isLoaded = true;
		}
		else
		{
			setTimeout(function(){
				LEAP.hc_scroll.init(element,callback,domain);
			},1000);
		}
	}
//	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	var hc_wrapper = LEAP._match(element,"hc_wrapper",'ctf',10);
	var pullDownEl = LEAP.getElement("[ctf=hc_pullDown]",hc_wrapper);
	var pullDownOffset = 0;
	if(pullDownEl!=null)
		pullDownOffset = pullDownEl.offsetHeight;
	var pullUpEl = LEAP.getElement("[ctf=hc_pullUp]",hc_wrapper);
	if(domain==null)
		domain=window;
	hc_wrapper.callBack = callback;
	hc_wrapper.element=element;
	hc_wrapper.domain=domain;
	if(pullDownEl!=null)
	{
		if(!element["_myScroll"])
		{
			if(pullDownOffset==0)
				pullDownOffset=40;
			LEAP.getElement("[ctf=hc_scroller]",hc_wrapper).setAttribute("first","1");
			var myScroll = new iScroll(hc_wrapper, {
				scrollbarClass: 'myScrollbar',
				useTransition: false,
				bounce:true,
				topOffset: pullDownOffset,
				onRefresh: function () {
					if (pullDownEl.className.match('hc-pullloading')) {
						LEAP.removeCSS(pullDownEl,"hc-pullloading",false);
						LEAP.getElement("[ctf=hc_pullDownLabel]",hc_wrapper).innerHTML='下拉更新';
					} else if (pullUpEl.className.match('hc-pullloading')) {
						LEAP.removeCSS(pullUpEl,"hc-pullloading",false);
						LEAP.getElement("[ctf=hc_pullUpLabel]",hc_wrapper).innerHTML='上拉加载';
					}
				},
				onScrollMove: function () {
					if (this.y > 0 && !pullDownEl.className.match('hc-pullloading')) {
						LEAP.addCSS(pullDownEl,"hc-pullflip");
						LEAP.getElement("[ctf=hc_pullDownLabel]",hc_wrapper).innerHTML='释放更新';
					} else if (this.y < 0 && pullDownEl.className.match('hc-pullflip')) {
						LEAP.removeCSS(pullDownEl,"hc-pullflip",false);
						LEAP.getElement("[ctf=hc_pullDownLabel]",hc_wrapper).innerHTML='下拉更新';
					} else if (this.y < (this.maxScrollY>-40?-80:this.maxScrollY-40) && !pullUpEl.className.match('hc-pullloading')) {
						LEAP.addCSS(pullUpEl,"hc-pullflip");
						LEAP.getElement("[ctf=hc_pullUpLabel]",hc_wrapper).innerHTML='释放加载';
					} else if (this.y > (this.maxScrollY>-40?-80:this.maxScrollY-40) && pullUpEl.className.match('hc-pullflip')) {
						LEAP.removeCSS(pullUpEl,"hc-pullflip",false);
						LEAP.getElement("[ctf=hc_pullUpLabel]",hc_wrapper).innerHTML='上拉加载';
					}
				},
				onScrollEnd: function () {
					if (pullDownEl.className.match('hc-pullflip')) {
						LEAP.removeCSS(pullDownEl,"hc-pullflip",false);
						LEAP.addCSS(pullDownEl,"hc-pullloading");
						LEAP.getElement("[ctf=hc_pullDownLabel]",hc_wrapper).innerHTML='加载中...';
						LEAP.hc_scroll.callBack(hc_wrapper,"pullDown",myScroll);
					} else if (pullUpEl.className.match('hc-pullflip')) {
						LEAP.removeCSS(pullUpEl,"hc-pullflip",false);
						LEAP.addCSS(pullUpEl,"hc-pullloading");
						LEAP.getElement("[ctf=hc_pullUpLabel]",hc_wrapper).innerHTML='加载中...';
						LEAP.getElement("[ctf=hc_scroller]",hc_wrapper).style.transform="translate(0px, "+(this.y-40)+"px) scale(1) translateZ(0px)";
						hc_wrapper["_y"]=this.y;
						LEAP.hc_scroll.callBack(hc_wrapper,"pullUp",myScroll);
					}
				}
			});
			setTimeout(function () { hc_wrapper.style.left = '0px'; }, 800);
			element["_myScroll"]=myScroll;
		}
		else
		{
			if (pullDownEl.className.match('hc-pullloading'))
				LEAP.getElement("[ctf=hc_scroller]",hc_wrapper).setAttribute("first","1");
			else
				LEAP.getElement("[ctf=hc_scroller]",hc_wrapper).setAttribute("first","0");
			if(config)
				LEAP.getElement("[ctf=hc_scroller]",hc_wrapper).setAttribute("first","1");
			if(!type)
			{
				LEAP.getElement("[ctf=hc_scroller]",hc_wrapper).style.transform="translate(0px, "+(parseInt(hc_wrapper["_y"]))+"px) scale(1) translateZ(0px)";
			}
			element["_myScroll"].refresh();
		}
		return element["_myScroll"];
	}
	else
	{
		if(!element["_myScroll"])
		{
			LEAP.getElement("[ctf=hc_scroller]",hc_wrapper).setAttribute("first","1");
			var myScroll = new iScroll(hc_wrapper, {
				scrollbarClass: 'myScrollbar',
				useTransition: false,
				bounce:true,
				topOffset: 0,
				onRefresh: function () {
					
					var pulldown = hc_wrapper.getAttribute("pulldown");
					var pullup = hc_wrapper.getAttribute("pullup");
					if(pulldown=="loading")
						hc_wrapper.removeAttribute("pulldown");
					else if(pullup=="loading")
						hc_wrapper.removeAttribute("pullup");
				},
				onScrollMove: function () {
					var pulldown = hc_wrapper.getAttribute("pulldown");
					var pullup = hc_wrapper.getAttribute("pullup");
					if(this.y>0 && pulldown!="loading")
					{
						hc_wrapper.setAttribute("pulldown","flip");
					}
					else if (this.y < 0 && pulldown=="flip")
					{
						hc_wrapper.setAttribute("pulldown","");
					}
					else if(this.y < (this.maxScrollY>-40?-80:this.maxScrollY-40) && pullup!="loading")
					{
						hc_wrapper.setAttribute("pullup","flip");
					}
					else if(this.y > (this.maxScrollY>-40?-80:this.maxScrollY-40) && pullup=="flip")
					{
						hc_wrapper.setAttribute("pullup","");
					}
				},
				onScrollEnd: function () {
					var pulldown = hc_wrapper.getAttribute("pulldown");
					var pullup = hc_wrapper.getAttribute("pullup");
					if(pulldown=="flip")
					{
						hc_wrapper.setAttribute("pulldown","loading");
						LEAP.hc_scroll.callBack(hc_wrapper,"pullDown",myScroll);
					}
					else if(pullup=="flip")
					{
						hc_wrapper.setAttribute("pullup","loading");
						LEAP.getElement("[ctf=hc_scroller]",hc_wrapper).style.transform="translate(0px, "+(this.y-40)+"px) scale(1) translateZ(0px)";
						hc_wrapper["_y"]=this.y;
						LEAP.hc_scroll.callBack(hc_wrapper,"pullUp",myScroll);
					}
				}
			});
			setTimeout(function () { hc_wrapper.style.left = '0px'; }, 800);
			element["_myScroll"]=myScroll;
		}
		else
		{
			var pulldown = hc_wrapper.getAttribute("pulldown");
			var pullup = hc_wrapper.getAttribute("pullup");
			if (pulldown=="loading")
				LEAP.getElement("[ctf=hc_scroller]",hc_wrapper).setAttribute("first","1");
			else
				LEAP.getElement("[ctf=hc_scroller]",hc_wrapper).setAttribute("first","1");
			if(config)
				LEAP.getElement("[ctf=hc_scroller]",hc_wrapper).setAttribute("first","1");
			if(!type)
			{
				LEAP.getElement("[ctf=hc_scroller]",hc_wrapper).style.transform="translate(0px, "+(parseInt(hc_wrapper["_y"]))+"px) scale(1) translateZ(0px)";
			}
			element["_myScroll"].refresh();
		}
	}
}
LEAP.hc_scroll.callBack = function(hc_wrapper,type,myScroll)
{
	setTimeout(function(){
		var callback=hc_wrapper.callBack;
		var element=hc_wrapper.element;
		var domain=hc_wrapper.domain;
		callback.apply(domain,[element,type,myScroll]);
	},300);
}

LEAP.hc_select = {};
LEAP.hc_select.d="hc_select";
LEAP.hc_select.domStr = '<div class="hc-popup hc-popup-down" ctf="hc_selectpickermain">'+
    '<div class="hc-picker-main">'+
      '<div class="hc-picker-handle">'+
        '<button class="hc-button-text hc-button-info" ctf="hc_selectpickerclear">'+
          '<span class="hc-button-label">取消</span>'+
        '</button>'+
        '<button disabled class="hc-button-text hc-button-info">'+
          '<span class="hc-button-label" ctf="hc_selectpickerlabel"></span>'+
        '</button>'+
        '<button class="hc-button-text hc-button-primary" ctf="hc_selectpickersuer">'+
          '<span class="hc-button-label">确认</span>'+
        '</button>'+
      '</div>'+
      '<div class="hc-picker-body">'+
        '<div class="hc-picker" ctf="hc_selectpicker_body">'+
        '</div>'+
      '</div>'+
    '</div>'+
  '</div>';
LEAP.hc_select.itemstr = '<div class="hc-picker-item" ctf="hc_selectpicker_item">'+
				            '<div class="hc-picker-inner">'+
				              '<div class="hc-picker-rule hc-picker-rule-top" ctf="hc_picker_item_selected"></div>'+
				              '<ul class="hc-picker-list" ctf="hc_picker_item_ul">'+
				              '</ul>'+
				              '<div class="hc-picker-rule hc-picker-rule-bottom"></div>'+
				            '</div>'+
				          '</div>';
LEAP.hc_select.ui=null;
LEAP.hc_select.options=null;
LEAP.hc_select.codelevel = 0;
LEAP.hc_select.codes = null;
LEAP.hc_select.pcodeid=null;
LEAP.hc_select.loadflag = false;
LEAP.hc_select._init = function()
{
	LEAP.addEvent(document.body,'click',LEAP.hc_select.uiProcess,null,null,true);
	UIEventManager.removeEvent(window, 'load', LEAP.hc_date._init);
}
LEAP.hc_select.init = function()
{
	if (document != null && document.body != null)
		LEAP.hc_select._init();
	else
		UIEventManager.addEvent(window, 'load', LEAP.hc_select._init);
}();
LEAP.hc_select.uiProcess = function(arg)
{
	var src = arg.e.srcElement;
	var ctf = src.getAttribute("ctf");
	var type = arg.e.type;
	var element = LEAP._match(src,LEAP.hc_select.d,'ct',999);
	if(!element)
		return;
	if(type=="click" && (ctf=="hc_selectinput" || ctf=="hc_selectframe" || ctf=="hc_selecticon"))
	{
		element["_value"]=null;
		var selectinput = LEAP.getElement("[ctf=hc_selectinput]",element);
		var datav = selectinput.getAttribute("datav");
		if(datav!=null)
			element["_value"]=datav;
		var options = element.getAttribute("data-options");
		var _options = options?JSON.parse(options):{};
		var hc_selectinput = LEAP.getElement("[ctf=hc_selectinput]",element);
		var v = hc_selectinput.value;
		if(v!=null && v!="")
			_options.value=v;
		if(_options.code==null)
			_options.code="";
		LEAP.hc_select.codes = _options.code.split(",");
		if(_options.type=="areagroup")
		{
			var userareaid = null;
			if(_options.pcode!=null)
				userareaid = _options.pcode;
			else if(LEAP.userInfo!=null)
				userareaid = LEAP.userInfo.areaid;
			else
				userareaid = '000000000000000000';
			var areaid = LEAP.getrealarea(userareaid);
			if(areaid!=null)
			{
				LEAP.hc_select.pcodeid=areaid;
				LEAP.hc_select.codelevel = LEAP.getarealevel(areaid);
			}
			_options.layer = LEAP.hc_select.codes.length-LEAP.hc_select.codelevel;
		}
		else
		{
			LEAP.hc_select.codelevel=1;
			_options.layer = LEAP.hc_select.codes.length;
		}
		var codevalues = _options.values;
		if(String.isEmpty(_options.code) && codevalues==null)
			return;
		
		element["_codevalues"]=codevalues;
		var ui = LEAP.hc_select.initPicker(element,_options);
		LEAP.hc_select.setData(element);
		LEAP.hc_select.show();
		LEAP.hc_select.setSelectedValue(element["_value"]);
		PageSteps.setStep(ui.selectpicker);
	}
}
LEAP.hc_select.getCodeValue = function(codeTypeName, parentCode)
{
	if(LEAP.userInfo!=null)
		return LEAP.getCodeValue(codeTypeName, parentCode);
	else
		return LEAP.getCodeValue1(codeTypeName, parentCode);
}
LEAP.hc_select.getareacodevalue = function(areaid)
{
	if(LEAP.userInfo!=null)
		return LEAP.getareacodevalue(areaid);
	else
		return LEAP.getareacodevalue1(areaid);
}
LEAP.hc_select.getCodeById = function(codeTypeName,codeid)
{
	if(LEAP.userInfo!=null)
		return LEAP.getCodeById(codeTypeName,codeid);
	else
		return LEAP.getCodeById1(codeTypeName,codeid);
}
LEAP.hc_select.createDom = function(str)
{
	if(typeof(str) !== "string")
	{
		if ((str instanceof Array) || (str[0] && str.length)) {
			return [].slice.call(str);
		} else {
			return [str];
		}
	}
	var create_dom_div = null;
	if(!create_dom_div)
		create_dom_div = document.createElement("div");
	create_dom_div.innerHTML=str;
	return [].slice.call(create_dom_div.childNodes);
}
LEAP.hc_select.initPicker = function(element,options)
{
	LEAP.hc_select.disposed=false;
	var _selectpicker = LEAP.hc_select.createDom(LEAP.hc_select.domStr)[0];
	var stepel = PageSteps.getStep();
	if(stepel)
	{
		var index = parseInt(stepel.style.zIndex);
		index=index+3
		_selectpicker.style.zIndex=index;
	}
	else
		_selectpicker.style.zIndex=104;
	document.body.appendChild(_selectpicker);
	options = options || {};
	options.buttons = options.buttons || ['取消', '确定'];
	var ui = {};
	ui.ok = LEAP.getElement("[ctf=hc_selectpickersuer]",_selectpicker);
	ui.cancel = LEAP.getElement("[ctf=hc_selectpickerclear]",_selectpicker);
	ui.body = LEAP.getElement("[ctf=hc_selectpicker_body]",_selectpicker);
	ui.label = LEAP.getElement("[ctf=hc_selectpickerlabel]",_selectpicker);
	ui.selectpicker=_selectpicker;
	LEAP.hc_select.ui = ui;
	LEAP.hc_select.options = options;
	ui.cancel.innerText = options.buttons[0];
	ui.ok.innerText = options.buttons[1];
	ui.cancel.addEventListener("click",LEAP.hc_select.dispose,false);
	ui.ok.addEventListener("click",
		function(){
			LEAP.hc_select.ok(element);	
		}
	,false);
	LEAP.hc_select._create(element,options);
	setTimeout(function(){
		LEAP.hc_select.getSelected(element);	
	},300)
	
	return ui;
}
LEAP.hc_select._create = function(element,options)
{
	var ui = LEAP.hc_select.ui;
	var options = LEAP.hc_select.options;
	var layer = options.layer || 1;
	var width = (100 / layer) + '%';
	options.pickers = [];
	for(var i=0;i<layer;i++)
	{
		var pickerElements = LEAP.hc_select.createDom(LEAP.hc_select.itemstr);
		var pickerElement = pickerElements[0];
		pickerElement.style.width = width;
		ui.body.appendChild(pickerElement);
		LEAP.hc_picker.init(options,pickerElements);
		options.pickers.add(pickerElement.picker);
		var code = null;
		if(options.type=="areagroup")
		{
			if(LEAP.hc_select.codelevel+i<LEAP.hc_select.codes.length)
				code = LEAP.hc_select.codes[LEAP.hc_select.codelevel+i];	
		}
		else
			code = LEAP.hc_select.codes[i];
		pickerElement.setAttribute("codename",code);
		var selecteditem = LEAP.getElement("[ctf=hc_picker_item_selected]",pickerElement);
		selecteditem.addEventListener("click",function(event){
			if(this.getAttribute("ctf")=="hc_picker_item_selected")
			{
				var item = this;
				var items = LEAP.getElements("[ctf=hc_picker_item_selected]");
				var ui = LEAP.hc_select.ui;
				var sub = new StringBuffer();
				for(var i=0;i<items.length;i++)
				{
					if(items[i]!=item)
						sub.append(items[i].getAttribute("selecttext"));
					else
						break;
				}
				sub.append(item.getAttribute("selecttext"));
				element["_selected"]=sub.toString();
				element["_value"]=item.getAttribute("selectvalue");
				ui.label.innerText=sub.toString();
				LEAP.hc_select.ok(element);
			}
		},false);
		pickerElement.addEventListener('change', function(event) {
			var nextPickerElement = this.nextSibling;
			var eventData = event.detail || {};
			var preItem = eventData.item || {};
			if(preItem!=null)
			{
				var box = LEAP._match(this,"hc_selectpicker_item",'ctf',5);
				var selected = LEAP.getElement("[ctf=hc_picker_item_selected]",box);
				selected.setAttribute("selectvalue",preItem.value);
				selected.setAttribute("selecttext",preItem.text);
			}
			if (nextPickerElement && nextPickerElement.picker) {
				var codename = nextPickerElement.getAttribute("codename");
				var childdata = null
				if(preItem.value)
				{
					var childdata = LEAP.hc_select.getCodeValue(codename,preItem.value);
					if(childdata)
						childdata = LEAP.hc_select.getzhvalue(childdata);
				}
				if(!LEAP.hc_select.loadflag)
					LEAP.hc_picker.setItems(nextPickerElement.picker,childdata,true);
				else
					LEAP.hc_picker.setItems(nextPickerElement.picker,childdata);
			}
			else
			{
				if(LEAP.hc_select.loadflag)
					LEAP.hc_select.loadflag=false;
			}
			LEAP.hc_select.getSelected(element);
		}, false);
	}
}
LEAP.hc_select.setSelectedValue = function(value)
{
	if(!String.isEmpty(value))
		LEAP.hc_select.loadflag=true;
	var ui = LEAP.hc_select.ui;
	var options = LEAP.hc_select.options;
	var items = LEAP.getElements("[ctf=hc_selectpicker_item]",ui.body);
	var codes = LEAP.hc_select.codes;
	var len = items.length;
	var sb = new StringBuffer();
	var temp = new StringBuffer();
	if(options.type=="areagroup")
	{
		var level = LEAP.hc_select.codelevel;
		var oldv = null;
		for(var i=0;i<len;i++)
		{
			var v = LEAP.getarea(value,level+i+1);
			if(!v)
				v=oldv+"001";
			if(i<=len-2)
				temp.append("});");
			if(len-1==i)
				sb.append(",function(){LEAP.hc_picker.setSelectedValue(items["+i+"].picker,'"+v+"',0);");
			else if(i==0)
				sb.append("LEAP.hc_picker.setSelectedValue(items["+i+"].picker,'"+v+"',0");
			else
				sb.append(",function(){LEAP.hc_picker.setSelectedValue(items["+i+"].picker,'"+v+"',0");
			oldv=v;
		}
	}
	else
	{
		if(len==1)
			sb.append("LEAP.hc_picker.setSelectedValue(items[0].picker,'"+value+"',0);");
		else
		{
			if(String.isEmpty(value))
			{
				var pcodevalues = null;
				for(var i=0;i<len;i++)
				{
					var codevalues = null;
					if(i==0)
						codevalues = LEAP.hc_select.getCodeValue(codes[i]);
					else 
						codevalues = LEAP.hc_select.getCodeValue(codes[i],pcodevalues[0].codeid);
					pcodevalues = codevalues;
				}
				value = pcodevalues[0].codeid;
			}
			var pv = null;
			var values=[];
			for(var i=len-1;i>=0;i--)
			{
				var code = null;
				if(i==len-1)
					code = LEAP.hc_select.getCodeById(codes[i],value);
				else
					code = LEAP.hc_select.getCodeById(codes[i],pv);
				pv=code.codeparentid;
				values.add(code.codeid);
			}
			values = values.reverse();
			for(var i=0;i<len;i++)
			{
				if(i<=len-2)
					temp.append("});");
				if(len-1==i)
					sb.append(",function(){LEAP.hc_picker.setSelectedValue(items["+i+"].picker,'"+values[i]+"',0);");
				else if(i==0)
					sb.append("LEAP.hc_picker.setSelectedValue(items["+i+"].picker,'"+values[i]+"',0");
				else
					sb.append(",function(){LEAP.hc_picker.setSelectedValue(items["+i+"].picker,'"+values[i]+"',0");
			}
		}
	}
	var evalstr = sb.toString()+temp.toString();
	eval(evalstr);
}
LEAP.hc_select.getzhvalue = function(data)
{
	for(var i=0;i<data.length;i++)
	{
		data[i].value = data[i].codeid;
		data[i].text = data[i].codevalue;
	}
	return data;
}
LEAP.hc_select.setData = function(element)
{
	var options = LEAP.hc_select.options;
	var codes = LEAP.hc_select.codes;
	var type = options.type;
	var codevalues = null;
	if(type=="areagroup")
	{
		var code = codes[LEAP.hc_select.codelevel];
		codevalues = LEAP.hc_select.getCodeValue(code,LEAP.hc_select.pcodeid);
	}
	else
	{
		if(element["_codevalues"]!=null)
			codevalues = element["_codevalues"];
		else
			codevalues = LEAP.hc_select.getCodeValue(codes[0]);
	}
	codevalues = LEAP.hc_select.getzhvalue(codevalues);
	if(codevalues)
		LEAP.hc_picker.setItems(options.pickers[0],codevalues);
}
LEAP.hc_select.show = function()
{
	var ui = LEAP.hc_select.ui;
	LEAP.showMask(null,function(){
		LEAP.hc_select.dispose();
		LEAP.hideMask();
	});
	setTimeout(function(){
		LEAP.addCSS(ui.selectpicker,"hc-popup-show");
	},1);
}
LEAP.hc_select.hide = function() 
{
	if (LEAP.hc_select.disposed) return;
	var ui = LEAP.hc_select.ui;
	LEAP.removeCSS(ui.selectpicker,"hc-popup-show")
	LEAP.hideMask();
}
LEAP.hc_select.ok = function(element)
{
	var selectinput = LEAP.getElement("[ctf=hc_selectinput]",element);
	selectinput.setAttribute("datav",element["_value"]);
	selectinput.value=element["_selected"];
	LEAP.hc_select.dispose();
}
LEAP.hc_select.getSelected = function(element)
{
	var ui = LEAP.hc_select.ui;
	var options = LEAP.hc_select.options;
	var items = LEAP.getElements("[ctf=hc_selectpicker_item]",ui.body);
	if(items)
	{
		var selected= new StringBuffer();
		var value = null;
		for(var i=0;i<items.length;i++)
		{
			var item = LEAP.hc_picker.getSelectedItem(items[i].picker);
			if(item)
			{
				if(!String.isEmpty(item.text))
					selected.append(item.text);
				if(!String.isEmpty(item.value))
					value=item.value;
			}
		}
		element["_selected"]=selected.toString();
		element["_value"]=value;
		ui.label.innerText=selected.toString();
	}
}
LEAP.hc_select.setValue = function(element,value)
{
	if(String.isEmpty(value))
		return;
	var selectinput = LEAP.getElement("[ctf=hc_selectinput]",element);
	var options = element.getAttribute("data-options");
	var _options = options?JSON.parse(options):{};
	var len = _options.code.split(",").length;
	var sb = new StringBuffer();
	if(_options.type=="areagroup")
	{
		var areavalue = LEAP.getrealarea(value);
		element["_value"]=areavalue;
		var userareaid = LEAP.userInfo.areaid;
		var areaid = LEAP.getrealarea(userareaid);
		var level = LEAP.getarealevel(areaid);
		
		for(var i=0;i<6-level;i++)
		{
			var area = LEAP.getarea(areavalue,level+i+1);
			if(area)
			{
				var code = LEAP.hc_select.getareacodevalue(area);
				sb.append(code.codevalue);	
			}		
		}
	}
	else
	{
		var codestr = _options.code;
		if(!String.isEmpty(codestr))
		{
			var codes = codestr.split(",");
			if(codes.length==1)
			{
				var code = LEAP.hc_select.getCodeById(codes[0],value);
				sb.append(code.codevalue);
			}
			else
			{
				var pv = null;
				var strs = [];
				for(var i=codes.length-1;i<=0;i--)
				{
					var code = null;
					if(i==codes.length-1)
						code = LEAP.hc_select.getCodeById(codes[i],vlaue);
					else
						code = LEAP.hc_select.getCodeById(codes[i],pv);
					if(!String.isEmpty(code.codeparentid))
						pv = code.codeparentid;
					strs.add(code.codevalue);
				}
				for(var i=strs.length-1;i<=0;i--)
					sb.append(strs[i]);
			}
		}
		element["_value"]=value;
	}
	selectinput.setAttribute("datav",element["_value"]);
	selectinput.value = sb.toString();
}
LEAP.hc_select.getValue = function(element)
{
	var value = null;
	var options = element.getAttribute("data-options");
	var _options = options?JSON.parse(options):{};
	if(_options.type=="areagroup")
	{
		value = element["_value"];
		if(!value)
			return value;
		var len = value.length;
		if(len<18)
		{
			for(var i=0;i<18-len;i++)
			{
				value=value+"0";
			}
		}
	}
	else
	{
		value = element["_value"];
	}
	return value;
}
LEAP.hc_select.dispose = function()
{
	LEAP.hc_select.hide();
	setTimeout(function() {
		LEAP.hc_select.ui.selectpicker.parentNode.removeChild(LEAP.hc_select.ui.selectpicker);
		LEAP.hc_select.ui=null;
		LEAP.hc_select.options=null;
		LEAP.hc_select.disposed = true;
	}, 300);
	PageSteps.removeStep();
}
LEAP.hc_slidectr={};
LEAP.hc_slidectr.config = function(element,identity,callback,domain)
{
	if(!element)
		return;
	if(String.isEmpty(identity))
		return;
	var args = {};
	args.element = element;
	args.callback = callback;
	args.domain = domain;
	args.identity = identity;
	LEAP.addEvent(element,'touchstart',LEAP.hc_slidectr.uiProcess,args,null,true);
}
LEAP.hc_slidectr.uiProcess = function(arg)
{
	var par = null;
	if(arg.e)
		par = arg.e;
	else
		par = arg;
	var src = par.srcElement;
	var type = par.type;
	var args = null;
	if(arg.arg)
		args=arg.arg;
	var callback = args.callback;
	var element = args.element;
	var domain = args.domain;
	if (domain == null)
		domain = window;
	var identity = args.identity;
	if(!element)
		return;
	if(type=="touchstart")
	{
		LEAP.addEvent(element,"touchmove",LEAP.hc_slidectr.uiProcess,args,null,true);
		LEAP.addEvent(element,"touchend",LEAP.hc_slidectr.uiProcess,args,null,true);
		var touch = par.touches[0];
		var el = element.children[0];
		var ctf = el.getAttribute(identity);
		var target = null;
		if(touch.target.getAttribute(identity)==ctf)
			target = touch.target;
		else
			target = LEAP._match(touch.target,ctf,identity,99);
		if(target==null)
			return;
		var len = element.children.length;
		var num = 0;
		for(var i=0;i<len;i++)
		{
			if(target==element.children[i])
			{
				num=i;
				break;
			}
		}
		var pageWidth = window.innerWidth;
		var direction = "left";
		var maxWidth = - pageWidth * (len-1);
		var pageNum = parseInt(num)+1;
		element["startX1"]=touch.pageX;
		element["startX"]=touch.pageX+((pageNum-1)*pageWidth);
    	element["startY"]=touch.pageY;
    	element["initialPos"] = 0;
    	element.style.webkitTransition = "";
    	element["startT"] = new Date().getTime();
    	element["isMove"] = false;
    	element["isTouchEnd"] = false;
    	element["pageNum"]=pageNum;
    	element["maxWidth"]=maxWidth;
    	element["direction"]=direction;
    	element["pageWidth"]=pageWidth;
    	element["moveLength"]=0;
	}
	if(type=="touchmove")
	{
		if(element["isTouchEnd"]) return ;
		var touch = par.touches[0];
		var deltaX1 = touch.pageX -element["startX1"];
		var deltaX = touch.pageX - element["startX"];
		var deltaY = touch.pageY - element["startY"];
		if (Math.abs(deltaX1) > Math.abs(deltaY)){
			par.preventDefault();
			element["moveLength"] = deltaX;
			var translate = element["initialPos"]+deltaX;
			if (translate <=0 && translate >= element["maxWidth"]){
				var move = translate +'px';
    			element.style.webkitTransform= "translate3d("+translate+"px,0,0)";
				element["isMove"] = true;
			}
			element["direction"] = element["__pageX"]>touch.pageX?"right":"left";
			element["__pageX"]=touch.pageX;
		}
	}
	if(type=="touchend")
	{
		LEAP.removeEvent(element,"touchmove",LEAP.hc_slidectr.uiProcess,true);
		LEAP.removeEvent(element,"touchend",LEAP.hc_slidectr.uiProcess,true);
		element.style.webkitTransition = "0.3s ease -webkit-transform";
		var len = element.children.length;
		var direction = element["direction"];
    	var pageNum = element["pageNum"];
    	var pageWidth = element["pageWidth"];
    	var moveLength = element["moveLength"];
    	var isTouchEnd = element["isTouchEnd"];
    	var isMove = element["isMove"];
    	var startT = element["startT"];
		var moveper = 0;
		if(direction=="left")
			moveper = (Math.abs(moveLength)-((pageNum-1)*pageWidth))/pageWidth;
		else
			moveper = Math.abs(moveLength)/pageWidth;
    	var moveperstr = moveper+"";
    	var moveperstrs = moveperstr.split(".");
    	var per = "0."+moveperstrs[1];
    	
		var translate = 0;
        var deltaT = new Date().getTime() - startT;
        if (isMove && !isTouchEnd){ 
           element["isTouchEnd"] = true;
           var percentage=0;
            if(deltaT < 500){
            	percentage=0.2;
            }else {
            	percentage=0.4;
            }
            if(LEAP.tonum(per) > percentage)
        	{
        		if(direction=="left")
        		{
        			if(parseInt(pageNum)>1)
        				translate = -(parseInt(pageNum)-2)*100;
        			else
        				translate = 0;
        		}
        		else if(direction=="right")
        		{
        			if(parseInt(pageNum)>=len)
        				translate = -(len-1)*100;
        			else
        				translate = -(parseInt(pageNum))*100;
        		}
        		
        	}else
        		translate = -(pageNum-1)*100;
            var move = translate +'vw';
    		element.style.transform='translateX('+move+')';
    		var pnum = Math.abs(translate)/100;
    		
    		if(callback)
    		{
    			var pars = {};
    			pars.pageNum = pnum;
    			pars.src = element;
    			callback.apply(domain, [pars]);
    		}
        }
	}
}
LEAP.hc_slidelist = {};
LEAP.hc_slidelist.d="hc_slidelist";
LEAP.hc_slidelist._init = function()
{
	LEAP.addEvent(document.body,'click',LEAP.hc_slidelist.uiProcess,null,null,true);
	UIEventManager.removeEvent(window, 'load', LEAP.hc_slidelist._init);
}
LEAP.hc_slidelist.init = function()
{
	if (document != null && document.body != null)
		LEAP.hc_slidelist._init();
	else
		UIEventManager.addEvent(window, 'load', LEAP.hc_slidelist._init);
	ElementEventManager.addManagedEventType(LEAP.hc_slidelist.d, 'itemClick');
}();
LEAP.hc_slidelist.uiProcess = function(arg)
{
	var par = null;
	if(arg.e)
		par = arg.e;
	else
		par = arg;
	var src = par.srcElement;
	var type = par.type;
	var ctf = src.getAttribute("ctf");
	var ctfe = src.getAttribute("ctfe");
	var element = LEAP._match(src,LEAP.hc_slidelist.d,'ct',999);
	if(!element)
		return;
	if(type=="click" && ctfe=="hc_slistclick")
	{
		if(ctf=="hc_slist_idtitem")
		{
			LEAP.hc_slidelist.itemClick(element,src,true);
		}
		else
		{
			var oitem = null;
			if(ctf=="hc_slist_oitem")
				oitem=src;
			else
				oitem = LEAP._match(src,"hc_slist_oitem","ctf",2);
			var data = oitem["_data"];
			ElementEventManager.handleEvent(element, 'itemClick',
			{
				element			: element,
				data			: data
			});
		}
	}
}
LEAP.hc_slidelist.itemClick = function(element,item,type)
{
	if(item.className.indexOf("hc-slidelist-active") > -1)return;
	LEAP.removeCSS(LEAP.getElements("[ctf=hc_slist_idtitem]",element),"hc-slidelist-active",true);
	LEAP.addCSS(item,"hc-slidelist-active");
	if(type)
	{
		var _slistbox=LEAP.getElement("[ctf=hc_slistbox]",element);
	    var move = - parseInt(item.getAttribute("_olistindex"))*100 +'vw';
	    _slistbox.style.transform='translateX('+move+')';
	}
}
LEAP.hc_slidelist.setValue = function(element,datas)
{
	if(!element)
		return;
	if(!datas)
		return;
	var options = element.getAttribute("data-options");
	var _options = options?JSON.parse(options):{};
	if(!_options.maxline)
		_options.maxline=2;
	if(!_options.linenum)
		_options.linenum=4;
	element["_options"]=_options;
	var _slistbox = LEAP.getElement("[ctf=hc_slistbox]",element);
	_slistbox.style.webkitTransition = "0.3s ease -webkit-transform";
	var _slistitem = LEAP.getElement("[ctf=hc_slistitem]",_slistbox);
	if(!element["_slistitem"])
	{
		var _slistul = LEAP.getElement("[ctf=hc_slistul]",_slistitem);
		var _slistoitem = LEAP.getElement("[ctf=hc_slist_oitem]",_slistul);
		element["_slistoitem"] = _slistoitem.outerHTML;
		_slistul.removeChild(_slistoitem);
		element["_slistitem"] = _slistitem.outerHTML;
		_slistbox.removeChild(_slistitem);
		var _slistidt = LEAP.getElement("[ctf=hc_slist_idt]",element);
		var _slistidtitem = LEAP.getElement("[ctf=hc_slist_idtitem]",_slistidt);
		element["_slistidtitem"]=_slistidtitem.outerHTML;
		_slistidt.removeChild(_slistidtitem);
	}
	LEAP.hc_slidelist.addItems(element,datas);
	LEAP.hc_slidectr.config(_slistbox,"ctf",LEAP.hc_slidelist.slidecallback);
}
LEAP.hc_slidelist.slidecallback = function(arg)
{
	var src = arg.src;
	var pnum = arg.pageNum;
	var element = LEAP._match(src,LEAP.hc_slidelist.d,'ct',999);
	if(!element)
		return;
	var tabItems = LEAP.getElements("[ctf=hc_slist_idtitem]",element);
	var item = tabItems[pnum];
	LEAP.hc_slidelist.itemClick(element,item);
}
LEAP.hc_slidelist.addItems = function(element,datas)
{
	if(!element)
		return;
	var _slistbox = LEAP.getElement("[ctf=hc_slistbox]",element);
	var _slistidt = LEAP.getElement("[ctf=hc_slist_idt]",element);
	var _options = element["_options"];
	var width = (100 / parseInt(_options.linenum)) + '%';
	var linenum = _options.linenum;
	var maxline = _options.maxline;
	var maxnum = linenum*maxline;
	var len = datas.length;
	var pageCount = len/(linenum*maxline);
	if(pageCount<1)
		pageCount=1;
	else if(pageCount>1)
	{
		var count = pageCount+"";
		if(count.indexOf(".")>-1)
			pageCount = parseInt(count.substring(0,count.indexOf(".")))+1;
	}
	if(pageCount>1 && maxline>1)
		_slistidt.style.display="-webkit-flex";
	var count=0;
	for(var i=0;i<pageCount;i++)
	{
		var tempdiv = document.createElement("div");
		tempdiv.innerHTML=element["_slistitem"];
		var newitem = tempdiv.children[0];
		newitem.setAttribute("_olistindex",i);
		if(maxline==1)
			newitem.style.paddingTop="0.5rem";
		var _slistul = LEAP.getElement("[ctf=hc_slistul]",newitem);
		for(var j=0;j<maxnum;j++)
		{
			if(count<=datas.length-1)
			{
				var tempdiv1 = document.createElement("div");
				tempdiv1.innerHTML=element["_slistoitem"];
				var newitem1 = tempdiv1.children[0];
				newitem1.style.width=width;
				
				LEAP.hc_slidelist.addItem(newitem1,datas[count]);
				_slistul.appendChild(newitem1);
			}
			count++;
		}
		_slistbox.appendChild(newitem);
		var tempdiv2 = document.createElement("div");
		tempdiv2.innerHTML=element["_slistidtitem"];
		var newitem2 = tempdiv2.children[0];
		if(i==0)
			newitem2.className="hc-slidelist-active";
		newitem2.setAttribute("_olistindex",i);
		_slistidt.appendChild(newitem2);
	}
}
LEAP.hc_slidelist.addItem = function(newli,rowdata)
{
	newli["_data"]=rowdata;
	var mds = LEAP.getElements("[md]",newli);
	for(var i=0;i<mds.length;i++)
	{
		var md = mds[i].getAttribute("md");
		var bt = mds[i].getAttribute("bt");
		if(bt=="text")
			mds[i].innerHTML=rowdata[md];
		else if(bt=="img")
		{
			if(rowdata[md]!=null)
				mds[i].setAttribute("src",leapconfig.server+rowdata[md]);
			else
				mds[i].setAttribute("src",leapconfig.server+"LEAP/HC/hcimages/HC_slidelist/default.png");
		}
	}
}
LEAP.hc_switch = {};
LEAP.hc_switch.d="hc_switch";
LEAP.hc_switch._init = function()
{
	LEAP.addEvent(document.body,'click',LEAP.hc_switch.uiProcess,null,null,true);
	UIEventManager.removeEvent(window, 'load', LEAP.hc_switch._init);
}
LEAP.hc_switch.init = function()
{
	if (document != null && document.body != null)
		LEAP.hc_switch._init();
	else
		UIEventManager.addEvent(window, 'load', LEAP.hc_switch._init);
	ElementEventManager.addManagedEventType(LEAP.hc_switch.d, 'valueChange');
}();
LEAP.hc_switch.uiProcess = function(arg)
{
	var src = arg.e.srcElement;
	var type = arg.e.type;
	var ctf = src.getAttribute("ctf");
	var element = LEAP._match(src,LEAP.hc_switch.d,'ct',999);
	if(!element)
		return;
	if(type=="click" && (ctf=="hc_switchinput" || ctf=="hc_switchlabel" || ctf=="hc_switchframe"  || ctf=="hc_switchicon"))
	{
		var values = element.getAttribute("values");
		if(values!=null && values!="")
		{
			values=JSON.parse(values);
		}
		
		var switchinput = LEAP.getElement("[ctf=hc_switchinput]",element);
		if(switchinput.getAttribute("checked")=="" || switchinput.getAttribute("checked")==true || switchinput.getAttribute("checked")=="true" || switchinput.getAttribute("checked")=="checked")
		{
			switchinput.removeAttribute("checked");
			element["_value"]=values[1];
			LEAP.removeCSS(element,"hc-form-switch-active",false);
		}
		else
		{
			switchinput.setAttribute("checked",true);
			element["_value"]=values[0];
			LEAP.addCSS(element,"hc-form-switch-active");
		}
		ElementEventManager.handleEvent(element, 'valueChange',
		{
			element			: element,
			value			: element["_value"]
		});
	}
}
LEAP.hc_switch.setValue = function(element,value)
{
	var values = element.getAttribute("values");
	if(values!=null && values!="")
	{
		values=JSON.parse(values);
	}
	var switchinput = LEAP.getElement("[ctf=hc_switchinput]",element);
	if(values)
	{
		var index = 0;
		for(var i=0;i<values.length;i++)
		{
			var v = values[i];
			if(v==value)
			{
				index=i;
				element["_value"]=value;
			}
		}
		if(index==0)
		{
			LEAP.addCSS(element,"hc-form-switch-active");
			switchinput.setAttribute("checked",true);
		}
		else
		{
			LEAP.removeCSS(element,"hc-form-switch-active",false);
			switchinput.removeAttribute("checked");
		}
	}
}
LEAP.hc_switch.getValue = function(element)
{
	return element["_value"];
}
LEAP.hc_tab = {};
LEAP.hc_tab.d="hc_tab";
LEAP.hc_tab._init = function()
{
	LEAP.addEvent(document.body,'click',LEAP.hc_tab.uiProcess,null,null,true);
	UIEventManager.removeEvent(window, 'load', LEAP.hc_tab._init);
}
LEAP.hc_tab.initControl = function(wait,src)
{
	if (!src)
	{
		if (!event)
			return;
		src = event.srcElement;
	}
	if (!src)
		return;

	if (wait != null)
	{
		var fn = function()
		{
			LEAP.hc_tab.initControl(null, src);
			src = null;
		};
		setTimeout(fn, wait);
		return;
	}
	var element = src.parentElement;
	if(!element)
		return;
	LEAP.hc_tab.initIndex(element);
	var tabcontentbox = LEAP.getElement("[ctf=hc_tabcontentbox]",element);
	var options = element.getAttribute("data-options");
	var _options = options?JSON.parse(options):{};
	element["_options"]=_options;
	if(_options.isslide=="1" || _options.isslide==null || _options.isslide=="")
		LEAP.hc_slidectr.config(tabcontentbox,"ctf",LEAP.hc_tab.slidecallback);
	if(element.className.indexOf("hc-tab-stretch")<0)
	{
		var tabulbox = LEAP.getElement("[ctf=hc_tabulbox]",element)
//		LEAP.addEvent(tabulbox,'touchstart',LEAP.hc_tab.removeulbox,null,null,true);
	}
}
LEAP.hc_tab.init = function()
{
	if (document != null && document.body != null)
		LEAP.hc_tab._init();
	else
		UIEventManager.addEvent(window, 'load', LEAP.hc_tab._init);
	ElementEventManager.addManagedEventType(LEAP.hc_tab.d, 'selectedIndexChange');
}();
LEAP.hc_tab.removeulbox = function(arg)
{
	var src = arg.e.srcElement;
	var type = arg.e.type;
	var ctf = src.getAttribute("ctf");
	var element = LEAP._match(src,LEAP.hc_tab.d,'ct',999);
	if(!element)
		return;
	if(type=="touchstart")
	{
		var tabulbox = LEAP.getElement("[ctf=hc_tabulbox]",element)
		LEAP.addEvent(tabulbox,"touchmove",LEAP.hc_tab.removeulbox,null,null,true);
		LEAP.addEvent(tabulbox,"touchend",LEAP.hc_tab.removeulbox,null,null,true);
		var touch = arg.e.touches[0];
		
		if(tabulbox["movelength"]==null)
			tabulbox["movelength"] = 0;
		tabulbox["startX"]=touch.pageX+Math.abs(tabulbox["movelength"]);
		tabulbox["startX1"]=touch.pageX;
	}
	if(type=="touchmove")
	{
		var tabulbox = LEAP.getElement("[ctf=hc_tabulbox]",element);
		var maxwidth = -((tabulbox.scrollWidth)-window.innerWidth);
		var touch = arg.e.touches[0];
		var deltaX = touch.pageX - tabulbox["startX"];
		if(deltaX<=0 && deltaX>=maxwidth)
		{
			tabulbox["movelength"]=touch.pageX-tabulbox["startX1"];
			tabulbox.style.webkitTransform= "translate3d("+deltaX+"px,0,0)";
		}
	}
	if(type=="touchend")
	{
		var tabulbox = LEAP.getElement("[ctf=hc_tabulbox]",element);
		LEAP.removeEvent(tabulbox,"touchmove",LEAP.hc_tab.removeulbox,true);
		LEAP.removeEvent(tabulbox,"touchend",LEAP.hc_tab.removeulbox,true);
		tabulbox.style.webkitTransition = "0.3s ease -webkit-transform";
	}
}
LEAP.hc_tab.uiProcess = function(arg)
{
	var par = null;
	if(arg.e)
		par = arg.e;
	else
		par = arg;
	var src = par.srcElement;
	var type = par.type;
	var ctf = src.getAttribute("ctf");
	var element = LEAP._match(src,LEAP.hc_tab.d,'ct',999);
	if(!element)
		return;
	if(type=="click" && (ctf=="hc_tabitem" || ctf=="hc_tabicon" || ctf=="hc_tablabel" || ctf=="hc_tabbadge"))
	{
		var item = null;
		if(ctf=="hc_tabitem")
			item=src;
		else
			item = LEAP._match(src,"hc_tabitem","ctf",5);
		LEAP.hc_tab.setSelectedIndex(element,parseInt(item.getAttribute("hc_tab_index")),true);
	}
}
LEAP.hc_tab.initIndex = function(element)
{
	//var tabitems = LEAP.getElements("[hc_tab_index]",element);
	//if (!tabitems || tabitems.length == 0 )
	{
		var tabcontentbox = LEAP.getElement("[ctf=hc_tabcontentbox]",element);
		
		tabcontentbox.style.webkitTransition = "0.3s ease -webkit-transform";
		var tabitems = LEAP.getElements("[ctf=hc_tabitem]",element);
		if (tabitems != null)
		{
			var contents = LEAP.getElements("[ctf=hc_contentitem]",element); 
			for(var i=0; i<tabitems.length; i++)
			{
				tabitems[i].setAttribute("tapmode","");
				tabitems[i].setAttribute("hc_tab_index",i);
				contents[i].setAttribute("hc_tab_index",i);
			}
		}
	}
}

LEAP.hc_tab.getSelectedIndex = function(element)
{
	try
	{
		var tabitems = LEAP.getElements("[ctf=hc_tabitem]", element);
		if (tabitems != null)
		{
			for(var i=0; i<tabitems.length; i++)
			{
				var item = tabitems[i];
				if (item.className.indexOf("hc-tab-bar-active") > -1)
				{
					return item.getAttribute("hc_tab_index");
				}
			}
		}
		
		return -1;
	}
	finally
	{
		tabitems = i = item = null; 
	}
}

LEAP.hc_tab.setSelectedIndex = function(element,index,type)
{
	if(!element["_loadindex"])
		element["_loadindex"]=new Array();
	var reload = null;
	if(element["_options"]!=null)
	{
		reload = element["_options"].reload;
	}
	if(reload!="1")
	{
		if(element["_loadindex"].contains(index))
		{
			return;
		}	
	}
	if(index==null)
		index=0;
	var tabitems = LEAP.getElements("[ctf=hc_tabitem]",element);
	var item = tabitems[index];
	var boxs = LEAP.getElement("[ctf=hc_tabcontentbox]",element);
	var contentitems = LEAP.getElements("[ctf=hc_contentitem]",boxs);
	var citem = contentitems[index];
	
	if (type == null || type != false) //默认true
		type = true;
		
	LEAP.hc_tab.itemClick(element,item,type);
	ElementEventManager.handleEvent(element, 'selectedIndexChange',
	{
		tab				: element,
		index			: index,
		element_content	: citem,
		element_tab		: item,
		flag			: index
	});
	if(!element["_loadindex"].contains(index))
		element["_loadindex"].add(index);
}
LEAP.hc_tab.slidecallback = function(arg)
{
	var src = arg.src;
	var pnum = arg.pageNum;
	var element = LEAP._match(src,LEAP.hc_tab.d,'ct',999);
	if(!element)
		return;
	var tabItems = LEAP.getElements("[ctf=hc_tabitem]",element);
	var item = tabItems[pnum];
	LEAP.hc_tab.setSelectedIndex(element, parseInt(item.getAttribute("hc_tab_index")), false);
}
LEAP.hc_tab.itemClick = function(element,item,type)
{
	if(item.className.indexOf("hc-tab-bar-active") > -1)return;
	LEAP.removeCSS(LEAP.getElements("[ctf=hc_tabitem]",element),"hc-tab-bar-active",true);
	LEAP.addCSS(item,"hc-tab-bar-active");
	var rect = item.getBoundingClientRect();
	if(type)
	{
		var tabcontentbox=LEAP.getElement("[ctf=hc_tabcontentbox]",element);
	    var move = - parseInt(item.getAttribute("hc_tab_index"))*100 +'vw';
	    tabcontentbox.style.transform='translateX('+move+')';
	}
}

LEAP.hc_tab.getTabLables = function(element)
{
	return LEAP.getElements("[ctf=hc_tabitem]",element);
}

LEAP.hc_tab.getItem = function(element, index)
{
	try
	{
		var tabitems = LEAP.getElements("[ctf=hc_tabitem]",element);
		if (tabitems != null && tabitems.length>index)
		{
			var rst = {};
			rst.tabli = tabitems[index];
			
			var contents = LEAP.getElements("[ctf=hc_contentitem]", element);
			if (contents != null && contents.length>index)
				rst.tabcontent = contents[index];	
				
			return rst;
		}
		
		return null;		
	}
	finally
	{
		tabitems = rst = contents = null;
	}	
}

LEAP.hc_tab.removeItem = function(element, index)
{
	try
	{
		var labels = LEAP.getElements("[ctf=hc_tabitem]", element);
		var contents = LEAP.getElements("[ctf=hc_contentitem]", element); 
		if (labels != null)
		{			
			if (labels.length == 1 && index == 0) //如果只剩一个并且要移除
			{
				LEAP.removeCSS(labels[0], "hc-tab-bar-active", false); //移除active样式				
				contents[0].innerHTML = "";								//清空内容
			}
			else if (labels.length > 1)
			{
				for(var i = labels.length-1; i>-1; i--)
				{
					if(i==index)
					{
						labels[i].parentElement.removeChild(labels[i]);
						contents[i].parentElement.removeChild(contents[i]);
					}
				}
			}			
		}
		
		LEAP.hc_tab.initIndex(element);
	}
	finally
	{
		labels = contents = i = null;
	}
}

LEAP.hc_tab.addItem = function(element, title)
{
	try
	{
		var tab_labels = LEAP.getElements("[ctf=hc_tabitem]", element);
		var tab_contents = LEAP.getElements("[ctf=hc_contentitem]", element); 
		var tabelement = {};
		if(tab_labels)
		{
			var outhtml = tab_labels[tab_labels.length-1].outerHTML;			
			var div = document.createElement("div");
			div.innerHTML = outhtml;
			
			var oldli = div.children[0];
			var tabli = oldli.cloneNode(true);
			var pareElement = tab_labels[tab_labels.length-1].parentElement;
			pareElement.appendChild(tabli);
			
			var lab = LEAP.getElement("[ctf=hc_tablabel]", tabli);
			if (lab)
				lab.innerText = title;
						
			LEAP.removeCSS(tabli, "hc-tab-bar-active", false);
			tabelement.tabli = tabli;			
	
			
			outhtml = tab_contents[tab_contents.length-1].outerHTML;		
			div.innerHTML = outhtml;
			var con = div.children[0];
			var pareElement = tab_contents[tab_contents.length-1].parentElement;
			pareElement.appendChild(con);
			tabelement.tabcontent = con;	
									
			LEAP.hc_tab.initIndex(element);
		}
				
		return tabelement;
	}
	finally
	{
		tab_labels = tab_contents = tabelement = outhtml = div = oldli = tabli = pareElement = lab = contdiv = contElement = null;		
	}
}








LEAP.hc_textarea={};
LEAP.hc_textarea.onsetValue = function(src)
{
	var module = LEAP.getLoadedModule(src.getAttribute(commfields.instance));
	if(module!=null)
	{
		if(module.pageMode=="view")
		{
			var pel = src.parentElement;
			var value = src.value;
			var values = value.split("\n");
			var sb = new StringBuffer();
			for(var i=0;i<values.length;i++)
			{
				if(i==0)
					sb.append(values[i]);
				else
					sb.append("<br/>"+values[i]);
			}
			var str = '<div class="hc-form-textarea-label">'+sb.toString()+'</div>';
			pel.removeChild(src);
			pel.innerHTML=str;
		}
	}
}
/**
 * @class LEAP.hc_treeSelectBanner control
 * @type user control
 * @example 
 
  
 
 
 标签：
 paramStr: 选择参数,格式如下：
		 	[
				{
				 	tabTitle:标签页标题	
				 	type:0实体机构 1虚拟机构 2自定义树 3一维复选框
				 	searchParam:搜索参数
				 				{
				 					//以下为虚拟机构专用搜索参数
				 					topOrgan:顶点机构范围限制，0无限制，1限制顶点机构范围但结果不包括顶点机构本身  2限制为顶点机构范围且结构包括顶点机构本身, 默认0
								 	rootRanges:根范围，根名称逗号分隔
									categoryRanges:类型范围，名称逗号分隔	 		
									underAreaRange:区域ID范围限制
									equalAreaRange:等于某区域ID
									syscodeRange:  syscode范围
									includeSyscodeRange: 结果是否包含指定syscode机构,0不包含 1包含，默认0
									nodetype: 叶子节点类型，10 机构  11用户  15机构用户混合
									
									//以下为实体机构专用搜索参数
									topOrgan:顶点机构范围限制，0无限制 1限制, 默认1
									organRanges:机构ID范围，多机构之间以分号分隔, 
									includeOrganRange: 结果是否包含指定范围机构本身,0不包含 1包含，默认0
									rolenameRanges:角色名称范围，多角色名间以分号分隔,
									nodetype: 叶子节点类型，0机构、1岗位、2用户、3机构人混选， 默认0	
									
									_searchFn:自定义搜索函数
									_searchFnDomain:自定义搜索函数作用域
								}
								
					data:树数据，如果未指定searchParam参数或者type=2或3时， 则需指定自行构造数据	 		
					operationParam: 操作参数
								{
									lazy:是否延迟加载, boolean, 默认true
									treeStyle 机构树样式（0完全展开、1部分展开）, 默认1
									treeLevels 机构树默认展开层数，默认为3
									treeSingleCheck 1单选0多选, 默认1
									autoCheckChilds 多选时是否自动选中子节点，默认true
									allowMutiLevelCheck 多选时是否允许跨级选择，默认true
								}
				 	}
			 ]
  
*/

LEAP.hc_treeSelectBanner = {};
LEAP.hc_treeSelectBanner.d = 'hc_treeSelectBanner';
LEAP.hc_treeSelectBanner.symbol = {paramStr:"paramStr", paramObj:"paramObj"};
LEAP.hc_treeSelectBanner.tsb = {	TSB_tabctrl: "TSB_tabctrl" //标签页标识
								}; 
								
								
/*
LEAP.hc_treeSelectBanner.pd = 'hc_treeSelectBannerPop';
LEAP.hc_treeSelectBanner.ps = 'hc_treeSelectBannerPopSearch';
LEAP.hc_treeSelectBanner.ctf = {};
LEAP.hc_treeSelectBanner.symbol = {paramStr:"paramStr", paramObj:"paramObj", selectedItems:"selectedItems",
								TSB_group:"tsb_group",
									TSB_tabctrl: "TSB_tabctrl",
									TSB_tree: "TSB_tree",
									TSB_fre_Check: "TSB_fre_Check", //常用联系人复选框
									TSB_fre_Clear: "TSB_fre_Clear", //常用联系人清除
									TSB_fre_Container: "TSB_fre_Container",//常用联系人容器
									TSB_itemctrl: "TSB_itemctrl"
								}; 
*/

LEAP.hc_treeSelectBanner.init = function()
{
	if (document != null && document.body != null)
		LEAP.hc_treeSelectBanner._init();
	else 
		UIEventManager.addEvent(window, 'load', LEAP.hc_treeSelectBanner._init);	
		
	ElementEventManager.addManagedEventType(LEAP.hc_treeSelectBanner.d, 'valueChange');
}

LEAP.hc_treeSelectBanner._init = function()
{		
	LEAP.addEvent(document.body, 'click', LEAP.hc_treeSelectBanner.uiProcess, null, null, true);	
	UIEventManager.removeEvent(window, 'load', LEAP.hc_treeSelectBanner._init);
}

LEAP.hc_treeSelectBanner.uiProcess = function(arg)
{
	try
	{
		if (!arg.e || !arg.e.srcElement)
			return;		
		var src = arg.e.srcElement;
				
		var element = LEAP._match(src, LEAP.hc_treeSelectBanner.d);
		if(element == null)
			return;
		
		//TODO
	}
	finally
	{
		src = element = null;
	}
}

LEAP.hc_treeSelectBanner.setParams = function(element, params)//, clearSelectedItem)
{
	try
	{
		if (params == null)
		{
			element.removeAttribute(LEAP.hc_treeSelectBanner.symbol.paramStr);
			element[LEAP.hc_treeSelectBanner.symbol.paramObj] = null;
		}
		else
		{
			if (typeof(params) == "string")
			{
				if (params.isEmpty() == true)
				{
					element.removeAttribute(LEAP.hc_treeSelectBanner.symbol.paramStr);
					element[LEAP.hc_treeSelectBanner.symbol.paramObj] = null;
				}
				else
				{
					element.setAttribute(LEAP.hc_treeSelectBanner.symbol.paramStr, params);
					element[LEAP.hc_treeSelectBanner.symbol.paramObj] = null;
				}
			}
			else if (typeof(params) == "object")
			{
				element[LEAP.hc_treeSelectBanner.symbol.paramObj] = params;				
			}	
		}
		
		LEAP.hc_treeSelectBanner._i(element);
		
		/*//清除插件值和已选列表 TODO
		element[LEAP.hc_treeSelectBanner.symbol.selectedItems] = null;	
		
		if (clearSelectedItem != false)
		{
			var itemCtrl = LEAP.hc_treeSelectBanner.__getItemCtrl(element);
			if (itemCtrl != null)
				LEAP.item.clearItem(itemCtrl);
		}*/
			
		
	}
	finally
	{
		itemCtrl = null;
	}
}

LEAP.hc_treeSelectBanner.getParams = function(element)
{
	return element[LEAP.hc_treeSelectBanner.symbol.paramObj];
}

LEAP.hc_treeSelectBanner.__getParams = function(element)
{
	try
	{
		var params = element[LEAP.hc_treeSelectBanner.symbol.paramObj];
		if (params == null)
		{
			var pstr = element.getAttribute(LEAP.hc_treeSelectBanner.symbol.paramStr);
			if (pstr != null)
				params = JSON.parse(pstr);
		}
			
		if (params == null)
			return null;
		
		for(var i=0; i<params.length; i++)
		{
			var par = params[i];
			if (par == null)
				par = {};
			
			par.type = (par.type == null) ? 1 : par.type;
			par.tabTitle = (par.tabTitle == null) ? "默认标签" : par.tabTitle;
			par.operationParam = (par.operationParam == null) ? {} : par.operationParam;
			par.operationParam.lazy = (par.operationParam.lazy == null)? true : par.operationParam.lazy;		
			par.operationParam.treeStyle = (par.operationParam.treeStyle == null)? 1 : par.operationParam.treeStyle;
			par.operationParam.treeLevels = (par.operationParam.treeLevels == null)? 3 : par.operationParam.treeLevels;
			par.operationParam.treeSingleCheck = (par.operationParam.treeSingleCheck == null)? 1 : par.operationParam.treeSingleCheck;
			par.operationParam.autoCheckChilds = (par.operationParam.autoCheckChilds == null)? true : par.operationParam.autoCheckChilds;
			par.operationParam.allowMutiLevelCheck = (par.operationParam.allowMutiLevelCheck == null)? true : par.operationParam.allowMutiLevelCheck;
			
			if (par.type == 0)
			{
				par.searchParam = (par.searchParam == null) ? {} : par.searchParam;
				par.searchParam.topOrgan = (par.searchParam.topOrgan == null) ? 1: par.searchParam.topOrgan;			
				par.searchParam.organRanges = (par.searchParam.organRanges == null) ? "": par.searchParam.organRanges;
				par.searchParam.includeOrganRange = (par.searchParam.includeOrganRange == null) ? 0: par.searchParam.includeOrganRange;
				par.searchParam.rolenameRanges = (par.searchParam.rolenameRanges == null) ? "": par.searchParam.rolenameRanges;
				par.searchParam.nodetype = (par.searchParam.nodetype == null) ? 0: par.searchParam.nodetype;		
			}
			else if (par.type == 1)
			{
				par.searchParam = (par.searchParam == null) ? {} : par.searchParam;
				
				par.searchParam.topOrgan = (par.searchParam.topOrgan==null) ? 0 : par.searchParam.topOrgan;			
				par.searchParam.rootRanges = (par.searchParam.rootRanges=="") ? "" : par.searchParam.rootRanges;
				par.searchParam.categoryRanges = (par.searchParam.categoryRanges==null) ? "" : par.searchParam.categoryRanges;
				par.searchParam.underAreaRange = (par.searchParam.underAreaRange==null) ? "" : par.searchParam.underAreaRange;
				par.searchParam.equalAreaRange = (par.searchParam.equalAreaRange==null) ? "" : par.searchParam.equalAreaRange;
				par.searchParam.syscodeRange = (par.searchParam.syscodeRange==null) ? "" : par.searchParam.syscodeRange;
				par.searchParam.includeSyscodeRange = (par.searchParam.includeSyscodeRange==null) ? 0 : par.searchParam.includeSyscodeRange;
				par.searchParam.nodetype = (par.searchParam.nodetype==null) ? 10 : par.searchParam.nodetype;		
			}
		}
		
		element[LEAP.hc_treeSelectBanner.symbol.paramObj] = params;
		
		return params;
	}
	finally
	{
		params = pstr = i = par = null;
	}
}

LEAP.hc_treeSelectBanner._initBannerTabUI = function(element)
{
	try
	{
		if (element == null)
			return;
		
		var tabCtrl = LEAP.hc_treeSelectBanner.__getTabCtrl(element);
		if (tabCtrl == null)
			return;			
		var _treeParams = LEAP.hc_treeSelectBanner.__getParams(element);
		
		var lables = LEAP.hc_tab.getTabLables(tabCtrl);
		if (lables && lables.length > 1)
		{
			for(var i=lables.length-1; i>-1; i--)
				LEAP.hc_tab.removeItem(tabCtrl, i);
		}

		/*
		//TODO
		if (tabCtrl.getAttribute("autohidetitle") == "1" && (_treeParams == null || (_treeParams != null && _treeParams.length == 1)))
		{
			LEAP.getElement("div.LC_tab2_box", tabCtrl).style.display = "none";
			LEAP.getElement("div.LC_tab2_Contentbox", tabCtrl).style.top = "0px";
		}
		else
		{
			LEAP.getElement("div.LC_tab2_box", tabCtrl).style.display = "block";
			LEAP.getElement("div.LC_tab2_Contentbox", tabCtrl).style.top = "31px";
		}*/
				
		if (_treeParams != null)
		{
			for(var i=0; i<_treeParams.length; i++)
			{
				var param = _treeParams[i];
				var _tab = null;
				
				if (i == 0)
				{
					_tab = LEAP.hc_tab.getItem(tabCtrl, i);
					
					var title = LEAP.getElement("[ctf=hc_tablabel]", _tab.tabli);
					if (title)
						title.innerText = param.tabTitle;
					_tab.tabli['hasinit'] = false;					
					_tab.tabcontent.innerHTML = "<div class='hc-page-scroller' ctf='container'></div>";
				}
				else
				{
					_tab = LEAP.hc_tab.addItem(tabCtrl, param.tabTitle);
				}				
				
				if (param.type == 3)
				{
					var _html = "<div class='hc-form-group hc-form-vertical' ct='hc_checkbox' md='name' bt='checkbox' style='background-color:#FFF;'>";		
						_html += "<div class='hc-form-checkbox-list hc-primary ' ctf='hc_cbitem' moduletype=1>";
						_html += "<input class='hc-form-core' type='checkbox' ctf='hc_cbinput'>";
						_html += "<span class='hc-form-frame' ctf='hc_cbcore'>";
						_html += " <i class='hc-iconfont hc-icon-checkbox' ctf='hc_cbcore'></i>";
						_html += "</span>";
						_html += "<label class='hc-form-label' ctf='hc_cblabel'></label>";
						_html += "</div>";
						_html += "</div>";			
						
											
					var container = LEAP.getElement("[ctf=container]", _tab.tabcontent);	
					container.innerHTML = _html;					
					
					var checkBoxList = LEAP.getElement("div[ct=hc_checkbox]", _tab.tabcontent);					
					//TODO LEAP.addEvent(checkBoxList, 'valueChange', LEAP.hc_treeSelectBanner._onCheckListValueChange);
				}
				else
				{
					var container = LEAP.getElement("[ctf=container]", _tab.tabcontent);
					container.innerHTML = "<ul class='hc-tree' ct='hc_tree' ut='hc_tree'></ul>";
					var tree = LEAP.getElement("ul[ct=hc_tree]", _tab.tabcontent);
					
					LEAP.addEvent(tree, 'itemInit',  LEAP.hc_treeSelectBanner._onTreeItemInit);
					//LEAP.addEvent(tree, 'checkedChanged',  LEAP.hc_treeSelectBanner._onTreeCheckedChanged);
					//LEAP.addEvent(tree, 'itemClick',  LEAP.hc_treeSelectBanner._onTreeItemClick);
				}
				
			}
			
			if (tabCtrl.getAttribute("has_RegistChangeEvent") == null)	
			{
				LEAP.addEvent(tabCtrl, 'selectedIndexChange', LEAP.hc_treeSelectBanner._onTabSeletedChange);
				tabCtrl.setAttribute("has_RegistChangeEvent", 1);
			}
			
			LEAP.hc_tab.setSelectedIndex(tabCtrl, 0);
		}
	}
	finally
	{
		//tabCtrl = _treeParams = lables = i = param = _tab = checkBoxList = tree = _html = btnFreclear = null;
	}
}

LEAP.hc_treeSelectBanner.__getTabCtrl = function(element)
{
	return LEAP.getElement("div[tsb=" + LEAP.hc_treeSelectBanner.tsb.TSB_tabctrl + "][ct=hc_tab]", element);
}

//
LEAP.hc_treeSelectBanner._onTabSeletedChange = function(arg)
{
	try
	{
		var element = LEAP._match(arg.caller, LEAP.hc_treeSelectBanner.d, 'ct');
		var tabCtrl = LEAP.hc_treeSelectBanner.__getTabCtrl(element);
		
		var idx = arg.arg2.index;
		var _tab = LEAP.hc_tab.getItem(tabCtrl, idx);
		if (_tab.tabli['hasinit'] == true)
			return;
			
		var _treeParams = LEAP.hc_treeSelectBanner.__getParams(element);
					
		var param = _treeParams[idx];			
		if (param.data != null)
		{				
			if (param.type == 3)
			{
				var checkBoxList = LEAP.getElement("[ct=hc_checkbox]", _tab.tabcontent);	
				for(var i=0; i< param.data.length; i++)
				{
					var __n = param.data[i]; 
					var __s = __n.remark;
					var __idx = __s.lastIndexOf(".");
					if (__idx >0)
						__s = __s.substring(__idx + 1) + '（' + __s.substring(0, __idx)  + '）'; 

					LEAP.hc_checkbox.addItem(checkBoxList, __s, __n.ID, false, __n);
					//var itm = LEAP.hc_checkbox.addItem(checkBoxList, __s, __n.ID, false, __n);
					//itm.parentElement.style.width = "60%";
				}					
			}
			else
			{
				var tree = LEAP.getElement("[ct=hc_tree]", _tab.tabcontent);						
				var itms = LEAP.hc_treeSelectBanner.__getInitItemDefine(param.operationParam.rootNodeId, param);
				if (itms != null && itms.length>0)
					LEAP.hc_tree.addItems(tree, null, itms);			
			}
		}
		else
		{
			if (param.type == 0 || param.type == 1 || param.type == 2)
			{
				param.data = LEAP.hc_treeSelectBanner.__search(param, null);
				if (param.data)
				{
					var tree = LEAP.getElement("ul[ct=hc_tree]", _tab.tabcontent);						
					var itms = LEAP.hc_treeSelectBanner.__getInitItemDefine(param.operationParam.rootNodeId, param);
					if (itms != null && itms.length>0)
						LEAP.hc_tree.addItems(tree, null, itms);
				}
			}
		}
		
		_tab.tabli['hasinit'] = true;			
	}
	finally
	{
		//TODO LEAP.hc_treeSelectBanner._syncChecked(element);
		
		element = tabCtrl = idx = _tab = _treeParams = param = checkBoxList = i= __n = __s = __idx = itm = tree = itms = 
		tree = itms = null;
	}
}


LEAP.hc_treeSelectBanner.__search = function(param, exParam)
{
	try
	{
		if (param.searchParam._searchFn)
		{
			return param.searchParam._searchFn.apply(param.searchParam._searchFnDomain, [{treeParam:param, lazyParam:exParam}]);
		}
		else
		{
			if (param.type == 0)
			{				
				var p = {organIds:  param.searchParam.organRanges,
						 roleNames:	param.searchParam.rolenameRanges,
						 includeOrganRange: (param.searchParam.includeOrganRange==1) ? true:false, 
						 organType:	param.searchParam.nodetype,						 
						 organLevels:	param.operationParam.treeLevels, 
						 style:	param.operationParam.treeStyle,	
						 singleCheck: param.operationParam.treeSingleCheck,						 
						 MaxLevel	:null, 
						 toporg:	(param.searchParam.topOrgan==0 ? false:true),						 						 
						 lazy: param.operationParam.lazy,
						 lazyId: param.operationParam.lazyId,
						 lazySyscode:	param.operationParam.lazySyscode,
						 lazyOut: param.operationParam.lazyOut?param.operationParam.lazyOut:false};
				
				if (exParam && exParam.lazy != null)
					p.lazy = exParam.lazy;
				if (exParam && exParam.lazyId != null)
					p.lazyId = exParam.lazyId;
				if (exParam && exParam.lazySyscode != null)
					p.lazySyscode = exParam.lazySyscode;
				if (exParam && exParam.lazyOut != null)
					p.lazyOut = exParam.lazyOut;					
					
				var rst = LEAP.request('WFConstructOrganTree', p);
				
				return rst;
			}
			else if (param.type == 1)
			{			
				var p = {rootRanges: param.searchParam.rootRanges,
							 		categoryRanges: param.searchParam.categoryRanges,
							 		topOrgan: param.searchParam.topOrgan,	 		
							 		underAreaRange: param.searchParam.underAreaRange,	
							 		equalAreaRange: param.searchParam.equalAreaRange,	
							 		syscodeRange:  param.searchParam.syscodeRange,	
							 		includeSyscodeRange: param.searchParam.includeSyscodeRange,	
									nodetype: param.searchParam.nodetype,	
							 							 		
							 		treeStyle: param.operationParam.treeStyle,	
							 		treeLevels: param.operationParam.treeLevels,	
							 		treeSingleCheck: param.operationParam.treeSingleCheck,
							 		
							 		lazy: param.operationParam.lazy,
							 		lazyId: param.operationParam.lazyId,
							 		lazyOut: param.operationParam.lazyOut
							 	};
							 	
				if (exParam && exParam.lazy != null)
					p.lazy = exParam.lazy;
				if (exParam && exParam.lazyId != null)
					p.lazyId = exParam.lazyId;
				if (exParam && exParam.lazyOut != null)
					p.lazyOut = exParam.lazyOut;
					
				var rst = LEAP.request('WFConstructVirtualOrganTree', {param:p} );
				
				return rst;
			}
		}
		
		return null;
	}
	finally
	{
		p = rst = null;
	}
}


//获取树初始节点
LEAP.hc_treeSelectBanner.__getInitItemDefine = function(_nodeid, param)
{
	try
	{
		var ___nodes = param.data.nodes;
		
		var _level = ___nodes[0].level;
		
		var _arr = [];
		if (_nodeid != null)
		{
			_arr.add(_nodeid);				
		}
		else
		{	
			for(var i=0; i<___nodes.length; i++)
			{
				if (___nodes[i].level == _level)
					_arr.add(___nodes[i].ID);
			}
		}
					
		var items = new Array();
		for(var k=0; k<_arr.length; k++)
		{
			for(var i=0; i<___nodes.length; i++)
			{
				if (___nodes[i].ID == _arr[k])
				{		
					var itm = LEAP.hc_treeSelectBanner.__constructItemDef(___nodes[i], ___nodes[i].haschild, param);
					items.push(itm)
					
					if (param.data.style == 0 || _arr.length == 1)
						items = LEAP.hc_treeSelectBanner.__getChildItemDefine(_arr[k], items, false, param);
											
					break;
				}			
			}
		}
		
		return items;
	}
	finally
	{
		___nodes = _level = _arr = i = items = k= itm = null;
	}	
}


//取树子节点
LEAP.hc_treeSelectBanner.__getChildItemDefine = function(parentid, itemDefs, expandall, param)
{
	try
	{
		var childNodes =  LEAP.hc_treeSelectBanner.__getChildNode(parentid, param.data.nodes);
		if (childNodes == null)
			return itemDefs;

		for(var i=0; i<childNodes.length; i++)
		{
			var cNodes = LEAP.hc_treeSelectBanner.__getChildNode(childNodes[i].ID, param.data.nodes);
			var itm = null;				
			if (cNodes != null && (childNodes.length == 1 || param.data.style == 0 || expandall == true))
			{
				itm = LEAP.hc_treeSelectBanner.__constructItemDef(childNodes[i], false, param);
				itemDefs.push(itm);
				itemDefs = LEAP.hc_treeSelectBanner.__getChildItemDefine(childNodes[i].ID, itemDefs, expandall, param);
			}
			else //不完全展开的情况下遇到分支时停止展开
			{
				itm = LEAP.hc_treeSelectBanner.__constructItemDef(childNodes[i], childNodes[i].haschild, param);
				itemDefs.push(itm);
			}
		}
		
		return itemDefs;
	}
	finally
	{
		childNodes = i = cNodes = itm = null;
	}
}

LEAP.hc_treeSelectBanner.__constructItemDef = function(orgTreeNode, hasChild, param)
{
	try
	{
		var itm = new Object();
			itm.value = orgTreeNode.ID;
			//itm.value2 = orgTreeNode.parentID;
			//itm.value3 = orgTreeNode.syscode;
			//itm.value4 = orgTreeNode.haschild;
			//itm.value5 = orgTreeNode.isTip;
			itm.userarg = {id:orgTreeNode.ID, 
							parentid:orgTreeNode.parentID, 
							syscode:orgTreeNode.syscode, 
							haschild:orgTreeNode.haschild, 
							isTip:orgTreeNode.isTip};
							
			itm.hasChild = hasChild;						
			if (param.operationParam.treeSingleCheck == 0 && param.operationParam.autoCheckChilds == true)
			{
				itm.showCheck = true;
			}
			else if (param.searchParam.nodetype == 15)
			{
				itm.showCheck = true;
			}
			else
			{
				itm.showCheck = orgTreeNode.isTip;
			}	
							
			itm.syscode = orgTreeNode.syscode;				
			itm.text = orgTreeNode.remark;
			
		if (orgTreeNode.nodeType == 0)				
			itm.icon = 'LEAP/HC/hcimages/HC_treeSelectBanner/org.png';
		else if (orgTreeNode.nodeType == 1)
			itm.icon = 'LEAP/HC/hcimages/HC_treeSelectBanner/pos.png';
		else if (orgTreeNode.nodeType == 2)	
			itm.icon = 'LEAP/HC/hcimages/HC_treeSelectBanner/usr.png';
		else if (orgTreeNode.nodeType == 10)
			itm.icon = 'LEAP/HC/hcimages/HC_treeSelectBanner/org.png';
		else if (orgTreeNode.nodeType == 11)			
			itm.icon = 'LEAP/HC/hcimages/HC_treeSelectBanner/usr.png';
		
		
		return itm;
	}
	finally
	{
		itm = null;
	}
}

LEAP.hc_treeSelectBanner.__getChildNode = function(parentId, nodes)
{
	try
	{
		var nodesData = nodes;			
		var nodes = new Array();
		var hash = new hashtable();
		for(var i=0; i<nodesData.length; i++)
		{
			var _curnode = nodesData[i];
			if (_curnode.parentID == parentId)
			{				
				if (_curnode.nodeType == 2) //如果是用户，则查重并缓存索引
				{
					if (hash.contains(_curnode.orgObject.id) == true )
					{//重复的采用主岗位
						if ( _curnode.orgObject.ismaster != null && _curnode.orgObject.ismaster ==1)								
							hash.add(_curnode.orgObject.id, _curnode.ID);
					}
					else
					{
						hash.add(_curnode.orgObject.id, _curnode.ID);
					}
				}
				nodes.push(_curnode);
			}				
		}
					
		//根据索引过滤重复用户
		if (hash.count>0 && hash.count < nodes.length) 
		{
			var _nodes = new Array();
			for(var k=0; k<nodes.length; k++)
			{
				if (nodes[k].nodeType == 2)
				{	
					if (nodes[k].ID == hash.getvalue(nodes[k].orgObject.id) )
						_nodes.push(nodes[k]);
				}
				else
				{
					_nodes.push(nodes[k]);
				}
			}
				
			nodes = _nodes;	
		}
		
		if (nodes.length == 0)
			return null;
			
		return nodes;
		
	}
	finally
	{
		nodesData = nodes = hash = i = _curnode = _nodes = k = null;
	}
}

LEAP.hc_treeSelectBanner._onTreeItemInit = function(data)
{
	try
	{
		if (data == null || data.arg2 == null 
			|| data.arg2.value == null || data.arg2.item == null) 
			return;
			
		var element = LEAP._match(data.caller, LEAP.hc_treeSelectBanner.d, 'ct');
		var tabCtrl = LEAP.hc_treeSelectBanner.__getTabCtrl(element);
		var _treeParams = LEAP.hc_treeSelectBanner.__getParams(element);
		
		var lazyOut = false;
		if ( data._expandall != null &&  data._expandall == true)
			lazyOut = true;
			
		var parentItem = data.arg2.item;
		var parentId = data.arg2.value;
		var parentSyscode = data.arg2.userarg.syscode;
		
		var idx = LEAP.hc_tab.getSelectedIndex(tabCtrl);
		var tab = LEAP.hc_tab.getItem(tabCtrl, idx);			
		var tree = LEAP.getElement("ul[ct=hc_tree]", tab.tabcontent);
		var param = _treeParams[idx];
		
		if (param.operationParam.lazy == true)
		{
			var lazyChilds = LEAP.hc_treeSelectBanner.__search(param, {lazy:true,
						 		lazyId:parentId,
						 		lazySyscode:parentSyscode,
						 		lazyOut:lazyOut							 		
						 		});
			
			if (lazyChilds != null)
			{				
				var _s = false;
				var _e = false;
				var _stmp = [];
				var _etmp = [];
				for(var i=0; i<param.data.nodes.length; i++)
				{
					var __node = param.data.nodes[i];
					if (__node.syscode.startsWith(parentSyscode))
					{
						if (_s == false)
							_stmp.push(__node);
							
						_s = true;												
						continue;
					}					
					else if (_s == true && _e == false)
					{
						_s = false;
						_e = true;
					}
										
					if (_s == false && _e == false)
						_stmp.push(__node);
					if (_e == true)
						_etmp.push(__node);
				}
				
				param.data.nodes = [];
				for(var i=0; i<_stmp.length; i++)
					param.data.nodes.push(_stmp[i]);
				for(var i=0; i<lazyChilds.nodes.length; i++)
					param.data.nodes.push(lazyChilds.nodes[i]);
				for(var i=0; i<_etmp.length; i++)
					param.data.nodes.push(_etmp[i]);
			}
		}
				
		var itms = [];
		itms = LEAP.hc_treeSelectBanner.__getChildItemDefine(parentId, itms, data._expandall, param);
		LEAP.hc_tree.addItems(tree, parentItem, itms);
		
		//TODO LEAP.hc_treeSelectBanner._syncChecked(element);
	}
	finally
	{
		element = tabCtrl = _treeParams = lazyOut = parentItem = parentId = 
		parentSyscode = idx = tab = tree = param = lazyChilds = _s = 
		_e = _stmp = _etmp = i = __node = itms = null;
	}
}





/*LEAP.hc_treeSelectBanner.tree_addItems = function(element, parentItem, itemDefine)
{
	try
	{
		if(element==null)
			return;
		if (itemDefine == null || !itemDefine.length)
			return;
		
		var pHash = new hashtable();
		for(var i=0;i<itemDefine.length;i++)
		{
			var data = itemDefine[i];		
			
			var text = itemDefine[i].text;
			var value = itemDefine[i].value;
			var fontColor = itemDefine[i].fontColor;
			var icon = itemDefine[i].icon;
			var hasChild = itemDefine[i].hasChild;
			var showCheck = itemDefine[i].showCheck;
			var userarg = itemDefine[i].userarg;
			
			var syscode = data.syscode;
			
			var _realSyscode = null;
			var _parentItem = null;
			var _parentSyscode = null;
			if (syscode != null)
			{
				_realSyscode = LEAP.getRealSyscode(syscode);
				_parentSyscode = LEAP.getParentSyscode(_realSyscode);	
				if (_parentSyscode != null)
					_parentItem = pHash.getvalue(_parentSyscode);
			}
			
			var newItem = null;
			if (_parentItem != null)
			{						
				newItem = LEAP.hc_tree.addItem(element, _parentItem, text, value, fontColor, icon, hasChild, showCheck, userarg);
				
				LEAP.hc_tree.expandNode(_parentItem, false);
				var _pElement = LEAP.getElement("[ctf=hc_tree_item]" + _parentItem + "");
				if (_pElement)
					_pElement.setAttribute("iteminit", true); 				
			}
			else
			{
				newItem = LEAP.hc_tree.addItem(element, parentItem, text, value, fontColor, icon, hasChild, showCheck, userarg);
			}
			
			if (_realSyscode != null)
				pHash.add(_realSyscode, newItem);
		}
	}
	finally
	{
		pHash = i = data = text = value = fontColor = icon = hasChild = showCheck = 
		userarg = syscode = _realSyscode = _parentItem = _parentSyscode = newItem = null; 
	}	
}*/






/*

LEAP.hc_treeSelectBanner.getValue = function(element)
{
	try
	{
		var _element = LEAP._match(element, LEAP.hc_treeSelectBanner.d);
		if (_element == null)
			return null;
			
		var nodes = _element[LEAP.hc_treeSelectBanner.symbol.selectedItems];
		if (nodes && nodes.length == 0)
			return null;
		
		var _nodes = LWFP.innerApi.clone(nodes);
		return _nodes;
	}
	finally
	{
		_element = nodes = _nodes = null;
	}
}

LEAP.hc_treeSelectBanner.setValue = function(element, value, reBindSelectedItem, reSyncTree)
{
	try
	{
		var _element = LEAP._match(element, LEAP.hc_treeSelectBanner.d);
		if (_element == null)
			return;
			
		var _value = LWFP.innerApi.clone(value);
		_element[LEAP.hc_treeSelectBanner.symbol.selectedItems] = _value;
				
		if (reBindSelectedItem == null || reBindSelectedItem == true)
			LEAP.hc_treeSelectBanner.__bindSlectedList(_element);
		
		if (reSyncTree == null || reSyncTree == true)
			LEAP.hc_treeSelectBanner._syncChecked(_element);
	}
	finally
	{
		_element = _value = null;
	}
}







LEAP.hc_treeSelectBanner.__getItemCtrl = function(element)
{
	try
	{
		var itemCtrl = null;
		var module = PageObjectModel.getModule(element.getAttribute("instance"));		
		var group = element.getAttribute(LEAP.hc_treeSelectBanner.symbol.TSB_group);
		if (group != null)
			itemCtrl = LEAP.getElement("[ct=item][tsb=TSB_itemctrl][tsb_group=" + group + "]", module.moduleElement);
			
		return itemCtrl;
	}
	finally
	{
		itemCtrl = module = group = null;
	}	
}

LEAP.hc_treeSelectBanner.__getBannerCTrl = function(srcElement)
{
	try
	{
		var element = null;
		var module = PageObjectModel.getModule(srcElement.getAttribute("instance"));		
		var group = srcElement.getAttribute(LEAP.hc_treeSelectBanner.symbol.TSB_group);
		if (group != null)
			element = LEAP.getElement("[ct=" + LEAP.hc_treeSelectBanner.d + "][tsb_group=" + group + "]", module.moduleElement);
		
		return element;
	}
	finally
	{
		element = module = group = null;
	}
}












LEAP.hc_treeSelectBanner._onTreeItemClick = function(data)
{
	try
	{
		var item = data.arg2.item;
		
		if (data.arg2.value5 == "true")
		{//itm.value5 = orgTreeNode.isTip;
			var checked = LEAP.tree.isChecked(data.caller, item);
			LEAP.tree.setItemChecked(data.caller, item, !checked, true);
		}
		else
		{//itm.value4 = orgTreeNode.haschild;
			LEAP.tree.expandNode(item);
		}		
	}
	finally
	{
		item = checked;
	}
}

LEAP.hc_treeSelectBanner._onTreeCheckedChanged = function(data)
{
	try
	{
		var element = LEAP._match(data.caller, LEAP.hc_treeSelectBanner.d);
		var tabCtrl = LEAP.hc_treeSelectBanner.__getTabCtrl(element);
		var _treeParams = LEAP.hc_treeSelectBanner.__getParams(element);
		
		var idx = LEAP.tab.getSelectedIndex(tabCtrl);
		var tab = LEAP.tab.getItem(tabCtrl, idx);			
		var tree = LEAP.getElement("ul[ct=tree]", tab.tabcontent);
		var param = _treeParams[idx];
		
		var curItem = data.arg2.item;
		var curNodeValue = LEAP.tree.getValue(curItem);
		var checked = data.arg2.checked;
		
		if ( param.operationParam.treeSingleCheck == 1) //如果单选
		{
			if (true == checked)
			{
				var checkedItems = LEAP.tree.getCheckedItems(tree);		
				if (checkedItems != null && checkedItems.length>0)
				{
					for(var i=0; i<checkedItems.length; i++)
					{
						var tempNodeValue = LEAP.tree.getValue(checkedItems[i]);
						if (curNodeValue != tempNodeValue)
							LEAP.tree.setItemChecked(tree, checkedItems[i], false); 
						
						tempNodeValue = null;
					}					
				}
				
				//维护选中清单
				var node = LEAP.hc_treeSelectBanner.__findNode(param.data.nodes, curNodeValue);
				LEAP.hc_treeSelectBanner.__selectedList_add(element, [node], true);
			}
			else
			{
				LEAP.hc_treeSelectBanner.__selectedList_remove(element, [curNodeValue]);
			}
		}
		else //多选
		{	
			if (param.searchParam.nodetype == 15)
			{
				if (true == checked)
				{
					var node = LEAP.hc_treeSelectBanner.__findNode(param.data.nodes, curNodeValue);
					LEAP.hc_treeSelectBanner.__selectedList_add(element, [node], false);
				}
				else
				{
					LEAP.hc_treeSelectBanner.__selectedList_remove(element, [curNodeValue]);
				}		
			}
			else
			{
				if (true == checked)
				{
					if (data.arg2.value4 == "true")
					{
						if (param.operationParam.autoCheckChilds == true)
						{
							LEAP.tree.removeChilds(tree, curItem);		
							var __arg = {caller:data.caller, arg2:data.arg2, _expandall:true};
							LEAP.hc_treeSelectBanner._onTreeItemInit(__arg);		
							
							LEAP.tree.setItemChildChecked(tree, curItem, true);
						}
						else
						{
							var c = LEAP.tree.getChild(curItem);
							if (c == null)
							{
								var __arg = {caller:data.caller, arg2:data.arg2, _expandall:false};
								LEAP.hc_treeSelectBanner._onTreeItemInit(__arg);
							}
								
							LEAP.tree.setItemChecked(tree, curItem, true); 
						}
					}
					
					if (param.operationParam.allowMutiLevelCheck == false)
					{
						LEAP.hc_treeSelectBanner.__removeOtherLevelChecked(element, tree, data.arg2.item);
					}
				}
				else
				{
					if (param.operationParam.autoCheckChilds == true)
					{	
						LEAP.tree.setItemChildChecked(tree, curItem, false);
						var tmpitem = curItem;
						while (tmpitem)
						{
							LEAP.tree.setItemChecked(tree, tmpitem, false);
							
							LEAP.hc_treeSelectBanner.__selectedList_remove(element, [LEAP.tree.getValue(tmpitem)]);
							
							tmpitem = LEAP.tree.getParent(tmpitem);
						}

					}
					else
					{
						LEAP.tree.setItemChecked(tree, curItem, false);
					}
						
				}								
				
				//维护选中清单
				if (param.operationParam.autoCheckChilds == true)
				{	
					if (true == checked)
					{
						var _vs = LEAP.hc_treeSelectBanner.__getAllCheckedChildsValues(tree, curItem, true);						
						var _v = [];
						for(var i=0; i<_vs.length; i++)
						{
							var node = LEAP.hc_treeSelectBanner.__findNode(param.data.nodes, _vs[i].value);
							if (node.isTip == true)
							{
								_v.push(node);
							}
						}
						
						LEAP.hc_treeSelectBanner.__selectedList_add(element, _v, false);
					}
					else
					{
						var _vs = LEAP.tree.getAllChildValues(tree, curItem, true);
						var _v = [];
							_v.add(curNodeValue);
							
						for(var i=0; i<_vs.length; i++)						
						{
							if (_vs[i].value5 == 'true')
								_v.add( _vs[i].value );
						}

						LEAP.hc_treeSelectBanner.__selectedList_remove(element, _v);
					}					
				}
				else
				{
					if (true == checked)
					{
						var node = LEAP.hc_treeSelectBanner.__findNode(param.data.nodes, curNodeValue);
						LEAP.hc_treeSelectBanner.__selectedList_add(element, [node], false);
					}
					else
					{
						LEAP.hc_treeSelectBanner.__selectedList_remove(element, [curNodeValue]);
					}				
				}
			}			
		}
		
		LEAP.hc_treeSelectBanner.__bindSlectedList(element);
	}
	finally
	{		
		element = tabCtrl = _treeParams = idx = tab = tree = param = curItem = curNodeValue = 
		checked = checkedItems = i = tempNodeValue = node = node = c = tmpitem = _vs = _v = node = 
		_vs = _v = i = node = __arg = null;
	}
}

LEAP.hc_treeSelectBanner.__removeOtherLevelChecked = function(element, tree, item)
{
	try
	{
		var vs = [];
		var childs = LEAP.tree.getAllChildValues(tree, item, false);
		if (childs != null)
		{
			for(var i=0; i<childs.length; i++)
			{
				vs.push(childs[i].value);
				LEAP.tree.setItemChecked(tree, childs[i].item, false);
			}
		}
		
		var itm = item;
		while (itm != null)
		{
			itm = LEAP.tree.getParent(itm);
			var value = LEAP.tree.getValue(itm);
			LEAP.tree.setItemChecked(tree, itm, false);
			
			vs.push(value);
		}
		
		if (vs.length > 0)
			LEAP.hc_treeSelectBanner.__selectedList_remove(element, vs);
	}
	finally
	{
		vs = childs = i = itm = value = null;
	}
}

LEAP.hc_treeSelectBanner.__getAllCheckedChildsValues = function(tree, item, inludeCurrentItem)
{
	try
	{
		var arr1 = LEAP.tree.getCheckedValues(tree);
		var arr2 = LEAP.tree.getAllChildValues(tree, item, inludeCurrentItem);
		
		if (arr1 == null || arr2 == null)
			return null;
		
		var hash = new hashtable();
		for(var i=0; i<arr1.length; i++)
			hash.add(arr1[i], arr1[i]);
			
		var rst = [];
		for(var i=0; i<arr2.length; i++)
		{
			if (hash.contains(arr2[i].value))
				rst.add(arr2[i]);
		}
		
		return rst;
	}
	finally
	{
		arr1 = arr2 = hash = i = rst = i = null;
	}		
}	
	
LEAP.hc_treeSelectBanner.__findNode = function(nodes, id)
{
	if (nodes == null || nodes.length == 0)
		return null;
	
	for(var i=0; i<nodes.length; i++)
	{
		if (nodes[i].ID == id)
			return nodes[i];
	}		
	
	i = null;
	
	return null;
}

LEAP.hc_treeSelectBanner._onFrequentcontactClear = function(arg)
{
	try
	{
		var rst = LEAP.request('clearFrequentContact', {delegate: null} );
		if (true == rst)
		{
			var tab_content = LEAP._match(arg.caller, 'tab_content', 'ctf');
			var checkBoxList = LEAP.getElement("div[ct=checkbox]", tab_content);		
			
			LEAP.checkbox.removeItems(checkBoxList);
		}
	}
	finally
	{
		rst = tab_content = checkBoxList = null;
	}
}

LEAP.hc_treeSelectBanner._onCheckListValueChange = function(arg)
{
	try
	{	
		var element = LEAP._match(arg.caller, LEAP.hc_treeSelectBanner.d);
		var tabCtrl = LEAP.hc_treeSelectBanner.__getTabCtrl(element);
		var _treeParams = LEAP.hc_treeSelectBanner.__getParams(element);
		
		var idx = LEAP.tab.getSelectedIndex(tabCtrl);
		var tab = LEAP.tab.getItem(tabCtrl, idx);	
		var param = _treeParams[idx];
		
		var checkBoxList =  LEAP.getElement("div[ct=checkbox]", tab.tabcontent);	
		
		var _new = arg.arg2.newvalue;
		var _old = arg.arg2.oldvalue;
		var _rst = _new;
		
		//单选模式下
		if (param.operationParam.treeSingleCheck == 1 && _new  != null && _old != null)
		{
			_rst = _new.replace(_old.substring(1), "");
			LEAP.checkbox.setValue(checkBoxList, _rst);
		}
		
		//
		if (_old != null)
		{
			var _arr = _old.split(',');
			LEAP.hc_treeSelectBanner.__selectedList_remove(element, _arr);
		}
					
		if (_rst != null)
		{
			var arr = LEAP.checkbox.getCheckedItemElements(checkBoxList);
			var _arr = [];
			for(var i=0; i<arr.length; i++)
			{
				var node = arr[i]["data"];
				var _node = LWFP.innerApi.clone(node);
				var __idx = node.remark.lastIndexOf(".");
				if (__idx >= 0)
				{
					_node.remark = _node.remark.substring(__idx + 1);
				}
				
				_arr.add(_node);				
			}
			
			LEAP.hc_treeSelectBanner.__selectedList_add(element, _arr, param.operationParam.treeSingleCheck == 1?true:false);
		}
		
		LEAP.hc_treeSelectBanner.__bindSlectedList(element);
	}
	finally
	{
		element = tabCtrl = _treeParams = idx = tab = param = checkBoxList =  _new = 
		_old = _rst = _arr = arr = _arr = i = node = _node = __idx = null;
	}
}
*/





























LEAP.hc_treeSelectBanner.i = function(wait, src)
{
	try
	{
		if (!src)
		{
			if (!event)
				return;
			src = event.srcElement;
		}
		if (!src)
			return;
				
		if (wait != null)
		{
			var fn = function()
			{
				LEAP.hc_treeSelectBanner.i(null, src);
				src = null;
			};
			
			setTimeout(fn, wait);
			return;
		}
	
		LEAP.hc_treeSelectBanner._i(src.parentElement);
		src.parentElement.removeChild(src);
		src = null;
	}
	finally
	{
		module = instance = null;
	}
}

LEAP.hc_treeSelectBanner._i = function(element)
{
	try
	{		
		LEAP.hc_treeSelectBanner._initBannerTabUI(element);	
	}
	finally
	{
		//itemCtrl = null;
	}
}



LEAP.hc_treeSelectBanner.init();














LEAP.hc_tree = {};
LEAP.hc_tree.d="hc_tree";
LEAP.hc_tree.ulstr='<ul class="hc_tree"></ul>'
LEAP.hc_tree.itemstr = '<li class="hc-tree-branch" ctf="hc_tree_item" ctid="@ctid" value="@value" haschild="@hasChild">'+
          '<div class="hc-tree-handle" @handlestyle>'+
            '<div class="hc-tree-handle-indicator" ctf="hc_tree_indicator">'+
              '@tree_open'+
            '</div>'+
            '<div class="hc-tree-handle-label" ctf="hc_tree_title" @color>@text</div>'+
            '<div class="hc-tree-handle-append" ctf="hc_tree_append">'+
              '@tree_checkbox'+
            '</div>'+
         '</div>'+
          '<div class="hc-tree-content" ctf="hc_tree_content" ctid="@ctid" @contentstyle>'+
          '</div>'+
        '</li>';
LEAP.hc_tree.treeimg = '<img class="hc-tree-handle-cover" ctf="hc_tree_open" @imgstyle src="@src">';
LEAP.hc_tree.openclosestr = '<span class="hc-iconfont hc-icon-tree-indicator" ctf="hc_tree_open"></span>';
LEAP.hc_tree.checkboxstr = '<div class="hc-form-checkbox-circle hc-primary" ctf="hc_tree_checkbox">'+
                '<input class="hc-form-core" type="checkbox" value="@ctid" ctf="hc_tree_checkbox_input">'+
                '<span class="hc-form-frame" ctf="hc_tree_checkbox_icon">'+
                  '<i class="hc-iconfont hc-icon-checkbox" ctf="hc_tree_checkbox_icon"></i>'+
                '</span>'+
                '<label class="hc-form-label" ctf="hc_cblabel" ctf="hc_tree_checkbox_icon"></label>'+
              '</div>';
LEAP.hc_tree.textstr = '<a href="javascript:" class="hc-tree-handle-label-a" ctf="hc_tree_href">@text<p ctf="hc_tree_remark">@remarks</p></a>';
LEAP.hc_tree.foldstr = '<span class="hc-iconfont hc-icon-moreunfold" ctf="hc_tree_open"></span>';
LEAP.hc_tree.userarg = "userarg";
LEAP.hc_tree._init = function()
{
	LEAP.addEvent(document.body,'click',LEAP.hc_tree.uiProcess,null,null,true);
	LEAP.addEvent(document.body,'touchstart',LEAP.hc_tree.uiProcess,null,null,true);
	UIEventManager.removeEvent(window, 'load', LEAP.hc_tree._init);
}
LEAP.hc_tree.init = function()
{
	if (document != null && document.body != null)
		LEAP.hc_tree._init();
	else
		UIEventManager.addEvent(window, 'load', LEAP.hc_tree._init);
	ElementEventManager.addManagedEventType(LEAP.hc_tree.d, 'selectedItemChange');
	ElementEventManager.addManagedEventType(LEAP.hc_tree.d, 'itemInit');
	ElementEventManager.addManagedEventType(LEAP.hc_tree.d, 'checkedChanged');
	ElementEventManager.addManagedEventType(LEAP.hc_tree.d, 'longPress');
}();
LEAP.hc_tree.uiProcess = function(arg)
{
	var src = arg.e.srcElement;
	var ctf = src.getAttribute("ctf");
	var type = arg.e.type;
	var element = LEAP._match(src,LEAP.hc_tree.d,'ct',999);
	if(!element)
		return;
	if(type=="touchstart")
	{
		if(ctf=="hc_tree_title")
		{
			var item = LEAP._match(src,"hc_tree_item",'ctf',10);
			LEAP.addEvent(document.body,"touchmove",LEAP.hc_tree.uiProcess,null,null,true);
			LEAP.addEvent(document.body,"touchend",LEAP.hc_tree.uiProcess,null,null,true);
			element["__timeOut"] = setTimeout(
			function(){
				LEAP.hc_tree.timeTouch(element,item)
			},1500); 
			arg.e.preventDefault();
		}
	}
	if(type=="touchmove")
	{
		clearTimeout(element["__timeOut"]);
		element["__timeOut"]=0;
	}
	if(type=="touchend")
	{
		LEAP.removeEvent(document.body,"touchmove",LEAP.hc_tree.uiProcess,true);
		LEAP.removeEvent(document.body,"touchend",LEAP.hc_tree.uiProcess,true);
		clearTimeout(element["__timeOut"]);
		arg.e.returnValue = true;
		return false;
	}
	
	if(type=="click")
	{
		if(ctf=="hc_tree_open" || ctf=="hc_tree_indicator" || ctf=="hc_tree_title" || ctf=="hc_tree_href" || ctf=="hc_tree_remark")
		{
			var item = LEAP._match(src,"hc_tree_item",'ctf',10);
			var value = item.getAttribute("value");
			var haschild = item.getAttribute("haschild");
			var __options = element.getAttribute("data-options");
			var options = __options?JSON.parse(__options):{};
			var treetype = null;
			if(options.type!=null)
				treetype=options.type;
			if(haschild=="1")
			{
				if(item.className.indexOf("hc-tree-open")>-1)
					LEAP.hc_tree.closeNode(item);
				else
				{
					var items = LEAP.getElements("[ctf=hc_tree_item]",item.parentElement);
					for(var i=0;i<items.length;i++)
					{
						var ctid = items[i].getAttribute("ctid");
						LEAP.hc_tree.closeNode("[ctid="+ctid+"]");
					}
					LEAP.hc_tree.expandNode(item);
				}
			}
			else
			{
				if(treetype=="uploadtree")
				{
					if(value.indexOf("http://")>-1 || value.indexOf("https://")>-1)
						window.open(value);
					else
						window.open(leapconfig.server+value);
				}
			}
			if(ctf=="hc_tree_title")
			{
				ElementEventManager.handleEvent(element, 'selectedItemChange',
				{
					tree	: element,
					userarg	: item[LEAP.hc_tree.userarg],
					value	: item.getAttribute("value"),
					text	: LEAP.hc_tree.getItemText(item),
					item	: '[ctid=' + item.getAttribute('ctid') + ']',
					data	: item[LEAP.hc_tree.userarg]
				});
			}
		}
		else if(ctf=="hc_tree_checkbox" || ctf=='hc_tree_checkbox_input' || ctf=="hc_tree_checkbox_icon")
		{
			var checkel = null;
			if(ctf=="hc_tree_checkbox")
				checkel=src;
			else
				checkel=LEAP._match(src,"hc_tree_checkbox",'ctf',5);
			var item = LEAP._match(src,"hc_tree_item",'ctf',10);
			var cbinput = LEAP.getElement("hc_tree_checkbox_input",checkel);
			if(checkel.className.indexOf("hc-form-checkbox-active")>-1)
			{
				LEAP.hc_tree.setItemChildChecked(element,item,false);
			}
			else
			{
				LEAP.hc_tree.setItemChildChecked(element,item,true);
			}
			ElementEventManager.handleEvent(element, 'checkedChanged',
			{
				tree	: element,
				item	: '[ctid=' + item.getAttribute('ctid') + ']',
				userarg	: item[LEAP.hc_tree.userarg],
				value	: item.getAttribute("value"),
				text	: LEAP.tree.getItemText(item),
				checked	: cbinput.checked
			});
		}
	}
}
LEAP.hc_tree.timeTouch = function(element,item)
{
	ElementEventManager.handleEvent(element, 'longPress',
	{
		tree	: element,
		userarg	: item[LEAP.hc_tree.userarg],
		value	: item.getAttribute("value"),
		text	: LEAP.hc_tree.getItemText(item),
		item	: '[ctid=' + item.getAttribute('ctid') + ']',
		data	: item[LEAP.hc_tree.userarg]
	});
}
LEAP.hc_tree.setItemChildChecked = function(element,item,checked)
{
	if (element == null)
		return;
	if (item != null)
	{
		if (typeof(item) == 'string')
			item = LEAP.getElement(item, element);
		if (item == null)
			return;

		if (item.getAttribute('ctid') == null)
			item.setAttribute('ctid', UUID.cID());
	}
	else
	{
		item = element;
	}
	if (checked == null)
		checked = true;
	var chks = LEAP.getElements('input[type=checkbox]', item);
	if(chks!=null)
	{
		for(var i=0;i<chks.length;i++)
		{
			if(checked==true)
			{
				LEAP.addCSS(chks[i].parentElement,"hc-form-checkbox-active");
				chks[i].setAttribute("checked",true);
			}
			else
			{
				LEAP.removeCSS(chks[i].parentElement,"hc-form-checkbox-active");
				chks[i].removeAttribute("checked");
			}
		}
	}
	chks = element = item = null;
}
LEAP.hc_tree.setValue = function(element,value)
{
	if(element==null)
		return;
	if(value==null)
		return;
	var __options = element.getAttribute("data-options");
	var options = __options?JSON.parse(__options):{};
	var treetype = null;
	if(options.type!=null)
		treetype=options.type;
	if(treetype=="uploadtree")
	{
		var files = JSON.parse(value);
		if(files!=null)
		{
			var parentItem = null;
			var fontColor = null;
			var icon = null;
			var hasChild = false;
			var showCheck = false;
			var userarg = {};
			for (var i = 0; i < files.length; i++) {
				var showName = files[i].showName;
				var nameedPath = files[i].nameedPath;
				var name = files[i].name;
				var valuePath = LEAP.upload.getPath(nameedPath, name, null, showName, showName);
				
				if(files[i].size) {
					userarg.size = LEAP.hc_tree.conversize(files[i].size);
				}
				LEAP.hc_tree.addItem(element, parentItem, showName, valuePath, fontColor, icon, hasChild, showCheck, userarg);
			}
		}
	}
}
LEAP.hc_tree.conversize = function(limit)
{
	var size = "";
    if( limit < 0.1 * 1024 ) {// 如果小于0.1KB转化成B
        size = limit.toFixed(2) + "B";
    } else if(limit < 0.1 * 1024 * 1024 ) {// 如果小于0.1MB转化成KB
        size = (limit / 1024).toFixed(2) + "KB";
    } else if(limit < 0.1 * 1024 * 1024 * 1024) { //如果小于0.1GB转化成MB
        size = (limit / (1024 * 1024)).toFixed(2) + "MB";
    } else {// 其他转化成GB
        size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
    }
    
    var sizestr = size + "";
    var len = sizestr.indexOf("\.");
    var dec = sizestr.substr(len + 1, 2);
    if(dec == "00"){//当小数点后为00时 去掉小数部分
        return sizestr.substring(0,len) + sizestr.substr(len + 3,2);
    }
    return sizestr;
}
LEAP.hc_tree.setValue1 = function(element, item, value)
{
	if (item == null)
		return;
	if (typeof(item) == 'string')
		item = LEAP.getElement(item, element);
	if (item == null)
		return;
	item.setAttribute('value',value);
}
LEAP.hc_tree.getValue = function(item,element)
{
	if (item == null)
		return;
	if (typeof(item) == 'string')
		item = LEAP.getElement(item, element);
	if (item == null)
		return;
	return item.getAttribute('value');
}
LEAP.hc_tree.getItemText = function(item)
{
	if (item == null)
		return;
	if (typeof(item) == 'string')
		item = LEAP.getElement("[ctf=hc_tree_item]"+item+"");
	if (item == null)
		return;
	var text = null;
	var titleel = LEAP.getElement("[ctf=hc_tree_title]",item);
	if(titleel!=null)
	{
		text=titleel.innerHTML;
	}
	return text;
}
LEAP.hc_tree.expandNode = function(item, hanldeItemInitEvent)
{
	if(item==null)
		return;
	if (typeof(item) == 'string')
		item = LEAP.getElement("[ctf=hc_tree_item]"+item+"");
	if(item==null)
		return;
	var element = LEAP._match(item, LEAP.hc_tree.d, "ct", 99);
	if(element==null)
		return;
	var iteminit = item.getAttribute("iteminit");
	LEAP.addCSS(item,"hc-tree-open");
	
	if (hanldeItemInitEvent != false)
	{
		if(iteminit == false || iteminit=="false")
		{
			item.setAttribute("iteminit",true);
			ElementEventManager.handleEvent(element, 'itemInit',
			{
				tree	: element,
				text	: LEAP.hc_tree.getItemText(item),
				value 	: item.getAttribute('value'),
				userarg : item[LEAP.hc_tree.userarg],
				content : LEAP.getElement("[ctf=hc_tree_content][ctid="+item.getAttribute('ctid')+"]",item),
				item	: '[ctid=' + item.getAttribute('ctid') + ']'
			});
		}
	}
}

LEAP.hc_tree.closeNode = function(item)
{
	if(item==null)
		return;
	if (typeof(item) == 'string')
		item = LEAP.getElement("[ctf=hc_tree_item]"+item+"");
	if(item==null)
		return;
	var element = LEAP._match(item, LEAP.hc_tree.d, "ct", 99);
	if(element==null)
		return;
	LEAP.removeCSS(item,"hc-tree-open",false);
}
LEAP.hc_tree.closeAll = function(element)
{
	if(element==null)
		return;
	var items = LEAP.getElements('[ctf=hc_tree_item]', element);
	if(items!=null)
		LEAP.removeCSS(items,"hc-tree-open",true);
}
/*LEAP.hc_tree.addItems = function(element, parentItem, itemDefine)
{
	if(element==null)
		return;
	if (itemDefine == null || !itemDefine.length)
		return;
	for(var i=0;i<itemDefine.length;i++)
	{
		var text = itemDefine[i].text;
		var value = itemDefine[i].value;
		var fontColor = itemDefine[i].fontColor;
		var icon = itemDefine[i].icon;
		var hasChild = itemDefine[i].hasChild;
		var showCheck = itemDefine[i].showCheck;
		var userarg = itemDefine[i].userarg;
		LEAP.hc_tree.addItem(element, parentItem, text, value, fontColor, icon, hasChild, showCheck,userarg);
	}
}*/
LEAP.hc_tree.addItems = function(element, parentItem, itemDefine)
{
	try
	{
		if(element==null)
			return;
		if (itemDefine == null || !itemDefine.length)
			return;
		
		var pHash = new hashtable();
		for(var i=0;i<itemDefine.length;i++)
		{
			var data = itemDefine[i];		
			
			var text = itemDefine[i].text;
			var value = itemDefine[i].value;
			var fontColor = itemDefine[i].fontColor;
			var icon = itemDefine[i].icon;
			var hasChild = itemDefine[i].hasChild;
			var showCheck = itemDefine[i].showCheck;
			var userarg = itemDefine[i].userarg;
			
			var syscode = data.syscode;
			
			var _realSyscode = null;
			var _parentItem = null;
			var _parentSyscode = null;
			if (syscode != null)
			{
				_realSyscode = LEAP.getRealSyscode(syscode);
				_parentSyscode = LEAP.getParentSyscode(_realSyscode);	
				if (_parentSyscode != null)
					_parentItem = pHash.getvalue(_parentSyscode);
			}
			
			var newItem = null;
			if (_parentItem != null)
			{						
				newItem = LEAP.hc_tree.addItem(element, _parentItem, text, value, fontColor, icon, hasChild, showCheck, userarg);
				
				LEAP.hc_tree.expandNode(_parentItem, false);
				var _pElement = LEAP.getElement("[ctf=hc_tree_item]" + _parentItem + "");
				if (_pElement)
					_pElement.setAttribute("iteminit", true); 				
			}
			else
			{
				newItem = LEAP.hc_tree.addItem(element, parentItem, text, value, fontColor, icon, hasChild, showCheck, userarg);
			}
			
			if (_realSyscode != null)
				pHash.add(_realSyscode, newItem);
		}
	}
	finally
	{
		pHash = i = data = text = value = fontColor = icon = hasChild = showCheck = 
		userarg = syscode = _realSyscode = _parentItem = _parentSyscode = newItem = null; 
	}	
}


LEAP.hc_tree.addItem = function(element, parentItem, text, value, fontColor, icon, hasChild, showCheck,userarg)
{
	if(!element)
		return;
	var __options = element.getAttribute("data-options");
	var options = __options?JSON.parse(__options):{};
	var treetype = null;
	if(options.type!=null)
		treetype=options.type;
	var ctid=UUID.cID();
	var itemstr = LEAP.hc_tree.itemstr.replaceall("@ctid",ctid).replace("@value",value);
	if(treetype=="uploadtree" || treetype=="moduletree")
	{
		if(hasChild==true)
			itemstr = itemstr.replace("@text",text);
		else
		{
			var size=0;
			if(userarg.size!=null)
				size=userarg.size;
			itemstr = itemstr.replace("@text",LEAP.hc_tree.textstr.replace("@text",text).replace("@remarks",size));
		}
	}else
		itemstr = itemstr.replace("@text",text);
	if(fontColor!=null)
		itemstr = itemstr.replace("@color","style='color:"+fontColor+"'");
	else
		itemstr = itemstr.replace("@color","");
	if(hasChild==true)
	{
		if(treetype=="uploadtree" || treetype=="moduletree")
			itemstr =itemstr.replace("@tree_open","").replace("@tree_checkbox",LEAP.hc_tree.foldstr);
		else
			itemstr =itemstr.replace("@tree_open",LEAP.hc_tree.openclosestr);
		itemstr = itemstr.replace("@hasChild","1");
	}
	else
	{
		if(treetype=="uploadtree" || treetype=="moduletree")
		{
			if(icon!=null)
				itemstr = itemstr.replace("@tree_open",LEAP.hc_tree.treeimg.replace("@src",leapconfig.server+icon)).replace("@tree_checkbox","");
			else
			{
				var suffiximg="";
				if(value.indexOf(".pdf")>-1)
					suffiximg="LEAP/HC/hcimages/HC_tree/pdf.png";
				else if(value.indexOf(".docx")>-1 || value.indexOf(".doc")>-1)
					suffiximg="LEAP/HC/hcimages/HC_tree/word.png";
				else if(value.indexOf(".xls")>-1)
					suffiximg="LEAP/HC/hcimages/HC_tree/excel.png";
				else if(value.indexOf(".pptx")>-1)
					suffiximg="LEAP/HC/hcimages/HC_tree/powerpoint.png";
				itemstr = itemstr.replace("@tree_open",LEAP.hc_tree.treeimg.replace("@src",leapconfig.server+suffiximg).replace("@imgstyle","style='border-radius:inherit'"));
			}
		}
		else
		{
			if(icon!=null)
				itemstr = itemstr.replace("@tree_open",LEAP.hc_tree.treeimg.replace("@src",leapconfig.server+icon));
			else
				itemstr = itemstr.replace("@tree_open","");	
		}
		itemstr = itemstr.replace("@hasChild","0");
	}
	if(treetype!="uploadtree" || treetype=="moduletree")
	{
		if(showCheck==true)
			itemstr = itemstr.replace("@tree_checkbox",LEAP.hc_tree.checkboxstr);
		else
			itemstr = itemstr.replace("@tree_checkbox","");
	}
	else
		itemstr = itemstr.replace("@tree_checkbox","");
	
	if(treetype=="uploadtree" || treetype=="moduletree")
		itemstr = itemstr.replace("@contentstyle","style='padding-left:0.2rem'");
	else
		itemstr = itemstr.replace("@contentstyle","");
	if(treetype=="moduletree")
		itemstr = itemstr.replace("@handlestyle","style='padding-left:0rem'");
	else
		itemstr = itemstr.replace("@handlestyle","");
	itemstr = itemstr.replace("@imgstyle","");
	if(parentItem==null)
	{
		var div = document.createElement("div");
		div.innerHTML=itemstr;
		var item = div.children[0];
		item[LEAP.hc_tree.userarg]=userarg;
		item.setAttribute("iteminit",false);
		element.appendChild(item);
	}
	else
	{
		if (typeof(parentItem) == 'string')
			parentItem = LEAP.getElement("[ctf=hc_tree_item]"+parentItem+"", element);
		if (parentItem == null)
			return;
		var id = parentItem.getAttribute("ctid");
		var hc_tree_content = LEAP.getElement("[ctf=hc_tree_content][ctid="+id+"]",parentItem);
		var ul = LEAP.getElement('ul[class]', hc_tree_content);
		if(ul==null)
		{
			ul = document.createElement('UL');
			ul.className="hc_tree";
			hc_tree_content.appendChild(ul);
			parentItem = null;
			parentItem = ul;
			ul = null;
		}
		else
		{
			parentItem = null;
			parentItem = ul;
			ul = null;
		}
		var div = document.createElement("div");
		div.innerHTML=itemstr;
		var item = div.children[0];
		item[LEAP.hc_tree.userarg]=userarg;
		item.setAttribute("iteminit",false);
		parentItem.appendChild(item);
	}
	return '[ctid='+ctid+']';
}
LEAP.hc_tree.removeItem = function(element, item)
{
	if (item == null)
		return;
	if (element == null)
		return;
	if (typeof(item) == 'string')
		item = LEAP.getElement(item, element);
	if (item == null)
		return;
	element.removeChild(item);
	element = item = null;
}
LEAP.hc_tree.removeChilds = function(element, item)
{
	if (item == null)
		return;
	if (element == null)
		return;
	if (typeof(item) == 'string')
		item = LEAP.getElement(item, element);
	if (item == null)
		return;
	var id = item.getAttribute("ctid");
	var hc_tree_content = LEAP.getElement("[ctf=hc_tree_content][ctid="+id+"]",item);
	hc_tree_content.innerHTML="";
	element = item = hc_tree_content = null;
}
LEAP.hc_tree.clearItem = function(element)
{
	if (element == null)
		return;
	element.innerHTML = '';
	element = null;
}
LEAP.hc_tree.getCheckedItems = function(element)
{
	if (element == null)
		return;
	var chks = LEAP.getElements('[ctf=hc_tree_checkbox_input]', element);
	if (chks != null)
	{
		var l = chks.length;
		var ret = [];
		for(var i = 0;i < l;i++)
		{
			var item = LEAP._match(chks[i], 'hc_tree_item', commfields.ctf, 99);
			if (item.getAttribute('ctid') == null)
				item.setAttribute('ctid', UUID.cID());
			ret.push('[ctid=' + item.getAttribute('ctid') + ']');
			item = chks[i] = null;
		}
		return ret;
	}
}
LEAP.hc_tree.getChild = function(item)
{
	if (item == null)
		return;
	if (typeof(item) == 'string')
		item = LEAP.getElement(item);
	if (item == null)
		return;
	var id = item.getAttribute("ctid");
	var hc_tree_content = LEAP.getElement("[ctf=hc_tree_content][ctid="+id+"]",item);
	var ul = LEAP.getElement('ul[class]', hc_tree_content);
	if(ul==null)
		return null;
	var childs = ul.children;
	if(childs)
	{
		var res=[];
		for(var i=0;i<childs.length;i++)
		{
			var str = "[ctid="+childs[i].getAttribute("ctid")+"]";
			res.add(str);
		}
		try
		{
			return res;
		}
		finally
		{
			res = id = hc_tree_content = ul = childs = item = null;
		}
	}
}
