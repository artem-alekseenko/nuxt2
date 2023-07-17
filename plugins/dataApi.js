export default function(context, inject){
  const appId = '9OEU15A0X8'
  const apiKey = '4d88ff4a76323a2aaf9b69958a2d5f83'
  const headers = {
    'X-Algolia-API-Key': apiKey,
    'X-Algolia-Application-Id': appId,
  }

  const unWrap = async (response) => {
    const json = await response.json()
    const { ok, status, statusText } = response
    return {
      json,
      ok,
      status,
      statusText,
    }
  }

  const getErrorResponse = (error) => {
    return {
      ok: false,
      status: 500,
      statusText: error.message,
      json: {}
    }
  }

  const getHome = async (homeId) => {
    try {
      return unWrap(await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/${homeId}`, { headers }))
    } catch(error){
      return getErrorResponse(error)
    }
  }

  async function getReviewsByHomeId(homeId){
    try {
      return unWrap(await fetch(`https://${appId}-dsn.algolia.net/1/indexes/reviews/query`, {
        headers,
        method: 'POST',
        body: JSON.stringify({
          filters: `homeId:${homeId}`,
        })
      }))
    } catch(error){
      return getErrorResponse(error)
    }
  }

  inject('dataApi', {
    getHome,
    getReviewsByHomeId,
  })
}
