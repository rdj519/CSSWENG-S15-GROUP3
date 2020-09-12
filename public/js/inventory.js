$(document).ready(function() {
    
    
   

    $("#addProductButton").click(function() {
        var name = $("#name").val();
        var amountPerPack = $("#amountPerPack").val();
        var quantity = $("#stockQuantity").val();
        var price = $("#pricePerPack").val();
        var lowstockQuantity = $("#lowStockQuantity").val();
        console.log(name);
        $.post('/addProduct',{name: name, amountPerPack: amountPerPack, quantity: quantity, price: price, lowstockQuantity: lowstockQuantity}, function(data, status) {
            $("#name").val("");
            $("#amountPerPack").val("");
            $("#stockQuantity").val("");
            $("#pricePerPack").val("");
            $("#lowStockQuantity").val("");       
            
            $("#addProduct").modal("hide");
            
            $.get('/findProduct', {name: name, amountPerPack: amountPerPack}, function(data, status) {
                console.log(data.name);
            })

            $("body").load('/inventory');

            // $("#tbody").append("{{> productRow pitemID=" + data._id  + "pname=" + data.name + "pamountPerPack=" + data.amountPerPack + "pquantity=" + data.quantity + "pprice=" + data.price + "plowStockQuantity=" + data.lowStockQuantity + "}}" );
            
            
        });
        
    });
});