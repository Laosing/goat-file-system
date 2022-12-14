import "./style.scss"

import {
  addClickEvents,
  addKeyboardEvents,
  updateActiveMenu,
  renderSidebarView
} from "./sidebar"
import { renderFolderView } from "./table"

import treeBackup from "./tree.json"

fetch("/api/v1/goat")
  .then((res) => res.json())
  .catch(() => treeBackup)
  .then(renderApp)

function renderApp(tree) {
  const sidebar = document.getElementById("sidebar")
  const main = document.getElementById("main")

  sidebar.addEventListener("click", addClickEvents)
  sidebar.addEventListener("keydown", addKeyboardEvents)

  renderFolderView(main, tree)
  renderSidebarView(sidebar, tree)

  window.addEventListener("hashchange", () => {
    updateActiveMenu(sidebar)
    renderFolderView(main, tree)
  })
}
