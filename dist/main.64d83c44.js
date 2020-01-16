// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $('.site-list');
var $lastLi = $siteList.find('li.last');
var sites = JSON.parse(localStorage.getItem('sites'));
/**
 * 设置数据存储及初始化
 */

var hashMap = sites || [{
  name: 'OverAPI',
  logo: 'O',
  url: 'http://overapi.com/',
  ico: 'http://overapi.com/static/images/overapi-logo.png'
}, {
  logo: 'M',
  name: 'MDN',
  url: 'https://developer.mozilla.org/zh-CN/',
  ico: 'https://developer.mozilla.org/favicon.ico'
}, {
  logo: 'V',
  name: 'Validator',
  url: 'http://validator.w3.org/',
  ico: 'http://w3.org/favicon.ico'
}, {
  logo: 'I',
  name: 'iconfont',
  url: 'https://www.iconfont.cn/',
  ico: 'https://imgs.91sotu.com/file/icon/qEPydkxQpVjAprM8QuaQptr1.png'
}, {
  logo: 'B',
  name: 'BootCDN',
  url: 'https://www.bootcdn.cn/',
  ico: 'https://www.bootcdn.cn/assets/img/bootcdn.png'
}, {
  logo: 'B',
  name: 'Bilibili',
  url: 'https://www.bilibili.com/',
  ico: 'https://www.bilibili.com/favicon.ico'
}];
/**
 * 设置页面结构
 */

var simplifyUrl = function simplifyUrl(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '');
};

var render = function render() {
  $siteList.find('li:not(.last').remove();
  hashMap.forEach(function (node, index) {
    var $li = $("\n        <li>\n            <div class=\"site\">\n                <div class=\"logo\"><img src=\"".concat(node.ico, "\"></div>\n                <div class=\"name\">").concat(node.name, "</div>\n                <div class=\"pc-close\">\n                    <svg class=\"icon\">\n                        <use xlink:href=\"#icon-close\"></use>\n                    </svg>\n                </div>\n                <div class=\"mobile-close-container\">\n                    <div class=\"mobile-close\">\n                        <svg class=\"icon\">\n                            <use xlink:href=\"#icon-close\"></use>\n                        </svg>\n                    </div>\n                </div>\n            </div>\n        </div>\n        </li>")).insertBefore($lastLi);
    $li.on('click', function () {
      window.open(node.url, '_self');
    });
    $li.on('click', '.pc-close', function (e) {
      e.stopPropagation();
      hashMap.splice(index, 1);
      localStorage.setItem('sites', JSON.stringify(hashMap));
      render();
    });
    $li.on('touchend', '.mobile-close', function (e) {
      e.stopPropagation();
      hashMap.splice(index, 1);
      localStorage.setItem('sites', JSON.stringify(hashMap));
      render();
    });
    $(document).on('touchstart', function (e) {
      $('.mobile-close-container', $li).fadeOut(200);
    });
    $li.on({
      touchstart: function touchstart(e) {
        longClick = 0;
        timeOutEvent = setTimeout(function () {
          $('.mobile-close-container', $li).fadeIn(100);
          longClick = 1;
        }, 500);
        e.preventDefault();
      },
      touchmove: function touchmove(e) {
        clearTimeout(timeOutEvent);
        timeOutEvent = 0;
        e.preventDefault();
      },
      touchend: function touchend(e) {
        clearTimeout(timeOutEvent);

        if (timeOutEvent !== 0 && longClick === 0) {
          window.open(node.url, '_self');
        }
      }
    });
    $li.find('img').on('error', function () {
      $li.find('img').css('display', 'none');
      $li.find('.logo').html("".concat(node.logo));
    });
  });
};

render();
/**
 * 设置添加网站事件
 */

var submit = function submit() {
  var siteName = $("input[id='field-name']", '.add-dialog').val();
  var url = $("input[id='field-url']", '.add-dialog').val();
  var ico = simplifyUrl(url);
  $('input', '.add-dialog').val('');

  if (!siteName) {
    siteName = simplifyUrl(url);
  }

  if (!url) {
    alert('请务必输入网址哦');
    return;
  }

  if (ico.indexOf('http') !== 0) {
    ico = 'https://' + ico;
  }

  if (url.indexOf('http') !== 0) {
    url = 'https://' + url;
  }

  hashMap.push({
    name: siteName,
    logo: siteName[0].toUpperCase(),
    url: url,
    ico: ico + '/favicon.ico'
  });
  $('#add-dialog-container').fadeOut(200);
  render();
  localStorage.setItem('sites', JSON.stringify(hashMap));
  $('#add-button').removeClass('active');
  $('.icon', '#add-button').removeClass('active');
};

$('#add-button').click(function () {
  $('#add-dialog-container').fadeIn(200);
  $('#add-button').addClass('active');
  $('.icon', '#add-button').addClass('active');
});
$('#dialog-submit').click(function () {
  submit();
});
$('#field-url').keypress(function (e) {
  var key = e.key;

  if (key === 'Enter') {
    submit();
  }

  e.stopPropagation();
});
$('#dialog-close').click(function () {
  $('#add-dialog-container').fadeOut(200);
  $('input', '.add-dialog').val('');
  $('#add-button').removeClass('active');
  $('.icon', '#add-button').removeClass('active');
});
/**
 * 设置快捷键事件
 */

$(document).on('keypress', function (e) {
  var key = e.key;
  window.open(hashMap[key - 1].url, '_self');
});
$('input', '.search-form').on('keypress', function (e) {
  e.stopPropagation();
});
$('input', '.add-dialog').on('keypress', function (e) {
  e.stopPropagation();
});
$('#test').click(function () {
  localStorage.clear();
  location.reload();
});
$('input', '.search-form').focusin(function () {
  $('.search-form').addClass('active');
});
$('input', '.search-form').focusout(function () {
  $('.search-form').removeClass('active');
});
var backgroundIndex = 1;
$('.change-background', '.about').click(function () {
  $('body').removeClass("img".concat(backgroundIndex));
  if (backgroundIndex === 10) backgroundIndex = 0;
  backgroundIndex++;
  $('body').addClass("img".concat(backgroundIndex));
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.64d83c44.js.map