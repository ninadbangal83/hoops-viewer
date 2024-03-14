import React from "react";
import explosion from "../assets/svg/explosion.png";
import isolate from "../assets/svg/isolate.png";

// Below functions are used to create icons for toolbar buttons.
const Explosion = () => <img src={explosion} height={25} width={25} alt="#" />;
const Isolate = () => <img src={isolate} height={25} width={25} alt="#" />;

export { Explosion, Isolate };
