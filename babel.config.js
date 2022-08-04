module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current'
          }
        }
      ],
      '@babel/preset-typescript'
    ],
    plugins: [
      ['module-resolver', {
        alias: {
          '@domain': './src/core/domain',
          '@entity': './src/core/entity',
          '@repository': './src/core/repository',
          '@usecase': './src/core/usecase',
          '@infra': './src/infra',
          '@adapter' : './src/adapter',
          '@controller' : './src/controller',
          '@http' : './src/http',
          '@route': './src/http/route'
        }
      }]
    ],
    ignore: [
      '**/*.spec.ts'
    ]
  }