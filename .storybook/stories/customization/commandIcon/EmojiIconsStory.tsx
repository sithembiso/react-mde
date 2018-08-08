import * as React from "react";
import * as Showdown from "showdown";
import ReactMde, { ReactMdeTypes } from "../../../../src/index";
import { storiesOf } from "@storybook/react";

interface State {
  value: string;
}

const icons = {
  bold: <strong>B</strong>,
  heading: "H",
  italic: <em>I</em>,
  strikethrough: <del>S</del>,
  link: "🔗",
  "quote-right": <strong>”</strong>,
  code: "🤓",
  image: "📸",
  "list-ul": "⏺",
  "list-ol": "#️⃣",
  tasks: "📝"
};

const iconProvider = name => {
  return icons[name] || "❓";
};

class EmojiIconsStory extends React.Component<{}, State> {
  converter: Showdown.Converter;

  constructor(props) {
    super(props);
    this.state = {
      value: "**Hello world!**"
    };
    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true
    });
  }

  handleValueChange = (value: string) => {
    this.setState({ value });
  };

  render() {
    return (
      <ReactMde
        layout="horizontal"
        buttonContentOptions={{ iconProvider }}
        onChange={this.handleValueChange}
        value={this.state.value}
        generateMarkdownPreview={markdown =>
          Promise.resolve(this.converter.makeHtml(markdown))
        }
      />
    );
  }
}

storiesOf("Customization", module).add("Command emoji", () => (
  <EmojiIconsStory />
));
