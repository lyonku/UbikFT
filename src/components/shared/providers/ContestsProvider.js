import { createContext, useState, useEffect, useContext, useRef } from "react";
import moment from "moment";
import plural from "plural-ru";
import { MainContext } from "./MainProvider";
import { get, post } from "utils/api";
import { GenerateContext } from "./GenerateProvider";
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { useParams } from "@vkontakte/vk-mini-apps-router";

export const ContestsContext = createContext();

export const ContestsContextProvider = ({ children }) => {
  const [activeContest, setActiveContest] = useState({});
  const [contests, setContests] = useState([]);
  const [artVoted, setArtVoted] = useState({});
  const artRef = useRef(null);
  const [activeContestsFilter, setActiveContestsFilter] =
    useState("workAcceptance");
  const [updateContest, setUpdateContest] = useState(false);
  const { notify, fetchedUser } = useContext(MainContext);
  const { currentImg, setCurrentImg } = useContext(GenerateContext);
  const routeNavigator = useRouteNavigator();

  const params = useParams();

  useEffect(() => {
    handleInitContests();
  }, []);

  useEffect(() => {
    if (activeContest?.works?.length >= 1 && params.art_id) {
      let page = Math.ceil(+activeContest.artPosition + 1 / 10);
      if (
        activeContest.artPosition != 0 &&
        !artRef.current &&
        page != activeContest.currentPage
      ) {
        handleGetContestWorks(
          activeContest.currentPage,
          params.contest_id,
          null,
          params.art_id
        );
      }
      if (artRef.current) {
        scrollToMyRef();
      }
    } else {
      if (params.contest_id && contests.length >= 1 && !activeContest.id) {
        for (const item of contests) {
          if (item.id == params.contest_id) {
            setActiveContest(item);
          }
        }
      }
    }
  }, [contests, activeContest]);

  const scrollToMyRef = () => {
    const element = artRef.current;

    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Method for send complaint to work
  const sendArtComplaint = async ({ art_id, contest_id, text, user_id }) => {
    const data = {
      contest_id: activeContest.id ?? contest_id,
      art_id,
      message: text,
      user_complaint: user_id,
    };

    const response = await post("/complaintToWork", data);

    if (!response.isOk) {
      notify({ text: "Ошибка при отправке жалобы", type: "error" });
      return;
    }

    notify({ text: "Жалоба отправлена", type: "standart" });
  };

  // Method for adding like to work
  const addLike = async ({ art_id, liked_user_id }) => {
    const data = {
      contest_id: activeContest.id,
      art_id: art_id,
      liked_user_id: liked_user_id,
    };

    const response = await post(`/like`, data);

    if (!response.isOk) {
      notify({ text: "Ошибка при добавлении лайка", type: "error" });
      return;
    }

    notify({ text: "Лайк выставлен", type: "standart" });
    routeNavigator.hidePopout();
    let copy = Object.assign(activeContest, {});
    copy.globalLikes.push({ vk_user_id: fetchedUser.id });
    setActiveContest(copy);
    return;
  };

  // Method for initialization contests
  const handleInitContests = async () => {
    const response = await get("/initContests");

    if (!response.isOk) {
      notify({
        text: "Ошибка при инициализации конкурсов",
        type: "error",
      });
      return;
    }

    if (activeContest.id) {
      setActiveContest(
        response.data.find((item) => item.id === activeContest.id)
      );
    }
    setContests(response.data);
  };

  // Method for get art in contest
  const handleGetContestWorks = async (page, contest_id, contest, art_id) => {
    const params = `&currentPage=${page ? page + 1 : 1}&contest_id=${
      activeContest.id ?? contest_id
    }&art_id=${art_id ?? ""}`;

    const response = await get("/getContestWorks", params);

    if (!response.isOk) {
      notify({
        text: "Ошибка при получении конкурсных работ",
        type: "error",
      });
      return;
    }
    const copy = { ...(contest ?? activeContest) };

    if (page) {
      copy.works = [...copy.works, ...response.data.works];
    } else {
      copy.works = response.data.works;
    }

    copy.currentPage = response.data.currentPage;
    copy.worksCount = response.data.worksCount;
    copy.myWorksCount = response.data.myWorksCount;
    copy.maxPages = response.data.maxPages;
    copy.currentPosition = response.data.currentPosition;
    copy.artPosition = response.data.artPosition ?? null;

    setActiveContest(copy);

    return response;
  };

  // Method for adding generated art to contest
  const addArtToContest = async (contest_id, art_id) => {
    const data = {
      contest_id: contest_id,
      art_id: art_id,
    };

    const response = await post(`/artToContest`, data);

    if (!response.isOk) {
      notify({
        text: error.message ?? "Ошибка при добавлении арта",
        type: "error",
      });
      return;
    }

    notify({ text: "Арт отправлен на конкурс", type: "standart" });
    if (currentImg) {
      let copy = [...currentImg];
      for (const item of copy) {
        if (item.art_id == art_id) {
          item.artLink = item.artLink.replace(fetchedUser.id, contest_id);
          item.artLink = item.artLink.replace("arts", "contests");
        }
      }
      setCurrentImg(copy);
    }

    return response;
  };

  // Method for real time updating date
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
        setActiveContest,
        handleGetContestWorks,
        addArtToContest,
        addLike,
        setArtVoted,
      }}
    >
      {children}
    </ContestsContext.Provider>
  );
};
