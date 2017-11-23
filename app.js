const React = require("react");
const ReactMarkdown = require("react-markdown");

const capitalise = string => {
  if (string === "aws") return string.toUpperCase();

  return `${string.charAt(0).toUpperCase()}${string.slice(1)}`;
};

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false
    };
  }

  handleToggle() {
    const { open } = this.state;

    this.setState({
      open: !open
    });
  }

  render() {
    const { files } = this.props;
    const { open } = this.state;

    return (
      <div className="sidebar">
        <label htmlFor="handle">
          <span>|||</span>
        </label>
        <input type="checkbox" id="handle" />
        <aside className={`sticky ${open ? "open" : ""}`}>
          <img src="./dual-masthead.svg" />
          <ul>
            {Object.keys(files).map((folder, index) => {
              const documents = files[folder];
              if (documents.length === 0) return null;

              return (
                <li key={index}>
                  <a href={`#${folder}`}>{folder}</a>
                </li>
              );
            })}
          </ul>
        </aside>
      </div>
    );
  }
}

const Content = ({ files }) => (
  <main>
    <header>
      <h1>🎓 Learning</h1>
      <p>Useful posts, articles, videos and podcasts related to development</p>
    </header>

    {Object.keys(files).map((folder, index) => {
      const documents = files[folder];
      if (documents.length === 0) return null;

      return (
        <section key={index} id={folder}>
          <h2>{capitalise(folder)}</h2>
          {documents.map(({ content }, index) => (
            <div className="markdown" key={index}>
              <ReactMarkdown source={content} />
            </div>
          ))}
        </section>
      );
    })}
  </main>
);

const App = ({ files }) => (
  <div className="wrapper">
    <Sidebar files={files} />
    <Content files={files} />
  </div>
);

module.exports = App;
