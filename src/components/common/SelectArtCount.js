import React, { useContext, useRef, useState, useEffect } from "react";
import EnergySvg from "components/common/svgs/energySvg";
import { useClickAway } from "react-use";

import { MainContext } from "components/shared/providers";

function SelectArtCount() {
  const ref = useRef(null);
  const inputRef = useRef(null);
  const { router, handleArtGenerate } = useContext(MainContext);
  const [artCount, setArtCount] = useState(1);
  const [width, setWidth] = useState(0);

  useClickAway(
    ref,
    () => {
      router.toBack();
    },
    ["mousedown"]
  );

  const handleIncreaseCount = () => {
    if (artCount < 10) {
      setArtCount((prevArtCount) => (prevArtCount += 1));
    }
  };

  const handleDecreaseCount = () => {
    if (artCount > 1) {
      setArtCount((prevArtCount) => (prevArtCount -= 1));
    }
  };

  const handleChangeArtCount = (e) => {
    if (e.target.value <= 10 && e.target.value >= 0 && e.target.value[0] != 0) {
      setArtCount(e.target.value);
    }
  };

  useEffect(() => {
    setWidth(inputRef?.current?.value.length);
  }, [artCount]);

  return (
    <div className={` PayConfirm ${"open"}`} ref={ref}>
      <div className="PayConfirm__header" onClick={() => router.toBack()}></div>
      <div className="PayConfirm__title title_h2-32px">
        Сколько артов хотите сгенерировать?
      </div>
      <div className="ArtCount">
        <div
          className="ArtCount__minus ArtCount__block"
          onClick={handleDecreaseCount}
        >
          <div></div>
        </div>
        <div
          className="ArtCount__total"
          onClick={() => inputRef.current.focus()}
        >
          <input
            value={artCount}
            onChange={handleChangeArtCount}
            onBlur={() => artCount == 0 && setArtCount(1)}
            ref={inputRef}
            style={{ width: width + "ch" }}
          />
        </div>
        <div
          className="ArtCount__plus ArtCount__block"
          onClick={handleIncreaseCount}
        >
          <div></div>
        </div>
      </div>
      <div
        className="ArtCount__btn btn"
        onClick={() => {
          router.toBack();
          handleArtGenerate(artCount);
        }}
      >
        Создать арт <div className="createBtn__delimetr"></div>
        <EnergySvg width={"18px"} height={"18px"} color="#FFFFFF" />{" "}
        {15 * artCount}
      </div>
    </div>
  );
}

export default SelectArtCount;
