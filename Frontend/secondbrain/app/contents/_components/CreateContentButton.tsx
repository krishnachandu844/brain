"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CopyIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group";

import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useContentStore } from "@/store/useContent";

export default function CreateContentButton() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const addcontent = useContentStore((state) => state.addContent);

  const createContent = async () => {
    if (!title || !type || !description) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      const token = Cookies.get("braintoken");

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/addcontent`,
        {
          title,
          type,
          description,
          link,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      addcontent(response.data.content);
      console.log(response);
      toast.success("Content created successfully");
      setOpen(false);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create content");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <p
          className='flex items-center gap-x-2 bg-primary text-white px-4 py-2 rounded-md cursor-pointer'
          role='button'
        >
          Add Content <PlusCircleIcon />
        </p>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className='py-5'>
            Create your personal knowledge hub
          </DialogTitle>

          <DialogDescription>
            <div className='grid w-full max-w-sm gap-7 text-black'>
              {/* Title */}
              <InputGroup>
                <InputGroupInput
                  placeholder='Enter Your Title'
                  type='text'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </InputGroup>

              {/* Type */}
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Enter Your Type' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='Instagram'>Instagram</SelectItem>
                  <SelectItem value='Facebook'>Facebook</SelectItem>
                  <SelectItem value='Twitter'>Twitter</SelectItem>
                  <SelectItem value='Youtube'>Youtube</SelectItem>
                </SelectContent>
              </Select>

              {/* Description */}
              <InputGroup>
                <InputGroupTextarea
                  placeholder='Enter Your Description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </InputGroup>

              {/* Link */}
              <InputGroup>
                <InputGroupInput
                  placeholder='https://example.com'
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                />
                <InputGroupAddon align='inline-end'>
                  <InputGroupButton
                    aria-label='Copy'
                    title='Copy'
                    size='icon-xs'
                  >
                    <CopyIcon />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>

              <Button onClick={createContent} disabled={loading}>
                {loading ? "Creating..." : "Create"}
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
