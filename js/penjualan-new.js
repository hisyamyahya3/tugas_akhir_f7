function tampilPelangganPenjualan(keyword) {
    let userID = localStorage.getItem("userID")

    $.ajax({
        url: "http://localhost/api_toko/Pelanggan/search",
        method: "POST",
        data: {
            nama_pelanggan: keyword,
            userID: userID
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

function tampilLaporanPenjualan(keyword) {
    let userID = localStorage.getItem("userID")

    $.ajax({
        url: "http://localhost/api_toko/Penjualan/laporan",
        method: "POST",
        data: {
            nama_pelanggan: keyword,
            userID: userID
        },
        success: function (res) {
            let data = JSON.parse(res)

            let temp = '';

            data.data.forEach((d) => {
                temp += `
                <tr>
                    <td class="label-cell">${d.pelanggan_nama}</td>
                    <td class="numeric-cell">${d.jual_nofak}</td>
                    <td class="numeric-cell">${d.jual_tanggal}</td>
                    <td class="label-cell">${d.d_jual_barang_nama}</td>
                    <td class="numeric-cell">${rupiahFormatter(d.d_jual_barang_harjul)}</td>
                    <td class="numeric-cell">${d.d_jual_qty}</td>
                    <td class="numeric-cell">${rupiahFormatter(d.d_jual_total)}</td>
                    <td class="numeric-cell">${rupiahFormatter(d.jual_jml_uang)}</td>
                    <td class="numeric-cell">${d.jual_keterangan}</td>
                </tr>
                `
            });

            $('#laporan-penjualan').html(temp)
        },
        error: function () {
            app.dialog.alert("Tidak Terhubung dengan Server!", "Error");
        }
    })
}