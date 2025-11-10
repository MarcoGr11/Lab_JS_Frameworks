import { ref, computed, watch } from 'vue';
import type { Participant } from '../types';

const LS_KEY = 'participants';

function load(): Participant[] {
    try {
        const raw = localStorage.getItem(LS_KEY);
        return raw ? (JSON.parse(raw) as Participant[]) : [];
    } catch {
        return [];
    }
}

const participants = ref<Participant[]>(load());
const search = ref('');
const sortBy = ref<'none' | 'name' | 'dob'>('none');
const sortDir = ref<'asc' | 'desc'>('asc');

watch(
    participants,
    value => {
        localStorage.setItem(LS_KEY, JSON.stringify(value));
    },
    { deep: true }
);

const filteredSorted = computed(() => {
    let list = [...participants.value];

    if (search.value.trim()) {
        const q = search.value.toLowerCase();
        list = list.filter(p => p.name.toLowerCase().includes(q));
    }

    const dir = sortDir.value === 'asc' ? 1 : -1;

    if (sortBy.value === 'name') {
        list.sort((a, b) => a.name.localeCompare(b.name) * dir);
    } else if (sortBy.value === 'dob') {
        list.sort((a, b) => (a.dob || '').localeCompare(b.dob || '') * dir);
    }

    return list;
});

function setSearch(v: string) {
    search.value = v;
}

function toggleSort(field: 'name' | 'dob') {
    if (sortBy.value !== field) {
        sortBy.value = field;
        sortDir.value = 'asc';
    } else {
        sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc';
    }
}

function addParticipant(payload: Omit<Participant, 'id' | 'createdAt'>) {
    if (participants.value.some(p => p.email === payload.email)) {
        throw new Error('Учасник з таким email вже існує');
    }

    const id =
        participants.value.length > 0
            ? Math.max(...participants.value.map(p => p.id)) + 1
            : 1;

    const participant: Participant = {
        ...payload,
        id,
        createdAt: Date.now()
    };

    participants.value.push(participant);
}

function updateParticipant(id: number, patch: Partial<Participant>) {
    const idx = participants.value.findIndex(p => p.id === id);
    if (idx === -1) return;
    participants.value[idx] = { ...participants.value[idx], ...patch };
}

function removeParticipant(id: number) {
    participants.value = participants.value.filter(p => p.id !== id);
}

export function useParticipants() {
    return {
        participants,
        filteredSorted,
        search,
        sortBy,
        sortDir,
        setSearch,
        toggleSort,
        addParticipant,
        updateParticipant,
        removeParticipant
    };
}
