export {};
declare global {
  interface Window {
    aiuta?: {
      sdk: {
        tryOn: (skuId: string) => void
      },
      config: {
        webSdkUrl: string,
        subscriptionId: string,
        getJwtUrl: string,
        customCssUrl: strings,
        skuItemsUrl: string,
        apiKey: string
      }
    }
  }
}
