(function (factory) {
  if (typeof define === 'function' && define.amd)
    define(['exports', 'xpcrawl', './kotlin-kotlin-stdlib.js', './kotlinx.coroutines-kotlinx-coroutines-core-js-ir.js'], factory);
  else if (typeof exports === 'object')
    factory(module.exports, require('xpcrawl'), require('./kotlin-kotlin-stdlib.js'), require('./kotlinx.coroutines-kotlinx-coroutines-core-js-ir.js'));
  else {
    if (typeof xpcrawl === 'undefined') {
      throw new Error("Error loading module 'com.example:xpcrawl-kotlin-example'. Its dependency 'xpcrawl' was not found. Please, check whether 'xpcrawl' is loaded prior to 'com.example:xpcrawl-kotlin-example'.");
    }
    if (typeof globalThis['kotlin-kotlin-stdlib'] === 'undefined') {
      throw new Error("Error loading module 'com.example:xpcrawl-kotlin-example'. Its dependency 'kotlin-kotlin-stdlib' was not found. Please, check whether 'kotlin-kotlin-stdlib' is loaded prior to 'com.example:xpcrawl-kotlin-example'.");
    }
    if (typeof globalThis['kotlinx.coroutines-kotlinx-coroutines-core-js-ir'] === 'undefined') {
      throw new Error("Error loading module 'com.example:xpcrawl-kotlin-example'. Its dependency 'kotlinx.coroutines-kotlinx-coroutines-core-js-ir' was not found. Please, check whether 'kotlinx.coroutines-kotlinx-coroutines-core-js-ir' is loaded prior to 'com.example:xpcrawl-kotlin-example'.");
    }
    globalThis['com.example:xpcrawl-kotlin-example'] = factory(typeof globalThis['com.example:xpcrawl-kotlin-example'] === 'undefined' ? {} : globalThis['com.example:xpcrawl-kotlin-example'], xpcrawl, globalThis['kotlin-kotlin-stdlib'], globalThis['kotlinx.coroutines-kotlinx-coroutines-core-js-ir']);
  }
}(function (_, $module$xpcrawl, kotlin_kotlin, kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core) {
  'use strict';
  //region block: imports
  var crawl = $module$xpcrawl.crawl;
  var crawlMultiple = $module$xpcrawl.crawlMultiple;
  var Unit_getInstance = kotlin_kotlin.$_$.f1;
  var protoOf = kotlin_kotlin.$_$.a3;
  var defineProp = kotlin_kotlin.$_$.m2;
  var initMetadataForClass = kotlin_kotlin.$_$.r2;
  var println = kotlin_kotlin.$_$.i2;
  var CoroutineImpl = kotlin_kotlin.$_$.g2;
  var await_0 = kotlin_org_jetbrains_kotlinx_kotlinx_coroutines_core.$_$.a;
  var get_COROUTINE_SUSPENDED = kotlin_kotlin.$_$.r1;
  var initMetadataForCoroutine = kotlin_kotlin.$_$.t2;
  var get_EmptyContinuation = kotlin_kotlin.$_$.t1;
  //endregion
  //region block: pre-declaration
  initMetadataForClass(main$results$1);
  initMetadataForClass(main$1);
  initMetadataForClass(main$bookResults$1);
  initMetadataForCoroutine($mainCOROUTINE$0, CoroutineImpl);
  //endregion
  function main($completion) {
    var tmp = new $mainCOROUTINE$0($completion);
    tmp.set_result_xj64lm_k$(Unit_getInstance());
    tmp.set_exception_px07aa_k$(null);
    return tmp.doResume_5yljmg_k$();
  }
  function main$results$1() {
    this.url_1 = 'http://books.toscrape.com/catalogue/category/books/travel_2/index.html';
    this.html_1 = null;
    this.xpath_1 = '//h3/a/text()';
    this.paginationXpath_1 = null;
    this.delay_1 = null;
    this.headless_1 = true;
    this.autoSwitchVisible_1 = true;
    this.onResult_1 = null;
    this.onPage_1 = null;
  }
  protoOf(main$results$1).set_url_fvthdx_k$ = function (_set____db54di) {
    this.url_1 = _set____db54di;
  };
  protoOf(main$results$1).get_url_18iuii_k$ = function () {
    return this.url_1;
  };
  protoOf(main$results$1).set_html_redtsh_k$ = function (_set____db54di) {
    this.html_1 = _set____db54di;
  };
  protoOf(main$results$1).get_html_wonit0_k$ = function () {
    return this.html_1;
  };
  protoOf(main$results$1).set_xpath_9hbb56_k$ = function (_set____db54di) {
    this.xpath_1 = _set____db54di;
  };
  protoOf(main$results$1).get_xpath_j1ec8k_k$ = function () {
    return this.xpath_1;
  };
  protoOf(main$results$1).set_paginationXpath_c6naj5_k$ = function (_set____db54di) {
    this.paginationXpath_1 = _set____db54di;
  };
  protoOf(main$results$1).get_paginationXpath_sw6cp2_k$ = function () {
    return this.paginationXpath_1;
  };
  protoOf(main$results$1).set_delay_6wgo51_k$ = function (_set____db54di) {
    this.delay_1 = _set____db54di;
  };
  protoOf(main$results$1).get_delay_iq7n8a_k$ = function () {
    return this.delay_1;
  };
  protoOf(main$results$1).set_headless_nx7rfu_k$ = function (_set____db54di) {
    this.headless_1 = _set____db54di;
  };
  protoOf(main$results$1).get_headless_ksannm_k$ = function () {
    return this.headless_1;
  };
  protoOf(main$results$1).set_autoSwitchVisible_43cboy_k$ = function (_set____db54di) {
    this.autoSwitchVisible_1 = _set____db54di;
  };
  protoOf(main$results$1).get_autoSwitchVisible_s64rqy_k$ = function () {
    return this.autoSwitchVisible_1;
  };
  protoOf(main$results$1).set_onResult_yf4z6p_k$ = function (_set____db54di) {
    this.onResult_1 = _set____db54di;
  };
  protoOf(main$results$1).get_onResult_7lbhi3_k$ = function () {
    return this.onResult_1;
  };
  protoOf(main$results$1).set_onPage_hsoh0f_k$ = function (_set____db54di) {
    this.onPage_1 = _set____db54di;
  };
  protoOf(main$results$1).get_onPage_hnmo0n_k$ = function () {
    return this.onPage_1;
  };
  function main$o$onResult$lambda(matches) {
    println('Got ' + matches.length + ' links');
    return Unit_getInstance();
  }
  function main$o$onPage$lambda(url) {
    println('Processing: ' + url);
    return Unit_getInstance();
  }
  function main$1() {
    this.url_1 = 'http://books.toscrape.com/catalogue/category/books/travel_2/index.html';
    this.html_1 = null;
    this.xpath_1 = '//h3/a/@href';
    this.paginationXpath_1 = null;
    this.delay_1 = 1000;
    this.headless_1 = true;
    this.autoSwitchVisible_1 = true;
    var tmp = this;
    tmp.onResult_1 = main$o$onResult$lambda;
    var tmp_0 = this;
    tmp_0.onPage_1 = main$o$onPage$lambda;
  }
  protoOf(main$1).set_url_fvthdx_k$ = function (_set____db54di) {
    this.url_1 = _set____db54di;
  };
  protoOf(main$1).get_url_18iuii_k$ = function () {
    return this.url_1;
  };
  protoOf(main$1).set_html_redtsh_k$ = function (_set____db54di) {
    this.html_1 = _set____db54di;
  };
  protoOf(main$1).get_html_wonit0_k$ = function () {
    return this.html_1;
  };
  protoOf(main$1).set_xpath_9hbb56_k$ = function (_set____db54di) {
    this.xpath_1 = _set____db54di;
  };
  protoOf(main$1).get_xpath_j1ec8k_k$ = function () {
    return this.xpath_1;
  };
  protoOf(main$1).set_paginationXpath_c6naj5_k$ = function (_set____db54di) {
    this.paginationXpath_1 = _set____db54di;
  };
  protoOf(main$1).get_paginationXpath_sw6cp2_k$ = function () {
    return this.paginationXpath_1;
  };
  protoOf(main$1).set_delay_6wgo51_k$ = function (_set____db54di) {
    this.delay_1 = _set____db54di;
  };
  protoOf(main$1).get_delay_iq7n8a_k$ = function () {
    return this.delay_1;
  };
  protoOf(main$1).set_headless_nx7rfu_k$ = function (_set____db54di) {
    this.headless_1 = _set____db54di;
  };
  protoOf(main$1).get_headless_ksannm_k$ = function () {
    return this.headless_1;
  };
  protoOf(main$1).set_autoSwitchVisible_43cboy_k$ = function (_set____db54di) {
    this.autoSwitchVisible_1 = _set____db54di;
  };
  protoOf(main$1).get_autoSwitchVisible_s64rqy_k$ = function () {
    return this.autoSwitchVisible_1;
  };
  protoOf(main$1).set_onResult_yf4z6p_k$ = function (_set____db54di) {
    this.onResult_1 = _set____db54di;
  };
  protoOf(main$1).get_onResult_7lbhi3_k$ = function () {
    return this.onResult_1;
  };
  protoOf(main$1).set_onPage_hsoh0f_k$ = function (_set____db54di) {
    this.onPage_1 = _set____db54di;
  };
  protoOf(main$1).get_onPage_hnmo0n_k$ = function () {
    return this.onPage_1;
  };
  function main$bookResults$1() {
    var tmp = this;
    // Inline function 'kotlin.arrayOf' call
    // Inline function 'kotlin.js.unsafeCast' call
    // Inline function 'kotlin.js.asDynamic' call
    tmp.urls_1 = ['http://books.toscrape.com/catalogue/its-only-the-himalayas_981/index.html', 'http://books.toscrape.com/catalogue/under-the-tuscan-sun_504/index.html'];
    this.xpath_1 = '//h1/text()';
    this.paginationXpath_1 = null;
    this.delay_1 = null;
    this.headless_1 = true;
    this.autoSwitchVisible_1 = true;
    this.onResult_1 = null;
    this.onPage_1 = null;
  }
  protoOf(main$bookResults$1).set_urls_ud8ppd_k$ = function (_set____db54di) {
    this.urls_1 = _set____db54di;
  };
  protoOf(main$bookResults$1).get_urls_wovs4t_k$ = function () {
    return this.urls_1;
  };
  protoOf(main$bookResults$1).set_xpath_9hbb56_k$ = function (_set____db54di) {
    this.xpath_1 = _set____db54di;
  };
  protoOf(main$bookResults$1).get_xpath_j1ec8k_k$ = function () {
    return this.xpath_1;
  };
  protoOf(main$bookResults$1).set_paginationXpath_c6naj5_k$ = function (_set____db54di) {
    this.paginationXpath_1 = _set____db54di;
  };
  protoOf(main$bookResults$1).get_paginationXpath_sw6cp2_k$ = function () {
    return this.paginationXpath_1;
  };
  protoOf(main$bookResults$1).set_delay_6wgo51_k$ = function (_set____db54di) {
    this.delay_1 = _set____db54di;
  };
  protoOf(main$bookResults$1).get_delay_iq7n8a_k$ = function () {
    return this.delay_1;
  };
  protoOf(main$bookResults$1).set_headless_nx7rfu_k$ = function (_set____db54di) {
    this.headless_1 = _set____db54di;
  };
  protoOf(main$bookResults$1).get_headless_ksannm_k$ = function () {
    return this.headless_1;
  };
  protoOf(main$bookResults$1).set_autoSwitchVisible_43cboy_k$ = function (_set____db54di) {
    this.autoSwitchVisible_1 = _set____db54di;
  };
  protoOf(main$bookResults$1).get_autoSwitchVisible_s64rqy_k$ = function () {
    return this.autoSwitchVisible_1;
  };
  protoOf(main$bookResults$1).set_onResult_yf4z6p_k$ = function (_set____db54di) {
    this.onResult_1 = _set____db54di;
  };
  protoOf(main$bookResults$1).get_onResult_7lbhi3_k$ = function () {
    return this.onResult_1;
  };
  protoOf(main$bookResults$1).set_onPage_hsoh0f_k$ = function (_set____db54di) {
    this.onPage_1 = _set____db54di;
  };
  protoOf(main$bookResults$1).get_onPage_hnmo0n_k$ = function () {
    return this.onPage_1;
  };
  function $mainCOROUTINE$0(resultContinuation) {
    CoroutineImpl.call(this, resultContinuation);
  }
  protoOf($mainCOROUTINE$0).doResume_5yljmg_k$ = function () {
    var suspendResult = this.get_result_iyg5d2_k$();
    $sm: do
      try {
        var tmp = this.get_state_iypx7s_k$();
        switch (tmp) {
          case 0:
            this.set_exceptionState_fex74n_k$(4);
            println('Example 1: Extract book titles');
            this.set_state_rjd8d0_k$(1);
            suspendResult = await_0(crawl(new main$results$1()), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 1:
            this.results0__1 = suspendResult;
            println('Found ' + this.results0__1.length + ' titles:');
            var indexedObject = this.results0__1;
            var inductionVariable = 0;
            var last = indexedObject.length;
            while (inductionVariable < last) {
              var element = indexedObject[inductionVariable];
              inductionVariable = inductionVariable + 1 | 0;
              println('  - ' + element);
            }

            println('\nExample 2: With callbacks');
            this.set_state_rjd8d0_k$(2);
            suspendResult = await_0(crawl(new main$1()), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 2:
            println('\nExample 3: Crawl multiple URLs');
            this.set_state_rjd8d0_k$(3);
            suspendResult = await_0(crawlMultiple(new main$bookResults$1()), this);
            if (suspendResult === get_COROUTINE_SUSPENDED()) {
              return suspendResult;
            }

            continue $sm;
          case 3:
            var bookResults = suspendResult;
            println('Book titles:');
            var inductionVariable_0 = 0;
            var last_0 = bookResults.length;
            while (inductionVariable_0 < last_0) {
              var element_0 = bookResults[inductionVariable_0];
              inductionVariable_0 = inductionVariable_0 + 1 | 0;
              println('  - ' + element_0);
            }

            return Unit_getInstance();
          case 4:
            throw this.get_exception_x0n6w6_k$();
        }
      } catch ($p) {
        var e = $p;
        if (this.get_exceptionState_wflpxn_k$() === 4) {
          throw e;
        } else {
          this.set_state_rjd8d0_k$(this.get_exceptionState_wflpxn_k$());
          this.set_exception_px07aa_k$(e);
        }
      }
     while (true);
  };
  function mainWrapper() {
    main(get_EmptyContinuation());
  }
  //region block: post-declaration
  defineProp(protoOf(main$results$1), 'url', function () {
    return this.get_url_18iuii_k$();
  }, function (value) {
    this.set_url_fvthdx_k$(value);
  });
  defineProp(protoOf(main$results$1), 'html', function () {
    return this.get_html_wonit0_k$();
  }, function (value) {
    this.set_html_redtsh_k$(value);
  });
  defineProp(protoOf(main$results$1), 'xpath', function () {
    return this.get_xpath_j1ec8k_k$();
  }, function (value) {
    this.set_xpath_9hbb56_k$(value);
  });
  defineProp(protoOf(main$results$1), 'paginationXpath', function () {
    return this.get_paginationXpath_sw6cp2_k$();
  }, function (value) {
    this.set_paginationXpath_c6naj5_k$(value);
  });
  defineProp(protoOf(main$results$1), 'delay', function () {
    return this.get_delay_iq7n8a_k$();
  }, function (value) {
    this.set_delay_6wgo51_k$(value);
  });
  defineProp(protoOf(main$results$1), 'headless', function () {
    return this.get_headless_ksannm_k$();
  }, function (value) {
    this.set_headless_nx7rfu_k$(value);
  });
  defineProp(protoOf(main$results$1), 'autoSwitchVisible', function () {
    return this.get_autoSwitchVisible_s64rqy_k$();
  }, function (value) {
    this.set_autoSwitchVisible_43cboy_k$(value);
  });
  defineProp(protoOf(main$results$1), 'onResult', function () {
    return this.get_onResult_7lbhi3_k$();
  }, function (value) {
    this.set_onResult_yf4z6p_k$(value);
  });
  defineProp(protoOf(main$results$1), 'onPage', function () {
    return this.get_onPage_hnmo0n_k$();
  }, function (value) {
    this.set_onPage_hsoh0f_k$(value);
  });
  defineProp(protoOf(main$1), 'url', function () {
    return this.get_url_18iuii_k$();
  }, function (value) {
    this.set_url_fvthdx_k$(value);
  });
  defineProp(protoOf(main$1), 'html', function () {
    return this.get_html_wonit0_k$();
  }, function (value) {
    this.set_html_redtsh_k$(value);
  });
  defineProp(protoOf(main$1), 'xpath', function () {
    return this.get_xpath_j1ec8k_k$();
  }, function (value) {
    this.set_xpath_9hbb56_k$(value);
  });
  defineProp(protoOf(main$1), 'paginationXpath', function () {
    return this.get_paginationXpath_sw6cp2_k$();
  }, function (value) {
    this.set_paginationXpath_c6naj5_k$(value);
  });
  defineProp(protoOf(main$1), 'delay', function () {
    return this.get_delay_iq7n8a_k$();
  }, function (value) {
    this.set_delay_6wgo51_k$(value);
  });
  defineProp(protoOf(main$1), 'headless', function () {
    return this.get_headless_ksannm_k$();
  }, function (value) {
    this.set_headless_nx7rfu_k$(value);
  });
  defineProp(protoOf(main$1), 'autoSwitchVisible', function () {
    return this.get_autoSwitchVisible_s64rqy_k$();
  }, function (value) {
    this.set_autoSwitchVisible_43cboy_k$(value);
  });
  defineProp(protoOf(main$1), 'onResult', function () {
    return this.get_onResult_7lbhi3_k$();
  }, function (value) {
    this.set_onResult_yf4z6p_k$(value);
  });
  defineProp(protoOf(main$1), 'onPage', function () {
    return this.get_onPage_hnmo0n_k$();
  }, function (value) {
    this.set_onPage_hsoh0f_k$(value);
  });
  defineProp(protoOf(main$bookResults$1), 'urls', function () {
    return this.get_urls_wovs4t_k$();
  }, function (value) {
    this.set_urls_ud8ppd_k$(value);
  });
  defineProp(protoOf(main$bookResults$1), 'xpath', function () {
    return this.get_xpath_j1ec8k_k$();
  }, function (value) {
    this.set_xpath_9hbb56_k$(value);
  });
  defineProp(protoOf(main$bookResults$1), 'paginationXpath', function () {
    return this.get_paginationXpath_sw6cp2_k$();
  }, function (value) {
    this.set_paginationXpath_c6naj5_k$(value);
  });
  defineProp(protoOf(main$bookResults$1), 'delay', function () {
    return this.get_delay_iq7n8a_k$();
  }, function (value) {
    this.set_delay_6wgo51_k$(value);
  });
  defineProp(protoOf(main$bookResults$1), 'headless', function () {
    return this.get_headless_ksannm_k$();
  }, function (value) {
    this.set_headless_nx7rfu_k$(value);
  });
  defineProp(protoOf(main$bookResults$1), 'autoSwitchVisible', function () {
    return this.get_autoSwitchVisible_s64rqy_k$();
  }, function (value) {
    this.set_autoSwitchVisible_43cboy_k$(value);
  });
  defineProp(protoOf(main$bookResults$1), 'onResult', function () {
    return this.get_onResult_7lbhi3_k$();
  }, function (value) {
    this.set_onResult_yf4z6p_k$(value);
  });
  defineProp(protoOf(main$bookResults$1), 'onPage', function () {
    return this.get_onPage_hnmo0n_k$();
  }, function (value) {
    this.set_onPage_hsoh0f_k$(value);
  });
  //endregion
  mainWrapper();
  return _;
}));
