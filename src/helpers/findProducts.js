
import DisplayProducts from '../components/products/Products.js'

let categoryProductList = document.querySelector('#category-product')

export async function findNameProduct(param) {
  try {

    categoryProductList.selectedIndex = 0
    const productsList = await(await fetch('https://e-commerce-back-bsale-production.up.railway.app/api/v1/products/' + param)).json()

    if (productsList.data.length === 0) {
      const notFound = `<section class="col d-flex justify-content-center flex-row">
              <img src='./images/NotFound.jpg' alt="notfound style="width: 100%; "" >
          </section>`
      document.getElementById('app').innerHTML = notFound
    } else {
      DisplayProducts(productsList.data)
    }

  } catch (error) {
    console.log(error.message)
  }
}

export async function findCategoryProduct(param) {
  try {
    if (! param) return
    const categoryProduct = await(await fetch(`https://e-commerce-back-bsale-production.up.railway.app/api/v1/products/category/${param}`)).json()
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