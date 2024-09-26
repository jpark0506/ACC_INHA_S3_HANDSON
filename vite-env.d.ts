interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_KEY: string;
  readonly VITE_UPSLASH_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
