const { spawnSync } = require('child_process');

const version = process.env.BABEL_VERSION;

test(`[${version}] MatchPattern function should be invoked with the expected context`, (done) => {
  spawnSync('npm', ['uninstall', '@babel/core']);
  spawnSync('npm', ['install', '--save-exact', '--no-save', `@babel/core@${version}`]);
  const babel = require('@babel/core');
  const babelOptions = {
    caller: {
      name: 'test'
    },
    include: (filename, context) => {
      expect(babel.version).toMatch(new RegExp(`^${version}`))
      expect(context).not.toHaveProperty('callee');
      expect(context).toHaveProperty('caller', { name: 'test'});
      expect(context).toHaveProperty('dirname', process.cwd());
      done();
    }
  };
  babel.transformFileSync(`${__dirname}/fixture.js`, babelOptions);
});


