import React, { useEffect } from "react";
import "../../assets/css/snowfall.css";

const Snowfall = () => {
  useEffect(() => {
    const generateSnowflakes = () => {
      const snowflakeContainer = document.getElementById("snowflakeContainer");
      const snowflake = document.querySelector(".snowflake");
      const browserWidth = document.documentElement.clientWidth;
      const browserHeight = document.documentElement.clientHeight;
      const numberOfSnowflakes = 10;
      const snowflakes = [];

      for (let i = 0; i < numberOfSnowflakes; i++) {
        const newSnowflake = snowflake.cloneNode(true);
        snowflakeContainer.appendChild(newSnowflake);
        const xPos = getPosition(50, browserWidth);
        const yPos = getPosition(50, browserHeight);
        const speed = 5 + Math.random() * 40;
        const radius = 4 + Math.random() * 10;
        const snowflakeObj = {
          element: newSnowflake,
          speed,
          radius,
          xPos,
          yPos,
          counter: 0,
          sign: Math.random() < 0.5 ? 1 : -1,
        };
        snowflakes.push(snowflakeObj);
      }

      snowflakeContainer.removeChild(snowflake);
      moveSnowflakes();

      function getPosition(offset, size) {
        return Math.round(-1 * offset + Math.random() * (size + 2 * offset));
      }

      function moveSnowflakes() {
        for (let i = 0; i < snowflakes.length; i++) {
          const snowflakeObj = snowflakes[i];
          snowflakeObj.counter += snowflakeObj.speed / 5000;
          snowflakeObj.xPos +=
            (snowflakeObj.sign *
              snowflakeObj.speed *
              Math.cos(snowflakeObj.counter)) /
            40;
          snowflakeObj.yPos +=
            Math.sin(snowflakeObj.counter) / 40 + snowflakeObj.speed / 30;
          setTranslate3DTransform(
            snowflakeObj.element,
            Math.round(snowflakeObj.xPos),
            Math.round(snowflakeObj.yPos)
          );
          if (snowflakeObj.yPos > browserHeight) {
            snowflakeObj.yPos = -50;
          }
        }
        requestAnimationFrame(moveSnowflakes);
      }

      function setTranslate3DTransform(element, x, y) {
        const transformProperty = getSupportedPropertyName([
          "transform",
          "msTransform",
          "webkitTransform",
          "mozTransform",
          "oTransform",
        ]);
        const transformValue = `translate3d(${x}px, ${y}px, 0)`;
        element.style[transformProperty] = transformValue;
      }

      function getSupportedPropertyName(properties) {
        for (let i = 0; i < properties.length; i++) {
          if (typeof document.body.style[properties[i]] !== "undefined") {
            return properties[i];
          }
        }
        return null;
      }
    };

    generateSnowflakes();

    window.addEventListener("resize", setResetFlag);

    return () => {
      window.removeEventListener("resize", setResetFlag);
    };
  }, []);

  const setResetFlag = () => {
    resetPosition = true;
  };

  let resetPosition = false;

  return (
    <div id="snowflakeContainer">
      <p className="snowflake">☁</p>
    </div>
  );
};

export default Snowfall;
