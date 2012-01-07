Ext.onReady(function(){
  Ext.state.Manager.setProvider(new Ext.state.CookieProvider());

  // Layout
  var viewport = new Ext.Viewport({
    layout: 'border',
    items: [
      {
        region: 'west',
        split: true,
        width: 200,
        minSize: 200,
        maxSize: 200,
        collapsible: true,
        title: 'Menu',
        autoScroll: false,
        // id:'west-panel',
        margins: '0 0 0 0',
        layout: {
          type: 'accordion',
          animate: true,
          sequence: true,
          fill: false
        },
        items: [
          {
            title: 'Setup',
            contentEl: 'setup',
            border: false
          }, {
            title: 'Reports',
            contentEl: 'reports',
            border: false
          },
        ]
      }, {
        region: 'south',
        //items: optimaster_AlarmsPanel, (Usado para adiconar uma variável que pode ser consulta, aviso, etc.)
        split: true,
        height: 100,
        minSize: 100,
        maxSize: 200,
        collapsible: true,
        // id: 'south-panel',
        title: 'Alerts',
        autoScroll: false,
        margins: '0 0 0 0',
        layout: 'column'
      }, 
      new Ext.TabPanel({
        region: 'center',
        deferredRender: false,
        activeTab: 0,
        tabWidth: 135,
        minTabWidth: 115,
        margins: {top:0, right:0, bottom:0, left:0},
        id: 'home_tab_panel',
        resizeTabs: true,
        defaults: {autoScroll: true},
        enableTabScroll: true,
        items:[
          {
            title: 'Welcome',
            // contentEl: 'welcome',
            closable: true,
            // autoScroll: true,
            id: 'tab_welcome'
          }
        ]
      })
    ]
  });
});

// * Error message when the loading fails for the second time
function loadingFailedMessage(el, success, response, options) {
  if (!success) {
    Ext.Msg.alert('Error', 'Sorry, but the page couldn\'t be displayed.');
  }
}

// * Try to load the tab again if the loading fails
function loadingFailed(el, success, response, options) {
  if (!success) {
    el.getUpdater().update({url: options.url, callback: loadingFailedMessage, scripts:true});
  }
}

// * @method: Generic function to add a tab in main tab panel
// * @author: Ronaldo Possan
// * @since:  2010/08/06
// * @param:  tabId(String) *Id for tab
// * @param:  title(String) *Title to display on tab
// * @param:  subTitle(String) *Subtab title
// * @param:  url(String) *Url for page to show on tab content
function addNewTab(tabId, title, subTitle, url) {
  var tabPanel = Ext.getCmp('home_tab_panel');
  var tab = tabPanel.getComponent(tabId);
  if (tab) {
    tab.show();
  } else {
    tab = tabPanel.add({
      title: title,
      activeTab: 0,
      closable: true,
      id: tabId,
      bodyStyle: {
        overflow:'auto'
      },
      xtype: 'tabpanel',
      items: [
        {
          id: 'sub_' + tabId,
          title: subTitle,
          closable: false,
          autoLoad: {
            url: url, 
            callback: loadingFailed, 
            scope: this, 
            scripts: true
          }
        }
      ]
    });
    tab.show();
  }
};

// * @method: Generic function to add a subtab in main tab panel
// * @author: Ronaldo Possan
// * @since:  2010/08/06
// * @param:  tabId(String) *Id for tab
// * @param:  title(String) *Title to display on tab
// * @param:  subTabId(String) *Id for subtab
// * @param:  url(String) *Url for page to show on tab content
function addSubTab(tabId, title, subTabId, url) {
  var tabPanel = Ext.getCmp('home_tab_panel');
  var tab = tabPanel.getComponent(tabId);
  var subtab = tab.getComponent(subTabId);
  if (subtab) {
    subtab.show();
  } else {
    subtab = tab.add({
      title: title,
      activeTab: 0,
      closable:true,
      id: subTabId,
      bodyStyle: {
        overflow:'auto'
      },
      autoLoad: {
        url: url, 
        callback: loadingFailed, 
        scope: this, 
        scripts: true
      }
    });
    subtab.show();
  }
}

// * @method: Generic function to update a subtab in main tab panel
// * @author: Ronaldo Possan
// * @since:  2010/08/06
// * @param:  tabId(String) *Id for tab
// * @param:  title(String) *Title to display on tab
// * @param:  subTabId(String) *Id for subtab
// * @param:  url(String) *Url for page to show on tab content
function updateSubTab(tabId, title, subTabId, url) {
    var tabPanel = Ext.getCmp('home_tab_panel');
    var tab = tabPanel.getComponent(tabId);
    var subtab = tab.getComponent(subTabId);
    if (subtab) {
      subtab.getUpdater().update({
        url: url, 
        callback: loadingFailed
      });
      subtab.setTitle(title);
      subtab.show();
    }
}

// * @method: Generic function to close a subtab in main tab panel
// * @author: Ronaldo Possan
// * @since:  2010/08/06
// * @param:  tabId(String) *Id for tab
// * @param:  subTabId(String) *Id for subtab
function closeSubTab(tabId, subTabId) {
    var tabPanel = Ext.getCmp('home_tab_panel');
    var tab = tabPanel.getComponent(tabId);
    var subtab = tab.getComponent(subTabId);
    if (subtab) {
      tab.remove(subtab);
    }
}

// * @method: Function to create a data store
// * @author: Ronaldo Possan
// * @since: 2010/08/06
// * @param: url(String) *Url for request to server for get json store
// * @param: fields(Array) *Fields from JSON object
// * @param: mapping(Array) *Array of JSON data and fields for the store
function createStore(url, fields, mapping) {
  var ret = new Ext.data.Store({
    autoload: false,
    fields: fields,
    proxy:  new Ext.data.HttpProxy({
      method: 'GET',
      url: url
    }),
    reader: new Ext.data.JsonReader({
      fields: mapping,
      id: 'id',
      root: 'root'
    })
  });
  return ret;
}