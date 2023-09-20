import React from "react";

function InfoPopout() {
  return (
    <ul className="InfoPopout__list">
      <li className="InfoPopout__item">
        Работы, нарушающие закон или этику, будут исключены. Запрещатеся
        использовать сервис для оскорбления людей, демонcтрации жестокости и
        агрессии. Искусство должно объединять и радовать людей, а не разделять
        их.
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
        Разработчик может изменять условия использования, публикуя новые версии
        в мини-приложении, которые заменяют предыдущие
      </li>
      <li className="InfoPopout__item">
        В случае если работа не соответствует тематике, конкурса, то она может
        быть удалена и дальнейшие участие в этом конкурcе будет невозможным
      </li>
      <li className="InfoPopout__item">
        Участие в творческих конкурсах бесплатное для всех пользователей
        сервиса. Конкурсы созданы с целью стимулирования интереса к машинному
        обучению и нейросетям.
      </li>
      <li className="InfoPopout__item">
        Пользователи сервиса не должны оплачивать сервис с целью принять участие
        в конкурсе. Пользователи должны оплачивать только использование
        функционала по генерации изображений в сервисе, а участие в конкурсах -
        бесплатное дополнение.
      </li>
      <li className="InfoPopout__item">
        Победитель конкурса получит подарок через личное сообщение в мессенджере
        ВК на аккаунт с которого было принято участие в конкурсе. Если аккаунт
        VK на момент завершения конкурса будет заблокирован, то такой
        пользователь будует исключен и не получит подарок
      </li>
      <li className="InfoPopout__item">
        Накрутки будут приводить к дисквалификации.
      </li>
      <li className="InfoPopout__item">
        Разработчик имеет право удалять любые работы без объяснения причин.
      </li>
    </ul>
  );
}

export default InfoPopout;
