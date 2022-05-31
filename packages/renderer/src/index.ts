import { createApp } from 'vue'
import App from '@/App.vue'
import { router } from 'router/index'
import { registerStore } from 'store/index'

const app = createApp(App)

app.use(router)
registerStore(app)

app.mount('#app')
