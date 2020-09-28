$(document).ready(function(){
	

	$("#submitInfo").click(function(){
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
            	
    	        var name = $("#name").val();
		        var contactNumber = $("#contact").val();
		        var homeAddress = $("#home").val();
		        var city = $("#city").val();
		        var remarks = $("#remark").val();

		        $.post('/addOrder',{ name: name, contactNumber: contactNumber, homeAddress: homeAddress, city: city, remarks: remarks }, function(data, status) {
		            /* resets value after */
		            $("#name").val("");
		            $("#contact").val("");
		            $("#homeAddress").val("");
		            $("#city").val("");
		            $("#remark").val("");    
		            
		            $("body").load('/contacts');
		        });
            }
		
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
		$('#contact-'+_id).removeClass('modal-open');
		$('.modal-backdrop').remove();
		$("#cont").load('/contacts');
		
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