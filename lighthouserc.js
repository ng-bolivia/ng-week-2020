module.exports = {
  ci: {
    collect: {
      staticDistDir: './public',
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', {minScore: .5}],
        'categories:accessibility': ['error', {minScore: .5}]
      }
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};