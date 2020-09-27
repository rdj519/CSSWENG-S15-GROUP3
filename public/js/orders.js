// const e = require("express");

$(document).ready(function() {
    $("#productTotal").val(0);

    // $('.from_date').datepicker({
    //     startDate: '0'
    // });

    $.get('/getProductsSold', {}, function(data, status) {
        for(var i = 0; i < data.length; i++) {
            $("#productSold").append("<tr>");
            $("#productSold").append("<th scope='row' id='" + data[i]._id + "'>" + data[i].name + "</th>");
            $("#productSold").append("<td><input type='number' id='quantity-" + data[i]._id + "' price='"+ data[i].price +"' productID ='"+ data[i]._id +"' productName ='" + data[i].name + "' amountPerPack ='"+data[i].amountPerPack +"' class='form-control validate productQuantity' value=0><p id='error" + data[i]._id +"'></p></td>");
            $("#productSold").append("<td><p id='" +  "price-" + data[i]._id + "' class='form-control validate productPrice'></p></td>");
            $("#productSold").append("</tr>");

        }
    });

   
    function isValidQuantity(field, name,  amountPerPack, id){
        $.get('/findProduct', {name: name, amountPerPack: amountPerPack}, function(data, result) {
                if(data.quantity < field.val())
                    return false;
                else
                    return true;
            });
    }

    

    /* changes */

  
  

    //sa button nung deleteOpen
    $(document).on('click', ".customerName", function(){
        var customerName = $(this).attr('customerName');
        $.post('/postDelete',{customerName: customerName}, function(data, status) {


            $("body").load('/orders');
        });

    });
    //sa text nung confirmation text ng deleteOpen
    $('.customerName').prop('disabled', true);
    
    $(document).on('keyup', ".deleteConfirmation", function(){
        var confirm = $(this).val();
        $('.customerName').prop('disabled', true);
        if(confirm === "delete")
        {
            $('.customerName').prop('disabled', false);
        }
        else
            $('.customerName').prop('disabled', true);

    });

    /* changes */

    //function validateQuantity()
    $(document).on('change', ".productQuantity", function(){
        
        var price = parseFloat($(this).attr('price'));
        var id = $(this).attr('productID');
        var qty = parseInt($(this).val());
        var qtyID = "#price-"+ id.trim();
    
        $(qtyID).text(qty * price);

        var sum = 0;

        $('.productPrice').each(function() {
            sum += parseFloat($(this).text()) || 0;
        })
        $("#productTotal").val(sum);
        
    });

    /*
    $("#deleteButton").click(function() {
        var customerName = $("#customerName").val();
         //current date 


        $.post('/postDelete',{customerName: customerName}, function(data, status) {


            $("body").load('/orders');
        });

    }); */

    $("#submitOrder").click(function() {
        var customerName = $("#customerName").val();
        var contactNumber = $("#contactNumber").val();
        var homeAddress = $("#homeAddress").val();
        var city = $("#city").val();
        var productTotal= $("#productTotal").val();
        var paymentMethod = $("#paymentMethod").html();
        var courier = $("#courier").html();
        var status = $("#status").html();
        var deliveryDate = $("#deliveryDate").val();
        var deliveryFee = $("#deliveryFee").val();
        //current date 
        var placedDate = new Date();
        var dd = String(placedDate.getDate()).padStart(2, '0');
        var mm = String(placedDate.getMonth() + 1).padStart(2, '0'); 
        var yyyy = placedDate.getFullYear();

        placedDate = yyyy + '-' + mm + '-' + dd;     

        var customerOrder = [];

        $('.productQuantity').each(function() {
            var productOrder = {
                id: $(this).attr('productID'),
                name: $(this).attr('productName'),
                quantity: parseInt($(this).val()),
            }
            if(productOrder.quantity > 0) {
                $.get('/getPlaceStockOrder', {productID: productOrder.id, quantity: productOrder.quantity, name: productOrder.name}, function(data, status) {
                    console.log(data + " " + status);
                });
            }
           
            customerOrder.push(productOrder);
        });


        $.post('/addOrder',{customerName: customerName, contactNumber: contactNumber, homeAddress: homeAddress, city: city, productTotal: productTotal, paymentMethod: paymentMethod, courier: courier, status: status, deliveryDate: deliveryDate, deliveryFee: deliveryFee, placedDate: placedDate, customerOrder:customerOrder }, function(data, status) {
            /* resets value after */
            $("#customerName").val("");
            $("#contactNumber").val("");
            $("#homeAddress").val("");
            $("#city").val("");
            $("#productTotal").val("");    

            /* */
            $("#paymentMethod").html("Payment Method");  
            $("#courier").html("Courier");
            $("#status").html("Status"); 
            
            $("#deliveryDate").val("");
            $("#addOrder").modal("hide");

            
            $("body").load('/orders');
        });
        
    });


    //  Validation for Add Order

    function isFilled() {

        /*
            gets the value of a specific field in the signup form
            then removes leading and trailing blank spaces
        */
        var customerName = validator.trim($('#customerName').val());
        var contactNumber = validator.trim($('#contactNumber').val());
        var homeAddress = validator.trim($('#homeAddress').val());
        var city = validator.trim($('#city').val());
        var deliveryFee = validator.trim($('#deliveryFee').val());
        var deliveryDate = validator.trim($('#deliveryDate').val());

        /*
            checks if the trimmed values in fields are not empty
        */
        var customerNameEmpty = validator.isEmpty(customerName);
        var contactNumberEmpty = validator.isEmpty(contactNumber);
        var homeAddressEmpty = validator.isEmpty(homeAddress);
        var cityEmpty = validator.isEmpty(city);
        var deliveryFeeEmpty = validator.isEmpty(deliveryFee);
        var deliveryDateEmpty = validator.isEmpty(deliveryDate);
        var courierEmpty;
        var statusEmpty;
        var paymentMethodEmpty;
   
        return !customerNameEmpty && !contactNumberEmpty && !homeAddressEmpty && !cityEmpty && !deliveryFeeEmpty && !deliveryDateEmpty; 
    }
    
    function isValidContactNumber(field) {
        var contactNumber = validator.trim($('#contactNumber').val());

        if((parseInt(contactNumber).toString().length === 10) && (contactNumber % 1 === 0)) {
            if(field.is($("#contactNumber")))
                $("#contactNumberError").text("");

            return true;
        }
        else {
            if(field.is($("#contactNumber")))
                $("#contactNumberError").text("Contact number should be eleven digits and not empty.");
            
            return false;
        }
    }
    function isValidDeliveryFee(field) {
        var deliveryFee = validator.trim($('#deliveryFee').val());

        if((parseInt(deliveryFee) >= 0) && (deliveryFee % 1 === 0)) {
            if(field.is($("#deliveryFee")))
                $("#deliveryFeeError").text("");

            return true;
        }
        else {
            if(field.is($("#deliveryFee")))
                $("#deliveryFeeError").text("Delivery fee should be 0 or a positive integer and not empty.");
            
            return false;
        }
    }
    function isValidCustomerName(field) {
        var customerName = validator.trim($('#customerName').val());

        if(customerName.length > 0){
            if(field.is($("#customerName")))
                 $("#customerNameError").text("");
             return true;
        }
        else{
            if(field.is($("#customerName")))
                $("#customerNameError").text("Customer name should not be empty.");
            
            return false;
        }
    }
    function isValidHomeAddress(field) {
        var homeAddress = validator.trim($('#homeAddress').val());

        if(homeAddress.length > 0){
            if(field.is($("#homeAddress")))
                 $("#homeAddressError").text("");
             return true;
        }
        else{
            if(field.is($("#homeAddress")))
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
    function isValidDeliveryDate(field) {
        var deliveryDate = new Date (validator.trim($('#deliveryDate').val()));
        var now = Date.now();
      

        if((deliveryDate > now)){
            if(field.is($("#deliveryDate")))
                 $("#deliveryDateError").text("");
            
      
            return true;
        }
        else{
            if(field.is($("#deliveryDate")))
                $("#deliveryDateError").text("Delivery date should be valid and not empty.");
            
        
            return false;
        }
    }
    function isValidPaymentMethod(field) {
        var paymentMethod = validator.trim($('#paymentMethod').text());

        if(paymentMethod != "Method"){
            if(field.is($("#paymentMethod")))
                 $("#paymentMethodError").text("");
             return true;
        }
        else{
            if(field.is($("#paymentMethod")))
                $("#paymentMethodError").text("Payment Method should not be empty.");
            
            return false;
        }
    }
    function isValidCourier(field) {
        var courier = validator.trim($('#courier').text());

        if(courier != "Courier Type"){
            if(field.is($("#courier")))
                 $("#courierError").text("");

          
            return true;

        }
        else{
            if(field.is($("#courier")))
                $("#courierError").text("Courier should not be empty.");
            
          
            return false;
        }
    }
    function isValidStatus(field) {
        var status = validator.trim($('#status').text());

        if(status != "Status"){
            if(field.is($("#status")))
                 $("#statusError").text("");
             return true;
        }
        else{
            if(field.is($("#status")))
                $("#statusError").text("Status should not be empty.");
            
            return false;
        }
    }

    function isValidOrderQuantity(field) {
        var hasOrder = false;
        $('.productQuantity').each(function() {
            quantity = parseInt($(this).val());
            if(quantity <= 0) {
                hasOrder = hasOrder || false;
            }
            else {
                hasOrder = hasOrder || true;
            }
        });

        if(hasOrder) {
            if(field.is($(".productQuantity")))
                $("productSoldError").text("");

            return true
        }
        else {
            if(field.is($(".productQuantity")))
                $("productSoldError").text("Order list should not be empty");

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
        var validDeliveryDate = isValidDeliveryDate(field);
        var validDeliveryFee = isValidDeliveryFee(field);
        var validPaymentMethod = isValidPaymentMethod(field);
        var validCourier = isValidCourier(field);
        var validStatus  = isValidStatus(field);
        var validOrderQuantity = isValidOrderQuantity(field);

        //var validQuantity = isValidQuantity(field);

        console.log(validContactNumber + " " + validHomeAddress + " " + validCustomerName + " " + validCity + " " + validDeliveryDate + " " + validDeliveryFee + " " + validPaymentMethod + " " + validCourier + " " + validStatus + " " + validOrderQuantity);
        if(filled && validContactNumber && validHomeAddress && validCustomerName && validCity && validDeliveryDate && validDeliveryFee && validPaymentMethod && validCourier && validStatus && validOrderQuantity)
            $('#submitOrder').prop('disabled', false);
        else 
            $('#submitOrder').prop('disabled', true);
    }

    $('#customerName').keyup(function () {
        validateField($('#customerName'), 'Customer Name', $('#customerNameError'));
    });

    $('#contactNumber').keyup(function () {
        validateField($('#contactNumber'), 'Contact Number', $('#contactNumberError'));
    });

    $('#homeAddress').keyup(function () {
        validateField($('#homeAddress'), 'Home Address', $('#homeAddressError'));
    });

    $('#city').keyup(function () {
        validateField($('#city'), 'City', $('#cityError'));
    });

    $('#deliveryDate').change(function () {
        validateField($('#deliveryDate'), 'Delivery Date', $('#deliveryDateError'));
    });
    $('#deliveryFee').keyup(function () {
        validateField($('#deliveryFee'), 'Delivery Fee', $('#deliveryFeeError'));
    });

    $('#paymentDropdown').on('hide.bs.dropdown', function () {
        validateField($('#paymentMethod'), 'Payment Method', $('#paymentMethodError'));
    });

    $('#courierDropdown').on('hide.bs.dropdown',function () {
        validateField($('#courier'), 'Courier', $('#courierError'));
    });

    $('#statusDropdown').on('hide.bs.dropdown',function () {
        validateField($('#status'), 'Status', $('#statusError'));
    });

    jQuery(document).on( "change", ".productQuantity", function(){ 
        if($(this).val() == "") {
            $(this).val(0);
        }
        
        var name = $(this).attr('productName');
        var amountPerPack = $(this).attr('amountPerPack');    
        var id = $(this).attr('productID');
        var val = parseInt($(this).val());
        var isEmpty = false;
        $("#error"+ id).text(val);
        if(!$(this).val() || $(this).val() < 0){
                $("#error"+ id).text("Must be a valid value.");
                $('#submitOrder').prop('disabled', true);
                isEmpty = true;
        }
        $.get('/findProduct', {name: name, amountPerPack: amountPerPack}, function(data, result) {
            if(isEmpty){
                $("#error"+ id).text("Must be a valid value.");
                $('#submitOrder').prop('disabled', true);
            }
            else{
                if(data.quantity < val){
                    $("#error"+ id).text("Not enough stock.");
                    $('#submitOrder').prop('disabled', true);
                }
                else{
                    $("#error"+ id).text("");
                    $('#submitOrder').prop('disabled', false);
                }
            }
        }); 

        validateField($(this), 'Product', $('#productSoldError'));
    });

});
