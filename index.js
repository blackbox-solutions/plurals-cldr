/*
 * Plural functions support (cardinal & ordinal forms)
 *
 * Autogenerated from CLDR:
 *
 *   Version:   26
 *   $Revision: 10807 $
 */

'use strict';


// pluralizers cache
var s = {};

function normalize(loc) {
  var l;
  if (s[loc]) { return loc; }
  l = loc.toLowerCase().replace('_', '-');
  if (s[l]) { return l; }
  l = l.split('-')[0];
  if (s[l]) { return l; }
  return null;
}

function forms(loc) {
  var l = normalize(loc);
  return s[l] ? s[l].c : null;
}

function indexOf(loc, value) {
  var l = normalize(loc);
  if (!l) {
    return -1;
  }

  if (!s[l].cFn) {
    return 0;
  }

  var sval  = String(value),
      f = sval.indexOf('.') < 0 ? '' : sval.split('.')[1],
      v = f.length,
      n = +value,
      i = +(sval.split('.')[0]),
      t = f.length === 0 ? 0 : +f.replace(/0+$/, '');

  return s[l].cFn(n, i, v, +f, t);
}

function plural(loc, value) {
  var l = normalize(loc);
  if (!l) {
    return null;
  }
  return s[l].c[indexOf(l, value)];
}


function o_forms(loc) {
  var l = normalize(loc);
  return s[l] ? s[l].o : null;
}

function o_indexOf(loc, value) {
  var l = normalize(loc);
  if (!l) {
    return -1;
  }

  if (!s[l].oFn) {
    return 0;
  }

  var sval  = String(value),
      f = sval.indexOf('.') < 0 ? '' : sval.split('.')[1],
      v = f.length,
      n = +value,
      i = +(sval.split('.')[0]),
      t = f.length === 0 ? 0 : +f.replace(/0+$/, '');

  return s[l].oFn(n, i, v, +f, t);
}

function ordinal(loc, value) {
  var l = normalize(loc);
  if (!s[l]) {
    return null;
  }
  return s[l].o[o_indexOf(l, value)];
}

module.exports                  = plural;
module.exports.indexOf          = indexOf;
module.exports.forms            = forms;
module.exports.ordinal          = ordinal;
module.exports.ordinal.indexOf  = o_indexOf;
module.exports.ordinal.forms    = o_forms;


////////////////////////////////////////////////////////////////////////////////

var FORMS = [ 'zero', 'one', 'two', 'few', 'many', 'other' ];

function unpack(i) { return FORMS[i]; }

// adds given `rule` pluralizer for given `locales` into `storage`
function add(locales, rule) {
  var i;

  rule.c = rule.c ? rule.c.map(unpack) : [ 'other' ];
  rule.o = rule.o ? rule.o.map(unpack) : [ 'other' ];

  for (i = 0; i < locales.length; i++) {
    s[locales[i]] = rule;
  }
}

function B(x, y, val) { return x <= val && val <= y && val % 1 === 0; }
function IN(set, val) { return set.indexOf(val) >= 0; }


add([ 'af', 'asa', 'bem', 'bez', 'bg', 'brx', 'cgg', 'chr', 'ckb', 'dv', 'ee', 'el', 'eo', 'es', 'eu', 'fo', 'fur', 'gsw', 'ha', 'haw', 'jgo', 'jmc', 'kaj', 'kcg', 'kkj', 'kl', 'ks', 'ksb', 'ku', 'ky', 'lb', 'lg', 'mas', 'mgo', 'ml', 'mn', 'nah', 'nb', 'nd', 'nn', 'nnh', 'no', 'nr', 'ny', 'nyn', 'om', 'or', 'os', 'pap', 'ps', 'rm', 'rof', 'rwk', 'saq', 'seh', 'sn', 'so', 'ss', 'ssy', 'st', 'syr', 'ta', 'te', 'teo', 'tig', 'tk', 'tn', 'tr', 'ts', 'ug', 'uz', 've', 'vo', 'vun', 'wae', 'xh', 'xog' ], {
  c: [ 1, 5 ],
  cFn: function (n) {
    return n === 1 ? 0 : 1;
  }
});

add([ 'ak', 'bh', 'guw', 'ln', 'mg', 'nso', 'pa', 'ti', 'wa' ], {
  c: [ 1, 5 ],
  cFn: function (n) {
    return B(0, 1, n) ? 0 : 1;
  }
});

add([ 'am', 'fa', 'kn', 'zu' ], {
  c: [ 1, 5 ],
  cFn: function (n, i) {
    return i === 0 || n === 1 ? 0 : 1;
  }
});

add([ 'ar' ], {
  c: [ 0, 1, 2, 3, 4, 5 ],
  cFn: function (n) {
    var n100 = n % 100;
    return n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : B(3, 10, n100) ? 3 : B(11, 99, n100) ? 4 : 5;
  }
});

add([ 'ast', 'de', 'et', 'fi', 'fy', 'gl', 'ji', 'nl', 'sw', 'ur', 'yi' ], {
  c: [ 1, 5 ],
  cFn: function (n, i, v) {
    return i === 1 && v === 0 ? 0 : 1;
  }
});

add([ 'az' ], {
  c: [ 1, 5 ],
  cFn: function (n) {
    return n === 1 ? 0 : 1;
  },
  o: [ 1, 3, 4, 5 ],
  oFn: function (n, i) {
    var i10 = i % 10, i100 = i % 100, i1000 = i % 1000;
    return IN([ 1, 2, 5, 7, 8 ], i10) || IN([ 20, 50, 70, 80 ], i100) ? 0 : IN([ 3, 4 ], i10) || IN([ 100, 200, 300, 400, 500, 600, 700, 800, 900 ], i1000) ? 1 : i === 0 || i10 === 6 || IN([ 40, 60, 90 ], i100) ? 2 : 3;
  }
});

add([ 'be' ], {
  c: [ 1, 3, 4, 5 ],
  cFn: function (n) {
    var n10 = n % 10, n100 = n % 100;
    return n10 === 1 && n100 !== 11 ? 0 : B(2, 4, n10) && !B(12, 14, n100) ? 1 : n10 === 0 || B(5, 9, n10) || B(11, 14, n100) ? 2 : 3;
  }
});

add([ 'bm', 'bo', 'dz', 'id', 'ig', 'ii', 'in', 'ja', 'jbo', 'jv', 'jw', 'kde', 'kea', 'km', 'ko', 'lkt', 'my', 'nqo', 'root', 'sah', 'ses', 'sg', 'th', 'to', 'wo', 'yo', 'zh' ], {
});

add([ 'bn' ], {
  c: [ 1, 5 ],
  cFn: function (n, i) {
    return i === 0 || n === 1 ? 0 : 1;
  },
  o: [ 1, 2, 3, 4, 5 ],
  oFn: function (n) {
    return IN([ 1, 5, 7, 8, 9, 10 ], n) ? 0 : IN([ 2, 3 ], n) ? 1 : n === 4 ? 2 : n === 6 ? 3 : 4;
  }
});

add([ 'br' ], {
  c: [ 1, 2, 3, 4, 5 ],
  cFn: function (n) {
    var n10 = n % 10, n100 = n % 100, n1000000 = n % 1000000;
    return n10 === 1 && !IN([ 11, 71, 91 ], n100) ? 0 : n10 === 2 && !IN([ 12, 72, 92 ], n100) ? 1 : (B(3, 4, n10) || n10 === 9) && (!B(10, 19, n100) && !B(70, 79, n100) && !B(90, 99, n100)) ? 2 : n !== 0 && n1000000 === 0 ? 3 : 4;
  }
});

add([ 'bs', 'hr', 'sh', 'sr' ], {
  c: [ 1, 3, 5 ],
  cFn: function (n, i, v, f) {
    var i10 = i % 10, i100 = i % 100, f10 = f % 10, f100 = f % 100;
    return v === 0 && i10 === 1 && i100 !== 11 || f10 === 1 && f100 !== 11 ? 0 : v === 0 && B(2, 4, i10) && !B(12, 14, i100) || B(2, 4, f10) && !B(12, 14, f100) ? 1 : 2;
  }
});

add([ 'ca' ], {
  c: [ 1, 5 ],
  cFn: function (n, i, v) {
    return i === 1 && v === 0 ? 0 : 1;
  },
  o: [ 1, 2, 3, 5 ],
  oFn: function (n) {
    return IN([ 1, 3 ], n) ? 0 : n === 2 ? 1 : n === 4 ? 2 : 3;
  }
});

add([ 'cs', 'sk' ], {
  c: [ 1, 3, 4, 5 ],
  cFn: function (n, i, v) {
    return i === 1 && v === 0 ? 0 : B(2, 4, i) && v === 0 ? 1 : v !== 0 ? 2 : 3;
  }
});

add([ 'cy' ], {
  c: [ 0, 1, 2, 3, 4, 5 ],
  cFn: function (n) {
    return n === 0 ? 0 : n === 1 ? 1 : n === 2 ? 2 : n === 3 ? 3 : n === 6 ? 4 : 5;
  },
  o: [ 0, 1, 2, 3, 4, 5 ],
  oFn: function (n) {
    return IN([ 0, 7, 8, 9 ], n) ? 0 : n === 1 ? 1 : n === 2 ? 2 : IN([ 3, 4 ], n) ? 3 : IN([ 5, 6 ], n) ? 4 : 5;
  }
});

add([ 'da' ], {
  c: [ 1, 5 ],
  cFn: function (n, i, v, f, t) {
    return n === 1 || t !== 0 && IN([ 0, 1 ], i) ? 0 : 1;
  }
});

add([ 'dsb', 'hsb' ], {
  c: [ 1, 2, 3, 5 ],
  cFn: function (n, i, v, f) {
    var i100 = i % 100, f100 = f % 100;
    return v === 0 && i100 === 1 || f100 === 1 ? 0 : v === 0 && i100 === 2 || f100 === 2 ? 1 : v === 0 && B(3, 4, i100) || B(3, 4, f100) ? 2 : 3;
  }
});

add([ 'en' ], {
  c: [ 1, 5 ],
  cFn: function (n, i, v) {
    return i === 1 && v === 0 ? 0 : 1;
  },
  o: [ 1, 2, 3, 5 ],
  oFn: function (n) {
    var n10 = n % 10, n100 = n % 100;
    return n10 === 1 && n100 !== 11 ? 0 : n10 === 2 && n100 !== 12 ? 1 : n10 === 3 && n100 !== 13 ? 2 : 3;
  }
});

add([ 'ff', 'kab' ], {
  c: [ 1, 5 ],
  cFn: function (n, i) {
    return IN([ 0, 1 ], i) ? 0 : 1;
  }
});

add([ 'fil', 'tl' ], {
  c: [ 1, 5 ],
  cFn: function (n, i, v, f) {
    var i10 = i % 10, f10 = f % 10;
    return v === 0 && IN([ 1, 2, 3 ], i) || v === 0 && !IN([ 4, 6, 9 ], i10) || v !== 0 && !IN([ 4, 6, 9 ], f10) ? 0 : 1;
  },
  o: [ 1, 5 ],
  oFn: function (n) {
    return n === 1 ? 0 : 1;
  }
});

add([ 'fr', 'hy' ], {
  c: [ 1, 5 ],
  cFn: function (n, i) {
    return IN([ 0, 1 ], i) ? 0 : 1;
  },
  o: [ 1, 5 ],
  oFn: function (n) {
    return n === 1 ? 0 : 1;
  }
});

add([ 'ga' ], {
  c: [ 1, 2, 3, 4, 5 ],
  cFn: function (n) {
    return n === 1 ? 0 : n === 2 ? 1 : B(3, 6, n) ? 2 : B(7, 10, n) ? 3 : 4;
  }
});

add([ 'gd' ], {
  c: [ 1, 2, 3, 5 ],
  cFn: function (n) {
    return IN([ 1, 11 ], n) ? 0 : IN([ 2, 12 ], n) ? 1 : (B(3, 10, n) || B(13, 19, n)) ? 2 : 3;
  }
});

add([ 'gu', 'hi' ], {
  c: [ 1, 5 ],
  cFn: function (n, i) {
    return i === 0 || n === 1 ? 0 : 1;
  },
  o: [ 1, 2, 3, 4, 5 ],
  oFn: function (n) {
    return n === 1 ? 0 : IN([ 2, 3 ], n) ? 1 : n === 4 ? 2 : n === 6 ? 3 : 4;
  }
});

add([ 'gv' ], {
  c: [ 1, 2, 3, 4, 5 ],
  cFn: function (n, i, v) {
    var i10 = i % 10, i100 = i % 100;
    return v === 0 && i10 === 1 ? 0 : v === 0 && i10 === 2 ? 1 : v === 0 && IN([ 0, 20, 40, 60, 80 ], i100) ? 2 : v !== 0 ? 3 : 4;
  }
});

add([ 'he', 'iw' ], {
  c: [ 1, 2, 4, 5 ],
  cFn: function (n, i, v) {
    var n10 = n % 10;
    return i === 1 && v === 0 ? 0 : i === 2 && v === 0 ? 1 : v === 0 && !B(0, 10, n) && n10 === 0 ? 2 : 3;
  }
});

add([ 'hu' ], {
  c: [ 1, 5 ],
  cFn: function (n) {
    return n === 1 ? 0 : 1;
  },
  o: [ 1, 5 ],
  oFn: function (n) {
    return IN([ 1, 5 ], n) ? 0 : 1;
  }
});

add([ 'is' ], {
  c: [ 1, 5 ],
  cFn: function (n, i, v, f, t) {
    var i10 = i % 10, i100 = i % 100;
    return t === 0 && i10 === 1 && i100 !== 11 || t !== 0 ? 0 : 1;
  }
});

add([ 'it' ], {
  c: [ 1, 5 ],
  cFn: function (n, i, v) {
    return i === 1 && v === 0 ? 0 : 1;
  },
  o: [ 4, 5 ],
  oFn: function (n) {
    return IN([ 11, 8, 80, 800 ], n) ? 0 : 1;
  }
});

add([ 'iu', 'kw', 'naq', 'se', 'sma', 'smi', 'smj', 'smn', 'sms' ], {
  c: [ 1, 2, 5 ],
  cFn: function (n) {
    return n === 1 ? 0 : n === 2 ? 1 : 2;
  }
});

add([ 'ka' ], {
  c: [ 1, 5 ],
  cFn: function (n) {
    return n === 1 ? 0 : 1;
  },
  o: [ 1, 4, 5 ],
  oFn: function (n, i) {
    var i100 = i % 100;
    return i === 1 ? 0 : i === 0 || (B(2, 20, i100) || i100 === 40 || i100 === 60 || i100 === 80) ? 1 : 2;
  }
});

add([ 'kk' ], {
  c: [ 1, 5 ],
  cFn: function (n) {
    return n === 1 ? 0 : 1;
  },
  o: [ 4, 5 ],
  oFn: function (n) {
    var n10 = n % 10;
    return n10 === 6 || n10 === 9 || n10 === 0 && n !== 0 ? 0 : 1;
  }
});

add([ 'ksh' ], {
  c: [ 0, 1, 5 ],
  cFn: function (n) {
    return n === 0 ? 0 : n === 1 ? 1 : 2;
  }
});

add([ 'lag' ], {
  c: [ 0, 1, 5 ],
  cFn: function (n, i) {
    return n === 0 ? 0 : IN([ 0, 1 ], i) && n !== 0 ? 1 : 2;
  }
});

add([ 'lo', 'ms', 'vi' ], {
  o: [ 1, 5 ],
  oFn: function (n) {
    return n === 1 ? 0 : 1;
  }
});

add([ 'lt' ], {
  c: [ 1, 3, 4, 5 ],
  cFn: function (n, i, v, f) {
    var n10 = n % 10, n100 = n % 100;
    return n10 === 1 && !B(11, 19, n100) ? 0 : B(2, 9, n10) && !B(11, 19, n100) ? 1 : f !== 0 ? 2 : 3;
  }
});

add([ 'lv', 'prg' ], {
  c: [ 0, 1, 5 ],
  cFn: function (n, i, v, f) {
    var n10 = n % 10, n100 = n % 100, f100 = f % 100, f10 = f % 10;
    return n10 === 0 || B(11, 19, n100) || v === 2 && B(11, 19, f100) ? 0 : n10 === 1 && n100 !== 11 || v === 2 && f10 === 1 && f100 !== 11 || v !== 2 && f10 === 1 ? 1 : 2;
  }
});

add([ 'mk' ], {
  c: [ 1, 5 ],
  cFn: function (n, i, v, f) {
    var i10 = i % 10, f10 = f % 10;
    return v === 0 && i10 === 1 || f10 === 1 ? 0 : 1;
  },
  o: [ 1, 2, 4, 5 ],
  oFn: function (n, i) {
    var i10 = i % 10, i100 = i % 100;
    return i10 === 1 && i100 !== 11 ? 0 : i10 === 2 && i100 !== 12 ? 1 : IN([ 7, 8 ], i10) && !IN([ 17, 18 ], i100) ? 2 : 3;
  }
});

add([ 'mo', 'ro' ], {
  c: [ 1, 3, 5 ],
  cFn: function (n, i, v) {
    var n100 = n % 100;
    return i === 1 && v === 0 ? 0 : v !== 0 || n === 0 || n !== 1 && B(1, 19, n100) ? 1 : 2;
  },
  o: [ 1, 5 ],
  oFn: function (n) {
    return n === 1 ? 0 : 1;
  }
});

add([ 'mr' ], {
  c: [ 1, 5 ],
  cFn: function (n, i) {
    return i === 0 || n === 1 ? 0 : 1;
  },
  o: [ 1, 2, 3, 5 ],
  oFn: function (n) {
    return n === 1 ? 0 : IN([ 2, 3 ], n) ? 1 : n === 4 ? 2 : 3;
  }
});

add([ 'mt' ], {
  c: [ 1, 3, 4, 5 ],
  cFn: function (n) {
    var n100 = n % 100;
    return n === 1 ? 0 : n === 0 || B(2, 10, n100) ? 1 : B(11, 19, n100) ? 2 : 3;
  }
});

add([ 'ne' ], {
  c: [ 1, 5 ],
  cFn: function (n) {
    return n === 1 ? 0 : 1;
  },
  o: [ 1, 5 ],
  oFn: function (n) {
    return B(1, 4, n) ? 0 : 1;
  }
});

add([ 'pl' ], {
  c: [ 1, 3, 4, 5 ],
  cFn: function (n, i, v) {
    var i10 = i % 10, i100 = i % 100;
    return i === 1 && v === 0 ? 0 : v === 0 && B(2, 4, i10) && !B(12, 14, i100) ? 1 : v === 0 && i !== 1 && B(0, 1, i10) || v === 0 && B(5, 9, i10) || v === 0 && B(12, 14, i100) ? 2 : 3;
  }
});

add([ 'pt' ], {
  c: [ 1, 5 ],
  cFn: function (n) {
    return B(0, 2, n) && n !== 2 ? 0 : 1;
  }
});

add([ 'pt-pt' ], {
  c: [ 1, 5 ],
  cFn: function (n, i, v) {
    return n === 1 && v === 0 ? 0 : 1;
  }
});

add([ 'ru' ], {
  c: [ 1, 3, 4, 5 ],
  cFn: function (n, i, v) {
    var i10 = i % 10, i100 = i % 100;
    return v === 0 && i10 === 1 && i100 !== 11 ? 0 : v === 0 && B(2, 4, i10) && !B(12, 14, i100) ? 1 : v === 0 && i10 === 0 || v === 0 && B(5, 9, i10) || v === 0 && B(11, 14, i100) ? 2 : 3;
  }
});

add([ 'shi' ], {
  c: [ 1, 3, 5 ],
  cFn: function (n, i) {
    return i === 0 || n === 1 ? 0 : B(2, 10, n) ? 1 : 2;
  }
});

add([ 'si' ], {
  c: [ 1, 5 ],
  cFn: function (n, i, v, f) {
    return IN([ 0, 1 ], n) || i === 0 && f === 1 ? 0 : 1;
  }
});

add([ 'sl' ], {
  c: [ 1, 2, 3, 5 ],
  cFn: function (n, i, v) {
    var i100 = i % 100;
    return v === 0 && i100 === 1 ? 0 : v === 0 && i100 === 2 ? 1 : v === 0 && B(3, 4, i100) || v !== 0 ? 2 : 3;
  }
});

add([ 'sq' ], {
  c: [ 1, 5 ],
  cFn: function (n) {
    return n === 1 ? 0 : 1;
  },
  o: [ 1, 4, 5 ],
  oFn: function (n) {
    var n10 = n % 10, n100 = n % 100;
    return n === 1 ? 0 : n10 === 4 && n100 !== 14 ? 1 : 2;
  }
});

add([ 'sv' ], {
  c: [ 1, 5 ],
  cFn: function (n, i, v) {
    return i === 1 && v === 0 ? 0 : 1;
  },
  o: [ 1, 5 ],
  oFn: function (n) {
    var n10 = n % 10, n100 = n % 100;
    return IN([ 1, 2 ], n10) && !IN([ 11, 12 ], n100) ? 0 : 1;
  }
});

add([ 'tzm' ], {
  c: [ 1, 5 ],
  cFn: function (n) {
    return B(0, 1, n) || B(11, 99, n) ? 0 : 1;
  }
});

add([ 'uk' ], {
  c: [ 1, 3, 4, 5 ],
  cFn: function (n, i, v) {
    var i10 = i % 10, i100 = i % 100;
    return v === 0 && i10 === 1 && i100 !== 11 ? 0 : v === 0 && B(2, 4, i10) && !B(12, 14, i100) ? 1 : v === 0 && i10 === 0 || v === 0 && B(5, 9, i10) || v === 0 && B(11, 14, i100) ? 2 : 3;
  },
  o: [ 3, 5 ],
  oFn: function (n) {
    var n10 = n % 10, n100 = n % 100;
    return n10 === 3 && n100 !== 13 ? 0 : 1;
  }
});

////////////////////////////////////////////////////////////////////////////////
