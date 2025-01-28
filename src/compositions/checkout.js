import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export function useCheckout() {
  const route = useRoute();
  const router = useRouter();

  const packageName = route.query.name || "Default Package";
  const packagePrice = route.query.price || "0";
  const isModalOpen = ref(false);
  const cardNumber = ref("");
  const expiryDate = ref("");
  const cvv = ref("");

  const openModal = () => (isModalOpen.value = true);
  const closeModal = () => (isModalOpen.value = false);
  const processPayment = () => {
    setTimeout(() => {
      router.push({ name: "dashboard", params: { businessId: route.params.businessId || "default" } });
    }, 2000);
  };

  return { packageName, packagePrice, isModalOpen, cardNumber, expiryDate, cvv, openModal, closeModal, processPayment };
}
