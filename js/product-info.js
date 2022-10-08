document.addEventListener("DOMContentLoaded", function(){
    getJSONData(PRODUCT_INFO_URL + localStorage.ProdID + ".json").then(function(resultObj){
        if (resultObj.status === "ok"){
            currentInfoArray = resultObj.data;
            showInfo();
            showRelated()
        }
    });

    function showInfo(){
        let htmlContentToAppend = "";
        let product = currentInfoArray

        htmlContentToAppend = `
        <div class="row">
        <div class="col-4">
            <br>
            <h2 class="mb-4">${product.name}</h2>
            <strong class="mb-1">Precio:</strong>
            <p class="mb-3">${product.cost + product.currency}</p>
            <strong class="mb-1">Descripcion:</strong>
            <p class="mb-3">${product.description}</p>
            <strong class="mb-1">Categoria:</strong>
            <p class="mb-3">${product.category}</p>
            <strong class="mb-1">Cantidad Vendidos:</strong>
            <p class="mb-3">${product.soldCount} artículos</p>  
            <strong class="mb-1">Imagenes Ilustrativas:</strong>
        </div>
        </div>
        <div class="col-3">
            <div class="d-flex w-100 justify-content-between">
        `

        for(let i = 0; i < product.images.length; i++){
            htmlContentToAppend += `
            <img src="${product.images[i]}" alt="product image" class="img-thumbnail">
            `
        };

        htmlContentToAppend += `
            </div>
        </div>
        `
        document.getElementById("Info").innerHTML = htmlContentToAppend;

    }


    
    getJSONData(PRODUCT_INFO_COMMENTS_URL + localStorage.ProdID + ".json").then(function(resultObj){
        if (resultObj.status === "ok"){
            currentComentsArray = resultObj.data;
            showComents()
        }
    });

    function showComents(){
        let htmlContentToAppend = ""

        htmlContentToAppend = `
        <div class="col-10">
            <br>
            <h2 class="mb-4">Comentarios:</h2>
            `
        
        for (let i = 0; i < currentComentsArray.length; i++) {
            let comentario = currentComentsArray[i];

            htmlContentToAppend += `
            <strong class="mb-1">${comentario.user}</strong>
            <small class="mb-1">${comentario.dateTime}</small>
            `;

            for (let j = 0; j < 5; j++) {
                if (j < comentario.score) {
                    htmlContentToAppend += `<small class="fa fa-star checked"></small>`
                    }else {
                    htmlContentToAppend += `<small class="far fa-star"></small>`
                }    
            }

            htmlContentToAppend += `
            <br>
            <small class="mb-3">${comentario.description}</small>
            <br>
            <br>
            `            
        }
        document.getElementById("Coments").innerHTML = htmlContentToAppend;
    }

    function showRelated(){
        let relatedProducts = currentInfoArray.relatedProducts
        console.log(relatedProducts)
        let htmlContentToAppend = ""

        for (let i = 0; i < relatedProducts.length; i++) {
            let object = relatedProducts[i];
            htmlContentToAppend += `
            <figure class="figure" onclick="redirect(${object.id})">
            <img src="${object.image}" width="150" class="figure-img img-fluid rounded" alt="related product image.">
            <figcaption class="figure-caption">${object.name}</figcaption>
            </figure>
            `
        }
        document.getElementById("Related").innerHTML = htmlContentToAppend;
    }

})

function redirect(id){
    localStorage.ProdID = id;
    location.reload()
}