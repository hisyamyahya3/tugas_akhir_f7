function openSettings() {
    app.views.main.router.navigate('/pengaturan/')
}

function screenorientation() {
    screen.orientation.unlock();
    app.dialog.alert("Rotasi Berhasil Dibuka","Success");
}

function lockscreenorientation() {
    screen.orientation.lock('portrait')
    app.dialog.alert("Rotasi Berhasil Dikunci","Success");
}

$(window).resize(function() {
    //resize just happened, pixels changed
    console.log("screen is been resize")
});
 