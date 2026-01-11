import axios from "axios";
import { create } from "zustand";
import Cookies from "js-cookie";
import { title } from "process";

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
  updateContent: (data: ContentType) => void;
  setContents: (data: ContentType[]) => void;
  setFilteredContents: (data: ContentType[], type: string) => void;
  fetchContent: () => void;
}

export const useContentStore = create<ContentStoreType>((set, get) => ({
  user: "",
  contents: [],
  filteredContents: [],
  activeType: "All",
  setUserName: (username) => {
    set({ user: username });
  },
  addContent: (content) => {
    const { contents, activeType } = get();
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
  updateContent: (data) => {
    const { contents, activeType } = get();
    const contentsAfterUpdated = contents.map((c) =>
      c._id == data._id
        ? {
            _id: data._id,
            title: data.title,
            description: data.description,
            link: data.link,
            type: data.type,
          }
        : c
    );
    set({
      contents: contentsAfterUpdated,
      filteredContents:
        activeType == "All"
          ? contentsAfterUpdated
          : contentsAfterUpdated.filter((c) => c.type == activeType),
    });
  },
  setContents: (data) => set({ contents: data }),
  setFilteredContents: (data, type) =>
    set({
      activeType: type,
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
