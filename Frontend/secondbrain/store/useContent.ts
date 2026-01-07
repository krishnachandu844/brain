import axios from "axios";
import { create } from "zustand";
import Cookies from "js-cookie";

export interface ContentType {
  id?: string;
  type: string;
  title: string;
  description: string;
  link: string;
}

export interface UserType {
  id: string;
  username: string;
  password: string;
}

interface ContentStoreType {
  user: string;
  setUserName: (username: string) => void;
  contents: ContentType[];
  filteredContents: ContentType[];
  addContent: (content: ContentType, activeType: string) => void;
  setContents: (data: ContentType[]) => void;
  setFilteredContents: (data: ContentType[]) => void;
  fetchContent: () => void;
}

export const useContentStore = create<ContentStoreType>((set, get) => ({
  user: "",
  setUserName: (username) => {
    set({ user: username });
  },
  contents: [],
  filteredContents: [],
  activeType: "All",
  addContent: (content, activeType) => {
    const { contents } = get();
    const updateContents = [...contents, content];
    set((state) => ({
      contents: updateContents,
      filteredContents:
        activeType == "All"
          ? updateContents
          : updateContents.filter((c) => c.type === activeType),
    }));
  },
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
