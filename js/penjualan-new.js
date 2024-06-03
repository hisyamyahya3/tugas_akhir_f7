function tampilPelangganPenjualan() {
    $.ajax({
        type: "GET",
        url: "http://localhost/api_toko/Pelanggan",
        success: function (result) {
            let res = JSON.parse(result);
            let temp = '';

            res.data.forEach((d) => {
                temp += `
                    <div class="card">
                        <div class="card-content card-content-padding">
                            <p class="col font-17">${d.pelanggan_nama}</p>
                            <p class="col font-17">${d.pelanggan_alamat}</p>
                            <p class="col font-17">${d.pelanggan_notelp}</p>
                        </div>
                        <div class="card-footer">
                            <button class="button button-small button-tonal color-blue" onclick="pilihPelanggan('${d.pelanggan_id}', '${d.pelanggan_nama}')">Pilih</button>
                        </div>
                    </div>
                `
            })

            $('#tampilPelangganPenjualan').html(temp)
        }
    })
}

function pilihPelanggan(pelangganId, pelangganNama) {
    localStorage.setItem("pelangganId", pelangganId);
    localStorage.setItem("pelangganNama", pelangganNama);
    app.views.main.router.navigate("/brg-penjualan/");
}

$(document).on('keyup', '#searchPelangganPenjualan', function () {
    let searchInputNew = $(this).val()

    if (searchInputNew.length > 0) {
        $.ajax({
            url: "http://localhost/api_toko/Pelanggan/search",
            method: "POST",
            data: {
                nama_pelanggan: searchInputNew
            },
            success: function (res) {
                let data = JSON.parse(res)

                if (data.data) {
                    $('#tampilPelangganPenjualan').html(fetchDataPelangganPenjualan(data))
                } else {
                    $('#tampilPelangganPenjualan').html(tampilPelangganPenjualan())
                }
            },
            error: function () {
                app.dialog.alert("Tidak Terhubung dengan Server!", "Error");
            }
        })
    } else {
        $('#tampilPelangganPenjualan').html(tampilPelangganPenjualan())
    }
})

function fetchDataPelangganPenjualan(data) {
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
    return temp;
}

function kembaliPenjualan() {
    app.dialog.confirm('Apakah anda ingin keluar sebelum melanjutkan penjualan?', 'Konfirmasi', function (confirmed) {
        if (confirmed) {
            var view = app.views.current;
            view.router.back(view.history[1], { force: true });
        }
    });
}
