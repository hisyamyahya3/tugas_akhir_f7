$(document).on('click', '.btn-bayar-penjualan', function () {
    let idPelanggan = localStorage.getItem("pelangganID")
    let hargaPenjualan = localStorage.getItem("totalPenjualan")
    let userID = localStorage.getItem("userID")
    let tempJmlUang = $('.jumlah_uang_penjualan_new').val()
    let tempJmlKembalian = $('.jumlah_kembalian_penjualan_new').val()
    let jmlUang = tempJmlUang.split('Rp.')[1].replace('.', '')
    let jmlKembalian = tempJmlKembalian.split('Rp.')[1].replace('.', '')

    $.ajax({
        url: "http://localhost/api_toko/Penjualan/insert",
        method: "POST",
        data: {
            'idPel': idPelanggan,
            'userID': userID,
            'hargaPenjualan': hargaPenjualan,
            'jmlUang': jmlUang,
            'jmlKembalian': jmlKembalian,
        },
        success: function (res) {
            let result = JSON.parse(res)

            if (result.status == 'ok') {
                localStorage.setItem("statusNamaUser", result.data.pelanggan_nama);
                localStorage.setItem("statusNominalPembayaran", result.data.jual_jml_uang);

                app.views.main.router.navigate(`/sts-pembayaran/${result.data.jual_nofak}`);
            }

            app.dialog.alert(result.message, "Information");
        },
        error: function (error) {
            console.log(error)
        }
    })
})

$(document).on('keyup', '.jumlah_uang_penjualan_new', function () {
    let hargaPenjualan = localStorage.getItem("totalPenjualan")
    var tempUangUser = $(this).val().replace(/[^0-9]/g, '');
    let kembalian = tempUangUser - hargaPenjualan
    let finalUangUser = rupiahFormatter(tempUangUser)
    let finalHargaKembalian = rupiahFormatter(kembalian)

    $('.jumlah_uang_penjualan_new').val(finalUangUser)
    $('.jumlah_kembalian_penjualan_new').val(finalHargaKembalian)
})
