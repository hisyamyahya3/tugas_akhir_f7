$(document).on('click', '#reset', function () {
    $('.content-penjualan .supplier').html('')
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
                    $('.content-penjualan .pelanggan').html(fetchDataPelanggan(data))
                } else {
                    $('.content-penjualan .pelanggan').html('')
                }
            },
            error: function(){
                app.dialog.alert("Tidak Terhubung dengan Server!","Error");
            }
        })
    } else {
        $('.content-penjualan .pelanggan').html('')
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

let selectedKodeBarang2 = []
let selectedBarang2 = []
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
                    $('.content-penjualan .barang').html(fetchDataBarang(data))

                    $(".btn-next-bayar").attr("onclick", "nextPagePenjualan()");
                } else {
                    $('.content-penjualan .barang').html('')
                }
            },
            error: function(){
                app.dialog.alert("Tidak Terhubung dengan Server!","Error");
            }
        })
    } else {
        $('.content-penjualan .barang').html('')
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
                        <div data-harga-barang-grosir='${d.barang_harjul_grosir}' class="col-25 harga-barang-grosir d-none" style="text-align: right;"></div>
                    </div>
                </div>
            </div>
        `
    });

    return temp;
}

$(document).on('click', '.reset-searchBarang', function () {
    $('.content-penjualan .barang').html('')
})

$(document).on('click', '.card-search-barang', function () {
    let kodeBarang = $(this).find('.kode-barang').data('kode-barang');
    let namaBarang = $(this).find('.nama-barang').data('nama-barang');
    let hargaBarang = $(this).find('.harga-barang').data('harga-barang');
    let hargaBarangGrosir = $(this).find('.harga-barang-grosir').data('harga-barang-grosir');
    let indexSelectedBarang = selectedKodeBarang2.indexOf(kodeBarang);

    let tempBarang = {
        'kodeBarang': kodeBarang,
        'namaBarang': namaBarang,
        'hargaBarang': hargaBarang,
        'hargaBarangGrosir': hargaBarangGrosir
      };      

    if (indexSelectedBarang !== -1) {
        // KodeBarang is already selected, so remove it
        // selectedBarang.splice(indexSelectedBarang, 1);
        return false;
    } else {
        // KodeBarang is not selected, so add it
        selectedKodeBarang2.push(kodeBarang);
        selectedBarang2.push(tempBarang)
    }

    $('#detailBarangPenjualan').css({ display: 'block' });
    console.log(selectedBarang2)

    $('#detailBarangPenjualan .card-detail-barang').html(fetchDataBarangPenjualanLama(selectedBarang2))
});

function fetchDataBarangPenjualanLama(data) {
    let temp = '';

    // foreach itu hrus array/object
    data.forEach((d) => {
        temp += `
            <div class="card">
                <div class="card-content card-content-padding">
                    <div class="row" style="font-size: 18px;">
                        <input type="hidden" class="" name="kodeBarang" id="" readonly value="${d.kodeBarang}"/>
                        <input type="text" class="" name="namaBarang" id="" readonly value="${d.namaBarang}"/>
                        <input type="hidden" class="" name="hargaBarangGrosir" id="" readonly value="${d.hargaBarangGrosir}"/>
                        <input type="text" class="" name="hargaBarang" id="" readonly value="${d.hargaBarang}"/>
                        <div class="col-25" style="text-align: right;">
                            <label for="">Qty: </label>
                            <div class="stepper stepper-init">
                                <div class="stepper-input-wrap">
                                    <input type="text" class="qty-input" name="qty" id="" value="1"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    });

    return temp;
}

$(document).on('click', '.reset-searchPelanggan', function () {
    $('.content-penjualan .supplier').html('')
})

$(document).on('click', '.card-pelanggan', function () {
    // let namaPelangganPembelian = $('.card-pelanggan .nama-pelanggan').text()
    let namaPelangganPenjualan = $(this).find('.nama-pelanggan').text()

    localStorage.setItem("namaPelangganPenjualan", namaPelangganPenjualan)

    $('#detailPelangganPenjualan').css({display: 'block'})
    $('#detailPelangganPenjualan #detailnamaPelangganPenjualan').html(`Atas Nama ${namaPelangganPenjualan}`)
})

$(document).on('click', '.back-penjualan', function () {
    app.dialog.confirm('Apakah anda ingin keluar sebelum melanjutkan transaksi?', 'Info', function (confirmed) {
        if (confirmed) {
            var view = app.views.current;
            view.router.back(view.history[0],{force:true});
        }
    });
});

function nextPagePenjualan() {
    let formInput = $('#formDetailBarangPenjualan').serializeArray()
    
    // Group values by input name and separate into sets
    var setsValues = [];
    var currentSet = {};

    formInput.forEach(function(item) {
        var name = item.name;
        var value = item.value;

        if (name === 'namaBarang' && currentSet.hasOwnProperty('namaBarang')) {
            // Start a new set when encountering a new 'namaBarang'
            setsValues.push(currentSet);
            currentSet = {};
        }

        currentSet[name] = value;
    });

    // Push the last set
    setsValues.push(currentSet);

    let dataPenjualan = JSON.stringify(setsValues)
    // Log the grouped values to the console
    localStorage.setItem("dataPenjualan", dataPenjualan)
    app.views.main.router.navigate("/bayarpenjualan/");
}