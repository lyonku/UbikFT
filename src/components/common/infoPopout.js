import React, { useContext, useRef } from "react";
import { useClickAway } from "react-use";
import { MainContext } from "components/shared/providers";

import closeImg from "assets/img/close-btn.svg";

function InfoPopout() {
  const ref = useRef(null);
  const { router } = useContext(MainContext);

  useClickAway(
    ref,
    () => {
      router.toBack();
    },
    ["mousedown"]
  );

  return (
    <div className="InfoPopout" ref={ref}>
      <div className="InfoPopout__controls">
        <img src={closeImg} onClick={() => router.toBack()} />
      </div>
      <div className="InfoPopout__title ">Правила использования сервиса</div>
      <ul className="InfoPopout__list">
        <li className="InfoPopout__item">
          Работы, нарушающие закон или этику, будут исключены. Запрещатеся
          использовать сервис для оскорбления людей. Искусство должно объединять
          и радовать людей, а не разделять их.
        </li>
        <li className="InfoPopout__item">
          Участие в творческих конкурсах бесплатное для всех пользователей
          сервиса. Конкурсы созданы с целью стимулирования интереса к машинному
          обучению и нейросетям.
        </li>
        <li className="InfoPopout__item">
          Пользователи сервиса не должны оплачивать сервис с целью принять
          участие в конкурсе. Пользователи должны оплачивать только
          использование инструмента по генерации изображений, а участие в
          конкурсах - бесплатное дополнение.
        </li>
        <li className="InfoPopout__item">
          Победитель конкурса получит подарок через личное сообщение в
          мессенджере ВК.
        </li>
        <li className="InfoPopout__item">
          Ассортимент подарков может меняться. Накрутки будут приводить к
          дисквалификации.
        </li>
        <li className="InfoPopout__item">
          Разработчик имеет право удалять любые работы без объяснения причин.
        </li>
        <li className="InfoPopout__item">
          Мини-приложение может быть закрыто в любое время и не берет на себя
          обязательства по долгосрочному хранению изображений. Услуга считается
          выполненной после генерации изображения.
        </li>
        <li className="InfoPopout__item">
          Генерированные изображения могут отличаться от запроса и иногда могут
          быть неприемлемыми. Пользователи принимают эти риски при использовании
          сервиса. Некоторые так же запросы невозможно сгенерировать.
        </li>
        <li className="InfoPopout__item">
          Разработчик может изменять условия использования, публикуя новые
          версии в мини-приложении, которые заменяют предыдущие.
        </li>
      </ul>
    </div>
  );
}

export default InfoPopout;
