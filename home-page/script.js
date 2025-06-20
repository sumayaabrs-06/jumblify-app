// Enable horizontal scrolling with mouse wheel
const cardsContainer = document.getElementById('cardsContainer');

cardsContainer.addEventListener('wheel', function(e) {
    if (e.deltaY !== 0) {
        e.preventDefault();
        this.scrollLeft += e.deltaY;
    }
});

// Touch scrolling for mobile devices
let isDown = false;
let startX;
let scrollLeft;

cardsContainer.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - cardsContainer.offsetLeft;
    scrollLeft = cardsContainer.scrollLeft;
    cardsContainer.style.cursor = 'grabbing';
});

cardsContainer.addEventListener('mouseleave', () => {
    isDown = false;
    cardsContainer.style.cursor = 'grab';
});

cardsContainer.addEventListener('mouseup', () => {
    isDown = false;
    cardsContainer.style.cursor = 'grab';
});

cardsContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - cardsContainer.offsetLeft;
    const walk = (x - startX) * 2;
    cardsContainer.scrollLeft = scrollLeft - walk;
});

// Set initial cursor
cardsContainer.style.cursor = 'grab';