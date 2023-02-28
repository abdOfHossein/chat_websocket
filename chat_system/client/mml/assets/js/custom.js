let elementDrag = '';
$(".drag-element p").on('drag', function(e) {
    e.preventDefault();
    elementDrag = this;
});
$(".drag-element td").on({
    dragover: function(e) {
        e.preventDefault();
    },
    drop: function(e) {
        e.preventDefault();
        $(this).children().append(elementDrag);
    }
});

// change tabs -------------------------------------------------------
$('.header-tab-menu-item').click(function (e) {
    $('.active-tab').removeClass('active-tab');
    $(`.${$(this).data('class')}`).addClass('active-tab');
    $(this).addClass('active-tab');
});

// set Height Messages And Events ------------------------------------
const heightWindow = $(window).height();
const heightHeader = $('.header').outerHeight(true);
$('.messages, .events').height(heightWindow - heightHeader);

// events ------------------------------------------------------------
$('.box-events-right tbody tr').click(function (e) {
    $('.box-events-messages').addClass('box-events-messages-show');
});
$('.box-events-messages-close').click(function (e) {
    $('.box-events-messages').removeClass('box-events-messages-show');
});
$('#form-new-event').submit(function (e) { 
    e.preventDefault();
    $('.alert-dropdown').slideDown();
    
    $.each($('.add-user img'), function (indexInArray, valueOfElement) {
        if ($(valueOfElement).data('alert') && $('.add-user input').eq(indexInArray).prop('checked')) {
            $(valueOfElement).addClass('alert-user');
        }
    });
});
$('.dropdown-new-events-close').click(function (e) {
    $('.dropdown-new-events').fadeOut();
});
$('.dropdown-new-events-open').click(function (e) {
    $('.dropdown-new-events').fadeIn();
    if ($(window).height() < 640) {
        $('.dropdown-new-events').addClass('res-dropdown-new-events');
    }
});
$('.dropdown-new-user-toggle').click(function (e) {
    $('.dropdown-new-user').fadeToggle();
});
$('#checked-all-users').change(function (e) {
    $('.one-user').prop('checked', e.target.checked);
});