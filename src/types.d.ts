
export type Status = "todo" | "doing" | "done" | "deleted"


export type Task = {
  id: string,
  description: string,
  status: Status
}