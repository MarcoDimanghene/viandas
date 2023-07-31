const left = document.getElementById('left');
const right = document.getElementById('right');
const cards = document.getElementById('cards');
const inicio = document.getElementById('contenedorInicio');
const h2inicio= document.getElementById('h2inicio');
const total = document.querySelector(".total");
const barsMenu= document.querySelector('.navar');
const cartMenu = document.querySelector(".cart");
const productsCart = document.querySelector(".cart-container");
const menuBtn =document.querySelector(".menubars");
const cartBtn = document.getElementById("cartbtn");
const cruz = document.getElementById("cruz");
const overlay = document.querySelector(".overlay");
const deleteBtn = document.querySelector(".btn-delete");
const buyBtn = document.querySelector(".btn-buy");
const successModal = document.querySelector(".add-modal");

// Setear el array para el carro
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Funcion para guardar en el localStorage
const saveLocalStorage = (cartList) => {
    localStorage.setItem("cart",JSON.stringify(cartList));
};

//SCROLL
const scrollLeft = () => {
    cards.scrollTo({
    left: cards.scrollLeft - 180,
    behavior: 'smooth'
    });
};
const scrollRight = () => {
    cards.scrollTo({
    left: cards.scrollLeft + 180,
    behavior: 'smooth'
    });
};
left.addEventListener('click',scrollLeft)
right.addEventListener('click',scrollRight)

// Funcion para cerrar menu y carrito si scrolleamos
const closeOnScroll = () => {
    if (
        !cartMenu.classList.contains("open-cart") &
        !barsMenu.classList.contains("open-menu")
    )
        return;
    barsMenu.classList.remove("open-menu")
    cartMenu.classList.remove("open-cart");
    overlay.classList.remove("show-overlay");
};


// renderizo el menu en cards
const displayMenu = () => {
    cards.innerHTML = menuData.map(renderMenu).join("");
    };

const renderMenu =(menu)=>{
    const { id, name, precio, img, ingredientes, descripcion } = menu;
    return `
    <div class="card selec" id="cardMenu" data-id="${id}" 
    data-name="${name}"
    data-precio="${precio}"
    data-img="${img}"
    data-ingredientes="${ingredientes}"
    data-descripcion="${descripcion}" >
        <div class"txtmenu">
            <h4>${name}</h4>
            <img src="${img}" class="imgmenu1 selec" alt="${name}" data-id="${id}" 
            data-name="${name}"
            data-precio="${precio}"
            data-img="${img}"
            data-ingredientes="${ingredientes}"
            data-descripcion="${descripcion}">
            <h3 class="card-precio">$ ${precio}</h3>
        </div>
        <button class="btn-add"
            data-id='${id}'
            data-name='${name}'
            data-precio='${precio}'
            data-img='${img}'>Agregar</button>
    </div>`;
    };

const renderInicio = (data)=>{
    const { id, name, precio, img, descripcion, ingredientes } = data;
    return `
    <div data-id="${id}">
        <h2 class="menutitulo">${name}</h2>
    <div class="contenedorInicio">
        <img src="${img}" class="imgmenu" alt="${name}">
        <div>
        <p class="txtinicio"> <spam class="negrita">Descripción:</spam> ${descripcion}</p>
        <p class="txtinicio"> <spam class="negrita">Ingredientes: </spam>${ingredientes}</p>
        <p class="txtinicio, precio">$ ${precio}</p>
        <button class="btn-add"
        data-id='${id}'
        data-name='${name}'
        data-precio='${precio}'
        data-img='${img}'>Agregar</button>
        </div>
    </div>
    </div>`;
};
const creatDataHome = (id, name, precio, img, ingredientes, descripcion) => {
    return {id, name, precio, img, ingredientes, descripcion};
    
    
}
// Cargo el contenedor al ahcer click en la comida-- costo pero se hizo me falto el ; despues del return
const loadHome =(e) => {
    if (!e.target.classList.contains("selec")) return;
    const {id, name, precio, img, ingredientes, descripcion} = e.target.dataset;
    const produc = creatDataHome(id, name, precio, img, ingredientes, descripcion);
    //console.log(produc)
    const renderedProduct = renderInicio(produc);
    inicio.innerHTML = renderedProduct;
    h2inicio.classList.add('hidden')
};

const toggleCart = () => {
    cartMenu.classList.toggle("open-cart");
    overlay.classList.toggle("show-overlay");
};
const toggleMenu =()=>{
    barsMenu.classList.toggle("open-menu");
    overlay.classList.toggle("show-overlay");
};
const cruzcarro = () => {
    cartMenu.classList.remove("open-cart");
    overlay.classList.remove("show-overlay");
};

const showSuccessModal =(msg) => {
    successModal.classList.add("active-modal");
    successModal.textContent = msg;
    setTimeout(()=>{
        successModal.classList.remove("actvie-modal");
    },1500);
};
const disableBtn= (btn) =>{
    if(!cart.length) {btn.classList.add("disabled")} else{
        btn.classList.remove("disabled");
    }
};

const closeOnClick= (e) => {
    if(!e.target.classList.contains("navar-link")) return
    barsMenu.classList.remove("open-menu");
    overlay.classList.remove("show-overlay");
}
const closeOnOverlayClick =(e)=>{
    cartMenu.classList.remove("open-cart");
    barsMenu.classList.remove("open-menu");
    overlay.classList.remove("show-overlay");
};
//Carrito
const renderCartProduct= (cartProduct)=>{
    const {id, name, img, precio, quantity} =cartProduct;
    return `
    <div class="cont-cart">
        <img src="${img}" class="imgmenu5" alt="${name}">
        <div>
        <div class="carttxt">
            <h3 class="namecart">${name}</h3>
            <p class="txtcart, precio">$ ${precio}</p>
        <div>
        <div class="item-handler">
            <span class="quantity-handler down" data-id=${id}>-</span>
            <span class="item-quantity">${quantity}</span>
            <span class="quantity-handler up" data-id=${id}>+</span>
        </div>
    </div>
    `
};

const renderCart = () => { 
    if (!cart.length) {
    productsCart.innerHTML = `<p class="empty-msg">No hay productos en el carrito</p>`;
    return;
    }
    productsCart.innerHTML = cart.map(renderCartProduct).join("");
};

const getCartTotal= () =>{
    return cart.reduce((acc, cur) => acc + Number(cur.precio) * cur.quantity,0)
};

const showTotal = () => {
    return  cart.reduce = `${getCartTotal().toFixed(2)}`;
}

const createProducData =(id, name, precio, img) =>{
    return{id, name, precio, img};
};

const isExistingCartProduct =(produc) =>{
    return cart.find((item) => item.id === produc.id);
};
//Recorremos el carrito y cuando encuentra el producto el cual agregamos, sumamos una unidad.
const addUnitToProduct = (product) =>{
    cart = cart.map((cartProduct) =>{
        return cartProduct.id === product.id
        ? {...cartProduct, quantity: cartProduct.quantity + 1}
        : cartProduct;
    })
};

const createCartProduct = (product) => {
    cart = [...cart, {...product, quantity: 1}];
};

const checkCartState = () => {
    saveLocalStorage(cart);
    renderCart(cart);
    showTotal(cart);
    disableBtn(buyBtn);
    disableBtn(deleteBtn);
};

const addProduct=(e)=>{
    if(!e.target.classList.contains("btn-add")) return;
    const {id, name, precio, img} = e.target.dataset;
    const produc =createProducData(id, name, precio, img);
    if (isExistingCartProduct(produc)){
        //añade
        addUnitToProduct(produc)
        //mostrar se agrego
        showSuccessModal("Se agregó una unidad del producto al carrito");
    } else{
        //crear producto
        createCartProduct(produc)
        //mostrar que se agrego
        showSuccessModal("El producto se ha agregado al carrito");
    }
    checkCartState();
};

const init =() =>{
    displayMenu();
    cards.addEventListener('click', loadHome);
    cartBtn.addEventListener('click', toggleCart);
    menuBtn.addEventListener('click', toggleMenu);
    cruz.addEventListener('click',cruzcarro);
    window.addEventListener('scroll', closeOnScroll);
    disableBtn(deleteBtn);
    disableBtn(buyBtn);
    barsMenu.addEventListener('click',closeOnClick);
    overlay.addEventListener('click',closeOnOverlayClick);
    document.addEventListener("DOMContentLoaded", renderCart);
    document.addEventListener("DOMContentLoaded", showTotal);
    inicio.addEventListener('click', addProduct);
    cards.addEventListener('click', addProduct);
}
init()