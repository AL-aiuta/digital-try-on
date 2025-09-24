import { defineStore, acceptHMRUpdate } from 'pinia';
import { api } from 'boot/axios';
import type { ProductsApiResponse, SkuItem } from 'src/types/product';

interface ProductStoreState {
  list: SkuItem[];
}

export const useProductStore = defineStore('product', {
  state: (): ProductStoreState => ({
    list: [],
  }),

  getters: {},

  actions: {
    async fetchList () {
      try {
        if (!window.aiuta?.config?.skuItemsUrl) return
        const response = await api.get<ProductsApiResponse>(
          window.aiuta.config.skuItemsUrl,
          {
            params: { limit: 50 },
            headers: {
              'x-api-key': window.aiuta.config.apiKey,
            },
          }
        );

        console.log(response.data);
        this.list = response.data.result;
      } catch (error) {
        console.error('Ошибка при запросе:', error);
      }
    }
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot));
}
