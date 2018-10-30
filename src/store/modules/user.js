/* eslint-disable */
import { getToken, removeToken } from "@/utils/auth";
import { getUserInfo } from "@/api/user";

const user = {
  state: {
    id: "",
    token: getToken(),
    name: "",
    nickname: "",
    permissions: [],
    roles: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_ID: (state, id) => {
      state.id = id;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions;
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_NICKNAME: (state, nickname) => {
      state.nickname = nickname;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    }
  },

  actions: {
    // 获取用户信息
    GetUserInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then(response => {
            if (!response.data) {
              // 由于mockjs 不支持自定义状态码只能这样hack
              reject("error");
            }
            const data = response.data;
            commit("SET_ID", data.id);
            commit("SET_ROLES", data.roles);
            commit("SET_PERMISSIONS", data.permissions);
            commit("SET_NAME", data.username);
            commit("SET_NICKNAME", data.nickname);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 登出
    LogOut({ commit }) {
      return new Promise(resolve => {
        commit("SET_TOKEN", "");
        commit("SET_ROLES", []);
        commit("SET_PERMISSIONS", []);
        removeToken();
        resolve();
      });
    },
    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit("SET_TOKEN", "");
        removeToken();
        resolve();
      });
    }
  }
};

export default user;
