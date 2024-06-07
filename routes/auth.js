const express =  require('express');
const User = require('../models/User');
const passport = require('passport');
const router = express.Router()  //mini instance---yha pr mujh ko app ka istemaal kr naa thaa joo ke mere applocation kaa instance hai aur hum instance ko export nhii kr sktey hai es liye yhaa pr hum Router ke help se ek mini instace bnaa lete hai

// to show the form of signup
router.get('/register' , (req,res)=>{
    res.render('auth/signup')
})

// actually want to register a user in db
router.post('/register' , async(req,res)=>{
    try{
        let {email,password,username,role} = req.body;
        const user = new User({email , username  , role});
        const newUser = await User.register(user , password );
        // new user direct login
        req.login(newUser , function(err){
            if(err){return next(err)};
            req.flash('success' , 'welcome, you are registered succesfully');
            return res.redirect('/products');
        })
    }
    catch(e){
        req.flash('error' , e.message);
        return res.redirect('/signup');
    }
})

// to get login form
router.get('/login' , (req,res)=>{
    res.render('auth/login')
})

// to actually login via the db
router.post('/login',

    passport.authenticate('local',{
        failureRedirect:'/login',
        failureMessage: true
    }),

    (req,res)=>{
        // console.log(req.user, 'sam');
        req.flash('success' , 'Welcome back');
        res.redirect('/products');
    }
)


// logout
router.get('/logout' , (req,res)=>{
    ()=>{
        req.logout();
    }
    res.clearCookie('connect.sid'); 
    req.flash('success' , 'Goodbye friends, see you again');
    res.redirect('/login');
})



module.exports = router;