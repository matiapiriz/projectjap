
let currentInfoArray = JSON.parse(localStorage.cart)
let shippingtype = 15
let subtotalcosts = 0
let shippingcosts = 0

function showInfo(){
    let htmlContentToAppend = "";
    let products = currentInfoArray//.articles

    if (products.length == 0) {
        htmlContentToAppend = `<h3>Aun no has añadido productos a tu carrito</h3>`
    }else{
        costsTable()
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
                    <td><input class="col-3" type="number" value=${product.count} onclick="subtotal(${product.id},${product.unitCost}, this.value)"></td>
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

showInfo()

function subtotal(id,costo,cantidad){
    document.getElementById(id).innerHTML = costo*parseInt(cantidad)
    for (let i = 0; i < currentInfoArray.length; i++) {
      if (currentInfoArray[i].id == id) {
        currentInfoArray[i].count = cantidad
        localStorage.cart = JSON.stringify(currentInfoArray)
      }
    }
    subtotal_costs()
    envios_costs()
    buybutton()
}

function shippingForm(){
    let htmlContentToAppend = ""
    htmlContentToAppend = `
    <h3>Tipo de envío</h3>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="Radio" id="Radio1" value="15" checked onclick="changeshipping(this.value)">
        <label class="form-check-label" for="Radio1">
          Premium 2 a 5 días (15%)
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="Radio" id="Radio2" value="7" onclick="changeshipping(this.value)">
        <label class="form-check-label" for="Radio2">
          Express 5 a 8 días (7%)
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" name="Radio" id="Radio3" value="5" onclick="changeshipping(this.value)">
        <label class="form-check-label" for="Radio3">
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
              <div class="invalid-feedback">
                  Ingresa una calle.
              </div>
            </div>
          </div>
          <div class="col-2">
            <div class="form-outline">
              <label class="form-label" for="numero">Número</label>
              <input type="text" id="numero" class="form-control" />
              <div class="invalid-feedback">
                  Ingresa un numero.
              </div>
            </div>
          </div>
        </div>
        <div class="col-4 row">
          <div class="form-outline">
            <label class="form-label" for="esquina">Esquina</label>
            <input type="text" id="esquina" class="form-control" />
            <div class="invalid-feedback">
                Ingresa una esquina.
            </div>
          </div>
        </div>
      </div>
    `
    document.getElementById("shipping").innerHTML = htmlContentToAppend;
}

function costsTable(){
  let htmlContentToAppend = ""

  htmlContentToAppend = `
  <h3>Costos</h3>

  <table class="table table-bordered">
  <tbody>
  <tr>
    <td>Subtotal</td>
    <td id="costs_subtotal"></td>
  </tr>
  <tr>
    <td>Costo de Envio</td>
    <td id="costs_envio"></td>
  </tr>
  <tr>
    <td>Total ($)</td>
    <td id="costs_total"></td>
  </tr>
  `
  document.getElementById("costs").innerHTML = htmlContentToAppend;
}

function subtotal_costs(){
  let cart = JSON.parse(localStorage.cart)
  subtotalcosts = 0
  for (let i = 0; i < cart.length; i++) {
    const cantidad = cart[i].count;
    const precio = cart[i].unitCost;
    const currency = cart[i].currency;

    if (currency == "UYU") {
      subtotalcosts += Math.round (cantidad * precio * 24 / 1000);
    } else {
      subtotalcosts += cantidad * precio;
    }
  }
  document.getElementById("costs_subtotal").innerHTML = "USD " + subtotalcosts;
}

function changeshipping(i){
  shippingtype = i
  envios_costs()
}

function envios_costs(){
  shippingcosts = Math.round(subtotalcosts*(shippingtype/100))
  document.getElementById("costs_envio").innerHTML = "USD " + shippingcosts;
  total_costs()
}

function total_costs(){
  document.getElementById("costs_total").innerHTML = "USD " + (shippingcosts + subtotalcosts)
}

function buybutton(){
  let htmlContentToAppend = ``

  htmlContentToAppend = `
  <div class="row">
  <button class="btn btn-primary" type="button" id="btn.buy" onclick="buycheck()">Finalizar compra</button>
  </div>
  `
  document.getElementById("buy").innerHTML = htmlContentToAppend
}

function buycheck(){
  const check1 = document.getElementById("calle").value;
  const check2 = document.getElementById("numero").value;
  const check3 = document.getElementById("esquina").value;
  let checked = 0
  
  if (check1 == ""){
    document.getElementById("calle").classList.add("is-invalid");
  } else {
    document.getElementById("calle").classList.remove("is-invalid");
    checked += 1
  }
  if (check2 == ""){
    document.getElementById("numero").classList.add("is-invalid");
  } else {
    document.getElementById("numero").classList.remove("is-invalid");
    checked += 1
  }
  if (check3 == ""){
    document.getElementById("esquina").classList.add("is-invalid");
  } else {
    document.getElementById("esquina").classList.remove("is-invalid");
    checked += 1
  }
  
  if (checked == 3) {
    let htmlContentToAppend = `
    <div class="alert alert-success alert-dismissible fade show" role="alert">
      Has comprado con exito!
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    `
    document.getElementById("alert").innerHTML = htmlContentToAppend
  }
}