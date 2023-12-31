function tampilSupplier() {
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
                    <tr>
                        <td class="label-cell" style="width: 40%">${d.suplier_nama}</td>
                        <td class="label-cell" style="width: 30%">${d.suplier_alamat}</td>
                        <td class="numeric-cell" style="width: 20%">${d.suplier_notelp}</td>
                        <td class="label-cell"><p class="grid grid-cols-2 grid-gap"><button class="button button-small button-tonal" onclick="editSupplier(${d.suplier_id}, '${d.suplier_nama}', '${d.suplier_alamat}', '${d.suplier_notelp}')">Edit</button><button class="button button-small button-tonal color-red" onclick="#">Hapus</button></p></td>
                  </tr>
                `
            })
            $('#daftar-supplier').html(temp)    
        }
    })
}

function tambahSupplier() {
    let suplier_nama = $("input[name=suplier_nama]").val();
    let suplier_alamat = $("input[name=suplier_alamat]").val();
    let suplier_notelp = $("input[name=suplier_notelp]").val();
    if(suplier_nama == "" || suplier_alamat == "" || suplier_notelp == ""){
        app.dialog.alert("Isian Masih Kosong, Silahkan Cek Kembali","Error");
        return;
    }
    $.ajax({
        url: "http://localhost/api_toko/Supplier/insert",
        method: "POST",
        data: {suplier_nama: suplier_nama, suplier_alamat: suplier_alamat, suplier_notelp: suplier_notelp},
        success: function(){
            app.dialog.alert("Data Berhasil Di Input","Success");
            app.views.main.router.back();
        },
        error: function(){
            app.dialog.alert("Tidak Terhubung dengan Server!","Error");
        }
    })
}

function editSupplier(id, nama, alamat, notelp) {
    localStorage.setItem("kodeSupplier", id);
    localStorage.setItem("namaSupplier", nama);
    localStorage.setItem("alamatSupplier", alamat);
    localStorage.setItem("notelpSupplier", notelp);
    app.views.main.router.navigate("/editsupplier/");
}
