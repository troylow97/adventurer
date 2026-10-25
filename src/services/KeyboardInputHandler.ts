import type { MoveCommand } from '../models/Direction'

const KEY_COMMANDS: Record<string, MoveCommand> = {
  arrowup: 'UP',
  w: 'UP',
  arrowdown: 'DOWN',
  s: 'DOWN',
  arrowleft: 'LEFT',
  a: 'LEFT',
  arrowright: 'RIGHT',
  d: 'RIGHT',
}

export class KeyboardInputHandler {
  constructor(private readonly onMove: (command: MoveCommand) => void) {}

  attach(target: Window): () => void {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey) {
        return
      }

      const eventTarget = event.target
      if (
        eventTarget instanceof HTMLElement &&
        (eventTarget.isContentEditable ||
          eventTarget.closest('input, textarea, select, [contenteditable="true"]'))
      ) {
        return
      }

      const command = KEY_COMMANDS[event.key.toLowerCase()]
      if (!command) {
        return
      }

      event.preventDefault()
      this.onMove(command)
    }

    target.addEventListener('keydown', handleKeyDown)
    return () => target.removeEventListener('keydown', handleKeyDown)
  }
}
