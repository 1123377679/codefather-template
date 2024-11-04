import {SidebarConfig4Multiple} from "vuepress/config";

import JavaSideBar from "./sidebars/JavaSideBar";
import LinuxSideBar from "./sidebars/LinuxSideBar";
import mysqlBasicsSideBar from "./sidebars/mysqlBasicsSideBar";
import mysqlAdvancedSideBar from "./sidebars/mysqlAdvancedSideBar";
import JavaWebSideBar from "./sidebars/JavaWebSideBar";
import mybatisSideBar from "./sidebars/mybatisSideBar";
import BackEndProject from "./sidebars/BackEndProject";
import SpringSideBar from "./sidebars/SpringSideBar";
import SpringMVC from "./sidebars/SpringMVC";
// @ts-ignore
export default {
    "/Java基础/": JavaSideBar,
    "/Linux/": LinuxSideBar,
    "/Mysql/Mysql基础/": mysqlBasicsSideBar,
    "/Mysql/Mysql进阶/": mysqlAdvancedSideBar,
    "/JavaWeb/": JavaWebSideBar,
    "/Mybatis/": mybatisSideBar,
    "/后端项目/": BackEndProject,
    "/Spring/": SpringSideBar,
    "/SpringMVC/": SpringMVC,
    // 降级，默认根据文章标题渲染侧边栏
    "/": "auto",
} as SidebarConfig4Multiple;
