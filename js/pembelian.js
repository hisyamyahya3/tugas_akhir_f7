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

let selectedKodeBarang = []
let selectedBarang = []
$(document).on('keyup', '#searchbarang', function () {
    let searchInput = $(this).val()

    if (searchInput.length > 0) {
        $.ajax({
            url: "http://localhost/api_toko/Barang/search",
            method: "POST",
            data: {
                nama_barang: searchInput
            },
            success: function(res) {
                let data = JSON.parse(res)

                if (data.data) {
                    $('.content-pembelian .barang').html(fetchDataBarang(data))
                } else {
                    $('.content-pembelian .barang').html('')
                }
            },
            error: function(){
                app.dialog.alert("Tidak Terhubung dengan Server!","Error");
            }
        })
    } else {
        $('.content-pembelian .barang').html('')
    }
})

function fetchDataBarang(data) {
    let temp = '';

    data.data.forEach((d) => {
        temp += `
            <div class="card card-search-barang">
                <div class="card-content card-content-padding">
                    <div class="row" style="font-size: 17px;">
                        <div data-kode-barang='${d.barang_id}' class="col-25 kode-barang" style="text-align: left;">Kode Barang : ${d.barang_id}</div>
                        <div data-nama-barang='${d.barang_nama}' class="col-50 nama-barang" style="font-size: larger;">${d.barang_nama}</div>
                        <div class="col-25" style="text-align: right;">Stok Barang : ${d.barang_stok}</div>
                        <div data-harga-barang='${d.barang_harjul}' class="col-25 harga-barang" style="text-align: right;">Rp. ${d.barang_harjul}</div>
                    </div>
                </div>
            </div>
        `
    });

    return temp;
}

$(document).on('click', '.reset-searchBarang', function () {
    $('.content-pembelian .barang').html('')
})

$(document).on('click', '.card-search-barang', function () {
    let kodeBarang = $(this).find('.kode-barang').data('kode-barang');
    let namaBarang = $(this).find('.nama-barang').data('nama-barang');
    let hargaBarang = $(this).find('.harga-barang').data('harga-barang');
    let indexSelectedBarang = selectedKodeBarang.indexOf(kodeBarang);

    let tempBarang = {
        'kodeBarang': kodeBarang,
        'namaBarang': namaBarang,
        'hargaBarang': hargaBarang
      };      

    if (indexSelectedBarang !== -1) {
        // KodeBarang is already selected, so remove it
        // selectedBarang.splice(indexSelectedBarang, 1);
        return false;
    } else {
        // KodeBarang is not selected, so add it
        selectedKodeBarang.push(kodeBarang);
        selectedBarang.push(tempBarang)
    }

    $('#detailBarangPembelian').css({ display: 'block' });

    console.log(selectedBarang)
    $('#detailBarangPembelian .card-detail-barang').html(fetchDataBarangPembelian(selectedBarang))
});

function fetchDataBarangPembelian(data) {
    let temp = '';

    data.forEach((d) => {
        temp += `
            <div class="card">
                <div class="card-content card-content-padding">
                    <div class="row" style="font-size: 18px;">
                        <div class="col-25">${d.namaBarang}</div>
                        <div class="col-25">Rp.${d.hargaBarang}</div>
                        <div class="col-25" style="text-align: right;">
                            <label for="">Qty: </label>
                            <div class="stepper stepper-init">
                                <div class="stepper-input-wrap">
                                <input type="text" class="qty-input" name="" id=""/ data-harga="${d.hargaBarang}">
                                </div>
                            </div>
                        </div>
                        <div class="col-25" style="text-align: right;">Subtotal: Rp.<span class="sub-total"></span></div>
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

$(document).on('click', '.card-pelanggan', function () {
    // let namaPelangganPembelian = $('.card-pelanggan .nama-pelanggan').text()
    let namaPelangganPembelian = $(this).find('.nama-pelanggan').text()

    localStorage.setItem("namaPelangganPembelian", namaPelangganPembelian)

    $('#detailPelangganPembelian').css({display: 'block'})
    $('#detailPelangganPembelian #detailNamaPelangganPembelian').html(`Atas Nama ${namaPelangganPembelian}`)
})

$(document).on('click', '.back-pembelian', function () {
    app.dialog.confirm('Apakah anda ingin keluar sebelum melanjutkan transaksi?', 'Info', function (confirmed) {
        if (confirmed) {
            var view = app.views.current;
            view.router.back(view.history[0],{force:true});
        }
    });
});
