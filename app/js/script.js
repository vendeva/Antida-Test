
$(document).ready(function() {
    $('.nav-list__item:first-child').on('click', function () {
        $('.nav-list__item_text').toggleClass("active");
        $('.main').toggleClass("active");
    });

    $('.nav-list__burger').on('click', function () {
        $('.nav-text').removeClass("active");
        $('.nav-mobile').toggleClass("active");
        $('.main').toggleClass("active");
        if (!$('.nav-mobile.active')[0] && $('.main.active')[0]) {$('.main').removeClass("active");}
    });

    $('.main.active').on('click', function () {    	
    	$('.nav-list__item_text').removeClass("active");
        $('.main').removeClass("active");
    });

    $('.nav-mobile__item:first-child').on('click', function () {
        $('.nav-text').toggleClass("active");
    });


    $('.nav-list__item a').click( function(){
        const scroll_el = $(this).attr('href');
        if ($(scroll_el).length != 0) {
            $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 1000);
        }
        return false;
    });

    $('.nav-mobile__item a').click( function(){
        const scroll_el = $(this).attr('href');
        if ($(scroll_el).length != 0) {
            $('.main').removeClass("active");
            $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 1000);
        }
        return false;
    });

    $('.place .nav-link').click( function() {
        $('.place__map').toggleClass("active");
    });

    $('.slide').slick({
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: true
    });

    $('.work').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: true,
        autoplay: true,
        adaptiveHeight: true,
        autoplaySpeed: 4000
    });

    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.footer__text_icon').fadeIn();
        } else {
            $('.footer__text_icon').fadeOut();
        }
    });
    $('.footer__text_icon').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 1000);
        return false;
    });
});

















    $(document).ready(function() {
        if ($(window).width() > 760) {
            $('.header__nav_section .header__nav_langmenu').find("."+ $('html').attr('lang')).addClass("choosed");
        }
        else {
            $('.header__nav_mobile .header__nav_langmenu').find("."+ $('html').attr('lang')).addClass("choosed");
        }
        const textLanguage = $('.header__nav_langmenu').find(".choosed").text();
        $('.header__nav_lang').html(textLanguage);
        $('.header__nav_search').click(function(){
            $(this).toggleClass("active");
            $('.main').toggleClass("active");
            $('.header__nav_button').removeClass("active").find('.header__nav_lang').html(textLanguage);
            $('.header__nav_mobile').removeClass("active");
            $('.main').removeClass("mobile_active");
        });

        $('.header__nav_button').on('click',function() {
            if (!$(this).hasClass('active')) {
                $('.header__nav_button').removeClass('active').find('.header__nav_lang').html(textLanguage);
                $(this).addClass('active');
                const lang = $(this).find('.header__nav_lang');
                const contacts = $(this).find('.header__nav_contacts');
                if (lang.length || contacts.length) {
                    if (lang.length && $("html").attr('lang') === "ru") lang.html('Закрыть')
                    if (lang.length && $("html").attr('lang') !== "ru") lang.html('Close');
                    $('.header__nav_search').removeClass("active");
                    $('.main').removeClass("active");
                }
            }
            else {
                $(this).removeClass('active');
                if ($(this).find('.header__nav_lang').length)
                    $(this).find('.header__nav_lang').html(textLanguage);
            }
        });


        $('.slider_arrow').click( function(){
            const scroll_el = $(this).attr('href');
            if ($(scroll_el).length != 0) {
                $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 1000);
            }
            return false;
        });

        $('.header__nav_mobile-menu').on('click',function() {
            $('.header__nav_button').removeClass("active");
            $('.header__nav_search').removeClass("active");
            $('.main').removeClass("active");
            $('.header__nav_mobile').toggleClass("active");
            $('.main').toggleClass("mobile_active");
        });

        $('.header__nav_item:first-child').on('click',function() {
            $('.header__nav_button').removeClass("active").find('.header__nav_lang').html(textLanguage);
        });

        $('.header__contacts_block:first-child').on('click',function() {
            $('.header__nav_button').removeClass("active");
        });

    });







