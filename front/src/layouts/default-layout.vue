<template>
  <div class="default-layout">
    <ul class="toaster" v-if="$toaster.messages.length">
      <li
        class="toaster__item"
        :class="'toaster__item_' + message.type"
        v-for="(message, index) in $toaster.messages"
        :key="index"
      >
        {{ message.text }}
      </li>
    </ul>
    <template v-if="currentAccount.isAuth">
      <PopupCreateTask v-if="$popups.list['newTask']" />
      <PopupUpdateUser v-if="$popups.list['updateUser']" />
      <Header @exit="exit" />
      <LeftPanel />
      <div class="container" :class="{ loader: $loader.isLoad }">
        <div class="container__blocked" v-if="$loader.isLoad"></div>
        <div class="container-scroll">
          <router-view />
        </div>
      </div>
    </template>
    <router-view v-else />
  </div>
</template>

<script lang="ts" src="./default-layout.ts"></script>
<style src="./default-layout.css"></style>
