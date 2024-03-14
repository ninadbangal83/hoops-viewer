// This function is used to set the style for active button on click
const activeHandler = (id) => {
  if (id === "home") {
    document.getElementById("orbit").className = "mainBtn";
    document.getElementById("explode").className = "mainBtn";
    document.getElementById("annotations").className = "mainBtn";

    if (document.getElementById(id).className === "mainBtn") {
      document.getElementById(id).className = "mainBtn activeMainBtn";
    } else {
      document.getElementById(id).className = "mainBtn";
    }
  } else if (id === "orbit") {
    document.getElementById("home").className = "mainBtn";
    document.getElementById("explode").className = "mainBtn";
    document.getElementById("annotations").className = "mainBtn";

    // if (document.getElementById(id).className === "mainBtn") {
    //   document.getElementById(id).className = "mainBtn activeMainBtn";
    // } else {
    //   document.getElementById(id).className = "mainBtn";
    // }
  } else if (id === "explode") {
    document.getElementById("home").className = "mainBtn";
    document.getElementById("orbit").className = "mainBtn";
    document.getElementById("annotations").className = "mainBtn";

    // if (document.getElementById(id).className === "mainBtn") {
    //   document.getElementById(id).className = "mainBtn activeMainBtn";
    // } else {
    //   document.getElementById(id).className = "mainBtn";
    // }
  } else if (id === "measurement") {
    document.getElementById("home").className = "mainBtn";
    document.getElementById("orbit").className = "mainBtn";
    document.getElementById("explode").className = "mainBtn";
    document.getElementById("annotations").className = "mainBtn";
  } else if (id === "annotations") {
    document.getElementById("home").className = "mainBtn";
    document.getElementById("orbit").className = "mainBtn";
    document.getElementById("explode").className = "mainBtn";

    if (document.getElementById(id).className === "mainBtn") {
      document.getElementById(id).className = "mainBtn activeMainBtn";
    } else {
      document.getElementById(id).className = "mainBtn";
    }
  } else if (id === "modelBrowser") {
    document.getElementById("home").className = "mainBtn";
    document.getElementById("orbit").className = "mainBtn";
    document.getElementById("explode").className = "mainBtn";
    document.getElementById("annotations").className = "mainBtn";
  }
};

export { activeHandler };
