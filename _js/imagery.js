const images = document.querySelectorAll('img');

images.forEach(image => {
    image.addEventListener('load', () => {
        image.classList.remove('loading');
        image.classList.add('loaded');
    });
});