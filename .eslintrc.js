/**
 * @type {import('@types/eslint').Linter.BaseConfig}
 */
module.exports = {
	ignorePatterns: ['**/*.d.ts', 'coverage'],
	extends: [
		'@remix-run/eslint-config',
		'@remix-run/eslint-config/node',
		'prettier',
	],
}
