const express = require('express')
const cookieParser = require('cookie-Parser')
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./src/routes')

const app = express()
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/sistec', { 
    useUnifiedTopology: true,
    useNewUrlParser: true
}, function(err){
    if(err){
        console.log(err)
    }
    else{
        console.log('MongoDB Conectado com sucesso!')
    }
})

app.use(cors())
app.use(cookieParser())
app.use(express.json())


app.use(routes)

app.listen(port, function(){
    console.log(`Servidor rodando na porta ${port}`)
})

