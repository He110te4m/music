import { createApp } from 'vue'
import App from '@/App.vue'
import { router } from './router'
import { registerStore } from './store'

const app = createApp(App)

app.use(router)
registerStore(app)

app.mount('#app')
