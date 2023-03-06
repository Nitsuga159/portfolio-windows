import {
  Suspense,
  lazy,
  useCallback,
  useContext,
  useRef,
  useState,
} from "react";
import "./App.css";
import Loading from "./Loading/Loading";
import { MyContext } from "./GlobalContext/GlobalContext";
import Off from "./Off/Off";

const Home = lazy(() => import("./Home/Home"));
const ToolBar = lazy(() => import("./ToolBar/ToolBar"));

function App() {
  const appRef = useRef(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { power } = useContext(MyContext).global;

  const handleFullscreen = useCallback(() => {
    isFullscreen
      ? document.exitFullscreen()
      : appRef.current.requestFullscreen();

    setIsFullscreen((prev) => !prev);
  }, [appRef, isFullscreen]);

  return (
    <div className="app" ref={appRef}>
      {power && (
        <Suspense fallback={<Loading showLoading={true} />}>
          <Loading showLoading={false} />
          <Home />
          <ToolBar />
          <svg
            version="1.1"
            viewBox="0 0 14 14"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:sketch="http://www.bohemiancoding.com/sketch/ns"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            className={"fullscreen-icon"}
            onClick={handleFullscreen}
          >
            <title />
            <desc />
            <defs />
            <g
              fill="none"
              fill-rule="evenodd"
              id="Page-1"
              stroke="none"
              stroke-width="1"
            >
              <g
                fill="#FFF"
                id="Core"
                transform="translate(-215.000000, -257.000000)"
              >
                <g
                  id="fullscreen"
                  transform="translate(215.000000, 257.000000)"
                >
                  <path
                    d="M2,9 L0,9 L0,14 L5,14 L5,12 L2,12 L2,9 L2,9 Z M0,5 L2,5 L2,2 L5,2 L5,0 L0,0 L0,5 L0,5 Z M12,12 L9,12 L9,14 L14,14 L14,9 L12,9 L12,12 L12,12 Z M9,0 L9,2 L12,2 L12,5 L14,5 L14,0 L9,0 L9,0 Z"
                    id="Shape"
                  />
                </g>
              </g>
            </g>
          </svg>
        </Suspense>
      )}
      <Off />
    </div>
  );
}

export default App;
