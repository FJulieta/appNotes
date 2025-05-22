import { useEffect, useState } from 'react';
import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';
import { Note } from '../types/note';
import {
  getActiveNotes,
  createNote,
  deleteNote,
  updateNote,
} from '../services/notesService';

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const data = await getActiveNotes();
    setNotes(data);
  };

  const handleCreate = async (note: { title: string; content: string }) => {
    await createNote(note);
    fetchNotes();
  };

  const handleDelete = async (id: number) => {
    await deleteNote(id);
    fetchNotes();
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
  };

  const handleUpdate = async (updated: { title: string; content: string }) => {
    if (editingNote) {
      await updateNote(editingNote.id, updated);
      setEditingNote(null);
      fetchNotes();
    }
  };

  return (
    <main>
      <h1>My Notes</h1>
      <NoteForm
        onSubmit={editingNote ? handleUpdate : handleCreate}
        editingNote={editingNote}
      />
      <NoteList
        notes={notes}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </main>
  );
}
