import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ExpensesView from '../views/ExpensesView.vue'
import SavingsView from '../views/SavingsView.vue'
import CreateExpenseView from '../views/CreateExpenseView.vue'
import AboutView from '../views/AboutView.vue'
import SettingsView from '../views/SettingsView.vue'
import LoginView from '../views/LoginView.vue'

const routes = [
  { 
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/expenses',
    name: 'expenses',
    component: ExpensesView
  },
  {
    path: '/expenses/create',
    name: 'createExpense',
    component: CreateExpenseView
  },
  {
    path: '/savings',
    name: 'savings',
    component: SavingsView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView
  },
]

const router = createRouter({
  mode: 'history',
  history: createWebHistory(),
  routes
});

export default router
