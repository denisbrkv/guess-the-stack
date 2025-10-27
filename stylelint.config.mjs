/** @type {import("stylelint").Config} */

const config = {
  extends: ["stylelint-config-standard"],
  rules: {
    "selector-class-pattern": [
      "^[a-z0-9]+(?:-[a-z0-9]+)*(?:__(?:[a-z0-9]+(?:-[a-z0-9]+)*))?(?:--[a-z0-9]+(?:-[a-z0-9]+)*)?$",
      {
        resolveNestedSelectors: true,
        message: "Expected class selector to follow BEM convention",
      },
    ],
  },
};

export default config;
