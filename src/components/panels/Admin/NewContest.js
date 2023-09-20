import React, { useState, useContext, useEffect } from "react";
import { DateInput, Input, Panel, Select, Textarea } from "@vkontakte/vkui";
import { AdminContext, MainContext } from "components/shared/providers";
import backBtn from "assets/img/back-btn.svg";

import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Form, Upload } from "antd";
import Prizes from "./components/Prizes";

function NewContest({ id }) {
  const { goReplace } = useContext(MainContext);
  const { updateContest, activeContestData, addNewContest } =
    useContext(AdminContext);
  const [contestName, setContestName] = useState("");
  const [contestDesc, setContestDesc] = useState("");
  const [img, setImg] = useState();
  const [prizes, setPrizes] = useState([]);
  const [workAcceptanceDate, setWorkAcceptanceDate] = useState(
    () => new Date()
  );
  const [voteDate, setVoteDate] = useState(() => new Date());
  const [type, setType] = useState("");

  let toTimestamp = (strDate) => Date.parse(strDate);

  const onChoseFileHandler = (e, callback) => {
    const file = e.file.originFileObj;
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result
        .replace("data:", "")
        .replace(/^.+,/, "");
      callback(base64String); // Вызываем callback с полученным base64
    };

    reader.readAsDataURL(file);
  };

  const onChangeWorkAcceptance = (value) => {
    setWorkAcceptanceDate(value);
  };

  const onChangeVoteDate = (value) => {
    setVoteDate(value);
  };

  useEffect(() => {
    if (activeContestData.id) {
      setContestName(activeContestData.name);
      setContestDesc(activeContestData.desc);
      setWorkAcceptanceDate(new Date(activeContestData.oldWorkAcceptanceDate));
      setVoteDate(new Date(activeContestData.oldVoteDate));
      setImg(activeContestData.backgroundLink);
      setPrizes(activeContestData.prizes);
      setType(activeContestData.type);
    }
  }, [activeContestData]);

  const addContest = async () => {
    const data = {
      name: contestName,
      desc: contestDesc,
      backgroundLink: img,
      workAcceptanceDate: toTimestamp(workAcceptanceDate),
      voteDate: toTimestamp(voteDate),
      prizes: prizes,
    };
    addNewContest(data);
  };

  const editContest = async () => {
    const data = {
      contest_id: activeContestData.id,
      name: contestName,
      desc: contestDesc,
      type: type,
      backgroundLink: img,
      workAcceptanceDate: +workAcceptanceDate,
      voteDate: +voteDate,
      prizes: prizes,
    };

    updateContest(data);
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  return (
    <Panel id="newContest">
      <div className="Contest">
        <div className="gradient-round"></div>

        <div className="Contest__wrap ">
          <div className="Contest__controls Header__controls">
            <div
              className="inquiry__controls_closeBtn roundBtn_blur"
              onClick={() => {
                goReplace("/admin");
              }}
            >
              <img src={backBtn} />
            </div>
          </div>
          <div className="addContest">
            <div className="Contest__body ">
              <div className="addContest__item">
                <div className="addContest__item_title ">
                  Название конкурса:
                </div>
                <Input
                  placeholder="Какое название?"
                  value={contestName}
                  onChange={(e) => {
                    setContestName(e.target.value);
                  }}
                />
              </div>
              <div className="addContest__item">
                <div className="addContest__item_title ">
                  Описание конкурса:
                </div>
                <Textarea
                  placeholder="Какое описание?"
                  value={contestDesc}
                  onChange={(e) => {
                    setContestDesc(e.target.value);
                  }}
                />
              </div>
              <div className="addContest__item">
                <div className="addContest__item_title ">Стадия конкурса:</div>
                <Select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  options={[
                    { label: "Приём работ", value: "workAcceptance" },
                    { label: "Голосование", value: "vote" },
                    { label: "Ожидание завершения", value: "pre-ended" },
                  ]}
                  disabled={!activeContestData.id && true}
                />
              </div>
              <div className="addContest__item">
                <div className="addContest__item_title ">
                  Дата окончания приема работ:
                </div>
                <DateInput
                  value={workAcceptanceDate}
                  onChange={onChangeWorkAcceptance}
                  enableTime={true}
                  disablePast={true}
                  disabled={
                    activeContestData.workAcceptanceDate == 0 &&
                    type != "workAcceptance"
                      ? true
                      : false
                  }
                />
              </div>
              <div className="addContest__item">
                <div className="addContest__item_title ">
                  Дата окончания голосования:
                </div>
                <DateInput
                  value={voteDate}
                  onChange={onChangeVoteDate}
                  enableTime={true}
                  disablePast={true}
                  disabled={
                    type != "workAcceptance" && type != "vote" ? true : false
                  }
                />
              </div>
              <div className="addContest__item">
                <div className="addContest__item_title ">
                  Задний фон конкурса (jpg, png)
                  <br /> Рекомендованный размер: (512 x 512)px:
                </div>
                <Upload
                  listType="picture-card"
                  className="avatar-uploader fileUpload_input"
                  showUploadList={false}
                  customRequest={dummyRequest}
                  onChange={(e) => {
                    onChoseFileHandler(e, (base64) => {
                      setImg(base64);
                    });
                  }}
                >
                  {img ? (
                    <img
                      src={
                        img.length > 200 ? `data:image/jpeg;base64,${img}` : img
                      }
                      style={{ width: "100%" }}
                    />
                  ) : (
                    <UploadOutlined
                      style={{
                        color: "#fff",
                      }}
                    />
                  )}
                </Upload>
              </div>
            </div>
            <Prizes
              prizes={prizes}
              setPrizes={setPrizes}
              dummyRequest={dummyRequest}
              onChoseFileHandler={onChoseFileHandler}
              activeContestData={activeContestData}
            />
            <div
              className="addContest__btn btn"
              onClick={activeContestData.id ? editContest : addContest}
            >
              {activeContestData.id
                ? "Изменить конкурс"
                : "Добавить новый конкурс"}
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}

export default NewContest;
