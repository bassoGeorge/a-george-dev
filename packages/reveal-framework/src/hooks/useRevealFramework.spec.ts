import { renderHook, waitFor } from '@testing-library/react'
import type { RefObject } from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const mockInitialize = vi.fn().mockResolvedValue(undefined)

vi.mock('reveal.js', () => ({
  // Regular function (not arrow) so it can be called with `new`
  // biome-ignore lint/suspicious/noExplicitAny: constructor mock requires any
  default: vi.fn(function (this: any) {
    this.initialize = mockInitialize
  }),
}))

// Import after mock is hoisted
const { useRevealFramework } = await import('./useRevealFramework')

import Reveal from 'reveal.js'

describe('useRevealFramework', () => {
  beforeEach(() => {
    vi.mocked(Reveal as unknown as () => void).mockClear()
    mockInitialize.mockClear()
  })

  it('initialises a Reveal deck when the ref element is available', async () => {
    const div = document.createElement('div')
    const ref = { current: div } as RefObject<HTMLDivElement>

    renderHook(() => useRevealFramework(ref))

    await waitFor(() => {
      expect(Reveal).toHaveBeenCalledWith(div, expect.any(Object))
    })
    expect(mockInitialize).toHaveBeenCalled()
  })

  it('does nothing when the ref has no element', async () => {
    const ref = { current: null } as unknown as RefObject<HTMLDivElement>

    renderHook(() => useRevealFramework(ref))

    await new Promise((r) => setTimeout(r, 50))
    expect(Reveal).not.toHaveBeenCalled()
  })
})
