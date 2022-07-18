<template>
  <q-layout class="main-layout" view="lhh Lpr lff">
    <CommonHeader />
    <q-page-container>
      <q-page class="main-layout__container">
        <router-view />
      </q-page>
    </q-page-container>
    <CommonFooter />
  </q-layout>
</template>

<script lang="ts" setup>
import CommonHeader from 'components/common/Header.vue';
import CommonFooter from 'components/common/Footer.vue';
</script>

<style lang="scss">
.main-layout {
  &__container {
    padding: 2rem;
    max-width: 76rem;
    margin: 0px auto;
  }
}
</style>
