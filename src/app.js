const express =require("express")
const path =require("path")
const hbs =require('hbs')
const request =require("request")
const forecast=require("./utils/forecast")
const gecode = require("./utils/gecode")

// express
const app = express()
const port= process.env.PORT || 3000

// Dirs
const publicDir =path.join(__dirname,"../public")
const templateDir =path.join(__dirname,"../template/views")
const partialsPath =path.join(__dirname,"../template/partials")

// handle bars engine and views
app.set('view engine','hbs')
app.set('views',templateDir)
hbs.registerPartials(partialsPath)
// static dirctory 
app.use(express.static(publicDir))

// home page
app.get('', (req,res) =>{
    res.render("index", {
        name:"Ahmed",
        title:"Weather App"
    })
})
app.get('/about', (req,res) =>{
    res.render("about", {
        name:"Ahmed",
        title:"About me",
        text:"some text here "
    })
})
app.get('/help', (req,res) =>{
    res.render("help", {
        name:"Ahmed",
        title:"Help",
        text:"some text here "
    })
})
// Wether page
app.get('/weather',(req,res)=>{
    const address =req.query.search
    if (!address) {
        return res.send({error:"you must provide a search term"})
    }
    gecode(address,(error,response)=>{
            if (error) {
                res.send(error)
            } else {
                forecast(response[0],response[1] ,(error,response)=>{
                    if (error) {
                        res.send(error)
                    } else {
                        res.send(response)
                    }
                })
            }
        })
})

// error page
app.get("help/*",(req,res)=>{
    res.render("404",{
        name:'Ahmed',
        title:"Help",
        error:"help article is not found"
    })
})
app.get("*",(req,res)=>{
    res.render("404",{
        name:'Ahmed',
        title:"error",
        error:"page is not found"
    })
})


// server running
app.listen(port,()=>{
    console.log("server is runing"+port);
})