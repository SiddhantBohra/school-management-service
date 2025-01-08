import globals from "globals"
import pluginJs from "@eslint/js"
import pluginJest from "eslint-plugin-jest"

/** @type {import('eslint').Linter.Config[]} */
export default [
    {
        files: ["**/*.js"],
        plugins: {
            jest: pluginJest,
        },
        languageOptions: {
            globals: {
                ...globals.node,
                ...globals.jest,
            },
        },
        rules: {
            ...pluginJs.configs.recommended.rules,
            "no-unused-vars": "off",
        },
    }
]