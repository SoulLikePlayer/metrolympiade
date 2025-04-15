<template>
  <div class="container">
    <h1>Mon équipe</h1>
    
    <div v-if="loading" class="loading">Chargement...</div>
    
    <template v-else>
      <div class="form-group">
       
        <label>Nom de l'équipe</label>
        <input type="text" v-model="team.name" required>
      </div>
      
      <div class="form-group">
        <label>Membres de l'équipe</label>
        <div v-if="!team.members || team.members.length === 0" class="empty-message">
          Aucun membre pour le moment
        </div>
        <div v-for="(member, index) in team.members" :key="index" class="member-item">
          <input type="text" v-model="team.members[index]" required>
          <button @click="removeMember(index)" class="btn danger">Supprimer</button>
        </div>
        <button @click="addMember" class="btn secondary">Ajouter un coéquipier</button>
      </div>
      
      <button @click="saveTeam" class="btn primary">Enregistrer</button>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getMyTeam, updateTeam, createTeam } from '../api/teams';
import { useAuth } from '../composables/useAuth';
import { useRouter } from 'vue-router';

const { user } = useAuth();
const router = useRouter();
const team = ref({
  name: user.value?.teamName || '',
  members: []
});
const loading = ref(true);
const isNewTeam = ref(false);

onMounted(async () => {
  try {
    const teamData = await getMyTeam(user.value.token);
    console.log(teamData.id)
    if (teamData) {
      team.value = {
        name: teamData.name || user.value?.teamName || '',
        members: teamData.members || []
      };
    } else {
      isNewTeam.value = true;
      team.value = {
        name: user.value?.teamName || '',
        members: []
      };
    }
  } catch (error) {
    console.error('Error fetching team:', error);
    if (error.response && error.response.status === 404) {
      isNewTeam.value = true;
      team.value = {
        name: user.value?.teamName || '',
        members: []
      };
    }
  } finally {
    loading.value = false;
  }
});

const addMember = () => {
  if (!team.value.members) {
    team.value.members = [];
  }
  team.value.members.push('');
};

const removeMember = (index) => {
  team.value.members.splice(index, 1);
};

const saveTeam = async () => {
  if (!team.value.name.trim()) {
    alert('Le nom de l\'équipe est requis');
    return;
  }

  try {
    const members = team.value.members ? team.value.members.filter(m => m.trim() !== '') : [];
    
    if (isNewTeam.value) {
      await createTeam({
        name: team.value.name,
        members: members
      }, user.value.token);
      isNewTeam.value = false;
    } else {
      await updateTeam({
        name: team.value.name,
        members: members
      }, user.value.token);
    }
    
    alert('Équipe enregistrée avec succès');
  } catch (error) {
    console.error('Error saving team:', error);
    alert('Erreur lors de l\'enregistrement de l\'équipe');
  }
};
</script>

<style scoped>
.loading {
  padding: 20px;
  text-align: center;
}

.empty-message {
  color: #666;
  font-style: italic;
  margin-bottom: 10px;
}

.member-item {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.btn {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  border: none;
}

.primary {
  background-color: #42b983;
  color: white;
}

.secondary {
  background-color: #f0f0f0;
}

.danger {
  background-color: #ff4444;
  color: white;
}
</style>