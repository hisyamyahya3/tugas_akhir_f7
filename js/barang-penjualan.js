function tampilBarangPenjualan(keyword) {
    let userID = localStorage.getItem("userID")

    $.ajax({
        url: "http://localhost/api_toko/Barang/search",
        method: "POST",
        data: {
            nama_barang: keyword,
            userID: userID,
        },
        success: function (res) {
            let data = JSON.parse(res)

            let temp = '';

            data.data.forEach((d) => {
                temp += `
                    <div class="card">
                        <div class="card-content card-content-padding">
                            <h4 class="col font-17 teks-tengah">${d.barang_nama}</h4>
                            <p class="col font-17">Harga: ${d.barang_harjul}</p>
                            <p class="col font-17">Stok: ${d.barang_stok}</p>
                        </div>
                        <div class="card-footer">
                            <button class="button button-small button-tonal color-blue" onclick="pilihBarangPelanggan('${d.barang_id}', '${d.barang_harjul}')">Keranjang</button>
                        </div>
                    </div>
                `
            })

            $('#tampilBarangPenjualan').html(temp)
        },
        error: function () {
            app.dialog.alert("Tidak Terhubung dengan Server!", "Error")
        }
    })
}

function pilihBarangPelanggan(barang_id, harjul) {
    let pelangganId = localStorage.getItem("cartPelangganID")

    if (!pelangganId) {
        app.dialog.alert("Tidak Terhubung dengan Server!", "Error")
        return
    }

    $.ajax({
        url: "http://localhost/api_toko/Pelanggan/keranjang",
        method: "POST",
        data: {
            pelangganId: pelangganId,
            pelangganBarangId: barang_id,
            pelangganBarangHarjul: harjul,
            pelangganBarangQty: 1
        },
        success: function (res) {
            let parsedResult = JSON.parse(res)
            let status = (parsedResult.status == 'ok') ? 'Success' : 'Error'

            app.dialog.alert(parsedResult.keterangan, status)
        },
        error: function () {
            app.dialog.alert("Tidak Terhubung dengan Server!", "Error")
        }
    })
}

$(document).on('keyup', '#searchBarangPenjualan', function () {
    let searchInputNew = $(this).val()

    if (searchInputNew.length > 0) {
        $('#tampilBarangPenjualan').html(tampilBarangPenjualan(searchInputNew))
    } else {
        $('#tampilBarangPenjualan').html(tampilBarangPenjualan(''))
    }
})