
let cartProducts = []
let totalCart = 0
let amountProduct = 0


export default function addCart(e){
  e.preventDefault()
  try {
    if (e.target.classList.value === "btn btn-secondary fa fa-cart-arrow-down") {
      let name = e.target.parentElement.parentElement.querySelector('.img-product').alt
      let img = e.target.parentElement.parentElement.querySelector('.img-product').src
      let price = e.target.parentElement.querySelector(".price").textContent
      let amount = cartProducts.amount || 0
  
      const product={
        name,
        img,
        price,
        amount
      }
  
      if(cartProducts.filter(prod=> prod.name === product.name).length === 0) {
        product.amount = 1
        cartProducts.push(product)
        localStorage.setItem('cart',JSON.stringify(cartProducts))
        totalCart+= parseFloat(price)
        amountProduct++
      }else{
        cartProducts.filter(prod=> {
          prod.name === product.name
          ? prod.amount++
          : prod.amount
        })
        totalCart+= parseFloat(price)
        amountProduct++
        localStorage.setItem('cart',JSON.stringify(cartProducts))
      }    
      displayCart(cartProducts)
      document.querySelector('.total-cart').innerHTML=totalCart
      document.querySelector('#count-product').textContent= amountProduct
    }       
    
  } catch (error) {
    console.log(error.message)
  }
}

 export function deleteCart(e){
  e.preventDefault()
  try {
      if (e.target.classList.value === "btn btn-danger fa-regular fa-trash-can"){
      const priceDelete = e.target.parentElement.parentElement.querySelector('.priceProductCart').textContent;
      const amountDelete = e.target.parentElement.parentElement.querySelector('.amountProductCart').textContent;
      const nameProductDelete = e.target.parentElement.parentElement.querySelector('.nameProductCart').textContent;

      cartProducts.filter(prod=> {
        if(prod.name === nameProductDelete) amountProduct = amountProduct - parseInt(amountDelete)
        document.querySelector('#count-product').textContent= amountProduct
      })
      cartProducts = cartProducts.filter(prod=>prod.name !== nameProductDelete )
      totalCart = totalCart - (parseFloat(priceDelete) * parseFloat(amountDelete))

      document.querySelector('.total-cart').innerHTML=totalCart;

      e.target.parentElement.parentElement.remove()
    }
  } catch (error) {
    console.log(error.message)
  }
  
  
}

export function deleteAllCart(e){
  e.preventDefault()
  try {
    document.querySelector('.modal-list').replaceChildren('')
      cartProducts = []
      totalCart = 0
      amountProduct = 0
      document.querySelector('.total-cart').innerHTML = totalCart;
      document.querySelector('#count-product').textContent= amountProduct

  } catch (error) {
    console.log(error.message)
  }
}

function displayCart(products) {
  try {
    document.querySelector('.modal-list').innerHTML = ""
    let productHTML = ''
    products.forEach(element => {
      productHTML += `
                    <tr >
                      <td>
                        <figure class="figure-cart">
                          <img 
                          class ="img-cart-product" 
                          style="width: 40px" 
                          src=${ element.img}
                          alt='${ element.name }'>
                        </figure>
                      </td>
                      <td class="nameProductCart">${ element.name }</td>
                      <td class="amountProductCart">${ element.amount } </td>
                      <td>
                       $<span class="priceProductCart">${ element.price }</span>
                      </td>
                      <td>
                       <button id="btn-delete" class="btn btn-danger fa-regular fa-trash-can"></button>
                      </td>
                    </tr>   
            `
    });

    document.querySelector('.modal-list').innerHTML = productHTML;

  } catch (error) {
    console.log(error.message)
  }
}