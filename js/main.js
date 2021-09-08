function loadingPageRemove(){
    document.body.classList.add('active');
}

window.addEventListener('load', () => {
    loadingPageRemove();
})