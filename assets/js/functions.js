$(function() {
  smoothScroll(500);
  workBelt();
  workLoad();
  clientStuff();
  $("header h1").fitText(1, { minFontSize: '20px', maxFontSize: '72px' });
  $(".biglink").fitText(1.5);
});

function smoothScroll(duration) {
  $('a[href^="#"]').on('click',function(event){
    var target= $( $(this).attr('href'));
    if (target.length) {
      event.preventDefault();
      $('html, body').animate({
        scrollTop: target.offset().top
      },duration);
    }
  });
}

function workBelt() {
  $(".thumb-unit").on('click', function(){
    $(".work-belt").css('left','-100%');
    $(".work-container").show();
  });
  $(".work-return").on('click', function(){
    $(".work-belt").css('left','0%');
    $(".work-container").hide(800);
  });
}


function  workLoad() {

  $.ajaxSetup({ cache: false });

  $('.thumb-unit').click(function() {
    var $this = $(this),
        newTitle = $this.find('strong').text(),
        newFolder = $this.data('folder'),
        spinner = '<div class="loader">Loading...</div>',
        newHTML = 'work/'+ newFolder + '.html';
        console.log(newHTML);
    $('.project-load').html(spinner).load(newHTML);
    $('.project-title').text(newTitle);
  });

}

function clientStuff() {
  $('.client-logo, .client-button').click(function() {
    var $this = $(this),
        position = $this.index();

    $('.client-unit').removeClass('active-client').eq(position).addClass('active-client');
    $('.client-logo').removeClass('active-client').eq(position).addClass('active-client');
    $('.client-button').removeClass('active-client').eq(position).addClass('active-client');
  });
  $('div.client-control-next').on('click',function(){
    var $this=$(this),
        index=$('div.active-client').index();
    $('.client-unit').removeClass('active-client').eq((index + 1)%4).addClass('active-client');
    $('.client-logo').removeClass('active-client').eq((index + 1)%4).addClass('active-client');
  });
  $('div.client-control-prev').on('click',function(){
    var $this=$(this),
        index=$('div.active-client').index();
    $('.client-unit').removeClass('active-client').eq((index - 1)%4).addClass('active-client');
    $('.client-logo').removeClass('active-client').eq((index - 1)%4).addClass('active-client');
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
