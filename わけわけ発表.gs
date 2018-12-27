function annouceTeam() {
  deleteTrigger("annouceTeam");
  
  var userId = getUserId();
  var userName = getUserName(userId);
  var teamMember = createTeam(userName);
  postMessage(teamMember);
}

function postMessage(teamMember) {    
  var method = "chat.postMessage";
  var url = API_BASE_URL + method;
  
  var groupText = '';
  for (var key in teamMember) {
    groupText += Number(key) + 1 + "グループ：" + teamMember[key].join(" ") + "\n";
  }
  
  var formData = {
    token : TOKEN,
    channel : CHANNEL,
    text: ANNOUCE_TEAM_TEXT + "\n" + groupText,
    icon_emoji : ICON_EMOJI,
    username : BOT_NAME,
    link_names : true,
  };
  var options = {
    method : 'post',
    payload : formData,
  };
  var response = UrlFetchApp.fetch(url, options);
}

function createTeam(userName) {
  var teamCount = Math.floor(userName.length / COUNT_EACH_TEAM);
  if (teamCount === 0) {
    teamCount = 1;
  }
  
  // シュワルツ変換
  var shaffledName = userName.map(function(a){return {weight:Math.random(), value:a}})
    .sort(function(a, b){return a.weight - b.weight})
    .map(function(a){return a.value});
  
  var teamHash = {};
  userName.forEach(function (name, index) {
    var i = index % teamCount;
    if (!teamHash[i]) {
      teamHash[i] = [];
    }
    teamHash[i].push('@' + name);
  });
  return teamHash;
}

function getUserName(userId) {  
  var method = "users.list";
  var url = API_BASE_URL + method;
  
  var formData = {
    token : TOKEN,
  };
  var options = {
    method : 'get',
    payload : formData,
  };
  
  var response = UrlFetchApp.fetch(url, options);
  //Logger.log(response.getContentText());
  
  var content = response.getContentText();
  var jsonParsed = JSON.parse(content);
  
  var members = jsonParsed.members;
  
  var memberHash = {};
  members.forEach(function(member) {
    memberHash[member.id] = member.name;
  });
  
  var userName = [];
  userId.forEach(function(id) {
    userName.push(memberHash[id]);
  });
  return userName;
}

function getUserId() {  
  var method = "reactions.get";
  var url = API_BASE_URL + method;

  var formData = {
    token : TOKEN,
    channel : CHANNEL,
    timestamp : TIMESTAMP,
  };
  var options = {
    method : 'get',
    payload : formData,
  };
  
  var response = UrlFetchApp.fetch(url, options);
  //Logger.log(response.getContentText());
  
  var content = response.getContentText();
  var jsonParsed = JSON.parse(content);
  
  var userHash = {};
  var reactions = jsonParsed.message.reactions;
  reactions.forEach(function(reaction) {
    reaction.users.forEach(function(user) {
      userHash[user] = '';
    });
  });
  return Object.keys(userHash);
}