import * as Collapsible from '@radix-ui/react-collapsible'

import { ChevronDown } from "lucide-react";
import { Lesson } from "./Lesson";
import type { FC } from "react";
import { useAppSelector } from '../store';
import { play } from '../store/slices/player';
import { useDispatch } from 'react-redux';

interface ModuleProps {
  moduleIndex: number
  title: string
  lessonsAmount: number
}

export const Module: FC<ModuleProps> = ({ moduleIndex, title, lessonsAmount }) => {
  const lessons = useAppSelector((state) => state.player.course.modules[moduleIndex].lessons)
  const { currentLessonIndex, currentModuleIndex } = useAppSelector((state) => {
    const { currentLessonIndex, currentModuleIndex } = state.player
    return { currentLessonIndex, currentModuleIndex }
  })
  const dispatch = useDispatch()

  return (
    <Collapsible.Root className='group'>
      <Collapsible.Trigger
        className="flex w-full items-center gap-3 bg-zinc-800 p-4 cursor-pointer"
      >
        <div className="flex h-10 w-10 rounded-full items-center justify-center bg-zinc-950 text-xs">
          {moduleIndex + 1}
        </div>

        <div className="flex flex-col gap-1 text-left">
          <strong className="text-sm">{title}</strong>
          <span className="text-sm text-zinc-400">{lessonsAmount} aulas</span>
        </div>

        <ChevronDown className="w-5 h-5 ml-auto text-zinc-400 group-data-[state=open]:rotate-180 transition-transform" />
      </Collapsible.Trigger>
      <Collapsible.Content className="relative flex flex-col gap-4 p-6">
        {lessons.map(({ id, title, duration }, lessonIndex) => (
          <Lesson
            key={id}
            title={title}
            duration={duration}
            isCurrent={currentModuleIndex === moduleIndex && currentLessonIndex === lessonIndex}
            onPlay={() => dispatch(play([moduleIndex, lessonIndex]))}
          />
        ))}
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
