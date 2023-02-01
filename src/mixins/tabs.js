export default {
  methods: {
    scrollToActiveTab (target, ref, data, index) {
      const itemRect = target?.getBoundingClientRect()
      const refRect = ref?.getBoundingClientRect()

      if (!itemRect || !refRect) {
        return
      }

      let position = 0

      if (index === 0 ) {
        position = 0
      } else if (index === data.length - 1) {
        position = itemRect.right
      } else {
        position = itemRect.left - refRect.left
      }

      ref.scrollTo({
        left: position,
        behavior: 'smooth'
      })
    }
  }
}
