// src/middlewares/static-assets.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class StaticAssetsMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (req.url.match(/\.(js|css|svg|png|jpg|jpeg|gif)$/)) {
      const mimeTypes = {
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.svg': 'image/svg+xml',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.gif': 'image/gif'
      };

      const ext = req.url.match(/\.\w+$/)?.[0];
      if (ext && mimeTypes[ext]) {
        res.setHeader('Content-Type', mimeTypes[ext]);
      }
    }
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
  }
}