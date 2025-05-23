import styles from '../styles/NoteCard.module.scss';
import { Note } from '../types/note';

type Props = {
  note: Note;
  onClose?: () => void;
};

export default function NoteCard({ note, onClose }: Props) {
  return (
    <div className={styles.card}>
      {onClose && (
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
      )}
      <h2 className={styles.title}>{note.title}</h2>
      <p className={styles.content}>{note.content}</p>
    </div>
  );
}
