//01 Home Banner Slider
$(document).ready(function() {

// 01 Home Navigation Slide
    $("a#anchor_btn").click(function() {
        if($("#left-bar").css("left") == "-300px"){
            $("#left-bar").animate({"left": "0px"},"fast");
			$(this).removeClass('Open').addClass('Close');
			//$(this).css({'left': '11.5%'});
			$("#right-bar").animate({"margin-left": "300px"},"fast");
        }
        else{
            $("#left-bar").animate({"left": "-300px"},"fast");
			$(this).removeClass('Close').addClass('Open');
			//$(this).css({'left': '0%'});
			$("#right-bar").animate({"margin-left": "20px"},"fast");
        }
    });

	// 01 Home Navigation Slide
    $("a#anchor_btn_right").click(function() {
        if($("#Right-bar-toggle").css("right") == "-380px"){
            $("#Right-bar-toggle").animate({"right": "0px"},"fast");
			$(this).removeClass('Open').addClass('Close');
			//$(this).css({'left': '11.5%'});
			$("#right-bar").animate({"margin-right": "380px"},"fast");
        }
        else{
            $("#Right-bar-toggle").animate({"right": "-380px"},"fast");
			$(this).removeClass('Close').addClass('Open');
			//$(this).css({'left': '0%'});
			$("#right-bar").animate({"margin-right": "20px"},"fast");
        }
    });
});


