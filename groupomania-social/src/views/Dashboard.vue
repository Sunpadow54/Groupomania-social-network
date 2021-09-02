<template>
	<div>
		<HeaderNav v-on:switchMode="switchMode" />
		<main class="container">
			<Post :postId="postId" v-if="mode === 'onePost'" />

			<AllPosts
				v-if="mode === 'dashboard'"
				v-on:switchMode="switchMode"
				v-on:getPostId="getPostId"
			/>

			<CreatePost
				v-if="mode === 'createPost'"
				v-on:switchMode="switchMode"
			/>
		</main>
	</div>
</template>


<script>
import HeaderNav from "@/components/HeaderNav.vue";
import AllPosts from "@/components/AllPosts.vue";
import CreatePost from "@/components/CreatePost.vue";
import Post from "@/components/Post.vue";

export default {
	name: "Dashboard",
	components: { HeaderNav, AllPosts, CreatePost, Post },
	data() {
		return {
			modeCreatePost: false,
			mode: "dashboard",
			postId: null,
		};
	},
	methods: {
		switchMode: function(mode) {
			this.mode = mode;
		},
		getPostId: function(postId) {
			this.postId = postId;
		},
	},
};
</script>


<style scoped>
main {
	max-width: 900px;
}
div {
	background-color: #ebedf0;
}
</style>
