<template>
  <button
    class="button form-element form-element-field"
    :disabled="!!disabled"
    :class="type ? 'button_' + type : ''"
    :title="type === 'delete' ? 'Удалить' : null"
  >
    <template
      v-if="text && type !== 'delete'"
      :aria-label="type || text || ''"
      >{{ text }}</template
    >
    <slot v-else></slot>
  </button>
</template>

<script lang="ts" src="./button.ts"></script>

<style>
.button {
  background-color: #304ffe;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s;
  width: auto;
  border: none;
}

.button:hover {
  background-color: #536dfe;
}

.button:disabled {
  opacity: 0.4;
}

.button:disabled:hover {
  background-color: #1a237e;
  cursor: default;
}

.button_delete {
  background-color: #d50000;
  width: 20px;
  height: 20px;
  position: relative;
}

.button_delete:hover {
  background-color: #b71c1c;
}

.button_delete::before,
.button_delete::after {
  content: "";
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 70%;
  height: 0;
  border: 1px solid #ffffff;
}

.button_delete::before {
  transform: translate(-50%, -50%) rotate(45deg);
}

.button_delete::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}
</style>
