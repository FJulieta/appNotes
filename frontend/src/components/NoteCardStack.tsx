import styles from '../styles/NoteCardStack.module.scss';
import { Note } from '../types/note';
import NoteCard from './NoteCard';

type Props = {
  notes: Note[];
  onClose: (id: number) => void;
};

export default function NoteCardStack({ notes, onClose }: Props) {
  if (notes.length === 0) {
    return <div className={styles.empty}>Select a note to view it here.</div>;
  }

  return (
    <div className={styles.stack}>
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} onClose={() => onClose(note.id)} />
      ))}
    </div>
  );
}
