<template>
  <div id="detail" v-if="movie">
    <movie-item v-bind:movie="movie" v-bind:sessions="[]">
      <div class="movie-detail">
        <p class="movie-genre">{{movie.Genre}}</p>
        <p class="movie-plot">{{ movie.Plot }}</p>
        <table>
          <tr>
            <td>Release Date:</td>
            <td>{{ movie.Released }}</td>
          </tr>
          <tr>
            <td>Running Time :</td>
            <td>{{ movie.Runtime }}</td>
          </tr>
          <tr>
            <td>Director:</td>
            <td>{{ movie.Director }}</td>
          </tr>
          <tr>
            <td>Cast:</td>
            <td>{{ movie.Actors }}</td>
          </tr>
        </table>
      </div>
    </movie-item>
    <div class="home">
      <router-link v-bind:to="{name: 'home'}"></router-link>
    </div>
  </div>
</template>
<script>
import MovieItem from "./MovieItem.vue";

export default {
  props: ["movies"],
  computed: {
    movie() {
      let movie = this.movies.find(movie => movie.id === this.$route.params.id);
      return movie ? movie.movie : null;
    }
  },
  created() {},
  components: {
    MovieItem
  }
};
</script>
