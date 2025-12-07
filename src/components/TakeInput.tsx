import { File } from "lucide-react";
import type React from "react";
import type { LinkType } from "../lib/formatLink";

function TakeInput({type,setLink}:{
    type: LinkType;
    setLink: React.Dispatch<React.SetStateAction<string | File>>;
}) {
    if (type === "image") {
      return (
        <div>
          <label
            htmlFor="imageUrl"
            className="flex gap-2 items-center justify-center mb-2 font-medium border rounded-2xl p-2 border-gray-600"
          >
            Click to upload image:
            <File />
            <input
              type="file"
              id="imageUrl"
              name="imageUrl"
              className="border rounded-2xl p-2 w-full"
              required
              hidden
              onChange={(e)=>{
                if(typeof e.target.files==="object" && e.target.files!==null){
                  setLink(e.target.files[0]);
                }
              }}
            />
          </label>
        </div>
      );
    } else if (type === "youtube") {
      return (
        <div>
          <label
            htmlFor="youtubeUrl"
            className="flex gap-2 items-center justify-center mb-2 font-medium"
          >
            Video URL:
            <input
              type="text"
              id="youtubeUrl"
              name="youtubeUrl"
              className="border rounded-2xl p-2 w-full border-gray-600"
              required
              onChange={(e) => setLink(e.target.value)}
            />
          </label>
        </div>
      );
    } else if (type === "twitter") {
      return(
        <div>
          <label
            htmlFor="twitterUrl"
            className="flex gap-2 items-center justify-center mb-2 font-medium"
          >
            Post URL:
            <input
              type="text"
              id="twitterUrl"
              name="twitterUrl"
              className="border rounded-2xl p-2 w-full border-gray-600"
              required
              onChange={(e) => setLink(e.target.value)}
            />
          </label>
        </div>
      );
    } else {
      return null;
    }
}
export default TakeInput;