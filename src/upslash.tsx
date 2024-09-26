import { createApi } from 'unsplash-js';

const unsplash = createApi({
  accessKey:import.meta.env.VITE_UPSLASH_KEY!,
});

export default unsplash;
