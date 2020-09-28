$(document).ready(function(){


	$("#submitInfo").click(function(){
	        var name = $("#name").val();
	        var contactNumber = parseInt($("#contact").val());
	        var homeAddress = $("#home").val();
	        var city = $("#city").val();
	        var remarks = $("#remark").val();


	        //alert("name: " +name + "\n" + "contact: " + contactNumber + jQuery.type(contactNumber) + "\nhome: " + homeAddress + "\ncity: " + city + "\nremarks: " + remarks);
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
		$("#cont").load('/contacts');

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


        console.log(validContactNumber + " " + validHomeAddress + " " + validCustomerName + " " + validCity);
        if(filled && validContactNumber && validHomeAddress && validCustomerName && validCity){
            $("#submitInfo").prop('disabled', false); //false
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
	$('.updateContactInfo').keyup(function(){
		var _id = $(this).attr('contactID');
	});

	$('.contactNumber').keyup(function(){
		console.log("hello");
		var _id = $(this).attr('contactID');
		var number = validator.trim($(this).val());
		
		if(number.length != 10) {
			$('#submitInfo-'+_id).prop('disabled', true);
			$('#contactNumberError-' + _id).text("Contact number should be 10 digits.");
		}
		else {
			$('#submitInfo-'+_id).prop('disabled', false);
			$('#contactNumberError-' + _id).text("Contact number should be 10 digits.");
		}
		
	});



	// Check if there are updates made
	// $('.updateContactInfo').keyup(function() {
	// 	var _id = $(this).attr('contactID');
	// 	var contactNumber = $('#contactNumber-'+ _id).val();
	// 	var homeAddress = $('#homeAddress-'+ _id).val();
	// 	var city = $('#city-'+ _id).val();
	// 	var remarks = $('#remarks-'+ _id).val();

	// 	$.get('/getContact', {_id:_id}, function(data, result) {
	// 		var change = false;

	// 		if ((result.contactNumber != contactNumber) || (result.homeAddress != homeAddress) || (result.city != city)) {
	// 			change = true;
	// 		}
			
	// 	});
		
	// });

});