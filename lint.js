const { execSync } = require('child_process');

try {
  execSync('npm run lint', { stdio: 'inherit' });
} catch (error) {
  console.error('Linting failed:', error.message);
  process.exit(1);
}