// Dummy source file for testing path filters
// When you modify this file and push, the multi-trigger.yml workflow should run
// When you modify files outside src/, the workflow should NOT run

console.log("Hello from the app!");
console.log("Modify this file to trigger the CI Pipeline workflow");
console.log("Modify files outside src/ to NOT trigger the workflow");
console.log("This is a dummy file for testing path filters in GitHub Actions");
