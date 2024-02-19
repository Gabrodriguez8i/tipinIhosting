<template>
    <input
    v-bind="$attrs"
    :placeholder="label"
    class="bodyForm_input"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    required
    >

</template>
<script>
//import { defineProps } from 'vue';
export default{
 props: {
    label: {
        type: String,
        default: '',
    },
    modelValue:{
        type: [String, Number],
        default: '',
    }

}
}




</script>
<style lang="scss">




</style>