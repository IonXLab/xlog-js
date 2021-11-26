/**
 * XLog is a simple log manager
 * author: Spacexion
 *
 * - Set default log level printed to one of ['m','e','w','i','d','v']
 * - Get a logger referenced by a unique tag
 * @name XLog
 * @type {XLog}
 * @constructor
 */
function XLog() {
  const loggers = {};
  let logLevel = 'w';


  /**
   * Get log levels
   * @return {char[]}
   */
  this.getLevels = function() {
    return Object.keys(LogLevels);
  };

  /**
   * Get log level
   * @return {char}
   */
  this.getLevel = function() {
    return logLevel;
  };

  /**
   * Set log level
   * @param {char} level - one of ['m','e','w','i','d','v']
   * @param {boolean} recursive - if true, set the level for all loggers
   */
  this.setLevel = function(level, recursive) {
    if(level && LogLevels[level]) {
      logLevel = level;
      if(recursive) {
        Object.keys(loggers).forEach((key) => {
          if(loggers[key])
            loggers[key].setLevel(level);
        });
      }
    }
  };

  /**
   * Return level name
   * @param {char} level
   * @return {string}
   */
  this.getLevelName = function(level) {
    return ((level && LogLevels[level]) ? LogLevels[level].name : null);
  };

  /**
   * Return an instance of XLogger
   * @param {string} tag
   * @return {XLogger}
   */
  this.getLogger = function(tag) {
    if(!tag)
      tag = Math.rand
    if(!loggers[tag])
      loggers[tag] = new XLogger(logLevel, tag);
    return loggers[tag];
  };
}

/**
 * XLogger is a simple logger
 * - Log with one of ['m','e','w','i','d','v']
 * - Set the maximum log level printed
 * - Toggle message elements (see: XLogger.print... )
 * @name XLogger
 * @type {XLogger}
 * @param {char} logLevel - one of ['m','e','w','i','d','v']
 * @param {string} tag - if null, set to a random string
 */
function XLogger (logLevel, tag) {
  const self = this;
  logLevel = (logLevel && LogLevels[logLevel] ? logLevel : 'w');
  if(!tag)
    tag = shortUID();

  // ==========================================================================
  // Parameters
  // ==========================================================================

  /**
   * If true, add a datetime element to all messages
   * @type {boolean}
   */
  this.printDate = true;
  /**
   * If true, add a level key element to all messages
   * @type {boolean}
   */
  this.printLevel = true;
  /**
   * If true, add a level name element instead of level key to all messages
   * @type {boolean}
   */
  this.printLevelName = true;
  /**
   * If true, add a tag element to all messages
   * @type {boolean}
   */
  this.printTag = true;
  /**
   * If true, add a stack trace element to all messages
   * @type {boolean}
   */
  this.printStack = false;

  // ==========================================================================
  // Getters/Setters
  // ==========================================================================

  /**
   * Get log level
   * @return {char}
   */
  this.getLevel = function() {
    return logLevel;
  };

  /**
   * Set log level
   * @param {char} level - one of ['m','e','w','i','d','v']
   */
  this.setLevel = function(level) {
    if (level && LogLevels[level])
      logLevel = level;
    else
      console.warn("The provided level ('"+level+"') is unknown!")
  };

  /**
   * Get log levels
   * @return {string[]}
   */
  this.getLevels = function() {
    return Object.keys(LogLevels);
  };

  // ==========================================================================
  // Helpers
  // ==========================================================================
  function shortUID(length) {
    if (!length)
      length = 8;
    const chars = ['!-_$*+', 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', '0123456789', 'abcdefghijklmnopqrstuvwxyz'];
    let row, uid = '';
    for (let i = 0; i < length; i++) {
      row = chars[Math.floor(Math.random() * chars.length)];
      uid += row.charAt(Math.floor(Math.random() * row.length));
    }
    return uid;
  }

  function pad(n) {
    return (n!=null && n<10 ? "0"+n : n);
  }

  function getParsedDate(date, separator) {
    separator = (separator!=null ? separator : "");
    return ""+date.getFullYear()+separator+pad(date.getMonth()+1)+separator+pad(date.getDate())+separator
      +pad(date.getHours())+separator+pad(date.getMinutes())+separator+pad(date.getSeconds());
  }

  function log(level, args) {
    if(level!=null && !LogLevels[level]) {
      console.warn("The provided level ('"+level+"') is unknown!")
      level = 'd';
    }
    if(!Array.isArray(args))
      args = [args];

    let printStack = false;
    if(args.length && args[args.length-1] && typeof args[args.length-1] === "boolean") {
      printStack = true;
      args.pop(args.length-1);
    }

    // check if level of message is inferior or equal to the current log level
    if(LogLevels[level].value <= LogLevels[logLevel].value) {
      let argsOut = [];

      if(self.printDate)
        argsOut.push("["+getParsedDate(new Date())+"]");
      if(self.printLevel)
        argsOut.push("<"+level+">");
      if(self.printTag)
        argsOut.push("("+tag+")");

      argsOut = argsOut.concat(args);

      if(self.printStack || printStack) {
        const err = new Error();
        argsOut.push("\n"+err.stack);
      }

      console[LogLevels[level].cb].apply(console, argsOut);
    }
  }

  // ==========================================================================
  // Methods
  // ==========================================================================

  /**
   * Log with message level
   * @param {...string} args
   */
  this.m = function(args) {
    log("m", Array.prototype.slice.call(arguments));
  };
  /**
   * Log with error level
   * @param {...string} args
   */
  this.e = function(args) {
    log("e", Array.prototype.slice.call(arguments));
  };
  /**
   * Log with warning level
   * @param {...string} args
   */
  this.w = function(args) {
    log("w", Array.prototype.slice.call(arguments));
  };
  /**
   * Log with info level
   * @param {...string} args
   */
  this.i = function(args) {
    log("i", Array.prototype.slice.call(arguments));
  };
  /**
   * Log with debug level
   * @param {...string} args
   */
  this.d = function(args) {
    log("d", Array.prototype.slice.call(arguments));
  };
  /**
   * Log with verbose level
   * @param {...string} args
   */
  this.v = function(args) {
    log("v", Array.prototype.slice.call(arguments));
  };
  /**
   * Log raw message
   * @param {...string} args
   */
  this.raw = function(args) {
    console.log.apply(console, Array.prototype.slice.call(arguments));
  };
}

/**
 * The log levels
 * @type {LogLevels}
 */
const LogLevels = {
  "m": { id: "m", value: 0, name: "message", cb: "log" },
  "e": { id: "e", value: 1,  name: "error", cb: "error" },
  "w": { id: "w", value: 2,  name: "warning", cb: "warn" },
  "i": { id: "i", value: 3,  name: "info", cb: "info" },
  "d": { id: "d", value: 4,  name: "debug", cb: "debug" },
  "v": { id: "v", value: 5,  name: "verbose", cb: "debug" },
};


let xLog = new XLog();
module.exports = {
  XLog: xLog,
  XLogger: XLogger,
  LogLevels: LogLevels
};