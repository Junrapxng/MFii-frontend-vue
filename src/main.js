/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

//css
import './styles/main.css';

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import router from './router';

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
app.use(router)
