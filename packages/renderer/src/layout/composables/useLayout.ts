import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { LayoutTypeEnum } from '@/layout/enums'

export function useLayout() {
  const type =
    (useRoute().meta.layout as LayoutTypeEnum) ?? LayoutTypeEnum.default

  const cls = computed(() => {
    let cls = ''
    switch (type) {
      case LayoutTypeEnum.default:
        cls = 'default-layout'
        break
      default: {
        const n: never = type
        break
      }
    }
    return cls
  })

  return {
    type,
    cls
  }
}
