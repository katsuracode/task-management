import type { Project } from '../types/index'

type SideBarProps = {
  onOpenForm: () => void
  onSelectProject: (id: number) => void
  projectList: Array<Project>
}

const Sidebar = ({ onOpenForm, onSelectProject, projectList }: SideBarProps) => {
  return (
    <aside className="my-1 h-screen w-1/3 rounded-sm bg-stone-900 px-8 text-stone-300 hover:bg-stone-800">
      <h2 className="mt-20 mb-8 text-4xl font-extrabold text-stone-300">Your Projects</h2>

      <button
        className="my-8 inline-block rounded-xl bg-stone-600 px-6 py-4 text-xl transition-all duration-200 hover:scale-105 hover:bg-stone-500 active:scale-95"
        onClick={onOpenForm}
      >
        + Add Project
      </button>

      <ul>
        {projectList.map((project) => (
          <li key={project.id}>
            <button
              className="my-4 text-xl font-semibold"
              onClick={() => onSelectProject(project.id)}
            >
              {project.title}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar
