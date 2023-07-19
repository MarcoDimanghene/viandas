
const left = document.getElementById('left');
const right = document.getElementById('right');
const cards = document.getElementById('cards');
const inicio = document.getElementById('contenedorInicio');
const h2inicio= document.getElementById('h2inicio');

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
left.addEventListener('click',(scrollLeft))
right.addEventListener('click',scrollRight)
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
            <img src="${img}" class="imgmenu selec" alt="${name}" data-id="${id}" 
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
    <div class="contenedorInicio" data-id="${id}">
    <div class"contMenu">
        <h2>${name}</h2>
        <img src="${img}" class="imgmenu" alt="${name}">
        <h3>descripción: ${descripcion}</h3>
        <h3>Ingredientes: ${ingredientes}</h3>
        <h3>$ ${precio}</h3>
    </div>
    <button class="btn-add"
        data-id='${id}'
        data-name='${name}'
        data-bid='${precio}'
        data-img='${img}'>Agregar</button>
    </div>`;
    
};
const creatDataHome = (id, name, precio, img, ingredientes, descripcion) => {
    return {id, name, precio, img, ingredientes, descripcion};
    
    
}

const loadHome =(e) => {
    if (!e.target.classList.contains("selec")) return;
    const {id, name, precio, img, ingredientes, descripcion} = e.target.dataset;
    const produc = creatDataHome(id, name, precio, img, ingredientes, descripcion);
    console.log(produc)
    const renderedProduct = renderInicio(produc);
    inicio.innerHTML = renderedProduct;
    h2inicio.classList.add('hidden')
};

const init =() =>{
    displayMenu();
    cards.addEventListener('click', loadHome);

}
init()