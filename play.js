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
        head: "QmTAcr6QMTKqJ9dLwxYApGkxLWdLzKzgEj7KuN9gvT6VH",
        hips: "QmZUYGUj3Jfnkg9wyN68BPrBrkx34uWgaJeb8pbem1Rxs",
        leftFoot: "QmSGU67YaUfrHM6Y6PcBMXz98wR1c8moMEDcVipnsiCjL",
        leftHand: "QmfZKDJpuqGBjiDZg16RtT9jM2dLoeaetg6Fnh6yLskpK",
        leftLowerArm: "QmScb7Q3QjtvMi1qytsXbwbbxrT2AbtK9DcEDTiBJLzKe",
        leftLowerLeg: "QmbYE9dNTWVJHdszrRc1dnDn4FiAbL3gUpvrSfrCNUA7z",
        leftShoulder: "QmTv5shDShtQAeWqaNnQKveEZBkDzitziw6A4VEpzXWng",
        leftUpperArm: "QmbvdM3UKGYxJfqKDhYFUkhHfhHzBk3LvcuFX6WMR61Pp",
        leftUpperLeg: "QmV55d9Xz4EppkEMrZTFJ9fiwuS36qWr39P3YH8BRKaJe",
        neck: "QmaaHDtD75Lr8hWP5BzPyPGdwRk25iEL76whFHVtugtgj",
        rightFoot: "QmaYD2W4GHzsxE5jtvG3FXVhedPttTLxhuv7LzUatr3Qt",
        rightHand: "QmWy5gVvt8q4BKGpk1P8bVvE9uDCCaWLLcmLqZybDKMs9",
        rightLowerArm: "QmbX5Wr3yxPaxdV2jyJscKnXzZZR7gKcGnrRe3pcmDttp",
        rightLowerLeg: "QmXPSQyM5eu7PjNKiCj9zmUTRF1NmksfrXLCGKpxbjTVr",
        rightShoulder: "QmXU5hZeH4L6qLkTkgaELgNTpgojrMKDcqeqmGXZafZvA",
        rightUpperArm: "QmcpVXDmLHBRNG3pZjPPb6HcHnqebEKousH8gwz4t4RWM",
        rightUpperLeg: "QmQuMMdH8hDnpkJVjhX4q7C7fG4Z7vfuYrawrUzhNhwVx",
        torso: "QmYWkbMsanqD6JugMnSnLQxSob3BWL8MUZkiXz79SZEii",
      });
    },
    cameraMode: core.state.box3.state.secret.replica.camera.mode,
  };
  const skinFolder = gui.addFolder("皮肤");
  const getAllSkinsController = skinFolder
    .add(options, "getAllSkins")
    .name("获得所有皮肤");
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
  advFolder.add(core.state.box3.state.config, "admin").name("管理员标志");
  advFolder
    .add(core.state.box3.state.config, "development")
    .name("开发模式标志");
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
