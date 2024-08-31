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
                            <h2 class="col font-17" style="font-weight: bold;">${d.suplier_nama}</h2>
                            <p class="col font-17">Alamat Supplier: ${d.suplier_alamat}</p>
                            <p class="col font-17">Nomor Telpon: ${d.suplier_notelp}</p>
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
                $('#laporan-pembelian').html(fetchFilterPembelian(data))           
            }

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
    let total = 0;

    data.data.forEach((d) => {
        let subtotal = parseFloat(d.beli_total);
        total += subtotal;

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

    $('#totalPembelian').html(`Total : ${rupiahFormatter(total)}`)
    return temp
}

function resetLaporanPembelian() {
    let dariTgl = $("input[name=from-date-pembelian]").val("");
    let sampaiTgl = $("input[name=to-date-pembelian]").val("");
    tampilLaporanPembelian()
}


function cetakLaporanPembelian() {
    let userID = localStorage.getItem("userID")
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

            let datacetak = `<html>
                                <h3 class="teks-tengah">LAPORAN PEMBELIAN DARI TANGGAL ${dariTgl} SAMPAI ${sampaiTgl}</h3>
                                <table border="1" style="width: 100%;">
                                    <thead>
                                        <tr>
                                            <td>Nama Supplier</td>
                                            <td>No. Transaksi</td>
                                            <td>Tgl Transaksi</td>
                                            <td>Nama Barang</td>
                                            <td>Harga</td>
                                            <td>Qty</td>
                                            <td>Total Harga</td>
                                            <td>Nominal Pembayaran</td>
                                            <td>Status Pembayaran</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${temp}
                                    </tbody>
                                </table>
                            </html>`;
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

// function tampilRiwayatPembelian () {
//     let userID = localStorage.getItem("userID")

//     $.ajax({
//         url: "http://localhost/api_toko/Pembelian/laporan",
//         method: "POST",
//         data: {
//             userID: userID,
//         },
//         success: function (res) {
//             let data = JSON.parse(res)
//             let pic = '';
//             let temp = '';

//             if (data.data.length === 0) {
//                 pic = `<div class="teks-tengah">
//                             <img src="img/nodata.jpg" class="besar" />
//                         </div>`;
//             } 

//             data.data.forEach((d) => {
//                 temp += `
//                 <div class="card">
//                     <div class="card-content card-content-padding">
//                         <p class="col">No. Transaksi: ${d.beli_nofak}</p>
//                         <p class="col">Nama Pelanggan: ${d.suplier_nama}</p>
//                         <p class="col">Tgl Transaksi: ${d.beli_tanggal}</p>
//                         <p class="col">Total: ${rupiahFormatter(d.beli_total)}</p>
//                     </div>
//                 </div>
//                 `
//             })

//             $('#nodata1').html(pic)
//             $('#rwytPembelian').html(temp)


//         },
//         error: function () {
//             app.dialog.alert("Tidak Terhubung dengan Server!", "Error");
//         }
//     })
// }