import { createApp } from 'vue'
//import router, because the index so we just call folder name
import router from './router'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

// createApp(App).mount('#app')

//declare var createApp
const app = createApp(App);

// use and mount in createApp var
app.use(router)
// the interactive vue will only run in this element #app
app.mount('#app')