$(document).ready(function() {


    $("#buttonAddOrder").click(function(){
        $.get('/getProductsSold', {}, function(data, status) {
            // console.log(data);
            for(var i = 0; i < data.length; i++) {
                $("#productSold").append("<tr>");
                $("#productSold").append("<th scope='row' id='" + data[i]._id + "'>" + data[i].name + "</th>");
                $("#productSold").append("<td><input type='number' id=quantity-'" + data[i]._id + "class='form-control validate'></td>");
                $("#productSold").append("<td><p id='" +  "price-" + data[i]._id + "' class='form-control validate'></p></td>");
                $("#productSold").append("</tr>");
                console.log("item added");
            }

        });

    });
    

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


        $.post('/addOrder',{customerName: customerName, contactNumber: contactNumber, homeAddress: homeAddress, city: city, productTotal: productTotal, paymentMethod: paymentMethod, courier: courier, status: status, deliveryDate: deliveryDate, deliveryFee: deliveryFee, placedDate: placedDate }, function(data, status) {
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
