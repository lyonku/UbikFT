import { Panel } from "@vkontakte/vkui";
import { AdminContext, MainContext } from "components/shared/providers";
import { useContext, useEffect } from "react";
import backBtn from "assets/img/back-btn.svg";

function Complaints({ id }) {
  const {
    activeContestData,
    getComplaintWorks,
    complaintWorks,
    deleteContestArt,
  } = useContext(AdminContext);
  const { goReplace } = useContext(MainContext);

  useEffect(() => {
    if (activeContestData.id) {
      getComplaintWorks(activeContestData.id);
    }
  }, [activeContestData]);

  return (
    <Panel id={id}>
      <div className="Complaints">
        <div className="gradient-round"></div>
        <div className="Complaints__wrap">
          <div
            className="Contest__controls Header__controls"
            style={{ marginBottom: "10px" }}
          >
            <div
              className="inquiry__controls_closeBtn roundBtn_blur"
              onClick={() => {
                goReplace("/admin");
              }}
            >
              <img src={backBtn} />
            </div>
          </div>
          <div className="Complaints__title title_h2-32px">
            <span className="text_accented">Конкурс:</span>{" "}
            {activeContestData?.name}
          </div>
          <div className="Complaints__title title_h2-32px">
            <span className="text_accented">Работы с жалобами:</span>{" "}
            <div className="Complaints__items">
              {complaintWorks?.map((item, index) => {
                return (
                  <div className="Complaints__item" key={index}>
                    <div className="Complaints__item_img">
                      <img src={item.art.artLink} />
                      <div
                        className="Admin__contest_btn"
                        onClick={() => {
                          deleteContestArt({
                            user_id: item.vk_user_id,
                            art_id: item.art.art_id,
                            contest_id: activeContestData.id,
                          }).then(() => {
                            getComplaintWorks(activeContestData.id);
                          });
                        }}
                      >
                        Удалить
                      </div>
                    </div>
                    <div className="Complaints__list_wrap">
                      <div className="Complaints__list_title text_accented">
                        Жалобы:
                      </div>
                      <div className="Complaints__list">
                        {item?.complaint?.map((el, index) => {
                          return (
                            <div key={index} className="Complaints__el">
                              {el}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
}

export default Complaints;
