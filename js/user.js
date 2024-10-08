async function register() {
    let name = $('.regis-name').val()
    let email = $('.regis-email').val()
    let password = $('.regis-password').val()

    $.ajax({
        url: "http://localhost/api_toko/User/register",
        method: "POST",
        data: {
            name: name,
            email: email,
            password: password
        },
        success: function (result) {
            let res = JSON.parse(result)
            let message = res.message

            app.dialog.alert(message, "Info")
            app.views.main.router.navigate("/login/")
        },
        error: function () {
            app.dialog.alert("Tidak Terhubung dengan Server!", "Error")
        }
    })
}

let attempts = 0
const maxAttempts = 5

async function login() {
    let email = $('.login-email').val()
    let password = $('.login-password').val()

    if (attempts >= maxAttempts) {
        const message = 'Telah melewati batas percobaan. Silahkan tunggu beberapa saat!'
        app.dialog.alert(message, "Info")

        setTimeout(() => {
            attempts = 0
        }, 10000) // 10 seconds

        return
    }

    $.ajax({
        url: "http://localhost/api_toko/User/login",
        method: "POST",
        data: {
            email: email,
            password: password
        },
        success: function (result) {
            let res = JSON.parse(result)
            let message = ""

            if (res.status == 'ok') {
                attempts = 0
                message = res.message
                const userID = res.data.id_users

                localStorage.setItem("userID", userID);
                localStorage.setItem("isLogin", true)
                localStorage.setItem("username", res.data.full_name)
                app.views.main.router.navigate("/")
            } else {
                attempts++
                message = res.message
                app.dialog.alert(message, "Info")
            }
        },
        error: function () {
            app.dialog.alert("Tidak Terhubung dengan Server!", "Error")
        }
    })
}

async function logout() {
    app.dialog.confirm('Apakah Anda Yakin Ingin Keluar?','Info', function () {
        const isLogin = localStorage.getItem('isLogin')
    
        if (isLogin) {
            localStorage.removeItem('username')
            localStorage.removeItem('isLogin')
            app.views.main.router.navigate('/frontpage/')
        }   
    })
}

// function masuk () {
//     app.views.main.router.navigate("/login/")
// }

// function daftar () {
//     app.views.main.router.navigate("/regis/")
// }