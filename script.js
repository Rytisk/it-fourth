function isEmpty(value) {
    return value === null || value === "";
}

function isInteger(value) {
    return parseInt(value) && value > 0;
}

function isDateFormat(date) {
    var array = date.split('-');
    if (array.length !== 3) {
        return false;
    }

    if (array[0].length != 4 || array[1].length != 2 || array[2].length != 2) {
        return false;
    }

    var year = Number(array[0]);
    var month = Number(array[1])-1;
    var day = Number(array[2]);

    if (array[0] != year) {
        return false;
    }

    if (month < 0 || month > 11) {
        return false;
    }

    var dateO = new Date(year, month, day);
    if (dateO.getDate() != day) {
        return false;
    }
    return true;
}

function validateForm() {
    var errors = [];

    if (isEmpty($("#deviceName").val())) {
        errors.push("Device name field is empty.");
    }

    if (!isDateFormat($('#date').val())) {

        errors.push("Registration date wrong format.");
    }

    if (!isInteger($('#quantity').val())) {
        errors.push("Quantity should be an integer.");
    }

    showErrors(errors);
    return errors.length;
}

function showErrors(value) {
    value.forEach(element => {
        alert(element);
    });
}

function registerDevices(name, date, quantity) {
    var data = {
        "name" : name,
        "date": date,
        "quantity": quantity
    };

    var data = JSON.stringify(data);
    
    $.ajax({
        url:"https://api.myjson.com/bins",
        type:"POST",
        data: data,
        contentType:"application/json; charset=utf-8",
        dataType:"json",
        success: function(data, textStatus, jqXHR){
            $.get(data.uri, function (data, textStatus, jqXHR) {
                let row = $("<tr><td>" + data.name + "</td><td>" + data.date + "</td><td>" + data.quantity + "</td><</tr>")
                $('.deviceTable').append(row);
            });
        }
    });
}

$(document).ready(function() {
    $('#registrationForm').submit(function(e) {
        e.preventDefault();
        if (validateForm() === 0) {
            registerDevices($("#deviceName").val(), $("#date").val(), $("#quantity").val())
        }
    });

    $('#optInfo').on('change', function(e) {
        e.preventDefault();
        $optionalProperties = $('.optional');

        if ($optionalProperties.hasClass('hidden')) {
            $optionalProperties.removeClass('hidden');
        } else {
            $optionalProperties.addClass('hidden');
        }
    });

    $('#magic').on("click", function(e) {
        $('#devices').attr('style', 'color: blue' + ';');
        $('#devices h2').text("These are our Devices");
    });

    $('#addNews').on("click", function(e) {
        $paragraphs = $('.paragraphs');
        $paragraphs.append('<p>' + $('#newsData').val() + '</p>');

        $newsRemoval = $('.newsRemoval');
        if ($newsRemoval.hasClass('hidden')) {
            $newsRemoval.removeClass('hidden');
        }
    });

    $('#removeNews').on("click", function(e) {
        $('.paragraphs').children().slice($('#indexToDelete').val()-1).detach();
    });
})