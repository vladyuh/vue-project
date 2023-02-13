<template>
  <form
      ref="form"
      class="feedback-form"
  >
    <section-header
      :level="5"
      text="Обратная связь"
    />
    <input-field
        type="text"
        name="user"
        placeholder="Ваше имя"
        label="Имя"
        v-model="name"
    />
    <input-field
        :is-input="false"
        name="message"
        placeholder="Ваше сообщение"
        label="Сообщение"
        v-model="message"
    />
    <btn
      @click="sendForm($event)"
    >
      <span>Отправить сообщение</span>
    </btn>
  </form>
</template>

<script>
import InputField from "@/common-components/input-field";
import Btn from "@/common-components/btn";
import SectionHeader from "@/common-components/section-header";

export default {
  name: 'feedback-modal',
  components: {
    SectionHeader,
    Btn,
    InputField,
  },
  data () {
    return {
      name: '',
      message: ''
    }
  },
  methods: {
    sendForm(event) {
      event.preventDefault()

      const data = {
        'from_name': this.name,
        'message': this.message
      }

      window?.emailjs.send('service_tsnqahq','template_gf5yk6s', data)
          .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
            this.$emit('on-success')
          }, (error) => {
            console.log('FAILED...', error);
          });
    }
  }
}
</script>

<style src="./style.scss" lang="scss"/>