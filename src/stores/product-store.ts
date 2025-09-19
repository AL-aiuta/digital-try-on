import { defineStore, acceptHMRUpdate } from 'pinia';

export const useProductStore = defineStore('product', {
  state: () => ({
    list: [
      {
        "url": "https://storage.googleapis.com/aiuta_prod_external_api_images/external_api/user/web_tools/uploaded_images/user_image-71f91730-50e3-4be0-8fc0-40e6461638ed.jpeg",
        "id": "A155850CHBI9XXAM",
        "title": "Diesel T-Adjust Q8 Maglietta T-Shirt"
      },
      {
        "url": "https://storage.googleapis.com/aiuta_prod_external_api_images/external_api/user/web_tools/uploaded_images/user_image-c31c20b5-65a8-47fb-8eae-513dfc8d532d.jpeg",
        "id": "A113020HGAM",
        "title": "T-Boggy-Megoval-D, T-shirt with maxi oval D embroidery"
      },
      {
        "url": "https://storage.googleapis.com/aiuta_prod_external_api_images/external_api/user/web_tools/uploaded_images/user_image-adfbbf56-49ee-48ea-8502-130a3fa2b44d.jpeg",
        "id": "CUMU0213A5UTC543WDB62",
        "title": "Blue poplin bowling shirt with Wolves, Ravens and Doves print"
      },
      {
        "url": "https://storage.googleapis.com/aiuta_prod_external_api_images/external_api/user/web_tools/uploaded_images/user_image-dc9b4ecf-fe5e-44f1-aab1-1fbf302417c8.jpeg",
        "id": "CUJU0061A2USCV35MMN99",
        "title": "Black marble denim oversized shirt"
      },
      {
        "url": "https://storage.googleapis.com/aiuta_prod_external_api_images/external_api/user/web_tools/uploaded_images/user_image-c0b2aad9-fb9a-4f2a-b14a-39da25f54414.jpeg",
        "id": "POMG0072Q2UFH546ARW06",
        "title": "Long sleeved ivory polo shirt with intarsia Argyle detail"
      },
      {
        "url": "https://storage.googleapis.com/aiuta_prod_external_api_images/external_api/user/web_tools/uploaded_images/user_image-b792c3ea-23ca-445d-8d27-9336bd2ca3cf.jpeg",
        "id": "ABMA1361U0TW83900N60",
        "title": "Short grey wool dress with Marni Symbol"
      },
      {
        "url": "https://storage.googleapis.com/aiuta_prod_external_api_images/external_api/user/web_tools/uploaded_images/user_image-417b6e3d-9b3c-4d2d-aa2e-49d1c9223c1c.jpeg",
        "id": "GOMA0459S3UTP749WR00N99",
        "title": "Black taffeta wide skirt with Marni Symbol"
      },
      {
        "url": "https://storage.googleapis.com/aiuta_prod_external_api_images/external_api/user/web_tools/uploaded_images/user_image-af4887f8-b8ff-4342-982e-f3b7a54295c7.jpeg",
        "id": "CVMD0150EQUFX385BLN15",
        "title": "Grey cashmere colour block polo shirt with Marni Symbol"
      },
      {
        "url": "https://storage.googleapis.com/aiuta_prod_external_api_images/external_api/user/web_tools/uploaded_images/user_image-2468b94e-ec91-4bf3-87d8-a4cc237d0ece.jpeg",
        "id": "PAMX0549U0ULA73600B61",
        "title": "Blue nappa shorts"
      },
      {
        "url": "https://storage.googleapis.com/aiuta_prod_external_api_images/external_api/user/web_tools/uploaded_images/user_image-c3b539a0-b64d-4c43-989e-a94cbb696b6d.jpeg",
        "id": "3GX5UQA7",
        "title": "The Siena Cotton Knit Polo Top"
      },
      {
        "url": "https://storage.googleapis.com/aiuta_prod_external_api_images/external_api/user/web_tools/uploaded_images/user_image-f879cec5-9105-47d1-a234-08f7d0c25d2e.jpeg",
        "id": "D5TDID2A",
        "title": "Jace Plisse Top"
      },
      {
        "url": "https://storage.googleapis.com/aiuta_prod_external_api_images/external_api/user/web_tools/uploaded_images/user_image-fd5685ca-7784-47ba-bcfa-d2f55a0d8d77.jpeg",
        "id": "DN6ZCM7U",
        "title": "Jude Stretch High-Rise Croppd Wide-Leg Jeans"
      },
      {
        "url": "https://storage.googleapis.com/aiuta_prod_external_api_images/external_api/user/web_tools/uploaded_images/user_image-543189af-114a-456b-ba7f-fb2f56a70329.jpeg",
        "id": "STLC81ZP",
        "title": "Strapless draped sateen mini dress"
      },
      {
        "url": "https://storage.googleapis.com/aiuta_prod_external_api_images/external_api/user/web_tools/uploaded_images/user_image-a58a14f1-bb2f-4b7f-a840-1495e143bc3e.jpeg",
        "id": "CJMYDCEA",
        "title": "Power poplin shirt"
      },
      {
        "url": "https://storage.googleapis.com/aiuta_prod_external_api_images/external_api/user/web_tools/uploaded_images/user_image-d11568a1-7d4b-4b91-9807-9e4f8c8a6f45.jpeg",
        "id": "blanknyc-gingerbread-latte-jacket",
        "title": "BLANKNYC"
      },
      {
        "url": "https://storage.googleapis.com/aiuta_prod_external_api_images/external_api/user/web_tools/uploaded_images/user_image-1d38be76-8add-453d-9392-66658017eb95.jpeg",
        "id": "boss-jaleda-tailored-blazer",
        "title": "BOSS"
      },
      {
        "url": "https://storage.googleapis.com/aiuta_prod_external_api_images/external_api/user/web_tools/uploaded_images/user_image-ce80b294-5305-4041-8cf3-9aed261284e2.jpeg",
        "id": "toccin-x-rtr-sleeveless-tie-waist-shirt-dress",
        "title": "TOCCIN X RTR"
      },
      {
        "url": "https://storage.googleapis.com/aiuta_prod_external_api_images/external_api/user/web_tools/uploaded_images/user_image-cdcf66e8-9e25-48fa-8b31-59b259b8710d.jpeg",
        "id": "770296012",
        "title": "Linen Peasant Blouse"
      },
      {
        "url": "https://storage.googleapis.com/aiuta_prod_external_api_images/external_api/user/web_tools/uploaded_images/user_image-17700bf5-a49f-4b09-8ee0-aed938d73d27.jpeg",
        "id": "722656052",
        "title": "Cotton Poplin Maxi Skirt"
      },
      {
        "url": "https://storage.googleapis.com/aiuta_prod_external_api_images/external_api/user/web_tools/uploaded_images/user_image-9b276f67-8c3a-44cf-a0d3-cb7bc3ff886e.webp",
        "id": "FBO9EY0Y",
        "title": "crystal snake track suit"
      },
      {
        "url": "https://storage.googleapis.com/aiuta_prod_external_api_images/external_api/user/web_tools/uploaded_images/user_image-db8e9610-021f-42a5-a596-8a232bcc561e.webp",
        "id": "W5GD02D3",
        "title": "Packer coat"
      },
      {
        "url": "https://storage.googleapis.com/aiuta_prod_external_api_images/external_api/user/web_tools/uploaded_images/user_image-595ba67f-e146-45a7-9c16-c9720b1d1d8c.webp",
        "id": "B0NF076M",
        "title": "cotton-silk polo shirt"
      },
      {
        "url": "https://storage.googleapis.com/aiuta_prod_external_api_images/external_api/user/web_tools/uploaded_images/user_image-c7cfc5ec-2ea5-4791-9d2a-9afeb75e7dc2.webp",
        "id": "MZW3M1U1",
        "title": "checkered short-sleeved shirt"
      },
      {
        "url": "https://storage.googleapis.com/aiuta_prod_external_api_images/external_api/user/web_tools/uploaded_images/user_image-34797cff-a186-48bf-8fe3-8eb3753ff198.webp",
        "id": "H60VZ4LD",
        "title": "printed bowling shirt"
      },
      {
        "url": "https://storage.googleapis.com/aiuta_prod_external_api_images/external_api/user/web_tools/uploaded_images/user_image-eeec76f5-8ccf-4050-b16c-897ef6d3115a.jpeg",
        "id": "XDTKLIQO",
        "title": "Giles linen shirt"
      },
      {
        "url": "https://storage.googleapis.com/aiuta_prod_external_api_images/external_api/user/web_tools/uploaded_images/user_image-57842aef-6485-4360-a3cd-3e9bb5124f15.jpeg",
        "id": "HDQRJITH",
        "title": "Classic Wool Suit"
      }
    ],
  }),

  getters: {},

  actions: {},
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProductStore, import.meta.hot));
}
