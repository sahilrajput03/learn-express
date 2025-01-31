export default {
  scripts: {
    default: "nps dev",
    dev: 'vite dev',
    build: 'vite build',
    preview: 'vite preview',
    prepare: 'svelte-kit sync || echo \'\'',
    check: {
      default: 'svelte-kit sync && svelte-check --tsconfig ./tsconfig.json',
      watch: 'svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch'
    },
    format: 'prettier --write .',
    lint: 'prettier --check . && eslint .'
  }
};
