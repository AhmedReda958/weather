const request =require("request")

const gecode =(city ,callback)=>{
    const url="https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(city)+".json?access_token=pk.eyJ1IjoiYWhtZWRyZWRhOTU4IiwiYSI6ImNraXVxeXo5bTBwbGQzM211dnZvZ3BuZ3QifQ.2dVFzOLg2gY5tzbXN8nssA"

    request({url:url,json:true},(error,res)=>{   
        if (error) {
            callback("check your conection!",undefined)
        } else if(res.body.message) {
            callback("error"+res.body.message,undefined)
        }else{
        callback(undefined,res.body.features[0].center);
        }
    })
}

module.exports=gecode