import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express'; // Изменённый импорт
import { AppModule } from './app.module';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { join } from 'path';
import { StaticAssetsMiddleware } from './middlewares/static-assets.middleware';

async function bootstrap(): Promise<void> {
  // Изменяем тип на NestExpressApplication
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // ===== Static Assets Configuration =====
  app.use(new StaticAssetsMiddleware().use);

  // Теперь useStaticAssets будет доступен
  app.useStaticAssets(join(__dirname, '..', 'static'), {
    setHeaders: (res) => {
      res.set('X-Content-Type-Options', 'nosniff');
    }
  });

  // ===== CORS Configuration =====
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // ===== Swagger Documentation =====
  const config = new DocumentBuilder()
    .setTitle('Users API')
    .setDescription('t1 camp form api')
    .setVersion('1.0')
    .addBasicAuth()
    .addTag('users')
    .build();
  const documentFactory = (): OpenAPIObject =>
    SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  // ===== Middlewares =====
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  app.use(
    session({
      secret: process.env.SESSION_SECRET || 't1_camp_js',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
      },
    }),
  );

  // ===== Server Start =====
  const port = process.env.PORT ?? 4000;
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();