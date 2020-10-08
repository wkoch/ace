module.exports = {
    transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.svelte$': 'svelte-jester'
    },
    // preset: 'jest-playwright-preset', Ativar para os testes E2E
};