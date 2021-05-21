<template>
  <header class="header">
    <div class="logo">Tracker</div>
    <button
      class="header__toggle-left-panel"
      aria-label="Открыть левую панель"
      @click="$leftPanel.toggle()"
    >
      <span></span>
    </button>
    <div
      class="header__user-menu-wrapper"
      @click="isShowUserMenu = !isShowUserMenu"
      @mouseenter="isMouseEnterOnUserMenu = true"
      @mouseleave="isMouseEnterOnUserMenu = false"
    >
      <div
        class="header__user-name"
        :class="{ 'header__user-name_open': isShowUserMenu }"
      >
        <span class="header__user-logo">{{
          currentAccount.name[0] || "T"
        }}</span>
        {{ currentAccount.name }}
      </div>
      <transition name="fade">
        <ul class="header__user-menu" v-if="isShowUserMenu">
          <li class="header__user-menu-item">Настройки</li>
          <li class="header__user-menu-item" @click="$emit('exit')">Выход</li>
        </ul>
      </transition>
    </div>
  </header>
</template>

<script lang="ts" src="./header.ts"></script>
<style src="./header.css"></style>
