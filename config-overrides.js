const { override, addLessLoader } = require('customize-cra')

module.exports = override(
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: {
        '@primary-color': '#1890ff', // пример изменения темы Ant Design
      },
    },
  })
)
