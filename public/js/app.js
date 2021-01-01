const form =document.querySelector('form')
const search =document.querySelector('input') 
const reqError =document.querySelector('#reqError')
const req =document.querySelectorAll('.req')


form.addEventListener("submit",(e)=>{
    e.preventDefault()

    const address =search.value
    fetch("/weather?search="+address).then(res=>{
    res.json().then((data)=>{
        if (data.error) {
            reqError.textContent=data.error
        } else {
            req[0].textContent=data.city
            req[1].textContent=data.weather
            req[2].textContent=data.temp
        }
        document.querySelector('.main ul').style.display="block";
    })
    })
})