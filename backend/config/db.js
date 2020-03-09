const config = require('../knexfile')
const knex= require('knex')(config)
//chamou automaticamente, pode não ser algo postivivo 
knex.migrate.latest([config])
module.exports = knex