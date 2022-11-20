
/**
 * Esta variable es el array donde se almacenaran los productos del carrito de compras
 * @type {Array<Object>}
 */
let cartProducts = []

/**
 * Esta variable donde se almacenara el monto total a pagar del carrito de compras
 * @type {Number}
 */
let totalCart = 0

/**
 * Esta variable donde se almacenara la cantidad de productos del carrito de compras
 * @type {Number}
 */
let amountProduct = 0

/**
 * @module ShoppingCart
 */
/**
 * Función que permite agregar a producto al carrito de compras
 * @param {event} e Evento capturado
 * 
 */
export default function addCart(e) {
  e.preventDefault()
  try {
    if (localStorage.length) cartProducts = JSON.parse(localStorage.getItem('cart'))
    
    if (e.target.classList.value === "btn btn-secondary fa fa-cart-arrow-down") {
      let name = e.target.parentElement.parentElement.querySelector('.img-product').alt
      let img = e.target.parentElement.parentElement.querySelector('.img-product').src
      let price = e.target.parentElement.querySelector(".price").textContent
      let amount = 0

      const product = {
        name,
        img,
        price,
        amount
      }

      if (cartProducts.filter(prod => prod.name === product.name).length === 0) {
        product.amount = 1
        cartProducts.push(product)
        localStorage.setItem('cart', JSON.stringify(cartProducts))
        totalCart += parseFloat(price)
        amountProduct++
      } else {
        cartProducts.filter(prod => {
          prod.name === product.name ? prod.amount ++ : prod.amount
        })
        totalCart += parseFloat(price)
        amountProduct++
        localStorage.setItem('cart', JSON.stringify(cartProducts))
      }
      displayCart(cartProducts)
      document.querySelector('.total-cart').innerHTML = totalCart
      document.querySelector('#count-product').textContent = amountProduct
    }

  } catch (error) {
    console.log(error.message)
  }
}

/**
 * Función que permite eliminar a producto al carrito de compras
 * @param {event} e Evento capturado
 * 
 */
export function deleteCart(e) {
  e.preventDefault()
  try {
    if (localStorage.length) cartProducts = JSON.parse(localStorage.getItem('cart'))

    if (e.target.classList.value === "btn btn-danger fa-regular fa-trash-can") {
      const priceDelete = e.target.parentElement.parentElement.querySelector('.priceProductCart').textContent;
      const amountDelete = e.target.parentElement.parentElement.querySelector('.amountProductCart').textContent;
      const nameProductDelete = e.target.parentElement.parentElement.querySelector('.nameProductCart').textContent;

      cartProducts.filter(prod => {
        if (prod.name === nameProductDelete) 
          amountProduct = amountProduct - parseInt(amountDelete)
        
        document.querySelector('#count-product').textContent = amountProduct
      })
      cartProducts = cartProducts.filter(prod => prod.name !== nameProductDelete)
      totalCart = totalCart - (parseFloat(priceDelete) * parseFloat(amountDelete))

      document.querySelector('.total-cart').innerHTML = totalCart;

      localStorage.setItem('cart', JSON.stringify(cartProducts))

      e.target.parentElement.parentElement.remove()
    }
  } catch (error) {
    console.log(error.message)
  }
}


/**
 * Función que permite limpiar todo el carrito de compras
 * @param {event} e Evento capturado
 * 
 */
export function deleteAllCart(e) {
  e.preventDefault()
  try {
    if (localStorage.length) cartProducts = JSON.parse(localStorage.getItem('cart'))
    document.querySelector('.modal-list').replaceChildren('')
    cartProducts = []
    totalCart = 0
    amountProduct = 0
    document.querySelector('.total-cart').innerHTML = totalCart;
    document.querySelector('#count-product').textContent = amountProduct
    localStorage.clear()
  } catch (error) {
    console.log(error.message)
  }
}

/**
 * Función que permite llenar el carrito de compras, previene la perdida de datos por si se actualizó la pagina y no se llegó a completar la compra.
 * @param {VoidFunction}
 */
export function loadCartLocal() {
  try {
    if (localStorage.length) {
      const data = JSON.parse(localStorage.getItem('cart'))
      displayCart(data)
      data.map(item => {
        totalCart += (item.price * item.amount)
        amountProduct += item.amount
      })
      document.querySelector('.total-cart').innerHTML = totalCart
      document.querySelector('#count-product').textContent = amountProduct
    }
  } catch (error) {
    console.log(error.message)
  }
}

/**
 * Función que permite crear la estructura del carrito de compras
 * @param {Array} products Recibe un array que contiene el o los productos
 * 
 */
export function displayCart(products) {
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
