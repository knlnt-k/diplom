<template>
  <div class="input" :class="{ 'form-element_disabled': !!disabled }">
    <label
      class="label text-ellipsis"
      :title="label"
      v-if="!!label"
      :for="id || null"
      :class="{ required: !!required }"
      >{{ label }}</label
    >
    <div class="form-element">
      <input
        class="field form-element-field"
        :value="value !== undefined ? value : modelValue"
        :placeholder="placeholder"
        :type="type"
        :name="name || null"
        :id="id || null"
        :disabled="disabled || false"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>

<script lang="ts" src="./input.ts"></script>
