import products from '../data/products.json' assert {type : 'json'}
import { writeToFile } from '../utils.js'
import { v4 as uuidv4 } from "uuid"

export const findAll = () => {
    return new Promise((resolve, reject)=>{
        resolve(products)
    })
}


export const findById = (id) => {
    return new Promise((resolve, reject)=>{
        const product = products.find((p)=> p.id === id)
        resolve(product)
    })
}

export const create = (product) => {
    return new Promise((resolve, reject)=>{
        const newProduct = {id: uuidv4(), ...product}
        console.log("-----NEWPRODUCT")
        console.log(newProduct)
        products.push(newProduct)
        writeToFile('./data/products.json', JSON.stringify(products))
        resolve(newProduct)
    })
}


export const update = (id, product) => {
    return new Promise((resolve, reject)=>{
        try{
            const index = products.findIndex((p)=> p.id === id)
            products[index] = {id, ...product}
            writeToFile('./data/products.json', JSON.stringify(products))
            resolve(products[index])
        }catch(e){
            console.log(e)
        }
    })
}


export const remove = (id) =>{
    return new Promise((resolve, reject)=>{
        try{
            const allProducts = products.filter((p)=> p.id !== id)
            writeToFile('./data/products.json', JSON.stringify(allProducts))
            resolve(true)
        }catch(e){
            console.log(e)
        }
    })
}