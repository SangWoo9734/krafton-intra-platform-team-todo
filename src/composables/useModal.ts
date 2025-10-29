import { ref, computed, type Ref } from 'vue';

const isOpen = ref(false);
const modalData = ref<unknown>(null);

export function useModal<T = unknown>() {
  const openModal = (data?: T) => {
    if (data !== undefined) {
      modalData.value = data;
    }
    isOpen.value = true;
  };

  const closeModal = () => {
    isOpen.value = false;
    modalData.value = null;
  };

  const toggleModal = () => {
    isOpen.value = !isOpen.value;
  };

  const typedModalData = computed(() => modalData.value as T | null);

  return {
    isOpen,
    modalData: typedModalData as Ref<T | null>,
    openModal,
    closeModal,
    toggleModal,
  };
}
