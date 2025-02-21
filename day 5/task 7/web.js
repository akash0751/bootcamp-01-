const http = require("http")
const url = require("url")

const server = http.createServer((req,res) =>{
    const parsedUrl = url.parse(req.url,true)
    console.log(parsedUrl)
    res.writeHead(200,{"Content-Type":"text/html"})
    if(parsedUrl.pathname==="/"){
    res.write("<h1><center>It's a home page</center></h1>")
    res.end();
    }else if(parsedUrl.pathname==="/about"){
        res.write("<h1><center>It's an about page</center></h1>")
    }
    else if(parsedUrl.pathname==="/contact"){
        res.write("<h1><center>Contact us</center></h1>")
    }
    else{
        res.write("<h1>404 not found</h1>")
    }
})

    server.listen(3000, ()=>{
        console.log("Server is running on 3000")
    })