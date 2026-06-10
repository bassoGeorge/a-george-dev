// import '@testing-library/jest-dom/vitest';
import * as matchers from '@testing-library/jest-dom/matchers'
import { cleanup } from '@testing-library/react'
import { afterEach, expect } from 'vitest'

console.log('--->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
expect.extend(matchers)
afterEach(() => {
  console.log('.... cleaning up!')
  cleanup()
})
