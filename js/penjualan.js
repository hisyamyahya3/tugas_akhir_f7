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
                    $('.content-penjualan .supplier').html(fetchDataSupplier(data))
                } else {
                    $('.content-penjualan .supplier').html('')
                }
            },
            error: function(){
                app.dialog.alert("Tidak Terhubung dengan Server!","Error");
            }
        })
    } else {
        $('.content-penjualan .supplier').html('')
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

// $(document).on('keyup', '#searchbarang', function () {
//     // alert($(this).val())
//     let searchInput = $(this).val()

//     if (searchInput.length > 0) {
//         $.ajax({
//             url: "http://localhost/api_toko/Barang/search",
//             method: "POST",
//             data: {
//                 nama_barang: searchInput
//             },
//             success: function(res) {
//                 let data = JSON.parse(res)

//                 if (data.data) {
//                     $('.content-penjualan .barang').html(fetchDataBarang(data))
//                 } else {
//                     $('.content-penjualan .barang').html('')
//                 }
//             },
//             error: function(){
//                 app.dialog.alert("Tidak Terhubung dengan Server!","Error");
//             }
//         })
//     } else {
//         $('.content-penjualan .barang').html('')
//     }
// })

$(document).on('click', '.reset-searchBarang', function () {
    $('.content-penjualan .barang').html('')
})

$(document).on('click', '.reset-searchSupplier', function () {
    $('.content-penjualan .supplier').html('')
})

$(document).on('click', '.card-supplier', function() {
    // let namaPelangganPembelian = $('.card-pelanggan .nama-pelanggan').text()
    let namaSupplierPenjualan = $(this).find('.nama-supplier').text()

    localStorage.setItem("namaSupplierPenjualan", namaSupplierPenjualan)

    $('#detailSupplierPenjualan').css({display: 'block'})
    $('#detailSupplierPenjualan #detailNamaSupplierPenjualan').html(`Dengan Supplier ${namaSupplierPenjualan}`)
})

$(document).on('click', '.back-penjualan', function () {
    app.dialog.confirm('Apakah anda ingin keluar sebelum melanjutkan transaksi?', 'Info', function (confirmed) {
        if (confirmed) {
            var view = app.views.current;
            view.router.back(view.history[0],{force:true});
        }
    });
});