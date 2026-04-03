import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
    .setTitle('N25 crm')
    .setDescription("O'qi")
    .addBearerAuth()
    .build();
