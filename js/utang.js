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
                        <tr>
                            <td class="label-cell">${d.suplier_nama}</td>
                            <td class="numeric-cell">${d.tgl_transaksi}</td>
                            <td class="numeric-cell">${rupiahFormatter(d.jml_transaksi)}</td>
                            <td class="numeric-cell">${rupiahFormatter(d.jml_dibayar)}</td>
                            <td class="numeric-cell">${rupiahFormatter(d.jml_kekurangan)}</td>
                            <td class="label-cell"><button class="button button-small button-tonal" onclick="detailUtang(${d.id})">Lihat</button></td>
                        </tr>
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