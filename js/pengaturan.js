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

function checkScreenSize () {
    window.plugins.screensize.get(successCallback, errorCallback);
  }
  
  function successCallback(result) {
    console.log(result);
    // let res = JSON.parse(result);
  
    app.dialog.alert(result.width, "Info");
  }
  
  function errorCallback() {
    app.dialog.alert("Tidak Terhubung","error");
  }