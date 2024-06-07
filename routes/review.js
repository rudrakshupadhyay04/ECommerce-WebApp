const express =  require('express');
const router = express.Router()  //mini instance---yha pr mujh ko app ka istemaal kr naa thaa joo ke mere applocation kaa instance hai aur hum instance ko export nhii kr sktey hai es liye yhaa pr hum Router ke help se ek mini instace bnaa lete hai
const Product = require('../models/Product');
const Review = require('../models/Review');
const {validateReview} = require('../middleware');



router.post('/products/:id/review' ,validateReview ,async (req,res)=>{
    try{
        let{id} = req.params;
        let{rating, comment} = req.body;
        const product = await Product.findById(id);
        const review = new Review({rating,comment});
    
        product.reviews.push(review);
        await review.save();
        await product.save();
        req.flash('success' , 'Review added sucessfully!!!');
        res.redirect(`/products/${id}`);
    }
    catch(e){
        res.status(500).render('error' , {err:e.message});
    }
})






module.exports = router;