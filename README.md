<h1 align="center"> Store Manager </h1>

<p align="right">
<img src="http://img.shields.io/static/v1?label=STATUS&message=%20FINISHED&color=GREEN&style=for-the-badge"/>
</p>

## ✔ Technologies used

-  <img align="center" alt="Matheus-DOCKER" height="30" src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white">
-  <img align="center" alt="Matheus-MYSQL" height="30" src="https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white">
-  <img align="center" alt="Matheus-NODE" height="30" src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white">

## 📒 Introduction

This is a project in which an API was implemented following the MSC architecture (Model - Service - Controller). This project performs all the basic CRUD operations that a complete system needs, such as searching, adding, updating, and deleting data from a MySQL database.

## :book: Database

The database consists of three tables, namely "Product", "Sales", and "Product_sales". The Product_sales table references which product was sold in a particular sale.

## :bulb: Installation

To start the project, it is necessary to install npm in the directory and start the Docker. Docker-compose needs to be version 1.29 or higher.

install the dependencies:

```bash
npm install

docker-compose up -d
```
