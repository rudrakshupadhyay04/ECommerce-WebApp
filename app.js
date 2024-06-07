const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const seedDB =  require('./Seed');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User =  require('./models/User')


const productRoutes = require('./routes/product');
const reviewRoutes = require('./routes/review');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/cart');
const productApi = require('./routes/api/productapi');


// const dbURL = process.env.dbURL || 'mongodb://127.0.0.1:27017/shopping-sam-app';
// const dbURL = process.env.dbURL 
mongoose.set('strictQuery', true);
mongoose.connect("mongodb+srv://rudrakshaupadhyay12345:LiwAfKT9dKB8bYMm@cluster0.crvynqt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(()=>{console.log("DB connected successsfully")})
    .catch((err)=>{console.log("DB error");console.log(err);});


// session middleware
let configSession ={
    secret: 'keyboard cat', 
    resave:  false,
    saveUninitialized: true,
    cookies: {
        httpOnly: true,
        expires: Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000
    }
}

app.engine('ejs' , ejsMate)
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname , 'views'));// views folder
app.use(express.static(path.join(__dirname , 'public')));// public folder
app.use(express.urlencoded({extended:true})); //middleware
app.use(methodOverride('_method')); 
app.use(session(configSession));
app.use(flash());

// passport vaali 
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


// Passport waali
passport.use(new LocalStrategy(User.authenticate()));


// seeding Database
// seedDB()


app.get('/' , (req,res)=>{
    res.render('home');
})



app.use(productRoutes); // so that hr ek incoming request le liye path check kiyaa jaaye
app.use(reviewRoutes);  // so that hr ek incoming request le liye path check kiyaa jaaye
app.use(authRoutes); // so that hr ek incoming request le liye path check kiyaa jaaye
app.use(cartRoutes); // so that hr ek incoming request le liye path check kiyaa jaaye
app.use(productApi); // so that hr ek incoming request le liye path check kiyaa jaaye


app.listen(8080, ()=>{
    console.log("server connected at port 8080")
})