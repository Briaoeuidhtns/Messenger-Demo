// import { join } from 'path'
// export default join(__dirname, '..', 'build')
const { dirname, resolve } = require('path')
module.exports = resolve(__dirname, '../build')
