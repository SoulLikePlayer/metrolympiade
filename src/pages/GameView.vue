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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { createMatch } from '../api/matches';
import { getActivities } from '../api/activities';
import { getRanking } from '../api/ranking';
import { useAuth } from '../composables/useAuth';

const { user } = useAuth();
const router = useRouter();

const form = ref({
  team2Id: '',
  activityId: '',
  startedAt: '',
  team1Score: 0,
  team2Score: 0
});

const activities = ref([]);
const teams = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const [activitiesData, rankingData] = await Promise.all([
      getActivities(),
      getRanking()
    ]);
    
    activities.value = activitiesData;
    teams.value = rankingData.map(item => ({ id: item.teamId, name: item.team }));
  } catch (error) {
    console.error('Error fetching data:', error);
  } finally {
    loading.value = false;
  }
});

const submitMatch = async () => {
  try {
    await createMatch(form.value, user.value.token);
    router.push('/games');
  } catch (error) {
    console.error('Error creating match:', error);
  }
};
</script>