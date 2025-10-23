import { FlatCompat } from "@eslint/eslintrc";

import simpleImportSort from "eslint-plugin-simple-import-sort";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "out/**",
      "build/**",
      "dist/**",
      "coverage/**",
      "next-env.d.ts",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": [
        "warn",
        {
          groups: [
            ["^react", "^next", "^clsx"],
            [
              "^@/src/",
              "^@/app/",
              "^@/pages/",
              "^@/widgets/",
              "^@/features/",
              "^@/entities/",
              "^@/shared/",
              "^@",
            ],
            ["^\\.\\./", "^\\./", "^\\.{1,2}/.*\\u0000$"],
            ["^.+\\.css$"],
          ],
        },
      ],
      "simple-import-sort/exports": "warn",
    },
  },
];

export default eslintConfig;
