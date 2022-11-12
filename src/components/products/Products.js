function DisplayProducts(products) {
  document.getElementById('app').innerHTML = ""
  let productHTML = ''
  products.forEach(element => {
    productHTML +=
      `<div class="col d-flex justify-content-center-mb-4">
        <div class="card  my-5 py-4 shadow rounded" style="width: 20rem;">
        <img src=${element.url_image}  alt=${element.name}>
        <div class="card-body text-center">
          <h5 class="card-title">${element.name}</h5>
            <p class="lead">$${element.price}</p>
            <a href="#" id="btn-add-cart" class="btn btn-primary"><i class="fa fa-cart-arrow-down"></a>
        </div>
        </div>
      </div>`
  });
  document.getElementById('app').innerHTML = productHTML;
}
