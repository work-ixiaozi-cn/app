import { createRoot } from 'react-dom/client'
import Header from './views/header'

declare global {
    interface Window {}
}

const section = document.createElement('section')
section.setAttribute('id', '__global__inject__')
section.setAttribute('style', 'width:100%; height:56px')
document.body.insertBefore(section, document.body.firstChild)
console.log('this is menu..........................')
//     import { createRoot } from 'react-dom/client'
//     import App from './App'

createRoot(section).render(
    <Header />
)