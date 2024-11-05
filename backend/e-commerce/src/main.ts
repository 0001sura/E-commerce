import { NestFactory } from '@nestjs/core';
import { AppModule} from './app.module'
import { ValidationPipe } from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true,
    transform:true,
  }))
  app.enableCors({
     // your React app URL
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // allow cookies
  });
  const port:number= Number(process.env.PORT) || 3000;

 const config = new DocumentBuilder()
 .setTitle('online market of electronics')
 .setDescription('this e-commerce website allow every ond sell any electronics good')
 .addServer('http://localhost:3000')
 .addBearerAuth()
 .setVersion('1.0')
 .build()

 const document =SwaggerModule.createDocument(app,config)
 SwaggerModule.setup('api',app,document, {
  swaggerUrl:'swagger/json'
 })
 await app.listen(port, () => {
  console.log('[WEB]', process.env.BASE_URL + '/api');
});
  // await app.listen(3000);
}
bootstrap();
