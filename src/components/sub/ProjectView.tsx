import { useRef, useState } from 'react'
import type { Project } from '../../types/index'
import { createPortal } from 'react-dom'
import { generateUniqueId } from '../../utils/IdUtils'

type ProjectViewProps = {
  projectList: Project[]
  projectId: number
  onDeleteProject: (id: number) => void
  onAddTask: (projectId: number, description: string) => void
  onDeleteTask: (projectId: number, taskId: number) => void
}

const ProjectView = ({
  projectList,
  projectId,
  onDeleteProject,
  onAddTask,
  onDeleteTask,
}: ProjectViewProps) => {
  const taskInputRef = useRef<HTMLInputElement>(null)
  const taskFormRef = useRef<HTMLFormElement>(null)
  const taskListRef = useRef<HTMLUListElement>(null)

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteTaskId, setDeleteTaskId] = useState<number | null>(null)

  const handleDeleteClick = () => {
    setShowDeleteModal(true)
  }

  const handleConfirmDelete = () => {
    onDeleteProject(projectId)
    setShowDeleteModal(false)
  }

  const handleAddTask = async (formData: FormData) => {
    const description = formData.get('task') as string

    onAddTask(projectId, description)

    taskFormRef.current?.reset()
    taskInputRef.current?.focus()
    taskListRef.current?.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleTaskDeleteClick = (taskId: number) => {
    setDeleteTaskId(taskId)
  }

  const handleConfirmTaskDelete = () => {
    if (deleteTaskId !== null) {
      onDeleteTask(projectId, deleteTaskId)
      setDeleteTaskId(null)
    }
  }

  const project = projectList.find((project) => project.id === projectId)

  if (!project) {
    return <div>No project founded</div>
  }

  return (
    <div className="my-1 flex h-screen w-2/4 flex-col pt-16">
      <div className="flex justify-between">
        <h3 className="flex items-center text-3xl font-bold text-stone-700">{project.title}</h3>
        <button
          className="text-xl font-semibold text-stone-900"
          onClick={() => handleDeleteClick()}
        >
          Delete
        </button>

        {showDeleteModal &&
          createPortal(
            <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
              <div className="max-w-md rounded-lg bg-white p-8">
                <h3 className="mb-4 text-2xl font-bold">
                  Do you really want to delete the project?
                </h3>
                <p className="mb-6">This action cannot be undone.</p>
                <div className="flex justify-end gap-4">
                  <button onClick={() => setShowDeleteModal(false)}>Cancel</button>
                  <button onClick={handleConfirmDelete}>Delete</button>
                </div>
              </div>
            </div>,
            document.body,
          )}
      </div>
      <p className="mt-4 text-xl text-stone-500">{project.date}</p>
      <div className="mt-4 text-xl font-medium text-stone-800">{project.description}</div>
      <hr className="my-4 border-stone-500" />

      <h4 className="text-3xl font-bold text-stone-700">Tasks</h4>
      <form
        ref={taskFormRef}
        className="my-4 flex justify-between bg-stone-100 px-4 py-8"
        action={handleAddTask}
      >
        <input
          ref={taskInputRef}
          className="mr-2 flex-1 bg-stone-200 p-2"
          type="text"
          id="task"
          name="task"
        />
        <button className="text-lg font-semibold text-stone-900" type="submit">
          Add Task
        </button>
      </form>

      <ul className="my-4 overflow-y-scroll">
        {project.taskList.map((task) => (
          <li key={task.id} className="my-4 flex justify-between bg-stone-100 px-4 py-8">
            <p className="text-lg text-stone-900">{task.description}</p>
            <button
              className="text-lg font-semibold text-stone-900"
              onClick={() => handleTaskDeleteClick(task.id)}
            >
              Clear
            </button>
          </li>
        ))}
      </ul>
      {deleteTaskId !== null &&
        createPortal(
          <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
            <div className="max-w-md rounded-lg bg-white p-8">
              <h3 className="mb-4 text-2xl font-bold">
                Are you sure you want to delete this task?
              </h3>
              <div className="flex justify-end gap-4">
                <button onClick={() => setDeleteTaskId(null)}>Cancel</button>
                <button onClick={handleConfirmTaskDelete}>Delete</button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  )
}

export default ProjectView
