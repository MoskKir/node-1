const express = require('express')
const router = require('./routers/export-router')

const app = express()

app.use(express.json())
app.use('/api/users', router.userRouter)

app.listen(3000, function () {
    console.log('север дует на http://localhost:3000')
})