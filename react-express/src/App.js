import "./App.css";
import Routing from "./Routing";

function App() {
  return (
    <div className="App">
      <Routing />
      Hello from reactjs123.
    </div>
  );
}

export default App;

// * NOTE: 1
// process.env.NODE_ENV
// Output: 'production' or 'development'

// * NOTE: 2
// We are using proxy(defined in `package.json`) for react in development mode so we can make request to / and still requests reach to our required express server running at different origin(port), yikes!

// * TEST: 1: Testing proxy defined in package.json.
fetch("/api/blogs")
  .then((res) => res.text())
  .then((data) => console.log(data));
