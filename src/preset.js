/**
 * @file src/preset.js
 * @description Содержит в себе прессеть данных для создания нативных бибилотек
 * @license MIT
 * @author Astecom
 */

module.exports.FIELDFLAGS = require('./classes/static').FIELDFLAGS;
module.exports.Exceptions = require('./classes/exceptions');
module.exports.PoonyaStaticLibrary = require('./importer').PoonyaStaticLibrary;
module.exports.PoonyaPrototype = require('./classes/data/PoonyaPrototype');