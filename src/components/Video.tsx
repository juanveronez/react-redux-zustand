import Player from "react-player";
import { useAppSelector } from "../store";

export function Video() {
  const lesson = useAppSelector(state => {
    const { currentModuleIndex, currentLessonIndex } = state.player
    return state.player.course.modules[currentModuleIndex].lessons[currentLessonIndex]
  })

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      <Player
        width="100%"
        height="100%"
        controls
        src={`https://www.youtube.com/watch?v=${lesson.id}`}

      />
    </div>
  )
}
