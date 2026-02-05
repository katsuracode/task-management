import type { Project } from '../App'

type SideBarProps = {
  onOpenForm: () => void
  onSelectProject: (id: number) => void
  projectList: Array<Project>
}

const Sidebar = ({ onOpenForm, onSelectProject, projectList }: SideBarProps) => {
  return (
    <aside className="my-1 h-screen w-1/3 rounded-sm bg-stone-900 px-8 text-stone-300">
      <h2 className="mt-20 mb-8 text-4xl font-extrabold text-stone-300">Your Projects</h2>

      <p
        className="my-8 inline-block rounded-xl bg-stone-600 px-6 py-4 text-xl"
        onClick={onOpenForm}
      >
        + Add Project
      </p>

      <ul>
        {projectList.map((project) => (
          <li
            key={project.id}
            className="my-4 text-xl font-semibold"
            onClick={() => onSelectProject(project.id)}
          >
            {project.title}
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar
