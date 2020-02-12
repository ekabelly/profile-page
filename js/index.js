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
            window.onscroll = function(){
                handleScroll(imgHeight);
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
}