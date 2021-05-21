<template>
  <div class="textarea" :class="{ 'form-element_disabled': !!disabled }">
    <label :title="label" v-if="label" class="label text-ellipsis" :class="{ required: !!required }">{{
      label
    }}</label>
    <div class="form-element">
      <textarea
        :disabled="!!disabled"
        :placeholder="placeholder || ''"
        class="form-element-field"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
      ></textarea>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Textarea",
  props: {
    modelValue: [String, Number],
    placeholder: String,
    label: String,
    disabled: Boolean,
    required: Boolean
  },
  emits: ["update:modelValue"]
});
</script>

<style>
.textarea textarea {
  display: block;
  width: 100%;
  height: 200px;
  resize: none;
}
</style>
