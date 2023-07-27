
var signUpName = document.getElementById('signUpName')
var signUpEmail = document.getElementById('signUpEmail')
var signUpPassword = document.getElementById('signUpPassword')
var signInEmail = document.getElementById('signInEmail')
var signInPassword = document.getElementById('signInPassword')
var path = location.pathname.split('/');
var baseURL = ''

for (var i = 0; i < path.length - 1; i++) {
    baseURL += '/' + path[i]
}

var username = localStorage.getItem('sessionUsername')
if (username) {
    document.getElementById('username').innerHTML = "Welcome " + username
}

var signUpArray = []
if (localStorage.getItem('users') == null) {
    signUpArray = []
} else {
    signUpArray = JSON.parse(localStorage.getItem('users'))
}

function isEmpty() {
    if (signUpName.value == "" || signUpEmail.value == "" || signUpPassword.value == "") {
        return false
    } else {
        return true
    }
}

function isEmailExist() {
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == signUpEmail.value.toLowerCase()) {
            return false
        }
    }
}

function signUp() {
    if (isEmpty() == false) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }
    var signUp = {
        name: signUpName.value,
        email: signUpEmail.value,
        password: signUpPassword.value,
    }
    if (signUpArray.length == 0) {
        signUpArray.push(signUp)
        localStorage.setItem('users', JSON.stringify(signUpArray))
        document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'
        return true
    }
    if (isEmailExist() == false) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">email already exists</span>'
    } else {
        signUpArray.push(signUp)
        localStorage.setItem('users', JSON.stringify(signUpArray))
        document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>'
    }
}

function isLoginEmpty() {
    if (signInPassword.value == "" || signInEmail.value == "") {
        return false
    } else {
        return true
    }
}

function login() {
    if (isLoginEmpty() == false) {
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All inputs is required</span>'
        return false
    }
    var password = signInPassword.value
    var email = signInEmail.value
    for (var i = 0; i < signUpArray.length; i++) {
        if (signUpArray[i].email.toLowerCase() == email.toLowerCase() && signUpArray[i].password.toLowerCase() == password.toLowerCase()) {
            localStorage.setItem('sessionUsername', signUpArray[i].name)
            if (baseURL == '/') {
                location.replace('https://' + location.hostname + '/index.html')
            } else {
                location.replace(baseURL + '/index.html')
            }
        } else {
            document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">incorrect email or password</span>'
        }
    }
}

function logout() {
    localStorage.removeItem('sessionUsername')
}