function tampilUtang() {
    let userID = localStorage.getItem("userID")

    $.ajax({
        url: "http://localhost/api_toko/Utang",
        method: "POST",
        data: { userID: userID },
        success: function (result) {
            let res = JSON.parse(result);
            let temp = '';
            let pic = '';

            if (res.data.length === 0) {
                pic = `<div class="teks-tengah">
                            <img src="img/nodata.jpg" class="besar" />
                        </div>`;
            } else {
                res.data.forEach((d) => {
                    temp += `
                        <div class="card">
                            <div class="card-content card-content-padding">
                                <h2 class="col font-17" style="font-weight: bold;">Nama Supplier: ${d.suplier_nama}</h2>
                                <p class="col font-17">Tgl Transaksi: ${d.tgl_transaksi}</p>
                                <p class="col font-17">Jumlah Transaksi: ${rupiahFormatter(d.jml_transaksi)}</p>
                                <p class="col font-17">Jumlah Dibayar: ${rupiahFormatter(d.jml_dibayar)}</p>
                                <p class="col font-17">Jumlah Kekurangan: ${rupiahFormatter(d.jml_kekurangan)}</p>
                                <div class="grid grid-cols grid-gap">
                                    <button class="button button-small button-tonal" onclick="detailUtang(${d.id})">Lihat</button>
                                </div>
                            </div>
                        </div>
                    `
                })
            }


            $('#daftar-utang').html(temp)
            $('#nodata').html(pic)
        }
    })
}

function detailUtang(id) {
    app.views.main.router.navigate(`/utang/detail/${id}`);
}

$(document).on('keyup', '#searchTabelUtang', function () {
    let searchInput = $(this).val()
    let userID = localStorage.getItem("userID")

    if (searchInput.length > 0) {
        $.ajax({
            url: "http://localhost/api_toko/Utang/search",
            method: "POST",
            data: {
                supplier_nama: searchInput,
                userID: userID
            },
            success: function (result) {
                let res = JSON.parse(result)

                if (res.data) {
                    $('#daftar-utang').html(fetchSearchDataUtang(res))
                } else {
                    $('#daftar-utang').html(tampilUtang())
                }
            },
            error: function () {
                app.dialog.alert("Tidak Terhubung dengan Server!","Error");
            }
        })
    } else {
        $('#daftar-utang').html(tampilUtang())
    }
})

function fetchSearchDataUtang (res) {
    let temp = '';

    res.data.forEach((d) => {
        temp += `
            <div class="card">
                <div class="card-content card-content-padding">
                    <h2 class="col font-17" style="font-weight: bold;">Nama Supplier: ${d.suplier_nama}</h2>
                    <p class="col font-17">Tgl Transaksi: ${d.tgl_transaksi}</p>
                    <p class="col font-17">Jumlah Transaksi: ${rupiahFormatter(d.jml_transaksi)}</p>
                    <p class="col font-17">Jumlah Dibayar: ${rupiahFormatter(d.jml_dibayar)}</p>
                    <p class="col font-17">Jumlah Kekurangan: ${rupiahFormatter(d.jml_kekurangan)}</p>
                    <div class="grid grid-cols grid-gap">
                        <button class="button button-small button-tonal" onclick="detailUtang(${d.id})">Lihat</button>
                    </div>
                </div>
            </div>
        `
    });

    return temp;
}