<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-black">
      <div class="page-container">
        <q-toolbar>
          <div class="q-pl-sm">
            <q-img width="107px" src="~assets/logo.png" />
          </div>
          <q-space />

          <div class="text-weight-medium q-pr-sm text-right text-subtitle1">Virtual Try-On</div>
        </q-toolbar>
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useProductStore } from 'stores/product-store';

const productStore = useProductStore();
void productStore.fetchList()
</script>
