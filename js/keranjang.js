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
                        <button class="button button-small button-tonal" onclick="bayarPenjualan(${customer.pelanggan_id})">Bayar</button>
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
                            <div class="stepper stepper-small stepper-round stepper-init" data-wraps="true" data-autorepeat="true" data-autorepeat-dynamic="true" data-decimal-point="2" data-manual-input-mode="true">
                                <div class="stepper-button-minus"></div>
                                <div class="stepper-input-wrap">
                                    <input type="text" class="qty" value="1" min="1" max="100" step="1" />
                                </div>
                                <div class="stepper-button-plus"></div>
                            </div>
                        </div>
                    </div>
                `;
            });
        });

        $("#keranjangPenjualan").html(temp);
    },
    });
}

function bayarPenjualan(id) {
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
                    <button class="button button-small button-tonal">Bayar</button>
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
                        <div class="stepper stepper-small stepper-round stepper-init" data-wraps="true" data-autorepeat="true" data-autorepeat-dynamic="true" data-decimal-point="2" data-manual-input-mode="true">
                            <div class="stepper-button-minus"></div>
                            <div class="stepper-input-wrap">
                                <input type="text" value="1" min="1" max="100" step="1" />
                            </div>
                            <div class="stepper-button-plus"></div>
                        </div>
                    </div>
                </div>
            `;
            });
        });

        $("#keranjangPembelian").html(temp);
    },
    });
}


