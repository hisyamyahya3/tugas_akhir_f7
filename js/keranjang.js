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
            
            res.data.forEach((d) => {
                temp += `
                <div class="card">
                    <div class="card-content card-content-padding">
                        <p class="col font-17 teks-tengah" style="font-weight: bold;">${d.barang_nama}</p>
                        <p class="col font-17">Stok: ${d.barang_stok}</p>
                        <p class="col font-17" style="text-align: left; font-weight: bold;">Harga: Rp. ${d.barang_harjul}</p>
                        <div class="list list-strong-ios list-dividers-ios inset-ios">
                            <ul>
                                <li class="item-content item-input">
                                    <div class="item-inner">
                                        <div class="item-input-wrap">
                                            <input name="qty_perbarang" type="number" id="qty_perbarang" value="1" placeholder="Qty:"/>
                                            <span class="input-clear-button"></span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="card-footer">
                        <button class="button button-small button-tonal color-red" onclick="hapusKeranjangPenjualan(${d.barang_id})">Hapus Barang</button>
                    </div>
                </div>
                `
            });

            $("#tampilBayarPenjualan").html(temp);
        },
    });
}

function hapusKeranjangPenjualan(id) {
    console.log(id);
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
            
            res.data.forEach((d) => {
                temp += `
                <div class="card">
                    <div class="card-content card-content-padding">
                        <p class="col font-17 teks-tengah" style="font-weight: bold;">${d.barang_nama}</p>
                        <p class="col font-17">Stok: ${d.barang_stok}</p>
                        <p class="col font-17" style="text-align: left; font-weight: bold;">Harga: Rp. ${d.barang_harjul}</p>
                        <div class="list list-strong-ios list-dividers-ios inset-ios">
                            <ul>
                                <li class="item-content item-input">
                                    <div class="item-inner">
                                        <div class="item-input-wrap">
                                            <input name="qty_perbarang" type="number" id="qty_perbarang" value="1" placeholder="Qty:"/>
                                            <span class="input-clear-button"></span>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="card-footer">
                        <button class="button button-small button-tonal color-red" onclick="hapusKeranjangPenjualan(${d.barang_id})">Hapus Barang</button>
                    </div>
                </div>
                `
            });

            $("#tampilBayarPembelian").html(temp);
        },
    });
}

