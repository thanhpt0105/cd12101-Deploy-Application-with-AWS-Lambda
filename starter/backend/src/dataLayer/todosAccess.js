import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'

import AWSXRay from 'aws-xray-sdk-core'
import { createLogger } from '../utils/logger.mjs'

import { generatePresignedUrl } from '../fileStorage/attachmentUtils.js'

const log = createLogger("TodoAccess")
const bucketName = process.env.TODOS_S3_BUCKET


export class TodosAccess {
  constructor(
    documentClient = AWSXRay.captureAWSv3Client(new DynamoDB()),
    todosTable = process.env.TODOS_TABLE,
  ) {
    this.documentClient = documentClient
    this.todosTable = todosTable
    this.dynamoDbClient = DynamoDBDocument.from(this.documentClient)
    this.bucketName = bucketName
  }

  async getTodos(userId) {
    log.info('Getting all todos', userId)
    
    const result = await this.dynamoDbClient.query({
      TableName: this.todosTable,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      },
    })
    return result.Items
  }

  async createTodo(todo) {
    log.info(`Creating a group with id ${todo.todoId}`)

    await this.dynamoDbClient.put({
      TableName: this.todosTable,
      Item: todo
    })

    return todo
  }

  async updateTodo(userId, todoId, updateData) {
    console.log(`Creating a group with id ${todo.todoId}`)

    await this.dynamoDbClient.put({
      TableName: this.todosTable,
      Item: todo
    })

    return todo
  }

  async generateUploadUrl(userId, todoId, attachmentId) {
    const attachmentUrl = `https://${bucketName}.s3.amazonaws.com/${attachmentId}`

    //update attachmentURL
    const updasteResult = await this.dynamoDbClient.update({
      TableName: this.todosTable, 
      Key: { userId, todoId}, 
      UpdateExpression: 'set #attachmentUrl = :attachmentUrl',
      ExpressionAttributeNames: {
        '#attachmentUrl': 'attachmentUrl',
      },
      ExpressionAttributeValues: {
        ':attachmentUrl': attachmentUrl,
      },
    })
    log.info(`Saved attachment URL ${ attachmentUrl}`)
    const url = await generatePresignedUrl(attachmentId)
    log.info(`Presigned URL: ${url}`)
    return url
  }

}

