$(document).on('keyup', '.jumlah_uang', function () {
    let hargaPembelian = localStorage.getItem("hargaPembelian")
    var tempUangUser = $(this).val().replace(/[^0-9]/g, '');
    // let kembalian = hargaPembelian - tempUangUser
    let kembalian = tempUangUser - hargaPembelian
    let finalUangUser = rupiahFormatter(tempUangUser)

    // Tambahkan kondisi untuk menampilkan tanda minus jika kembalian negatif
    // let finalHargaKembalian = `- ${rupiahFormatter(kembalian)}`
    let finalHargaKembalian = rupiahFormatter(kembalian)

    $('.jumlah_uang').val(finalUangUser)
    $('.jumlah_kembalian').val(finalHargaKembalian)
})

// Fungsi formatter rupiah (contoh implementasi)
function rupiahFormatter(value) {
    // Implementasi formatter rupiah sesuai kebutuhan
    // ...

    // Contoh sederhana
    return 'Rp ' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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