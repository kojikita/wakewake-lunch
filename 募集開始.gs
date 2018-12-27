function startApply() {
  deleteTrigger("startApply");
  
  var method = "chat.postMessage";
  var url = API_BASE_URL + method;
  
  var formData = {
    token : TOKEN,
    channel : CHANNEL,
    text : START_APPLY_TEXT,
    icon_emoji : ICON_EMOJI,
    username : BOT_NAME,
    link_names : true,
  };
  var options = {
    method : 'post',
    payload : formData,
  };
  
  var response = UrlFetchApp.fetch(url, options);
  //Logger.log(response.getContentText());
  
  var content = response.getContentText();
  var jsonParsed = JSON.parse(content);
  
  PropertiesService.getScriptProperties().setProperty('timestamp', jsonParsed.ts);
}
