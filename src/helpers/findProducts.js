
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


/**
 * Función de busqueda dinámica que permite hacer la busqueda de el o los productos, según el caracter ingresado en la caja de texto.
 * La busqueda se conecta con la API en el endpoint 'https://e-commerce-back-bsale-production.up.railway.app/api/v1/products/{category}'
 * @param {String} nameProduct Recibe un datos tipo string que puede contener caracteres que contenga el nombre del producto buscado.
 * 
 */
export async function findNameProduct(nameProduct) {
  try {

    categoryProductList.selectedIndex = 0
    const productsList = await(await fetch('https://e-commerce-back-bsale-production.up.railway.app/api/v1/products/' + nameProduct)).json()

    if (productsList.data.length === 0) {
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
 * @param {String} nameCategory Recibe un dato tipo string, que corresponde a la categoria del prducto
 * 
 */
export async function findCategoryProduct(nameCategory) {
  try {
    if (! param) return
    const categoryProduct = await(await fetch(`https://e-commerce-back-bsale-production.up.railway.app/api/v1/products/category/${nameCategory}`)).json()
    if (categoryProduct.data.length === 0) {
      const allData= await(await fetch('https://e-commerce-back-bsale-production.up.railway.app/api/v1/products/')).json()
      DisplayProducts(allData.data)
    } else {
      DisplayProducts(categoryProduct.data)
    }
  } catch (error) {
    console.log(error.message)
  }
}