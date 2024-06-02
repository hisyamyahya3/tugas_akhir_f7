function rupiahFormatter(number) {
    // Check if the input is a valid number
    if (isNaN(number)) {
        console.error('Invalid input. Please provide a valid number.');
        return '';
    }

    // Convert the number to a string and add the currency symbol
    let rupiah = 'Rp.' + Math.floor(number).toString().replace(/\d(?=(\d{3})+$)/g, '$&.');

    return rupiah;
}

$(document).on('click', '.btn-bayar-penjualan', function () {
    let tempDataPenjualan = localStorage.getItem("dataPenjualan")
    let dataPenjualan = JSON.parse(tempDataPenjualan)
    let idPelanggan = localStorage.getItem("pelangganID")
    let hargaPenjualan = localStorage.getItem("totalPenjualan")
    let tempJmlUang = $('.jumlah_uang_penjualan_new').val()
    let tempJmlKembalian = $('.jumlah_kembalian_penjualan_new').val()
    let jmlUang = tempJmlUang.split('Rp.')[1].replace('.', '')
    let jmlKembalian = tempJmlKembalian.split('Rp.')[1].replace('.', '')

    $.ajax({
        url: "http://localhost/api_toko/Penjualan/insert",
        method: "POST",
        data: {
            'idPel': idPelanggan,
            'hargaPenjualan': hargaPenjualan,
            'jmlUang': jmlUang,
            'jmlKembalian': jmlKembalian,
        },
        success: function (res) {
            console.log(res)
        },
        error: function () {

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
