module.exports = {
  ci: {
    collect: {
      staticDistDir: './public',
    },
    assert: {
      assertions: {
        'categories:performance': ['error', {minScore: 1}],
        'categories:accessibility': ['error', {minScore: 1}]
      }
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};