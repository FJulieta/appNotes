import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotesModule } from './notes/notes.module';
import { Note } from './notes/note.entity';
import { Tag } from './notes/tag.entity';


@Module({
  imports: [

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'julieta',
      password: 'supersecret',
      database: 'ensolvers_notes',
      entities: [Note,Tag],
      synchronize: true,
    }),
    NotesModule,
  ],
})
export class AppModule {}
