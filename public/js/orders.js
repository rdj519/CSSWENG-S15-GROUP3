$(document).ready(function() {
    $("#productTotal").val(0);


    $.get('/getProductsSold', {}, function(data, status) {
        for(var i = 0; i < data.length; i++) {
            $("#productSold").append("<tr>");
            $("#productSold").append("<th scope='row' id='" + data[i]._id + "'>" + data[i].name + "</th>");
            $("#productSold").append("<td><input type='number' id='quantity-" + data[i]._id + "' price='"+ data[i].price +"' productID =' "+ data[i]._id +"' productName ='" + data[i].name + "' amountPerPack ='"+data[i].amountPerPack +"' class='form-control validate productQuantity' value=0></td>");
            $("#productSold").append("<td><p id='" +  "price-" + data[i]._id + "' class='form-control validate productPrice'></p></td>");
            $("#productSold").append("</tr>");
        }
    });


    $(document).on('change', ".productQuantity", function(){
        var price = parseFloat($(this).attr('price'));
        var id = $(this).attr('productID');
        var qty = parseInt($(this).val());
        var qtyID = "#price-"+ id.trim();
    
        $(qtyID).text(qty * price);

        var sum = 0;

        $('.productPrice').each(function() {
            // var current = parseFloat($("#productTotal").val());
            sum += parseFloat($(this).text()) || 0;
        })
        $("#productTotal").val(sum);
        
    })


    

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
        var placedDate = new Date(); //current date 
        var customerOrder = [];

        $('.productQuantity').each(function() {
            var productOrder = {
                id: $(this).attr('productID'),
                name: $(this).attr('productName'),

                quantity: parseInt($(this).val()),
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
});
