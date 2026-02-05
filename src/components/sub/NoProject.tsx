import logo from '../../assets/no-projects.png'

type NoProjectProps = {
  onOpenForm: () => void
}

const NoProject = ({ onOpenForm }: NoProjectProps) => {
  return (
    <div className="m-2 flex w-2/4 flex-col items-center pt-32">
      <img src={logo} alt="Logo" className="h-24 w-24" />
      <h2 className="mt-20 mb-8 text-2xl font-extrabold text-stone-700">No Project Selected</h2>
      <p className="text-xl text-stone-500">Select a project or get started with a new one</p>

      <p
        className="my-8 inline-block rounded-xl bg-stone-600 px-6 py-4 text-xl text-stone-400"
        onClick={onOpenForm}
      >
        + Add Project
      </p>
    </div>
  )
}

export default NoProject
