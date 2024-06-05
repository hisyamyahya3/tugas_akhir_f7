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
                        <td class="label-cell" style="width: 40%">${d.pelanggan_nama}</td>
                        <td class="numeric-cell" style="width: 30%">${d.tgl_transaksi}</td>
                        <td class="numeric-cell" style="width: 20%">${d.jml_transaksi}</td>
                        <td class="numeric-cell" style="width: 20%">${d.jml_dibayar}</td>
                        <td class="numeric-cell" style="width: 20%">${d.jml_kekurangan}</td>
                        <td class="label-cell"><button class="button button-small button-tonal" onclick="#">Lihat</button></td>
                    </tr>
                `
            })
            $('#daftar-piutang').html(temp)
        }
    })
}