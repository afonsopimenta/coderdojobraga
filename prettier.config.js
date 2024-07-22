/**
 * @type {import("prettier").Config &
 *        import("prettier-plugin-tailwindcss").PluginOptions &
 *        import("@ianvs/prettier-plugin-sort-imports").PluginConfig}
 * */
const config = {
  plugins: [
    "@ianvs/prettier-plugin-sort-imports",
    "prettier-plugin-tailwindcss",
  ],
  tailwindFunctions: ["cn"],
  importOrder: [
    "",
    "^react($|/)",
    "^next($|/)",
    "<BUILTIN_MODULES>",
    "<THIRD_PARTY_MODULES>",
    "",
    "^~/",
    "^[.]",
  ],
  importOrderTypeScriptVersion: "5.4.2",
};

export default config;
