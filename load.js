$(document).ready(function(){
	$('#submit').click(function(){
		var option= $('option:selected').val();
		var fetch = $('input[type="text"]').val();
		$.ajax({
			type:"POST",
			dataType:"json",
			data:{'option':option,'fetch':fetch},
			url:"fetch.php",
			success: function(data){
				var response = JSON.stringify(data);
				$('ul#'+data.option1).append('<li><input type="checkbox" name="">'+data.fetch1+'<ul id="'+data.fetch1+'"> </ul></li>');
				$("#select").append("<option>"+data.fetch1+"</option>");
			}
		});
	});
	$('input[type=checkbox]').click(function () {
		$(this).parent().find('li input[type=checkbox]').prop('checked', $(this).is(':checked'));
		var sibs = false;
		$(this).closest('ul').children('li').each(function () {
			if($('input[type=checkbox]', this).is(':checked')) sibs=true;
		})
		$(this).parents('ul').prev().prop('checked', sibs);
	});
});
