const fs = require('fs')
const path = `./.env`
const vars = `
ENV_VAR=${process.env.REACT_APP_API_KEY}`
fs.writeFileSync(path, vars)