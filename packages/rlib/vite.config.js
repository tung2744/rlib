import { defineConfig } from "vite";
import ts from "typescript";

const entries = {
  index: "./src/index.ts",
};

export default defineConfig({
  build: {
    emptyOutDir: false,
    lib: {
      entry: entries,
      formats: ["es", "cjs"],
      fileName: (format, entryName) => {
        if (entryName === "index") {
          return `index.${format === "cjs" ? "js" : "mjs"}`;
        }
        return `${entryName}/index.${format === "cjs" ? "cjs" : "mjs"}`;
      },
    },
    rollupOptions: {
      external: ["react"],
    },
  },
  plugins: [
    {
      name: "gen-types",
      closeBundle() {
        genTypes();
      },
    },
  ],
});

function genTypes() {
  console.info("Generating type declarations...");
  ts.createProgram(Object.values(entries), {
    strict: true,
    skipLibCheck: true,
    declaration: true,
    emitDeclarationOnly: true,
    declarationDir: "./dist",
    rootDir: "./src",
  }).emit();
  console.info("Done.");
}
