import { describe, expect, it } from 'vitest'
import { play, next, player as reducer } from './player'

const exempleState = {
    course: {
      modules: [
        {
          id: '1',
          title: 'Iniciando com React',
          lessons: [
            { id: 'Jai8w6K_GnY', title: 'CSS Modules', duration: '13:45' },
            { id: 'w-DW4DhDfcw', title: 'Estilização do Post', duration: '10:05' },
          ],
        },
        {
          id: '2',
          title: 'Estrutura da aplicação',
          lessons: [
            { id: 'gE48FQXRZ_o', title: 'Componente: Comment', duration: '13:45' },
            { id: 'Ng_Vk4tBl0g', title: 'Responsividade', duration: '10:05' },
          ],
        },
      ],
    },
    currentModuleIndex: 0,
    currentLessonIndex: 0,
  }

describe('Player slice', () => {
  it('should be able to play', () => {
    const state = reducer(exempleState, play([1,2]))

    expect(state.currentModuleIndex).toEqual(1)
    expect(state.currentLessonIndex).toEqual(2)
  })

  it('should be able to play next video', () => {
    const state = reducer(exempleState, next())

    expect(state.currentModuleIndex).toEqual(0)
    expect(state.currentLessonIndex).toEqual(1)
  })

  it('should be able to jump to the next module when is the last video of module', () => {
    const initialState = {...exempleState, currentLessonIndex: 1}

    const state = reducer(initialState, next())

    expect(state.currentModuleIndex).toEqual(1)
    expect(state.currentLessonIndex).toEqual(0)
  })

  it('should not update the current module and lesson when is the final lesson available', () => {
    const initialState = {...exempleState, currentLessonIndex: 1, currentModuleIndex: 1}

    const state = reducer(initialState, next())

    expect(state.currentModuleIndex).toEqual(1)
    expect(state.currentLessonIndex).toEqual(1)
  })
})
