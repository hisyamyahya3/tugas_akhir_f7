// Penjualan Section
function tampilKeranjangPenjualan() {
    $.ajax({
        type: "GET",
        url: "http://localhost/api_toko/Pelanggan/tampilKeranjangPenjualan",
        success: function (result) {
            let res = JSON.parse(result);
            let pic = ""
            let temp = ""

            if (res.length === 0) {
                pic = `<div class="teks-tengah">
                            <img src="img/nodata.jpg" class="besar" />
                        </div>`;
            } 

            res.forEach((customer) => {
                temp += `
                    <div class="block-title">Detail Pelanggan Penjualan</div>
                    <div class="card">
                        <div class="card-content card-content-padding">
                            <p class="col">Nama Pelanggan: ${customer.pelanggan_nama}</p>
                            <p class="col">Alamat Pelanggan: ${customer.pelanggan_alamat}</p>
                            <p class="col">Nomor Telpon: ${customer.pelanggan_notelp}</p>
                            <div class="left">
                                <button class="button button-small button-tonal" onclick="bayarPenjualan(${customer.pelanggan_id}, '${customer.pelanggan_nama}')">Bayar</button>
                            </div>
                        </div>
                    </div>
                `;

                if (customer.data.length > 0) {
                    temp += `<div class="block-title">Detail Barang</div>`;
                }

                customer.data.forEach((detail) => {
                    const total = detail.barang_harjul * detail.qty;
                    temp += `
                        <div class="card">
                            <div class="card-content card-content-padding">
                                <input type="hidden" class="barang-id" value="${detail.barang_id}">
                                <h2 class="col font-17" style="font-weight: bold;">Nama Barang: ${detail.barang_nama}</h2>
                                <p class="col font-17">Jumlah Barang: ${detail.qty}</p>
                                <p class="col font-17">Harga per item: ${rupiahFormatter(detail.barang_harjul)}</p>
                                <p class="col font-17">Total: ${rupiahFormatter(total)}</p>
                            </div>
                        </div>
                    `;
                });
            });

            $('#nodata').html(pic)
            $("#keranjangPenjualan").html(temp);
        },
    });
}

function bayarPenjualan(pelanggan_id, pelanggan_nama) {
    localStorage.setItem('pelangganID', pelanggan_id)
    localStorage.setItem('namaPelangganKeranjang', pelanggan_nama)

    app.views.main.router.navigate(`/keranjang/detail-penjualan/${pelanggan_id}`);
}

function tampilBayarPenjualan(id) {
    $.ajax({
        url: "http://localhost/api_toko/Pelanggan/bayarKeranjang",
        method: "POST",
        data: { pelangganId: id },
        success: function (result) {
            let res = JSON.parse(result);

            let temp = "";
            let total = 0;

            if (res.length == 0) {
                app.views.main.router.back();
            } 

            res.data.forEach((d) => {
                let subtotal = parseInt(d.barang_harjul) * parseInt(d.qty);
                total += subtotal;

                temp += `
                <div class="card">
                    <div class="card-content card-content-padding">
                        <h2 class="col font-17" style="font-weight: bold;">Nama Barang: ${d.barang_nama}</h2>
                        <div class="grid grid-cols">
                            <div>
                                <div class="stepper stepper-fill stepper-init">
                                    <div class="stepper-button-minus" onclick="btnqtyPenjualan(${d.id}, ${d.barang_id}, ${d.qty}, ${d.pelanggan_id}, 'min')"></div>
                                    <div class="stepper-input-wrap">
                                        <input type="number" value="${d.qty}" readonly />
                                    </div>
                                    <div class="stepper-button-plus" onclick="btnqtyPenjualan(${d.id}, ${d.barang_id}, ${d.qty}, ${d.pelanggan_id}, 'plus')"></div>
                                </div>
                            </div>
                        </div>
                        <p class="col font-17">Stok: ${d.barang_stok}</p>
                        <p class="col font-17">Harga: ${rupiahFormatter(d.barang_harjul)}</p>
                        <p class="col font-17">Subtotal: ${rupiahFormatter(subtotal)}</p>
                    </div>
                    <div class="card-footer">
                        <button class="button button-small button-tonal color-red" onclick="hapusKeranjangPenjualan(${d.pelanggan_id}, ${d.id})">Hapus Barang</button>
                    </div>
                </div>
                `
            });

            let temp2 = `
                <p class="col font-17">Total: ${rupiahFormatter(total)}</p>
            `
            let temp3 = `
                <button class="button button-large button-tonal" onclick="lanjutBayarPenjualan(${id}, ${total})">Lanjut Ke Pembayaran</button>
            `

            $("#tampilBayarPenjualan").html(temp);
            $("#tampilTotalBayarPenjualan").html(temp2);
            $("#tombolBayarPenjualan").html(temp3);
        },
    });
}

function btnqtyPenjualan(id, barang_id, qty, pelanggan_id, action) {
    $.ajax({
        url: "http://localhost/api_toko/Pelanggan/editQty",
        method: "POST",
        data: {
            id: id,
            barang_id: barang_id,
            qty: qty,
            action: action
        },
        success: function (res) {
            tampilBayarPenjualan(pelanggan_id)
        },
        error: function () {
            app.dialog.alert("Tidak Terhubung dengan Server!", "Error");
        }
    })

}

function hapusKeranjangPenjualan(pelanggan_id, id) {
    $.ajax({
        url: "http://localhost/api_toko/Pelanggan/deleteKeranjang",
        method: "POST",
        data: {
            pelanggan_id: pelanggan_id,
            id: id
        },
        success: function (res) {
            tampilBayarPenjualan(pelanggan_id)
            let result = JSON.parse(res)
            let status = (result.status == 'ok') ? 'Success' : 'Error'

            if (result.data.latestCart == 0) {
                app.views.main.router.back()
                return
            }

            app.dialog.alert(result.keterangan, status)
        },
        error: function () {
            app.dialog.alert("Tidak Terhubung dengan Server!", "Error")
        }
    })
}

function lanjutBayarPenjualan(pelanggan_id, total) {
    localStorage.setItem("pelangganID", pelanggan_id);
    localStorage.setItem("totalPenjualan", total);

    app.views.main.router.navigate("/bayarpenjualannew/");
}

// Pembelian Section
function tampilKeranjangPembelian() {
    $.ajax({
        type: "GET",
        url: "http://localhost/api_toko/Supplier/tampilKeranjangPembelian",
        success: function (result) {
            let res = JSON.parse(result);
            let pic = ""
            let temp = ""

            if (res.length === 0) {
                pic = `<div class="teks-tengah">
                            <img src="img/nodata.jpg" class="besar" />
                        </div>`;
            } 
            
            res.forEach((customer) => {
                temp += `
                    <div class="block-title">Detail Supplier Pembelian</div>
                    <div class="card">
                        <div class="card-content card-content-padding">
                            <p class="col">Nama Supplier: ${customer.suplier_nama}</p>
                            <p class="col">Alamat Supplier: ${customer.suplier_alamat}</p>
                            <p class="col">Nomor Telp: ${customer.suplier_notelp}</p>
                            <div class="left">
                                <button class="button button-small button-tonal" onclick="bayarPembelian(${customer.suplier_id}, '${customer.suplier_nama}')">Bayar</button>
                            </div>
                        </div>
                    </div>    
                `;

                if (customer.data.length > 0) {
                    temp += `<div class="block-title">Detail Barang</div>`;
                }

                customer.data.forEach((detail) => {
                    const total = detail.barang_harjul * detail.qty;
                    temp += `
                        <div class="card">
                            <div class="card-content card-content-padding">
                                <input type="hidden" class="barang-id" value="${detail.barang_id}">
                                <h2 class="col font-17" style="font-weight: bold;">Nama Barang: ${detail.barang_nama}</h2>
                                <p class="col font-17">Jumlah Barang: ${detail.qty}</p>
                                <p class="col font-17">Harga per item: ${rupiahFormatter(detail.barang_harjul)}</p>
                                <p class="col font-17">Total: ${rupiahFormatter(total)}</p>
                            </div>
                        </div>
                    `;
                });
            });

            $('#nodata1').html(pic)
            $("#keranjangPembelian").html(temp);
        },
    });
}

function bayarPembelian(supplier_id, supplier_nama) {
    localStorage.setItem('supplierID', supplier_id)
    localStorage.setItem('namaSupplierKeranjang', supplier_nama)
    app.views.main.router.navigate(`/keranjang/detail-pembelian/${supplier_id}`);
}

function tampilBayarPembelian(id) {
    $.ajax({
        url: "http://localhost/api_toko/Supplier/bayarKeranjang",
        method: "POST",
        data: { supplierId: id },
        success: function (result) {
            let res = JSON.parse(result);
            let temp = "";
            let total = 0;

            if (res.length == 0) {
                app.views.main.router.back();
            } 

            res.data.forEach((d) => {
                let subtotal = parseInt(d.barang_harjul) * parseInt(d.qty);
                total += subtotal;

                temp += `
                <div class="card">
                    <div class="card-content card-content-padding">
                        <h2 class="col font-17" style="font-weight: bold;">Nama Barang: ${d.barang_nama}</h2>
                        <div class="grid grid-cols">
                            <div>
                                <div class="stepper stepper-fill stepper-init">
                                    <div class="stepper-button-minus" onclick="btnqtyPembelian(${d.id}, ${d.barang_id}, ${d.qty}, ${d.supplier_id}, 'min')"></div>
                                    <div class="stepper-input-wrap">
                                        <input type="number" value="${d.qty}" readonly />
                                    </div>
                                    <div class="stepper-button-plus" onclick="btnqtyPembelian(${d.id}, ${d.barang_id}, ${d.qty}, ${d.supplier_id}, 'plus')"></div>
                                </div>
                            </div>
                        </div>
                        <p class="col font-17">Stok: ${d.barang_stok}</p>
                        <p class="col font-17">Harga: ${rupiahFormatter(d.barang_harjul)}</p>
                        <p class="col font-17">Subtotal: ${rupiahFormatter(subtotal)}</p>
                    </div>
                    <div class="card-footer">
                        <button class="button button-small button-tonal color-red" onclick="hapusKeranjangPembelian(${d.id}, ${d.supplier_id})">Hapus Barang</button>
                    </div>
                </div>
                `
            });

            let temp2 = `
                <p class="col font-17">Total: ${rupiahFormatter(total)}</p>
                `

            let temp3 = `
                <button class="button button-large button-tonal" onclick="lanjutBayarPembelian(${id}, ${total})">Lanjut Ke Pembayaran</button>
            
            `

            $("#tampilBayarPembelian").html(temp);
            $("#tampilTotalBayarPembelian").html(temp2);
            $("#tombolBayarPembelian").html(temp3);
        },
    });
}

function btnqtyPembelian(id, barang_id, qty, supplier_id, action) {
    $.ajax({
        url: "http://localhost/api_toko/Supplier/editQty",
        method: "POST",
        data: {
            id: id,
            barang_id: barang_id,
            qty: qty,
            action: action
        },
        success: function (res) {
            tampilBayarPembelian(supplier_id)
        },
        error: function () {
            app.dialog.alert("Tidak Terhubung dengan Server!", "Error");
        }
    })
}

function hapusKeranjangPembelian(id, supplier_id) {
    $.ajax({
        url: "http://localhost/api_toko/Supplier/deleteKeranjang",
        method: "POST",
        data: {
            id: id
        },
        success: function (res) {
            let result = JSON.parse(res)

            app.dialog.alert(result.keterangan, "Info");
            tampilBayarPembelian(supplier_id)
        },
        error: function () {
            app.dialog.alert("Tidak Terhubung dengan Server!", "Error");
        }
    })
}

function lanjutBayarPembelian(supplier_id, total) {
    localStorage.setItem("supplierID", supplier_id);
    localStorage.setItem("totalPembelian", total);
    app.views.main.router.navigate("/bayarpembelian/");
}
