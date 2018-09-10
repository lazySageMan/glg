let local = {
  save(key, value){  //存值操作
    localStorage.setItem(key, JSON.stringify(value));
  },
  fetch(key){  //取值操作
    return JSON.parse(localStorage.getItem(key)) || {};
  },
  getUrlKey(name){
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
  }
}

export default {
  install : function (vm) {
    vm.prototype.$local = local;
  }
}
