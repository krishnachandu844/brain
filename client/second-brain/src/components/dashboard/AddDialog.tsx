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
import { useForm, type SubmitHandler } from "react-hook-form";

type FormFields = {
  title: string;
  link: string;
  description: string;
  type: string;
};

const AddDialog = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      type: "INSTAGRAM",
    },
  });

  const title = watch("title", "");
  const description = watch("description", "");
  const type = watch("type", "INSTAGRAM");

  const { getPosts } = useContentStore();

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
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
        setOpen(false);
        toast.success(res.message);
        getPosts();
      } else {
        setOpen(true);
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [open, setOpen] = useState(false);

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
          <DialogDescription>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
              {/* Title */}
              <div className='space-y-2'>
                <Label className='text-black'>Title</Label>
                <Input
                  placeholder='Title'
                  className='py-4'
                  maxLength={25}
                  {...register("title", {
                    required: "Title is required",
                  })}
                />

                <div
                  className={`${errors.title && "flex items-center justify-between"}`}
                >
                  {errors.title && (
                    <p className='text-red-500 text-xs'>
                      {errors.title.message}
                    </p>
                  )}
                  <p className='text-right'>{title.length}/25</p>
                </div>
              </div>
              {/* URL */}
              <div className='space-y-3'>
                <Label className='text-black'>Url</Label>
                <Input
                  placeholder='http://example.com...'
                  className='py-4'
                  {...register("link", {
                    required: "Link is Required",
                    validate: (value) => {
                      const isUrl =
                        value.startsWith("http://") ||
                        value.startsWith("https://");
                      const isIframe = value.includes("<iframe");
                      const isBlockquote = value.includes("<blockquote");

                      return (
                        isUrl ||
                        isIframe ||
                        isBlockquote ||
                        "Invalid URL or embed code"
                      );

                      return true;
                    },
                  })}
                />
                {errors.link && (
                  <p className='text-red-500 text-xs'>{errors.link.message}</p>
                )}
              </div>
              {/* Note */}
              <div className='text-black'>
                <p>
                  <span className='font-semibold '>Note : </span>Paste only
                  Embeded links of the post
                </p>
              </div>
              {/* PlatForms Buttons */}
              <div className='space-y-2'>
                <Label className='text-black'>Platform</Label>
                {PLATFOMS.filter((item) => item.id !== "all").map((p) => (
                  <Button
                    type='button'
                    variant={"ghost"}
                    className={`${type.toLowerCase() == p.id && "bg-muted text-black"}`}
                    key={p.id}
                    onClick={() => {
                      setValue("type", p.type);
                    }}
                  >
                    <p.icon></p.icon>
                    {p.label}
                  </Button>
                ))}
              </div>
              {/* Description */}
              <div className='space-y-2'>
                <Label className='text-black'>Description</Label>
                <Textarea
                  placeholder='Description...'
                  {...register("description", {
                    required: "Description is Required",
                  })}
                  maxLength={50}
                />
                <div
                  className={`${errors.description && "flex items-center justify-between"}`}
                >
                  {errors.description && (
                    <p className='text-red-500 text-xs'>
                      {errors.description.message}
                    </p>
                  )}
                  <p className='text-right'>{description.length}/50</p>
                </div>
              </div>

              {/* Submit */}
              <Button
                type='submit'
                className='w-full p-5'
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving ..." : "Save Post"}
              </Button>
            </form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddDialog;
