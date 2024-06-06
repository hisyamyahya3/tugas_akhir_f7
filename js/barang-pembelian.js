function tampilBarangPembelian(keyword) {
    let userID = localStorage.getItem("userID")

    $.ajax({
        url: "http://localhost/api_toko/Barang/search",
        method: "POST",
        data: {
            nama_barang: keyword,
            userID: userID,
        },
        success: function (res) {
            let data = JSON.parse(res);
            let temp = '';

            data.data.forEach((d) => {
                temp += `
                    <div class="card">
                        <div class="card-content card-content-padding">
                            <h4 class="col font-17 teks-tengah">${d.barang_nama}</h4>
                            <p class="col font-17">Harga: ${rupiahFormatter(d.barang_harjul)}</p>
                            <p class="col font-17">Stok: ${d.barang_stok}</p>
                        </div>
                        <div class="card-footer">
                            <button class="button button-small button-tonal color-blue" onclick="pilihBarangSupplier('${d.barang_id}', '${d.barang_harjul}', '${d.barang_stok}')">Keranjang</button>
                        </div>
                    </div>
                `
            })

            $('#tampilBarangPembelian').html(temp)
        },
        error: function () {
            app.dialog.alert("Tidak Terhubung dengan Server!", "Error");
        }
    })
}

function pilihBarangSupplier(id, harjul, stok) {
    let supplierId = localStorage.getItem("cartSupplierID");

    $.ajax({
        url: "http://localhost/api_toko/Supplier/keranjang",
        method: "POST",
        data: {
            supplierId: supplierId,
            supplierBarangId: id,
            supplierBarangHarjul: harjul,
            supplierBarangStok: stok,
            supplierBarangQty: 1
        },
        success: function (res) {
            app.dialog.alert("Data Berhasil Di Masukkan Ke Keranjang", "Success");
        },
        error: function () {
            app.dialog.alert("Tidak Terhubung dengan Server!", "Error");
        }
    })
    $('#keranjangPembelian').css({ display: 'block' });
}

$(document).on('keyup', '#searchBarangPembelian', function () {
    let searchInputNew = $(this).val()

    if (searchInputNew.length > 0) {
        tampilBarangPembelian(searchInputNew)
    } else {
        tampilBarangPembelian('')
    }
})