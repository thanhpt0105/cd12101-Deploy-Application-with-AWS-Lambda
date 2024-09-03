import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'
import { deleteTodo } from '../../businessLogic/todos.js'
import { getUserId } from '../utils.mjs'

export const handler = middy()
  .use(httpErrorHandler())
  .use(cors({
    credentials: true
  }))
  .handler(async (event) => {
    const userId = getUserId(event)
    const todoId = event.pathParameters.todoId

    await deleteTodo(userId, todoId)

    return {
      statusCode: 200,
      body: JSON.stringify({})
    }
  })


