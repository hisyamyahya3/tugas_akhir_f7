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

            $('#laporan-penjualan').html(fetchFilterPenjualan(data))
        },
        error: function () {
            app.dialog.alert("Tidak Terhubung dengan Server!", "Error");
        }
    })
}

function cariTanggalPenjualan() {
    let userID = localStorage.getItem("userID")
    let dariTgl = $("input[name=from-date-penjualan]").val();
    let sampaiTgl = $("input[name=to-date-penjualan]").val();
    // console.log(`${userID} dan ${dariTgl} dan ${sampaiTgl}`);
    if (dariTgl == "" || sampaiTgl == "") {
        app.dialog.alert("Isian Masih Kosong, Silahkan Cek Kembali", "Error");
        return;
    }
    // console.log(`${dariTgl} dan ${sampaiTgl}`);
    // return;
    
    $.ajax({
        url: "http://localhost/api_toko/Penjualan/filterTanggal",
        method: "POST",
        data: {
            userID: userID,
            dariTgl: dariTgl,
            sampaiTgl: sampaiTgl
        },
        success: function (res) {
            let data = JSON.parse(res)

            if (data.data) {
                $('#laporan-penjualan').html(fetchFilterPenjualan(data))
            } else {
                $('#laporan-penjualan').html('')
            }
            // $('#laporan-penjualan').html(temp)
        },
        error: function () {
            app.dialog.alert("Tidak Terhubung dengan Server!", "Error");
        }
    })
}

function fetchFilterPenjualan(data) {
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
    })

    return temp
}

function resetLaporanPenjualan() {
    let dariTgl = $("input[name=from-date-penjualan]").val("");
    let sampaiTgl = $("input[name=to-date-penjualan]").val("");
    tampilLaporanPenjualan()
}

function cetakLaporanPenjualan() {
    let dariTgl = $("input[name=from-date-penjualan]").val();
    let sampaiTgl = $("input[name=to-date-penjualan]").val();
    if (dariTgl == "" || sampaiTgl == "") {
        app.dialog.alert("Silahkan isi pilihan tanggal terlebih dahulu!", "Error");
        return;
    }
    $.ajax({
        url: "http://localhost/api_toko/Penjualan/filterTanggal",
        method: "POST",
        data: {
            userID: userID,
            dariTgl: dariTgl,
            sampaiTgl: sampaiTgl
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
            })

            let datacetak = `<html><h1>LAPORAN PENJUALAN DARI TANGGAL ${dariTgl} SAMPAI ${sampaiTgl}</h1><table border="1">${temp}</table></html>`;
            var opsi = {
                documentSize: 'A4',
                type: 'share',
                fileName: `cetak_laporan_penjualan_dari_tanggal${dariTgl}_sampai_${sampaiTgl}.pdf`
            };

            pdf.fromData(datacetak, opsi)
            .then((stats) => console.log(stats))
            .catch((err) => console.log(err));


        },
        error: function () {
            app.dialog.alert("Tidak Terhubung dengan Server!", "Error");
        }
    })
}