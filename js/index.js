// 새로고침 시, scroll 맨 위로 이동
window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);
});

document.addEventListener('DOMContentLoaded', () => {

      window.scrollTo(0, 0);


    // intro / scroll-fixed
    document.documentElement.classList.add('scroll-stop');

    // 🌟 sc-home
    
    // 1. sc-home / title split
    const mainTitle = document.querySelector('.sc-home h2');
    const splitWord = mainTitle.textContent.split('');
    // console.log(splitWord);
    const textWrap = splitWord.map((char) => {
        return `<span class="char">${char}</span>`
    }).join('');
    mainTitle.innerHTML = textWrap;

    // 2. title 노출 모션
    const mainChar = mainTitle.querySelectorAll('.char');
    const subChar = document.querySelectorAll('.sc-home .group-title .text-label');
    const mainFigure = document.querySelector('.sc-home .group-figure .content-box:first-child .main-frame');

    gsap.set('.sc-home .title-inner',{width:"100%"});
    gsap.set(mainTitle, {height:0});
    gsap.set(mainChar, {y:40, autoAlpha:0});
    gsap.set(subChar,{yPercent:100, autoAlpha:0});
    gsap.set(mainFigure, {scale:0, autoAlpha:0});

    const mainTitleShow = gsap.timeline();
    mainTitleShow
    .to(subChar,{yPercent:0, autoAlpha:1, stagger:0.4},"+0.3")
    .to('.sc-home .title-inner',{width:"auto",
        onComplete:() => {
                document.documentElement.classList.remove('scroll-stop');
        }
    })
    .to(mainTitle, {height:"auto"},"<")
    .to(mainChar,{y:0, autoAlpha:1, stagger: 0.07})
    .to(mainFigure,{scale:0.8, autoAlpha:1},"<");
});


// frame scale + overlay
const mainFigure = document.querySelector('.sc-home .group-figure .content-box:first-child .main-frame');
const frameScale = gsap.timeline({
  scrollTrigger: {
    trigger: ".sc-home .group-title",
    start: () => `${window.innerHeight * 0.55}px top`,
    end: "bottom top",
    scrub: 1,
    // markers: true,
  }
});
frameScale
.to(mainFigure,{scale:1},"<")
.to('.sc-home .img-sequence .overlay',{autoAlpha:0},"<");


// sequence -> best cut 전환 + film data 노출
gsap.set(mainFigure.querySelector('.frame-title'),{yPercent:100});
gsap.set(mainFigure.querySelector('.frame-data'),{yPercent:-100});

const mainBest = gsap.timeline({
    scrollTrigger:{
        trigger:".sc-home .content-box:first-child",
        start:() => `${window.innerHeight * 1.2}px top`,
    end: () => `${window.innerHeight * 1.8}px top`,
        // end:() => `${window.innerHeight}px top`,
        scrub:1,
        markers:true
    }
});

mainBest
.to(mainFigure.querySelector('.img-sequence'),{yPercent:-100},"<")
.to(mainFigure.querySelector('.img-best'),{yPercent:-100},"<")

;


// main frame 가로 스크롤
const mainContent = document.querySelectorAll('.sc-home .content-box');
const mainScroll = document.querySelector('.sc-home .main-scroll');
const totalContent = mainContent.length;
const step = 100 / totalContent; // 각 패널당 xPercent 이동 비율 (퍼센트)


// 1) x축 스크롤 (pin)
ScrollTrigger.create({
    trigger: ".sc-home .sticky-wrap",
    start: "top top",
    end: () => `+=${window.innerHeight * totalContent}`,
    pin: true,
});

// 2) x축 스크롤 (모션)
const mainFrame = gsap.timeline({
  scrollTrigger: {
    trigger: ".sc-home",
    start: () => `${window.innerHeight * 1}px top`,
    end: "100% 100%",
    scrub: 2,
    // markers: true,
    invalidateOnRefresh: true
  }
});

// for(let i = 1; i < totalContent; i++) {
//   mainFrame.to('.sc-home .main-scroll', { xPercent: -step * i });
// }

    // const mainFrame = gsap.timeline({
    //     scrollTrigger:{
    //         trigger:".sc-home .sticky-wrap",
    //         start:"0% 0%",
    //         end: "+=3000",
    //         markers:true,
    //         pin:true,
    //         scrub:1,
    //         invalidateOnRefresh:true
    //     }
    // });

    // mainFrame
    // .to('.sc-home .main-scroll',{xPercent:-33.33})
    // .to('.sc-home .main-scroll',{xPercent:-66.66});




    // main img sequence
    const sequenceImgs = document.querySelectorAll('.sc-home .img-sequence img');
    
    sequenceImgs.forEach((img, i) => {
        setTimeout(() => {
            const activeImg = document.querySelector('.sc-home .img-sequence img.active');
            if(activeImg){
                activeImg.classList.remove('active');
            }

            img.classList.add('active');
        }, 600 * i);
    });

    setInterval(() => {
        sequenceImgs.forEach((img, i) => {
        setTimeout(() => {
            const activeImg = document.querySelector('.sc-home .img-sequence img.active');
            if(activeImg){
                activeImg.classList.remove('active');
            }

            img.classList.add('active');
        }, 600 * i);
    });
    },sequenceImgs.length * 600);