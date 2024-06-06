function tampilPiutang() {
    let userID = localStorage.getItem("userID")

    $.ajax({
        url: "http://localhost/api_toko/Piutang",
        method: "POST",
        data: { userID: userID },
        success: function (result) {
            let res = JSON.parse(result);
            let temp = '';

            res.data.forEach((d) => {
                temp += `
                    <tr>
                        <td class="label-cell">${d.pelanggan_nama}</td>
                        <td class="numeric-cell">${d.tgl_transaksi}</td>
                        <td class="numeric-cell">${rupiahFormatter(d.jml_transaksi)}</td>
                        <td class="numeric-cell">${rupiahFormatter(d.jml_dibayar)}</td>
                        <td class="numeric-cell">${rupiahFormatter(d.jml_kekurangan)}</td>
                        <td class="label-cell"><button class="button button-small button-tonal" onclick="detailPiutang(${d.id})">Lihat</button></td>
                    </tr>
                `
            })

            $('#daftar-piutang').html(temp)
        }
    })
}

function detailPiutang(id) {
    app.views.main.router.navigate(`/piutang/detail/${id}`);
}