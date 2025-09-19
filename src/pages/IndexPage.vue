<template>
  <q-page class="q-pa-lg bg-grey-1">
    <div class="page-container">
      <div class="sku-grid">
        <q-card
          v-for="sku in skus"
          :key="sku.id"
          clickable
          bordered
          flat
          class="sku-card column"
        >
          <q-img :src="sku.url" :ratio="2/3" contain loading="lazy" />
          <q-card-actions>
            <q-btn @click="tryOn(sku.id)" class="sku-card__btn" size="md" outline color="primary" label="Try on" no-caps />
          </q-card-actions>
          <q-card-section class="q-pt-none q-pl-sm q-pr-sm q-pb-sm">
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

type Sku = { id: string; url: string; title: string };
const skus = computed<Sku[]>(() => productStore.list);

const tryOn = (skuId: string) => {

  console.log(aiuta)
  void aiuta.tryOn(skuId)
}
</script>

<style scoped lang="scss">
.sku-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
  align-items: stretch; // все карточки по высоте равны
}

.sku-card {
  display: flex;
  flex-direction: column;
  height: 100%; // тянем на всю ячейку

  &__title {
    font-size: .75rem;
    font-weight: 400;
  }
  & .q-card-actions {
    margin-top: auto;
  }
  &__btn {
    width: 100%;
    font-size: 13px !important;
    min-height: 2.25em;
  }
}

</style>
