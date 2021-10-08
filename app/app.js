const express = require('express');
const app = express()
const accessRouter = require('./src/routes/access.routes')
// const accountRouter = require('./src/routes/account.routes')

// Static Files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/imgs', express.static(__dirname + 'public/imgs'));
app.use('/js', express.static(__dirname + 'public/js'));
// app.set('views', __dirname + 'src/views')


//Template Engine
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routes
app.use('/', accessRouter);
// app.use('/account', accountRouter);

const PORT = process.env.APP_PORT || 5051
app.listen(PORT, () => {
  (console.log(`👾 Server running at port: ${PORT}`))
})