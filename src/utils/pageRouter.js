import wepy from 'wepy'

const TYPE = {
  NAVIGATETO: 'navigateTo',
  REDIRECTTO: 'redirectTo',
  SWITCHTAB: 'switchTab',
  NAVIGATEBACK: 'navigateBack',
  RELAUNCH: 'reLaunch'
};

class PageRouter{

  _enter = []; // [{page:'/index', script: function}]

  _exit = []; //TODO

  _app;

  callBack = null;

  go(type, object){
    for(let e of this._enter){
      if(e.page === object.url || object.url.startsWith(e.page + '?')){
        const v = e.script.call(this._app, object.url)
        if(v === false){
          return ;
        }
      }
    }
    this.callBack = object.callBack;
    return wepy[type](object)
  }

  navigateTo(object){
    return this.go(TYPE.NAVIGATETO, object)
  }

  redirectTo(object){
    return this.go(TYPE.REDIRECTTO, object)
  }

  switchTab(object){
    return this.go(TYPE.SWITCHTAB, object)
  }

  navigateBack(object){
    return this.go(TYPE.NAVIGATEBACK, object)
  }

  reLaunch(object){
    return this.go(TYPE.RELAUNCH, object)
  }

  pushEnter(enter){
    this._enter.push(enter)
  }

  setApp(app){
    this._app = app;
  }
}


export default new PageRouter()
