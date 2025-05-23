'use client';
import { useEffect, useState } from 'react';
import styles from '../styles/NoteForm.module.scss';
import { getRandomColor } from '../utils/colors'; // 🟣 IMPORTANTE

type NoteInput = {
  title: string;
  content: string;
  tags: string[];
  color?: string; // 💡 ahora incluye color
};

type Props = {
  onSubmit: (note: NoteInput) => void;
  editingNote?: NoteInput | null;
};

export default function NoteForm({ onSubmit, editingNote }: Props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]); // Si no usás tags acá, podés dejarlo vacío

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
      setTags(editingNote.tags || []);
    } else {
      setTitle('');
      setContent('');
      setTags([]);
    }
  }, [editingNote]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newNote: NoteInput = {
      title,
      content,
      tags,
      color: editingNote?.color ?? getRandomColor(), // 🟣 ASIGNA SOLO SI NO ESTÁS EDITANDO
    };

    console.log('Nota a crear:', newNote); // 💥 Revisá que el color aparezca ahora

    onSubmit(newNote);
    setTitle('');
    setContent('');
    setTags([]);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className={styles.textarea}
        placeholder="Write your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <button type="submit" className={styles.button}>
        {editingNote ? 'Update Note' : 'Save Note'}
      </button>
    </form>
  );
}
