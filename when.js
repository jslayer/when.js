/*
 * javascript when 0.1
 * 
 * Simple function which is execute second callback when first is true.
 * Based on setInterval
 * 
 * Copyright 2012 Eugene Poltorakov (http://poltorakov.com) 
 * Licensed under the MIT License: http://www.opensource.org/licenses/mit-license.php
 * 
 */

var when = (function() {
  _when = (function() {
    var _check, _then, _stop, _when,
        i = 0, args = arguments, self = this,
        _do, _not, iff, delay, attempts, type, timer;
  
    _check = function() {
      return !!(type == 'fn' ? iff() : iff);
    };
    
    _then = function() {
      for(i=0; i<_do.length; i++) {
        _do[i].fn.apply(null,_do[i].args);
      }
    };
    
    _stop = function() {
      clearInterval(timer);
      if (typeof(_not) == 'function') {
        _not(this);
      }
    };
    
    _do = [];
    not = false;
    iff = args[0];
    delay = !args[1] || typeof(args[1]) != 'number' || args[1] < 5 ? 100 : args[1]; 
    attempts = !args[2] || typeof(args[2]) != 'number' || args[2] < 0 ? 0 : args[2];
    type  = typeof(iff) == 'function' ? 'fn' : 'plain';
    
    then = function(c) {
      if (typeof(c) == 'function') {
        _do.push({
          fn: c,
          args: Array.prototype.slice.call(arguments, 1)
        });        
      }
      return this;
    };
    
    not = function(c) {
      if (typeof(c) == 'function') {
        _not = c;
      }
      return this;
    };
    
    if (_check()) {
      _then();
    }
    else {
      timer = setInterval(function() {
        if (_check()) {
          clearInterval(timer);
          _then();
          return;
        }
        
        if (attempts > 0 && attempts <= ++i) {
          _stop();
        }
      }, delay);
    }
    
    return {
      then: then,
      not: not
    };
  });
  
  return _when.apply({}, arguments);
});


