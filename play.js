async function main() {
  console.log("play模式");
  const gui = new dat.GUI();
  const box3CoreElement = document.querySelector("#react-container");
  const reactNodeName = Object.keys(box3CoreElement).filter((v) =>
    v.includes("reactContain")
  )[0];
  const core =
    box3CoreElement[reactNodeName].updateQueue.baseState.element.props.children
      .props.children.props;
  window.core = core;
  const options = {
    getAllSkins() {
      skinFolder.remove(getAllSkinsController);
      core.state.brpc.skin.api
        .getAll()
        .then(
          (a) =>
            (core.state.box3.state.secret.availableSkin = a.map((o) => o.name))
        );
    },
    transparentSkin() {
      core.setSkin({
        head: "none",
        hips: "none",
        leftFoot: "none",
        leftHand: "none",
        leftLowerArm: "none",
        leftLowerLeg: "none",
        leftShoulder: "none",
        leftUpperArm: "none",
        leftUpperLeg: "none",
        neck: "none",
        rightFoot: "none",
        rightHand: "none",
        rightLowerArm: "none",
        rightLowerLeg: "none",
        rightShoulder: "none",
        rightUpperArm: "none",
        rightUpperLeg: "none",
        torso: "none",
      });
    },
    cameraMode: core.state.box3.state.secret.replica.camera.mode,
  };
  const skinFolder = gui.addFolder("皮肤");
  // const getAllSkinsController = skinFolder
  //   .add(options, "getAllSkins")
  //   .name("获得所有皮肤");
  skinFolder.add(options, "transparentSkin").name("切换为透明皮肤");
  const cameraFolder = gui.addFolder("相机选项");
  cameraFolder
    .add(core.state.box3.state.secret.replica, "enableCursor")
    .name("启用3D光标");
  cameraFolder
    .add(core.state.box3.state.secret.replica.camera, "distance", 0, 500)
    .name("视角距离");
  cameraFolder
    .add(options, "cameraMode", [0, 1, 2, 3, 4])
    .name("视角模式")
    .onFinishChange((v) => {
      core.state.box3.state.secret.replica.camera.mode = Number(v);
    });
  const musicFolder = gui.addFolder("音乐选项");
  musicFolder
    .add(core.state.box3.state.secret.replica.music, "gain", 0, 1)
    .name("音量");
  musicFolder
    .add(core.state.box3.state.secret.replica.music, "pitch", 0, 2)
    .name("音调");
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
  mainScript.innerHTML = main.toString() + ";main()";
  document.body.appendChild(mainScript);
});
