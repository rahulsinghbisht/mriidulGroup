import js from "@eslint/js";

export default [
  js.configs.recommended,
  {
    rules: {
      "no-eval": "error",
      "no-new-func": "error",
      "no-global-assign": "error",
      "security/detect-unsafe-regex": "warn"
    }
  }
];