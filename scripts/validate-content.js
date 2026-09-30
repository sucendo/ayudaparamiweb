const { runValidation } = require('../lib/content/validate');

try {
  runValidation();
  console.log('Content validation OK');
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
