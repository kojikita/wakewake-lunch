// https://api.slack.com/methods
var API_BASE_URL = "https://slack.com/api/";

/*
 * 結果をつぶやくBOTの名前
 */
var BOT_NAME = "ランチわけわけおじさん";

/*
 * BOTのアイコンを設定できます
 * 設定値例） ":curry:"
 */
var ICON_EMOJI = ":clown_face:";

/*
 * 募集開始するときの文言
 */
var START_APPLY_TEXT = "@here わけわけするんじゃ！13時からランチに行く人はスタンプつけるのじゃ〜";

/*
 * グループわけを発表するときの文言
 */
var ANNOUCE_TEAM_TEXT = "今日はこの組み合わせじゃ〜\n13時から出発でしくよろ！\nみんなで仲良くな〜";

/*
 * チーム毎の人数
 */
var COUNT_EACH_TEAM = 4;

/*
 * 以下はプログラムで必要な部分なので触らない
 */
var scriptProperties = PropertiesService.getScriptProperties();
var TOKEN = scriptProperties.getProperty("TOKEN");
var CHANNEL = scriptProperties.getProperty("CHANNEL");
var TIMESTAMP = scriptProperties.getProperty("timestamp");
