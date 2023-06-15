import App from "./App.tsx";

console.log('start')
const div = document.createElement('div')
div.setAttribute('id', 'app')
div.innerHTML = 'hello world'
document.body.appendChild(div)
console.log('done!')

console.log(App)
