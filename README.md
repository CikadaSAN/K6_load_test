# Introduction

This README provides instructions for setting up and running performance tests on the Demoblaze.com website using K6 on a macOS system.

## Prerequisites

macOS: Ensure you have a macOS system running a compatible version.

Homebrew: Install Homebrew, a package manager for macOS, using the following command in Terminal:

```
Bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"   
```
## Instalation

Install Node.js: Use Homebrew to install Node.js:

```
Bash
brew install node
```

Install K6: Install K6 globally using npm:

```
Bash
npm install -g k6
```

## Testing Setup

Create K6 Script: In a project directory, create a JavaScript file named demoblaze-test.js (or a preferred name).

Write the K6 Script: In demoblaze-test.js, paste the following code:

```
import http from 'k6/http';

export default function () {
    // Replace with the Demoblaze homepage URL
    const url = 'https://www.demoblaze.com';

    http.get(url);
}
```

##Running the Test

Open Terminal: Launch the Terminal app.

Navigate to Project: Use the cd command to navigate to the directory containing demoblaze-test.js.

Execute the Test: Run the following command:

```
Bash
k6 run demoblaze-test.js
```
