# My Bun app

Bun is a new JavaScript runtime that is faster and more efficient than Node.js

> bun run is roughly 28x faster than npm run (6ms vs 170ms of overhead).

## Under the hood
uses JavaScriptCore, the engine that powers Safari
faster than V8 (Node.js and Chromium browsers)
written in Zig
4 times faster than Node.js

## Resources

[Bun's GitHub repo](https://github.com/oven-sh/bun)

[Bun docs](https://bun.sh/docs)

## Features
- **prints Hello, World!** in at http://localhost:3000
- **hot reloads** on file changes if --watch flag is set
- **debugging** with breakpoints and stepping - either attached to a running process or from a file
- **scaffolding** with `bun init`
- **script running** with `bun run` or `bun <script>`
- **ASCII art** with package figlet for Hello, World!

## devcontainer

devcontainer.json

```json
{
    "name": "Bun dev environment",
    "image": "oven/bun",
    "customizations": {
      "vscode": {
        "extensions": [
          "oven.bun-vscode"
        ]
      }
    },
    "postStartCommand": "bun --version"
  }
```

## Quick Start

```bash
bun init
```
will scaffold a new bun project including:
tsconfig.json
package.json
index.ts

### run a file

```bash
bun run index.ts
```
or
```bash
bun index.ts
```

### reload on change

```bash
bun --watch run index.ts
```

### run a script

package.json
```json
{
  "name": "quickstart",
  "module": "index.ts",
  "type": "module",
  "scripts": {
    "start": "bun run index.ts"
  },
  "devDependencies": {
    "@types/bun": "^1.0.0"
  }
}
```bash

then

```bash
bun run start
```

## install typescript definitions

```bash
bun add -d @types/bun
```

## debugging

You can either attach to a running bun process or run a bun process in debug mode from a file or script.

I found running from a file easier to configure.

### from a file

```json
{
"version": "0.2.0",
    "configurations": [

        {
            "type": "bun",
            "internalConsoleOptions": "neverOpen",
            "request": "launch",
            "name": "Debug File",
            "program": "${file}",
            "cwd": "${workspaceFolder}",
            "stopOnEntry": false,
            "watchMode": false
        }
    ]
}
```

1. Open the file in VS Code that you want to debug e.g., index.ts and make a breakpoint

1. Start the debugger with `Debug File`

1. Open http://localhost:3000 in a browser to trigger the debugger

### attached process

```json
{
"version": "0.2.0",
    "configurations": [

        {
            "type": "bun",
            "internalConsoleOptions": "neverOpen",
            "request": "attach",
            "name": "Attach Bun",
            "url": "ws://localhost:6499/1hl86z5ajg",
            "stopOnEntry": false
        }
    ]
}
```

1. At terminal in VS Code, run `bun --inspect index.ts` to start the debugger.

1. Copy the listening ws url from the terminal output and paste it into  `url` field in the launch.json file. e.g., ws://localhost:6499/vlmoiccdza

1. Make a breakpoint in the code and start the debugger.

1. Open http://localhost:3000 in a browser to trigger the debugger with `Attach bun`.

> You can put both configs in the launch.json file and select the one you want to run from the debugger menu.