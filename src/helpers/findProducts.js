
/**
 * @module FindProducts
 */

/**
 * Esta función es importada desde el componente productos, la cual te permite crear la card del producto
 * @type {Function}
 */
import DisplayProducts from '../components/products/Products.js'

/**
 * Esta variable Recibe el nombre de la categoria del producto para realizar la busqueda según selección.
 * @type {String}
 */
let categoryProductList = document.querySelector('#category-product')

const pathUrl = 'https://e-commerce-back-bsale-production.up.railway.app/api/v1/'
const pathUrlHeroku ='https://bsale-ecommerce.herokuapp.com/api/v1/'


/**
 * Función de busqueda dinámica que permite hacer la busqueda de el o los productos, según el caracter ingresado en la caja de texto.
 * La busqueda se conecta con la API en el endpoint 'https://e-commerce-back-bsale-production.up.railway.app/api/v1/products/{category}'
 * @param {String} nameProduct Recibe un datos tipo string que puede contener caracteres que contenga el nombre del producto buscado.
 * 
 */
export async function findNameProduct(nameProduct) {
  try {

    categoryProductList.selectedIndex = 0
    const productsList = await(await fetch(`${pathUrlHeroku}products/${nameProduct}`, {
      'mode': 'cors',
      'headers': {
          'Access-Control-Allow-Origin': '*',
      }
    })).json()

    if (productsList.status !== 'OK') {
      const notFound = `<section class="col d-flex justify-content-center flex-row">
              <img class="img-fluid" src='./images/NotFound.jpg' alt="notfound style="width: 100%; "" >
          </section>`
      document.getElementById('app').innerHTML = notFound
    } else {
      DisplayProducts(productsList.data)
    }

  } catch (error) {
    console.log(error.message)
  }
}


/**
 * Función de busqueda que permite hacer una busqueda exacta de los productos de la categoria seleccionada.
 * La busqueda se conecta con la API en el endpoint 'https://e-commerce-back-bsale-production.up.railway.app/api/v1/products/category/{category}'
 * @param {Integer} category Recibe un dato tipo string, que corresponde a la categoria del producto
 * 
 */
export async function findCategoryProduct(category) {
  try {
    if (!category || category==='0') return findNameProduct(' ')
    const categoryProduct = await(await fetch(`${pathUrlHeroku}products/category/${category}`, {
      'mode': 'cors',
      'headers': {
          'Access-Control-Allow-Origin': '*',
      }
  })).json()
    if (categoryProduct.status !== 'OK') {
      const allData= await(await fetch(pathUrlHeroku + 'products')).json()
      DisplayProducts(allData.data)
    } else {
      DisplayProducts(categoryProduct.data)
    }
  } catch (error) {
    console.log(error.message)
  }
}
