import { makeVar } from '@apollo/client'

/**
 * Creates a field policy for a reactive variable. This is to perist local state in the Apollo cache.
 * @param reactiveVar The reactive variable to create a field policy for.
 * @returns A field policy for the reactive variable.
 */
export const createFieldPolicy = <T>(reactiveVar: ReturnType<typeof makeVar<T>>) => ({
  read() {
    return reactiveVar()
  },
  write(_, newValue: T) {
    reactiveVar(newValue)
    return newValue
  },
})
