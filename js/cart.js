document.addEventListener("DOMContentLoaded", function(){
    getJSONData(CART_INFO_URL + localStorage.userID + EXT_TYPE).then(function(resultObj){
        if (resultObj.status === "ok"){
            currentInfoArray = resultObj.data;
            showInfo()
        }
    })


function showInfo(){
    let htmlContentToAppend = "";
    let products = currentInfoArray.articles

    if (products.length == 0) {
        htmlContentToAppend = `<h3>Aun no has añadido productos a tu carrito</h3>`
    }else{
        shippingForm()
        htmlContentToAppend = `
        <h3>Articulos a comprar</h3>

        <table class="table">
        <thead>
            <tr>
                <th scope="col"></th>
                <th scope="col">Nombre</th>
                <th scope="col">Costo</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Subtotal</th>
            </tr>
        </thead>
        <tbody>
        `
        
        for (let i = 0; i < products.length; i++) {
            const product = products[i];
            htmlContentToAppend += `
                <tr>
                    <td><img src="${product.image}" alt="product image" class="img-thumbnail" width="120"></td>
                    <td>${product.name}</td>
                    <td>${product.currency}${product.unitCost}</td>
                    <td><input type="number" value=${product.count} onclick="subtotal(${product.id},${product.unitCost}, this.value)"></td>
                    <td>${product.currency}<a id="${product.id}"></a></td>
                </tr>
                `
            }
    }
    document.getElementById("cart").innerHTML = htmlContentToAppend;

    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        subtotal(product.id,product.unitCost,product.count)
    }
}

})

function subtotal(id,costo,cantidad){
    document.getElementById(id).innerHTML = costo*parseInt(cantidad)
}

function shippingForm(){
    let htmlContentToAppend = ""
    htmlContentToAppend = `
    <h3>Tipo de envío</h3>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked>
        <label class="form-check-label" for="exampleRadios1">
          Premium 2 a 5 días (15%)
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2">
        <label class="form-check-label" for="exampleRadios2">
          Express 5 a 8 días (7%)
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2">
        <label class="form-check-label" for="exampleRadios2">
          Standard 12 a 15 días (5%)
        </label>
      </div>
      <h3>Dirección de envío</h3>
      <div class="form form-inline">
        <div class="row">
          <div class="col-4">
            <div class="form-outline">
              <label class="form-label adre" for="calle">Calle</label>
              <input type="text" id="calle" class="form-control" />
            </div>
          </div>
          <div class="col-2">
            <div class="form-outline">
              <label class="form-label" for="numero">Número</label>
              <input type="text" id="numero" class="form-control" />
            </div>
          </div>
        </div>
        <div class="col-4 row">
          <div class="form-outline">
            <label class="form-label" for="numero">Esquina</label>
            <input type="text" id="numero" class="form-control" />
          </div>
        </div>
      </div>
    `
    document.getElementById("shipping").innerHTML = htmlContentToAppend;
}