$(document).ready(function(){
	$(".dropdown-toggle").dropdown();

	$("#submitInfo").click(function(){
	        var name = $("#name").val();
	        var contactNumber = parseInt($("#contact").val());
	        var homeAddress = $("#home").val();
	        var city = $("#city").val();
	        var remarks = $("#remark").val();
	        
	        $.post('/addContact', { name: name, contactNumber: contactNumber, homeAddress: homeAddress, city: city, remarks: remarks }, function(data, status) {
	            /* resets value after */
	            $("#name").val("");
	            $("#contact").val("");
	            $("#home").val("");
	            $("#city").val("");
	            $("#remark").val("");
	           
	            $("#newContact").modal("hide");
	            $("body").load('/contacts');
	        });
		
	});

    /* Delete */

    //deleteOpen
    $(document).on('click', ".deletion", function(){
        var _id = $(this).attr('id');
        $.post('/deleteContact',{_id: _id}, function(data, status) {

            $("body").load('/contacts');
        });

    });
    
    $(document).on('keyup', ".deleteConfirmation", function(){
        var confirm = $(this).val();
        
        if(confirm === "CONFIRM")
        {
            $('.deletion').prop('disabled', false);
        }
        else
            $('.deletion').prop('disabled', true);

    });

    /* Delete */

	$('.updateContact').click(function() {
		var _id = $(this).attr('contactID');
		var contactNumber = $('#contactNumber-'+ _id).val();
		var homeAddress = $('#homeAddress-'+ _id).val();
		var city = $('#city-'+ _id).val();
		var remarks = $('#remarks-'+ _id).val();

		$.get('/updateContact', {_id:_id, contactNumber:contactNumber, homeAddress:homeAddress, city:city, remarks:remarks}, function(data, result) {
		});

		$('#contact-'+_id).removeClass('modal-open');
		$('.modal-backdrop').remove();
		location.reload(true);
	});


	//  Validation for Add Contacts

    function isFilled() {

        /*
            gets the value of a specific field in the signup form
            then removes leading and trailing blank spaces
        */
        var name = validator.trim($('#name').val());
        var contactNumber = validator.trim($('#contact').val());
        var homeAddress = validator.trim($('#home').val());
		var city = validator.trim($('#city').val());

        /*
            checks if the trimmed values in fields are not empty
        */
        var nameEmpty = validator.isEmpty(name);
        var contactNumberEmpty = validator.isEmpty(contactNumber);
        var homeAddressEmpty = validator.isEmpty(homeAddress);
		var cityEmpty = validator.isEmpty(city);
   
        return !nameEmpty && !contactNumberEmpty && !homeAddressEmpty && !cityEmpty; 
    }
 	function isValidContactNumber(field) {
        var contactNumber = validator.trim($('#contact').val());

        if((parseInt(contactNumber).toString().length === 10) && (contactNumber % 1 === 0)) {
            if(field.is($("#contact")))
                $("#contactNumberError").text("");

            return true;
        }
        else {
            if(field.is($("#contact")))
                $("#contactNumberError").text("Contact number should be eleven digits and not empty.");
            
            return false;
        }
    }
    function isValidHomeAddress(field) {
        var homeAddress = validator.trim($('#home').val());

        if(homeAddress.length > 0){
            if(field.is($("#home")))
                 $("#homeAddressError").text("");
             return true;
        }
        else{
            if(field.is($("#home")))
                $("#homeAddressError").text("Home Address should not be empty.");
            
            return false;
        }
    }
    function isValidCity(field) {
        var city = validator.trim($('#city').val());

        if(city.length > 0){
            if(field.is($("#city")))
                 $("#cityError").text("");
             return true;
        }
        else{
            if(field.is($("#city")))
                $("#cityError").text("City should not be empty.");
            
            return false;
        }
    }
    function isValidCustomerName(field) {
        var customerName = validator.trim($('#name').val());

        if(customerName.length > 0){
            if(field.is($("#name")))
                 $("#nameError").text("");
             return true;
        }
        else{
            if(field.is($("#name")))
                $("#nameError").text("Name should not be empty.");
            
            return false;
        }
    }
	function validateField(field, fieldName, error) {

        var value = validator.trim(field.val());
        var empty = validator.isEmpty(value);

        if(empty) {
            field.prop('value', '');
            error.text(fieldName + " should not be empty.");
        }
        else {
            error.text("");
        }

        var filled = isFilled();
        var validContactNumber = isValidContactNumber(field);
        var validHomeAddress = isValidHomeAddress(field);
        var validCustomerName = isValidCustomerName(field);
		var validCity = isValidCity(field);


        console.log(validContactNumber + " " + validHomeAddress + " " + validCustomerName + " " + validCity );
        if(filled && validContactNumber && validHomeAddress && validCustomerName && validCity){
			$("#submitInfo").prop('disabled', false); //false
			isUniqueContact(validator.trim($('#name').val()), validator.trim($('#contact').val()));
			
        }
        else{
        	$("#submitInfo").prop('disabled', true);
        }        
    }
	$('#name').keyup(function () {
        validateField($('#name'), 'Name', $('#nameError'));
    });

    $('#contact').keyup(function () {
        validateField($('#contact'), 'Contact Number', $('#contactNumberError'));
    });

    $('#home').keyup(function () {
        validateField($('#home'), 'Home Address', $('#homeError'));
    });

    $('#city').keyup(function () {
        validateField($('#city'), 'City', $('#cityError'));
    });

    $('#remark').keyup(function () {
        validateField($('#remark'), 'Remarks', $('#remarksError'));
    });


	// Updating Customer contact info
	$('.updateContact').click(function() {
		var _id = $(this).attr('contactID');
		var contactNumber = $('#contactNumber-'+ _id).val();
		var homeAddress = $('#homeAddress-'+ _id).val();
		var city = $('#city-'+ _id).val();
		var remarks = $('#remarks-'+ _id).val();
		
		$.get('/updateContact', {_id:_id, contactNumber:contactNumber, homeAddress:homeAddress, city:city, remarks:remarks}, function(data, result) {

		});
		$("#cont").load('/contacts');
		$('#contact-'+_id).removeClass('modal-open');
		$('.modal-backdrop').remove();
		
		
	});


	// Update Customer Validation

	function filledUpdate(_id) {
		var number = validator.trim($('#contactNumber-'+ _id).val());
		var homeAddress = validator.trim($('#homeAddress-'+ _id).val());
		var city = validator.trim($('#city-'+ _id).val());

		var numberEmpty = validator.isEmpty(number);
		var homeAddressEmpty = validator.isEmpty(homeAddress);
		var cityEmpty = validator.isEmpty(city);

		return !numberEmpty && !homeAddressEmpty && !cityEmpty;
	}

	function isValidContactNumberUpdate(field, _id) {
		var contactNumber = validator.trim($('#contactNumber-'+ _id).val());

		if(contactNumber.length == 10) {
			if(field.hasClass("contactNumber")) {
				$('#contactNumberError-' + _id).text("");
			}
			return true;
		}
		else {
			if(field.hasClass("contactNumber")) {
				$('#contactNumberError-' + _id).text("Contact number should be 10 digits.");
			}
			return false;
		}
	}

	function validateUpdate(field, fieldName, error, _id) {
		var value = validator.trim(field.val());
        var empty = validator.isEmpty(value);

        if(empty) {
            field.prop('value', '');
            error.text(fieldName + " should not be empty.");
        }
        else {
            error.text("");
		}
		
		var filled = filledUpdate(_id);
		var validNumber = isValidContactNumberUpdate(field, _id);

		if(filled && validNumber) {
			$("#submitInfo-"+_id).prop('disabled', false);
			isUniqueContactUpdate(validator.trim($('#name-'+ _id).text()), validator.trim($('#contactNumber-'+ _id).val()), _id);
		}
		else {
			$("#submitInfo-"+_id).prop('disabled', true);
		}
	}



	$('.contactNumber').keyup(function() {
		var _id = $(this).attr('contactID');
		validateUpdate($(this),'Contact Number', $("#contactNumberError-"+_id), _id);
	});

	$('.homeAddress').keyup(function() {
		var _id = $(this).attr('contactID');
		validateUpdate($(this),'Home Address', $("#homeAddressError-"+_id), _id);
	});

	$('.city').keyup(function() {
		var _id = $(this).attr('contactID');
		validateUpdate($(this),'City', $("#cityError-"+_id), _id);
	});

	function isUniqueContact(name, contactNumber) {
	
		$.get('/getDuplicate', {name:name, contactNumber:contactNumber}, function(data, result) {
			if(data.name == name && data.contactNumber == contactNumber ) {
				$("#nameError").text("Contact already exists");
				$("#submitInfo").prop('disabled', true);
			}
			else {
				$("#nameError").text("");
				$("#submitInfo").prop('disabled', false);
			}
		});

	}

	function isUniqueContactUpdate(name, contactNumber, _id) {
	
		$.get('/getDuplicate', {name:name, contactNumber:contactNumber}, function(data, result) {
			console.log("name: " + name + "contact: " + contactNumber + " " + data);
			if((data.name == name) && (data.contactNumber == contactNumber) && (data._id != _id)) {
				$("#contactNumberError-" + _id).text("Contact already exists");
				$("#submitInfo-"+ _id).prop('disabled', true);
			}
			else {
				$("#contactNumberError-" + _id).text("");
				$("#submitInfo-"+ _id).prop('disabled', false);;
			}
		});

	}

	$('#newContact').on('hidden.bs.modal', function () {
        $('#nameError').text('');
        $('#contactNumberError').text('');
		$('#homeError').text('');
		$('#cityError').text('');
		$('#remarksError').text('');
     });

});


function liveSearch() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchContact");
    filter = input.value.toUpperCase();
    table = document.getElementById("contactTable");
    tr = table.getElementsByTagName("tr");
    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    td2 = tr[i].getElementsByTagName("td")[1];
    td3 = tr[i].getElementsByTagName("td")[2];
    td4 = tr[i].getElementsByTagName("td")[3];
        if (td || td2 || td3 || td4) {
            txtValue = td.textContent || td.innerText;
            txtValue2 = td2.textContent || td2.innerText;
            txtValue3 = td3.textContent || td3.innerText;
            txtValue4 = td4.textContent || td4.innerText;
            if ((txtValue.toUpperCase().indexOf(filter) > -1) || (txtValue2.toUpperCase().indexOf(filter) > -1) || (txtValue3.toUpperCase().indexOf(filter) > -1) || (txtValue4.toUpperCase().indexOf(filter) > -1)) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}