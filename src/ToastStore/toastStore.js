import { reactive, watch } from "vue";
import { useToast } from "primevue/usetoast";


export const toastStore = reactive({
  toasts: [],
});

export const useToastStore = () => {
  const toast = useToast();
  watch(
    () => toastStore.toasts,
    (toasts) => {
        console.log('toast')
      toasts.length && toast.add(toasts[toasts.length - 1]);
    }
  );
};
