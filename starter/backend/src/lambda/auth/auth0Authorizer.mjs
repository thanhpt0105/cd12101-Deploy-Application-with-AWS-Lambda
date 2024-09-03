import Axios from 'axios'
import jsonwebtoken from 'jsonwebtoken'
import { createLogger } from '../../utils/logger.mjs'
import { JwksClient } from 'jwks-rsa'

const logger = createLogger('auth')
const jwksUrl = 'https://thanhpt0105.auth0.com/.well-known/jwks.json'
const jwksClient = new JwksClient({
    jwksUri: jwksUrl
})

export async function handler(event) {
  try {
    logger.info(`event: ${JSON.stringify(event)}`)
    const jwtToken = await verifyToken(event.authorizationToken)

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*'
          }
        ]
      }
    }
  } catch (e) {
    logger.error('User not authorized', { error: e.message })

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*'
          }
        ]
      }
    }
  }
}


async function verifyToken(authHeader) {
  const token = getToken(authHeader)
  const jwt = jsonwebtoken.decode(token, { complete: true })
  // TODO: Implement token verification
  const cert = await jwksClient.getSigningKey(jwt.header.kid)
  return jsonwebtoken.verify(token, cert.getPublicKey(), { algorithms: ['RS256']})
}

function getToken(authHeader) {
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return token
}
