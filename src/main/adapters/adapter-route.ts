// import { type NextFunction, type Request, type Response } from 'express'
// import express from 'express'

// export const adaptMiddleware = (middleware: Middleware, action?: string, subject?: string | object) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     const request = {
//       accessToken: req.headers?.authorization?.split(' ')[1] || '',
//       ...(req.headers || {})
//     }

//     const httpResponse = await middleware.handle(request, action, subject)
//     if (httpResponse.statusCode === 200) {
//       Object.assign(req, httpResponse.body)
//       next()
//     } else {
//       res.status(httpResponse.statusCode).json({
//         error: httpResponse.body.message
//       })
//     }
//   }
// }

// // Example middleware implementation
// export class ExampleMiddleware implements Middleware {
//   async handle(request: any, action?: string, subject?: string | object) {
//     // Perform some logic based on the request, action, and subject
//     if (request.accessToken === 'valid-token') {
//       return {
//         statusCode: 200,
//         body: { userId: '123', roles: ['admin'] }
//       }
//     } else {
//       return {
//         statusCode: 401,
//         body: { message: 'Unauthorized' }
//       }
//     }
//   }
// }

// // Usage in an Express route

// const app = express()
// const exampleMiddleware = new ExampleMiddleware()

// app.use(adaptMiddleware(exampleMiddleware))

// app.get('/protected-route', (req, res) => {
//   res.json({ message: 'You have access!', user: req.user })
// })

// app.listen(3000, () => {
//   console.log('Server running on http://localhost:3000')
// })

import { Request, Response } from 'express'
import { Controller } from '../../presentation/protocols'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpResponse = await controller.handle(req.body)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
