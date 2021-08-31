<template>
  <section class="container">
    <h2 class="body-1 mb-6">dernières publications</h2>
    <!-- All Posts -->
    <article
      class="v-card v-sheet v-sheet--outlined theme--light elevation-1 "
      v-for="post in posts"
      v-bind:key="post.idPost"
    >
      <div class="">
        <!-- card header -->
        <header class="d-flex align-center pa-2">
          <h3 class="body-1 me-3 text-capitalize">{{ post.author }}</h3>
          <span class="ma-0 text-caption text--disabled"
            >il y a {{ post.date }}</span
          >
          <v-icon class="ml-auto">🔥</v-icon>
        </header>

        <div class="card-body">
          <a class="text-decoration-none text-dark" href="#">
            <v-card-title class="pa-2">{{ post.title }}</v-card-title>
          </a>
        </div>

        <v-img
          src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
          height="200px"
        ></v-img>

        <div class="pa-2">
          <a class="text--disabled text-decoration-none" href="#">
            <v-icon class="mr-2">🗨️</v-icon>
            <span class="text-caption">
              {{
                post.nbrComment
                  ? `${post.nbrComment} commentaires`
                  : "0 commentaire"
              }}</span
            >
            <span class="">{{ post.latestCom }}</span>
          </a>
        </div>
      </div>

      <aside class="d-flex flex-column primary">
        <v-btn x-small icon>
          <v-icon>👍</v-icon>
        </v-btn>
        <span class="">{{
          post.likes ? post.likes : "0"
        }}</span>
		<v-btn x-small icon>
          <v-icon>🖕</v-icon>
        </v-btn>
      </aside>
    </article>

    <!-- <article
      v-for="post in posts"
      v-bind:key="post.idPost"
      class="card mb-3 border-0 overflow-hidden"
    >
      <div class="content-post">

        <div class="card-header d-flex align-items-center">
          <h3 class="h6 m-0">{{ post.author }}</h3>
          <p class="small m-0 px-3">il y a {{ post.date }}</p>
          <span class="ms-auto">🔥</span>
        </div>
        <div></div>

        <div class="card-body">
          <a class="text-decoration-none text-dark" href="#">
            <h4 class="card-title h5">{{ post.content }}</h4>
          </a>
        </div>

        <img
          src="https://media.lactualite.com/2019/12/361ba8f8-istock-1084346110-1200x675.jpg"
          class="img-fluid"
          alt="test"
        />
        
        <div class="card-footer">
          <a class="text-decoration-none text-muted" href="#">
            <span
              >🗨️
              {{
                post.nbrComment
                  ? `${post.nbrComment} commentaires`
                  : "0 commentaire"
              }}</span
            >
            <span class="ms-2 small">{{ post.latestCom }}</span>
          </a>
        </div>
      </div>

      <aside
        class="
          avis
          d-flex
          flex-column
          position-absolute
          top-0
          left-0
          bottom-0
          align-items-center
          h-100
        "
      >
        <i class="btn p-1">👍</i>
        <span class="text-center text-white px-2">{{
          post.likes ? post.likes : "0"
        }}</span>
        <i class="btn p-1">🖕</i>
      </aside>
    </article> -->
  </section>
</template>


<script>
import { ref, onMounted } from "@vue/composition-api";
//import { useStore } from 'vuex'

export default {
  name: "AllPosts",

  setup(context, { root }) {
    const store = root.$store; // access to store in setup()
    const posts = ref(null);

    // Function Fetch Post
    const getAllPosts = () => {
      store
        .dispatch("getData", "/posts")
        .then((data) => {
          // change date into time passed
          let data2 = data.map((el) => {
            return {
              ...el,
              latestCom: passedTime(el.latestCom),
              date: passedTime(el.date),
            };
          });
          posts.value = data2;
        })
        .catch((err) => console.log(err));
    };

    // Function Calc the time passed
    const passedTime = (datePost) => {
      // if no comments
      if (!datePost) {
        return null;
      }

      // format datePost
      let date = datePost.split(/[/ :]/);
      let endDate = new Date(
        date[2],
        date[1] - 1,
        date[0],
        date[3],
        date[4],
        date[5]
      );

      // Calc
      let now = new Date();

      const sec = 1000;
      const min = 60 * sec;
      const hour = 60 * min;
      const day = hour * 24;
      const year = day * 365;

      const diffTime = now.getTime() - endDate.getTime();

      let findDiff = (time) => {
        return Math.round(diffTime / time);
      };

      // return the good string of time passed
      if (findDiff(year) > 0) {
        let diff = findDiff(year);
        return `${diff} ${diff === 1 ? "an" : "ans"}`;
      }
      if (findDiff(day) > 0) {
        return `${findDiff(day)} j`;
      }
      if (findDiff(hour) > 0) {
        return `${findDiff(hour)} h`;
      }
      if (findDiff(min) > 0) {
        return `${findDiff(min)} min`;
      }
      if (findDiff(sec) > 0) {
        return `${findDiff(sec)} sec`;
      }
    };

    // Render
    onMounted(() => {
      getAllPosts();
    });

    return {
      posts,
    };
  },
};
</script>


<style scoped>
/*     .avis {
        width: 35px;
        background-color: var(--brand-color-primary);
        background: linear-gradient(347deg, var(--brand-color-primary) 40%, transparent 100%);
        border-color: #d8d8d8;
    }
    .content-post {
        padding-left: 35px;
    }
    article:hover {
        outline: 1px solid var(--brand-color-primary);
    }

    article a:hover {
        opacity:0.8
    } */
</style>