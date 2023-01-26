function getAccumulatedOffset(chid) {
    var ret = 0;
    for (var x = 0; x < Array.from(chid.parentNode.children).indexOf(chid); x++){
        ret += chid.parentNode.children[x].offsetLeft;
        console.log(chid.parentNode.children[x]);
    }
    return ret;
}

function carouselScrollTo(carousel, whichOne) {
    Array.from(carousel.children).forEach((item, i) => {
        item.classList.remove("show");
    });
    carousel.children[whichOne].classList.add("show");
    carousel.scrollTo({
        left: carousel.children[whichOne].offsetLeft - window.innerWidth/2 + carousel.children[whichOne].width/2,//getAccumulatedOffset(carousel.children[whichOne]),
        top: 0,
        behavior: "smooth"
    });
}

var ua = window.navigator.userAgent;
var iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i); // THANKS, STACKOVERFLOW

if (iOS) { // Polyfill the parallax
    window.onresize = () => {
        Array.from(document.getElementsByClassName("parallax")).forEach((item, i) => {
            item.classList.add("nopara");
            if (window.innerHeight > window.innerWidth) {
                item.style.backgroundSize = "auto 100vh";
            }
            else {
                item.style.backgroundSize = "100vw auto";
            }
        });
    };
    window.onresize();
}

window.onload = () => {
    var shadowBoi = document.getElementById("shadowboi");
    Array.from(document.getElementsByClassName("shadowbox")).forEach((item) => {
        item.onclick = () => {
            shadowBoi.innerHTML = item.innerHTML;
            shadowBoi.classList.add("show");
            document.documentElement.style.overflow = "hidden";
        };
    });
    shadowBoi.onclick = () => {
        shadowBoi.classList.remove("show");
        document.documentElement.style.overflow = "auto";
    };
    var onWheel = () => {
        Array.from(document.getElementsByClassName("text")).forEach((text) => {
            var box = text.getBoundingClientRect();
            if (box.bottom > 20 && box.top < window.innerHeight - 20) {
                text.classList.add("scrolld");
            }
            else {
                text.classList.remove("scrolld");
            }
        });
        if (iOS) {
            Array.from(document.getElementsByClassName("parallax")).forEach((item, i) => {
                item.style.backgroundPosition = "50% calc(" + (-item.getBoundingClientRect().top) + "px)";
            });
        }
    };


    Array.from(document.getElementsByClassName("carousel")).forEach((item, i) => {
        var kids = Array.from(item.children);
        item.innerHTML = "";
        while (kids.length > 0) {
            var dex = Math.floor(Math.random() * kids.length);
            item.appendChild(kids[dex]);
            kids.splice(dex, 1);
        }
        var pz = 0;
        setInterval(() => {
            pz++;
            if (pz >= item.children.length) {
                pz = 0;
            }
            carouselScrollTo(item, pz);
        }, 3000);
        carouselScrollTo(item, 0);
    });

    window.addEventListener("scroll", onWheel);

    onWheel();
};


function contact() {
    
}