import { useState } from 'react';
import { Note } from '../types/note';
import styles from '../styles/NoteList.module.scss';

type Props = {
  notes: Note[];
  onDelete: (id: number) => void;
  onEdit: (note: Note) => void;
  onArchive?: (id: number) => void;
  showArchiveButton?: boolean;
};

export default function NoteList({
  notes,
  onDelete,
  onEdit,
  onArchive,
  showArchiveButton = true,
}: Props) {
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);

  const handleNoteClick = (id: number) => {
    setSelectedNoteId(prev => (prev === id ? null : id));
  };

  if (notes.length === 0) return <p className={styles.empty}>No notes to display</p>;

  return (
    <div className={styles.grid}>
      {[...notes].reverse().map((note) => {
        const isSelected = selectedNoteId === note.id;
        const isDimmed = selectedNoteId !== null && !isSelected;

        return (
          <div
            key={note.id}
            className={`${styles.card} ${isSelected ? styles.expanded : ''} ${isDimmed ? styles.dimmed : ''}`}
           style={{ '--note-color': note.color || '#ffffff' } as React.CSSProperties}

            onClick={() => handleNoteClick(note.id)}
          >
            <h3>{note.title}</h3>
            <p>{note.content}</p>

            <div className={styles.tags}>
              {note.tags.map((tag) => (
                <span key={tag.name} className={styles.tag}>
                  #{tag.name}
                </span>
              ))}
            </div>

            <div className={styles.actions}>
              <button onClick={(e) => { e.stopPropagation(); onEdit(note); }}>✏️ Edit</button>
              <button onClick={(e) => { e.stopPropagation(); onDelete(note.id); }}>🗑️ Delete</button>
              {showArchiveButton && onArchive && (
                <button
                  onClick={(e) => { e.stopPropagation(); onArchive(note.id); }}
                  className={styles.archive}
                >
                  📦 Archive
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
