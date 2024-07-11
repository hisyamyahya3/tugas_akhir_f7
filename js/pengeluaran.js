function tampilPengeluaran() {
    let userID = localStorage.getItem("userID")
    $.ajax({
        type: "POST",
        url: "http://localhost/api_toko/Pengeluaran",
        data: { userID: userID },
        success: function(result) {
            let res = JSON.parse(result);
            let temp = '';
            let pic = "";

            if (res.data.length === 0) {
                pic = `<div class="teks-tengah">
                            <img src="img/nodata.jpg" class="besar" />
                        </div>`;
            } else {
                res.data.forEach((d) => {
                    temp += `
                        <div class="card">
                            <div class="card-content card-content-padding">
                                <h2 class="col font-17" style="font-weight: bold;">Uraian: ${d.uraian}</h2>
                                <p class="col font-17">Nominal: ${rupiahFormatter(d.nominal)}</p>
                                <p class="col font-17">Tanggal/ Jam: ${d.waktu}</p>
                                <button class="button button-small button-tonal color-red" onclick="hapusPengeluaran(${d.id_pengeluaran})">Hapus</button>
                            </div>
                        </div>
                    `
                })
            }

            $('#daftar-pengeluaran').html(temp)
            $('#nodata').html(pic)    
        }
    })
}

function tambahPengeluaran() {
    let uraian = $("input[name=uraian]").val();
    let nominal = $("input[name=nominal]").val();
    let userID = localStorage.getItem("userID")
    if(uraian == "" || nominal == ""){
        app.dialog.alert("Isian Masih Kosong, Silahkan Cek Kembali","Error");
        return;
    }

    $.ajax({
        url: "http://localhost/api_toko/Pengeluaran/insert",
        method: "POST",
        data: {uraian: uraian, nominal: nominal, userID: userID},
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