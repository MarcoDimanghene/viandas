const left = document.getElementById('left');
const right = document.getElementById('right');
const cards = document.querySelector('.cards');
//SCROLL
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