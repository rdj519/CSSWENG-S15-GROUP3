
// const e = require("express");

$(document).ready(function() {
    $(".dropdown-toggle").dropdown();
    $("#productTotal").val(0);

    $.get('/getProductsSold', {}, function(data, status) {
        for(var i = 0; i < data.length; i++) {
            $("#productSold").append("<tr>");
            $("#productSold").append("<th scope='row' id='" + data[i]._id + "'>" + data[i].name + "</th>");
            $("#productSold").append("<td><input type='number' id='quantity-" + data[i]._id + "' price='"+ data[i].price +"' productID ='"+ data[i]._id +"' productName ='" + data[i].name + "' amountPerPack ='"+data[i].amountPerPack +"' class='form-control validate productQuantity' value=0><p id='error-" + data[i]._id +"'></p></td>");
            $("#productSold").append("<td><p id='" +  "Price-" + data[i]._id + "' class='form-control validate productPrice'></p></td>");
            $("#productSold").append("</tr>");

        }
    });

    $(document).on('change', ".productQuantity", function(){
        
        var price = parseFloat($(this).attr('price'));
        var id = $(this).attr('productID');
        var qty = parseInt($(this).val());
        var qtyID = "#Price-"+ id.trim();
        $(qtyID).text(qty * price);

        var sum = 0;

        $('.productPrice').each(function() {
            sum += parseFloat($(this).text()) || 0;
        });
        $("#productTotal").val(sum);
        
    });

    $("#searchName").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#tbody tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });


    $('.changeItemModal').each(function() {
        var id = $(this).attr('orderID');
        $.get('/getProductsSold', {}, function(data, status) {
            for(var i = 0; i < data.length; i++) {
                $("#changeItemList-"+id).append("<div class='row info'> <div class='col-6 d-flex p-3' style='margin-bottom: 10px;' id='"+ data[i]._id + "-" + id +"'>   " + data[i].name + "</div><div class='col-6'><div class='row'><div class='col-6'><input type='number' id='updateQuantity-" + data[i]._id + "-" + id +
                "' price='"+ data[i].price +"' productID ='"+ data[i]._id +"' pname ='" + data[i].name + "' orderID='" + id + 
                "' amountPerPack ='"+data[i].amountPerPack +"' quantity='"+ 0+ "' class='form-control validate updateProductQuantity uPQ-"+id+"' value=0 ><p id='updateError-" + data[i]._id + "-" + id +
                "'></p></div><div class='col-6'><input type='number' id='" +  "updatePrice-" + data[i]._id + "-" + id + "' class='form-control validate updateProductPrice-"+ id +"' value=0 readonly></'div></div></div>");
                // $("#changeItemList-"+id).append("hello");
            }
            placeAmounts(id);

            
        }); 

    });

    function placeAmounts(id) {
        // var id = order.attr('orderID');
            $.get('/getOrder', {_id:id}, function(data, status) {
                products = data.customerOrder;
                nonexisting = [];
                for(var i = 0; i < products.length; i++) {
                    element = "#updateQuantity-"+products[i].id +"-"+id;
                    element1 = "#updatePrice-"+products[i].id +"-"+id;
                    if($(element).length != 0) {
                        $(element).val(products[i].quantity);
                        $(element).attr('quantity', products[i].quantity);
                        $(element1).val(products[i].quantity * parseFloat($(element).attr('price')));
                    }
                    else {

                        nonexisting.push(products[i]);
                    }
                }
                
                for(var i = 0; i < nonexisting.length; i++) {
                    var quantity = nonexisting[i].quantity;
                    var price = quantity * nonexisting[i].price;
                    $("#changeItemList-"+id).append("<div class='row info'> <div class='col-6 d-flex p-3' style='margin-bottom: 10px;' id='"+ nonexisting[i].id + "-" + id +"'>   " + nonexisting[i].name + "</div><div class='col-6'><div class='row'><div class='col-6'><input id='updateQuantity-" + nonexisting[i].id + "-" + id +
                "' price='"+ nonexisting[i].price +"' productID ='"+ nonexisting[i].id +"' pname ='" + nonexisting[i].name + "' orderID= '" + id + 
                "' amountPerPack ='"+ 0 +"' class='form-control validate updateProductQuantity upQ-"+ id +"' value="+quantity+" readonly><p id='updateError" + nonexisting[id].id + "-" + id +
                "'></p></div><div class='col-6'><input id='" +  "updatePrice-" + nonexisting[i].id + "-" + id + "' class='form-control validate updateProductPrice-"+id+"' value="+price+" readonly></'div></div></div>");
                }
                var sum = 0;
                $('.updateProductPrice-'+id).each(function() {
                    sum += parseFloat($(this).val()) || 0;
                });
        
                $("#updateTotal-"+id).text(sum);
                
            });

            
    }

    $(document).on('change', ".updateProductQuantity", function(){

        // Changing price and sum
        var order = $(this).attr('orderID');
        var price = parseFloat($(this).attr('price'));
        var id = $(this).attr('productID');
        var qty = parseInt($(this).val());
        var qtyID = "#updatePrice-"+ id +"-" + order;
        
        // console.log(qtyID + " " + qty * price);
        $(qtyID).val(qty * price);

        var sum = 0;
        

        $('.updateProductPrice-'+order).each(function() {
            sum += parseFloat($(this).val()) || 0;
        });

        $("#updateTotal-"+order).text(sum);


        // Checking
        $('.uPQ-'+order).each(function() {
            var errors = "#updateError-"+ $(this).attr('productID')+ "-"+order;
            
            isValidUpdateQuantity($(this), $(this).attr('productID'), parseInt($(this).attr('quantity')), function(valid) {
                // console.log(errors);
                if(valid) {
                    $(errors).text("");
                }
                else {
                    $(errors).text("Not enough stocks.");
                }

            });
        });
    });



    function isValidUpdateQuantity(field, productID, productQuantity, valid) {
        // console.log(productID + " " + productQuantity + " ");
        
        $.get('/getProductByID', {_id:productID}, function(data, status) {
            console.log((productQuantity + data.quantity) + " " + field.val())
            if((productQuantity + data.quantity) >= field.val()) {
                valid(true);
            }

            else {
                console.log("falssse");
                valid(false);
                
            }
                
        });

    }
    

   
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
        var _id = $(this).attr('deleteId');
        $.post('/postDelete', {_id: _id}, function(data, status) {

            $("body").load('/orders');
        });

    });
    //sa text nung confirmation text ng deleteOpen
    $('.customerName').prop('disabled', true);
    
    $(document).on('keyup', ".deleteConfirmation", function(){
        var confirm = $(this).val();
        $('.customerName').prop('disabled', true);
        if(confirm === "CONFIRM")
        {
            $('.customerName').prop('disabled', false);
        }
        else
            $('.customerName').prop('disabled', true);

    });

    /* changes */

    //function validateQuantity()
  
    $(".submitUpdate").click(function(){ 
        var orderID = $(this).attr('orderID');

        $.get('/getOrder', {_id:orderID}, function(data, status) {
            products = data.customerOrder;
            
            // Returning the values
            for(var i = 0; i < products.length; i++) {
                $.get('/getReturnProduct', {_id: products[i].id, quantity:products[i].quantity}, function(data, status) {
                    console.log(status);
                });
            }
            customerOrder = [];
            $('.uPQ-' + orderID).each(function(){
                
                var productOrder = {
                    id: $(this).attr('productid'),
                    name: $(this).attr('pname'),
                    quantity: parseInt($(this).val()),
                    price: parseFloat($(this).attr('price'))
                }

                if(productOrder.quantity > 0) {
                    $.get('/getPlaceStockOrder', {productID: productOrder.id, quantity: productOrder.quantity, name: productOrder.name}, function(data, status) {
                        
                    });
                    customerOrder.push(productOrder);
                }
            });
            $.get('/updateCustomerOrder', {_id:orderID, customerOrder:customerOrder}, function(data, status) {

                location.reload(true);
            });
        });      
        
    });

    $("#submitOrder").click(function() {
        var customerName = $("#customerName").val();
        var contactNumber = $("#contactNumber").val();
        var homeAddress = $("#homeAddress").val();
        var city = $("#city").val();
        var productTotal= $("#productTotal").val();
        var paymentMethod = validator.trim($("#paymentMethod").html());
        var courier = validator.trim($("#courier").html());
        var status = validator.trim($("#status").html());
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
                price: parseFloat($(this).attr('price')),
            }
            if(productOrder.quantity > 0) {
                $.get('/getPlaceStockOrder', {productID: productOrder.id, quantity: productOrder.quantity, name: productOrder.name}, function(data, status) {
               
                });
                customerOrder.push(productOrder);
            }
            
        });


        $.post('/addOrder',{customerName: customerName, contactNumber: contactNumber, homeAddress: homeAddress, city: city, productTotal: productTotal, paymentMethod: paymentMethod, courier: courier, status: status, deliveryDate: deliveryDate, deliveryFee: deliveryFee, placedDate: placedDate, customerOrder:customerOrder }, function(data, response) {
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

            
            location.reload(true);
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
                $("#contactNumberError").text("Contact number should be 10 digits and not empty.");
            
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

        if(!field.has(".productQuantity")) {
            var value = validator.trim(toString(field.val()));
            var empty = validator.isEmpty(value);
            if(empty) {
                field.prop('value', '');
                error.text(fieldName + " should not be empty.");
            }
            else {
                error.text("");
            }
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
                $("#error-"+ id).text("Must be a valid value.");
                $('#submitOrder').prop('disabled', true);
            }
            else{
                if(data.quantity < val){
                    $("#error-"+ id).text("Not enough stock.");
                    $('#submitOrder').prop('disabled', true);
                    // console.log("disabled");
                    
                }
                else{
                    $("#error-"+ id).text("");
                    $('#submitOrder').prop('disabled', false);
                    validateField($(this), 'Product', $('#productSoldError'));
                }
            }
        }); 

        validateField($(this), 'Product', $('#productSoldError'));
    });

        /* nested dropdown */
    $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
        if (!$(this).next().hasClass('show')) {
            $(this).parents('.dropdown-menu').first().find('.show').removeClass('show');
        }
        var $subMenu = $(this).next('.dropdown-menu');
        $subMenu.toggleClass('show');
        $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
            $('.dropdown-submenu .show').removeClass('show');
        });
        return false;
    });
    $(".dropdown-menu a").click(function(){
        $(this).parents(".dropdown").find('.btn').html($(this).text());
        $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
    });


    $("#filterActivate").click(function() {
        /* status */
        if($("#filterButton").html() == "confirmed"){
            $(".confirmed").show();
            $(".paid").hide();
            $(".delivering").hide();
            $(".completed").hide();
            $(".cancelled").hide();
            $("#filterButton").html("Filter By");
        }
        else if($("#filterButton").html() == "paid"){
            $(".confirmed").hide();
            $(".paid").show();
            $(".delivering").hide();
            $(".completed").hide();
            $(".cancelled").hide();
            $("#filterButton").html("Filter By");
        }
        else if($("#filterButton").html() == "delivering"){
            $(".confirmed").hide();
            $(".paid").hide();
            $(".delivering").show();
            $(".completed").hide();
            $(".cancelled").hide();
            $("#filterButton").html("Filter By");
        }
        else if($("#filterButton").html() == "completed"){
            $(".confirmed").hide();
            $(".paid").hide();
            $(".delivering").hide();
            $(".completed").show();
            $(".cancelled").hide();
            $("#filterButton").html("Filter By");
        }
        else if($("#filterButton").html() == "cancelled"){
            $(".confirmed").hide();
            $(".paid").hide();
            $(".delivering").hide();
            $(".completed").hide();
            $(".cancelled").show();
            $("#filterButton").html("Filter By");
        }
        /* courier */
        else if($("#filterButton").html() == "castilla"){
            $(".castilla").show();
            $(".lalamove").hide();
            $(".mrspeedy").hide();
            $(".grabexpress").hide();
            $("#filterButton").html("Filter By");
        }
        else if($("#filterButton").html() == "lalamove"){
            $(".castilla").hide();
            $(".lalamove").show();
            $(".mrspeedy").hide();
            $(".grabexpress").hide();
            $("#filterButton").html("Filter By");
        }
        else if($("#filterButton").html() == "mrspeedy"){
            $(".castilla").hide();
            $(".lalamove").hide();
            $(".mrspeedy").show();
            $(".grabexpress").hide();
            $("#filterButton").html("Filter By");
        }
        else if($("#filterButton").html() == "grabexpress"){
            $(".castilla").hide();
            $(".lalamove").hide();
            $(".mrspeedy").hide();
            $(".grabexpress").show();
            $("#filterButton").html("Filter By");
        }
        /* payment method*/
        else if($("#filterButton").html() == "cod"){
            $(".cod").show();
            $(".gcash").hide();
            $(".paymaya").hide();
            $("#filterButton").html("Filter By");
        }
        else if($("#filterButton").html() == "gcash"){
            $(".cod").hide();
            $(".gcash").show();
            $(".paymaya").hide();
            $("#filterButton").html("Filter By");
        }
        else if($("#filterButton").html() == "paymaya"){
            $(".cod").hide();
            $(".gcash").hide();
            $(".paymaya").show();
            $("#filterButton").html("Filter By");
        }
        /* all */
        else if($("#filterButton").html() == "all"){
            $(".confirmed").show();
            $(".paid").show();
            $(".delivering").show();
            $(".completed").show();
            $(".cancelled").show();
            $(".castilla").show();
            $(".lalamove").show();
            $(".mrspeedy").show();
            $(".grabexpress").show();
            $(".cod").show();
            $(".gcash").show();
            $(".paymaya").show();
            $("#filterButton").html("Filter By");
        }
    });


     $(document).on('click', ".statuschoice", function(){

        var orderID = $(this).attr('orderID');
        var status = $(this).attr('value');
        console.log("selected =" + status);
        //var orderID = $("#" + _id).attr('orderID');

        if (!(status === "confirmed")) {
            $("#deleteBtn-" + orderID).prop('disabled', true); 
            $("#changeBtn-" + orderID).prop('disabled', true);      
        }
        else {
            $("#deleteBtn-" + orderID).prop('disabled', false);                 
            $("#changeBtn-" + orderID).prop('disabled', false);                 
        }

    });

    $(".changeItem").click(function() {
        $(".update-modal").prop('hidden', true);
    });

    $(".closeUpdate").click(function() {
        setTimeout(function() {
            $(".update-modal").prop('hidden', false);
        }, 300);
        
    });

    

});


function deleteCheck(_id) {
        var status = $("#statusModal-" + _id).val();
        console.log("status: " + status);
        if (!(status === "confirmed")) {
            $("#deleteBtn-" + _id).prop('disabled', true);  
            $("#changeBtn-" + _id).prop('disabled', true);    
        }
        else {
            $("#deleteBtn-" + _id).prop('disabled', false);  
            $("#changeBtn-" + _id).prop('disabled', false);                 
        }
    }
    
function liveSearch() {
        // Declare variables
        var input, filter, table, tr, td, i, txtValue;
        input = document.getElementById("searchName");
        filter = input.value.toUpperCase();
        table = document.getElementById("orderTable");
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
/*
    //delete check
    function deleteCheck(_id) {
        var status = $("#statusModal-" + _id).html();
        console.log("status: " + status);
        if (!(status === "confirmed")) {
            $("#deleteBtn-" + _id).prop('disabled', true);      
        }
        else {
            $("#deleteBtn-" + _id).prop('disabled', false);                 
        }
    }
*/
    //Total price
    function showTotal(_id) {
        var deliveryfee = parseInt($("#deliveryFeeModal-" + _id).val());   
        var prodTotal = parseInt($("#overallPriceModal-" + _id).val());
        $("#totalPriceModal-" + _id).val(deliveryfee + prodTotal);
    }
    
    function updateTotal(_id) {
        var total = parseFloat($("#overallPriceModal-" + _id).val());
        var dfee = parseFloat($("#deliveryFeeModal-" + _id).val());
        $("#totalPriceModal-" + _id).val(total+dfee);
    }

    function itemprice(price, quantity) {
        parseFloat($("#" + _id + "-" + prodID).attr('price').val(price*quantity));
        parseFloat($("#price" + _id + "-" + prodID).attr('price').val(price*quantity));
        return price * quantity;
    }

    function overallPrice(_id, prodID, add) {
        console.log("add: "+ add);
        var sum=add;
        $('.pq-' + _id).each(function() {
            console.log("sum: " + sum);
            if ($(this).attr('itemID') === prodID) {
                
            } else {
                console.log($(this).attr('pname') + " " + parseInt($(this).attr('itemprice')) );
                console.log("parseInt($(this).val())" + parseInt($(this).val()));

            sum = sum + (parseInt($(this).attr('itemprice')) * parseInt($(this).val()));    

            }           
        });
        $('#overallPriceModal-' + _id).val(sum);
        updateTotal(_id);
    }

    //if nagchange quantity ng item
    function overallitem(prodID, _id) {
        //parseFloat($("#" + _id + "-" + prodID).attr('price').val(price*quantity));
        var price = parseFloat($("#" + _id + "-" + prodID).attr('price'));
        var qty = parseInt($("#" + _id + "-" + prodID).val());

        console.log("price: " + price);
        console.log("qty: " + qty);
        $("#" + _id + "-" + prodID).attr('itemprice', price*qty);
        overallPrice(_id, prodID, price*qty);
    }

    
    
    //update the quantity of orders
    function updateQuan(prodID, _id) {
        console.log("_id: " + _id);
        var name = $('#name-' + _id).val();
        var contactnum = $("#contactNumberModal-" + _id).val();
        var home = $("#homeAddressModal-" + _id).val();
        var city = $("#cityModal-" + _id).val();
                //dates
        var placed = $("#placedDateModal-" + _id).val();
        var delivery = $("#deliveryDateModal-" + _id).val();
                //dropdowns
        var courier = $("#courierModal-" + _id).html();
        var payment = $("#paymentMethodModal-" + _id).html();
        var status = $("#statusModal-" + _id).html();
        var deliveryfee = $("#deliveryFeeModal-" + _id).val();   
        var prodTotal = $("#overallPriceModal-" + _id).val();

        console.log("prodTotal: " + prodTotal);

        //PRODUCT       
        var newQuan = $("#" + _id + "-" + prodID).val();
        var ogquan = $("#" + _id + "-" + prodID).attr('ogquan'); 
        var name = $("#" + _id + "-" + prodID).attr('pname');
        var x;

        console.log("QUANTITY UPDATED\n");
        console.log("Name: " + name);
        console.log("newQuan: " + newQuan);
        console.log("ogquan: "+ ogquan);
        x = newQuan-ogquan;
        console.log("minus: "+ x);      
        
        $("#" + _id + "-" + prodID).attr('ogquan', newQuan);
        console.log("new ogquan: " + newQuan);


        var customerOrder = [];
        $('.pq-' + _id).each(function() {

            var productOrder = {
                id: $(this).attr('itemID'),
                name: $(this).attr('pname'),
                ogquantity: parseInt($(this).attr('ogquan')),
                quantity: parseInt($(this).val()),
                price: parseInt($(this).attr('price')),
            }
            console.log("hello;;;" + productOrder);
            if(productOrder.quantity > 0) {
                $.get('/getPlaceStockOrder', {productID: productOrder.id, quantity: productOrder.ogquantity-productOrder.quantity, name: productOrder.name}, function(data, status) {
                    console.log(data + " " + status);
                });
            }
                   
            customerOrder.push(productOrder);
            console.log(productOrder);
        });

        //customerOrder.push(productOrder);
        //console.log(productOrder);
        $.post('/updateOrder',{_id:_id,customerName: name, contactNumber: contactnum, homeAddress: home, city: city, placedDate:placed,
            deliveryDate: delivery, courier: courier, paymentMethod: payment, status: status, deliveryFee: deliveryfee, overallPrice: prodTotal, customerOrder: customerOrder}, function(data, status) {
            console.log("UPDATED thru updatequan");
        })
    }
        
    
    //update
    function isFilledUpdateOrder(_id) {
                var valid = true
                var contactnum = $("#contactNumberModal-" + _id).val();
                var home = $("#homeAddressModal-" + _id).val();
                var city = $("#cityModal-" + _id).val();
                //dates
                var delivery = $("#deliveryDateModal-" + _id).val();
                //dropdowns
                var courier = $("#courierModal-" + _id).html();
                var payment = $("#paymentMethodModal-" + _id).html();
                var status = $("#statusModal-" + _id).html();
                var deliveryfee = $("#deliveryFeeModal-" + _id).val();  
                if (validator.isEmpty(contactnum)) {
                    $("#contactNumberModal-" + _id).css("border-color", "red");
                    valid = false
                }
                if (validator.isEmpty(home)) {
                    $("#homeAddressModal-" + _id).css("border-color", "red");
                    valid = false
                }
               
                if (validator.isEmpty(city)) {
                    $("#cityModal-" + _id).css("border-color", "red");
                    valid = false
                }
                if (validator.isEmpty(delivery)) {
                    $("#deliveryDateModal-" + _id).css("border-color", "red");
                    valid = false
                }
                if (validator.isEmpty(courier)) {
                    $("#courierModal-" + _id).css("border-color", "red");
                    valid = false
                }
               
                if (validator.isEmpty(payment)) {
                    $("#paymentMethodModal-" + _id).css("border-color", "red");
                    valid = false
                }
                if (validator.isEmpty(status)) {
                    $("#statusModal-" + _id).css("border-color", "red");
                    valid = false
                }         
                if (validator.isEmpty(deliveryfee)) {
                    $("#deliveryFeeModal-" + _id).css("border-color", "red");
                    valid = false
                }      
                return valid;
            }
    function checkContactNum(_id) {
                var valid = true
                 
                if($.trim($("#contactNumberModal-" + _id).val()).length != 10) {
                    $("#contactNumberModal-" + _id).css("border-color", "red");
                    valid = false
                }
                return valid;
            }
    
        
    function saveChanges(_id) {
                
                var name = $('#name-' + _id).val();
                var contactnum = $("#contactNumberModal-" + _id).val();
                var home = $("#homeAddressModal-" + _id).val();
                var city = $("#cityModal-" + _id).val();
                //dates
                var placed = $("#placedDateModal-" + _id).val();
                var delivery = $("#deliveryDateModal-" + _id).val();
                //dropdowns
                var courier = $("#courierModal-" + _id).html();
                var payment = $("#paymentMethodModal-" + _id).html();
                var status = $("#statusModal-" + _id).html();
                var deliveryfee = $("#deliveryFeeModal-" + _id).val();   
                var prodTotal = $("#overallPriceModal-" + _id).val();
                
                if(!isFilledUpdateOrder(_id))
                    $("#errorUpdate-" + _id).text("Properly fill out all fields.");
               else if (!checkContactNum(_id))
                    $("#errorUpdate-" + _id).text("Contact number should be 10 digits and not empty.");
                else {
                    $('.pq-' + _id).each(function() {
                        var prodID = $(this).attr('itemID');
                        updateQuan(prodID, _id);
                    });



                    $("#contactNumberModal-" + _id).attr('og', contactnum);
                    $("#homeAddressModal-" + _id).attr('og', home);
                    $("#cityModal-" + _id).attr('og', city);
                    //dates
                    $("#placedDateModal-" + _id).attr('og', placed);
                    $("#deliveryDateModal-" + _id).attr('og', delivery);
                    //dropdowns
                    $("#courierModal-" + _id).attr('og', courier);
                    $("#paymentMethodModal-" + _id).attr('og', payment);
                    $("#statusModal-" + _id).attr('og', status);
                    $("#deliveryFeeModal-" + _id).attr('og', deliveryfee);  
                    $("#overallPriceModal-" + _id).val();
                    setTimeout(function() {
                            window.location.reload();
                        }, 400);
                        
                }
            }
            function filterNameAsc() {
                var table, rows, switching, i, x, y, shouldSwitch;
                table = document.getElementById("orderTable");
                switching = true;
                /*Make a loop that will continue until
                no switching has been done:*/
                while (switching) {
                    //start by saying: no switching is done:
                    switching = false;
                    rows = table.rows;
                    /*Loop through all table rows (except the
                    first, which contains table headers):*/
                    for (i = 1; i < (rows.length - 1); i++) {
                        //start by saying there should be no switching:
                        shouldSwitch = false;
                        /*Get the two elements you want to compare,
                        one from current row and one from the next:*/
                        x = rows[i].getElementsByTagName("TD")[0];
                        y = rows[i + 1].getElementsByTagName("TD")[0];
                        //check if the two rows should switch place:
                        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                            //if so, mark as a switch and break the loop:
                            shouldSwitch = true;
                            break;
                        }
                    }
                    if (shouldSwitch) {
                        /*If a switch has been marked, make the switch
                        and mark that a switch has been done:*/
                        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                        switching = true;
                    }
                }
            }

            function filterNameDesc() {
                var table, rows, switching, i, x, y, shouldSwitch;
                table = document.getElementById("orderTable");
                switching = true;
                /*Make a loop that will continue until
                no switching has been done:*/
                while (switching) {
                    //start by saying: no switching is done:
                    switching = false;
                    rows = table.rows;
                    /*Loop through all table rows (except the
                    first, which contains table headers):*/
                    for (i = 1; i < (rows.length - 1); i++) {
                        //start by saying there should be no switching:
                        shouldSwitch = false;
                        /*Get the two elements you want to compare,
                        one from current row and one from the next:*/
                        x = rows[i].getElementsByTagName("TD")[0];
                        y = rows[i + 1].getElementsByTagName("TD")[0];
                        //check if the two rows should switch place:
                        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                            //if so, mark as a switch and break the loop:
                            shouldSwitch = true;
                            break;
                        }
                    }
                    if (shouldSwitch) {
                        /*If a switch has been marked, make the switch
                        and mark that a switch has been done:*/
                        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                        switching = true;
                    }
                }
            }

            function filterStatus() {
                var table, rows, switching, i, x, y, shouldSwitch;
                table = document.getElementById("orderTable");
                switching = true;
                /*Make a loop that will continue until
                no switching has been done:*/
                while (switching) {
                    //start by saying: no switching is done:
                    switching = false;
                    rows = table.rows;
                    /*Loop through all table rows (except the
                    first, which contains table headers):*/
                    for (i = 1; i < (rows.length - 1); i++) {
                        //start by saying there should be no switching:
                        shouldSwitch = false;
                        /*Get the two elements you want to compare,
                        one from current row and one from the next:*/
                        x = rows[i].getElementsByTagName("TD")[3];
                        y = rows[i + 1].getElementsByTagName("TD")[3];
                        //check if the two rows should switch place:
                        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                            //if so, mark as a switch and break the loop:
                            shouldSwitch = true;
                            break;
                        }
                    }
                    if (shouldSwitch) {
                            /*If a switch has been marked, make the switch
                            and mark that a switch has been done:*/
                            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                            switching = true;
                    }
                }
            }

            function filterCourier() {
                var table, rows, switching, i, x, y, shouldSwitch;
                table = document.getElementById("orderTable");
                switching = true;
                /*Make a loop that will continue until
                no switching has been done:*/
                while (switching) {
                    //start by saying: no switching is done:
                    switching = false;
                    rows = table.rows;
                    /*Loop through all table rows (except the
                    first, which contains table headers):*/
                    for (i = 1; i < (rows.length - 1); i++) {
                        //start by saying there should be no switching:
                        shouldSwitch = false;
                        /*Get the two elements you want to compare,
                        one from current row and one from the next:*/
                        x = rows[i].getElementsByTagName("TD")[4];
                        y = rows[i + 1].getElementsByTagName("TD")[4];
                        //check if the two rows should switch place:
                        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                            //if so, mark as a switch and break the loop:
                            shouldSwitch = true;
                            break;
                        }
                    }
                    if (shouldSwitch) {
                        /*If a switch has been marked, make the switch
                        and mark that a switch has been done:*/
                        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                        switching = true;
                    }
                }
            }

            function filterPaymentMethod() {
                var table, rows, switching, i, x, y, shouldSwitch;
                table = document.getElementById("orderTable");
                switching = true;
                /*Make a loop that will continue until
                no switching has been done:*/
                while (switching) {
                    //start by saying: no switching is done:
                    switching = false;
                    rows = table.rows;
                    /*Loop through all table rows (except the
                    first, which contains table headers):*/
                    for (i = 1; i < (rows.length - 1); i++) {
                        //start by saying there should be no switching:
                        shouldSwitch = false;
                        /*Get the two elements you want to compare,
                        one from current row and one from the next:*/
                        x = rows[i].getElementsByTagName("TD")[5];
                        y = rows[i + 1].getElementsByTagName("TD")[5];
                        //check if the two rows should switch place:
                        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                            //if so, mark as a switch and break the loop:
                            shouldSwitch = true;
                            break;
                        }
                    }
                    if (shouldSwitch) {
                        /*If a switch has been marked, make the switch
                        and mark that a switch has been done:*/
                        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                        switching = true;
                    }
                }
            }

    /* print pdf */
    const { PDFDocument, StandardFonts, rgb } = PDFLib
    async function createPdf(modalID) {
      // Create a new PDFDocument
      const pdfDoc = await PDFDocument.create()
      // Embed the Helvetica
      const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica)
      const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)      
      // Add a blank page to the document
      const page = pdfDoc.addPage()
      // Get the width and height of the page
      const { width, height } = page.getSize()
      // Draw a string of text toward the top of the page
      const fontSize = 20
      var title = 'Receipt';
      page.drawText( title + '\n', {
        x: 50,
        y: height - 4 * fontSize,
        size: fontSize,
        font: helveticaBold,
        color: rgb(0, 0, 0),
      });
      const fontSizeBody = 14;
      var name =  ($(("#name-" + modalID)).text()).toString();
      var number = ($(("#contactNumberModal-" + modalID)).val()).toString();
      var address = ($(("#homeAddressModal-" + modalID)).val()).toString() + "- " + ($(("#cityModal-" + modalID)).val()).toString();
      var placed =  ($(("#placedDateModal-" + modalID)).val());
      var deliverydate = ($(("#deliveryDateModal-" + modalID)).val());
      var courier = ($(("#courierModal-" + modalID)).val()).toString();
      var status = ($(("#statusModal-"+ modalID)).val()).toString();
      var lenprod = parseInt($("#prods-" + modalID).attr('lenCustomerOrder'));
      //var newQuan = $("#" + _id + "-" + prodID).val();

      //var name = $("#" + modalID + "-" + prodID).attr('pname');
      //len of products
      console.log("inside createpdf()");
      var arr = [];
      $('.pq-' + modalID).each(function() {
        pname= $(this).attr('pname');
        quantity= ($(this).val()).toString();
        if (quantity > 0 ){
            arr.push("\n" + pname + "    -   " + quantity);
            console.log("item: " + pname + quantity);
        }         
      });
      var listprod = arr[0];
     
      for (var i = 1; i<arr.length; i++) {
        listprod = listprod + arr[i];
      }
        
      page.drawText("\n\nName:                       " + name + 
                    "\nContact Number:      " + number +
                    "\nAddress:                   " + address + 
                    "\nDate Placed:             " + placed +
                    "\nDelivery Date:           " + deliverydate + 
                    "\nCourier:                     " + courier + 
                    "\nStatus:                       " + status +
                    "\n\nItems:" + listprod + 
                    "\n"
                    ,
      {
        x: 50,
        y: height - 6 * fontSizeBody,
        size: fontSizeBody,
        font: helvetica,
        color: rgb(0, 0, 0),
      });
      const fontSizeFees = 14
      var overall =  ($(("#overallPriceModal-" + modalID)).val()).toString();
      var dfee = ($(("#deliveryFeeModal-" + modalID)).val()).toString();
      var total = ($(("#totalPriceModal-" + modalID)).val()).toString();
      page.drawText( "\n\nOverall Payment:                      " + overall + 
                     "\nDelivery Fee:                             " + dfee +
                     "\nTotal Price:                                " + total
        , {
        x: 50,
        y: height - 33 * fontSize,
        size: fontSizeFees,
        font: helveticaBold,
        color: rgb(0, 0, 0),
      });
      // Serialize the PDFDocument to bytes (a Uint8Array)
      const pdfBytes = await pdfDoc.save()
      // Trigger the browser to download the PDF document
      download(pdfBytes, name  + ".pdf", "application/pdf");
    };
 
