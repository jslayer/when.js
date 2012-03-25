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
  var _check, _then, _stop, _when;
  
  _check = function() {
    return !!(this.type == 'fn' ? this.iff() : this.iff);
  };
  
  _then = function() {
    for(i=0; i<this._do.length; i++) {
      this._do[i].fn.apply(null,this._do[i].args);
    }
  };
  
  _stop = function() {
    clearInterval(this.timer);
    if (typeof(this.not) == 'function') {
      this.not(this);
    }
  };
  
  _when = (function() {
    var i = 0, args = arguments, self = this;
    
    this._do = [];
    this.not = false;
    this.iff = args[0];
    this.delay = !args[1] || typeof(args[1]) != 'number' || args[1] < 5 ? 100 : args[1]; 
    this.attempts = !args[2] || typeof(args[2]) != 'number' || args[2] < 0 ? 0 : args[2];
    this.type  = typeof(this.iff) == 'function' ? 'fn' : 'plain';
    
    this.then = function(c) {
      if (typeof(c) == 'function') {
        this._do.push({
          fn: c,
          args: Array.prototype.slice.call(arguments, 1)
        });        
      }
      return this;
    };
    
    this.not = function(c) {
      if (typeof(c) == 'function') {
        this.not = c;
      }
      return this;
    };
    
    if (_check.call(this)) {
      _then.call(this);
    }
    else {
      this.timer = setInterval(function() {
        if (_check.call(self)) {
          clearInterval(self.timer);
          _then.call(self);
          return;
        }
        
        if (self.attempts > 0 && self.attempts <= ++i) {
          _stop.call(self);
        }
      }, this.delay);
    }
    
    return this;
  });
  
  return _when.apply({}, arguments);
});

