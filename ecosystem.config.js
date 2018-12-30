module.exports = {
  apps: [{
    name: 'luogudrawer',
    script: 'src/index.js',

    args: '',
    instances: 1,
    autorestart: true,
    exec_interpreter: "babel-node",

    watch: false,
    max_memory_restart: '100M',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
}
