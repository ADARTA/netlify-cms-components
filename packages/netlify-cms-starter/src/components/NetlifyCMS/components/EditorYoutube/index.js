export default {
  id: 'youtube',
  label: 'Youtube',
  fields: [{ name: 'id', label: 'Youtube Video ID' }],
  pattern: /^{{<\s?youtube (\S+)\s?>}}/,
  fromBlock: match => ({
    id: match[1],
  }),
  toBlock: obj => `{{< youtube ${obj.id} >}}`,
  toPreview: obj => `<img src="http://img.youtube.com/vi/${obj.id}/maxresdefault.jpg" alt="Youtube Video"/>`,
}
