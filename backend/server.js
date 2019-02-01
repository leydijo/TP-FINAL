const express = require('express');
const app = express();
var router = express.Router();
const axios = require('axios');

const prod = [];

app.get('/', (req,res) =>{
    console.log(123)
    res.send("Cuadro de búsqueda");
})


app.get('/api/items', (req,res) =>{
    const products = req.query.q;
     console.log(products)
    axios.get('https://api.mercadolibre.com/sites/MLA/search?limit=4&q=' + products)
    .then(function (resultado){
         console.log("resultado" , resultado.data);
    const data = resultado.data;  
    const item = {
        categories:[data.filters[0].values[0].name] ,
        items: 
            {
                id : data.results[0].id,
                title:data.results[0].title,
               
                price:{
                    currency: data.results[0].currency_id,
                    amount: String(data.price).split('.') [0],
                    decimals:String(data.price).split('.') [1] || '0'
            },
           
            picture: data.results[0].thumbnail,
            condition:data.results[0].condition,
            free_shipping:data.results[0].accepsts_mercadopago,
            location: data.results[0].address
            
            }      
        
    }
    return res.json(item);
        
    })
    .catch(function(){
        console.log("error")
    })

    
})


app.get('/api/items/:id', (req , res) =>{
     const second = req.params.id;
    console.log("id", second)
     axios.get('https://api.mercadolibre.com/items/' + second)
     .then(result => {
        const data = result.data;
         const idfirst = {
            // categories:[data.filters[0].values[0].name] ,
            items: 
                {
                    id : data.id,
                    title:data.title,
                   
                    price:{
                        currency: data.currency_id,
                        amount: String(data.price).split('.') [0],
                        decimals:String(data.price).split('.') [1] || '0'
                     }, 
                picture: data.thumbnail,
                condition:data.condition,
                free_shipping:data.accepsts_mercadopago,
                sold_quantity:data.sold_quantity,
                description:data.title 
                }      
               
            }
            
         axios.get('https://api.mercadolibre.com/items/' + second +  '/description')
         .then(result => {
             console.log(result.data)
             const data = result.data;
             const idsecond = {   
                items: {
                    id : data.id,
                    title:data.title,
                   
                    price:{
                        currency: data.currency_id,
                        amount: String(data.price).split('.') [0],
                        decimals:String(data.price).split('.') [1] || '0'
                     }, 
                picture: data.thumbnail,
                condition:data.condition,
                free_shipping:data.accepsts_mercadopago,
                sold_quantity:data.sold_quantity,
                description:data.results[0].descriptions[0]
                } 

             }

         })   

         return res.json(idfirst); 
      
 
     })
     .catch(function(e){
        console.log("error segundo", e)
     })
})












module.exports = router;

router.get('/api');

const  port  = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`))