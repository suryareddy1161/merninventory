require("dotenv").config()
const app=require('./app')

const port=process.env.PORT||port

const dbConnect=require("./db")

dbConnect(process.env.MONGO_URL).then(data=>{

    
    app.listen(port,()=>{
        console.log("Db connected")
        console.log("server is running at port "+port)
    })
   

}).catch(err=>{
    console.log(err)
})
