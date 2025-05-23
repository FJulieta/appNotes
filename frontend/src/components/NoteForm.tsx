'use client';
import { useEffect, useState } from 'react';
import styles from '../styles/NoteForm.module.scss';

type NoteInput = {
  title: string;
  content: string;
  tags: string[];
};

type Props = {
  onSubmit: (note: NoteInput) => void;
  editingNote?: NoteInput | null;
};
export default function NoteForm({ onSubmit, editingNote }: Props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [editingNote]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, content });
    setTitle('');
    setContent('');
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
