$(document).on('keyup', '.jumlah_uang_pembelian', function () {
    let hargaPembelian = localStorage.getItem("totalPembelian")
    var tempUangUser = $(this).val().replace(/[^0-9]/g, '');
    // let kembalian = hargaPembelian - tempUangUser
    let kembalian = tempUangUser - hargaPembelian
    let finalUangUser = rupiahFormatter(tempUangUser)

    let finalHargaKembalian = rupiahFormatter(kembalian)

    $('.jumlah_uang_pembelian').val(finalUangUser)
    $('.jumlah_kembalian_pembelian').val(finalHargaKembalian)
})

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