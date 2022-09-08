import http from 'http'
import product from './data/products.json' assert {type: "json"}

const PORT = process.env.PORT || 5000

const server = http.createServer((req, res)=>{
    if(req.url == '/'){
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        res.write("<h1>Huzaifa Khan</h1>")
        res.end()
    }else if(req.url == '/api'){
        res.writeHead(200, {'Content-Type' : 'application/json'})
        res.end(JSON.stringify(product))

    }
}) 

server.listen(PORT, ()=>{console.log(`Server Running At PORT: ${PORT}`)})