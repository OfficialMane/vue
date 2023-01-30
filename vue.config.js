const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})


// const path = require('path');

// module.exports = {
//   outputDir: path.resolve(__dirname, '../server/public'),
//   devServer: {
//     proxy: {
//       '/lessons': {
//         target: 'http://localhost:5000'
//       },
//       '/orders': {
//         target: 'http://localhost:5000'
//       },
//       '/search': {
//         target: 'http://localhost:5000'
//       }
//     }
//   }
// }
