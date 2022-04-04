/**
 * @file 注入页面的脚本
 */

(() => {
  const appOnKey = 'of-course__appOnKey'
  const checkItemsKey = 'of-course__checkItemsKey'
  const contentPart = 'of-course_plugin_content'
  const injectPart = 'of-course_plugin_inject'
  const iframePart = 'of-course_plugin_iframeApp'

  const pageConfig = {
    isAppOn: false,
    formData: {
      agree: true,
      collect: true,
      follow: true,
    },
  }

  function follow() {
    const $followBtn = document.querySelector<HTMLElement>('.article-area .follow-btn')
    if (!$followBtn.className.includes('followed')) {
      $followBtn.click()
    }
  }

  function collect() {
    const $collectBtn = document.querySelectorAll<HTMLElement>('.article-suspended-panel .panel-btn')[2]
    if (!$collectBtn.className.includes('active')) {
      $collectBtn?.click()
    }

    const timer = window.setInterval(() => {
      const $checkbox = document.querySelector<HTMLElement>('.byte-modal__body .checkbox-icon')
      if ($checkbox) {
        $checkbox.click()
        window.setTimeout(() => {
          const $submitBtn = document.querySelector<HTMLElement>('.byte-modal__body .confirm-btn')
          $submitBtn.click()
        }, 100)
        window.clearInterval(timer)
      }
    }, 100)
  }

  const $agreeBtn = document.querySelector('.article-suspended-panel .panel-btn')
  $agreeBtn?.addEventListener('click', () => {
    if ($agreeBtn.className.includes('active') || !pageConfig.isAppOn) {
      // 取消点赞行为就不往下走
      // 未开启插件就不往下走
      return
    }

    if (pageConfig.formData.follow) {
      follow()
    }
    if (pageConfig.formData.collect) {
      collect()
    }
  })

  window.addEventListener('message', ({ data: { from, to, key, value, initData } }) => {
    if (from === contentPart && to === injectPart && initData) {

      // 初始化数据
      pageConfig.isAppOn = initData.isAppOn
      Object.assign(pageConfig.formData, initData.formData)
    } else if (from === iframePart && to === injectPart && key === appOnKey) {

      // 启动或停止插件
      pageConfig.isAppOn = value
    } else if (from === iframePart && to === injectPart && key === checkItemsKey) {
      pageConfig.formData = JSON.parse(value)
    }
  }, false)
})()
