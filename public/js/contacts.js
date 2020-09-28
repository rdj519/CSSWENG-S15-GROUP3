$(document).ready(function(){
	

	$("#submitInfo").click(function(){
		/*
			if($.trim($('#name').val()) == ''){
                alert('Name can not be left blank');
            }
            else if($.trim($('#contact').val()) == ''){
                alert('Contact cannot be left blank');
            }
            else if($.trim($('#home').val()) == ''){
                alert('Home cannot be left blank');
            }
            else if($.trim($('#city').val()) == ''){
                alert('City cannot be left blank');
            }
            else if($.trim($('#remark').val()) == ''){
                alert('Remark cannot be left blank');
            }
            else{
            	}
          */

    	        var name = $("#name").val();
		        var contactNumber = $("#contact").val();
		        var homeAddress = $("#home").val();
		        var city = $("#city").val();
		        var remarks = $("#remark").val();

		        $.post('/addContact',{ name: name, contactNumber: contactNumber, homeAddress: homeAddress, city: city, remarks: remarks }, function(data, status) {
		            /* resets value after */
		            $("#name").val("");
		            $("#contact").val("");
		            $("#homeAddress").val("");
		            $("#city").val("");
		            $("#remark").val("");    
		            
		            $("body").load('/contacts');
		        });
            
		
	});
	//  Validation for Add Contacts

    function isFilled() {

        /*
            gets the value of a specific field in the signup form
            then removes leading and trailing blank spaces
        */
        var name = validator.trim($('#name').val());
        var contactNumber = validator.trim($('#contactNumber').val());
        var homeAddress = validator.trim($('#homeAddress').val());
        var city = validator.trim($('#city').val());
        var remarks = validator.trim($('#remark').val());

        /*
            checks if the trimmed values in fields are not empty
        */
        var nameEmpty = validator.isEmpty(customerName);
        var contactNumberEmpty = validator.isEmpty(contactNumber);
        var homeAddressEmpty = validator.isEmpty(homeAddress);
        var cityEmpty = validator.isEmpty(city);
        var remarksEmpty = validator.isEmpty(deliveryFee);
   
        return !nameEmpty && !contactNumberEmpty && !homeAddressEmpty && !cityEmpty && !remarksEmpty; 
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
    function isValidRemarks(field) {
        var remarks = validator.trim($('#remark').val());

        if(remarks.length > 0){
            if(field.is($("#remark")))
                 $("#remarksError").text("");
             return true;
        }
        else{
            if(field.is($("#remark")))
                $("#remarksError").text("Remarks should not be empty.");
            
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
        var validRemarks = isValidRemarks(field);


        //var validQuantity = isValidQuantity(field);

        console.log(validContactNumber + " " + validHomeAddress + " " + validCustomerName + " " + validCity + " " + validRemarks);
        if(filled && validContactNumber && validHomeAddress && validCustomerName && validCity && validRemarks){
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


});