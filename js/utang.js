function tampilUtang() {
    let userID = localStorage.getItem("userID")

    $.ajax({
        url: "http://localhost/api_toko/Utang",
        method: "POST",
        data: { userID: userID },
        success: function (result) {
            let res = JSON.parse(result);
            let temp = '';

            res.data.forEach((d) => {
                const jml_transaksi = rupiahFormatter(d.jml_transaksi)
                const jml_dibayar = rupiahFormatter(d.jml_dibayar)
                const jml_kekurangan = rupiahFormatter(d.jml_kekurangan)

                temp += `
                    <tr>
                        <td class="label-cell" style="width: 40%">${d.suplier_nama}</td>
                        <td class="numeric-cell" style="width: 30%">${d.tgl_transaksi}</td>
                        <td class="numeric-cell" style="width: 20%">${jml_transaksi}</td>
                        <td class="numeric-cell" style="width: 20%">${jml_dibayar}</td>
                        <td class="numeric-cell" style="width: 20%">${jml_kekurangan}</td>
                        <td class="label-cell"><button class="button button-small button-tonal" onclick="detailUtang(${d.id})">Lihat</button></td>
                    </tr>
                `
            })

            $('#daftar-utang').html(temp)
        }
    })
}

function detailUtang(id) {
    app.views.main.router.navigate(`/utang/detail/${id}`);

}