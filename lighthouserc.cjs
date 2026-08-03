module.exports = {
  ci: {
    collect: {
      startServerCommand: 'pnpm preview --host 127.0.0.1 --port 4322',
      startServerReadyPattern: 'Local',
      url: [
        'http://127.0.0.1:4322/',
        'http://127.0.0.1:4322/privacy/',
        'http://127.0.0.1:4322/terms/',
      ],
      numberOfRuns: 3,
      settings: {
        chromeFlags: '--headless --no-sandbox --disable-dev-shm-usage',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
      },
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.96 }],
        'categories:accessibility': ['error', { minScore: 1 }],
        'categories:best-practices': ['error', { minScore: 0.96 }],
        'categories:seo': ['error', { minScore: 1 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 200 }],
      },
    },
    upload: {
      target: 'filesystem',
      outputDir: '.lighthouseci',
    },
  },
};
