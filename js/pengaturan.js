function screenorientation() {
    screen.orientation.unlock();
    app.dialog.alert("Rotasi Berhasil Dibuka","Success");
}

function lockscreenorientation() {
    screen.orientation.lock('portrait')
    app.dialog.alert("Rotasi Berhasil Dikunci","Success");
}