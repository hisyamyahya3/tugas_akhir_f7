function tampilSupplierPembelian(keyword) {
    let userID = localStorage.getItem("userID")

    $.ajax({
        url: "http://localhost/api_toko/Supplier/search",
        method: "POST",
        data: {
            nama_supplier: keyword,
            userID: userID
        },
        success: function (res) {
            let data = JSON.parse(res)
            let temp = '';

            data.data.forEach((d) => {
                temp += `
                    <div class="card">
                        <div class="card-content card-content-padding">
                            <p class="col font-17">${d.suplier_nama}</p>
                            <p class="col font-17">${d.suplier_alamat}</p>
                            <p class="col font-17">${d.suplier_notelp}</p>
                        </div>
                        <div class="card-footer">
                            <button class="button button-small button-tonal color-blue" onclick="pilihSupplier('${d.suplier_id}', '${d.suplier_nama}')">Pilih</button>
                        </div>
                    </div>
                `
            })

            $('#tampilSupplierPembelian').html(temp)
        },
        error: function () {
            app.dialog.alert("Tidak Terhubung dengan Server!", "Error");
        }
    })
}

function pilihSupplier(supplierID, supplierNama) {
    localStorage.setItem("cartSupplierID", supplierID);
    localStorage.setItem("cartSupplierNama", supplierNama);
    app.views.main.router.navigate("/brg-pembelian/");
}

$(document).on('keyup', '#searchSupplierPembelian', function () {
    let searchInputNew = $(this).val()

    if (searchInputNew.length > 0) {
        tampilSupplierPembelian(searchInputNew)
    } else {
        tampilSupplierPembelian('')
    }
})

function kembaliPembelian() {
    app.dialog.confirm('Apakah anda ingin keluar sebelum melanjutkan pembelian?', 'Konfirmasi', function (confirmed) {
        if (confirmed) {
            var view = app.views.current;
            view.router.back(view.history[1], { force: true });
        }
    });
}

function tampilLaporanPembelian(keyword) {
    let userID = localStorage.getItem("userID")

    $.ajax({
        url: "http://localhost/api_toko/Pembelian/laporan",
        method: "POST",
        data: {
            nama_pelanggan: keyword,
            userID: userID
        },
        success: function (res) {
            let data = JSON.parse(res)
            let temp = '';
            let pic = '';

            if (data.data.length === 0) {
                pic = `<div class="teks-tengah">
                            <img src="img/nodata.jpg" class="besar" />
                        </div>`;
            } else {
                data.data.forEach((d) => {
                    temp += `
                    <tr>
                        <td class="label-cell">${d.suplier_nama}</td>
                        <td class="numeric-cell">${d.beli_nofak}</td>
                        <td class="numeric-cell">${d.beli_tanggal}</td>
                        <td class="label-cell">${d.barang_nama}</td>
                        <td class="numeric-cell">${rupiahFormatter(d.d_beli_harga)}</td>
                        <td class="numeric-cell">${d.d_beli_jumlah}</td>
                        <td class="numeric-cell">${rupiahFormatter(d.beli_total)}</td>
                        <td class="numeric-cell">${rupiahFormatter(d.beli_jml_uang)}</td>
                        <td class="numeric-cell">${d.beli_keterangan}</td>
                    </tr>
                    `
                });
            }

            $('#laporan-pembelian').html(temp)
            $('#nodata').html(pic)
        },
        error: function () {
            app.dialog.alert("Tidak Terhubung dengan Server!", "Error");
        }
    })
}

function cariTanggalPembelian() {
    let userID = localStorage.getItem("userID")
    let dariTgl = $("input[name=from-date-pembelian]").val();
    let sampaiTgl = $("input[name=to-date-pembelian]").val();
    // console.log(`${userID} dan ${dariTgl} dan ${sampaiTgl}`);
    if (dariTgl == "" || sampaiTgl == "") {
        app.dialog.alert("Isian Masih Kosong, Silahkan Cek Kembali", "Error");
        return;
    }
    // console.log(`${dariTgl} dan ${sampaiTgl}`);
    // return;
    
    $.ajax({
        url: "http://localhost/api_toko/Pembelian/filterTanggal",
        method: "POST",
        data: {
            userID: userID,
            dariTgl: dariTgl,
            sampaiTgl: sampaiTgl
        },
        success: function (res) {
            let data = JSON.parse(res)

            if (data.data) {
                $('#laporan-pembelian').html(fetchFilterPembelian(data))
            } else {
                $('#laporan-pembelian').html('')
            }
            // $('#laporan-penjualan').html(temp)
        },
        error: function () {
            app.dialog.alert("Tidak Terhubung dengan Server!", "Error");
        }
    })
}

function fetchFilterPembelian(data) {
    let temp = '';

    data.data.forEach((d) => {
        temp += `
        <tr>
            <td class="label-cell">${d.suplier_nama}</td>
            <td class="numeric-cell">${d.beli_nofak}</td>
            <td class="numeric-cell">${d.beli_tanggal}</td>
            <td class="label-cell">${d.barang_nama}</td>
            <td class="numeric-cell">${rupiahFormatter(d.d_beli_harga)}</td>
            <td class="numeric-cell">${d.d_beli_jumlah}</td>
            <td class="numeric-cell">${rupiahFormatter(d.beli_total)}</td>
            <td class="numeric-cell">${rupiahFormatter(d.beli_jml_uang)}</td>
            <td class="numeric-cell">${d.beli_keterangan}</td>
        </tr>
        `
    })

    return temp
}

function resetLaporanPembelian() {
    let dariTgl = $("input[name=from-date-pembelian]").val("");
    let sampaiTgl = $("input[name=to-date-pembelian]").val("");
    tampilLaporanPembelian()
}


function cetakLaporanPembelian() {
    let dariTgl = $("input[name=from-date-pembelian]").val();
    let sampaiTgl = $("input[name=to-date-pembelian]").val();
    if (dariTgl == "" || sampaiTgl == "") {
        app.dialog.alert("Silahkan isi pilihan tanggal terlebih dahulu!", "Error");
        return;
    }
    $.ajax({
        url: "http://localhost/api_toko/Pembelian/filterTanggal",
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
                    <td class="label-cell">${d.suplier_nama}</td>
                    <td class="numeric-cell">${d.beli_nofak}</td>
                    <td class="numeric-cell">${d.beli_tanggal}</td>
                    <td class="label-cell">${d.barang_nama}</td>
                    <td class="numeric-cell">${rupiahFormatter(d.d_beli_harga)}</td>
                    <td class="numeric-cell">${d.d_beli_jumlah}</td>
                    <td class="numeric-cell">${rupiahFormatter(d.beli_total)}</td>
                    <td class="numeric-cell">${rupiahFormatter(d.beli_jml_uang)}</td>
                    <td class="numeric-cell">${d.beli_keterangan}</td>
                </tr>
                `
            })

            let datacetak = `<html><h1>LAPORAN PEMBELIAN DARI TANGGAL ${dariTgl} SAMPAI ${sampaiTgl}</h1><table border="1">${temp}</table></html>`;
            var opsi = {
                documentSize: 'A4',
                type: 'share',
                fileName: `cetak_laporan_pemebelian_dari_tanggal${dariTgl}_sampai_${sampaiTgl}.pdf`
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