import { render, screen, act } from '@testing-library/react'
import { vi } from 'vitest'
import '@testing-library/jest-dom/extend-expect' // Import for additional matchers

import App from './App'

beforeAll(() => {
  vi.useFakeTimers()
})
afterAll(() => {
  vi.useRealTimers()
})
beforeEach(() => {
  vi.clearAllTimers()
  vi.setSystemTime(0)
})
describe('App', () => {
  describe('CountdownTimer', () => {
    test('should displays correct countdown and "Time\'s up!" message', async () => {
      render(<App />)

      // Initial render should show 60 seconds remaining
      expect(screen.getByText('60 seconds remaining')).toBeInTheDocument()

      // Fast forward 59 seconds
      await act(async () => {
        vi.advanceTimersByTimeAsync(59000) // 59 seconds
      })
      // After 59 seconds, it should display "1 second remaining"
      expect(screen.getByText('1 seconds remaining')).toBeInTheDocument()

      // Fast forward 1 more second
      await act(async () => {
        vi.advanceTimersByTimeAsync(1000) // 1 second
      })
      // After 60 seconds, it should display "Time's up!"
      expect(screen.getByText("Time's up!")).toBeInTheDocument()
    })
  })
})
