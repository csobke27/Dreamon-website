// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./routes/navigation/navigation.component";
import { Routes, Route } from "react-router-dom";

import Home from "./routes/home/home.component";
import NyxLegacy from "./routes/nyx-legacy/nyx-legacy.component";
import Blog from "./routes/blog/blog.component";
import BlogPost from "./routes/blog-post/blog-post.component";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        {/* <Route path="about" element={<About />} /> */}
        <Route path="nyx-legacy" element={<NyxLegacy />} />
        <Route path="blog" element={<Blog />} />
        <Route path="post/:slug" element={<BlogPost />} />
      </Route>
      <Route path="*" element={<h1>404 Page Not Found!</h1>} /> 
    </Routes>
  );
}
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
//   );
// }

export default App;
