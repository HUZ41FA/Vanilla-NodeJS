import http from 'http'
import products from './data/products.json' assert {type : 'json'}
import { createProduct, deleteProduct, getAllproducts, getProductById, updateProduct, } from './controllers/productController.js'


const server = http.createServer((req, res) => {
    if(req.url === '/api/products' && req.method === 'GET'){
        getAllproducts(req, res)
    }else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'GET'){
        const id = req.url.split('/')[3] 
        getProductById(req, res, id)
    }else if(req.url === '/api/products' && req.method === 'POST'){
        
            createProduct(req, res)
      

       
        
    }else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'PUT'){
        const id = req.url.split('/')[3]
        updateProduct(req, res, id)
    }else if(req.url.match(/\/api\/products\/([0-9]+)/) && req.method === 'DELETE'){
        const id = req.url.split('/')[3]
        deleteProduct(req, res, id)
    }else{
        res.writeHead(404, {'Content-Type' : 'text/html'})
        res.end('<h1>Unable To Locate resource</h1>')
    }
})

const PORT = process.env.PORT || 3000

server.listen(PORT, ()=>{console.log(`Server running on PORT: ${PORT}`)})