import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const VERSION_KEY = 'eco-doc-version'
const defaultVersion = 'v11'
const availableVersions = ['v11', 'v12']

export function useDocVersion() {
  // Array of paths or patterns to exclude from version redirect
  const excludedPaths = [
    '/'
  ]
  const version = ref(defaultVersion)
  const route = useRoute()

  // Set version from localStorage or route synchronously on client
  if (typeof window !== 'undefined') {
    // Check route path for version
    const match = route.path.match(/^\/(v\d+)/)
    const matchedVersion = match && match[1] ? match[1] : undefined
    if (matchedVersion && availableVersions.includes(matchedVersion)) {
      version.value = matchedVersion
      window.localStorage.setItem(VERSION_KEY, matchedVersion)
    } else {
      const stored = window.localStorage.getItem(VERSION_KEY)
      if (stored && availableVersions.includes(stored)) {
        version.value = stored
      } else {
        window.localStorage.setItem(VERSION_KEY, defaultVersion)
        version.value = defaultVersion
      }
    }
  }

  // Watch route changes and sync version
  watch(() => route.path, (newPath) => {
    const match = newPath.match(/^\/(v\d+)\//)
    const matchedVersion = match && match[1] ? match[1] : undefined
    if (matchedVersion && availableVersions.includes(matchedVersion)) {
      version.value = matchedVersion
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(VERSION_KEY, matchedVersion)
      }
    }
  })

  watch(version, (val) => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(VERSION_KEY, val)
      // If version changes, reload to correct route unless excluded
      const match = route.path.match(/^\/(v\d+)/)
      const currentVersion = match && match[1] ? match[1] : undefined
      // Check if current path is excluded
      const isExcluded = excludedPaths.some((excluded) => {
        // Exact match or starts with excluded path
        return route.path === excluded || route.path.startsWith(excluded + '/')
      })
      if (!isExcluded && val !== currentVersion) {
        // Replace version in path or prepend if missing
        let newPath = route.path
        if (currentVersion) {
          newPath = route.path.replace(/^\/(v\d+)/, `/${val}`)
        } else {
          newPath = `/${val}${route.path.startsWith('/') ? '' : '/'}${route.path}`
        }
        window.location.href = newPath
      }
    }
  })

  const setVersion = (val: string) => {
    if (availableVersions.includes(val)) version.value = val
  }

  return {
    version,
    availableVersions,
    setVersion,
    excludedPaths
  }
}
