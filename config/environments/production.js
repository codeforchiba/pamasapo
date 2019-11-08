const _ = require("lodash");
const defaultConfig = require("./default.js");

const config = {};

module.exports = _.assign(defaultConfig, config);
