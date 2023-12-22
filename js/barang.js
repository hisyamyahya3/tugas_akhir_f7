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
                        <td class="numeric-cell">${d.barang_harpok}</td>
                        <td class="numeric-cell">${d.barang_harjul}</td>
                        <td class="numeric-cell">${d.barang_harjul_grosir}</td>
                        <td class="numeric-cell">${d.barang_stok}</td>
                        <td class="numeric-cell">${d.barang_min_stok}</td>
                        <td class="label-cell"><p class="grid grid-cols-2 grid-gap"><button class="button button-small button-tonal" onclick="editBarang(${d.barang_id}, '${d.barang_nama}', '${d.barang_satuan}', ${d.barang_harpok}, ${d.barang_harjul}, ${d.barang_harjul_grosir}, ${d.barang_stok}, ${d.barang_min_stok})">Edit</button><button class="button button-small button-tonal color-red" onclick="#">Hapus</button></p></td>
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
    if(barang_nama == "" || barang_satuan == "" || barang_harpok == "" || barang_harjul == "" || barang_harjul_grosir == "" || barang_stok == "" || barang_min_stok == ""){
        app.dialog.alert("Isian Masih Kosong, Silahkan Cek Kembali","Error");
        return;
    }
    $.ajax({
        url: "http://localhost/api_toko/Barang/insert",
        method: "POST",
        data: {barang_nama: barang_nama, barang_satuan: barang_satuan, barang_harpok: barang_harpok, barang_harjul: barang_harjul, barang_harjul_grosir: barang_harjul_grosir, barang_stok: barang_stok, barang_min_stok: barang_min_stok},
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
    app.dialog.alert("Form Berhasil di Reset","Success");
}

function editBarang(id, nama, satuan, harpok, harjul, grosir, stok, min) {
    localStorage.setItem("kodeBarang", id);
    localStorage.setItem("namaBarang", nama);
    localStorage.setItem("satuanBarang", satuan);
    localStorage.setItem("harpokBarang", harpok);
    localStorage.setItem("harjulBarang", harjul);
    localStorage.setItem("grosirBarang", grosir);
    localStorage.setItem("stokBarang", stok);
    localStorage.setItem("minBarang", min);
    app.views.main.router.navigate("/editbrg/");
}

$(document).on('click', '.reset-searchBarang', function () {
    $('.content-pembelian .barang').html('')
})

// $(document).on('keyup', '#searchbarang', function () {
//     // alert($(this).val())
//     let searchInput = $(this).val()

//     if (searchInput.length > 0) {
//         $.ajax({
//             url: "http://localhost/api_toko/Barang/search",
//             method: "POST",
//             data: {
//                 nama_barang: searchInput
//             },
//             success: function(res) {
//                 let data = JSON.parse(res)

//                 if (data.data) {
//                     $('.content-pembelian .barang').html(fetchDataBarang(data))
//                 } else {
//                     $('.content-pembelian .barang').html('')
//                 }
//             },
//             error: function(){
//                 app.dialog.alert("Tidak Terhubung dengan Server!","Error");
//             }
//         })
//     } else {
//         $('.content-pembelian .barang').html('')
//     }
// })

// function fetchDataBarang(data) {
//     let temp = '';
//     // let parseData = JSON.parse(data);

//     data.data.forEach((d) => {
//         temp += `
//         <div class="card">
//             <div class="card-content card-content-padding">
//                 <div class="row" style="font-size: 17px;">
//                     <div class="col-25" style="text-align: left;">Kode Barang : ${d.barang_id}</div>
//                     <div class="col-50" style="font-size: larger;">${d.barang_nama}</div>
//                     <div class="col-25" style="text-align: right;">Stok Barang : ${d.barang_stok}</div>
//                     <div class="col-25" style="text-align: right;">Rp. ${d.barang_harjul}</div>
//                 </div>
//             </div>
//         </div>
//         `
//     });

//     return temp;
// }
