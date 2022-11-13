
export default function DisplayProducts(products) {
  try {
    document.getElementById('app').innerHTML = ""
    let productHTML = ''
    products.forEach(element => {
      productHTML += `<article class="col d-flex justify-content-center flex-row">
              <div id='card-product' class="card shadow rounded" style="width: 250px;">
                <figure class="figure">
                    <img 
                    class ="figure-img img-fluid rounded" 
                    loading='lazy' 
                    style="width: 100%" 
                    src=${ element.url_image || './images/products/' + element.id + '.jpg'}
                    alt='${ element.name }'>
                </figure>
                <div class="card-title text-center my-1 py-1">
                    <span class="card-title">${ element.name }</span>
                </div>
                <div class="card-body">
                    <h6>$<span class="price">${ element.price }</span></h6>
                    <button id ="btn-add-cart" class="btn btn-secondary fa fa-cart-arrow-down"></button>
                </div>
              </div>
            </article>`
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
