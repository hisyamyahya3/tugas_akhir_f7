function tampilSupplier() {
    let userID = localStorage.getItem("userID")

    $.ajax({
        url: "http://localhost/api_toko/Supplier",
        method: "POST",
        data: { userID: userID },
        success: function (result) {
            let res = JSON.parse(result);
            let temp = '';

            res.data.forEach((d) => {
                temp += `
                    <tr>
                        <td class="label-cell" style="width: 40%">${d.suplier_nama}</td>
                        <td class="label-cell" style="width: 30%">${d.suplier_alamat}</td>
                        <td class="numeric-cell" style="width: 20%">${d.suplier_notelp}</td>
                        <td class="label-cell"><p class="grid grid-cols-2 grid-gap"><button class="button button-small button-tonal color-blue" onclick="editSupplier(${d.suplier_id}, '${d.suplier_nama}', '${d.suplier_alamat}', '${d.suplier_notelp}')">Edit</button><button class="button button-small button-tonal color-red" onclick="hapusSupplier(${d.suplier_id})">Hapus</button></p></td>
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

    if (suplier_nama == "" || suplier_alamat == "" || suplier_notelp == "") {
        app.dialog.alert("Isian Masih Kosong, Silahkan Cek Kembali", "Error");
        return;
    }

    $.ajax({
        url: "http://localhost/api_toko/Supplier/insert",
        method: "POST",
        data: { suplier_nama: suplier_nama, suplier_alamat: suplier_alamat, suplier_notelp: suplier_notelp },
        success: function () {
            app.dialog.alert("Data Berhasil Di Input", "Success");
            app.views.main.router.back();
        },
        error: function () {
            app.dialog.alert("Tidak Terhubung dengan Server!", "Error");
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

function updateSupplier() {
    let kodeSupplier = localStorage.getItem("kodeSupplier");
    let suplier_nama = $("input[name=suplier_nama]").val();
    let suplier_alamat = $("input[name=suplier_alamat]").val();
    let suplier_notelp = $("input[name=suplier_notelp]").val();

    if (suplier_nama == "" || suplier_alamat == "" || suplier_notelp == "") {
        app.dialog.alert("Isian Masih Kosong, Silahkan Cek Kembali", "Error");
        return;
    }

    $.ajax({
        url: "http://localhost/api_toko/Supplier/update",
        method: "POST",
        data: {
            kodeSupplier: kodeSupplier,
            suplier_nama: suplier_nama,
            suplier_alamat: suplier_alamat,
            suplier_notelp: suplier_notelp,
        },
        success: function () {
            app.dialog.alert("Data Berhasil Di Update", "Success");
            app.views.main.router.back();
        },
        error: function () {
            app.dialog.alert("Tidak Terhubung dengan Server!", "Error");
        }
    })
}

function hapusSupplier(id) {
    // alert(id)
    $.ajax({
        url: "http://localhost/api_toko/Supplier/delete",
        method: "POST",
        data: { suplier_id: id },
        success: function (res) {
            // console.log(res)
            app.dialog.alert("Data Berhasil Di Hapus", "Success");
            app.views.main.router.refreshPage();
            // app.views.main.router.reload();
        },
        error: function () {
            app.dialog.alert("Tidak Terhubung dengan Server!", "Error");
        }
    })
}

$(document).on('keyup', '#searchTabelSupplier', function () {
    let searchInput = $(this).val()
    // console.log(searchInput)

    if (searchInput.length > 0) {
        $.ajax({
            url: "http://localhost/api_toko/Supplier/search",
            method: "POST",
            data: {
                nama_supplier: searchInput
            },
            success: function (res) {
                let data = JSON.parse(res)

                if (data.data) {
                    $('#daftar-supplier').html(fetchSearchDataSupplier(data))
                } else {
                    $('#daftar-supplier').html(tampilSupplier())
                }
            },
            error: function () {
                app.dialog.alert("Tidak Terhubung dengan Server!", "Error");
            }
        })
    } else {
        $('#daftar-supplier').html(tampilSupplier())
    }
})

function fetchSearchDataSupplier(data) {
    let temp = '';

    data.data.forEach((d) => {
        temp += `
            <tr>
                <td class="label-cell" style="width: 40%">${d.suplier_nama}</td>
                <td class="label-cell" style="width: 30%">${d.suplier_alamat}</td>
                <td class="numeric-cell" style="width: 20%">${d.suplier_notelp}</td>
                <td class="label-cell"><p class="grid grid-cols-2 grid-gap"><button class="button button-small button-tonal color-blue" onclick="editSupplier(${d.suplier_id}, '${d.suplier_nama}', '${d.suplier_alamat}', '${d.suplier_notelp}')">Edit</button><button class="button button-small button-tonal color-red" onclick="hapusSupplier(${d.suplier_id})">Hapus</button></p></td>
            </tr>
        `
    });

    return temp;

}