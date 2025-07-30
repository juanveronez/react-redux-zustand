import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "..";

export interface Course {
  id: number
  modules: Array<{
    id: number
    title: string
    lessons: Array<{
      id: string
      title: string
      duration: string
    }>
  }>
}

export interface PlayerState {
  course: Course | null
  currentModuleIndex: number
  currentLessonIndex: number
}

const initialState: PlayerState = {
  course: null,
  currentModuleIndex: 0,
  currentLessonIndex: 0,
}

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    start: (state, { payload }: PayloadAction<Course>) => {
      state.course = payload
    },
    play: (state, { payload }: PayloadAction<[number, number]>) => {
      const [moduleIndex, lessonIndex] = payload
      state.currentModuleIndex = moduleIndex
      state.currentLessonIndex = lessonIndex
    },
    next: (state) => {
      const nextLessonIndex = state.currentLessonIndex + 1
      const nextLesson = state.course?.modules[state.currentModuleIndex].lessons[nextLessonIndex]

      if (nextLesson) {
        state.currentLessonIndex = nextLessonIndex
      } else {
        const nextModuleIndex = state.currentModuleIndex + 1
        const nextModule = state.course?.modules[nextModuleIndex]

        if (nextModule) {
          state.currentModuleIndex = nextModuleIndex
          state.currentLessonIndex = 0
        }
      }
    }
  },
})

export const player = playerSlice.reducer

export const { play, next, start } = playerSlice.actions

export const useCurrentLesson = () => useAppSelector(state => {
  const { currentModuleIndex, currentLessonIndex } = state.player

  const currentModule = state.player.course?.modules[currentModuleIndex]
  const currentLesson = currentModule?.lessons[currentLessonIndex]

  return { currentModule, currentLesson }
})
