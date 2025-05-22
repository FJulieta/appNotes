import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NotesService } from './notes/notes.service';

async function seed() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const notesService = app.get(NotesService);

  const existingNotes = await notesService.findAll();
  if (existingNotes.length === 0) {
    await notesService.create({
      title: 'Example Note',
      content: 'This is a pre-filled note.',
      tags: ['example', 'demo'],
    });

    await notesService.create({
      title: 'Second note',
      content: 'Another useful note for testing.',
      tags: ['test', 'documentatión'],
    });

    console.log('Sample notes have been uploaded');
  } else {
    console.log(' The database already has data, nothing has been loaded.');
  }

  await app.close();
}

seed();
