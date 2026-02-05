import type { Project } from '../App'
import NoProject from './sub/NoProject'
import ProjectForm from './sub/ProjectForm'
import ProjectView from './sub/ProjectView'

type ContentProps = {
  isFormOpen: boolean
  onOpenForm: () => void
  onCloseForm: () => void
  onAddProject: (project: Project) => void
  onDeleteProject: (id: number) => void
  isProjectEdit: boolean
  project: Project
  onAddTask: (description: string) => void
  onDeleteTask: (id: number) => void
}

const Content = ({
  isFormOpen,
  onOpenForm,
  onCloseForm,
  onAddProject,
  onDeleteProject,
  isProjectEdit,
  project,
  onAddTask,
  onDeleteTask,
}: ContentProps) => {
  return (
    <>
      {isFormOpen ? (
        <ProjectForm onCloseForm={onCloseForm} onAddProject={onAddProject} />
      ) : isProjectEdit ? (
        <ProjectView
          project={project}
          onDeleteProject={onDeleteProject}
          onAddTask={onAddTask}
          onDeleteTask={onDeleteTask}
        />
      ) : (
        <NoProject onOpenForm={onOpenForm} />
      )}
    </>
  )
}

export default Content
