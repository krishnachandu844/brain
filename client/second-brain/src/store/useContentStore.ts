import { create } from "zustand";
import { toast } from "react-toastify";

export interface Post {
  id: string;
  link: string;
  title: string;
  type: string;
  description: string;
}

interface ContentStoreTypes {
  posts: null | Post[];
  filteredPosts: null | Post[];
  activeType: string;
  setActiveType: (option: string) => void;
  setFilteredPosts: (option: string) => void;
  getPosts: () => void;
}

export const useContentStore = create<ContentStoreTypes>((set, get) => ({
  posts: null,
  filteredPosts: null,
  activeType: "all",
  loading: false,

  setActiveType(option) {
    set({ activeType: option });
  },

  setFilteredPosts(option) {
    const posts = get().posts;
    if (option == "all") {
      set({ filteredPosts: posts });
      return;
    }
    console.log(posts);
    const filtered = posts?.filter((p) => p.type.toLowerCase() == option);
    set({ filteredPosts: filtered });
  },

  getPosts: async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/getcontent`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const res = await response.json();
      if (response.ok) {
        set({ posts: res.contents, filteredPosts: res.contents });
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  },
}));
