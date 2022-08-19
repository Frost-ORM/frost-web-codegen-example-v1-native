import "./index.scss"
import "./styles/index.module.scss"

let div = document.createElement('div')
div.className="container"

div.innerHTML = "<h1>Test</h1>"

let body = document.getElementsByTagName('body').item(0)

body.append(div)