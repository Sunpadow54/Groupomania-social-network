<template>
	<section class="container">
		<h2 class="mb-6">Modération</h2>
		<v-card>
			<v-list>
				<v-list-group
					v-for="user in users"
					:key="user.name"
                    color="primary"
                    :class="isUserActive"
				>
                    <template v-slot:activator >
                        <v-list-item-content>
                            <v-list-item-title v-text="user.name"></v-list-item-title>
                        </v-list-item-content>
                        <v-chip
                            v-if="user.moderatedMsg"
                            outlined
                            color="secondary"
                        >
                           {{user.moderatedMsg}} messages à modérer
                        </v-chip>
                        <v-chip
                            v-if="!user.isActive"
                            outlined
                            color="secondary"
                        >
                            utilisateur exclu
                        </v-chip>
                    </template>
                    <ModerateUser :userId="user.userId" />
					
				</v-list-group>
			</v-list>
		</v-card>
	</section>
</template>

<script>
import { onMounted, ref } from "@vue/composition-api";
import ModerateUser from "@/components/ModerateUser"
export default {
	name: "Admin",
    components: { ModerateUser },
	setup(context, {root,}) {
        const store = root.$store; // access to store in setup()
        const users = ref(null);
        let isUserActive = ref(null);

        // Function Fetch all users
        const getAllUsers = () => {
			store
				.dispatch("getData", "/admin/users")
				.then((data) => {
                    // remove admins
                    const allUsers = data.filter(e => e.isAdmin === 0)
					users.value = allUsers;
				})
				.catch((err) => console.log(err));
		};

        // Render
		onMounted(() => {
			getAllUsers();
		});

        /* return data */
        return {
            users,
            isUserActive,
        }
    },

};
</script>
