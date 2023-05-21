import { createApp } from 'vue';
import './style.css';
import './tailwind.css';
import App from './App.vue';
import store from './store';

const app = createApp(App);

app.use(store);
app.mount('#app');
// createApp(App).use(store).mount('#app')
