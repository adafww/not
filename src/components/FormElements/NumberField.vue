<template lang="pug">
  .form__group(:class="{fill: number.length > 0}")
    input.form__input(:id="id" v-model="number" name="number" :class="{invalid: (v.$dirty && !v.required) || (v.$dirty && !v.isCode)}" @change="v.$touch()")
    label.form__label(:for="id") Цифры
    span.form__error(v-if="v.$dirty && !v.required") Обязательно поле 
    //- span.form__error(v-else-if="v.$dirty && !v.isCode") цифры не совпадают
</template>

<script>
export default {
  name: 'NumberField',
  props: {
    value: {
      type: String,
      default: ''
    },
    v: {
      type: Object,
      required: true
    },
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    number: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

