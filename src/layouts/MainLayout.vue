<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-white text-black">
      <div class="page-container">
        <q-toolbar>
          <q-toolbar-title>Digital try on</q-toolbar-title>

          <div>
            <q-img width="100px" src="~assets/logo.png" />
          </div>
        </q-toolbar>
      </div>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
</script>
