import { useDocVersion } from '~/composables/useDocVersion'
import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'

export default defineNuxtRouteMiddleware((to) => {
  const { version, availableVersions } = useDocVersion()
  const path = to.path

  // Array of paths to ignore for version prepending
  const ignoredPaths = [
    '/',
    '/login',
    '/about',
    '/api',
    '/favicon.ico',
    '/images'
    // Add more as needed
  ]

  // Check if path should be ignored
  const isIgnored = ignoredPaths.some(ignored => path === ignored || path.startsWith(ignored + '/'))

  // Check if path already starts with a version
  const hasVersion = availableVersions.some(v => path.startsWith(`/${v}`))

  if (!hasVersion && !isIgnored) {
    // Prepend the selected version
    return navigateTo({
      path: `/${version.value}${path}`,
      query: to.query,
      replace: true
    })
  }
  // Otherwise, continue as normal
})
