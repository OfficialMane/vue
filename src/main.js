import { createApp } from 'vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Toaster from "@meforma/vue-toaster";
import router from './router'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

library.add(fas)
createApp(App)
.component('fa', FontAwesomeIcon)
.use(Toaster)
.use(router)
.mount('#app')
