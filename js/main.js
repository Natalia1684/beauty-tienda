let totalizador=0;
let id = 1;
let cantidadPrevia = [1];

//Animación del título con Jquery y escucha del evento click//
$(document).ready(function(){
    let containerProductos =document.querySelector('.card-body');
    let carritoCompras= document.querySelectorAll ('.boton');;
    carritoCompras.forEach((botonesCards => {
    botonesCards.addEventListener("click",botonClick);
    }));
    $('.Titulo').animate({
        'font-size':'40px',
        'padding-left':'30%',
            
    },4000, function(){
        $('.logo').animate({
            'height':'100px', 
        }, 3000);   
    });
    });

//Boton Comprar//
let comprarButton = document.querySelector(".comprarButton");
comprarButton.addEventListener('click', comprarButton =>{
    alert("Realizaste tu compra!")
})
   
let contenidoCard = document.querySelector('.contenidoCard');

function botonClick(e){
    let button= e.target;
    let card= button.closest('.card');
    let cardTitle= card.querySelector('.card-text').textContent;
    let cardImg= card.querySelector('.card-img-top').src;
    let cardPrice=card.querySelector('.card-price').textContent;

carrito(cardTitle,cardImg, cardPrice);
}

function carrito(cardTitle,cardImg,cardPrice){
    console.log(cardTitle,cardImg,cardPrice);

    let productosAgregados =document.createElement('div');
    let carritoContainer = `
        <div class="row shoppingCartItem">
        <div class="col-6">
            <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <img src=${cardImg} class="shopping-cart-image">
                <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate ml-3 mb-0">${cardTitle}</h6>
            </div>
        </div>
        <div class="col-2">
            <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
                <p class="item-price mb-0 shoppingCartItemPrice${id}">${cardPrice}</p>
            </div>
        </div>
        <div class="col-4">
            <div
                class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-3">
                <input class="shopping-cart-quantity-input shoppingCartItemQuantity${id}" type="number"
                    value="1">
                <button class="btn btn-danger buttonDelete${id}" type="button">X</button>
            </div>
        </div>
    </div>`;
    productosAgregados.innerHTML = carritoContainer;
    contenidoCard.append(productosAgregados);
    
   //Remove de elementos agregados//

   $(`.buttonDelete${id}`).click(function (e){
       let botonClicked = e.target;
       let idDelete = e.target.className.substr(27);
       let precio = parseInt($(`.shoppingCartItemPrice${idDelete}`).html().substr(1));
       let cantidadActual = parseInt($(`.shoppingCartItemQuantity${idDelete}`).val());
       totalizador -= (precio*cantidadActual);
       $(".shoppingCartTotal").html(` $${totalizador}`);
       botonClicked.closest('.shoppingCartItem').remove();
    });
    
       total(cardPrice);

     //Cantidades//

     console.log(id);
     productosAgregados.querySelector(`.shoppingCartItemQuantity${id}`).addEventListener('change',(e) => {
        console.log(cantidadPrevia);
        let cantidad = (parseInt(e.target.value));
        let idCantidad = e.target.className.substr(53);
        console.log(cantidadPrevia[idCantidad-1]);
        if (id>cantidadPrevia.length){
            cantidadPrevia.push(1)
        }
        let precio = parseInt($(`.shoppingCartItemPrice${idCantidad}`).html().substr(1));
        totalizador +=(precio*(cantidad-cantidadPrevia[idCantidad]));
        $(".shoppingCartTotal").html(`$${totalizador}`);
        cantidadPrevia[idCantidad]=cantidad;
    });
    id++;
   
}
       
 //Se define el total a cobrar//

function total(precio){
   totalizador += parseInt(precio.substr(1));
    console.log(totalizador);
    $(".shoppingCartTotal").html(` $${totalizador}`);
    
};

//Se quitan elementos del carrito//
function remover(e){
    let botonClicked = e.target
    botonClicked.closest('.shoppingCartItem').remove(cantidadPrevia);
    total(-precio);

}




    








