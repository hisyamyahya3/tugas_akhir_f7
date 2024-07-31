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
                            <h2 class="col font-17" style="font-weight: bold;">Nama Barang: ${d.barang_nama}</h2>
                            <p class="col font-17">Harga: ${rupiahFormatter(d.barang_harjul)}</p>
                            <p class="col font-17">Stok: ${d.barang_stok}</p>
                        </div>
                        <div class="card-footer">
                            <button class="button button-small button-tonal color-blue" onclick="pilihBarangSupplier('${d.barang_id}', '${d.barang_harjul}')">Keranjang</button>
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

function pilihBarangSupplier(id, harjul) {
    let userID = localStorage.getItem("userID");
    let supplierId = localStorage.getItem("cartSupplierID");

    $.ajax({
        url: "http://localhost/api_toko/Supplier/keranjang",
        method: "POST",
        data: {
            supplierId: supplierId,
            supplierBarangId: id,
            supplierBarangHarjul: harjul,
            supplierBarangQty: 1,
            userID
        },
        success: function (res) {
            let parsedResult = JSON.parse(res)
            let status = (parsedResult.status == 'ok') ? 'Success' : 'Error'

            app.dialog.alert(parsedResult.keterangan, status)
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