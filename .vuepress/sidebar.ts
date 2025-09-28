import { SidebarConfig4Multiple } from "vuepress/config";

import JavaSideBar from "./sidebars/JavaSideBar";
import LinuxSideBar from "./sidebars/LinuxSideBar";
import mysqlBasicsSideBar from "./sidebars/mysqlBasicsSideBar";
import mysqlAdvancedSideBar from "./sidebars/mysqlAdvancedSideBar";
import JavaWebSideBar from "./sidebars/JavaWebSideBar";
import mybatisSideBar from "./sidebars/mybatisSideBar";
import BackEndProject from "./sidebars/BackEndProject";
import SpringSideBar from "./sidebars/SpringSideBar";
import Springboot from "./sidebars/Springboot";
import selfStudy from "./sidebars/selfStudy";
import MybatisPlusSideBar from "./sidebars/mybatisPlusSideBar";
import joininterview from "./sidebars/joininterview";
import springAi from "./sidebars/springAi";
import frontEnd from "./sidebars/frontEnd";
// @ts-ignore
export default {
    "/Java基础/": JavaSideBar,
    "/Linux/": LinuxSideBar,
    "/Mysql/Mysql基础/": mysqlBasicsSideBar,
    "/Mysql/Mysql进阶/": mysqlAdvancedSideBar,
    "/JavaWeb/": JavaWebSideBar,
    "/Mybatis基础/": mybatisSideBar,
    "/后端项目/": BackEndProject,
    "/Spring/": SpringSideBar,
    "/Springboot/": Springboot,
    "/自考/": selfStudy,
    "/MybatisPlus/": MybatisPlusSideBar,
    "/面试/": joininterview,
    "/SpringAI/": springAi,
    "/前端/": frontEnd,
    // 降级，默认根据文章标题渲染侧边栏
    "/": "auto",
} as SidebarConfig4Multiple;
