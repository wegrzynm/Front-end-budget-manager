import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vue3EasyDataTable from 'vue3-easy-data-table'
import 'vue3-easy-data-table/dist/style.css'
import { SemipolarSpinner  } from 'epic-spinners';

export const currency ='zł'
let app = createApp(App)
app.component('EasyDataTable', Vue3EasyDataTable);
app.component('SemipolarSpinner', SemipolarSpinner);
app.config.globalProperties.currency = 'zł'
app.use(router).mount('#app')
