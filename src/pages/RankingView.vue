<template>
  <div class="ranking-view">
    <h1>Classement général</h1>
    
    <div v-if="loading" class="loading-state">Chargement en cours...</div>
    <table v-else class="ranking-table">
      <thead>
        <tr>
          <th class="rank-cell">#</th>
          <th class="team-cell">Équipe</th>
          <th class="points-cell">Points</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(team, index) in ranking" :key="team.team">
          <td class="rank-cell">{{ index + 1 }}</td>
          <td class="team-cell">{{ team.team }}</td>
          <td class="points-cell">{{ team.points }} pts</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getRanking } from '../api/ranking';
import '../assets/style/RankingView.css';

const ranking = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    ranking.value = await getRanking();
  } catch (error) {
    console.error('Error fetching ranking:', error);
  } finally {
    loading.value = false;
  }
});
</script>