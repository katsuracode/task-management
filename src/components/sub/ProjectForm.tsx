import { useEffect, useRef, useState } from 'react'
import type { Project } from '../../types/index'
import { generateUniqueId } from '../../utils/IdUtils'

type ProjectFormProps = {
  onCloseForm: () => void
  onAddProject: (project: Project) => void
}

const ProjectForm = ({ onCloseForm, onAddProject }: ProjectFormProps) => {
  const titleInputRef = useRef<HTMLInputElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    titleInputRef.current?.focus()
  }, [])

  const [errors, setErrors] = useState({
    title: '',
    description: '',
    date: '',
  })

  const validateForm = (formData: FormData): boolean => {
    const newErrors = { title: '', description: '', date: '' }
    let isValid = true

    // タイトルのバリデーション
    const title = formData.get('title') as string
    if (!title || !title.trim()) {
      newErrors.title = 'title is required.'
      isValid = false
    } else if (title.trim().length > 50) {
      newErrors.title = 'Enter a title with 50 characters or less.'
      isValid = false
    }

    // 説明のバリデーション
    const description = formData.get('description') as string
    if (!description || !description.trim()) {
      newErrors.description = 'description is required.'
      isValid = false
    } else if (description.trim().length > 500) {
      newErrors.description = 'Enter a description with 500 characters or less.'
      isValid = false
    }

    // 日付のバリデーション
    const date = formData.get('date') as string
    if (!date) {
      newErrors.date = 'due date is required'
      isValid = false
    } else {
      const selectedDate = new Date(date)
      const today = new Date()
      today.setHours(0, 0, 0, 0)
      if (selectedDate < today) {
        newErrors.date = 'Past dates cannot be selected.'
        isValid = false
      }
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSaveProject = async (formData: FormData) => {
    if (!validateForm(formData)) {
      return
    }

    const title = (formData.get('title') as string).trim()
    const description = (formData.get('description') as string).trim()
    const date = formData.get('date') as string
    const id = generateUniqueId()

    onAddProject({ title, description, date, id, taskList: [] })
    formRef.current?.reset()
  }

  const handleCancelAddProject = () => {
    onCloseForm()
  }

  return (
    <form ref={formRef} className="m-2 flex w-2/4 flex-col pt-32" action={handleSaveProject}>
      <div className="flex justify-end gap-4">
        <button
          type="button"
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
          <input
            ref={titleInputRef}
            className={`rounded-sm bg-stone-200 p-2 ${errors.title ? 'border-2 border-red-500' : ''}`}
            type="text"
            id="title"
            name="title"
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? 'title-error' : undefined}
          />
          {errors.title && (
            <p id="title-error" className="text-sm text-red-500">
              {errors.title}
            </p>
          )}
        </div>

        <div className="my-2 flex flex-col gap-2">
          <label htmlFor="description" className="text-xl font-semibold text-stone-700 uppercase">
            description
          </label>
          <textarea
            className={`rounded-sm bg-stone-200 p-2 ${errors.description ? 'border-2 border-red-500' : ''}`}
            id="description"
            name="description"
            aria-invalid={!!errors.description}
            aria-describedby={errors.description ? 'description-error' : undefined}
          ></textarea>
          {errors.description && (
            <p id="description-error" className="text-sm text-red-500">
              {errors.description}
            </p>
          )}
        </div>

        <div className="my-2 flex flex-col gap-2">
          <label htmlFor="description" className="text-xl font-semibold text-stone-700 uppercase">
            due date
          </label>
          <input
            type="date"
            className={`rounded-sm bg-stone-200 p-2 ${errors.date ? 'border-2 border-red-500' : ''}`}
            id="date"
            name="date"
            aria-invalid={!!errors.date}
            aria-describedby={errors.date ? 'date-error' : undefined}
          />
          {errors.date && (
            <p id="date-error" className="text-sm text-red-500">
              {errors.date}
            </p>
          )}
        </div>
      </div>
    </form>
  )
}

export default ProjectForm
