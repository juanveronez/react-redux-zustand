import Player from "react-player";
import { useAppSelector } from "../store";
import { useDispatch } from "react-redux";
import { next } from "../store/slices/player";

export function Video() {
  const lesson = useAppSelector(state => {
    const { currentModuleIndex, currentLessonIndex } = state.player
    return state.player.course.modules[currentModuleIndex].lessons[currentLessonIndex]
  })

  const dispatch = useDispatch()

  const handlePlayNext = () => {
    dispatch(next())
  }

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      <Player
        width="100%"
        height="100%"
        controls
        autoPlay
        src={`https://www.youtube.com/watch?v=${lesson.id}`}
        onEnded={handlePlayNext}
      />
    </div>
  )
}
