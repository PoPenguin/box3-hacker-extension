function startup() {
  const gui = new dat.GUI();
  const box3CoreElement = document.querySelector("#edit-react");
  const reactNodeName = Object.keys(box3CoreElement).filter((v) =>
    v.includes("reactContain")
  )[0];
  const startupOptions = {
    start() {
      if (
        box3CoreElement[reactNodeName].updateQueue.baseState.element.props
          .children.props.children.props.onStart
      )
        return alert("请先进入地图并等待加载完成");
      gui.destroy();
      main();
    },
  };
  const startupFolder = gui.addFolder("启动");
  startupFolder
    .add(startupOptions, "start")
    .name("进入地图后点击此处启动Hacker");
}
async function main() {
  console.log("editor模式");
  const box3CoreElement = document.querySelector("#edit-react");
  const reactNodeName = Object.keys(box3CoreElement).filter((v) =>
    v.includes("reactContain")
  )[0];
  const core =
    box3CoreElement[reactNodeName].updateQueue.baseState.element.props.children
      .props.children.props;

  window.core = core;
  const gui = new dat.GUI();
  const options = {
    cameraMode: core.state.box3.state.secret.replica.camera.mode,
    getCode() {
      console.log(core.codeEditorController.fileList());
      alert("代码已提取到控制台，打开F12查看");
    },
  };
  const cameraFolder = gui.addFolder("相机选项");
  cameraFolder
    .add(core.state.box3.state.secret.replica, "enableCursor")
    .name("启用3D光标");
  const musicFolder = gui.addFolder("音乐选项");
  musicFolder
    .add(core.state.box3.state.secret.replica.music, "gain", 0, 1)
    .name("音量");
  musicFolder
    .add(core.state.box3.state.secret.replica.music, "pitch", 0, 2)
    .name("音调");
  const projectFolder = gui.addFolder("项目");
  projectFolder.add(core, "restartServer").name("重启");
  // projectFolder.add(options, "getCode").name("获取代码");
  const advFolder = gui.addFolder("高级选项");
  advFolder.add(core.state.box3.state.secret, "netPaused").name("网络暂停");
    advFolder.add(core.state.box3.state, "hideUI").name("隐藏界面");
  // advFolder.add(core.state.box3.state.config, "admin").name("管理员标志");
  // advFolder
  //   .add(core.state.box3.state.config, "development")
  //   .name("开发模式标志");
}
const datScript = document.createElement("script");
datScript.src =
  "https://cdn.jsdelivr.net/npm/dat.gui@0.7.7/build/dat.gui.min.js";
document.body.appendChild(datScript);
datScript.addEventListener("load", () => {
  const mainScript = document.createElement("script");
  mainScript.innerHTML = startup.toString() + main.toString() + "startup()";
  document.body.appendChild(mainScript);
});
