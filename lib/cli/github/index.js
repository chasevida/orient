// Load modules

var ghLabelsCreate = require('./labels/create'),
    ghLabelsUpdate = require('./labels/update');


module.exports = {
    createLabels: ghLabelsCreate.createLabels,
    updateLabels: ghLabelsUpdate.updateLabels
};