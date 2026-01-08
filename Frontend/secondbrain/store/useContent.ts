import axios from "axios";
import { create } from "zustand";
import Cookies from "js-cookie";

export interface ContentType {
  _id?: string;
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
  activeType: string;
  setUserName: (username: string) => void;
  contents: ContentType[];
  filteredContents: ContentType[];
  addContent: (content: ContentType, activeType: string) => void;
  deleteContent: (id: string) => void;
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
      activeType: activeType,
      contents: updateContents,
      filteredContents:
        activeType == "All"
          ? updateContents
          : updateContents.filter((c) => c.type === activeType),
    }));
  },
  deleteContent: (id) => {
    const { contents, activeType } = get();
    const contentsAfterDeleted = contents.filter((c) => c._id != id);
    set({
      contents: contentsAfterDeleted,
      filteredContents:
        activeType == "All"
          ? contentsAfterDeleted
          : contentsAfterDeleted.filter((c) => c.type == activeType),
    });
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
