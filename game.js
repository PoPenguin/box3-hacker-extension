async function main() {
  const box3CoreElement = document.querySelector(".app");
  const reactNodeName = Object.keys(box3CoreElement).filter((v) =>
    v.includes("reactContain")
  )[0];
  const core =
    box3CoreElement[reactNodeName].updateQueue.baseState.element.props.children
      .props.website;
  window.core = core;
  const options = {
    openEdit() {
      core.rpc.content.api
        .get({
          type: "id",
          data: {
            contentId: Number(location.pathname.replace("/g/", "")),
            isPublic: true,
            meshHash: false,
            type: 1,
            userId: 0,
          },
        })
        .then((d) => {
          open(
            `https://box3.fun/e/${d.edit_container_name.replace("edit-", "")}`
          );
        });
    },
  };
  const gui = new dat.GUI();
  gui.add(options, "openEdit").name("进入此地图的编辑器");
}
const datScript = document.createElement("script");
datScript.src =
  "https://cdn.jsdelivr.net/npm/dat.gui@0.7.7/build/dat.gui.min.js";
document.body.appendChild(datScript);
datScript.addEventListener("load", () => {
  const mainScript = document.createElement("script");
  mainScript.innerHTML = main.toString() + "main()";
  document.body.appendChild(mainScript);
});
