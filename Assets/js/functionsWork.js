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

$(document).ready(function () {
    workBelt();
});