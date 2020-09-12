$(document).ready(function() {
    console.log("hello");
    var name = $("#addName").val();
    var amountPerPack = $("#amountPerPack").val();
    var quantity = $("#stockQuantity").val();
    var price = $("#pricePerPack").val();
    var lowstockQuantity = $("#lowStockQuantity").val();

    $("#addProductButton").click(function() {
        console.log(name);
    });
});