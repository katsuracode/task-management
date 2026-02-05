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
  const [project, setProject] = useState<Project>(null)
  const [isProjectEdit, setIsProjectEdit] = useState(false)

  const handleOpenForm = () => {
    setIsFormOpen(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
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
    const selectedProject = projectList.find((project) => project.id === id)

    if (selectedProject) {
      setProject(selectedProject)
      setIsProjectEdit(true)
      setIsFormOpen(false)
    }
  }

  const handleAddTask = (description: string) => {
    const taskId = generateUniqueId()

    // タスクを追加する
    if (project) {
      console.log(description)
      const newProject = {
        ...project,
        taskList: [{ id: taskId, description }, ...project.taskList],
      }

      setProject(newProject)
      replaceProject(newProject)
    }
  }

  const handleDeleteTask = (id: number) => {
    // 指定されたタスクIDのタスクを削除する
    if (project) {
      const newProject = { ...project, taskList: project.taskList.filter((task) => task.id !== id) }

      setProject(newProject)
      replaceProject(newProject)
    }
  }

  const replaceProject = (newProject: Project) => {
    setProjectList((prevList) => {
      return prevList.map((project) => {
        if (project.id === newProject.id) {
          return { ...newProject, taskList: [...newProject.taskList] }
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
          project={project}
          onAddTask={handleAddTask}
          onDeleteTask={handleDeleteTask}
        />
      </main>
    </>
  )
}

export default App
