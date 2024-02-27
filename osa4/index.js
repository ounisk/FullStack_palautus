const app = require('./app') // varsinainen Express-sovellus  tämä pitää jäädä

const config = require('./utils/config')
const logger = require('./utils/logger')


app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
  })