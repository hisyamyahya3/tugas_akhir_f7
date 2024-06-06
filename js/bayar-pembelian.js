$(document).on('keyup', '.jumlah_uang_pembelian', function () {
    let hargaPembelian = localStorage.getItem("totalPembelian")
    var tempUangUser = $(this).val().replace(/[^0-9]/g, '');
    let kembalian = tempUangUser - hargaPembelian
    let finalUangUser = rupiahFormatter(tempUangUser)
    let finalHargaKembalian = rupiahFormatter(kembalian)

    $('.jumlah_uang_pembelian').val(finalUangUser)
    $('.jumlah_kembalian_pembelian').val(finalHargaKembalian)
})

$(document).on('click', '.btn-bayar-pembelian', function () {
    let idSupplier = localStorage.getItem("supplierID")
    let userID = localStorage.getItem("userID")
    let totalPembelian = $('.total_pembelian').val().split('Rp.')[1].replace('.', '')
    let jmlUang = $('.jumlah_uang_pembelian').val().split('Rp.')[1].replace('.', '')
    let jmlKembalian = $('.jumlah_kembalian_pembelian').val().split('Rp.')[1].replace('.', '')

    $.ajax({
        url: "http://localhost/api_toko/Pembelian/insert",
        method: "POST",
        data: {
            'idSupplier': idSupplier,
            'userID': userID,
            'totalPembelian': totalPembelian,
            'jmlUang': jmlUang,
            'jmlKembalian': jmlKembalian,
        },
        success: function (res) {
            let result = JSON.parse(res)

            if (result.status == 'ok') {
                localStorage.setItem("statusNamaUser", result.data.nama_supplier)
                localStorage.setItem("statusNominalPembayaran", result.data.beli_jml_uang)

                app.views.main.router.navigate(`/sts-pembayaran/${result.data.beli_nofak}`)
            }
        },
        error: function () {

        }
    })
})