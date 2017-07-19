function validateEmail(email){
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
			$('#myModal').modal('hide');
		}
	});
});
$(document).ready(function(){        
	guest(1);
}); 

function guest(page_no){
	var data = ""
    var total_rows=""
	$.ajax({ 
    	type: "POST",
    	data:{ "page": page_no},
    	url: "fetch.php",             
    	dataType: "html",
    	success: function(rows){  
        	rows = JSON.parse(rows);
        	total_rows=rows.data;
        	table(total_rows);
    	    total_buttons=rows.count/5;
  	        total_buttons=total_buttons+1;
    	    button(total_buttons);
  	    },
    });
}
setInterval(guest,4000);

function table(total_rows){
	var data = ""                
	data+= "<table class='table' style='width: 70%;' border='2'align='center'><tr class='success'>"; 
 	data+="<th style='width: auto;' >ID</th>"+
   	"<th style='width: auto;' >Name</th>"+
    "<th style='width: auto;' >Email</th>"+
    "<th style='width: auto;' >Message</th>"+
    "<th style='width: auto;' >Date</th>"+
    "</tr>";

	for (var i in total_rows)
	{
        var row = total_rows[i];
	    var id = row[0];    
	    var name = row[1];
        var email = row[2];
        var message = row[3];
        var date = row[4];

        data+=  "<tr row-id='" + id + "'>" +
        		"<td  contenteditable='true' id='id' style='pointer-events:none'>" + id + "</td>" +
                "<td  contenteditable='true'  id='name'>" + name + "</td>" +
                "<td  contenteditable='true'  id='email'>" + email + "</td>" +
                "<td  contenteditable='true'  id='message'>" + message + "</td>" +
                "<td  contenteditable='true' id='date' style='pointer-events:none'>" + date + "</td>" +
                "</tr>";                  
    }

    data+= "</table>";

	$(".container").html(data);
} 


function button(total_pages){
	var buttons = "<ul class='pagination' >"
	for (var i = 1; i<=total_pages; i ++) 
	{
        buttons +=  "<li><a id= "+i+" onclick= 'change_page(" +i+ ")' href= '#'>"+i+"</a></li>"
    }
    buttons += "</ul>";
    $(".pagination").html(buttons);
}


var mainpage=1;
function change_page(page_no)
{
	mainpage=page_no;
	guest(page_no);
}
 
