function transaction(action) {
    app.views.main.router.navigate(`/bayar-utang-piutang/${action}`)
}

$(document).on('keyup', '.transaction_jml_uang', function () {
    var tempUangUser = $(this).val().replace(/[^0-9]/g, '')
    let finalUangUser = rupiahFormatter(tempUangUser)

    $('.transaction_jml_uang').val(finalUangUser)
})

$(document).on('click', '.btn-settle', function () {
    let utangID = localStorage.getItem("utangID")
    let beliNofak = localStorage.getItem("beli_nofak")
    let jmlUang = $('.transaction_jml_uang').val().split('Rp.')[1].replace('.', '')

    $.ajax({
        url: "http://localhost/api_toko/Utang/transaction",
        method: "POST",
        data: {
            'utangID': utangID,
            'beliNofak': beliNofak,
            'jmlUang': jmlUang,
        },
        success: function (res) {
            let result = JSON.parse(res)

            if (result.status == 'ok') {
                localStorage.setItem("statusNamaUser", result.data.nama_supplier)
                localStorage.setItem("statusNominalPembayaran", result.data.jml_angsuran)

                app.views.main.router.navigate(`/sts-pembayaran/${result.data.beli_nofak}`)
            } else {
                app.dialog.alert(result.message, 'Info');
            }
        },
        error: function () {

        }
    })
})