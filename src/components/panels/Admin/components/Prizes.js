import {
  MinusCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Input } from "@vkontakte/vkui";
import { Button, Form, Upload } from "antd";

function Prizes({
  prizes,
  setPrizes,
  dummyRequest,
  onChoseFileHandler,
  activeContestData,
}) {
  return (
    <div className="addContest__item">
      <div className="addContest__item_title ">
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
          {(fields, { add, remove }) => {
            // if (activeContestData?.prizes?.length >= prizes.length) {
            //   for (let i = 0; i < activeContestData.prizes.length; i++) {
            //     fields.push({
            //       name: i,
            //       key: i,
            //       isListField: true,
            //       fieldKey: i,
            //     });
            //   }
            // }
            return (
              <>
                {prizes.map((item, index) => {
                  return (
                    <div className="prize-items" key={index}>
                      <div className="prize-item">
                        <Input
                          placeholder="Что за приз?"
                          value={item?.name ? item.name : ""}
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
                              item.img = base64;
                              setPrizes(copy);
                            });
                          }}
                          className="avatar-uploader prizes-upload"
                          showUploadList={false}
                        >
                          {item?.img ? (
                            <img
                              src={
                                item?.img.length > 200
                                  ? `data:image/png;base64,${item?.img}`
                                  : item?.img
                              }
                              alt="avatar"
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
                      <MinusCircleOutlined
                        onClick={() => {
                          remove();
                          let copy = [...prizes];
                          copy.splice(index, 1);
                          setPrizes(copy);
                        }}
                        style={{
                          color: "#fff",
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
            );
          }}
        </Form.List>
      </Form>
    </div>
  );
}

export default Prizes;
