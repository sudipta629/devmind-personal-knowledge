const Module = require('module');
const originalRequire = Module.prototype.require;
Module.prototype.require = function(id) {
  if (typeof id !== 'string') {
    console.error('REQUIRE CALLED WITH NON-STRING:', id);
    console.trace();
  }
  return originalRequire.apply(this, arguments);
};
