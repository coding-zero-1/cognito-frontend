export type LinkType = "text" | "youtube" | "twitter" | "image";

function formatLink(link: string, type: LinkType): string {
  let formattedLink;

  switch (type) {
    case "youtube": {
      // Extract video ID and format as embed link
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

    case "twitter":
      formattedLink = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        link
      )}`;
      break;

    case "image":
    case "text":
    default:
      formattedLink = link;
  }

  return formattedLink;
}

export default formatLink;