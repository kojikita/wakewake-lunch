// https://qiita.com/sumi-engraphia/items/465dd027e17f44da4d6a

// その日の指定時刻にトリガーを設定
function setTrigger() {
  var triggerDay = new Date();
  triggerDay.setHours(10);
  triggerDay.setMinutes(00);
  ScriptApp.newTrigger("startApply").timeBased().at(triggerDay).create();
  
  triggerDay.setHours(12);
  triggerDay.setMinutes(45);
  ScriptApp.newTrigger("annouceTeam").timeBased().at(triggerDay).create();
}

// その日のトリガーを削除する関数(消さないと残る)
function deleteTrigger(handlerFunction) {
  var triggers = ScriptApp.getProjectTriggers();
  for(var i=0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() == handlerFunction) {
      ScriptApp.deleteTrigger(triggers[i]);
    }
  }
}