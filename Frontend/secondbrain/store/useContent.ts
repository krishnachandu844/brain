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
  setContents: (data: Content[]) => void;
}

export const useContentStore = create<ContentStoreType>((set) => ({
  contents: [],
  addContent: (content) =>
    set((state) => ({
      contents: [...state.contents, content],
    })),
  setContents: (data) => set({ contents: data }),
}));
