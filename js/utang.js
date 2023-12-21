function tampilUtang() {
    $.ajax({
        type: "GET",
        url: "http://localhost/api_toko/Utang",
        success: function(result) {
            let dt = "";
            let res = JSON.parse(result);
            // console.log(res.data)
            let temp = '';

            res.data.forEach((d) => {
                temp += `
                    <tr>
                        <td class="label-cell" style="width: 40%">${d.suplier_nama}</td>
                        <td class="numeric-cell" style="width: 30%">${d.tgl_transaksi}</td>
                        <td class="numeric-cell" style="width: 20%">${d.jml_transaksi}</td>
                        <td class="numeric-cell" style="width: 20%">${d.jml_dibayar}</td>
                        <td class="numeric-cell" style="width: 20%">${d.jml_kekurangan}</td>
                        <td class="label-cell"><button class="button button-small button-tonal" onclick="#">Edit</button></td>
                  </tr>
                `
            })
            $('#daftar-utang').html(temp)    
        }
    })
}
