module.exports = {
	root: true,
	plugins: [
		'testing-library',
		'jest-dom'
	],
	extends: [
		'@nuxtjs/eslint-config-typescript',
		'plugin:testing-library/vue',
		'plugin:jest-dom/recommended'
	],
	rules: {
		'@typescript-eslint/no-unused-vars': process.env.environment === 'production' ? 'error' : 'off',
		'vue/multi-word-component-names': 'off',
		'vue/no-deprecated-slot-attribute': 'off',
		'vue/valid-v-slot': 'off',
		'vue/no-multiple-template-root': 'off',
		indent: ['error', 'tab', { SwitchCase: 1 }],
		'no-tabs': 'off',
		'testing-library/no-node-access': 'off'
	},
	ignorePatterns: ['tests/e2e']
}
