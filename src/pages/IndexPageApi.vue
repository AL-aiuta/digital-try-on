<template>
  <q-page class="q-pa-md">
    <div class="q-gutter-md">
      <q-stepper
        v-model="step"
        color="primary"
        animated
        flat
        :vertical="$q.screen.lt.md"
        header-nav
      >
        <q-step :name="1" title="Upload photo" icon="upload">
          <div class="q-gutter-md">
            <q-file
              ref="fileRef"
              v-model="file"
              accept="image/*"
              capture="environment"
              standout="bg-grey-2"
              borderless
              :clearable="!!file"
              @clear="onClearFile"
              @update:model-value="onSelectFile"
              label="Выбери фото (jpeg/png/webp)"
            >
              <template #prepend>
                <q-icon name="image" />
              </template>
              <template #append>
                <q-btn flat icon="photo_camera" @click.stop="openCamera" />
              </template>
            </q-file>

            <div class="row q-col-gutter-sm">
              <div class="col-12">
                <div v-if="previewUrl" class="rounded-borders overflow-hidden">
                  <q-img :src="previewUrl" ratio="1" spinner-size="24" />
                </div>
              </div>
            </div>

            <q-btn
              color="primary"
              label="Дальше"
              class="full-width full-width-md"
              @click="goTo(2)"
              :disable="!file"
            />
          </div>
        </q-step>

        <!-- STEP 2 -->
        <q-step :name="2" title="Choose SKU" icon="view_module">
          <div class="q-gutter-md">
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

            <div class="row q-col-gutter-sm">
              <div class="col-12 col-sm-6">
                <q-btn outline label="Назад" @click="goTo(1)" class="full-width full-width-md" />
              </div>
              <div class="col-12 col-sm-6">
                <q-btn
                  color="primary"
                  label="Дальше"
                  @click="goTo(3)"
                  :disable="!selectedSku"
                  class="full-width full-width-md"
                />
              </div>
            </div>
          </div>
        </q-step>

        <!-- STEP 3 -->
        <q-step :name="3" title="Генерация" caption="Ждём результат" icon="auto_awesome">
          <div class="q-gutter-md">
            <q-banner v-if="error" class="bg-red-2 text-red-10 rounded-borders" dense>
              <q-icon name="error" class="q-mr-sm" /> {{ error }}
              <template #action>
                <q-btn flat label="Повторить" @click="generate" />
              </template>
            </q-banner>

            <q-input
              v-model="prompt"
              type="textarea"
              autogrow
              outlined
              label="Опционально: промпт/параметры"
            />

            <div class="row q-col-gutter-sm">
              <div class="col-12 col-sm-6">
                <q-btn
                  color="positive"
                  label="Generate"
                  :loading="loading"
                  :disable="!file || !selectedSku"
                  class="full-width"
                  @click="generate"
                />
              </div>
              <div class="col-12 col-sm-6" v-if="loading || pollingActive">
                <q-btn
                  outline
                  color="grey-8"
                  label="Отмена"
                  class="full-width"
                  @click="cancelPolling"
                  :disable="!pollingActive"
                />
              </div>
            </div>

            <div v-if="loading || pollingActive" class="q-mt-md">
              <q-linear-progress indeterminate rounded />
              <div class="text-caption text-grey-7 q-mt-xs">Ждём генерацию… {{ pollingNote }}</div>
            </div>

            <div v-if="resultUrl" class="q-mt-md rounded-borders overflow-hidden">
              <q-img :src="resultUrl" ratio="1" spinner-size="24">
                <div class="absolute-top-right q-ma-sm">
                  <q-btn dense round icon="content_copy" @click="copyUrl" />
                  <q-btn dense round icon="download" @click="download" />
                </div>
              </q-img>
            </div>

            <div class="row q-col-gutter-sm q-mt-md">
              <div class="col-12 col-sm-6">
                <q-btn outline label="Назад" @click="goTo(2)" class="full-width" />
              </div>
              <div class="col-12 col-sm-6" v-if="resultUrl">
                <q-btn color="primary" label="Снова" class="full-width" @click="resetResult" />
              </div>
            </div>
          </div>
        </q-step>
      </q-stepper>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount, computed } from 'vue';
import { uid, copyToClipboard, useQuasar } from 'quasar';
import type { QFile } from 'quasar';
import { useProductStore } from 'stores/product-store';

const $q = useQuasar();

/* ---------- state ---------- */
const step = ref<number>(1);
const file = ref<File | null>(null);
const fileRef = ref<InstanceType<typeof QFile> | null>(null);
const previewUrl = ref<string | null>(null);
const selectedSku = ref<string | null>(null);
const prompt = ref<string>('');
const resultUrl = ref<string | null>(null);
const loading = ref<boolean>(false);
const error = ref<string>('');

/* ---------- polling ---------- */
let stopped = false;
let currentTimer: ReturnType<typeof setTimeout> | null = null;
const pollingActive = ref<boolean>(false);
const pollingNote = ref<string>('');

const productStore = useProductStore();

const skus = computed(() => productStore.list);

/* ---------- lifecycle ---------- */
onBeforeUnmount(() => cancelPolling());

/* ---------- file handlers ---------- */
function openCamera() {
  fileRef.value?.pickFiles();
}

function onSelectFile(f: File | File[] | null) {
  error.value = '';
  const fileObj = Array.isArray(f) ? (f?.[0] ?? null) : f;
  if (!fileObj) {
    clearPreview();
    file.value = null;
    return;
  }
  if (fileObj.size > 10 * 1024 * 1024) {
    error.value = 'Файл слишком большой (>10MB)';
    clearPreview();
    file.value = null;
    return;
  }
  file.value = fileObj;
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
  previewUrl.value = URL.createObjectURL(fileObj);
}

function onClearFile() {
  file.value = null;
  clearPreview();
}

function clearPreview() {
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value);
  previewUrl.value = null;
}

/* ---------- nav ---------- */
function goTo(n: number) {
  step.value = n;
}


const tryOn = (skuId: string) => {
  void window?.aiuta?.sdk.tryOn(skuId);
}

/* ---------- API (замени на свои эндпоинты) ---------- */
const api = {
  async startJob({ file, sku, prompt }: { file: File; sku: string; prompt?: string }) {
    console.log({ file, sku, prompt });
    // Пример реального вызова:
    // const form = new FormData()
    // form.append('image', file)
    // form.append('sku', sku)
    // if (prompt) form.append('prompt', prompt)
    // const res = await fetch('/api/generate', { method: 'POST', body: form })
    // if (!res.ok) throw new Error('Start job failed')
    // const json = await res.json() as { jobId: string }
    // return json.jobId

    await sleep(400); // mock network
    return 'job_' + uid();
  },

  async checkJob(jobId: string): Promise<{ status: 'pending' | 'done' | 'error'; url?: string }> {
    // const res = await fetch(`/api/jobs/${jobId}`)
    // if (!res.ok) throw new Error('Check job failed')
    // return await res.json() as { status: 'pending'|'done'|'error'; url?: string }

    await sleep(300);
    if (Math.random() < 0.35)
      return { status: 'done', url: `https://picsum.photos/seed/${jobId}/1024/1024` };
    return { status: 'pending' };
  },
};

/* ---------- generate & polling ---------- */
async function generate() {
  if (!file.value || !selectedSku.value) return;
  error.value = '';
  resultUrl.value = null;
  stopped = false;
  loading.value = true;

  try {
    const jobId = await api.startJob({
      file: file.value,
      sku: selectedSku.value,
      prompt: (prompt.value || '').trim(),
    });

    pollingActive.value = true;
    await pollForResult(jobId, {
      intervalMs: 1000,
      maxIntervalMs: 5000,
      maxTimeMs: 90_000,
    });
  } catch (e: unknown) {
    console.error(e);
    error.value = 'Не удалось запустить задачу. Проверь сеть/сервер.';
  } finally {
    loading.value = false;
  }
}

async function pollForResult(
  jobId: string,
  {
    intervalMs,
    maxIntervalMs,
    maxTimeMs,
  }: { intervalMs: number; maxIntervalMs: number; maxTimeMs: number },
) {
  const start = Date.now();
  let delay = intervalMs;
  let attempt = 0;

  while (!stopped) {
    attempt++;
    pollingNote.value = `попытка ${attempt}`;
    try {
      const { status, url } = await api.checkJob(jobId);
      if (status === 'done' && url) {
        resultUrl.value = url;
        break;
      }
    } catch {
      error.value = 'Ошибка получения статуса задачи';
      break;
    }

    if (Date.now() - start > maxTimeMs) {
      error.value = 'Таймаут ожидания. Попробуй ещё раз.';
      break;
    }

    await waitWithAbort(delay);
    delay = Math.min(Math.floor(delay * 1.6), maxIntervalMs);
  }

  pollingActive.value = false;
}

function cancelPolling() {
  stopped = true;
  pollingActive.value = false;
  if (currentTimer) {
    clearTimeout(currentTimer);
    currentTimer = null;
  }
}

function resetResult() {
  resultUrl.value = null;
  error.value = '';
}

/* ---------- utils ---------- */
async function copyUrl() {
  if (!resultUrl.value) return;
  try {
    await copyToClipboard(resultUrl.value);
    $q.notify({ message: 'Ссылка скопирована', color: 'primary', icon: 'link' });
  } catch {
    $q.notify({ message: 'Не удалось скопировать', color: 'negative', icon: 'error' });
  }
}

function download() {
  if (!resultUrl.value) return;
  const a = document.createElement('a');
  a.href = resultUrl.value;
  a.download = 'result.jpg';
  a.target = '_blank';
  a.rel = 'noopener';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function waitWithAbort(ms: number) {
  return new Promise<void>((resolve) => {
    currentTimer = setTimeout(() => {
      currentTimer = null;
      resolve();
    }, ms);
  });
}

/* ---------- watch cleanup for preview ---------- */
watch(
  () => file.value,
  (f) => {
    if (!f && previewUrl.value) {
      URL.revokeObjectURL(previewUrl.value);
      previewUrl.value = null;
    }
  },
);
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

