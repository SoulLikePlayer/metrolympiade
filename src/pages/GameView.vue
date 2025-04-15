<template>
  <div class="container">
    <h1>Nouveau match</h1>
    
    <form @submit.prevent="submitMatch">
      <div class="form-group">
        <label>Adversaire</label>
        <select v-model="form.team2Id" required>
          <option v-for="team in teams" :key="team.id" :value="team.id">{{ team.name }}</option>
        </select>
      </div>
      
      <div class="form-group">
        <label>Activité</label>
        <select v-model="form.activityId" required>
          <option v-for="activity in activities" :key="activity.id" :value="activity.id">{{ activity.name }}</option>
        </select>
      </div>
      
      <div class="form-group">
        <label>Heure de début</label>
        <input type="datetime-local" v-model="form.startedAt" required>
      </div>
      
      <div class="form-group">
        <label>Score de mon équipe</label>
        <input type="number" v-model="form.team1Score" min="0" required>
      </div>
      
      <div class="form-group">
        <label>Score adverse</label>
        <input type="number" v-model="form.team2Score" min="0" required>
      </div>
      
      <button type="submit" class="btn primary">Enregistrer</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { createMatch } from '../api/matches';
import { getActivities } from '../api/activities';
import { getAllTeams } from '../api/teams';
import { useAuth } from '../composables/useAuth';

const { user } = useAuth();
const router = useRouter();

const form = ref({
  team1Id: '',
  team2Id: '',
  activityId: '',
  startedAt: '',
  team1Score: 0,
  team2Score: 0
});

const activities = ref([]);
const teams = ref([]);
const loading = ref(true);

watch(() => form.value.team2Id, (newVal) => {
  console.log('team2Id updated:', newVal);
});

watch(() => user.value?.team?.id, (newTeamId) => {
  if (newTeamId) {
    form.value.team1Id = newTeamId;
  }
}, { immediate: true });

onMounted(async () => {
  try {
    const [activitiesData, allTeams] = await Promise.all([
      getActivities(),
      getAllTeams(user.value.token)
    ]);

    activities.value = activitiesData;
    teams.value = allTeams
      .filter(team => team.id !== user.value?.team?.id)
      .map(team => ({ id: team.id, name: team.name }));
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    loading.value = false;
  }
});

const submitMatch = async () => {
  console.log('Données envoyées:', form.value);
  if (!form.value.team2Id) {
    alert('Veuillez sélectionner un adversaire');
    return;
  }
  try {
    await createMatch(form.value, user.value.token);
    router.push('/games');
  } catch (error) {
    console.error('Error creating match:', error);
  }
};

</script>