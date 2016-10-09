/* Are you sure dialog code */
function areYouSure(text1, text2, button, callback) {
  $("#sure .sure-1").text(text1);
  $("#sure .sure-2").text(text2);
  $("#sure .sure-do").text(button).on("click.sure", function() {
    callback();
    $(this).off("click.sure");
  });
  $.mobile.changePage("#sure");
}
/* Are you sure dialog code - end */


var _pageCont = '',
_apiUrl = 'http://bitcoinmerida.com/',
_stars = 0;


document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
	var device = {};
	console.log('device is ready');
	console.log(device);
	var _DevInfo = JSON.stringify(device);
	/* Loading dynamic page data for page 2 */
	$.get(_apiUrl+'app-page-2',{},function(data){
		_pageCont = data.txt;
		$('.txtHome').html(data.title);
		$('.contentHome').html(data.txt);
		
		
		$('#home-content').html(_pageCont);
		$('#btn1-txt .ui-btn-text').html(data.btntxt);
	});
	
	/* Rating stars init */
	$('.rate-stars').starrr({
	  change: function(e, value){
		console.log('new rating is ' + value);
		_stars = value;
	  }
	});
	
	/* Submit rating to server */
	$(document).on('click','.submit-rate-trigger',function(e){
		$.mobile.loading( "show", {
		  text: "Submitting..",
		  textVisible: true,
		  html: ""
		});		
		$.mobile.allowCrossDomainPages = true;
		$.ajax({
			type: "POST",
			url: _apiUrl+'app-post',
			data: {mykey: 'video1',value:_stars,json:_DevInfo},
			crossDomain: true,
			success: function(data){
				$.mobile.loading( "hide");	
				 $.mobile.changePage("#feedback-page");
			}
		});	
	});
	
	/* Submit feedback to server */
	$(document).on('click','.feedback-trigger',function(e){
		if($('#feedback-txt').val() == ''){
			$('#feedback-txt').focus();
			return false;
		}
		$.mobile.loading( "show", {
		  text: "Submitting..",
		  textVisible: true,
		  html: ""
		});		
		$.mobile.allowCrossDomainPages = true;
		$.ajax({
			type: "POST",
			url: _apiUrl+'app-post',
			data: {mykey: 'comment',value:$('#feedback-txt').val(),json:_DevInfo},
			crossDomain: true,
			success: function(data){
				$.mobile.loading( "hide");	
				$.mobile.changePage("#thx-page");
			}
		});	
	});
	
	
	
	/* Exit app confirmation */
    $(document).on('click','.exitApp',function(e){
		areYouSure("Are you sure to exit app ?", "", "Yes", function() {
			if(navigator.app){
					navigator.app.exitApp();
			}else if(navigator.device){
					navigator.device.exitApp();
			}
		});
	});
	
	
	

    // Now safe to use device APIs
}
$(document).ready(function(e) {});