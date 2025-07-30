import { Header } from "../components/Header";
import { Video } from "../components/Video";
import { Module } from "../components/Module";
import { FeedbackButton } from "../components/FeedbackButton";
import { useAppSelector } from "../store";
import { start, useCurrentLesson, type Course } from "../store/slices/player";
import { useEffect } from "react";
import { api } from "../libs/axios";
import { useDispatch } from "react-redux";

export function Player() {
  const modules = useAppSelector((state) => state.player.course?.modules)

  const { currentLesson } = useCurrentLesson()
  const dispatch = useDispatch()

  useEffect(() => {
    if (currentLesson) {
      document.title = `Assistindo: ${currentLesson.title}`
    }
  }, [currentLesson])

  useEffect(() => {
    api.get<Course>('courses/1').then(({ data }) => {
      dispatch(start(data))
    })
  }, [dispatch])

  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex w-[1100px] flex-col gap-6">
        <div className="flex items-center justify-between">
          <Header />
          <FeedbackButton />
        </div>
        <main className="flex relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow pr-80">
          <div className="flex-1">
            <Video />
          </div>
          <aside className="absolute top-0 bottom-0 right-0 w-80 border-l border-zinc-800 bg-zinc-900 divide-y-2 divide-zinc-900 overflow-y-scroll scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800">
            {modules?.map(({ id, lessons, title }, index) => (
              <Module
                key={id}
                moduleIndex={index}
                title={title}
                lessonsAmount={lessons.length}
              />
            ))}
          </aside>
        </main>
      </div>
    </div>
  )
}
