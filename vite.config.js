import { defineConfig } from "vite";
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

function readLocalCertificate() {
  try {
    return {
      cert: readFileSync(new URL("./.cert/localhost.pem", import.meta.url)),
      key: readFileSync(new URL("./.cert/localhost-key.pem", import.meta.url)),
    };
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    throw new Error(
      "Certificat HTTPS local manquant. Créer .cert/localhost.pem et " +
        ".cert/localhost-key.pem avec mkcert. Voir « HTTPS local » dans README.md.",
    );
  }
}

// Templates are rendered at build time, never shipped as a client framework.
export default defineConfig(({ command, mode }) => {
  const localHttps = command === "serve" && mode === "local-https";
  const https = localHttps ? readLocalCertificate() : undefined;
  const host = localHttps ? "localhost" : "0.0.0.0";

  return {
    server: {
      host,
      https,
      port: 4173,
      strictPort: true,
      allowedHosts: ["terminal.local"],
    },
    preview: {
      host,
      https,
      port: 4173,
      strictPort: true,
      allowedHosts: ["terminal.local"],
    },
    build: { target: "es2022", assetsInlineLimit: 0 },
    plugins: [
      {
        name: "editorial-html",
        handleHotUpdate({ file, server }) {
          if (
            file.endsWith(".mjs") &&
            (file.includes("/src/") || file.includes("/scripts/"))
          ) {
            execFileSync(process.execPath, ["scripts/render.mjs"]);
            server.ws.send({ type: "full-reload" });
            return [];
          }
        },
      },
    ],
  };
});
