<template>
  <div class="switcher-modal">
    <h3>Настройки</h3>
    <switcher>
      <span>Not active</span>
    </switcher>
    <switcher
        :value="true"
    >
      <span>Active</span>
    </switcher>
    <switcher
        :value="true"
        :disabled="true"
    >
      <span>Active and disabled</span>
    </switcher>
  </div>
</template>

<script>
import switcher from "@/common-components/switcher";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "switcher-modal",
  components: {
    switcher
  },
}

</script>

<style src="./style.scss" lang="scss"/>