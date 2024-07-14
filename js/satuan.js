function tampilSatuan () {
    let userID = localStorage.getItem("userID")

    $.ajax({
        url: "http://localhost/api_toko/Satuan",
        method: "POST",
        data: {
            userID: userID
        },
        success: function (result) {
            let res = JSON.parse(result);
            let temp = '';
            let pic = '';

            if (res.data.length === 0) {
                pic = `<div class="teks-tengah">
                            <img src="img/nodata.jpg" class="besar" />
                        </div>`;
            }

            res.data.forEach((d) => {
                temp += `
                    <tr>
                        <td class="label-cell font-17 teks-tengah" style="font-weight: bold;">${d.satuan_nama}</td>
                        <td class="actions-cell"><p class="grid grid-cols-2 grid-gap"><button class="button button-small button-tonal color-blue" onclick="editSatuan(${d.satuan_id}, '${d.satuan_nama}')">Edit</button><button class="button button-small button-tonal color-red" onclick="hapusSatuan(${d.satuan_id})">Hapus</button></p></td>
                    </tr>
                `   
            })

            $('#daftar-satuan').html(temp)
            $('#nodata').html(pic)
        }
    })
}

function tambahSatuan () {
    let satuan_nama = $("input[name=satuan_nama]").val();
    let userID = localStorage.getItem("userID")
    if (satuan_nama == "") {
        app.dialog.alert("Isian Masih Kosong, Silahkan Cek Kembali", "Error");
        return;
    }

    $.ajax({
        url: "http://localhost/api_toko/Satuan/insert",
        method: "POST",
        data: {
            satuan_nama: satuan_nama,
            userID: userID
        },
        success: function (result) {
            // console.log(result);
            // return;
            let res = JSON.parse(result);
            let message = res.keterangan
            app.dialog.alert(message, "Success");
            app.views.main.router.back();
        },
        error: function () {
            app.dialog.alert("Tidak Terhubung dengan Server!", "Error");
        }
    })
}

function editSatuan (id, nama) {
    // console.log(`id satuan = ${id}, dan nama satuan = ${nama}`);
    // return;
    localStorage.setItem("namaSatuan", nama);
    localStorage.setItem("idSatuan", id);
    app.views.main.router.navigate("/editsatuan/");
}

function updateSatuan () {
    let idSatuan = localStorage.getItem("idSatuan");
    let satuan_nama = $("#satuan_nama").val();

    if (satuan_nama == "") {
        app.dialog.alert("Isian Masih Kosong, Silahkan Cek Kembali", "Error");
        return;
    }

    $.ajax({
        url: "http://localhost/api_toko/Satuan/update",
        method: "POST",
        data: {
            satuan_id: idSatuan,
            satuan_nama: satuan_nama
        },
        success: function (result) {
            let res = JSON.parse(result)
            let message = res.keterangan
            app.dialog.alert(message, "Success");
            app.views.main.router.back();
        },
        error: function () {
            app.dialog.alert("Tidak Terhubung dengan Server!", "Error");
        }
    })

}

function hapusSatuan(id) {
    $.ajax({
        url: "http://localhost/api_toko/Satuan/delete",
        method: "POST",
        data: { satuan_id: id },
        success: function (result) {
            // console.log(res)
            let res = JSON.parse(result)
            let message = res.keterangan
            app.dialog.alert(message, "Success");
            app.views.main.router.refreshPage();
            // app.views.main.router.reload();
        },
        error: function () {
            app.dialog.alert("Tidak Terhubung dengan Server!", "Error");
        }
    })
}

$(document).on('keyup', '#searchTabelSatuan', function () {
    let searchInput = $(this).val()
    let userID = localStorage.getItem("userID");

    if ( searchInput.length > 0) {
        $.ajax({
            url: "http://localhost/api_toko/Satuan/search",
            method: "POST",
            data: {
                satuan_nama: searchInput,
                userID: userID
            },
            success: function (result) {
                let res = JSON.parse(result)

                if (res.data) {
                    $('#daftar-satuan').html(fetchDataSatuan(res))
                } else {
                    $('#daftar-satuan').html(tampilSatuan())
                }
            },
            error: function () {
                app.dialog.alert("Tidak Terhubung dengan Server!", "Error");
            }
        })
    } else {
        $('#daftar-satuan').html(tampilSatuan())
    }
})

function fetchDataSatuan (res) {
    let temp = '';

    res.data.forEach((d) => {
        temp += `
            <tr>
                <td class="label-cell font-17 teks-tengah" style="font-weight: bold;">${d.satuan_nama}</td>
                <td class="actions-cell"><p class="grid grid-cols-2 grid-gap"><button class="button button-small button-tonal color-blue" onclick="editSatuan(${d.satuan_id}, '${d.satuan_nama}')">Edit</button><button class="button button-small button-tonal color-red" onclick="hapusSatuan(${d.satuan_id})">Hapus</button></p></td>
            </tr>
        `
    });

    return temp;
}