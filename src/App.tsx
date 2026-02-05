import { useState } from 'react'
import Content from './components/Content'
import Sidebar from './components/Sidebar'
import { samples } from './data/sample'
import { generateUniqueId } from './utils/IdUtils'

export type Task = {
  id: number
  description: string
}

export type Project = {
  id: number
  title: string
  description: string
  date: string
  taskList: Array<Task>
}

function App() {
  // プロジェクト追加・削除用
  const [projectList, setProjectList] = useState<Array<Project>>(samples)
  const [isFormOpen, setIsFormOpen] = useState(false)

  // プロジェクト編集(タスク追加・削除)用
  const [projectId, setProjectId] = useState(0)
  const [isProjectEdit, setIsProjectEdit] = useState(false)

  const handleOpenForm = () => {
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    setIsProjectEdit(false)
  }

  const handleAddProject = (project: Project) => {
    setProjectList((prevList) => [project, ...prevList])
    setIsFormOpen(false)
    console.table(projectList)
  }

  const handleDeleteProject = (id: number) => {
    setProjectList((prevList) => prevList.filter((project) => project.id !== id))
    setIsProjectEdit(false)
  }

  const handleSeletectProject = (id: number) => {
    setProjectId(id)
    setIsProjectEdit(true)
    setIsFormOpen(false)
  }

  const handleAddTask = (projectId: number, description: string) => {
    // 指定されたプロジェクトが探し、タスクを追加する
    const taskId = generateUniqueId()

    setProjectList((prevList) => {
      return prevList.map((project) => {
        if (project.id === projectId) {
          return { ...project, taskList: [...project.taskList, { id: taskId, description }] }
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
          isProjectEdit={isProjectEdit}
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
