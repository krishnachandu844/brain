import axios from "axios";
import { create } from "zustand";
import Cookies from "js-cookie";

interface Content {
  id: string;
  type: string;
  title: string;
  description: string;
  link: string;
}

interface ContentStoreType {
  contents: Content[];
  filteredContents: Content[];
  addContent: (content: Content) => void;
  setContents: (data: Content[]) => void;
  addFilterContents: (data: Content[]) => void;
}

export const useContentStore = create<ContentStoreType>((set, get) => ({
  contents: [],
  filteredContents: [],
  addContent: (content) =>
    set((state) => ({
      contents: [...state.contents, content],
    })),
  setContents: (data) => set({ contents: data }),
  addFilterContents: (data) =>
    set({
      filteredContents: [...data],
    }),
}));
