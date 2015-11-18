'use strict';

var sliderInt = 1;
var sliderNext = 2;
var loop;

function startSlider() {
    var count = $("#slider > div").size();
    
    loop = setInterval(function () {
        
        if (sliderNext > count) {
            sliderNext = 1;
            sliderInt = 1;
        }
        
        $("#slider > div").fadeOut(400);
        $("#slider > div#" + sliderNext).fadeIn(400);
        
        sliderInt = sliderNext;
        sliderNext = sliderNext + 1;
        
    }, 10000);
    
}

function stopLoop() {
    window.clearInterval(loop);
}

function showSlider(id) {
    
    stopLoop();
    
    var count = $("#slider > div").size();
    
    if (id > count) {
        id = 1;
        sliderInt = 1;
    } else if (id < 1) {
        id = count
    }
        
    $("#slider > div").fadeOut(400);
    $("#slider > div#" + sliderNext).fadeIn(400);
    
    sliderInt = id;
    sliderNext = id + 1;
    
    startSlider();
}

function prev() {
    var newSlide = sliderInt - 1;
    showSlider(newSlide);
}

function next() {
    var newSlide = sliderInt + 1;
    showSlider(newSlide);
}

$("#slider > .slide").hover (
    
    function () {
        stopLoop(); 
    },
    function () {
        startSlider();
    }
);
  
function smoothScool (duration) {
    $('a[href^="#"]').on('click', function(event) {
        
        var target = $( $(this).attr('href') );
        
        if( target.length ) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, duration);
        }
    });
}

function workBelt() {
    
    $('.thumb-unit').click(function() {
        
        $('.work-belt').css('left','-100%');
        $('.work-container').show();
        
    });
    
    $('.back').click(function() {
        $('.work-belt').css('left','0%');
        $('.work-container').hide();
    });
    
}

function workLoad() {
    $.ajaxSetup ({ cache: true });
    
    $('.thumb-unit').click(function () {
        
        var $this = $(this),
            newFolder = $this.data('folder'),
            newTitle = $this.find('strong'),
            spinner = '<div class="loader">Loading...</div>',
            newHTML = 'Assets/work/'+ newFolder +'.html';
        
        $('.project-load').html(spinner).load(newHTML);
        
    });
}

function reviewStuff() {
    
    $('.review-unit').first().addClass('active-review');
    $('.review-logo-bw').first().addClass('active-review-logo');
    $('.review-mobile-nav span').first().addClass('active-review-special');
    
    
    $('.review-logo-bw, .review-mobile-nav span').click(function() {
        var $this = $(this),
            $siblings = $this.parent().children(),
            position = $siblings.index($this);
        
        $('.review-unit').removeClass('active-review').eq(position).addClass('active-review');
        $('.review-mobile-nav span').removeClass('active-review-special').eq(position).addClass('active-review-special');
        $('.review-logo-bw').removeClass('active-review-logo').eq(position).addClass('active-review-logo');
    });
    
    $('.review-next, .review-prev').click(function() {
        
        var $this = $(this),
            curActiveReview = $('.reviews-belt').find('.active-review'),
            position = $('.reviews-belt').children().index(curActiveReview),
            clientNum = $('.review-unit').length;
        
        if ($this.hasClass('review-next'))
        {

            if (position < clientNum - 1) {

                $('.active-review').removeClass('active-review').next().addClass('active-review');
                $('.active-review-logo').removeClass('active-review-logo').next().addClass('active-review-logo');

            } else {

                $('.review-unit').removeClass('active-review').first().addClass('active-review');
                $('.review-logo-bw').removeClass('active-review-logo').first().addClass('active-review-logo');

            }
            
        } else {
            
            if (position === 0) {
                
                $('.review-unit').removeClass('active-review').last().addClass('active-review');
                $('.review-logo-bw').removeClass('active-review-logo').last().addClass('active-review-logo');
                
            } else {
            
                $('.active-review').removeClass('active-review').prev().addClass('active-review');
                $('.active-review-logo').removeClass('active-review-logo').prev().addClass('active-review-logo');
                
            }
            
        }
    });
}

(function( $ ){

  $.fn.fitText = function( kompressor, options ) {

    // Setup options
    var compressor = kompressor || 1,
        settings = $.extend({
          'minFontSize' : Number.NEGATIVE_INFINITY,
          'maxFontSize' : Number.POSITIVE_INFINITY
        }, options);

    return this.each(function(){

      // Store the object
      var $this = $(this);

      // Resizer() resizes items based on the object width divided by the compressor * 10
      var resizer = function () {
        $this.css('font-size', Math.max(Math.min($this.width() / (compressor*10), parseFloat(settings.maxFontSize)), parseFloat(settings.minFontSize)));
      };

      // Call once to set.
      resizer();

      // Call on resize. Opera debounces their resize by default.
      $(window).on('resize.fittext orientationchange.fittext', resizer);

    });

  };

})( jQuery );

$(document).ready(function () {
    $("#slider > div#1").fadeIn(400); 
    startSlider();
    smoothScool(300);
    workBelt();
    workLoad();
    reviewStuff();
    
    $(".hero-title").fitText(1.2, { minFontSize: '20px', maxFontSize: '72px' });
    $(".biglink").fitText(1.2, { minFontSize: '20px', maxFontSize: '72px' });
});
