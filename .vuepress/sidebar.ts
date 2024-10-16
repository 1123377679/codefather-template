import {SidebarConfig4Multiple} from "vuepress/config";

import roadmapSideBar from "./sidebars/roadmapSideBar";
import JavaSideBar from "./sidebars/JavaSideBar";
import LinuxSideBar from "./sidebars/LinuxSideBar";
import mysqlBasicsSideBar from "./sidebars/mysqlBasicsSideBar";
import mysqlAdvancedSideBar from "./sidebars/mysqlAdvancedSideBar";
import JavaWebSideBar from "./sidebars/JavaWebSideBar";
import MyBatisSideBar from "./sidebars/MyBatisSideBar";
// @ts-ignore
export default {
    "/Java基础/": JavaSideBar,
    "/Linux/": LinuxSideBar,
    "/Mysql/Mysql基础/": mysqlBasicsSideBar,
    "/Mysql/Mysql进阶/": mysqlAdvancedSideBar,
    "/JavaWeb/": JavaWebSideBar,
    "/MyBatis/": MyBatisSideBar,
    // 降级，默认根据文章标题渲染侧边栏
    "/": "auto",

} as SidebarConfig4Multiple;
