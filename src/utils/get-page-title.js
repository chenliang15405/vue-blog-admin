import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Vue Blog Admin'

export default function getPageTitle(key) {
  const hasKey = `route.${key}`
  if (hasKey) {
    // const pageName = `route.${key}`
    const pageName = `${key}`
    return `${pageName} - ${title}`
  }
  return `${title}`
}
