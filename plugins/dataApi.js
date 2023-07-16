export default function(context, inject){
  const appId = '9OEU15A0X8'
  const apiKey = '4d88ff4a76323a2aaf9b69958a2d5f83'

  const getHome = async (homeId) => {
    const response = await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, {
      headers:{
        'X-Algolia-API-Key': apiKey,
        'X-Algolia-Application-Id': appId,
      }
    })
    return await response.json()
  }

  inject('dataApi', {
    getHome
  })
}
