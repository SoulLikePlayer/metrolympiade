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
        <tr v-for="(team, index) in enrichedRanking" :key="team.id || team.name">
          <td class="rank-cell">{{ index + 1 }}</td>
          <td class="team-cell">
            <router-link
              v-if="team.id" 
              :to="`/team/${encodeURIComponent(team.id)}`"
              class="team-link"
            >
              {{ team.name }}
            </router-link>
            <span v-else>{{ team.name }}</span>
          </td>
          <td class="points-cell">{{ team.points }} pts</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getRanking } from '../api/ranking';
import { getAllTeams } from '../api/teams';
import { useAuth } from '../composables/useAuth';
import '../assets/style/RankingView.css';

const ranking = ref([]);
const allTeams = ref([]);
const enrichedRanking = ref([]);
const loading = ref(true);
const { user } = useAuth();

onMounted(async () => {
  try {
    // On fait d'abord la récupération du classement, même si l'utilisateur n'est pas connecté
    const rankingData = await getRanking();
    ranking.value = rankingData;

    // Si l'utilisateur est connecté, on fait la récupération des équipes
    if (user.value?.token) {
      const teamsData = await getAllTeams(user.value?.token);
      allTeams.value = teamsData;
      
      enrichedRanking.value = ranking.value.map((teamRank) => {
        const match = allTeams.value.find(t => t.name === teamRank.team);
        return {
          name: teamRank.team,
          points: teamRank.points,
          id: match ? match.id : null
        };
      });
    } else {
      enrichedRanking.value = ranking.value.map((teamRank) => ({
        name: teamRank.team,
        points: teamRank.points,
        id: null  
      }));
    }
    
  } catch (error) {
    console.error('Error fetching ranking or teams:', error);
  } finally {
    loading.value = false;
  }
});
</script>
