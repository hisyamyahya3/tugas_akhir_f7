function tampilSupplierPembelian() {
    $.ajax({
        type: "GET",
        url: "http://localhost/api_toko/Supplier",
        success: function(result) {
            let dt = "";
            let res = JSON.parse(result);
            // console.log(res.data)
            let temp = '';

            res.data.forEach((d) => {
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
        }
    })
}

function pilihSupplier (id, nama) {
    // console.log(`${id} dan ${nama}`);
    localStorage.setItem("supplierId", id);
    localStorage.setItem("supplierNama", nama);
    app.views.main.router.navigate("/brg-pembelian/");
}

$(document).on('keyup', '#searchSupplierPembelian', function () {
    let searchInputNew = $(this).val()

    // console.log(searchInputNew)
    
    if (searchInputNew.length > 0) {
        $.ajax({
            url: "http://localhost/api_toko/Supplier/search",
            method: "POST",
            data: {
                nama_supplier: searchInputNew
            },
            success: function(res) {
                let data = JSON.parse(res)
                // console.log(data);
                // return;
                if (data.data) {
                    $('#tampilSupplierPembelian').html(fetchDataSupplierPembelian(data))
                } else {
                    $('#tampilSupplierPembelian').html(tampilSupplierPembelian())
                }
            },
            error: function(){
                app.dialog.alert("Tidak Terhubung dengan Server!","Error");
            }
        })
    } else {
        $('#tampilSupplierPembelian').html(tampilSupplierPembelian())
    }
})

function fetchDataSupplierPembelian(data) {
    let temp = '';

    data.data.forEach((d) => {
        temp += `<div class="card">
                    <div class="card-content card-content-padding">
                        <p class="col font-17">${d.suplier_nama}</p>
                        <p class="col font-17">${d.suplier_alamat}</p>
                        <p class="col font-17">${d.suplier_notelp}</p>
                    </div>
                    <div class="card-footer">
                        <button class="button button-small button-tonal color-blue" onclick="pilihSupplier('${d.suplier_id}', '${d.suplier_nama}')">Pilih</button>
                    </div>
                </div>`
    });
    return temp;
}

function kembaliPembelian() {
    app.dialog.confirm('Apakah anda ingin keluar sebelum melanjutkan pembelian?','Konfirmasi', function (confirmed) {
        if (confirmed) {
            var view = app.views.current;
            view.router.back(view.history[0],{force:true});
        }
    });
}