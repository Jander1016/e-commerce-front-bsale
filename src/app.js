
import { LoadInitialproducts, LoadCategory } from './helpers/intialData.js';
import { findCategoryProduct, findNameProduct } from './helpers/findProducts.js';
import addCart, { deleteCart, deleteAllCart, loadCartLocal } from './components/cart/Cart.js';

let nameProduct = document.querySelector('#name-product');
let findProduct = document.querySelector('#findName');
let categoryProductList = document.querySelector('#category-product')
let detailProduct = document.querySelector('#app')
let btnDelete = document.querySelector('.modal-list')
let btnAllDelete = document.querySelector('#btn-all-delete')
let btnBuy = document.querySelector('#btn-buy')

/**
* Función del botón Limpiar carrito que permite capturar el evento click y ejecutar la eliminación de todos los items del carrito de compras
* @param {event} click Evento capturado
* @param {Function} deleteAllCart Funcion para eliminar todos los items del carrito de compras
*/
btnAllDelete.addEventListener('click', deleteAllCart)

/**
* Función del botón comprar del carrito, que permite capturar el evento click y ejecutar la eliminación de todos los items del carrito de compras
* @param {event} click Evento capturado
* @param {Function} deleteAllCart Funcion para eliminar todos los items del carrito de compras
*/
btnBuy.addEventListener('click', deleteAllCart)

/**
* Función del botón eliminar del carrito, que permite capturar el evento click y ejecutar la eliminación de un item del carrito de compras.
* @param {event} click Evento capturado
* @param {Function} deleteCart Funcion para eliminar un item del carrito de compras
*/
btnDelete?.addEventListener('click', deleteCart)

/**
* Función del botón Agregar del Card Producto, que permite capturar el evento click y ejecutar la eliminación de todos los items del carrito de compras
* @param {event} click Evento capturado
* @param {Function} addCart Funcion para agregar un item al carrito de compras
*/
detailProduct.addEventListener('click', addCart)


/**
* Función que permite ejecutar las funciones LoadCategory y LoadInitialproducts de forma asyncrona para llenar la lista de categorias y vrear las cards de los productos.
* también ejevuta la función loadCartLocal que verifica si hay productos en la propiedad localStorage de windows
* @param {void} 
*/
window.onload = function () {
  Promise.allSettled([LoadCategory(), LoadInitialproducts()])
  .then(values=> values)
  .catch(error=> console.log(error.message))
  
  loadCartLocal()
}

/**
* @module MainApp
*/
function eventsSearchFilters(){
/**
* Función del botón vuscar producto, que permite que no se recarga la página y pierdan datos.
* @param {event} click Evento capturado
* @param {Function} anónima Funcion para que no se recarga la página y pierdan datos.
*/
findProduct.addEventListener('click', (e) => e.preventDefault());

/**
* Función de la caja de texo de busqueda, que permite capturar el evento keyup y ejecutar la nusqueda del producto mientra se digita los caracteres, buscando cincidencias al momento.
* @param {event} keyup Evento capturado
* @param {Function}  anónima Funcion para buscar producto
*/
nameProduct.addEventListener('keyup', async (e) => {
  try {
    e.preventDefault();
    await findNameProduct(nameProduct.value)
  } catch (error) {
    console.log(error.message)
  }
})

/**
* Función de la lista categorias de Producto, que permite capturar el evento change y ejecutar el filtro exacto de los productos según categorias.
* @param {event} click Evento capturado
* @param {Function} addCart Funcion para agregar un item al carrito de compras
*/
categoryProductList.addEventListener('change', async (e) =>{
  try {
    e.preventDefault();
    await findCategoryProduct(categoryProductList.value)
  } catch (error) {
    console.log(error.message)
  }
})
}

eventsSearchFilters()