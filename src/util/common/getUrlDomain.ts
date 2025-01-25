
export const getDomainFromLink = (url: string) => {
  if(!url) return 'URL not found';
  
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname;
  }
  catch(error) {
    console.error("Invalid URL: ", error);
    return url;
  }
}