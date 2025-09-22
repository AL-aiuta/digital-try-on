<template>
  <q-page class="q-pa-sm q-pt-lg">
    <div class="page-container">
      <div class="sku-grid">
        <q-card
          v-for="sku in skus"
          :key="sku.sku_id"
          @click="tryOn(sku.sku_id)"
          clickable
          v-ripple
          flat
          class="sku-card column cursor-pointer"
        >
          <q-img
            :src="sku.image_urls[0]"
            :ratio="2/3"
            contain
            loading="lazy"
            class="sku-card__image"
          />
<!--          <q-card-actions>-->
<!--            <q-btn class="sku-card__btn" size="md" outline color="primary" label="Try on" no-caps />-->
<!--          </q-card-actions>-->
          <q-card-section class="q-pt-sm q-pl-none q-pr-sm q-pb-md">
            <div class="sku-card__title">{{ sku.title }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useProductStore } from 'stores/product-store';
import { aiuta } from 'boot/aiuta';

const productStore = useProductStore();

const skus = computed(() => productStore.list);

const tryOn = (skuId: string) => {
  void aiuta.tryOn(skuId)
}
</script>

<style scoped lang="scss">
.sku-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
  align-items: stretch;
  border-radius: 16px;
}

.sku-card {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__title {
    font-size: .75rem;
    font-weight: 400;
  }
  & .q-card-actions {
    margin-top: auto;
  }
  &__image {
    border-radius: 16px !important;
    overflow: hidden;
  }
  &__btn {
    width: 100%;
    font-size: 13px !important;
    min-height: 2.25em;
  }
}

</style>
