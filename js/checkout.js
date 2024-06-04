$(document).on('keyup', '.jumlah_uang', function () {
    let hargaPembelian = localStorage.getItem("hargaPembelian")
    var tempUangUser = $(this).val().replace(/[^0-9]/g, '');
    let kembalian = tempUangUser - hargaPembelian
    let finalUangUser = rupiahFormatter(tempUangUser)
    let finalHargaKembalian = rupiahFormatter(kembalian)

    $('.jumlah_uang').val(finalUangUser)
    $('.jumlah_kembalian').val(finalHargaKembalian)
})