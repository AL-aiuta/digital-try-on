<template>
  <q-page class="q-pa-lg bg-grey-1">
    <q-card flat bordered class="q-pa-lg q-mb-lg">
      <div class="text-subtitle2 q-mb-sm">Upload your image</div>

      <div
        class="uploader-area flex column items-center justify-center text-center"
        @dragover.prevent
        @drop.prevent="onDrop"
      >
        <q-icon name="upload" size="48px" class="q-mb-sm" />
        <div class="text-subtitle1">Drop Image Here</div>
        <div class="text-grey-6 q-my-xs">- or -</div>
        <q-btn color="primary" flat label="Click to Upload" class="q-mt-xs" @click="pickFile" />
        <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="onInputFile" />

        <div v-if="previewUrl" class="q-mt-md">
          <q-img :src="previewUrl" :ratio="16 / 9" style="max-width: 720px; border-radius: 8px" />
        </div>
      </div>
    </q-card>

    <div class="text-subtitle2 q-mb-sm">Select SKU</div>
    {{ skus }}

    <q-card flat bordered class="q-pa-md q-mb-lg">

      <div class="row justify-center q-mt-md">
        <q-btn
          label="Generate"
          color="primary"
          :disable="!previewUrl || !selectedSku || loading"
          :loading="loading"
          @click="onGenerate"
        />
      </div>
    </q-card>

    <q-card v-if="resultUrl" flat bordered class="q-pa-md">
      <div class="text-subtitle2 q-mb-sm">Result</div>
      <q-img :src="resultUrl" :ratio="16 / 9" style="max-width: 720px; border-radius: 8px" />
    </q-card>
  </q-page>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { useQuasar } from 'quasar';
import { api } from 'boot/axios';
import { useProductStore } from 'stores/product-store';

const productStore = useProductStore();

type Sku = { id: string; url: string; title: string };

const $q = useQuasar();

const fileInput = ref<HTMLInputElement | null>(null);
const file = ref<File | null>(null);
const previewUrl = ref<string | null>(null);
const resultUrl = ref<string | null>(null);
const loading = ref(false);

const selectedSku = ref<Sku | null>(null);

const skus = computed(() => productStore.list);

watch(file, (newFile) => {
  if (previewUrl.value) {
    URL.revokeObjectURL(previewUrl.value);
    previewUrl.value = null;
  }
  if (newFile) previewUrl.value = URL.createObjectURL(newFile);
});

// lifecycle cleanup на случай ухода со страницы
if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
  });
}

const pickFile = () => {
  fileInput.value?.click();
};

const onInputFile = (e: Event) => {
  const f = (e.target as HTMLInputElement).files?.[0];
  if (f) setFile(f);
};

const onDrop = (e: DragEvent) => {
  const f = e.dataTransfer?.files?.[0];
  if (f) setFile(f);
};

const setFile = (f: File) => {
  if (!f.type.startsWith('image/')) {
    $q.notify({ type: 'negative', message: 'Только изображения.' });
    return;
  }
  file.value = f;
};

const onGenerate = async () => {
  if (!file.value || !selectedSku.value) return;
  loading.value = true;
  resultUrl.value = null;
  try {
    // здесь дергай свой бек: formdata с file и sku.id
    // const url = await apiTryOn(file.value, selectedSku.value.id)
    // resultUrl.value = url

    // демо имитация
    await new Promise((r) => setTimeout(r, 900));
    resultUrl.value = previewUrl.value; // просто покажем исходник как «результат»
    $q.notify({ type: 'positive', message: `Сгенерили для SKU #${selectedSku.value.id}` });
  } catch (e) {
    console.error(e);
    $q.notify({ type: 'negative', message: 'Что-то пошло не так.' });
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  api
    .get('https://web-tools.aiuta.com/digital_try_on_presentation/info')
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.error(err);
    });
});
</script>

<style scoped>
.uploader-area {
  min-height: 280px;
  border: 2px dashed rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  background: white;
  padding: 24px;
}
.sku-scroll {
  height: 220px;
}
.sku-card {
  width: 190px;
  height: 190px;
  border-radius: 12px;
  transition:
    transform 0.12s ease,
    box-shadow 0.12s ease,
    border-color 0.12s ease;
}
.sku-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
}
.sku-selected {
  border: 2px solid var(--q-primary);
  box-shadow: 0 0 0 3px rgba(58, 134, 255, 0.15);
}
</style>
