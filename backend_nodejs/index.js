
const express = require("express")
const index = express()
const cors = require("cors")
index.use(cors())
require("./config/Db")
index.use(express.urlencoded({ 'extended': true }))
index.use(express.json({ limit: '500mb' }))
index.use(express.static(__dirname + "/public"))

const seeder = require("./config/Seeder")
seeder.adminSeeder()

const userRoute = require("./routes/Route")
index.use("/user", userRoute)

index.listen(3000, () => {
    console.log("The port number is 3000")
})