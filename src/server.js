const config = require('./config')
const express = require('express')
const app = express()
const port = config.port
const API_KEY = config.API_KEY

const headers = {
    'Authorization' : 'Bearer '.concat(API_KEY),
    'Access-Control-Allow-Origin': '*',
}
app.listen(port, () => {
    console.log('Server started on port 3000');
  });

app.get('/', (req, res) => {
    console.log("calling getData()")
    
    getData("https://secure.splitwise.com/api/v3.0/get_current_user")
        .then((result) =>{
            res.send(result)
        })
        .catch((result)=>{         
            res.send(result.message)
        })
    
});

const getData =  async(url) =>{
    console.log("making api call")
    let response
    response = await fetch(url,{headers:headers,method:'GET'})
    if(!response.ok){
        throw Error("Oops!! something went wrong. "+" HTTP code : " + response.status + " - " + response.statusText)
    }
    if(response == null){
        throw Error("Oops!! the response is null")
    }
    response = await response.json()
    return response
}