const cheerio = require('cheerio');
const fs = require('fs');
const rp = require('request-promise');

rp({uri: 'http://lesherbonautes.mnhn.fr/stats', transform: body => cheerio.load(body)}).then($ => {
  const counts = [];
  $('.count').each((i, e) => counts.push(e.children[0].data));

  const items = [];
  $('.item').each((i, e) => items.push(e.children[0].data));

  const json = {};

  for (let i = 0; i < 4; i++) {
    json[items[i]] = counts[i].replace(/\s/g, '');
  }

  fs.writeFileSync('herbo-stats.json', JSON.stringify(json));
});