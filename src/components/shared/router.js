// router.js
import { createNavigator } from "@vkontakte/router";

// коллекция маршрутов
const routes = [
  { name: "main" },
  { name: "main.home" },
  { name: "main.inquiry" },
  { name: "main.styleSelection" },
  { name: "main.loading" },
  { name: "main.artSelection" },
  { name: "gallery" },
  { name: "profile" },
  { name: "payEnergy" },
];

const config = {
  defaultRoute: "main.home",
};

const router = createNavigator(routes, config);
router.start();

export default router;
