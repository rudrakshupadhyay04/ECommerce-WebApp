const express =  require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
const router = express.Router()  //mini instance---yha pr mujh ko app ka istemaal kr naa thaa joo ke mere applocation kaa instance hai aur hum instance ko export nhii kr sktey hai es liye yhaa pr hum Router ke help se ek mini instace bnaa lete hai
const {validateProduct , isLoggedIn, isSeller, isProductAuthor} = require('../middleware');


// To show all the products
router.get('/products' , async (req,res)=>{
    try{
        let products = await Product.find({});
        res.render('products/index' , {products}); 
    }
    catch(e){
        res.status(500).render('error' , {err:e.message});
    }
})

 
// To show the form for new product
router.get('/products/new' , isLoggedIn , (req,res)=>{
    try{
        res.render('products/new');
    }
    catch(e){
        res.status(500).render('error' , {err:e.message});
    }
})

// to actually adding a product
router.post('/products' , validateProduct ,isLoggedIn, isSeller ,  async (req,res)=>{
    try{
        let {name , img , price , desc} = req.body;
        await Product.create({name , img , price , desc , author: req.user._id});
        req.flash('success' , 'Product added sucessfully !!!!');
        res.redirect('/products'); 
    }
    catch(e){
        res.status(500).render('error' , {err:e.message});
    }

})


// to show a particular product
router.get('/products/:id' , isLoggedIn , async (req,res)=>{
    try{
        let{id} = req.params;
        let foundProduct = await Product.findById(id).populate('reviews');  //foundProduct k andar puraa kaa puraa object aa jaaye gaa
        res.render('products/show' , {foundProduct , msg: req.flash('msg')})
    }
    catch(e){
        res.status(500).render('error' , {err:e.message});
    }
})


// form to edit a product
router.get('/products/:id/edit' , isLoggedIn, async (req,res)=>{
    try{
        let{id} = req.params;
        let foundProduct = await Product.findById(id);
        res.render('products/edit' , {foundProduct});
    }
    catch(e){
        res.status(500).render('error' , {err:e.message});
    }
})
// to actually edit the data in db
router.patch('/products/:id' , validateProduct, isLoggedIn , async (req,res)=>{
    try{
        let {id} = req.params;
        let {name , img , price , desc} = req.body;
        await Product.findByIdAndUpdate(id , {name , img , price , desc});
        req.flash('success' , 'Product edited sucessfully !!!!');
        res.redirect(`/products/${id}`);
    }
    catch(e){
        res.status(500).render('error' , {err:e.message});
    }
})

//to delete a product
router.delete('/products/:id' , isLoggedIn , isProductAuthor , async(req , res)=>{
    try{
        let{id} = req.params;
        
        const product = await Product.findById(id); //normal approch to delete reviews while deleting a product
        // for(let id of product.reviews){
        //     await Review.findByIdAndDelete(id);
        // }
    
        await Product.findByIdAndDelete(id);
        req.flash('success' , 'Product deleted sucessfully !!!!');
        res.redirect('/products');
    }
    catch(e){
        res.status(500).render('error' , {err:e.message});
    }
})


module.exports = router;