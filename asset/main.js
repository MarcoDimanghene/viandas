
const left = document.getElementById('left');
const right = document.getElementById('right');
const cards = document.querySelector('.cards');

//SCROLL
const scrollLeft = () => {
    cards.scrollTo({
    left: cards.scrollLeft - 140,
    behavior: 'smooth'
    });
};
const scrollRight = () => {
    cards.scrollTo({
    left: cards.scrollLeft + 140,
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
    const { id, name, precio, img } = menu;
    return `
    <div class="card" style="background-image: url('${img}'); background-size: cover;>
        <div class"txtmenu">
            <h4>${name}</h4>
            <h4>$ ${precio}</h4>
            <button class="btn-add"
            data-id='${id}'
            data-name='${name}'
            data-bid='${precio}'
            data-img='${img}'>Add</button>
        </div>
    </div>`;
    };

const init =() =>{
    displayMenu()
}
init()