function tampilPelanggan() {
    let userID = localStorage.getItem("userID")
    $.ajax({
        type: "POST",
        url: "http://localhost/api_toko/Pelanggan",
        data: { userID: userID },
        success: function(result) {
            let res = JSON.parse(result);
            let temp = '';
            let pic = "";

            if (res.data.length === 0) {
                pic = `<div class="teks-tengah">
                            <img src="img/nodata.jpg" class="besar" />
                        </div>`;
            } 
        
            res.data.forEach((d) => {
                temp += `
                    <div class="card">
                        <div class="card-content card-content-padding">
                            <h2 class="col font-17" style="font-weight: bold;">Nama Pelanggan: ${d.pelanggan_nama}</h2>
                            <p class="col font-17">Alamat Pelanggan: ${d.pelanggan_alamat}</p>
                            <p class="col font-17">Nomor Telp: ${d.pelanggan_notelp}</p>
                            <div class="grid grid-cols-2 grid-gap">
                                <button class="button button-small button-tonal color-blue" onclick="editPelanggan(${d.pelanggan_id}, '${d.pelanggan_nama}', '${d.pelanggan_alamat}', '${d.pelanggan_notelp}',)">Edit</button>
                                <button class="button button-small button-tonal color-red" onclick="hapusPelanggan(${d.pelanggan_id})">Hapus</button>
                            </div>
                        </div>
                    </div>
                `
            })
            

            $('#daftar-pelanggan').html(temp) 
            $('#nodata').html(pic)   
        }
    })
}

function tambahPelanggan() {
    let pelanggan_nama = $("input[name=pelanggan_nama]").val();
    let pelanggan_alamat = $("textarea[name=pelanggan_alamat]").val();
    let pelanggan_notelp = $("input[name=pelanggan_notelp]").val();
    let userID = localStorage.getItem("userID")
    if(pelanggan_nama == "" || pelanggan_alamat == "" || pelanggan_notelp == ""){
        app.dialog.alert("Isian Masih Kosong, Silahkan Cek Kembali","Error");
        return;
    }
    $.ajax({
        url: "http://localhost/api_toko/Pelanggan/insert",
        method: "POST",
        data: {pelanggan_nama: pelanggan_nama, pelanggan_alamat: pelanggan_alamat, pelanggan_notelp: pelanggan_notelp, userID: userID},
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
    let pelanggan_alamat = $("textarea[name=pelanggan_alamat]").val();
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
    let userID = localStorage.getItem("userID")

    if (searchInput.length > 0) {
        $.ajax({
            url: "http://localhost/api_toko/Pelanggan/search",
            method: "POST",
            data: {
                nama_pelanggan: searchInput, userID: userID
            },
            success: function(res) {
                let data = JSON.parse(res)

                if (data.data) {
                    $('#daftar-pelanggan').html(fetchSearchDataPelanggan(data))
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

function fetchSearchDataPelanggan(data) {
    let temp = '';

    data.data.forEach((d) => {
        temp += `
            <div class="card">
                <div class="card-content card-content-padding">
                    <h2 class="col font-17" style="font-weight: bold;">Nama Pelanggan: ${d.pelanggan_nama}</h2>
                    <p class="col font-17">Alamat Pelanggan: ${d.pelanggan_alamat}</p>
                    <p class="col font-17">Nomor Telp: ${d.pelanggan_notelp}</p>
                    <div class="grid grid-cols-2 grid-gap">
                        <button class="button button-small button-tonal color-blue" onclick="editPelanggan(${d.pelanggan_id}, '${d.pelanggan_nama}', '${d.pelanggan_alamat}', '${d.pelanggan_notelp}',)">Edit</button>
                        <button class="button button-small button-tonal color-red" onclick="hapusPelanggan(${d.pelanggan_id})">Hapus</button>
                    </div>
                </div>
            </div>
        `
    });
    
    return temp;
 
}
