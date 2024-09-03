import { DynamoDB } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocument } from '@aws-sdk/lib-dynamodb'
import AWSXRay from 'aws-xray-sdk-core'

export class TodosAccess {
  constructor(
    documentClient = AWSXRay.captureAWSv3Client(new DynamoDB()),
    todosTable = process.env.TODOS_TABLE
  ) {
    this.documentClient = documentClient
    this.todosTable = todosTable
    this.dynamoDbClient = DynamoDBDocument.from(this.documentClient)
  }

  async getTodos() {
    console.log('Getting all todos')

    const result = await this.dynamoDbClient.scan({
      TableName: this.todosTable
    })
    return result.Items
  }

  async createTodo(todo) {
    console.log(`Creating a group with id ${todo.todoId}`)

    await this.dynamoDbClient.put({
      TableName: this.todosTable,
      Item: todo
    })

    return todo
  }
}
