function update_timeline(tid, priority, exp_start_time, exp_finish_time)
{
	var url = '?c=plugin&a=calendar_update' ;
	var params = {
		'tid': tid,
		'exp_start_time': exp_start_time,
		'exp_finish_time': exp_finish_time,
		'priority': priority
	};
	$.post( url , params , function( data )
	{
		var data_obj = $.parseJSON( data );
		 
		if( data_obj.err_code == 0 )
		{
			$('#calendar-message')[0].innerText = "保存成功";
		}
		else
		{
			alert( __('JS_API_ERROR_INFO' , [ data_obj.err_code , data_obj.message ] ) );
		}
	} );
}
function calendar_start_todo(tid)
{
	var url = '?c=plugin&a=calendar_start_todo' ;
	$.post( url , {'tid': tid} , function( data )
	{
		var data_obj = $.parseJSON( data );
		if( data_obj.err_code == 0 )
		{
			$('#calendar_start_todo').remove();
		}
		else
		{
			alert( __('JS_API_ERROR_INFO' , [ data_obj.err_code , data_obj.message ] ) );
		}
	} );
}


(function($) {

	"use strict";

	var options = {
		events_source: "?c=plugin&a=todo_list",
		view: 'month',
		tmpl_path: 'plugin/calendar/bootstrap-calendar/',
		tmpl_cache: false,
		day: new Date().Format("yyyy-MM-dd"),
		onAfterEventsLoad: function(events) {
			if(!events) {
				return;
			}
			var list = $('#eventlist');
			list.html('');

			$.each(events, function(key, val) {
				$(document.createElement('li'))
					.html('<a href="' + val.url + '">' + val.title + '</a>')
					.appendTo(list);
			});
		},
		onAfterViewLoad: function(view) {
			$('.page-header h3').text(this.getTitle());
			$('.btn-group button').removeClass('active');
			$('button[data-calendar-view="' + view + '"]').addClass('active');
		},
		classes: {
			months: {
				general: 'label'
			}
		},
		first_day: 1,
		modal: '#events-modal',
		modal_type : "template",
		//modal_title : function (e) { return e.title },
		language: 'zh-CN'
	};
	
	var calendar = $('#calendar').calendar(options);

	$('.btn-group button[data-calendar-nav]').each(function() {
		var $this = $(this);
		$this.click(function() {
			calendar.navigate($this.data('calendar-nav'));
		});
	});

	$('.btn-group button[data-calendar-view]').each(function() {
		var $this = $(this);
		$this.click(function() {
			calendar.view($this.data('calendar-view'));
		});
	});
	
}(jQuery));