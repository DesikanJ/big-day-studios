/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL: string;
  readonly PUBLIC_WHATSAPP_NUMBER: string;
  readonly PUBLIC_WEB3FORMS_ACCESS_KEY: string;
  readonly PUBLIC_CLOUDINARY_CLOUD_NAME: string;
  readonly PUBLIC_CLOUDINARY_FOLDER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
