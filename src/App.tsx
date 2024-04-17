import { useEffect, useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";
import { catagoryInitializer, tagInitializer } from "./server/initializer";
import { cn } from "./lib/utils";
import Home from "./components/Home";
import Categories from "./components/Categories";
import Products from "./components/Products";
import Tags from "./components/Tags";

const scenes = ["Categories", "Products", "Tags"];

function App() {
  const [scene, setScene] = useState("Home");

  useEffect(() => {
    // initialize some data
    catagoryInitializer();
    tagInitializer();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="mx-auto">
        <header className="absolute inset-x-0 top-0 z-50 mt-5">
          <nav
            className="flex flex-col lg:flex-row lg:items-baseline lg:justify-between p-6 gap-4"
            aria-label="Global"
          >
            <div>
              <button
                className="text-3xl font-bold underline"
                onClick={() => setScene("Home")}
              >
                Zonesso
              </button>
            </div>
            <div className="flex lg:gap-x-12 gap-4">
              {scenes.map((item, i) => (
                <button
                  key={`scene-${i}`}
                  onClick={() => setScene(item)}
                  className={cn(
                    "text-sm font-semibold leading-6 text-gray-900 py-2 min-w-16 px-5  lg:min-w-36 border rounded-lg",
                    scene === item && "bg-slate-300"
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
            <div>
              <a
                href="/"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Log in <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </nav>
        </header>
      </div>
      {scene === "Home" && <Home />}
      {scene === "Categories" && <Categories />}
      {scene === "Products" && <Products />}
      {scene === "Tags" && <Tags />}
    </div>
  );
}

export default App;
