import { ref, computed, type Ref } from 'vue';

const isOpen = ref(false);
const modalData = ref<unknown>(null);
const modalType = ref<string | null>(null);

export function useModal<T = unknown>() {
  const openModal = (type: string, data?: T) => {
    modalType.value = type;
    if (data !== undefined) {
      modalData.value = data;
    }
    isOpen.value = true;
  };

  const closeModal = () => {
    isOpen.value = false;
    modalData.value = null;
    modalType.value = null;
  };

  const toggleModal = () => {
    isOpen.value = !isOpen.value;
  };

  const typedModalData = computed(() => modalData.value as T | null);

  return {
    isOpen,
    modalData: typedModalData as Ref<T | null>,
    modalType: computed(() => modalType.value),
    openModal,
    closeModal,
    toggleModal,
  };
}
