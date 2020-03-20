/*
 *	jQuery dotdotdot 1.6.0
 *
 *	Copyright (c) 2013 Fred Heusschen
 *	www.frebsite.nl
 *
 *	Plugin website:
 *	dotdotdot.frebsite.nl
 *
 *	Dual licensed under the MIT and GPL licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */

! function (a) {
  function c(a, b, c) {
    var d = a.children(),
      e = !1;
    a.empty();
    for (var g = 0, h = d.length; h > g; g++) {
      var i = d.eq(g);
      if (a.append(i), c && a.append(c), f(a, b)) {
        i.remove(), e = !0;
        break
      }
      c && c.detach()
    }
    return e
  }

  function d(b, c, g, h, i) {
    var j = b.contents(),
      k = !1;
    b.empty();
    for (var l = "table, thead, tbody, tfoot, tr, col, colgroup, object, embed, param, ol, ul, dl, blockquote, select, optgroup, option, textarea, script, style", m = 0, n = j.length; n > m && !k; m++) {
      var o = j[m],
        p = a(o);
      "undefined" != typeof o && (b.append(p), i && b[b.is(l) ? "after" : "append"](i), 3 == o.nodeType ? f(g, h) && (k = e(p, c, g, h, i)) : k = d(p, c, g, h, i), k || i && i.detach())
    }
    return k
  }

  function e(a, b, c, d, h) {
    var k = !1,
      l = a[0];
    if ("undefined" == typeof l) return !1;
    for (var m = j(l), n = -1 !== m.indexOf(" ") ? " " : "\u3000", o = "letter" == d.wrap ? "" : n, p = m.split(o), q = -1, r = -1, s = 0, t = p.length - 1; t >= s;) {
      var u = Math.floor((s + t) / 2);
      if (u == r) break;
      r = u, i(l, p.slice(0, r + 1).join(o) + d.ellipsis), f(c, d) ? t = r : (q = r, s = r), t == s && 0 == t && d.fallbackToLetter && (o = "", p = p[0].split(o), q = -1, r = -1, s = 0, t = p.length - 1)
    }
    if (-1 == q || 1 == p.length && 0 == p[0].length) {
      var v = a.parent();
      a.remove();
      var w = h ? h.length : 0;
      if (v.contents().size() > w) {
        var x = v.contents().eq(-1 - w);
        k = e(x, b, c, d, h)
      } else {
        var y = v.prev(),
          l = y.contents().eq(-1)[0];
        if ("undefined" != typeof l) {
          var m = g(j(l), d);
          i(l, m), h && y.append(h), v.remove(), k = !0
        }
      }
    } else m = g(p.slice(0, q + 1).join(o), d), k = !0, i(l, m);
    return k
  }

  function f(a, b) {
    return a.innerHeight() > b.maxHeight
  }

  function g(b, c) {
    for (; a.inArray(b.slice(-1), c.lastCharacter.remove) > -1;) b = b.slice(0, -1);
    return a.inArray(b.slice(-1), c.lastCharacter.noEllipsis) < 0 && (b += c.ellipsis), b
  }

  function h(a) {
    return {
      width: a.innerWidth(),
      height: a.innerHeight()
    }
  }

  function i(a, b) {
    a.innerText ? a.innerText = b : a.nodeValue ? a.nodeValue = b : a.textContent && (a.textContent = b)
  }

  function j(a) {
    return a.innerText ? a.innerText : a.nodeValue ? a.nodeValue : a.textContent ? a.textContent : ""
  }

  function k(b, c) {
    return "undefined" == typeof b ? !1 : b ? "string" == typeof b ? (b = a(b, c), b.length ? b : !1) : "object" == typeof b ? "undefined" == typeof b.jquery ? !1 : b : !1 : !1
  }

  function l(a) {
    for (var b = a.innerHeight(), c = ["paddingTop", "paddingBottom"], d = 0, e = c.length; e > d; d++) {
      var f = parseInt(a.css(c[d]), 10);
      isNaN(f) && (f = 0), b -= f
    }
    return b
  }

  function m(a, b) {
    return a ? (b = "string" == typeof b ? "dotdotdot: " + b : ["dotdotdot:", b], "undefined" != typeof window.console && "undefined" != typeof window.console.log && window.console.log(b), !1) : !1
  }
  if (!a.fn.dotdotdot) {
    a.fn.dotdotdot = function (e) {
      if (0 == this.length) return e && e.debug === !1 || m(!0, 'No element found for "' + this.selector + '".'), this;
      if (this.length > 1) return this.each(function () {
        a(this).dotdotdot(e)
      });
      var g = this;
      g.data("dotdotdot") && g.trigger("destroy.dot"), g.data("dotdotdot-style", g.attr("style")), g.css("word-wrap", "break-word"), g.bind_events = function () {
        return g.bind("update.dot", function (b, e) {
          b.preventDefault(), b.stopPropagation(), j.maxHeight = "number" == typeof j.height ? j.height : l(g), j.maxHeight += j.tolerance, "undefined" != typeof e && (("string" == typeof e || e instanceof HTMLElement) && (e = a("<div />").append(e).contents()), e instanceof a && (i = e)), q = g.wrapInner('<div class="dotdotdot" />').children(), q.empty().append(i.clone(!0)).css({
            height: "auto",
            width: "auto",
            border: "none",
            padding: 0,
            margin: 0
          });
          var h = !1,
            k = !1;
          return n.afterElement && (h = n.afterElement.clone(!0), n.afterElement.remove()), f(q, j) && (k = "children" == j.wrap ? c(q, j, h) : d(q, g, q, j, h)), q.replaceWith(q.contents()), q = null, a.isFunction(j.callback) && j.callback.call(g[0], k, i), n.isTruncated = k, k
        }).bind("isTruncated.dot", function (a, b) {
          return a.preventDefault(), a.stopPropagation(), "function" == typeof b && b.call(g[0], n.isTruncated), n.isTruncated
        }).bind("originalContent.dot", function (a, b) {
          return a.preventDefault(), a.stopPropagation(), "function" == typeof b && b.call(g[0], i), i
        }).bind("destroy.dot", function (a) {
          a.preventDefault(), a.stopPropagation(), g.unwatch().unbind_events().empty().append(i).attr("style", g.data("dotdotdot-style")).data("dotdotdot", !1)
        }), g
      }, g.unbind_events = function () {
        return g.unbind(".dot"), g
      }, g.watch = function () {
        if (g.unwatch(), "window" == j.watch) {
          var b = a(window),
            c = b.width(),
            d = b.height();
          b.bind("resize.dot" + n.dotId, function () {
            c == b.width() && d == b.height() && j.windowResizeFix || (c = b.width(), d = b.height(), p && clearInterval(p), p = setTimeout(function () {
              g.trigger("update.dot")
            }, 10))
          })
        } else o = h(g), p = setInterval(function () {
          var a = h(g);
          (o.width != a.width || o.height != a.height) && (g.trigger("update.dot"), o = h(g))
        }, 100);
        return g
      }, g.unwatch = function () {
        return a(window).unbind("resize.dot" + n.dotId), p && clearInterval(p), g
      };
      var i = g.contents(),
        j = a.extend(!0, {}, a.fn.dotdotdot.defaults, e),
        n = {},
        o = {},
        p = null,
        q = null;
      return j.lastCharacter.remove instanceof Array || (j.lastCharacter.remove = a.fn.dotdotdot.defaultArrays.lastCharacter.remove), j.lastCharacter.noEllipsis instanceof Array || (j.lastCharacter.noEllipsis = a.fn.dotdotdot.defaultArrays.lastCharacter.noEllipsis), n.afterElement = k(j.after, g), n.isTruncated = !1, n.dotId = b++, g.data("dotdotdot", !0).bind_events().trigger("update.dot"), j.watch && g.watch(), g
    }, a.fn.dotdotdot.defaults = {
      ellipsis: "... ",
      wrap: "word",
      fallbackToLetter: !0,
      lastCharacter: {},
      tolerance: 0,
      callback: null,
      after: null,
      height: null,
      watch: !1,
      windowResizeFix: !0,
      debug: !1
    }, a.fn.dotdotdot.defaultArrays = {
      lastCharacter: {
        remove: [" ", "\u3000", ",", ";", ".", "!", "?"],
        noEllipsis: []
      }
    };
    var b = 1,
      n = a.fn.html;
    a.fn.html = function (a) {
      return "undefined" != typeof a ? this.data("dotdotdot") && "function" != typeof a ? this.trigger("update", [a]) : n.call(this, a) : n.call(this)
    };
    var o = a.fn.text;
    a.fn.text = function (b) {
      if ("undefined" != typeof b) {
        if (this.data("dotdotdot")) {
          var c = a("<div />");
          return c.text(b), b = c.html(), c.remove(), this.trigger("update", [b])
        }
        return o.call(this, b)
      }
      return o.call(this)
    }
  }
}(jQuery);