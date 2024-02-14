$(document).on('click', '#reset', function () {
    // console.log('tes')
    $('.content-pembelian .supplier').html('')
})

$(document).on('keyup', '#searchsupplier', function () {
    let searchInput = $(this).val()

    if (searchInput.length > 0) {
        $.ajax({
            url: "http://localhost/api_toko/Supplier/search",
            method: "POST",
            data: {
                nama_supplier: searchInput
            },
            success: function(res) {
                let data = JSON.parse(res)

                if (data.data) {
                    $('.content-pembelian .supplier').html(fetchDataSupplier(data))
                } else {
                    $('.content-pembelian .supplier').html('')
                }
            },
            error: function(){
                app.dialog.alert("Tidak Terhubung dengan Server!","Error");
            }
        })
    } else {
        $('.content-pembelian .supplier').html('')
    }
})

function fetchDataSupplier(data) {
    let temp = '';
    // let parseData = JSON.parse(data);

    data.data.forEach((d) => {
        temp += `
            <div class="card card-supplier">
                <div class="card-content card-content-padding">
                    <div class="row" style="font-size: 16px;">
                        <div class="col-50 nama-supplier" style="font-size: larger;">${d.suplier_nama}</div>
                        <div class="col-25" style="text-align: left;">${d.suplier_alamat}</div>
                        <div class="col-25" style="text-align: right;">${d.suplier_notelp}</div>
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
                // console.log(data);
                // return;
                if (data.data) {
                    $('.content-pembelian .barang').html(fetchDataBarang(data))

                    $(".btn-next-order").attr("onclick", "nextPage()");
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
                        <div data-harga-barang='${d.barang_harjul}' class="col-25 harga-barang" style="text-align: right;">${d.barang_harjul}</div>
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

    $('#detailBarangPembelian .card-detail-barang-pembelian').html(fetchDataBarangPembelianLama(selectedBarang))
});

function fetchDataBarangPembelianLama(data) {
    let temp = '';

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

$(document).on('click', '.reset-searchSupplier', function () {
    $('.content-pembelian .supplier').html('')
})

$(document).on('click', '.card-supplier', function () {
    // let namaPelangganPembelian = $('.card-pelanggan .nama-pelanggan').text()
    let namaSupplierPembelian = $(this).find('.nama-supplier').text()

    localStorage.setItem("namaSupplierPembelian", namaSupplierPembelian)

    $('#detailSupplierPembelian').css({display: 'block'})
    $('#detailSupplierPembelian #detailNamaSupplierPembelian').html(`Atas Nama ${namaSupplierPembelian}`)
})

$(document).on('click', '.back-pembelian', function () {
    app.dialog.confirm('Apakah anda ingin keluar sebelum melanjutkan transaksi?', 'Info', function (confirmed) {
        if (confirmed) {
            var view = app.views.current;
            view.router.back(view.history[0],{force:true});
        }
    });
});

function nextPage() {
    let formInput = $('#formDetailBarangPembelian').serializeArray()
    
    // Group values by input name and separate into sets
    var setsValues = [];
    var currentSet = {};

    formInput.forEach(function(item) {
        var name = item.name;
        var value = item.value;

        console.log(name)
        if (name === 'namaBarang' && currentSet.hasOwnProperty('namaBarang')) {
            // Start a new set when encountering a new 'namaBarang'
            setsValues.push(currentSet);
            currentSet = {};
        }

        currentSet[name] = value;
    });

    // Push the last set
    setsValues.push(currentSet);

    let dataPembelian = JSON.stringify(setsValues)
    // Log the grouped values to the console
    localStorage.setItem("dataPembelian", dataPembelian)
    app.views.main.router.navigate("/checkout/");
    // console.log(currentSet)
}