import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphDataController } from './graph-data/graph-data.controller';

@Module({
  imports: [],
  controllers: [AppController, GraphDataController],
  providers: [AppService],
})
export class AppModule {}
