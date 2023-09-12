import { createContext, useState, useEffect, useContext, useRef } from "react";
import moment from "moment";
import plural from "plural-ru";
import { MainContext } from "./MainProvider";
import { get, post } from "utils/api";
import { GenerateContext } from "./GenerateProvider";

export const ContestsContext = createContext();

export const ContestsContextProvider = ({ children }) => {
  const [activeContest, setActiveContest] = useState({});
  const [contests, setContests] = useState([]);
  const [artVoted, setArtVoted] = useState({});
  const artRef = useRef(null);

  const [activeContestsFilter, setActiveContestsFilter] =
    useState("workAcceptance");
  const [updateContest, setUpdateContest] = useState(false);
  const { notify, exitPage, fetchedUser } = useContext(MainContext);
  const { currentImg, setCurrentImg } = useContext(GenerateContext);

  useEffect(() => {
    handleInitContests();
  }, []);

  // useEffect(() => {
  //   if (contests.length >= 1) {
  //     if (window.location.hash) {
  //       if (window.location.hash.includes("contests/contest")) {
  //         let mass = window.location.hash.split("/");

  //         if (activeContest.works) {
  //           let page = Math.floor(
  //             Math.round(activeContest.currentPosition) / 10
  //           );

  //           async function getPagesToArt() {
  //             for (let i = 1; i < page + 1; i++) {
  //               const res = await handleGetContestArts(
  //                 i,
  //                 activeContest.idContest
  //               );
  //             }
  //             scrollToMyRef();

  //             var currentURL = window.location.href;
  //             var parts = currentURL.split("#");
  //             var newURL = parts[0];
  //             console.log(newURL);
  //             window.history.replaceState({}, document.title, newURL);
  //           }
  //           getPagesToArt();
  //         } else {
  //           for (const item of contests) {
  //             if (item.id == mass[2]) {
  //               setActiveContest(item);
  //             }
  //           }
  //           router.toView("contests");
  //           router.toPanel("contest");
  //         }
  //         return;
  //       }
  //     }
  //   }
  // }, [contests, activeContest]);

  const sendArtComplaint = async ({ art_id, contest_id, text, user_id }) => {
    const data = {
      contest_id: activeContest.id ?? contest_id,
      art_id,
      message: text,
      user_complaint: user_id,
    };

    const response = await post("/addArtComplaint", data);

    if (response == "Success!") {
      notify({ text: "Жалоба отправлена", type: "standart" });
    } else {
      notify({ text: "Ошибка при отправке жалобы", type: "error" });
    }
  };

  const deleteContestArt = async ({ contest_id, user_id, art_id }) => {
    const data = {
      idContest: contest_id,
      vk_user_id: user_id,
      art_id: art_id,
    };

    const response = await post(`/deleteContestArt`, data);

    if (response == "Success!") {
      handleGetContestArts(0, contest_id);
      notify({ text: "Арт удалён", type: "standart" });
    } else {
      notify({
        text: response ?? "Ошибка при удалении арта",
        type: "error",
      });
    }
  };

  const approveContest = async (idContest) => {
    const params = `&idContest=${idContest}`;
    const response = await get("/completeContest", params);

    if (response === "Success!") {
      notify({ text: "Конкурс завершён", type: "standart" });
      handleInitContests();
      exitPage("contest");
    } else {
      notify({
        text: response ?? "Ошибка при завершении конкурса",
        type: "error",
      });
    }
  };

  const addLike = async ({ art_id, vk_user_id }) => {
    const data = {
      idContest: activeContest.id,
      art_id: art_id,
      vk_likedUser_id: fetchedUser.id,
      vk_user_id: vk_user_id,
    };

    const response = await post(`/addLike`, data);
    if (response == "Success!") {
      notify({ text: "Лайк выставлен", type: "standart" });
      let copy = Object.assign(activeContest, {});
      copy.globalLikes.push({ vk_user_id: fetchedUser.id });
      setActiveContest(copy);
    } else {
      notify({ text: "Ошибка при добавлении лайка", type: "error" });
    }
  };

  const handleInitContests = async () => {
    const response = await get("/initContest");

    if (response) {
      if (activeContest.id) {
        setActiveContest(response.find((item) => item.id === activeContest.id));
      }
      setContests(response);
    } else {
      notify({ text: "Ошибка при инициализации конкурсов", type: "error" });
    }
  };

  const handleGetContestArts = async (page, contest_id, contest, art_id) => {
    const data = {
      idContest: activeContest.id ?? contest_id,
      currentPage: page ? page + 1 : 1,
      vk_user_id: fetchedUser.id,
      art_id: art_id ?? "",
    };

    const response = await post("/getContestWorks", data);

    if (response !== null) {
      const copy = { ...(contest ?? activeContest) };

      if (page) {
        copy.works = [...copy.works, ...response.works];
      } else {
        copy.works = response.works;
      }

      copy.currentPage = response.currentPage;
      copy.worksCount = response.worksCount;
      copy.myWorksCount = response.myWorksCount;
      copy.maxPages = response.maxPages;
      copy.currentPosition = response.currentPosition;

      setActiveContest(copy);
    } else {
      notify({
        text: "Ошибка при получении конкурсных работ",
        type: "error",
      });
    }
  };

  const addArtToContest = async (contestID, artID) => {
    const data = {
      vk_user_id: fetchedUser.id,
      contest_id: contestID,
      art_id: artID,
    };

    const response = await post(`/addArtToContest`, data);

    if (response == "Success!") {
      notify({ text: "Арт отправлен на конкурс", type: "standart" });
      if (currentImg) {
        let copy = [...currentImg];
        for (const item of copy) {
          if (item.art_id == artID) {
            item.imagesLink = item.imagesLink.replace(
              fetchedUser.id,
              contestID
            );
            item.imagesLink = item.imagesLink.replace("images", "contests");
          }
        }
        setCurrentImg(copy);
      }
    } else {
      notify({
        text: error.message ?? "Ошибка при добавлении арта",
        type: "error",
      });
    }
    return response;
  };

  const scrollToMyRef = () => {
    const element = artRef.current;

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const updateContestTime = (newDate) => {
    let currentDate = moment();
    let targetDate = moment(+newDate);
    let remainingTime = moment.duration(targetDate.diff(moment()));

    let days = Math.floor(remainingTime.asDays());
    let hours = remainingTime.hours();
    let minutes = remainingTime.minutes();
    let seconds = remainingTime.seconds();

    if (targetDate <= currentDate) {
      setUpdateContest(true);
      return "";
    } else {
      setUpdateContest(false);
    }

    // Форматирование времени с ведущими нулями
    let formattedTime = moment({
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    }).format("HH:mm:ss");

    let timeString =
      plural(days, "%d день", "%d дня", "%d дней") + " " + formattedTime;
    return timeString;
  };

  return (
    <ContestsContext.Provider
      value={{
        activeContestsFilter,
        updateContest,
        activeContest,
        artVoted,
        contests,
        artRef,
        setActiveContestsFilter,
        handleInitContests,
        updateContestTime,
        sendArtComplaint,
        approveContest,
        setActiveContest,
        handleGetContestArts,
        deleteContestArt,
        addArtToContest,
        addLike,
        setArtVoted,
      }}
    >
      {children}
    </ContestsContext.Provider>
  );
};
