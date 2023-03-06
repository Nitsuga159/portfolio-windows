import { useContext, useEffect, useState } from "react";
import s from "./Off.module.css";
import { MyContext } from "../GlobalContext/GlobalContext";
import Loader from "../Loader/Loader";
import { CSSTransition } from "react-transition-group";

export default function Off() {
  const { setGlobal, global } = useContext(MyContext);

  useEffect(() => {
    const cbKeydown = (e) => {
      e.key === "Enter" && setGlobal((prev) => ({ ...prev, power: true }));
    };

    window.addEventListener("keydown", cbKeydown);

    return () => window.removeEventListener("keydown", cbKeydown);
  }, []);

  return (
    <CSSTransition
      in={!global.power}
      timeout={300}
      classNames={{
        enter: s.fadeEnter,
        enterActive: s.fadeEnterActive,
        exit: s.fadeExit,
        exitActive: s.fadeExitActive,
      }}
      unmountOnExit
    >
      <div className={`${s["off-container"]}`.trim()} tabIndex={0}>
        <h3 className={s.message}>
          {global.lenguage === "spanish"
            ? "Presione Enter para iniciar"
            : "Press Enter to start"}
        </h3>
      </div>
    </CSSTransition>
  );
}
