import { PlayCircle, Video } from "lucide-react";
import type { FC } from "react";

interface LessonProps {
  title: string
  duration: string
  isCurrent?: boolean
  onPlay: () => void
}

export const Lesson: FC<LessonProps> = ({ title, duration, isCurrent, onPlay }) => {
  return (
    <button
      onClick={onPlay}
      disabled={isCurrent}
      data-active={isCurrent}
      className="flex items-center gap-3 text-sm text-zinc-400 data-[active=true]:text-emerald-400 enabled:cursor-pointer enabled:hover:text-zinc-100"
    >
      {isCurrent ? <PlayCircle className="w-4 h-4" /> : <Video className="w-4 h-4 text-zinc-500" />}
      <span>{title}</span>
      <span className="ml-auto font-mono text-xs text-zinc-500">{duration}</span>
    </button>
  )
}
