import { useContent, type Content } from "@/hooks/useCards";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

function UserCards() {
  const { getToken } = useAuth();
  const { refresh, contents } = useContent();
  async function handleCardDelete(cardId: string) {
    const token = await getToken();
    await axios.delete(
      `${import.meta.env.VITE_API_URL}/card/delete-card/${cardId}`,
      {
        headers: {
          token: token,
        },
      }
    );
    refresh();
    toast.success("Card deleted successfully", {
      position: "top-right",
      duration: 3000,
    });
  }
  return contents.length === 0 ? (
    <div className="w-full h-full flex justify-center items-center">
      <p className="text-gray-500 text-lg">
        No content available. Add some cards!
      </p>
    </div>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 h-full w-full overflow-y-auto pr-2">
      {contents.map((content: Content) => (
        <div
          key={content._id}
          className="border rounded-md p-4 shadow hover:shadow-purple-300 hover:shadow-lg transition-shadow duration-200 relative bg-amber-200 h-[300px]"
        >
          <Trash2
            className="absolute right-2 hover:text-red-500"
            onClick={() => handleCardDelete(content._id)}
          />
          <h3 className="text-xl font-semibold mb-2">{content.title}</h3>
          <p className="text-gray-700 mb-3">{content.description}</p>
          {content.type === "youtube" && content.link && (
            <div className="aspect-video">
              <iframe
                src={content.link}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full  2xl:max-h-2/3 rounded-3xl"
              ></iframe>
            </div>
          )}
          {content.type === "twitter" && content.link && (
            <div className="twitter-embed-container h-[200px] overflow-auto">
              <blockquote className="twitter-tweet">
                <a href={content.link}></a>
              </blockquote>
              <script
                async
                src="https://platform.twitter.com/widgets.js"
              ></script>
            </div>
          )}
          {content.type === "image" && content.imageUrl && (
            <img
              src={content.imageUrl}
              alt={content.title}
              className="w-full h-[200px] rounded object-contain"
            />
          )}
        </div>
      ))}
    </div>
  );
}

export default UserCards;
