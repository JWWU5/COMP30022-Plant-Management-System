
**The University of Melbourne**

# COMP30022 - IT Project - PVS.Z

## Table of contents

- [Team Members and Contributions](#team-members-and-contributions)
- [About the product](#about-the-product)
- [Coding Standard](https://jwwu5.atlassian.net/wiki/spaces/IP/pages/7143452/Coding+Standards)
- [Workflow Guideline](https://jwwu5.atlassian.net/wiki/spaces/IP/pages/7241759/Git+Repository+Workflow+Guidelines)
- [CI/CD Pipelines](https://jwwu5.atlassian.net/wiki/spaces/IP/pages/7241766/CI+CD+Pipelines)
- [Building Technologies](#building-technologies)
- [Workflow Control](#workflow-control)
- [How to run](#how-to-run)

## Team Members and Contributions

| Name           |      |Contributions                                        |
| :------------- | :----|:--------------------------------------------------- |
| Zhenchen Wan | [@ZhenchenWan](https://github.com/ZhenchenWan) | Scrum Master, Backend & Frontend Developer           |
| Yikun Tu | [@Tykkk1026](https://github.com/Tykkk1026)    | Backend Leader, Testing Leader, Backend Developer    |
| Xuanhao Zhang | [@XUANHZHANG](https://github.com/XUANHZHANG)| Quality Assurance, Backend Developer                 |
| Jiayi Wu | [@JWWU5](https://github.com/JWWU5)     | Frontend Leader, UI Designer, Frontend Developer     |
| Wuge Liu | [@jzh398](https://github.com/jzh398)     | Product Owner, Frontend Developer                    |

## About the product
This web application named ‘PvsZ’ (fits for all phone sizes) used for tracking the plants' condition and help our users take better care of their plants. In this app, the user can add, remove, search plants, record the details of their plants, group their plants and get the alert message if the plant needs to be watered, sunshined or other actions should be taken. this project will span about 12 weeks and will be done so in Agile Methodology, we choose to divide the work in 3 sprints. Furthermore, except the general functions, this app also follows the client requirements. 
See the full list of requirements at our [Confluence](https://jwwu5.atlassian.net/wiki/spaces/IP/overview?homepageId=196693) site. 

**Product Logo**
<p align="center">
  <img src="./pvsz-web/src/assets/images/logo.jpg" width=300 height=180>
</p>

## Building Technologies
- Design: Adobe XD, Adoube Photoshops, Iconscout, Draw.io
- Frontend: React, Material UI
- Backend: node.js, Express, MongoDB
- Deploy Server: Heroku

## How to run

**1. Install**

This project uses [node](http://nodejs.org) and [npm](https://npmjs.com). Go check them out if you don't have them locally installed.

Backend

```sh
$ cd pvsz-api
$ npm install

```

Frontend

```sh
$ cd pvsz-web
$ npm install
```

**2. Run**

Backend

```sh
$ cd pvsz-api
$ npm run dev
```

Frontend

```sh
$ cd pvsz-web
$ npm run start
```
