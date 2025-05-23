export type Tag = {
  id: number;
  name: string;
};

export type Note = {
  id: number;
  title: string;
  content: string;
  archived: boolean;
  tags: Tag[];
};

// Este es el tipo que se usa al crear o editar una nota desde el formulario
export type NoteInput = {
  title: string;
  content: string;
  tags: string[];
};
