import Scrollbar from './plugin/scrollbar/index.js';
import TableOfContents from './theme/components/toc/components/TableOfContents'

export default ({ Vue, options, router }) => {
  // Vue.config.errorHandler = function (err, vm, info) {
  //   // 捕获 Vue 中的错误，集中处理
  //   console.dir('error: ' + err.message)
  // }
  Vue.use(Scrollbar)
  Vue.component('TableOfContents', TableOfContents)
  Vue.component('TOC', TableOfContents)
};