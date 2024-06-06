function transaction(action) {
    app.views.main.router.navigate(`/bayar-utang-piutang/${action}`)
}

$(document).on('keyup', '.transaction_jml_uang', function () {
    var tempUangUser = $(this).val().replace(/[^0-9]/g, '')
    let finalUangUser = rupiahFormatter(tempUangUser)

    $('.transaction_jml_uang').val(finalUangUser)
})

$(document).on('click', '.btn-settle', function () {
    let utangPiutangID = localStorage.getItem("utangPiutangID")
    let noTransaksi = localStorage.getItem("noTransaksi")
    let action = localStorage.getItem("transaksiUtangPiutang")
    let jmlUang = $('.transaction_jml_uang').val().split('Rp.')[1].replace('.', '')

    let endpoint = (action == 'utang') ? 'Utang' : 'Piutang'

    $.ajax({
        url: `http://localhost/api_toko/${endpoint}/transaction`,
        method: "POST",
        data: {
            'id': utangPiutangID,
            'noTransaksi': noTransaksi,
            'jmlUang': jmlUang,
        },
        success: function (res) {
            let result = JSON.parse(res)

            if (result.status == 'ok') {
                localStorage.setItem("statusNamaUser", result.data.nama)
                localStorage.setItem("statusNominalPembayaran", result.data.jml_angsuran)

                app.views.main.router.navigate(`/sts-pembayaran/${result.data.noTransaksi}`)
            } else {
                app.dialog.alert(result.message, 'Info');
            }
        },
        error: function () {
            app.dialog.alert("Tidak Terhubung dengan Server!", "Error")
        }
    })
})