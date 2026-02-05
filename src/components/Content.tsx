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
  projectList: Project[]
  projectId: number
  onAddTask: (projectId: number, description: string) => void
  onDeleteTask: (projectId: number, taskId: number) => void
}

const Content = ({
  isFormOpen,
  onOpenForm,
  onCloseForm,
  onAddProject,
  onDeleteProject,
  projectList,
  projectId,
  onAddTask,
  onDeleteTask,
}: ContentProps) => {
  return (
    <>
      {isFormOpen ? (
        <ProjectForm onCloseForm={onCloseForm} onAddProject={onAddProject} />
      ) : projectId !== 0 ? (
        <ProjectView
          projectList={projectList}
          projectId={projectId}
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
