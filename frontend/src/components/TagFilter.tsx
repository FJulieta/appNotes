'use client';
import { useEffect, useState } from 'react';
import { Tag } from '../types/note';
import styles from '../styles/TagFilter.module.scss';

type Props = {
  onTagSelect: (tagName: string | null) => void;
};

export default function TagFilter({ onTagSelect }: Props) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:3000/tags')
      .then((res) => res.json())
      .then(setTags);
  }, []);

  const handleClick = (tagName: string) => {
    const newTag = tagName === selected ? null : tagName;
    setSelected(newTag);
    onTagSelect(newTag);
  };

  return (
    <div className={styles.tagFilter}>
      {tags.map((tag) => (
        <button
          key={tag.id}
          onClick={() => handleClick(tag.name)}
          className={selected === tag.name ? styles.active : ''}
        >
          #{tag.name}
        </button>
      ))}
    </div>
  );
}
