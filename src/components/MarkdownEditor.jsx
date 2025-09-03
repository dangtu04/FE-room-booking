import React from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkdownIt();

const MarkdownEditor = ({ value = "", onChange }) => {
  const handleEditorChange = ({ text }) => {
    const html = mdParser.render(text);
    onChange?.({ markdown: text, html });
  };

  return (
    <MdEditor
      value={value}
      style={{ height: "500px" }}
      renderHTML={(text) => mdParser.render(text)}
      onChange={handleEditorChange}
    />
  );
};

export default MarkdownEditor;
