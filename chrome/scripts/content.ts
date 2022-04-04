/**
 * @file 和原始页面共享DOM，但是不共享js
 * 运行在一个被隔离的环境中，无法调用页面中的js
 * 如果出现需要调用页面js的情况，可以使用注入js的方式
 */

(() => {
  const appOnKey = 'of-course__appOnKey'
  const checkItemsKey = 'of-course__checkItemsKey'
  const contentPart = 'of-course_plugin_content'
  const injectPart = 'of-course_plugin_inject'
  const backgroundPart = 'of-course_plugin_background'
  const toggleIframe = 'of-course_plugin_toggoleIframeShow'
  const zIndexVal = '999999999999'
  const iframeStyleList = [
    {
      name: 'height',
      value: '100vh',
    }, {
      name: 'width',
      value: '360px',
    }, {
      name: 'min-width',
      value: '360px',
    }, {
      name: 'position',
      value: 'fixed',
    }, {
      name: 'top',
      value: '0',
    }, {
      name: 'right',
      value: '0',
    }, {
      name: 'bottom',
      value: 'auto',
    }, {
      name: 'left',
      value: 'auto',
    }, {
      name: 'z-index',
      value: zIndexVal,
    }, {
      name: 'transform',
      value: 'translateX(520px)',
    }, {
      name: 'transition',
      value: 'all .5s',
    }, {
      name: 'border',
      value: 'none',
    }, {
      name: 'box-shadow',
      value: '0 0 15px 2px rgba(0,0,0,0.12)',
    }
  ]

  function changeIframeShow(myIframe: HTMLIFrameElement) {
    let isIframeShow = false
    chrome.runtime?.onMessage.addListener(({ from, to, value }) => {
      if (from === backgroundPart && to === contentPart && value === toggleIframe) {
        isIframeShow = !isIframeShow
        myIframe.style.setProperty(
          'transform',
          isIframeShow ? 'translateX(0)' : 'translateX(520px)', 'important'
        )
      }
      return true
    })
  }

  function getInitData() {
    chrome.storage.local.get([appOnKey, checkItemsKey], (result) => {
      window.postMessage({
        from: contentPart,
        to: injectPart,
        initData: {
          isAppOn: result[appOnKey] ?? false,
          formData: result[checkItemsKey] ?? {},
        },
      }, '*')
    })
  }

  function appendScript() {
    const myScript = document.createElement('script')
    myScript.setAttribute('type', 'text/javascript')
    myScript.setAttribute('src', chrome.extension.getURL('scripts/inject-page.js'))
    myScript.addEventListener('load', () => {
      getInitData()
    })

    return myScript
  }

  function appendIframe() {
    const myIframe = document.createElement('iframe')
    myIframe.name = 'of-course-chrome-plugin'
    iframeStyleList.forEach(styleProp => {
      myIframe.style.setProperty(styleProp.name, styleProp.value, 'important')
    })
    myIframe.src = chrome.extension.getURL('index.html')
    changeIframeShow(myIframe)

    return myIframe
  }

  if (window.self === window.top) {

    // 在页面上插入脚本
    const myScript = appendScript()
    const myIframe = appendIframe()
    document.onreadystatechange = () => {
      if (document.readyState === 'complete') {
        document.documentElement.appendChild(myScript)
        document.body.appendChild(myIframe)
      }
    }
  }

})()
