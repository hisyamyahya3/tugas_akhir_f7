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
                        <td class="label-cell"><p class="grid grid-cols-2 grid-gap"><button class="button button-small button-tonal color-blue" onclick="editPelanggan(${d.pelanggan_id}, '${d.pelanggan_nama}', '${d.pelanggan_alamat}', '${d.pelanggan_notelp}',)">Edit</button><button class="button button-small button-tonal color-red" onclick="hapusPelanggan(${d.pelanggan_id})">Hapus</button></p></td>
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

function updatePelanggan() {
    let kodePelanggan = localStorage.getItem("kodePelanggan");
    let pelanggan_nama = $("input[name=pelanggan_nama]").val();
    let pelanggan_alamat = $("input[name=pelanggan_alamat]").val();
    let pelanggan_notelp = $("input[name=pelanggan_notelp]").val();

    if(pelanggan_nama == "" || pelanggan_alamat == "" || pelanggan_notelp == ""){
        app.dialog.alert("Isian Masih Kosong, Silahkan Cek Kembali","Error");
        return;
    }

    $.ajax({
        url: "http://localhost/api_toko/Pelanggan/update",
        method: "POST",
        data: {
            kodePelanggan: kodePelanggan,
            pelanggan_nama: pelanggan_nama,
            pelanggan_alamat: pelanggan_alamat,
            pelanggan_notelp: pelanggan_notelp,
        },
        success: function(){
            app.dialog.alert("Data Berhasil Di Update","Success");
            app.views.main.router.back();
        },
        error: function(){
            app.dialog.alert("Tidak Terhubung dengan Server!","Error");
        }
    })
}

function hapusPelanggan(id) {
    // alert(id)
    $.ajax({
        url: "http://localhost/api_toko/Pelanggan/delete",
        method: "POST",
        data: {pelanggan_id: id},
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

$(document).on('keyup', '#searchTabelPelanggan', function () {
    let searchInput = $(this).val()
    // console.log(searchInput)

    if (searchInput.length > 0) {
        $.ajax({
            url: "http://localhost/api_toko/Pelanggan/search",
            method: "POST",
            data: {
                nama_pelanggan: searchInput
            },
            success: function(res) {
                let data = JSON.parse(res)

                if (data.data) {
                    $('#daftar-pelanggan').html(fetchDataPelanggan(data))
                } else {
                    $('#daftar-pelanggan').html(tampilPelanggan())
                }
            },
            error: function(){
                app.dialog.alert("Tidak Terhubung dengan Server!","Error");
            }
        })  
    } else {
        $('#daftar-pelanggan').html(tampilPelanggan())
    }
})

function fetchDataPelanggan(data) {
    let temp = '';

    data.data.forEach((d) => {
        temp += `
            <tr>
                <td class="label-cell" style="width: 40%">${d.pelanggan_nama}</td>
                <td class="label-cell" style="width: 20%">${d.pelanggan_alamat}</td>
                <td class="numeric-cell" style="width: 20%">${d.pelanggan_notelp}</td>
                <td class="label-cell"><p class="grid grid-cols-2 grid-gap"><button class="button button-small button-tonal color-blue" onclick="editPelanggan(${d.pelanggan_id}, '${d.pelanggan_nama}', '${d.pelanggan_alamat}', '${d.pelanggan_notelp}',)">Edit</button><button class="button button-small button-tonal color-red" onclick="hapusPelanggan(${d.pelanggan_id})">Hapus</button></p></td>
            </tr>
        `
    });
    
    return temp;
 
}
