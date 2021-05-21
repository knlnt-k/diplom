<template>
  <div
    class="popup"
    @click.self="$emit('close')"
    @keypress.esc="$emit('close')"
  >
    <div class="popup__body" :class="{ loader: isLoad }">
      <div class="popup__header">
        <div class="popup__header-slot">
          <slot name="header"></slot>
        </div>
        <button
          class="popup__close-button"
          aria-label="Закрыть"
          @click="$emit('close')"
        ></button>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Popup",
  props: {
    isLoad: Boolean
  }
});
</script>

<style>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(158, 158, 158, 0.5);
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.popup__body {
  background-color: #ffffff;
  border-radius: 7px;
  width: 100%;
  max-width: 95vw;
  max-height: 95vh;
  overflow: auto;
  padding: 20px 25px;
}

.popup__header {
  align-items: flex-start;
  justify-content: space-between;
}

.popup__header,
.popup__header-slot {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}

.popup__header-slot {
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  flex: 0 1 auto;
  max-width: 86%;
}

.popup__close-button {
  display: block;
  cursor: pointer;
  position: relative;
  width: 25px;
  height: 25px;
  background-color: transparent;
  margin-left: auto;
  margin-right: 0;
  margin-bottom: 10px;
}

.popup__close-button::before,
.popup__close-button::after {
  content: "";
  display: block;
  width: 80%;
  height: 0;
  border: 1px solid #304ffe;
  position: absolute;
  border-radius: 5px;
}

.popup__close-button::before {
  transform: rotate(45deg);
}

.popup__close-button::after {
  transform: rotate(-45deg);
}
</style>
