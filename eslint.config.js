import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'
import tsParser from '@typescript-eslint/parser'
import tseslint from 'typescript-eslint'

export default [
    { plugins: { '@typescript-eslint': tseslint.plugin, vue } },

    js.configs.recommended,
    ...vue.configs['flat/recommended'],

    ...tseslint.configs.recommendedTypeChecked.map((c) => ({
        ...c,
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: ['./tsconfig.json'],
                tsconfigRootDir: import.meta.dirname,
            },
        },
    })),

    {
        files: ['**/*.vue'],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: tsParser,
                project: ['./tsconfig.json'],
                tsconfigRootDir: import.meta.dirname,
                extraFileExtensions: ['.vue'],
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
        },
    },

    ...tseslint.configs.recommended.map((c) => ({
        files: ['**/*.vue'],
        rules: { ...(c.rules ?? {}) },
    })),

    {
        rules: {
            'vue/max-attributes-per-line': ['warn', {
                singleline: { max: 3 },
                multiline: { max: 1 },
            }],
            'vue/html-self-closing': ['warn', {
                html: { void: 'always', normal: 'never', component: 'always' },
                svg: 'always',
                math: 'always',
            }],
            'vue/singleline-html-element-content-newline': 'off',
            'vue/multi-word-component-names': 'off',
            '@typescript-eslint/no-unsafe-argument': 'off',
        },
    },
]
