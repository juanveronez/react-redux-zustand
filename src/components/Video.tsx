import Player from "react-player";
import { useDispatch } from "react-redux";
import { next, useCurrentLesson } from "../store/slices/player";

export function Video() {
  const { currentLesson } = useCurrentLesson()

  const dispatch = useDispatch()

  const handlePlayNext = () => {
    dispatch(next())
  }

  if (!currentLesson) return null

  return (
    <div className="w-full bg-zinc-950 aspect-video">
      <Player
        width="100%"
        height="100%"
        controls
        autoPlay
        src={`https://www.youtube.com/watch?v=${currentLesson.id}`}
        onEnded={handlePlayNext}
      />
    </div>
  )
}
