const axios = require('axios')

const URL = 'http://localhost:8080'

module.exports.rootRequest = async () => await axios.get(URL)

module.exports.aEndpointRequest = async () => await axios.get(`${URL}/a`)
