export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'slate'
    },
    footer: {
      slots: {
        root: 'border-t border-default',
        left: 'text-sm text-muted'
      }
    }
  },
  seo: {
    siteName: 'Eco Modding Wiki'
  },
  header: {
    title: '',
    to: '/',
    logo: {
      alt: '/images/compact_header_logo.png',
      light: '/images/compact_header_logo.png',
      dark: '/images/compact_header_logo.png'
    },
    search: true,
    colorMode: true,
    links: []
  },
  footer: {
    credits: `Built with Nuxt UI • © ${new Date().getFullYear()}`,
    colorMode: false,
    links: []
  },
  toc: {
    title: 'Table of Contents',
    bottom: {
      title: 'Things to check out',
      links: [{
        icon: 'i-fa-gamepad',
        label: 'Play Eco',
        to: 'https://pplay.eco',
        target: '_blank'
      }]
    }
  }
})
