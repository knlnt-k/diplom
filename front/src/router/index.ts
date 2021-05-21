import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Infrastructure from "@/infrastructure";
import { ROUTES } from "@/infrastructure/config/routes";
import store from "@/store";
import { TOKEN } from "@/infrastructure/config/config";
import { ICurrentAccount } from "@/store/i-internal";

const routes: Array<RouteRecordRaw> = [
  {
    path: ROUTES.defaultLayout.path,
    name: ROUTES.defaultLayout.name,
    component: () => import("@/layouts/default-layout.vue"),
    children: Object.values(ROUTES)
      .reduce((acc: RouteRecordRaw[], { path, name }) => {
        if (name !== ROUTES.defaultLayout.name) {
          acc.push({
            path,
            name,
            component: () => import(`@/views/${name}/${name}.vue`)
          });
        }

        return acc;
      }, [])
      .concat([
        {
          path: "/:pathMatch(.*)*",
          name: "404",
          component: () => import("@/views/404.vue")
        }
      ])
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((from, to, next) => {
  if (from.name !== ROUTES.home.name) {
    if (Infrastructure.auth.isAuth() && TOKEN) {
      const route = Object.values(ROUTES).find(
        route => route.name === from.name
      );
      store.commit("setCurrentAccount", {
        id: TOKEN.id,
        isCompany: TOKEN.isCompany,
        name: TOKEN.name,
        access: TOKEN.access,
        isAuth: true,
        companyID: TOKEN.company_id
      } as ICurrentAccount);

      if (route && "access" in route && !route.access(TOKEN.access)) {
        alert("У вас нет доступа к данной странице");
        router.push(ROUTES.board.path);
      }

      next();
    } else {
      alert("Вы не авторизованы или истек срок авторизации");
      store.commit("setCurrentAccount", {
        id: 0,
        isCompany: false,
        name: "",
        access: 0,
        isAuth: false
      } as ICurrentAccount);
      Infrastructure.auth.unAuth();
    }
  } else {
    next();
  }
});

export default router;
