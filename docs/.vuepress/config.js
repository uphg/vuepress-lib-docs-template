var nav = require("./navbar/index")
var sidebar = require("./sidebar/index")

module.exports = {
  base: '/vuepress-lib-docs-template/',
  lang: 'zh-CN',
  title: 'Lib Docs',
  description: '一个简洁的 VuePress 文档',
  head: [
    ['link', {rel: 'stylesheet', href: '/font/index.css'}],
  ],
  themeConfig: {
    searchMaxSuggestions: 10,
    // smoothScroll: true, // 开启平滑滚动
    nav,
    lastUpdated: '上次更新',
    sidebarDepth: 2,
    sidebar,
  },
  plugins: [
    // ['@vuepress/back-to-top'],
    [
      'vuepress-plugin-zooming',
      {
        selector: '.page img',
        delay: 1000,
        options: {
          bgColor: 'black',
          zIndex: 10000,
        },
      },
    ],
    // ['@vuepress/active-header-links',
    //   {
    //     sidebarLinkSelector: '.page-catalog a'
    //   }
    // ],
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: {
          '/': {
            message: '发现新内容可用',
            buttonText: '刷新'
          }
        }
      }
    ],
    ['container', {
      type: 'info',
      before: text => `<div class="custom-block info"><p class="custom-block-title">${text}</p>`,
      after: '</div>',
    }],
  ],
  markdown: {
    /** @param {import('markdown-it')} md */
    extendMarkdown: md => {
      md.options.highlight = require('./markdown/highlight')(
        md.options.highlight
      )
    }
  }
}
