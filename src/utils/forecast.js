const request =require("request")

const forecast =(x,y ,callback)=>{
    const url="https://api.openweathermap.org/data/2.5/weather?lat="+y+"&lon="+x+"&appid=f4767c9ccf73144034c6810f065f1799"
    // const url="https://api.openweathermap.org/data/2.5/forecast?lat="+y+"&lon="+x+"&appid=b1b15e88fa797225412429c1c50c122a1"

    request({url:url,json:true},(error,res)=>{   
        if (error) {
            callback("check your conection!",undefined)
        }else if(res.body.message){
            callback(res.body.message,undefined)
        } 
        else {
            const data=res.body
                temp =data.main.temp ,
                weather=data.weather[0].main,
                city =data.name

            callback(undefined,{temp,weather,city})

        } 

    })
}
module.exports=forecast