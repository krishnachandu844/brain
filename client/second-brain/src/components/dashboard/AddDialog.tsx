import { PlusIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { PLATFOMS } from "../../lib/data";
import { useState } from "react";
import { toast } from "react-toastify";
import { useContentStore } from "../../store/useContentStore";

const AddDialog = () => {
  const [data, setData] = useState({
    link: "",
    title: "",
    descripton: "",
    type: "INSTAGRAM",
  });

  const { getPosts } = useContentStore();
  const [loading, setLoading] = useState(false);

  const [open, setOpen] = useState(false);

  const handleChange = (e: any) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  //Adding Post
  const addPost = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/addcontent`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );
      const res = await response.json();
      if (response.ok) {
        setLoading(false);
        setOpen(false);
        setData({ link: "", type: "instagram", descripton: "", title: "" });
        toast.success(res.message);
        getPosts();
      } else {
        setLoading(true);
        setOpen(true);
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className='p-5'>
          <PlusIcon />
          Add a post
        </Button>
      </DialogTrigger>
      <DialogContent className='p-6 sm:max-w-lg'>
        <DialogHeader>
          <DialogTitle className='mb-4 text-xl'>Add a post</DialogTitle>
          <DialogDescription className='space-y-4'>
            <div className='space-y-3'>
              <Label className='text-black'>Url</Label>
              <Input
                placeholder='http://example.com...'
                className='py-4'
                name='link'
                onChange={handleChange}
              />
            </div>
            <div className='text-black'>
              <p>
                <span className='font-semibold '>Note : </span>Paste only
                Embeded links of the post
              </p>
            </div>
            <div className='space-y-2'>
              <Label className='text-black'>Platform</Label>
              {/* {PLATFOMS.map((p) => (
                <Button
                  variant={"ghost"}
                  className={`${data.type.toLowerCase() == p.id && "bg-muted text-black"}`}
                  key={p.id}
                  onClick={() => {
                    setData({ ...data, type: p.type! });
                  }}
                >
                  <p.icon></p.icon>
                  {p.label}
                </Button>
              ))} */}
              {PLATFOMS.filter((item) => item.id !== "all").map((p) => (
                <Button
                  variant={"ghost"}
                  className={`${data.type.toLowerCase() == p.id && "bg-muted text-black"}`}
                  key={p.id}
                  onClick={() => {
                    setData({ ...data, type: p.type! });
                  }}
                >
                  <p.icon></p.icon>
                  {p.label}
                </Button>
              ))}
            </div>
            <div className='space-y-2'>
              <Label className='text-black'>Title</Label>
              <Input
                placeholder='Title'
                className='py-4'
                name='title'
                onChange={handleChange}
              />
            </div>
            <div className='space-y-2'>
              <Label className='text-black'>Description</Label>
              <Textarea
                placeholder='Description...'
                name='description'
                onChange={handleChange}
              />
            </div>
            <Button
              className='w-full p-5'
              disabled={!data.link}
              onClick={addPost}
            >
              {loading ? "Saving ..." : "Save Post"}
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddDialog;
