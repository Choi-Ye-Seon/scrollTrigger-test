// header
const html = document.querySelector('html');
const header = document.querySelector('#header');
const menuOpenBtn = header.querySelector('.btn--nav.open');
const menuCloseBtn = header.querySelector('.btn--nav.close');

const nav = document.querySelector('#nav');
const menuText = nav.querySelectorAll('.text-label');
const menuLines = nav.querySelectorAll('.nav__menuitem .line');
const menuItems = nav.querySelectorAll('.nav__menuitem');

gsap.set(nav,{yPercent:100, autoAlpha:0});
gsap.set(menuLines,{width:0});
gsap.set(menuText, {yPercent:100});

// menu open
menuOpenBtn.addEventListener('click',function(){
    header.classList.add('menu-open');
    html.classList.add('fixed');

    // nav show
    const navShow = gsap.timeline();

    navShow
    .to(nav, 0, {yPercent:0, autoAlpha:1})
    .to(menuText,0,{yPercent:0 },"<+0.15")
    .to(menuLines,0, {width:'100%'},"<+0.17")
    .to(header,0.2,{color:"#fff"},"<-0.1")
    .to('#header .line',0.1,{backgroundColor:"#fff"},"<-0.1")
    ;
});

// menu close
menuCloseBtn.addEventListener('click',function(){
    header.classList.remove('menu-open');
    html.classList.remove('fixed');

    // nav hide
    const navHide = gsap.timeline();
    navHide
    .to(nav, 0,{yPercent:100})
    .to(header,0.1,{color:"#111"},"header")
    .to('#header .line',0.1,{backgroundColor:"#111"},"header")
    .to(menuLines,0,{width:0})
    .to(menuText,{yPercent:100});
});

// menu hover
menuItems.forEach((menu) => {
    menu.addEventListener('mouseenter', () => {
        menu.classList.add('active');
        
        menuItems.forEach((el) => {
            if(el !== menu){
                el.classList.add('dimed');
            }
        });
    });

    menu.addEventListener('mouseleave', () => {
        menuItems.forEach((el) => {
            el.classList.remove('active', 'dimed');
        });
    });
});