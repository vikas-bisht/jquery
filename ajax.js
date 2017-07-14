function validateEmail(email)
{
	var cemail = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;		
	if (cemail.test(email))
	{
		return true; 
	}
	else
	{
		return false;
	}
}
$(document).ready(function(){
	$('#submit').click(function(e){
		e.preventDefault();
		var name =$('#name').val();
		var email =$('#email').val();
		var message =$('#message').val();
		var date =$('#date').val();
		if(name=="")
		{
			alert("enter your name");
			$("#name").focus();
		}
		else if(email=="")
		{
			alert("enter your email");
			$("#email").focus();
		}
		else if(message=="")
		{
			alert("enter message");
			$("#message").focus();
		}
		else if(date=="")
		{
			alert("enter date");
			$("#date").focus();
		}
		else if(!validateEmail(email))
		{
			alert("Enter Correct Email Format");
			$("#email").focus();
		}
		else
		{
			var info = {"name" : name,"email" : email,"message" : message,"date" : date};
			$.ajax({
				url:"insert.php",
				type:"POST",
				dataType:'html',
				data: {"name" : name,"email" : email,"message" : message,"date" : date},
				success:function(data){
				alert('submitted');
					$('#name').val("");
					$('#email').val("");
					$('#message').val("");
					$('#date').val("");
				}
			});
		}
	});
});
function data_refresh()
{
	$.ajax({
		url:'fetch.php',
		type:'POST',
		success:function(response){
			var data = JSON.parse(response);
			var showdata =("<thead><tr><th>Name</th><th>Email</th><th>Message</th><th>Date</th></tr></thead>");
			$.each(data,function(i){
				showdata +=("<tr><td>"+data[i].name+"</td><td>"+data[i].email+"</td><td>"+data[i].message+"</td><td>"+data[i].date+"</td></tr>");
			});
			$('#result').html(showdata);
		}
	});	
}
setInterval(data_refresh,1000);