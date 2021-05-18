const express=require("express");
const bodyParser=require("body-parser");
const cors=require("cors");

const{mongoose}=require("./db");
const bookApiController=require("./api/bookApiController")

const app =express();
// app.use(bodyParser.json());
app.use(express.json());
app.use(cors({origin:"http://localhost:4200"}));
app.use("/books",bookApiController);

app.listen(3000,()=>{
    console.log('Server started on port:3000');
})