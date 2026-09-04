import { useEffect } from "react";

/**
 * Sets the document title and meta description for the current page.
 * No react-helmet dependency needed for a handful of static pages.
 */
function Seo({ title, description }) {
  useEffect(() => {
    document.title = title ? `${title} | Salat Guide` : "Salat Guide";

    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", description);
    }
  }, [title, description]);

  return null;
}

export default Seo;
