/**
 * PearsonStrap: DatePicker.js
**/
!function ($) {
	$('input.datepicker').each(function() {
		$(this).datepicker();
		var dp_id = $(this).attr("id");
		if (dp_id) {
			$('#'+ dp_id + 'Btn').click(function () {
				if ($('#'+ dp_id).datepicker("widget").is(":visible")) {
					$('#'+ dp_id + 'Btn').datepicker("hide");
				} else {
					$('#'+ dp_id).datepicker("show");
				}
			});
		}
	});
}(window.jQuery);
/**
 * PearsonStrap: PageSlide.js
**/
!function ($) {
    // Add PageSlide to elements with a data-slide attribute
    $('[data-slide]').each(function() {
        var menu = $(this).attr('data-slide');
        $(this).pageslide({ direction:'right', href:menu, iframe:false, slideOthers:['body header', 'body #content-main'], callback:function(){
            // Concatenate _pageSlider to any IDs inside the newly duplicated navigation
            $('#pageslide [id]').each(function(){
                $(this).attr('id', $(this).attr('id') + '_pageSlider');
            });
            
        } });
    });
    // Prevent the click on the dropdown toggle a links from the menu, so we can accordion them
    $('a.dropdown-toggle').click(function (e) {e.preventDefault();});
    // Slide all drop down menus up
    $('ul.dropdown-menu').slideUp(0);
    // Set the class on all of the dropdown icons to the right caret
    $('i.icon-caret-down').removeClass('icon-caret-down').addClass('icon-caret-right');
    // Drop down any dropdown-menu that contains an active li
    $('ul.dropdown-menu li.active').parents('ul.dropdown-menu').slideDown(0).siblings('a.dropdown-toggle').children('i').removeClass('icon-caret-right').addClass('icon-caret-down');
    // Create click event for the drop down menus
    $('[id^=nav-main] a.dropdown-toggle').click(function (e) {
        // Set the class on all of the dropdown icons to the right caret
        $('[id^=nav-main] i.icon-caret-down').removeClass('icon-caret-down').addClass('icon-caret-right');
        if ($(this).next().is(':hidden')) {
            $(this).children('i').removeClass('icon-caret-right').addClass('icon-caret-down');
            $('ul.dropdown-menu').not($(this).next()).slideUp();
        }
        $(this).next().slideToggle();
    });
    //Create a click event to add the active class to the links for single page applications
    $('ul.dropdown-menu a').click(function(){
        $('ul.dropdown-menu li').removeClass('active');
        $(this).parent().addClass('active');
        //close the pageslide, this is necessary for single page applications
        $.pageslide.close();
    });
    $('.dropdown-menu :input').click(function(e) {
        e.stopPropagation();
    });
}(window.jQuery);
