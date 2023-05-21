import { createApp } from 'vue';
import './style.css';
import './tailwind.css';
import App from './App.vue';
import store from './store';
import router from './routes/router';

const app = createApp(App);

app.use(store);
app.use(router);
app.mount('#app');