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
