function tampilPiutang() {
    let userID = localStorage.getItem("userID")

    $.ajax({
        url: "http://localhost/api_toko/Piutang",
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
                                <h2 class="col font-17" style="font-weight: bold;">Nama Supplier: ${d.pelanggan_nama}</h2>
                                <p class="col font-17">Tgl Transaksi: ${d.tgl_transaksi}</p>
                                <p class="col font-17">Jumlah Transaksi: ${rupiahFormatter(d.jml_transaksi)}</p>
                                <p class="col font-17">Jumlah Dibayar: ${rupiahFormatter(d.jml_dibayar)}</p>
                                <p class="col font-17">Jumlah Kekurangan: ${rupiahFormatter(d.jml_kekurangan)}</p>
                                <div class="grid grid-cols grid-gap">
                                    <button class="button button-small button-tonal" onclick="detailPiutang(${d.id})">Lihat</button>
                                </div>
                            </div>
                        </div>
                    `
                })
            }


            $('#daftar-piutang').html(temp)
            $('#nodata').html(pic)
        }
    })
}

function detailPiutang(id) {
    app.views.main.router.navigate(`/piutang/detail/${id}`);
}

$(document).on('keyup', '#searchTabelPiutang', function () {
    let searchInput = $(this).val()
    let userID = localStorage.getItem("userID")

    if (searchInput.length > 0) {
        $.ajax({
            url: "http://localhost/api_toko/Piutang/search",
            method: "POST",
            data: {
                pelanggan_nama: searchInput,
                userID: userID
            },
            success: function (result) {
                let res = JSON.parse(result)

                if (res.data) {
                    $('#daftar-piutang').html(fetchSearchDataPiutang(res))
                } else {
                    $('#daftar-piutang').html(tampilPiutang())
                }
            },
            error: function () {
                app.dialog.alert("Tidak Terhubung dengan Server!","Error");
            }
        })
    } else {
        $('#daftar-piutang').html(tampilPiutang())
    }
})

function fetchSearchDataPiutang (res) {
    let temp = ''

    res.data.forEach((d) => {
        temp += `
            <div class="card">
                <div class="card-content card-content-padding">
                    <h2 class="col font-17" style="font-weight: bold;">Nama Supplier: ${d.pelanggan_nama}</h2>
                    <p class="col font-17">Tgl Transaksi: ${d.tgl_transaksi}</p>
                    <p class="col font-17">Jumlah Transaksi: ${rupiahFormatter(d.jml_transaksi)}</p>
                    <p class="col font-17">Jumlah Dibayar: ${rupiahFormatter(d.jml_dibayar)}</p>
                    <p class="col font-17">Jumlah Kekurangan: ${rupiahFormatter(d.jml_kekurangan)}</p>
                    <div class="grid grid-cols grid-gap">
                        <button class="button button-small button-tonal" onclick="detailPiutang(${d.id})">Lihat</button>
                    </div>
                </div>
            </div>
        `
    });

    return temp;
}