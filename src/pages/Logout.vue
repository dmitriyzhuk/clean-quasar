<template>
  <q-page class="row items-center justify-evenly">
    <h1>Logging out</h1>
  </q-page>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useStore } from 'src/stores';

const store = useStore();
onMounted(async () => {
  await store.account.logout();
});
</script>
