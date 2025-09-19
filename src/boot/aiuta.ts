// boot/aiuta.ts
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
import { boot } from 'quasar/wrappers';
import { api } from 'boot/axios';

const AIUTA_UMD = 'https://static.aiuta.com/sdk/v0.0.95/index.umd.js'
const AIUTA_SUBSCRIPTION_ID = process.env.VITE_AIUTA_SUBSCRIPTION_ID as string;
const AIUTA_JWT_URL = process.env.VITE_AIUTA_JWT_URL as string

declare global {
  interface Window {
    Aiuta?: new (config: unknown) => unknown
  }
}

type AiutaSDK = {
  tryOn?: (skuId: string | number, options?: Record<string, unknown>) => Promise<unknown> | unknown
  [k: string]: unknown
}

let instance: AiutaSDK | null = null
let initPromise: Promise<AiutaSDK | null> | null = null

async function getJwtFromBackend (params: Record<string, unknown>): Promise<string> {
  try {
    const res = await api.post(AIUTA_JWT_URL, params, {
      headers: { 'Content-Type': 'application/json' }
    })
    const token = res?.data?.token
    if (typeof token !== 'string' || !token) {
      throw new Error('JWT error')
    }
    return token
  } catch (e) {
    console.error('JWT fetch failed', e)
    throw e
  }
}

async function ensureInstance (): Promise<AiutaSDK | null> {
  if (instance) return instance
  if (initPromise) return initPromise

  initPromise = new Promise<AiutaSDK | null>((resolve, reject) => {
    const finish = () => {
      try {
        if (!window.Aiuta) {
          console.warn('[Aiuta] window.Aiuta ont found after initialization')
          resolve(null)
          return
        }

        instance = new window.Aiuta({
          auth: {
            subscriptionId: AIUTA_SUBSCRIPTION_ID,
            getJwt: async (params: Record<string, unknown>) => await getJwtFromBackend(params),
          },
          analytics: {
            handler: {
              onAnalyticsEvent: (_e: unknown) => {
                console.log('AIUTA analytics', _e)
              }
            }
          }
        }) as AiutaSDK
        resolve(instance)
      } catch (e) {
        reject(e as Error)
      }
    }

    if (window.Aiuta) {
      finish()
      return
    }

    const existing = document.querySelector(`script[src="${AIUTA_UMD}"]`)
    if (existing) {
      if (existing.getAttribute('data-aiuta-loaded') === '1') {
        finish()
      } else {
        existing.addEventListener('load', () => { existing.setAttribute('data-aiuta-loaded', '1'); finish() })
        existing.addEventListener('error', () => reject(new Error('Aiuta script failed to load')))
      }
      return
    }

    const s = document.createElement('script')
    s.src = AIUTA_UMD
    s.async = true
    s.defer = true
    s.addEventListener('load', () => { s.setAttribute('data-aiuta-loaded', '1'); finish() })
    s.addEventListener('error', () => reject(new Error('Aiuta script failed to load')))
    document.head.appendChild(s)
  })

  return initPromise
}

  export const aiuta = {
  ready: () => ensureInstance(),

  async tryOn (skuId: string | number, options?: Record<string, unknown>) {
    const inst = await ensureInstance()
    if (!inst?.tryOn) {
      console.warn('[Aiuta] tryOn not working')
      return
    }
    return inst.tryOn(skuId, options)
  },

  async call<T = unknown>(method: string, ...args: unknown[]): Promise<T | void> {
    const inst = await ensureInstance()
    const fn = inst?.[method]
    if (typeof fn !== 'function') {
      console.warn(`[Aiuta] Method ${method} not working`)
      return
    }
    return await fn.apply(inst, args)
  }
} as const

export default boot(() => {
  void ensureInstance()
})
