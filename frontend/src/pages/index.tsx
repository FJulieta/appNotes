import { useEffect, useState } from 'react';
import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';
import { Note, NoteInput } from '../types/note';
import styles from '../styles/Home.module.scss';
import {
  getActiveNotes,
  getArchivedNotes,
  createNote,
  deleteNote,
  updateNote,
  toggleArchiveNote
} from '../services/notesService';

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingNote, setEditingNote] = useState<NoteInput | null>(null);
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewArchived, setViewArchived] = useState(false);

  useEffect(() => {
    fetchNotes();
  }, [viewArchived]);

  const fetchNotes = async () => {
    const data = viewArchived ? await getArchivedNotes() : await getActiveNotes();
    setNotes(data);
  };

  const handleCreate = async (note: NoteInput) => {
    await createNote(note);
    fetchNotes();
  };

  const handleDelete = async (id: number) => {
    await deleteNote(id);
    fetchNotes();
  };

  const handleEdit = (note: Note) => {
    const transformed: NoteInput = {
      title: note.title,
      content: note.content,
      tags: note.tags.map(tag => tag.name),
    };
    setEditingNote(transformed);
  };

  const handleUpdate = async (updated: NoteInput) => {
    const originalNote = notes.find(
      n => n.title === updated.title && n.content === updated.content
    );
    if (originalNote) {
      await updateNote(originalNote.id, updated);
      setEditingNote(null);
      fetchNotes();
    }
  };

  const handleToggleArchive = async (id: number) => {
    await toggleArchiveNote(id);
    fetchNotes();
  };

  const filteredNotes = notes.filter(note =>
    (selectedTag === '' || note.tags.some(tag => tag.name === selectedTag)) &&
    (searchQuery === '' || note.title.toLowerCase().includes(searchQuery.toLowerCase()) || note.content.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const uniqueTags = [...new Set(notes.flatMap(note => note.tags.map(tag => tag.name)))];

  const toggleView = () => {
    setViewArchived(prev => !prev);
    setSelectedTag('');
    setSearchQuery('');
    setEditingNote(null);
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>My Notes</h1>

      <div className={styles.controls}>
        <button onClick={toggleView} className={styles.toggleBtn}>
          {viewArchived ? 'View Active Notes' : 'View Archived Notes'}
        </button>

        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.search}
        />
<div className={styles.tagChips}>
  {uniqueTags.map(tagName => (
    <button
      key={tagName}
      className={`${styles.chip} ${selectedTag === tagName ? styles.active : ''}`}
      onClick={() => setSelectedTag(tagName)}
    >
      {tagName}
    </button>
  ))}
</div>

      </div>

      <NoteForm
        onSubmit={editingNote ? handleUpdate : handleCreate}
        editingNote={editingNote}
      />

      <NoteList
        notes={filteredNotes}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onArchive={handleToggleArchive} // ✅ ESTE es el nombre correcto esperado por NoteList.tsx
        showArchiveButton={!viewArchived}
      />
    </main>
  );
}
