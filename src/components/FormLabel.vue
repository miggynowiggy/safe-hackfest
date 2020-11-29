<template>
  <span class="text-caption font-weight-semibold d-block pb-2" v-text="text" />
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  }
};
</script>
