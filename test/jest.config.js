/* eslint-disable @typescript-eslint/no-var-requires */
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('../tsconfig.json');
const dotenv = require('dotenv');
const path = require('path');
const { name } = require('../package.json');

dotenv.config({ path: path.resolve(__dirname + '/../../.env') });

console.log(
  'path',
  pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
);
module.exports = {
  displayName: name,
  roots: ['..'],
  preset: 'ts-jest',
  testMatch: ['**/root.e2e-test.ts'],
  coveragePathIgnorePatterns: ['index.ts', 'node_modules', 'jest.config.js'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  setupFilesAfterEnv: ['./test/initialization.ts'],
  rootDir: '..',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json', 'ts'],
};
