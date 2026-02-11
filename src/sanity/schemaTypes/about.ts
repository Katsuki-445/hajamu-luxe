export default {
  name: "about",
  title: "About / Our Story",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
    },
    {
      name: "story",
      title: "Story Content",
      type: "array",
      of: [{ type: "text" }],
      description: "Add paragraphs for the story section",
    },
    {
      name: "image",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
      },
    },
  ],
};
