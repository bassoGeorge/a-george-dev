import { installGlobals } from '@remix-run/node';
// import "@testing-library/jest-dom/extend-expect";
import matchers from '@testing-library/jest-dom/matchers';
import { expect } from 'vitest';

expect.extend(matchers);

installGlobals();
