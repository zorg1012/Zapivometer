
        function readCookie(nme) {
            let name_cook = nme + "="
            let spl = document.cookie.split(";")
            for (let i = 0; i < spl.length; i++) {
                let c = spl[i]
                while (c.charAt(0) == " ") {
                    c = c.substring(1, c.length)
                }
                if (c.indexOf(name_cook) == 0) {
                    return c.substring(name_cook.length, c.length)
                }
            }
            return null
        }


        function create(tag) {
            return document.createElement(tag)
        }
        let input = create('input')
        input.placeholder = "people amount"
        input.style.color = "black"
        input.style.borderColor = "black"
        input.style.display = "block"
        input.className = "form-control"
        input.setAttribute("type", "number")
        input.setAttribute("onkeydown", 'return event.keyCode !== 69')
        input.style.marginTop = "10px"
        let input2 = create('input')
        input2.style.color = "black"
        input2.style.borderColor = "black"
        input2.placeholder = "time spent (hours)"
        input2.style.display = "block"
        input2.className = "form-control"
        input2.setAttribute("type", "number")
        input2.setAttribute("onkeydown", 'return event.keyCode !== 69')
        input2.style.marginTop = "10px"
        let input3 = create('input')
        input3.style.color = "black"
        input3.style.borderColor = "black"
        input3.placeholder = `air temperature °C`
        input3.style.display = "block"
        input3.className = "form-control"
        input3.setAttribute("type", "number")
        input3.setAttribute("onkeydown", 'return event.keyCode !== 69')
        input3.style.marginTop = "10px"
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
        input4.className = "form-control"
        input4.setAttribute("type", "number")
        input4.setAttribute("onkeydown", 'return event.keyCode !== 69')
        let input5 = create('input')
        input5.style.color = "black"
        input5.style.borderColor = "black"
        input5.placeholder = "alc concentration"
        input5.className = "form-control"
        input5.setAttribute("type", "number")
        input5.setAttribute("onkeydown", 'return event.keyCode !== 69')
        let div1 = create('div')
        div1.style.display = "block"
        div1.className = "form-group"
        div1.style.marginTop = "10px"
        let div2 = create('div')
        div2.style.display = "block"
        div2.style.marginTop = "10px"
        div2.className = "form-inline"
        let select = create('select')
        let button = create('button')
        button.style.display = "block"
        button.innerText = 'count'
        button.className = 'btn btn-success'
        let buttonPlus = create('button')
        buttonPlus.className = 'btn btn-success'
        buttonPlus.innerText = '+'
        buttonPlus.style.width = '3em'
        let div3 = create('div')
        div3.style.display = "block"
        div3.style.marginTop = "10px"
        div3.className = "form-inline"
        let div4 = create('div')
        div4.style.display = "block"

        function plusTmp() {
            let div = create('div')
            div.style.display = "block"
            div.className = "form-inline"
            div.style.marginTop = "10px"
            let inputPlus1 = create('input')
            inputPlus1.style.color = "black"
            inputPlus1.style.borderColor = "black"
            inputPlus1.placeholder = "alcoholic drinks(litre)"
            inputPlus1.className = "form-control valueLitr"
            inputPlus1.setAttribute("onkeydown", 'return event.keyCode !== 69')
            inputPlus1.setAttribute("type", "number")
            let inputPlus2 = create('input')
            inputPlus2.style.color = "black"
            inputPlus2.style.borderColor = "black"
            inputPlus2.placeholder = "alc concentration"
            inputPlus2.className = "form-control valueConc"
            inputPlus2.setAttribute("type", "number")
            inputPlus2.setAttribute("onkeydown", 'return event.keyCode !== 69')
            let buttonMinus = create('button')
            buttonMinus.className = 'btn btn-success'
            buttonMinus.innerText = '-'
            buttonMinus.style.width = '3em'
            div3.appendChild(div)
            div.appendChild(inputPlus1)
            div.appendChild(inputPlus2)
            div.appendChild(buttonMinus)
            buttonMinus.onclick = () => {
                div.parentNode.removeChild(div)
            }

        }
        document.body.appendChild(input)
        document.body.appendChild(input2)
        document.body.appendChild(input3)
        document.body.appendChild(div1)
        document.body.appendChild(div2)
        div1.appendChild(checkbox)
        div1.appendChild(label)
        div2.appendChild(input4)
        div2.appendChild(input5)
        div2.appendChild(buttonPlus)
        document.body.appendChild(div3)
        document.body.appendChild(button)
        document.body.appendChild(div4)

        buttonPlus.onclick = () => {
            plusTmp()
        }
        button.onclick = async () => {
            let amount = input.value
            let time = input2.value
            let temp = input3.value
            let buhl = input4.value
            let alc = input5.value
            const a = document.getElementsByClassName('valueLitr');
            [...a].forEach((valueLitr) => {
                if (!isNaN(valueLitr)) {
                    buhl += valueLitr
                }
            })
            const b = document.getElementsByClassName('valueConc');
            [...b].forEach((valueConc) => {
                if (!isNaN(valueConc)) {
                    alc = (alc + valueConc) / 2
                }
            })

            if (!isNaN(amount) && !isNaN(time) && !isNaN(temp) && !isNaN(buhl) && !isNaN(alc)) {
                let tempcoef = Math.max(0.05 * temp, 0.8)
                let sportcoef = 1
                if (checkbox.checked) { sportcoef = 1.5 }
                let wat = (buhl - (0.01 * alc * buhl))
                let alcoef = (((0.01 * alc) * buhl * 5) - wat) * 1000
                if (alc < 15) { alcoef = 0 }
                let waterNeeded = (Math.round(2 * ((140 * amount * time * tempcoef * sportcoef) + alcoef) / 1000)) / 2 + "liters of drinking water"
                let h1 = create('h1')
                h1.innerText = "u shud take " + waterNeeded
                div4.appendChild(h1)
                let userId = readCookie("zapuserid")
                let obj = { amount, time, buhl, alc, waterNeeded }
                let json = JSON.stringify(obj)
                console.log(json)
                let res = await fetch(`http://localhost:3000/saves/${userId}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: json
                })
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
            if (pass.length === 0) { document.getElementById("password").style.color = "red" }
            if (confpass.length === 0) { document.getElementById("confirm-password").style.color = "red" }
            if (testname.length === 0 && testmail.length === 0 && pass === confpass && pass.length !== 0 && email.length !== 0 && usrn.length !== 0) {
                let obj = { usrn, email, pass }
                let json = JSON.stringify(obj)
                let res = await fetch('http://localhost:3000/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: json
                })
                let obj1 = { usrn }
                let json1 = JSON.stringify(obj1)
                let res1 = await fetch('http://localhost:3000/saves', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: json1
                })
            } else if (testmail.length > 0) {
                document.getElementById("email").value = "it is used alredy"
                document.getElementById("email").style.color = "red"
                document.getElementById("email").style.bordercolor = "red"
            } else if (testname.length > 0) {
                document.getElementById("username").value = "it is used alredy"
                document.getElementById("username").style.color = "red"
                document.getElementById("username").style.bordercolor = "red"
            }
        }


        document.getElementById("login-submit").onclick = async (e) => {
            e.preventDefault()

            let passl = document.getElementById("passwordl").value
            let usrnl = document.getElementById("usernamel").value
            if (passl.length === 0) {
                document.getElementById("passwordl").style.color = "red"
                document.getElementById("passwordl").style.bordercolor = "red"
            }
            if (usrnl.length === 0) {
                document.getElementById("usernamel").style.color = "red"
                document.getElementById("usernamel").style.bordercolor = "red"
            }
            if (usrnl.length !== 0 && passl.length !== 0) {

                let userlog = await fetch(`http://localhost:3000/users?usrn=${usrnl}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then(e => e.json())
                    .then(v => {
                        if (v.length === 0) {
                            document.getElementById("usernamel").style.color = "red"
                            document.getElementById("usernamel").style.bordercolor = "red"
                            document.getElementById("passwordl").style.color = "red"
                            document.getElementById("passwordl").style.bordercolor = "red"
                            return

                        }

                        if (v[0].pass === passl) {
                            if (document.getElementById("remember").checked) {
                                document.cookie = "zapuserid=" + v[0].id
                                location.reload()
                            } else {
                                document.cookie = "zapuserid=" + v[0].id + "; max-age=3600"
                                location.reload()
                            }
                        }
                    }
                    )
            }
        }
        window.onload = () => {
            document.getElementById("loged").style.display = "none"
            if (document.cookie.slice(0, 9) === "zapuserid") {
                document.getElementById("unloged1").style.display = "none"
                document.getElementById("unloged2").style.display = "none"
                document.getElementById("loged").style.display = "block"
            }

        }
        document.getElementById("loged").onclick = (e) => {
            document.cookie = "zapuserid= ; max-age=-1"
            location.reload()
        }