$(function(){
    var cprgen = new CprGen();
    $('#submitBtn').click(function () {
        var birthday = $("#birthday").val();
        var amount = $("#amount").val();
        var hyphen = $("#chk_hyphen").is(':checked');
        var cprSet = cprgen.generateAmount(birthday,hyphen,amount);
        $("#cprArea").html("");
        var cprs = Array.from(cprSet);
        cprs.sort();
        $.each(cprs, function( index, value ) {
            $("#cprArea").append(value+"<br>");
          });
        
    });
});

