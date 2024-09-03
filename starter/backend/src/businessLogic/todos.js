import * as uuid from 'uuid'

import { TodosAccess } from '../dataLayer/todosAccess.js'

const todosAccess = new TodosAccess()

export async function getTodos() {
  return todosAccess.getTodos()
}

export async function createTodo(createTodoRequest, userId) {
  const itemId = uuid.v4()

  return await todosAccess.createTodo({
    toId: itemId,
    userId: userId,
    name: createTodoRequest.name,
    dueDate: createTodoRequest.dueDate,
    done: false,
    attachmentUrl: createTodoRequest.attachmentUrl
  })
}
