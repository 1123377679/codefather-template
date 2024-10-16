// .vuepress/theme/index.js
module.exports = {
    extend: '@vuepress/theme-default',
    async head() {
        return [
            ['meta', { name: 'referrer', content: 'no-referrer' }]
        ];
    },
}
