export default function NewLine(text) {
  return text.replace(/(?:\r\n|\r|\n)/g, "\\n");
}
