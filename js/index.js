window.onload = function(){
    new PageSetup();
}
var FIXED = 'fixed';
var PROFILE_PIC_SRC_ARR = [
    'profile-pic-lazy-worst.jpg', 
    'profile-pic-lazy.png',
    'profile-pic.png'
];

function PageSetup(){
    var state = {
        profilePicLoadingPhase: 0,
        isMobile: window.innerWidth <= 640
    }
    main();

    function main(){
        var imgHeight = setImg() + 1;
        if(!state.isMobile){
            // if desktop
            window.onscroll = function(){
                handleScroll(imgHeight);
            }
        } else {
            // if mobile, only add animations on scroll
            window.onscroll = function(){
                collectElmntsToAnimate();
            }
        }
        handleClickListeners(imgHeight);
    }

    function handleClickListeners(imgHeight){
        document.querySelector('#arrow-down').addEventListener('click', function(){
                smoothScrollTo(imgHeight);
        });
        document.querySelector('#profile-link').addEventListener('click', function(){
                smoothScrollTo(imgHeight);
        });
        document.querySelector('#xp-link').addEventListener('click', function(){
                smoothScrollTo(imgHeight + document.querySelector('.profile-section').getBoundingClientRect().height);
        });
    }

    function setImg(){
        handleLazyLoading();
        var imgHeight = document.querySelector('#profile-pic').height;
        var picSection = document.querySelector('section.img-section');
        if(picSection){
            picSection.setAttribute('style', `height: ${imgHeight}px;`);
        }
        return imgHeight;
    }

    function handleScroll(imgHeight){
        handleProfilePicOnScroll(imgHeight);
        handleNavOnScroll(imgHeight);
        collectElmntsToAnimate();
    }

    function handleProfilePicOnScroll(imgHeight){
        var height = window.innerHeight + window.pageYOffset;
        var profilePic = document.querySelector('#profile-pic');
        var arrow = document.querySelector('#arrow-down');
        if(height < imgHeight && profilePic.style.position === FIXED){
            profilePic.setAttribute('style', `position: absolute;`);
            arrow.setAttribute('style', `position: fixed;`);
        }
        if(height > imgHeight && profilePic.style.position !== FIXED){
            profilePic.setAttribute('style', `position: fixed; top: calc(100vh - ${imgHeight}px);`);
            arrow.setAttribute('style', `position: absolute;`);
        }
    }

    function handleNavOnScroll(imgHeight){
        var nav = document.querySelector('.nav');
        if(window.pageYOffset > imgHeight -  87.5){
            var style = 'position: fixed; top: 87.5px; bottom: auto;';
            if(window.pageYOffset > (imgHeight - 175 + document.querySelector('.profile-section').getBoundingClientRect().height)){
                style += 'color: rgba(243, 239, 224, 1)';
            }
            nav.setAttribute('style', style);
        } else {
            nav.setAttribute('style', 'position: absolute; color: rgba(255, 255, 255, 0.8);');
        }
    }

    function collectElmntsToAnimate(){
        const elmntsArr = document.querySelectorAll('.to-be-faded');
        for (const elmnt of elmntsArr) {
            handleAnimationOnScroll(elmnt);
        }
    }

    function handleAnimationOnScroll(elmnt){
        try {
            // const elmnt = document.querySelector(selector);
            const {height, y} = elmnt.getBoundingClientRect();
            if(((height + y) - (height * 2 / 3)) < window.innerHeight){
                elmnt.classList.add('fade-in-bottom');
                if(elmnt.tagName === 'IMG'){
                    setTimeout(function(){
                        // removing class after animation so other animations can be applied.
                        removeAnimationClass(elmnt);
                    }, 1000);
                }
            }
        }catch (e){
            console.log(e);
        }
    }

    function smoothScrollTo(top){
        window.scrollTo({ top, behavior: 'smooth' });
    }

    function handleLazyLoading(){
        const pic = document.querySelector('#profile-pic');
        if(pic.complete){
            profilePicLoaded(pic);
        }
        pic.onload = function(){
            profilePicLoaded(pic);
        }
    }

    function profilePicLoaded(pic){
        state.profilePicLoadingPhase++;
        if(PROFILE_PIC_SRC_ARR[state.profilePicLoadingPhase]){
            pic.src = `./assets/img/${PROFILE_PIC_SRC_ARR[state.profilePicLoadingPhase]}`;
        }
    }

    function removeAnimationClass(elmnt){
        elmnt.classList.remove('fade-in-bottom');
        elmnt.classList.remove('to-be-faded');
    }
}