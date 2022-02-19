/// <reference types="@sveltejs/kit" />
declare namespace NodeJS {
  interface ProcessEnv {
    readonly BASE_URL: string
    readonly PRERENDER_BASE_URL: string
  }
}
