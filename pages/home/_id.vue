<template>
  <div class="app-container">
    <PropertyGallery :images="home.images"/>
    <PropertyDetails :home="home"/>

    <div style="height:800px;width:800px" ref="map"></div>
    <div
        v-for="review in reviews"
        :key="review.objectID"
    >
      <img :src="review.reviewer.image"/><br/>
      {{ review.reviewer.name }}<br/>
      {{ formatDate(review.date) }} <br/>
      <short-text :text="review.comment" :target="150"/><br/>
    </div>
    <img :src="user.image"/><br/>
    {{ user.name }} <br/>
    {{ formatDate(user.joined) }} <br/>
    {{ user.reviewCount }} <br/>
    {{ user.description }} <br/>
  </div>
</template>
<script>

export default {
  head(){
    return {
      title: this.home.title,
    }
  },
  mounted(){
    this.$maps.showMap(this.$refs.map, this.home._geoloc.lat, this.home._geoloc.lng)
  },
  async asyncData({ params, $dataApi, error }){
    const responses = await Promise.all([
      $dataApi.getHome(params.id),
      $dataApi.getReviewsByHomeId(params.id),
      $dataApi.getUserByHomeId(params.id),
    ])

    const badResponse = responses.find((response) => !response.ok)
    if(badResponse) return error({ statusCode: badResponse.status, message: badResponse.statusText})

    return {
      home: responses[0].json,
      reviews: responses[1].json.hits,
      user: responses[2].json.hits[0]
    }
  },
  methods:{
    formatDate(dateStr){
      const date = new Date(dateStr)
      return date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
    }
  },
}
</script>
