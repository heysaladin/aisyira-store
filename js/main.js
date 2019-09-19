
var _url = "https://my-json-server.typicode.com/heysaladin/pwaapi/products";

$(document).ready(function () {


    var dataResults = '';
    var catResults = '';
    var categories = [];

    $.get(_url, function (data) {
        $.each(data, function (key, items) {

            _cat = items.category;

            dataResults += "<div>"
                + "<h3>" + items.name + "</h3>"
                + "<p>" + items.category + "</p>"
            "</div>";

            if ($.inArray(items.category, categories) == -1) {
                categories.push(items.category)
                catResults += "<option value='" + _cat + "'>" + _cat + "</option>";
            }

        })

        $('#products').html(dataResults);
        $('#cat_select').html("<option value='all'>semua</option>" + catResults);

    })

});

// fungsi filter
$("#cat_select").on('change', function () {
    updateProduct($(this).val())
})

function updateProduct(cat) {

    var dataResults = '';
    var _newUrl = _url;

    if (cat != 'all')
        _newUrl = _url + "?category=" + cat

    $.get(_url, function (data) {




        $.each(data, function (key, items) {

            _cat = items.category;

            dataResults += "<div>"
                + "<h3>" + items.name + "</h3>"
                + "<p>" + items.category + "</p>"
            "</div>";

        })

        $('#products').html(dataResults);

    })

}