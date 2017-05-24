$(document).ready(function () {

	var h_window 	= $(window).outerHeight();
	var r_header 	= $('.r_header');
	var h_header 	= h_window;
	var r_content 	= $('.r_content');
	var r_header_m 	= $('.r_header .main');
	var p_main 		= (h_window - r_header_m.outerHeight()) / 2;
	var p_p 		= 60;
	if($('body').data('is_mobile') == true) p_p = 180;

	if(p_main < 0) p_main = 0;
	r_header_m.css('padding-top', p_main);

	if(h_window <= (r_header_m.outerHeight() + p_p) || p_main == 0) h_header = r_header_m.outerHeight() + p_p;	
	r_header.css('height', h_header);

	Array.max = function( array ){
		return Math.max.apply( Math, array );
	};

	/* Row Price */
	function prRowPrice()
	{
		if($('.row_price').length > 0)
		{
			var ob_top 	= $('.row_price .col .price-header, .row_price .col .title-box');
			var ob_row 	= $('.row_price .col .rows');
			var h_h_arr = [];
			var r_h_arr = [];
			$('.row_price .col').each(function() {
				ob_top.css('min-height', '');
				ob_row.css('min-height', '');
				h_h_arr.push($('.price-header', this).outerHeight(true));
				r_h_arr.push($('.rows', this).outerHeight(true));
			});

			ob_top.css('min-height', Array.max(h_h_arr));
			ob_row.css('min-height', Array.max(r_h_arr));
		}
	}
	$('.row_price a').click(function() {
		$('input[name="FORM_TXT[]"]').val($(this).data('type'));
	});
	
	$(window).load(function(){
		prRowPrice();
	});

	$(window).resize(function()
	{
		h_window 	= $(window).outerHeight();
		h_header 	= h_window;
		p_main 		= (h_window - r_header_m.outerHeight()) / 2;

		if(p_main < 0) p_main = 0;
		r_header_m.css('padding-top', p_main);

		if(h_window <= (r_header_m.outerHeight() + p_p) || p_main == 0) h_header = r_header_m.outerHeight() + p_p;
		r_header.css('height', h_header);
		
		prRowPrice();
	});

	$('a[href*=#]').bind("click", function(e){
		var anchor = $(this);
		$('html, body').stop().animate({
			scrollTop: $(anchor.attr('href')).offset().top-100
		}, 1000);
		e.preventDefault();
	});

	fbSetting 	= {
		helpers:
		{
			overlay:
			{
				locked: false
			}
		}
	}

	$(document).on('click', '.fancybox', function() {
        var t_id = $(this).data('id');
        $.fancybox($('#'+t_id).html(), fbSetting);
        return false;
    });
});