const structure = [
  {
    path: "/",
    panel: "styleSelection",
    view: "main",
  },
  {
    path: "/main",
    panel: "styleSelection",
    view: "main",
  },
  {
    path: "/artSelection",
    panel: "artSelection",
    view: "main",
  },
  {
    path: "/loading",
    panel: "loading",
    view: "main",
  },
  {
    path: "/contests",
    panel: "contestsList",
    view: "contests",
  },
  {
    path: "/contests/contest",
    panel: "contest",
    view: "contests",
  },
  {
    path: "/contests/contest/:contest_id",
    panel: "contest",
    view: "contests",
  },
  {
    path: "/contests/contest/:contest_id/:art_id",
    panel: "contest",
    view: "contests",
  },
  {
    path: "/profile",
    panel: "profile",
    view: "profile",
  },
  {
    path: "/rating/",
    panel: "assignment",
    view: "rating",
  },
  {
    path: "/rating/assignment",
    panel: "assignment",
    view: "rating",
  },
  {
    path: "/rating/users",
    panel: "users",
    view: "rating",
  },
  {
    path: "/store",
    panel: "store",
    view: "store",
  },
  {
    path: "/artVoted",
    panel: "artVoted",
    view: "artVoted",
  },
  {
    path: "/admin",
    panel: "home",
    view: "admin",
  },
  {
    path: "/newContest",
    panel: "newContest",
    view: "admin",
  },
  {
    path: "/complaints",
    panel: "complaints",
    view: "admin",
  },
];

export default structure;
