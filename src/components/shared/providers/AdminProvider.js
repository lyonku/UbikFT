import { createContext, useState, useEffect, useContext } from "react";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { MainContext } from "./MainProvider";
import { ContestsContext } from "./ContestsProvider";
import { get, post } from "utils/api";

export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
  const routeNavigator = useRouteNavigator();
  const { activeContest, handleInitContests } = useContext(ContestsContext);
  const { notify, goBack } = useContext(MainContext);
  const [activeContestData, setActiveContestData] = useState({});
  const [complaintWorks, setComplaintWorks] = useState([]);

  // Method for approving contest to ended type
  const completeContest = async (contest_id) => {
    const data = { contest_id: contest_id };
    const response = await post("/completeContest", data);

    if (!response.isOk) {
      notify({
        text: response ?? "Ошибка при завершении конкурса",
        type: "error",
      });
      return;
    }

    notify({ text: "Конкурс завершён", type: "success" });
    handleInitContests();
  };

  // Method for getting complaints works
  const getComplaintWorks = async (contest_id) => {
    const params = `&contest_id=${contest_id}`;
    const response = await get("/getComplaintWorks", params);

    if (!response.isOk) {
      notify({
        text: response ?? "Ошибка при завершении конкурса",
        type: "error",
      });
      return;
    }
    setComplaintWorks(response.data);
  };

  // Method for deleting art in contest
  const deleteContestArt = async ({ user_id, art_id, contest_id }) => {
    const data = {
      contest_id: activeContest.id ?? contest_id,
      del_vk_user_id: user_id,
      art_id: art_id,
    };

    const response = await post(`/deleteContestWork`, data);

    if (!response.isOk) {
      notify({
        text: response.message ?? "Ошибка при удалении арта",
        type: "error",
      });
      return;
    }
    notify({ text: "Арт удалён", type: "success" });
    return response;
  };

  // Method for deleting contest
  const deleteContest = async (contest_id) => {
    const data = {
      contest_id: contest_id,
    };

    const response = await post(`/deleteContest`, data);

    if (!response.isOk) {
      notify({
        text: response.message ?? "Ошибка при удалении конкурса",
        type: "error",
      });
      return;
    }
    handleInitContests();
    notify({ text: "Конкурс удалён", type: "success" });
    return response;
  };

  // Method for update contest
  const updateContest = async (data) => {
    const response = await post(`/updateContest`, data);

    if (!response.isOk) {
      notify({
        text: response.message ?? "Ошибка при изменении конкурса",
        type: "error",
      });
      return;
    }
    handleInitContests();
    notify({ text: "Конкурс изменён", type: "success" });
    goBack();
  };

  const addNewContest = async (data) => {
    const response = await post(`/createContest`, data);

    if (!response.isOk) {
      notify({
        text: response.message ?? "Ошибка при создании конкурса",
        type: "error",
      });
      return;
    }
    handleInitContests();
    notify({ text: "Конкурс создан", type: "success" });
    goBack();
  };

  return (
    <AdminContext.Provider
      value={{
        activeContestData,
        complaintWorks,
        completeContest,
        deleteContestArt,
        deleteContest,
        updateContest,
        getComplaintWorks,
        setActiveContestData,
        addNewContest,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
