#! /bin/bash

export BASE=/Volumes/StorageDrive/jmthompson/git/react-components
export BIN=${BASE}/node_modules/rollup/dist/bin

${BIN}/rollup -c
${BIN}/rollup -c rollup.config.terser.js
