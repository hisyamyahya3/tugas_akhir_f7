function tampilBarang() {
    $.ajax({
        type: "GET",
        url: "http://localhost/api_toko/Barang",
        success: function(result) {
            let dt = "";
            let res = JSON.parse(result);
            let temp = '';

            res.data.forEach((d) => {
                temp += `
                    <tr>
                        <td class="label-cell">${d.barang_nama}</td>
                        <td class="label-cell">${d.barang_satuan}</td>
                        <td class="numeric-cell">${d.barang_harjul}</td>
                        <td class="numeric-cell">${d.barang_stok}</td> 
                        <td class="numeric-cell">${d.kategori_nama}</td> 
                        <td class="label-cell"><p class="grid grid-cols-2 grid-gap"><button class="button button-small button-tonal color-blue" onclick="editBarang(${d.barang_id}, '${d.barang_nama}', '${d.barang_satuan}', ${d.barang_harpok}, ${d.barang_harjul}, ${d.barang_harjul_grosir}, ${d.barang_stok}, ${d.barang_min_stok}, ${d.barang_kategori_id})">Edit</button><button class="button button-small button-tonal color-red" onclick="hapusBarang(${d.barang_id})">Hapus</button></p></td>
                  </tr>
                `
            })
            $('#daftar-barang').html(temp)    
        }
    })
}

function tambahBarang() {
    let barang_nama = $("input[name=barang_nama]").val();
    let barang_satuan = $("input[name=barang_satuan]").val();
    let barang_harpok = $("input[name=barang_harpok]").val();
    let barang_harjul = $("input[name=barang_harjul]").val();
    let barang_harjul_grosir = $("input[name=barang_harjul_grosir]").val();
    let barang_stok = $("input[name=barang_stok]").val();
    let barang_min_stok = $("input[name=barang_min_stok]").val();
    let barang_kategori_id = $('#pilih_kategori').val();
    if(barang_nama == "" || barang_satuan == "" || barang_harpok == "" || barang_harjul == "" || barang_harjul_grosir == "" || barang_stok == "" || barang_min_stok == "" || barang_kategori_id == ""){
        app.dialog.alert("Isian Masih Kosong, Silahkan Cek Kembali","Error");
        return;
    }
    

    $.ajax({
        url: "http://localhost/api_toko/Barang/insert",
        method: "POST",
        data: {barang_nama: barang_nama, barang_satuan: barang_satuan, barang_harpok: barang_harpok, barang_harjul: barang_harjul, barang_harjul_grosir: barang_harjul_grosir, barang_stok: barang_stok, barang_min_stok: barang_min_stok, barang_kategori_id: barang_kategori_id},
        success: function(){
            app.dialog.alert("Data Berhasil Di Input","Success");
            app.views.main.router.back();
        },
        error: function(){
            app.dialog.alert("Tidak Terhubung dengan Server!","Error");
        }
    })
}

function resetBarang() {
    let barang_nama = $("input[name=barang_nama]").val("");
    let barang_satuan = $("input[name=barang_satuan]").val("");
    let barang_harpok = $("input[name=barang_harpok]").val("");
    let barang_harjul = $("input[name=barang_harjul]").val("");
    let barang_harjul_grosir = $("input[name=barang_harjul_grosir]").val("");
    let barang_stok = $("input[name=barang_stok]").val("");
    let barang_min_stok = $("input[name=barang_min_stok]").val("");
    let barang_kategori_id = $('#pilih_kategori').val("");
    app.dialog.alert("Form Berhasil di Reset","Success");
}

function editBarang(id, nama, satuan, harpok, harjul, grosir, stok, min, barang_kategori_id) {
    localStorage.setItem("kodeBarang", id);
    localStorage.setItem("namaBarang", nama);
    localStorage.setItem("satuanBarang", satuan);
    localStorage.setItem("harpokBarang", harpok);
    localStorage.setItem("harjulBarang", harjul);
    localStorage.setItem("grosirBarang", grosir);
    localStorage.setItem("stokBarang", stok);
    localStorage.setItem("minBarang", min);
    localStorage.setItem("barangKategoriID", barang_kategori_id);
    app.views.main.router.navigate("/editbrg/");
}

function updateBarang() {
    let kodeBarang = localStorage.getItem("kodeBarang");
    let barang_nama = $("input[name=barang_nama]").val();
    let barang_satuan = $("input[name=barang_satuan]").val();
    let barang_harpok = $("input[name=barang_harpok]").val();
    let barang_harjul = $("input[name=barang_harjul]").val();
    let barang_harjul_grosir = $("input[name=barang_harjul_grosir]").val();
    let barang_stok = $("input[name=barang_stok]").val();
    let barang_min_stok = $("input[name=barang_min_stok]").val();
    let barang_kategori_id = $('#pilih_kategori_update').val();

    if(barang_nama == "" || barang_satuan == "" || barang_harpok == "" || barang_harjul == "" || barang_harjul_grosir == "" || barang_stok == "" || barang_min_stok == "" || barang_kategori_id == ""){
        app.dialog.alert("Isian Masih Kosong, Silahkan Cek Kembali","Error");
        return;
    }

    $.ajax({
        url: "http://localhost/api_toko/Barang/update",
        method: "POST",
        data: {
            kodeBarang: kodeBarang,
            barang_nama: barang_nama,
            barang_satuan: barang_satuan,
            barang_harpok: barang_harpok,
            barang_harjul: barang_harjul,
            barang_harjul_grosir: barang_harjul_grosir,
            barang_stok: barang_stok,
            barang_min_stok: barang_min_stok,
            barang_kategori_id: barang_kategori_id
        }, // tapi disini lu ga ngirim barang_id??
        success: function(){
            app.dialog.alert("Data Berhasil Di Update","Success");
            app.views.main.router.back();
        },
        error: function(){
            app.dialog.alert("Tidak Terhubung dengan Server!","Error");
        }
    })
}

function hapusBarang(id) {
    $.ajax({
        url: "http://localhost/api_toko/Barang/delete",
        method: "POST",
        data: {barang_id: id},
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

    function getKategori() {
        $.ajax({
            type: "GET",
            url: "http://localhost/api_toko/Kategori",
            success: function(result) {
                let res = JSON.parse(result);
                console.log(res);
            }
        })
    }
}


