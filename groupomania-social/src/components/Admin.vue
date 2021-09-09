<template>
	<section class="container">
		<h2 class="mb-6">Modération</h2>
		<v-card>
			<v-list class="pa-3">
				<v-list-group
					v-for="user in users"
					:key="user.name"
                    active-class="primary_light"

				>
                    <template v-slot:activator >
                        <v-list-item-icon>
                            <v-icon :color="user.color" v-text="user.icon"></v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title v-text="user.name"></v-list-item-title>
                        </v-list-item-content>
                        <v-chip
                                v-if="user.moderatedMsg"
                                outlined
                                color="secondary"
                                class="d-none d-sm-inline"
                            >
                            {{user.moderatedMsg + (user.moderatedMsg > 1 ? ' messages à modérer' : ' message à modérer') }}
                        </v-chip>
                        <!-- chips for mobile -->
                        <v-chip
                                v-if="user.moderatedMsg"
                                outlined
                                small
                                color="secondary"
                                class="d-sm-none"
                            >
                            {{user.moderatedMsg ? user.moderatedMsg : '0'}}
                        </v-chip>
                    </template>
                    <ModerateUser 
                        :userId="user.userId" 
                        :isActiveMember="user.isActive" 
                        v-on:hasBeenModerated="hasBeenModerated" />
					
				</v-list-group>
			</v-list>
		</v-card>
	</section>
</template>

<script>
import { onMounted, ref, watch } from "@vue/composition-api";
import ModerateUser from "@/components/ModerateUser"
export default {
	name: "Admin",
    components: { ModerateUser },
	setup(context, {root,}) {
        const store = root.$store; // access to store in setup()
        const users = ref(null);
        let moderationMade = ref(false) // used to watch the moderations made inside child

        // Function Fetch all users
        const getAllUsers = () => {
			store
				.dispatch("getData", "/admin/users")
				.then((data) => {
                    // remove admins
                    const allUsers = data.filter(e => e.isAdmin === 0)
                    const map1 = allUsers.map(u => {
                        let iconAccount, colorAccount;
                        if (!u.isActive) {
                            iconAccount = 'mdi-account-lock-outline'
                            colorAccount = 'secondary'
                        }
                        else if (u.moderatedMsg > 0) {
                            iconAccount = 'mdi-account-alert-outline'
                            colorAccount = 'warning'
                        }
                        else {
                            iconAccount = 'mdi-account-outline'
                            colorAccount = 'primary'
                        }
                        return ({ ...u, icon: iconAccount, color: colorAccount })
                    })
					users.value = map1
				})
				.catch((err) => console.log(err));
		};

        function hasBeenModerated() {
			moderationMade.value = !moderationMade.value
		}

        // Render
		onMounted(() => {
			getAllUsers();
		});
        
        // watch if moderations inside child component has been made
        watch(() => moderationMade.value, () => {
            getAllUsers()
        })

        /* return data */
        return {
            users,
            hasBeenModerated

        }
    },

};
</script>
