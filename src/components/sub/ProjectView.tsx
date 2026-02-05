import type { Project } from '../../App'

type ProjectViewProps = {
  project: Project
  onDeleteProject: (id: number) => void
  onAddTask: (description: string) => void
  onDeleteTask: (id: number) => void
}

const ProjectView = ({ project, onDeleteProject, onAddTask, onDeleteTask }: ProjectViewProps) => {
  const handleAddTask = async (formData: FormData) => {
    const description = formData.get('task') as string

    onAddTask(description)
  }

  const handleDeleteTask = (id: number) => {
    onDeleteTask(id)
  }

  return (
    <div className="my-1 flex h-screen w-2/4 flex-col pt-16">
      <div className="flex justify-between">
        <h3 className="flex items-center text-3xl font-bold text-stone-700">{project.title}</h3>
        <button
          className="text-xl font-semibold text-stone-900"
          onClick={() => onDeleteProject(project.id)}
        >
          Delete
        </button>
      </div>
      <p className="mt-4 text-xl text-stone-500">{project.date}</p>
      <div className="mt-4 text-xl font-medium text-stone-800">{project.description}</div>
      <hr className="my-4 border-stone-500" />

      <h4 className="text-3xl font-bold text-stone-700">Tasks</h4>
      <form className="my-4 flex justify-between bg-stone-100 px-4 py-8" action={handleAddTask}>
        <input className="mr-2 flex-1 bg-stone-200 p-2" type="text" id="task" name="task" />
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
              onClick={() => handleDeleteTask(task.id)}
            >
              Clear
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProjectView
