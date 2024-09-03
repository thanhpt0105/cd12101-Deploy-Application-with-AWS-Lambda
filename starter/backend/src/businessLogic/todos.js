import * as uuid from 'uuid'
import { createLogger } from '../utils/logger.mjs'
import { TodosAccess } from '../dataLayer/todosAccess.js'

const log = createLogger('Todo-service')

const todosAccess = new TodosAccess()

export async function getTodos(userId) {
    if (!userId) {
        log.info("Unauthorized!")
        return false
    }
    return await todosAccess.getTodos(userId)
}

export async function createTodo(createData, userId) {
    if (!userId) {
        log.info("Unauthorized!")
        return false
    }
    const todoId = uuid.v4()
    const createdAt = new Date().toISOString()

    return await todosAccess.createTodo({
        todoId,
        userId,
        createdAt,
        done: false,
        ...createData
    })
}

export async function updateTodo(userId, todoId, updateData) {
    if (!userId) {
        log.info("Unauthorized!")
        return false
    }
    await todosAccess.updateTodo(userId, todoId, updateData)
    return true
}

export async function generateUploadUrl(userId, todoId) {
    if (!userId) {
        log.info("Unauthorized!")
        return false
    }
    const attachmentId = uuid.v4()
    const url = await todosAccess.generateUploadUrl(userId, todoId, attachmentId)
    return url
}

export async function deleteTodo(userId, todoId) {
    if (!userId) {
        log.info("Unauthorized!")
        return false
    }
    await todosAccess.deleteTodo(userId, todoId)
    return true
}