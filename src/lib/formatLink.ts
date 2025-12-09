export type LinkType = "text" | "youtube" | "twitter" | "image";

function formatLink(link: string, type: LinkType): string {
  let formattedLink;

  switch (type) {
    case "youtube": {
      const youtubeMatch = link.match(
        /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\?v=))([^&\n?#]+)/
      );

      if (youtubeMatch?.[1]) {
        formattedLink = `https://www.youtube.com/embed/${youtubeMatch[1]}`;
      } else {
        formattedLink = link; // fallback
      }
      break;
    }
    case "twitter": {
      const arr = link.split("/");
      console.log(arr);
      const statusIndex = arr.findIndex((part) => part === "status");
      const id = arr[statusIndex + 1].split("?")[0];
      formattedLink = `https://twitter.com/${arr[3]}/status/${id}`;
      break;
    }
    case "image":
    case "text":
    default:
      formattedLink = link;
  }

  return formattedLink;
}

export default formatLink;