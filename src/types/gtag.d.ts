/**
 * Google Analytics gtag type declarations
 */

interface GtagCommand {
  (command: 'config', targetId: string, config?: Record<string, unknown>): void
  (command: 'event', eventName: string, eventParams?: Record<string, unknown>): void
  (command: 'js', date: Date): void
  (command: 'set', targetId: string, config?: Record<string, unknown>): void
}

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag: GtagCommand
  }
}

export {}

