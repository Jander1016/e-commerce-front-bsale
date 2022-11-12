// variables
let nameProduct = document.querySelector('#name-product');
let findProduct = document.querySelector('#findName');
let categoryProductList = document.querySelector('#category-product')



function DisplayProducts(products) {
  try {
    document.getElementById('app').innerHTML = ""
    let productHTML = ''
    products.forEach(element => {
      productHTML += `<section class="col d-flex justify-content-center flex-row">
              <div class="card my-3 py-2 shadow rounded" style="width: 15rem;">
                <figure class="figure">
                    <img class ="img-product" loading='lazy' style="width: 100%" src=${
        element.url_image || './images/products/' + element.id + '.jpg'
      } alt=${
        element.name
      }>
                </figure>
                <div class="card-title text-center my-1 py-1">
                    <span class="card-title">${
        element.name
      }</span>
                </div>
                <div class="card-body">
                    <span class="price">$${
        element.price
      }</span>
                    <button id="btn-add-cart" class="btn btn-secondary fa fa-cart-arrow-down"></button>
                </div>
              </div>
            </section>`
    });
    document.getElementById('app').innerHTML = productHTML;

  } catch (error) {
    document.getElementById('app').innerHTML = `<section class="col d-flex justify-content-center flex-row">
        <div class="card my-3 py-2 shadow rounded" style="width: 20rem;">
          <div class="card-image">
            <img src="./images/NotFound.jpg" alt="notfound" >
          </div>
        </div>
      </section>`
  }
}


async function loadCategory() {
  try {
    const categoryList = await(await fetch('https://e-commerce-back-bsale-production.up.railway.app/api/v1/categories')).json()
    if (categoryList.status !== 'OK') 
      return
    
    let dataCategory = '<option selected>Select Category</option> '
    categoryList.data.map((category) => {
      dataCategory += `<option value='${category.name}' >${category.name}</option>`
    })
    document.getElementById('category-product').innerHTML = dataCategory
  } catch (error) {
    console.log(error.message)
  }
}


window.onload = async function () {
  try {
    const productsList = await(await fetch('https://e-commerce-back-bsale-production.up.railway.app/api/v1/products/')).json()
    await loadCategory()
    if (productsList.status !== 'OK') 
      return
    
    const dataProducts = productsList.data
    DisplayProducts(dataProducts)
  } catch (error) {
    console.log(error.message)
  }
}


async function findNameProduct(param) {
  try {
    categoryProductList.selectedIndex = 0
    const productsList = await(await fetch('https://e-commerce-back-bsale-production.up.railway.app/api/v1/products/' + param)).json()

    if (productsList.data.length === 0) {
      const notFound = `<section class="col d-flex justify-content-center flex-row">
              <img src='./images/NotFound.jpg' alt="notfound style="width: 100%; "" >
          </section>`
      console.log(notFound)
      document.getElementById('app').innerHTML = notFound
    } else {
      DisplayProducts(productsList.data)
    }

  } catch (error) {
    console.log(error.message)

  }
}

async function findCategoryProduct(param) {
  try {
    if (! param) 
      return
    
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