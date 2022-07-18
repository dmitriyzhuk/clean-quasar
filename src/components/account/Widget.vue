<template>
  <q-card>
    <img :src="store.account.getAccount.image" />
    <q-card-section>
      <div class="text-h4">{{ store.account.getAccount.name }}</div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import { useStore } from 'src/stores';

const store = useStore();
</script>
