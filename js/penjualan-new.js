function tampilPelangganPenjualan(keyword) {
    $.ajax({
        url: "http://localhost/api_toko/Pelanggan/search",
        method: "POST",
        data: {
            nama_pelanggan: keyword
        },
        success: function (res) {
            let data = JSON.parse(res)

            let temp = '';

            data.data.forEach((d) => {
                temp += `<div class="card">
                    <div class="card-content card-content-padding">
                        <p class="col font-17">${d.pelanggan_nama}</p>
                        <p class="col font-17">${d.pelanggan_alamat}</p>
                        <p class="col font-17">${d.pelanggan_notelp}</p>
                    </div>
                    <div class="card-footer"><button class="button button-small button-tonal color-blue" onclick="pilihPelanggan('${d.pelanggan_id}', '${d.pelanggan_nama}')">Pilih</button></div>
                </div>`
            });

            $('#tampilPelangganPenjualan').html(temp)
        },
        error: function () {
            app.dialog.alert("Tidak Terhubung dengan Server!", "Error");
        }
    })
}

function pilihPelanggan(pelangganID, pelangganNama) {
    localStorage.setItem("cartPelangganID", pelangganID);
    localStorage.setItem("cartPelangganNama", pelangganNama);

    app.views.main.router.navigate("/brg-penjualan/");
}

$(document).on('keyup', '#searchPelangganPenjualan', function () {
    let searchInputNew = $(this).val()

    if (searchInputNew.length > 0) {
        tampilPelangganPenjualan(searchInputNew)
    } else {
        tampilPelangganPenjualan('')
    }
})

function kembaliPenjualan() {
    app.dialog.confirm('Apakah anda ingin keluar sebelum melanjutkan penjualan?', 'Konfirmasi', function (confirmed) {
        if (confirmed) {
            var view = app.views.current;
            view.router.back(view.history[1], { force: true });
        }
    });
}
