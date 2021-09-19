import axios from 'axios';
import Noty from 'noty'

let addToCart = document.querySelectorAll('.add-to-cart');
let counterCart = document.querySelector('#cartCounter');

function updateCartPizza(pizza){
  axios.post('/update-cart',pizza).then(res=>{
      counterCart.innerText = res.data.totalQty;
      new Noty({
        type: 'success',
        text: "Items are added to cart",
        timeout:2000,
        progressBar: false
      }).show();
  }).catch(err=>{
    new Noty({
      type: 'error',
      text: "Something went wrong",
      timeout:2000,
      progressBar: false
    }).show();
  })
}

addToCart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        e.stopImmediatePropagation();
        let pizza =  btn.dataset.pizza;
         
        updateCartPizza(JSON.parse(pizza))
    })
})

