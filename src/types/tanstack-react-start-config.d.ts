declare module "@tanstack/react-start/config" {
  import type { ConfigEnv, UserConfig } from "vite";

  export function defineConfig(config: unknown): (env: ConfigEnv) => Promise<UserConfig>;
}
