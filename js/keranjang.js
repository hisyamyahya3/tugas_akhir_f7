function tampilKeranjangPenjualan() {
    $.ajax({
        type: "GET",
        url: "http://localhost/api_toko/Pelanggan/tampilKeranjangPenjualan",
        success: function (result) {
            let dt = "";
            let res = JSON.parse(result);
            // console.log(res);
            // return;
            let temp = ""

            res.forEach((customer) => {
                temp += `
                    <div class="block block-strong block-outline-ios">
                        <h2 class="col" style="font-weight: bold;">${customer.pelanggan_nama}</h2>
                        <div class="left">
                            <button class="button button-small button-tonal" onclick="bayarPenjualan(${customer.pelanggan_id}, '${customer.pelanggan_nama}')">Bayar</button>
                        </div>
                    </div>
                `;

                customer.data.forEach((detail) => {
                    temp += `
                        <div class="card">
                            <div class="card-content card-content-padding">
                                <input type="hidden" class="barang-id" value="${detail.barang_id}">
                                <p class="col font-17 teks-tengah" style="font-weight: bold;">${detail.barang_nama}</p>
                                <p class="col font-17">Stok: ${detail.barang_stok}</p>
                                <p class="col font-17" style="text-align: left; font-weight: bold;">Harga per item: Rp. ${detail.barang_harjul}</p>
                            </div>
                        </div>
                    `;
                });
            });

            $("#keranjangPenjualan").html(temp);
        },
    });
}

function bayarPenjualan(id, pelanggan_nama) {
    localStorage.setItem('namaPelangganKeranjang', pelanggan_nama)
    app.views.main.router.navigate(`/keranjang/detail-penjualan/${id}`);
}

function tampilBayarPenjualan(id) {
    $.ajax({
        url: "http://localhost/api_toko/Pelanggan/bayarKeranjang",
        method: "POST",
        data: {pelangganId: id},
        success: function (result) {
            let res = JSON.parse(result);
            console.log(res);
            // return;
            
            let temp = "";
            let total = 0;
            
            res.data.forEach((d) => {

                let subtotal = parseInt(d.barang_harjul) * parseInt(d.qty);
                total += subtotal;

                temp += `
                <div class="card">
                    <div class="card-content card-content-padding">
                        <p class="col font-17 teks-tengah" style="font-weight: bold;">${d.barang_nama}</p>
                        <p class="col font-17">Stok: ${d.barang_stok}</p>
                        <p class="col font-17" style="text-align: left; font-weight: bold;">Harga: Rp. ${d.barang_harjul}</p>
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
                        <p class="col font-17" style="text-align: left; font-weight: bold;">Subtotal: Rp. ${subtotal}</p>
                    </div>
                    <div class="card-footer">
                        <button class="button button-small button-tonal color-red" onclick="hapusKeranjangPenjualan(${d.id})">Hapus Barang</button>
                    </div>
                </div>
                `
            });

            let temp2 = `
                <h3 class="col font-17">Total Bayar : Rp. ${total}</h3>
                <button class="button button-large button-tonal" onclick="lanjutBayarPenjualan(${total})">Lanjut Ke Pembayaran</button>
            `

            $("#tampilBayarPenjualan").html(temp);
            $("#tampilTotalBayarPenjualan").html(temp2);
        },
    });
}

function btnqtyPenjualan (id, barang_id, qty, pelanggan_id, action) {
    // console.log(`${id} dan ${barang_id} dan ${qty} dan ${pelanggan_id}`)
    // return;
        // ajax
        // console.log(`${id} dan ${barang_id} dan ${qty} dan plus`)
        $.ajax({
            url: "http://localhost/api_toko/Pelanggan/editQty",
            method: "POST",
            data: {
                id: id,
                barang_id: barang_id,
                qty: qty,
                action: action
            },
            success: function(res) {
                tampilBayarPenjualan(pelanggan_id)
            },
            error: function() {
                app.dialog.alert("Tidak Terhubung dengan Server!","Error");
            }
        })

}

function hapusKeranjangPenjualan(id) {
    // console.log(id);
    $.ajax({
        url: "http://localhost/api_toko/Pelanggan/deleteKeranjang",
        method: "POST",
        data: {
            id: id
        },
        success: function(res) {
            // app.dialog.alert("Data Keranjang Berhasil Di Hapus","Success");
            let result = JSON.parse(res)

            console.log(result.keterangan)

            app.dialog.alert(result.keterangan, "Info");
            app.views.main.router.back();
        },
        error: function() {
            app.dialog.alert("Tidak Terhubung dengan Server!","Error");
        }
    })
}

function lanjutBayarPenjualan(total) {
    // console.log(total);
    
    localStorage.setItem("totalPenjualan", total);
    app.views.main.router.navigate("/bayarpenjualannew/");
}

function tampilKeranjangPembelian() {
    $.ajax({
        type: "GET",
        url: "http://localhost/api_toko/Supplier/tampilKeranjangPembelian",
        success: function (result) {
            let dt = "";
            let res = JSON.parse(result);
            // console.log(res.data)
            let temp = "";

            res.forEach((customer) => {
            
            temp += `
                <div class="block block-strong block-outline-ios">
                    <h2 class="col" style="font-weight: bold;">${customer.suplier_nama}</h2>
                    <div class="left">
                        <button class="button button-small button-tonal" onclick="bayarPembelian(${customer.suplier_id}, '${customer.suplier_nama}')">Bayar</button>
                    </div>
                </div>
            `;

            customer.data.forEach((detail) => {
            temp += `
                    <div class="card">
                        <div class="card-content card-content-padding">
                            <p class="col font-17 teks-tengah" style="font-weight: bold;">${detail.barang_nama}</p>
                            <p class="col font-17">Stok: ${detail.barang_stok}</p>
                            <p class="col font-17" style="text-align: left; font-weight: bold;">Harga per item: Rp. ${detail.barang_harjul}</p>
                        </div>
                    </div>
                `;
                });
            });

            $("#keranjangPembelian").html(temp);
        },
    });
}

function bayarPembelian(id, supplier_nama) {
    localStorage.setItem('namaSupplierKeranjang', supplier_nama)
    app.views.main.router.navigate(`/keranjang/detail-pembelian/${id}`);
}

function tampilBayarPembelian(id) {
    $.ajax({
        url: "http://localhost/api_toko/Supplier/bayarKeranjang",
        method: "POST",
        data: {supplierId: id},
        success: function (result) {
            let res = JSON.parse(result);
            console.log(res);
            // return;
            
            let temp = "";
            // let temp2 = "";
            let total = 0;
            
            res.data.forEach((d) => {

                let subtotal = parseInt(d.barang_harjul) * parseInt(d.qty);
                total += subtotal;

                temp += `
                <div class="card">
                    <div class="card-content card-content-padding">
                        <p class="col font-17 teks-tengah" style="font-weight: bold;">${d.barang_nama}</p>
                        <p class="col font-17">Stok: ${d.barang_stok}</p>
                        <p class="col font-17" style="text-align: left; font-weight: bold;">Harga: Rp. ${d.barang_harjul}</p>
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
                        <p class="col font-17" style="text-align: left; font-weight: bold;">Subtotal: Rp. ${subtotal}</p>
                    </div>
                    <div class="card-footer">
                        <button class="button button-small button-tonal color-red" onclick="hapusKeranjangPembelian(${d.id}, ${d.supplier_id})">Hapus Barang</button>
                    </div>
                </div>
                `
            });

            // temp += `<div class="card">
            //             <div class="card-content card-content-padding" id="tampilTotalBayarPembelian">
            //                 <h3 class="col font-17">Total Bayar : Rp. ${total}</h3>
            //                 <button class="button button-large button-tonal" onclick="lanjutBayarPembelian(${total})">Lanjut Ke Pembayaran</button>
            //             </div>
            //         </div>`;

            let temp2 = `
                <h3 class="col font-17">Total Bayar : Rp. ${total}</h3>
                <button class="button button-large button-tonal" onclick="lanjutBayarPembelian(${total})">Lanjut Ke Pembayaran</button>
            `

            $("#tampilBayarPembelian").html(temp);
            $("#tampilTotalBayarPembelian").html(temp2);
        },
    });
}

function btnqtyPembelian (id, barang_id, qty, supplier_id, action) {
    // console.log(`${id} dan ${barang_id} dan ${qty} dan ${supplier_id}`)
    // return;
        // ajax
        // console.log(`${id} dan ${barang_id} dan ${qty} dan plus`)
        $.ajax({
            url: "http://localhost/api_toko/Supplier/editQty",
            method: "POST",
            data: {
                id: id,
                barang_id: barang_id,
                qty: qty,
                action: action
            },
            success: function(res) {
                tampilBayarPembelian(supplier_id)
            },
            error: function() {
                app.dialog.alert("Tidak Terhubung dengan Server!","Error");
            }
        })

}

// function btnplus (id, barang_id, qty) {
//     console.log(`${id} dan ${barang_id} dan ${qty}`)
// }

function hapusKeranjangPembelian(id, supplier_id) {
    console.log(id);
    $.ajax({
        url: "http://localhost/api_toko/Supplier/deleteKeranjang",
        method: "POST",
        data: {
            id: id
        },
        success: function(res) {
            let result = JSON.parse(res)

            console.log(result.keterangan)

            app.dialog.alert(result.keterangan, "Info");
            // app.views.main.router.back();
            tampilBayarPembelian(supplier_id)
        },
        error: function() {
            app.dialog.alert("Tidak Terhubung dengan Server!","Error");
        }
    })
}

function lanjutBayarPembelian(total) {
    // console.log(total);
    
    localStorage.setItem("totalPembelian", total);
    app.views.main.router.navigate("/bayarpembelian/");
}
