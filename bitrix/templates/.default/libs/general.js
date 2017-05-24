//jQuery(document).ready(function($) {

	var is_mobile = ($('body').hasClass('is_mobile'));

	/* Modal */
	function prModal(content, p_class)
	{
		if(p_class)
		{
			$('.popup').addClass(p_class).attr('data-class', p_class);
		}
		$('.popup .text').html(content);
		$('.popup, .popup_overlay').fadeIn();
		$('body').addClass('popup-open');
		$('.jqMask').each(prMask);
	}
	function prModalClose()
	{
		if($('.ModalAppAdditional').length > 0)
		{
			$('.ModalAppAdditional .jqAjaxSend').trigger('click');
		}
		if($('.popup').attr('data-class'))
		{
			$('.popup').removeClass($('.popup').attr('data-class')).attr('data-class', '');
		}
		$('.popup .text').html('');
		$('.popup, .popup_overlay').fadeOut();
		$('body').removeClass('popup-open');
	}
	$(document).on('click', '.popup .close', function() {
		prModalClose();
	});
	$(document).keyup(function(e) {
		if (e.keyCode == 27)
		{
			prModalClose();
		}
	});

	/* Load Form */
	function prLoad(t_data)
	{
		var p_class = false;
		if(t_data.CLASS)
		{
			p_class = t_data.CLASS;
		}
		$.post(
			'/include/a_load.php',
			t_data,
			function (data) {
				prModal(data, p_class);
			}
		);
	}

	function prLoadFromObj()
	{
		if($(this).hasClass('disabled')) return false;
		var t_data 	= $(this).data('data');
		prLoad(t_data);
		return false;
	}
	$(document).on('click', '.jqLoad', prLoadFromObj);
	$('.jqLoadEl').each(prLoadFromObj);



	function prConfirm()
	{
		if(!confirm('Вы уверены?'))
		{
			return false;
		}
	}
	$(document).on('click', '.jqConfirm', prConfirm);

	/* Send */
	// function prAjaxSend()
	// {
	// 	var t 	= $(this);
	// 	var t_n = t.val();
	// 	var t_p = t.closest('form');
	// 	var t_d = {};
	// 	var t_c = t.data('confirm');

	// 	if(t.hasClass('disabled')) return false;
	// 	t.addClass('disabled').val('Загрузка...');

	// 	if(t_c == true)
	// 		prConfirm();

	// 	if(t.data('send') == 'form')
	// 	{
	// 		t_d	= t_p.serialize();
	// 		$('.return', t_p).html('');
	// 		t_d = t_d + '&AJAX=Y';
	// 	}

	// 	if(t.data('send') == 'link')
	// 	{
	// 		t_d	= t.data('data');
	// 		t_d.AJAX = 'Y';
	// 	}

	// 	var callout = $('.callout', t_p);
	// 	callout.html('');

	// 	$('input, textarea, select', t_p).removeClass('err animated shake');
	// 	$('.validator', t_p).hide();

	// 	var query = prAjax(t_d, function(result)
	// 	{
	// 		t.removeClass('disabled').val(t_n);

	// 		if(result.success === true)
	// 		{
	// 			/* Clear inputs */
	// 			$('input[type="text"], input[type="email"], input[type="tel"]', t_p).val('');

	// 			/* Yandex Goal */
	// 			if(result.success == true && result.goal != false && result.yaID != false)
	// 			{
	// 				if($.isFunction('yaCounter' + result.yaID))
	// 				{
	// 					window['yaCounter' + result.yaID].reachGoal(result.goal, function() {
	// 						//console.log('true: ' + result.goal);
	// 					});
	// 				}
	// 			}

	// 			/* Google Goal */
	// 			if(result.success == true && result.ga != false)
	// 			{
	// 				if($.isFunction('ga'))
	// 				{
	// 					ga('send', 'event', result.ga, 'send');
	// 				}
	// 			}

	// 			/* If Load Content */
	// 			if(result.load != false)
	// 			{
	// 				prLoad({'TYPE' : result.load, 'TRANSFER' : result.transfer, 'CLASS':'ModalAppAdditional'});
	// 				return;
	// 			}

	// 			/* Result Types */
	// 			if(result.type == 'FORM')
	// 			{

	// 			}
	// 			else if(result.type == 'POPUP')
	// 			{
	// 				t_p.html('<div class="content_text"><h2>' + result.title + '</h2><p>' + result.content + '</p></div>');
	// 			}
	// 			else if(result.type == 'MODAL')
	// 			{
	// 				prModal('<div class="content_text"><h2>' + result.title + '</h2><p>' + result.content + '</p></div>');
	// 			}
	// 			else if(result.type == 'REDIRECT')
	// 			{
	// 				window.location.href = result.redirect;
	// 			}
	// 			else if(result.type == 'SCROLL_TO')
	// 			{
	// 				if($('#' + result.scroll).length)
	// 				{
	// 					var minusTop = 0;
	// 					if($('.r_top').length)
	// 					{
	// 						minusTop = $('.r_top').height();
	// 					}
	// 					$('html, body').stop().animate({
	// 						scrollTop: $('#' + result.scroll).offset().top - minusTop
	// 					}, 1000);

	// 					if(result.transfer)
	// 					{
	// 						$('#' + result.scroll).find('input[name="USER_NAME"]').val(result.transfer.USER_NAME);
	// 						$('#' + result.scroll).find('input[name="USER_EMAIL"]').val(result.transfer.USER_EMAIL);
	// 						$('#' + result.scroll).find('input[name="USER_PHONE"]').val(result.transfer.USER_PHONE);
	// 						$('#' + result.scroll).find('input[name="TYPE"]').val(result.transfer.TYPE);
	// 						$('#' + result.scroll).find('input[name="APP_ID"]').val(result.transfer.APP_ID);
	// 						$('#' + result.scroll).find('input[name="LP_ID"]').val(result.transfer.LP_ID);
	// 						$('#' + result.scroll).find('input[name="ADDITIONAL_SENT"]').val(result.transfer.ADDITIONAL_SENT);
	// 					}
	// 				}
	// 			}
	// 			else if(result.type == 'ACCESS_LINK')
	// 			{
	// 				if($('.r_space').length > 0 && is_mobile === false)
	// 				{
	// 					$('.r_space').addClass('r_space_login r_space_login_video').vidbg(
	// 					{
	// 						'mp4' 		: '/include/video/malik.mp4',
	// 						'poster' 	: '/images/bg_space_rocket.jpg',
	// 					},
	// 					{
	// 						muted 		: true,
	// 						loop 		: true,
	// 						overlay 	: true
	// 					}
	// 					);
	// 				}
	// 				prModal('<div class="content_text"><h2>' + result.title + '</h2><p>' + result.content + '</p></div>');
	// 			}
	// 			else if(result.type == 'CALL')
	// 			{
	// 				window[result.call](result.call_data);
	// 			}

	// 			/* App Additional */
	// 			if($('.popup').hasClass('ModalAppAdditional'))
	// 			{
	// 				$('.popup').removeClass('ModalAppAdditional');
	// 			}
	// 		}

	// 		if(result.success === false)
	// 		{
	// 			if(result.type == 'MODAL')
	// 			{
	// 				prModal('<div class="content_text"><h2>' + result.title + '</h2><p>' + result.content + '</p></div>');
	// 			}
	// 		}

	// 		if(result.callout != false)
	// 		{
	// 			callout.html(result.callout).show();
	// 		}
	// 		else
	// 		{
	// 			callout.hide();
	// 		}

	// 		if(result.err != false)
	// 		{
	// 			prErrField(t_p, result.err);
	// 		}

	// 	});
	// 	return false;
	// }
	// $(document).on('click', '.jqAjaxSend', prAjaxSend);

	function prErrField(form, name)
	{
		var el 	= form.find('.' + name),
			btn = form.find('.submit');

		el.addClass('err animated shake');
		btn.addClass('err animated shake');

		el.find('input').on('keyup', function() {
			el.removeClass('err animated shake');
			btn.removeClass('err animated shake');
		});
	}

	/* Mask for form */
	function prMask() {
		var t_type = $(this).data('type');

		if(t_type == 'mobile')
		{
			$(this).on('input', function() {
				var carret 	= $(this).carret('sel');
				var t_v 	= $(this).val();
				var phone 	= $(this).val().replace(/[^0-9\s]/g, '');
				$(this).val(phone);
				$(this).carret('set',carret[0],carret[1])
			});
		}

		if(t_type == 'timefull')
			$(this).mask("99.99");

		if(t_type == 'date')
			$(this).mask("99.99.9999",{placeholder:"дд.мм.гггг"});

		if(t_type == 'datetime')
			$(this).mask("99.99.9999 99:99",{placeholder:"дд.мм.гггг чч:мм"});

		if(t_type == 'price')
		{
			$(this).on('input', function(){
				var t_v = $(this).val();
				t_n_v 	= t_v.replace(/,/,'.');
				t_n_v 	= t_n_v.replace(/[^0-9\-.]|([0-9\-.]+)-|(\.[0-9]*)\.|(^-?0)0|^\./, '$1$2$3');
				if(t_n_v.length > 7)
					t_n_v = t_n_v.substr(0, 7);
				$(this).val(t_n_v);
			});
		}

		if(t_type == 'number')
		{
			$(this).on('input', function(){
				var t_n_v = Number($(this).val().replace(/[^0-9]/g, ''));
				$(this).val(t_n_v);
			});
		}
	}
	$('.jqMask').each(prMask);

	/* Toggle*/
	function prToggle() {
		$(this).click(function() {
			var t_toggle = $(this).data('toggle');
			$(t_toggle).toggle();
			return false;
		});
	}
	$('.jqToggle').each(prToggle);

	$.fn.carret=function(act,selectionStart, selectionEnd)
	{
		var input = this[0];
		if(!input) return 0;

		if(undefined == act)
		{
			act = 'get';
		}
		else if(typeof(act) == "number")
		{
			selectionEnd 	= selectionStart;
			selectionStart 	= act;
			act 			= 'set';
		}
		if(undefined == selectionEnd)
			selectionEnd = selectionStart;

		if(act == 'set')
		{
			if(input.setSelectionRange)
			{
				input.focus();
				input.setSelectionRange(selectionStart, selectionEnd);
			}
			else if(input.createTextRange)
			{
				var range = input.createTextRange();
				range.collapse(true);
				range.moveEnd('character', selectionEnd);
				range.moveStart('character', selectionStart);
				range.select();
			}
			return this;
		}
		else
		{
			$(input).focus();
			var cursor = [];
			if(typeof(input.selectionStart) != 'undefined')
			{
				cursor = [input.selectionStart,input.selectionEnd];
			}
			else if(document.selection)
			{
				for(var i = 0; i < 2; i++)
				{
					var sel 	= document.selection.createRange();
					var clone 	= sel.duplicate();
					sel.collapse(0 == i);
					clone.moveToElementText(input);
					clone.setEndPoint(0 == i ? 'EndToStart' : 'EndToEnd', sel);
					cursor[i] = clone.text.length;
				}
			}

			if(act == 'is')
			{
				return cursor[0] <= selectionStart && selectionStart <= cursor[1];
			}
			else if(act == 'sel')
			{
				return cursor;
			}
			else
			{
				return cursor[0];
			}
		}
	};
//});


$( document ).ready(function() {
$("form").submit(function() { //Change
    var th = $(this);
    $.ajax({
      type: "POST",
      url: $("form").attr("action"), //Change
      data: th.serialize()
    }).done(function() {
          // $.magnificPopup.close();
        $('#modal-callback').modal("hide");
        $('#modal-result').modal("show");

      setTimeout(function() {
        // Done Functions
      
        th.trigger("reset");
        $('#modal-result').modal("show");
      }, 4000);
    });
    return false;
  });
});