//  ********** Library dart:core **************
//  ********** Natives dart:core **************
function $defProp(obj, prop, value) {
  Object.defineProperty(obj, prop,
      {value: value, enumerable: false, writable: true, configurable: true});
}
function $throw(e) {
  // If e is not a value, we can use V8's captureStackTrace utility method.
  // TODO(jmesserly): capture the stack trace on other JS engines.
  if (e && (typeof e == 'object') && Error.captureStackTrace) {
    // TODO(jmesserly): this will clobber the e.stack property
    Error.captureStackTrace(e, $throw);
  }
  throw e;
}
$defProp(Object.prototype, '$index', function(i) {
  $throw(new NoSuchMethodException(this, "operator []", [i]));
});
$defProp(Array.prototype, '$index', function(index) {
  var i = index | 0;
  if (i !== index) {
    throw new IllegalArgumentException('index is not int');
  } else if (i < 0 || i >= this.length) {
    throw new IndexOutOfRangeException(index);
  }
  return this[i];
});
$defProp(String.prototype, '$index', function(i) {
  return this[i];
});
$defProp(Object.prototype, '$setindex', function(i, value) {
  $throw(new NoSuchMethodException(this, "operator []=", [i, value]));
});
$defProp(Array.prototype, '$setindex', function(index, value) {
  var i = index | 0;
  if (i !== index) {
    throw new IllegalArgumentException('index is not int');
  } else if (i < 0 || i >= this.length) {
    throw new IndexOutOfRangeException(index);
  }
  return this[i] = value;
});
function $wrap_call$1(fn) { return fn; }
function $add$complex$(x, y) {
  if (typeof(x) == 'number') {
    $throw(new IllegalArgumentException(y));
  } else if (typeof(x) == 'string') {
    var str = (y == null) ? 'null' : y.toString();
    if (typeof(str) != 'string') {
      throw new Error("calling toString() on right hand operand of operator " +
      "+ did not return a String");
    }
    return x + str;
  } else if (typeof(x) == 'object') {
    return x.$add(y);
  } else {
    $throw(new NoSuchMethodException(x, "operator +", [y]));
  }
}

function $add$(x, y) {
  if (typeof(x) == 'number' && typeof(y) == 'number') return x + y;
  return $add$complex$(x, y);
}
function $eq$(x, y) {
  if (x == null) return y == null;
  return (typeof(x) != 'object') ? x === y : x.$eq(y);
}
// TODO(jimhug): Should this or should it not match equals?
$defProp(Object.prototype, '$eq', function(other) {
  return this === other;
});
function $lt$complex$(x, y) {
  if (typeof(x) == 'number') {
    $throw(new IllegalArgumentException(y));
  } else if (typeof(x) == 'object') {
    return x.$lt(y);
  } else {
    $throw(new NoSuchMethodException(x, "operator <", [y]));
  }
}
function $lt$(x, y) {
  if (typeof(x) == 'number' && typeof(y) == 'number') return x < y;
  return $lt$complex$(x, y);
}
function $ne$(x, y) {
  if (x == null) return y != null;
  return (typeof(x) != 'object') ? x !== y : !x.$eq(y);
}
function $truncdiv$(x, y) {
  if (typeof(x) == 'number') {
    if (typeof(y) == 'number') {
      if (y == 0) $throw(new IntegerDivisionByZeroException());
      var tmp = x / y;
      return (tmp < 0) ? Math.ceil(tmp) : Math.floor(tmp);
    } else {
      $throw(new IllegalArgumentException(y));
    }
  } else if (typeof(x) == 'object') {
    return x.$truncdiv(y);
  } else {
    $throw(new NoSuchMethodException(x, "operator ~/", [y]));
  }
}
$defProp(Object.prototype, '$typeNameOf', (function() {
  function constructorNameWithFallback(obj) {
    var constructor = obj.constructor;
    if (typeof(constructor) == 'function') {
      // The constructor isn't null or undefined at this point. Try
      // to grab hold of its name.
      var name = constructor.name;
      // If the name is a non-empty string, we use that as the type
      // name of this object. On Firefox, we often get 'Object' as
      // the constructor name even for more specialized objects so
      // we have to fall through to the toString() based implementation
      // below in that case.
      if (typeof(name) == 'string' && name && name != 'Object') return name;
    }
    var string = Object.prototype.toString.call(obj);
    return string.substring(8, string.length - 1);
  }

  function chrome$typeNameOf() {
    var name = this.constructor.name;
    if (name == 'Window') return 'DOMWindow';
    return name;
  }

  function firefox$typeNameOf() {
    var name = constructorNameWithFallback(this);
    if (name == 'Window') return 'DOMWindow';
    if (name == 'Document') return 'HTMLDocument';
    if (name == 'XMLDocument') return 'Document';
    return name;
  }

  function ie$typeNameOf() {
    var name = constructorNameWithFallback(this);
    if (name == 'Window') return 'DOMWindow';
    // IE calls both HTML and XML documents 'Document', so we check for the
    // xmlVersion property, which is the empty string on HTML documents.
    if (name == 'Document' && this.xmlVersion) return 'Document';
    if (name == 'Document') return 'HTMLDocument';
    return name;
  }

  // If we're not in the browser, we're almost certainly running on v8.
  if (typeof(navigator) != 'object') return chrome$typeNameOf;

  var userAgent = navigator.userAgent;
  if (/Chrome|DumpRenderTree/.test(userAgent)) return chrome$typeNameOf;
  if (/Firefox/.test(userAgent)) return firefox$typeNameOf;
  if (/MSIE/.test(userAgent)) return ie$typeNameOf;
  return function() { return constructorNameWithFallback(this); };
})());
$defProp(Object.prototype, "get$typeName", Object.prototype.$typeNameOf);
// ********** Code for Object **************
$defProp(Object.prototype, "noSuchMethod", function(name, args) {
  $throw(new NoSuchMethodException(this, name, args));
});
$defProp(Object.prototype, "add$1", function($0) {
  return this.noSuchMethod("add", [$0]);
});
$defProp(Object.prototype, "is$Collection", function() {
  return false;
});
$defProp(Object.prototype, "is$List", function() {
  return false;
});
$defProp(Object.prototype, "is$Map", function() {
  return false;
});
$defProp(Object.prototype, "is$RegExp", function() {
  return false;
});
$defProp(Object.prototype, "sendNotification$1", function($0) {
  return this.noSuchMethod("sendNotification", [$0]);
});
// ********** Code for IndexOutOfRangeException **************
function IndexOutOfRangeException(_index) {
  this._index = _index;
}
IndexOutOfRangeException.prototype.is$IndexOutOfRangeException = function(){return true};
IndexOutOfRangeException.prototype.toString = function() {
  return ("IndexOutOfRangeException: " + this._index);
}
// ********** Code for NoSuchMethodException **************
function NoSuchMethodException(_receiver, _functionName, _arguments, _existingArgumentNames) {
  this._receiver = _receiver;
  this._functionName = _functionName;
  this._arguments = _arguments;
  this._existingArgumentNames = _existingArgumentNames;
}
NoSuchMethodException.prototype.is$NoSuchMethodException = function(){return true};
NoSuchMethodException.prototype.toString = function() {
  var sb = new StringBufferImpl("");
  for (var i = (0);
   i < this._arguments.get$length(); i++) {
    if (i > (0)) {
      sb.add(", ");
    }
    sb.add(this._arguments.$index(i));
  }
  if (null == this._existingArgumentNames) {
    return $add$($add$(("NoSuchMethodException : method not found: '" + this._functionName + "'\n"), ("Receiver: " + this._receiver + "\n")), ("Arguments: [" + sb + "]"));
  }
  else {
    var actualParameters = sb.toString();
    sb = new StringBufferImpl("");
    for (var i = (0);
     i < this._existingArgumentNames.get$length(); i++) {
      if (i > (0)) {
        sb.add(", ");
      }
      sb.add(this._existingArgumentNames.$index(i));
    }
    var formalParameters = sb.toString();
    return $add$($add$($add$("NoSuchMethodException: incorrect number of arguments passed to ", ("method named '" + this._functionName + "'\nReceiver: " + this._receiver + "\n")), ("Tried calling: " + this._functionName + "(" + actualParameters + ")\n")), ("Found: " + this._functionName + "(" + formalParameters + ")"));
  }
}
// ********** Code for ClosureArgumentMismatchException **************
function ClosureArgumentMismatchException() {

}
ClosureArgumentMismatchException.prototype.toString = function() {
  return "Closure argument mismatch";
}
// ********** Code for IllegalArgumentException **************
function IllegalArgumentException(arg) {
  this._arg = arg;
}
IllegalArgumentException.prototype.is$IllegalArgumentException = function(){return true};
IllegalArgumentException.prototype.toString = function() {
  return ("Illegal argument(s): " + this._arg);
}
// ********** Code for NoMoreElementsException **************
function NoMoreElementsException() {

}
NoMoreElementsException.prototype.toString = function() {
  return "NoMoreElementsException";
}
// ********** Code for UnsupportedOperationException **************
function UnsupportedOperationException(_message) {
  this._message = _message;
}
UnsupportedOperationException.prototype.toString = function() {
  return ("UnsupportedOperationException: " + this._message);
}
// ********** Code for IntegerDivisionByZeroException **************
function IntegerDivisionByZeroException() {

}
IntegerDivisionByZeroException.prototype.is$IntegerDivisionByZeroException = function(){return true};
IntegerDivisionByZeroException.prototype.toString = function() {
  return "IntegerDivisionByZeroException";
}
// ********** Code for dart_core_Function **************
Function.prototype.to$call$0 = function() {
  this.call$0 = this._genStub(0);
  this.to$call$0 = function() { return this.call$0; };
  return this.call$0;
};
Function.prototype.call$0 = function() {
  return this.to$call$0()();
};
function to$call$0(f) { return f && f.to$call$0(); }
Function.prototype.to$call$1 = function() {
  this.call$1 = this._genStub(1);
  this.to$call$1 = function() { return this.call$1; };
  return this.call$1;
};
Function.prototype.call$1 = function($0) {
  return this.to$call$1()($0);
};
function to$call$1(f) { return f && f.to$call$1(); }
Function.prototype.to$call$2 = function() {
  this.call$2 = this._genStub(2);
  this.to$call$2 = function() { return this.call$2; };
  return this.call$2;
};
Function.prototype.call$2 = function($0, $1) {
  return this.to$call$2()($0, $1);
};
function to$call$2(f) { return f && f.to$call$2(); }
// ********** Code for top level **************
//  ********** Library dart:coreimpl **************
// ********** Code for ListFactory **************
ListFactory = Array;
$defProp(ListFactory.prototype, "is$List", function(){return true});
$defProp(ListFactory.prototype, "is$Collection", function(){return true});
$defProp(ListFactory.prototype, "get$length", function() { return this.length; });
$defProp(ListFactory.prototype, "set$length", function(value) { return this.length = value; });
$defProp(ListFactory.prototype, "add", function(value) {
  this.push(value);
});
$defProp(ListFactory.prototype, "clear", function() {
  this.set$length((0));
});
$defProp(ListFactory.prototype, "removeLast", function() {
  return this.pop();
});
$defProp(ListFactory.prototype, "iterator", function() {
  return new ListIterator(this);
});
$defProp(ListFactory.prototype, "toString", function() {
  return Collections.collectionToString(this);
});
$defProp(ListFactory.prototype, "add$1", ListFactory.prototype.add);
// ********** Code for ListIterator **************
function ListIterator(array) {
  this._array = array;
  this._pos = (0);
}
ListIterator.prototype.hasNext = function() {
  return this._array.get$length() > this._pos;
}
ListIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0000);
  }
  return this._array.$index(this._pos++);
}
// ********** Code for NumImplementation **************
NumImplementation = Number;
NumImplementation.prototype.hashCode = function() {
  'use strict'; return this & 0x1FFFFFFF;
}
// ********** Code for Collections **************
function Collections() {}
Collections.collectionToString = function(c) {
  var result = new StringBufferImpl("");
  Collections._emitCollection(c, result, new Array());
  return result.toString();
}
Collections._emitCollection = function(c, result, visiting) {
  visiting.add(c);
  var isList = !!(c && c.is$List());
  result.add(isList ? "[" : "{");
  var first = true;
  for (var $$i = c.iterator(); $$i.hasNext(); ) {
    var e = $$i.next();
    if (!first) {
      result.add(", ");
    }
    first = false;
    Collections._emitObject(e, result, visiting);
  }
  result.add(isList ? "]" : "}");
  visiting.removeLast();
}
Collections._emitObject = function(o, result, visiting) {
  if (!!(o && o.is$Collection())) {
    if (Collections._containsRef(visiting, o)) {
      result.add(!!(o && o.is$List()) ? "[...]" : "{...}");
    }
    else {
      Collections._emitCollection(o, result, visiting);
    }
  }
  else if (!!(o && o.is$Map())) {
    if (Collections._containsRef(visiting, o)) {
      result.add("{...}");
    }
    else {
      Maps._emitMap(o, result, visiting);
    }
  }
  else {
    result.add($eq$(o) ? "null" : o);
  }
}
Collections._containsRef = function(c, ref) {
  for (var $$i = c.iterator(); $$i.hasNext(); ) {
    var e = $$i.next();
    if ((null == e ? null == (ref) : e === ref)) return true;
  }
  return false;
}
// ********** Code for HashMapImplementation **************
function HashMapImplementation() {}
HashMapImplementation.prototype.is$Map = function(){return true};
HashMapImplementation._computeLoadLimit = function(capacity) {
  return $truncdiv$((capacity * (3)), (4));
}
HashMapImplementation._firstProbe = function(hashCode, length) {
  return hashCode & (length - (1));
}
HashMapImplementation._nextProbe = function(currentProbe, numberOfProbes, length) {
  return (currentProbe + numberOfProbes) & (length - (1));
}
HashMapImplementation.prototype._probeForAdding = function(key) {
  var hash = HashMapImplementation._firstProbe(key.hashCode(), this._keys.get$length());
  var numberOfProbes = (1);
  var initialHash = hash;
  var insertionIndex = (-1);
  while (true) {
    var existingKey = this._keys.$index(hash);
    if (null == existingKey) {
      if (insertionIndex < (0)) return hash;
      return insertionIndex;
    }
    else if ($eq$(existingKey, key)) {
      return hash;
    }
    else if ((insertionIndex < (0)) && ((null == const$0001 ? null == (existingKey) : const$0001 === existingKey))) {
      insertionIndex = hash;
    }
    hash = HashMapImplementation._nextProbe(hash, numberOfProbes++, this._keys.get$length());
  }
}
HashMapImplementation.prototype._probeForLookup = function(key) {
  var hash = HashMapImplementation._firstProbe(key.hashCode(), this._keys.get$length());
  var numberOfProbes = (1);
  var initialHash = hash;
  while (true) {
    var existingKey = this._keys.$index(hash);
    if (null == existingKey) return (-1);
    if ($eq$(existingKey, key)) return hash;
    hash = HashMapImplementation._nextProbe(hash, numberOfProbes++, this._keys.get$length());
  }
}
HashMapImplementation.prototype._ensureCapacity = function() {
  var newNumberOfEntries = this._numberOfEntries + (1);
  if (newNumberOfEntries >= this._loadLimit) {
    this._grow(this._keys.get$length() * (2));
    return;
  }
  var capacity = this._keys.get$length();
  var numberOfFreeOrDeleted = capacity - newNumberOfEntries;
  var numberOfFree = numberOfFreeOrDeleted - this._numberOfDeleted;
  if (this._numberOfDeleted > numberOfFree) {
    this._grow(this._keys.get$length());
  }
}
HashMapImplementation._isPowerOfTwo = function(x) {
  return ((x & (x - (1))) == (0));
}
HashMapImplementation.prototype._grow = function(newCapacity) {
  var capacity = this._keys.get$length();
  this._loadLimit = HashMapImplementation._computeLoadLimit(newCapacity);
  var oldKeys = this._keys;
  var oldValues = this._values;
  this._keys = new Array(newCapacity);
  this._values = new Array(newCapacity);
  for (var i = (0);
   i < capacity; i++) {
    var key = oldKeys.$index(i);
    if (null == key || (null == key ? null == (const$0001) : key === const$0001)) {
      continue;
    }
    var value = oldValues.$index(i);
    var newIndex = this._probeForAdding(key);
    this._keys.$setindex(newIndex, key);
    this._values.$setindex(newIndex, value);
  }
  this._numberOfDeleted = (0);
}
HashMapImplementation.prototype.$setindex = function(key, value) {
  var $0;
  this._ensureCapacity();
  var index = this._probeForAdding(key);
  if ((null == this._keys.$index(index)) || ((($0 = this._keys.$index(index)) == null ? null == (const$0001) : $0 === const$0001))) {
    this._numberOfEntries++;
  }
  this._keys.$setindex(index, key);
  this._values.$setindex(index, value);
}
HashMapImplementation.prototype.$index = function(key) {
  var index = this._probeForLookup(key);
  if (index < (0)) return null;
  return this._values.$index(index);
}
HashMapImplementation.prototype.forEach = function(f) {
  var length = this._keys.get$length();
  for (var i = (0);
   i < length; i++) {
    var key = this._keys.$index(i);
    if ((null != key) && ((null == key ? null != (const$0001) : key !== const$0001))) {
      f(key, this._values.$index(i));
    }
  }
}
HashMapImplementation.prototype.toString = function() {
  return Maps.mapToString(this);
}
// ********** Code for HashMapImplementation_dart_core_String$dart_core_Function **************
/** Implements extends for Dart classes on JavaScript prototypes. */
function $inherits(child, parent) {
  if (child.prototype.__proto__) {
    child.prototype.__proto__ = parent.prototype;
  } else {
    function tmp() {};
    tmp.prototype = parent.prototype;
    child.prototype = new tmp();
    child.prototype.constructor = child;
  }
}
$inherits(HashMapImplementation_dart_core_String$dart_core_Function, HashMapImplementation);
function HashMapImplementation_dart_core_String$dart_core_Function() {
  this._numberOfEntries = (0);
  this._numberOfDeleted = (0);
  this._loadLimit = HashMapImplementation._computeLoadLimit((8));
  this._keys = new Array((8));
  this._values = new Array((8));
}
HashMapImplementation_dart_core_String$dart_core_Function.prototype.is$Map = function(){return true};
// ********** Code for HashMapImplementation_dart_core_String$List_IObserver **************
$inherits(HashMapImplementation_dart_core_String$List_IObserver, HashMapImplementation);
function HashMapImplementation_dart_core_String$List_IObserver() {
  this._numberOfEntries = (0);
  this._numberOfDeleted = (0);
  this._loadLimit = HashMapImplementation._computeLoadLimit((8));
  this._keys = new Array((8));
  this._values = new Array((8));
}
HashMapImplementation_dart_core_String$List_IObserver.prototype.is$Map = function(){return true};
// ********** Code for HashMapImplementation_dart_core_String$IController **************
$inherits(HashMapImplementation_dart_core_String$IController, HashMapImplementation);
function HashMapImplementation_dart_core_String$IController() {
  this._numberOfEntries = (0);
  this._numberOfDeleted = (0);
  this._loadLimit = HashMapImplementation._computeLoadLimit((8));
  this._keys = new Array((8));
  this._values = new Array((8));
}
HashMapImplementation_dart_core_String$IController.prototype.is$Map = function(){return true};
// ********** Code for HashMapImplementation_dart_core_String$IFacade **************
$inherits(HashMapImplementation_dart_core_String$IFacade, HashMapImplementation);
function HashMapImplementation_dart_core_String$IFacade() {
  this._numberOfEntries = (0);
  this._numberOfDeleted = (0);
  this._loadLimit = HashMapImplementation._computeLoadLimit((8));
  this._keys = new Array((8));
  this._values = new Array((8));
}
HashMapImplementation_dart_core_String$IFacade.prototype.is$Map = function(){return true};
// ********** Code for HashMapImplementation_dart_core_String$IMediator **************
$inherits(HashMapImplementation_dart_core_String$IMediator, HashMapImplementation);
function HashMapImplementation_dart_core_String$IMediator() {
  this._numberOfEntries = (0);
  this._numberOfDeleted = (0);
  this._loadLimit = HashMapImplementation._computeLoadLimit((8));
  this._keys = new Array((8));
  this._values = new Array((8));
}
HashMapImplementation_dart_core_String$IMediator.prototype.is$Map = function(){return true};
// ********** Code for HashMapImplementation_dart_core_String$IModel **************
$inherits(HashMapImplementation_dart_core_String$IModel, HashMapImplementation);
function HashMapImplementation_dart_core_String$IModel() {
  this._numberOfEntries = (0);
  this._numberOfDeleted = (0);
  this._loadLimit = HashMapImplementation._computeLoadLimit((8));
  this._keys = new Array((8));
  this._values = new Array((8));
}
HashMapImplementation_dart_core_String$IModel.prototype.is$Map = function(){return true};
// ********** Code for HashMapImplementation_dart_core_String$IProxy **************
$inherits(HashMapImplementation_dart_core_String$IProxy, HashMapImplementation);
function HashMapImplementation_dart_core_String$IProxy() {
  this._numberOfEntries = (0);
  this._numberOfDeleted = (0);
  this._loadLimit = HashMapImplementation._computeLoadLimit((8));
  this._keys = new Array((8));
  this._values = new Array((8));
}
HashMapImplementation_dart_core_String$IProxy.prototype.is$Map = function(){return true};
// ********** Code for HashMapImplementation_dart_core_String$IView **************
$inherits(HashMapImplementation_dart_core_String$IView, HashMapImplementation);
function HashMapImplementation_dart_core_String$IView() {
  this._numberOfEntries = (0);
  this._numberOfDeleted = (0);
  this._loadLimit = HashMapImplementation._computeLoadLimit((8));
  this._keys = new Array((8));
  this._values = new Array((8));
}
HashMapImplementation_dart_core_String$IView.prototype.is$Map = function(){return true};
// ********** Code for _DeletedKeySentinel **************
function _DeletedKeySentinel() {

}
// ********** Code for Maps **************
function Maps() {}
Maps.mapToString = function(m) {
  var result = new StringBufferImpl("");
  Maps._emitMap(m, result, new Array());
  return result.toString();
}
Maps._emitMap = function(m, result, visiting) {
  visiting.add(m);
  result.add("{");
  var first = true;
  m.forEach((function (k, v) {
    if (!first) {
      result.add(", ");
    }
    first = false;
    Collections._emitObject(k, result, visiting);
    result.add(": ");
    Collections._emitObject(v, result, visiting);
  })
  );
  result.add("}");
  visiting.removeLast();
}
// ********** Code for DoubleLinkedQueue **************
function DoubleLinkedQueue() {}
DoubleLinkedQueue.prototype.is$Collection = function(){return true};
DoubleLinkedQueue.prototype.addLast = function(value) {
  this._sentinel.prepend(value);
}
DoubleLinkedQueue.prototype.add = function(value) {
  this.addLast(value);
}
DoubleLinkedQueue.prototype.iterator = function() {
  return new _DoubleLinkedQueueIterator(this._sentinel);
}
DoubleLinkedQueue.prototype.toString = function() {
  return Collections.collectionToString(this);
}
DoubleLinkedQueue.prototype.add$1 = DoubleLinkedQueue.prototype.add;
// ********** Code for _DoubleLinkedQueueIterator **************
function _DoubleLinkedQueueIterator(_sentinel) {
  this._sentinel = _sentinel;
  this._currentEntry = this._sentinel;
}
_DoubleLinkedQueueIterator.prototype.hasNext = function() {
  var $0;
  return (($0 = this._currentEntry._next) == null ? null != (this._sentinel) : $0 !== this._sentinel);
}
_DoubleLinkedQueueIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0000);
  }
  this._currentEntry = this._currentEntry._next;
  return this._currentEntry.get$element();
}
// ********** Code for StringBufferImpl **************
function StringBufferImpl(content) {
  this.clear();
  this.add(content);
}
StringBufferImpl.prototype.add = function(obj) {
  var str = obj.toString();
  if (null == str || str.isEmpty()) return this;
  this._buffer.add(str);
  this._length = this._length + str.length;
  return this;
}
StringBufferImpl.prototype.clear = function() {
  this._buffer = new Array();
  this._length = (0);
  return this;
}
StringBufferImpl.prototype.toString = function() {
  if (this._buffer.get$length() == (0)) return "";
  if (this._buffer.get$length() == (1)) return this._buffer.$index((0));
  var result = StringBase.concatAll(this._buffer);
  this._buffer.clear();
  this._buffer.add(result);
  return result;
}
StringBufferImpl.prototype.add$1 = StringBufferImpl.prototype.add;
// ********** Code for StringBase **************
function StringBase() {}
StringBase.join = function(strings, separator) {
  if (strings.get$length() == (0)) return "";
  var s = strings.$index((0));
  for (var i = (1);
   i < strings.get$length(); i++) {
    s = $add$($add$(s, separator), strings.$index(i));
  }
  return s;
}
StringBase.concatAll = function(strings) {
  return StringBase.join(strings, "");
}
// ********** Code for StringImplementation **************
StringImplementation = String;
StringImplementation.prototype.isEmpty = function() {
  return this.length == (0);
}
StringImplementation.prototype.split_ = function(pattern) {
  if ((typeof(pattern) == 'string')) return this._split(pattern);
  if (!!(pattern && pattern.is$RegExp())) return this._splitRegExp(pattern);
  $throw("String.split(Pattern) unimplemented.");
}
StringImplementation.prototype._split = function(pattern) {
  'use strict'; return this.split(pattern);
}
StringImplementation.prototype._splitRegExp = function(pattern) {
  'use strict'; return this.split(pattern.re);
}
StringImplementation.prototype.splitChars = function() {
  return this.split_("");
}
StringImplementation.prototype.hashCode = function() {
      'use strict';
      var hash = 0;
      for (var i = 0; i < this.length; i++) {
        hash = 0x1fffffff & (hash + this.charCodeAt(i));
        hash = 0x1fffffff & (hash + ((0x0007ffff & hash) << 10));
        hash ^= hash >> 6;
      }

      hash = 0x1fffffff & (hash + ((0x03ffffff & hash) << 3));
      hash ^= hash >> 11;
      return 0x1fffffff & (hash + ((0x00003fff & hash) << 15));
}
// ********** Code for _ArgumentMismatchException **************
$inherits(_ArgumentMismatchException, ClosureArgumentMismatchException);
function _ArgumentMismatchException(_message) {
  this._dart_coreimpl_message = _message;
  ClosureArgumentMismatchException.call(this);
}
_ArgumentMismatchException.prototype.toString = function() {
  return ("Closure argument mismatch: " + this._dart_coreimpl_message);
}
// ********** Code for _FunctionImplementation **************
_FunctionImplementation = Function;
_FunctionImplementation.prototype._genStub = function(argsLength, names) {
      // Fast path #1: if no named arguments and arg count matches.
      var thisLength = this.$length || this.length;
      if (thisLength == argsLength && !names) {
        return this;
      }

      var paramsNamed = this.$optional ? (this.$optional.length / 2) : 0;
      var paramsBare = thisLength - paramsNamed;
      var argsNamed = names ? names.length : 0;
      var argsBare = argsLength - argsNamed;

      // Check we got the right number of arguments
      if (argsBare < paramsBare || argsLength > thisLength ||
          argsNamed > paramsNamed) {
        return function() {
          $throw(new _ArgumentMismatchException(
            'Wrong number of arguments to function. Expected ' + paramsBare +
            ' positional arguments and at most ' + paramsNamed +
            ' named arguments, but got ' + argsBare +
            ' positional arguments and ' + argsNamed + ' named arguments.'));
        };
      }

      // First, fill in all of the default values
      var p = new Array(paramsBare);
      if (paramsNamed) {
        p = p.concat(this.$optional.slice(paramsNamed));
      }
      // Fill in positional args
      var a = new Array(argsLength);
      for (var i = 0; i < argsBare; i++) {
        p[i] = a[i] = '$' + i;
      }
      // Then overwrite with supplied values for optional args
      var lastParameterIndex;
      var namesInOrder = true;
      for (var i = 0; i < argsNamed; i++) {
        var name = names[i];
        a[i + argsBare] = name;
        var j = this.$optional.indexOf(name);
        if (j < 0 || j >= paramsNamed) {
          return function() {
            $throw(new _ArgumentMismatchException(
              'Named argument "' + name + '" was not expected by function.' +
              ' Did you forget to mark the function parameter [optional]?'));
          };
        } else if (lastParameterIndex && lastParameterIndex > j) {
          namesInOrder = false;
        }
        p[j + paramsBare] = name;
        lastParameterIndex = j;
      }

      if (thisLength == argsLength && namesInOrder) {
        // Fast path #2: named arguments, but they're in order and all supplied.
        return this;
      }

      // Note: using Function instead of 'eval' to get a clean scope.
      // TODO(jmesserly): evaluate the performance of these stubs.
      var f = 'function(' + a.join(',') + '){return $f(' + p.join(',') + ');}';
      return new Function('$f', 'return ' + f + '').call(null, this);
    
}
// ********** Code for top level **************
//  ********** Library dom **************
// ********** Code for _DOMTypeJs **************
// ********** Code for _EventTargetJs **************
// ********** Code for _AbstractWorkerJs **************
// ********** Code for _ArrayBufferJs **************
// ********** Code for _ArrayBufferViewJs **************
// ********** Code for _NodeJs **************
// ********** Code for _AttrJs **************
// ********** Code for _AudioBufferJs **************
// ********** Code for _AudioNodeJs **************
// ********** Code for _AudioSourceNodeJs **************
// ********** Code for _AudioBufferSourceNodeJs **************
// ********** Code for _AudioChannelMergerJs **************
// ********** Code for _AudioChannelSplitterJs **************
// ********** Code for _AudioContextJs **************
// ********** Code for _AudioDestinationNodeJs **************
// ********** Code for _AudioParamJs **************
// ********** Code for _AudioGainJs **************
// ********** Code for _AudioGainNodeJs **************
// ********** Code for _AudioListenerJs **************
// ********** Code for _AudioPannerNodeJs **************
// ********** Code for _EventJs **************
// ********** Code for _AudioProcessingEventJs **************
// ********** Code for _BarInfoJs **************
// ********** Code for _BeforeLoadEventJs **************
// ********** Code for _BiquadFilterNodeJs **************
// ********** Code for _BlobJs **************
// ********** Code for _CharacterDataJs **************
// ********** Code for _TextJs **************
// ********** Code for _CDATASectionJs **************
// ********** Code for _CSSRuleJs **************
// ********** Code for _CSSCharsetRuleJs **************
// ********** Code for _CSSFontFaceRuleJs **************
// ********** Code for _CSSImportRuleJs **************
// ********** Code for _CSSMediaRuleJs **************
// ********** Code for _CSSPageRuleJs **************
// ********** Code for _CSSValueJs **************
// ********** Code for _CSSPrimitiveValueJs **************
// ********** Code for _CSSRuleListJs **************
// ********** Code for _CSSStyleDeclarationJs **************
// ********** Code for _CSSStyleRuleJs **************
// ********** Code for _StyleSheetJs **************
// ********** Code for _CSSStyleSheetJs **************
// ********** Code for _CSSUnknownRuleJs **************
// ********** Code for _CSSValueListJs **************
// ********** Code for _CanvasGradientJs **************
// ********** Code for _CanvasPatternJs **************
// ********** Code for _CanvasPixelArrayJs **************
function $dynamic(name) {
  var f = Object.prototype[name];
  if (f && f.methods) return f.methods;

  var methods = {};
  if (f) methods.Object = f;
  function $dynamicBind() {
    // Find the target method
    var obj = this;
    var tag = obj.$typeNameOf();
    var method = methods[tag];
    if (!method) {
      var table = $dynamicMetadata;
      for (var i = 0; i < table.length; i++) {
        var entry = table[i];
        if (entry.map.hasOwnProperty(tag)) {
          method = methods[entry.tag];
          if (method) break;
        }
      }
    }
    method = method || methods.Object;
    var proto = Object.getPrototypeOf(obj);
    if (!proto.hasOwnProperty(name)) {
      $defProp(proto, name, method);
    }

    return method.apply(this, Array.prototype.slice.call(arguments));
  };
  $dynamicBind.methods = methods;
  $defProp(Object.prototype, name, $dynamicBind);
  return methods;
}
if (typeof $dynamicMetadata == 'undefined') $dynamicMetadata = [];
$dynamic("is$List").CanvasPixelArray = function(){return true};
$dynamic("is$Collection").CanvasPixelArray = function(){return true};
$dynamic("get$length").CanvasPixelArray = function() { return this.length; };
$dynamic("$index").CanvasPixelArray = function(index) {
  return this[index];
}
$dynamic("$setindex").CanvasPixelArray = function(index, value) {
  this[index] = value
}
$dynamic("iterator").CanvasPixelArray = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").CanvasPixelArray = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("add$1").CanvasPixelArray = function($0) {
  return this.add($0);
};
// ********** Code for _CanvasRenderingContextJs **************
// ********** Code for _CanvasRenderingContext2DJs **************
// ********** Code for _ClientRectJs **************
// ********** Code for _ClientRectListJs **************
// ********** Code for _ClipboardJs **************
// ********** Code for _CloseEventJs **************
// ********** Code for _CommentJs **************
// ********** Code for _UIEventJs **************
// ********** Code for _CompositionEventJs **************
// ********** Code for _ConsoleJs **************
_ConsoleJs = (typeof console == 'undefined' ? {} : console);
// ********** Code for _ConvolverNodeJs **************
// ********** Code for _CoordinatesJs **************
// ********** Code for _CounterJs **************
// ********** Code for _CryptoJs **************
// ********** Code for _CustomEventJs **************
// ********** Code for _DOMApplicationCacheJs **************
// ********** Code for _DOMExceptionJs **************
// ********** Code for _DOMFileSystemJs **************
// ********** Code for _DOMFileSystemSyncJs **************
// ********** Code for _DOMFormDataJs **************
// ********** Code for _DOMImplementationJs **************
// ********** Code for _DOMMimeTypeJs **************
// ********** Code for _DOMMimeTypeArrayJs **************
// ********** Code for _DOMParserJs **************
// ********** Code for _DOMPluginJs **************
// ********** Code for _DOMPluginArrayJs **************
// ********** Code for _DOMSelectionJs **************
// ********** Code for _DOMTokenListJs **************
$dynamic("add$1").DOMTokenList = function($0) {
  return this.add($0);
};
// ********** Code for _DOMSettableTokenListJs **************
// ********** Code for _DOMURLJs **************
// ********** Code for _DOMWindowJs **************
// ********** Code for _DataTransferItemJs **************
// ********** Code for _DataTransferItemListJs **************
$dynamic("add$1").DataTransferItemList = function($0) {
  return this.add($0);
};
// ********** Code for _DataViewJs **************
// ********** Code for _DatabaseJs **************
// ********** Code for _DatabaseSyncJs **************
// ********** Code for _WorkerContextJs **************
// ********** Code for _DedicatedWorkerContextJs **************
// ********** Code for _DelayNodeJs **************
// ********** Code for _DeprecatedPeerConnectionJs **************
// ********** Code for _DeviceMotionEventJs **************
// ********** Code for _DeviceOrientationEventJs **************
// ********** Code for _EntryJs **************
// ********** Code for _DirectoryEntryJs **************
// ********** Code for _EntrySyncJs **************
// ********** Code for _DirectoryEntrySyncJs **************
// ********** Code for _DirectoryReaderJs **************
// ********** Code for _DirectoryReaderSyncJs **************
// ********** Code for _DocumentJs **************
// ********** Code for _DocumentFragmentJs **************
// ********** Code for _DocumentTypeJs **************
// ********** Code for _DynamicsCompressorNodeJs **************
// ********** Code for _EXTTextureFilterAnisotropicJs **************
// ********** Code for _ElementJs **************
// ********** Code for _ElementTimeControlJs **************
// ********** Code for _ElementTraversalJs **************
// ********** Code for _EntityJs **************
// ********** Code for _EntityReferenceJs **************
// ********** Code for _EntryArrayJs **************
// ********** Code for _EntryArraySyncJs **************
// ********** Code for _ErrorEventJs **************
// ********** Code for _EventExceptionJs **************
// ********** Code for _EventSourceJs **************
// ********** Code for _FileJs **************
// ********** Code for _FileEntryJs **************
// ********** Code for _FileEntrySyncJs **************
// ********** Code for _FileErrorJs **************
// ********** Code for _FileExceptionJs **************
// ********** Code for _FileListJs **************
// ********** Code for _FileReaderJs **************
// ********** Code for _FileReaderSyncJs **************
// ********** Code for _FileWriterJs **************
// ********** Code for _FileWriterSyncJs **************
// ********** Code for _Float32ArrayJs **************
var _Float32ArrayJs = {};
$dynamic("is$List").Float32Array = function(){return true};
$dynamic("is$Collection").Float32Array = function(){return true};
$dynamic("get$length").Float32Array = function() { return this.length; };
$dynamic("$index").Float32Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Float32Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Float32Array = function() {
  return new _FixedSizeListIterator_num(this);
}
$dynamic("add").Float32Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("add$1").Float32Array = function($0) {
  return this.add($0);
};
// ********** Code for _Float64ArrayJs **************
var _Float64ArrayJs = {};
$dynamic("is$List").Float64Array = function(){return true};
$dynamic("is$Collection").Float64Array = function(){return true};
$dynamic("get$length").Float64Array = function() { return this.length; };
$dynamic("$index").Float64Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Float64Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Float64Array = function() {
  return new _FixedSizeListIterator_num(this);
}
$dynamic("add").Float64Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("add$1").Float64Array = function($0) {
  return this.add($0);
};
// ********** Code for _GeolocationJs **************
// ********** Code for _GeopositionJs **************
// ********** Code for _HTMLAllCollectionJs **************
// ********** Code for _HTMLElementJs **************
// ********** Code for _HTMLAnchorElementJs **************
// ********** Code for _HTMLAppletElementJs **************
// ********** Code for _HTMLAreaElementJs **************
// ********** Code for _HTMLMediaElementJs **************
// ********** Code for _HTMLAudioElementJs **************
// ********** Code for _HTMLBRElementJs **************
// ********** Code for _HTMLBaseElementJs **************
// ********** Code for _HTMLBaseFontElementJs **************
// ********** Code for _HTMLBodyElementJs **************
// ********** Code for _HTMLButtonElementJs **************
// ********** Code for _HTMLCanvasElementJs **************
// ********** Code for _HTMLCollectionJs **************
$dynamic("is$List").HTMLCollection = function(){return true};
$dynamic("is$Collection").HTMLCollection = function(){return true};
$dynamic("get$length").HTMLCollection = function() { return this.length; };
$dynamic("$index").HTMLCollection = function(index) {
  return this[index];
}
$dynamic("$setindex").HTMLCollection = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").HTMLCollection = function() {
  return new _FixedSizeListIterator_dom_Node(this);
}
$dynamic("add").HTMLCollection = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("add$1").HTMLCollection = function($0) {
  return this.add($0);
};
// ********** Code for _HTMLContentElementJs **************
// ********** Code for _HTMLDListElementJs **************
// ********** Code for _HTMLDetailsElementJs **************
// ********** Code for _HTMLDirectoryElementJs **************
// ********** Code for _HTMLDivElementJs **************
// ********** Code for _HTMLDocumentJs **************
// ********** Code for _HTMLEmbedElementJs **************
// ********** Code for _HTMLFieldSetElementJs **************
// ********** Code for _HTMLFontElementJs **************
// ********** Code for _HTMLFormElementJs **************
// ********** Code for _HTMLFrameElementJs **************
// ********** Code for _HTMLFrameSetElementJs **************
// ********** Code for _HTMLHRElementJs **************
// ********** Code for _HTMLHeadElementJs **************
// ********** Code for _HTMLHeadingElementJs **************
// ********** Code for _HTMLHtmlElementJs **************
// ********** Code for _HTMLIFrameElementJs **************
// ********** Code for _HTMLImageElementJs **************
// ********** Code for _HTMLInputElementJs **************
// ********** Code for _HTMLKeygenElementJs **************
// ********** Code for _HTMLLIElementJs **************
// ********** Code for _HTMLLabelElementJs **************
// ********** Code for _HTMLLegendElementJs **************
// ********** Code for _HTMLLinkElementJs **************
// ********** Code for _HTMLMapElementJs **************
// ********** Code for _HTMLMarqueeElementJs **************
// ********** Code for _HTMLMenuElementJs **************
// ********** Code for _HTMLMetaElementJs **************
// ********** Code for _HTMLMeterElementJs **************
// ********** Code for _HTMLModElementJs **************
// ********** Code for _HTMLOListElementJs **************
// ********** Code for _HTMLObjectElementJs **************
// ********** Code for _HTMLOptGroupElementJs **************
// ********** Code for _HTMLOptionElementJs **************
// ********** Code for _HTMLOptionsCollectionJs **************
$dynamic("is$List").HTMLOptionsCollection = function(){return true};
$dynamic("is$Collection").HTMLOptionsCollection = function(){return true};
$dynamic("get$length").HTMLOptionsCollection = function() {
  return this.length;
}
// ********** Code for _HTMLOutputElementJs **************
// ********** Code for _HTMLParagraphElementJs **************
// ********** Code for _HTMLParamElementJs **************
// ********** Code for _HTMLPreElementJs **************
// ********** Code for _HTMLProgressElementJs **************
// ********** Code for _HTMLQuoteElementJs **************
// ********** Code for _HTMLScriptElementJs **************
// ********** Code for _HTMLSelectElementJs **************
// ********** Code for _HTMLShadowElementJs **************
// ********** Code for _HTMLSourceElementJs **************
// ********** Code for _HTMLSpanElementJs **************
// ********** Code for _HTMLStyleElementJs **************
// ********** Code for _HTMLTableCaptionElementJs **************
// ********** Code for _HTMLTableCellElementJs **************
// ********** Code for _HTMLTableColElementJs **************
// ********** Code for _HTMLTableElementJs **************
// ********** Code for _HTMLTableRowElementJs **************
// ********** Code for _HTMLTableSectionElementJs **************
// ********** Code for _HTMLTextAreaElementJs **************
// ********** Code for _HTMLTitleElementJs **************
// ********** Code for _HTMLTrackElementJs **************
// ********** Code for _HTMLUListElementJs **************
// ********** Code for _HTMLUnknownElementJs **************
// ********** Code for _HTMLVideoElementJs **************
// ********** Code for _HashChangeEventJs **************
// ********** Code for _HighPass2FilterNodeJs **************
// ********** Code for _HistoryJs **************
// ********** Code for _IDBAnyJs **************
// ********** Code for _IDBCursorJs **************
// ********** Code for _IDBCursorWithValueJs **************
// ********** Code for _IDBDatabaseJs **************
// ********** Code for _IDBDatabaseErrorJs **************
// ********** Code for _IDBDatabaseExceptionJs **************
// ********** Code for _IDBFactoryJs **************
// ********** Code for _IDBIndexJs **************
// ********** Code for _IDBKeyJs **************
// ********** Code for _IDBKeyRangeJs **************
// ********** Code for _IDBObjectStoreJs **************
$dynamic("add$1").IDBObjectStore = function($0) {
  return this.add($0);
};
// ********** Code for _IDBRequestJs **************
// ********** Code for _IDBTransactionJs **************
// ********** Code for _IDBVersionChangeEventJs **************
// ********** Code for _IDBVersionChangeRequestJs **************
// ********** Code for _ImageDataJs **************
// ********** Code for _Int16ArrayJs **************
var _Int16ArrayJs = {};
$dynamic("is$List").Int16Array = function(){return true};
$dynamic("is$Collection").Int16Array = function(){return true};
$dynamic("get$length").Int16Array = function() { return this.length; };
$dynamic("$index").Int16Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Int16Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Int16Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Int16Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("add$1").Int16Array = function($0) {
  return this.add($0);
};
// ********** Code for _Int32ArrayJs **************
var _Int32ArrayJs = {};
$dynamic("is$List").Int32Array = function(){return true};
$dynamic("is$Collection").Int32Array = function(){return true};
$dynamic("get$length").Int32Array = function() { return this.length; };
$dynamic("$index").Int32Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Int32Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Int32Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Int32Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("add$1").Int32Array = function($0) {
  return this.add($0);
};
// ********** Code for _Int8ArrayJs **************
var _Int8ArrayJs = {};
$dynamic("is$List").Int8Array = function(){return true};
$dynamic("is$Collection").Int8Array = function(){return true};
$dynamic("get$length").Int8Array = function() { return this.length; };
$dynamic("$index").Int8Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Int8Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Int8Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Int8Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("add$1").Int8Array = function($0) {
  return this.add($0);
};
// ********** Code for _JavaScriptAudioNodeJs **************
// ********** Code for _JavaScriptCallFrameJs **************
// ********** Code for _KeyboardEventJs **************
// ********** Code for _MediaStreamJs **************
// ********** Code for _LocalMediaStreamJs **************
// ********** Code for _LocationJs **************
// ********** Code for _LowPass2FilterNodeJs **************
// ********** Code for _MediaControllerJs **************
// ********** Code for _MediaElementAudioSourceNodeJs **************
// ********** Code for _MediaErrorJs **************
// ********** Code for _MediaListJs **************
$dynamic("is$List").MediaList = function(){return true};
$dynamic("is$Collection").MediaList = function(){return true};
$dynamic("get$length").MediaList = function() { return this.length; };
$dynamic("$index").MediaList = function(index) {
  return this[index];
}
$dynamic("$setindex").MediaList = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").MediaList = function() {
  return new _FixedSizeListIterator_dart_core_String(this);
}
$dynamic("add").MediaList = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("add$1").MediaList = function($0) {
  return this.add($0);
};
// ********** Code for _MediaQueryListJs **************
// ********** Code for _MediaQueryListListenerJs **************
// ********** Code for _MediaStreamEventJs **************
// ********** Code for _MediaStreamListJs **************
// ********** Code for _MediaStreamTrackJs **************
// ********** Code for _MediaStreamTrackListJs **************
// ********** Code for _MemoryInfoJs **************
// ********** Code for _MessageChannelJs **************
// ********** Code for _MessageEventJs **************
// ********** Code for _MessagePortJs **************
// ********** Code for _MetadataJs **************
// ********** Code for _MouseEventJs **************
// ********** Code for _MutationEventJs **************
// ********** Code for _NamedNodeMapJs **************
$dynamic("is$List").NamedNodeMap = function(){return true};
$dynamic("is$Collection").NamedNodeMap = function(){return true};
$dynamic("get$length").NamedNodeMap = function() { return this.length; };
$dynamic("$index").NamedNodeMap = function(index) {
  return this[index];
}
$dynamic("$setindex").NamedNodeMap = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").NamedNodeMap = function() {
  return new _FixedSizeListIterator_dom_Node(this);
}
$dynamic("add").NamedNodeMap = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("add$1").NamedNodeMap = function($0) {
  return this.add($0);
};
// ********** Code for _NavigatorJs **************
// ********** Code for _NavigatorUserMediaErrorJs **************
// ********** Code for _NodeFilterJs **************
// ********** Code for _NodeIteratorJs **************
// ********** Code for _NodeListJs **************
$dynamic("is$List").NodeList = function(){return true};
$dynamic("is$Collection").NodeList = function(){return true};
$dynamic("get$length").NodeList = function() { return this.length; };
$dynamic("$index").NodeList = function(index) {
  return this[index];
}
$dynamic("$setindex").NodeList = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").NodeList = function() {
  return new _FixedSizeListIterator_dom_Node(this);
}
$dynamic("add").NodeList = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("add$1").NodeList = function($0) {
  return this.add($0);
};
// ********** Code for _NodeSelectorJs **************
// ********** Code for _NotationJs **************
// ********** Code for _NotificationJs **************
// ********** Code for _NotificationCenterJs **************
// ********** Code for _OESStandardDerivativesJs **************
// ********** Code for _OESTextureFloatJs **************
// ********** Code for _OESVertexArrayObjectJs **************
// ********** Code for _OfflineAudioCompletionEventJs **************
// ********** Code for _OperationNotAllowedExceptionJs **************
// ********** Code for _OverflowEventJs **************
// ********** Code for _PageTransitionEventJs **************
// ********** Code for _PerformanceJs **************
// ********** Code for _PerformanceNavigationJs **************
// ********** Code for _PerformanceTimingJs **************
// ********** Code for _PopStateEventJs **************
// ********** Code for _PositionErrorJs **************
// ********** Code for _ProcessingInstructionJs **************
// ********** Code for _ProgressEventJs **************
// ********** Code for _RGBColorJs **************
// ********** Code for _RangeJs **************
// ********** Code for _RangeExceptionJs **************
// ********** Code for _RealtimeAnalyserNodeJs **************
// ********** Code for _RectJs **************
// ********** Code for _SQLErrorJs **************
// ********** Code for _SQLExceptionJs **************
// ********** Code for _SQLResultSetJs **************
// ********** Code for _SQLResultSetRowListJs **************
// ********** Code for _SQLTransactionJs **************
// ********** Code for _SQLTransactionSyncJs **************
// ********** Code for _SVGElementJs **************
// ********** Code for _SVGAElementJs **************
// ********** Code for _SVGAltGlyphDefElementJs **************
// ********** Code for _SVGTextContentElementJs **************
// ********** Code for _SVGTextPositioningElementJs **************
// ********** Code for _SVGAltGlyphElementJs **************
// ********** Code for _SVGAltGlyphItemElementJs **************
// ********** Code for _SVGAngleJs **************
// ********** Code for _SVGAnimationElementJs **************
// ********** Code for _SVGAnimateColorElementJs **************
// ********** Code for _SVGAnimateElementJs **************
// ********** Code for _SVGAnimateMotionElementJs **************
// ********** Code for _SVGAnimateTransformElementJs **************
// ********** Code for _SVGAnimatedAngleJs **************
// ********** Code for _SVGAnimatedBooleanJs **************
// ********** Code for _SVGAnimatedEnumerationJs **************
// ********** Code for _SVGAnimatedIntegerJs **************
// ********** Code for _SVGAnimatedLengthJs **************
// ********** Code for _SVGAnimatedLengthListJs **************
// ********** Code for _SVGAnimatedNumberJs **************
// ********** Code for _SVGAnimatedNumberListJs **************
// ********** Code for _SVGAnimatedPreserveAspectRatioJs **************
// ********** Code for _SVGAnimatedRectJs **************
// ********** Code for _SVGAnimatedStringJs **************
// ********** Code for _SVGAnimatedTransformListJs **************
// ********** Code for _SVGCircleElementJs **************
// ********** Code for _SVGClipPathElementJs **************
// ********** Code for _SVGColorJs **************
// ********** Code for _SVGComponentTransferFunctionElementJs **************
// ********** Code for _SVGCursorElementJs **************
// ********** Code for _SVGDefsElementJs **************
// ********** Code for _SVGDescElementJs **************
// ********** Code for _SVGDocumentJs **************
// ********** Code for _SVGElementInstanceJs **************
// ********** Code for _SVGElementInstanceListJs **************
// ********** Code for _SVGEllipseElementJs **************
// ********** Code for _SVGExceptionJs **************
// ********** Code for _SVGExternalResourcesRequiredJs **************
// ********** Code for _SVGFEBlendElementJs **************
// ********** Code for _SVGFEColorMatrixElementJs **************
// ********** Code for _SVGFEComponentTransferElementJs **************
// ********** Code for _SVGFECompositeElementJs **************
// ********** Code for _SVGFEConvolveMatrixElementJs **************
// ********** Code for _SVGFEDiffuseLightingElementJs **************
// ********** Code for _SVGFEDisplacementMapElementJs **************
// ********** Code for _SVGFEDistantLightElementJs **************
// ********** Code for _SVGFEDropShadowElementJs **************
// ********** Code for _SVGFEFloodElementJs **************
// ********** Code for _SVGFEFuncAElementJs **************
// ********** Code for _SVGFEFuncBElementJs **************
// ********** Code for _SVGFEFuncGElementJs **************
// ********** Code for _SVGFEFuncRElementJs **************
// ********** Code for _SVGFEGaussianBlurElementJs **************
// ********** Code for _SVGFEImageElementJs **************
// ********** Code for _SVGFEMergeElementJs **************
// ********** Code for _SVGFEMergeNodeElementJs **************
// ********** Code for _SVGFEMorphologyElementJs **************
// ********** Code for _SVGFEOffsetElementJs **************
// ********** Code for _SVGFEPointLightElementJs **************
// ********** Code for _SVGFESpecularLightingElementJs **************
// ********** Code for _SVGFESpotLightElementJs **************
// ********** Code for _SVGFETileElementJs **************
// ********** Code for _SVGFETurbulenceElementJs **************
// ********** Code for _SVGFilterElementJs **************
// ********** Code for _SVGStylableJs **************
// ********** Code for _SVGFilterPrimitiveStandardAttributesJs **************
// ********** Code for _SVGFitToViewBoxJs **************
// ********** Code for _SVGFontElementJs **************
// ********** Code for _SVGFontFaceElementJs **************
// ********** Code for _SVGFontFaceFormatElementJs **************
// ********** Code for _SVGFontFaceNameElementJs **************
// ********** Code for _SVGFontFaceSrcElementJs **************
// ********** Code for _SVGFontFaceUriElementJs **************
// ********** Code for _SVGForeignObjectElementJs **************
// ********** Code for _SVGGElementJs **************
// ********** Code for _SVGGlyphElementJs **************
// ********** Code for _SVGGlyphRefElementJs **************
// ********** Code for _SVGGradientElementJs **************
// ********** Code for _SVGHKernElementJs **************
// ********** Code for _SVGImageElementJs **************
// ********** Code for _SVGLangSpaceJs **************
// ********** Code for _SVGLengthJs **************
// ********** Code for _SVGLengthListJs **************
// ********** Code for _SVGLineElementJs **************
// ********** Code for _SVGLinearGradientElementJs **************
// ********** Code for _SVGLocatableJs **************
// ********** Code for _SVGMPathElementJs **************
// ********** Code for _SVGMarkerElementJs **************
// ********** Code for _SVGMaskElementJs **************
// ********** Code for _SVGMatrixJs **************
// ********** Code for _SVGMetadataElementJs **************
// ********** Code for _SVGMissingGlyphElementJs **************
// ********** Code for _SVGNumberJs **************
// ********** Code for _SVGNumberListJs **************
// ********** Code for _SVGPaintJs **************
// ********** Code for _SVGPathElementJs **************
// ********** Code for _SVGPathSegJs **************
// ********** Code for _SVGPathSegArcAbsJs **************
// ********** Code for _SVGPathSegArcRelJs **************
// ********** Code for _SVGPathSegClosePathJs **************
// ********** Code for _SVGPathSegCurvetoCubicAbsJs **************
// ********** Code for _SVGPathSegCurvetoCubicRelJs **************
// ********** Code for _SVGPathSegCurvetoCubicSmoothAbsJs **************
// ********** Code for _SVGPathSegCurvetoCubicSmoothRelJs **************
// ********** Code for _SVGPathSegCurvetoQuadraticAbsJs **************
// ********** Code for _SVGPathSegCurvetoQuadraticRelJs **************
// ********** Code for _SVGPathSegCurvetoQuadraticSmoothAbsJs **************
// ********** Code for _SVGPathSegCurvetoQuadraticSmoothRelJs **************
// ********** Code for _SVGPathSegLinetoAbsJs **************
// ********** Code for _SVGPathSegLinetoHorizontalAbsJs **************
// ********** Code for _SVGPathSegLinetoHorizontalRelJs **************
// ********** Code for _SVGPathSegLinetoRelJs **************
// ********** Code for _SVGPathSegLinetoVerticalAbsJs **************
// ********** Code for _SVGPathSegLinetoVerticalRelJs **************
// ********** Code for _SVGPathSegListJs **************
// ********** Code for _SVGPathSegMovetoAbsJs **************
// ********** Code for _SVGPathSegMovetoRelJs **************
// ********** Code for _SVGPatternElementJs **************
// ********** Code for _SVGPointJs **************
// ********** Code for _SVGPointListJs **************
// ********** Code for _SVGPolygonElementJs **************
// ********** Code for _SVGPolylineElementJs **************
// ********** Code for _SVGPreserveAspectRatioJs **************
// ********** Code for _SVGRadialGradientElementJs **************
// ********** Code for _SVGRectJs **************
// ********** Code for _SVGRectElementJs **************
// ********** Code for _SVGRenderingIntentJs **************
// ********** Code for _SVGSVGElementJs **************
// ********** Code for _SVGScriptElementJs **************
// ********** Code for _SVGSetElementJs **************
// ********** Code for _SVGStopElementJs **************
// ********** Code for _SVGStringListJs **************
// ********** Code for _SVGStyleElementJs **************
// ********** Code for _SVGSwitchElementJs **************
// ********** Code for _SVGSymbolElementJs **************
// ********** Code for _SVGTRefElementJs **************
// ********** Code for _SVGTSpanElementJs **************
// ********** Code for _SVGTestsJs **************
// ********** Code for _SVGTextElementJs **************
// ********** Code for _SVGTextPathElementJs **************
// ********** Code for _SVGTitleElementJs **************
// ********** Code for _SVGTransformJs **************
// ********** Code for _SVGTransformListJs **************
// ********** Code for _SVGTransformableJs **************
// ********** Code for _SVGURIReferenceJs **************
// ********** Code for _SVGUnitTypesJs **************
// ********** Code for _SVGUseElementJs **************
// ********** Code for _SVGVKernElementJs **************
// ********** Code for _SVGViewElementJs **************
// ********** Code for _SVGZoomAndPanJs **************
// ********** Code for _SVGViewSpecJs **************
// ********** Code for _SVGZoomEventJs **************
// ********** Code for _ScreenJs **************
// ********** Code for _ScriptProfileJs **************
// ********** Code for _ScriptProfileNodeJs **************
// ********** Code for _ShadowRootJs **************
// ********** Code for _SharedWorkerJs **************
// ********** Code for _SharedWorkerContextJs **************
// ********** Code for _SpeechGrammarJs **************
// ********** Code for _SpeechGrammarListJs **************
// ********** Code for _SpeechInputEventJs **************
// ********** Code for _SpeechInputResultJs **************
// ********** Code for _SpeechInputResultListJs **************
// ********** Code for _SpeechRecognitionAlternativeJs **************
// ********** Code for _SpeechRecognitionErrorJs **************
// ********** Code for _SpeechRecognitionEventJs **************
// ********** Code for _SpeechRecognitionResultJs **************
// ********** Code for _SpeechRecognitionResultListJs **************
// ********** Code for _StorageJs **************
// ********** Code for _StorageEventJs **************
// ********** Code for _StorageInfoJs **************
// ********** Code for _StyleMediaJs **************
// ********** Code for _StyleSheetListJs **************
$dynamic("is$List").StyleSheetList = function(){return true};
$dynamic("is$Collection").StyleSheetList = function(){return true};
$dynamic("get$length").StyleSheetList = function() { return this.length; };
$dynamic("$index").StyleSheetList = function(index) {
  return this[index];
}
$dynamic("$setindex").StyleSheetList = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").StyleSheetList = function() {
  return new _FixedSizeListIterator_dom_StyleSheet(this);
}
$dynamic("add").StyleSheetList = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("add$1").StyleSheetList = function($0) {
  return this.add($0);
};
// ********** Code for _TextEventJs **************
// ********** Code for _TextMetricsJs **************
// ********** Code for _TextTrackJs **************
// ********** Code for _TextTrackCueJs **************
// ********** Code for _TextTrackCueListJs **************
// ********** Code for _TextTrackListJs **************
// ********** Code for _TimeRangesJs **************
// ********** Code for _TouchJs **************
// ********** Code for _TouchEventJs **************
// ********** Code for _TouchListJs **************
$dynamic("is$List").TouchList = function(){return true};
$dynamic("is$Collection").TouchList = function(){return true};
$dynamic("get$length").TouchList = function() { return this.length; };
$dynamic("$index").TouchList = function(index) {
  return this[index];
}
$dynamic("$setindex").TouchList = function(index, value) {
  $throw(new UnsupportedOperationException("Cannot assign element of immutable List."));
}
$dynamic("iterator").TouchList = function() {
  return new _FixedSizeListIterator_dom_Touch(this);
}
$dynamic("add").TouchList = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("add$1").TouchList = function($0) {
  return this.add($0);
};
// ********** Code for _TrackEventJs **************
// ********** Code for _TreeWalkerJs **************
// ********** Code for _Uint16ArrayJs **************
var _Uint16ArrayJs = {};
$dynamic("is$List").Uint16Array = function(){return true};
$dynamic("is$Collection").Uint16Array = function(){return true};
$dynamic("get$length").Uint16Array = function() { return this.length; };
$dynamic("$index").Uint16Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Uint16Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Uint16Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Uint16Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("add$1").Uint16Array = function($0) {
  return this.add($0);
};
// ********** Code for _Uint32ArrayJs **************
var _Uint32ArrayJs = {};
$dynamic("is$List").Uint32Array = function(){return true};
$dynamic("is$Collection").Uint32Array = function(){return true};
$dynamic("get$length").Uint32Array = function() { return this.length; };
$dynamic("$index").Uint32Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Uint32Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Uint32Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Uint32Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("add$1").Uint32Array = function($0) {
  return this.add($0);
};
// ********** Code for _Uint8ArrayJs **************
var _Uint8ArrayJs = {};
$dynamic("is$List").Uint8Array = function(){return true};
$dynamic("is$Collection").Uint8Array = function(){return true};
$dynamic("get$length").Uint8Array = function() { return this.length; };
$dynamic("$index").Uint8Array = function(index) {
  return this[index];
}
$dynamic("$setindex").Uint8Array = function(index, value) {
  this[index] = value
}
$dynamic("iterator").Uint8Array = function() {
  return new _FixedSizeListIterator_int(this);
}
$dynamic("add").Uint8Array = function(value) {
  $throw(new UnsupportedOperationException("Cannot add to immutable List."));
}
$dynamic("add$1").Uint8Array = function($0) {
  return this.add($0);
};
// ********** Code for _Uint8ClampedArrayJs **************
var _Uint8ClampedArrayJs = {};
$dynamic("is$List").Uint8ClampedArray = function(){return true};
$dynamic("is$Collection").Uint8ClampedArray = function(){return true};
// ********** Code for _ValidityStateJs **************
// ********** Code for _WaveShaperNodeJs **************
// ********** Code for _WebGLActiveInfoJs **************
// ********** Code for _WebGLBufferJs **************
// ********** Code for _WebGLCompressedTextureS3TCJs **************
// ********** Code for _WebGLContextAttributesJs **************
// ********** Code for _WebGLContextEventJs **************
// ********** Code for _WebGLDebugRendererInfoJs **************
// ********** Code for _WebGLDebugShadersJs **************
// ********** Code for _WebGLFramebufferJs **************
// ********** Code for _WebGLLoseContextJs **************
// ********** Code for _WebGLProgramJs **************
// ********** Code for _WebGLRenderbufferJs **************
// ********** Code for _WebGLRenderingContextJs **************
// ********** Code for _WebGLShaderJs **************
// ********** Code for _WebGLTextureJs **************
// ********** Code for _WebGLUniformLocationJs **************
// ********** Code for _WebGLVertexArrayObjectOESJs **************
// ********** Code for _WebKitAnimationJs **************
// ********** Code for _WebKitAnimationEventJs **************
// ********** Code for _WebKitAnimationListJs **************
// ********** Code for _WebKitBlobBuilderJs **************
// ********** Code for _WebKitCSSKeyframeRuleJs **************
// ********** Code for _WebKitCSSKeyframesRuleJs **************
// ********** Code for _WebKitCSSMatrixJs **************
// ********** Code for _WebKitCSSRegionRuleJs **************
// ********** Code for _WebKitCSSTransformValueJs **************
// ********** Code for _WebKitNamedFlowJs **************
// ********** Code for _WebKitPointJs **************
// ********** Code for _WebKitTransitionEventJs **************
// ********** Code for _WebSocketJs **************
// ********** Code for _WheelEventJs **************
// ********** Code for _WorkerJs **************
// ********** Code for _WorkerLocationJs **************
// ********** Code for _WorkerNavigatorJs **************
// ********** Code for _XMLHttpRequestJs **************
// ********** Code for _XMLHttpRequestExceptionJs **************
// ********** Code for _XMLHttpRequestProgressEventJs **************
// ********** Code for _XMLHttpRequestUploadJs **************
// ********** Code for _XMLSerializerJs **************
// ********** Code for _XPathEvaluatorJs **************
// ********** Code for _XPathExceptionJs **************
// ********** Code for _XPathExpressionJs **************
// ********** Code for _XPathNSResolverJs **************
// ********** Code for _XPathResultJs **************
// ********** Code for _XSLTProcessorJs **************
// ********** Code for _DOMParserFactoryProvider **************
function _DOMParserFactoryProvider() {}
// ********** Code for _DOMURLFactoryProvider **************
function _DOMURLFactoryProvider() {}
// ********** Code for _DeprecatedPeerConnectionFactoryProvider **************
function _DeprecatedPeerConnectionFactoryProvider() {}
// ********** Code for _EventSourceFactoryProvider **************
function _EventSourceFactoryProvider() {}
// ********** Code for _FileReaderFactoryProvider **************
function _FileReaderFactoryProvider() {}
// ********** Code for _FileReaderSyncFactoryProvider **************
function _FileReaderSyncFactoryProvider() {}
// ********** Code for _HTMLAudioElementFactoryProvider **************
function _HTMLAudioElementFactoryProvider() {}
// ********** Code for _HTMLOptionElementFactoryProvider **************
function _HTMLOptionElementFactoryProvider() {}
// ********** Code for _MediaControllerFactoryProvider **************
function _MediaControllerFactoryProvider() {}
// ********** Code for _MediaStreamFactoryProvider **************
function _MediaStreamFactoryProvider() {}
// ********** Code for _MessageChannelFactoryProvider **************
function _MessageChannelFactoryProvider() {}
// ********** Code for _ShadowRootFactoryProvider **************
function _ShadowRootFactoryProvider() {}
// ********** Code for _SharedWorkerFactoryProvider **************
function _SharedWorkerFactoryProvider() {}
// ********** Code for _SpeechGrammarFactoryProvider **************
function _SpeechGrammarFactoryProvider() {}
// ********** Code for _SpeechGrammarListFactoryProvider **************
function _SpeechGrammarListFactoryProvider() {}
// ********** Code for _TextTrackCueFactoryProvider **************
function _TextTrackCueFactoryProvider() {}
// ********** Code for _WebKitBlobBuilderFactoryProvider **************
function _WebKitBlobBuilderFactoryProvider() {}
// ********** Code for _WebKitCSSMatrixFactoryProvider **************
function _WebKitCSSMatrixFactoryProvider() {}
// ********** Code for _WorkerFactoryProvider **************
function _WorkerFactoryProvider() {}
// ********** Code for _XMLHttpRequestFactoryProvider **************
function _XMLHttpRequestFactoryProvider() {}
// ********** Code for _XMLSerializerFactoryProvider **************
function _XMLSerializerFactoryProvider() {}
// ********** Code for _XPathEvaluatorFactoryProvider **************
function _XPathEvaluatorFactoryProvider() {}
// ********** Code for _XSLTProcessorFactoryProvider **************
function _XSLTProcessorFactoryProvider() {}
// ********** Code for _Collections **************
function _Collections() {}
// ********** Code for _DOMWindowCrossFrameImpl **************
function _DOMWindowCrossFrameImpl() {}
// ********** Code for _AudioContextFactoryProvider **************
function _AudioContextFactoryProvider() {}
// ********** Code for _TypedArrayFactoryProvider **************
function _TypedArrayFactoryProvider() {}
// ********** Code for _WebKitPointFactoryProvider **************
function _WebKitPointFactoryProvider() {}
// ********** Code for _WebSocketFactoryProvider **************
function _WebSocketFactoryProvider() {}
// ********** Code for _VariableSizeListIterator **************
function _VariableSizeListIterator() {}
_VariableSizeListIterator.prototype.hasNext = function() {
  return this._dom_array.get$length() > this._dom_pos;
}
_VariableSizeListIterator.prototype.next = function() {
  if (!this.hasNext()) {
    $throw(const$0000);
  }
  return this._dom_array.$index(this._dom_pos++);
}
// ********** Code for _FixedSizeListIterator **************
$inherits(_FixedSizeListIterator, _VariableSizeListIterator);
function _FixedSizeListIterator() {}
_FixedSizeListIterator.prototype.hasNext = function() {
  return this._dom_length > this._dom_pos;
}
// ********** Code for _VariableSizeListIterator_dart_core_String **************
$inherits(_VariableSizeListIterator_dart_core_String, _VariableSizeListIterator);
function _VariableSizeListIterator_dart_core_String(array) {
  this._dom_array = array;
  this._dom_pos = (0);
}
// ********** Code for _FixedSizeListIterator_dart_core_String **************
$inherits(_FixedSizeListIterator_dart_core_String, _FixedSizeListIterator);
function _FixedSizeListIterator_dart_core_String(array) {
  this._dom_length = array.get$length();
  _VariableSizeListIterator_dart_core_String.call(this, array);
}
// ********** Code for _VariableSizeListIterator_int **************
$inherits(_VariableSizeListIterator_int, _VariableSizeListIterator);
function _VariableSizeListIterator_int(array) {
  this._dom_array = array;
  this._dom_pos = (0);
}
// ********** Code for _FixedSizeListIterator_int **************
$inherits(_FixedSizeListIterator_int, _FixedSizeListIterator);
function _FixedSizeListIterator_int(array) {
  this._dom_length = array.get$length();
  _VariableSizeListIterator_int.call(this, array);
}
// ********** Code for _VariableSizeListIterator_num **************
$inherits(_VariableSizeListIterator_num, _VariableSizeListIterator);
function _VariableSizeListIterator_num(array) {
  this._dom_array = array;
  this._dom_pos = (0);
}
// ********** Code for _FixedSizeListIterator_num **************
$inherits(_FixedSizeListIterator_num, _FixedSizeListIterator);
function _FixedSizeListIterator_num(array) {
  this._dom_length = array.get$length();
  _VariableSizeListIterator_num.call(this, array);
}
// ********** Code for _VariableSizeListIterator_dom_Node **************
$inherits(_VariableSizeListIterator_dom_Node, _VariableSizeListIterator);
function _VariableSizeListIterator_dom_Node(array) {
  this._dom_array = array;
  this._dom_pos = (0);
}
// ********** Code for _FixedSizeListIterator_dom_Node **************
$inherits(_FixedSizeListIterator_dom_Node, _FixedSizeListIterator);
function _FixedSizeListIterator_dom_Node(array) {
  this._dom_length = array.get$length();
  _VariableSizeListIterator_dom_Node.call(this, array);
}
// ********** Code for _VariableSizeListIterator_dom_StyleSheet **************
$inherits(_VariableSizeListIterator_dom_StyleSheet, _VariableSizeListIterator);
function _VariableSizeListIterator_dom_StyleSheet(array) {
  this._dom_array = array;
  this._dom_pos = (0);
}
// ********** Code for _FixedSizeListIterator_dom_StyleSheet **************
$inherits(_FixedSizeListIterator_dom_StyleSheet, _FixedSizeListIterator);
function _FixedSizeListIterator_dom_StyleSheet(array) {
  this._dom_length = array.get$length();
  _VariableSizeListIterator_dom_StyleSheet.call(this, array);
}
// ********** Code for _VariableSizeListIterator_dom_Touch **************
$inherits(_VariableSizeListIterator_dom_Touch, _VariableSizeListIterator);
function _VariableSizeListIterator_dom_Touch(array) {
  this._dom_array = array;
  this._dom_pos = (0);
}
// ********** Code for _FixedSizeListIterator_dom_Touch **************
$inherits(_FixedSizeListIterator_dom_Touch, _FixedSizeListIterator);
function _FixedSizeListIterator_dom_Touch(array) {
  this._dom_length = array.get$length();
  _VariableSizeListIterator_dom_Touch.call(this, array);
}
// ********** Code for _Lists **************
function _Lists() {}
// ********** Code for top level **************
function get$$document() {
  return window.document;
}
//  ********** Library puremvc **************
// ********** Code for MVCObserver **************
function MVCObserver(notifyMethod, notifyContext) {
  this.notifyMethod = notifyMethod;
  this.notifyContext = notifyContext;
}
MVCObserver.prototype.getNotifyMethod = function() {
  return this.notifyMethod;
}
MVCObserver.prototype.notifyObserver = function(notification) {
  if (this.notifyContext != null) this.getNotifyMethod().call$1(notification);
}
// ********** Code for MVCNotification **************
function MVCNotification(name, body, type) {
  this.name = name;
  this.body = body;
  this.type = type;
}
MVCNotification.prototype.getName = function() {
  return this.name;
}
// ********** Code for MVCNotifier **************
function MVCNotifier() {

}
MVCNotifier.prototype.sendNotification = function(noteName, body, type) {
  if (this.get$facade() != null) this.get$facade().sendNotification(noteName, body, type);
}
MVCNotifier.prototype.initializeNotifier = function(key) {
  this.multitonKey = key;
}
MVCNotifier.prototype.get$facade = function() {
  if (this.multitonKey == null) $throw(new NotifierLacksMultitonKeyError());
  return MVCFacade.getInstance(this.multitonKey);
}
MVCNotifier.prototype.sendNotification$1 = MVCNotifier.prototype.sendNotification;
// ********** Code for NotifierLacksMultitonKeyError **************
function NotifierLacksMultitonKeyError() {

}
NotifierLacksMultitonKeyError.prototype.toString = function() {
  return "multitonKey for this Notifier not yet initialized!";
}
// ********** Code for MVCProxy **************
$inherits(MVCProxy, MVCNotifier);
function MVCProxy(name, data) {
  this.name = name;
  this.data = data;
  MVCNotifier.call(this);
}
MVCProxy.prototype.getName = function() {
  return this.name;
}
MVCProxy.prototype.setData = function(dataObject) {
  this.data = dataObject;
}
MVCProxy.prototype.onRegister = function() {

}
// ********** Code for MVCMediator **************
$inherits(MVCMediator, MVCNotifier);
function MVCMediator(name, viewComponent) {
  this.name = name;
  this.viewComponent = viewComponent;
  MVCNotifier.call(this);
}
MVCMediator.prototype.getName = function() {
  return this.name;
}
MVCMediator.prototype.listNotificationInterests = function() {
  return new Array();
}
MVCMediator.prototype.handleNotification = function(note) {

}
MVCMediator.prototype.get$handleNotification = function() {
  return this.handleNotification.bind(this);
}
Function.prototype.bind = Function.prototype.bind ||
  function(thisObj) {
    var func = this;
    var funcLength = func.$length || func.length;
    var argsLength = arguments.length;
    if (argsLength > 1) {
      var boundArgs = Array.prototype.slice.call(arguments, 1);
      var bound = function() {
        // Prepend the bound arguments to the current arguments.
        var newArgs = Array.prototype.slice.call(arguments);
        Array.prototype.unshift.apply(newArgs, boundArgs);
        return func.apply(thisObj, newArgs);
      };
      bound.$length = Math.max(0, funcLength - (argsLength - 1));
      return bound;
    } else {
      var bound = function() {
        return func.apply(thisObj, arguments);
      };
      bound.$length = funcLength;
      return bound;
    }
  };
MVCMediator.prototype.onRegister = function() {

}
// ********** Code for MVCSimpleCommand **************
$inherits(MVCSimpleCommand, MVCNotifier);
function MVCSimpleCommand() {
  MVCNotifier.call(this);
}
MVCSimpleCommand.prototype.execute = function(note) {

}
// ********** Code for MVCMacroCommand **************
$inherits(MVCMacroCommand, MVCNotifier);
function MVCMacroCommand() {
  MVCNotifier.call(this);
  this.subCommands = new Array();
  this.initializeMacroCommand();
}
MVCMacroCommand.prototype.initializeMacroCommand = function() {

}
MVCMacroCommand.prototype.addSubCommand = function(commandFactory) {
  this.subCommands.add(commandFactory);
}
MVCMacroCommand.prototype.execute = function(note) {
  var $$list = this.subCommands;
  for (var $$i = $$list.iterator(); $$i.hasNext(); ) {
    var commandFactory = $$i.next();
    var commandInstance = commandFactory.call$0();
    commandInstance.initializeNotifier(this.multitonKey);
    commandInstance.execute(note);
  }
}
// ********** Code for MVCFacade **************
function MVCFacade(key) {
  if ($ne$($globals.MVCFacade_instanceMap.$index(key))) $throw(new MultitonFacadeExistsError());
  this.initializeNotifier(key);
  $globals.MVCFacade_instanceMap.$setindex(this.multitonKey, this);
  this.initializeFacade();
}
MVCFacade.prototype.initializeFacade = function() {
  this.initializeModel();
  this.initializeController();
  this.initializeView();
}
MVCFacade.getInstance = function(key) {
  if (key == null || key == "") return null;
  if ($globals.MVCFacade_instanceMap == null) $globals.MVCFacade_instanceMap = new HashMapImplementation_dart_core_String$IFacade();
  if ($eq$($globals.MVCFacade_instanceMap.$index(key))) $globals.MVCFacade_instanceMap.$setindex(key, new MVCFacade(key));
  return $globals.MVCFacade_instanceMap.$index(key);
}
MVCFacade.prototype.initializeController = function() {
  if (this.controller != null) return;
  this.controller = MVCController.getInstance(this.multitonKey);
}
MVCFacade.prototype.initializeModel = function() {
  if (this.model != null) return;
  this.model = MVCModel.getInstance(this.multitonKey);
}
MVCFacade.prototype.initializeView = function() {
  if (this.view != null) return;
  this.view = MVCView.getInstance(this.multitonKey);
}
MVCFacade.prototype.registerCommand = function(noteName, commandFactory) {
  this.controller.registerCommand(noteName, commandFactory);
}
MVCFacade.prototype.registerProxy = function(proxy) {
  this.model.registerProxy(proxy);
}
MVCFacade.prototype.retrieveProxy = function(proxyName) {
  return this.model.retrieveProxy(proxyName);
}
MVCFacade.prototype.registerMediator = function(mediator) {
  if (this.view != null) this.view.registerMediator(mediator);
}
MVCFacade.prototype.sendNotification = function(noteName, body, type) {
  this.notifyObservers(new MVCNotification(noteName, body, type));
}
MVCFacade.prototype.notifyObservers = function(note) {
  if (this.view != null) this.view.notifyObservers(note);
}
MVCFacade.prototype.initializeNotifier = function(key) {
  this.multitonKey = key;
}
MVCFacade.prototype.sendNotification$1 = MVCFacade.prototype.sendNotification;
// ********** Code for MultitonFacadeExistsError **************
function MultitonFacadeExistsError() {

}
MultitonFacadeExistsError.prototype.toString = function() {
  return "IFacade Multiton instance already constructed for this key.";
}
// ********** Code for MVCModel **************
function MVCModel(key) {
  if ($ne$($globals.MVCModel_instanceMap.$index(key))) $throw(new MultitonModelExistsError());
  this.multitonKey = key;
  $globals.MVCModel_instanceMap.$setindex(this.multitonKey, this);
  this.proxyMap = new HashMapImplementation_dart_core_String$IProxy();
  this.initializeModel();
}
MVCModel.prototype.initializeModel = function() {

}
MVCModel.getInstance = function(key) {
  if (key == null || key == "") return null;
  if ($globals.MVCModel_instanceMap == null) $globals.MVCModel_instanceMap = new HashMapImplementation_dart_core_String$IModel();
  if ($eq$($globals.MVCModel_instanceMap.$index(key))) $globals.MVCModel_instanceMap.$setindex(key, new MVCModel(key));
  return $globals.MVCModel_instanceMap.$index(key);
}
MVCModel.prototype.registerProxy = function(proxy) {
  proxy.initializeNotifier(this.multitonKey);
  this.proxyMap.$setindex(proxy.getName(), proxy);
  proxy.onRegister();
}
MVCModel.prototype.retrieveProxy = function(proxyName) {
  return this.proxyMap.$index(proxyName);
}
// ********** Code for MultitonModelExistsError **************
function MultitonModelExistsError() {

}
MultitonModelExistsError.prototype.toString = function() {
  return "IModel Multiton instance already constructed for this key.";
}
// ********** Code for MVCView **************
function MVCView(key) {
  if ($ne$($globals.MVCView_instanceMap.$index(key))) $throw(new MultitonViewExistsError());
  this.multitonKey = key;
  $globals.MVCView_instanceMap.$setindex(this.multitonKey, this);
  this.mediatorMap = new HashMapImplementation_dart_core_String$IMediator();
  this.observerMap = new HashMapImplementation_dart_core_String$List_IObserver();
  this.initializeView();
}
MVCView.prototype.initializeView = function() {

}
MVCView.getInstance = function(key) {
  if (key == null || key == "") return null;
  if ($globals.MVCView_instanceMap == null) $globals.MVCView_instanceMap = new HashMapImplementation_dart_core_String$IView();
  if ($eq$($globals.MVCView_instanceMap.$index(key))) $globals.MVCView_instanceMap.$setindex(key, new MVCView(key));
  return $globals.MVCView_instanceMap.$index(key);
}
MVCView.prototype.registerObserver = function(noteName, observer) {
  if ($eq$(this.observerMap.$index(noteName))) {
    this.observerMap.$setindex(noteName, new Array());
  }
  this.observerMap.$index(noteName).add$1(observer);
}
MVCView.prototype.notifyObservers = function(note) {
  var observers_ref = this.observerMap.$index(note.getName());
  if (observers_ref != null) {
    var observers = new Array();
    var observer;
    for (var i = (0);
     $lt$(i, observers_ref.get$length()); i = $add$(i, (1))) {
      observer = observers_ref.$index(i);
      observers.add(observer);
    }
    for (var i = (0);
     $lt$(i, observers.get$length()); i = $add$(i, (1))) {
      observer = observers.$index(i);
      observer.notifyObserver(note);
    }
  }
}
MVCView.prototype.registerMediator = function(mediator) {
  if ($ne$(this.mediatorMap.$index(mediator.getName()))) return;
  mediator.initializeNotifier(this.multitonKey);
  this.mediatorMap.$setindex(mediator.getName(), mediator);
  var interests = mediator.listNotificationInterests();
  if (interests.get$length() > (0)) {
    var observer = new MVCObserver(mediator.get$handleNotification(), mediator);
    for (var i = (0);
     $lt$(i, interests.get$length()); i = $add$(i, (1))) {
      this.registerObserver(interests.$index(i), observer);
    }
  }
  mediator.onRegister();
}
// ********** Code for MultitonViewExistsError **************
function MultitonViewExistsError() {

}
MultitonViewExistsError.prototype.toString = function() {
  return "IViewMultiton instance already constructed for this key.";
}
// ********** Code for MVCController **************
function MVCController(key) {
  if ($ne$($globals.MVCController_instanceMap.$index(key))) $throw(new MultitonControllerExistsError());
  this.multitonKey = key;
  $globals.MVCController_instanceMap.$setindex(this.multitonKey, this);
  this.commandMap = new HashMapImplementation_dart_core_String$dart_core_Function();
  this.initializeController();
}
MVCController.prototype.initializeController = function() {
  this.view = MVCView.getInstance(this.multitonKey);
}
MVCController.getInstance = function(key) {
  if (key == null || key == "") return null;
  if ($globals.MVCController_instanceMap == null) $globals.MVCController_instanceMap = new HashMapImplementation_dart_core_String$IController();
  if ($eq$($globals.MVCController_instanceMap.$index(key))) $globals.MVCController_instanceMap.$setindex(key, new MVCController(key));
  return $globals.MVCController_instanceMap.$index(key);
}
MVCController.prototype.executeCommand = function(note) {
  var commandFactory = this.commandMap.$index(note.getName());
  if (commandFactory == null) return;
  var commandInstance = commandFactory.call$0();
  commandInstance.initializeNotifier(this.multitonKey);
  commandInstance.execute(note);
}
MVCController.prototype.get$executeCommand = function() {
  return this.executeCommand.bind(this);
}
MVCController.prototype.registerCommand = function(noteName, commandFactory) {
  if ($eq$(this.commandMap.$index(noteName))) {
    this.view.registerObserver(noteName, new MVCObserver(this.get$executeCommand(), this));
  }
  this.commandMap.$setindex(noteName, commandFactory);
}
// ********** Code for MultitonControllerExistsError **************
function MultitonControllerExistsError() {

}
MultitonControllerExistsError.prototype.toString = function() {
  return "IController Multiton instance already constructed for this key.";
}
// ********** Code for top level **************
//  ********** Library Z:\Outgoing\workspaces\FB3\PureMVC\Demo_Dart_ReverseText\Demo_Dart_ReverseText **************
// ********** Code for TextProxy **************
$inherits(TextProxy, MVCProxy);
function TextProxy() {
  MVCProxy.call(this, $globals.TextProxy_NAME);
}
TextProxy.prototype.get$text = function() {
  return this.data;
}
TextProxy.prototype.set$text = function(t) {
  this.setData(t);
  this.sendNotification($globals.TextProxy_TEXT_CHANGED, this.get$text());
}
// ********** Code for TextComponent **************
function TextComponent() {
  this.textForm = get$$document().querySelector("#textForm");
  this.textInput = this.textForm.querySelector("#inputText");
  this.textOutput = this.textForm.querySelector("#outputText");
  this.textOutputLabel = this.textForm.querySelector("#outputTextLabel");
  this.checkbox = this.textForm.querySelector("input[type=checkbox]");
  this.reverseButton = this.textForm.querySelector("button[type=submit]");
  this.checkbox.addEventListener("change", $wrap_call$1(this.get$handleEvent()));
  this.reverseButton.addEventListener("click", $wrap_call$1(this.get$handleEvent()));
  this.textInput.addEventListener("keyup", $wrap_call$1(this.get$handleEvent()));
}
TextComponent.prototype.get$inputText = function() {
  return this.textInput.value;
}
TextComponent.prototype.handleEvent = function(event) {
  switch (event.type) {
    case "keyup":

      if (this.checkbox.checked) this.dispatchTextChangedEvent();
      break;

    case "click":

      event.preventDefault();
      this.dispatchTextChangedEvent();
      break;

  }
}
TextComponent.prototype.get$handleEvent = function() {
  return this.handleEvent.bind(this);
}
TextComponent.prototype.addEventListener = function(type, listener) {
  this.textForm.addEventListener(type, listener);
}
TextComponent.prototype.dispatchTextChangedEvent = function() {
  var event = get$$document().createEvent("HTMLEvents");
  event.initEvent("text/changed", true, true);
  this.textForm.dispatchEvent(event);
}
TextComponent.prototype.set$isPalindrome = function(izzit) {
  if (izzit) this.textOutputLabel.innerHTML = "Palindrome Detected";
  else this.textOutputLabel.innerHTML = "Output Text";
}
TextComponent.prototype.set$outputText = function(value) {
  this.set$isPalindrome(false);
  this.textOutput.value = value;
}
// ********** Code for TextComponentMediator **************
$inherits(TextComponentMediator, MVCMediator);
function TextComponentMediator(viewComponent) {
  MVCMediator.call(this, $globals.TextComponentMediator_NAME, viewComponent);
}
TextComponentMediator.prototype.get$textComponent = function() {
  return this.viewComponent;
}
TextComponentMediator.prototype.onRegister = function() {
  this.get$textComponent().addEventListener("text/changed", $wrap_call$1(this.get$handleEvent()));
}
TextComponentMediator.prototype.listNotificationInterests = function() {
  return ["palindrome/detected", $globals.TextProxy_TEXT_CHANGED];
}
TextComponentMediator.prototype.handleEvent = function(event) {
  switch (event.type) {
    case "text/changed":

      this.sendNotification("process/input/text", this.get$textComponent().get$inputText());
      break;

  }
}
TextComponentMediator.prototype.get$handleEvent = function() {
  return this.handleEvent.bind(this);
}
TextComponentMediator.prototype.handleNotification = function(note) {
  switch (note.name) {
    case $globals.TextProxy_TEXT_CHANGED:

      this.get$textComponent().set$outputText(note.body);
      break;

    case "palindrome/detected":

      this.get$textComponent().set$isPalindrome(true);
      break;

  }
}
TextComponentMediator.prototype.get$handleNotification = function() {
  return this.handleNotification.bind(this);
}
// ********** Code for AppEvents **************
function AppEvents() {}
// ********** Code for StartupCommand **************
$inherits(StartupCommand, MVCMacroCommand);
function StartupCommand() {
  MVCMacroCommand.call(this);
}
StartupCommand.prototype.initializeMacroCommand = function() {
  this.addSubCommand((function () {
    return new PrepareControllerCommand();
  })
  );
  this.addSubCommand((function () {
    return new PrepareModelCommand();
  })
  );
  this.addSubCommand((function () {
    return new PrepareViewCommand();
  })
  );
}
// ********** Code for PrepareModelCommand **************
$inherits(PrepareModelCommand, MVCSimpleCommand);
function PrepareModelCommand() {
  MVCSimpleCommand.call(this);
}
PrepareModelCommand.prototype.execute = function(note) {
  this.get$facade().registerProxy(new TextProxy());
}
// ********** Code for PrepareControllerCommand **************
$inherits(PrepareControllerCommand, MVCSimpleCommand);
function PrepareControllerCommand() {
  MVCSimpleCommand.call(this);
}
PrepareControllerCommand.prototype.execute = function(note) {
  this.get$facade().registerCommand("process/input/text", (function () {
    return new ProcessTextCommand();
  })
  );
}
// ********** Code for PrepareViewCommand **************
$inherits(PrepareViewCommand, MVCSimpleCommand);
function PrepareViewCommand() {
  MVCSimpleCommand.call(this);
}
PrepareViewCommand.prototype.execute = function(note) {
  this.get$facade().registerMediator(new TextComponentMediator(new TextComponent()));
}
// ********** Code for ProcessTextCommand **************
$inherits(ProcessTextCommand, MVCSimpleCommand);
function ProcessTextCommand() {
  MVCSimpleCommand.call(this);
}
ProcessTextCommand.prototype.execute = function(note) {
  var text = note.body;
  var chars = text.splitChars();
  var buffer = new StringBufferImpl("");
  while (chars.get$length() > (0)) {
    buffer.add(chars.removeLast());
  }
  var reverse = buffer.toString();
  var proxy = this.get$facade().retrieveProxy($globals.TextProxy_NAME);
  proxy.set$text(reverse);
  if (reverse == text && text != "") this.sendNotification("palindrome/detected");
}
// ********** Code for AppNotes **************
function AppNotes() {}
// ********** Code for top level **************
function main() {
  var facade = MVCFacade.getInstance("ReverseText");
  facade.registerCommand("startup", (function () {
    return new StartupCommand();
  })
  );
  facade.sendNotification$1("startup");
}
// 20 dynamic types.
// 21 types
// 3 !leaf
function $dynamicSetMetadata(inputTable) {
  // TODO: Deal with light isolates.
  var table = [];
  for (var i = 0; i < inputTable.length; i++) {
    var tag = inputTable[i][0];
    var tags = inputTable[i][1];
    var map = {};
    var tagNames = tags.split('|');
    for (var j = 0; j < tagNames.length; j++) {
      map[tagNames[j]] = true;
    }
    table.push({tag: tag, tags: tags, map: map});
  }
  $dynamicMetadata = table;
}
(function(){
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList']
    , ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection']
    , ['Uint8Array', 'Uint8Array|Uint8ClampedArray']
  ];
  $dynamicSetMetadata(table);
})();
//  ********** Globals **************
function $static_init(){
  $globals.TextProxy_NAME = "TextProxy";
  $globals.TextComponentMediator_NAME = "TextComponentMediator";
  $globals.TextProxy_TEXT_CHANGED = "text/changed";
}
var const$0000 = Object.create(NoMoreElementsException.prototype, {});
var const$0001 = Object.create(_DeletedKeySentinel.prototype, {});
var $globals = {};
$static_init();
main();
