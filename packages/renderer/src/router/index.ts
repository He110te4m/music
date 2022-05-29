import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const modules = import.meta.globEager('./routes/*.{js,ts}')

const routes: RouteRecordRaw[] = []

Object.values(modules).forEach((module) => routes.push(...module.default))

const router = createRouter({
  history: createWebHistory(),
  routes
})

export { router }
