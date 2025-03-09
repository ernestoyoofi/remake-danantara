function LanguageView(lang) {
  const importing = require("../../language-view")
  return (keytig) => {
    return typeof importing[keytig][lang] == "object"? importing[keytig][lang] : String(importing[keytig][lang] || keytig)
  }
}

module.exports = LanguageView