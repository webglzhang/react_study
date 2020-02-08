import {
  observable,
  computed,
  action,
  autorun,
} from 'mobx';

export class AppState {
  @observable count = 0;

  @observable name = 'webglzhang';

  @computed get msg() {
    return `${this.name} say count is ${this.count}`
  }

  @action add() {
    this.count += 1
  }

  @action changeName(name) {
    // console.log(name)
    this.name = name;
  }
}

const appState = new AppState();

autorun(() => {
  // console.log(appState.msg)
});

setInterval(() => {
  // appState.add();
});

export default appState;
