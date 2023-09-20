import React, { useState, useContext, useEffect } from "react";
import "./Admin.css";
import {
  AdminContext,
  ContestsContext,
  MainContext,
} from "components/shared/providers";
import { useGetPanelForView } from "@vkontakte/vk-mini-apps-router";
import Filters from "components/common/Filters";
import moment from "moment";
import deleteSvg from "assets/img/profile__delete.svg";
import EditSvg from "components/common/svgs/editSvg";
import checkMark from "assets/img/checkMark.svg";
import warningMark from "assets/img/warningMark.svg";
import { DateInput, Panel, View } from "@vkontakte/vkui";
import NewContest from "./NewContest";
import Complaints from "./Complaints";
import NotFoundPage from "components/common/NotFoundPage";

const Admin = ({ id }) => {
  const { fetchedUser, isAdmin, go } = useContext(MainContext);
  const activePanel = useGetPanelForView(id);
  const { contests } = useContext(ContestsContext);
  const { deleteContest, completeContest, setActiveContestData } =
    useContext(AdminContext);
  const [currentFilter, setCurrentFilter] = useState();
  const filtersData = [
    { id: "workAcceptance", text: "Прием работ" },
    { id: "vote", text: "Голосование" },
    { id: "ended, pre-ended", text: "Закончилось" },
  ];

  if (!isAdmin) {
    return <NotFoundPage />;
  }

  return (
    <View id={id} activePanel={activePanel}>
      <Panel id="home">
        <div className="Admin">
          <div className="gradient-round"></div>
          <div className="Admin__wrap">
            <div className="title_h2-32px">Админ панель</div>
            <div className="Admin__func">
              <div className="Admin__title ">
                <span className="title_h3-24px"> Конкурсы: </span>

                <div
                  className="Admin__contest_btn Admin__newContestBtn"
                  onClick={() => {
                    setActiveContestData({});
                    go("/newContest");
                  }}
                >
                  Создать
                </div>
              </div>
              <Filters
                data={filtersData}
                currentFilter={currentFilter}
                setCurrentFilter={setCurrentFilter}
              />
              <div className="Admin__contests">
                {contests.map((item, index) => {
                  let type = filtersData.find((filter) =>
                    filter.id.includes(item.type)
                  )?.text;

                  if (currentFilter?.includes(item.type)) {
                    return (
                      <div key={index} className="Admin__contest">
                        <div className="Admin__contest_wrap">
                          <img
                            className="Admin__contest_img"
                            src={item.backgroundLink}
                          />
                          <div className="Admin__contest_info">
                            <div className="Admin__contest_title ">
                              <span className="text_accented">Название: </span>
                              {item.name}
                            </div>
                            <div className="Admin__contest_desc">
                              <span className="text_accented">Описание: </span>
                              {item.desc}
                            </div>
                            <div className="Admin__contest_desc">
                              <span className="text_accented">
                                Текущий этап:{" "}
                              </span>
                              {type}
                            </div>
                            <div className="Admin__contest_date">
                              <span className="text_accented">
                                Дата окончания принятия работ:{" "}
                              </span>
                              <br />
                              {item.workAcceptanceDate == 0
                                ? "Этап завершён"
                                : moment(item.workAcceptanceDate).format(
                                    "MMMM Do YYYY, h:mm:ss a"
                                  )}
                            </div>
                            <div className="Admin__contest_date">
                              <span className="text_accented">
                                Дата окончания голосования:{" "}
                              </span>
                              <br />
                              {item.voteDate == 0
                                ? "Этап завершён"
                                : moment(item.voteDate).format(
                                    "MMMM Do YYYY, h:mm:ss a"
                                  )}
                            </div>
                          </div>
                        </div>

                        <div className="Admin__contest_btns">
                          {item.type == "pre-ended" && (
                            <div
                              className="Admin__contest_btn"
                              onClick={() => completeContest(item.id)}
                            >
                              <span>Завершить</span>
                              <img src={checkMark} />
                            </div>
                          )}

                          <div
                            className="Admin__contest_btn"
                            onClick={() => {
                              go("/newContest");
                              setActiveContestData(item);
                            }}
                          >
                            <span>Изменить</span>
                            <EditSvg color="#b0e822" />
                          </div>
                          <div
                            className="Admin__contest_btn"
                            onClick={() => {
                              go("/Complaints");
                              setActiveContestData(item);
                            }}
                          >
                            <span>Жалобы</span>
                            <img src={warningMark} />
                          </div>
                          <div
                            className="Admin__contest_btn"
                            onClick={() => deleteContest(item.id)}
                          >
                            <span>Удалить</span>
                            <img src={deleteSvg} />
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </Panel>
      <NewContest id="newContest" />
      <Complaints id="complaints" />
    </View>
  );
};

export default Admin;
