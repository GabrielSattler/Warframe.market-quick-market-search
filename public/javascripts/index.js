function getItems() {
    let val = $('#search').val().replace(/ +/g, '_').toLowerCase();

    if (val == '' || val == false || val == null || val == '_')
        return;

    val = val.toLowerCase();
    val = val.replace(/\s\s+/g, '_');
    $('.container').html('');

    $('#waiting').removeClass('hide');
    $('.input').addClass('hide');

    let data = { item: val };
    console.log(JSON.stringify(data));

    const res = fetch('http://127.0.0.1:3000/s', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            $('.input').removeClass('hide');
            return res.json();
        })
        .then(res => {
            console.log(res.payload.orders.sort(function (a, b) {
                return a.platinum - b.platinum;
            }))

            let total = 0;
            let sum = 0;

            for (let i = 0; i < 15; i++) {
                if (res.payload.orders[i].platinum != null) {
                    total += res.payload.orders[i].platinum;
                    sum++;
                }
            }
            total = total / sum;
            total = Math.round(total);

            $('.container').html(`<p class="title">Average recent price:</p><div class="priceBlock"><img src="https://n9e5v4d8.ssl.hwcdn.net/images/starterpack2020/plat-color.png"><p class="price">${total}</p></div>`)
            $('#waiting').addClass('hide');
            $('.input').removeClass('hide');
        })
}

$("#search").keypress(function (e) {
    if (e.keyCode == 13) {
        getItems();
    }
});