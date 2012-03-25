#Javascript when

Simple function which is execute second callback when first is true.

##Compatibility

ie6+, chrome ?+

##Usage

    when(boolean_callback[, delay, attempts])
      .then(custom_callback, arg[0], arg[1], ...)[.then(...)][.then(...)]
      .not(not_callback);
