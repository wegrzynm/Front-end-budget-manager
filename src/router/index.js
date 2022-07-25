import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ExpensesView from '../views/ExpensesView.vue'
import SavingsView from '../views/SavingsView.vue'
import CreateExpenseView from '../views/CreateExpenseView.vue'

const routes = [
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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
