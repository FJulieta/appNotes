import { Note } from '../types/note';
import styles from '../styles/NoteList.module.scss';

type Props = {
  notes: Note[];
  onDelete: (id: number) => void;
  onEdit: (note: Note) => void;
  onArchive?: (id: number) => void;
  showArchiveButton?: boolean;
};

export default function NoteList({ notes, onDelete, onEdit, onArchive, showArchiveButton = true }: Props) {
  if (notes.length === 0) return <p className={styles.empty}>No notes to display</p>;

  return (
    <div className={styles.grid}>
      {notes.map((note) => (
        <div key={note.id} className={styles.card}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>

          <div className={styles.tags}>
            {note.tags.map((tag) => (
              <span key={tag.name} className={styles.tag}>#{tag.name}</span>
            ))}
          </div>

          <div className={styles.actions}>
            <button onClick={() => onEdit(note)}>✏️ Edit</button>
            <button onClick={() => onDelete(note.id)}>🗑️ Delete</button>
            {showArchiveButton && onArchive && (
              <button onClick={() => onArchive(note.id)} className={styles.archive}>📦 Archive</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
