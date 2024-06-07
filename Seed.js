// seed file mai hum woo dataa daal te hai joo humarey pass already hota hai website pr dikhane k liye (i.e dummy data )


const mongoose = require('mongoose');

const Product = require('./models/Product');


const products = [
    {
        name:"Iphone 14pro",
        img: "https://images.unsplash.com/photo-1530319067432-f2a729c03db5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aXBob25lfGVufDB8fDB8fHww",
        price: 130000,
        desc: "aukaat k andar"
    },
    {
        name:"Macbook m2 pro",
        img:"https://images.unsplash.com/photo-1675868375184-8d711f447b28?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bWFjYm9vayUyMG0yJTIwcHJvfGVufDB8fDB8fHww",
        price:250000,
        desc:"very expensive"
    },
    {
        name:"Iwatch",
        img: "https://images.unsplash.com/photo-1558126319-c9feecbf57ee?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aXdhdGNofGVufDB8fDB8fHww",
        price: 51000, 
        desc: "sasta hai le lo"
    },
    {
        name:"IPad pro",
        img: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aXBhZHxlbnwwfHwwfHx8MA%3D%3D",
        price:150000 , 
        desc: "Ipad hai le loo "
    },
    {
        name:"Airpods",
        img: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWlycG9kc3xlbnwwfHwwfHx8MA%3D%3D",
        price:40000 , 
        desc: "top kaa maal hai le lo"
    }
]

async function seedDB(){
    await Product.insertMany(products);
    console.log("data seeded successfully");
}

module.exports = seedDB;







