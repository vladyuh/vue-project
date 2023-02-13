<template>
  <div class="fields">
    <h4>Текстовые поля</h4>
    <div class="inputs" style="display: flex; flex-direction: column; gap: 12px">
      <input-field
          type="text"
          name="user"
          placeholder="Your name"
          label="Name"
      />
      <input-field
          icon-name="ic_apps"
          type="tel"
          name="phone"
          placeholder="Your phone"
          label="Phone"
      />
      <input-field
          :is-input="false"
          name="message"
          placeholder="Your message"
          label="Message"
      />
      <input-field
          :is-input="false"
          icon-name="ic_apps"
          name="message"
          placeholder="Additional info"
          label="Info"
      />
    </div>
  </div>
</template>

<script>
import InputField from "@/common-components/input-field";

export default {
  name: 'fields-modal',
  components: {
    InputField,
  },
}
</script>
