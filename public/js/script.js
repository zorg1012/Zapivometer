function create(tag) {
    return document.createElement(tag)
}
let input = create('input')
input.placeholder = "people amount"
input.style.color = "black"
input.style.borderColor = "black"
input.style.display = "block"
let input2 = create('input')
input2.style.color = "black"
input2.style.borderColor = "black"
input2.placeholder = "time spent (hours)"
input2.style.display = "block"
let input3 = create('input')
input3.style.color = "black"
input3.style.borderColor = "black"
input3.placeholder = `air temperature °C`
input3.style.display = "block"
let checkbox = create('input')
checkbox.type = "checkbox"
checkbox.id = "checkboxid"
let label = create('label')
label.htmlFor = "checkboxid"
label.appendChild(document.createTextNode("Outdoor Activities / Exercises"))
let input4 = create('input')
input4.style.color = "black"
input4.style.borderColor = "black"
input4.placeholder = "alcoholic drinks(litre)"
let input5 = create('input')
input5.style.color = "black"
input5.style.borderColor = "black"
input5.placeholder = "alc concentration"
let div1 = create('div')
div1.style.display = "block"
let div2 = create('div')
div2.style.display = "block"
let select = create('select')
let button = create('button')
button.style.display = "block"
button.innerText = 'count'
document.body.appendChild(input)
document.body.appendChild(input2)
document.body.appendChild(input3)
document.body.appendChild(div1)
document.body.appendChild(div2)
div1.appendChild(checkbox)
div1.appendChild(label)
div2.appendChild(input4)
div2.appendChild(input5)
document.body.appendChild(button)

button.onclick = async () => {
    let amount = input.value
    let time = input2.value
    let temp = input3.value
    let buhl = input4.value
    let alc = input5.value

    if (!isNaN(amount) && !isNaN(time) && !isNaN(temp) && !isNaN(buhl) && !isNaN(alc)) {
        let tempcoef = Math.max(0.05 * temp, 0.8)
        let sportcoef = 1
        if (checkbox.checked) { sportcoef = 1.5 }
        let wat = (buhl - (0.01 * alc * buhl))
        let alcoef = (((0.01 * alc) * buhl * 5) - wat) * 1000
        if (alc < 15) { alcoef = 0 }
        let res = (Math.round(2 * ((140 * amount * time * tempcoef * sportcoef) + alcoef) / 1000)) / 2 + " drinking water"

        alert(res)
    } else if (isNaN(temp)) {
        input3.style.color = "red"
        input3.style.borderColor = "red"
    } else if (isNaN(time)) {
        input2.style.color = "red"
        input2.style.borderColor = "red"
    } else if (isNaN(amount)) {
        input.style.color = "red"
        input.style.borderColor = "red"
    } else if (isNaN(buhl)) {
        input4.style.color = "red"
        input4.style.borderColor = "red"
    } else if (isNaN(alc)) {
        input5.style.color = "red"
        input5.style.borderColor = "red"
    }
}
[...document.getElementsByTagName('input')].forEach((input) => input.onclick = () => {
    input.style.color = "black"
    input.style.borderColor = "black"
})
document.getElementById("register-submit").onclick = async (e) => {
    e.preventDefault()

    let pass = document.getElementById("password").value
    let confpass = document.getElementById("confirm-password").value
    let usrn = document.getElementById("username").value
    let email = document.getElementById("email").value

    let testmail = await fetch(`http://localhost:3000/users?email_like=${email}`, {
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json())
    let testname = await fetch(`http://localhost:3000/users?usrn_like=${usrn}`, {
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(res => res.json())
    if (pass !== confpass) {
        document.getElementById("password").value = "passwords don't match!"
        document.getElementById("confirm-password") = "passwords don't match"
        document.getElementById("confirm-password").style.color = "red"
        document.getElementById("password").style.color = "red"
    }
    document.getElementById("confirm-password").style.bordercolor = "red"
    document.getElementById("password").style.bordercolor = "red"
if (pass.lenght === 0) { document.getElementById("password").style.color = "red" }
if (confpass.lenght === 0) { document.getElementById("confirm-password").style.color = "red" }
if (testname.length === 0 && testmail.length === 0 && pass === confpass && pass.lenght !== 0 && email.lenght !== 0 && usrn.lenght !== 0) {
    let obj = { usrn, email, pass }
    let json = JSON.stringify(obj)
    console.log(json)
    let res = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: json
    })
} else if (testmail.length > 0) {
    document.getElementById("email").value = "it is used alredy"
    document.getElementById("email").style.color = "red"
    document.getElementById("email").style.bordercolor = "red"
} else if (testname.length > 0) {
    document.getElementById("username").value = "it is used alredy"
    document.getElementById("username").style.color = "red"
    document.getElementById("username").style.bordercolor = "red"
}}


document.getElementById("login-submit").onclick = async (e) => {
    e.preventDefault()
    let passl = document.getElementById("passwordl").value
    let usrnl = document.getElementById("usernamel").value
    if (passl.lenght === 0) {
        document.getElementById("passwordl").style.color = "red"
        document.getElementById("passwordl").style.bordercolor = "red"
    }
    if (usrnl.lenght === 0) {
        document.getElementById("usernamel").style.color = "red"
        document.getElementById("usernamel").style.bordercolor = "red"
    }
    if (usrnl.lenght !== 0 && passl.lenght === 0) {
        let userlog = await fetch(`http://localhost:3000/users?usrn_like=${usrnl}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        let userpass = await fetch(`http://localhost:3000/users?pass_like=${passl}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        console.log(userpass)
        console.log(userlog)
    }
}