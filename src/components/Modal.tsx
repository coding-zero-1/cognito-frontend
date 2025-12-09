import { useModalStore } from "@/store/store";
import { X } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "./ui/button";
import TakeInput from "./TakeInput";
import formatLink from "@/lib/formatLink";
import { useContent } from "@/hooks/useCards";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "sonner";

function Modal() {
  const isOpen = useModalStore((state) => state.isOpen);
  const closeModal = useModalStore((state) => state.closeModal);
  const { refresh } = useContent();
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<"text" | "image" | "youtube" | "twitter">(
    "text"
  );
  const { getToken } = useAuth();
  const [link, setLink] = useState<string | File>("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const token = await getToken();
    const formData = new FormData();

    formData.append("title", titleRef.current!.value);
    formData.append("description", descriptionRef.current!.value);
    formData.append("type", type);

    if (type === "image") {
      if (link instanceof File) {
        formData.append("image", link); // field name 'image' matches backend upload.single('image')
      } else {
        return alert("Please select an image file");
      }
    } else {
      const formattedLink = formatLink(link as string, type);
      formData.append("link", formattedLink);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/card/create-card`,
        formData,
        {
          headers: {
            token: token,
          },
        }
      );
      console.log("upload response:", response.data.error);
      refresh();
      closeModal();
      toast.success("Card created successfully",{
        position:"top-right",
        duration:3000
      });
    } catch (err) {
      console.error("upload error:", err);
      toast.error("Failed to create card",{
        position:"top-right",
        duration:3000
      });
    }
  }

  return (
    isOpen && (
      <>
        <div className="absolute top-0 left-0 h-dvh w-dvw bg-black/50 z-10"></div>
        <div className="absolute top-0 left-0 w-dvw h-dvh z-20 flex justify-center items-center">
          <div className="md:w-96 w-80 max-h-96 bg-white rounded-lg p-4 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              <X />
            </button>
            <div>
              <h2 className="text-2xl text-center font-bold mb-4">
                Create Card
              </h2>
              <form onSubmit={(e) => handleSubmit(e)}>
                <label
                  htmlFor="title"
                  className="flex gap-2 items-center justify-center mb-2 font-medium"
                >
                  Title:
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="border border-gray-600 rounded-2xl p-2 w-full"
                    required
                    ref={titleRef}
                  />
                </label>
                <label
                  htmlFor="description"
                  className="flex gap-2 items-center justify-center mb-2 font-medium"
                >
                  Description:
                  <input
                    type="text"
                    id="description"
                    name="description"
                    className="border border-gray-600 rounded-2xl p-2 w-full"
                    required
                    ref={descriptionRef}
                  />
                </label>
                <label
                  htmlFor="type"
                  className="flex gap-2 items-center justify-center mb-4 font-medium"
                >
                  Type:
                  <select
                    id="type"
                    name="type"
                    className="border rounded-2xl p-2 w-full border-gray-600"
                    value={type}
                    onChange={(e) =>
                      setType(
                        e.target.value as
                          | "text"
                          | "image"
                          | "youtube"
                          | "twitter"
                      )
                    }
                  >
                    <option value="text">Text</option>
                    <option value="image">Image</option>
                    <option value="youtube">YouTube</option>
                    <option value="twitter">Twitter</option>
                  </select>
                </label>
                <TakeInput type={type} setLink={setLink} />
                <div className="flex justify-center">
                  <Button
                    type="submit"
                    variant={"default"}
                  >
                    Create
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    )
  );
}

export default Modal;
