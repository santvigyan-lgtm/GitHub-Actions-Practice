// =============================================================
// Day 5 — JavaScript Action: Greeting Action
// =============================================================
// Uses @actions/core to get inputs, set outputs, and handle failures
// Install: npm install @actions/core @actions/github
// =============================================================

// NOTE: In a real action, you'd use:
// const core = require('@actions/core');
// const github = require('@actions/github');
// 
// For this exercise, we simulate the @actions/core API
// To use the real API: npm init -y && npm install @actions/core

// Simulated @actions/core for learning purposes
// Replace with: const core = require('@actions/core'); in production
const core = {
    getInput: (name) => process.env[`INPUT_${name.replace(/-/g, '_').toUpperCase()}`] || '',
    setOutput: (name, value) => {
        const filePath = process.env['GITHUB_OUTPUT'];
        if (filePath) {
            const fs = require('fs');
            fs.appendFileSync(filePath, `${name}=${value}\n`);
        }
        console.log(`::set-output name=${name}::${value}`);
    },
    setFailed: (message) => {
        console.log(`::error::${message}`);
        process.exitCode = 1;
    },
    info: (message) => console.log(message),
    warning: (message) => console.log(`::warning::${message}`),
    error: (message) => console.log(`::error::${message}`),
};

// ---- ACTION LOGIC ----

try {
    // Get inputs defined in action.yml
    const nameToGreet = core.getInput('who-to-greet');
    const greetingStyle = core.getInput('greeting-style') || 'casual';

    // Validate inputs
    if (!nameToGreet) {
        core.setFailed('Input "who-to-greet" is required but was not provided!');
        process.exit(1);
    }

    // Generate greeting based on style
    let greeting;
    switch (greetingStyle) {
        case 'formal':
            greeting = `Good day, esteemed ${nameToGreet}. It is a pleasure to greet you.`;
            break;
        case 'pirate':
            greeting = `Ahoy, ${nameToGreet}! Welcome aboard, matey! 🏴‍☠️`;
            break;
        case 'casual':
        default:
            greeting = `Hey ${nameToGreet}! 👋 Welcome to GitHub Actions!`;
            break;
    }

    // Get the current time
    const time = new Date().toISOString();

    // Print the greeting
    core.info(`🎉 ${greeting}`);
    core.info(`⏰ Greeting time: ${time}`);
    core.info(`📝 Style: ${greetingStyle}`);

    // Set outputs for use in later steps
    core.setOutput('greeting-time', time);
    core.setOutput('greeting-message', greeting);

    core.info('✅ Greeting action completed successfully!');

} catch (error) {
    core.setFailed(`Action failed with error: ${error.message}`);
}
