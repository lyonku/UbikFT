import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";

function NotFoundPage() {
  const routeNavigator = useRouteNavigator();

  return (
    <div className="NotFoundPage">
      <div className="gradient-round"></div>

      <div className="NotFoundPage__title text_accented">
        Ошибка 404 <br />
      </div>
      <div className="NotFoundPage__text">
        Кажется что-то пошло не так! Страница, которую вы запрашиваете, не
        существует. Возможно она устарела, была удалена, или был введен неверный
        адрес в адресной строке.
      </div>
      <div
        className="NotFoundPage__btn btn"
        onClick={() => routeNavigator.replace("/")}
      >
        На главную
      </div>
    </div>
  );
}

export default NotFoundPage;
