import axios from "axios";
import { create } from "zustand";
import Cookies from "js-cookie";

export interface ContentType {
  id: string;
  type: string;
  title: string;
  description: string;
  link: string;
}

interface ContentStoreType {
  contents: ContentType[];
  filteredContents: ContentType[];
  addContent: (content: ContentType) => void;
  setContents: (data: ContentType[]) => void;
  setFilteredContents: (data: ContentType[]) => void;
  fetchContent: () => void;
}

export const useContentStore = create<ContentStoreType>((set, get) => ({
  contents: [],
  filteredContents: [],
  addContent: (content) =>
    set((state) => ({
      contents: [...state.contents, content],
    })),
  setContents: (data) => set({ contents: data }),
  setFilteredContents: (data) =>
    set({
      filteredContents: [...data],
    }),
  async fetchContent() {
    const token = Cookies.get("braintoken");
    if (!token) return;

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/getcontent`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    set({ contents: res.data.contents, filteredContents: res.data.contents });
  },
}));
