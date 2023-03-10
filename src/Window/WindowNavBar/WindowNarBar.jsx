import { useCallback, useContext, useState } from "react";
import Svg from "../../SVG/Svg";
import s from "./WindowNavBar.module.css";
import { MyContext } from "../../GlobalContext/GlobalContext";

export default function WindowNavBar({
  handleMousePressed,
  handleMouseUp,
  windowRef,
  folder,
  color,
}) {
  const { removeWindowActive, setWindowsActive } = useContext(MyContext);

  const handleResizeWindow = useCallback(() => {
    if (!windowRef) return;

    const { width, height, top, left } = windowRef.style;
    const isComplete =
      width === "100%" && height === "100%" && top === "0px" && left === "0px";

    windowRef.style.width = isComplete ? "50%" : "100%";
    windowRef.style.height = isComplete ? "50%" : "100%";
    windowRef.style.top = isComplete ? "25%" : "0px";
    windowRef.style.left = isComplete ? "25%" : "0px";
  }, [windowRef]);

  const handleFoldersMinimized = useCallback((id) => {
    setWindowsActive((prevFolders) =>
      prevFolders.map((folder) => {
        if (folder.id != id) return folder;
        folder.minimized = true;
        return folder;
      })
    );
  }, []);

  return (
    <div
      className={`${s["window-navbar-container"]} ${s["navbar-" + color]}`}
      onMouseDown={handleMousePressed}
      onTouchStart={handleMousePressed}
      onMouseUp={handleMouseUp}
      onTouchEnd={handleMouseUp}
      onBlur={handleMouseUp}
      tabIndex={0}
    >
      <div className={s["container-items-left"]}>
        <Svg icon={folder.icon} className={s["folder-icon"]} />
        <h4
          className={`${s["item-left-title"]} ${s["item-left-title-" + color]}`}
        >
          {folder.name}
        </h4>
      </div>
      <div className={s["container-items-right"]}>
        <div
          className={`${s["container-item"]} ${s["container-item-" + color]}`}
          onClick={() => handleFoldersMinimized(folder.id)}
        >
          <Svg
            icon="line"
            className={`${s["icon-navbar"]} ${s["icon-" + color]}`}
          />
        </div>
        <div
          className={`${s["container-item"]} ${s["container-item-" + color]}`}
          onClick={handleResizeWindow}
        >
          <Svg
            icon="square"
            className={`${s["icon-navbar"]} ${s["icon-" + color]}`}
          />
        </div>
        <div
          className={`${s["container-item"]} ${s["container-item-" + color]}`}
          onClick={() => removeWindowActive(folder.id)}
        >
          <Svg
            icon="x"
            className={`${s["icon-navbar"]} ${s["icon-" + color]}`}
          />
        </div>
      </div>
    </div>
  );
}
