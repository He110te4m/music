import { ref } from 'vue'

export function useShowMenu() {
  const isShowMenu = ref(false)
  const menuPoint = ref({
    x: 0,
    y: 0
  })

  function onContextMenu(e: PointerEvent) {
    isShowMenu.value = true
    menuPoint.value = {
      x: e.clientX,
      y: e.clientY
    }
  }

  return {
    isShowMenu,
    menuPoint,
    onContextMenu
  }
}
