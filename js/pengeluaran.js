function tampilPengeluaran() {
    $.ajax({
        type: "GET",
        url: "http://localhost/api_toko/Pengeluaran",
        success: function(result) {
            let dt = "";
            let res = JSON.parse(result);
            let temp = '';

            res.data.forEach((d) => {
                temp += `
                    <tr>
                        <td class="label-cell">${d.uraian}</td>
                        <td class="numeric-cell">${d.nominal}</td>
                        <td class="numeric-cell">${d.waktu}</td>
                        <td class="actions-cell"><p class="grid grid-cols-2 grid-gap"><button class="button button-small button-tonal color-red" onclick="hapusPengeluaran(${d.id_pengeluaran})">Hapus</button></p></td>
                    </tr>
                `
            })
            $('#daftar-pengeluaran').html(temp)    
        }
    })
}

function tambahPengeluaran() {
    let uraian = $("input[name=uraian]").val();
    let nominal = $("input[name=nominal]").val();
    if(uraian == "" || nominal == ""){
        app.dialog.alert("Isian Masih Kosong, Silahkan Cek Kembali","Error");
        return;
    }

    $.ajax({
        url: "http://localhost/api_toko/Pengeluaran/insert",
        method: "POST",
        data: {uraian: uraian, nominal: nominal},
        success: function(){
            app.dialog.alert("Data Berhasil Di Input","Success");
            app.views.main.router.back();
        },
        error: function(){
            app.dialog.alert("Tidak Terhubung dengan Server!","Error");
        }
    })
    // app.dialog.alert(kategori_nama,"Info");
    // app.views.main.router.back();
}

function hapusPengeluaran(id) {
    $.ajax({
        url: "http://localhost/api_toko/Pengeluaran/delete",
        method: "POST",
        data: {id_pengeluaran: id},
        success: function(res) {
            // console.log(res)
            app.dialog.alert("Data Berhasil Di Hapus","Success");
            app.views.main.router.refreshPage();
            // app.views.main.router.reload();
        },
        error: function(){
            app.dialog.alert("Tidak Terhubung dengan Server!","Error");
        }
    })
}