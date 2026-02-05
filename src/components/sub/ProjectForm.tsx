import type { Project } from '../../App'
import { generateUniqueId } from '../../utils/IdUtils'

type ProjectFormProps = {
  onCloseForm: () => void
  onAddProject: (project: Project) => void
}

const ProjectForm = ({ onCloseForm, onAddProject }: ProjectFormProps) => {
  const handleSaveProject = async (formData: FormData) => {
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const date = formData.get('date') as string
    const id = generateUniqueId()
    onAddProject({ title, description, date, id, taskList: [] })
  }

  const handleCancelAddProject = () => {
    onCloseForm()
  }

  return (
    <form className="m-2 flex w-2/4 flex-col pt-32" action={handleSaveProject}>
      <div className="flex justify-end gap-4">
        <button
          className="px-8 py-2 text-xl font-semibold text-stone-900 transition-all duration-200 hover:scale-105 active:scale-95"
          onClick={handleCancelAddProject}
        >
          Cancel
        </button>
        <button
          className="rounded-xl bg-stone-900 px-8 py-2 text-xl font-semibold text-white transition-all duration-200 hover:scale-105 hover:bg-stone-700 active:scale-95"
          type="submit"
        >
          Save
        </button>
      </div>

      <div>
        <div className="my-2 flex flex-col gap-2">
          <label htmlFor="title" className="text-xl font-semibold text-stone-700 uppercase">
            title
          </label>
          <input className="rounded-sm bg-stone-200 p-2" type="text" id="title" name="title" />
        </div>

        <div className="my-2 flex flex-col gap-2">
          <label htmlFor="description" className="text-xl font-semibold text-stone-700 uppercase">
            description
          </label>
          <textarea
            className="rounded-sm bg-stone-200 p-2"
            id="description"
            name="description"
          ></textarea>
        </div>

        <div className="my-2 flex flex-col gap-2">
          <label htmlFor="description" className="text-xl font-semibold text-stone-700 uppercase">
            due date
          </label>
          <input type="date" className="rounded-sm bg-stone-200 p-2" id="date" name="date" />
        </div>
      </div>
    </form>
  )
}

export default ProjectForm
