// import '@testing-library/jest-dom/vitest';
import * as matchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'
import { beforeEach, expect } from 'vitest'

expect.extend(matchers)
beforeEach(cleanup)
