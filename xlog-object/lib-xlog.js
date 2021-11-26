/**
 * XLog is a simple logger
 *
 * version: 0.1
 * author: Spacexion
 *
 * @name XLog
 * @type {XLog}
 */
var XLog = {
  _level: 4,
  _levels: {m: 0, e: 1, w: 2, i: 3, d: 4, v: 5},
  _levelNames: {m: "log", e: "error", w: "warn", i: "info", d: "debug", v: "log"},
  _getParsedDate: function() {
    var pad = function(n) { return (n<10 ? "0"+n : n); };
    var now = new Date();
    return now.getFullYear()+""+pad(now.getMonth()+1)+""+pad(now.getDate())
      +""+pad(now.getHours())+""+pad(now.getMinutes())+""+pad(now.getSeconds());
  },
  _format : ["[#date#]", "<#level#>", "(#tag#)", "#args#"],
  _log: function(level, tag, args) {
    if(level && XLog._levels.hasOwnProperty(level)
      && tag && args && Array.isArray(args) && args.length > 0) {
      if(XLog._levels[level] <= XLog._level) {
        var argsOut = [];
        for(var i=0; i<XLog._format.length; i++) {
          var f = XLog._format[i];
          if(f.indexOf("#date#")!==-1) { f = f.replace("#date#", XLog._getParsedDate()); }
          if(f.indexOf("#level#")!==-1) { f = f.replace("#level#", level); }
          if(f.indexOf("#tag#")!==-1) { f = f.replace("#tag#", tag); }
          if(f.indexOf("#args#")!==-1) {
            args.forEach(function(a, index) {
              if(index>0) { argsOut.push(a); }
            });
          } else {
            argsOut.push(f);
          }
        }

        console[XLog._levelNames[level]].apply(console, argsOut);
      }
    }
  },
  level: function(level) {
    if(level && XLog._levels.hasOwnProperty(level)) {
      XLog._level = XLog._levels[level];
    }
    return XLog._level;
  },
  levels: function() {
    return XLog._levels;
  },
  m: function(tag, msg) {
    XLog._log("m", tag, Array.prototype.slice.call(arguments));
  },
  e: function(tag, msg) {
    XLog._log("e", tag, Array.prototype.slice.call(arguments));
  },
  w: function(tag, msg) {
    XLog._log("w", tag, Array.prototype.slice.call(arguments));
  },
  i: function(tag, msg) {
    XLog._log("i", tag, Array.prototype.slice.call(arguments));
  },
  d: function(tag, msg) {
    XLog._log("d", tag, Array.prototype.slice.call(arguments));
  },
  v: function(tag, msg) {
    XLog._log("v", tag, Array.prototype.slice.call(arguments));
  },
  raw: function(msg) {
    console.log.apply(console, Array.prototype.slice.call(arguments));
  }
};

if(typeof window === "undefined" && typeof process !== "undefined") {
  module.exports = XLog;
}