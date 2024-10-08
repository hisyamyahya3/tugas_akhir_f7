var routes = [
  {path: '/login/', componentUrl: 'pages/login.html'},
  {path: '/frontpage/', componentUrl: 'pages/frontpage.html'},
  {path: '/regis/', componentUrl: 'pages/regis.html'},
  {path: '/', componentUrl: 'pages/home.html'},
  {path: '/plgn/', componentUrl: 'pages/plgn.html'},
  {path: '/addplgn/', componentUrl: 'pages/tambah-plgn.html'},
  {path: '/editplgn/', componentUrl: 'pages/kelola-plgn.html'},
  {path: '/supplier/', componentUrl: 'pages/supplier.html'},
  {path: '/editsupplier/', componentUrl: 'pages/kelola-supplier.html'},
  {path: '/addsupplier/', componentUrl: 'pages/tambah-supplier.html'},
  {path: '/brg/', componentUrl: 'pages/brg.html'},
  {path: '/addbrg/', componentUrl: 'pages/tambah-brg.html'},
  {path: '/editbrg/', componentUrl: 'pages/kelola-brg.html'},
  {path: '/piutang/', componentUrl: 'pages/piutang.html'},
  {path: '/kelola-piutang/', componentUrl: 'pages/kelola-piutang.html'},
  {path: '/piutang/detail/:id', componentUrl: 'pages/detail-piutang.html'},
  {path: '/utang/', componentUrl: 'pages/utang.html'},
  {path: '/kelola-utang/', componentUrl: 'pages/kelola-utang.html'},
  {path: '/utang/detail/:id', componentUrl: 'pages/detail-utang.html'},
  // {path: '/addutang/', componentUrl: 'pages/tambah-utang.html'},
  // {path: '/addpiutang/', componentUrl: 'pages/tambah-piutang.html'},
  {path: '/pbyr/', componentUrl: 'pages/pembayaran.html'},
  {path: '/addpbyr/', componentUrl: 'pages/tambah-pbyr.html'},
  {path: '/rwytpbyr/', componentUrl: 'pages/riwayat-pembayaran.html'},
  {path: '/scanbrg/', componentUrl: 'pages/scanbrg.html'},
  // {path: '/penjualan/', componentUrl: 'pages/penjualan.html'},
  {path: '/penjualannew/', componentUrl: 'pages/penjualan-new.html'},
  // {path: '/pembelian/', componentUrl: 'pages/pembelian.html'},
  {path: '/pembeliannew/', componentUrl: 'pages/pembelian-new.html'},
  {path: '/barangmsk/', componentUrl: 'pages/barang-masuk.html'},
  {path: '/laporan/', componentUrl: 'pages/laporan.html'},
  {path: '/pengeluaran/', componentUrl: 'pages/pengeluaran.html'},
  {path: '/kategori/', componentUrl: 'pages/kategori.html'},
  {path: '/addktgr/', componentUrl: 'pages/tambah-ktgr.html'},
  {path: '/editktgr/', componentUrl: 'pages/kelola-ktgr.html'},
  {path: '/tema/', componentUrl: 'pages/color-themes.html'},
  {path: '/pembelian/', componentUrl: 'pages/pembelian.html'},
  {path: '/checkout/', componentUrl: 'pages/checkout.html'},
  {path: '/penjualan/', componentUrl: 'pages/penjualan.html'},
  // {path: '/bayarpenjualan/', componentUrl: 'pages/bayar-penjualan.html'},
  {path: '/bayarpenjualannew/', componentUrl: 'pages/bayar-penjualannew.html'},
  {path: '/bayarpembelian/', componentUrl: 'pages/bayar-pembelian.html'},
  {path: '/bayar-utang-piutang/:action', componentUrl: 'pages/pembayaran-utang-piutang.html'},
  {path: '/pengeluaran/', componentUrl: 'pages/pengeluaran.html'},
  {path: '/addpengeluaran/', componentUrl: 'pages/tambah-pengeluaran.html'},
  {path: '/pengaturan/', componentUrl: 'pages/pengaturan.html'},
  {path: '/brg-penjualan/', componentUrl: 'pages/barang-penjualan.html'},
  {path: '/brg-pembelian/', componentUrl: 'pages/barang-pembelian.html'},
  {path: '/keranjang/', componentUrl: 'pages/keranjang.html'},
  {path: '/keranjang/detail-penjualan/:id', componentUrl: 'pages/detail-penjualan.html'},
  {path: '/keranjang/detail-pembelian/:id', componentUrl: 'pages/detail-pembelian.html'},
  {path: '/sts-pembayaran/:nopembayaran', componentUrl: 'pages/status-pembayaran.html'},
  {path: '/laporan-penjualan/', componentUrl: 'pages/laporan-penjualan.html'},
  {path: '/laporan-pembelian/', componentUrl: 'pages/laporan-pembelian.html'},
  {path: '/riwayat/', componentUrl: 'pages/riwayat.html'},
  {path: '/satuan/', componentUrl: 'pages/satuan.html'},
  {path: '/addsatuan/', componentUrl: 'pages/tambah-satuan.html'},
  {path: '/editsatuan/', componentUrl: 'pages/kelola-satuan.html'},
  {path: '(.*)', url: 'pages/404.html'},
];
// var routes = [
//   // Index page
//   {
//     path: '/',
//     componentUrl: './pages/home.html',
//     name: 'home',
//   },
//   // About page
//   {
//     path: '/about/',
//     url: './pages/about.html',
//     name: 'about',
//   },
//   // Right Panel pages
//   {
//     path: '/panel-right-1/',
//     content: `
//       <div class="page">
//         <div class="navbar">
//           <div class="navbar-bg"></div>
//           <div class="navbar-inner sliding">
//             <div class="left">
//               <a  class="link back">
//                 <i class="icon icon-back"></i>
//                 <span class="if-not-md">Back</span>
//               </a>
//             </div>
//             <div class="title">Panel Page 1</div>
//           </div>
//         </div>
//         <div class="page-content">
//           <div class="block">
//             <p>This is a right panel page 1</p>
//             <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo saepe aspernatur inventore dolorum voluptates consequatur tempore ipsum! Quia, incidunt, aliquam sit veritatis nisi aliquid porro similique ipsa mollitia eaque ex!</p>
//           </div>
//         </div>
//       </div>
//     `,
//   },
//   {
//     path: '/panel-right-2/',
//     content: `
//       <div class="page">
//         <div class="navbar">
//           <div class="navbar-bg"></div>
//           <div class="navbar-inner sliding">
//             <div class="left">
//               <a  class="link back">
//                 <i class="icon icon-back"></i>
//                 <span class="if-not-md">Back</span>
//               </a>
//             </div>
//             <div class="title">Panel Page 2</div>
//           </div>
//         </div>
//         <div class="page-content">
//           <div class="block">
//             <p>This is a right panel page 2</p>
//             <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo saepe aspernatur inventore dolorum voluptates consequatur tempore ipsum! Quia, incidunt, aliquam sit veritatis nisi aliquid porro similique ipsa mollitia eaque ex!</p>
//           </div>
//         </div>
//       </div>
//     `,
//   },

//   // Components
//   {
//     path: '/accordion/',
//     url: './pages/accordion.html',
//   },
//   {
//     path: '/action-sheet/',
//     componentUrl: './pages/action-sheet.html',
//   },
//   {
//     path: '/area-chart/',
//     componentUrl: './pages/area-chart.html',
//   },
//   {
//     path: '/autocomplete/',
//     componentUrl: './pages/autocomplete.html',
//   },
//   {
//     path: '/badge/',
//     url: './pages/badge.html',
//   },
//   {
//     path: '/breadcrumbs/',
//     componentUrl: './pages/breadcrumbs.html',
//   },
//   {
//     path: '/buttons/',
//     componentUrl: './pages/buttons.html',
//   },
//   {
//     path: '/calendar/',
//     componentUrl: './pages/calendar.html',
//   },
//   {
//     path: '/calendar-page/',
//     componentUrl: './pages/calendar-page.html',
//   },
//   {
//     path: '/cards/',
//     url: './pages/cards.html',
//   },
//   {
//     path: '/cards-expandable/',
//     url: './pages/cards-expandable.html',
//   },
//   {
//     path: '/checkbox/',
//     componentUrl: './pages/checkbox.html',
//   },
//   {
//     path: '/chips/',
//     componentUrl: './pages/chips.html',
//   },
//   {
//     path: '/color-picker/',
//     componentUrl: './pages/color-picker.html',
//   },
//   {
//     path: '/contacts-list/',
//     url: './pages/contacts-list.html',
//   },
//   {
//     path: '/content-block/',
//     url: './pages/content-block.html',
//   },
//   {
//     path: '/data-table/',
//     componentUrl: './pages/data-table.html',
//   },
//   {
//     path: '/dialog/',
//     componentUrl: './pages/dialog.html',
//   },
//   {
//     path: '/fab/',
//     url: './pages/fab.html',
//   },
//   {
//     path: '/fab-morph/',
//     url: './pages/fab-morph.html',
//   },
//   {
//     path: '/form-storage/',
//     url: './pages/form-storage.html',
//   },
//   {
//     path: '/gauge/',
//     componentUrl: './pages/gauge.html',
//   },
//   {
//     path: '/grid/',
//     url: './pages/grid.html',
//   },
//   {
//     path: '/icons/',
//     componentUrl: './pages/icons.html',
//   },
//   {
//     path: '/infinite-scroll/',
//     componentUrl: './pages/infinite-scroll.html',
//   },
//   {
//     path: '/inputs/',
//     url: './pages/inputs.html',
//   },
//   {
//     path: '/list/',
//     url: './pages/list.html',
//   },
//   {
//     path: '/list-button/',
//     componentUrl: './pages/list-button.html',
//   },
//   {
//     path: '/list-index/',
//     componentUrl: './pages/list-index.html',
//   },
//   {
//     path: '/login-screen/',
//     componentUrl: './pages/login-screen.html',
//   },
//   {
//     path: '/login-screen-page/',
//     componentUrl: './pages/login-screen-page.html',
//   },
//   {
//     path: '/menu-list/',
//     componentUrl: './pages/menu-list.html',
//   },
//   {
//     path: '/messages/',
//     componentUrl: './pages/messages.html',
//   },
//   {
//     path: '/navbar/',
//     url: './pages/navbar.html',
//   },
//   {
//     path: '/navbar-hide-scroll/',
//     url: './pages/navbar-hide-scroll.html',
//   },
//   {
//     path: '/notifications/',
//     componentUrl: './pages/notifications.html',
//   },
//   {
//     path: '/panel/',
//     url: './pages/panel.html',
//   },
//   {
//     path: '/photo-browser/',
//     componentUrl: './pages/photo-browser.html',
//   },
//   {
//     path: '/picker/',
//     componentUrl: './pages/picker.html',
//   },
//   {
//     path: '/pie-chart/',
//     componentUrl: './pages/pie-chart.html',
//   },
//   {
//     path: '/popup/',
//     componentUrl: './pages/popup.html',
//   },
//   {
//     path: '/popover/',
//     url: './pages/popover.html',
//   },
//   {
//     path: '/preloader/',
//     componentUrl: './pages/preloader.html',
//   },
//   {
//     path: '/progressbar/',
//     componentUrl: './pages/progressbar.html',
//   },
//   {
//     path: '/pull-to-refresh/',
//     componentUrl: './pages/pull-to-refresh.html',
//   },
//   {
//     path: '/radio/',
//     url: './pages/radio.html',
//   },
//   {
//     path: '/range/',
//     componentUrl: './pages/range.html',
//   },
//   {
//     path: '/searchbar/',
//     url: './pages/searchbar.html',
//   },
//   {
//     path: '/searchbar-expandable/',
//     url: './pages/searchbar-expandable.html',
//   },
//   {
//     path: '/segmented/',
//     componentUrl: './pages/segmented.html',
//   },
//   {
//     path: '/sheet-modal/',
//     componentUrl: './pages/sheet-modal.html',
//   },
//   {
//     path: '/skeleton/',
//     componentUrl: './pages/skeleton.html',
//   },
//   {
//     path: '/smart-select/',
//     url: './pages/smart-select.html',
//   },
//   {
//     path: '/sortable/',
//     url: './pages/sortable.html',
//   },
//   {
//     path: '/stepper/',
//     componentUrl: './pages/stepper.html',
//   },
//   {
//     path: '/subnavbar/',
//     url: './pages/subnavbar.html',
//   },
//   {
//     path: '/subnavbar-title/',
//     url: './pages/subnavbar-title.html',
//   },
//   {
//     path: '/swiper/',
//     url: './pages/swiper.html',
//     routes: [
//       {
//         path: 'swiper-horizontal/',
//         url: './pages/swiper-horizontal.html',
//       },
//       {
//         path: 'swiper-vertical/',
//         url: './pages/swiper-vertical.html',
//       },
//       {
//         path: 'swiper-space-between/',
//         url: './pages/swiper-space-between.html',
//       },
//       {
//         path: 'swiper-multiple/',
//         url: './pages/swiper-multiple.html',
//       },
//       {
//         path: 'swiper-nested/',
//         url: './pages/swiper-nested.html',
//       },
//       {
//         path: 'swiper-loop/',
//         url: './pages/swiper-loop.html',
//       },
//       {
//         path: 'swiper-3d-cube/',
//         url: './pages/swiper-3d-cube.html',
//       },
//       {
//         path: 'swiper-3d-coverflow/',
//         url: './pages/swiper-3d-coverflow.html',
//       },
//       {
//         path: 'swiper-3d-flip/',
//         url: './pages/swiper-3d-flip.html',
//       },
//       {
//         path: 'swiper-fade/',
//         url: './pages/swiper-fade.html',
//       },
//       {
//         path: 'swiper-scrollbar/',
//         url: './pages/swiper-scrollbar.html',
//       },
//       {
//         path: 'swiper-gallery/',
//         componentUrl: './pages/swiper-gallery.html',
//       },
//       {
//         path: 'swiper-parallax/',
//         url: './pages/swiper-parallax.html',
//       },
//       {
//         path: 'swiper-lazy/',
//         url: './pages/swiper-lazy.html',
//       },
//       {
//         path: 'swiper-pagination-progress/',
//         url: './pages/swiper-pagination-progress.html',
//       },
//       {
//         path: 'swiper-pagination-fraction/',
//         url: './pages/swiper-pagination-fraction.html',
//       },
//       {
//         path: 'swiper-zoom/',
//         url: './pages/swiper-zoom.html',
//       },
//     ],
//   },
//   {
//     path: '/swipeout/',
//     componentUrl: './pages/swipeout.html',
//   },
//   {
//     path: '/tabs/',
//     url: './pages/tabs.html',
//   },
//   {
//     path: '/tabs-static/',
//     url: './pages/tabs-static.html',
//   },
//   {
//     path: '/tabs-animated/',
//     url: './pages/tabs-animated.html',
//   },
//   {
//     path: '/tabs-swipeable/',
//     url: './pages/tabs-swipeable.html',
//   },
//   {
//     path: '/tabs-routable/',
//     url: './pages/tabs-routable.html',
//     tabs: [
//       {
//         path: '/',
//         id: 'tab1',
//         content: `
//         <div class="block">
//           <p>Tab 1 content</p>
//           <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim quia molestiae facilis laudantium voluptates obcaecati officia cum, sit libero commodi. Ratione illo suscipit temporibus sequi iure ad laboriosam accusamus?</p>
//           <p>Saepe explicabo voluptas ducimus provident, doloremque quo totam molestias! Suscipit blanditiis eaque exercitationem praesentium reprehenderit, fuga accusamus possimus sed, sint facilis ratione quod, qui dignissimos voluptas! Aliquam rerum consequuntur deleniti.</p>
//           <p>Totam reprehenderit amet commodi ipsum nam provident doloremque possimus odio itaque, est animi culpa modi consequatur reiciendis corporis libero laudantium sed eveniet unde delectus a maiores nihil dolores? Natus, perferendis.</p>
//         </div>
//         `,
//       },
//       {
//         path: '/tab2/',
//         id: 'tab2',
//         content: `
//         <div class="block">
//           <p>Tab 2 content</p>
//           <p>Suscipit, facere quasi atque totam. Repudiandae facilis at optio atque, rem nam, natus ratione cum enim voluptatem suscipit veniam! Repellat, est debitis. Modi nam mollitia explicabo, unde aliquid impedit! Adipisci!</p>
//           <p>Deserunt adipisci tempora asperiores, quo, nisi ex delectus vitae consectetur iste fugiat iusto dolorem autem. Itaque, ipsa voluptas, a assumenda rem, dolorum porro accusantium, officiis veniam nostrum cum cumque impedit.</p>
//           <p>Laborum illum ipsa voluptatibus possimus nesciunt ex consequatur rem, natus ad praesentium rerum libero consectetur temporibus cupiditate atque aspernatur, eaque provident eligendi quaerat ea soluta doloremque. Iure fugit, minima facere.</p>
//         </div>
//         `,
//       },
//       {
//         path: '/tab3/',
//         id: 'tab3',
//         content: `
//         <div class="block">
//           <p>Tab 3 content</p>
//           <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam enim quia molestiae facilis laudantium voluptates obcaecati officia cum, sit libero commodi. Ratione illo suscipit temporibus sequi iure ad laboriosam accusamus?</p>
//           <p>Deserunt adipisci tempora asperiores, quo, nisi ex delectus vitae consectetur iste fugiat iusto dolorem autem. Itaque, ipsa voluptas, a assumenda rem, dolorum porro accusantium, officiis veniam nostrum cum cumque impedit.</p>
//           <p>Laborum illum ipsa voluptatibus possimus nesciunt ex consequatur rem, natus ad praesentium rerum libero consectetur temporibus cupiditate atque aspernatur, eaque provident eligendi quaerat ea soluta doloremque. Iure fugit, minima facere.</p>
//         </div>
//         `,
//       },
//     ],
//   },
//   {
//     path: '/text-editor/',
//     componentUrl: './pages/text-editor.html',
//   },
//   {
//     path: '/toast/',
//     componentUrl: './pages/toast.html',
//   },
//   {
//     path: '/toggle/',
//     url: './pages/toggle.html',
//   },
//   {
//     path: '/toolbar-tabbar/',
//     componentUrl: './pages/toolbar-tabbar.html',
//     routes: [
//       {
//         path: 'tabbar/',
//         componentUrl: './pages/tabbar.html',
//       },
//       {
//         path: 'tabbar-icons/',
//         componentUrl: './pages/tabbar-icons.html',
//       },
//       {
//         path: 'tabbar-scrollable/',
//         componentUrl: './pages/tabbar-scrollable.html',
//       },
//       {
//         path: 'toolbar-hide-scroll/',
//         url: './pages/toolbar-hide-scroll.html',
//       },
//     ],
//   },
//   {
//     path: '/tooltip/',
//     componentUrl: './pages/tooltip.html',
//   },
//   {
//     path: '/treeview/',
//     componentUrl: './pages/treeview.html',
//   },
//   {
//     path: '/timeline/',
//     url: './pages/timeline.html',
//   },
//   {
//     path: '/timeline-vertical/',
//     url: './pages/timeline-vertical.html',
//   },
//   {
//     path: '/timeline-horizontal/',
//     url: './pages/timeline-horizontal.html',
//   },
//   {
//     path: '/timeline-horizontal-calendar/',
//     url: './pages/timeline-horizontal-calendar.html',
//   },
//   {
//     path: '/virtual-list/',
//     componentUrl: './pages/virtual-list.html',
//   },
//   {
//     path: '/virtual-list-vdom/',
//     componentUrl: './pages/virtual-list-vdom.html',
//   },
//   {
//     path: '/vi/',
//     componentUrl: './pages/vi.html',
//   },

//   // Color Themes
//   {
//     path: '/color-themes/',
//     componentUrl: './pages/color-themes.html',
//   },

//   // Effects
//   {
//     path: '/page-transitions/',
//     componentUrl: './pages/page-transitions.html',
//   },
//   {
//     path: '/page-transitions/:effect',
//     componentUrl: './pages/page-transitions-effect.html',
//   },

//   // Page Loaders
//   {
//     path: '/page-loader-component/:user/:userId/:posts/:postId/',
//     componentUrl: './pages/page-loader-component.html',
//   },
//   {
//     path: '/master-detail/',
//     url: './pages/master-detail-master.html',
//     master: true,
//     detailRoutes: [
//       {
//         path: '/master-detail/:id/',
//         componentUrl: './pages/master-detail-detail.html',
//       },
//     ],
//   },

//   // Default route (404 page). MUST BE THE LAST
//   {
//     path: '(.*)',
//     url: './pages/404.html',
//   },
// ];
