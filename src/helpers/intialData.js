import DisplayProducts from '../components/products/Products.js'

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

