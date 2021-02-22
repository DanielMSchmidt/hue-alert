const { v3 } = require("node-hue-api");
const LightState = v3.lightStates.GroupLightState;
const { host, user, key } = require("./config");

function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

module.exports = {
  alert: async function alert(repetitions = 3, pause = 500) {
    const onState = new LightState().on().brightness(100);
    const offState = new LightState().off();
    const api = await v3.api.createLocal(host).connect(user, key);

    const groups = await api.groups.getAll();
    // TODO: capture initial state to reset to
    await Promise.all(
      groups.map(async (group) => {
        for (let i = 0; i < repetitions; i++) {
          await api.groups.setGroupState(group.id, onState);
          await sleep(pause);
          await api.groups.setGroupState(group.id, offState);
          await sleep(pause);
        }
      })
    );
  },
};
