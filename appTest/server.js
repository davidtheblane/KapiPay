const express = require('express');
const app = express()
const ejs = require('ejs')

app.set('view engine', 'ejs')


// carregar CSS?
// app.use(express.static('public'))

//HOME
app.get('/', (req, res) => {
  res.render('index')
})

//LOGIN
app.get('/login', (req, res) => {
  res.render('login')
})


//REGISTER
app.get('/register', (req, res) => {
  res.render('register')
})


const PORT = process.env.PORT || 5051
app.listen(PORT, () => {
  (console.log(`Server running at port: ${PORT}`))
})


