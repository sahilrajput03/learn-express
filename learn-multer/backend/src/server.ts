import { app } from "./app"
const fs = require('fs');

const port = 8080

app.listen(port, function () {
    console.log(`App running on: http://localhost:${port}`)
})
