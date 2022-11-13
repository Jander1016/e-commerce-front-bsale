//Importaciones
import { LoadInitialproducts, LoadCategory } from './helpers/intialData.js';
import { findCategoryProduct, findNameProduct } from './helpers/findProducts.js';
import addCart, { deleteCart, deleteAllCart, loadCartLocal } from './components/cart/Cart.js';

// variables
let nameProduct = document.querySelector('#name-product');
let findProduct = document.querySelector('#findName');
let categoryProductList = document.querySelector('#category-product')
let detailProduct = document.querySelector('#app')
let btnDelete = document.querySelector('.modal-list')
let btnAllDelete = document.querySelector('#btn-all-delete')
let btnBuy = document.querySelector('#btn-buy')

btnAllDelete.addEventListener('click', deleteAllCart)

btnBuy.addEventListener('click', deleteAllCart)

btnDelete?.addEventListener('click', deleteCart)

detailProduct.addEventListener('click', addCart)

window.onload =   function () {
  Promise.allSettled([LoadCategory(), LoadInitialproducts()])
  .then(values=> values)
  .catch(error=> console.log(error.message))
  
  loadCartLocal()
}


findProduct.addEventListener('click', (e) => e.preventDefault());

nameProduct.addEventListener('keyup', async (e) => {
  try {
    e.preventDefault();
    await findNameProduct(nameProduct.value)
  } catch (error) {
    console.log(error.message)
  }
})

categoryProductList.addEventListener('change', async (e) =>{
  try {
    e.preventDefault();
    await findCategoryProduct(categoryProductList.value)
  } catch (error) {
    console.log(error.message)
  }
})