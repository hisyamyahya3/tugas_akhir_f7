function tampilKategori() {
    $.ajax({
        type: "GET",
        url: "http://localhost/api_toko/Kategori",
        success: function(result) {
            let dt = "";
            let res = JSON.parse(result);
            let temp = '';

            res.data.forEach((d) => {
                temp += `
                    <tr>
                        <td class="label-cell">${d.kategori_nama}</td>
                        <td class="actions-cell"><p class="grid grid-cols-2 grid-gap"><button class="button button-small button-tonal color-blue" onclick="editKategori(${d.kategori_id}, '${d.kategori_nama}')">Edit</button><button class="button button-small button-tonal color-red" onclick="hapusKategori(${d.kategori_id})">Hapus</button></p></td>
                    </tr>
                `
            })
            $('#daftar-kategori').html(temp)    
        }
    })
}

function tambahKategori() {
    let kategori_nama = $("input[name=kategori_nama]").val();
    if(kategori_nama == ""){
        app.dialog.alert("Isian Masih Kosong, Silahkan Cek Kembali","Error");
        return;
    }

    $.ajax({
        url: "http://localhost/api_toko/Kategori/insert",
        method: "POST",
        data: {kategori_nama: kategori_nama},
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

function editKategori(id, nama) {
    // $('input[name=kategori_nama]').val(id);
    // $('input[name=kategori_nama]').val(nama);

    localStorage.setItem("namaKategori", nama);
    localStorage.setItem("idKategori", id);

    app.views.main.router.navigate("/editktgr/");
    // window.location.href = '/editktgr/';
}

function updateKategori() {
    let idKategori = localStorage.getItem("idKategori");
    let kategori_nama = $("input[name=kategori_nama]").val();

    if(kategori_nama == ""){
        app.dialog.alert("Isian Masih Kosong, Silahkan Cek Kembali","Error");
        return;
    }

    $.ajax({
        url: "http://localhost/api_toko/Kategori/update",
        method: "POST",
        data: {
            id_kategori: idKategori,
            kategori_nama: kategori_nama
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

function hapusKategori(id) {
    $.ajax({
        url: "http://localhost/api_toko/Kategori/delete",
        method: "POST",
        data: {id_kategori: id},
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

$(document).on('keyup', '#searchTabelKategori', function () {
    let searchInput = $(this).val()
    // console.log(searchInput)

    if (searchInput.length > 0) {
        $.ajax({
            url: "http://localhost/api_toko/Kategori/search",
            method: "POST",
            data: {
                kategori_nama: searchInput
            },
            success: function(res) {
                let data = JSON.parse(res)

                if (data.data) {
                    $('#daftar-kategori').html(fetchDataKategori(data))
                } else {
                    $('#daftar-kategori').html(tampilKategori())
                }
            },
            error: function(){
                app.dialog.alert("Tidak Terhubung dengan Server!","Error");
            }
        })  
    } else {
        $('#daftar-kategori').html(tampilKategori())
    }
})

function fetchDataKategori(data) {
    let temp = '';

    data.data.forEach((d) => {
        temp += `
            <tr>
                <td class="label-cell">${d.kategori_nama}</td>
                <td class="actions-cell"><p class="grid grid-cols-2 grid-gap"><button class="button button-small button-tonal color-blue" onclick="editKategori(${d.kategori_id}, '${d.kategori_nama}')">Edit</button><button class="button button-small button-tonal color-red" onclick="hapusKategori(${d.kategori_id})">Hapus</button></p></td>
            </tr>
        `
    });
    
    return temp;
 
}