const subMenuBtn = document.querySelectorAll('.nav-menu');
const subMenuBtns = document.querySelector('.nav-container');
const subMenuContainer = document.querySelector('.header-sub-menu-container')
const modal = document.querySelector('.modal');
const observeReady = document.querySelectorAll('.observe-ready');
const firstSectionImgContainer = document.querySelector('.first-section-img-container');
const shoesItemContainer = document.querySelector('.shoes-items');

const documentHeight = document.body.scrollHeight;
const ACTIVE = 'active';

let firstSectionSpeed = 1;
let shoesContainerSpeed = 1;

function showContent(){
    const io = new IntersectionObserver((item, observe) => {
        for(let i=0; i<item.length; i++){
            if(item[i].isIntersecting){
                item[i].target.classList.add(ACTIVE);
            }
            else{
                item[i].target.classList.remove(ACTIVE);
            }
        }
    });
    for(let i=0; i<observeReady.length; i++){
        io.observe(observeReady[i]);
    }
}

function setSubMenuIndex(){
    for(let i=0; i<subMenuBtn.length; i++){
        subMenuBtn[i].dataset.index = i;
    }
}

function loadingPageRemove(){
    document.body.classList.add(ACTIVE);
}

function setModal(){
    modal.style.height = `${documentHeight}px`;
}

function showSubMenu(targetIndex){
    subMenuContainer.innerHTML = subMenuData[targetIndex];
    setModal();
    modal.classList.add(ACTIVE);
    subMenuContainer.classList.add(ACTIVE);

    document.body.addEventListener('mouseover', (e) => {
        let target = e.target;

        if(target === modal){
            modal.classList.remove(ACTIVE);
            subMenuContainer.classList.remove(ACTIVE);
        }
    })
}

function contentAutoScroll(){
    const scrollAmount = firstSectionImgContainer.scrollWidth - firstSectionImgContainer.clientWidth
    const shoesItemScrollAmount = shoesItemContainer.scrollWidth - shoesItemContainer.clientWidth;

    firstSectionImgContainer.scrollLeft += firstSectionSpeed;
    shoesItemContainer.scrollLeft += shoesContainerSpeed;

    if(firstSectionImgContainer.scrollLeft === scrollAmount){
        firstSectionSpeed *= -1;
    }
    else if(firstSectionImgContainer.scrollLeft === 0){
        firstSectionSpeed *= -1;
    }

    if(shoesItemContainer.scrollLeft === shoesItemScrollAmount){
        shoesContainerSpeed *= -1;
    }
    else if(shoesItemContainer.scrollLeft === 0){
        shoesContainerSpeed *= -1;
    }

    window.requestAnimationFrame(contentAutoScroll);
}

window.addEventListener('load', () => {
    setSubMenuIndex();
    loadingPageRemove();
    showContent();
    contentAutoScroll();
});

subMenuBtns.addEventListener('mouseover', (e) => {
    let target = e.target;
    if(target === subMenuBtns){
        return;
    }
    while(!target.dataset.index){
        target = target.parentNode;
    }

    let targetIndex = parseInt(target.dataset.index);
    showSubMenu(targetIndex);
});



