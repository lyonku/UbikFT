import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import { AdminContext, ContestsContext } from "components/shared/providers";
import { useContext } from "react";

function DeleteContestArt({ user_id, art_id }) {
  const routeNavigator = useRouteNavigator();
  const { deleteContestArt } = useContext(AdminContext);
  const { handleGetContestWorks } = useContext(ContestsContext);

  return (
    <div className="DeleteContestArt__btns ">
      <div
        className="DeleteContestArt__btn cancel"
        onClick={() => routeNavigator.hidePopout()}
      >
        Отмена
      </div>
      <div
        className="DeleteContestArt__btn btn"
        onClick={() => {
          deleteContestArt({
            user_id: user_id,
            art_id: art_id,
          }).then(() => {
            handleGetContestWorks();
            routeNavigator.hidePopout();
          });
        }}
      >
        Удалить
      </div>
    </div>
  );
}

export default DeleteContestArt;
