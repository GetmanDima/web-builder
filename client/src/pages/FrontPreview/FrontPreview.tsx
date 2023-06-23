import { projectAPI } from "@shared/api";
import { useEffect } from "react";
import { useParams } from "react-router";
import * as ReactRouterDOM from "react-router-dom";
import * as Redux from "@reduxjs/toolkit";
import * as antd from 'antd';
import React from 'react';
import ReactDOM from "react-dom/client";
import { addAppScripts } from "./lib/lib";
import { useAppDispatch } from "@app";
import { setPage } from "@entities/App/model/appReducer";

//@ts-ignore
window.React = React;
//@ts-ignore
window.ReactDOM = ReactDOM;
//@ts-ignore
window.ReactRouterDOM = ReactRouterDOM;
//@ts-ignore
window.Redux = Redux;
//@ts-ignore
window.antd = antd;

export const FrontPreview = () => {
  const dispatch = useAppDispatch();
  const {projectId} = useParams();
  const [getOneProject] = projectAPI.useGetOneProjectMutation();

  useEffect(() => {
    dispatch(setPage('preview'));
    
    if (!projectId) {
      return;
    }

    getOneProject({projectId}).unwrap().then((res) => {
      const frontConfig = res.project.frontendConfig;

      const filledFrontConfig = {
        globalState: frontConfig.globalState ?? {},
        elements: frontConfig.elements ?? {},
        pages: frontConfig.pages ?? [],
      };

      addAppScripts(filledFrontConfig, projectId);
    });
  }, [projectId]);

  return (
    <div id="app"></div>
  )
}
