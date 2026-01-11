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

import { Edit } from "lucide-react";

import {
  InputGroup,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useContentStore } from "@/store/useContent";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "sonner";

export default function UpdateButton({ card }: { card: any }) {
  const [formData, setFormData] = useState({
    _id: "",
    title: "",
    type: "",
    description: "",
    link: "",
  });
  const [open, setOpen] = useState(false);
  const updatedContent = useContentStore((state) => state.updateContent);

  const onClickUpdateContent = async () => {
    updatedContent(formData);
    const token = Cookies.get("braintoken");
    if (!token) return;
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/updatecontent/${card._id}`,
      {
        title: formData.title,
        description: formData.description,
        link: formData.link,
        type: formData.type,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success(res.data.message);
    setOpen(false);
  };

  useEffect(() => {
    if (open && card) {
      setFormData({
        _id: card._id,
        title: card.title,
        description: card.description,
        type: card.type,
        link: card.link,
      });
    }
  }, [open, card]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant={"secondary"} className='cursor-pointer'>
          <Edit />
        </Button>
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
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </InputGroup>

              {/* Type */}
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData({ ...formData, type: value })
                }
              >
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
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </InputGroup>

              {/* Link */}
              <InputGroup>
                <InputGroupInput
                  placeholder='https://example.com'
                  value={formData.link}
                  onChange={(e) =>
                    setFormData({ ...formData, link: e.target.value })
                  }
                />
              </InputGroup>

              <Button onClick={onClickUpdateContent} className=''>
                Update Content
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
