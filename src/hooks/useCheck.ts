import { reactive, watch } from 'vue'
import {
  checkItemsKey,
  iframePart,
  injectPart,
} from '@/consts'

export const useCheck = () => {
  const formData = reactive({
    agree: true,
    collect: true,
    follow: true,
  })

  watch(formData, newVal => {
    window.parent?.postMessage({
      from: iframePart,
      to: injectPart,
      key: checkItemsKey,
      value: JSON.stringify(newVal),
    }, '*')

    chrome.storage?.local.set({ [checkItemsKey]: newVal })
  })

  chrome.storage?.local.get([checkItemsKey], res => {
    if (res[checkItemsKey]) {
      Object.assign(formData, res[checkItemsKey])
    }
  })

  return {
    formData,
  }
}
