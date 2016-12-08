(function ($) {
    var pushy = $('.pushy'), //menu css class
        body = $('body'),
        container = $('#container'), //container css class
        push = $('.push'), //css class to add pushy capability
        pushyLeft = 'pushy-left', //css class for left menu position
        pushyOpenLeft = 'pushy-open-left', //css class when menu is open (left position)
        pushyOpenRight = 'pushy-open-right', //css class when menu is open (right position)
        siteOverlay = $('.site-overlay'), //site overlay
        menuBtn = $('.menu-btn, .pushy-link'), //css classes to toggle the menu
        menuSpeed = 300, //jQuery fallback menu speed
        menuWidth = pushy.width() + 'px', //jQuery fallback menu width
        submenuClass = '.pushy-submenu',
        submenuOpenClass = 'pushy-submenu-open',
        submenuClosedClass = 'pushy-submenu-closed',
        submenu = $(submenuClass);

    function togglePushy(isLinkClicked){
        //add class to body based on menu position
        if( pushy.hasClass(pushyLeft) ){
            body.toggleClass(pushyOpenLeft);
        }else{
            if (!isLinkClicked) {
                body.toggleClass(pushyOpenRight);
            }
        }
    }

    function openPushyFallback(){

        //animate menu position based on CSS class
        if( pushy.hasClass(pushyLeft) ){
            body.addClass(pushyOpenLeft);
            pushy.animate({left: "0px"}, menuSpeed);
            container.animate({left: menuWidth}, menuSpeed);
            //css class to add pushy capability
            push.animate({left: menuWidth}, menuSpeed);
        }else{
            body.addClass(pushyOpenRight);
            pushy.animate({right: '0px'}, menuSpeed);
            container.animate({right: menuWidth}, menuSpeed);
            push.animate({right: menuWidth}, menuSpeed);
        }

    }

    function closePushyFallback(){

        //animate menu position based on CSS class
        if( pushy.hasClass(pushyLeft) ){
            body.removeClass(pushyOpenLeft);
            pushy.animate({left: "-" + menuWidth}, menuSpeed);
            container.animate({left: "0px"}, menuSpeed);
            //css class to add pushy capability
            push.animate({left: "0px"}, menuSpeed);
        }else{
            body.removeClass(pushyOpenRight);
            pushy.animate({right: "-" + menuWidth}, menuSpeed);
            container.animate({right: "0px"}, menuSpeed);
            push.animate({right: "0px"}, menuSpeed);
        }

    }

    function toggleSubmenu(){
        //hide submenu by default
        $(submenuClass).addClass(submenuClosedClass);

        $(submenuClass).on('click', function(){
            var selected = $(this);

            if( selected.hasClass(submenuClosedClass) ) {
                //hide opened submenus
                $(submenuClass).addClass(submenuClosedClass).removeClass(submenuOpenClass);
                //show submenu
                selected.removeClass(submenuClosedClass).addClass(submenuOpenClass);
            }else{
                //hide submenu
                selected.addClass(submenuClosedClass).removeClass(submenuOpenClass);
            }
        });
    }

    function toggleSubmenuFallback(){
        //hide submenu by default
        $(submenuClass).addClass(submenuClosedClass);

        submenu.children('a').on('click', function(event){
            event.preventDefault();
            $(this).toggleClass(submenuOpenClass)
                .next('.pushy-submenu ul').slideToggle(300)
                .end().parent(submenuClass)
                .siblings(submenuClass).children('a')
                .removeClass(submenuOpenClass)
                .next('.pushy-submenu ul').slideUp(300);
        });
    }

    //checks if 3d transforms are supported removing the modernizr dependency
    var cssTransforms3d = (function csstransforms3d(){
        var el = document.createElement('p'),
            supported = false,
            transforms = {
                'webkitTransform':'-webkit-transform',
                'OTransform':'-o-transform',
                'msTransform':'-ms-transform',
                'MozTransform':'-moz-transform',
                'transform':'transform'
            };

        // Add it to the body to get the computed style
        document.body.insertBefore(el, null);

        for(var t in transforms){
            if( el.style[t] !== undefined ){
                el.style[t] = 'translate3d(1px,1px,1px)';
                supported = window.getComputedStyle(el).getPropertyValue(transforms[t]);
            }
        }

        document.body.removeChild(el);

        return (supported !== undefined && supported.length > 0 && supported !== "none");
    })();

    if(cssTransforms3d){
        //make menu visible
        pushy.css({'visibility': 'visible'});

        //toggle submenu
        toggleSubmenu();

        //toggle menu
        menuBtn.on('click', function(){
            var isLinkClicked = $(this).is('.pushy-link');

            togglePushy(isLinkClicked);
        });
        // close menu when clicking site overlay
        siteOverlay.on('click', function(){
            togglePushy();
        });
    }else{
        console.log('don\'t have cssTransforms3d');
        //add css class to body
        body.addClass('no-csstransforms3d');

        //hide menu by default
        if( pushy.hasClass(pushyLeft) ){
            pushy.css({left: "-" + menuWidth});
        }else{
            pushy.css({right: "-" + menuWidth});
        }

        //make menu visible
        pushy.css({'visibility': 'visible'});
        //fixes IE scrollbar issue
        container.css({"overflow-x": "hidden"});

        //keep track of menu state (open/close)
        var opened = false;

        //toggle submenu
        toggleSubmenuFallback();

        //toggle menu
        menuBtn.on('click', function(){
            if (opened) {
                closePushyFallback();
                opened = false;
            } else {
                openPushyFallback();
                opened = true;
            }
        });

        //close menu when clicking site overlay
        siteOverlay.on('click', function(){
            if (opened) {
                closePushyFallback();
                opened = false;
            } else {
                openPushyFallback();
                opened = true;
            }
        });
    }
}(jQuery));


// Navigation for arrow down
$(document).ready(function() {
    var $goDown = $('.js-goDown'),
        $first = $('.js-fitst'),
        $nav = $('.js-nav'),
        $navLi = $nav.find('li'),
        $up = $('.js-up'),
        $mNav = $('li'),
        $link = $navLi.add($mNav),
        $parallax = $('.intro-text');

// Parallax for intro-text
    $(window).scroll(function () {

        var st = $(this).scrollTop();
        $('.intro-text').css({
            "transform": "translate(0%,"+ st/35 +"%"
        });
    });

// Navigation for button up
    var upIsVisible = false;

    $(window).scroll(function () {
        var scrollTop = $(this).scrollTop();
        toggleUpButton(scrollTop);
    });

    function toggleUpButton(scrollTop) {
        if (scrollTop > 500 && !upIsVisible) {
            $up.animate({'opacity': 1}, 300);
            upIsVisible = true;
        } else if (scrollTop <= 500 && upIsVisible) {
            $up.animate({'opacity': 0}, 300);
            upIsVisible = false;
        }
    }

    /* Canvas for skills */
    $('.chart').easyPieChart({
        easing: 'easeOutBounce',
        lineWidth: 5,
        size: 141,
        lineWidth: 8,
        barColor: '#2c3e50',
        trackColor: '#f9f9f9',
        scaleColor: '#ffffff',
        lineCap: 'square',
        onStep: function(from, to, percent) {
            $(this.el).find('.percent').text(Math.round(percent));
        }
    });

// Navigation for scroll menu
    $up.click(function(event) {
        event.preventDefault();

        var page = $(this).data().page;

        $('html, body').animate ({
            scrollTop: $('.js-section[data-page="' + page + '"]').offset().top
        },500);
    });

    $goDown.click(function(event) {
        event.preventDefault();

        var page = $(this).data().down;

        $('html, body').animate ({
            scrollTop: $('.js-fitst[data-down="' + page + '"]').offset().top
        },500);
    });

    $link.click(function(event) {
        event.preventDefault();

        var page = $(this).data().page;

        $('html, body').animate ({
            scrollTop: $('.js-section[data-page="' + page + '"]').offset().top
        },300);
    });


// Preloader for site
    $(window).on('load', function () {
            var $preloader = $('#p_prldr'),
                $svg_anm   = $preloader.find('.svg_anm');
            // $svg_anm.fadeOut();
            $preloader.delay(300).fadeOut('slow');
        });



    /* animation site */
//     var $portfolio = $('.portfolio');
//     var portfolioAnimateBlocker = false;
//     var wHeight = $(window).height();
//     $(window).scroll(function(){
//     if($portfolio.offset().top <= $(this).scrollTop() + 550 && !portfolioAnimateBlocker ){
//         portfolioAnimateBlocker  = true;
//         $portfolio.addClass('animation');
//     }
// });


}(jQuery));


