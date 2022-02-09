(function($) {
  $(function() {
    var $win = $(window),
        posY;
    
	//main-visual swiper
	var swiper = new Swiper('.slide_banner_swiper', {
        speed: 1000,
        autoplay: true,
//        spaceBetween: 4,
        loop: true,
        slidesPerView: 'auto',
        watchSlidesVisibility: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
	  
	//main > jointbuy swiper
	var swiper = new Swiper('.jointbuy_swiper', {
        spaceBetween: 4,
        loop: true,
        slidesPerView: 'auto',
        watchSlidesVisibility: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });

    //wow 간단 애니메이션
    new WOW().init();
      
    //스크롤매직
    const spyEls = document.querySelectorAll('.scroll-spy');
    spyEls.forEach(function (spyEl) {
      new ScrollMagic
        .Scene({
          triggerElement: spyEl,
          triggerHook: 0.9
        })
        .setClassToggle(spyEl, 'show')
        .addTo(new ScrollMagic.Controller());
    });
	
	  
	//첨부된 이미지 개수넣기
	$('.js_all_num').text($('.js_list li').length - 1);
	  
	//리스트에서 삭제버튼(사진삭제,옵션 선택한 상품삭제)
	$('.js_del').on('click', function() {
		var currentLi = $(this).parents('li'),
			$ul = currentLi.parent('ul'),
			$li, reNum;
		
		currentLi.remove();
		//삭제한 후에 개수 다시 확인
		$li = $ul.children('li'),
		reNum = $li.length - 1;
		
		$('.js_all_num').text(reNum);
	});
	  
	//목록 전체 삭제
	$('.js_del_all').on('click', function() {
		$('.js_list li').remove();
	});
	  
	//주소 내용 바꾸기
	$('.js_txt_btn').on('click', function() {
		var li = $(this).parents('li'),
			crt = li.children('.js_txt_origin'),
			txt = crt.text();
		
		$('.js_txt').text(txt);
	});
	
	  
	//관심 클릭
	$('.btn_favor').on('click', function() {
		if($(this).hasClass('on') == true) {
			$(this).removeClass('on');
		} else {
			$(this).addClass('on');
		}
	});
	
	  
	//카운트 증감함수
	var num;

	$('.button_count:first-child').click(function(){
		num = parseInt($(this).siblings('input:text').val());
		if (num > 1) {
			$(this).siblings('input:text').val(num - 1);
		}
		if (num == 2) {
			$('.button_count:first-child').prop('disabled', true);
		}
		if (num == 10) {
			$('.button_count:last-child').prop('disabled', false);
		}
	});

	$('.button_count:last-child').click(function(){
		num = parseInt($(this).siblings('input:text').val());
		if (num < 10) {
			$(this).siblings('input:text').val(num + 1);
		}
		if (num > 0) {
			$('.button_count:first-child').prop('disabled', false);
		}
		if (num == 9) {
			$('.button_count:last-child').prop('disabled', true);
		}
	});
	
	//상품상세에서 구매창 열고 닫기
	$('.js_go_buying').on('click', function() {
		$('#buying').animate({
			bottom: 0,
			opacity: '1'
		});
		$('.bg').css({
			position: 'fixed'
		});
	});
	$('.js_close').on('click', function() {
		$(this).parent('#buying').animate({
			bottom: '-200%',
			opacity: 0
		});
		$(this).parent('#buying').children('.bg').css({
			position: 'absolute'
		});
	});
	
	//buying 에서 옵션 열고 닫기
	$('.opt_go > a').on('click', function(e) {
		e.preventDefault();
		
		$('.option_insort').show();
	});
	$('.btn_close').on('click', function() {
		$(this).parent().hide();
		$('.seletbox .current').empty();
	});
	  
	//buying 에서 옵션 상세 아코디언
	$('.selectbox').each(function(){
		var $ul = $(this).find('ul'),
			$li = $(this).find('li > span'),
			$title = $(this).find('.select_tit'),
			boxValue = $title.find('.current'),
			$value; 
		// Hide <ul> initially
		$ul.hide();  
		// Toggle functionality
		$title.click(function(){
			$ul.slideToggle();
		}); 
		// <li> selection functionality
		$li.click(function(){
			$value = $(this).text();
			boxValue.text($value);
			$ul.slideToggle();
		});
	});
	  
	//문의
	$('.js_accordion').on('click', function() {
		var title = $(this).find('.js_title');
		
		title.toggleClass('shortening');
		
		$(this).toggleClass('on');
		$(this).next('.js_con').slideToggle();
	});
	  
	//장바구니 팝업
	$('.go_cart').on('click', function() {
		$('.pop').addClass('on');
		$('.pop button').on('click', function() {$('.pop').removeClass('on');});
	});
			
	 /* 
	//combobox
	$('.combobox').each(function(){
		var $ul = $(this).find('ul'),
			$li = $(this).find('li'),
			$title = $(this).find('.select_tit'),
			$value; 
		// Hide <ul> initially
		$ul.hide();  
		// Toggle functionality
		$title.click(function(){
			$ul.slideToggle();
		}); 
		// <li> selection functionality
		$li.click(function(){
			$value = $(this).text();
			$title.text($value);
			$ul.slideToggle();
		});
	});*/
	
	/*날짜구하기 함수*/
	//function to update the days based on the current values of month and year
	function updateNumberOfDays(){
		   $('#days').html('');
		   month = $('#months').val();
		   year = $('#years').val();
		   days = daysInMonth(month, year);

		   for(i=1; i < days+1 ; i++){
				   $('#days').append($('<option />').val(i).html(i));
		   }
	}

	//helper function
	function daysInMonth(month, year) {
		    return new Date(year, month, 0).getDate();
	}
	/*날짜구하기 실행*/
    $(function() {

        //populate our years select box
        for (i = new Date().getFullYear(); i > 1900; i--){
            $('#years').append($('<option />').val(i).html(i));
        }
        //populate our months select box
        for (i = 1; i < 13; i++){
            $('#months').append($('<option />').val(i).html(i));
        }
        //populate our Days select box
        //updateNumberOfDays(); 

        //"listen" for change events
        $('#years, #months').change(function(){
            updateNumberOfDays(); 
        });
    });
	  
	//경고 메세지 출력
	$('.form_set').each(function() {
		var $ipbox = $(this).find('.ipbox'),
			btn = $ipbox.find('button');
		btn.on('click', function() {
			$(this).siblings('.warning').show();
		});
	});
	
	// 약관동의 전체체크
	$('.agree_area').each(function() {
		// 체크박스 전체 선택
		$(this).on('click', '#ck0', function() {
			$(this).parents('.agree_area').find('input').prop('checked', $(this).is(':checked'));
		});
		// 체크박스 개별 해제시 전체해제, 개별선택 전부했을 때 전체선택 체크
		$(this).on('click', '.normal', function() {
		    var is_checked = true;

			$('.agree_area .normal').each(function(){
				is_checked = is_checked && $(this).is(':checked');
			});

			$('#ck0').prop('checked', is_checked);
		});
	});
	
	//tab 기본동작
	$('.tab').each(function() {
        var $tab = $(this),
			$tabMenu = $tab.find('.tab_menu'),
			$div = $tab.find('.tab_con');
		
        $tabMenu.on('click', 'a', function(e) {
            e.preventDefault();

            if ($(this).hasClass('on')) {return;}

            $tabMenu.find('a').removeClass('on');
            $(this).addClass('on');
            $div.hide();
            $($(this).attr('href')).show();
        });
    });
	
	//계정찾기
	$('#find').each(function() {
        var $tabMenu = $(this).find('.tab_menu'),
        	$tabCon = $(this).find('.tab_con'),
			$bottom = $(this).find('.bottom_fix'),
			btnGoPop = $bottom.find('.go_pop'),
        	$cat = $tabCon.find('.find_cat');
		
        $cat.on('click', 'a', function(e) {
            e.preventDefault();
			
			var $con = $(this).parent().siblings('.find_con'),
				$formWrap = $con.children('.form_wrap');
			
			$(this).hide();//메뉴명감추기
			$(this).siblings().show();//클릭 안한 메뉴명 보이기
			$formWrap.removeClass('on');//클릭 안한 콘텐츠 감추기
			$($(this).attr('href')).addClass('on');//해당 콘텐츠 보여주기
			$(this).parent('.find_cat').addClass('on');//여백조절
			$bottom.addClass('on');//하단 버튼 보이기
			
            if ($(this).hasClass('on')) {return;}
        });
		
		//탭메뉴 다시 눌렀을때 리셋
		$tabMenu.on('click', function(e) {
            e.preventDefault();
			
			var $formWrap = $tabCon.find('.form_wrap');
			
			$cat.children('a').show();
			$cat.removeClass('on');
			$bottom.removeClass('on');
			$formWrap.removeClass('on');
			$('.warning').hide();
		});
		
		//하단버튼 동작
		btnGoPop.on('click', function() {
			var tabName,btnName;
			$('.form_wrap').each(function (i) {
				if ($(this).hasClass('on')) {
					tabName = $(this).find('.tab_name').text(),
					btnName = $(this).find('.btn_name').text();
				}
			});
			
			$('.pop').addClass('on');
			$('.pop .btn_name').html(btnName);
			$('.pop .tab_name').html(tabName);
			$('.pop button').on('click', function() {$('.pop').removeClass('on');});
		});
    });
	
	//filter
	$('.btn_filter').on('click', function() {
        $('.list_filter').slideToggle();
    });
	
	//input창 클릭했을 때 아래 fixed부분 없애기
	$('#login_form input').focus(function(){
		$('.bottom_fix').css('position','static');
	});
	$('#login_form input').blur(function(){
		$('.bottom_fix').css('position','fixed');
	});
    
      
    //숫자입력창 문자입력 안되게 하기
    $("input:text[numberOnly]").on("keyup", function() {
        //천단위마다 콤마 생성 함수
        function addComma(data) {
            return data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
        
        $(this).val(addComma($(this).val().replace(/[^0-9]/g,"")));
    });
    
    //header 스크롤바
    $win.scroll(function(){
        var hapwichihei = ($win.scrollTop() / ($(document).height() - $win.height())) * 100;
            $(".scroll_bar").css("width", hapwichihei + "%");
    });
    
    
  });
})(jQuery);