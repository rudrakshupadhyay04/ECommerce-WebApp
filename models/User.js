const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        trim:true,
        require:true
    },
    role:{
        type:String,
        require:true
    },
    wishList:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ],
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})

userSchema.plugin(passportLocalMongoose);

let User = mongoose.model('User' , userSchema);

module.exports = User;