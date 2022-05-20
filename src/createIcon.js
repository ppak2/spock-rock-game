import "./App.css";
import { useRef, useEffect } from "react";
import { Icon } from "./IconContainer.component";

const resetSelectedIcon = (iconElement) => iconElement.classList.remove("selected");

export const PlayerIcon = (props) => {
  const { getChoice, reset } = props;
  let choice = useRef("");
  let firstResetRender = useRef(true);

  const choiceHandler = (event) => {
    choice.current = event.target;
    getChoice((state) => {
      if (state === choice.current.title) {
        return new String(choice.current.title) 
      }
      else {
        return choice.current.title;
      }
    });
    choice.current.classList.add("selected");
  };

  useEffect(() => {
    if (firstResetRender.current) {
      firstResetRender.current = false;
      return;
    }
    console.log(' INSIDE RESET ');
    resetSelectedIcon(choice.current);
  }, [reset]);

  return (
    <div className="play-container" id="player" onClick={choiceHandler}>
      <Icon who={"player"} showSide={"You"} {...props}/>
    </div>
  );
};

export const CpuIcon = (props) => {
  const { getChoice: selectIndex, reset } = props;
  const iconContainer = useRef();
  let choice = useRef("");
  let firstRender = useRef(true);
  let firstResetRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    choice.current = iconContainer.current.children[selectIndex + 1];
    console.log(choice.current);
    choice.current.classList.add("selected");
  }, [selectIndex]);

  useEffect(() => {
    if (firstResetRender.current) {
      firstResetRender.current = false;
      return;
    }
    resetSelectedIcon(choice.current);
  }, [reset]);

  return (
    <div className="play-container" id="cpu" ref={iconContainer}>
      <Icon who={"cpu"} showSide={"Computer"} {...props}/>
    </div>
  );
};
