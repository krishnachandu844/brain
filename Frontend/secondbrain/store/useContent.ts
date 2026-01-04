import { create } from "zustand";

interface Content {
  id: string;
  type: string;
  title: string;
  description: string;
  link: string;
}

interface ContentStoreType {
  contents: Content[];
  addContent: (content: Content) => void;
}

export const useContentStore = create<ContentStoreType>((set) => ({
  contents: [],
  addContent: (content) =>
    set((state) => ({
      contents: [...state.contents, content],
    })),
}));
