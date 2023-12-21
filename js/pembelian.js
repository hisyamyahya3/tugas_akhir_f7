$(document).on('click', '#reset', function () {
    // console.log('tes')
    $('.content-pembelian .pelanggan').html('')
})

$(document).on('keyup', '#searchpelanggan', function () {
    let searchInput = $(this).val()

    if (searchInput.length > 0) {
        $.ajax({
            url: "http://localhost/api_toko/Pelanggan/search",
            method: "POST",
            data: {
                nama_pelanggan: searchInput
            },
            success: function(res) {
                let data = JSON.parse(res)

                if (data.data) {
                    $('.content-pembelian .pelanggan').html(fetchDataPelanggan(data))
                } else {
                    $('.content-pembelian .pelanggan').html('')
                }
            },
            error: function(){
                app.dialog.alert("Tidak Terhubung dengan Server!","Error");
            }
        })
    } else {
        $('.content-pembelian .pelanggan').html('')
    }
})

function fetchDataPelanggan(data) {
    let temp = '';
    // let parseData = JSON.parse(data);

    data.data.forEach((d) => {
        temp += `
            <div class="card card-pelanggan">
                <div class="card-content card-content-padding">
                    <div class="row" style="font-size: 16px;">
                        <div class="col-50 nama-pelanggan" style="font-size: larger;">${d.pelanggan_nama}</div>
                        <div class="col-25" style="text-align: left;">${d.pelanggan_alamat}</div>
                        <div class="col-25" style="text-align: right;">${d.pelanggan_notelp}</div>
                    </div>
                </div>
            </div>
        `
    });

    return temp;
}

$(document).on('click', '.reset-searchPelanggan', function () {
    $('.content-pembelian .pelanggan').html('')
})

$(document).on('click', '.card-pelanggan', function() {
    // let namaPelangganPembelian = $('.card-pelanggan .nama-pelanggan').text()
    let namaPelangganPembelian = $(this).find('.nama-pelanggan').text()

    localStorage.setItem("namaPelangganPembelian", namaPelangganPembelian)

    $('#detailPelangganPembelian').css({display: 'block'})
    $('#detailPelangganPembelian #detailNamaPelangganPembelian').html(`atas nama ${namaPelangganPembelian}`)
})