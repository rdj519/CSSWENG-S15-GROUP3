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

        console.log(customerName);
        
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

/* print pdf */
    const { PDFDocument, StandardFonts, rgb } = PDFLib
    async function createPdf() {
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
      const fontSizeBody = 14
      var name =  ($("#customerNameModal").val()).toString();
      var number = ($("#contactNumberModal").val()).toString();
      var address = ($("#homeAddressModal").val()).toString() + ", " + ($("#cityModal").val()).toString();
      var placed =  ($("#placedDateModal").val());
      var deliverydate = ($("#deliveryDateModal").val());
      var courier = ($("#courierModal").val()).toString();
      var status = ($("#statusModal").val()).toString();
      page.drawText("\n\nName:                       " + name + 
                    "\nContact Number:      " + number +
                    "\nAddress:                   " + address + 
                    "\nDate Placed:             " + placed +
                    "\nDelivery Date:           " + deliverydate + 
                    "\nCourier:                     " + courier + 
                    "\n\n\n INSERT TABLE OF ITEMS HERE \n\n\n" + 
                    "\nStatus:                     " + status +
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
      var overall =  ($("#overallPriceModal").val()).toString();
      var dfee = ($("#deliveryFeeModal").val()).toString();
      var total = ($("#totalPriceModal").val()).toString();
      page.drawText( "\n\nOverall Payment:                      " + overall + 
                     "\nDelivery Fee:                           " + dfee +
                     "\nTotal Price:                               " + total
        , {
        x: 50,
        y: height - 20 * fontSize,
        size: fontSizeFees,
        font: helveticaBold,
        color: rgb(0, 0, 0),
      });
      // Serialize the PDFDocument to bytes (a Uint8Array)
      const pdfBytes = await pdfDoc.save()
      // Trigger the browser to download the PDF document
      download(pdfBytes, name  + ".pdf", "application/pdf");
    };

 