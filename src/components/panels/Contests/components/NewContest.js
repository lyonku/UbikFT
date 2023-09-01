import React, { useState, useContext, useEffect } from "react";
import { Panel } from "@vkontakte/vkui";
import { MainContext } from "components/shared/providers";

import ContestControls from "components/panels/Contest/components/ContestControls";
import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { DatePicker, Button, Form, Input, Space, Upload } from "antd";
import TextArea from "antd/es/input/TextArea";

function NewContest({ id }) {
  const { router, userData, handleInitContests, notify } =
    useContext(MainContext);
  const [contestName, setContestName] = useState("");
  const [contestDesc, setContestDesc] = useState("");
  const [img, setImg] = useState();
  const [prizes, setPrizes] = useState([]);
  const [workAcceptanceDate, setWorkAcceptanceDate] = useState();
  const [voteDate, setVoteDate] = useState();

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

  const onChangeWorkAcceptance = (date, dateString) => {
    let toTimestamp = (strDate) => Date.parse(strDate);
    setWorkAcceptanceDate(toTimestamp(dateString));
  };

  const onChangeVoteDate = (date, dateString) => {
    let toTimestamp = (strDate) => Date.parse(strDate);
    setVoteDate(toTimestamp(dateString));
  };

  const addNewContest = async () => {
    const data = {
      name: contestName,
      desc: contestDesc,
      type: "workAcceptance",
      img: img,
      workAcceptanceDate: +workAcceptanceDate,
      voteDate: +voteDate,
      prizes: prizes,
    };

    const response = await fetch("https://ubiq.top/addContest", {
      method: "POST",
      body: JSON.stringify(data),
    });
    router.toBack();
    if (response) {
      notify({ text: "Конкурс создан", type: "standart" });
      handleInitContests();
    }
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  return (
    <Panel id={id}>
      <div className="Contest">
        <div className="gradient-round"></div>
        <div className="Contest__wrap ">
          <ContestControls router={router} userData={userData} />
          <div className="addContest">
            <div className="Contest__body ">
              <div className="addContest__item">
                <div className="addContest__item_title">Название конкурса:</div>
                <TextArea
                  placeholder="Какое название?"
                  autoSize
                  value={contestName}
                  onChange={(e) => {
                    setContestName(e.target.value);
                  }}
                />
              </div>
              <div className="addContest__item">
                <div className="addContest__item_title">Описание конкурса:</div>
                <TextArea
                  placeholder="Какое описание?"
                  autoSize
                  value={contestDesc}
                  onChange={(e) => {
                    setContestDesc(e.target.value);
                  }}
                />
              </div>
              <div className="addContest__item">
                <div className="addContest__item_title">
                  Дата окончания приема работ:
                </div>
                <DatePicker
                  onChange={onChangeWorkAcceptance}
                  showTime
                  className="addContest__date"
                />
              </div>
              <div className="addContest__item">
                <div className="addContest__item_title">
                  Дата окончания голосования:
                </div>
                <DatePicker
                  onChange={onChangeVoteDate}
                  showTime
                  className="addContest__date"
                />
              </div>
              <div className="addContest__item">
                <div className="addContest__item_title">
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
                      src={`data:image/jpeg;base64,${img}`}
                      style={{ width: "100%" }}
                    />
                  ) : (
                    <UploadOutlined />
                  )}
                </Upload>
              </div>
            </div>
            <div className="addContest__item">
              <div className="addContest__item_title">
                Призы (jpg, png) <br /> Рекомендованный размер: (512 x 512)px:
              </div>
              <Form
                name="dynamic_form_nest_item"
                style={{
                  maxWidth: 600,
                }}
                autoComplete="off"
              >
                <Form.List name="users">
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map(({ key, name, ...restField }, index) => {
                        return (
                          <div className="prize-items" key={index}>
                            <div className="prize-item">
                              <Input
                                placeholder="Что за приз?"
                                value={prizes[index].name}
                                onChange={(e) => {
                                  let copy = [...prizes];
                                  copy[index].name = e.target.value;
                                  setPrizes(copy);
                                }}
                              />
                            </div>
                            <div className="prize-item">
                              <Upload
                                listType="picture-card"
                                customRequest={dummyRequest}
                                onChange={(e) => {
                                  onChoseFileHandler(e, (base64) => {
                                    let copy = [...prizes];
                                    copy[index].img = base64;
                                    setPrizes(copy);
                                  });
                                }}
                                className="avatar-uploader prizes-upload"
                                showUploadList={false}
                              >
                                {prizes[index].img ? (
                                  <img
                                    src={`data:image/png;base64,${prizes[index].img}`}
                                    alt="avatar"
                                    style={{ width: "100%" }}
                                  />
                                ) : (
                                  <UploadOutlined />
                                )}
                              </Upload>
                            </div>
                            <MinusCircleOutlined
                              onClick={() => {
                                remove(name);
                                let copy = [...prizes];
                                copy.splice(index, 1);
                                setPrizes(copy);
                              }}
                            />
                          </div>
                        );
                      })}
                      <Form.Item>
                        <Button
                          type="dashed"
                          onClick={() => {
                            add();
                            let copy = [...prizes];
                            copy.push({ name: "", img: "", winner: {} });
                            setPrizes(copy);
                          }}
                          block
                          icon={<PlusOutlined />}
                        >
                          Добавить приз
                        </Button>
                      </Form.Item>
                    </>
                  )}
                </Form.List>
              </Form>
            </div>

            <div className="addContest__btn btn" onClick={addNewContest}>
              Добавить новый конкурс
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}

export default NewContest;
