const { Film } = require('./Film')
const { Studio } = require('./Studio')

Studio.hasMany(Film)
Film.belongsTo(Studio)

