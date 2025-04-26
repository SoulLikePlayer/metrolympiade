<template>
  <div class="container">
    <form @submit.prevent="submitMatch" class="game-form">
      <h1>Nouveau match</h1>

      <div class="sport-theme" :class="currentSportTheme">
        <h2>{{ currentActivityName || 'Nouvelle compétition' }}</h2>
        <p v-if="currentActivityName">Prêt pour le match ?</p>
      </div>

      <div class="form-group">
        <label>Activité</label>
        <select v-model="form.activityId" required @change="handleActivityChange">
          <option value="">Sélectionnez une activité</option>
          <option v-for="activity in activities" :key="activity.id" :value="activity.id">
            {{ activity.name }}
          </option>
          <option value="create">
            + Créer une nouvelle activité
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Adversaire</label>
        <select v-model="form.team2Id" required>
          <option value="">Sélectionnez un adversaire</option>
          <option v-for="team in teams" :key="team.id" :value="team.id">
            {{ team.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Heure de début</label>
        <input type="datetime-local" v-model="form.startedAt" :max="todayDate" required>
      </div>

      <div class="score-inputs">
        <div class="form-group">
          <label>Mon équipe</label>
          <input type="number" v-model="form.team1Score" min="0" required>
        </div>

        <div class="vs">VS</div>

        <div class="form-group">
          <label>Adversaire</label>
          <input type="number" v-model="form.team2Score" min="0" required>
        </div>
      </div>

      <button type="submit" class="btn primary submit-btn-match">Enregistrer le match</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import { createMatch } from '../api/matches';
import { getActivities, createActivites } from '../api/activities';
import { getAllTeams } from '../api/teams';
import { useAuth } from '../composables/useAuth';
import "../assets/style/GameView.css";

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
const todayDate = new Date().toISOString().slice(0, 16);

const currentActivityName = computed(() => {
  const activity = activities.value.find(a => a.id === form.value.activityId);
  return activity ? activity.name : '';
});

const currentSportTheme = computed(() => {
  if (!currentActivityName.value) return 'default-sport-theme';
  const activity = currentActivityName.value.toLowerCase();
  return 'default-sport-theme';
});

watch(() => form.value.team2Id, (newVal) => {
  console.log('team2Id updated:', newVal);
});

watch(
  () => user.value?.team,
  (team) => {
    if (team?.id) {
      form.value.team1Id = team.id;
    }
  },
  { immediate: true }
);

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

const handleActivityChange = async () => {
  if (form.value.activityId === 'create') {
    const newActivityName = prompt("Nom du nouveau sport :");

    if (newActivityName) {
      try {
        const newActivity = await createActivites({ name: newActivityName });
        activities.value.push(newActivity);
        form.value.activityId = newActivity.id;
      } catch (error) {
        alert("Erreur lors de la création de l'activité.");
        form.value.activityId = '';
      }
    } else {
      form.value.activityId = '';
    }
  }
};

const submitMatch = async () => {
  if (!form.value.team2Id) {
    alert('Veuillez sélectionner un adversaire');
    return;
  }
  try {
    await createMatch(form.value, user.value.token);
    setTimeout(() => {
      router.push('/games');
    }, 0);
  } catch (error) {
    console.error('Error creating match:', error);
  }
};
</script>