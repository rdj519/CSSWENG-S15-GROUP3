$(document).ready(function() {
    
    $(".dropdown-toggle").dropdown();
   

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
        var _id = $(this).attr('productID');
        $.post('/delProduct',{_id:_id}, function(data, status) {


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


    //update validation

    function filledUpdate(_id) {
        var stock = validator.trim($('#stockQuantity-'+ _id).val());
        var price = validator.trim($('#pricePerPack-'+ _id).val());
        var low = validator.trim($('#lowStock-'+ _id).val());

        var stockEmpty = validator.isEmpty(stock);
        var priceEmpty = validator.isEmpty(price);
        var lowEmpty = validator.isEmpty(low);

        return !stockEmpty && !priceEmpty && !lowEmpty;
    }

    function nonNegativeUpdate(_id){
        var stock = validator.trim($('#stockQuantity-'+ _id).val());
        var price = validator.trim($('#pricePerPack-'+ _id).val());
        var low = validator.trim($('#lowStock-'+ _id).val());

        var stockNegative = false;
        var priceNegative = false;
        var lowNegative = false;
        if(stock < 0)
        {
            stockNegative = true;
            $('errorStock-'+_id).text('Stock Quantity should be a positive number.');
        }
        if(price < 0){
            priceNegative = true;
            $('errorPrice-'+_id).text('Price Per Pack should be a positive number.');
        }
        if(low < 0){
            lowNegative = true;
            $('errorLow-'+_id).text('Price Per Pack should be a positive number.');
        }
        return !stockNegative && !priceNegative && !lowNegative;
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
        var nonNegative = nonNegativeUpdate(_id);

        if(filled && nonNegative) {
            $(_id + '-saveChanges').prop('disabled', false);
        }
        else {
            $(_id + '-saveChanges').prop('disabled', true);
        }
    }

    $('.classStock').keyup(function() {
        var _id = $(this).attr('itemID');   
        validateUpdate($(this),'Stock Quantity', $("#errorStock-"+_id), _id);
    });

    $('.classPrice').keyup(function() {
        var _id = $(this).attr('itemID');
        validateUpdate($(this),'Price Per Pack', $("#errorPrice-"+_id), _id);
    });

    $('.classLow').keyup(function() {
        var _id = $(this).attr('itemID');
        validateUpdate($(this),'Low Stock Quantity', $("#errorLow-"+_id), _id);
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

function isFilledUpdate(itemID) {
    var valid = true
    var stock = validator.trim($("#stockQuantity-" + itemID).val());
    var price = validator.trim($("#pricePerPack-" + itemID).val());
    var low = validator.trim($("#lowStock-" + itemID).val());

    if (validator.isEmpty(stock)) {
        $("#stockQuantity-" + itemID).css("border-color", "red");
        valid = false
    }

    if (validator.isEmpty(price)) {
        $("#pricePerPack-" + itemID).css("border-color", "red");
        valid = false
    }
   
    if (validator.isEmpty(low)) {
        $("#lowStock-" + itemID).css("border-color", "red");
        valid = false
    }

    return valid;
}

function isValid(itemID) {
    var valid = true
    var stock = validator.trim($("#stockQuantity-" + itemID).val());
    var price = validator.trim($("#pricePerPack-" + itemID).val());
    var low = validator.trim($("#lowStock-" + itemID).val());

    if (stock < 0) {
        $("#stockQuantity-" + itemID).css("border-color", "red");
        valid = false
    }

    if (price < 0) {
        $("#pricePerPack-" + itemID).css("border-color", "red");
        valid = false
    }
   
    if (low < 0) {
        $("#lowStock-" + itemID).css("border-color", "red");
        valid = false
    }

    return valid;
}

function saveChanges(itemID) {
    var labelName = $('#productName-' + itemID);
    var pname = labelName.attr('value');
    var labelAmt = $('#amountPerPack-' + itemID);
    var amt = labelAmt.attr('value');
    var stock = $("#stockQuantity-" + itemID).val();
    var price = $("#pricePerPack-" + itemID).val();
    var low = $("#lowStock-" + itemID).val();
    var _id = itemID;

    if(!isFilledUpdate(itemID)) {
        $("#errorUpdate-" + itemID).text("Properly fill out all fields.");
    }
    else if (!isValid(itemID)) {
        $("#errorUpdate-" + itemID).text("Input should be a positive integer and not empty.");
    }
    else {  
        $.post('/updateProd',{_id: _id, name: pname, amountPerPack: amt, quantity: stock, price: price, lowstockQuantity: low}, function(data, status) {
            setTimeout(function() {
                window.location.reload();
            }, 500);
        })
    }
}

function deleteProduct(itemID) {
    
}

//NESTED DROPDOWN
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
    $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
    $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
});

/* Sort by Name Alphabetical (A-Z)*/
function sortTableAlphabetical() {
var table, rows, switching, i, x, y, shouldSwitch;
table = document.getElementById("productTable");
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

/* Sort by Name Alphabetical (Z-A) */
function sortTableAlphabeticalDesc() {
var table, rows, switching, i, x, y, shouldSwitch;
table = document.getElementById("productTable");
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

/* Sort by Price Ascending */
function sortTablePrice() {
var table, rows, switching, i, x, y, shouldSwitch;
table = document.getElementById("productTable");
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
        if (Number(x.innerHTML) > Number(y.innerHTML)) {
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

/* Sort by Price Ascending Desc.*/
function sortTablePriceDesc() {
var table, rows, switching, i, x, y, shouldSwitch;
table = document.getElementById("productTable");
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
        if (Number(x.innerHTML) < Number(y.innerHTML)) {
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

/* Sort by Stock Quantity Ascending */
function sortTableStockQuantity() {
var table, rows, switching, i, x, y, shouldSwitch;
table = document.getElementById("productTable");
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
        x = rows[i].getElementsByTagName("TD")[2];
        y = rows[i + 1].getElementsByTagName("TD")[2];
        //check if the two rows should switch place:
        if (Number(x.innerHTML) > Number(y.innerHTML)) {
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

/* Sort by Stock Quantity Ascending Desc.*/
function sortTableStockQuantityDesc() {
var table, rows, switching, i, x, y, shouldSwitch;
table = document.getElementById("productTable");
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
        x = rows[i].getElementsByTagName("TD")[2];
        y = rows[i + 1].getElementsByTagName("TD")[2];
        //check if the two rows should switch place:
        if (Number(x.innerHTML) < Number(y.innerHTML)) {
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

function liveSearch() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("productTable");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}