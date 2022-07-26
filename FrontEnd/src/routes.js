/*!

=========================================================
* Argon Dashboard React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Profile from "views/examples/Appliances.js";
import AboutUs from "views/examples/AboutUs.js";
import Presentation from "views/examples/Presentation.js";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/recommendations",
    name: "Appliance Recommendations",
    icon: "ni ni-ui-04 text-red",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/presentation",
    name: "Presentation",
    icon: "far fa-file-powerpoint text-info",
    component: Presentation,
    layout: "/admin",
  },
  {
    path: "/aboutus",
    name: "About Us",
    icon: "ni ni-circle-08 text-green",
    component: AboutUs,
    layout: "/admin",
  },
];
export default routes;
