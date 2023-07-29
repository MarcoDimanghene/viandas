const left = document.getElementById('left');
const right = document.getElementById('right');
const cards = document.getElementById('cards');
const inicio = document.getElementById('contenedorInicio');
const h2inicio= document.getElementById('h2inicio');
const barsMenu= document.querySelector('.navar');
const cartMenu = document.querySelector(".cart");
const menuBtn =document.querySelector(".menubars");
const cartBtn = document.getElementById("cartbtn");
const cruz = document.getElementById("cruz");
const overlay = document.querySelector(".overlay");
const successModal = document.querySelector(".add-modal");
const deleteBtn = document.querySelector(".btn-delete");
const buyBtn = document.querySelector(".btn-buy");

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
            <h3>$ ${precio}</h3>
        </div>
        <button class="btn-add"
            data-id='${id}'
            data-name='${name}'
            data-bid='${precio}'
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
        data-bid='${precio}'
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
    successModal.classList.add ("active-modal");
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
}
init()