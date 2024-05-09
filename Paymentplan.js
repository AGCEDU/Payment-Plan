$("#select3").change(function(){
            let vatRate = $(this).val();
            // Iterate over each row in the table
            $(".mytable tr").each(function(){
                let feeInput = $(this).find('td').eq(2).find('input');
                let vatInput = $(this).find('td').eq(3).find('input');
                let totalInput = $(this).find('td').eq(4).find('input');
                
                if (feeInput.length > 0 && vatInput.length > 0 && totalInput.length > 0) {
                    let fee = parseFloat(feeInput.val());
                    if (isNaN(fee)) {
                        fee = 0;
                    }
                    
                    let vatAmount = fee * (vatRate / 100);
                    let totalAmount = fee + vatAmount;

                    vatInput.val(vatAmount.toFixed(2));
                    totalInput.val(totalAmount.toFixed(2));
                }
            });
        });

        function calculateTotals() {
                   var total_fees = 0;
                   var total_vat = 0;
                   var total_amount = 0;

                   $('input[name="fees[]"], input[name="thesis_fees"], input[name="admission_fees').each(function() {
                       total_fees += parseFloat($(this).val()) || 0;
                   });

                   $('input[name="vat[]"], input[name="thesis_vat"], input[name="admission_vat"]').each(function() {
                       total_vat += parseFloat($(this).val()) || 0;
                   });

                   $('input[name="total[]"], input[name="thesis_amount"], input[name="admission_amount"]').each(function() {
                       total_amount += parseFloat($(this).val()) || 0;
                   });


                   $('#total_fees').val(total_fees.toFixed(2));
                   $('#total_vat').val(total_vat.toFixed(2));
                   $('#total_amount').val(total_amount.toFixed(2));
               }

        $(document).on('keyup', 'input[name="fees[]"], input[name="thesis_fees"], input[name="admission_fees"], input[name="tran_fees"]',  function() {
            // get the value of the fees
            var fee = $(this).val();
            
            // calculate the vat
            var vatRate = parseFloat($('#select3').val()) / 100;
            var vat = fee * vatRate; // 5% VAT
            
            // calculate the total
            var total = parseFloat(fee) + parseFloat(vat);
            
            // set the vat and total values based on the input field
            if ($(this).attr('name') == 'fees[]') {
                $(this).closest('tr').find('input[name="vat[]"]').val(vat.toFixed(2));
                $(this).closest('tr').find('input[name="total[]"]').val(total.toFixed(2));
            } else if ($(this).attr('name') == 'thesis_fees') {
                $('input[name="thesis_vat"]').val(vat.toFixed(2));
                $('input[name="thesis_amount"]').val(total.toFixed(2));
            } else if ($(this).attr('name') == 'admission_fees') {
                $('input[name="admission_vat"]').val(vat.toFixed(2));
                $('input[name="admission_amount"]').val(total.toFixed(2));
            }


            // calculate and set the total of all fees, vat, and amount
            var total_fees = 0;
            var total_vat = 0;
            var total_amount = 0;

            $('input[name="fees[]"], input[name="thesis_fees"], input[name="admission_fees"]').each(function() {
                total_fees += parseFloat($(this).val()) || 0;
            });

            $('input[name="vat[]"], input[name="thesis_vat"], input[name="admission_vat"]').each(function() {
                total_vat += parseFloat($(this).val()) || 0;
            });

            $('input[name="total[]"], input[name="thesis_amount"], input[name="admission_amount"]').each(function() {
                total_amount += parseFloat($(this).val()) || 0;
            });

            // var formatter = new Intl.NumberFormat('en-US');

           $('#total_fees').val(total_fees.toFixed(2));
            $('#total_vat').val(total_vat.toFixed(2));
            $('#total_amount').val(total_amount.toFixed(2));

            calculateTotals();
        });

$(document).ready(function(){
    $(document).on('click', '.icon', function() {

        var table = $(this).closest('.controls').siblings('table');
        var i = table.data('installmentCount') || 0;
        i++;
        table.data('installmentCount', i);
        var row = $('<tr><td><input type="text" name="insta[]" value="Installment ' + i + '" class="text-center" onkeydown="return event.key !== \'Enter\';"></td><td><input type="date" name="date[]" class=" text-center" placeholder="dd-mm-yy" onkeydown="return event.key !== \'Enter\';"></td><td>AED<input type="text" name="fees[]" onkeydown="return event.key !== \'Enter\';"></td><td>AED<input type="text" name="vat[]" onkeydown="return event.key !== \'Enter\';"></td><td>AED<input type="text" name="total[]" onkeydown="return event.key !== \'Enter\';"></td></tr>');
        
        row.find('.inputdate').datepicker({
            dateFormat: "d M yy" // set the format to dd-mm-yyyy
        });

        row.find('.inputdate').on('focus', function() {
            if ($(this).val() === '') {
                $(this).datepicker('setDate', new Date());
            }
        });
        table.find('tr.footer-row2').before(row);
    });
    $(document).on('click', '.icon-minus', function(){
        var table = $(this).closest('.controls').siblings('table');
        // We only allow deletion if there are more than 5 rows - the first one (registration), the last two, and at least two in the middle.
        if (table.find("tr").length > 4) {
           // Deleting the third row from the end, which is the first deletable row from the bottom.
           table.find('tr:nth-last-child(3)').remove();
            var i = table.data('installmentCount');
            i--;
            table.data('installmentCount', i);
            calculateTotals();
        }
    });
// CMBS MINUS ICON SCRIPT
    $(document).on('click', '.icon-minus-cmbs', function(){
        var table = $(this).closest('.controls').siblings('table');
        // We only allow deletion if there are more than 5 rows - the first one (registration), the last two, and at least two in the middle.
        if (table.find("tr").length > 6) {
           // Deleting the third row from the end, which is the first deletable row from the bottom.
           table.find('tr:nth-last-child(5)').remove();
            var i = table.data('installmentCount');
            i--;
            table.data('installmentCount', i);
            calculateTotals();
        }
    });


});


// // Todays Date
$( function() {
        $( "#input2_2" ).datepicker({ 
            dateFormat: "d M yy" // set the format to d-m-yyyy
        });
           $( "#input2_2" ).datepicker("setDate", new Date());
    });

$(function() {
    $("#inputdate").datepicker({
         dateFormat: "d M yy" // set the format to dd-mm-yyyy
    });
    $("#inputdate").datepicker("setDate", new Date());
});

$("#col-md-12 university text-center").change(fuction generatePDF(){
		   const {jsPDF} = window.jsPDF;
		   const doc = new jsPDF();
		   doc.save("new file.pdf");
		   });
