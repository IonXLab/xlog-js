# XLog

XLog is a simple javascript log manager.

```
version: 0.1
author: Spacexion
```

There are two versions, an instantiable function and a static object.

Works on browser and server.

## Usage
Create an instance of it, with desired optional parameters and then log messages with easy methods.

There are 6 levels of log incrementally :
- m: message
- e: error
- w: warning
- i: info
- d: debug
- v: verbose

### Parameters :
- logLevel : default to 'e' debug, the level of logs
- msgPrefix : part added before any log
- msgTag : part added after the prefix
- showDate : if a part with current date is added
- showTime : if a part with current date time is added
- showMsgLevel : if a part with the log level is added
- msgSides : array of two characters which surround each part of logs

### Example :

```
var Log = new XLog("e", "example", "example2", true, true, true, ["<", ">"]);
Log.m("test1");
Log.e("test2");
Log.d("test3");
```

In this example 'test3' will not be logged because log level is set to 'e', inferior to 'd'.

It should looks like :

```
<example> <202001011200> <example2> <m> test1
<example> <202001011200> <example2> <e> test2
```


### Disclaimer :

It's just a simple log manager...
