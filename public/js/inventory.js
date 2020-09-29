$(document).ready(function() {
    
    
   

    $("#addProductButton").click(function() {
        var name = $("#name").val();
        var amountPerPack = $("#amountPerPack").val();
        var quantity = $("#stockQuantity").val();
        var price = $("#pricePerPack").val();
        var lowStockQuantity = $("#lowStockQuantity").val();

       
        // Adding New Product
        $.post('/addProduct',{name: name, amountPerPack: amountPerPack, quantity: quantity, price: price, lowStockQuantity: lowStockQuantity}, function(data, status) {
            $("#name").val("");
            $("#amountPerPack").val("");
            $("#stockQuantity").val("");
            $("#pricePerPack").val("");
            $("#lowStockQuantity").val("");       
            $("#addProduct").modal("hide");
            
            $("body").load('/inventory');
        });
    });

    $(document).on('click', ".name", function(){
        var name = $(this).attr('name');
        $.post('/delProduct',{name: name}, function(data, status) {


            $("body").load('/inventory');
        });

    });
    
    $('.name').prop('disabled', true);
    
    $(document).on('keyup', ".deleteConfirmation", function(){
        var confirm = $(this).val();
        $('.name').prop('disabled', true);
        if(confirm === "CONFIRM")
        {
            $('.name').prop('disabled', false);
        }
        else
            $('.name').prop('disabled', true);

    });


    // Validation
    function isFilled() {

        /*
            gets the value of a specific field in the signup form
            then removes leading and trailing blank spaces
        */
        var name = validator.trim($('#name').val());
        var amountPerPack = validator.trim($('#amountPerPack').val());
        var quantity = validator.trim($('#stockQuantity').val());
        var pricePerPack = validator.trim($('#pricePerPack').val());
        var lowstockQuantity = validator.trim($('#lowStockQuantity').val());

        /*
            checks if the trimmed values in fields are not empty
        */
        var nameEmpty = validator.isEmpty(name);
        var amountPerPackEmpty = validator.isEmpty(amountPerPack);
        var quantityEmpty = validator.isEmpty(quantity);
        var pricePerPackEmpty = validator.isEmpty(pricePerPack);
        var lowstockQuantityEmpty = validator.isEmpty(lowstockQuantity);
        

        return !nameEmpty && !amountPerPackEmpty && !quantityEmpty && !pricePerPackEmpty && !lowstockQuantityEmpty;
    }


    function isValidAmountPerPack(field) {
        var amountPerPack = validator.trim($('#amountPerPack').val());


        if(parseInt(amountPerPack) > 0 && (amountPerPack % 1 === 0)) {
            if(field.is($("#amountPerPack")))
                $("#amountPerPackError").text("");

            return true;
        }
        else {
            if(field.is($("#amountPerPack")))
                $("#amountPerPackError").text("Amount per Pack should be a positive integer and not empty.");

            return false;
        }

    }

    function isValidStockQuantity(field) {
        var quantity = validator.trim($('#stockQuantity').val());

        if(parseInt(quantity) >= 0 && (quantity % 1 === 0)) {
            if(field.is($("#stockQuantity")))
                $("#quantityError").text("");
            
            return true;
        }
        else {
            if(field.is($("#stockQuantity")))
                $("#quantityError").text("Stock Quantity should be a positive integer and not empty.");

            return false;
        }
    }

    function isValidPricePerPack(field) {
        var pricePerPack = validator.trim($('#pricePerPack').val());

        if(parseFloat(pricePerPack) >= 0) {
            if(field.is($("#pricePerPack")))
                $("#pricePerPackError").text("");

            return true;
        }
        else {
            if(field.is($("#pricePerPack")))
                $("#pricePerPackError").text("Price per Pack should be a positive number and not empty.");
            
            return false;
        }
    }

    function isValidLowStockQuantity(field) {
        var lowstockQuantity = validator.trim($('#lowStockQuantity').val());

        if((parseInt(lowstockQuantity) >= 0) && (lowstockQuantity % 1 === 0)) {
            if(field.is($("#lowStockQuantity")))
                $("#lowStockQuantityError").text("");

            return true;
        }
        else {
            if(field.is($("#lowStockQuantity")))
                $("#lowStockQuantityError").text("Quantity should be 0 or a positive integer and not empty.");
            
            return false;
        }
    }

    function isUniqueProduct() {
        var name = validator.trim($('#name').val());
        var amountPerPack = validator.trim($('#amountPerPack').val());


        $.get('/findProduct', {name:name, amountPerPack:amountPerPack}, function(data, result) {
            if(data.name == name && data.amountPerPack == amountPerPack){
                $('#addProductButton').prop('disabled', true);
                $('#uniqueError').text("Product already exists.");

            }
            else {
                $('#addProductButton').prop('disabled', false);
                $('#uniqueError').text("");
            }
        });
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
        var validAmountPerPack = isValidAmountPerPack(field);
        var validStockQuantity = isValidStockQuantity(field);
        var validPricePerPack = isValidPricePerPack(field);
        var validLowStockQuantity = isValidLowStockQuantity(field);
        console.log(filled + " " + validAmountPerPack + " " + validStockQuantity + " " +  validPricePerPack + " " + validLowStockQuantity);
        

        if(filled && validAmountPerPack && validStockQuantity && validPricePerPack && validLowStockQuantity) {
            $('#addProductButton').prop('disabled', false);
            isUniqueProduct();
        }
            
        else 
            $('#addProductButton').prop('disabled', true);
    }
    


    $('#name').keyup(function () {
        validateField($('#name'), 'Product Name', $('#nameError'));
    });

    $('#amountPerPack').keyup(function () {
        validateField($('#amountPerPack'), 'Amount Per Pack', $('#amountPerPackError'));
    });

    $('#stockQuantity').keyup(function () {
        validateField($('#stockQuantity'), 'Stock Quantity', $('#quantityError'));
    });

    $('#pricePerPack').keyup(function () {
        validateField($('#pricePerPack'), 'Price per Pack', $('#pricePerPackError'));
    });

    $('#lowStockQuantity').keyup(function () {
        validateField($('#lowStockQuantity'), 'Low Stock Quantity', $('#lowStockQuantityError'));
    });

    
    $('#addProduct').on('hidden.bs.modal', function () {
        $('#nameError').text('');
        $('#amountPerPackError').text('');
        $('#quantityError').text('');
        $('#pricePerPackError').text('');
        $('#lowStockQuantityError').text('');
        $('#name').val('');
        $('#amountPerPack').val('');
        $('#stockQuantity').val('');
        $('#pricePerPack').val('');
        $('#lowStockQuantity').val('');
     });

     

});