A prototype of some bits of CATMAID with a modern build system.

Webpack/typescript/babel/lerna

Very much a work in progress.

## Installation

```bash
# dev dependencies
npm install

# subproject dependencies and link together
npm run bootstrap
```

## Compile

```bash
npm run build
```

Open [./dist/index.html](./dist/index.html)

The DOM will be empty but CATMAID-lib etc. will be available in the console.

## Dev server

I had this working, but since then redistributed config files and dependencies between 
the root and subprojects.
It's within reach.
