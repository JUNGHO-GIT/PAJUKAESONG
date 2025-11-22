interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_PUBLIC_URL: string;
  readonly VITE_APP_SERVER_URL: string;
  readonly VITE_APP_GCLOUD_URL: string;
  readonly VITE_APP_ADMIN_URL: string;
  readonly VITE_APP_NAVER_MAPS_CLIENT_ID: string;
	readonly VITE_APP_ABOUT_URL: string;
	readonly VITE_APP_CONTACT_URL: string;
	readonly VITE_APP_FRANCHISE_URL: string;
	readonly VITE_APP_MENU_URL: string;
	readonly VITE_APP_NOTICE_URL: string;
	readonly VITE_APP_ORDER_URL: string;
	readonly VITE_APP_PRODUCT_URL: string;
	readonly VITE_APP_USER_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
