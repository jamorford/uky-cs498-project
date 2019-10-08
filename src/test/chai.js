// load objection
require("../main/common/objection")

// setup testing classes
const chai_as_promised = require("chai-as-promised");
const chai = require('chai')
chai.use(chai_as_promised);

module.exports = chai