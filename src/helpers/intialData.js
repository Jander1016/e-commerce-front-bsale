/**
 * @module InitialData
 */

/**
 * Esta función es importada desde el componente productos, la cual te permite crear la card del producto
 * @type {Function}
 */
import DisplayProducts from '../components/products/Products.js'

/**
 * Función que permite cargar las categorias en la lista, para poder realizar los filtros de productos.
 * La busqueda se conecta con la API en el endpoint 'https://e-commerce-back-bsale-production.up.railway.app/api/v1/categories'
 * * @param {VoidFunction}
 */
export async function LoadCategory() {
  try {
    const categoryList = await(await fetch('https://e-commerce-back-bsale-production.up.railway.app/api/v1/categories')).json()
    if (categoryList.status !== 'OK') 
      return
    
    let dataCategory = '<option selected>Seleccione categoria</option> '
    categoryList.data.map((category) => {
      dataCategory += `<option value='${category.name}' >${category.name}</option>`
    })
    document.getElementById('category-product').innerHTML = dataCategory
  } catch (error) {
    console.log(error.message)
  }
}

/**
 * Función que permite cargar los productos en la pagina principal.
 * La busqueda se conecta con la API en el endpoint 'https://e-commerce-back-bsale-production.up.railway.app/api/v1/products'
 * * @param {VoidFunction}
 */
export async function LoadInitialproducts() {
  try {
    const productsList = await(await fetch('https://e-commerce-back-bsale-production.up.railway.app/api/v1/products/')).json()
    if (productsList.status !== 'OK') 
      return
    
    const dataProducts = productsList.data
    DisplayProducts(dataProducts)
  } catch (error) {
    console.log(error.message)
  }
}

