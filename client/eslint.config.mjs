import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import prettier from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  js.configs.recommended,
  {
    plugins: {
      "@next/next": nextPlugin, // 👈 correct plugin key for Next.js
      prettier: prettierPlugin,
    },
    rules: {
      ...nextPlugin.configs["core-web-vitals"].rules,
      "no-console": "warn",
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "prettier/prettier": "error",
    },
  },
  prettier,
];
