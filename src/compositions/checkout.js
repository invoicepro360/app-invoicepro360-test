import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

export function useCheckout() {
  const route = useRoute();
  const router = useRouter();

  const packageName = route.query.name || "Default Package";
  const packagePrice = route.query.price || "0";
  const packageId = route.query.id || "0";
  const isModalOpen = ref(false);
  const isPaymentSuccess = ref(false);
  const cardNumber = ref("");
  const expiryDate = ref("");
  const cvv = ref("");

  const openModal = () => (isModalOpen.value = true);
  const closeModal = () => (isModalOpen.value = false);

  const processPayment = () => {
    setTimeout(() => {
      // Simulate successful payment
      const paymentData = {
        packageId,
        packageName,
        packagePrice,
        paymentDate: new Date().toISOString(),
      };

      // Save data to localStorage
      localStorage.setItem("paymentInfo", JSON.stringify(paymentData));

      isPaymentSuccess.value = true;
      closeModal();

      // Redirect to dashboard after showing success
      setTimeout(() => {
        router.push({
          name: "dashboard",
          params: { businessId: route.params.businessId || "default" },
        });
      }, 2000);
    }, 2000);
  };

  return {
    packageName,
    packagePrice,
    isModalOpen,
    isPaymentSuccess,
    cardNumber,
    expiryDate,
    cvv,
    openModal,
    closeModal,
    processPayment,
  };
}
