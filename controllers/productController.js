import { create, findAll, findById, remove, update } from '../models/productModel.js'
import { getDataFromRequest } from '../utils.js'

export const getAllproducts = async (req, res) => {
    const products = await findAll()

    res.writeHead(200, {'Content-Type' : 'application/json'})
    res.end(JSON.stringify(products))
}

export const getProductById = async (req, res, id) => {
    try{const product = await findById(id)

    if(!product){
        res.writeHead(404, {'Content-Type' : 'application/json'})
        res.end(JSON.stringify({message:`Product with Id: ${id} does not exists`}))
    }else{
        res.writeHead(200, {'Content-Type' : 'application/json'})
        res.end(JSON.stringify(product))
    }}catch(e){
        console.log(e)
        
    }
}

export const createProduct = async (req, res) => {
    try{
        let body = await getDataFromRequest(req)
        const {name, description, price} = JSON.parse(body)
        const product = {
            name : name, 
            description: description,
            price : price,
        }
        
        const newProduct = await create(product)
        res.writeHead(201, {'Content-Type' : 'application/json'})
        res.end(JSON.stringify(newProduct))
        
        
    }catch(e){
        console.log(e)
    }
}

export const updateProduct = async (req, res, id) => {
    try{
        const product = findById(id)
        if(!product){
            res.writeHead(404, {'Content-Type' : 'application/json'})
            res.end(JSON.stringify({message:`Product with Id: ${id} does not exists`}))
        }else{
            let body = await getDataFromRequest(req)
            const {name, description, price} = JSON.parse(body)
            const productData = {
                name : name, 
                description: description,
                price : price,
            }
            
            const updatedProduct = await update(id, productData)
            res.writeHead(200, {'Content-Type' : 'application/json'})
            res.end(JSON.stringify(updatedProduct))
        }
    }catch(e){
        console.log(e)
    }
}

export const deleteProduct = async (req, res, id) => {
    const product = findById(id)
    if(!product){
        res.writeHead(404, {'Content-Type' : 'application/json'})
        res.end(JSON.stringify({message:`Product with Id: ${id} does not exists`}))
    }else{
        const deleted = remove(id)
        if(deleted){
            res.writeHead(200, {'Content-Type' : 'application/json'})
            res.end(JSON.stringify({messsage: `Product ${id} removed`}))
        }else{
            res.writeHead(500, {'Content-Type' : 'application/json'})
            res.end(JSON.stringify({messsage: `Something went wrong`}))
        }
    }
    
}

