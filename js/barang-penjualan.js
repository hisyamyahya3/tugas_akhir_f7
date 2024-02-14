function tampilBarangPenjualan() {
    $.ajax({
        type: "GET",
        url: "http://localhost/api_toko/Barang",
        success: function(result) {
            let dt = "";
            let res = JSON.parse(result);
            // console.log(res.data)
            let temp = '';

            res.data.forEach((d) => {
                temp += `
                    <div class="card">
                        <div class="card-content card-content-padding">
                            <h4 class="col font-17 teks-tengah">${d.barang_nama}</h4>
                            <p class="col font-17">Harga: ${d.barang_harjul}</p>
                            <p class="col font-17">Stok: ${d.barang_stok}</p>
                        </div>
                        <div class="card-footer">
                            <button class="button button-small button-tonal color-blue" onclick="pilihBarangPelanggan('${d.barang_id}', '${d.barang_harjul}', '${d.barang_stok}')">Keranjang</button>
                        </div>
                    </div>
                `
            })
            $('#tampilBarangPenjualan').html(temp)    
        }
    })
}

function pilihBarangPelanggan (id, harjul, stok) {
    // console.log(`${id} dan ${harjul} dan ${stok}`);
    let pelangganId = localStorage.getItem("pelangganId");

    $.ajax({
        url: "http://localhost/api_toko/Pelanggan/keranjang",
        method: "POST",
        data: {
            pelangganId: pelangganId,
            pelangganBarangId: id,
            pelangganBarangHarjul: harjul,
            pelangganBarangStok: stok
        },
        success: function(res) {
            app.dialog.alert("Data Berhasil Di Masukkan Ke Keranjang","Success");
        },
        error: function() {
            app.dialog.alert("Tidak Terhubung dengan Server!","Error");
        }
    })
    $('#keranjangPenjualan').css({display: 'block'});
}

$(document).on('keyup', '#searchBarangPenjualan', function () {
    let searchInputNew = $(this).val()

    // console.log(searchInputNew)
    
    if (searchInputNew.length > 0) {
        $.ajax({
            url: "http://localhost/api_toko/Barang/search",
            method: "POST",
            data: {
                nama_barang: searchInputNew
            },
            success: function(res) {
                let data = JSON.parse(res)
                // console.log(data);
                // return;
                if (data.data) {
                    $('#tampilBarangPenjualan').html(fetchDataBarangPenjualan(data))
                } else {
                    $('#tampilBarangPenjualan').html(tampilBarangPenjualan())
                }
            },
            error: function(){
                app.dialog.alert("Tidak Terhubung dengan Server!","Error");
            }
        })
    } else {
        $('#tampilBarangPenjualan').html(tampilBarangPenjualan())
    }
})

function fetchDataBarangPenjualan(data) {
    let temp = '';

    data.data.forEach((d) => {
        temp += `<div class="card">
                    <div class="card-content card-content-padding">
                        <h4 class="col font-17 teks-tengah">${d.barang_nama}</h4>
                        <p class="col font-17">Harga: ${d.barang_harjul}</p>
                        <p class="col font-17">Stok: ${d.barang_stok}</p>
                    </div>
                    <div class="card-footer">
                        <button class="button button-small button-tonal color-blue" onclick="pilihBarangPelanggan('${d.barang_id}', '${d.barang_nama}', '${d.barang_harjul}', '${d.barang_stok}')">Keranjang</button>
                    </div>
                </div>`
    });
    return temp;
}