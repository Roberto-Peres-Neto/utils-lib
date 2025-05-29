import { type Request, type Response } from 'express'
import { type Controller } from '../../presentation/protocols'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
      ...(req.query || {})
      // accessToken: req.headers?.authorization?.split(' ')[1] || ''
    }
    const token = req.headers?.authorization?.split(' ')[1]
    if (token) request.accessToken = token

    const httpResponse = await controller.handle(request)
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.body.message,
        ...(httpResponse.body.violations ? { violations: httpResponse.body.violations } : null),
        ...(httpResponse.body.conflictData ? { conflictData: httpResponse.body.conflictData } : null)
      })
    }
  }
}
