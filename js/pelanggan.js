function tampilPelanggan() {
    $.ajax({
        type: "GET",
        url: "http://localhost/api_toko/Pelanggan",
        success: function(result) {
            let dt = "";
            let res = JSON.parse(result);
            // console.log(res.data)
            let temp = '';

            res.data.forEach((d) => {
                temp += `
                    <tr>
                        <td class="label-cell" style="width: 40%">${d.pelanggan_nama}</td>
                        <td class="label-cell" style="width: 20%">${d.pelanggan_alamat}</td>
                        <td class="numeric-cell" style="width: 20%">${d.pelanggan_notelp}</td>
                        <td class="label-cell"><p class="grid grid-cols-2 grid-gap"><button class="button button-small button-tonal" onclick="editPelanggan(${d.pelanggan_id}, '${d.pelanggan_nama}', '${d.pelanggan_alamat}', '${d.pelanggan_notelp}',)">Edit</button><button class="button button-small button-tonal color-red" onclick="#">Hapus</button></p></td>
                  </tr>
                `
            })
            $('#daftar-pelanggan').html(temp)    
        }
    })
}

function tambahPelanggan() {
    let pelanggan_nama = $("input[name=pelanggan_nama]").val();
    let pelanggan_alamat = $("input[name=pelanggan_alamat]").val();
    let pelanggan_notelp = $("input[name=pelanggan_notelp]").val();
    if(pelanggan_nama == "" || pelanggan_alamat == "" || pelanggan_notelp == ""){
        app.dialog.alert("Isian Masih Kosong, Silahkan Cek Kembali","Error");
        return;
    }
    $.ajax({
        url: "http://localhost/api_toko/Pelanggan/insert",
        method: "POST",
        data: {pelanggan_nama: pelanggan_nama, pelanggan_alamat: pelanggan_alamat, pelanggan_notelp: pelanggan_notelp},
        success: function(){
            app.dialog.alert("Data Berhasil Di Input","Success");
            app.views.main.router.back();
        },
        error: function(){
            app.dialog.alert("Tidak Terhubung dengan Server!","Error");
        }
    })
}

function editPelanggan(id, nama, alamat, notelp) {
    localStorage.setItem("kodePelanggan", id);
    localStorage.setItem("namaPelanggan", nama);
    localStorage.setItem("alamatPelanggan", alamat);
    localStorage.setItem("notelpPelanggan", notelp);
    app.views.main.router.navigate("/editplgn/");
}
