$(document).ready(function() {
    

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
        var placedDate = new Date(); //current date 


        $.post('/addOrder',{customerName: customerName, contactNumber: contactNumber, homeAddress: homeAddress, city: city, productTotal: productTotal, paymentMethod: paymentMethod, courier: courier, status: status, deliveryDate: deliveryDate, placedDate: placedDate }, function(data, status) {
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
