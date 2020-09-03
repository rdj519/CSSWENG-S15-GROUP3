 //NOT USED :( 
 function isFilled() {
		        var valid = true
		        var email = validator.trim($('#email').val());
		        var pw = validator.trim($('#pass').val());

		        if (validator.isEmpty(email)) {
		            $("#email").css("border-color", "red");
		            valid = false
		        }

		        if (validator.isEmpty(pw)) {
		            $("#pass").css("border-color", "red");
		            valid = false
		        }
		       
		        return valid;
		    }


$(document).ready(function () {

		   

		    $("#loginbtn").on("click", function(event) {
		        //event.preventDefault();
		        //event.preventDefault();
		        //event.preventDefault();
		        var x = document.getElementById("email");
		        var y = document.getElementById("pass");
		        //var count = 0;

		        $("#loginerror").text("");
		        $("#loginform input:invalid").css("border-color", "red");
		        $("#loginform input:valid").css("border-color", "lightgray");

		        if (!isFilled()) {
		            $("#loginerror").text("Please properly fill out all fields.");
		        }
		        else {
		            if (!x.checkValidity()) {
		                $("#email").css("border-color", 'red')
		                $("#loginerror").text("Please enter a valid email address.");
		            } 
		            else {
		            	/*
		                $.get('/checkLogIn', {email: x.value, pw: y.value}, function (result) {
		                    if (result == "Verify") {
		                        $("#loginerror").text("Please verify your account first.")        		                        
		                    }
		                    else if(result) {
		                        $('#email').css('border-color', 'lightgray');
		                        $('#pass').css('border-color', 'lightgray');  
		                        $('#loginform').submit();
		                        //window.location.reload()
		                        //window.location.replace('home.hbs');
		                        window.location = "/home";

		                        //$("#loginerror").text("success.");

		                    }
		                    else {
		                        $('#email').css('border-color', 'red');
		                        $('#pass').css('border-color', 'red');
		                        $('#loginerror').text("E-mail and/or password is incorrect.");
		                    }
		                });
		               */
		               			$('#email').css('border-color', 'lightgray');
		                        $('#pass').css('border-color', 'lightgray');  
		                        $('#loginform').submit();
		                        //window.location.reload()
		                        //window.location.replace('home.hbs');
		                        window.location = "/home";
		            }
		        }
		        
		    });
		});
