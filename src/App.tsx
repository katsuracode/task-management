import { useEffect, useRef, useState } from 'react'
import Content from './components/Content'
import Sidebar from './components/Sidebar'
import { samples } from './data/sample'
import { generateUniqueId } from './utils/IdUtils'
import { type Project } from './types/index'

function App() {
  // プロジェクト追加・削除用
  const [projectList, setProjectList] = useState<Array<Project>>(samples)
  const [isFormOpen, setIsFormOpen] = useState(false)

  // プロジェクト編集(タスク追加・削除)用
  const [projectId, setProjectId] = useState(0)

  const prevProjectIdRef = useRef<number>(0)

  useEffect(() => {
    if (prevProjectIdRef.current !== projectId && projectId !== 0) {
      // プロジェクトが切り替わった時の処理
      console.log(`Project changed from ${prevProjectIdRef.current} to ${projectId}`)
    }
    prevProjectIdRef.current = projectId
  }, [projectId])

  const handleOpenForm = () => {
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setProjectId(0)
  }

  const handleAddProject = (project: Project) => {
    setProjectList((prevList) => [project, ...prevList])
    setIsFormOpen(false)
  }

  const handleDeleteProject = (id: number) => {
    setProjectList((prevList) => prevList.filter((project) => project.id !== id))
    setProjectId(0)
  }

  const handleSeletectProject = (id: number) => {
    setProjectId(id)
    setIsFormOpen(false)
  }

  const handleAddTask = (projectId: number, description: string) => {
    // 指定されたプロジェクトが探し、タスクを追加する
    const taskId = generateUniqueId()

    setProjectList((prevList) => {
      return prevList.map((project) => {
        if (project.id === projectId) {
          return { ...project, taskList: [{ id: taskId, description }, ...project.taskList] }
        } else {
          return project
        }
      })
    })
  }

  const handleDeleteTask = (projectId: number, taskId: number) => {
    // 指定されたプロジェクトが探し、指定されたタスクIDのタスクを削除する

    setProjectList((prevList) => {
      return prevList.map((project) => {
        if (project.id === projectId) {
          return { ...project, taskList: project.taskList.filter((task) => task.id !== taskId) }
        } else {
          return project
        }
      })
    })
  }

  return (
    <>
      <main className="my-8 flex h-screen gap-8">
        <Sidebar
          onOpenForm={handleOpenForm}
          onSelectProject={handleSeletectProject}
          projectList={projectList}
        />
        <Content
          isFormOpen={isFormOpen}
          onOpenForm={handleOpenForm}
          onCloseForm={handleCloseForm}
          onAddProject={handleAddProject}
          onDeleteProject={handleDeleteProject}
          projectList={projectList}
          projectId={projectId}
          onAddTask={handleAddTask}
          onDeleteTask={handleDeleteTask}
        />
      </main>
    </>
  )
}

export default App
