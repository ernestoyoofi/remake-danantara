import importingLang from "../../language-view"

function LanguageView(lang) {
  const importing = importingLang
  return (keytig) => {
//    console.log(importing[keytig], keytig)
    return typeof importing[keytig][lang] == "object"? importing[keytig][lang] : String(importing[keytig][lang] || keytig)
  }
}

export default LanguageView
// module.exports = LanguageView
