const express = require('express');
const app = express()

const accessRouter = require('./src/routes/access.routes')


// const bcrypt = require('bcrypt')
// const passport = require('passport')
// const flash = require('express-flash')
// const session = require('express-session')
// const methodOverride = require('method-override')


// //Passport
// const initializePassport = require('./passport-config')
// initializePassport(
//   passport,
//   email => users.find(user => user.email === email),
//   id => users.find(user => user.id === id)
// )

// Static Files
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/imgs', express.static(__dirname + 'public/imgs'));
app.use('/js', express.static(__dirname + 'public/js'));
app.set('views', __dirname + 'src/views')


//Template Engine
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }))



//Routes
app.use('/', accessRouter);

// app.use(flash())
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false
// }))
// app.use(passport.initialize())
// app.use(passport.session())
// app.use(methodOverride('_method'))

// const users = [];

//Routes
// const router = newRouter();


// //HOME
// app.get('/', checkAuthenticated, (req, res) => {
//   res.render('index', { name: req.user.name })
// });

// //LOGIN
// app.get('/login', checkNotAuthenticated, (req, res) => {
//   res.render('login')
// });

// app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
//   successRedirect: '/',
//   failureRedirect: '/login',
//   failureFlash: true
// }));


// //REGISTER
// app.get('/register', checkNotAuthenticated, (req, res) => {
//   res.render('register')
// });


// app.post('/register', checkNotAuthenticated, async (req, res) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10)
//     users.push({
//       id: Date.now().toString(),
//       name: req.body.name,
//       email: req.body.email,
//       password: hashedPassword
//     })
//     res.redirect('/login')



//   } catch (error) {
//     res.redirect('/register', (alert('ops, something wrent wrong, try again!')))
//   }
//   console.log(users)

// })

// //LOGOUT
// app.delete('/logout', (req, res) => {
//   req.logOut()
//   res.redirect('/login')
// })

// //CHECK IF IS AUTHENTICATED
// function checkAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next()
//   }

//   res.redirect('/login')
// }

// //REDIRECT IF AUTHENTICATED
// function checkNotAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return res.redirect('/')
//   }

//   next()
// }


const PORT = process.env.SERVER_PORT || 5051
app.listen(PORT, () => {
  (console.log(`👾 Server running at port: ${PORT}`))
})